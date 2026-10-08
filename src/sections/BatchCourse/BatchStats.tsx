import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { BatchCourseContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { LANDING_ICONS } from "@/sections/CourseLanding/icons";

/** Numbers strip that overlaps the bottom of the hero. */
export default function BatchStats({ stats }: { stats: BatchCourseContent["stats"] }) {
  return (
    <Box component="section" sx={{ position: "relative", zIndex: 1, mt: { xs: -5, md: -6 } }}>
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: `repeat(${stats.length}, minmax(0, 1fr))` }, gap: { xs: 1.5, md: 0 }, p: { xs: 2, md: 2.5 }, borderRadius: "16px", backgroundColor: "#FFFFFF", border: `1.5px solid ${COLORS.redBorder}`, boxShadow: "0 14px 34px rgba(15,23,42,.08)" }}>
          {stats.map((s) => {
            const Icon = LANDING_ICONS[s.icon];
            return (
              <Box key={s.label} sx={{ display: "flex", alignItems: "center", justifyContent: { md: "center" }, gap: 1.5 }}>
                <Box sx={{ width: { xs: 40, md: 46 }, height: { xs: 40, md: 46 }, borderRadius: "12px", backgroundColor: COLORS.redTint, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon size={22} color={COLORS.red} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.2rem", md: "1.55rem" }, color: COLORS.navy, lineHeight: 1.1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: { xs: "0.75rem", md: "0.88rem" }, color: COLORS.textSecondary }}>{s.label}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
