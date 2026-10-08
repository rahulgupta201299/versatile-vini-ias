import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { HERO_BANNERS } from "@/data/heroBanners";
import { HeroBanner } from "@/types";

/**
 * Hero (top) slider banners — homepage, or one goal page when `course` is given.
 *   GET /banners/hero            → homepage banners
 *   GET /banners/hero?course=gate → banners for /goal/gate
 * Banner art: 2.9 : 1 (e.g. 2400 × 828 px), optional mobile art.
 */
export const getHeroBanners = cache((course?: string) =>
  fetchApi<HeroBanner[]>("banners/hero", { fallback: HERO_BANNERS, query: { course }, revalidate: REVALIDATE.fast, tags: [CACHE_TAGS.heroBanners] })
);
