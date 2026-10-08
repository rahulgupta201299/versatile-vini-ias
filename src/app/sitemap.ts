import { MetadataRoute } from "next";
import { getFreeResourceSlugs, getGoalEntries } from "@/services";
import { FREE_RESOURCE_BASE } from "@/utils/slug";

const BASE_URL = "https://viniias.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [goals, freeResources] = await Promise.all([getGoalEntries(), getFreeResourceSlugs()]);
  const now = new Date();
  const page = (path: string, priority = 0.8) => ({ url: `${BASE_URL}${path}`, lastModified: now, changeFrequency: "weekly" as const, priority });

  return [
    { url: BASE_URL, lastModified: now, changeFrequency: "daily", priority: 1 },
    ...goals.map((g) => page(`/goal/${g.slug}`)),
    ...freeResources.map((slug) => page(`${FREE_RESOURCE_BASE}/${slug}`)),
  ];
}
