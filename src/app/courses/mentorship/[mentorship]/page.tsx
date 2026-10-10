import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTIONS } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

const SECTION = COURSE_SECTIONS.mentorship;
type Params = Promise<{ mentorship: string }>;

/** Mentorship menu items (/courses/mentorship/<page>) are built ahead of time; new ones render on first visit. */
export const dynamicParams = true;
export async function generateStaticParams() {
  return (await getCourseSectionSlugs(SECTION)).map((mentorship) => ({ mentorship }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { mentorship } = await params;
  return courseMetadata(await getCourseSectionPage(SECTION, mentorship), SECTION);
}

export default async function MentorshipPage({ params }: { params: Params }) {
  const { mentorship } = await params;
  const page = await getCourseSectionPage(SECTION, mentorship);
  if (!page) notFound();
  return <CoursePageView page={page} />;
}
