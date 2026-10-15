"use client";

import React from "react";
import Box from "@mui/material/Box";
import { FileDown } from "lucide-react";
import { COLORS } from "@/theme/colors";

/**
 * "Download this Article as PDF" — opens the article's PDF when one is published (`href`),
 * otherwise uses the browser's Save-as-PDF on a clean print layout (header, sidebar, banners hidden).
 */
export default function DownloadPdfButton({ href }: { href?: string }) {
  const sx = {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.25,
    minHeight: 56,
    px: 2,
    borderRadius: "14px",
    border: "none",
    backgroundColor: COLORS.yellow,
    color: COLORS.navyDark,
    fontFamily: "inherit",
    fontWeight: 700,
    fontSize: { xs: "1rem", md: "1.1rem" },
    textDecoration: "none",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(242,213,0,.35)",
    transition: "transform .15s, background-color .15s",
    "&:hover": { backgroundColor: COLORS.yellowDark, transform: "translateY(-1px)" },
  } as const;
  const content = (
    <>
      <Box component="span" sx={{ width: 34, height: 34, borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        <FileDown size={18} />
      </Box>
      Download this Article as PDF
    </>
  );
  return href ? (
    <Box component="a" href={href} target="_blank" rel="noopener noreferrer" download sx={sx}>{content}</Box>
  ) : (
    <Box component="button" type="button" onClick={() => window.print()} sx={sx}>{content}</Box>
  );
}
