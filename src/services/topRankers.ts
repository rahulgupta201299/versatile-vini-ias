import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { ResultBannerTab, StatItem, TopRankersData } from "@/types";

/*
 * "Our Top Rankers" — managed in the admin panel (Web → Homepage → Top rankers):
 *   GET /top-rankers → { stats, tabs } — the headline boxes and the result banner tabs, active only, in order.
 * Admin saves refresh the "result-banners" cache tag, so changes show up straight away.
 */

const EMPTY: TopRankersData = { stats: [], tabs: [] };

const isTopRankersData = (data: unknown) => typeof data === "object" && data !== null && Array.isArray((data as TopRankersData).tabs);

const getTopRankers = cache(() =>
  fetchApi<TopRankersData>("top-rankers", { fallback: EMPTY, revalidate: REVALIDATE.fast, tags: [CACHE_TAGS.results], isValid: isTopRankersData })
);

/** Result banner tabs (UPSC / State PCS / Other Exams). A banner without web or phone art shows only on the other size. */
export const getResultBanners = cache(async (): Promise<ResultBannerTab[]> => {
  const { tabs } = await getTopRankers();

  return tabs.map(({ id, label, banners }) => ({
    id,
    label,
    banners: banners.map(({ title, webImageUrl, mobileImageUrl, link }, index) => ({
      id: `${id}-${index}`,
      title,
      webImageUrl: webImageUrl || undefined,
      mobileImageUrl: mobileImageUrl || undefined,
      href: link || undefined,
      alt: title,
    })),
  }));
});

/** The headline boxes above the tabs (e.g. "1000+ · 70th BPSC & PCS कुल चयन"). */
export const getRankerStats = cache(async (): Promise<StatItem[]> => {
  const { stats } = await getTopRankers();

  return stats.map(({ value, label, sublabel, icon }) => ({ value, label, sublabel: sublabel || undefined, icon }));
});
