import { createHmac, timingSafeEqual } from "crypto";

/**
 * Careers application helpers (server only).
 *  - CAREERS_OTP_MODE=demo (default): no message is sent, the OTP is DEMO_OTP — for testing only.
 *  - CAREERS_OTP_MODE=live: OTP + applications are forwarded to the backend (API_BASE_URL).
 * A verified phone gets a signed, time-limited token that /api/careers/apply checks.
 */
export const OTP_LIVE = process.env.CAREERS_OTP_MODE === "live";
export const DEMO_OTP = "123456";
const SECRET = process.env.CAREERS_OTP_SECRET || "vini-careers-dev-secret";
const TOKEN_TTL_MS = 2 * 60 * 60 * 1000; // 2 hours — lets a candidate apply to several roles in one sitting

export const API_BASE = (process.env.API_BASE_URL ?? "").replace(/\/+$/, "");
export const API_TOKEN = process.env.API_TOKEN;

export const isIndianMobile = (v: unknown): v is string => typeof v === "string" && /^[6-9]\d{9}$/.test(v);

const sign = (payload: string) => createHmac("sha256", SECRET).update(payload).digest("base64url");

export function issueVerifiedToken(phone: string): string {
  const exp = Date.now() + TOKEN_TTL_MS;
  const payload = `${phone}.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function readVerifiedToken(token: unknown): string | null {
  if (typeof token !== "string") return null;
  const [phone, exp, sig] = token.split(".");
  if (!phone || !exp || !sig || Number(exp) < Date.now()) return null;
  const expected = Buffer.from(sign(`${phone}.${exp}`));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given) ? phone : null;
}

export async function backendPost(path: string, body: BodyInit, json = true) {
  const headers: Record<string, string> = {};
  if (json) headers["Content-Type"] = "application/json";
  if (API_TOKEN) headers.Authorization = `Bearer ${API_TOKEN}`;
  return fetch(`${API_BASE}/${path}`, { method: "POST", headers, body, cache: "no-store" });
}
