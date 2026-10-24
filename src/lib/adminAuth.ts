import { createHmac, randomInt, timingSafeEqual } from "crypto";
import { cache } from "react";
import { cookies } from "next/headers";
import { API_BASE_URL } from "@/lib/apiBase";
import type { Permissions } from "./adminAccess";

/**
 * Admin authentication (server only): email + password → 6-digit email OTP → 48h session cookie.
 * After a verified OTP the device is trusted for 48h: signing in again with the right password skips the OTP.
 *
 * ADMIN_AUTH_MODE
 *   live (default in production) — every step is delegated to the backend (API_BASE_URL, e.g. http://localhost:8000/api):
 *     POST /admin/auth/login       { email, password, trustToken? } → { otpRequired: true, challengeId }        (OTP emailed)
 *                                                                    | { otpRequired: false, token, expiresAt, admin }  (trusted device)
 *     POST /admin/auth/send-otp    { challengeId }                  → { sent: true }                          (new code, 30s cooldown)
 *     POST /admin/auth/verify-otp  { challengeId, code }            → { token, expiresAt, trustToken, trustExpiresAt, admin }
 *     GET  /admin/auth/me          Authorization: Bearer token      → { email, name, role } | 401
 *     POST /admin/auth/logout      Authorization: Bearer token
 *   The backend owns credentials, OTP delivery (SMTP), rate limits and expiry. Its tokens are kept in httpOnly cookies here.
 *
 *   demo — no email is sent; credentials come from ADMIN_DEMO_EMAIL / ADMIN_DEMO_PASSWORD and the OTP is 123456.
 *   Tokens are HMAC-signed with ADMIN_SESSION_SECRET. Never use demo in production.
 */
/** Production always uses the backend (demo mode would accept the demo password on the live site). */
export const ADMIN_MODE: "live" | "demo" =
  process.env.NODE_ENV === "production" ? "live" : process.env.ADMIN_AUTH_MODE === "demo" ? "demo" : "live";

export const ADMIN_COOKIE = "vini_admin_session";
/** Trusted-device cookie: present and valid → no OTP on the next sign-in (48h). Survives sign-out on purpose. */
export const ADMIN_TRUST_COOKIE = "vini_admin_trusted";
export const SESSION_TTL_MS = 48 * 60 * 60 * 1000;
export const TRUST_TTL_MS = 48 * 60 * 60 * 1000;
const CHALLENGE_TTL_MS = 10 * 60 * 1000; // OTP valid for 10 minutes
const MAX_OTP_ATTEMPTS = 5;
export const DEMO_OTP = "123456";

const API_BASE = API_BASE_URL;
const SECRET = process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV === "production" ? "" : "vini-admin-dev-secret");

/** The signed-in admin: role and per-section permissions (see lib/adminAccess.ts). `roles` only on demo sessions. */
export type AdminUser = { id?: string; email: string; name?: string; role?: string; permissions?: Partial<Permissions>; workspaces?: string[]; roles?: string[] };

export const isEmail = (v: unknown): v is string => typeof v === "string" && v.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

/* ---------------- signing (demo mode) ---------------- */

const sign = (payload: string) => createHmac("sha256", SECRET).update(payload).digest("base64url");
const b64 = (o: object) => Buffer.from(JSON.stringify(o)).toString("base64url");

function seal(data: object): string {
  const body = b64(data);
  return `${body}.${sign(body)}`;
}

function unseal<T>(token: unknown): T | null {
  if (!SECRET || typeof token !== "string") return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const a = Buffer.from(sign(body));
  const b = Buffer.from(sig);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    return JSON.parse(Buffer.from(body, "base64url").toString()) as T;
  } catch {
    return null;
  }
}

const safeEqual = (a: string, b: string) => {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
};

/* ---------------- cookies ---------------- */

