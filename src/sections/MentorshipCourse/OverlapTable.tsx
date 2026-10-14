import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { OverlapLevel, SyllabusOverlap } from "@/types";
import { COLORS } from "@/theme/colors";

const TONES: Record<OverlapLevel, { color: string; bg: string }> = {
  strong: { color: "#15803D", bg: "#DCFCE7" },
  good: { color: "#B45309", bg: "#FEF3C7" },
  specific: { color: COLORS.redDark, bg: COLORS.redTint },
};

const Tag = ({ level, label }: { level: OverlapLevel; label: string }) => (
  <Box component="span" sx={{ display: "inline-block", px: 1.25, py: 0.4, borderRadius: "9999px", fontSize: "0.75rem", fontWeight: 800, whiteSpace: "nowrap", color: TONES[level].color, backgroundColor: TONES[level].bg }}>
    {label}
  </Box>
);

/** UPSC CSE ↔ exam syllabus overlap explorer (table on desktop, cards on mobile). */
export default function OverlapTable({ data }: { data: SyllabusOverlap }) {
  const cell = { px: 2, py: 1.5, fontSize: "0.9rem", color: COLORS.body, borderBottom: `1px solid ${COLORS.border}`, textAlign: "left" as const, verticalAlign: "top" as const };
  return (
    <Box component="section" sx={{ py: { xs: 3.5, md: 6 } }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.4rem", md: "2rem" }, color: COLORS.navy, maxWidth: 820, mx: "auto", lineHeight: 1.25 }}>
          {data.title}
        </Typography>
        <Box sx={{ mt: 2, mb: { xs: 2.5, md: 3.5 }, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
          {(Object.keys(data.levels) as OverlapLevel[]).map((l) => <Tag key={l} level={l} label={data.levels[l]} />)}
        </Box>

        {/* desktop table */}
        <Box sx={{ display: { xs: "none", md: "block" }, maxWidth: 1100, mx: "auto", borderRadius: "16px", overflow: "hidden", border: `1px solid ${COLORS.border}`, boxShadow: "0 12px 30px rgba(15,23,42,.06)" }}>
          <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", backgroundColor: "#FFFFFF" }}>
            <Box component="thead">
              <Box component="tr" sx={{ backgroundColor: COLORS.navy, "& th": { ...cell, color: "#FFFFFF", fontWeight: 800, fontSize: "0.85rem", borderBottom: "none" } }}>
                <th>#</th>
                <th>{data.columns.subject}</th>
                <th>{data.columns.upsc}</th>
                <th>{data.columns.exam}</th>
                <th>{data.columns.overlap}</th>
              </Box>
            </Box>
            <Box component="tbody">
              {data.rows.map((r, i) => (
                <Box component="tr" key={r.subject} sx={{ "&:nth-of-type(even)": { backgroundColor: COLORS.surface }, "&:hover": { backgroundColor: COLORS.redTintSoft }, "& td": cell }}>
                  <td><Box component="span" sx={{ fontWeight: 800, color: COLORS.red }}>{String(i + 1).padStart(2, "0")}</Box></td>
                  <td><Box component="span" sx={{ fontWeight: 700, color: COLORS.navy }}>{r.subject}</Box></td>
                  <td>{r.upsc}</td>
                  <td>{r.exam}</td>
                  <td><Tag level={r.level} label={data.levels[r.level]} /></td>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        {/* mobile cards */}
        <Box sx={{ display: { xs: "grid", md: "none" }, gap: 1.5 }}>
          {data.rows.map((r, i) => (
            <Box key={r.subject} sx={{ p: 2, borderRadius: "14px", border: `1px solid ${COLORS.border}`, backgroundColor: "#FFFFFF" }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, alignItems: "flex-start" }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "0.95rem" }}>
                  <Box component="span" sx={{ color: COLORS.red, mr: 0.75 }}>{String(i + 1).padStart(2, "0")}</Box>
                  {r.subject}
                </Typography>
                <Tag level={r.level} label={data.levels[r.level]} />
              </Box>
              <Typography sx={{ mt: 1, fontSize: "0.85rem", color: COLORS.body }}><b>{data.columns.upsc}:</b> {r.upsc}</Typography>
              <Typography sx={{ mt: 0.5, fontSize: "0.85rem", color: COLORS.body }}><b>{data.columns.exam}:</b> {r.exam}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
