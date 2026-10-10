import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MentorshipContent } from "@/types";
import { COLORS } from "@/theme/colors";

/** Yellow discount card (e.g. Interview Appeared 25% | Rank Holder 50%). */
export default function VeteranDiscount({ data }: { data: NonNullable<MentorshipContent["discount"]> }) {
  return (
    <Box component="section" sx={{ pb: { xs: 4, md: 6 } }}>
      <Container sx={{ textAlign: "center" }}>
        <Box sx={{ display: "inline-block", width: "100%", maxWidth: 420, borderRadius: "16px", backgroundColor: COLORS.yellow, border: `3px solid ${COLORS.ink}`, boxShadow: "0 8px 0 rgba(15,23,42,.18)", p: 2 }}>
          <Box sx={{ display: "inline-block", px: 2.5, py: 0.5, borderRadius: "9999px", backgroundColor: COLORS.red, color: "#FFFFFF", fontWeight: 900, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "0.04em" }}>{data.title}</Box>
          <Box sx={{ mt: 1.5, display: "grid", gridTemplateColumns: `repeat(${data.offers.length}, minmax(0, 1fr))` }}>
            {data.offers.map((o, i) => (
              <Box key={o.label} sx={{ borderLeft: i ? `2px solid ${COLORS.ink}` : "none", px: 1 }}>
                <Box sx={{ display: "inline-block", px: 1, border: `2px solid ${COLORS.ink}`, borderRadius: "6px", fontWeight: 800, fontSize: { xs: "0.78rem", md: "0.88rem" }, color: COLORS.ink }}>{o.label}</Box>
                <Typography sx={{ fontWeight: 900, fontSize: { xs: "2.4rem", md: "3rem" }, color: COLORS.ink, lineHeight: 1.1 }}>{o.value}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 2, mx: "auto", maxWidth: 560, display: "flex", alignItems: "center", gap: 1, px: 1.5, py: 1, borderRadius: "6px", backgroundColor: "#B91C1C", color: "#FFFFFF", fontWeight: 700, fontSize: { xs: "0.82rem", md: "0.92rem" }, textAlign: "left" }}>
          <Box component="span" sx={{ px: 1, backgroundColor: COLORS.yellow, color: COLORS.ink, fontWeight: 900, borderRadius: "3px", flexShrink: 0 }}>Note</Box>
          {data.note}
        </Box>
      </Container>
    </Box>
  );
}
