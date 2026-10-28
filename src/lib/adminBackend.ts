import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE } from "@/lib/adminAuth";
import { API_BASE_URL } from "@/lib/apiBase";

/**
 * Calls the backend as the signed-in admin (server only).
 * The admin's session token lives in an httpOnly cookie on this site and is sent as a Bearer token.
 */
export type BackendResult<T> = { ok: true; status: number; data: T } | { ok: false; status: number; error: string };

export async function adminBackend<T>(path: string, { method = "GET", body }: { method?: string; body?: unknown } = {}): Promise<BackendResult<T>> {
  const token = (await cookies()).get(ADMIN_COOKIE)?.value;

  if (!token) return { ok: false, status: 401, error: "Not signed in." };

  try {
    const res = await fetch(`${API_BASE_URL}/${path}`, {
      method,
      headers: { Accept: "application/json", Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    if (res.status === 204) return { ok: true, status: 204, data: null as T };

    const json = await res.json().catch(() => ({}));

    if (!res.ok) return { ok: false, status: res.status, error: json.message || "Something went wrong. Please try again." };

    return { ok: true, status: res.status, data: json as T };
  } catch {
    return { ok: false, status: 502, error: "Can't reach the server. Please try again." };
  }
}

/** Sends a backend result to the browser as JSON ({ message } on errors). */
export function toJsonResponse<T>(result: BackendResult<T>) {
  if (!result.ok) return NextResponse.json({ message: result.error }, { status: result.status });

  if (result.status === 204) return new NextResponse(null, { status: 204 });

  return NextResponse.json(result.data, { status: result.status });
}
