import { createHmac, randomInt, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

/**
 * Admin authentication (server only): email + password → 6-digit email OTP → 2-day session cookie.
 *
 * ADMIN_AUTH_MODE
 *   live (default in production) — every step is delegated to the backend (API_BASE_URL):
 *     POST /admin/auth/login   { email, password }        → 200 { challengeId }           (backend emails the OTP)
 *     POST /admin/auth/resend  { challengeId }            → 200
 *     POST /admin/auth/verify  { challengeId, code }      → 200 { token, expiresAt, admin: { email, name? } }
 *     GET  /admin/auth/me      Authorization: Bearer token → 200 { email, name? } | 401
 *     POST /admin/auth/logout  Authorization: Bearer token
 *   The backend owns credentials, OTP delivery, rate limits and the 2-day expiry; the token it returns is kept
 *   in an httpOnly cookie whose lifetime follows `expiresAt`.
 *
 *   demo (default in development) — no email is sent; credentials come from ADMIN_DEMO_EMAIL / ADMIN_DEMO_PASSWORD
 *   and the OTP is 123456. Sessions are HMAC-signed with ADMIN_SESSION_SECRET. Never use demo in production.
 */
export const ADMIN_MODE: "live" | "demo" =
  process.env.ADMIN_AUTH_MODE === "live" || process.env.ADMIN_AUTH_MODE === "demo"
    ? process.env.ADMIN_AUTH_MODE
    : process.env.NODE_ENV === "production"
      ? "live"
      : "demo";

export const ADMIN_COOKIE = "vini_admin_session";
export const SESSION_TTL_MS = 2 * 24 * 60 * 60 * 1000; // 2 days
const CHALLENGE_TTL_MS = 10 * 60 * 1000; // OTP valid for 10 minutes
const MAX_OTP_ATTEMPTS = 5;
export const DEMO_OTP = "123456";

const API_BASE = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");
const SECRET = process.env.ADMIN_SESSION_SECRET || (process.env.NODE_ENV === "production" ? "" : "vini-admin-dev-secret");

export type AdminUser = { email: string; name?: string };

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

/* ---------------- backend calls (live mode) ---------------- */

async function backend(path: string, init: { method?: string; body?: object; token?: string } = {}) {
  if (!API_BASE) throw new Error("API_BASE_URL is not configured");
  const headers: Record<string, string> = { Accept: "application/json" };
  if (init.body) headers["Content-Type"] = "application/json";
  if (init.token) headers.Authorization = `Bearer ${init.token}`;
  const res = await fetch(`${API_BASE}/${path}`, { method: init.method ?? "POST", headers, body: init.body ? JSON.stringify(init.body) : undefined, cache: "no-store", signal: AbortSignal.timeout(10_000) });
  const json = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, json: json as Record<string, unknown> };
}

/* ---------------- steps ---------------- */

type Challenge = { email: string; exp: number; n: number };
export type StepResult<T = object> = ({ ok: true } & T) | { ok: false; status: number; error: string };

const GENERIC_LOGIN_ERROR = "Incorrect email or password.";

/** Step 1 — check credentials and send the OTP. Returns an opaque challenge id for step 2. */
export async function startLogin(email: string, password: string): Promise<StepResult<{ challengeId: string; demo?: boolean }>> {
  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/login", { body: { email, password } }).catch(() => null);
    if (!r) return { ok: false, status: 502, error: "Can't reach the server. Please try again." };
    if (!r.ok || typeof r.json.challengeId !== "string") return { ok: false, status: r.status === 429 ? 429 : 401, error: r.status === 429 ? "Too many attempts. Please wait and try again." : GENERIC_LOGIN_ERROR };
    return { ok: true, challengeId: r.json.challengeId };
  }
  const demoEmail = process.env.ADMIN_DEMO_EMAIL;
  const demoPassword = process.env.ADMIN_DEMO_PASSWORD;
  if (!SECRET || !demoEmail || !demoPassword) return { ok: false, status: 503, error: "Admin login is not configured on this server." };
  const valid = safeEqual(email.toLowerCase(), demoEmail.toLowerCase()) && safeEqual(password, demoPassword);
  if (!valid) return { ok: false, status: 401, error: GENERIC_LOGIN_ERROR };
  return { ok: true, demo: true, challengeId: seal({ email: demoEmail, exp: Date.now() + CHALLENGE_TTL_MS, n: randomInt(1e9) } satisfies Challenge) };
}

export async function resendOtp(challengeId: string): Promise<StepResult> {
  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/resend", { body: { challengeId } }).catch(() => null);
    return r?.ok ? { ok: true } : { ok: false, status: r?.status ?? 502, error: "Couldn't resend the code. Please sign in again." };
  }
  const c = unseal<Challenge>(challengeId);
  return c && c.exp > Date.now() ? { ok: true } : { ok: false, status: 401, error: "Code expired. Please sign in again." };
}

/* best-effort attempt limiter for demo mode (per challenge, per server instance) */
const attempts = new Map<string, number>();

/** Step 2 — verify the 6-digit code and create the 2-day session cookie. */
export async function verifyOtp(challengeId: string, code: string): Promise<StepResult<{ admin: AdminUser }>> {
  if (!/^\d{6}$/.test(code)) return { ok: false, status: 400, error: "Enter the 6-digit code." };
  let token: string;
  let expiresAt: number;
  let admin: AdminUser;

  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/verify", { body: { challengeId, code } }).catch(() => null);
    if (!r) return { ok: false, status: 502, error: "Can't reach the server. Please try again." };
    if (!r.ok || typeof r.json.token !== "string") return { ok: false, status: r.status === 429 ? 429 : 401, error: r.status === 429 ? "Too many attempts. Please sign in again." : "Incorrect or expired code." };
    token = r.json.token;
    const exp = Date.parse(String(r.json.expiresAt ?? ""));
    expiresAt = Number.isFinite(exp) ? exp : Date.now() + SESSION_TTL_MS;
    admin = (r.json.admin as AdminUser) ?? { email: "" };
  } else {
    const c = unseal<Challenge>(challengeId);
    if (!c || c.exp < Date.now()) return { ok: false, status: 401, error: "Code expired. Please sign in again." };
    const used = (attempts.get(challengeId) ?? 0) + 1;
    attempts.set(challengeId, used);
    if (used > MAX_OTP_ATTEMPTS) return { ok: false, status: 429, error: "Too many attempts. Please sign in again." };
    if (!safeEqual(code, DEMO_OTP)) return { ok: false, status: 401, error: "Incorrect code. Please try again." };
    attempts.delete(challengeId);
    expiresAt = Date.now() + SESSION_TTL_MS;
    admin = { email: c.email, name: "Admin" };
    token = seal({ email: c.email, exp: expiresAt });
  }

  (await cookies()).set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(expiresAt),
  });
  return { ok: true, admin };
}

/** Current admin from the session cookie, or null. Use in server components / route handlers under /admin. */
export async function getAdminSession(): Promise<AdminUser | null> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  if (ADMIN_MODE === "live") {
    const r = await backend("admin/auth/me", { method: "GET", token }).catch(() => null);
    return r?.ok && typeof r.json.email === "string" ? (r.json as AdminUser) : null;
  }
  const s = unseal<{ email: string; exp: number }>(token);
  return s && s.exp > Date.now() ? { email: s.email, name: "Admin" } : null;
}

export async function endAdminSession() {
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (token && ADMIN_MODE === "live") await backend("admin/auth/logout", { token }).catch(() => null);
  jar.delete(ADMIN_COOKIE);
}
