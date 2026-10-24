import AccessGate from "@/sections/Admin/AccessGate";

/** Team → Admin users: Super Admins and Admins (Admins manage Members only). */
export default function AdminUsersLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate users>{children}</AccessGate>;
}
