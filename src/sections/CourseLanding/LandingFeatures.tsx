import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { LandingIconItem } from "@/types";
import { COLORS } from "@/theme/colors";
import { CHIP_TONES, LANDING_ICONS } from "./icons";

/** 4 key features in one card, divided by thin lines (2 × 2 on phones). */
export default function LandingFeatures({ items }: { items: LandingIconItem[] }) {
  return (
    <Box component="section" sx={{ py: { xs: 3, md: 4 } }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: `repeat(${items.length}, minmax(0, 1fr))` },
            borderRadius: "18px",
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFF7F8 100%)",
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 12px 30px rgba(15,23,42,.06)",
            overflow: "hidden",
          }}
        >
          {items.map((item, i) => {
            const Icon = LANDING_ICONS[item.icon];
            const tone = CHIP_TONES[i % CHIP_TONES.length];
            return (
              <Box
                key={item.title}
                sx={{
                  textAlign: "center",
                  px: { xs: 1.5, md: 2.5 },
                  py: { xs: 2.25, md: 3 },
                  borderLeft: { md: i ? `1px solid ${COLORS.border}` : "none" },
                  borderRight: { xs: i % 2 === 0 ? `1px solid ${COLORS.border}` : "none", md: "none" },
                  borderTop: { xs: i > 1 ? `1px solid ${COLORS.border}` : "none", md: "none" },
                }}
              >
                <Box sx={{ width: { xs: 52, md: 60 }, height: { xs: 52, md: 60 }, mx: "auto", borderRadius: "50%", backgroundColor: tone.bg, display: "flex", alignItems: "center", justifyContent: "center", "& svg": { width: { xs: 24, md: 28 }, height: { xs: 24, md: 28 } } }}>
                  <Icon color={tone.color} />
                </Box>
                <Typography component="h3" sx={{ mt: 1.25, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "0.95rem", md: "1.1rem" }, lineHeight: 1.25 }}>
                  {item.title}
                </Typography>
                {item.text && <Typography sx={{ mt: 0.5, color: COLORS.textSecondary, fontSize: { xs: "0.8rem", md: "0.88rem" }, lineHeight: 1.45 }}>{item.text}</Typography>}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
