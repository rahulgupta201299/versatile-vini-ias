"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { keyframes } from "@mui/system";
import { Radio, MessageCircleQuestion, PenLine } from "lucide-react";
import {
  IMPACT_STATS,
  IMPACT_FEATURES,
  IMPACT_AVATARS,
  IMPACT_LOGO_POSITION,
} from "@/data/impact";
import { ImpactFeatureChip } from "@/types";

/* Layout reference: vedantu.com "Impact. At scale" — map artwork 704 × 440 */
const MAP_W = 704;
const MAP_H = 440;
const TEXT = "#0F172A";
const ACCENT = "#FE0034";

const float = keyframes`
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-50%, calc(-50% - 6px)); }
`;
const pulse = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: .35; }
  100% { transform: translate(-50%, -50%) scale(1.3); opacity: 0; }
`;

const CHIP_ICONS: Record<ImpactFeatureChip["icon"], React.ReactNode> = {
  live: <Radio size={16} color={ACCENT} />,
  doubt: <MessageCircleQuestion size={16} color="#7C3AED" />,
  writing: <PenLine size={16} color="#EA580C" />,
};

/** Position an element by its centre at x% / y% of the map. */
const at = (x: number, y: number) => ({
  position: "absolute" as const,
  left: `${x}%`,
  top: `${y}%`,
  transform: "translate(-50%, -50%)",
});

/** Hand-drawn style chart illustration (bars + pie). */
function ChartIllustration() {
  return (
    <Box
      component="svg"
      viewBox="0 0 104 120"
      aria-hidden
      sx={{ width: { xs: 72, md: 104 }, height: "auto", display: "block", mb: 2 }}
    >
      <path d="M6 112h56" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      <path d="M6 108v8M62 108v8" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <rect x="10" y="90" width="8" height="20" rx="1.5" fill="#7C3AED" stroke="#0F172A" strokeWidth="2" />
      <rect x="24" y="68" width="14" height="42" rx="2" fill="#FFE51F" stroke="#0F172A" strokeWidth="2" />
      <rect x="44" y="94" width="10" height="16" rx="1.5" fill={ACCENT} stroke="#0F172A" strokeWidth="2" />
      <circle cx="72" cy="58" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <path d="M72 58V34a24 24 0 0 1 17 41z" fill="#34D399" stroke="#0F172A" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M52 50l14-12M50 58l18-16M52 66l16-14" stroke="#0F172A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70 20c12 2 22 10 26 22" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="68" cy="20" r="4" fill="#FFE51F" stroke="#0F172A" strokeWidth="2" />
    </Box>
  );
}

function FeatureChip({ chip, delay }: { chip: ImpactFeatureChip; delay: number }) {
  const [before, after] = chip.text.split(chip.highlight);
  return (
    <Box
      sx={{
        ...at(chip.x, chip.y),
        zIndex: 2,
        display: "inline-flex",
        alignItems: "center",
        gap: { xs: 0.5, sm: 0.75 },
        px: { xs: 1, sm: 1.5 },
        py: { xs: 0.5, sm: 0.9 },
        backgroundColor: "#FFFFFF",
        borderRadius: "9999px",
        boxShadow: "0 4px 16px rgba(15, 23, 42, 0.10)",
        border: "1px solid #F1F2F8",
        whiteSpace: "nowrap",
        fontSize: { xs: "0.62rem", sm: "0.8rem", md: "0.9rem" },
        color: TEXT,
        animation: `${float} 4s ease-in-out ${delay}s infinite`,
        "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        "& svg": { width: { xs: 12, sm: 16 }, height: { xs: 12, sm: 16 } },
      }}
    >
      {CHIP_ICONS[chip.icon]}
      <span>
        {before}
        <b>{chip.highlight}</b>
        {after}
      </span>
    </Box>
  );
}

function ImpactMap() {
  return (
    <Box
      role="img"
      aria-label="Students learning with Vini IAS across the globe"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: MAP_W,
        mx: "auto",
        aspectRatio: `${MAP_W} / ${MAP_H}`,
        backgroundImage: "url(/images/impact/world-dots.svg)",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {IMPACT_AVATARS.map((a) => (
        <Box
          key={`${a.x}-${a.y}`}
          component="img"
          src={a.src}
          alt={a.alt}
          loading="lazy"
          sx={{
            ...at(a.x, a.y),
            width: `${(a.size / MAP_W) * 100}%`,
            aspectRatio: "1",
            objectFit: "cover",
            borderRadius: "50%",
            border: "3px solid #FFFFFF",
            boxShadow: "0 4px 14px rgba(15, 23, 42, 0.12)",
          }}
        />
      ))}

      {IMPACT_FEATURES.map((chip, i) => (
        <FeatureChip key={chip.text} chip={chip} delay={i * 0.8} />
      ))}

      {/* Our logo replaces the reference "V" badge */}
      <Box sx={{ ...at(IMPACT_LOGO_POSITION.x, IMPACT_LOGO_POSITION.y), width: "17%", zIndex: 3 }}>
        <Box
          aria-hidden
          sx={{
            ...at(50, 50),
            width: "100%",
            height: "100%",
            borderRadius: "16px",
            backgroundColor: ACCENT,
            animation: `${pulse} 2.4s ease-out infinite`,
            "@media (prefers-reduced-motion: reduce)": { animation: "none", opacity: 0 },
          }}
        />
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#FFFFFF",
            border: `2px solid ${ACCENT}`,
            borderRadius: { xs: "10px", sm: "16px" },
            boxShadow: "0 8px 22px rgba(254, 0, 52, 0.25)",
            p: { xs: "4px", sm: "8px" },
            lineHeight: 0,
          }}
        >
          <Box component="img" src="/images/logo.png" alt="Vini IAS" sx={{ width: "100%", height: "auto" }} />
        </Box>
      </Box>
    </Box>
  );
}

export default function ImpactStatsSection() {
  return (
    <Box component="section" id="impact" sx={{ py: { xs: 4, md: 6 }, backgroundColor: "#FFFFFF" }}>
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.75fr) minmax(0, 1fr)" },
            gap: { xs: 3, md: 4 },
            alignItems: "center",
          }}
        >
          {/* Left: heading + stats */}
          <Box>
            <ChartIllustration />
            <Typography
              component="h2"
              sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 600, lineHeight: 1.25, color: TEXT, mb: 1.5 }}
            >
              Impact. At{" "}
              <Box component="span" sx={{ position: "relative", color: ACCENT, display: "inline-block" }}>
                scale
                <Box
                  component="svg"
                  viewBox="0 0 120 14"
                  preserveAspectRatio="none"
                  aria-hidden
                  sx={{ position: "absolute", left: 0, bottom: -8, width: "100%", height: 12 }}
                >
                  <path d="M2 9C30 4 70 2 118 4" stroke="#FFE51F" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d="M10 12C40 9 75 8 110 9" stroke="#FFE51F" strokeWidth="3" strokeLinecap="round" fill="none" />
                </Box>
              </Box>
            </Typography>
            <Typography sx={{ fontSize: { xs: "0.85rem", md: "0.9rem" }, color: TEXT, lineHeight: 1.6 }}>
              Making education affordable and accessible across the globe
            </Typography>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", columnGap: 3 }}>
              {IMPACT_STATS.map((stat) => (
                <Box key={`${stat.value}-${stat.label}`} sx={{ py: { xs: 2.5, md: "34px" } }}>
                  <Typography
                    component="p"
                    sx={{ fontSize: { xs: "1.6rem", md: "2rem" }, fontWeight: 600, lineHeight: { xs: "32px", md: "40px" }, color: TEXT }}
                  >
                    {stat.value}
                    {stat.unit && (
                      <>
                        <br />
                        {stat.unit}
                      </>
                    )}
                  </Typography>
                  <Typography sx={{ fontSize: { xs: "0.82rem", md: "0.875rem" }, fontWeight: 500, color: TEXT, mt: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Right: map with floating elements */}
          <ImpactMap />
        </Box>
      </Container>
    </Box>
  );
}
