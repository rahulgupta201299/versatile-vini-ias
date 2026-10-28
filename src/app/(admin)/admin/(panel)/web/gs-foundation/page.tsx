import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminCoursePageSummary } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import CoursePagesList from "@/sections/Admin/courses/CoursePagesList";

export const metadata: Metadata = { title: "GS Foundation" };
export const dynamic = "force-dynamic";

export default async function GsFoundationPage() {
  const pages = await loadAdminData<AdminCoursePageSummary[]>("admin/courses");

  return (
    <>
      <PageHeader
        eyebrow="Web / GS Foundation"
        title="GS Foundation"
        subtitle="Pages in the GS Foundation menu that are managed here. Their menu names and links are in Header & Menu."
      />
      <CoursePagesList pages={pages.filter(({ section }) => section === "gs-foundation")} />
    </>
  );
}
