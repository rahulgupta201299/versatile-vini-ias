import { CourseSectionGate } from "@/sections/Admin/courses/CourseSectionRoutes";

/** Web → Courses → GS Foundation: admins with GS Foundation access. */
export default function GsFoundationLayout({ children }: { children: React.ReactNode }) {
  return <CourseSectionGate section="gs-foundation">{children}</CourseSectionGate>;
}
