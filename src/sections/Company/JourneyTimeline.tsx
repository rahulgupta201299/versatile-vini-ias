"use client";

import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChevronRight, Quote } from "lucide-react";
import { AboutContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { COMPANY_ICONS } from "./companyIcons";
import SectionHeading from "./SectionHeading";

/* Desktop zigzag geometry (px). Circles alternate between two x-positions inside a fixed-width track. */
const ROW = 196;
const TRACK = 250;
const CX = [72, 178];
const RING = 118;

/** Warm-to-navy progression in the brand palette (one colour per step, cycles if more steps). */
const STEP_COLORS = ["#FE0034", "#FF3D2E", "#FF6A1A", "#F28C00", "#D99A00", "#E0004A", "#B8003A", "#2F5597", "#13294B"];
const shade = (i: number) => STEP_COLORS[i % STEP_COLORS.length];

/** Fades rows in as they scroll into view (no-op when IntersectionObserver is unavailable). */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;

    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);

      return;
    }

    // Huge top margin: rows already scrolled past (fast scroll / anchor jump) count as revealed, so nothing stays hidden.
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "100000px 0px -40px 0px" }
    );

    io.observe(el);

    return () => io.disconnect();
  }, []);

  return { ref, shown };
}

/** Gradient ring + white disc + icon, with a partial arc and arrowhead around it. */
function Milestone({ icon, color, side }: { icon: AboutContent["journey"]["steps"][number]["icon"]; color: string; side: "left" | "right" }) {
  const Icon = COMPANY_ICONS[icon];
  const id = `arrow-${color.slice(1)}-${side}`;

  return (
    <Box sx={{ position: "relative", width: { xs: 64, md: RING }, height: { xs: 64, md: RING }, flexShrink: 0 }}>
      {/* orbit arc (desktop) */}
      <Box component="svg" viewBox="0 0 160 160" aria-hidden sx={{ display: { xs: "none", md: "block" }, position: "absolute", inset: -21, width: 160, height: 160, overflow: "visible", transform: side === "left" ? "scaleX(-1)" : "none" }}>
        <defs>
          <marker id={id} viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" fill={color} />
          </marker>
        </defs>
        <path d="M118 14 A76 76 0 0 1 110 148" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" markerStart={`url(#${id})`} />
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          background: `linear-gradient(145deg, ${color} 0%, ${color}CC 100%)`,
          boxShadow: `0 12px 26px ${color}55`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform .3s",
          ".row:hover &": { transform: "scale(1.06) rotate(-4deg)" },
        }}
      >
        <Box sx={{ width: "72%", height: "72%", borderRadius: "50%", bgcolor: "#FFFFFF", boxShadow: "inset 0 -6px 0 rgba(15,23,42,.08), 0 4px 10px rgba(0,0,0,.18)", display: "flex", alignItems: "center", justifyContent: "center", color }}>
          <Box component={Icon} sx={{ width: { xs: 22, md: 36 }, height: { xs: 22, md: 36 } }} strokeWidth={2.2} />
        </Box>
      </Box>
    </Box>
  );
}

