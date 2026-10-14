import { CategoryBar, LatestTicker } from "@/sections/Blog";
import { getBlogIndex } from "@/services";
import { blogPath } from "@/utils/slug";

/** /exams (blogs): exam category bar under the header + "Latest News" ticker on every blog page. */
export default async function ExamsLayout({ children }: { children: React.ReactNode }) {
  const { categories, posts } = await getBlogIndex();
  return (
    <>
      <CategoryBar categories={categories} />
      <LatestTicker items={posts.slice(0, 6).map((p) => ({ title: p.title, href: blogPath(p) }))} />
      {children}
    </>
  );
}
