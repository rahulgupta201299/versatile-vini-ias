/** Homepage → "Study Resources" cards (replaces the old "Crack UPSC with our Expert Guidance" callback). */
export type StudyResourceLink = "store" | string;

export interface StudyResource {
  title: string;
  text: string;
  /** A page / URL, or "store" for the Store link from admin → Header & Menu. */
  href: StudyResourceLink;
  /** Card background and the book colours in its artwork. */
  tint: string;
  books: [string, string, string];
  /** Short word printed on the books, e.g. "NCERT". */
  label: string;
}

export const STUDY_RESOURCES: StudyResource[] = [
  {
    title: "Reference Books",
    text: "Our experts have created thorough study materials that break down complicated concepts into easily understandable content",
    href: "store",
    tint: "#EEF4FB",
    books: ["#E23B3B", "#F4A21D", "#1F2937"],
    label: "UPSC",
  },
  {
    title: "Current Affairs",
    text: "Daily news analysis, editorials and MCQs linked to the UPSC syllabus so you never miss what matters",
    href: "/courses/free-resources/current-affairs",
    tint: "#FDF6E7",
    books: ["#2563EB", "#FE0034", "#0F766E"],
    label: "DAILY",
  },
  {
    title: "Monthly Magazine",
    text: "A month of current affairs in one place — summaries, maps and practice questions for quick revision",
    href: "/courses/free-resources/monthly-magazine",
    tint: "#FDEFF2",
    books: ["#7C3AED", "#FE0034", "#F59E0B"],
    label: "MONTHLY",
  },
  {
    title: "PRISM Simplified",
    text: "Government schemes, reports and indices explained simply, with the facts you need for Prelims and Mains",
    href: "/courses/free-resources/prism-simplified",
    tint: "#ECF8F1",
    books: ["#16A34A", "#13294B", "#E23B3B"],
    label: "PRISM",
  },
];
