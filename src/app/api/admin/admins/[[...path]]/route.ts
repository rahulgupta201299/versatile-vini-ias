import { proxyToBackend } from "@/lib/adminProxy";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ path?: string[] }> };

/** /api/admin/admins[/<path>] → backend (admin users — Super Admins and Admins; the backend checks). */
async function forward(req: Request, { params }: Context) {
  const { path } = await params;

  return proxyToBackend(req, "admins", path);
}

export { forward as GET, forward as POST, forward as PATCH };
