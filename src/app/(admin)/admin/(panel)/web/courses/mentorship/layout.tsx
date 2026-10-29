import { CourseSectionGate } from "@/sections/Admin/courses/CourseSectionRoutes";

/** Web → Courses → Mentorship: admins with Mentorship access. */
export default function MentorshipLayout({ children }: { children: React.ReactNode }) {
  return <CourseSectionGate section="mentorship">{children}</CourseSectionGate>;
}
