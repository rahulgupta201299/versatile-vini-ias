import { CAREERS_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** Careers: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={CAREERS_SKELETON} />;
}
