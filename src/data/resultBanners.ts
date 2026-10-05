import { ResultBannerTab } from "@/types";

/**
 * Fallback / mock data for the results banners.
 * In production this shape is returned by the server (see src/services/resultBanners.ts).
 * Each tab can hold any number of banners — they are shown as a slider.
 * Replace the placeholder images with real banner art:
 *   web    → 3821 × 1324 px (or any ≈ 2.886 : 1 image, e.g. 2240 × 776)
 *   mobile → 1203 × 1650 px (or any ≈ 0.729 : 1 image)
 */
export const RESULT_BANNER_TABS: ResultBannerTab[] = [
  {
    id: "upsc",
    label: "UPSC",
    banners: [
      {
        id: "upsc-cse-2025",
        title: "UPSC CSE Results",
        webImageUrl: "/images/results/upsc-1-web.svg",
        mobileImageUrl: "/images/results/upsc-1-mobile.svg",
        href: "#rankers",
      },
      {
        id: "upsc-cse-2024",
        title: "UPSC CSE Toppers",
        webImageUrl: "/images/results/upsc-2-web.svg",
        mobileImageUrl: "/images/results/upsc-2-mobile.svg",
        href: "#rankers",
      },
    ],
  },
  {
    id: "state-pcs",
    label: "State PCS",
    banners: [
      {
        id: "bpsc-70",
        title: "70th BPSC Results",
        webImageUrl: "/images/results/state-pcs-1-web.svg",
        mobileImageUrl: "/images/results/state-pcs-1-mobile.svg",
        href: "#rankers",
      },
      {
        id: "state-pcs-toppers",
        title: "State PCS Toppers",
        webImageUrl: "/images/results/state-pcs-2-web.svg",
        mobileImageUrl: "/images/results/state-pcs-2-mobile.svg",
        href: "#rankers",
      },
    ],
  },
  {
    id: "other-exams",
    label: "Other Exams",
    banners: [
      {
        id: "other-exams-results",
        title: "Other Exam Results",
        webImageUrl: "/images/results/other-exams-1-web.svg",
        mobileImageUrl: "/images/results/other-exams-1-mobile.svg",
        href: "#rankers",
      },
    ],
  },
];
