import type { SectionKey } from "@/lib/adminAccess";

/** Course sections managed under Web → Courses: their admin access, address and wording. */
export const COURSE_ADMIN_SECTIONS = {
  "gs-foundation": {
    title: "GS Foundation",
    access: "gsFoundation",
    path: "/admin/web/courses/gs-foundation",
    subtitle: "Pages in the GS Foundation menu that are managed here. Their menu names and links are in Header & Menu.",
  },
  mentorship: {
    title: "Mentorship",
    access: "mentorship",
    path: "/admin/web/courses/mentorship",
    subtitle: "Pages in the Mentorship menu that are managed here. Their menu names and links are in Header & Menu.",
  },
} as const satisfies Record<string, { title: string; access: SectionKey; path: string; subtitle: string }>;

export type CourseAdminSection = keyof typeof COURSE_ADMIN_SECTIONS;

/** The settings of a page's course section (GS Foundation for unknown ones). */
export const courseAdminSection = (section: string) => COURSE_ADMIN_SECTIONS[section as CourseAdminSection] || COURSE_ADMIN_SECTIONS["gs-foundation"];
