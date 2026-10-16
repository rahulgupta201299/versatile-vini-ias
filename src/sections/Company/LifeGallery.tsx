"use client";

import React, { useState } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CareersContent } from "@/types";
import { COLORS } from "@/theme/colors";
import SectionHeading from "./SectionHeading";

const arrowSx = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  zIndex: 2,
  width: { xs: 36, md: 46 },
  height: { xs: 36, md: 46 },
  borderRadius: "50%",
  border: "none",
  cursor: "pointer",
  bgcolor: "rgba(255,255,255,.92)",
  color: COLORS.navy,
  boxShadow: "0 6px 16px rgba(0,0,0,.25)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "background-color .2s, color .2s",
  "&:hover": { bgcolor: COLORS.red, color: "#FFFFFF" },
} as const;

/** "Life at VINI GROUP" — large photo with caption + clickable thumbnails (Unacademy-style). */
export default function LifeGallery({ life }: { life: CareersContent["life"] }) {
  const [active, setActive] = useState(0);
  const photos = life.photos;
  if (!photos.length) return null;
  const go = (d: number) => setActive((i) => (i + d + photos.length) % photos.length);

  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#FFFFFF" }}>
      <Container sx={{ maxWidth: "1100px !important" }}>
        <SectionHeading align="center" title={life.title} subtitle={life.subtitle} />

        <Box
          role="region"
          aria-roledescription="carousel"
          aria-label={life.title}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") go(1);
            if (e.key === "ArrowLeft") go(-1);
          }}
          sx={{ position: "relative", aspectRatio: "16 / 9", borderRadius: { xs: "14px", md: "20px" }, overflow: "hidden", bgcolor: COLORS.navyDark, boxShadow: "0 20px 44px rgba(15,23,42,.18)", outline: "none", "&:focus-visible": { boxShadow: `0 0 0 3px ${COLORS.red}` } }}
        >
          {photos.map((p, i) => (
            <Box key={p.src} aria-hidden={i !== active} sx={{ position: "absolute", inset: 0, opacity: i === active ? 1 : 0, transform: i === active ? "scale(1)" : "scale(1.04)", transition: "opacity .6s ease, transform 1.2s ease" }}>
              <Image src={p.src} alt={p.caption} fill priority={i === 0} sizes="(max-width: 1100px) 100vw, 1100px" style={{ objectFit: "cover" }} />
            </Box>
          ))}
          <Box sx={{ position: "absolute", left: 0, right: 0, bottom: 0, zIndex: 1, px: { xs: 2, md: 3.5 }, pt: 6, pb: { xs: 1.5, md: 2.5 }, background: "linear-gradient(180deg, transparent, rgba(12,28,54,.82))", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
            <Typography aria-live="polite" sx={{ color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.95rem", md: "1.2rem" } }}>{photos[active].caption}</Typography>
            <Typography sx={{ flexShrink: 0, color: COLORS.yellow, fontWeight: 800, fontSize: { xs: "0.85rem", md: "0.95rem" } }}>
              {String(active + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </Typography>
          </Box>
          <Box component="button" type="button" aria-label="Previous photo" onClick={() => go(-1)} sx={{ ...arrowSx, left: { xs: 10, md: 18 } }}>
            <ChevronLeft size={22} />
          </Box>
          <Box component="button" type="button" aria-label="Next photo" onClick={() => go(1)} sx={{ ...arrowSx, right: { xs: 10, md: 18 } }}>
            <ChevronRight size={22} />
          </Box>
        </Box>

        <Box sx={{ mt: { xs: 1.5, md: 2.25 }, display: "grid", gridTemplateColumns: `repeat(${photos.length}, minmax(0, 1fr))`, gap: { xs: 1, md: 2 } }}>
          {photos.map((p, i) => (
            <Box
              key={p.src}
              component="button"
              type="button"
              aria-label={`Show photo ${i + 1}: ${p.caption}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              sx={{ position: "relative", aspectRatio: "16 / 10", p: 0, border: "none", cursor: "pointer", borderRadius: { xs: "8px", md: "12px" }, overflow: "hidden", outline: i === active ? `3px solid ${COLORS.red}` : "3px solid transparent", outlineOffset: 2, opacity: i === active ? 1 : 0.6, transition: "opacity .2s, outline-color .2s, transform .2s", "&:hover": { opacity: 1, transform: "translateY(-2px)" } }}
            >
              <Image src={p.src} alt="" fill sizes="(max-width: 600px) 25vw, 260px" style={{ objectFit: "cover" }} />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
