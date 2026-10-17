import { Reddit_Sans } from "next/font/google";
import Box from "@mui/material/Box";
import { CategoryBar, ImportantExams, LatestTicker } from "@/sections/Blog";
import AppDownloadSection from "@/sections/AppDownload/AppDownloadSection";
import { getBlogIndex, getExamUpdates } from "@/services";
import { blogPath } from "@/utils/slug";

/** Blog typography (same family as pw.live blogs). */
const redditSans = Reddit_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });

/** /exams (blogs): exam category bar + "Latest News" ticker on top, the homepage app section at the bottom of every blog page. */
export default async function ExamsLayout({ children }: { children: React.ReactNode }) {
  const [{ categories, posts }, updates] = await Promise.all([getBlogIndex(), getExamUpdates()]);
  return (
    <Box className={redditSans.className} sx={{ "& .MuiTypography-root, & button, & input": { fontFamily: "inherit" } }}>
      <CategoryBar categories={categories} />
      <LatestTicker items={posts.slice(0, 6).map((p) => ({ title: p.title, href: blogPath(p) }))} />
      {children}
      <AppDownloadSection />
      <ImportantExams columns={updates.importantExams} />
    </Box>
  );
}
