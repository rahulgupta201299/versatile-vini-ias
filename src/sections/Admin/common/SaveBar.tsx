import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Check, Save } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { primaryButtonSx } from "../allExams/formKit";

type SaveBarProps = {
  /** Problems that stop saving, shown above the bar */
  problems: string[];
  isDirty: boolean;
  isSaved: boolean;
  isSaving: boolean;
  isDisabled: boolean;
  /** Shown after "Saved", e.g. " — live on the site" */
  savedText?: string;
  label: string;
  onSave: () => void;
};

/** What the bar says next to the button. */
function SaveStatus({ isDirty, isSaved, savedText = "" }: Pick<SaveBarProps, "isDirty" | "isSaved" | "savedText">) {
  if (isDirty) return <>Unsaved changes</>;

  if (isSaved) {
    return (
      <>
        <Check size={16} /> Saved{savedText}
      </>
    );
  }

  return <>No changes</>;
}

/** The fixed save bar at the bottom of a long admin editor: problems, save status and the save button. */
export default function SaveBar({ problems, isDirty, isSaved, isSaving, isDisabled, savedText, label, onSave }: SaveBarProps) {
  return (
    <Box sx={{ position: "fixed", left: { xs: 0, lg: 264 }, right: 0, bottom: 0, zIndex: 20, borderTop: `1px solid ${COLORS.border}`, bgcolor: "rgba(255,255,255,.96)", backdropFilter: "blur(8px)" }}>
      {!!problems.length && (
        <Box role="alert" sx={{ maxWidth: 1360, mx: "auto", px: { xs: 2, md: 4 }, pt: 1.5 }}>
          <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600, maxHeight: 120, overflowY: "auto" }}>
            {problems.map((problem) => (
              <div key={problem}>• {problem}</div>
            ))}
          </Box>
        </Box>
      )}
      <Box sx={{ maxWidth: 1360, mx: "auto", px: { xs: 2, md: 4 }, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
        <Typography sx={{ color: isDirty ? COLORS.redDark : COLORS.success, fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
          <SaveStatus isDirty={isDirty} isSaved={isSaved} savedText={savedText} />
        </Typography>
        <Box component="button" type="button" disabled={isDisabled} onClick={onSave} sx={primaryButtonSx}>
          {isSaving ? <CircularProgress size={18} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />}
          {label}
        </Box>
      </Box>
    </Box>
  );
}
