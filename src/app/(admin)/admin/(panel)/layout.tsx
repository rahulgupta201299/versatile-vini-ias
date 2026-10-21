import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import AdminShell from "@/sections/Admin/AdminShell";

export const dynamic = "force-dynamic";

/** Signed-in admin panel: checks the session once, then renders the sidebar + top bar around every panel page. */
export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  const admin = await getAdminSession();
  if (!admin) redirect("/admin/login");
  return <AdminShell admin={admin}>{children}</AdminShell>;
}
