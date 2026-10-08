"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BookOpen, CheckCircle2, Zap } from "lucide-react";
import { BatchCourseContent } from "@/types";
import { COLORS } from "@/theme/colors";

const NODE_COLORS = [COLORS.red, "#2563EB", "#1D4ED8", COLORS.navy];
const NODE_HALOS = [COLORS.redTint, "#EBF3FF", "#EBF3FF", "#F0F4F8"];

/* Geometry (viewBox 700 × 700, same proportions as the reference) */
const C = 350; // centre
const ORBIT = 230; // node distance from the centre
const NODE_R = 62;

const nodePos = (i: number, count: number) => {
  const rad = ((-90 + (360 / count) * i) * Math.PI) / 180;
  return { x: C + ORBIT * Math.cos(rad), y: C + ORBIT * Math.sin(rad), cos: Math.cos(rad), sin: Math.sin(rad) };
};

/** Arc from node i to node i+1, starting/ending just outside both nodes. */
const arcPath = (i: number, count: number) => {
  const gap = 21; // degrees kept clear around each node
  const a1 = ((-90 + (360 / count) * i + gap) * Math.PI) / 180;
  const a2 = ((-90 + (360 / count) * (i + 1) - gap) * Math.PI) / 180;
  const p1 = { x: C + ORBIT * Math.cos(a1), y: C + ORBIT * Math.sin(a1) };
  const p2 = { x: C + ORBIT * Math.cos(a2), y: C + ORBIT * Math.sin(a2) };
  return `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)} A ${ORBIT} ${ORBIT} 0 0 1 ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
};

/**
 * Circular "UPSC journey" (motion as in the reference):
 *  - hovering / focusing a stage makes it active and animates its outgoing arc as a marching dotted line
 *  - click / tap / Enter selects a stage; the active node gets a thicker ring and stronger halo
 */
function JourneyCircle({ count, active, onSelect, title, subtitle }: { count: number; active: number; onSelect: (i: number) => void; title: string; subtitle: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [line1, ...rest] = title.split(" ");
  const subtitleLines = subtitle.match(/.{1,22}(\s|$)/g)?.map((l) => l.trim()) ?? [subtitle];

  return (
    <Box
      component="svg"
      viewBox="0 0 700 700"
      role="group"
      aria-label={`${title}: ${count} stages`}
      sx={{
        display: "block",
        width: "100%",
        maxWidth: 580,
        mx: "auto",
        overflow: "visible",
        "@keyframes journeyDash": { from: { strokeDashoffset: 28 }, to: { strokeDashoffset: 0 } },
        "& .arc": { transition: "stroke-width .3s" },
        "& .arc.marching": { strokeDasharray: "8 8", strokeWidth: 4.5, animation: "journeyDash .8s linear infinite" },
        "& .node": { cursor: "pointer", outline: "none", transformBox: "fill-box", transformOrigin: "center", transition: "transform .3s cubic-bezier(.34,1.56,.64,1)" },
        "& .node:hover, & .node:focus-visible": { transform: "scale(1.05)" },
        "& .node .ring, & .node .halo": { transition: "stroke-width .3s, opacity .3s" },
        "@media (prefers-reduced-motion: reduce)": { "& .arc.marching": { animation: "none" }, "& .node": { transition: "none" } },
      }}
    >
      <defs>
        <filter id="journeyHubShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" floodColor="#0F172A" floodOpacity="0.09" />
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#0F172A" floodOpacity="0.04" />
        </filter>
        {NODE_COLORS.map((c, i) => (
          <React.Fragment key={i}>
            <filter id={`journeyNodeShadow${i}`} x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="10" stdDeviation="16" floodColor={c} floodOpacity="0.25" />
              <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor={c} floodOpacity="0.15" />
            </filter>
            <marker id={`journeyArrow${i}`} viewBox="0 0 12 12" refX="9" refY="6" markerWidth="11" markerHeight="11" orient="auto">
              <path d="M 2 2 L 10 6 L 2 10" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </marker>
          </React.Fragment>
        ))}
      </defs>

      {/* arcs: arc i goes from stage i to stage i+1 (the last one closes the loop back to stage 1) */}
      {Array.from({ length: count }, (_, i) => {
        const colorIdx = (i === count - 1 ? 0 : i) % NODE_COLORS.length; // closing arc (4 → 1) uses stage 1 colour
        return (
          <path
            key={i}
            className={`arc${hovered === i ? " marching" : ""}`}
            d={arcPath(i, count)}
            fill="none"
            stroke={NODE_COLORS[colorIdx]}
            strokeWidth="3.5"
            strokeLinecap="round"
            markerEnd={`url(#journeyArrow${colorIdx})`}
          />
        );
      })}

      {/* hub */}
      <g aria-hidden>
        <circle cx={C} cy={C} r="148" fill="#FFFFFF" opacity="0.45" />
        <circle cx={C} cy={C} r="135" fill="#FFFFFF" filter="url(#journeyHubShadow)" />
        <circle cx={C} cy={C} r="135" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />
        <text x={C} y="322" textAnchor="middle" fill={COLORS.navy} fontSize="32" fontWeight="800" letterSpacing="-0.5">{line1}</text>
        <text x={C} y="364" textAnchor="middle" fill={COLORS.navy} fontSize="40" fontWeight="900" letterSpacing="-0.5">{rest.join(" ")}</text>
        {subtitleLines.map((l, i) => (
          <text key={l} x={C} y={392 + i * 16} textAnchor="middle" fill={COLORS.muted} fontSize="11.5" fontWeight="700" letterSpacing="0.8">{l}</text>
        ))}
        <rect x="330" y={398 + subtitleLines.length * 16} width="20" height="3.5" rx="1.75" fill={COLORS.red} />
        <rect x="350" y={398 + subtitleLines.length * 16} width="20" height="3.5" rx="1.75" fill="#2563EB" />
      </g>

      {/* stage nodes */}
      {Array.from({ length: count }, (_, i) => {
        const { x, y, cos, sin } = nodePos(i, count);
        const color = NODE_COLORS[i % NODE_COLORS.length];
        const isActive = i === active;
        const dot = { x: x - cos * NODE_R, y: y - sin * NODE_R }; // connector dot facing the hub
        const select = () => onSelect(i);
        return (
          <g
            key={i}
            className="node"
            role="button"
            tabIndex={0}
            aria-pressed={isActive}
            aria-label={`Stage ${i + 1}`}
            onClick={select}
            onMouseEnter={() => {
              setHovered(i);
              onSelect(i);
            }}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                select();
              }
            }}
          >
            <circle className="halo" cx={x} cy={y} r="74" fill={NODE_HALOS[i % NODE_HALOS.length]} opacity={isActive ? 0.9 : 0.5} />
            <circle cx={x} cy={y} r={NODE_R} fill="#FFFFFF" filter={`url(#journeyNodeShadow${i % NODE_COLORS.length})`} />
            <circle className="ring" cx={x} cy={y} r={NODE_R} fill="none" stroke={color} strokeWidth={isActive ? 7 : 5.5} />
            <text x={x} y={y + 4} textAnchor="middle" fill={color} fontSize="48" fontWeight="900">{i + 1}</text>
            <text x={x} y={y + 28} textAnchor="middle" fill={COLORS.navy} fontSize="12.5" fontWeight="800" letterSpacing="0.5">STAGE</text>
            <circle cx={dot.x} cy={dot.y} r="9" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <circle cx={dot.x} cy={dot.y} r="5.5" fill={color} />
          </g>
        );
      })}
    </Box>
  );
}

