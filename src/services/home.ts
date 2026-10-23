import { cache } from "react";
import { fetchApi, CACHE_TAGS } from "@/lib/api";
import { ImpactData, StatItem } from "@/types";
import { RANKER_STATS } from "@/data/rankers";
import { IMPACT_AVATARS, IMPACT_FEATURES, IMPACT_LOGO_POSITION, IMPACT_STATS } from "@/data/impact";

export const getRankerStats = cache(() =>
  fetchApi<StatItem[]>("home/ranker-stats", { fallback: RANKER_STATS, tags: [CACHE_TAGS.home] })
);

export const getImpactData = cache(() =>
  fetchApi<ImpactData>("home/impact", {
    fallback: { stats: IMPACT_STATS, features: IMPACT_FEATURES, avatars: IMPACT_AVATARS, logoPosition: IMPACT_LOGO_POSITION },
    tags: [CACHE_TAGS.home],
  })
);
