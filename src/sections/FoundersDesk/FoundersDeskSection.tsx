"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { MessageSquare, Sparkles } from "lucide-react";

export default function FoundersDeskSection() {
  return (
    <Box
      sx={{
        py: { xs: 5, md: 7 },
        backgroundColor: "#FFFFFF",
        borderTop: "1px solid #F1F5F9",
      }}
    >
      <Container>
        <Box
          sx={{
            borderRadius: { xs: "20px", md: "28px" },
            border: "1.5px solid #F1E2C3",
            backgroundColor: "#FFFDF9",
            p: { xs: 3, sm: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "0.8fr 1.2fr" },
            alignItems: "center",
            gap: 4,
            boxShadow: "0 8px 24px rgba(139, 29, 36, 0.05)",
          }}
        >
          {/* Left Founder Profile Card */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              p: 3,
              borderRadius: "20px",
              backgroundColor: "#FFFFFF",
              border: "1px solid #FDE68A",
              boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
            }}
          >
            <Avatar
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80"
              alt="Founder & Academic Director"
              sx={{
                width: 110,
                height: 110,
                borderRadius: "22px",
                border: "3px solid #8B1D24",
                boxShadow: "0 8px 20px rgba(139, 29, 36, 0.15)",
                mb: 2,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1E293B", mb: 0.25 }}>
              Dr. Vinay Sinha
            </Typography>
            <Typography variant="subtitle2" sx={{ color: "#8B1D24", fontWeight: 700, mb: 1 }}>
              Founder &amp; Chief Academic Director
            </Typography>
            <Typography variant="caption" sx={{ color: "#64748B", maxWidth: 260, lineHeight: 1.4 }}>
              Ex-Civil Services Mentor with 15+ years of experience guiding 1,500+ successful officers.
            </Typography>
          </Box>

          {/* Right Message & Speak to Expert CTA (From PDF Page 3) */}
          <Box>
            <Box
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 0.6,
                backgroundColor: "#FEF2F2",
                color: "#8B1D24",
                px: 1.5,
                py: 0.4,
                borderRadius: "9999px",
                fontWeight: 800,
                fontSize: "0.75rem",
                mb: 1.5,
              }}
            >
              <Sparkles size={14} />
              <span>FOUNDER&#39;S DESK</span>
            </Box>

            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.6rem", sm: "2rem", md: "2.3rem" },
                color: "#1E293B",
                lineHeight: 1.2,
                letterSpacing: "-0.015em",
                mb: 2,
              }}
            >
              Happy To Help You: &ldquo;Every Dream Deserves Real Mentorship&rdquo;
            </Typography>

            <Box
              sx={{
                borderLeft: "3px solid #8B1D24",
                pl: 2.5,
                py: 0.5,
                mb: 3,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: "#334155",
                  fontSize: { xs: "0.92rem", sm: "1.02rem" },
                  lineHeight: 1.65,
                  fontStyle: "italic",
                }}
              >
                &ldquo;Our vision at Vini IAS is simple: no deserving student in any village, town, or city should be denied quality civil service guidance due to exorbitant coaching fees or geographic distance. We stand shoulder to shoulder with you till your final name appears in the gazette list.&rdquo;
              </Typography>
            </Box>

            {/* Speak to an Expert Action Buttons */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
              <Button
                component="a"
                href="#enquiry"
                variant="contained"
                size="large"
                startIcon={<MessageSquare size={18} />}
                sx={{
                  background: "linear-gradient(135deg, #8B1D24 0%, #A8323A 100%)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  px: 3.5,
                  py: 1.3,
                  borderRadius: "12px",
                  boxShadow: "0 6px 18px rgba(139, 29, 36, 0.25)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #70161C 0%, #8B1D24 100%)",
                  },
                }}
              >
                Speak to an Expert
              </Button>

              <Button
                component="a"
                href="https://wa.me/918544078245"
                target="_blank"
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "#16A34A",
                  color: "#16A34A",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  px: 3,
                  py: 1.25,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: "#F0FDF4",
                    borderColor: "#15803D",
                  },
                }}
              >
                WhatsApp Direct Guidance
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
