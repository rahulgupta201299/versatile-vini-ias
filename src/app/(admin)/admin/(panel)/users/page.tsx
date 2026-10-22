import type { Metadata } from "next";
import { getAdminSession } from "@/lib/adminAuth";
import { loadAdminData } from "@/lib/adminData";
import { AdminAccount, AdminRoleInfo } from "@/types";
import AdminUsers from "@/sections/Admin/users/AdminUsers";

export const metadata: Metadata = { title: "Admin users" };
export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const [admins, roles, currentAdmin] = await Promise.all([loadAdminData<AdminAccount[]>("admin/admins"), loadAdminData<AdminRoleInfo[]>("admin/admins/roles"), getAdminSession()]);

  return <AdminUsers admins={admins} roles={roles} currentAdminId={currentAdmin?.id} />;
}
