import { cache } from "react";
import { fetchApi, CACHE_TAGS } from "@/lib/api";
import { CoursePageData } from "@/types";
import { buildCoursePage, buildGoalEntries } from "@/data/coursePages";
import { getSiteData } from "./site";

/** Every exam with a goal page (from the server's mega menu + exam categories). */
export const getGoalEntries = cache(async () => {
  const { navigation, examCategories } = await getSiteData();
  return buildGoalEntries(navigation.megaMenu, examCategories);
});

/** Slugs built at deploy time ("All Exams" courses); every other goal page renders on first visit. */
export const getPrerenderedGoalSlugs = cache(async () => {
  const { navigation } = await getSiteData();
  const slugs = navigation.megaMenu.flatMap((c) => c.courses.map((co) => co.title));
  return [...new Set((await getGoalEntries()).filter((e) => slugs.includes(e.name)).map((e) => e.slug))];
});

/**
 * One goal page: GET /goals/<slug>. Falls back to a page generated from the exam name,
 * or null when the exam is unknown (→ 404).
 */
export const getGoalPage = cache(async (slug: string): Promise<CoursePageData | null> => {
  const entries = await getGoalEntries();
  const entry = entries.find((e) => e.slug === slug);
  return fetchApi<CoursePageData | null>(`goals/${encodeURIComponent(slug)}`, {
    fallback: entry ? buildCoursePage(entry, entries) : null,
    tags: [CACHE_TAGS.goals],
  });
});
