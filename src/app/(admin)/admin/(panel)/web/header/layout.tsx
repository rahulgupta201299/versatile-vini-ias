import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Header: admins with Header access. */
export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["header"]}>{children}</AccessGate>;
}
