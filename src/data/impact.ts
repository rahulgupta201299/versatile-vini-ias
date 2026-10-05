import { ImpactAvatar, ImpactFeatureChip, ImpactStat } from "@/types";

/** Numbers from the design sketch. */
export const IMPACT_STATS: ImpactStat[] = [
  { value: "10+", unit: "lakh", label: "hours of LIVE learning" },
  { value: "10+", unit: "lakh", label: "monthly views" },
  { value: "10,000+", unit: "doubts", label: "solved" },
  { value: "5+", unit: "offline", label: "centres" },
];

/** Feature chips floating on the map (positions in % of the map box). */
export const IMPACT_FEATURES: ImpactFeatureChip[] = [
  { text: "Mains answer writing", highlight: "answer writing", icon: "writing", x: 30, y: 30 },
  { text: "Daily LIVE classes", highlight: "LIVE", icon: "live", x: 80, y: 60 },
  { text: "Unlimited doubt solving", highlight: "doubt", icon: "doubt", x: 50, y: 82 },
];

/** Student avatars on the map — swap `src` for real student photos (square images). */
export const IMPACT_AVATARS: ImpactAvatar[] = [
  { src: "/images/impact/avatar-1.svg", alt: "Student", size: 76, x: 8, y: 52 },
  { src: "/images/impact/avatar-2.svg", alt: "Student", size: 44, x: 58, y: 12 },
  { src: "/images/impact/avatar-3.svg", alt: "Student", size: 66, x: 90, y: 30 },
  { src: "/images/impact/avatar-4.svg", alt: "Student", size: 44, x: 46, y: 50 },
  { src: "/images/impact/avatar-5.svg", alt: "Student", size: 64, x: 20, y: 88 },
];

/** Where our logo sits on the map (≈ Patna, Bihar). */
export const IMPACT_LOGO_POSITION = { x: 73.4, y: 39.5 };
