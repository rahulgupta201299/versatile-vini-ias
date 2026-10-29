import { notFound } from "next/navigation";
import { loadAdminData } from "@/lib/adminData";
import { AdminCoursePage, AdminCoursePageSummary } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import AccessGate from "@/sections/Admin/AccessGate";
import CoursePagesList from "./CoursePagesList";
import CoursePageEditor from "./CoursePageEditor";
import { COURSE_ADMIN_SECTIONS, CourseAdminSection } from "./courseSections";

/* Server pages shared by every Web → Courses section (GS Foundation, Mentorship). */

const eyebrowOf = (section: CourseAdminSection) => `Web / Courses / ${COURSE_ADMIN_SECTIONS[section].title}`;

/** Layout: admins with this section's access. */
export function CourseSectionGate({ section, children }: { section: CourseAdminSection; children: React.ReactNode }) {
  return <AccessGate sections={[COURSE_ADMIN_SECTIONS[section].access]}>{children}</AccessGate>;
}

/** The section's pages, each opening its editor. */
export async function CourseSectionListPage({ section }: { section: CourseAdminSection }) {
  const { title, subtitle } = COURSE_ADMIN_SECTIONS[section];
  const pages = await loadAdminData<AdminCoursePageSummary[]>("admin/courses");

  return (
    <>
      <PageHeader eyebrow={eyebrowOf(section)} title={title} subtitle={subtitle} />
      <CoursePagesList pages={pages.filter((page) => page.section === section)} />
    </>
  );
}

/** One page's editor (404 when the page isn't in this section). */
export async function CourseSectionEditorPage({ section, slug }: { section: CourseAdminSection; slug: string }) {
  const pages = await loadAdminData<AdminCoursePageSummary[]>("admin/courses");
  const summary = pages.find((page) => page.section === section && page.slug === slug);

  if (!summary) notFound();

  const page = await loadAdminData<AdminCoursePage>(`admin/courses/${summary._id}`);

  return (
    <>
      <PageHeader eyebrow={eyebrowOf(section)} title={page.label} subtitle={`/courses/${page.section}/${page.slug} · changes go live as soon as each part is saved.`} />
      <CoursePageEditor page={page} />
    </>
  );
}
