import { COLORS } from "./colors";

/** Styles shared by the editor and the public page so the preview matches the site. */
export const richTextSx = {
  color: COLORS.body,
  fontSize: { xs: "0.9rem", md: "0.98rem" },
  lineHeight: 1.75,
  "& > :first-of-type": { mt: 0 },
  "& p": { m: 0, mb: 1.5 },
  "& h2": { fontSize: "1.3rem", fontWeight: 800, color: COLORS.ink, mt: 2.5, mb: 1 },
  "& h3": { fontSize: "1.12rem", fontWeight: 800, color: COLORS.ink, mt: 2, mb: 1 },
  "& h4": { fontSize: "1rem", fontWeight: 800, color: COLORS.ink, mt: 1.5, mb: 0.75 },
  "& ul, & ol": { pl: 3, mt: 0, mb: 1.5 },
  "& li p": { mb: 0.5 },
  "& a": { color: COLORS.red, fontWeight: 600 },
  "& blockquote": { m: 0, mb: 1.5, pl: 2, borderLeft: `3px solid ${COLORS.red}`, color: COLORS.muted, fontStyle: "italic" },
  "& hr": { border: "none", borderTop: `1px solid ${COLORS.border}`, my: 2 },
  "& table": { width: "100%", borderCollapse: "collapse", mb: 1.5, fontSize: "0.92em", tableLayout: "fixed" },
  "& th, & td": { border: `1px solid ${COLORS.border}`, p: "8px 10px", verticalAlign: "top", textAlign: "left", position: "relative" },
  "& th": { bgcolor: COLORS.surface, fontWeight: 800, color: COLORS.ink },
  "& th p, & td p": { mb: 0 },
  "& .tableWrapper": { overflowX: "auto" },
  "& .selectedCell::after": { content: '""', position: "absolute", inset: 0, bgcolor: "rgba(220, 38, 38, 0.08)", pointerEvents: "none" },
  "& .column-resize-handle": { position: "absolute", right: -2, top: 0, bottom: 0, width: 4, bgcolor: COLORS.red, pointerEvents: "none" },
} as const;
