import { notFound, redirect } from "next/navigation";
import { isCourseSection } from "@/utils/slug";

type Params = Promise<{ section: string }>;

/** No listing page per section yet — send visitors to the courses section on the homepage. */
export default async function CourseSectionPage({ params }: { params: Params }) {
  const { section } = await params;

  if (!isCourseSection(section)) notFound();

  redirect("/#courses");
}
