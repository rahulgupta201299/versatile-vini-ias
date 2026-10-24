import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminGoalExamWithDetails } from "@/types";
import GoalExamEditor from "@/sections/Admin/homepage/GoalExamEditor";

export const metadata: Metadata = { title: "Exam page" };
export const dynamic = "force-dynamic";

export default async function GoalExamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const exam = await loadAdminData<AdminGoalExamWithDetails>(`admin/homepage/select-your-goal/exams/${encodeURIComponent(id)}`);

  return <GoalExamEditor key={exam._id} exam={exam} />;
}
