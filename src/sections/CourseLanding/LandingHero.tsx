import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@/components/Breadcrumbs";
import { CourseLandingContent } from "@/types";
import { COLORS } from "@/theme/colors";
import LandingCta from "./LandingCta";
import { HANDWRITTEN } from "./icons";

const SPINES = ["#F08A24", "#3E9B47", "#2B63B0", "#1597A8", "#6A3EA1", "#2E3F66"];

/** Stack of NCERT books (pure CSS, scales with the container). */
function BookStack({ books }: { books: string[] }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "3px", width: "100%" }}>
      {books.map((subject, i) => {
        const color = SPINES[i % SPINES.length];
        return (
          <Box
            key={subject}
            sx={{
              position: "relative",
              width: `${86 + (i % 2 ? 6 : 0) + i * 1.2}%`,
              mr: i % 2 ? 0 : "3%",
              height: { xs: 30, sm: 36, md: 42 },
              borderRadius: "6px 3px 3px 6px",
              background: `linear-gradient(180deg, ${color} 0%, ${color} 70%, rgba(0,0,0,.18) 100%), ${color}`,
              boxShadow: "0 6px 12px rgba(15,23,42,.18)",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              // page edges on the right
              "&::after": {
                content: '""',
                position: "absolute",
                right: 0,
                top: 4,
                bottom: 4,
                width: "9%",
                borderRadius: "2px",
                background: "repeating-linear-gradient(180deg, #FFFDF5 0 2px, #E8E2D0 2px 3px)",
              },
            }}
          >
            <Box sx={{ height: "100%", px: { xs: 1, md: 1.5 }, display: "flex", alignItems: "center", backgroundColor: "rgba(0,0,0,.16)", color: "#FFFFFF", fontWeight: 900, fontSize: { xs: "0.62rem", sm: "0.72rem", md: "0.82rem" }, letterSpacing: "0.04em" }}>
              NCERT
            </Box>
            <Typography component="span" sx={{ pl: { xs: 1, md: 1.75 }, color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.66rem", sm: "0.76rem", md: "0.86rem" }, whiteSpace: "nowrap", textShadow: "0 1px 1px rgba(0,0,0,.2)" }}>
              {subject}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}

/** Faint dome-and-columns silhouette behind the books. */
function BuildingSilhouette() {
  return (
    <Box component="svg" viewBox="0 0 400 260" aria-hidden sx={{ position: "absolute", left: "8%", top: 0, width: "70%", height: "75%", opacity: 0.18 }}>
      <g fill="#B08968">
        <rect x="150" y="70" width="100" height="14" rx="3" />
        <path d="M160 70 Q200 0 240 70 Z" />
        <rect x="196" y="0" width="8" height="18" />
        <rect x="110" y="84" width="180" height="12" />
        {Array.from({ length: 9 }).map((_, i) => (
          <rect key={i} x={118 + i * 20} y="96" width="8" height="90" />
        ))}
        <rect x="90" y="186" width="220" height="14" />
        <rect x="20" y="130" width="70" height="70" />
        <rect x="310" y="130" width="70" height="70" />
      </g>
    </Box>
  );
}

export default function LandingHero({ hero }: { hero: CourseLandingContent["hero"] }) {
  return (
    <Box component="section" id="course-top" sx={{ position: "relative", overflow: "hidden", background: "linear-gradient(115deg, #FFFFFF 0%, #FFF8F1 55%, #FBEFE3 100%)", pt: { xs: 1.5, md: 2 }, pb: { xs: 4, md: 6 } }}>
      <Container>
        <Breadcrumbs />
        <Box sx={{ mt: { xs: 2, md: 3 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.05fr) minmax(0, 1fr)" }, gap: { xs: 3.5, md: 5 }, alignItems: "center" }}>
          <Box>
            <Box component="span" sx={{ display: "inline-block", px: 1.75, py: 0.4, borderRadius: "9999px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 900, fontSize: { xs: "0.95rem", md: "1.15rem" }, letterSpacing: "0.04em" }}>
              {hero.badge}
            </Box>
            <Typography component="h1" sx={{ mt: 1.25, lineHeight: 1.02 }}>
              <Box component="span" sx={{ display: "block", fontWeight: 900, fontSize: { xs: "3rem", sm: "3.75rem", md: "4.5rem" }, color: COLORS.navy, letterSpacing: "-0.02em" }}>
                {hero.heading}
              </Box>
              <Box component="span" sx={{ display: "block", fontWeight: 900, fontSize: { xs: "1.75rem", sm: "2.35rem", md: "2.85rem" }, color: COLORS.red, letterSpacing: "-0.01em" }}>
                {hero.subheading}
              </Box>
            </Typography>
            <Typography sx={{ mt: { xs: 1.5, md: 2 }, fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.35rem" }, color: COLORS.navy }}>{hero.tagline}</Typography>
            <Typography sx={{ mt: 1, maxWidth: 480, color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.65 }}>{hero.description}</Typography>
            <Box sx={{ mt: { xs: 2.5, md: 3.5 } }}>
              <LandingCta label={hero.ctaLabel} />
            </Box>
          </Box>

          {/* Artwork */}
          <Box sx={{ position: "relative", pt: { xs: 10, md: 12 }, pb: 1, px: { xs: 1, md: 2 } }}>
            <BuildingSilhouette />
            <Box
              aria-hidden
              sx={{ position: "absolute", top: 0, right: { xs: 6, md: 12 }, transform: "rotate(-8deg)", fontFamily: HANDWRITTEN, color: COLORS.navy, fontSize: { xs: "1.05rem", md: "1.35rem" }, lineHeight: 1.15, textAlign: "left", zIndex: 1 }}
            >
              {hero.note.map((line, i) => (
                <Box key={line} sx={{ pl: i ? 1.5 : 0 }}>
                  {line}
                </Box>
              ))}
              <Box component="svg" viewBox="0 0 120 10" sx={{ display: "block", width: { xs: 90, md: 116 }, ml: 1.5 }}>
                <path d="M2 7 Q60 0 118 5" stroke={COLORS.red} strokeWidth="3" fill="none" strokeLinecap="round" />
              </Box>
            </Box>
            <Box sx={{ position: "relative", maxWidth: 520, ml: "auto" }}>
              <BookStack books={hero.books} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
