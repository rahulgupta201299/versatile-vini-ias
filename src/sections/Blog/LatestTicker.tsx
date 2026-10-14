"use client";

import React, { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { keyframes } from "@mui/material/styles";
import { X, Zap } from "lucide-react";
import { COLORS } from "@/theme/colors";

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

/** "LATEST NEWS" ticker — newest headlines scroll by (pauses on hover), can be dismissed. */
export default function LatestTicker({ items }: { items: { title: string; href: string }[] }) {
  const [open, setOpen] = useState(true);
  if (!open || !items.length) return null;
  const loop = [...items, ...items]; // duplicated for a seamless loop
  return (
    <Container sx={{ mt: { xs: 2, md: 2.5 } }}>
      <Box role="region" aria-label="Latest news" sx={{ display: "flex", alignItems: "center", height: 46, borderRadius: "12px", overflow: "hidden", background: `linear-gradient(90deg, ${COLORS.redDark} 0%, ${COLORS.red} 100%)`, color: "#FFFFFF", boxShadow: "0 10px 22px rgba(254,0,52,.22)" }}>
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 0.75, height: "100%", px: { xs: 1.25, md: 2 }, backgroundColor: COLORS.yellow, color: COLORS.navyDark, fontWeight: 900, fontSize: { xs: "0.72rem", md: "0.82rem" }, letterSpacing: ".06em", clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)", pr: { xs: 2, md: 3 } }}>
          <Zap size={16} fill="currentColor" /> LATEST NEWS
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden", "&:hover .track, &:focus-within .track": { animationPlayState: "paused" } }}>
          <Box className="track" sx={{ display: "flex", width: "max-content", animation: `${scroll} ${items.length * 9}s linear infinite`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
            {loop.map((it, i) => (
              <Box key={i} component={Link} href={it.href} tabIndex={i >= items.length ? -1 : 0} aria-hidden={i >= items.length || undefined} sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, px: 2.5, color: "#FFFFFF", textDecoration: "none", fontWeight: 600, fontSize: { xs: "0.82rem", md: "0.9rem" }, whiteSpace: "nowrap", "&:hover": { textDecoration: "underline" } }}>
                <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: COLORS.yellow }} />
                {it.title}
              </Box>
            ))}
          </Box>
        </Box>
        <IconButton aria-label="Close latest news" onClick={() => setOpen(false)} size="small" sx={{ mx: 0.75, color: "#FFFFFF", "&:hover": { backgroundColor: "rgba(255,255,255,.15)" } }}>
          <X size={18} />
        </IconButton>
      </Box>
    </Container>
  );
}
