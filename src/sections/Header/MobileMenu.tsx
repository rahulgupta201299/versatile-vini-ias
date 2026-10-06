"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import {
  X as CloseIcon,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Smartphone,
  UserRound,
  ShoppingCart,
  Download,
} from "lucide-react";
import { IconRenderer } from "@/components";
import { MOBILE_MENU_SECTIONS, MOBILE_MENU_DROPDOWN_IDS, NAV_ITEMS, STORE_HREF } from "@/data/navigation";
import { APP_STORE_LINKS } from "@/data/app";

const RED = "#FE0034";
const INK = "#1F2937";
const MUTED = "#6B7280";
const LINE = "#EEF0F3";

const ALL_EXAMS_LABEL = NAV_ITEMS.find((n) => n.isMegaMenu)?.label ?? "All Exams";
const DROPDOWNS = MOBILE_MENU_DROPDOWN_IDS.map((id) => NAV_ITEMS.find((n) => n.id === id)).filter(
  (n): n is NonNullable<typeof n> => Boolean(n?.children?.length)
);

/** Store link for the visitor's phone (falls back to the app section). */
function appInstallHref() {
  if (typeof navigator === "undefined") return "#download";
  const ua = navigator.userAgent;
  if (/android/i.test(ua) && APP_STORE_LINKS.googlePlay !== "#") return APP_STORE_LINKS.googlePlay;
  if (/iphone|ipad|ipod/i.test(ua) && APP_STORE_LINKS.appStore !== "#") return APP_STORE_LINKS.appStore;
  return "#download";
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", color: "#374151", textTransform: "uppercase", mb: 1 }}>
    {children}
  </Typography>
);

interface MobileMenuProps {
  onClose: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  onOpenExams: () => void;
}

export default function MobileMenu({ onClose, onOpenAuth, onOpenSearch, onOpenExams }: MobileMenuProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Top bar: logo · Vini Store · Login · close */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 2, height: 64, borderBottom: `1px solid ${LINE}`, flexShrink: 0 }}>
        <Box sx={{ position: "relative", width: 92, height: 36, mr: "auto" }}>
          <Image src="/images/logo.png" alt="Vini IAS" fill sizes="92px" style={{ objectFit: "contain", objectPosition: "left" }} />
        </Box>
        <Box
          component={Link}
          href={STORE_HREF}
          onClick={onClose}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            height: 32,
            px: 1.25,
            borderRadius: "9999px",
            backgroundColor: "#FFF0F3",
            border: "1px solid #FFCCD6",
            color: RED,
            fontSize: "0.8rem",
            fontWeight: 700,
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          <ShoppingCart size={14} /> Vini Store
        </Box>
        <IconButton onClick={onClose} aria-label="Close menu" sx={{ color: INK }}>
          <CloseIcon size={22} />
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, overflowY: "auto", px: 2, pt: 2, pb: 3 }}>
        {/* Login / Sign up card */}
        <Box
          component="button"
          type="button"
          onClick={() => {
            onClose();
            onOpenAuth();
          }}
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            p: 1.5,
            mb: 1.5,
            border: "none",
            borderRadius: "12px",
            backgroundColor: "#F3F4F8",
            textAlign: "left",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          <Box sx={{ width: 40, height: 40, borderRadius: "50%", backgroundColor: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <UserRound size={20} color={INK} />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, color: INK, fontSize: "0.98rem" }}>Login / Sign Up</Typography>
            <Typography sx={{ color: MUTED, fontSize: "0.8rem" }}>Get personalized learning experience</Typography>
          </Box>
          <ChevronRight size={18} color={MUTED} />
        </Box>

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
            border: "1px solid #E5E7EB",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, p: 1.5, mb: 2, borderRadius: "12px", backgroundColor: "#FFF0F3" }}>
          <Smartphone size={26} color={RED} style={{ flexShrink: 0 }} />
          <Typography sx={{ flex: 1, minWidth: 0, fontWeight: 600, color: INK, fontSize: "0.88rem", lineHeight: 1.3 }}>
            Get App for Better Experience
          </Typography>
          <Box
            component="a"
            href={appInstallHref()}
            onClick={onClose}
            sx={{
              flexShrink: 0,
              px: 1.75,
              py: 0.9,
              borderRadius: "9999px",
              backgroundColor: RED,
              color: "#FFFFFF",
              fontSize: "0.8rem",
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
            {ALL_EXAMS_LABEL}
          </Typography>
          <Plus size={20} color={INK} />
        </Box>

        {/* 2-column sections */}
        {MOBILE_MENU_SECTIONS.map((section) => (
          <Box key={section.id} sx={{ pt: 1.5, pb: 1, borderBottom: `1px solid ${LINE}` }}>
            <SectionTitle>{section.title}</SectionTitle>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                columnGap: 2,
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
                  onClick={onClose}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    py: 1.1,
                    minWidth: 0,
                    textDecoration: "none",
                    color: INK,
                    "&:hover": { color: RED },
                  }}
                >
                  <IconRenderer name={item.icon} size={19} color="#374151" />
                  <Typography component="span" sx={{ flex: 1, minWidth: 0, fontSize: "0.88rem", lineHeight: 1.3 }}>
                    {item.label}
                  </Typography>
                  <ChevronRight size={15} color="#9CA3AF" style={{ flexShrink: 0 }} />
                </Box>
              ))}
            </Box>
          </Box>
        ))}

        {/* Last section: dropdowns */}
        <Box sx={{ pt: 1.5 }}>
          <SectionTitle>Courses &amp; Centres</SectionTitle>
          {DROPDOWNS.map((item) => {
            const open = openDropdown === item.id;
            return (
              <Box key={item.id} sx={{ borderBottom: `1px solid ${LINE}` }}>
                <Box
                  component="button"
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenDropdown(open ? null : item.id)}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    py: 1.4,
                    border: "none",
                    background: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    color: open ? RED : INK,
                    textAlign: "left",
                  }}
                >
                  {item.label}
                  <ChevronDown size={18} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                </Box>
                <Collapse in={open} timeout={200} unmountOnExit>
                  <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, pb: 1.25, pl: 0.5 }}>
                    {item.children!.map((child) => (
                      <Box component="li" key={child.label}>
                        <Box
                          component={Link}
                          href={child.href}
                          onClick={onClose}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                            py: 0.85,
                            color: "#4B5563",
                            fontSize: "0.88rem",
                            textDecoration: "none",
                            "&::before": { content: '""', width: 6, height: 6, borderRadius: "50%", backgroundColor: RED, flexShrink: 0 },
                            "&:hover": { color: RED },
                          }}
                        >
                          {child.label}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* Yellow "Download app" bar */}
      <Box
        component="a"
        href={appInstallHref()}
        onClick={onClose}
        sx={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          height: 52,
          backgroundColor: "#FFE51F",
          color: "#000000",
          fontWeight: 700,
          fontSize: "0.95rem",
          textDecoration: "none",
          "&:hover": { backgroundColor: "#F2D500" },
        }}
      >
        <Download size={18} /> Download VINI IAS App
        <ChevronRight size={18} />
      </Box>
    </Box>
  );
}
