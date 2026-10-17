import { AppLayout } from "@/components";

/** Every main-site page (/, /exams, /courses, /careers, …) gets the site header, footer and popups. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <AppLayout>{children}</AppLayout>;
}
