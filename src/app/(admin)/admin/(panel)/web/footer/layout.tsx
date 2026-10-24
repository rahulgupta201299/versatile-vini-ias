import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Footer: admins with Footer access. */
export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate sections={["footer"]}>{children}</AccessGate>;
}
