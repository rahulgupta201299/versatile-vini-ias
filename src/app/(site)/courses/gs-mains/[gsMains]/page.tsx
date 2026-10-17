import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.gsMains;
type Params = Promise<{ gsMains: string }>;

/** GS Mains menu items (/courses/gs-mains/<page>) are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((gsMains) => ({ gsMains }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { gsMains } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, gsMains), SECTION);
}

export default async function GsMainsPage({ params }: { params: Params }) {
  const { gsMains } = await params;
  const page = await getCourseSectionPage(SECTION, gsMains);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
