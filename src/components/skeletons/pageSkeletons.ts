import type { SectionSkeletonSpec } from "./SectionSkeleton";

/**
 * Loading skeletons per page: every section in page order, at the height measured on the real page
 * (390 / 768 / 1024 / 1440 px wide → xs / sm / md / lg). Update a height when a section's design changes.
 */

/* ---------- sections shared by several pages ---------- */

const RANKERS: SectionSkeletonSpec = { height: { xs: 1272, sm: 1790, md: 1013, lg: 1043 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 2 }, rows: { xs: 2 } } };
const ENQUIRY: SectionSkeletonSpec = { height: { xs: 780, sm: 744, md: 822, lg: 582 }, shape: { kind: "split" } };
const APP_DOWNLOAD: SectionSkeletonSpec = { height: { xs: 672, sm: 634, md: 462, lg: 426 }, shape: { kind: "banner" } };
const faqs = (height: SectionSkeletonSpec["height"], count = 7): SectionSkeletonSpec => ({ height, shape: { kind: "rows", heading: "center", count } });

/* ---------- homepage ---------- */

export const HOME_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 157, sm: 282, md: 365, lg: 439 }, shape: { kind: "banner" } },
  { height: { xs: 311, sm: 339, md: 260 }, shape: { kind: "tiles", heading: "left", columns: { xs: 5, md: 10 }, count: 10 } },
  { height: { xs: 212, sm: 394, md: 490 }, shape: { kind: "banner" } },
  { height: { xs: 648, sm: 646, md: 691, lg: 736 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, sm: 2, md: 3 } } },
  { height: { xs: 114, sm: 212, md: 284, lg: 338 }, shape: { kind: "banner" } },
  { height: { xs: 483, sm: 570, md: 411 }, shape: { kind: "cards", heading: "left", columns: { xs: 2, sm: 3, md: 4 }, rows: { xs: 2 } } },
  { height: { xs: 286, sm: 398, md: 660, lg: 634 }, shape: { kind: "split" } },
  { height: { xs: 608, sm: 560, md: 686, lg: 667 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2, md: 3 } } },
  RANKERS,
  { height: { xs: 756, sm: 951, md: 679, lg: 656 }, shape: { kind: "tiles", heading: "center", columns: { xs: 2, md: 4 }, count: 8 } },
  { height: { xs: 587, sm: 757, md: 444, lg: 451 }, shape: { kind: "split" } },
  ENQUIRY,
  APP_DOWNLOAD,
];

/* ---------- course pages (/courses/<section>/<page>), by layout ---------- */

const MENTORSHIP_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 813, sm: 820, md: 600, lg: 587 }, shape: { kind: "courseHero" } },
  { height: { xs: 322, sm: 295, md: 405 }, shape: { kind: "banner" } },
  { height: { xs: 886, sm: 397, md: 466 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 3 } } },
  { height: { xs: 967, sm: 842, md: 652 }, shape: { kind: "rows", heading: "center", count: 8 } },
  { height: { xs: 1486, sm: 921, md: 939 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2, md: 3 }, rows: { xs: 6, sm: 4, md: 3 } } },
  RANKERS,
  { height: { xs: 244, md: 338 }, shape: { kind: "banner" } },
  ENQUIRY,
  faqs({ xs: 718, sm: 647, md: 715 }, 8),
];

const BATCH_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 900, sm: 847, md: 650, lg: 642 }, shape: { kind: "courseHero" } },
  { height: { xs: 127, md: 92 }, shape: { kind: "tiles", columns: { xs: 2, md: 4 }, count: 4 } },
  RANKERS,
  { height: { xs: 1291, sm: 1262, md: 780, lg: 772 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2, md: 4 }, rows: { xs: 4, sm: 2 } } },
  { height: { xs: 946, sm: 959, md: 1092 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2 } } },
  faqs({ xs: 790, sm: 657, md: 488 }, 6),
];

const GUIDE_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 941, sm: 783, md: 634 }, shape: { kind: "courseHero" } },
  { height: { xs: 218, md: 309 }, shape: { kind: "banner" } },
  ENQUIRY,
  faqs({ xs: 621, sm: 527, md: 592 }, 5),
  { height: { xs: 1215, sm: 789, md: 828 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, md: 2 }, rows: { xs: 2 } } },
  RANKERS,
  { height: { xs: 713, sm: 516, md: 356 }, shape: { kind: "cards", columns: { xs: 1, md: 2 }, rows: { xs: 2, md: 1 } } },
  { height: { xs: 323, sm: 156, md: 204 }, shape: { kind: "tiles", columns: { xs: 1, sm: 3 }, count: 3 } },
];

