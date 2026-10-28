"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import { ChevronDown, ListOrdered } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Collapsible "Table of Content" (sticky under the category bar, like pw.live) — links to the article's H2 headings. */
export default function TableOfContents({ items }: { items: { id: string; text: string }[] }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  // highlight the section being read
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const io = new IntersectionObserver((entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: "-180px 0px -60% 0px" });

    els.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [items]);

  if (!items.length) return null;

  return (
    <Box component="nav" aria-label="Table of contents" sx={{ borderRadius: "12px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 6px 18px rgba(15,23,42,.08)" }}>
      <Box
        component="button"
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1, px: 2, py: 1.25, border: "none", background: "none", cursor: "pointer", fontFamily: "inherit", textAlign: "left", color: "#27272A" }}
      >
        <ListOrdered size={18} color={COLORS.red} />
        <Typography component="span" sx={{ flex: 1, fontFamily: "inherit", fontSize: "1rem", fontWeight: 600 }}>Table of Content</Typography>
        <ChevronDown size={20} style={{ transition: "transform .2s", transform: open ? "rotate(180deg)" : "none" }} />
      </Box>
      <Collapse in={open}>
        <Box component="ol" sx={{ m: 0, px: 2, pb: 1.5, pt: 0.5, listStyle: "none", borderTop: `1px solid ${COLORS.border}`, maxHeight: "50vh", overflowY: "auto", counterReset: "toc" }}>
          {items.map((it) => (
            <Box component="li" key={it.id} sx={{ counterIncrement: "toc" }}>
              <Box
                component="a"
                href={`#${it.id}`}
                onClick={() => setOpen(false)}
                sx={{ display: "flex", gap: 1, py: 0.9, fontSize: "0.92rem", lineHeight: 1.4, textDecoration: "none", color: active === it.id ? COLORS.red : "#3F3F46", fontWeight: active === it.id ? 600 : 400, borderBottom: `1px dashed ${COLORS.border}`, "&::before": { content: 'counter(toc) "."', color: COLORS.red, fontWeight: 600, minWidth: 20 }, "&:hover": { color: COLORS.red } }}
              >
                {it.text}
              </Box>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
}
