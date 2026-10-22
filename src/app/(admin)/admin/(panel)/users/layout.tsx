import { ACCESS } from "@/lib/adminAccess";
import AccessGate from "@/sections/Admin/AccessGate";

/** Team → Admin users: Super Admin only. */
export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate access={ACCESS.adminUsers}>{children}</AccessGate>;
}
