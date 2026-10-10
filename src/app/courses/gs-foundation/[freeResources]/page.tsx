import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.gsFoundation;
type Params = Promise<{ freeResources: string }>;

/** GS Foundation menu items are built ahead of time; new ones from the server render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((freeResources) => ({ freeResources }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { freeResources } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, freeResources), SECTION);
}

export default async function GsFoundationPage({ params }: { params: Params }) {
  const { freeResources } = await params;
  const page = await getCourseSectionPage(SECTION, freeResources);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
