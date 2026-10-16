import { COLORS } from "@/theme/colors";

/* Header-style pills: light red (like "Store") and solid red (like "Login"). */
const pillBase = { display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.75, height: 42, px: 2.25, borderRadius: "999px", fontFamily: "inherit", fontWeight: 700, fontSize: "0.92rem", textDecoration: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "background-color .2s, border-color .2s, box-shadow .2s", "&:disabled": { opacity: 0.55, cursor: "not-allowed", boxShadow: "none" } } as const;
export const lightPill = { ...pillBase, color: COLORS.red, bgcolor: COLORS.redTint, border: `1.5px solid ${COLORS.redBorder}`, "&:hover:not(:disabled)": { bgcolor: COLORS.redTintHover, borderColor: "#FFB3C2" } } as const;
export const solidPill = { ...pillBase, color: "#FFFFFF", bgcolor: COLORS.red, border: `1.5px solid ${COLORS.red}`, "&:hover:not(:disabled)": { bgcolor: COLORS.redDark, borderColor: COLORS.redDark, boxShadow: "0 4px 12px rgba(254,0,52,.25)" } } as const;

/** Rounded input/select used across the careers pages. */
export const fieldSx = {
  height: 46,
  width: "100%",
  px: 1.75,
  borderRadius: "12px",
  border: `1.5px solid ${COLORS.border}`,
  bgcolor: "#FFFFFF",
  fontFamily: "inherit",
  fontSize: "0.95rem",
  color: COLORS.ink,
  outline: "none",
  transition: "border-color .2s, box-shadow .2s",
  "&:focus": { borderColor: COLORS.red, boxShadow: `0 0 0 3px ${COLORS.redTint}` },
  "&::placeholder": { color: "#9CA3AF" },
  "&:disabled": { bgcolor: COLORS.surface, color: COLORS.muted },
} as const;
