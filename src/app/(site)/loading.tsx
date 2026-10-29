import { HOME_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** Homepage (and the addresses that redirect to it): every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={HOME_SKELETON} />;
}
