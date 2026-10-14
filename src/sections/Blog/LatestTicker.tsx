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
    <Container sx={{ mt: { xs: 1.5, md: 2 } }}>
      <Box role="region" aria-label="Latest news" sx={{ display: "flex", alignItems: "center", height: { xs: 34, md: 36 }, borderRadius: "8px", overflow: "hidden", backgroundColor: COLORS.red, color: "#FFFFFF" }}>
        <Box sx={{ flexShrink: 0, display: "flex", alignItems: "center", gap: 0.5, height: "100%", px: { xs: 1, md: 1.5 }, backgroundColor: COLORS.yellow, color: COLORS.navyDark, fontWeight: 700, fontSize: { xs: "0.66rem", md: "0.72rem" }, letterSpacing: ".05em", clipPath: "polygon(0 0, 100% 0, calc(100% - 9px) 100%, 0 100%)", pr: { xs: 1.5, md: 2.25 } }}>
          <Zap size={13} fill="currentColor" /> LATEST NEWS
        </Box>
        <Box sx={{ flex: 1, minWidth: 0, overflow: "hidden", "&:hover .track, &:focus-within .track": { animationPlayState: "paused" } }}>
          <Box className="track" sx={{ display: "flex", width: "max-content", animation: `${scroll} ${items.length * 9}s linear infinite`, "@media (prefers-reduced-motion: reduce)": { animation: "none" } }}>
            {loop.map((it, i) => (
              <Box key={i} component={Link} href={it.href} tabIndex={i >= items.length ? -1 : 0} aria-hidden={i >= items.length || undefined} sx={{ display: "inline-flex", alignItems: "center", gap: 1, px: 2, color: "#FFFFFF", textDecoration: "none", fontWeight: 500, fontSize: { xs: "0.78rem", md: "0.85rem" }, whiteSpace: "nowrap", "&:hover": { textDecoration: "underline" } }}>
                <Box component="span" sx={{ width: 5, height: 5, borderRadius: "50%", backgroundColor: COLORS.yellow }} />
                {it.title}
              </Box>
            ))}
          </Box>
        </Box>
        <IconButton aria-label="Close latest news" onClick={() => setOpen(false)} size="small" sx={{ mx: 0.5, p: 0.5, color: "#FFFFFF", "&:hover": { backgroundColor: "rgba(255,255,255,.15)" } }}>
          <X size={15} />
        </IconButton>
      </Box>
    </Container>
  );
}