export default function BatchStages({ data }: { data: Pick<BatchCourseContent, "stages" | "stagesTitle" | "journey"> }) {
  const [active, setActive] = useState(0);
  const stage = data.stages[active];
  const singleList = stage.groups.length === 1 && !stage.groups[0].title;

  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 5, md: 7 }, background: "linear-gradient(180deg, #FFFFFF 0%, #FFF7F2 100%)" }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 5 } }}>
          <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.4rem" }, color: COLORS.navy }}>
            {data.stagesTitle.text} <Box component="span" sx={{ color: COLORS.red }}>{data.stagesTitle.highlight}</Box>
          </Typography>
          <Box component="svg" viewBox="0 0 300 14" aria-hidden sx={{ display: "block", mx: "auto", mt: 0.5, width: { xs: 170, md: 260 } }}>
            <path d="M4 10 C 80 2, 200 2, 296 8" stroke={COLORS.red} strokeWidth="4" strokeLinecap="round" fill="none" />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" }, gap: { xs: 3, md: 6 }, alignItems: "center" }}>
          <Box sx={{ px: { xs: 0, sm: 4, md: 0 } }}>
            <JourneyCircle count={data.stages.length} active={active} onSelect={setActive} title={data.journey.title} subtitle={data.journey.subtitle} />
          </Box>

          <Box key={active} sx={{ p: { xs: 2.25, md: 3.5 }, borderRadius: "20px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 18px 44px rgba(15,23,42,.08)", animation: "stageIn .25s ease", "@keyframes stageIn": { from: { opacity: 0, transform: "translateY(6px)" } } }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
              <Box sx={{ px: 2, py: 0.6, borderRadius: "9999px", backgroundColor: NODE_COLORS[active % NODE_COLORS.length], color: "#FFFFFF", fontWeight: 800, fontSize: "0.8rem", letterSpacing: "0.04em" }}>STAGE {active + 1}</Box>
              <Box sx={{ textAlign: "right" }}>
                <Typography sx={{ fontSize: "0.65rem", fontWeight: 800, color: COLORS.muted, letterSpacing: "0.08em" }}>ACTIVE TIMELINE</Typography>
                <Typography sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "0.92rem", md: "1.05rem" } }}>{stage.timeline}</Typography>
              </Box>
            </Box>

            <Typography component="h3" sx={{ mt: 2, fontWeight: 900, color: COLORS.red, fontSize: { xs: "1.2rem", md: "1.45rem" }, letterSpacing: "0.01em" }}>{stage.title}</Typography>

            <Box sx={{ mt: 1.75, display: "grid", gridTemplateColumns: singleList ? "1fr" : { xs: "1fr", sm: `repeat(${Math.min(stage.groups.length, 2)}, minmax(0, 1fr))` }, gap: { xs: 1.75, md: 2.5 } }}>
              {stage.groups.map((g, gi) => (
                <Box key={g.title ?? gi}>
                  {g.title && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1, fontSize: "0.72rem", fontWeight: 800, color: gi ? "#2563EB" : COLORS.red, letterSpacing: "0.06em" }}>
                      <Box component="span" sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "currentColor" }} />
                      {g.title}
                    </Box>
                  )}
                  <Box sx={{ display: "grid", gridTemplateColumns: singleList ? { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" } : "1fr", gap: 1 }}>
                    {g.items.map((item) => (
                      <Box key={item} sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 1.5, py: 1.1, borderRadius: "10px", border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surface }}>
                        {singleList ? <CheckCircle2 size={16} color={COLORS.success} style={{ flexShrink: 0 }} /> : <BookOpen size={16} color={gi ? "#2563EB" : COLORS.red} style={{ flexShrink: 0 }} />}
                        <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.85rem", md: "0.9rem" }, color: COLORS.ink }}>{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>

            <Box sx={{ mt: 2.25, display: "flex", gap: 1.5, alignItems: "flex-start", p: { xs: 1.5, md: 2 }, borderRadius: "12px", backgroundColor: COLORS.redTintSoft, border: `1px solid ${COLORS.redBorder}` }}>
              <Box sx={{ width: 34, height: 34, borderRadius: "50%", backgroundColor: COLORS.red, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Zap size={17} fill="currentColor" />
              </Box>
              <Box>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 800, color: COLORS.red, letterSpacing: "0.06em" }}>GOAL OF THIS STAGE</Typography>
                <Typography sx={{ mt: 0.25, fontSize: { xs: "0.86rem", md: "0.92rem" }, color: COLORS.body, lineHeight: 1.55 }}>{stage.goal}</Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
