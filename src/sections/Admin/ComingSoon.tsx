import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { LucideIcon } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { PageHeader } from "./ui";

/** Placeholder for an admin section that is planned but not built yet (access control already applies). */
export default function ComingSoon({ eyebrow, title, description, icon: Icon }: { eyebrow: string; title: string; description: string; icon: LucideIcon }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} subtitle={description} />
      <Box sx={{ p: { xs: 4, md: 6 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px dashed ${COLORS.border}`, textAlign: "center" }}>
        <Box sx={{ width: 60, height: 60, mx: "auto", borderRadius: "16px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Icon size={28} />
        </Box>
        <Typography sx={{ mt: 2, fontWeight: 800, color: COLORS.ink, fontSize: "1.15rem" }}>Coming soon</Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.92rem", maxWidth: 440, mx: "auto" }}>This section is being built. You already have access to it, so it will appear here as soon as it&apos;s ready.</Typography>
      </Box>
    </>
  );
}
