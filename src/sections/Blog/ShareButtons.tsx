"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Check, Link2 } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Share on WhatsApp / X / Facebook / Telegram, or copy the link. */
export default function ShareButtons({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "WhatsApp", href: `https://wa.me/?text=${t}%20${u}`, bg: "#25D366" },
    { label: "X", href: `https://twitter.com/intent/tweet?text=${t}&url=${u}`, bg: "#000000" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, bg: "#1877F2" },
    { label: "Telegram", href: `https://t.me/share/url?url=${u}&text=${t}`, bg: "#229ED9" },
  ];
  const btn = { display: "inline-flex", alignItems: "center", gap: 0.75, height: 36, px: 1.5, borderRadius: "9999px", fontWeight: 700, fontSize: "0.8rem", textDecoration: "none", border: "none", cursor: "pointer", fontFamily: "inherit" } as const;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1 }}>
      <Typography sx={{ fontWeight: 800, fontSize: "0.85rem", color: COLORS.navy, mr: 0.5 }}>Share:</Typography>
      {links.map((l) => (
        <Box key={l.label} component="a" href={l.href} target="_blank" rel="noopener noreferrer" sx={{ ...btn, backgroundColor: l.bg, color: "#FFFFFF", "&:hover": { filter: "brightness(.92)" } }}>
          {l.label}
        </Box>
      ))}
      <Box
        component="button"
        type="button"
        onClick={() => navigator.clipboard?.writeText(url).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); })}
        sx={{ ...btn, backgroundColor: COLORS.redTint, color: COLORS.red, "&:hover": { backgroundColor: COLORS.redTintHover } }}
      >
        {copied ? <Check size={15} /> : <Link2 size={15} />} {copied ? "Copied" : "Copy link"}
      </Box>
    </Box>
  );
}
