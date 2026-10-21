import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** A sub category that doesn't exist (wrong or old link). */
export default function SubCategoryNotFound() {
  return (
    <AdminErrorState
      variant="not-found"
      title="Sub category not found"
      message="This sub category doesn't exist — the link may be wrong or out of date. Nothing is ever deleted, so look for it in the All Exams list (inactive items are listed separately)."
      backHref="/admin/web/homepage/all-exams"
      backLabel="Back to All Exams"
    />
  );
}
