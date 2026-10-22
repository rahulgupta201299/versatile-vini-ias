"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AlertTriangle, Home, Lock, RotateCcw, SearchX } from "lucide-react";
import { COLORS } from "@/theme/colors";

type AdminErrorStateProps = {
  variant?: "error" | "not-found" | "no-access";
  title: string;
  message: string;
  /** Next.js error reference — helps find the error in the server logs. */
  digest?: string;
  onRetry?: () => void;
  backHref?: string;
  backLabel?: string;
};

/** Friendly full-width message for admin errors, missing pages and sections without access, with a way back. */
export default function AdminErrorState({ variant = "error", title, message, digest, onRetry, backHref = "/admin", backLabel = "Go to my sections" }: AdminErrorStateProps) {
  const isError = variant === "error";
  const Icon = { error: AlertTriangle, "not-found": SearchX, "no-access": Lock }[variant];

  return (
    <Box role={isError ? "alert" : undefined} sx={{ maxWidth: 560, mx: "auto", my: { xs: 4, md: 8 }, p: { xs: 3, md: 4 }, borderRadius: "20px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, textAlign: "center" }}>
      <Box sx={{ width: 60, height: 60, mx: "auto", borderRadius: "16px", bgcolor: isError ? COLORS.redTint : COLORS.surface, color: isError ? COLORS.red : COLORS.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon size={28} />
      </Box>
      <Typography component="h1" sx={{ mt: 2, fontWeight: 800, color: COLORS.ink, fontSize: "1.3rem" }}>{title}</Typography>
      <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: "0.93rem", lineHeight: 1.6 }}>{message}</Typography>
      {digest && <Typography sx={{ mt: 1.5, color: COLORS.disabled, fontSize: "0.75rem" }}>Reference: {digest}</Typography>}

      <Box sx={{ mt: 3, display: "flex", gap: 1.25, justifyContent: "center", flexWrap: "wrap" }}>
        {onRetry && (
          <Box component="button" type="button" onClick={onRetry} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 42, px: 2.25, border: "none", borderRadius: "11px", bgcolor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", "&:hover": { bgcolor: COLORS.redDark } }}>
            <RotateCcw size={16} /> Try again
          </Box>
        )}
        <Box component={Link} href={backHref} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 42, px: 2.25, borderRadius: "11px", border: `1px solid ${COLORS.border}`, color: COLORS.ink, fontWeight: 700, fontSize: "0.9rem", "&:hover": { borderColor: COLORS.redBorder, color: COLORS.red } }}>
          <Home size={16} /> {backLabel}
        </Box>
      </Box>
    </Box>
  );
}
