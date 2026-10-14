import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.freeResources;
type Params = Promise<{ resource: string }>;

/** Free Resources pages (/courses/free-resources/<page>) are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((resource) => ({ resource }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { resource } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, resource), SECTION);
}

export default async function FreeResourceSectionPage({ params }: { params: Params }) {
  const { resource } = await params;
  const page = await getCourseSectionPage(SECTION, resource);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
