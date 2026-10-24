import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminGoalCategory } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import SelectYourGoalManager from "@/sections/Admin/homepage/SelectYourGoalManager";

export const metadata: Metadata = { title: "Select Your Goal" };
export const dynamic = "force-dynamic";

export default async function SelectYourGoalPage() {
  const categories = await loadAdminData<AdminGoalCategory[]>("admin/homepage/select-your-goal");

  return (
    <>
      <PageHeader eyebrow="Web / Homepage / Select Your Goal" title="Select Your Goal" subtitle="Exam category tabs and their exam cards. Each exam links to its goal page — switch categories or exams off instead of deleting them." />
      <SelectYourGoalManager categories={categories} />
    </>
  );
}
