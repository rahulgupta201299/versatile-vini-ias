import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { NonNullable_Timeline } from "./types";
import { COLORS } from "@/theme/colors";

const TONES = [
  { pill: "#60A5FA", base: "linear-gradient(180deg, #60A5FA 0%, #3B82F6 100%)" },
  { pill: "#3B82F6", base: "linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)" },
  { pill: COLORS.navy, base: "linear-gradient(180deg, #1E40AF 0%, #13294B 100%)" },
];

/** Phase cards sitting in "envelope" pockets (Phase 1 → 2 → 3). */
export default function ProgramTimeline({ data }: { data: NonNullable_Timeline }) {
  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 4, md: 6 } }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4.5 } }}>
          <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.5rem", md: "2.2rem" }, color: "#1D4ED8", lineHeight: 1.15 }}>{data.title}</Typography>
          <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.4rem" }, color: COLORS.ink, lineHeight: 1.15 }}>{data.subtitle}</Typography>
        </Box>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: `repeat(${data.phases.length}, minmax(0, 1fr))` }, gap: { xs: 3, md: 4 }, maxWidth: 980, mx: "auto" }}>
          {data.phases.map((p, i) => {
            const tone = TONES[i % TONES.length];
            return (
              <Box key={p.title} sx={{ position: "relative", pt: 1, px: { xs: 3, md: 2.5 }, pb: { xs: 5, md: 6 } }}>
                {/* pocket */}
                <Box aria-hidden sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "46%", borderRadius: "10px", background: tone.base, boxShadow: "0 14px 28px rgba(29,78,216,.25)", clipPath: "polygon(0 18%, 50% 52%, 100% 18%, 100% 100%, 0 100%)" }} />
                <Box aria-hidden sx={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "46%", borderRadius: "10px", background: tone.base, opacity: 0.55 }} />
                {/* card */}
                <Box sx={{ position: "relative", zIndex: 1, borderTop: `4px solid ${tone.pill}`, backgroundColor: "#EEF1F5", borderRadius: "2px", textAlign: "center", px: 1.5, pt: 2.25, pb: 3, boxShadow: "0 8px 18px rgba(15,23,42,.10)" }}>
                  <Box sx={{ display: "inline-block", px: 2, py: 0.4, borderRadius: "9999px", backgroundColor: tone.pill, color: "#FFFFFF", fontWeight: 600, fontSize: "0.9rem" }}>{p.phase}</Box>
                  <Box sx={{ mt: 1.25, mx: { xs: -0.5, md: -1.5 }, px: 1, py: 0.6, borderRadius: "6px", backgroundColor: i === 2 ? COLORS.navy : "#1E3A8A", color: "#FFFFFF", fontWeight: 600, fontSize: { xs: "0.82rem", md: "0.86rem" } }}>{p.period}</Box>
                  <Typography sx={{ mt: 2, fontWeight: 900, fontSize: { xs: "1.45rem", md: "1.7rem" }, color: COLORS.ink, lineHeight: 1.1, whiteSpace: "pre-line" }}>{p.title.replace(" ", "\n")}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
