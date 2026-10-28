import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { headingsOf } from "@/sections/Blog/ArticleBody";
import { HeroSlider, TopRankersSection } from "@/sections";
import { CounsellingForm } from "@/sections/CoursePage";
import { EXAM_CATEGORIES } from "@/data/exams";
import {
  ArticleBody,
  AuthorStrip,
  LanguageSwitcher,
  TableOfContents,
  BlogCover,
  RelatedPosts,
  CategoryTag,
  BlogFaqs,
  DownloadPdfButton,
  PrevNextArticles,
} from "@/sections/Blog";
import {
  getBlogIndex,
  getBlogPost,
  getBlogPosts,
  getHeroBanners,
  getResultBanners,
} from "@/services";
import { blogPath } from "@/utils/slug";
import { COLORS } from "@/theme/colors";

const SITE_URL = "https://viniias.com";

type Params = Promise<{ category: string; slug: string }>;

export async function generateStaticParams() {
  return (await getBlogPosts()).map((p) => ({
    category: p.category,
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getBlogPost(category, slug);

  if (!post) return {};

  const url = blogPath(post);

  return {
    title: `${post.title} | Vini IAS`,
    description: post.excerpt,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url,
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [post.cover || "/images/logo.png"],
    },
  };
}

/** /exams/<category>/<post> — article page. */
export default async function BlogPostPage({ params }: { params: Params }) {
  const { category, slug } = await params;
  const post = await getBlogPost(category, slug);

  if (!post) notFound();

  const [{ posts, names }, heroBanners, resultTabs] = await Promise.all([
    getBlogIndex(),
    getHeroBanners(),
    getResultBanners(),
  ]);
  // counselling form: exams of this post's category (first one pre-selected)
  const examOptions = (
    EXAM_CATEGORIES.find((c) => names[post.category] === c.category)
      ?.subcategories || []
  )
    .map((e) => e.name)
    .slice(0, 12);
  const toc = headingsOf(post.content);
  // posts are newest first: previous = older, next = newer
  const index = posts.findIndex(
    (p) => p.slug === post.slug && p.category === post.category,
  );
  const prev = index >= 0 ? posts[index + 1] : undefined;
  const next = index > 0 ? posts[index - 1] : undefined;
  const categoryName = names[post.category] || post.category;
  // 5 related posts: same exam first, then the newest from other exams
  const others = posts.filter(
    (p) => !(p.slug === post.slug && p.category === post.category),
  );
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 5);
  const url = `${SITE_URL}${blogPath(post)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Vini IAS",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: url,
  };
  const faqJsonLd = post.faqs.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      {/* same promo banner slider as the homepage, above the article */}
      <HeroSlider banners={heroBanners} />
      <Container sx={{ py: { xs: 2, md: 3 } }}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Box
          sx={{
            display: "grid",
            maxWidth: 880,
            mx: "auto",
          }}
        >
          <Box component="article" sx={{ minWidth: 0 }}>
            <Box
              component="nav"
              aria-label="Breadcrumb"
              sx={{
                fontSize: "0.78rem",
                color: COLORS.muted,
                "& a": {
                  color: COLORS.muted,
                  textDecoration: "none",
                  "&:hover": { color: COLORS.red },
                },
              }}
            >
              <Link href="/">Home</Link> › <Link href="/exams">Exams</Link> ›{" "}
              <Link href={`/exams/${post.category}`}>{categoryName}</Link>
            </Box>
            <Box
              sx={{
                mt: 1.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 1,
              }}
            >
              <CategoryTag slug={post.category} name={categoryName} />
              <Box>
                <LanguageSwitcher />
              </Box>
            </Box>
            <Typography
              component="h1"
              sx={{
                mt: 1.25,
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: { xs: "1.5rem", md: "2rem" },
                lineHeight: { xs: "32px", md: "42px" },
                color: "#3D3D3D",
              }}
            >
              {post.title}
            </Typography>
            <Typography
              sx={{
                mt: 1.25,
                fontFamily: "inherit",
                fontSize: "1rem",
                color: "#3F3F46",
                lineHeight: 1.6,
              }}
            >
              {post.excerpt}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <AuthorStrip post={post} url={url} />
            </Box>

            {toc.length > 0 && (
              <Box
                sx={{
                  mt: 2,
                  position: "sticky",
                  top: { xs: 72, lg: 80 },
                  zIndex: 1000,
                }}
              >
                <TableOfContents items={toc} />
              </Box>
            )}

            <Box
              sx={{
                position: "relative",
                mt: 2.5,
                aspectRatio: "16 / 10",
                borderRadius: "18px",
                overflow: "hidden",
              }}
            >
              <BlogCover
                post={post}
                categoryName={categoryName}
                size="lg"
                priority
              />
            </Box>

            <Box sx={{ mt: 3 }}>
              <ArticleBody blocks={post.content} />
            </Box>

            {post.tags.length > 0 && (
              <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap", gap: 1 }}>
                {post.tags.map((t) => (
                  <Box
                    key={t}
                    component="span"
                    sx={{
                      px: 1.25,
                      py: 0.5,
                      borderRadius: "9999px",
                      backgroundColor: COLORS.surface,
                      border: `1px solid ${COLORS.border}`,
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      color: COLORS.navy,
                    }}
                  >
                    #{t}
                  </Box>
                ))}
              </Box>
            )}
            <Box sx={{ mt: 3.5, display: "grid", gap: 3 }}>
              <DownloadPdfButton href={post.pdf || `${blogPath(post)}/pdf`} />
              <BlogFaqs faqs={post.faqs} />
              <PrevNextArticles prev={prev} next={next} />
            </Box>

            <Box sx={{ mt: 5 }}>
              <RelatedPosts posts={related} names={names} />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* homepage toppers + counselling form */}
      <Box>
        <TopRankersSection tabs={resultTabs} stats={[]} hideStats />
        <CounsellingForm
          name={examOptions[0] || categoryName}
          examOptions={examOptions.length ? examOptions : [categoryName]}
        />
      </Box>
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
    </>
  );
}
