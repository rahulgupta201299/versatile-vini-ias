import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminExamCategoryWithSubCategories } from "@/types";
import ExamEditor from "@/sections/Admin/allExams/ExamEditor";

export const metadata: Metadata = { title: "New sub category" };
export const dynamic = "force-dynamic";

export default async function NewSubCategoryPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const [{ category = "" }, list] = await Promise.all([searchParams, loadAdminData<AdminExamCategoryWithSubCategories[]>("admin/homepage/all-exams")]);
  const categories = list.map(({ _id, name, isActive, order }) => ({ _id, name, isActive, order }));

  return <ExamEditor categories={categories} defaultCategoryId={category} />;
}
