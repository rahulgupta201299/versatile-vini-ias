"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ResultBannerSlider } from "@/components";
import { ResultBanner } from "@/types";
import { anchorSx, MUTED, sectionSx, titleSx } from "./theme";

export default function CourseToppers({ banners }: { banners: ResultBanner[] }) {
  if (!banners.length) return null;
  return (
    <Box component="section" id="toppers" sx={{ ...anchorSx, ...sectionSx }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 2, md: 3 } }}>
          <Typography component="h2" sx={titleSx}>
            Our{" "}
            <Box
              component="span"
              sx={{
                background: "linear-gradient(to right, #8B1A2B 0%, #B8860B 50%, #8B1A2B 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Top Rankers
            </Box>
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: { xs: "0.85rem", md: "0.95rem" }, mt: 0.5 }}>Results that build trust — परिणाम जो विश्वास जगाए</Typography>
        </Box>
        <ResultBannerSlider banners={banners} />
      </Container>
    </Box>
  );
}
