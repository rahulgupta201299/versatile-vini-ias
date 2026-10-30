"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { SxProps, Theme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { StudyResource } from "@/data/studyResources";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";

export type StudyResourceCard = Omit<StudyResource, "href"> & { link: string };

const GAP = 16;

const arrowSx = (side: "left" | "right"): SxProps<Theme> => ({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  [side]: { xs: 4, md: -20 },
  zIndex: 1,
  width: { xs: 36, md: 44 },
  height: { xs: 36, md: 44 },
  bgcolor: "#FFFFFF",
  border: `1px solid ${COLORS.border}`,
  boxShadow: "0 6px 16px rgba(15,23,42,.14)",
  color: COLORS.ink,
  "&:hover": { bgcolor: "#FFFFFF", borderColor: COLORS.ink },
  "&.Mui-disabled": { opacity: 0, pointerEvents: "none" },
});

/** The cards as one sliding row at every screen size (1 / 2 / 3 in view), with left and right arrows. */
export default function StudyResourcesSlider({ cards }: { cards: StudyResourceCard[] }) {
  const listRef = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ isAtStart: true, isAtEnd: false });

  const updateEdges = () => {
    const list = listRef.current;

    if (!list) return;

    const { scrollLeft, scrollWidth, clientWidth } = list;

    setEdges({ isAtStart: scrollLeft <= 2, isAtEnd: scrollLeft + clientWidth >= scrollWidth - 2 });
  };

  useEffect(() => {
    updateEdges();
    window.addEventListener("resize", updateEdges);

    return () => window.removeEventListener("resize", updateEdges);
  }, []);

  // One card per click
  const slide = (direction: 1 | -1) => {
    const list = listRef.current;
    const card = list?.querySelector("li");

    if (!list || !card) return;

    list.scrollBy({ left: direction * (card.getBoundingClientRect().width + GAP), behavior: "smooth" });
  };

  return (
    <Box sx={{ position: "relative", mt: { xs: 2.5, md: 4 } }}>
      <IconButton aria-label="Previous study resources" onClick={() => slide(-1)} disabled={edges.isAtStart} sx={arrowSx("left")}>
        <ChevronLeft size={20} />
      </IconButton>

      <Box
        component="ul"
        ref={listRef}
        onScroll={updateEdges}
        sx={{
          listStyle: "none",
          m: 0,
          mx: { xs: -2, sm: 0 },
          px: { xs: 2, sm: 0 },
          py: 0.5,
          display: "flex",
          gap: `${GAP}px`,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollPaddingInline: { xs: 16, sm: 0 },
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {cards.map(({ title, text, link, tint, image }) => (
          <Box component="li" key={title} sx={{ flex: { xs: "0 0 86%", sm: `0 0 calc((100% - ${GAP}px) / 2)`, md: `0 0 calc((100% - ${GAP * 2}px) / 3)` }, scrollSnapAlign: "start", display: "flex" }}>
            <Box
              component={Link}
              href={link}
              {...externalLinkProps({ href: link })}
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
                minHeight: { xs: 380, md: 440 },
                p: { xs: 2.5, md: 3 },
                pb: { xs: 2, md: 2.5 },
                borderRadius: "10px",
                bgcolor: tint,
                color: "inherit",
                textDecoration: "none",
                "& .explore": { opacity: { xs: 1, md: 0 }, transform: { md: "translateY(6px)" }, transition: "opacity .2s, transform .2s" },
                "&:hover .explore, &:focus-visible .explore": { opacity: 1, transform: "none" },
              }}
            >
              <Typography component="h3" sx={{ fontWeight: 600, fontSize: { xs: "1.35rem", md: "1.5rem" }, color: COLORS.ink, letterSpacing: "-0.01em" }}>{title}</Typography>
              <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: { xs: "0.92rem", md: "1rem" }, lineHeight: 1.6 }}>{text}</Typography>
              {/* The art sits in a fixed-height box in the card's flow: long text makes the card taller instead of overlapping it */}
              <Box sx={{ flex: 1, mt: 1.5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                <Box sx={{ position: "relative", width: "100%", maxWidth: 300, height: { xs: 190, md: 210 }, flexShrink: 0 }}>
                  <Image src={image.src} alt={image.alt} fill sizes="(max-width: 600px) 80vw, (max-width: 900px) 45vw, 360px" style={{ objectFit: "contain" }} />
                </Box>
                <Box component="span" className="explore" sx={{ mt: 1, px: 1.75, py: 0.6, borderRadius: "6px", bgcolor: COLORS.ink, color: "#FFFFFF", fontWeight: 500, fontSize: "1.05rem" }}>Explore</Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton aria-label="Next study resources" onClick={() => slide(1)} disabled={edges.isAtEnd} sx={arrowSx("right")}>
        <ChevronRight size={20} />
      </IconButton>
    </Box>
  );
}
