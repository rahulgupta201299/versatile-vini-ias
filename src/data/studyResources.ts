/** Homepage → "Study Resources" cards (layout after pw.live; artwork is our own). */
export type StudyResourceArt = "papers" | "notes";

export interface StudyResource {
  title: string;
  text: string;
  /** A page / URL, or "store" for the Store link from admin → Header & Menu. */
  href: string;
  tint: string;
  /** A photo for the card; when set it is shown instead of the drawn art. */
  image?: { src: string; alt: string };
  art?: StudyResourceArt;
}

export const STUDY_RESOURCES: StudyResource[] = [
  {
    title: "Reference Books",
    text: "Our experts have created thorough study materials that break down complicated concepts into easily understandable content",
    href: "store",
    tint: "#F1F8FD",
    image: { src: "/images/study-resources/vini-reference-books.webp", alt: "VINI Publication books on display" },
  },
  {
    title: "Current Affairs",
    text: "Daily news analysis, editorials and MCQs linked to the UPSC syllabus, so you never miss what matters for the exam",
    href: "/courses/free-resources/current-affairs",
    tint: "#FDF9EF",
    art: "papers",
  },
  {
    title: "Monthly Magazine",
    text: "A month of current affairs in one place, with summaries, maps and practice questions in easy-to-revise language",
    href: "/courses/free-resources/monthly-magazine",
    tint: "#EDFCF5",
    art: "notes",
  },
];
