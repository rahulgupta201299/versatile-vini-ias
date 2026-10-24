import type { Metadata } from "next";
import { getAdminSession } from "@/lib/adminAuth";
import { loadAdminData } from "@/lib/adminData";
import { AdminAccessOptions, AdminAccount } from "@/types";
import AdminUsers from "@/sections/Admin/users/AdminUsers";

export const metadata: Metadata = { title: "Admin users" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [admins, options, currentAdmin] = await Promise.all([
    loadAdminData<AdminAccount[]>("admin/admins"),
    loadAdminData<AdminAccessOptions>("admin/admins/access-options"),
    getAdminSession(),
  ]);

  return <AdminUsers admins={admins} options={options} viewer={currentAdmin} />;
}
