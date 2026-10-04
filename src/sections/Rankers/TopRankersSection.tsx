"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Trophy, Medal, Users, BookOpen, Sparkles } from "lucide-react";
import { RANKERS, RANKER_STATS } from "@/data/rankers";
import { Ranker } from "@/types";
import { RankerCard, RankerStoryModal } from "@/components";

const FILTER_TABS = [
  { id: "all", label: "सभी टॉप रैंकर्स (All Rankers)" },
  { id: "sdm", label: "SDM अधिकारी (SDM Selections)" },
  { id: "women", label: "महिला शक्ति (Women Toppers)" },
];

export default function TopRankersSection() {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedRanker, setSelectedRanker] = useState<Ranker | null>(null);

  const filteredRankers = RANKERS.filter((ranker) => {
    if (activeTab === "all") return true;
    if (activeTab === "sdm") return ranker.designation.includes("SDM");
    if (activeTab === "women") return ranker.name === "Chandrakanta Kumari" || ranker.name === "Priya";
    return true;
  });

  return (
    <Box
      id="rankers"
      sx={{
        py: { xs: 6, md: 9 },
        backgroundColor: "#FFFDF9", // Warm light cream background from screenshot
        backgroundImage: "radial-gradient(#F5E6CC 0.75px, transparent 0.75px)",
        backgroundSize: "24px 24px",
        borderTop: "1px solid #F1E2C3",
        borderBottom: "1px solid #F1E2C3",
      }}
    >
      <Container>
        {/* Section Header Matching Screenshot 18.05.42 */}
        <Box sx={{ textAlign: "center", mb: { xs: 4, md: 5.5 } }}>
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
              color: "#8B1D24", // Vibrant maroon
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
            mb: { xs: 4, md: 5 },
          }}
        >
          {RANKER_STATS.map((stat, idx) => {
            const icons = [
              <Trophy key="1" size={26} color="#8B1D24" />,
              <Medal key="2" size={26} color="#D97706" />,
              <Users key="3" size={26} color="#8B1D24" />,
              <BookOpen key="4" size={26} color="#D97706" />,
            ];

            return (
              <Card
                key={idx}
                sx={{
                  p: { xs: 2, sm: 3 },
                  textAlign: "center",
                  borderRadius: "20px",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #F3E8D2",
                  boxShadow: "0 6px 20px rgba(139, 29, 36, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 28px rgba(139, 29, 36, 0.1)",
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
                  {icons[idx]}
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

        {/* Filter Pills Matching Screenshot 18.05.42 */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1.5,
            flexWrap: "wrap",
            mb: 5,
          }}
        >
          {FILTER_TABS.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                sx={{
                  borderRadius: "9999px",
                  px: { xs: 2.2, sm: 3 },
                  py: 1.1,
                  fontSize: { xs: "0.88rem", sm: "0.95rem" },
                  fontWeight: 800,
                  backgroundColor: isSelected ? "#70161C" : "#FFFFFF", // Solid dark maroon pill
                  color: isSelected ? "#FFFFFF" : "#4A2B20",
                  border: isSelected ? "1.5px solid #70161C" : "1.5px solid #F1E2C3",
                  boxShadow: isSelected ? "0 4px 14px rgba(112, 22, 28, 0.3)" : "none",
                  "&:hover": {
                    backgroundColor: isSelected ? "#541014" : "#FFF7ED",
                  },
                }}
              >
                {tab.label}
              </Button>
            );
          })}
        </Box>

        {/* Ranker Cards Grid Matching Screenshot 18.05.49 */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            },
            gap: 3.5,
          }}
        >
          {filteredRankers.map((ranker) => (
            <RankerCard
              key={ranker.id}
              ranker={ranker}
              onReadStory={(r) => setSelectedRanker(r)}
            />
          ))}
        </Box>

        {/* Read Story Modal */}
        <RankerStoryModal
          ranker={selectedRanker}
          onClose={() => setSelectedRanker(null)}
        />
      </Container>
    </Box>
  );
}
