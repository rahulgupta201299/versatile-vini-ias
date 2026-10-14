import React from "react";
import Box from "@mui/material/Box";
import { BellRing } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Thin announcement strip above the course hero. */
export default function NoticeStrip({ text }: { text: string }) {
  return (
    <Box role="note" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, px: 2, py: 1, backgroundColor: COLORS.yellow, color: COLORS.navy, fontWeight: 700, fontSize: { xs: "0.8rem", md: "0.9rem" }, textAlign: "center" }}>
      <BellRing size={16} style={{ flexShrink: 0 }} /> {text}
    </Box>
  );
}
