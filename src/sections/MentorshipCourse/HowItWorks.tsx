"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { NonNullable_HowItWorks } from "./types";
import { COLORS } from "@/theme/colors";

const SEG_COLORS = ["#4FA8D8", "#A8CBD6", "#B94A4A", "#6FB43F", "#C9D853", "#4FA8D8", "#6DB7A2", "#4FA8D8"];

/* SVG geometry (viewBox 400 × 400) */
const C = 200;
const R_OUT = 150;
const R_IN = 72;
const pt = (r: number, deg: number) => ({ x: C + r * Math.cos((deg * Math.PI) / 180), y: C + r * Math.sin((deg * Math.PI) / 180) });

function segment(i: number, n: number) {
  const step = 360 / n;
  const a1 = -90 + i * step + 1.2;
  const a2 = -90 + (i + 1) * step - 1.2;
  const o1 = pt(R_OUT, a1), o2 = pt(R_OUT, a2), i2 = pt(R_IN, a2), i1 = pt(R_IN, a1);
  return `M ${o1.x} ${o1.y} A ${R_OUT} ${R_OUT} 0 0 1 ${o2.x} ${o2.y} L ${i2.x} ${i2.y} A ${R_IN} ${R_IN} 0 0 0 ${i1.x} ${i1.y} Z`;
}

/** "How Program will work?" — segmented wheel; steps highlight together on hover. */
export default function HowItWorks({ data }: { data: NonNullable_HowItWorks }) {
  const [active, setActive] = useState<number | null>(null);
  const n = data.steps.length;
  const mid = (i: number) => -90 + (i + 0.5) * (360 / n);

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 6 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.ink }}>
          {data.title}
        </Typography>
        <Box sx={{ width: { xs: 180, md: 300 }, height: 3, mx: "auto", mt: 1, mb: { xs: 3, md: 2 }, borderRadius: 2, backgroundColor: COLORS.ink }} />

        {/* wheel + labels (labels around the wheel from md up) */}
        <Box sx={{ position: "relative", width: "100%", maxWidth: 780, mx: "auto", aspectRatio: { md: "780 / 470" } }}>
          <Box
            component="svg"
            viewBox="0 0 400 400"
            role="img"
            aria-label={data.title}
            sx={{ display: "block", mx: "auto", width: { xs: "78%", sm: "56%", md: "50%" }, position: { md: "absolute" }, left: { md: "25%" }, top: { md: "50%" }, transform: { md: "translateY(-50%)" } }}
          >
            {data.steps.map((s, i) => {
              const m = mid(i);
              const num = pt((R_IN + R_OUT) / 2, m);
              const isActive = active === i;
              return (
                <g key={s} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)} style={{ cursor: "default" }}>
                  <path
                    d={segment(i, n)}
                    fill={SEG_COLORS[i % SEG_COLORS.length]}
                    style={{ transformOrigin: "200px 200px", transform: isActive ? `translate(${Math.cos((m * Math.PI) / 180) * 6}px, ${Math.sin((m * Math.PI) / 180) * 6}px)` : "none", transition: "transform .2s, opacity .2s", opacity: active === null || isActive ? 1 : 0.55 }}
                  />
                  <text x={num.x} y={num.y + 9} textAnchor="middle" fill="#FFFFFF" fontSize="26" fontWeight="900" style={{ pointerEvents: "none" }}>
                    {i + 1}
                  </text>
                </g>
              );
            })}
            <circle cx={C} cy={C} r={R_IN - 8} fill="#F4F1E6" stroke="#FFFFFF" strokeWidth="4" />
            <circle cx={C} cy={C} r={R_IN - 26} fill="none" stroke={COLORS.navy} strokeWidth="6" strokeDasharray="190 80" strokeLinecap="round" transform="rotate(120 200 200)" />
            <path d="M178 202 L194 218 L226 182" fill="none" stroke={COLORS.navy} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </Box>

          {/* labels around (desktop) */}
          {data.steps.map((s, i) => {
            const m = mid(i);
            const cos = Math.cos((m * Math.PI) / 180);
            const sin = Math.sin((m * Math.PI) / 180);
            const r = 172; // in 780 × 470 box units (wheel outer radius ≈ 146)
            const right = cos > 0;
            return (
              <Box
                key={s}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                sx={{
                  display: { xs: "none", md: "block" },
                  position: "absolute",
                  left: `${50 + ((r * cos) / 780) * 100}%`,
                  top: `${50 + ((r * sin) / 470) * 100}%`,
                  transform: right ? "translate(0, -50%)" : "translate(-100%, -50%)",
                  width: 190,
                  textAlign: right ? "left" : "right",
                  fontWeight: 700,
                  fontSize: "0.86rem",
                  lineHeight: 1.35,
                  color: active === i ? COLORS.red : COLORS.ink,
                  transition: "color .2s",
                }}
              >
                {s}
              </Box>
            );
          })}
        </Box>

        {/* numbered list (phones / tablets) */}
        <Box component="ol" sx={{ display: { xs: "grid", md: "none" }, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, gap: 1, listStyle: "none", p: 0, m: 0, mt: 3 }}>
          {data.steps.map((s, i) => (
            <Box component="li" key={s} sx={{ display: "flex", gap: 1.25, alignItems: "center", p: 1.25, borderRadius: "10px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
              <Box sx={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: SEG_COLORS[i % SEG_COLORS.length], color: "#FFFFFF", fontWeight: 800, fontSize: "0.85rem", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</Box>
              <Typography sx={{ fontWeight: 600, fontSize: "0.88rem", color: COLORS.ink }}>{s}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
