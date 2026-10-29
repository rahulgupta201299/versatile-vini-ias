import type { Metadata } from "next";
import { CourseSectionListPage } from "@/sections/Admin/courses/CourseSectionRoutes";

export const metadata: Metadata = { title: "Mentorship" };
export const dynamic = "force-dynamic";

export default function MentorshipPage() {
  return <CourseSectionListPage section="mentorship" />;
}
