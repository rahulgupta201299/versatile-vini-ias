import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { CACHE_TAGS } from "@/lib/api";

const VALID_TAGS = new Set<string>(Object.values(CACHE_TAGS));

/**
 * On-demand refresh after content changes in the backend / CMS:
 *   POST /api/revalidate
 *   x-revalidate-secret: <REVALIDATE_SECRET>
 *   { "tags": ["hero-banners", "result-banners"] }   (or { "tag": "navigation" })
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || req.headers.get("x-revalidate-secret") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json().catch(() => ({}))) as { tag?: string; tags?: string[] };
  const tags = (body.tags ?? (body.tag ? [body.tag] : [])).filter((t) => VALID_TAGS.has(t));
  if (!tags.length) {
    return NextResponse.json({ error: "Send a valid tag", validTags: [...VALID_TAGS] }, { status: 400 });
  }

  tags.forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ revalidated: tags, at: new Date().toISOString() });
}
