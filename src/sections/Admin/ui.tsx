import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Info, TrendingDown, TrendingUp } from "lucide-react";
import { COLORS } from "@/theme/colors";

/** Shared admin building blocks (server-safe: no hooks, no client state). */

export function PageHeader({ eyebrow, title, subtitle, actions }: { eyebrow: string; title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: { xs: "flex-start", md: "flex-end" }, justifyContent: "space-between", flexDirection: { xs: "column", md: "row" }, gap: 2, mb: 3 }}>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ color: COLORS.red, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".14em" }}>{eyebrow.toUpperCase()}</Typography>
        <Typography component="h1" sx={{ mt: 0.75, color: COLORS.ink, fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1.2 }}>{title}</Typography>
        {subtitle && <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.95rem" }}>{subtitle}</Typography>}
      </Box>
      {actions && <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>{actions}</Box>}
    </Box>
  );
}

export function Notice({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1.25, mb: 3, px: 2, py: 1.5, borderRadius: "12px", bgcolor: "#FFFBE0", border: "1px solid #F5E08A", color: "#6B5600", fontSize: "0.88rem", lineHeight: 1.5 }}>
      <Info size={18} style={{ flexShrink: 0, marginTop: 1 }} />
      <Box>{children}</Box>
    </Box>
  );
}

export function Card({ title, subtitle, action, children, sx }: { title?: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode; sx?: object }) {
  return (
    <Box sx={{ p: { xs: 2.25, md: 3 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, minWidth: 0, ...sx }}>
      {(title || action) && (
        <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, mb: 2.5 }}>
          <Box sx={{ minWidth: 0 }}>
            {title && <Typography component="h2" sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1.05rem" }}>{title}</Typography>}
            {subtitle && <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.83rem" }}>{subtitle}</Typography>}
          </Box>
          {action}
        </Box>
      )}
      {children}
    </Box>
  );
}

export function StatCard({ label, value, change, icon, tone = "red" }: { label: string; value: string; change: number; icon: React.ReactNode; tone?: "red" | "yellow" | "navy" | "ink" }) {
  const tones = {
    red: { bg: COLORS.redTint, fg: COLORS.red },
    yellow: { bg: "#FFF9D1", fg: "#8A7300" },
    navy: { bg: "#E8EDF5", fg: COLORS.navy },
    ink: { bg: COLORS.surface, fg: COLORS.ink },
  }[tone];
  const up = change >= 0;

  return (
    <Box sx={{ p: 2.5, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, minWidth: 0 }}>
      <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 1.5 }}>
        <Typography sx={{ color: COLORS.textSecondary, fontWeight: 600, fontSize: "0.88rem" }}>{label}</Typography>
        <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: "12px", bgcolor: tones.bg, color: tones.fg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</Box>
      </Box>
      <Typography sx={{ mt: 1, color: COLORS.ink, fontWeight: 800, fontSize: "1.9rem", lineHeight: 1.1, fontVariantNumeric: "tabular-nums" }}>{value}</Typography>
      <Box sx={{ mt: 1.25, display: "flex", alignItems: "center", gap: 0.5, fontSize: "0.8rem", fontWeight: 700, color: up ? COLORS.success : COLORS.red }}>
        {up ? <TrendingUp size={15} /> : <TrendingDown size={15} />}
        {up ? "+" : ""}
        {change}%
        <Box component="span" sx={{ ml: 0.5, color: COLORS.muted, fontWeight: 500 }}>vs last 30 days</Box>
      </Box>
    </Box>
  );
}

export function Chip({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "red" | "yellow" | "success" }) {
  const t = {
    neutral: { bg: COLORS.surface, fg: COLORS.textSecondary, bd: COLORS.border },
    red: { bg: COLORS.redTint, fg: COLORS.redDark, bd: COLORS.redBorder },
    yellow: { bg: "#FFF9D1", fg: "#7A6000", bd: "#F5E08A" },
    success: { bg: "#ECFDF3", fg: "#15803D", bd: "#BBF7D0" },
  }[tone];

  return (
    <Box component="span" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, px: 1, py: 0.3, borderRadius: 999, bgcolor: t.bg, color: t.fg, border: `1px solid ${t.bd}`, fontSize: "0.72rem", fontWeight: 700, whiteSpace: "nowrap" }}>
      {children}
    </Box>
  );
}
