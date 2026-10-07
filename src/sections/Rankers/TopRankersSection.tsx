"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Sparkles } from "lucide-react";
import { RANKER_STATS } from "@/data/rankers";
import { RESULT_BANNER_TABS } from "@/data/resultBanners";
import { ResultBannerTab } from "@/types";
import { IconRenderer, ResultBannerSlider } from "@/components";

import { COLORS } from "@/theme/colors";
interface TopRankersSectionProps {
  /** Result banner tabs from the server (UPSC / State PCS / Other Exams). */
  tabs?: ResultBannerTab[];
}

export default function TopRankersSection({ tabs = RESULT_BANNER_TABS }: TopRankersSectionProps) {
  const visibleTabs = tabs.filter((t) => t.banners.length > 0);
  const [activeTabId, setActiveTabId] = useState(visibleTabs[0]?.id);
  const activeTab = visibleTabs.find((t) => t.id === activeTabId) ?? visibleTabs[0];

  return (
    <Box
      id="rankers"
      sx={{
        py: { xs: 3.5, md: 5 },
        backgroundColor: "#FFFDF9", // Warm light cream background from screenshot
        backgroundImage: "radial-gradient(#F5E6CC 0.75px, transparent 0.75px)",
        backgroundSize: "24px 24px",
        borderTop: "1px solid #F1E2C3",
        borderBottom: "1px solid #F1E2C3",
      }}
    >
      <Container>
        {/* Section Header Matching Screenshot 18.05.42 */}
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
          {/* Badge */}
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.8,
              backgroundColor: "#FFF7ED",
              color: "#9A3412",
              border: "1px solid #FDBA74",
              borderRadius: "9999px",
              px: 2,
              py: 0.6,
              fontSize: "0.85rem",
              fontWeight: 800,
              mb: 2,
            }}
          >
            <Sparkles size={16} color="#EA580C" />
            <span>हमारे होनहार सितारे • 70th BPSC &amp; UPSC Achievers</span>
          </Box>

          {/* Hindi Big Title */}
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "2rem", sm: "2.8rem", md: "3.4rem" },
              color: "#27120C", // Deep rich dark brown/maroon
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              mb: 0.5,
            }}
          >
            परिणाम जो विश्वास जगाए
          </Typography>

          {/* English Subtitle */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.75rem", sm: "2.3rem", md: "2.75rem" },
              // Maroon → gold → maroon gradient text (matches eduteria.com)
              background: "linear-gradient(to right, #8B1A2B 0%, #B8860B 50%, #8B1A2B 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
              display: "inline-block",
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
              mb: 2,
            }}
          >
            Our Top Rankers
          </Typography>

          {/* Descriptive text */}
          <Typography
            variant="body1"
            sx={{
              color: "#574238",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
              lineHeight: 1.6,
              maxWidth: 740,
              mx: "auto",
              fontWeight: 500,
            }}
          >
            कठिन परिश्रम, सही मार्गदर्शन और अटूट संकल्प से रचा इतिहास। जानिए विनी IAS के होनहारों की प्रेरणादायक सफलता की कहानी।
          </Typography>
        </Box>

        {/* 4 Stat Boxes Matching Screenshot 18.05.42 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 2, md: 3 },
            mb: { xs: 3, md: 4 },
          }}
        >
          {RANKER_STATS.map((stat, idx) => {
            return (
              <Card
                key={idx}
                sx={{
                  p: { xs: 2, sm: 3 },
                  textAlign: "center",
                  borderRadius: "20px",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #F3E8D2",
                  boxShadow: "0 6px 20px rgba(254, 0, 52, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(254, 0, 52, 0.1)",
                    borderColor: "#F59E0B",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    backgroundColor: "#FEF9EE",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1.25,
                  }}
                >
                  <IconRenderer name={stat.icon ?? "Trophy"} size={26} color={idx % 2 === 0 ? COLORS.red : "#D97706"} />
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.75rem", sm: "2.2rem" },
                    color: "#27120C",
                    lineHeight: 1.1,
                    mb: 0.5,
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#78350F",
                    fontSize: { xs: "0.85rem", sm: "0.95rem" },
                    lineHeight: 1.3,
                  }}
                >
                  {stat.label}
                </Typography>
                {stat.sublabel && (
                  <Typography variant="caption" sx={{ color: "#92400E", fontSize: "0.72rem", mt: 0.25 }}>
                    {stat.sublabel}
                  </Typography>
                )}
              </Card>
            );
          })}
        </Box>

        {/* Results tabs (UPSC / State PCS / Other Exams) */}
        {visibleTabs.length > 1 && (
          <Box
            role="tablist"
            aria-label="Results by exam"
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", sm: "center" },
              gap: 1.5,
              overflowX: "auto",
              mb: 2,
              pb: 0.5,
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            {visibleTabs.map((tab) => {
              const selected = tab.id === activeTab?.id;
              return (
                <Box
                  key={tab.id}
                  component="button"
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveTabId(tab.id)}
                  sx={{
                    flexShrink: 0,
                    height: 36,
                    px: 2.5,
                    borderRadius: "9999px",
                    border: `1px solid ${selected ? COLORS.red : "#EFEFEF"}`,
                    backgroundColor: selected ? COLORS.red : "#FFFFFF",
                    color: selected ? "#FFFFFF" : "#3D3D3D",
                    fontSize: "0.9rem",
                    fontWeight: selected ? 700 : 500,
                    fontFamily: "inherit",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                    "&:hover": { borderColor: COLORS.red, color: selected ? "#FFFFFF" : COLORS.red },
                  }}
                >
                  {tab.label}
                </Box>
              );
            })}
          </Box>
        )}

        {/* Banner slider for the active tab (key resets the slide on tab change) */}
        {activeTab && (
          <Box role="tabpanel" aria-label={activeTab.label}>
            <ResultBannerSlider
              key={activeTab.id}
              banners={activeTab.banners}
              eager={activeTab.id === visibleTabs[0]?.id}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
