"use client";

import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export interface MarketAdBannerProps {
  imageUrl?: string;
  mobileImageUrl?: string;
  alt?: string;
  href?: string;
}

export default function MarketAdBanner({
  imageUrl = "/images/banners/market-ad-banner.jpg",
  mobileImageUrl,
  alt = "Special Promotional Offer - Gandhi Jayanti Up to 25% Off on UPSC Courses",
  href = "#courses",
}: MarketAdBannerProps) {
  return (
    <Box
      id="market-ad"
      component="section"
      sx={{
        py: { xs: 2.5, sm: 3, md: 4 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        <Box
          component="a"
          href={href}
          sx={{
            display: "block",
            position: "relative",
            width: "100%",
            aspectRatio: { xs: mobileImageUrl ? "2 / 1" : "4 / 1", sm: "4 / 1" },
            borderRadius: { xs: "12px", sm: "16px", md: "20px" },
            overflow: "hidden",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
            border: "1px solid #E5E7EB",
            cursor: "pointer",
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              transform: "translateY(-3px)",
              boxShadow: "0 12px 28px rgba(0, 0, 0, 0.12)",
              borderColor: "#CBD5E1",
            },
          }}
        >
          <Image
            src={imageUrl}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 1240px"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
            priority={false}
          />
        </Box>
      </Container>
    </Box>
  );
}
