import { ARTICLE_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** A blog article: every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={ARTICLE_SKELETON} />;
}
