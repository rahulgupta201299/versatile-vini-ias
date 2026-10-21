"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { LogOut } from "lucide-react";
import { COLORS } from "@/theme/colors";

export default function AdminSignOut() {
  const [busy, setBusy] = useState(false);
  const signOut = async () => {
    setBusy(true);
    await fetch("/api/admin/auth/logout", { method: "POST", credentials: "same-origin" }).catch(() => null);
    window.location.replace("/admin/login");
  };
  return (
    <Box component="button" type="button" onClick={signOut} disabled={busy} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, height: 38, px: 1.75, borderRadius: 999, border: "1px solid rgba(255,255,255,.25)", bgcolor: "rgba(255,255,255,.08)", color: "#FFFFFF", fontFamily: "inherit", fontWeight: 600, fontSize: "0.88rem", cursor: "pointer", "&:hover": { bgcolor: COLORS.red, borderColor: COLORS.red } }}>
      <LogOut size={16} /> {busy ? "Signing out…" : "Sign out"}
    </Box>
  );
}
