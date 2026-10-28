"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";
import { CelebrationBanner as CelebrationBannerData, CelebrationOffer } from "@/types";
import FestiveLamps from "./FestiveLamps";
import { festiveBackground } from "./festiveBackground";

const SERIF = 'Georgia, "Times New Roman", serif';

/** The offer row never grows past this, so the three square cards stay small on every screen (about 150px each). */
const OFFER_ROW_MAX_WIDTH = 480;

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

/** Makes the card a link: other sites open in a new tab, pages on this site use Next.js links. */
const getLinkProps = (link: string, isPreview: boolean) => {
  if (!link || isPreview) return {};

  if (/^https?:\/\//.test(link)) return { component: "a", href: link, target: "_blank", rel: "noopener" };

  return { component: Link, href: link };
};

function OfferCard({ offer, accent, size, isPreview }: { offer: CelebrationOffer; accent: string; size: Sizes; isPreview: boolean }) {
  const { title, priceLabel, price, color, link } = offer;
  const isClickable = Boolean(link) && !isPreview;

  return (
    <Box
      {...getLinkProps(link, isPreview)}
      sx={{
        aspectRatio: "1 / 1",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 0,
        borderRadius: size("12px", "14px"),
        overflow: "hidden",
        bgcolor: "rgba(255,255,255,.9)",
        border: `1px solid ${accent}26`,
        boxShadow: "0 4px 14px rgba(15, 23, 42, .06)",
        textDecoration: "none",
        transition: "transform .2s, box-shadow .2s",
        ...(isClickable && { "&:hover": { transform: "translateY(-3px)", boxShadow: "0 10px 22px rgba(15, 23, 42, .12)" } }),
      }}
    >
      <Box sx={{ mt: size(1, 1.5), lineHeight: 0, "& svg": { width: size(28, 36), height: size(28, 36) } }}>
        <OfferBadge color={accent} size={36} />
      </Box>
      <Typography
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: size(0.75, 1.25),
          color: COLORS.ink,
          fontWeight: 600,
          fontSize: size("0.72rem", "0.9rem"),
          lineHeight: 1.25,
          wordBreak: "break-word",
          overflow: "hidden",
        }}
      >
        {title}
      </Typography>
      <Box sx={{ alignSelf: "stretch", px: 0.5, py: size(0.6, 0.85), bgcolor: color, color: "#FFFFFF", textAlign: "center", fontWeight: 700, fontSize: size("0.68rem", "0.84rem"), whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
        {priceLabel} {formatPrice(price)}
      </Box>
    </Box>
  );
}

type CelebrationBannerProps = {
  banner: CelebrationBannerData;
  /** Admin preview: phone layout, links off, drawn as a card with its own background. */
  isPreview?: boolean;
};

/**
 * Festival sale banner under the hero slider (Web → Homepage → Celebration banner in the admin).
 * Only drawn when the backend sends a live banner — it never shows or hides itself in the browser,
 * so there is no flicker. `tagline` (the countdown) comes from the backend too.
 * On the website its background is drawn by <CelebrationArea>, from the top of the page down.
 */
export default function CelebrationBanner({ banner, isPreview = false }: CelebrationBannerProps) {
  const { title, subtitle, tagline, imageUrl, alt, theme, offers } = banner;
  const { titleColor, accentColor } = theme;

  const size: Sizes = (mobile, desktop) => (isPreview ? mobile : { xs: mobile, md: desktop });

  const content = (
    <>
      <Typography component="h2" sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: size(1, 1.5), color: titleColor, fontFamily: SERIF, fontWeight: 700, fontSize: size("1.6rem", "2.2rem"), lineHeight: 1.15, textAlign: "center" }}>
        <Box component="span" aria-hidden sx={{ color: accentColor, fontSize: "0.7em" }}>✦</Box>
        {title}
        <Box component="span" aria-hidden sx={{ color: accentColor, fontSize: "0.7em" }}>✦</Box>
      </Typography>
      <Typography sx={{ mt: 0.5, minHeight: "1.4em", color: accentColor, fontWeight: 700, fontSize: size("0.76rem", "0.92rem"), letterSpacing: ".2em", textAlign: "center", textTransform: "uppercase" }}>{tagline || subtitle}</Typography>

      <Box sx={{ position: "relative", mx: "auto", mt: size(0.5, 1), mb: size(1.5, 2), height: size(110, 130), maxWidth: 400 }}>
        {imageUrl ? (
          <Image src={imageUrl} alt={alt || title} fill sizes="400px" style={{ objectFit: "contain" }} />
        ) : (
          <FestiveLamps accent={accentColor} />
        )}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: `repeat(${offers.length}, minmax(0, 1fr))`, gap: size(1, 2), maxWidth: OFFER_ROW_MAX_WIDTH, mx: "auto" }}>
        {offers.map((offer, index) => (
          <OfferCard key={index} offer={offer} accent={accentColor} size={size} isPreview={isPreview} />
        ))}
      </Box>
    </>
  );

  if (isPreview) {
    return <Box sx={{ overflow: "hidden", borderRadius: "18px", px: 1.5, pt: 2, pb: 2, background: festiveBackground(theme), border: `1px solid ${accentColor}1F` }}>{content}</Box>;
  }

  return (
    <Box component="section" id="celebration" aria-label={title} sx={{ pt: { xs: 1, md: 1.5 }, pb: { xs: 2.5, md: 3.5 } }}>
      <Container sx={{ px: { xs: 2, sm: 3 } }}>{content}</Container>
    </Box>
  );
}
