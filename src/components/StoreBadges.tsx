import React from "react";
import Box from "@mui/material/Box";
import { AppleLogo, GooglePlayLogo } from "@/components/icons/BrandLogos";
import { APP_STORE_LINKS } from "@/data/app";

type BadgeSize = "md" | "sm";

const DIMENSIONS: Record<BadgeSize, { w: object; h: object; title: object; glyph: number }> = {
  // md: 162 × 48 on desktop (pw.live size), sm: compact for the footer
  md: { w: { xs: 138, lg: 162 }, h: { xs: 44, lg: 48 }, title: { xs: "0.9rem", lg: "1.08rem" }, glyph: 22 },
  sm: { w: { xs: 134, sm: 136 }, h: { xs: 42, sm: 42 }, title: { xs: "0.88rem", sm: "0.9rem" }, glyph: 20 },
};

function StoreBadge({
  href,
  top,
  bottom,
  glyph,
  size,
}: {
  href: string;
  top: string;
  bottom: string;
  glyph: React.ReactNode;
  size: BadgeSize;
}) {
  const d = DIMENSIONS[size];
  const external = href.startsWith("http");
  return (
    <Box
      component="a"
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={`${top} ${bottom}`}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.1,
        width: d.w,
        height: d.h,
        flexShrink: 0,
        whiteSpace: "nowrap",
        px: 1.25,
        borderRadius: "8px",
        backgroundColor: "#000000",
        border: "1px solid #A6A6A6",
        color: "#FFFFFF",
        textDecoration: "none",
        transition: "transform .2s ease",
        "&:hover": { transform: "translateY(-2px)" },
      }}
    >
      {glyph}
      <Box sx={{ lineHeight: 1.05 }}>
        <Box component="span" sx={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.02em" }}>
          {top}
        </Box>
        <Box component="span" sx={{ display: "block", fontSize: d.title, fontWeight: 600 }}>
          {bottom}
        </Box>
      </Box>
    </Box>
  );
}

/** Google Play + App Store badges, side by side. */
export default function StoreBadges({ size = "md" }: { size?: BadgeSize }) {
  const glyph = DIMENSIONS[size].glyph;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: size === "md" ? { xs: 1, lg: 3 } : 1 }}>
      <StoreBadge
        size={size}
        href={APP_STORE_LINKS.googlePlay}
        top="GET IT ON"
        bottom="Google Play"
        glyph={<GooglePlayLogo size={glyph} />}
      />
      <StoreBadge
        size={size}
        href={APP_STORE_LINKS.appStore}
        top="Download on the"
        bottom="App Store"
        glyph={<AppleLogo size={glyph} />}
      />
    </Box>
  );
}
