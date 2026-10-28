"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import StoreBadges from "@/components/StoreBadges";
import {
  FacebookLogo,
  InstagramLogo,
  YouTubeLogo,
  LinkedInLogo,
  XLogo,
  TelegramLogo,
  WhatsAppLogo,
} from "@/components/icons/BrandLogos";
import { useSiteData } from "@/context/SiteDataContext";

import { COLORS } from "@/theme/colors";
import { externalLinkProps } from "@/utils/links";
import { FooterLinkColumn } from "@/types";

type LinkItem = FooterLinkColumn["links"][number];

const headingSx = { fontWeight: 800, color: COLORS.heading, fontSize: "0.95rem", mb: 2 } as const;

const linkSx = { color: COLORS.muted, textDecoration: "none", fontSize: "0.85rem", "&:hover": { color: COLORS.red } } as const;

/** How a contact-style row looks, from its link: mailto: → email, wa.me → WhatsApp, tel: → Call, else chat. */
const contactKind = (href: string) => {
  if (href.startsWith("mailto:")) return "email";

  if (/wa\.me|whatsapp/i.test(href)) return "whatsapp";

  if (href.startsWith("tel:")) return "call";

  return "chat";
};

const CALL_BUTTONS = {
  whatsapp: { label: "WhatsApp", icon: <WhatsAppLogo size={16} color="#FFFFFF" />, iconBg: "#25D366", color: "#128C4A" },
  call: { label: "Call", icon: <Phone size={15} color="#FFFFFF" />, iconBg: COLORS.red, color: COLORS.red },
};

/** A "Connect with us" row: email / chat as an icon + text, WhatsApp / Call as a round button + number. */
function ContactLink({ link }: { link: LinkItem }) {
  const { name, href } = link;
  const kind = contactKind(href);

  if (kind === "email" || kind === "chat") {
    const Icon = kind === "email" ? Mail : MessageCircle;

    return (
      <Typography component="a" href={href} {...externalLinkProps(link)} variant="body2" sx={{ ...linkSx, fontSize: { xs: "0.8rem", sm: "0.85rem" }, display: "flex", alignItems: "center", gap: 0.75, overflowWrap: "anywhere" }}>
        <Icon size={15} color={COLORS.red} style={{ flexShrink: 0 }} />
        {name}
      </Typography>
    );
  }

  const { label, icon, iconBg, color } = CALL_BUTTONS[kind];
  const isExternal = kind === "whatsapp";

  return (
    <Box component="a" href={href} {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})} aria-label={`${label}: ${name}`} sx={{ display: "flex", alignItems: "center", gap: 1, textDecoration: "none", "&:hover .num": { textDecoration: "underline" } }}>
      <Box sx={{ width: { xs: 26, sm: 30 }, height: { xs: 26, sm: 30 }, flexShrink: 0, borderRadius: "50%", backgroundColor: iconBg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</Box>
      <Box sx={{ lineHeight: 1.2, minWidth: 0 }}>
        <Box component="span" sx={{ display: "block", fontSize: "0.7rem", fontWeight: 700, color: COLORS.muted, textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</Box>
        <Box className="num" component="span" sx={{ display: "block", fontSize: { xs: "0.78rem", sm: "0.9rem" }, fontWeight: 800, color, whiteSpace: "nowrap" }}>{name}</Box>
      </Box>
    </Box>
  );
}

/**
 * Small animated tag next to a footer link (e.g. "We are hiring" beside Careers): a blue label with a punched
 * hole, a gentle pulse and a light sweeping across. Motion stops for visitors who prefer reduced motion.
 */
function LinkBadge({ text }: { text: string }) {
  return (
    <Box
      component="span"
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        height: 16,
        pl: "11px",
        pr: "6px",
        overflow: "hidden",
        backgroundColor: "#245A9C",
        color: "#FFFFFF",
        fontSize: "0.56rem",
        fontWeight: 800,
        letterSpacing: "0.06em",
        lineHeight: 1,
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        borderRadius: "0 3px 3px 0",
        clipPath: "polygon(7px 0, 100% 0, 100% 100%, 7px 100%, 0 50%)",
        animation: "footerBadgePulse 1.8s ease-in-out infinite",
        transformOrigin: "left center",
        // the tag's hole
        "&::before": { content: '""', position: "absolute", left: 5, top: "50%", width: 3, height: 3, mt: "-1.5px", borderRadius: "50%", backgroundColor: COLORS.surface },
        // the light sweeping across
        "&::after": {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: "-40%",
          width: "35%",
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,.55), transparent)",
          transform: "skewX(-20deg)",
          animation: "footerBadgeShine 2.6s ease-in-out infinite",
        },
        "@keyframes footerBadgePulse": { "0%, 100%": { transform: "scale(1)" }, "50%": { transform: "scale(1.08)" } },
        "@keyframes footerBadgeShine": { "0%": { left: "-40%" }, "60%, 100%": { left: "120%" } },
        "@media (prefers-reduced-motion: reduce)": { animation: "none", "&::after": { animation: "none", display: "none" } },
      }}
    >
      {text}
    </Box>
  );
}

