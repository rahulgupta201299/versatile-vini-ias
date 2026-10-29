import { Reddit_Sans } from "next/font/google";
import Box from "@mui/material/Box";
import { CategoryBar, ImportantExams, LatestTicker } from "@/sections/Blog";
import AppDownloadSection from "@/sections/AppDownload/AppDownloadSection";
import { getBlogIndex } from "@/services";
import { getSiteData } from "@/services/site";
import { blogPath } from "@/utils/slug";

/** Blog typography (same family as pw.live blogs). */
const redditSans = Reddit_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"], display: "swap" });

/** /exams (blogs and articles): category bar + "Latest News" ticker on top; the app section and "Important Exams" (admin → Footer) at the bottom. */
export default async function ExamsLayout({ children }: { children: React.ReactNode }) {
  const [{ categories, posts }, { config }] = await Promise.all([getBlogIndex(), getSiteData()]);
  const { importantExamsTitle, importantExams } = config.footer;

  return (
    <Box className={redditSans.className} sx={{ "& .MuiTypography-root, & button, & input": { fontFamily: "inherit" } }}>
      <CategoryBar categories={categories} />
      <LatestTicker items={posts.slice(0, 6).map((p) => ({ title: p.title, href: blogPath(p) }))} />
      {children}
      <AppDownloadSection />
      <ImportantExams title={importantExamsTitle} columns={importantExams} />
    </Box>
  );
}
