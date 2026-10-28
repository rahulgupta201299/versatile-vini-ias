import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE = "vini_admin_session";

/**
 * Admin gate: any /admin page without a session cookie goes to /admin/login.
 * (The cookie is fully validated server-side in the admin pages — this only avoids rendering them for signed-out users.)
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const res = pathname.startsWith("/admin/login") || req.cookies.has(ADMIN_COOKIE)
    ? NextResponse.next()
    : NextResponse.redirect(new URL(`/admin/login?next=${encodeURIComponent(pathname + search)}`, req.url));

  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");

  return res;
}

export const config = { matcher: ["/admin", "/admin/:path*"] };
