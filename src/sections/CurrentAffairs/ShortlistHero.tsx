"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Filter, FolderKanban, Brain, Newspaper, ArrowRight } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { ShortlistContent } from "@/types";
import { COLORS } from "@/theme/colors";

const PILLAR_ICONS = [Filter, FolderKanban, Brain];
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/** CURRENT AFFAIRS · THE SHORTLIST COURSE hero — headline, pillars and an illustrated news stack (no faculty photo). */
export default function ShortlistHero({ hero }: { hero: ShortlistContent["hero"] }) {
  const [first, rest] = hero.title.split(hero.highlight);

  return (
    <Box component="section" id="course-top" sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 4, md: 7 }, background: `linear-gradient(120deg, #FFF8E1 0%, ${COLORS.redTintSoft} 55%, #FFFFFF 100%)` }}>
      <Container>
        <Breadcrumbs />
        <Box sx={{ mt: { xs: 2, md: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
          <Box>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.navy, letterSpacing: ".02em", lineHeight: 1.1 }}>{hero.eyebrow}</Typography>
            <Box component="span" sx={{ display: "inline-block", mt: 1, px: 1.75, py: 0.6, borderRadius: "9999px", backgroundColor: COLORS.navy, color: "#FFFFFF", fontWeight: 800, letterSpacing: ".06em", fontSize: { xs: "0.72rem", md: "0.82rem" } }}>{hero.badge}</Box>
            <Typography component="h1" sx={{ mt: 2, fontWeight: 900, fontSize: { xs: "1.9rem", sm: "2.3rem", md: "3rem" }, color: COLORS.navy, lineHeight: 1.15 }}>
              {first}
              <Box component="span" sx={{ color: COLORS.red }}>{hero.highlight}</Box>
              {rest}
            </Typography>
            <Typography sx={{ mt: 2, color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.7, maxWidth: 560 }}>{hero.text}</Typography>
            <Box sx={{ mt: 2.5, display: "flex", flexWrap: "wrap", gap: 1.25 }}>
              {hero.pillars.map((p, i) => {
                const Icon = PILLAR_ICONS[i % PILLAR_ICONS.length];

                return (
                  <Box key={p} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.75, py: 0.9, borderRadius: "12px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 6px 14px rgba(15,23,42,.06)", fontWeight: 800, color: COLORS.navy, fontSize: "0.92rem" }}>
                    <Icon size={16} color={COLORS.red} /> {p}
                  </Box>
                );
              })}
            </Box>
            <Box component="button" type="button" onClick={() => scrollTo("plans")} sx={{ mt: 3, display: "inline-flex", alignItems: "center", gap: 1, height: 50, px: 3.5, border: "none", borderRadius: "12px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "1rem", cursor: "pointer", boxShadow: "0 10px 22px rgba(254,0,52,.25)", "&:hover": { backgroundColor: COLORS.redDark } }}>
              Enroll Now <ArrowRight size={18} />
            </Box>
          </Box>

          {/* illustrated news → shortlist funnel */}
          <Box sx={{ position: "relative", maxWidth: 500, width: "100%", mx: "auto", aspectRatio: "1 / 0.9" }}>
            {[0, 1, 2].map((i) => (
              <Box key={i} sx={{ position: "absolute", top: `${8 + i * 6}%`, left: `${6 + i * 5}%`, width: "62%", height: "52%", borderRadius: "18px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 14px 30px rgba(15,23,42,.10)", transform: `rotate(${-8 + i * 5}deg)`, p: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: COLORS.muted }}>
                  <Newspaper size={18} />
                  <Box sx={{ height: 8, flex: 1, borderRadius: 4, backgroundColor: COLORS.border }} />
                </Box>
                {[90, 75, 82, 60].map((w) => (
                  <Box key={w} sx={{ mt: 1.25, height: 7, width: `${w}%`, borderRadius: 4, backgroundColor: "#EEF2F7" }} />
                ))}
              </Box>
            ))}
            <Box sx={{ position: "absolute", right: 0, bottom: 0, width: "60%", borderRadius: "20px", backgroundColor: COLORS.navy, color: "#FFFFFF", p: { xs: 2, md: 2.5 }, boxShadow: "0 22px 44px rgba(19,41,75,.35)" }}>
              <Typography sx={{ fontWeight: 900, fontSize: { xs: "1rem", md: "1.15rem" } }}>Your Shortlist</Typography>
              {["Polity · Mar", "Economy · Mar", "Environment · Apr", "IR · Apr"].map((t, i) => (
                <Box key={t} sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1, px: 1.25, py: 0.75, borderRadius: "10px", backgroundColor: "rgba(255,255,255,.08)", fontSize: "0.82rem", fontWeight: 600 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: i % 2 ? COLORS.yellow : COLORS.red }} /> {t}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
