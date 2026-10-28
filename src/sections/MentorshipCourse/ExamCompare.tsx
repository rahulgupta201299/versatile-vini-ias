import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Check, X, Landmark, Building2 } from "lucide-react";
import { CompareCell, ExamCompareContent } from "@/types";
import { LANDING_ICONS, CHIP_TONES } from "@/sections/CourseLanding/icons";
import { COLORS } from "@/theme/colors";
import HighlightTitle from "@/components/HighlightTitle";

function Cell({ value, tone }: { value: CompareCell; tone: "exam" | "other" }) {
  if (value === true || value === false) {
    return (
      <Box role="img" aria-label={value ? "Yes" : "No"} sx={{ width: { xs: 28, md: 36 }, height: { xs: 28, md: 36 }, borderRadius: "50%", backgroundColor: value ? COLORS.success : "#DC2626", color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(15,23,42,.15)" }}>
        {value ? <Check size={20} strokeWidth={3.5} /> : <X size={20} strokeWidth={3.5} />}
      </Box>
    );
  }

  return (
    <Box sx={{ px: { xs: 1, md: 2 }, py: { xs: 0.75, md: 1 }, borderRadius: "10px", fontWeight: 700, fontSize: { xs: "0.72rem", md: "0.95rem" }, lineHeight: 1.3, textAlign: "center", border: `1px solid ${tone === "exam" ? "#C7D2FE" : COLORS.redBorder}`, backgroundColor: tone === "exam" ? "#EEF2FF" : COLORS.redTint, color: tone === "exam" ? COLORS.navy : COLORS.redDark }}>
      {value}
    </Box>
  );
}

/** "Why RBI Grade B? Plan B for UPSC CSE" — subject-wise ✓ / ✗ comparison with the Civil Services Exam. */
export default function ExamCompare({ data }: { data: ExamCompareContent }) {
  const [before, after] = data.title.split(data.highlight);
  const grid = { display: "grid", gridTemplateColumns: { xs: "minmax(0, 1.3fr) minmax(0, 1fr) minmax(0, 1fr)", md: "minmax(0, 1.1fr) minmax(0, 1fr) minmax(0, 1fr)" } };
  const head = { display: "flex", alignItems: "center", justifyContent: "center", gap: 1, py: { xs: 1.5, md: 2 }, px: 1, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.82rem", md: "1.35rem" }, textAlign: "center" as const };

  return (
    <Box component="section" sx={{ py: { xs: 3.5, md: 5 } }}>
      <Container>
        <HighlightTitle before={before} highlight={data.highlight} after={after} align="center" sx={{ mb: { xs: 2.5, md: 4 } }} />
        <Box role="table" aria-label={data.title} sx={{ maxWidth: 1100, mx: "auto", borderRadius: "16px", overflow: "hidden", border: `1px solid ${COLORS.border}`, backgroundColor: "#FFFFFF", boxShadow: "0 14px 32px rgba(15,23,42,.07)" }}>
          <Box role="row" sx={grid}>
            <Box role="columnheader" sx={{ ...head, background: "linear-gradient(120deg, #1E40AF 0%, #2563EB 100%)" }}>{data.columns.topic}</Box>
            <Box role="columnheader" sx={{ ...head, backgroundColor: COLORS.navy }}>
              <Box sx={{ display: { xs: "none", sm: "flex" }, width: 38, height: 38, borderRadius: "50%", border: `2px solid ${COLORS.yellow}`, color: COLORS.yellow, alignItems: "center", justifyContent: "center" }}><Building2 size={20} /></Box>
              {data.columns.exam}
            </Box>
            <Box role="columnheader" sx={{ ...head, backgroundColor: COLORS.red }}>
              <Box sx={{ display: { xs: "none", sm: "flex" }, width: 38, height: 38, borderRadius: "50%", border: "2px solid rgba(255,255,255,.8)", alignItems: "center", justifyContent: "center" }}><Landmark size={20} /></Box>
              {data.columns.other}
            </Box>
          </Box>
          {data.rows.map((r, i) => {
            const Icon = LANDING_ICONS[r.icon];
            const tone = CHIP_TONES[i % CHIP_TONES.length];
            const note = typeof r.exam === "string" || typeof r.other === "string";

            return (
              <Box role="row" key={r.topic} sx={{ ...grid, borderTop: i ? `1px solid ${COLORS.border}` : "none", ...(note ? { borderBottom: `2px dashed ${COLORS.navy}55`, backgroundColor: COLORS.surface } : {}), "& > *": { py: { xs: 1.25, md: 1.75 }, px: { xs: 1, md: 2 } }, "& > *:not(:first-of-type)": { borderLeft: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center" } }}>
                <Box role="cell" sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 2 } }}>
                  <Box sx={{ flexShrink: 0, width: { xs: 32, md: 48 }, height: { xs: 32, md: 48 }, borderRadius: "50%", backgroundColor: tone.bg, color: tone.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 3px 8px rgba(15,23,42,.08)" }}>
                    <Icon size={20} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: COLORS.navy, fontSize: { xs: "0.8rem", md: "1.1rem" }, lineHeight: 1.25 }}>{r.topic}</Typography>
                </Box>
                <Box role="cell"><Cell value={r.exam} tone="exam" /></Box>
                <Box role="cell"><Cell value={r.other} tone="other" /></Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
