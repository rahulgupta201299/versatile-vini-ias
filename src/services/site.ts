import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { ExamGoalCategory, NavigationData, SiteConfig, SiteData } from "@/types";
import { MOBILE_MENU_SECTIONS, NAV_ITEMS, SEARCH_TRENDING, STORE_HREF } from "@/data/navigation";
import { getExamMenu, toMegaMenu } from "./exams";
import { SITE_CONFIG } from "@/data/siteConfig";
import { slugify } from "@/utils/slug";

/*
 * Site-wide data (header, menus, search, footer, contact). `cache()` dedupes calls within one
 * request, and fetchApi's ISR cache shares the result across requests.
 */

/** Header menus. The "All Exams" mega menu comes from the All Exams API (managed in the admin panel). */
const getNavigation = cache(async (): Promise<NavigationData> => {
  const [navigation, examMenu] = await Promise.all([
    fetchApi<Omit<NavigationData, "megaMenu">>("navigation", {
      fallback: { navItems: NAV_ITEMS, mobileMenu: MOBILE_MENU_SECTIONS, searchTrending: SEARCH_TRENDING, storeHref: STORE_HREF },
      revalidate: REVALIDATE.slow,
      tags: [CACHE_TAGS.navigation],
    }),
    getExamMenu(),
  ]);

  return { ...navigation, megaMenu: toMegaMenu(examMenu) };
});

/** "Select Your Goal" categories and exams (Web → Homepage → Select Your Goal in the admin). Active only. */
const getExamCategories = cache(() =>
  fetchApi<ExamGoalCategory[]>("select-your-goal", { fallback: [], revalidate: REVALIDATE.slow, tags: [CACHE_TAGS.exams], isValid: Array.isArray })
);

export const getSiteConfig = cache(() =>
  fetchApi<SiteConfig>("site-config", { fallback: SITE_CONFIG, revalidate: REVALIDATE.slow, tags: [CACHE_TAGS.siteConfig] })
);

/** Display names for route segments, so breadcrumbs can label any URL. */
function buildRouteLabels(navigation: NavigationData, examCategories: ExamGoalCategory[]) {
  const labels: Record<string, string> = { goal: "Goal", courses: "Courses", "free-resources": "Free Resources", "current-affairs": "Current Affairs", "ethics-essay": "Ethics & Essay", "monthly-magazine": "Monthly Magazine", "prism-simplified": "PRISM Simplified" };
  const add = (slug: string, label: string) => {
    if (slug && !labels[slug]) labels[slug] = label;
  };
  for (const item of navigation.navItems) {
    add(slugify(item.label), item.label);
    for (const child of item.children ?? []) {
      const last = child.href.split(/[?#]/)[0].split("/").filter(Boolean).pop();
      if (last) add(last, child.label);
    }
  }
  navigation.megaMenu.forEach((cat) => cat.courses.forEach((c) => add(slugify(c.title), c.title)));
  examCategories.forEach((cat) => cat.subcategories.forEach((s) => add(slugify(s.name), s.name)));
  return labels;
}

/** Everything the root layout needs, fetched in parallel. */
export const getSiteData = cache(async (): Promise<SiteData> => {
  const [navigation, examCategories, config] = await Promise.all([getNavigation(), getExamCategories(), getSiteConfig()]);
  return { navigation, examCategories, config, routeLabels: buildRouteLabels(navigation, examCategories) };
});
