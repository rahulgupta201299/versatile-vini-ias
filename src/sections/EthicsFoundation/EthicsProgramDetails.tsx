"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CheckCircle2, Zap } from "lucide-react";
import { EthicsLandingContent } from "@/types";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

type Props = { details: EthicsLandingContent["details"]; hero: EthicsLandingContent["hero"]; priceLabel: string };

/** "PROGRAM DETAILS" — course poster card + what's included + price and CTAs. */
export default function EthicsProgramDetails({ details, hero, priceLabel }: Props) {
  return (
    <Box component="section" id="program-details" sx={{ py: { xs: 4, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.4rem" }, color: COLORS.ink, letterSpacing: ".03em" }}>{details.title}</Typography>
        <Box sx={{ width: { xs: 120, md: 180 }, height: 4, borderRadius: 2, mx: "auto", mt: 1, mb: { xs: 3, md: 4.5 }, backgroundColor: COLORS.red }} />

        <Box sx={{ maxWidth: 1080, mx: "auto", p: { xs: 2, md: 3 }, borderRadius: "24px", border: `2px solid ${COLORS.redBorder}`, backgroundColor: "#FFFFFF", boxShadow: "0 18px 40px rgba(15,23,42,.08)", display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.1fr)" }, gap: { xs: 3, md: 4 } }}>
          {/* poster */}
          <Box sx={{ p: { xs: 2.5, md: 4 }, borderRadius: "18px", background: `linear-gradient(160deg, ${COLORS.redTint} 0%, #FFE3E9 100%)`, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "2.6rem", md: "3.4rem" }, color: COLORS.ink, lineHeight: 1 }}>{hero.title}</Typography>
            <Box component="span" sx={{ alignSelf: "flex-start", mt: 1, px: 1.5, py: 0.6, borderRadius: "8px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>{hero.subtitle}</Box>
            <Typography sx={{ mt: 1.5, fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: "1.3rem", color: COLORS.red }}>{hero.forLabel}</Typography>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.5rem", md: "1.8rem" }, color: COLORS.ink }}>{hero.exam}</Typography>
            <Box component="span" sx={{ alignSelf: "flex-start", mt: 2, px: 1.5, py: 0.5, borderRadius: "8px", border: `1.5px solid ${COLORS.ink}`, fontWeight: 700, fontSize: "0.85rem", color: COLORS.ink }}>{details.startLabel}</Box>
            <Typography sx={{ mt: 1, fontWeight: 900, fontSize: { xs: "1.8rem", md: "2.2rem" }, color: COLORS.red, lineHeight: 1.1 }}>{details.startDate}</Typography>
          </Box>

          {/* inclusions */}
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: { xs: 1.75, md: 2.25 } }}>
              {details.items.map((it) => (
                <Box component="li" key={it.title} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                  <CheckCircle2 size={24} color={COLORS.red} style={{ flexShrink: 0, marginTop: 2 }} />
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.08rem", md: "1.25rem" }, color: COLORS.ink, lineHeight: 1.3 }}>{it.title}</Typography>
                    <Typography sx={{ fontSize: { xs: "0.88rem", md: "0.95rem" }, color: COLORS.redDark, fontWeight: 600 }}>{it.note}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: { xs: 3, md: 4 }, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
              <Box component="button" type="button" onClick={openAuth} sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 48, px: 3, border: "none", borderRadius: "12px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "0.98rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.navyDark } }}>
                Enroll Now <Zap size={16} fill={COLORS.yellow} color={COLORS.yellow} />
              </Box>
              <Box component="button" type="button" onClick={() => scrollTo("why-program")} sx={{ height: 48, px: 3, border: "none", borderRadius: "12px", backgroundColor: COLORS.yellow, color: COLORS.navy, fontFamily: "inherit", fontWeight: 800, fontSize: "0.98rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.yellowDark } }}>
                Course Details
              </Box>
              <Box sx={{ ml: { sm: "auto" }, display: "flex", alignItems: "baseline", gap: 0.75 }}>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2rem" }, color: COLORS.red }}>{priceLabel}</Typography>
                <Typography sx={{ fontWeight: 700, color: COLORS.muted }}>{details.priceNote}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
