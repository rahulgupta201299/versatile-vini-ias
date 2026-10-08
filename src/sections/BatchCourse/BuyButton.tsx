"use client";

import React from "react";
import Box from "@mui/material/Box";
import { openAuth } from "@/utils/events";

/** Plan "Buy Now" button (opens the login / enrol popup). */
export default function BuyButton({ color, label = "Buy Now" }: { color: string; label?: string }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={openAuth}
      sx={{ mt: 1, height: 36, px: { xs: 2, md: 3 }, border: "none", borderRadius: "9999px", backgroundColor: color, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.8rem", md: "0.88rem" }, cursor: "pointer", whiteSpace: "nowrap", transition: "filter .15s", "&:hover": { filter: "brightness(0.9)" } }}
    >
      {label}
    </Box>
  );
}
