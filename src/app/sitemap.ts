import { MetadataRoute } from "next";
import { getCourseSectionSlugs, getGoalEntries } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";

const BASE_URL = "https://viniias.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = Object.values(COURSE_SECTIONS);
  const [goals, ...sectionSlugs] = await Promise.all([getGoalEntries(), ...sections.map((s) => getCourseSectionSlugs(s))]);
  const now = new Date();
  const page = (path: string, priority = 0.8) => ({ url: `${BASE_URL}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority });

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...goals.map((g) => page(`/goal/${g.slug}`)),
    ...sections.flatMap((section, i) => sectionSlugs[i].map((slug) => page(`/courses/${section}/${slug}`))),
  ];
}
