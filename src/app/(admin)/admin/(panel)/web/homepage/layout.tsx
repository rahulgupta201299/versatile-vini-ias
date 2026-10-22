import { ACCESS } from "@/lib/adminAccess";
import AccessGate from "@/sections/Admin/AccessGate";

/** Web → Homepage (and All Exams): Web Managers and Editors. */
export default function HomepageLayout({ children }: { children: React.ReactNode }) {
  return <AccessGate access={ACCESS.homepage}>{children}</AccessGate>;
}
