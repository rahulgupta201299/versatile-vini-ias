import { HERO_BANNERS } from "@/data/heroBanners";
import { HeroBanner } from "@/types";

/**
 * Loads the hero (top) slider banners — for the homepage or for one course / exam page.
 *
 * Set HERO_BANNERS_API_URL (server env) to your endpoint. It is called as
 *   GET {HERO_BANNERS_API_URL}?course=<course-slug>   (course pages, e.g. ?course=bpsc)
 *   GET {HERO_BANNERS_API_URL}                         (homepage)
 * and must return `HeroBanner[]`:
 *   [{ id, title, imageUrl, mobileImageUrl?, href, alt? }]
 * Banner art: 2.9 : 1 (e.g. 2137 × 736 or 2400 × 828 px).
 *
 * If the variable is not set, the request fails, or the course has no banners,
 * the default banners in src/data/heroBanners.ts are used.
 * Responses are cached and revalidated every 5 minutes.
 */
export async function getHeroBanners(course?: string): Promise<HeroBanner[]> {
  const base = process.env.HERO_BANNERS_API_URL;
  if (!base) return HERO_BANNERS;

  try {
    const url = new URL(base);
    if (course) url.searchParams.set("course", course);
    const res = await fetch(url, { next: { revalidate: 300, tags: ["hero-banners"] } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as HeroBanner[];
    return Array.isArray(data) && data.length ? data : HERO_BANNERS;
  } catch (err) {
    console.error(`[getHeroBanners] ${course ?? "home"}: falling back to default banners —`, err);
    return HERO_BANNERS;
  }
}
