"use client";

import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChevronDown, ListOrdered } from "lucide-react";
import { COLORS } from "@/theme/colors";

type Item = { id: string; title: string };

/** Contents list with scroll-spy: sticky sidebar on desktop, collapsible "On this page" on phones. */
export default function LegalToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const links = (
    <Box component="ol" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 0.25 }}>
      {items.map((it, i) => {
        const on = it.id === active;
        return (
          <Box component="li" key={it.id}>
            <Box
              component="a"
              href={`#${it.id}`}
              onClick={() => setOpen(false)}
              aria-current={on ? "location" : undefined}
              sx={{ display: "flex", gap: 1, py: 0.75, px: 1.25, borderRadius: "8px", textDecoration: "none", fontSize: "0.86rem", lineHeight: 1.4, fontWeight: on ? 700 : 500, color: on ? COLORS.red : COLORS.textSecondary, bgcolor: on ? COLORS.redTint : "transparent", borderLeft: `3px solid ${on ? COLORS.red : "transparent"}`, transition: "all .15s", "&:hover": { color: COLORS.red, bgcolor: COLORS.redTintSoft } }}
            >
              <Box component="span" sx={{ flexShrink: 0, minWidth: 20, fontVariantNumeric: "tabular-nums", opacity: 0.7 }}>{String(i + 1).padStart(2, "0")}</Box>
              {it.title}
            </Box>
          </Box>
        );
      })}
    </Box>
  );

  return (
    <>
      {/* desktop */}
      <Box component="nav" aria-label="On this page" sx={{ display: { xs: "none", md: "block" }, position: "sticky", top: 96, maxHeight: "calc(100vh - 120px)", overflowY: "auto", pr: 1, "&::-webkit-scrollbar": { width: 4 }, "&::-webkit-scrollbar-thumb": { bgcolor: COLORS.border, borderRadius: 2 } }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.25, px: 1.25, color: COLORS.navy, fontWeight: 800, fontSize: "0.78rem", letterSpacing: ".1em", textTransform: "uppercase" }}>
          <ListOrdered size={15} /> On this page
        </Typography>
        {links}
      </Box>
      {/* mobile */}
      <Box component="nav" aria-label="On this page" sx={{ display: { xs: "block", md: "none" }, mb: 3, borderRadius: "14px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", overflow: "hidden" }}>
        <Box component="button" type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)} sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", px: 2, py: 1.5, border: "none", bgcolor: "transparent", fontFamily: "inherit", fontWeight: 800, color: COLORS.navy, fontSize: "0.95rem", cursor: "pointer" }}>
          <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 1 }}><ListOrdered size={17} /> On this page · {items.length} sections</Box>
          <ChevronDown size={18} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </Box>
        {open && <Box sx={{ px: 1, pb: 1.25, maxHeight: "60vh", overflowY: "auto", borderTop: `1px solid ${COLORS.border}`, pt: 1 }}>{links}</Box>}
      </Box>
    </>
  );
}
