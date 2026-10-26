import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { ExamGoalCategory, FooterData, FooterLinkData, FooterSectionsData, NavigationData, SiteConfig, SiteData } from "@/types";
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

const NO_FOOTER_SECTIONS: FooterSectionsData = { company: null, freeLearningResources: null, ecosystemBrands: null };

/** Footer sections (admin → Footer). A switched-off or deleted section is null. */
/**
 * Bump when the shape of GET /footer changes: the version is part of the cached request, so a deploy never
 * shows a cached response in the old shape (the cache can outlive a deploy for up to an hour otherwise).
 */
const FOOTER_DATA_VERSION = 3;

/** GET /footer in the current shape (company as titled columns); an old-shape response counts as invalid → fallback. */
const isFooterData = (data: unknown): data is FooterSectionsData => {
  if (typeof data !== "object" || data === null || !("company" in data)) return false;

  const { company } = data as { company: { columns?: unknown } | null };

  return !company || Array.isArray(company.columns);
};

const getFooterSections = cache(() =>
  fetchApi<FooterSectionsData>(`footer?v=${FOOTER_DATA_VERSION}`, {
    fallback: NO_FOOTER_SECTIONS,
    revalidate: REVALIDATE.slow,
    tags: [CACHE_TAGS.siteConfig],
    isValid: isFooterData,
  })
);

const toLinkItems = (links: FooterLinkData[]) => links.map(({ text, link, badge }) => ({ name: text, href: link, ...(badge && { badge }) }));

/** The footer from the sections managed in the admin; empty columns are left out. */
const withFooterSections = (footer: FooterData, { company, freeLearningResources, ecosystemBrands }: FooterSectionsData): FooterData => ({
  ...footer,
  columns: (company?.columns || [])
    .filter(({ links }) => links.length)
    .map(({ title, style = "links", links }) => ({ title, style, links: toLinkItems(links) })),
  learningResourcesTitle: freeLearningResources?.title || "",
  learningResources: freeLearningResources ? freeLearningResources.columns.map(({ title, links }) => ({ title, links: toLinkItems(links) })) : [],
  brandsTitle: ecosystemBrands?.title || "",
  brands: ecosystemBrands ? toLinkItems(ecosystemBrands.links) : [],
});

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
  const [navigation, examCategories, siteConfig, footerSections] = await Promise.all([getNavigation(), getExamCategories(), getSiteConfig(), getFooterSections()]);
  const config = { ...siteConfig, footer: withFooterSections(siteConfig.footer, footerSections) };

  return { navigation, examCategories, config, routeLabels: buildRouteLabels(navigation, examCategories) };
});
