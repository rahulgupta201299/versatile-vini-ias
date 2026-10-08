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
export const pagePath = (...parts: string[]) => "/" + parts.map(slugify).join("/");
