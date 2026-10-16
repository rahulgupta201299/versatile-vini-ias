import { cache } from "react";
import { fetchApi, CACHE_TAGS, REVALIDATE } from "@/lib/api";
import { AboutContent, CareersContent } from "@/types";
import { ABOUT_CONTENT, CAREERS_CONTENT } from "@/data/company";

/** About page content: GET /pages/about (falls back to local copy). */
export const getAboutContent = cache(() =>
  fetchApi<AboutContent>("pages/about", { fallback: ABOUT_CONTENT, tags: [CACHE_TAGS.company], revalidate: REVALIDATE.slow })
);

/** Careers page content + openings: GET /pages/careers. */
export const getCareersContent = cache(() =>
  fetchApi<CareersContent>("pages/careers", { fallback: CAREERS_CONTENT, tags: [CACHE_TAGS.company], revalidate: REVALIDATE.default })
);
