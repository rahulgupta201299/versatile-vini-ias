/** "UPSC CSE 2026/27" → "upsc-cse-2026-27" — used for course / exam page routes. */
export function slugify(name: string): string {
  return name
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Goal (exam) landing page — only for "All Exams" and "Select Your Goal": /goal/<slug>. */
export const goalPath = (name: string) => `/goal/${slugify(name)}`;

/** Course pages are grouped by menu section: /courses/<section>/<page>. */
export const COURSE_SECTIONS = {
  gsFoundation: "gs-foundation",
  mentorship: "mentorship",
  gsMains: "gs-mains",
  csat: "csat",
  optional: "optional",
  ethicsEssay: "ethics-essay",
  upscPlanB: "upsc-plan-b",
  freeResources: "free-resources",
} as const;
export const coursePagePath = (section: string, name: string) => `/courses/${section}/${slugify(name)}`;

export type CourseSection = (typeof COURSE_SECTIONS)[keyof typeof COURSE_SECTIONS];

/** Every course section slug, e.g. "csat", "gs-mains". */
export const COURSE_SECTION_SLUGS = Object.values(COURSE_SECTIONS);

export const isCourseSection = (value: string): value is CourseSection => (COURSE_SECTION_SLUGS as string[]).includes(value);

/** External test-series site (replace with the real URL). */
export const TEST_SERIES_URL = "https://test.viniias.com/upsc-test-series";

export const pagePath = (...parts: string[]) => "/" + parts.map(slugify).join("/");

/** Blog post route: /exams/<category>/<post>. */
export const blogPath = (post: { category: string; slug: string }) => `/exams/${post.category}/${post.slug}`;
