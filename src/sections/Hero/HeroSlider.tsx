"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_BANNERS } from "@/data/heroBanners";
import { HeroBanner } from "@/types";

import { COLORS } from "@/theme/colors";
interface HeroSliderProps {
  banners?: HeroBanner[];
}

export default function HeroSlider({ banners = HERO_BANNERS }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  useEffect(() => {
    if (isPaused || banners.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused, banners.length]);

  return (
    <Box
      sx={{
        pt: { xs: 1.5, md: 2 },
        pb: { xs: 1, md: 1.5 },
        backgroundColor: "#FFFFFF",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ position: "relative" }}>
        {/* Main Sliding Banner Card Container */}
        <Box
          sx={{
            position: "relative",
            borderRadius: { xs: "12px", sm: "16px", md: "22px" },
            overflow: "hidden",
            boxShadow: { xs: "0 6px 16px rgba(0, 0, 0, 0.10)", md: "0 12px 32px rgba(0, 0, 0, 0.12)" },
            backgroundColor: COLORS.redDark, // Fallback brand dark background
          }}
        >
          {/* Sliding Track for Server-Provided Banner Images */}
          <Box
            sx={{
              display: "flex",
              width: `${banners.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / banners.length)}%)`,
              transition: "transform 0.65s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {banners.map((banner, index) => (
              <Box
                key={banner.id}
                component="a"
                href={banner.href}
                sx={{
                  width: `${100 / banners.length}%`,
                  flexShrink: 0,
                  position: "relative",
                  display: "block",
                  textDecoration: "none",
                  // Fixed aspect ratio (~3:1) so the banner scales with width
                  // instead of being cropped at fixed heights on small screens
                  aspectRatio: "2.9 / 1", // matches banner artwork (e.g. 2137 × 736) so nothing is cropped
                  cursor: "pointer",
                }}
              >
                <Image
                  src={banner.imageUrl}
                  alt={banner.alt || banner.title}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1200px) 95vw, 1200px"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                  priority={index === 0}
                />
              </Box>
            ))}
          </Box>

          {/* Left Arrow Button */}
          {banners.length > 1 && (
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                prevSlide();
              }}
              aria-label="Previous banner"
              sx={{
                position: "absolute",
                display: { xs: "none", md: "inline-flex" },
                top: "50%",
                left: { xs: 8, sm: 16 },
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                color: "#FFFFFF",
                zIndex: 10,
                width: { xs: 34, sm: 42 },
                height: { xs: 34, sm: 42 },
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  transform: "translateY(-50%) scale(1.08)",
                },
              }}
            >
              <ChevronLeft size={22} />
            </IconButton>
          )}

          {/* Right Arrow Button */}
          {banners.length > 1 && (
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
              }}
              aria-label="Next banner"
              sx={{
                position: "absolute",
                display: { xs: "none", md: "inline-flex" },
                top: "50%",
                right: { xs: 8, sm: 16 },
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                color: "#FFFFFF",
                zIndex: 10,
                width: { xs: 34, sm: 42 },
                height: { xs: 34, sm: 42 },
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  transform: "translateY(-50%) scale(1.08)",
                },
              }}
            >
              <ChevronRight size={22} />
            </IconButton>
          )}

        </Box>

          {/* Bottom Pill/Dash Slide Indicators matching screenshot */}
          {banners.length > 1 && (
            <Box
              sx={{
                // Below the banner on mobile/tablet, overlaid on desktop
                position: { xs: "static", md: "absolute" },
                bottom: { md: 20 },
                left: { md: "50%" },
                transform: { md: "translateX(-50%)" },
                justifyContent: "center",
                mt: { xs: 1.25, md: 0 },
                display: "flex",
                alignItems: "center",
                gap: 1,
                zIndex: 8,
              }}
            >
              {banners.map((_, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <Box
                    key={idx}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentSlide(idx);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to banner ${idx + 1}`}
                    sx={{
                      width: { xs: isActive ? 28 : 18, md: isActive ? 34 : 22 },
                      height: { xs: 4, md: 5 },
                      borderRadius: "9999px",
                      backgroundColor: isActive
                        ? "#111827"
                        : { xs: "#D1D5DB", md: "rgba(255, 255, 255, 0.65)" },
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: isActive ? "#000000" : { xs: "#9CA3AF", md: "#FFFFFF" },
                      },
                    }}
                  />
                );
              })}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
