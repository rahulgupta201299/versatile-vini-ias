"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { KIDS_COURSES } from "@/data/kidsCourses";
import { COLORS } from "@/theme/colors";
import KidsCourseArt from "./KidsCourseArt";

/** Card tints and the colour of the "Class …" line, in card order. */
const TONES = [
  { bg: "#FCEFEA", accent: "#5B5BD6" },
  { bg: "#FCF1D2", accent: "#2E7D9A" },
  { bg: "#EEF2FC", accent: "#E8613C" },
  { bg: "#F2F3F8", accent: "#6366F1" },
];

/** Phones and tablets show a slider; computers show the 2 × 2 grid. */
const SLIDER = { xs: "flex", md: "none" } as const;
const MOBILE_GAP = 12;

const arrowSx = (side: "left" | "right") => ({
  display: SLIDER,
  position: "absolute",
  top: "38%",
  [side]: -10,
  zIndex: 1,
  width: 32,
  height: 32,
  bgcolor: "#FFFFFF",
  border: `1px solid ${COLORS.border}`,
  boxShadow: "0 4px 12px rgba(15,23,42,.12)",
  color: COLORS.ink,
  "&:hover": { bgcolor: "#FFFFFF" },
  "&.Mui-disabled": { opacity: 0 },
});

/** The course cards: a slider with arrows and a progress bar on phones, a 2 × 2 grid of detailed cards on computers. */
export default function KidsCoursesList() {
  const listRef = useRef<HTMLUListElement>(null);
  const [scroll, setScroll] = useState({ start: 0, size: 1 });

  const updateScroll = () => {
    const list = listRef.current;

    if (!list) return;

    const { scrollLeft, scrollWidth, clientWidth } = list;

    setScroll({ start: scrollLeft / scrollWidth, size: clientWidth / scrollWidth });
  };

  useEffect(() => {
    updateScroll();
    window.addEventListener("resize", updateScroll);

    return () => window.removeEventListener("resize", updateScroll);
  }, []);

  const slide = (direction: 1 | -1) => {
    const list = listRef.current;

    if (!list) return;

    list.scrollBy({ left: direction * (list.clientWidth + MOBILE_GAP) / 3, behavior: "smooth" });
  };

  const isAtStart = scroll.start <= 0.01;
  const isAtEnd = scroll.start + scroll.size >= 0.99;

  return (
    <Box sx={{ position: "relative" }}>
      <IconButton aria-label="Previous courses" onClick={() => slide(-1)} disabled={isAtStart} sx={arrowSx("left")}>
        <ChevronLeft size={18} />
      </IconButton>

      <Box
        component="ul"
        ref={listRef}
        onScroll={updateScroll}
        sx={{
          listStyle: "none",
          m: 0,
          p: 0,
          display: { xs: "flex", md: "grid" },
          gridTemplateColumns: { md: "repeat(2, minmax(0, 1fr))" },
          gap: { xs: `${MOBILE_GAP}px`, md: 2.5 },
          overflowX: { xs: "auto", md: "visible" },
          scrollSnapType: { xs: "x mandatory", md: "none" },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {KIDS_COURSES.map(({ classes, title, text, href, art }, index) => {
          const { bg, accent } = TONES[index % TONES.length];

          return (
            <Box component="li" key={title} sx={{ flex: { xs: `0 0 calc((100% - ${MOBILE_GAP * 2}px) / 3)`, md: "auto" }, scrollSnapAlign: "start", display: "flex" }}>
              <Box
                component={Link}
                href={href}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "stretch", md: "flex-start" },
                  gap: { xs: 1.25, md: 2.25 },
                  p: { xs: 1, md: 3 },
                  pb: { xs: 1.5, md: 3 },
                  borderRadius: { xs: "14px", md: "20px" },
                  bgcolor: { xs: "#FFFFFF", md: bg },
                  border: { xs: `1px solid ${COLORS.border}`, md: "none" },
                  boxShadow: { xs: "0 4px 12px rgba(15,23,42,.05)", md: "none" },
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform .15s",
                  "&:hover": { transform: { md: "translateY(-2px)" } },
                  "&:hover .explore": { bgcolor: COLORS.navy },
                }}
              >
                <Box sx={{ flexShrink: 0, width: { xs: "100%", md: 72 }, aspectRatio: { xs: "1.15", md: "1" }, p: { xs: 1.5, md: 0 }, borderRadius: "10px", bgcolor: { xs: bg, md: "transparent" }, "& svg": { width: "100%", height: "100%" } }}>
                  <KidsCourseArt name={art} />
                </Box>
                <Box sx={{ minWidth: 0, display: "flex", flexDirection: "column", alignItems: { xs: "center", md: "flex-start" } }}>
                  <Typography sx={{ display: { xs: "none", md: "block" }, fontFamily: "inherit", fontWeight: 600, fontSize: "0.95rem", color: accent }}>{classes}</Typography>
                  <Typography component="h3" sx={{ mt: { md: 0.5 }, fontFamily: "inherit", fontWeight: { xs: 500, md: 600 }, fontSize: { xs: "0.82rem", sm: "0.9rem", md: "1.2rem" }, color: COLORS.ink, lineHeight: 1.35, textAlign: { xs: "center", md: "left" } }}>
                    {title}
                  </Typography>
                  <Typography sx={{ display: { xs: "none", md: "block" }, mt: 0.75, fontFamily: "inherit", color: COLORS.textSecondary, fontSize: "0.95rem", lineHeight: 1.55 }}>{text}</Typography>
                  <Box component="span" className="explore" sx={{ display: { xs: "none", md: "inline-flex" }, mt: 2, alignItems: "center", height: 46, px: 3.5, borderRadius: "10px", bgcolor: COLORS.navyDark, color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem", transition: "background-color .15s" }}>
                    Explore
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Box>

      <IconButton aria-label="Next courses" onClick={() => slide(1)} disabled={isAtEnd} sx={arrowSx("right")}>
        <ChevronRight size={18} />
      </IconButton>

      {/* Slider progress */}
      <Box aria-hidden sx={{ display: SLIDER, mt: 2, mx: "auto", width: 68, height: 4, borderRadius: 2, bgcolor: COLORS.border, overflow: "hidden" }}>
        <Box sx={{ width: `${scroll.size * 100}%`, height: "100%", borderRadius: 2, bgcolor: COLORS.ink, transform: `translateX(${(scroll.start / scroll.size) * 100}%)`, transition: "transform .2s" }} />
      </Box>
    </Box>
  );
}
