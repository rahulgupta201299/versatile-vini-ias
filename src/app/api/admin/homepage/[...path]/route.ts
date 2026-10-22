import { CACHE_TAGS } from "@/lib/api";
import { proxyToBackend } from "@/lib/adminProxy";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ path: string[] }> };

/** /api/admin/homepage/<path> → backend. Changes refresh the website's All Exams data. */
async function forward(req: Request, { params }: Context) {
  const { path } = await params;

  return proxyToBackend(req, "homepage", path, { refreshTag: CACHE_TAGS.allExams });
}

export { forward as GET, forward as POST, forward as PUT, forward as PATCH };
