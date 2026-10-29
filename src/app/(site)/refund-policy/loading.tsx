import { POLICY_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** Refund Policy: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={POLICY_SKELETON} />;
}
