import { MetadataRoute } from "next";
import { ALL_COURSE_SLUGS } from "@/data/coursePages";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://viniias.com";
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    ...ALL_COURSE_SLUGS.map((slug) => ({
      url: `${baseUrl}/goal/${slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
