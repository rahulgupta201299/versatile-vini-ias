import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import { COLORS } from "@/theme/colors";

/** Small red category label that links to the category page. */
export default function CategoryTag({ slug, name, onDark }: { slug: string; name: string; onDark?: boolean }) {
  return (
    <Box
      component={Link}
      href={`/exams/${slug}`}
      sx={{ display: "inline-block", px: 1, py: 0.35, borderRadius: "6px", backgroundColor: COLORS.red, color: "#FFFFFF", fontSize: "0.68rem", fontWeight: 800, letterSpacing: ".06em", textTransform: "uppercase", textDecoration: "none", position: "relative", zIndex: 2, boxShadow: onDark ? "0 4px 10px rgba(0,0,0,.25)" : "none", "&:hover": { backgroundColor: COLORS.redDark } }}
    >
      {name}
    </Box>
  );
}
