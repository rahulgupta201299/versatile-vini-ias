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

/** Separate (non-goal) section pages, e.g. pagePath("GS Foundation", "NCERT Foundation Batch") → /gs-foundation/ncert-foundation-batch. */
/** GS Foundation free-resource pages: /courses/gs-foundation/<resource>. */
export const FREE_RESOURCE_BASE = "/courses/gs-foundation";
export const freeResourcePath = (name: string) => `${FREE_RESOURCE_BASE}/${slugify(name)}`;

/** Course pages are grouped by menu section: /courses/<section>/<page>. */
export const COURSE_SECTIONS = { gsFoundation: "gs-foundation", mentorship: "mentorship", gsMains: "gs-mains", csat: "csat", optional: "optional" } as const;
export const coursePagePath = (section: string, name: string) => `/courses/${section}/${slugify(name)}`;

/** External test-series site (replace with the real URL). */
export const TEST_SERIES_URL = "https://test.viniias.com/upsc-test-series";

export const pagePath = (...parts: string[]) => "/" + parts.map(slugify).join("/");
