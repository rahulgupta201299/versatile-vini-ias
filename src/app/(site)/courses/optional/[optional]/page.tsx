import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.optional;
type Params = Promise<{ optional: string }>;

/** Optional subjects (/courses/optional/<subject>) — one template, content per subject are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((optional) => ({ optional }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { optional } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, optional), SECTION);
}

export default async function OptionalPage({ params }: { params: Params }) {
  const { optional } = await params;
  const page = await getCourseSectionPage(SECTION, optional);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
