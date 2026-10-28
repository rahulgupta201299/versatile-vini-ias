"use client";

import React from "react";
import Box from "@mui/material/Box";
import IconRenderer, { ICON_NAMES } from "@/components/IconRenderer";
import { COLORS } from "@/theme/colors";
import { inputSx } from "../allExams/formKit";

/** Icon picker: a preview of the chosen icon beside a list of the icon names the website can show. */
export default function IconSelect({ value, onChange }: { value: string; onChange: (icon: string) => void }) {
  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: "10px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.ink }}>
        <IconRenderer name={value} size={19} />
      </Box>
      <Box component="select" value={value} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => onChange(event.target.value)} sx={inputSx}>
        {!ICON_NAMES.includes(value) && <option value={value}>{value}</option>}
        {ICON_NAMES.map((name) => (
          <option key={name} value={name}>{name}</option>
        ))}
      </Box>
    </Box>
  );
}
