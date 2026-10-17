import type { Viewport } from "next";

/** VINI AI is a standalone sub-brand: its page renders its own header and bottom actions — no site header/footer. */
export const viewport: Viewport = { themeColor: "#EC5530" };

export default function ViniAiLayout({ children }: { children: React.ReactNode }) {
  return <main>{children}</main>;
}
