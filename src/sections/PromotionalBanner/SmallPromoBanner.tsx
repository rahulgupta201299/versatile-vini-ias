"use client";

import React, { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HeroBanner } from "@/types";
import { externalLinkProps } from "@/utils/links";
import BannerImage, { hasMobileArt } from "@/components/BannerImage";

interface SmallPromoBannerProps {
  banners: HeroBanner[];
  /** Section id, e.g. "market-ad" (the header Store button links to /#market-ad). */
  id?: string;
}

/**
 * Marketing banner slider (Web → Homepage → 1st / 2nd marketing banner in the admin).
 * Wide 4 : 1 artwork; phones use the 2 : 1 artwork when every banner has one. One banner → no arrows.
 */
export default function SmallPromoBanner({
  banners,
  id = "promo-slider",
}: SmallPromoBannerProps) {
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

  if (!banners.length) return null;

  const useMobileArt = hasMobileArt(banners);

  return (
    <Box
      id={id}
      component="section"
      sx={{
        py: { xs: 1.5, sm: 2, md: 2.5 },
        backgroundColor: "#FFFFFF",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <Container>
        {/* Main Sliding Container taking 100% width of the Container */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            borderRadius: { xs: "14px", sm: "18px", md: "22px" },
            overflow: "hidden",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.08)",
            backgroundColor: "#1E1B4B", // Fallback dark background
          }}
        >
          {/* Sliding Track for Server Images */}
          <Box
            sx={{
              display: "flex",
              width: `${banners.length * 100}%`,
              transform: `translateX(-${currentSlide * (100 / banners.length)}%)`,
              transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {banners.map((banner, index) => (
              <Box
                key={banner.id}
                component="a"
                href={banner.href}
                {...externalLinkProps(banner)}
                sx={{
                  width: `${100 / banners.length}%`,
                  flexShrink: 0,
                  position: "relative",
                  display: "block",
                  textDecoration: "none",
                  aspectRatio: { xs: useMobileArt ? "2 / 1" : "4 / 1", sm: "4 / 1" },
                  cursor: "pointer",
                }}
              >
                <BannerImage banner={banner} useMobileArt={useMobileArt} priority={index === 0} />
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
              aria-label="Previous promo slide"
              sx={{
                position: "absolute",
                top: "50%",
                left: { xs: 8, sm: 14 },
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                color: "#FFFFFF",
                zIndex: 10,
                width: { xs: 32, sm: 38 },
                height: { xs: 32, sm: 38 },
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  transform: "translateY(-50%) scale(1.08)",
                },
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
          )}

          {/* Right Arrow Button */}
          {banners.length > 1 && (
            <IconButton
              onClick={(e) => {
                e.preventDefault();
                nextSlide();
              }}
              aria-label="Next promo slide"
              sx={{
                position: "absolute",
                top: "50%",
                right: { xs: 8, sm: 14 },
                transform: "translateY(-50%)",
                backgroundColor: "rgba(0, 0, 0, 0.45)",
                color: "#FFFFFF",
                zIndex: 10,
                width: { xs: 32, sm: 38 },
                height: { xs: 32, sm: 38 },
                backdropFilter: "blur(4px)",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.75)",
                  transform: "translateY(-50%) scale(1.08)",
                },
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          )}

          {/* Bottom Dash/Pill Slide Indicators */}
          {banners.length > 1 && (
            <Box
              sx={{
                position: "absolute",
                bottom: { xs: 10, sm: 14 },
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                alignItems: "center",
                gap: 0.8,
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
                    aria-label={`Go to slide ${idx + 1}`}
                    sx={{
                      width: isActive ? 28 : 18,
                      height: 4,
                      borderRadius: "9999px",
                      backgroundColor: isActive ? "#FFFFFF" : "rgba(255, 255, 255, 0.5)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#FFFFFF",
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
