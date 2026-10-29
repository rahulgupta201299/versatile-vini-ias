import { ABOUT_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** About Us: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={ABOUT_SKELETON} />;
}
