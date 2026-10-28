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
      <PageHeader eyebrow="Web / Footer" title="Footer" subtitle="Everything in the footer on every page: the Important Exams links above it, the Company footer columns next to the logo, Free Learning Resources and Our Ecosystem Brands. The logo, app buttons and social links stay as they are." />
      <FooterManager sections={sections} />
    </>
  );
}
