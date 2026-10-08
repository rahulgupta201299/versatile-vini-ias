"use client";

import React from "react";
import Box from "@mui/material/Box";
import { ArrowRight } from "lucide-react";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";

/** Red pill button that opens the login / enrol popup. */
export default function LandingCta({ label }: { label: string }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={openAuth}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        height: { xs: 46, md: 52 },
        px: { xs: 3, md: 4 },
        border: "none",
        borderRadius: "9999px",
        backgroundColor: COLORS.red,
        color: "#FFFFFF",
        fontFamily: "inherit",
        fontWeight: 700,
        fontSize: { xs: "0.95rem", md: "1.05rem" },
        cursor: "pointer",
        boxShadow: "0 10px 24px rgba(254,0,52,.28)",
        transition: "all .2s",
        "&:hover": { backgroundColor: COLORS.redDark, transform: "translateY(-1px)" },
      }}
    >
      {label} <ArrowRight size={18} />
    </Box>
  );
}
