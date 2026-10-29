import { CONTACT_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** Contact Us: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={CONTACT_SKELETON} />;
}
