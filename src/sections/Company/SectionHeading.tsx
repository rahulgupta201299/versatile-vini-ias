import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";

/** Section title with the red→yellow underline used across company pages. */
export default function SectionHeading({ title, subtitle, light = false, align = "left" }: { title: string; subtitle?: string; light?: boolean; align?: "left" | "center" }) {
  return (
    <Box sx={{ textAlign: align, mb: { xs: 3, md: 4.5 } }}>
      <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.2rem" }, lineHeight: 1.2, color: light ? "#FFFFFF" : COLORS.navy }}>
        {title}
      </Typography>
      <Box sx={{ width: 64, height: 4, borderRadius: 2, mt: 1.25, mx: align === "center" ? "auto" : 0, background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.yellow})` }} />
      {subtitle && (
        <Typography sx={{ mt: 1.75, maxWidth: 640, mx: align === "center" ? "auto" : 0, color: light ? "rgba(255,255,255,.78)" : COLORS.textSecondary, fontSize: { xs: "0.98rem", md: "1.08rem" }, lineHeight: 1.6 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
