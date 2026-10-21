import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { adminBackend, toJsonResponse } from "@/lib/adminBackend";
import { CACHE_TAGS } from "@/lib/api";

export const dynamic = "force-dynamic";

/**
 * Admin panel → backend proxy for homepage content: /api/admin/homepage/<path> → backend /api/admin/homepage/<path>.
 * Adds the admin's session token. Every successful change refreshes the website's All Exams data.
 */
type Context = { params: Promise<{ path: string[] }> };

async function forward(req: Request, { params }: Context) {
  try {
    const { path } = await params;
    const { method } = req;
    const body = method === "GET" ? undefined : await req.json().catch(() => ({}));
    const result = await adminBackend(`admin/homepage/${path.map(encodeURIComponent).join("/")}`, { method, body });

    if (result.ok && method !== "GET") revalidateTag(CACHE_TAGS.allExams);

    return toJsonResponse(result);
  } catch (error) {
    console.error("[admin proxy]", error);

    return NextResponse.json({ message: "The server ran into a problem. Please try again in a minute." }, { status: 500 });
  }
}

export { forward as GET, forward as POST, forward as PUT, forward as PATCH };
