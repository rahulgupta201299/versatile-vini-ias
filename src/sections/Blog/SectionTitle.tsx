import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Red-bar section heading with an optional "See all" link. */
export default function SectionTitle({ title, href, as = "h2" }: { title: string; href?: string; as?: "h2" | "h3" }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 1.75, pb: 1, borderBottom: `2px solid ${COLORS.border}`, position: "relative" }}>
      <Typography component={as} sx={{ display: "flex", alignItems: "center", gap: 1, fontWeight: 900, fontSize: { xs: "1.1rem", md: "1.25rem" }, color: COLORS.navy }}>
        <Box component="span" sx={{ width: 5, height: 22, borderRadius: 2, backgroundColor: COLORS.red }} />
        {title}
      </Typography>
      <Box aria-hidden sx={{ position: "absolute", left: 0, bottom: -2, width: 72, height: 2, backgroundColor: COLORS.red }} />
      {href && (
        <Box component={Link} href={href} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, fontSize: "0.82rem", fontWeight: 800, color: COLORS.red, textDecoration: "none", "&:hover": { gap: 0.9 }, transition: "gap .15s" }}>
          See all <ArrowRight size={14} />
        </Box>
      )}
    </Box>
  );
}
