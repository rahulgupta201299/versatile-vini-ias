import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.ethicsEssay;
type Params = Promise<{ ethicsEssay: string }>;

/** Ethics & Essay pages (/courses/ethics-essay/<page>) are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((ethicsEssay) => ({ ethicsEssay }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { ethicsEssay } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, ethicsEssay), SECTION);
}

export default async function EthicsEssayPage({ params }: { params: Params }) {
  const { ethicsEssay } = await params;
  const page = await getCourseSectionPage(SECTION, ethicsEssay);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
