"use client";

import React from "react";
import Box from "@mui/material/Box";
import { Check } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { Field, inputSx } from "../allExams/formKit";
import { COLOR_PRESETS } from "./celebrationForm";

type ColorFieldProps = { label: string; value: string; onChange: (color: string) => void; hint?: string; presets?: string[] };

/** Pick a ready-made colour, or any colour with the picker / a hex code. */
export default function ColorField({ label, value, onChange, hint, presets = COLOR_PRESETS }: ColorFieldProps) {
  const isHex = /^#[\da-f]{6}$/i.test(value);

  return (
    <Field label={label} hint={hint} group>
      <Box sx={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 0.75 }}>
        {presets.map((preset) => {
          const isChosen = preset.toLowerCase() === value.toLowerCase();

          return (
            <Box
              key={preset}
              component="button"
              type="button"
              aria-label={`${label}: ${preset}`}
              aria-pressed={isChosen}
              onClick={() => onChange(preset)}
              sx={{ width: 30, height: 30, p: 0, borderRadius: "8px", border: `2px solid ${isChosen ? COLORS.ink : "#FFFFFF"}`, boxShadow: `0 0 0 1px ${COLORS.border}`, bgcolor: preset, color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              {isChosen && <Check size={15} strokeWidth={3} />}
            </Box>
          );
        })}
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, ml: 0.5 }}>
          <Box component="input" type="color" aria-label={`${label}: custom colour`} value={isHex ? value : "#000000"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} sx={{ width: 36, height: 34, p: 0.25, borderRadius: "8px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", cursor: "pointer" }} />
          <Box component="input" aria-label={`${label}: hex code`} value={value} maxLength={7} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} sx={{ ...inputSx, width: 104, height: 36, fontFamily: "monospace", ...(isHex ? {} : { borderColor: COLORS.red }) }} />
        </Box>
      </Box>
    </Field>
  );
}
