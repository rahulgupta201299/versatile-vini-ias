import AdminErrorState from "@/sections/Admin/AdminErrorState";

/** An exam that doesn't exist (wrong or old link). */
export default function GoalExamNotFound() {
  return (
    <AdminErrorState
      variant="not-found"
      title="Exam not found"
      message="This exam doesn't exist — the link may be wrong or out of date. Nothing is ever deleted, so look for it in Select Your Goal (inactive exams are listed separately)."
      backHref="/admin/web/homepage/select-your-goal"
      backLabel="Back to Select Your Goal"
    />
  );
}
