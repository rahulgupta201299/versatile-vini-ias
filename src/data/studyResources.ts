/** Homepage → "Study Resources" cards (layout after pw.live; VINI's own artwork). */
export interface StudyResource {
  title: string;
  text: string;
  /** A page / URL, or "store" for the Store link from admin → Header & Menu. */
  href: string;
  tint: string;
  image: { src: string; alt: string };
}

export const STUDY_RESOURCES: StudyResource[] = [
  {
    title: "Reference Books",
    text: "Our experts have created thorough study materials that break down complicated concepts into easily understandable content",
    href: "store",
    tint: "#F1F8FD",
    image: { src: "/images/study-resources/vini-foundation-books-set.webp", alt: "VINI IAS UPSC and BPSC Foundation books" },
  },
  {
    title: "Current Affairs",
    text: "Daily news analysis, editorials and MCQs linked to the UPSC syllabus, so you never miss what matters for the exam",
    href: "/courses/free-resources/current-affairs",
    tint: "#FDF9EF",
    image: { src: "/images/study-resources/vini-current-affairs.webp", alt: "VINI IAS monthly current affairs snapshot pages" },
  },
  {
    title: "Monthly Magazine",
    text: "A month of current affairs in one place, with summaries, maps and practice questions in easy-to-revise language",
    href: "/courses/free-resources/monthly-magazine",
    tint: "#EDFCF5",
    image: { src: "/images/study-resources/vini-monthly-magazine.webp", alt: "VINI IAS Monthly Current Affairs Magazine" },
  },
  {
    title: "Study Notes",
    text: "Chapter-wise notes with timelines, tables and diagrams, made for quick revision of Prelims and Mains topics",
    href: "https://viniias.com/exam/notes",
    tint: "#F5F2FD",
    image: { src: "/images/study-resources/vini-study-notes.webp", alt: "VINI IAS chapter-wise study notes on Ancient India and Indian Polity" },
  },
];
