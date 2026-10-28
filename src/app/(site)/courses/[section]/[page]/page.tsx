import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourseSectionPage, getCourseSectionSlugs } from "@/services";
import { COURSE_SECTION_SLUGS, isCourseSection } from "@/utils/slug";
import { CoursePageView, courseMetadata } from "../../_lib/coursePage";

type Params = Promise<{ section: string; page: string }>;

/** Every course page (/courses/<section>/<page>): the ones in the menus are built ahead, new ones render on first visit. */
export async function generateStaticParams() {
  const sections = await Promise.all(
    COURSE_SECTION_SLUGS.map(async (section) => (await getCourseSectionSlugs(section)).map((page) => ({ section, page }))),
  );

  return sections.flat();
}

/** The page's content, or null for an unknown section / page. */
const loadPage = async (section: string, slug: string) => {
  if (!isCourseSection(section)) return null;

  return getCourseSectionPage(section, slug);
};

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { section, page } = await params;

  return courseMetadata(await loadPage(section, page), section);
}

export default async function CoursePage({ params }: { params: Params }) {
  const { section, page: slug } = await params;
  const page = await loadPage(section, slug);

  if (!page) notFound();

  return <CoursePageView page={page} />;
}
