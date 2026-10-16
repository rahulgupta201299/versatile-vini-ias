import React from "react";
import Box from "@mui/material/Box";
import { COLORS } from "@/theme/colors";

/** Original hero art for /careers: books, laptop, graduation cap and a star medal in brand colours. */
export default function CareersIllustration() {
  return (
    <Box component="svg" viewBox="0 0 420 320" aria-hidden sx={{ width: "100%", maxWidth: 480, height: "auto", display: "block" }}>
      <circle cx="250" cy="130" r="118" fill={COLORS.redTint} />
      <circle cx="96" cy="70" r="34" fill="#FFF3B8" />
      {/* half dome */}
      <path d="M150 258a100 100 0 0 1 200 0z" fill={COLORS.red} />
      <path d="M190 258a60 60 0 0 1 120 0z" fill={COLORS.redDarker} opacity=".35" />
      {/* laptop */}
      <rect x="196" y="166" width="108" height="70" rx="6" fill={COLORS.navy} />
      <rect x="204" y="174" width="92" height="54" rx="3" fill="#FFFFFF" />
      <rect x="212" y="182" width="44" height="6" rx="3" fill={COLORS.red} />
      <rect x="212" y="194" width="70" height="4" rx="2" fill="#CBD5E1" />
      <rect x="212" y="203" width="58" height="4" rx="2" fill="#CBD5E1" />
      <rect x="212" y="212" width="30" height="8" rx="4" fill={COLORS.yellow} />
      <path d="M184 236h132l-8 10H192z" fill={COLORS.navyDark} />
      {/* books */}
      <rect x="66" y="232" width="110" height="16" rx="3" fill={COLORS.navy} />
      <rect x="74" y="216" width="96" height="16" rx="3" fill={COLORS.yellow} />
      <rect x="62" y="200" width="104" height="16" rx="3" fill={COLORS.red} />
      <rect x="70" y="204" width="80" height="2" fill="#FFFFFF" opacity=".6" />
      {/* plant */}
      <path d="M350 248h36l-5 20h-26z" fill={COLORS.navy} />
      <path d="M368 248c-2-20-14-30-24-32 8 10 10 22 10 32M368 248c2-22 14-34 26-36-8 12-12 24-12 36" fill="#2F9E44" />
      {/* graduation cap */}
      <path d="M262 64l62 26-62 26-62-26z" fill={COLORS.navy} />
      <path d="M226 101v22c0 8 16 15 36 15s36-7 36-15v-22l-36 15z" fill={COLORS.navyDark} />
      <path d="M318 92v34" stroke={COLORS.yellow} strokeWidth="3" />
      <circle cx="318" cy="130" r="6" fill={COLORS.yellow} />
      {/* star medal */}
      <path d="M108 120l-12 30M120 120l12 30" stroke={COLORS.red} strokeWidth="6" />
      <circle cx="114" cy="160" r="22" fill={COLORS.yellow} stroke="#F5B800" strokeWidth="4" />
      <path d="M114 148l3.6 7.4 8.1 1.2-5.9 5.7 1.4 8.1-7.2-3.8-7.2 3.8 1.4-8.1-5.9-5.7 8.1-1.2z" fill={COLORS.red} />
      {/* sparkles */}
      <path d="M380 70l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill={COLORS.yellowDark} />
      <path d="M170 40l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill={COLORS.red} />
      <path d="M40 270h360" stroke="#E2E8F0" strokeWidth="3" strokeLinecap="round" />
    </Box>
  );
}
