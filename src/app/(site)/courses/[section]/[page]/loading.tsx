"use client";

import { usePathname } from "next/navigation";
import { COURSE_SKELETONS, courseSkeletonLayout, PageSectionsSkeleton } from "@/components/skeletons";

/** Course pages: the skeleton of the page's layout (picked from the address), every section at its real height. */
export default function Loading() {
  const pathname = usePathname();

  return <PageSectionsSkeleton sections={COURSE_SKELETONS[courseSkeletonLayout(pathname)]} />;
}
