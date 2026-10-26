import { CACHE_TAGS } from "@/lib/api";
import { proxyToBackend } from "@/lib/adminProxy";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ path?: string[] }> };

/** /api/admin/header/<path> → backend. Changes refresh the header menus on every website page. */
async function forward(req: Request, { params }: Context) {
  const { path = [] } = await params;

  return proxyToBackend(req, "header", path, { refreshTag: CACHE_TAGS.navigation });
}

export { forward as GET, forward as PUT };
