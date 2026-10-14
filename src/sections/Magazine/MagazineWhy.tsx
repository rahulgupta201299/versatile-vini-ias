import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MagazineContent } from "@/types";
import { COLORS } from "@/theme/colors";

type Why = NonNullable<MagazineContent["why"]>;

/** "Why PRISM Simplified?" — quote + source card beside a navy stat card (NCERT landing palette). */
export default function MagazineWhy({ data }: { data: Why }) {
  const [before, after] = data.title.split(data.highlight);
  return (
    <Box component="section" sx={{ py: { xs: 4.5, md: 7 }, background: "linear-gradient(180deg, #F1F7FE 0%, #EAF3FD 100%)" }}>
      <Container>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 800, letterSpacing: ".12em", fontSize: "0.72rem", color: COLORS.redDark }}>
          <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.red }} /> {data.eyebrow}
        </Typography>
        <Typography component="h2" sx={{ mt: 1, fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.6rem" }, color: COLORS.navy }}>
          {before}
          <Box component="span" sx={{ color: COLORS.red }}>{data.highlight}</Box>
          {after}
        </Typography>
        <Box sx={{ mt: { xs: 3, md: 4 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.3fr) minmax(0, 1fr)" }, gap: { xs: 2.5, md: 3 } }}>
          <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: "20px", backgroundColor: "#FFFFFF", boxShadow: "0 12px 28px rgba(15,23,42,.06)" }}>
            <Typography component="blockquote" sx={{ m: 0, pl: 2, borderLeft: `4px solid ${COLORS.red}`, fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.7, color: COLORS.navy }}>
              “{data.quote}”
            </Typography>
            <Box sx={{ mt: 3, p: 2, borderRadius: "14px", backgroundColor: COLORS.redTintSoft, border: `1px solid ${COLORS.redBorder}` }}>
              <Typography sx={{ fontWeight: 800, letterSpacing: ".08em", fontSize: "0.75rem", color: COLORS.redDark }}>{data.source.title}</Typography>
              <Typography sx={{ mt: 0.5, fontSize: "0.92rem", color: COLORS.body, lineHeight: 1.6 }}>{data.source.text}</Typography>
            </Box>
          </Box>
          <Box sx={{ p: { xs: 2.5, md: 3.5 }, borderRadius: "20px", background: `linear-gradient(120deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, color: "#FFFFFF", boxShadow: "0 18px 36px rgba(12,28,54,.25)" }}>
            <Typography sx={{ fontWeight: 800, letterSpacing: ".12em", fontSize: "0.72rem", color: COLORS.yellow }}>{data.stat.eyebrow}</Typography>
            <Typography sx={{ mt: 1, fontWeight: 900, fontSize: { xs: "3.2rem", md: "4rem" }, lineHeight: 1 }}>{data.stat.value}</Typography>
            <Typography sx={{ mt: 0.75, fontWeight: 800, letterSpacing: ".1em", fontSize: "0.72rem", color: COLORS.yellow }}>{data.stat.label}</Typography>
            <Typography sx={{ mt: 2, fontSize: "0.95rem", lineHeight: 1.7, color: "rgba(255,255,255,.85)" }}>{data.stat.text}</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
