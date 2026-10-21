"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { LogOut } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Sign-out button. `variant="light"` for white surfaces (admin top bar), `"dark"` for navy surfaces. */
export default function AdminSignOut({ variant = "dark", compact = false }: { variant?: "light" | "dark"; compact?: boolean }) {
  const [busy, setBusy] = useState(false);
  const signOut = async () => {
    setBusy(true);
    await fetch("/api/admin/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => null);
    window.location.replace("/admin/login");
  };
  const light = variant === "light";
  return (
    <Box
      component="button"
      type="button"
      onClick={signOut}
      disabled={busy}
      aria-label="Sign out"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 0.75,
        height: 38,
        px: compact ? 0 : 1.75,
        width: compact ? 38 : "auto",
        borderRadius: 999,
        border: light ? `1px solid ${COLORS.border}` : "1px solid rgba(255,255,255,.25)",
        bgcolor: light ? "#FFFFFF" : "rgba(255,255,255,.08)",
        color: light ? COLORS.body : "#FFFFFF",
        fontFamily: "inherit",
        fontWeight: 600,
        fontSize: "0.88rem",
        cursor: "pointer",
        transition: "all .2s",
        "&:hover": light ? { color: COLORS.red, borderColor: COLORS.redBorder, bgcolor: COLORS.redTint } : { bgcolor: COLORS.red, borderColor: COLORS.red },
        "&:disabled": { opacity: 0.6, cursor: "wait" },
      }}
    >
      <LogOut size={16} />
      {!compact && (busy ? "Signing out…" : "Sign out")}
    </Box>
  );
}
