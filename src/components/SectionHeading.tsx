import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Badge from "./Badge";

export interface SectionHeadingProps {
  badge?: string;
  badgeVariant?: "gold" | "maroon" | "green" | "blue";
  hindiTitle?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  isDark?: boolean;
}

export default function SectionHeading({
  badge,
  badgeVariant = "maroon",
  hindiTitle,
  title,
  subtitle,
  align = "center",
  isDark = false,
}: SectionHeadingProps) {
  return (
    <Box
      sx={{
        textAlign: align,
        mb: { xs: 4, md: 5 },
        maxWidth: align === "center" ? 800 : "100%",
        mx: align === "center" ? "auto" : 0,
      }}
    >
      {badge && (
        <Box sx={{ mb: 1.5 }}>
          <Badge label={badge} variant={badgeVariant} size="medium" />
        </Box>
      )}

      {hindiTitle && (
        <Typography
          variant="h3"
          component="h2"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.75rem", sm: "2.1rem", md: "2.5rem" },
            color: isDark ? "#FFFFFF" : "#1E293B",
            letterSpacing: "-0.01em",
            mb: 0.5,
          }}
        >
          {hindiTitle}
        </Typography>
      )}

      <Typography
        variant="h4"
        component="h3"
        sx={{
          fontWeight: 800,
          fontSize: { xs: "1.5rem", sm: "1.85rem", md: "2.15rem" },
          color: isDark ? "#F8FAFC" : "#8B1D24",
          mb: subtitle ? 1.5 : 0,
          background: isDark
            ? "linear-gradient(90deg, #FFFFFF, #E2E8F0)"
            : "linear-gradient(90deg, #8B1D24, #B91C1C)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: isDark ? "#CBD5E1" : "#475569",
            fontSize: { xs: "0.95rem", md: "1.05rem" },
            lineHeight: 1.6,
            maxWidth: 680,
            mx: align === "center" ? "auto" : 0,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
