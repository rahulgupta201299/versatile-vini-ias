import { CACHE_TAGS } from "@/lib/api";
import { proxyToBackend } from "@/lib/adminProxy";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ path?: string[] }> };

/** /api/admin/footer/<path> → backend. Changes refresh the footer on every website page. */
async function forward(req: Request, { params }: Context) {
  const { path = [] } = await params;

  return proxyToBackend(req, "footer", path, { refreshTag: CACHE_TAGS.siteConfig });
}

export { forward as GET, forward as PUT };
