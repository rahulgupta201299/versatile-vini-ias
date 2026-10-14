import type { LucideIcon } from "lucide-react";
import { Banknote, BookOpen, Building2, Cpu, FileText, GraduationCap, HeartPulse, Landmark, Newspaper, Plane, Shield, Stethoscope, TrainFront } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Icon per exam category (falls back to a newspaper). */
const ICONS: Record<string, LucideIcon> = {
  upsc: Landmark,
  "state-psc": Building2,
  ssc: FileText,
  railways: TrainFront,
  teaching: GraduationCap,
  nursing: Stethoscope,
  board: BookOpen,
  "study-abroad": Plane,
  defence: Shield,
  banking: Banknote,
  engineering: Cpu,
  medical: HeartPulse,
};
export const categoryIcon = (slug: string) => ICONS[slug] ?? Newspaper;

/** Brand gradients for drawn covers, picked per post so neighbours differ. */
const TONES = [
  `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyDark} 100%)`,
  `linear-gradient(135deg, ${COLORS.red} 0%, ${COLORS.redDarker} 100%)`,
  `linear-gradient(135deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 55%, ${COLORS.redDark} 100%)`,
];
export function coverTone(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

/** "12 Oct 2026" — fixed locale + UTC so server and client render the same text. */
export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(iso));

/** "October 12, 2026" or "October 12, 2026 6:52 PM" (IST) when the ISO value has a time. */
export const formatDateTime = (iso: string) => {
  const hasTime = iso.includes("T");
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    ...(hasTime ? { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" } : { timeZone: "UTC" }),
  }).format(new Date(iso)).replace(" at ", " ");
};
