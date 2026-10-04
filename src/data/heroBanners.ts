import { HeroBanner } from "@/types";

/**
 * Static array of banner images simulating the backend server API response.
 * The marketing/design team provides complete pre-designed banner graphics
 * which are loaded from this array (or fetched dynamically from server).
 */
export const HERO_BANNERS: HeroBanner[] = [
  {
    id: "banner-1",
    title: "Mains 360 - Ethics (GS-4) & Essay Masterclass",
    imageUrl: "/images/banners/banner-mains360.png", // Direct user-provided banner graphic
    href: "#courses",
    alt: "UPSC Mains 2026 - Ethics (GS-4) & Essay Masterclass by Shashank Gaurav (Rank 2) & Mentors",
  },
  {
    id: "banner-2",
    title: "Sankalp UPSC CSE GS Foundation 2026",
    imageUrl: "/images/banners/banner-sankalp.jpg",
    href: "#courses",
    alt: "Sankalp UPSC CSE GS Foundation Batch - Complete Prelims cum Mains Guidance",
  },
  {
    id: "banner-3",
    title: "Aarambh 71st BPSC Integrated Batch",
    imageUrl: "/images/banners/banner-aarambh.jpg",
    href: "#courses",
    alt: "Aarambh 71st BPSC Integrated Prelims and Mains Batch - Top Rankers Guidance",
  },
];
