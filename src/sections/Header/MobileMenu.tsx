"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  X as CloseIcon,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Smartphone,
  GraduationCap,
  ShoppingCart,
  Download,
} from "lucide-react";
import { IconRenderer } from "@/components";
import { MOBILE_MENU_SECTIONS, NAV_ITEMS, STORE_HREF } from "@/data/navigation";
import { APP_STORE_LINKS } from "@/data/app";

const RED = "#FE0034";
const INK = "#1F2937";
const MUTED = "#6B7280";
const LINE = "#EEF0F3";

const ALL_EXAMS_LABEL = NAV_ITEMS.find((n) => n.isMegaMenu)?.label ?? "All Exams";
const childrenOf = (id?: string) => (id ? NAV_ITEMS.find((n) => n.id === id)?.children ?? [] : []);

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
  const [openTile, setOpenTile] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Top bar: logo · Vini Store · Login · close */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, px: 1.5, height: 60, "@media (max-width: 359px)": { gap: 0.5, px: 1.25, "& a svg, & button:not([aria-label]) svg": { display: "none" } }, borderBottom: `1px solid ${LINE}`, flexShrink: 0 }}>
        <Box sx={{ position: "relative", width: 76, height: 32, mr: "auto", flexShrink: 0, "@media (max-width: 359px)": { width: 62 } }}>
          <Image src="/images/logo.png" alt="Vini IAS" fill sizes="76px" style={{ objectFit: "contain", objectPosition: "left" }} />
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
          <ShoppingCart size={14} /> Store
        </Box>
        <Box
          component="button"
          type="button"
          onClick={() => {
            onClose();
            onOpenAuth();
          }}
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.5,
            height: 32,
            px: 1.25,
            border: "1px solid #FFCCD6",
            borderRadius: "9999px",
            backgroundColor: "#FFF0F3",
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

      <Box sx={{ flex: 1, overflowY: "auto", px: 2, pt: 2, pb: 3 }}>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.25, py: 1, mb: 2, borderRadius: "10px", backgroundColor: "#FFF0F3" }}>
          <Smartphone size={20} color={RED} style={{ flexShrink: 0 }} />
          <Typography sx={{ flex: 1, minWidth: 0, fontWeight: 600, color: INK, fontSize: "0.76rem", lineHeight: 1.3 }}>
            Get App for
            <br />
            Better Experience
          </Typography>
          <Box
            component="a"
            href={appInstallHref()}
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
                columnGap: 1.5,
                // vertical divider between the two columns
                backgroundImage: `linear-gradient(${LINE}, ${LINE})`,
                backgroundSize: "1px 100%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {section.items.map((item, i) => {
                const kids = childrenOf(item.dropdownId);
                const key = `${section.id}-${item.label}`;
                const isOpen = openTile === key;
                const rowEnd = Math.min(i - (i % 2) + 1, section.items.length - 1);
                const openInRow = section.items
                  .slice(i - (i % 2), rowEnd + 1)
                  .map((it) => `${section.id}-${it.label}`)
                  .find((k) => k === openTile);
                const openItem = openInRow ? section.items.find((it) => `${section.id}-${it.label}` === openInRow) : undefined;
                const tileSx = {
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  py: 1,
                  minWidth: 0,
                  width: "100%",
                  border: "none",
                  background: "none",
                  textAlign: "left" as const,
                  fontFamily: "inherit",
                  cursor: "pointer",
                  textDecoration: "none",
                  color: isOpen ? RED : INK,
                  "&:hover": { color: RED },
                };
                const content = (
                  <>
                    <IconRenderer name={item.icon} size={17} color={isOpen ? RED : "#374151"} />
                    <Typography component="span" sx={{ flex: 1, minWidth: 0, fontSize: "0.84rem", lineHeight: 1.3, fontWeight: isOpen ? 600 : 400 }}>
                      {item.label}
                    </Typography>
                    {kids.length ? (
                      <ChevronDown size={15} color={isOpen ? RED : "#9CA3AF"} style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                    ) : (
                      <ChevronRight size={15} color="#9CA3AF" style={{ flexShrink: 0 }} />
                    )}
                  </>
                );
                return (
                  <React.Fragment key={key}>
                    {kids.length ? (
                      <Box component="button" type="button" aria-expanded={isOpen} onClick={() => setOpenTile(isOpen ? null : key)} sx={tileSx}>
                        {content}
                      </Box>
                    ) : (
                      <Box component={Link} href={item.href} onClick={onClose} sx={tileSx}>
                        {content}
                      </Box>
                    )}
                    {/* Dropdown details open full-width right under the tile's row */}
                    {i === rowEnd && openItem && (
                      <Box
                        sx={{
                          gridColumn: "1 / -1",
                          mb: 1,
                          p: 1.25,
                          borderRadius: "10px",
                          backgroundColor: "#FFF5F7",
                          border: "1px solid #FFE0E6",
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 0.25 }}>
                          {childrenOf(openItem.dropdownId).map((child) => (
                            <Box component="li" key={child.label}>
                              <Box
                                component={Link}
                                href={child.href}
                                onClick={onClose}
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                  py: 0.75,
                                  color: "#374151",
                                  fontSize: "0.85rem",
                                  textDecoration: "none",
                                  "&::before": { content: '""', width: 5, height: 5, borderRadius: "50%", backgroundColor: RED, flexShrink: 0 },
                                  "&:hover": { color: RED },
                                }}
                              >
                                {child.label}
                              </Box>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    )}
                  </React.Fragment>
                );
              })}
            </Box>
          </Box>
        ))}

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
          gap: 0.75,
          height: 40,
          backgroundColor: "#FFE51F",
          color: "#000000",
          fontWeight: 700,
          fontSize: "0.8rem",
          textDecoration: "none",
          "&:hover": { backgroundColor: "#F2D500" },
        }}
      >
        <Download size={15} /> Download VINI IAS App
        <ChevronRight size={15} />
      </Box>
    </Box>
  );
}
