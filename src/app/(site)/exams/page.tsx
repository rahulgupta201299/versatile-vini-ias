import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BlogSidebar, FeaturedPost, LatestUpdates, PostCard, PostRow, SectionTitle } from "@/sections/Blog";
import { getBlogIndex, getExamUpdates } from "@/services";
import { COLORS } from "@/theme/colors";

export const metadata: Metadata = {
  title: "Exam News, Strategy & Preparation Blogs | Vini IAS",
  description: "Latest exam news, notifications, strategy and preparation tips for UPSC, State PSC, SSC, Railways, Teaching, Banking and more.",
  alternates: { canonical: "/exams" },
};

/** /exams — lead story + latest list, category blocks and sidebar (newspaper-style). */
export default async function ExamsBlogHome() {
  const [{ categories, posts, names, counts }, updates] = await Promise.all([getBlogIndex(), getExamUpdates()]);
  const lead = posts.find((p) => p.featured) || posts[0];
  const side = posts.filter((p) => p !== lead).slice(0, 4);
  const withPosts = categories.filter((c) => counts[c.slug]);

  return (
    <Container sx={{ py: { xs: 3, md: 4 } }}>
      <Typography component="h1" sx={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>Exam News & Preparation Blogs</Typography>

      {/* Latest: lead story + 4 rows */}
      {lead && (
        <Box component="section" aria-label="Latest stories" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.55fr) minmax(0, 1fr)" }, gap: { xs: 2, md: 3 }, alignItems: "start" }}>
          <FeaturedPost post={lead} categoryName={names[lead.category]} />
          <Box sx={{ p: 2, borderRadius: "18px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
            <SectionTitle title="Top Stories" as="h2" />
            <Box sx={{ "& > article + article": { borderTop: `1px dashed ${COLORS.border}` } }}>
              {side.map((p) => <PostRow key={p.slug} post={p} categoryName={names[p.category]} />)}
            </Box>
          </Box>
        </Box>
      )}

      {/* Notifications / Admit Cards / Results */}
      <LatestUpdates boards={updates.boards} />

      <Box sx={{ mt: { xs: 4, md: 5 }, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 340px" }, gap: { xs: 4, lg: 4 } }}>
        <Box sx={{ display: "grid", gap: { xs: 4, md: 5 }, alignContent: "start" }}>
          {/* category blocks, two per row on desktop */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 4, md: 4 } }}>
            {withPosts.map((c) => {
              const list = posts.filter((p) => p.category === c.slug);
              const [first, ...rest] = list;

              return (
                <Box component="section" key={c.slug} aria-label={`${c.name} news`}>
                  <SectionTitle title={`${c.name} News`} href={`/exams/${c.slug}`} />
                  <PostCard post={first} categoryName={c.name} />
                  <Box sx={{ mt: 0.5, "& > article + article": { borderTop: `1px dashed ${COLORS.border}` } }}>
                    {rest.slice(0, 3).map((p) => <PostRow key={p.slug} post={p} categoryName={c.name} />)}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* all posts grid */}
          <Box component="section" aria-label="Recent articles">
            <SectionTitle title="Recent Articles" />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", xl: "repeat(3, minmax(0, 1fr))" }, gap: 2.5 }}>
              {posts.slice(0, 6).map((p) => <PostCard key={p.slug} post={p} categoryName={names[p.category]} />)}
            </Box>
          </Box>
        </Box>

        <BlogSidebar latest={posts.slice(0, 5)} names={names} />
      </Box>
    </Container>
  );
}
