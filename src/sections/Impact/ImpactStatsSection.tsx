"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Video, Eye, HelpCircle, Users, Globe2 } from "lucide-react";

const IMPACT_METRICS = [
  {
    value: "10+ Lakh",
    label: "Hours of Live Learning",
    description: "Interactive classroom & doubt sessions conducted",
    icon: <Video size={28} color="#2563EB" />,
    bg: "#EFF6FF",
  },
  {
    value: "10+ Lakh",
    label: "Monthly Active Views",
    description: "Across live classes, editorials & YouTube lectures",
    icon: <Eye size={28} color="#16A34A" />,
    bg: "#F0FDF4",
  },
  {
    value: "10,000+",
    label: "Doubts Solved Live",
    description: "Personal 1-on-1 audio & visual doubt clearances",
    icon: <HelpCircle size={28} color="#9333EA" />,
    bg: "#FAF5FF",
  },
  {
    value: "5+ Crore",
    label: "Learning Minutes Delivered",
    description: "Reaching students in remote villages across India",
    icon: <Users size={28} color="#EA580C" />,
    bg: "#FFF7ED",
  },
];

export default function ImpactStatsSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: "#FFFFFF",
        position: "relative",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1.6fr" },
            gap: { xs: 4, lg: 6 },
            alignItems: "center",
          }}
        >
          {/* Left Narrative */}
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                backgroundColor: "#FEF2F2",
                color: "#991B1B",
                px: 1.6,
                py: 0.5,
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "0.78rem",
                mb: 1.5,
              }}
            >
              <Globe2 size={15} />
              <span>NATIONWIDE FOOTPRINT</span>
            </Box>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.8rem", sm: "2.3rem", md: "2.8rem" },
                color: "#1E293B",
                lineHeight: 1.15,
                letterSpacing: "-0.015em",
                mb: 2,
              }}
            >
              Impact At Scale
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.3rem" },
                color: "#8B1D24",
                lineHeight: 1.35,
                mb: 2,
              }}
            >
              Making Quality Civil Service Education Affordable &amp; Accessible Across the Nation
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#64748B",
                lineHeight: 1.65,
                fontSize: "0.95rem",
              }}
            >
              We believe geographical boundaries should never limit an aspirant&#39;s dreams. Through modern technology, top-tier academic faculties, and structured bilingual pedagogical frameworks, Vini IAS is democratizing civil service preparation for every corner of India.
            </Typography>
          </Box>

          {/* Right Metrics Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
              gap: 2.5,
            }}
          >
            {IMPACT_METRICS.map((metric, idx) => (
              <Card
                key={idx}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                  transition: "all 0.25s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "14px",
                    backgroundColor: metric.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  {metric.icon}
                </Box>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 900,
                    fontSize: { xs: "1.85rem", sm: "2.1rem" },
                    color: "#1E293B",
                    lineHeight: 1.1,
                    mb: 0.5,
                  }}
                >
                  {metric.value}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 800,
                    color: "#8B1D24",
                    fontSize: "0.95rem",
                    mb: 0.5,
                  }}
                >
                  {metric.label}
                </Typography>
                <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.82rem", lineHeight: 1.4 }}>
                  {metric.description}
                </Typography>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
