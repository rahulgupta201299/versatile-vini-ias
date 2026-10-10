import { cache } from "react";
import { fetchApi, CACHE_TAGS } from "@/lib/api";
import { FreeResourcePage } from "@/types";
import { FREE_RESOURCES } from "@/data/freeResources";
import { MENTORSHIP_PAGES } from "@/data/mentorshipPages";
import { GS_MAINS_PAGES } from "@/data/gsMainsPages";
import { CSAT_PAGES } from "@/data/csatPages";
import { OPTIONAL_PAGES } from "@/data/optionalPages";
import { COURSE_SECTIONS } from "@/utils/slug";
import { getSiteData } from "./site";

/** Local fallback content per course section (/courses/<section>/<page>). */
const LOCAL_PAGES: Record<string, FreeResourcePage[]> = {
  [COURSE_SECTIONS.gsFoundation]: FREE_RESOURCES,
  [COURSE_SECTIONS.mentorship]: MENTORSHIP_PAGES,
  [COURSE_SECTIONS.gsMains]: GS_MAINS_PAGES,
  [COURSE_SECTIONS.csat]: CSAT_PAGES,
  [COURSE_SECTIONS.optional]: OPTIONAL_PAGES,
};

/** Page slugs of a section — taken from the menu links that point at /courses/<section>/… */
export const getCourseSectionSlugs = cache(async (section: string) => {
  const { navigation } = await getSiteData();
  const prefix = `/courses/${section}/`;
  const slugs = navigation.navItems
    .flatMap((item) => item.children ?? [])
    .map((child) => child.href)
    .filter((href) => href.startsWith(prefix))
    .map((href) => href.slice(prefix.length).split(/[/?#]/)[0]);
  return [...new Set(slugs)];
});

/** One course page: GET /courses/<section>/<slug> (falls back to local content, else null → 404). */
export const getCourseSectionPage = cache((section: string, slug: string) =>
  fetchApi<FreeResourcePage | null>(`courses/${section}/${encodeURIComponent(slug)}`, {
    fallback: LOCAL_PAGES[section]?.find((p) => p.slug === slug) ?? null,
    tags: [CACHE_TAGS.freeResources],
  })
);

/* GS Foundation shortcuts */
export const getFreeResourceSlugs = () => getCourseSectionSlugs(COURSE_SECTIONS.gsFoundation);
export const getFreeResourcePage = (slug: string) => getCourseSectionPage(COURSE_SECTIONS.gsFoundation, slug);
