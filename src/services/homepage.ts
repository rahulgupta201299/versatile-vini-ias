import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { HeroBanner, HomepageBannerData, HomepageData, ResourceItem } from "@/types";

/*
 * Homepage sections managed in the admin panel (Web → Homepage):
 *   GET /homepage → { heroBanners, freeResources, marketingBanners: { first, second } } — active items, in order.
 * Admin saves refresh the "homepage" cache tag, so changes show up straight away.
 */

const EMPTY_HOMEPAGE: HomepageData = { heroBanners: [], freeResources: [], marketingBanners: { first: [], second: [] } };

const isHomepageData = (data: unknown) => typeof data === "object" && data !== null && Array.isArray((data as HomepageData).heroBanners);

export const getHomepage = cache(() =>
  fetchApi<HomepageData>("homepage", { fallback: EMPTY_HOMEPAGE, revalidate: REVALIDATE.fast, tags: [CACHE_TAGS.homepage], isValid: isHomepageData })
);

/** A banner in the shape the sliders use. The title doubles as the image's alt text. */
export const toSiteBanner = ({ title, webImageUrl, mobileImageUrl, link }: HomepageBannerData, index: number): HeroBanner => ({
  id: `${index}-${title}`,
  title,
  imageUrl: webImageUrl,
  mobileImageUrl: mobileImageUrl || undefined,
  href: link || "#",
  alt: title,
});

/** Free resource tiles: the soft background and border are made from the icon colour. */
const toResourceItem = ({ title, icon, color, link }: HomepageData["freeResources"][number], index: number): ResourceItem => ({
  id: `${index}-${title}`,
  title,
  subtitle: "",
  icon,
  iconColor: color,
  bgColor: `${color}1A`,
  borderColor: `${color}40`,
  href: link,
});

/** Hero slider banners (homepage, and goal pages without their own banners). */
export const getHeroBanners = cache(async () => {
  const { heroBanners } = await getHomepage();

  return heroBanners.map(toSiteBanner);
});

export const getFreeResources = cache(async () => {
  const { freeResources } = await getHomepage();

  return freeResources.map(toResourceItem);
});

/** 1st marketing banner (under Free resources) and 2nd (under Select Your Goal). */
export const getMarketingBanners = cache(async () => {
  const { marketingBanners } = await getHomepage();
  const { first, second } = marketingBanners;

  return { first: first.map(toSiteBanner), second: second.map(toSiteBanner) };
});
