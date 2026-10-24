import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminFooterSection } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import FooterManager from "@/sections/Admin/footer/FooterManager";

export const metadata: Metadata = { title: "Footer" };
export const dynamic = "force-dynamic";

export default async function FooterPage() {
  const sections = await loadAdminData<AdminFooterSection[]>("admin/footer");

  return (
    <>
      <PageHeader eyebrow="Web / Footer" title="Footer" subtitle="The footer sections on every page. Centres, contact details, quick links and products stay as they are." />
      <FooterManager sections={sections} />
    </>
  );
}
