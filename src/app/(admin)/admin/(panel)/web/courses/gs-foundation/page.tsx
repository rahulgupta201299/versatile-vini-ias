import type { Metadata } from "next";
import { CourseSectionListPage } from "@/sections/Admin/courses/CourseSectionRoutes";

export const metadata: Metadata = { title: "GS Foundation" };
export const dynamic = "force-dynamic";

export default function GsFoundationPage() {
  return <CourseSectionListPage section="gs-foundation" />;
}
