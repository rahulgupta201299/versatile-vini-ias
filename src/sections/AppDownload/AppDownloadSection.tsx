"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import {
  WifiOff,
  HelpCircle,
  Play,
  Apple,
} from "lucide-react";

export default function AppDownloadSection() {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        <Box
          sx={{
            borderRadius: { xs: "24px", md: "32px" },
            background: "linear-gradient(135deg, #0F172A 0%, #1E293B 100%)",
            color: "#FFFFFF",
            p: { xs: 3.5, sm: 5, md: 6 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            alignItems: "center",
            gap: 4,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle Ambient Glow */}
          <Box
            sx={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 29, 36, 0.3) 0%, transparent 70%)",
              pointerEvents: "none",
            }}
          />

          {/* Left Text & Download Buttons (From PDF Page 3) */}
          <Box sx={{ position: "relative", zIndex: 2 }}>
            <Chip
              label="MOBILE & WEB PLATFORM"
              size="small"
              sx={{
                backgroundColor: "rgba(255,255,255,0.15)",
                color: "#F8FAFC",
                fontWeight: 800,
                fontSize: "0.75rem",
                mb: 2,
              }}
            />

            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                mb: 1.5,
              }}
            >
              Learn From Anywhere
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: "#94A3B8",
                fontSize: { xs: "0.95rem", sm: "1.1rem" },
                lineHeight: 1.6,
                mb: 3.5,
                maxWidth: 620,
              }}
            >
              We are available on Android devices, iOS, and desktop web platforms. Study from anywhere at your convenience with uninterrupted access to live lectures, notes, and tests.
            </Typography>

            {/* Key App Features */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                mb: 4,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WifiOff size={18} color="#FBBF24" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Offline Mode
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                    Download lectures &amp; study without internet
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "10px",
                    backgroundColor: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HelpCircle size={18} color="#34D399" />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                    Live In-App Doubts
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94A3B8" }}>
                    Snap a picture and get verified solution
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* App Store & Google Play Badges from PDF Page 3 */}
            <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Play size={20} fill="#FFFFFF" />}
                component="a"
                href="#download"
                sx={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  border: "1px solid #334155",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  px: 2.75,
                  py: 1.2,
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  lineHeight: 1.1,
                  "&:hover": { backgroundColor: "#1E293B" },
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.68rem", opacity: 0.75 }}>
                  GET IT ON
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  Google Play
                </Typography>
              </Button>

              <Button
                variant="contained"
                size="large"
                startIcon={<Apple size={22} />}
                component="a"
                href="#download"
                sx={{
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  border: "1px solid #334155",
                  fontWeight: 700,
                  fontSize: "0.88rem",
                  px: 2.75,
                  py: 1.2,
                  borderRadius: "12px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  lineHeight: 1.1,
                  "&:hover": { backgroundColor: "#1E293B" },
                }}
              >
                <Typography variant="caption" sx={{ fontSize: "0.68rem", opacity: 0.75 }}>
                  Download on the
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                  App Store
                </Typography>
              </Button>
            </Box>
          </Box>

          {/* Right Mobile App Mockup (From PDF Page 3) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: 280,
                height: 520,
                borderRadius: "36px",
                border: "10px solid #334155",
                backgroundColor: "#0F172A",
                p: 2,
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              {/* Phone Notch */}
              <Box
                sx={{
                  width: 90,
                  height: 18,
                  backgroundColor: "#334155",
                  borderRadius: "0 0 12px 12px",
                  mx: "auto",
                  mb: 2,
                }}
              />

              {/* App UI Screen Inside */}
              <Box
                sx={{
                  flexGrow: 1,
                  backgroundColor: "#1E293B",
                  borderRadius: "20px",
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                    <Typography variant="caption" sx={{ color: "#FDE047", fontWeight: 800 }}>
                      VINI IAS APP
                    </Typography>
                    <Chip label="LIVE" size="small" color="error" sx={{ height: 18, fontSize: "0.65rem" }} />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "#8B1D24",
                      p: 1.5,
                      borderRadius: "10px",
                      mb: 1.5,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "#FFFFFF", fontWeight: 700, display: "block" }}>
                      GS Paper 2 - Polity &amp; Governance
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)", fontSize: "0.7rem" }}>
                      Dr. Alok Verma • 1,420 Watching
                    </Typography>
                  </Box>

                  <Box sx={{ p: 1.25, backgroundColor: "#0F172A", borderRadius: "8px", mb: 1 }}>
                    <Typography variant="caption" sx={{ color: "#E2E8F0", fontSize: "0.75rem", display: "block" }}>
                      📝 Daily Answer Writing Topic:
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#94A3B8", fontSize: "0.7rem" }}>
                      Role of Election Commission in Free &amp; Fair Polls
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    p: 1.25,
                    borderRadius: "8px",
                    backgroundColor: "#334155",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="caption" sx={{ color: "#FBBF24", fontWeight: 700, fontSize: "0.75rem" }}>
                    ⭐ 4.8 Rating on Play Store (50,000+ Downloads)
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
