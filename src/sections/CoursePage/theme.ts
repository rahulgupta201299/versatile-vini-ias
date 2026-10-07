import { COLORS } from "@/theme/colors";
/** Shared tokens for the course pages (project theme). */
export const RED = COLORS.red;
export const RED_DARK = COLORS.redDark;
export const RED_TINT = COLORS.redTint;
export const RED_BORDER = COLORS.redBorder;
export const YELLOW = COLORS.yellow;
export const INK = COLORS.ink;
export const BODY = COLORS.textSecondary;
export const MUTED = COLORS.muted;
export const LINE = COLORS.borderLight;

export const sectionSx = { py: { xs: 3.5, md: 5 } };
export const titleSx = {
  fontWeight: 800,
  fontSize: { xs: "1.3rem", md: "1.75rem" },
  lineHeight: 1.25,
  color: INK,
  letterSpacing: "-0.01em",
};

export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Extra offset for the sticky tab bar (globals.css already adds 80px for the fixed header). */
export const anchorSx = { scrollMarginTop: { xs: 44, lg: 48 } };
