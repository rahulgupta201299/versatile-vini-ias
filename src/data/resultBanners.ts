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
        id: "upsc-proud-achievers",
        title: "Vini IAS — Our Proud Achievers",
        webImageUrl: "/images/results/upsc-toppers-web.webp",
        mobileImageUrl: "/images/results/upsc-toppers-mobile.webp",
        alt: "Vini IAS UPSC toppers: AIR 4 Raghav Jhunjhunwala, AIR 7 A R Rajah Mohideen, AIR 10 Ujjwal Priyank, AIR 12 Akshit Bhardwaj and many more",
        href: "/#rankers",
      },
      {
        id: "upsc-mentor-600-rankers",
        title: "Mentor to 600+ Successful Rankers — Selections in UPSC 2025",
        webImageUrl: "/images/results/upsc-mentor-600-rankers-web.webp",
        mobileImageUrl: "/images/results/upsc-mentor-600-rankers-mobile.webp",
        alt: "Mentor to 600+ successful rankers — UPSC 2025 selections: AIR 4 Raghav Jhunjhunwala, AIR 23 Jaswanth Jeenu, AIR 27 Vikas, AIR 34 Nancy Singh, AIR 41 Sudipa Dutta, AIR 46 Shambhavi Tiwari, AIR 48 Anket Ranjan, AIR 58 Mohit Gupta, AIR 72 Kanishak Aggarwal, AIR 73 Aakash Om Trivedi, AIR 75 Rahul Shekhar, AIR 76 Sukhwardeep Singh Masoun, AIR 86 Puru Dubey, AIR 98 Aditya Mathur, AIR 101 Akash Kumar",
        href: "/#rankers",
      },
      {
        // Mobile-only banner
        id: "upsc-hindi-medium-cse-2024",
        title: "Hindi Medium 33+ Selections — CSE 2024",
        mobileImageUrl: "/images/results/upsc-hindi-medium-cse-2024-mobile.webp",
        alt: "Vini IAS Our Super Achievers: Hindi Medium 33+ selections in UPSC CSE 2024",
        href: "/#rankers",
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
        href: "/#rankers",
      },
      {
        id: "state-pcs-toppers",
        title: "State PCS Toppers",
        webImageUrl: "/images/results/state-pcs-2-web.svg",
        mobileImageUrl: "/images/results/state-pcs-2-mobile.svg",
        href: "/#rankers",
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
        href: "/#rankers",
      },
    ],
  },
];
