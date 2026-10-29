import type { Metadata } from "next";
import { CourseSectionEditorPage } from "@/sections/Admin/courses/CourseSectionRoutes";

export const metadata: Metadata = { title: "Mentorship page" };
export const dynamic = "force-dynamic";

type Params = Promise<{ slug: string }>;

export default async function MentorshipPageEditor({ params }: { params: Params }) {
  const { slug } = await params;

  return <CourseSectionEditorPage section="mentorship" slug={slug} />;
}
