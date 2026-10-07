"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Trophy, Timer, ListChecks, ArrowRight } from "lucide-react";
import { openAuth } from "@/utils/events";
import { anchorSx, INK, MUTED, RED, RED_DARK } from "./theme";

import { COLORS } from "@/theme/colors";
export default function ScholarshipTest({ name }: { name: string }) {
  return (
    <Box component="section" id="scholarship-test" sx={{ ...anchorSx, py: { xs: 2, md: 3 } }}>
      <Container>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            maxWidth: 880,
            mx: "auto",
            textAlign: "center",
            px: { xs: 2.5, md: 6 },
            py: { xs: 3.5, md: 5 },
            borderRadius: { xs: "18px", md: "24px" },
            background: `linear-gradient(160deg, #FFF8DB 0%, ${COLORS.redTint} 55%, #FFFFFF 100%)`,
            border: "1px solid #FDE9A8",
            boxShadow: "0 12px 32px rgba(254, 0, 52, 0.06)",
          }}
        >
          {/* decorative rings */}
          <Box aria-hidden sx={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", border: "28px solid rgba(255,229,31,.18)", top: -120, right: -90 }} />
          <Box aria-hidden sx={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", border: "22px solid rgba(254,0,52,.06)", bottom: -90, left: -60 }} />

          <Box sx={{ position: "relative" }}>
            <Box
              sx={{
                width: { xs: 64, md: 76 },
                height: { xs: 64, md: 76 },
                mx: "auto",
                mb: 2,
                borderRadius: "50%",
                background: `linear-gradient(145deg, ${COLORS.yellow}, #F59E0B)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 24px rgba(245, 158, 11, .35)",
              }}
            >
              <Trophy size={34} color="#FFFFFF" strokeWidth={2.2} />
            </Box>
            <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.9rem" }, color: INK, lineHeight: 1.25 }}>
              Take a Test for Free and <Box component="span" sx={{ color: RED }}>Win a Scholarship</Box>
            </Typography>
            <Typography sx={{ color: MUTED, fontSize: { xs: "0.85rem", md: "0.95rem" }, mt: 0.75 }}>
              Check your {name} preparation level and unlock your scholarship.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: { xs: 1, md: 2 }, flexWrap: "wrap", my: { xs: 2.5, md: 3 } }}>
              {[
                { icon: Timer, text: "Just 20 minutes" },
                { icon: ListChecks, text: "20 quick questions" },
              ].map(({ icon: Icon, text }) => (
                <Box key={text} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.75, py: 0.9, borderRadius: "9999px", backgroundColor: "#FFFFFF", border: "1px solid #F1F2F6", fontSize: { xs: "0.82rem", md: "0.92rem" }, fontWeight: 600, color: INK }}>
                  <Icon size={17} color={RED} /> {text}
                </Box>
              ))}
            </Box>

            <Box
              component="button"
              type="button"
              onClick={openAuth}
              sx={{
                width: "100%",
                maxWidth: 520,
                height: { xs: 48, md: 54 },
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                border: "none",
                borderRadius: "12px",
                backgroundColor: RED,
                color: "#FFFFFF",
                fontFamily: "inherit",
                fontWeight: 700,
                fontSize: { xs: "1rem", md: "1.08rem" },
                cursor: "pointer",
                boxShadow: "0 8px 20px rgba(254, 0, 52, .25)",
                transition: "background-color .2s ease, transform .2s ease",
                "&:hover": { backgroundColor: RED_DARK, transform: "translateY(-1px)" },
              }}
            >
              Attempt Test Now <ArrowRight size={19} />
            </Box>

            {/* ticket strip */}
            <Box
              sx={{
                mt: 2.5,
                mx: "auto",
                maxWidth: 520,
                px: 2,
                py: 1.25,
                border: "1.5px dashed #F59E0B",
                borderRadius: "10px",
                backgroundColor: "#FFFBEB",
                fontSize: { xs: "0.8rem", md: "0.9rem" },
                color: "#92400E",
                fontWeight: 600,
              }}
            >
              Scholarships worth up to <b>80%</b> of the full batch price to be won!
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