const cookieBase = { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict" as const, path: "/" };

async function setSessionCookie(token: string, expiresAt: number) {
  (await cookies()).set(ADMIN_COOKIE, token, { ...cookieBase, expires: new Date(expiresAt) });
}

async function setTrustCookie(token: string, expiresAt: number) {
  (await cookies()).set(ADMIN_TRUST_COOKIE, token, { ...cookieBase, expires: new Date(expiresAt) });
}

const toTime = (v: unknown, fallbackMs: number) => {
  const t = Date.parse(String(v ?? ""));
  return Number.isFinite(t) ? t : Date.now() + fallbackMs;
};

/* ---------------- backend calls (live mode) ---------------- */

async function backend(path: string, init: { method?: string; body?: object; token?: string } = {}) {
  if (!API_BASE) throw new Error("API_BASE_URL is not configured");
  const headers: Record<string, string> = { Accept: "application/json" };
  if (init.body) headers["Content-Type"] = "application/json";
  if (init.token) headers.Authorization = `Bearer ${init.token}`;
  const res = await fetch(`${API_BASE}/${path}`, { method: init.method ?? "POST", headers, body: init.body ? JSON.stringify(init.body) : undefined, cache: "no-store", signal: AbortSignal.timeout(15_000) });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json: json as Record<string, unknown> };
}

const backendMessage = (json: Record<string, unknown>, fallback: string) => (typeof json.message === "string" && json.message ? json.message : fallback);

/* ---------------- steps ---------------- */

type Challenge = { email: string; exp: number; n: number };
export type StepResult<T = object> = ({ ok: true } & T) | { ok: false; status: number; error: string };

const GENERIC_LOGIN_ERROR = "Incorrect email or password.";
const UNREACHABLE = "Can't reach the server. Please try again.";

/**
 * Step 1 — check credentials.
 * Trusted device → signed in straight away ({ signedIn: true }). Otherwise the OTP is emailed and a challenge id returned.
 */
export async function startLogin(email: string, password: string): Promise<StepResult<{ challengeId?: string; signedIn?: boolean; demo?: boolean }>> {
  const trustToken = (await cookies()).get(ADMIN_TRUST_COOKIE)?.value;

  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/login", { body: { email, password, ...(trustToken ? { trustToken } : {}) } }).catch(() => null);
    if (!r) return { ok: false, status: 502, error: UNREACHABLE };
    if (!r.ok) {
      if (r.status === 429) return { ok: false, status: 429, error: backendMessage(r.json, "Too many attempts. Please wait and try again.") };
      // 5xx: show the backend's reason (e.g. "Database unavailable") instead of a generic message
      if (r.status >= 500) return { ok: false, status: 502, error: backendMessage(r.json, "The server ran into a problem. Please try again in a minute.") };
      return { ok: false, status: 401, error: GENERIC_LOGIN_ERROR };
    }
    if (r.json.otpRequired === false && typeof r.json.token === "string") {
      await setSessionCookie(r.json.token, toTime(r.json.expiresAt, SESSION_TTL_MS));
      return { ok: true, signedIn: true };
    }
    if (typeof r.json.challengeId !== "string") return { ok: false, status: 502, error: UNREACHABLE };
    return { ok: true, challengeId: r.json.challengeId };
  }

  const demoEmail = process.env.ADMIN_DEMO_EMAIL;
  const demoPassword = process.env.ADMIN_DEMO_PASSWORD;
  if (!SECRET || !demoEmail || !demoPassword) return { ok: false, status: 503, error: "Admin login is not configured on this server." };
  const valid = safeEqual(email.toLowerCase(), demoEmail.toLowerCase()) && safeEqual(password, demoPassword);
  if (!valid) return { ok: false, status: 401, error: GENERIC_LOGIN_ERROR };
  const trust = unseal<{ email: string; exp: number; typ: string }>(trustToken);
  if (trust?.typ === "trust" && trust.exp > Date.now() && trust.email.toLowerCase() === demoEmail.toLowerCase()) {
    const exp = Date.now() + SESSION_TTL_MS;
    await setSessionCookie(seal({ email: demoEmail, exp }), exp);
    return { ok: true, signedIn: true, demo: true };
  }
  return { ok: true, demo: true, challengeId: seal({ email: demoEmail, exp: Date.now() + CHALLENGE_TTL_MS, n: randomInt(1e9) } satisfies Challenge) };
}

