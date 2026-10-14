"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Scale, Star, Trophy, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { EthicsLandingContent } from "@/types";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";
import HighlightText from "./HighlightText";

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** Title stack (ONLINE · ETHICS · FOUNDATION COURSE · For · UPSC CSE 2027), meta lines, CTAs and a stat card (no educator photo). */
export default function EthicsHero({ hero }: { hero: EthicsLandingContent["hero"] }) {
  return (
    <Box component="section" id="course-top" sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 4, md: 7 }, background: `linear-gradient(180deg, ${COLORS.redTintSoft} 0%, #FFFFFF 100%)` }}>
      <Container>
        <Breadcrumbs />
        <Box sx={{ mt: { xs: 2, md: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Box component="span" sx={{ display: "inline-block", px: 2, py: 0.6, borderRadius: "8px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 800, letterSpacing: ".08em", fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
              {hero.badge}
            </Box>
            <Typography component="h1" sx={{ mt: 1.5, lineHeight: 1 }}>
              <Box component="span" sx={{ display: "block", fontWeight: 900, fontSize: { xs: "2.8rem", md: "4.2rem" }, color: COLORS.navy, letterSpacing: ".02em" }}>{hero.title}</Box>
              <Box component="span" sx={{ display: "block", mt: 0.5, fontWeight: 900, fontSize: { xs: "1.2rem", md: "1.6rem" }, color: COLORS.red, letterSpacing: ".04em" }}>{hero.subtitle}</Box>
            </Typography>
            <Box sx={{ mt: 1, display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" }, gap: 1.5 }}>
              <Box sx={{ width: 60, height: 2, backgroundColor: COLORS.red }} />
              <Typography sx={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontWeight: 700, fontSize: { xs: "1.3rem", md: "1.6rem" }, color: COLORS.red }}>{hero.forLabel}</Typography>
              <Box sx={{ width: 60, height: 2, backgroundColor: COLORS.red }} />
            </Box>
            <Typography sx={{ mt: 0.5, fontWeight: 900, fontSize: { xs: "1.4rem", md: "1.9rem" }, color: COLORS.ink }}>{hero.exam}</Typography>
            <Typography sx={{ mt: 1.5, fontSize: { xs: "1rem", md: "1.15rem" }, color: COLORS.body, maxWidth: 520, mx: { xs: "auto", md: 0 } }}>
              <HighlightText text={hero.tagline} />
            </Typography>
            <Box sx={{ mt: 2, display: "grid", gap: 0.5 }}>
              {hero.meta.map((m) => (
                <Typography key={m.label} sx={{ fontSize: { xs: "0.95rem", md: "1.02rem" }, color: COLORS.ink }}>
                  <b>{m.label}:</b> {m.value}
                </Typography>
              ))}
            </Box>
            <Box sx={{ mt: 3, display: "flex", gap: 1.5, justifyContent: { xs: "center", md: "flex-start" }, "& > button": { flex: { xs: 1, sm: "0 0 auto" } } }}>
              <Box component="button" type="button" onClick={openAuth} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, height: 50, px: { xs: 1.5, sm: 3.5 }, border: "none", borderRadius: "12px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "1rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.navyDark } }}>
                Enroll Now <Zap size={16} fill={COLORS.yellow} color={COLORS.yellow} />
              </Box>
              <Box component="button" type="button" onClick={() => scrollTo("program-details")} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 50, px: { xs: 1.5, sm: 3.5 }, border: "none", borderRadius: "12px", backgroundColor: COLORS.yellow, color: COLORS.navy, fontFamily: "inherit", fontWeight: 800, fontSize: "1rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.yellowDark } }}>
                Course Details
              </Box>
            </Box>
          </Box>

          {/* stat card — artwork instead of an educator photo */}
          <Box sx={{ position: "relative", maxWidth: 520, width: "100%", mx: "auto" }}>
            <Box sx={{ position: "relative", aspectRatio: "1 / 1", borderRadius: "28px", border: `5px solid ${COLORS.red}`, overflow: "hidden", background: `radial-gradient(circle at 30% 20%, #23406E 0%, ${COLORS.navy} 55%, ${COLORS.navyDark} 100%)`, color: "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", p: 3, boxShadow: "0 24px 50px rgba(19,41,75,.28)" }}>
              <Box aria-hidden sx={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 34px)" }} />
              <Box sx={{ width: { xs: 96, md: 120 }, height: { xs: 96, md: 120 }, borderRadius: "50%", backgroundColor: "rgba(255,229,31,.14)", border: `2px solid ${COLORS.yellow}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.yellow }}>
                <Scale size={56} />
              </Box>
              <Typography sx={{ mt: 2.5, fontWeight: 900, fontSize: { xs: "2.2rem", md: "3rem" }, lineHeight: 1 }}>GS Paper IV</Typography>
              <Typography sx={{ mt: 1, fontWeight: 700, letterSpacing: ".12em", fontSize: { xs: "0.75rem", md: "0.9rem" }, color: "rgba(255,255,255,.8)" }}>ETHICS · INTEGRITY · APTITUDE</Typography>
              <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
                {["Theory", "Case Studies", "Mini Tests", "FLTs"].map((t) => (
                  <Box key={t} sx={{ px: 1.5, py: 0.5, borderRadius: "9999px", border: "1px solid rgba(255,255,255,.35)", fontSize: "0.8rem", fontWeight: 700 }}>{t}</Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ position: "absolute", left: { xs: -6, md: -24 }, bottom: { xs: 24, md: 48 }, px: 2, py: 1.25, borderRadius: "14px", backgroundColor: COLORS.ink, color: "#FFFFFF", textAlign: "center", boxShadow: "0 12px 26px rgba(15,23,42,.3)" }}>
              <Typography sx={{ fontWeight: 900, fontSize: "1.35rem", display: "flex", alignItems: "center", gap: 0.5 }}>
                {hero.rating.value} <Star size={18} fill={COLORS.yellow} color={COLORS.yellow} />
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", opacity: 0.85 }}>{hero.rating.label}</Typography>
            </Box>
            <Box sx={{ position: "absolute", right: { xs: -6, md: -20 }, top: { xs: 24, md: 40 }, px: 2, py: 1.25, borderRadius: "14px", backgroundColor: COLORS.red, color: "#FFFFFF", textAlign: "center", boxShadow: "0 12px 26px rgba(254,0,52,.3)" }}>
              <Typography sx={{ fontWeight: 900, fontSize: "1.35rem", display: "flex", alignItems: "center", gap: 0.5 }}>
                <Trophy size={18} /> {hero.stories.value}
              </Typography>
              <Typography sx={{ fontSize: "0.75rem", opacity: 0.9 }}>{hero.stories.label}</Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
