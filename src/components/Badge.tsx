import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export interface CustomBadgeProps {
  label: string;
  variant?: "primary" | "gold" | "green" | "blue" | "maroon" | "outline";
  size?: "small" | "medium";
  icon?: React.ReactNode;
}

export default function Badge({
  label,
  variant = "primary",
  size = "small",
  icon,
}: CustomBadgeProps) {
  const getColors = () => {
    switch (variant) {
      case "gold":
        return {
          bg: "#FEF3C7",
          color: "#92400E",
          border: "#FDE68A",
        };
      case "maroon":
        return {
          bg: "#FEE2E2",
          color: "#991B1B",
          border: "#FECACA",
        };
      case "green":
        return {
          bg: "#DCFCE7",
          color: "#166534",
          border: "#BBF7D0",
        };
      case "blue":
        return {
          bg: "#DBEAFE",
          color: "#1E40AF",
          border: "#BFDBFE",
        };
      case "outline":
        return {
          bg: "transparent",
          color: "#64748B",
          border: "#CBD5E1",
        };
      default:
        return {
          bg: "#F1F5F9",
          color: "#334155",
          border: "#E2E8F0",
        };
    }
  };

  const colors = getColors();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.6,
        backgroundColor: colors.bg,
        color: colors.color,
        border: `1px solid ${colors.border}`,
        borderRadius: "9999px",
        px: size === "small" ? 1.2 : 1.6,
        py: size === "small" ? 0.35 : 0.6,
        fontSize: size === "small" ? "0.75rem" : "0.85rem",
        fontWeight: 700,
        letterSpacing: "0.01em",
        lineHeight: 1.2,
      }}
    >
      {icon && <Box sx={{ display: "flex", alignItems: "center" }}>{icon}</Box>}
      <Typography component="span" variant="inherit">
        {label}
      </Typography>
    </Box>
  );
}
