import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Newspaper } from "lucide-react";
import { BlogSidebar, PostCard } from "@/sections/Blog";
import { getBlogCategories, getBlogCategory, getBlogIndex } from "@/services";
import { COLORS } from "@/theme/colors";

type Params = Promise<{ category: string }>;

export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getBlogCategories()).map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { category } = await params;
  const c = await getBlogCategory(category);
  if (!c) return {};
  return { title: `${c.name} Exam News & Preparation Blogs | Vini IAS`, description: c.description, alternates: { canonical: `/exams/${c.slug}` } };
}

/** /exams/<category> — all posts of one exam category. */
export default async function ExamCategoryPage({ params }: { params: Params }) {
  const { category } = await params;
  const c = await getBlogCategory(category);
  if (!c) notFound();
  const { categories, posts, names, counts } = await getBlogIndex();
  const list = posts.filter((p) => p.category === c.slug);

  return (
    <Container sx={{ py: { xs: 3, md: 4 } }}>
      <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: "20px", background: "linear-gradient(115deg, #FFFFFF 0%, #FFF8F1 55%, #FBEFE3 100%)", border: `1px solid ${COLORS.border}` }}>
        <Box component="nav" aria-label="Breadcrumb" sx={{ fontSize: "0.78rem", color: COLORS.muted, "& a": { color: COLORS.muted, textDecoration: "none", "&:hover": { color: COLORS.red } } }}>
          <Link href="/">Home</Link> › <Link href="/exams">Exams</Link> › <Box component="span" sx={{ color: COLORS.navy, fontWeight: 700 }}>{c.name}</Box>
        </Box>
        <Typography component="h1" sx={{ mt: 1, fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.4rem" }, color: COLORS.navy }}>
          {c.name} <Box component="span" sx={{ color: COLORS.red }}>News & Articles</Box>
        </Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.body, maxWidth: 720 }}>{c.description}</Typography>
      </Box>

      <Box sx={{ mt: { xs: 3, md: 4 }, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 340px" }, gap: 4 }}>
        {list.length ? (
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 2.5, alignContent: "start" }}>
            {list.map((p) => <PostCard key={p.slug} post={p} categoryName={c.name} />)}
          </Box>
        ) : (
          <Box sx={{ p: 4, borderRadius: "16px", border: `1px dashed ${COLORS.border}`, textAlign: "center", color: COLORS.muted, alignSelf: "start" }}>
            <Newspaper size={36} color={COLORS.red} />
            <Typography sx={{ mt: 1, fontWeight: 800, color: COLORS.navy }}>Articles coming soon</Typography>
            <Typography sx={{ mt: 0.5, fontSize: "0.9rem" }}>We&apos;re preparing {c.name} news and preparation guides. Check back shortly.</Typography>
          </Box>
        )}
        <BlogSidebar latest={posts.slice(0, 5)} categories={categories} counts={counts} names={names} />
      </Box>
    </Container>
  );
}
