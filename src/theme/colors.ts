/**
 * Vini IAS theme colours — the single source of truth.
 * Import with:  import { COLORS } from "@/theme/colors";
 * (The MUI theme in ./theme.ts is built from these too.)
 */
export const COLORS = {
  /* Brand red — RGB 254, 0, 52 */
  red: "#FE0034",
  redDark: "#CC002A",
  redDarker: "#99001F",
  redLight: "#FF3358",
  /** Light red surfaces (Store / Login pills, chips, selected states) */
  redTint: "#FFF0F3",
  redTintSoft: "#FFF5F7",
  redTintHover: "#FFE0E6",
  redBorder: "#FFCCD6",

  /* Brand yellow — RGB 255, 229, 31 */
  yellow: "#FFE51F",
  yellowDark: "#F2D500",

  /* Deep navy — headings & dark bands on course landing pages */
  navy: "#13294B",
  navyDark: "#0C1C36",

  /* Text */
  ink: "#0F172A",
  heading: "#1E293B",
  body: "#334155",
  textSecondary: "#475569",
  muted: "#64748B",
  disabled: "#94A3B8",

  /* Lines & surfaces */
  border: "#E2E8F0",
  borderLight: "#E5E7EB",
  surface: "#F8FAFC",

  /* Status */
  success: "#16A34A",
} as const;

export type ColorName = keyof typeof COLORS;