/** NCERT Foundation Batch landing. */
const LANDING_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 723, sm: 731, md: 514, lg: 479 }, shape: { kind: "courseHero" } },
  { height: { xs: 367, sm: 330, md: 251, lg: 230 }, shape: { kind: "tiles", columns: { xs: 2, md: 4 }, count: 4 } },
  { height: { xs: 715, md: 487 }, shape: { kind: "split" } },
  { height: { xs: 489, sm: 463, md: 382 }, shape: { kind: "banner" } },
  { height: { xs: 722, sm: 369, md: 460 }, shape: { kind: "split", reverse: true } },
  { height: { xs: 470, sm: 448, md: 342 }, shape: { kind: "split" } },
];

/** Ethics Foundation landing. */
const ETHICS_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 921, sm: 1033, md: 607, lg: 636 }, shape: { kind: "courseHero" } },
  { height: { xs: 594, sm: 437, md: 517, lg: 495 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 908, sm: 848, md: 740, lg: 680 }, shape: { kind: "split" } },
  { height: { xs: 322, sm: 295, md: 405 }, shape: { kind: "banner" } },
  RANKERS,
];

/** Current Affairs ("Shortlist") landing. */
const SHORTLIST_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 872, sm: 954, md: 667, lg: 612 }, shape: { kind: "courseHero" } },
  { height: { xs: 796, sm: 1520, md: 588, lg: 690 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2, md: 3 }, rows: { xs: 2, sm: 3, md: 1 } } },
  { height: { xs: 1274, sm: 829, md: 732, lg: 703 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2, md: 3 }, rows: { xs: 3, sm: 2, md: 1 } } },
  { height: { xs: 697, sm: 454, md: 541, lg: 378 }, shape: { kind: "split" } },
  { height: { xs: 1938, sm: 1854, md: 873 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 322, sm: 295, md: 405 }, shape: { kind: "banner" } },
];

/** Free magazines (Monthly Magazine, PRISM Simplified). */
const MAGAZINE_COURSE: SectionSkeletonSpec[] = [
  { height: { xs: 806, sm: 947, md: 535, lg: 595 }, shape: { kind: "courseHero" } },
  { height: { xs: 1852, sm: 976, md: 1127 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, sm: 2, md: 3 }, rows: { xs: 4, sm: 2 } } },
  faqs({ xs: 762, sm: 632, md: 519, lg: 494 }, 6),
];

export type CourseSkeletonLayout = "mentorship" | "batch" | "guide" | "landing" | "ethics" | "shortlist" | "magazine";

export const COURSE_SKELETONS: Record<CourseSkeletonLayout, SectionSkeletonSpec[]> = {
  mentorship: MENTORSHIP_COURSE,
  batch: BATCH_COURSE,
  guide: GUIDE_COURSE,
  landing: LANDING_COURSE,
  ethics: ETHICS_COURSE,
  shortlist: SHORTLIST_COURSE,
  magazine: MAGAZINE_COURSE,
};

/** Pages that don't use the mentorship layout (the most common one), by "<section>/<page>" or "<section>/<page prefix>". */
const COURSE_LAYOUTS: [prefix: string, layout: CourseSkeletonLayout][] = [
  ["gs-foundation/foundation-batch-", "batch"],
  ["gs-foundation/beginners-kit-for-upsc", "guide"],
  ["gs-foundation/ncert-foundation-batch", "landing"],
  ["ethics-essay/ethics-foundation-batch", "ethics"],
  ["free-resources/current-affairs", "shortlist"],
  ["free-resources/", "magazine"],
];

