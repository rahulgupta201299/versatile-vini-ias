import { ACCESS } from "@/lib/adminAccess";
import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Footer: Web Managers and Editors. */
export default function FooterLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate access={ACCESS.footer}>{children}</AccessGate>;
}