/** One footer column: heading + links, styled by the column's style (locations with pins, contact with buttons). */
function FooterColumn({ column }: { column: FooterLinkColumn }) {
  const { style, title, links } = column;

  return (
    <Box>
      <Typography variant="subtitle2" sx={headingSx}>{title}</Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: style === "contact" ? 1.25 : 1 }}>
        {links.map((link, index) => {
          if (style === "contact") return <ContactLink key={index} link={link} />;

          return (
            <Typography key={index} component="a" href={link.href} {...externalLinkProps(link)} variant="body2" sx={{ ...linkSx, ...((style === "locations" || link.badge) && { display: "flex", alignItems: "center", gap: 0.75 }) }}>
              {style === "locations" && <MapPin size={13} color={COLORS.red} style={{ flexShrink: 0 }} />}
              <Box component="span" sx={{ whiteSpace: link.badge ? "nowrap" : "normal" }}>{link.name}</Box>
              {link.badge && <LinkBadge text={link.badge} />}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}

export default function Footer() {
  const { social, footer } = useSiteData().config;
  const {
    columns,
    brandsTitle,
    brands: OUR_BRANDS,
    learningResourcesTitle,
    learningResources: FREE_LEARNING_RESOURCES,
  } = footer;

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: COLORS.surface,
        borderTop: `1px solid ${COLORS.border}`,
        color: COLORS.body,
        pt: { xs: 4, md: 5 },
        pb: 4,
      }}
    >
      <Container>
        {/* TIER 1: brand (logo, app buttons, socials) + the columns managed in admin → Footer → Company footer */}
        <Box
          sx={{
            display: "grid",
            // Desktop: logo, apps and socials on the left; the columns on the right. Smaller screens: one above the other.
            gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "minmax(0, 1fr) minmax(0, 2.4fr)" },
            columnGap: 6,
            rowGap: { xs: 4, sm: 5 },
            mb: 6,
          }}
        >
          {/* Brand: logo, text, app buttons, socials */}
          <Box>
            <Box sx={{ position: "relative", width: 140, height: 46, mb: 2 }}>
              <Image src="/images/logo.png" alt="Vini IAS" fill style={{ objectFit: "contain", objectPosition: "left center" }} />
            </Box>

            <Typography
              variant="body2"
              sx={{ color: COLORS.muted, fontSize: "0.85rem", lineHeight: 1.6, mb: 3, maxWidth: 300 }}
            >
              We understand that every student has unique needs and abilities, that&#39;s why our curriculum is designed to adapt to your needs and help you grow!
            </Typography>

            {/* App store badges (side by side) */}
            <Box sx={{ mb: 3 }}>
              <StoreBadges size="sm" />
            </Box>

            {/* Social Links */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.88rem", mb: 1.25 }}>
              Let&#39;s get social :
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 1 }}>
              {[
                { icon: <FacebookLogo size={20} />, label: "Facebook", href: social.facebook },
                { icon: <InstagramLogo size={20} />, label: "Instagram", href: social.instagram },
                { icon: <YouTubeLogo size={20} />, label: "YouTube", href: social.youtube },
                { icon: <LinkedInLogo size={20} />, label: "LinkedIn", href: social.linkedin },
                { icon: <XLogo size={17} />, label: "X (Twitter)", href: social.x },
                { icon: <TelegramLogo size={20} />, label: "Telegram", href: social.telegram },
              ].map((item) => (
                <IconButton
                  key={item.label}
                  component="a"
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  sx={{
                    width: 38,
                    height: 38,
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${COLORS.border}`,
                    transition: "all .2s ease",
                    "&:hover": { backgroundColor: "#FFFFFF", transform: "translateY(-2px)", boxShadow: "0 4px 12px rgba(15,23,42,.12)" },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* The columns next to the logo (admin → Footer → Company footer): three per row on wider screens, two on phones */}
          {columns.length > 0 && (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" }, columnGap: { xs: 2, sm: 4 }, rowGap: { xs: 3.5, sm: 4 } }}>
              {columns.map((column, index) => (
                <FooterColumn key={`${column.title}-${index}`} column={column} />
              ))}
            </Box>
          )}
        </Box>

        <Divider sx={{ my: 4, borderColor: COLORS.border }} />

        {/* TIER 2: Free Learning Resources (admin → Footer) */}
        {FREE_LEARNING_RESOURCES.length > 0 && (
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
              color: COLORS.heading,
              mb: 3,
            }}
          >
            {learningResourcesTitle}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                md: "repeat(4, minmax(0, 1fr))",
              },
              columnGap: { xs: 2, sm: 4 },
              rowGap: { xs: 3.5, sm: 4 },
            }}
          >
            {FREE_LEARNING_RESOURCES.map((col, idx) => (
              <Box key={idx}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: COLORS.heading,
                    fontSize: "0.92rem",
                    mb: 1.5,
                  }}
                >
                  {col.title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                  {col.links.map((link, lIdx) => (
                    <Typography
                      key={lIdx}
                      component="a"
                      href={link.href}
                      {...externalLinkProps(link)}
                      variant="body2"
                      sx={{
                        color: COLORS.muted,
                        textDecoration: "none",
                        fontSize: "0.82rem",
                        lineHeight: 1.4,
                        "&:hover": { color: COLORS.red, textDecoration: "underline" },
                      }}
                    >
                      {link.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
        )}

        <Divider sx={{ my: 4, borderColor: COLORS.border }} />

        {/* TIER 3: Our Ecosystem Brands (admin → Footer) */}
        {OUR_BRANDS.length > 0 && (
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 800,
              color: COLORS.heading,
              fontSize: "0.92rem",
              mb: 1.5,
            }}
          >
            {brandsTitle}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
            {OUR_BRANDS.map((brand, idx) => (
              <Box
                key={idx}
                component="a"
                href={brand.href}
                sx={{
                  px: 1.75,
                  py: 0.6,
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.body,
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: COLORS.red,
                    color: COLORS.red,
                    backgroundColor: "#FEF2F2",
                  },
                }}
              >
                {brand.name}
              </Box>
            ))}
          </Box>
        </Box>
        )}

        {/* TIER 4: Know about VINI IAS & We Stand Out (PDF Page 6 & Screenshot 18.07.01 SEO block) */}
        <Box sx={{ mb: 5, p: { xs: 2.5, md: 3.5 }, borderRadius: "16px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}` }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: COLORS.heading, mb: 1 }}>
            Know about VINI IAS
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.muted, fontSize: "0.82rem", lineHeight: 1.6, mb: 2 }}>
            VINI IAS is an Indian EdTech platform that provides accessible &amp; comprehensive learning experiences to aspirants preparing for UPSC Civil Services, BPSC, State PCS, and other competitive examinations. We provide extensive study materials, NCERT solutions, previous year question papers, and daily answer writing guidance to empower thousands of students across the country.
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: COLORS.heading, mb: 1 }}>
            We Stand Out Because
          </Typography>
          <Typography variant="body2" sx={{ color: COLORS.muted, fontSize: "0.82rem", lineHeight: 1.6 }}>
            We provide students with intensive courses led by qualified &amp; experienced faculties and serving civil servant mentors. Vini IAS strives to make civil service preparation comprehensive, affordable, and accessible to students of all sections of society, transforming humble dreams into top ranks.
          </Typography>
        </Box>

        {/* Bottom Bar (PDF Page 6 & Screenshot 18.07.01) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            pt: 3,
            borderTop: `1px solid ${COLORS.border}`,
            fontSize: "0.82rem",
            color: COLORS.muted,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="/privacy-policy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="/terms-and-conditions" style={{ color: "inherit", textDecoration: "none" }}>
              Terms of Use
            </Link>
          </Box>

          <Typography variant="body2" sx={{ fontSize: { xs: "clamp(0.6rem, 3.1vw, 0.82rem)", sm: "0.82rem" }, whiteSpace: "nowrap", color: COLORS.muted, textTransform: { xs: "none", sm: "uppercase" } }}>
            Copyright © Vini Eduventure Pvt. LTD. | All rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
