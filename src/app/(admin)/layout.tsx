import type { Metadata } from "next";

/** Admin panel — separate route group: no site header/footer/popups, never indexed, not linked anywhere on the site. */
export const metadata: Metadata = {
  title: { default: "Admin | VINI IAS", template: "%s | VINI IAS Admin" },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
