/**
 * Goal (exam) landing pages — route: /goal/<course>, e.g. /goal/upsc-cse-2026-27, /goal/bpsc.
 *
 * FALLBACK content — used when GET /goals/<slug> is not configured or has no page for the exam.
 * Only exams listed under "All Exams" (mega menu) and "Select Your Goal" get a goal page;
 * a complete page is generated from the exam name + category.
 */
import { CourseBatch, CoursePageData, CourseVideo, ExamGoalCategory, MegaMenuCategory } from "@/types";
import { HERO_BANNERS } from "./heroBanners";
import { slugify } from "@/utils/slug";

export interface GoalEntry {
  slug: string;
  name: string;
  category: string;
}

/** Every exam that has a goal page, from the mega menu + "Select Your Goal" lists (first name wins). */
export function buildGoalEntries(megaMenu: MegaMenuCategory[], examCategories: ExamGoalCategory[]): GoalEntry[] {
  const entries = new Map<string, GoalEntry>();
  const add = (name: string, category: string) => {
    const slug = slugify(name);
    if (slug && !entries.has(slug)) entries.set(slug, { slug, name, category });
  };
  megaMenu.forEach((cat) => cat.courses.forEach((course) => add(course.title, cat.title)));
  examCategories.forEach((cat) => cat.subcategories.forEach((sub) => add(sub.name, cat.category)));
  return [...entries.values()];
}

/* ---------- Per-page overrides (optional) ---------- */
export const COURSE_PAGE_OVERRIDES: Record<string, Partial<CoursePageData>> = {
  // "upsc-cse-2026-27": { tagline: "...", videos: [{ title: "...", youtubeId: "VIDEO_ID", ... }] },
};

/** True when a page's banners are set locally in COURSE_PAGE_OVERRIDES (they win over the server). */
export const COURSE_PAGE_HAS_OWN_BANNERS = (slug: string) => Boolean(COURSE_PAGE_OVERRIDES[slug]?.banners?.length);

/* ---------- Helpers ---------- */
const UPSC_GROUPS = new Set([
  "UPSC",
  "Only IAS",
  "GS Foundation",
  "Mentorship",
  "CSAT",
  "Optional",
  "GS Mains",
  "Ethics & Essay",
  "UPSC Plan B",
  "Test Series",
]);

function resultTabFor(entry: GoalEntry) {
  const text = `${entry.category} ${entry.name}`;
  if (/PSC|PCS/i.test(text) && !/^UPSC/i.test(entry.name)) return "state-pcs";
  if (UPSC_GROUPS.has(entry.category) || /UPSC|IAS/i.test(entry.name)) return "upsc";
  return "other-exams";
}

const youtubeSearch = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(`Vini IAS ${q}`)}`;

function defaultVideos(name: string): CourseVideo[] {
  return [
    { title: `${name}: Complete Strategy & Syllabus Breakdown`, educator: "Vini IAS Faculty", duration: "1:12:40", href: youtubeSearch(`${name} strategy`) },
    { title: `How to Start ${name} Preparation from Zero`, educator: "Vini IAS Mentors", duration: "48:15", href: youtubeSearch(`${name} preparation`) },
    { title: `Daily Current Affairs for ${name}`, educator: "Vini IAS Current Affairs Team", duration: "35:20", href: youtubeSearch("daily current affairs") },
  ];
}

function defaultBatches(name: string): CourseBatch[] {
  return [
    {
      id: "foundation",
      title: `${name} Foundation Batch 2027/28`,
      thumbnail: "/images/banners/banner-upsc-foundation-2027-28.webp",
      language: "Hindi & English",
      mode: "Live + Recorded",
      startDate: "Starts 15 Nov",
      price: 49999,
      mrp: 79999,
      tag: "Bestseller",
    },
    {
      id: "recorded",
      title: `${name} Recorded Batch`,
      thumbnail: "/images/banners/banner-sankalp.jpg",
      language: "Hindi",
      mode: "Recorded",
      startDate: "Start anytime",
      price: 4999,
      mrp: 9999,
    },
    {
      id: "test-series",
      title: `${name} Test Series (FLT)`,
      thumbnail: "/images/banners/promo-prelims-testseries.jpg",
      language: "Hindi & English",
      mode: "Online Tests",
      startDate: "Starts 1 Dec",
      price: 1999,
      mrp: 3999,
      tag: "New",
    },
  ];
}

/** Builds a complete goal page for one exam (`all` = every goal entry, for the exam dropdown). */
export function buildCoursePage(entry: GoalEntry, all: GoalEntry[]): CoursePageData {
  const { slug, name, category } = entry;

  const sameGroup = all.filter((e) => e.category === category).map((e) => e.name);
  const examOptions = [name, ...sameGroup.filter((n) => n !== name)].slice(0, 12);

  const base: CoursePageData = {
    slug,
    name,
    category,
    tagline: `Live classes, free lectures, test series & mentorship for ${name} — in Hindi & English medium.`,
    banners: HERO_BANNERS,
    videos: defaultVideos(name),
    batches: defaultBatches(name),
    highlights: [
      { label: "Medium", value: "Hindi & English" },
      { label: "Mode", value: "Online & Offline" },
      { label: "Classes", value: "Live + Recorded" },
      { label: "Support", value: "Daily doubt clearing" },
    ],
    about: [
      `${name} is one of the most sought-after ${category} examinations in India. At Vini IAS, our ${name} programme brings together live classes by experienced faculty, structured study material, regular tests and personal mentorship so that you can prepare with clarity and confidence.`,
      `This guide covers everything you need to know — the exam pattern, syllabus, eligibility, important dates and a step-by-step preparation strategy. Start with the free classes on this page, attempt the scholarship test, and talk to our counsellors to pick the batch that fits your goals.`,
      `Our students get daily practice through PYQs and test series, Hindi & English study material, current affairs updates and one-to-one doubt clearing — the same system that has helped our toppers secure top ranks.`,
    ],
    faqs: [
      { q: `What is the ${name} exam?`, a: `${name} is a competitive examination under ${category}. Selection usually involves multiple stages, and preparation needs a clear strategy, quality study material and regular practice.` },
      { q: `How should I start preparing for ${name}?`, a: `Begin with the syllabus and previous year questions, build your basics with NCERTs and standard books, follow a daily timetable and take regular tests. Our free classes and counsellors can help you plan your first 90 days.` },
      { q: `Is the Vini IAS ${name} course available in Hindi medium?`, a: `Yes. Classes, notes and tests are available in both Hindi and English medium.` },
      { q: `Are there free classes for ${name}?`, a: `Yes. Watch free classes on this page and on the Vini IAS YouTube channel, and explore free resources like PYQs, current affairs and playlists.` },
      { q: "How does the scholarship test work?", a: "It is a free online test with 20 quick questions in just 20 minutes. Based on your score you can win a scholarship of up to 80% of the full batch price." },
      { q: "Can I talk to a counsellor before enrolling?", a: "Yes. Fill in the free counselling form on this page or call us, and a counsellor will guide you on the right batch for you." },
    ],
    resultTabId: resultTabFor(entry),
    examOptions,
  };

  return { ...base, ...COURSE_PAGE_OVERRIDES[slug] };
}

