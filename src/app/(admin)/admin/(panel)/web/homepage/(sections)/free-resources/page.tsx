import type { Metadata } from "next";
import { loadAdminData } from "@/lib/adminData";
import { AdminFreeResource } from "@/types";
import { PageHeader } from "@/sections/Admin/ui";
import FreeResourceManager from "@/sections/Admin/homepage/FreeResourceManager";

export const metadata: Metadata = { title: "Free resources" };
export const dynamic = "force-dynamic";

export default async function FreeResourcesPage() {
  const resources = await loadAdminData<AdminFreeResource[]>("admin/homepage/free-resources");

  return (
    <>
      <PageHeader eyebrow="Web / Homepage / Free resources" title="Free resources" subtitle="The “Browse Our Free Resources” tiles on the homepage — icon, colour, title and where each one opens." />
      <FreeResourceManager resources={resources} />
    </>
  );
}
