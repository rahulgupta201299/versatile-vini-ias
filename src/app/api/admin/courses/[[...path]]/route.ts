import { CACHE_TAGS } from "@/lib/api";
import { proxyToBackend } from "@/lib/adminProxy";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ path?: string[] }> };

/** /api/admin/courses/<path> → backend. Changes refresh the course pages on the website. */
async function forward(req: Request, { params }: Context) {
  const { path = [] } = await params;

  return proxyToBackend(req, "courses", path, { refreshTag: CACHE_TAGS.freeResources });
}

export { forward as GET, forward as PUT };
