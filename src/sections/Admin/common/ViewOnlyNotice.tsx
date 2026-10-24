import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Eye } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Shown at the top of a section the admin can only view. */
export default function ViewOnlyNotice({ what = "this section" }: { what?: string }) {
  return (
    <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", gap: 1 }}>
      <Eye size={17} color={COLORS.muted} />
      <Typography sx={{ color: COLORS.textSecondary, fontSize: "0.85rem" }}>You can view {what} but not change it. Ask a Super Admin or Admin for Edit access.</Typography>
    </Box>
  );
}
