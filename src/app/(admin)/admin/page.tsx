import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { firstAllowedPath } from "@/sections/Admin/adminNav";

export const dynamic = "force-dynamic";

/** /admin → the first section this admin can open (by role). */
export default async function AdminIndex() {
  const admin = await getAdminSession();

  if (!admin) redirect("/admin/login");

  redirect(firstAllowedPath(admin) || "/admin/web");
}
