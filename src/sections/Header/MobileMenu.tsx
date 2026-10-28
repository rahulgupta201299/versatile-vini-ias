"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  X as CloseIcon,
  ChevronRight,
  Plus,
  Search,
  Smartphone,
  GraduationCap,
  ShoppingCart,
  Download,
} from "lucide-react";
import { IconRenderer } from "@/components";
import { useSiteData } from "@/context/SiteDataContext";
import { externalLinkProps } from "@/utils/links";

import { COLORS } from "@/theme/colors";
import { openAuth } from "@/utils/events";
const RED = COLORS.red;
const INK = "#1F2937";
const MUTED = "#6B7280";
const LINE = "#EEF0F3";

/** Store link for the visitor's phone: App Store on iOS (when published), otherwise Google Play; falls back to the app section. */
function appInstallHref(links: { googlePlay: string; appStore: string }) {
  const ios = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent);

  if (ios && links.appStore !== "#") return links.appStore;

  if (links.googlePlay !== "#") return links.googlePlay;

  return "/#download";
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", color: "#374151", textTransform: "uppercase", mb: 1 }}>
    {children}
  </Typography>
);

interface MobileMenuProps {
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenExams: () => void;
}

export default function MobileMenu({ onClose, onOpenSearch, onOpenExams }: MobileMenuProps) {
  const { navigation, config } = useSiteData();
  const { navItems, mobileMenu, storeHref } = navigation;
  const allExamsLabel = navItems.find((n) => n.isMegaMenu)?.label || "All Exams";

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Top bar: logo · Vini Store · Login · close */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 1.5, height: 60, "@media (max-width: 359px)": { gap: 0.5, px: 1.25, "& a svg, & button:not([aria-label]) svg": { display: "none" } }, borderBottom: `1px solid ${LINE}`, flexShrink: 0 }}>
        <Box sx={{ position: "relative", width: 76, height: 32, mr: "auto", flexShrink: 0, "@media (max-width: 359px)": { width: 62 } }}>
          <Image src="/images/logo.png" alt="Vini IAS" fill sizes="76px" style={{ objectFit: "contain", objectPosition: "left" }} />
        </Box>
        <Box
          component={Link}
          href={storeHref}
          {...externalLinkProps({ href: storeHref })}
          onClick={onClose}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            height: 32,
            px: 1.25,
            borderRadius: "9999px",
            backgroundColor: COLORS.redTint,
            border: `1px solid ${COLORS.redBorder}`,
            color: RED,
            fontSize: "0.8rem",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <ShoppingCart size={14} /> Store
        </Box>
        <Box
          component="button"
          type="button"
          onClick={() => {
            onClose();
            openAuth();
          }}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            height: 32,
            px: 1.25,
            border: `1px solid ${COLORS.redBorder}`,
            borderRadius: "9999px",
            backgroundColor: COLORS.redTint,
            color: RED,
            fontSize: "0.8rem",
            fontWeight: 700,
            fontFamily: "inherit",
            cursor: "pointer",
            whiteSpace: "nowrap",
          }}
        >
          <GraduationCap size={14} /> Login
        </Box>
        <IconButton onClick={onClose} aria-label="Close menu" sx={{ color: INK, p: 0.75 }}>
          <CloseIcon size={22} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain", px: 2, pt: 2, pb: 3 }}>
        {/* Search */}
        <Box
          component="button"
          type="button"
          onClick={onOpenSearch}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1.25,
            height: 44,
            px: 1.5,
            mb: 1.5,
            border: `1px solid ${COLORS.borderLight}`,
            borderRadius: "10px",
            backgroundColor: "#FFFFFF",
            color: "#9CA3AF",
            fontSize: "0.9rem",
            fontFamily: "inherit",
            cursor: "text",
            textAlign: "left",
          }}
        >
          <Search size={18} color={MUTED} />
          Search for Courses, Notes etc.
        </Box>

        {/* Get the app */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.25, py: 1, mb: 2, borderRadius: "10px", backgroundColor: COLORS.redTint }}>
          <Smartphone size={20} color={RED} style={{ flexShrink: 0 }} />
          <Typography sx={{ flex: 1, minWidth: 0, fontWeight: 600, color: INK, fontSize: "0.76rem", lineHeight: 1.3 }}>
            Get App for
            <br />
            Better Experience
          </Typography>
          <Box
            component="a"
            href={appInstallHref(config.app)}
            {...externalLinkProps({ href: appInstallHref(config.app) })}
            onClick={onClose}
            sx={{
              flexShrink: 0,
              px: 1.25,
              py: 0.5,
              borderRadius: "9999px",
              backgroundColor: RED,
              color: "#FFFFFF",
              fontSize: "0.7rem",
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Install Now
          </Box>
        </Box>

        {/* All Exams */}
        <Box
          component="button"
          type="button"
          onClick={onOpenExams}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            py: 1.5,
            mb: 1,
            border: "none",
            borderTop: `1px solid ${LINE}`,
            borderBottom: `1px solid ${LINE}`,
            background: "none",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", color: "#374151", textTransform: "uppercase" }}>
            {allExamsLabel}
          </Typography>
          <Plus size={20} color={INK} />
        </Box>

        {/* 2-column sections */}
        {mobileMenu.map((section) => (
          <Box key={section.id} sx={{ pt: 1.5, pb: 1, borderBottom: `1px solid ${LINE}` }}>
            <SectionTitle>{section.title}</SectionTitle>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                columnGap: 1.5,
                // vertical divider between the two columns
                backgroundImage: `linear-gradient(${LINE}, ${LINE})`,
                backgroundSize: "1px 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {section.items.map((item) => (
                <Box
                  key={`${section.id}-${item.label}`}
                  component={Link}
                  href={item.href}
                  {...externalLinkProps(item)}
                  onClick={onClose}
                  sx={{ display: "flex", alignItems: "center", gap: 1, py: 1, minWidth: 0, width: "100%", textDecoration: "none", color: INK, "&:hover": { color: RED } }}
                >
                  <IconRenderer name={item.icon} size={17} color="#374151" />
                  <Typography component="span" sx={{ flex: 1, minWidth: 0, fontSize: "0.84rem", lineHeight: 1.3 }}>
                    {item.label}
                  </Typography>
                  <ChevronRight size={15} color="#9CA3AF" style={{ flexShrink: 0 }} />
                </Box>
              ))}
            </Box>
          </Box>
        ))}

      </Box>

      {/* Yellow "Download app" bar */}
      <Box
        component="a"
        href={appInstallHref(config.app)}
        {...externalLinkProps({ href: appInstallHref(config.app) })}
        onClick={onClose}
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.75,
          height: 40,
          backgroundColor: COLORS.yellow,
          color: "#000000",
          fontWeight: 700,
          fontSize: "0.8rem",
          textDecoration: "none",
          "&:hover": { backgroundColor: COLORS.yellowDark },
        }}
      >
        <Download size={15} /> Download VINI IAS App
        <ChevronRight size={15} />
      </Box>
    </Box>
  );
}