function StepRow({ step, i, total }: { step: AboutContent["journey"]["steps"][number]; i: number; total: number }) {
  const { ref, shown } = useReveal<HTMLLIElement>();
  const color = shade(i);
  const circleLeft = i % 2 === 0; // desktop: circle on the left of the track → text on the right
  const last = i === total - 1;

  return (
    <Box
      component="li"
      ref={ref}
      className="row"
      sx={{
        position: "relative",
        display: "grid",
        gridTemplateColumns: { xs: "64px 1fr", md: `1fr ${TRACK}px 1fr` },
        columnGap: { xs: 2, md: 0 },
        alignItems: "center",
        minHeight: { md: ROW },
        pb: { xs: last ? 0 : 3.5, md: 0 },
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : "translateY(26px)",
        transition: "opacity .6s ease, transform .6s ease",
        "@media (prefers-reduced-motion: reduce)": { opacity: 1, transform: "none", transition: "none" },
      }}
    >
      {/* milestone circle */}
      <Box sx={{ gridColumn: { xs: 1, md: 2 }, gridRow: 1, alignSelf: { xs: "start", md: "center" }, zIndex: 1, ml: { md: `${(circleLeft ? CX[0] : CX[1]) - RING / 2}px` }, justifySelf: { xs: "center", md: "start" } }}>
        <Milestone icon={step.icon} color={color} side={circleLeft ? "right" : "left"} />
      </Box>

      {/* text */}
      <Box sx={{ gridColumn: { xs: 2, md: circleLeft ? 3 : 1 }, gridRow: 1, justifySelf: { md: circleLeft ? "start" : "end" }, maxWidth: { md: 360 }, pl: { md: circleLeft ? 1 : 0 }, pr: { md: circleLeft ? 0 : 1 } }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography sx={{ fontWeight: 900, color, fontSize: { xs: "1.7rem", md: "2.6rem" }, lineHeight: 1, letterSpacing: "-.01em" }}>{step.year}</Typography>
          <Box aria-hidden sx={{ display: "flex", color, "& svg": { ml: "-10px", "&:first-of-type": { ml: 0 } }, animation: "nudge 1.8s ease-in-out infinite", "@keyframes nudge": { "0%,100%": { transform: "translateX(0)" }, "50%": { transform: "translateX(5px)" } }, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
            {[0, 1, 2].map((k) => (
              <ChevronRight key={k} size={26} strokeWidth={3.2} style={{ opacity: 0.45 + k * 0.27 }} />
            ))}
          </Box>
        </Box>
        {/* underline with dot pointing toward the circle */}
        <Box aria-hidden sx={{ position: "relative", height: 3, borderRadius: 2, mt: 1, mb: 1.25, width: { xs: "100%", md: 300 }, background: `linear-gradient(90deg, ${color}, ${color}55)`, "&::after": { content: '""', position: "absolute", top: -4, width: 11, height: 11, borderRadius: "50%", bgcolor: color, left: { xs: -1, md: circleLeft ? -1 : "auto" }, right: { md: circleLeft ? "auto" : -1 } } }} />
        <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.02rem", md: "1.12rem" }, lineHeight: 1.3 }}>{step.title}</Typography>
        <Typography sx={{ mt: 0.5, color: COLORS.textSecondary, fontSize: { xs: "0.9rem", md: "0.95rem" }, lineHeight: 1.55 }}>{step.text}</Typography>
      </Box>
    </Box>
  );
}

/** "Our Journey" — zigzag milestone timeline (desktop) / vertical rail (mobile). */
export default function JourneyTimeline({ journey }: { journey: AboutContent["journey"] }) {
  const steps = journey.steps;

  if (!steps.length) return null;

  const n = steps.length;
  const pts = steps.map((_, i) => ({ x: CX[i % 2], y: ROW * i + ROW / 2 }));

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, background: "linear-gradient(180deg, #FFFFFF 0%, #F6F7FA 100%)", overflow: "hidden" }}>
      <Container sx={{ maxWidth: "1060px !important" }}>
        <SectionHeading align="center" title="Our Journey" subtitle={journey.subtitle} />
        <Box sx={{ mx: "auto", mb: { xs: 5, md: 7 }, maxWidth: 640, display: "flex", alignItems: "center", gap: 1.5, px: { xs: 2, md: 3 }, py: { xs: 1.5, md: 1.75 }, borderRadius: "14px", bgcolor: "#FFFBEA", border: "1px solid #F5E08A" }}>
          <Quote size={26} color={COLORS.red} fill={COLORS.redTint} style={{ flexShrink: 0, transform: "scaleX(-1)" }} />
          <Typography sx={{ color: COLORS.navy, fontWeight: 700, fontStyle: "italic", fontSize: { xs: "0.95rem", md: "1.05rem" } }}>{journey.quote}</Typography>
        </Box>

        <Box component="ol" sx={{ position: "relative", listStyle: "none", m: 0, p: 0 }}>
          {/* desktop zigzag band */}
          <Box component="svg" aria-hidden viewBox={`0 0 ${TRACK} ${ROW * n}`} sx={{ display: { xs: "none", md: "block" }, position: "absolute", top: 0, left: "50%", ml: `-${TRACK / 2}px`, width: TRACK, height: ROW * n }}>
            <defs>
              {pts.slice(0, -1).map((p, i) => (
                <linearGradient key={i} id={`seg-${i}`} gradientUnits="userSpaceOnUse" x1={p.x} y1={p.y} x2={pts[i + 1].x} y2={pts[i + 1].y}>
                  <stop offset="0" stopColor={shade(i)} />
                  <stop offset="1" stopColor={shade(i + 1)} />
                </linearGradient>
              ))}
            </defs>
            {pts.slice(0, -1).map((p, i) => (
              <g key={i}>
                <line x1={p.x + 9} y1={p.y + 5} x2={pts[i + 1].x + 9} y2={pts[i + 1].y + 5} stroke={COLORS.navyDark} strokeWidth="30" opacity=".9" />
                <line x1={p.x} y1={p.y} x2={pts[i + 1].x} y2={pts[i + 1].y} stroke={`url(#seg-${i})`} strokeWidth="30" />
              </g>
            ))}
          </Box>
          {/* mobile rail */}
          <Box aria-hidden sx={{ display: { xs: "block", md: "none" }, position: "absolute", left: 29, top: 32, bottom: 40, width: 6, borderRadius: 3, background: `linear-gradient(180deg, ${STEP_COLORS.slice(0, n).join(", ")})` }} />

          {steps.map((s, i) => (
            <StepRow key={`${s.year}-${s.title}`} step={s} i={i} total={n} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
