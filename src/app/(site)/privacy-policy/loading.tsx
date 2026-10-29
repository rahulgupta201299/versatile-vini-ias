import { POLICY_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** Privacy Policy: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={POLICY_SKELETON} />;
}
