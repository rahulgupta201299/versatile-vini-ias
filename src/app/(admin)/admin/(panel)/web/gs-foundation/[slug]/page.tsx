import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadAdminData } from "@/lib/adminData";
import { AdminCoursePage, AdminCoursePageSummary } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import CoursePageEditor from "@/sections/Admin/courses/CoursePageEditor";

export const metadata: Metadata = { title: "GS Foundation page" };
export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export default async function GsFoundationPageEditor({ params }: { params: Params }) {
  const { slug } = await params;
  const pages = await loadAdminData<AdminCoursePageSummary[]>("admin/courses");
  const summary = pages.find((page) => page.section === "gs-foundation" && page.slug === slug);

  if (!summary) notFound();

  const page = await loadAdminData<AdminCoursePage>(`admin/courses/${summary._id}`);

  return (
    <>
      <PageHeader eyebrow="Web / GS Foundation" title={page.label} subtitle={`/courses/${page.section}/${page.slug} · changes go live as soon as each part is saved.`} />
      <CoursePageEditor page={page} />
    </>
  );
}
