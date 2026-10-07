"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight, CalendarDays, Languages, MonitorPlay } from "lucide-react";
import { CourseBatch } from "@/types";
import { anchorSx, formatINR, INK, MUTED, RED, RED_DARK, RED_TINT, sectionSx, titleSx } from "./theme";

import { COLORS } from "@/theme/colors";
function BatchCard({ batch }: { batch: CourseBatch }) {
  const off = Math.round((1 - batch.price / batch.mrp) * 100);
  return (
    <Box
      sx={{
        minWidth: 0,
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        borderRadius: "16px",
        border: "1px solid #EEF0F3",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(15,23,42,.04)",
        transition: "transform .2s ease, box-shadow .2s ease",
        "&:hover": { transform: "translateY(-3px)", boxShadow: "0 14px 30px rgba(15,23,42,.10)" },
      }}
    >
      <Box sx={{ position: "relative", aspectRatio: "16 / 9", backgroundColor: "#F1F5F9" }}>
        <Image src={batch.thumbnail} alt={batch.title} fill sizes="(max-width: 600px) 80vw, (max-width: 900px) 45vw, 380px" style={{ objectFit: "cover" }} />
        {batch.tag && (
          <Box sx={{ position: "absolute", top: 10, left: 10, px: 1, py: 0.3, borderRadius: "6px", backgroundColor: COLORS.yellow, color: "#000", fontSize: "0.72rem", fontWeight: 800 }}>
            {batch.tag}
          </Box>
        )}
      </Box>

      <Box sx={{ p: { xs: 1.75, md: 2 }, display: "flex", flexDirection: "column", flex: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.98rem", md: "1.05rem" }, color: INK, lineHeight: 1.3, mb: 1, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {batch.title}
        </Typography>
        <Box sx={{ display: "grid", gap: 0.5, color: MUTED, fontSize: "0.8rem", mb: 1.5 }}>
          {[
            { icon: Languages, text: batch.language },
            { icon: MonitorPlay, text: batch.mode },
            { icon: CalendarDays, text: batch.startDate },
          ].map(({ icon: Icon, text }) => (
            <Box key={text} sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
              <Icon size={14} /> {text}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto", pt: 1.5, borderTop: `1px dashed ${COLORS.borderLight}`, display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, flexWrap: "wrap" }}>
              <Typography component="span" sx={{ fontWeight: 800, fontSize: "1.15rem", color: INK }}>
                {formatINR(batch.price)}
              </Typography>
              <Typography component="span" sx={{ fontSize: "0.8rem", color: COLORS.disabled, textDecoration: "line-through" }}>
                {formatINR(batch.mrp)}
              </Typography>
            </Box>
            {off > 0 && <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, color: COLORS.success }}>{off}% off</Typography>}
          </Box>
          <Box
            component="a"
            href="#counselling"
            sx={{ px: 1.75, height: 38, display: "inline-flex", alignItems: "center", borderRadius: "10px", border: `1.5px solid ${RED}`, color: RED, backgroundColor: RED_TINT, fontWeight: 700, fontSize: "0.88rem", textDecoration: "none", "&:hover": { backgroundColor: RED, color: "#FFF" } }}
          >
            Explore
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function BatchesSection({ batches }: { batches: CourseBatch[] }) {
  return (
    <Box component="section" id="batches" sx={{ ...anchorSx, ...sectionSx, backgroundColor: COLORS.surface }}>
      <Container>
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 2, mb: { xs: 2, md: 3 } }}>
          <Box>
            <Typography component="h2" sx={titleSx}>
              Recommended Batches For You
            </Typography>
            <Typography sx={{ color: MUTED, fontSize: { xs: "0.85rem", md: "0.95rem" }, mt: 0.5 }}>Hand-picked courses to start your preparation the right way</Typography>
          </Box>
          <Box component={Link} href="/#courses" sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.5, color: RED, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", "&:hover": { color: RED_DARK } }}>
            View all <ArrowRight size={16} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridAutoFlow: { xs: "column", md: "row" },
            gridAutoColumns: { xs: "80%", sm: "46%" },
            gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 1.5, md: 3 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: "x mandatory",
            pb: 1,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {batches.map((b) => (
            <BatchCard key={b.id} batch={b} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
