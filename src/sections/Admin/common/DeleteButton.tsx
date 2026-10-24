"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import CircularProgress from "@mui/material/CircularProgress";
import { AlertTriangle, Trash2 } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { buttonSx } from "../allExams/formKit";

type DeleteButtonProps = {
  /** What is deleted, for the dialog, e.g. "UPSC CSE" */
  name: string;
  /** Deletes on the server; a thrown error's message is shown in the dialog (e.g. "Delete or move its 3 exams first."). */
  onDelete: () => Promise<unknown>;
  /** Called after a successful delete (e.g. refresh the list or leave the page). */
  onDeleted?: () => void;
  /** Text on the button. */
  label?: string;
  size?: "small" | "normal";
};

const dangerSx = { color: COLORS.redDark, borderColor: COLORS.redBorder, "&:hover:not(:disabled)": { bgcolor: COLORS.redTint, borderColor: COLORS.red, color: COLORS.red } } as const;

/**
 * Deletes an item for good: the button opens a confirmation dialog that says it can't be undone; only
 * "Delete permanently" in the dialog deletes. Only rendered for admins with Delete access — the backend checks too.
 */
export default function DeleteButton({ name, onDelete, onDeleted, label = "Delete", size = "small" }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState("");
  const heightSx = size === "small" ? { height: 34, px: 1.5, fontSize: "0.8rem" } : {};

  const close = () => {
    if (isBusy) return;

    setIsOpen(false);
    setError("");
  };

  const remove = async () => {
    setIsBusy(true);
    setError("");

    try {
      await onDelete();
      setIsOpen(false);
      onDeleted?.();
    } catch (problem) {
      setError(problem instanceof Error ? problem.message : "Couldn't delete.");
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <>
      <Box component="button" type="button" onClick={() => setIsOpen(true)} aria-label={`Delete ${name}`} sx={{ ...buttonSx, ...heightSx, ...dangerSx }}>
        <Trash2 size={14} /> {label}
      </Box>

      <Dialog open={isOpen} onClose={close} aria-labelledby="delete-dialog-title" fullWidth maxWidth="xs" slotProps={{ paper: { sx: { borderRadius: "18px", m: 2 } } }}>
        <Box sx={{ p: 3, display: "grid", gap: 2 }}>
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
            <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: "12px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <AlertTriangle size={21} />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography id="delete-dialog-title" component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1.05rem" }}>
                Delete “{name}”?
              </Typography>
              <Typography sx={{ mt: 0.5, color: COLORS.textSecondary, fontSize: "0.88rem", lineHeight: 1.5 }}>
                This permanently removes it from the database. It can&apos;t be undone — to only hide it, switch it off instead.
              </Typography>
            </Box>
          </Box>

          {error && (
            <Typography role="alert" sx={{ p: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
            <Box component="button" type="button" disabled={isBusy} onClick={close} sx={buttonSx}>
              Cancel
            </Box>
            <Box component="button" type="button" disabled={isBusy} onClick={remove} sx={{ ...buttonSx, bgcolor: COLORS.red, color: "#FFFFFF", borderColor: COLORS.red, "&:hover:not(:disabled)": { bgcolor: COLORS.redDark, borderColor: COLORS.redDark, color: "#FFFFFF" } }}>
              {isBusy ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Trash2 size={15} />} Delete permanently
            </Box>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
