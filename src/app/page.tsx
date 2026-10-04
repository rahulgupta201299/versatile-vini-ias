"use client";

import React from "react";
import Box from "@mui/material/Box";
import {
  HeroSlider,
  FreeResourcesSection,
  MarketAdBanner,
  ExamGoalSection,
  SmallPromoBanner,
  MentorshipCallbackSection,
  TopRankersSection,
  ImpactStatsSection,
  EnquirySection,
  AppDownloadSection,
  FoundersDeskSection,
} from "@/sections";

export default function HomePage() {
  return (
    <Box sx={{ width: "100%" }}>
      {/* 1. Hero Banner Slider with Sliding Server Images & Indicators */}
      <HeroSlider />

      {/* 2. Browse Our Free Resources (10 items matching reference screenshot without overlap) */}
      <FreeResourcesSection />

      {/* 3. Market Promotional Advertisement Banner (PDF Page 1 Section D) */}
      <MarketAdBanner />

      {/* 4. Exam Category Selection / Goal Chooser (PDF Page 1 Section E) */}
      <ExamGoalSection />

      {/* 5. Small Promotional Banner / Slider (PDF Page 2 Section F) */}
      <SmallPromoBanner />

      {/* 6. Crack UPSC with Our Expert Guidance (PDF Page 2 Section I) */}
      <MentorshipCallbackSection />

      {/* 8. परिणाम जो विश्वास जगाए / Top Rankers Section (PDF Page 2 Section H) */}
      <TopRankersSection />

      {/* 9. Impact At Scale (PDF Page 2) */}
      <ImpactStatsSection />

      {/* 10. Still in Doubt? Enquiry Form (PDF Page 3 Section J) */}
      <EnquirySection />

      {/* 11. Learn From Anywhere - App Showcase (PDF Page 3) */}
      <AppDownloadSection />

      {/* 12. Happy To Help You - Founder's Desk (PDF Page 3) */}
      <FoundersDeskSection />
    </Box>
  );
}
