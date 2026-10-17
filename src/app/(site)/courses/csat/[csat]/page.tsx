import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.csat;
type Params = Promise<{ csat: string }>;

/** CSAT menu items (/courses/csat/<page>) are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((csat) => ({ csat }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { csat } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, csat), SECTION);
}

export default async function CsatPage({ params }: { params: Params }) {
  const { csat } = await params;
  const page = await getCourseSectionPage(SECTION, csat);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
