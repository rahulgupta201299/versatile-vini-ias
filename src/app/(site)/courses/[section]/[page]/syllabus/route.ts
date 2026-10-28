import { getCourseSyllabus } from "@/services";

type Context = { params: Promise<{ section: string; page: string }> };

const DATA_URL_PATTERN = /^data:([\w/.+-]+);base64,(.*)$/s;

/** /courses/<section>/<page>/syllabus — the syllabus uploaded in the admin, opened in the browser. */
export async function GET(_req: Request, { params }: Context) {
  const { section, page } = await params;
  const syllabus = await getCourseSyllabus(section, page);
  const [, contentType, base64] = syllabus?.file.match(DATA_URL_PATTERN) || [];

  if (!contentType) return new Response("Syllabus not found.", { status: 404 });

  const fileName = (syllabus?.fileName || "syllabus").replace(/[^\w.-]+/g, "-");

  return new Response(Buffer.from(base64, "base64"), {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": `inline; filename="${fileName}"`,
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
