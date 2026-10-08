import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CourseLandingContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { badgeSx } from "./icons";

const ART_H = { xs: 92, md: 112 };

function NotesArt() {
  return (
    <Box sx={{ position: "relative", width: 130, height: ART_H, mx: "auto" }}>
      {[-10, -3, 5].map((deg, i) => (
        <Box key={deg} sx={{ position: "absolute", left: 20 + i * 14, top: 6, width: 72, height: "88%", backgroundColor: "#FFFFFF", border: "1px solid #CBD5E1", borderRadius: "4px", transform: `rotate(${deg}deg)`, boxShadow: "0 4px 10px rgba(15,23,42,.10)", p: 1, display: "grid", alignContent: "start", gap: "5px" }}>
          {[80, 95, 70, 90, 60, 85].map((w, j) => (
            <Box key={j} sx={{ height: 3, width: `${w}%`, borderRadius: 2, backgroundColor: j === 0 ? "#94A3B8" : "#E2E8F0" }} />
          ))}
        </Box>
      ))}
    </Box>
  );
}

function BooksArt() {
  const covers = [
    { bg: "linear-gradient(160deg, #1E6FB8, #0F4C81)", rot: -8, x: 6 },
    { bg: "linear-gradient(160deg, #F97316, #C2410C)", rot: 0, x: 38 },
    { bg: "linear-gradient(160deg, #16A34A, #166534)", rot: 8, x: 72 },
  ];
  return (
    <Box sx={{ position: "relative", width: 150, height: ART_H, mx: "auto" }}>
      {covers.map((c, i) => (
        <Box key={i} sx={{ position: "absolute", left: c.x, top: i === 1 ? 0 : 8, zIndex: i === 1 ? 2 : 1, width: 62, height: "86%", borderRadius: "4px", background: c.bg, transform: `rotate(${c.rot}deg)`, boxShadow: "0 6px 14px rgba(15,23,42,.2)", color: "#FFFFFF", textAlign: "center", pt: 1 }}>
          <Typography sx={{ fontWeight: 900, fontSize: "0.68rem", letterSpacing: "0.04em" }}>NCERT</Typography>
          <Box sx={{ mx: "auto", mt: 1, width: 30, height: 30, borderRadius: "50%", backgroundColor: "rgba(255,255,255,.3)" }} />
        </Box>
      ))}
    </Box>
  );
}

function TestsArt() {
  return (
    <Box sx={{ width: 150, height: ART_H, mx: "auto", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
      <Box sx={{ width: 124, height: "74%", borderRadius: "6px 6px 0 0", border: "5px solid #1F2937", borderBottom: "none", backgroundColor: "#FFFFFF", p: 1, display: "grid", alignContent: "start", gap: "5px" }}>
        {[70, 85, 60].map((w, i) => (
          <Box key={i} sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
            <Box sx={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: i === 1 ? COLORS.red : "#CBD5E1" }} />
            <Box sx={{ height: 3, width: `${w}%`, borderRadius: 2, backgroundColor: "#E2E8F0" }} />
          </Box>
        ))}
        <Box sx={{ justifySelf: "center", mt: "2px", px: 1, py: "2px", borderRadius: "3px", backgroundColor: COLORS.red, color: "#FFFFFF", fontSize: "0.55rem", fontWeight: 800 }}>Start Test</Box>
      </Box>
      <Box sx={{ width: 150, height: 8, borderRadius: "0 0 8px 8px", backgroundColor: "#9CA3AF" }} />
    </Box>
  );
}

const ART = { notes: NotesArt, books: BooksArt, tests: TestsArt };

export default function LandingStudyMaterial({ data }: { data: CourseLandingContent["studyMaterial"] }) {
  return (
    <Box component="section" sx={{ pb: { xs: 4.5, md: 7 } }}>
      <Container>
        <Box sx={{ borderRadius: "20px", backgroundColor: "#FDF6EC", border: "1px solid #F3E3C9", px: { xs: 2, md: 4 }, py: { xs: 3.5, md: 5 }, textAlign: "center" }}>
          <Box sx={badgeSx("#7C4A03", "#FCEBCB", "#F5D49B")}>{data.badge}</Box>
          <Typography component="h2" sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: "1.55rem", md: "2.1rem" }, color: COLORS.navy, lineHeight: 1.2 }}>
            {data.title}
          </Typography>
          <Typography sx={{ mt: 0.5, fontWeight: 600, color: COLORS.navy, fontSize: { xs: "0.98rem", md: "1.1rem" } }}>{data.subtitle}</Typography>

          <Box sx={{ mt: { xs: 3, md: 4 }, display: "grid", gridTemplateColumns: { xs: "1fr", sm: `repeat(${data.items.length}, minmax(0, 1fr))` }, rowGap: 3 }}>
            {data.items.map((item, i) => {
              const Art = ART[item.art];
              return (
                <Box key={item.title} sx={{ px: 2, borderLeft: { sm: i ? "1px solid #EAD9BC" : "none" } }}>
                  <Art />
                  <Typography component="h3" sx={{ mt: 1.5, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "0.98rem", md: "1.08rem" } }}>
                    {item.title}
                  </Typography>
                  <Typography sx={{ mt: 0.25, color: COLORS.textSecondary, fontSize: { xs: "0.82rem", md: "0.9rem" } }}>{item.text}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
