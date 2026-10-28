"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { openAuth } from "@/utils/events";
import { keyframes } from "@mui/material/styles";
import { ArrowRight, BookOpen } from "lucide-react";
import { LANDING_ICONS } from "@/sections/CourseLanding/icons";
import { LandingIcon } from "@/types";
import { COLORS } from "@/theme/colors";
import { scrollToDetails } from "./FreeResourceHero";
import { externalLinkProps } from "@/utils/links";

type Props = {
  /** Title and price on the left — leave out for a buttons-only bar. */
  title?: string;
  priceLabel?: string;
  isFree?: boolean;
  /** Replace "Course Details · Enroll" with these yellow link buttons (e.g. Monthly Magazine, PRISM Simplified). */
  links?: { label: string; href: string; icon?: LandingIcon; badge?: string }[];
};

/** Bottom bar (price · Course Details · Enroll, or custom link buttons) that appears once the hero scrolls out of view. */
const flow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;
const shine = keyframes`
  0%, 60% { transform: translateX(-130%) skewX(-20deg); }
  100% { transform: translateX(330%) skewX(-20deg); }
`;
const glow = keyframes`
  0%, 100% { box-shadow: 0 6px 16px rgba(242, 213, 0, .4), 0 0 0 0 rgba(255, 229, 31, .6); }
  50% { box-shadow: 0 10px 22px rgba(242, 213, 0, .55), 0 0 0 8px rgba(255, 229, 31, 0); }
`;
const wiggle = keyframes`
  0%, 78%, 100% { transform: rotate(0) scale(1); }
  82% { transform: rotate(-14deg) scale(1.12); }
  88% { transform: rotate(10deg) scale(1.12); }
  94% { transform: rotate(-4deg) scale(1.04); }
`;
const slide = keyframes`
  0%, 100% { transform: translateX(0); opacity: 1; }
  50% { transform: translateX(4px); opacity: .7; }
`;
const pop = keyframes`
  0%, 100% { transform: translateY(0) scale(1); }
  50% { transform: translateY(-2px) scale(1.08); }
`;

/**
 * Yellow call-to-action pills: flowing yellow gradient, light sweep, soft pulse,
 * a wiggling icon chip, a sliding arrow and an optional "FREE" tag. Calm when the user prefers reduced motion.
 */
const linkButtonSx = {
  position: "relative",
  overflow: "visible",
  isolation: "isolate",
  display: "inline-flex",
  alignItems: "center",
  flex: { xs: "1 1 0", sm: "0 0 auto" },
  minWidth: 0,
  justifyContent: "center",
  gap: { xs: 0.6, md: 1 },
  height: { xs: 44, md: 46 },
  pl: { xs: 0.5, md: 0.75 },
  pr: { xs: 1, md: 1.75 },
  borderRadius: "9999px",
  border: `1.5px solid ${COLORS.yellowDark}`,
  background: `linear-gradient(110deg, ${COLORS.yellow} 0%, #FFF27A 25%, ${COLORS.yellow} 50%, #FFD60A 75%, ${COLORS.yellow} 100%)`,
  backgroundSize: "200% 100%",
  color: COLORS.navyDark,
  fontWeight: 900,
  fontSize: { xs: "0.74rem", sm: "0.85rem", md: "0.95rem" },
  letterSpacing: ".01em",
  textDecoration: "none",
  whiteSpace: "nowrap",
  animation: `${flow} 4s linear infinite, ${glow} 2.4s ease-in-out infinite`,
  transition: "transform .2s ease",
  "& .shine": {
    position: "absolute",
    inset: 0,
    borderRadius: "inherit",
    overflow: "hidden",
    pointerEvents: "none",
    zIndex: -1,
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      width: "35%",
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,.85), transparent)",
      animation: `${shine} 3.4s ease-in-out infinite`,
    },
  },
  "& .cta-icon": { animation: `${wiggle} 3.4s ease-in-out infinite` },
  "& .cta-arrow": { display: { xs: "none", sm: "block" }, flexShrink: 0, animation: `${slide} 1.2s ease-in-out infinite` },
  "& .cta-tag": { animation: `${pop} 1.6s ease-in-out infinite` },
  "&:hover": { transform: "translateY(-2px) scale(1.02)" },
  "&:hover .cta-arrow": { transform: "translateX(4px)" },
  "&:focus-visible": { outline: `3px solid ${COLORS.navy}`, outlineOffset: 2 },
  "@media (prefers-reduced-motion: reduce)": {
    animation: "none",
    "& .shine::after, & .cta-icon, & .cta-arrow, & .cta-tag": { animation: "none" },
  },
} as const;

