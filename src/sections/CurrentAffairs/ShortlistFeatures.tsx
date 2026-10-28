import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ShortlistContent } from "@/types";
import { CHIP_TONES, LANDING_ICONS } from "@/sections/CourseLanding/icons";
import { COLORS } from "@/theme/colors";

/** "Features" — numbered feature tiles (3 + 2 on desktop). */
export default function ShortlistFeatures({ data }: { data: ShortlistContent["features"] }) {
  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 4, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.4rem" }, color: COLORS.navy }}>{data.title}</Typography>
        <Box sx={{ width: 90, height: 4, borderRadius: 2, mx: "auto", mt: 1, mb: { xs: 3, md: 4.5 }, backgroundColor: COLORS.red }} />
        <Box sx={{ maxWidth: 1100, mx: "auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: { xs: 2, md: 3 }, "& > *": { flex: { xs: "0 0 100%", sm: "0 0 calc((100% - 16px) / 2)", md: "0 0 calc((100% - 48px) / 3)" } } }}>
          {data.items.map((f, i) => {
            const Icon = LANDING_ICONS[f.icon];
            const tone = CHIP_TONES[i % CHIP_TONES.length];

            return (
              <Box key={f.title} sx={{ position: "relative", p: { xs: 2.5, md: 3 }, pt: { xs: 3.5, md: 4 }, borderRadius: "20px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, textAlign: "center", boxShadow: "0 12px 28px rgba(15,23,42,.06)", transition: "transform .2s", "&:hover": { transform: "translateY(-4px)" } }}>
                <Box sx={{ position: "absolute", top: 14, left: 16, width: 32, height: 32, borderRadius: "50%", backgroundColor: tone.color, color: "#FFFFFF", fontWeight: 900, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {String(i + 1).padStart(2, "0")}
                </Box>
                <Box sx={{ mx: "auto", width: 72, height: 72, borderRadius: "20px", backgroundColor: tone.bg, color: tone.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon size={34} />
                </Box>
                <Typography component="h3" sx={{ mt: 2, fontWeight: 900, fontSize: { xs: "1.05rem", md: "1.15rem" }, color: COLORS.navy }}>{f.title}</Typography>
                <Typography sx={{ mt: 0.75, color: COLORS.body, fontSize: "0.92rem", lineHeight: 1.6 }}>{f.text}</Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
