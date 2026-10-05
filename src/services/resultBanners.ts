import { RESULT_BANNER_TABS } from "@/data/resultBanners";
import { ResultBannerTab } from "@/types";

/**
 * Loads the "Our Top Rankers" result banners.
 *
 * Set RESULT_BANNERS_API_URL (server env) to an endpoint returning `ResultBannerTab[]`:
 *   [{ id, label, banners: [{ id, title, webImageUrl, mobileImageUrl, href?, alt? }] }]
 * Without it — or if the request fails — the bundled mock data is used.
 * Responses are cached and revalidated every 5 minutes.
 */
export async function getResultBanners(): Promise<ResultBannerTab[]> {
  const url = process.env.RESULT_BANNERS_API_URL;
  if (!url) return RESULT_BANNER_TABS;

  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = (await res.json()) as ResultBannerTab[];
    return Array.isArray(data) && data.length ? data : RESULT_BANNER_TABS;
  } catch (err) {
    console.error("[getResultBanners] falling back to mock data:", err);
    return RESULT_BANNER_TABS;
  }
}