/** The skeleton layout for a course page path, e.g. "/courses/gs-foundation/foundation-batch-2027-29" → "batch". */
export const courseSkeletonLayout = (pathname: string): CourseSkeletonLayout => {
  const page = pathname.replace(/^\/courses\//, "");
  const match = COURSE_LAYOUTS.find(([prefix]) => page.startsWith(prefix));

  if (match) return match[1];

  return "mentorship";
};

/* ---------- goal pages (/goal/<course>) ---------- */

export const GOAL_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 136, sm: 113, md: 142 }, shape: { kind: "titleBand" } },
  { height: { xs: 50, md: 51 }, shape: { kind: "chips", count: 8 } },
  { height: { xs: 157, sm: 282, md: 365, lg: 439 }, shape: { kind: "banner" } },
  { height: { xs: 350, sm: 356, md: 296 }, shape: { kind: "cards", heading: "left", columns: { xs: 2, md: 4 } } },
  { height: { xs: 525, sm: 412, md: 497 }, shape: { kind: "split" } },
  { height: { xs: 513, sm: 487, md: 529, lg: 570 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, sm: 2, md: 3 } } },
  { height: { xs: 561, sm: 539, md: 577, lg: 617 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, sm: 2, md: 3 } } },
  { height: { xs: 635, sm: 1131, md: 526, lg: 575 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 2 } } },
  { height: { xs: 1096, sm: 979, md: 974 }, shape: { kind: "rows", heading: "left", count: 6 } },
  { height: { xs: 533, sm: 510, md: 565 }, shape: { kind: "split" } },
  APP_DOWNLOAD,
];

/* ---------- blogs (/exams…) — inside the exams layout, which keeps its category bar, app card and Important Exams ---------- */

/** /exams and /exams/<category>: lead story, latest notifications, then the news grid. */
export const BLOG_INDEX_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 843, md: 563, lg: 503 }, shape: { kind: "split" } },
  { height: { xs: 1314, md: 629, lg: 515 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 7861, md: 4803, lg: 3918 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, sm: 2, md: 3 }, rows: { xs: 10, sm: 5, md: 4 } } },
];

/** /exams/<category>/<post>: promo banner, the article, then related posts. */
export const ARTICLE_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 157, sm: 282, md: 365, lg: 439 }, shape: { kind: "banner" } },
  { height: { xs: 3295, sm: 2957, md: 3343 }, shape: { kind: "text", heading: "left", paragraphs: 10 } },
  { height: { xs: 1416, sm: 1877, md: 1334 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, sm: 2, md: 3 }, rows: { xs: 3, sm: 2, md: 1 } } },
];

/* ---------- company and policy pages ---------- */

export const ABOUT_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 580, md: 610 }, shape: { kind: "split" } },
  { height: { xs: 513, md: 369, lg: 352 }, shape: { kind: "split", reverse: true } },
  { height: { xs: 710, md: 510 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 874, md: 612 }, shape: { kind: "split" } },
  { height: { xs: 1735, md: 2171 }, shape: { kind: "rows", heading: "center", count: 8 } },
  { height: { xs: 935, md: 536, lg: 509 }, shape: { kind: "cards", heading: "center", columns: { xs: 2, md: 4 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 336, md: 254 }, shape: { kind: "banner" } },
  { height: { xs: 613, md: 407 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
];

export const CAREERS_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 655, md: 513, lg: 510 }, shape: { kind: "split" } },
  { height: { xs: 631, md: 474 }, shape: { kind: "cards", heading: "center", columns: { xs: 2, md: 4 }, rows: { xs: 2, md: 1 } } },
  { height: { xs: 478, md: 986, lg: 1040 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 3 }, rows: { xs: 1, md: 2 } } },
  { height: { xs: 900, md: 948 }, shape: { kind: "cards", heading: "center", columns: { xs: 2, md: 3 }, rows: { xs: 3, md: 2 } } },
  { height: { xs: 1093, md: 714 }, shape: { kind: "cards", heading: "center", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 2740, md: 1746, lg: 1526 }, shape: { kind: "rows", heading: "left", count: 8 } },
];

export const CAREER_OPENING_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 420, md: 380 }, shape: { kind: "titleBand" } },
  { height: { xs: 1800, md: 1400 }, shape: { kind: "text", paragraphs: 5 } },
];

export const CONTACT_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 452, md: 409 }, shape: { kind: "titleBand" } },
  { height: { xs: 889, md: 347, lg: 323 }, shape: { kind: "cards", heading: "left", columns: { xs: 1, md: 3 }, rows: { xs: 3, md: 1 } } },
  { height: { xs: 1520, md: 804 }, shape: { kind: "split" } },
  { height: { xs: 380, md: 344 }, shape: { kind: "banner" } },
];

/** Privacy policy, refund policy, terms. */
export const POLICY_SKELETON: SectionSkeletonSpec[] = [
  { height: { xs: 382, md: 410 }, shape: { kind: "titleBand" } },
  { height: { xs: 305, md: 103 }, shape: { kind: "tiles", columns: { xs: 1, md: 3 }, count: 3 } },
  { height: { xs: 9892, md: 6899, lg: 6303 }, shape: { kind: "text", paragraphs: 24 } },
];
