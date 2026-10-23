import { CACHE_TAGS } from "@/lib/api";
import { proxyToBackend } from "@/lib/adminProxy";

export const dynamic = "force-dynamic";

type Context = { params: Promise<{ path: string[] }> };

/** Which website data each homepage section's changes refresh. */
const REFRESH_TAGS: Record<string, string> = {
  "all-exams": CACHE_TAGS.allExams,
  "celebration-banners": CACHE_TAGS.celebration,
  "hero-banners": CACHE_TAGS.homepage,
  "free-resources": CACHE_TAGS.homepage,
  "marketing-banners": CACHE_TAGS.homepage,
  "select-your-goal": CACHE_TAGS.exams,
  "top-rankers": CACHE_TAGS.results,
};

/** /api/admin/homepage/<section>/<path> → backend. Changes refresh that section on the website. */
async function forward(req: Request, { params }: Context) {
  const { path } = await params;

  return proxyToBackend(req, "homepage", path, { refreshTag: REFRESH_TAGS[path[0]] });
}

export { forward as GET, forward as POST, forward as PUT, forward as PATCH };
