/**
 * Requests from admin screens (browser) to /api/admin/... with friendly errors:
 *   offline / server unreachable, session ended (→ sign-in page), server problems (5xx) and validation messages.
 * Throws an Error whose message can be shown to the admin as is.
 */
type AdminRequestOptions = { method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"; body?: unknown };

const OFFLINE = "Can't reach the server — check your internet connection and try again.";
const SERVER_PROBLEM = "The server ran into a problem. Please try again in a minute.";

export async function adminRequest<T>(path: string, { method = "GET", body }: AdminRequestOptions = {}): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`/api/admin/${path}`, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(OFFLINE);
  }

  if (response.status === 401) {
    window.location.assign(`/admin/login?next=${encodeURIComponent(window.location.pathname)}`);
    throw new Error("Your session has ended. Please sign in again.");
  }

  const json = await response.json().catch(() => null);

  if (!response.ok) throw new Error(json?.message ?? (response.status >= 500 ? SERVER_PROBLEM : "Something went wrong. Please try again."));

  return json as T;
}
