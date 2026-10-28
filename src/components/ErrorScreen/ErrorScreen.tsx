"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { RefreshCw } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { ERROR_COPY, HELPFUL_LINKS, type ErrorVariant } from "./errorCopy";

type ErrorScreenProps = {
  variant?: ErrorVariant;
  digest?: string;
  onRetry?: () => void;
};

/** Branded error / 404 screen for the main site. Sits inside the site layout, so header and footer stay put. */
export default function ErrorScreen({ variant = "error", digest, onRetry }: ErrorScreenProps) {
  const { badge, title, message } = ERROR_COPY[variant];

  return (
    <Box component="section" sx={{ minHeight: { xs: "60vh", md: "64vh" }, display: "flex", alignItems: "center", justifyContent: "center", px: 2, py: { xs: 8, md: 12 }, bgcolor: COLORS.surface }}>
      <Box sx={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
        <Typography
          aria-hidden
          sx={{
            display: "inline-block",
            fontWeight: 900,
            fontSize: { xs: "4rem", md: "5.5rem" },
            lineHeight: 1,
            color: COLORS.red,
            backgroundImage: `linear-gradient(transparent 62%, ${COLORS.yellow} 62%, ${COLORS.yellow} 88%, transparent 88%)`,
            px: 1,
          }}
        >
          {badge}
        </Typography>
        <Typography component="h1" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.45rem", md: "1.9rem" } }}>
          {title}
        </Typography>
        <Typography sx={{ mt: 1.25, color: COLORS.textSecondary, lineHeight: 1.7 }}>{message}</Typography>
        {digest && <Typography sx={{ mt: 1.5, color: COLORS.disabled, fontSize: 12 }}>Reference: {digest}</Typography>}

        <Box sx={{ mt: 3.5, display: "flex", gap: 1.25, justifyContent: "center", flexWrap: "wrap" }}>
          {onRetry && (
            <Button variant="contained" disableElevation startIcon={<RefreshCw size={18} />} onClick={onRetry} sx={{ borderRadius: 999, px: 3, bgcolor: COLORS.red, fontWeight: 700, textTransform: "none", "&:hover": { bgcolor: COLORS.redDark } }}>
              Try again
            </Button>
          )}
          <Button component={Link} href="/" variant={onRetry ? "outlined" : "contained"} disableElevation sx={homeButtonSx(Boolean(onRetry))}>
            Go to homepage
          </Button>
        </Box>

        <Box component="nav" aria-label="Helpful links" sx={{ mt: 4, display: "flex", gap: 2.5, justifyContent: "center", flexWrap: "wrap" }}>
          {HELPFUL_LINKS.map(({ label, href }) => (
            <Box key={href} component={Link} href={href} sx={{ color: COLORS.navy, fontWeight: 600, fontSize: 14, textDecoration: "none", borderBottom: `2px solid ${COLORS.yellow}`, "&:hover": { color: COLORS.red } }}>
              {label}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const homeButtonSx = (isSecondary: boolean) => {
  const base = { borderRadius: 999, px: 3, fontWeight: 700, textTransform: "none" } as const;

  if (isSecondary) return { ...base, color: COLORS.navy, borderColor: COLORS.border, "&:hover": { borderColor: COLORS.navy, bgcolor: "transparent" } };

  return { ...base, bgcolor: COLORS.red, color: "#FFFFFF", "&:hover": { bgcolor: COLORS.redDark } };
};
