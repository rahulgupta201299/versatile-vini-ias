import { cache } from "react";
import { fetchApi, CACHE_TAGS } from "@/lib/api";
import { FreeResourcePage } from "@/types";
import { FREE_RESOURCES } from "@/data/freeResources";
import { MENTORSHIP_PAGES } from "@/data/mentorshipPages";
import { GS_MAINS_PAGES } from "@/data/gsMainsPages";
import { CSAT_PAGES } from "@/data/csatPages";
import { OPTIONAL_PAGES } from "@/data/optionalPages";
import { ETHICS_ESSAY_PAGES } from "@/data/ethicsEssayPages";
import { PLAN_B_PAGES } from "@/data/planBPages";
import { FREE_RESOURCE_SECTION_PAGES } from "@/data/currentAffairsPages";
import { COURSE_SECTIONS } from "@/utils/slug";
import { getSiteData } from "./site";

/** Local fallback content per course section (/courses/<section>/<page>). */
const LOCAL_PAGES: Record<string, FreeResourcePage[]> = {
  [COURSE_SECTIONS.gsFoundation]: FREE_RESOURCES,
  [COURSE_SECTIONS.mentorship]: MENTORSHIP_PAGES,
  [COURSE_SECTIONS.gsMains]: GS_MAINS_PAGES,
  [COURSE_SECTIONS.csat]: CSAT_PAGES,
  [COURSE_SECTIONS.optional]: OPTIONAL_PAGES,
  [COURSE_SECTIONS.ethicsEssay]: ETHICS_ESSAY_PAGES,
  [COURSE_SECTIONS.upscPlanB]: PLAN_B_PAGES,
  [COURSE_SECTIONS.freeResources]: FREE_RESOURCE_SECTION_PAGES,
};

/** Page slugs of a section — taken from the menu links that point at /courses/<section>/… */
export const getCourseSectionSlugs = cache(async (section: string) => {
  const { navigation } = await getSiteData();
  const prefix = `/courses/${section}/`;
  const hrefs = [
    ...navigation.navItems.flatMap((item) => item.children || []).map((child) => child.href),
    ...navigation.mobileMenu.flatMap((section) => section.items).map((item) => item.href),
  ];
  const slugs = hrefs
    .filter((href) => href.startsWith(prefix))
    .map((href) => href.slice(prefix.length).split(/[/?#]/)[0]);

  return [...new Set(slugs)];
});

/** One course page: GET /courses/<section>/<slug> (falls back to local content, else null → 404). */
export const getCourseSectionPage = cache((section: string, slug: string) =>
  fetchApi<FreeResourcePage | null>(`courses/${section}/${encodeURIComponent(slug)}`, {
    fallback: LOCAL_PAGES[section]?.find((p) => p.slug === slug) || null,
    tags: [CACHE_TAGS.freeResources],
  })
);