export async function resendOtp(challengeId: string): Promise<StepResult> {
  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/send-otp", { body: { challengeId } }).catch(() => null);
    if (!r) return { ok: false, status: 502, error: UNREACHABLE };
    return r.ok ? { ok: true } : { ok: false, status: r.status, error: backendMessage(r.json, "Couldn't resend the code. Please sign in again.") };
  }
  const c = unseal<Challenge>(challengeId);
  return c && c.exp > Date.now() ? { ok: true } : { ok: false, status: 401, error: "Code expired. Please sign in again." };
}

/* best-effort attempt limiter for demo mode (per challenge, per server instance) */
const attempts = new Map<string, number>();

/** Step 2 — verify the 6-digit code → 48h session cookie + 48h trusted-device cookie. */
export async function verifyOtp(challengeId: string, code: string): Promise<StepResult<{ admin: AdminUser }>> {
  if (!/^\d{6}$/.test(code)) return { ok: false, status: 400, error: "Enter the 6-digit code." };

  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/verify-otp", { body: { challengeId, code } }).catch(() => null);
    if (!r) return { ok: false, status: 502, error: UNREACHABLE };
    if (!r.ok || typeof r.json.token !== "string") return { ok: false, status: r.status === 429 ? 429 : 401, error: backendMessage(r.json, "Incorrect or expired code.") };
    await setSessionCookie(r.json.token, toTime(r.json.expiresAt, SESSION_TTL_MS));
    if (typeof r.json.trustToken === "string") await setTrustCookie(r.json.trustToken, toTime(r.json.trustExpiresAt, TRUST_TTL_MS));
    return { ok: true, admin: (r.json.admin as AdminUser) ?? { email: "" } };
  }

  const c = unseal<Challenge>(challengeId);
  if (!c || c.exp < Date.now()) return { ok: false, status: 401, error: "Code expired. Please sign in again." };
  const used = (attempts.get(challengeId) ?? 0) + 1;
  attempts.set(challengeId, used);
  if (used > MAX_OTP_ATTEMPTS) return { ok: false, status: 429, error: "Too many attempts. Please sign in again." };
  if (!safeEqual(code, DEMO_OTP)) return { ok: false, status: 401, error: "Incorrect code. Please try again." };
  attempts.delete(challengeId);
  const exp = Date.now() + SESSION_TTL_MS;
  await setSessionCookie(seal({ email: c.email, exp }), exp);
  const trustExp = Date.now() + TRUST_TTL_MS;
  await setTrustCookie(seal({ email: c.email, exp: trustExp, typ: "trust" }), trustExp);
  return { ok: true, admin: { email: c.email, name: "Admin", role: "superAdmin" } };
}

/**
 * Current admin from the session cookie, or null. Use in server components / route handlers under /admin.
 * `cache` = one backend check per request, however many layouts and pages ask.
 */
export const getAdminSession = cache(async (): Promise<AdminUser | null> => {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/me", { method: "GET", token }).catch(() => null);

    // Server down or failing → show the admin error screen instead of pretending the admin is signed out
    if (!r || r.status >= 500) throw new Error(`Admin session check failed: ${r ? `HTTP ${r.status}` : "server unreachable"}`);

    return r.ok && typeof r.json.email === "string" ? (r.json as AdminUser) : null;
  }
  const s = unseal<{ email: string; exp: number; typ?: string }>(token);
  // Demo mode (local testing only) signs in as a Super Admin
  return s && !s.typ && s.exp > Date.now() ? { email: s.email, name: "Admin", role: "superAdmin" } : null;
});

/** Signs out. The trusted-device cookie is kept, so the OTP stays skipped until its 48h run out. */
export async function endAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (token && ADMIN_MODE === "live") await backend("admin/auth/logout", { token }).catch(() => null);
  jar.delete(ADMIN_COOKIE);
}
