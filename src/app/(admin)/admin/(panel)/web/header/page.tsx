import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminHeaderSection } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import HeaderManager from "@/sections/Admin/header/HeaderManager";

export const metadata: Metadata = { title: "Header & Menu" };
export const dynamic = "force-dynamic";

export default async function HeaderPage() {
  const sections = await loadAdminData<AdminHeaderSection[]>("admin/header");

  return (
    <>
      <PageHeader
        eyebrow="Web / Header & Menu"
        title="Header & Menu"
        subtitle="The menus at the top of every page, the mobile menu, the Store button and trending searches. “All Exams” is managed in Homepage → All Exams and always comes first."
      />
      <HeaderManager sections={sections} />
    </>
  );
}
