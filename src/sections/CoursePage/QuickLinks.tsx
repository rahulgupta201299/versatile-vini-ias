"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ChevronRight, Radio, PlayCircle, ClipboardCheck, FileText, ListChecks, ListVideo, Newspaper, MessageCircleQuestion, Sparkles } from "lucide-react";
import { anchorSx, INK, RED, RED_BORDER, RED_TINT } from "./theme";

import { COLORS } from "@/theme/colors";
const LINKS = [
  { label: "Live Courses", href: "#batches", icon: Radio, color: COLORS.red, bg: COLORS.redTint },
  { label: "Free Batch", href: "#free-classes", icon: PlayCircle, color: "#7C3AED", bg: "#F5F3FF" },
  { label: "Test Series", href: "#scholarship-test", icon: ClipboardCheck, color: "#0891B2", bg: "#ECFEFF" },
  { label: "PYQs Paper", href: "/#resources", icon: FileText, color: "#EA580C", bg: "#FFF7ED" },
  { label: "Syllabus", href: "#about-exam", icon: ListChecks, color: COLORS.success, bg: "#F0FDF4" },
  { label: "Playlist", href: "#free-classes", icon: ListVideo, color: "#DB2777", bg: "#FDF2F8" },
  { label: "Current Affairs", href: "/#resources", icon: Newspaper, color: "#2563EB", bg: "#EFF6FF" },
  { label: "Doubts", href: "#counselling", icon: MessageCircleQuestion, color: "#CA8A04", bg: "#FEFCE8" },
];

export default function QuickLinks() {
  return (
    <Box component="section" id="get-started" sx={{ ...anchorSx, pt: { xs: 1, md: 1.5 }, pb: { xs: 3, md: 4 } }}>
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: { xs: 1, sm: 1.5, md: 2 } }}>
          {LINKS.map(({ label, href, icon: Icon, color, bg }) => (
            <Box
              key={label}
              component={href.startsWith("/") ? Link : "a"}
              href={href}
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 0.75, md: 1.5 },
                p: { xs: 1.25, md: 2 },
                borderRadius: "14px",
                border: "1px solid #EEF0F3",
                backgroundColor: "#FFFFFF",
                textDecoration: "none",
                color: INK,
                textAlign: { xs: "center", md: "left" },
                transition: "all .2s ease",
                "&:hover": { borderColor: RED_BORDER, boxShadow: "0 8px 20px rgba(15,23,42,.07)", transform: "translateY(-2px)", "& .chev": { color: RED } },
              }}
            >
              <Box sx={{ width: { xs: 40, md: 46 }, height: { xs: 40, md: 46 }, borderRadius: "12px", backgroundColor: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon size={22} color={color} />
              </Box>
              <Typography component="span" sx={{ flex: 1, minWidth: 0, fontWeight: 600, fontSize: { xs: "0.74rem", sm: "0.85rem", md: "0.98rem" }, lineHeight: 1.25 }}>
                {label}
              </Typography>
              <Box className="chev" sx={{ display: { xs: "none", md: "flex" }, color: "#CBD5E1", transition: "color .2s" }}>
                <ChevronRight size={18} />
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 2.5, md: 3.5 } }}>
          <Box
            component="a"
            href="#free-classes"
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
              px: { xs: 3.5, md: 5 },
              height: { xs: 44, md: 48 },
              borderRadius: "9999px",
              border: `1.5px solid ${RED}`,
              backgroundColor: RED_TINT,
              color: RED,
              fontWeight: 700,
              fontSize: { xs: "0.92rem", md: "1rem" },
              textDecoration: "none",
              transition: "all .2s ease",
              "&:hover": { backgroundColor: RED, color: "#FFFFFF" },
            }}
          >
            <Sparkles size={18} /> Explore for Free
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
