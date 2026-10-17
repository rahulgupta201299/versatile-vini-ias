import { MetadataRoute } from "next";
import { getBlogCategories, getBlogPosts, getCourseSectionSlugs, getGoalEntries } from "@/services";
import { blogPath } from "@/utils/slug";
import { COURSE_SECTIONS } from "@/utils/slug";

const BASE_URL = "https://viniias.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = Object.values(COURSE_SECTIONS);
  const [goals, blogCategories, posts, ...sectionSlugs] = await Promise.all([getGoalEntries(), getBlogCategories(), getBlogPosts(), ...sections.map((s) => getCourseSectionSlugs(s))]);
  const now = new Date();
  const page = (path: string, priority = 0.8) => ({ url: `${BASE_URL}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority });

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...goals.map((g) => page(`/goal/${g.slug}`)),
    ...sections.flatMap((section, i) => sectionSlugs[i].map((slug) => page(`/courses/${section}/${slug}`))),
    page("/about-us", 0.6),
    page("/careers", 0.6),
    page("/contact-us", 0.6),
    page("/terms-and-conditions", 0.3),
    page("/privacy-policy", 0.3),
    page("/refund-policy", 0.3),
    page("/exams", 0.9),
    ...blogCategories.map((c) => page(`/exams/${c.slug}`, 0.7)),
    ...posts.map((p) => ({ ...page(blogPath(p), 0.7), lastModified: new Date(p.publishedAt) })),
  ];
}
