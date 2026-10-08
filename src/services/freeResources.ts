import { cache } from "react";
import { fetchApi, CACHE_TAGS } from "@/lib/api";
import { FreeResourcePage } from "@/types";
import { FREE_RESOURCES } from "@/data/freeResources";
import { FREE_RESOURCE_BASE } from "@/utils/slug";
import { getSiteData } from "./site";

/** Slugs of the GS Foundation pages — taken from the menu links that point at /courses/gs-foundation/… */
export const getFreeResourceSlugs = cache(async () => {
  const { navigation } = await getSiteData();
  const prefix = `${FREE_RESOURCE_BASE}/`;
  const slugs = navigation.navItems
    .flatMap((item) => item.children ?? [])
    .map((child) => child.href)
    .filter((href) => href.startsWith(prefix))
    .map((href) => href.slice(prefix.length).split(/[/?#]/)[0]);
  return [...new Set(slugs)];
});

/** One GS Foundation page: GET /courses/gs-foundation/<slug> (falls back to local content, else null → 404). */
export const getFreeResourcePage = cache((slug: string) =>
  fetchApi<FreeResourcePage | null>(`courses/gs-foundation/${encodeURIComponent(slug)}`, {
    fallback: FREE_RESOURCES.find((p) => p.slug === slug) ?? null,
    tags: [CACHE_TAGS.freeResources],
  })
);
