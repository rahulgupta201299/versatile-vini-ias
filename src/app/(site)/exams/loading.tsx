import { BLOG_INDEX_SKELETON, PageSectionsSkeleton } from "@/components/skeletons";

/** Blogs (/exams and /exams/<category>): every section as a shimmer at its real height. */
export default function Loading() {
  return <PageSectionsSkeleton sections={BLOG_INDEX_SKELETON} />;
}
