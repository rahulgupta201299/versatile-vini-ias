import { CAREER_OPENING_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** A job opening: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={CAREER_OPENING_SKELETON} />;
}