export default function StickyEnrollBar({
  title,
  priceLabel,
  isFree,
  links,
}: Props) {
  // A links bar (e.g. Monthly Magazine · PRISM) is shown from the start; the enroll bar waits until the hero scrolls away.
  const [show, setShow] = useState(Boolean(links));

  useEffect(() => {
    if (links) return;

    const hero = document.getElementById("course-top");

    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(hero);

    return () => observer.disconnect();
  }, [links]);

  return (
    <>
      <Box
        role="region"
        aria-label="Enroll"
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1100,
          backgroundColor: "#FFFFFF",
          borderTop: `1px solid ${COLORS.border}`,
          boxShadow: "0 -8px 24px rgba(15,23,42,.08)",
          transform: show ? "translateY(0)" : "translateY(110%)",
          transition: "transform .25s ease",
          pb: "env(safe-area-inset-bottom)",
        }}
      >
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "center", sm: "flex-start" },
            gap: { xs: 1, md: 2 },
            py: { xs: 1, md: 1.25 },
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, display: links && !title && !priceLabel ? { xs: "none", sm: "block" } : "block" }}>
            {title && (
              <Typography
                noWrap
                sx={{
                  display: { xs: "none", md: "block" },
                  fontWeight: 700,
                  color: COLORS.ink,
                  fontSize: "0.95rem",
                }}
              >
                {title}
              </Typography>
            )}
            {priceLabel && (
              <Typography
                sx={{
                  fontWeight: 800,
                  color: isFree ? COLORS.success : COLORS.ink,
                  fontSize: { xs: "0.98rem", md: "1.05rem" },
                }}
              >
                {priceLabel}
              </Typography>
            )}
          </Box>
          {links ? (
            links.map((l) => (
              <Box
                key={l.href}
                component={Link}
                href={l.href}
                {...externalLinkProps(l)}
                sx={linkButtonSx}
              >
                <Box component="span" className="shine" aria-hidden />
                <Box component="span" className="cta-icon" aria-hidden sx={{ display: "inline-flex", width: { xs: 26, md: 30 }, height: { xs: 26, md: 30 }, borderRadius: "50%", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${COLORS.navy} 0%, ${COLORS.navyDark} 100%)`, color: COLORS.yellow, flexShrink: 0, boxShadow: "inset 0 0 0 2px rgba(255,255,255,.25)" }}>
                  {l.icon ? React.createElement(LANDING_ICONS[l.icon], { size: 16, strokeWidth: 2.5 }) : <BookOpen size={16} strokeWidth={2.5} />}
                </Box>
                {l.label}
                <ArrowRight className="cta-arrow" size={16} strokeWidth={3} aria-hidden />
                {l.badge && (
                  <Box component="span" className="cta-tag" sx={{ position: "absolute", top: -9, right: 10, px: 0.75, py: "1px", borderRadius: "6px", backgroundColor: COLORS.red, color: "#FFFFFF", fontSize: "0.6rem", fontWeight: 900, letterSpacing: ".06em", boxShadow: "0 3px 8px rgba(254,0,52,.35)" }}>
                    {l.badge}
                  </Box>
                )}
              </Box>
            ))
          ) : (
            <>
              <Box
                component="button"
                type="button"
                onClick={scrollToDetails}
                sx={{
                  height: 42,
                  px: { xs: 1.75, md: 2.75 },
                  borderRadius: "10px",
                  border: `1.5px solid ${COLORS.ink}`,
                  backgroundColor: "#FFFFFF",
                  color: COLORS.ink,
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: { xs: "0.85rem", md: "0.92rem" },
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Course Details
              </Box>
              <Box
                component="button"
                type="button"
                onClick={openAuth}
                sx={{
                  height: 42,
                  px: { xs: 2.25, md: 3.5 },
                  borderRadius: "10px",
                  border: "none",
                  backgroundColor: COLORS.red,
                  color: "#FFFFFF",
                  fontFamily: "inherit",
                  fontWeight: 700,
                  fontSize: { xs: "0.85rem", md: "0.92rem" },
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  "&:hover": { backgroundColor: COLORS.redDark },
                }}
              >
                Enroll
              </Box>
            </>
          )}
        </Container>
      </Box>
      {/* keeps the footer clear of the bar */}
      <Box aria-hidden sx={{ height: { xs: 64, md: 72 } }} />
    </>
  );
}
