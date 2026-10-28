import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminContact } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import ContactEditor from "@/sections/Admin/contact/ContactEditor";

export const metadata: Metadata = { title: "Contact Info" };
export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const contact = await loadAdminData<AdminContact>("admin/contact");

  return (
    <>
      <PageHeader eyebrow="Web / Contact Info" title="Contact Info" subtitle="One place for the phone, WhatsApp, email and website shown across the website." />
      <ContactEditor contact={contact} />
    </>
  );
}
