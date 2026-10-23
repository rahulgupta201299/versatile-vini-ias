import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";

type ListGroupProps = { title: string; hint: string; count: number; emptyText?: string; children: React.ReactNode };

/** A titled white box of rows, e.g. "Active banners (4)". */
export default function ListGroup({ title, hint, count, emptyText = "None.", children }: ListGroupProps) {
  return (
    <Box component="section" sx={{ borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
      <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.5, bgcolor: COLORS.surface, borderBottom: `1px solid ${COLORS.borderLight}` }}>
        <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.98rem" }}>
          {title} <Box component="span" sx={{ color: COLORS.muted, fontWeight: 600 }}>({count})</Box>
        </Typography>
        <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>{hint}</Typography>
      </Box>
      {children}
      {!count && <Typography sx={{ px: { xs: 2, md: 2.5 }, py: 2, color: COLORS.muted, fontSize: "0.86rem" }}>{emptyText}</Typography>}
    </Box>
  );
}
