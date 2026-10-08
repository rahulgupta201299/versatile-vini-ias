import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { HeroBanner, ImpactData, ResourceItem, StatItem } from "@/types";
import { SMALL_PROMO_BANNERS } from "@/data/promoBanners";
import { RANKER_STATS } from "@/data/rankers";
import { IMPACT_AVATARS, IMPACT_FEATURES, IMPACT_LOGO_POSITION, IMPACT_STATS } from "@/data/impact";
import { FREE_RESOURCES } from "@/data/resources";

export const getPromoBanners = cache(() =>
  fetchApi<HeroBanner[]>("banners/promo", { fallback: SMALL_PROMO_BANNERS, revalidate: REVALIDATE.fast, tags: [CACHE_TAGS.promo] })
);

export const getRankerStats = cache(() =>
  fetchApi<StatItem[]>("home/ranker-stats", { fallback: RANKER_STATS, tags: [CACHE_TAGS.home] })
);

export const getImpactData = cache(() =>
  fetchApi<ImpactData>("home/impact", {
    fallback: { stats: IMPACT_STATS, features: IMPACT_FEATURES, avatars: IMPACT_AVATARS, logoPosition: IMPACT_LOGO_POSITION },
    tags: [CACHE_TAGS.home],
  })
);

export const getLearningResources = cache(() =>
  fetchApi<ResourceItem[]>("home/resources", { fallback: FREE_RESOURCES, tags: [CACHE_TAGS.home] })
);
