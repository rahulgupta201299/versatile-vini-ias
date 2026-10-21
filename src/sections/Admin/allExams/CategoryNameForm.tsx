"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Check, X } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { buttonSx, inputSx, primaryButtonSx } from "./formKit";

type CategoryNameFormProps = {
  initialName?: string;
  submitLabel: string;
  placeholder?: string;
  /** Saves the name; throw an Error to show its message under the field. */
  onSubmit: (name: string) => Promise<void>;
  onCancel: () => void;
};

/** Inline field for creating or renaming a category (Enter saves, Esc cancels). */
export default function CategoryNameForm({ initialName = "", submitLabel, placeholder = "Category name", onSubmit, onCancel }: CategoryNameFormProps) {
  const [name, setName] = useState(initialName);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const trimmed = name.trim();
  const isUnchanged = trimmed === initialName.trim();

  const submit = async (event?: React.FormEvent) => {
    event?.preventDefault();

    if (!trimmed) return setError("Type a category name.");
    if (isUnchanged) return onCancel();

    setBusy(true);
    setError("");

    try {
      await onSubmit(trimmed);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Couldn't save the category.");
      setBusy(false);
    }
  };

  return (
    <Box component="form" onSubmit={submit} sx={{ flex: 1, minWidth: { xs: "100%", sm: 280 } }}>
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Box
          component="input"
          autoFocus
          value={name}
          disabled={busy}
          placeholder={placeholder}
          aria-label="Category name"
          aria-invalid={Boolean(error)}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setName(e.target.value); setError(""); }}
          onKeyDown={(e: React.KeyboardEvent) => { if (e.key === "Escape") onCancel(); }}
          sx={{ ...inputSx, height: 38, minHeight: 38, py: 0, ...(error && { borderColor: COLORS.red }) }}
        />
        <Box component="button" type="submit" disabled={busy} sx={{ ...primaryButtonSx, height: 38, flexShrink: 0 }}>
          {busy ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Check size={15} />} {submitLabel}
        </Box>
        <Box component="button" type="button" disabled={busy} onClick={onCancel} aria-label="Cancel" sx={{ ...buttonSx, height: 38, px: 1.25, flexShrink: 0 }}>
          <X size={15} />
        </Box>
      </Box>
      {error && <Typography role="alert" sx={{ mt: 0.75, color: COLORS.redDark, fontSize: "0.8rem", fontWeight: 600 }}>{error}</Typography>}
    </Box>
  );
}
