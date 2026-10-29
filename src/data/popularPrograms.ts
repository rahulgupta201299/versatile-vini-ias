/**
 * Homepage → "Popular Courses" (below Free Resources).
 * SAMPLE content (titles, descriptions, dates, prices, links) — replace with the real batches before going live;
 * it moves to the backend / admin later.
 */
export interface PopularProgram {
  title: string;
  /** e.g. "Foundation" — the orange line above the title */
  category: string;
  /** e.g. "HINGLISH", "हिन्दी" */
  language: string;
  /** One line about who it's for (cut to one line on the card) */
  description: string;
  /** e.g. "Starts on 25 Sep, 2026 Ends on 30 Sep, 2029" (cut to one line on the card) */
  schedule: string;
  price: number;
  /** Price before the discount (struck through); the % off is worked out from it */
  originalPrice: number;
  /** "contain" for wide artwork that must not be cropped */
  banner: { src: string; alt: string; fit?: "cover" | "contain" };
  buyHref: string;
  detailsHref: string;
}

const ENQUIRY = "/#enquiry";

/** "View other courses" links next to the heading. */
export const OTHER_COURSE_LINKS = [
  { label: "Spoken English", href: ENQUIRY },
  { label: "Skills", href: ENQUIRY },
];

export const POPULAR_PROGRAMS: PopularProgram[] = [
  {
    title: "AARAMBH 71st BPSC 2026",
    category: "Integrated",
    language: "HINGLISH",
    description: "Prelims + Mains preparation with Top Rankers for 71st BPSC aspirants",
    schedule: "Starts on 16 Nov, 2026 Ends on 30 Jun, 2027",
    price: 24999,
    originalPrice: 39999,
    banner: { src: "/images/banners/banner-aarambh.jpg", alt: "Aarambh 71st BPSC Integrated Top Rankers Batch" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
  {
    title: "Sankalp GS Foundation - हिन्दी",
    category: "Foundation",
    language: "हिन्दी",
    description: "Complete GS Foundation for UPSC CSE with expert faculty and updated syllabus",
    schedule: "Starts on 18 Nov, 2026 Ends on 30 Sep, 2028",
    price: 33000,
    originalPrice: 49000,
    banner: { src: "/images/banners/banner-sankalp.jpg", alt: "Sankalp UPSC CSE GS Foundation" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
  {
    title: "All India UPSC Prelims Test Series",
    category: "Test Series",
    language: "ENGLISH",
    description: "Sectional and full-length tests with detailed performance analysis",
    schedule: "Starts on 1 Dec, 2026 Ends on 31 May, 2027",
    price: 2999,
    originalPrice: 4999,
    banner: { src: "/images/banners/promo-prelims-testseries.jpg", alt: "All India UPSC Prelims Test Series" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
  {
    title: "UPSC Foundation Batch 2027/28",
    category: "Foundation",
    language: "HINGLISH",
    description: "Complete GS Foundation, PYQs and practice with Prelims + Mains focus",
    schedule: "Starts on 16 Nov, 2026 Ends on 30 Jun, 2028",
    price: 24999,
    originalPrice: 34999,
    banner: { src: "/images/banners/banner-upsc-foundation-2027-28.webp", alt: "UPSC Foundation Batch 2027/28", fit: "contain" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
  {
    title: "Mains 360 - Answer Writing Program",
    category: "Mains",
    language: "ENGLISH",
    description: "Daily answer writing with evaluation and model answers for GS Mains",
    schedule: "Starts on 5 Jan, 2027 Ends on 31 Aug, 2027",
    price: 9999,
    originalPrice: 14999,
    banner: { src: "/images/banners/banner-mains360.png", alt: "Mains 360 answer writing program", fit: "contain" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
];

/** Homepage → "Find us in your neighborhood" (below Impact). */
export const OFFLINE_CENTRE = {
  eyebrow: "Find us in your neighborhood",
  title: "Build Foundation at",
  highlight: "VINI IAS Offline Center",
  image: { src: "/images/centres/vini-offline-experience-centre.webp", alt: "VINI IAS Offline Experience Centre storefront" },
  points: ["100% classroom-based learning experience", "Spoken English, Computer & Digital skills with UPSC preparation", "Career guidance and hands-on projects"],
  exploreHref: "/contact-us",
  callbackHref: ENQUIRY,
};
