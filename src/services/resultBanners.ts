import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { RESULT_BANNER_TABS } from "@/data/resultBanners";
import { ResultBannerTab } from "@/types";

/** "Our Top Rankers" result banners, grouped in tabs (UPSC / State PCS / Other Exams). GET /banners/results */
export const getResultBanners = cache(() =>
  fetchApi<ResultBannerTab[]>("banners/results", { fallback: RESULT_BANNER_TABS, revalidate: REVALIDATE.fast, tags: [CACHE_TAGS.results] })
);
