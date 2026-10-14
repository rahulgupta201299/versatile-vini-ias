import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@/components/Breadcrumbs";
import { MagazineContent } from "@/types";
import { CHIP_TONES, LANDING_ICONS } from "@/sections/CourseLanding/icons";
import HighlightText from "@/sections/EthicsFoundation/HighlightText";
import { COLORS } from "@/theme/colors";

/** Magazine hero — same palette as the NCERT landing: warm light background, navy headings, red accents. */
export default function MagazineHero({ data }: { data: MagazineContent }) {
  const { hero } = data;
  return (
    <Box
      component="section"
      id="course-top"
      sx={{
        pt: { xs: 1.5, md: 2 },
        pb: { xs: 5, md: 8 },
        background: "linear-gradient(115deg, #FFFFFF 0%, #FFF8F1 55%, #FBEFE3 100%)",
        color: COLORS.ink,
      }}
    >
      <Container>
        <Breadcrumbs />
        <Box sx={{ mt: { xs: 2, md: 4 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.2fr) minmax(0, 1fr)" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
          <Box>
            <Box component="span" sx={{ display: "inline-block", px: 1.75, py: 0.6, borderRadius: "9999px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 800, letterSpacing: ".08em", fontSize: { xs: "0.7rem", md: "0.78rem" } }}>
              {hero.eyebrow}
            </Box>
            {hero.kicker && <Typography sx={{ mt: 1.5, fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.4rem" }, color: COLORS.navy }}>{hero.kicker}</Typography>}
            <Typography component="h1" sx={{ mt: hero.kicker ? 0.5 : 1.5, fontWeight: 900, lineHeight: 1.02, fontSize: { xs: "2.7rem", md: "4rem" }, color: hero.highlight ? COLORS.navy : COLORS.red }}>
              {hero.title}
              {hero.highlight && <Box component="span" sx={{ display: "block", color: COLORS.red }}>{hero.highlight}</Box>}
            </Typography>
            {hero.tagline && (
              <Typography sx={{ mt: 1.5, fontWeight: 800, fontSize: { xs: "1.15rem", md: "1.5rem" }, color: COLORS.navy }}>
                <HighlightText text={hero.tagline} />
              </Typography>
            )}

            <Box sx={{ mt: { xs: 2.5, md: 3.5 }, display: "grid", gridTemplateColumns: { xs: "1fr", sm: hero.points.length > 3 ? "repeat(2, minmax(0, 1fr))" : "1fr" }, gap: 1.5, maxWidth: hero.points.length > 3 ? 640 : 460 }}>
              {hero.points.map((pt, i) => {
                const Icon = LANDING_ICONS[pt.icon];
                const tone = CHIP_TONES[i % CHIP_TONES.length];
                return (
                  <Box key={pt.title} sx={{ display: "flex", alignItems: "center", gap: 1.5, p: 1.5, borderRadius: "14px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 8px 20px rgba(15,23,42,.06)" }}>
                    <Box sx={{ flexShrink: 0, width: 42, height: 42, borderRadius: "50%", backgroundColor: tone.bg, color: tone.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={20} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.9rem", md: "0.95rem" }, color: COLORS.navy, lineHeight: 1.3 }}>{pt.title}</Typography>
                      {pt.text && <Typography sx={{ fontSize: "0.8rem", color: COLORS.muted }}>{pt.text}</Typography>}
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>

          <Box sx={{ position: "relative", width: "100%", maxWidth: 520, mx: "auto" }}>
            <Box aria-hidden sx={{ position: "absolute", inset: "8% 6%", borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.redTint} 0%, rgba(255,240,243,0) 70%)` }} />
            <Image src={hero.image.src} alt={hero.image.alt} width={hero.image.width} height={hero.image.height} priority sizes="(max-width: 900px) 90vw, 520px" style={{ position: "relative", width: "100%", height: "auto" }} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
