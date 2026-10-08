"use client";

import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BatchCourseContent, CoursePlan } from "@/types";
import { openAuth } from "@/utils/events";
import { selectPlan } from "./planEvents";
import { COLORS } from "@/theme/colors";
import { LANDING_ICONS } from "@/sections/CourseLanding/icons";

const TILE_TONES = [
  { color: "#EA580C", bg: "#FFF4EA" },
  { color: "#2563EB", bg: "#EEF4FF" },
  { color: "#16A34A", bg: "#ECFBF1" },
  { color: "#7C3AED", bg: "#F4EEFF" },
  { color: "#D97706", bg: "#FFF8E6" },
  { color: COLORS.red, bg: COLORS.redTintSoft },
];

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export default function BatchHero({ hero, plans }: { hero: BatchCourseContent["hero"]; plans: CoursePlan[] }) {
  const [planId, setPlanId] = useState(plans[0]?.id);
  const plan = plans.find((p) => p.id === planId) ?? plans[0];
  const [before, after] = hero.title.split(hero.highlight);

  return (
    <Box component="section" id="course-top" sx={{ position: "relative", overflow: "hidden", background: "linear-gradient(120deg, #FFFFFF 0%, #FFF6F0 55%, #FFEDE3 100%)", pt: { xs: 1.5, md: 2 }, pb: { xs: 8, md: 10 } }}>
      <Container>
        <Breadcrumbs />
        <Box sx={{ mt: { xs: 2, md: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" }, gap: { xs: 3.5, md: 5 }, alignItems: "center" }}>
          <Box>
            {/* LIVE BATCH · Batch 1 */}
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 1.5, py: 0.5, borderRadius: "9999px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, fontSize: "0.78rem", fontWeight: 700, color: COLORS.ink }}>
              <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: COLORS.red, boxShadow: `0 0 0 3px ${COLORS.redTint}`, animation: "livePulse 1.6s infinite", "@keyframes livePulse": { "50%": { opacity: 0.35 } } }} />
              {hero.liveLabel}
              <Box component="span" sx={{ width: "1px", height: 14, backgroundColor: COLORS.border }} />
              <Box component="span" sx={{ fontWeight: 600, color: COLORS.textSecondary }}>{hero.batchLabel}</Box>
            </Box>

            <Typography component="h1" sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: "1.75rem", sm: "2.2rem", md: "2.6rem" }, lineHeight: 1.18, color: COLORS.navy, letterSpacing: "-0.01em", maxWidth: 560 }}>
              {before}
              <Box component="span" sx={{ color: COLORS.red }}>{hero.highlight}</Box>
              {after}
            </Typography>
            <Typography sx={{ mt: 1.25, color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.02rem" }, lineHeight: 1.65, maxWidth: 540 }}>{hero.description}</Typography>

            {/* highlight tiles */}
            <Box sx={{ mt: { xs: 2, md: 2.5 }, display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 1, md: 1.25 }, maxWidth: 600 }}>
              {hero.highlights.map((h, i) => {
                const Icon = LANDING_ICONS[h.icon];
                const tone = TILE_TONES[i % TILE_TONES.length];
                return (
                  <Box key={h.title} sx={{ display: "flex", alignItems: "center", gap: 1, p: { xs: 1, md: 1.25 }, borderRadius: "10px", backgroundColor: tone.bg, border: "1px solid rgba(15,23,42,.05)" }}>
                    <Icon size={18} color={tone.color} style={{ flexShrink: 0 }} />
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: "0.8rem", md: "0.86rem" }, color: COLORS.ink, lineHeight: 1.2 }}>{h.title}</Typography>
                      <Typography sx={{ fontSize: { xs: "0.68rem", md: "0.72rem" }, color: COLORS.muted, lineHeight: 1.2 }}>{h.text}</Typography>
                    </Box>
                  </Box>
                );
              })}
            </Box>

            <Box sx={{ mt: { xs: 2, md: 2.5 }, display: "flex", alignItems: "center", gap: 1, color: COLORS.body, fontSize: { xs: "0.9rem", md: "0.98rem" } }}>
              <CalendarDays size={18} color={COLORS.red} />
              Starting from <Box component="span" sx={{ color: COLORS.red, fontWeight: 800 }}>{hero.startDate}</Box>
            </Box>

            {/* plan picker */}
            <Box role="radiogroup" aria-label="Choose a plan" sx={{ mt: 1.75, display: "flex", flexWrap: "wrap", gap: 1 }}>
              {plans.map((p) => {
                const active = p.id === plan?.id;
                return (
                  <Box
                    key={p.id}
                    component="button"
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setPlanId(p.id);
                      selectPlan(p.id);
                    }}
                    sx={{ height: 42, px: { xs: 2, md: 2.75 }, borderRadius: "8px", border: `1.5px solid ${active ? p.color : COLORS.border}`, backgroundColor: active ? p.color : "#FFFFFF", color: active ? "#FFFFFF" : COLORS.textSecondary, fontFamily: "inherit", fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.03em", cursor: "pointer", transition: "all .15s" }}
                  >
                    {p.name}
                  </Box>
                );
              })}
            </Box>

            {plan && (
              <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1.5 }}>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.4rem", md: "1.6rem" }, color: COLORS.ink, lineHeight: 1 }}>{formatINR(plan.price)}</Typography>
                  <Typography sx={{ fontSize: "0.68rem", color: COLORS.muted, fontWeight: 600 }}>(TAXES INCLUDED)</Typography>
                </Box>
                <Box
                  component="button"
                  type="button"
                  onClick={openAuth}
                  sx={{ height: 46, px: 3, border: "none", borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: COLORS.redDark } }}
                >
                  Enroll Now
                </Box>
                <Box
                  component="a"
                  href="#course-details"
                  sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 46, px: 2.5, borderRadius: "10px", border: `1.5px solid ${COLORS.ink}`, backgroundColor: "#FFFFFF", color: COLORS.ink, fontWeight: 700, fontSize: "0.95rem", textDecoration: "none", "&:hover": { backgroundColor: COLORS.surface } }}
                >
                  Course Details <ArrowUpRight size={17} />
                </Box>
              </Box>
            )}
          </Box>

          {/* Artwork (no faculty photos) */}
          <Box sx={{ position: "relative", px: { md: 2 } }}>
            <Box aria-hidden sx={{ position: "absolute", inset: { xs: "-6% 4%", md: "-10% 0" }, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.redTint} 0%, rgba(255,240,243,0) 70%)` }} />
            <Box sx={{ position: "relative", borderRadius: "18px", overflow: "hidden", boxShadow: "0 24px 50px rgba(15,23,42,.18)", border: "4px solid #FFFFFF", transform: { md: "rotate(1.5deg)" }, aspectRatio: "2.9 / 1" }}>
              <Image src={hero.image.src} alt={hero.image.alt} fill sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: "cover" }} priority />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
