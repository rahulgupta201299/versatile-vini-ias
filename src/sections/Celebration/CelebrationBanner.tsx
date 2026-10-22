"use client";

import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";
import { CelebrationBanner as CelebrationBannerData, CelebrationOffer } from "@/types";
import FestiveLamps from "./FestiveLamps";

const SERIF = 'Georgia, "Times New Roman", serif';

const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;

/** The 8-point badge on each offer card. */
function OfferBadge({ color, size }: { color: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden>
      <rect x="9" y="9" width="30" height="30" rx="5" fill={color} />
      <rect x="9" y="9" width="30" height="30" rx="5" fill={color} transform="rotate(45 24 24)" />
      <path d="M24 13 L26.6 21.4 L35 24 L26.6 26.6 L24 35 L21.4 26.6 L13 24 L21.4 21.4 Z" fill="#FFFFFF" />
    </svg>
  );
}

type Sizes = <T>(mobile: T, desktop: T) => T | { xs: T; md: T };

function OfferCard({ offer, accent, size, isPreview }: { offer: CelebrationOffer; accent: string; size: Sizes; isPreview: boolean }) {
  const { title, priceLabel, price, color, link } = offer;
  const isExternal = /^https?:\/\//.test(link);
  const linkProps = !link || isPreview ? {} : isExternal ? { component: "a", href: link, target: "_blank", rel: "noopener" } : { component: Link, href: link };

  return (
    <Box
      {...linkProps}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 0,
        borderRadius: size("14px", "18px"),
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,.88)",
        border: `1px solid ${accent}26`,
        boxShadow: "0 6px 18px rgba(15, 23, 42, .06)",
        textDecoration: "none",
        transition: "transform .2s, box-shadow .2s",
        ...(link && !isPreview && { "&:hover": { transform: "translateY(-3px)", boxShadow: "0 12px 26px rgba(15, 23, 42, .12)" } }),
      }}
    >
      <Box sx={{ mt: size(1.5, 2.5), lineHeight: 0 }}>
        <OfferBadge color={accent} size={44} />
      </Box>
      <Typography
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: size(0.75, 2),
          py: size(1, 1.5),
          color: COLORS.ink,
          fontWeight: 600,
          fontSize: size("0.8rem", "1.08rem"),
          lineHeight: 1.3,
          wordBreak: "break-word",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ alignSelf: "stretch", px: 0.5, py: size(0.9, 1.25), bgcolor: color, color: "#FFFFFF", textAlign: "center", fontWeight: 700, fontSize: size("0.74rem", "1rem"), whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {priceLabel} {formatPrice(price)}
      </Box>
    </Box>
  );
}

type CelebrationBannerProps = {
  banner: CelebrationBannerData;
  /** Admin preview: phone layout, links off. */
  isPreview?: boolean;
};

/**
 * Festival sale banner under the hero slider (Web → Homepage → Celebration banner in the admin).
 * Only drawn when the backend sends a live banner — it never shows or hides itself in the browser,
 * so there is no flicker. `tagline` (the countdown) comes from the backend too.
 */
export default function CelebrationBanner({ banner, isPreview = false }: CelebrationBannerProps) {
  const { title, subtitle, tagline, imageUrl, alt, theme, offers } = banner;
  const { titleColor, accentColor, background } = theme;

  const size: Sizes = (mobile, desktop) => (isPreview ? mobile : { xs: mobile, md: desktop });

  const content = (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: size("18px", "24px"),
        px: size(1.5, 4),
        pt: size(2.5, 4),
        pb: size(2, 4),
        background: `radial-gradient(circle at 12% 18%, ${accentColor}1F, transparent 42%), radial-gradient(circle at 88% 12%, ${accentColor}1A, transparent 40%), linear-gradient(180deg, ${background} 0%, #FFFFFF 92%)`,
        border: `1px solid ${accentColor}1F`,
      }}
    >
      <Typography component="h2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: size(1, 1.5), color: titleColor, fontFamily: SERIF, fontWeight: 700, fontSize: size("1.85rem", "2.6rem"), lineHeight: 1.15, textAlign: "center" }}>
        <Box component="span" aria-hidden sx={{ color: accentColor, fontSize: "0.7em" }}>✦</Box>
        {title}
        <Box component="span" aria-hidden sx={{ color: accentColor, fontSize: "0.7em" }}>✦</Box>
      </Typography>
      <Typography sx={{ mt: 0.75, minHeight: "1.4em", color: accentColor, fontWeight: 700, fontSize: size("0.82rem", "1rem"), letterSpacing: ".2em", textAlign: "center", textTransform: "uppercase" }}>{tagline || subtitle}</Typography>

      <Box sx={{ mx: "auto", mt: size(1, 1.5), mb: size(2, 3), height: size(150, 200), maxWidth: 460 }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element -- uploaded artwork (data URL until S3)
          <img src={imageUrl} alt={alt || title} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        ) : (
          <FestiveLamps accent={accentColor} />
        )}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${offers.length}, minmax(0, 1fr))`, gap: size(1, 2.5), maxWidth: 960, mx: "auto" }}>
        {offers.map((offer, index) => (
          <OfferCard key={index} offer={offer} accent={accentColor} size={size} isPreview={isPreview} />
        ))}
      </Box>
    </Box>
  );

  if (isPreview) return content;

  return (
    <Box component="section" id="celebration" aria-label={title} sx={{ py: { xs: 1.5, md: 2.5 }, bgcolor: "#FFFFFF" }}>
      <Container sx={{ px: { xs: 2, sm: 3 } }}>{content}</Container>
    </Box>
  );
}
