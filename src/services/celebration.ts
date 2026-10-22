import { fetchApi, CACHE_TAGS } from "@/lib/api";
import { CelebrationBanner } from "@/types";

/*
 * Homepage → Celebration banner, managed in the admin panel (Web → Homepage → Celebration banner).
 *   GET /celebration-banner → { banner } — only the banner live right now, or null.
 *
 * Everything comes from the backend: it switches a banner off after its end date and sends the countdown
 * text. The page only draws what it receives, so a banner never appears and then disappears.
 * Kept for 1 minute at most (and refreshed straight away when an admin saves), so start / end times
 * take effect within a minute.
 */
const CELEBRATION_REVALIDATE_SECONDS = 60;

const isLiveNow = ({ startsAt, endsAt }: CelebrationBanner, now = Date.now()) => new Date(startsAt).getTime() <= now && now < new Date(endsAt).getTime();

export const getCelebrationBanner = async (): Promise<CelebrationBanner | null> => {
  const { banner } = await fetchApi<{ banner: CelebrationBanner | null }>("celebration-banner", {
    fallback: { banner: null },
    revalidate: CELEBRATION_REVALIDATE_SECONDS,
    tags: [CACHE_TAGS.celebration],
    isValid: (data) => typeof data === "object" && data !== null && "banner" in data,
  });

  // A response kept from up to a minute ago can't bring back a banner that has just ended
  return banner && isLiveNow(banner) ? banner : null;
};
