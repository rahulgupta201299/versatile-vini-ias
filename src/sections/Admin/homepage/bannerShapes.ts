import { BannerShape } from "./BannerManager";

/** Hero slider artwork: wide 2.9 : 1, phones 16 : 9. */
export const HERO_SHAPE: BannerShape = {
  webAspect: "2.9 / 1",
  webHint: "Wide art, 2.9 : 1 (e.g. 2400 × 828 px)",
  mobileAspect: "16 / 9",
  mobileHint: "Phone art, 16 : 9 (e.g. 1080 × 608 px). Used on phones when every active slide has one.",
};

/** Marketing banner artwork: wide 4 : 1, phones 2 : 1. */
export const MARKETING_SHAPE: BannerShape = {
  webAspect: "4 / 1",
  webHint: "Wide art, 4 : 1 (e.g. 2048 × 512 px)",
  mobileAspect: "2 / 1",
  mobileHint: "Phone art, 2 : 1 (e.g. 1080 × 540 px). Used on phones when every active banner here has one.",
};

/** Top rankers result banners: wide ≈ 2.9 : 1, phones tall ≈ 0.73 : 1 (shown up to 768 px wide). */
export const RANKERS_SHAPE: BannerShape = {
  webAspect: "2.886 / 1",
  webHint: "Wide art ≈ 2.9 : 1 (e.g. 3821 × 1324 px)",
  mobileAspect: "0.729 / 1",
  mobileHint: "Tall phone art ≈ 0.73 : 1 (e.g. 1203 × 1650 px). A banner with only one image shows only on that screen size.",
};
