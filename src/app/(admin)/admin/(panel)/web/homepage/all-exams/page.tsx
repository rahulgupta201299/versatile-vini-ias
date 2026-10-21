import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminExamCategoryWithSubCategories } from "@/types";
import AllExamsList from "@/sections/Admin/allExams/AllExamsList";

export const metadata: Metadata = { title: "All Exams" };
export const dynamic = "force-dynamic";

export default async function AllExamsPage() {
  const categories = await loadAdminData<AdminExamCategoryWithSubCategories[]>("admin/homepage/all-exams");

  return <AllExamsList categories={categories} />;
}
