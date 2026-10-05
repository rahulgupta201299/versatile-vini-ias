"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ResultBanner } from "@/types";

/*
 * Sizes copied from pw.live "Academic Excellence : Results":
 *  - web   (> 768px): 3821 × 1324 art, rendered max 1120 × 388
 *  - mobile (≤ 768px): 1203 × 1650 art, full container width
 */
export const RESULT_BANNER_MAX_WIDTH = 1120;
const MOBILE_QUERY = "@media (max-width: 768px)";
const WEB_RATIO = "3821 / 1324";
const MOBILE_RATIO = "1203 / 1650";
const SLIDE_GAP = 16;
const AUTOPLAY_MS = 5000;
const SWIPE_THRESHOLD = 50;

interface ResultBannerSliderProps {
  banners: ResultBanner[];
  /** Load the first image eagerly (only for the initially visible tab). */
  eager?: boolean;
}

export default function ResultBannerSlider({ banners, eager = false }: ResultBannerSliderProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const count = banners.length;
  const hasMany = count > 1;

  const goTo = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay (paused on hover / touch)
  useEffect(() => {
    if (!hasMany || paused) return;
    const t = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [hasMany, paused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current !== null) {
      const dx = e.changedTouches[0].clientX - touchStartX.current;
      if (dx > SWIPE_THRESHOLD) prev();
      else if (dx < -SWIPE_THRESHOLD) next();
    }
    touchStartX.current = null;
    setPaused(false);
  };

  if (!count) return null;

  const arrowSx = {
    position: "absolute" as const,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 2,
    width: 40,
    height: 40,
    backgroundColor: "#FFFFFF",
    color: "#000000",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)",
    display: { xs: "none", md: hasMany ? "inline-flex" : "none" },
    "&:hover": { backgroundColor: "#FFFFFF", transform: "translateY(-50%) scale(1.06)" },
  };

  return (
    <Box
      role="region"
      aria-roledescription="carousel"
      aria-label="Results banners"
      sx={{ position: "relative", width: "100%", maxWidth: RESULT_BANNER_MAX_WIDTH, mx: "auto" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Box sx={{ overflow: "hidden", borderRadius: { xs: "12px", md: "16px" } }}>
        <Box
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          sx={{
            display: "flex",
            gap: `${SLIDE_GAP}px`,
            transform: `translate3d(calc(${-index} * (100% + ${SLIDE_GAP}px)), 0, 0)`,
            transition: "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
            touchAction: "pan-y",
          }}
        >
          {banners.map((banner, i) => (
            <Box
              key={banner.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              component={banner.href ? "a" : "div"}
              href={banner.href}
              tabIndex={i === index ? 0 : -1}
              sx={{
                flex: "0 0 100%",
                minWidth: 0,
                display: "block",
                position: "relative",
                aspectRatio: WEB_RATIO,
                backgroundColor: "#F3E8D2",
                [MOBILE_QUERY]: { aspectRatio: MOBILE_RATIO },
              }}
            >
              <picture>
                <source media="(max-width: 768px)" srcSet={banner.mobileImageUrl} />
                <source media="(min-width: 769px)" srcSet={banner.webImageUrl} />
                <img
                  src={banner.webImageUrl}
                  alt={banner.alt || banner.title}
                  loading={eager && i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </picture>
            </Box>
          ))}
        </Box>
      </Box>

      <IconButton aria-label="Previous banner" onClick={prev} sx={{ ...arrowSx, left: -8 }}>
        <ChevronLeft size={22} />
      </IconButton>
      <IconButton aria-label="Next banner" onClick={next} sx={{ ...arrowSx, right: -8 }}>
        <ChevronRight size={22} />
      </IconButton>

      {hasMany && (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mt: 1.5 }}>
          {banners.map((b, i) => (
            <Box
              key={b.id}
              component="button"
              type="button"
              aria-label={`Go to banner ${i + 1}`}
              aria-current={i === index}
              onClick={() => goTo(i)}
              sx={{
                width: i === index ? 24 : 8,
                height: 8,
                p: 0,
                border: "none",
                borderRadius: "9999px",
                cursor: "pointer",
                backgroundColor: i === index ? "#FE0034" : "#D9DCE1",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </Box>
      )}
    </Box>
  );
}
