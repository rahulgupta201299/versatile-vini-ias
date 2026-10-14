import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.upscPlanB;
type Params = Promise<{ planB: string }>;

/** UPSC Plan B pages (/courses/upsc-plan-b/<page>) are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((planB) => ({ planB }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { planB } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, planB), SECTION);
}

export default async function PlanBPage({ params }: { params: Params }) {
  const { planB } = await params;
  const page = await getCourseSectionPage(SECTION, planB);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
