"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Check } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { SUPER_ADMIN } from "@/lib/adminAccess";
import { AdminRoleInfo } from "@/types";

/**
 * Choose one or more roles. Each card says what the role opens.
 * Super Admin already opens everything, so choosing it clears the others (and the other way round).
 */
export default function RolePicker({ roles, value, onChange }: { roles: AdminRoleInfo[]; value: string[]; onChange: (roles: string[]) => void }) {
  const toggle = (key: string) => {
    if (value.includes(key)) return onChange(value.filter((role) => role !== key));

    if (key === SUPER_ADMIN) return onChange([SUPER_ADMIN]);

    return onChange([...value.filter((role) => role !== SUPER_ADMIN), key]);
  };

  return (
    <Box role="group" aria-label="Roles" sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }, gap: 1 }}>
      {roles.map(({ key, label, access }) => {
        const checked = value.includes(key);

        return (
          <Box
            key={key}
            component="button"
            type="button"
            role="checkbox"
            aria-checked={checked}
            onClick={() => toggle(key)}
            sx={{
              display: "flex",
              alignItems: "flex-start",
              gap: 1,
              p: 1.25,
              textAlign: "left",
              borderRadius: "12px",
              border: `1.5px solid ${checked ? COLORS.red : COLORS.border}`,
              bgcolor: checked ? COLORS.redTintSoft : "#FFFFFF",
              fontFamily: "inherit",
              cursor: "pointer",
              transition: "border-color .15s, background-color .15s",
              "&:hover": { borderColor: checked ? COLORS.red : COLORS.redBorder },
            }}
          >
            <Box sx={{ mt: 0.25, width: 18, height: 18, flexShrink: 0, borderRadius: "5px", border: `1.5px solid ${checked ? COLORS.red : COLORS.disabled}`, bgcolor: checked ? COLORS.red : "#FFFFFF", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {checked && <Check size={13} strokeWidth={3} />}
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.86rem" }}>{label}</Typography>
              <Typography sx={{ color: COLORS.muted, fontSize: "0.74rem", lineHeight: 1.4 }}>{access}</Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
