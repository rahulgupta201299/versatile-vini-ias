import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Header & Menu: admins with Header & Menu access. */
export default function HeaderLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["header"]}>{children}</AccessGate>;
}
