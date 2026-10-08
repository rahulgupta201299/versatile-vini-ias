import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookMarked, Lightbulb, Shield } from "lucide-react";
import { CourseLandingContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { CHIP_TONES, HANDWRITTEN, LANDING_ICONS, badgeSx } from "./icons";

const LEVEL_STYLES = [
  { bg: "linear-gradient(135deg, #FFB547 0%, #FF9F1C 100%)", text: "#3B2300", icon: Shield },
  { bg: "linear-gradient(135deg, #FFE27A 0%, #FFD23F 100%)", text: "#3B3000", icon: BookMarked },
  { bg: "linear-gradient(135deg, #3FD0C3 0%, #1FB5A8 100%)", text: "#04302C", icon: Lightbulb },
];

/** Class 6-8 → 9-10 → 11-12 staircase with curved arrows. */
function LevelLadder({ levels, progression }: { levels: { title: string; text: string }[]; progression: string[] }) {
  return (
    <Box sx={{ position: "relative", pt: { xs: 9.5, md: 9 }, pl: { xs: 4, md: 6 } }}>
      {/* Concepts → Clarity → Confidence */}
      <Box aria-hidden sx={{ position: "absolute", top: 0, right: { xs: 0, md: 8 }, fontFamily: HANDWRITTEN, color: COLORS.navy, fontSize: { xs: "0.95rem", md: "1.1rem" }, lineHeight: 1.2, transform: "rotate(-6deg)" }}>
        {progression.map((p, i) => (
          <Box key={p} sx={{ pl: i * 1.5 }}>
            {i ? "→ " : ""}
            {p}
          </Box>
        ))}
      </Box>

      {/* curved arrows on the left */}
      <Box component="svg" viewBox="0 0 40 200" aria-hidden sx={{ position: "absolute", left: 0, top: { xs: 90, md: 92 }, width: { xs: 28, md: 40 }, height: { xs: 170, md: 210 } }}>
        <path d="M30 10 C 0 40, 0 70, 30 95" stroke={COLORS.navy} strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        <path d="M30 110 C 0 140, 0 170, 30 192" stroke={COLORS.navy} strokeWidth="2" fill="none" markerEnd="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
            <path d="M0 0 L8 4 L0 8 Z" fill={COLORS.navy} />
          </marker>
        </defs>
      </Box>

      <Box sx={{ display: "grid", gap: { xs: 1.5, md: 2 } }}>
        {levels.map((level, i) => {
          const style = LEVEL_STYLES[i % LEVEL_STYLES.length];
          const Icon = style.icon;
          return (
            <Box
              key={level.title}
              sx={{
                ml: { xs: `${i * 6}%`, md: `${i * 10}%` },
                width: { xs: "86%", md: "80%" },
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                px: { xs: 1.75, md: 2.25 },
                py: { xs: 1.25, md: 1.5 },
                borderRadius: "12px",
                background: style.bg,
                color: style.text,
                transform: "rotate(-3deg)",
                boxShadow: "0 10px 22px rgba(15,23,42,.12)",
              }}
            >
              <Box sx={{ width: 32, height: 32, borderRadius: "8px", backgroundColor: "rgba(255,255,255,.55)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={18} />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.2 }}>{level.title}</Typography>
                <Typography sx={{ fontSize: { xs: "0.78rem", md: "0.85rem" }, opacity: 0.85 }}>({level.text})</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}

export default function LandingHighlights({ data }: { data: CourseLandingContent["highlights"] }) {
  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 4, md: 6 }, background: "linear-gradient(180deg, #F1F7FE 0%, #EAF3FD 100%)" }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" }, gap: { xs: 4, md: 6 }, alignItems: "center" }}>
        <Box>
          <Box sx={badgeSx("#1D4ED8", "#DBEAFE", "#BFDBFE")}>{data.badge}</Box>
          <Typography component="h2" sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.2rem" }, color: COLORS.navy, lineHeight: 1.15 }}>
            {data.title}
          </Typography>
          <Typography sx={{ mt: 0.5, fontWeight: 600, fontSize: { xs: "1rem", md: "1.15rem" }, color: COLORS.navy }}>{data.subtitle}</Typography>

          <Box sx={{ mt: { xs: 2.5, md: 3 }, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", rowGap: { xs: 2.5, md: 3 } }}>
            {data.subjects.map((s, i) => {
              const Icon = LANDING_ICONS[s.icon];
              const tone = CHIP_TONES[(i + 4) % CHIP_TONES.length];
              return (
                <Box key={s.title} sx={{ textAlign: "center", borderLeft: i % 3 ? `1px solid ${COLORS.border}` : "none", px: 1 }}>
                  <Box sx={{ width: { xs: 50, md: 58 }, height: { xs: 50, md: 58 }, mx: "auto", borderRadius: "50%", backgroundColor: tone.bg, display: "flex", alignItems: "center", justifyContent: "center", "& svg": { width: { xs: 24, md: 28 }, height: { xs: 24, md: 28 } } }}>
                    <Icon color={tone.color} />
                  </Box>
                  <Typography sx={{ mt: 1, fontWeight: 700, color: COLORS.navy, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>{s.title}</Typography>
                </Box>
              );
            })}
          </Box>

          <Typography sx={{ mt: { xs: 2.5, md: 3 }, color: COLORS.textSecondary, fontSize: { xs: "0.82rem", md: "0.9rem" }, fontWeight: 500 }}>{data.footnotes.join("  |  ")}</Typography>
        </Box>

        <LevelLadder levels={data.levels} progression={data.progression} />
      </Container>
    </Box>
  );
}
