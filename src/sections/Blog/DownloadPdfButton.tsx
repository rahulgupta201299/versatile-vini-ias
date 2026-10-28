"use client";

import React from "react";
import Box from "@mui/material/Box";
import { keyframes } from "@mui/material/styles";
import { ArrowRight, FileDown } from "lucide-react";
import { COLORS } from "@/theme/colors";

const flow = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;
const shine = keyframes`
  0%, 55% { transform: translateX(-140%) skewX(-20deg); }
  100% { transform: translateX(420%) skewX(-20deg); }
`;
const glow = keyframes`
  0%, 100% { box-shadow: 0 10px 24px rgba(242, 213, 0, .35), 0 0 0 0 rgba(255, 229, 31, .55); }
  50% { box-shadow: 0 12px 28px rgba(242, 213, 0, .5), 0 0 0 10px rgba(255, 229, 31, 0); }
`;
const drop = keyframes`
  0%, 60%, 100% { transform: translateY(0); }
  70% { transform: translateY(4px); }
  80% { transform: translateY(-2px); }
  90% { transform: translateY(2px); }
`;
const ring = keyframes`
  0% { transform: scale(1); opacity: .55; }
  100% { transform: scale(1.6); opacity: 0; }
`;
const nudge = keyframes`
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
`;

/**
 * "Download this Article as PDF" — animated yellow CTA (flowing yellow, light sweep, pulse, bouncing icon).
 * Downloads the article PDF (generated at /exams/<category>/<post>/pdf, or a published file).
 */
export default function DownloadPdfButton({ href }: { href: string }) {
  const sx = {
    position: "relative",
    overflow: "hidden",
    isolation: "isolate",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.25,
    minHeight: 56,
    px: 2,
    borderRadius: "14px",
    border: `1.5px solid ${COLORS.yellowDark}`,
    background: `linear-gradient(110deg, ${COLORS.yellow} 0%, #FFF27A 25%, ${COLORS.yellow} 50%, #FFD60A 75%, ${COLORS.yellow} 100%)`,
    backgroundSize: "200% 100%",
    color: COLORS.navyDark,
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: { xs: "1rem", md: "1.1rem" },
    textDecoration: "none",
    cursor: "pointer",
    animation: `${flow} 4s linear infinite, ${glow} 2.4s ease-in-out infinite`,
    transition: "transform .2s ease",
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: "25%",
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,.8), transparent)",
      animation: `${shine} 3.2s ease-in-out infinite`,
      zIndex: -1,
      pointerEvents: "none",
    },
    "& .pdf-icon svg": { animation: `${drop} 2.4s ease-in-out infinite` },
    "& .pdf-icon::before": { content: '""', position: "absolute", inset: 0, borderRadius: "inherit", border: `2px solid ${COLORS.red}`, animation: `${ring} 1.8s ease-out infinite` },
    "& .pdf-arrow": { animation: `${nudge} 1.2s ease-in-out infinite` },
    "&:hover": { transform: "translateY(-2px) scale(1.01)" },
    "&:active": { transform: "scale(.99)" },
    "&:focus-visible": { outline: `3px solid ${COLORS.navy}`, outlineOffset: 2 },
    "@media (prefers-reduced-motion: reduce)": {
      animation: "none",
      "&::after, & .pdf-icon::before": { display: "none" },
      "& .pdf-icon svg, & .pdf-arrow": { animation: "none" },
    },
  } as const;

  const content = (
    <>
      <Box component="span" className="pdf-icon" sx={{ position: "relative", width: 36, height: 36, borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <FileDown size={19} />
      </Box>
      Download this Article as PDF
      <Box component="span" className="pdf-arrow" sx={{ display: { xs: "none", sm: "inline-flex" } }}>
        <ArrowRight size={18} strokeWidth={2.5} />
      </Box>
    </>
  );

  return (
    <Box component="a" href={href} download sx={sx}>
      {content}
    </Box>
  );
}
