import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChevronRight } from "lucide-react";
import { ShortlistContent } from "@/types";
import { CHIP_TONES, LANDING_ICONS } from "@/sections/CourseLanding/icons";
import { COLORS } from "@/theme/colors";

/** "Learning & Practice Ecosystem" — Watch → Test → Revise → Practise → Track → Re-attempt. */
export default function ShortlistEcosystem({ data }: { data: ShortlistContent["ecosystem"] }) {
  const [first, rest] = data.title.split(data.highlight);
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 7 } }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.navy, mb: { xs: 3, md: 5 } }}>
          {first}
          <Box component="span" sx={{ color: COLORS.red }}>{data.highlight}</Box>
          {rest}
        </Typography>
        <Box component="ol" sx={{ listStyle: "none", p: 0, m: 0, display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))", lg: "repeat(6, minmax(0, 1fr))" }, gap: { xs: 1.5, md: 2.5 } }}>
          {data.steps.map((s, i) => {
            const Icon = LANDING_ICONS[s.icon];
            const tone = CHIP_TONES[i % CHIP_TONES.length];
            return (
              <Box component="li" key={s.title} sx={{ position: "relative", pt: 3, pb: 2.5, px: 1.5, borderRadius: "16px", backgroundColor: tone.bg, textAlign: "center", border: `1px solid ${tone.color}33` }}>
                <Box sx={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", width: 30, height: 30, borderRadius: "50%", backgroundColor: tone.color, color: "#FFFFFF", fontWeight: 900, fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", border: "3px solid #FFFFFF" }}>
                  {String(i + 1).padStart(2, "0")}
                </Box>
                <Box sx={{ mx: "auto", width: 56, height: 56, borderRadius: "16px", backgroundColor: "#FFFFFF", color: tone.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(15,23,42,.08)" }}>
                  <Icon size={28} />
                </Box>
                <Typography sx={{ mt: 1.5, fontWeight: 900, letterSpacing: ".04em", color: COLORS.navy, textTransform: "uppercase", fontSize: "0.95rem" }}>{s.title}</Typography>
                <Typography sx={{ mt: 0.5, fontSize: "0.82rem", color: COLORS.body, lineHeight: 1.45 }}>{s.text}</Typography>
                {i < data.steps.length - 1 && (
                  <Box aria-hidden sx={{ display: { xs: "none", lg: "flex" }, position: "absolute", right: -18, top: "50%", transform: "translateY(-50%)", color: COLORS.red, zIndex: 1 }}>
                    <ChevronRight size={20} strokeWidth={3} />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
