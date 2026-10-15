import { getBlogIndex, getBlogPost, getBlogPosts } from "@/services";
import { renderBlogPdf } from "@/lib/blogPdf";

export const runtime = "nodejs";
export const dynamicParams = true;

/** PDFs are built with the articles (SSG) and refreshed with them. */
export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ category: p.category, slug: p.slug }));
}

/** GET /exams/<category>/<post>/pdf — the article as a branded PDF download. */
export async function GET(_req: Request, { params }: { params: Promise<{ category: string; slug: string }> }) {
  const { category, slug } = await params;
  const post = await getBlogPost(category, slug);
  if (!post) return new Response("Not found", { status: 404 });

  const { posts, names } = await getBlogIndex();
  const others = posts.filter((p) => !(p.slug === post.slug && p.category === post.category));
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 10);

  const pdf = await renderBlogPdf(post, names[post.category] ?? post.category, related);
  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${post.slug}.pdf"`,
      "Cache-Control": "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
    },
  });
}
