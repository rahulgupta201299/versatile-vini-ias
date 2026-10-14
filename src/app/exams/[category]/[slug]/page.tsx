import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArticleBody, AuthorStrip, LanguageSwitcher, BlogCover, BlogSidebar, CategoryTag, PostCard, SectionTitle, ShareButtons } from "@/sections/Blog";
import { getBlogIndex, getBlogPost, getBlogPosts } from "@/services";
import { blogPath } from "@/utils/slug";
import { COLORS } from "@/theme/colors";

const SITE_URL = "https://viniias.com";
type Params = Promise<{ category: string; slug: string }>;

/** Every post is built ahead of time (SSG); new posts render on first visit, then stay cached. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getBlogPost(category, slug);
  if (!post) return {};
  const url = blogPath(post);
  return {
    title: `${post.title} | Vini IAS`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: { type: "article", title: post.title, description: post.excerpt, url, publishedTime: post.publishedAt, authors: [post.author], images: [post.cover ?? "/images/logo.png"] },
  };
}

/** /exams/<category>/<post> — article page. */
export default async function BlogPostPage({ params }: { params: Params }) {
  const { category, slug } = await params;
  const post = await getBlogPost(category, slug);
  if (!post) notFound();
  const { posts, names } = await getBlogIndex();
  const categoryName = names[post.category] ?? post.category;
  const related = posts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3);
  const more = related.length ? related : posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const url = `${SITE_URL}${blogPath(post)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: { "@type": "Organization", name: "Vini IAS", logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` } },
    mainEntityOfPage: url,
  };

  return (
    <Container sx={{ py: { xs: 3, md: 4 } }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 340px" }, gap: 4 }}>
        <Box component="article" sx={{ minWidth: 0 }}>
          <Box component="nav" aria-label="Breadcrumb" sx={{ fontSize: "0.78rem", color: COLORS.muted, "& a": { color: COLORS.muted, textDecoration: "none", "&:hover": { color: COLORS.red } } }}>
            <Link href="/">Home</Link> › <Link href="/exams">Exams</Link> › <Link href={`/exams/${post.category}`}>{categoryName}</Link>
          </Box>
          <Box sx={{ mt: 1.5, display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <CategoryTag slug={post.category} name={categoryName} />
            <LanguageSwitcher />
          </Box>
          <Typography component="h1" sx={{ mt: 1.25, fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, lineHeight: 1.25, color: COLORS.navy }}>{post.title}</Typography>
          <Typography sx={{ mt: 1.25, fontSize: { xs: "1rem", md: "1.1rem" }, color: COLORS.body, lineHeight: 1.7 }}>{post.excerpt}</Typography>
          <Box sx={{ mt: 2 }}>
            <AuthorStrip post={post} />
          </Box>

          <Box sx={{ position: "relative", mt: 2.5, aspectRatio: "16 / 10", borderRadius: "18px", overflow: "hidden" }}>
            <BlogCover post={post} categoryName={categoryName} size="lg" priority />
          </Box>

          <Box sx={{ mt: 3 }}>
            <ArticleBody blocks={post.content} />
          </Box>

          {post.tags.length > 0 && (
            <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {post.tags.map((t) => (
                <Box key={t} component="span" sx={{ px: 1.25, py: 0.5, borderRadius: "9999px", backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, fontSize: "0.78rem", fontWeight: 700, color: COLORS.navy }}>#{t}</Box>
              ))}
            </Box>
          )}
          <Box sx={{ mt: 2.5, pt: 2.5, borderTop: `1px solid ${COLORS.border}` }}>
            <ShareButtons title={post.title} url={url} />
          </Box>

          <Box component="section" aria-label="Related articles" sx={{ mt: 5 }}>
            <SectionTitle title={related.length ? `More from ${categoryName}` : "More Articles"} href={`/exams/${post.category}`} />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 2.5 }}>
              {more.map((p) => <PostCard key={p.slug} post={p} categoryName={names[p.category]} />)}
            </Box>
          </Box>
        </Box>

        <BlogSidebar latest={posts.filter((p) => p.slug !== post.slug).slice(0, 5)} names={names} />
      </Box>
    </Container>
  );
}
