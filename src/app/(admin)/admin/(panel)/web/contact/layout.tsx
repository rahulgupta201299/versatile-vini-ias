import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Contact Info: admins with Contact Info access. */
export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["contact"]}>{children}</AccessGate>;
}
