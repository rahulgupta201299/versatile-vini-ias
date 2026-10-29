/**
 * Homepage → "Explore our most popular programs" (below Free Resources).
 * SAMPLE content (titles, dates, prices, links) — replace with the real batches before going live;
 * it moves to the backend / admin later.
 */
export interface PopularProgram {
  title: string;
  /** e.g. "Foundation Course" — the coloured line above the title */
  category: string;
  /** e.g. "HINGLISH" */
  language: string;
  exam: string;
  startDate: string;
  price: number;
  /** Price before the discount (struck through); the % off is worked out from it */
  originalPrice: number;
  offer: { tag: string; text: string };
  banner: { src: string; alt: string };
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
    title: "AARAMBH 71st BPSC INTEGRATED TOP RANKERS BATCH",
    category: "Integrated Batch",
    language: "HINGLISH",
    exam: "71st BPSC",
    startDate: "Starts on 16th Nov'26",
    price: 24999,
    originalPrice: 39999,
    offer: { tag: "EarlyBirdOffer", text: "Limited time offer" },
    banner: { src: "/images/banners/banner-aarambh.jpg", alt: "Aarambh 71st BPSC Integrated Top Rankers Batch" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
  {
    title: "SANKALP UPSC CSE GS FOUNDATION - HINDI",
    category: "Foundation Course",
    language: "HINDI",
    exam: "UPSC 2027",
    startDate: "Starts on 18th Nov'26",
    price: 4000,
    originalPrice: 7900,
    offer: { tag: "EarlyBirdOffer", text: "Limited time offer" },
    banner: { src: "/images/banners/banner-sankalp.jpg", alt: "Sankalp UPSC CSE GS Foundation" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
  {
    title: "ALL INDIA UPSC PRELIMS TEST SERIES 2026 - ENGLISH",
    category: "Test Series",
    language: "ENGLISH",
    exam: "UPSC 2026",
    startDate: "Starts on 1st Dec'26",
    price: 2999,
    originalPrice: 4999,
    offer: { tag: "FestiveOffer", text: "Valid till 30th Nov" },
    banner: { src: "/images/banners/promo-prelims-testseries.jpg", alt: "All India UPSC Prelims Test Series 2026" },
    buyHref: ENQUIRY,
    detailsHref: ENQUIRY,
  },
];

/** Homepage → "Find us in your neighborhood" (below Impact). */
export const OFFLINE_CENTRE = {
  eyebrow: "Find us in your neighborhood",
  title: "Build Job Ready Skills at a",
  highlight: "VINI Offline Centre",
  image: { src: "/images/centres/vini-offline-experience-centre.webp", alt: "VINI IAS Offline Experience Centre storefront" },
  points: ["100% classroom-based learning experience", "Spoken English, Computer & Digital skills with UPSC preparation", "Career guidance and hands-on projects"],
  exploreHref: "/contact-us",
  callbackHref: ENQUIRY,
};
