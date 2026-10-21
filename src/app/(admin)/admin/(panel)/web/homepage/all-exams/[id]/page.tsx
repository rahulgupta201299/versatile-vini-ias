import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminExamCategoryWithSubCategories, AdminSubCategory } from "@/types";
import ExamEditor from "@/sections/Admin/allExams/ExamEditor";

export const metadata: Metadata = { title: "Edit sub category" };
export const dynamic = "force-dynamic";

export default async function EditSubCategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [subCategory, list] = await Promise.all([
    loadAdminData<AdminSubCategory>(`admin/homepage/all-exams/sub-categories/${encodeURIComponent(id)}`),
    loadAdminData<AdminExamCategoryWithSubCategories[]>("admin/homepage/all-exams"),
  ]);
  const categories = list.map(({ _id, name, isActive, order }) => ({ _id, name, isActive, order }));

  return <ExamEditor key={subCategory._id} subCategory={subCategory} categories={categories} />;
}
