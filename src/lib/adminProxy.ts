import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { adminBackend, toJsonResponse } from "@/lib/adminBackend";

/**
 * Forwards an admin request to the backend: /api/admin/<section>/<path> → backend /api/admin/<section>/<path>,
 * with the admin's session token. `refreshTag` (optional) is refreshed on the website after every change.
 */
export async function proxyToBackend(req: Request, section: string, path: string[] = [], { refreshTag }: { refreshTag?: string } = {}) {
  try {
    const { method } = req;
    const body = method === "GET" ? undefined : await req.json().catch(() => ({}));
    const target = [`admin/${section}`, ...path.map(encodeURIComponent)].join("/");
    const result = await adminBackend(target, { method, body });

    if (result.ok && method !== "GET" && refreshTag) revalidateTag(refreshTag);

    return toJsonResponse(result);
  } catch (error) {
    console.error(`[admin proxy: ${section}]`, error);

    return NextResponse.json({ message: "The server ran into a problem. Please try again in a minute." }, { status: 500 });
  }
}
