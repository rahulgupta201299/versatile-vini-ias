"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronDown,
  ChevronRight,
  User,
  PhoneCall,
} from "lucide-react";
import { NAV_ITEMS, MEGA_MENU_CATEGORIES } from "@/data/navigation";
import { IconRenderer } from "@/components";

export interface HeaderProps {
  onOpenAuth: () => void;
}

export default function Header({ onOpenAuth }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close mega menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setMegaMenuOpen(false);
      }
    }

    if (megaMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [megaMenuOpen]);

  const selectedCategory =
    MEGA_MENU_CATEGORIES[activeCategoryIndex] || MEGA_MENU_CATEGORIES[0];

  return (
    <>
      {/* Main Top Navigation Bar (Identical to reference screenshots media_1791051086131.png & media_1791051109002.png) */}
      <Box
        component="header"
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 1200,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: megaMenuOpen
            ? "none"
            : "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Container>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: 70,
              gap: 2,
            }}
          >
            {/* Left: Brand Logo + "All Courses" Button */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1.5, sm: 2.5 }, flexShrink: 0 }}>
              {/* Brand Logo */}
              <Box
                component={Link}
                href="/"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    width: { xs: 110, sm: 130 },
                    height: 42,
                  }}
                >
                  <Image
                    src="/images/logo.png"
                    alt="Vini IAS"
                    fill
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </Box>
              </Box>

              {/* "All Courses" Button with Blue Outline & Chevron (Exact match to screenshot) */}
              <Button
                ref={buttonRef}
                onClick={() => setMegaMenuOpen((prev) => !prev)}
                endIcon={
                  <ChevronDown
                    size={17}
                    style={{
                      transform: megaMenuOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                      strokeWidth: 2.5,
                      marginLeft: 2,
                    }}
                  />
                }
                sx={{
                  border: "1.5px solid #3B82F6", // Blue outline matching screenshot
                  color: "#2563EB",
                  backgroundColor: megaMenuOpen ? "#EFF6FF" : "#FFFFFF",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "0.92rem",
                  textTransform: "none",
                  px: { xs: 1.5, sm: 2.2 },
                  py: 0.8,
                  boxShadow: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#1D4ED8",
                    backgroundColor: "#EFF6FF",
                    color: "#1D4ED8",
                    boxShadow: "none",
                  },
                }}
              >
                All Courses
              </Button>
            </Box>

            {/* Middle: Horizontal Nav Links (Matching screenshot format) */}
            <Box
              sx={{
                display: { xs: "none", lg: "flex" },
                alignItems: "center",
                gap: { lg: 2.2, xl: 3 },
                flexWrap: "nowrap",
              }}
            >
              {NAV_ITEMS.filter((item) => !item.isMegaMenu).map((item) => (
                <Box
                  key={item.id}
                  component={Link}
                  href={item.href}
                  sx={{
                    color: "#1E293B",
                    fontWeight: 600,
                    fontSize: "0.93rem",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    py: 1,
                    transition: "color 0.15s ease",
                    "&:hover": {
                      color: "#2563EB",
                    },
                  }}
                >
                  {item.label}
                </Box>
              ))}
            </Box>

            {/* Right: Dark "Login/Register" Button (Matching screenshot, search removed) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexShrink: 0 }}>
              <Button
                variant="contained"
                onClick={onOpenAuth}
                sx={{
                  backgroundColor: "#1F242D", // Dark charcoal from screenshot
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  px: { xs: 2, sm: 2.75 },
                  py: 1.05,
                  borderRadius: "8px",
                  boxShadow: "none",
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s ease",
                  "&:hover": {
                    backgroundColor: "#0F172A",
                    boxShadow: "0 4px 12px rgba(15, 23, 42, 0.2)",
                  },
                }}
              >
                Login/Register
              </Button>

              {/* Mobile Menu Hamburger */}
              <IconButton
                onClick={() => setMobileOpen(true)}
                sx={{
                  display: { xs: "flex", lg: "none" },
                  color: "#1E293B",
                  ml: 0.5,
                }}
                aria-label="Open mobile menu"
              >
                <MenuIcon size={24} />
              </IconButton>
            </Box>
          </Box>
        </Container>

        {/* Mega Menu Dropdown (Exact replicate of media_1791051086131.png & media_1791051109002.png) */}
        {megaMenuOpen && (
          <Box
            ref={megaMenuRef}
            sx={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
              borderBottom: "1px solid #E5E7EB",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.22)",
              zIndex: 1300,
              animation: "fadeInDown 0.18s ease-out",
              "@keyframes fadeInDown": {
                "0%": { opacity: 0, transform: "translateY(-6px)" },
                "100%": { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            <Container sx={{ p: 0 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", md: "310px 1fr" },
                  minHeight: 440,
                }}
              >
                {/* Left Categories Rail */}
                <Box
                  sx={{
                    borderRight: "1px solid #F1F5F9",
                    py: 1.5,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {MEGA_MENU_CATEGORIES.map((cat, idx) => {
                    const isSelected = activeCategoryIndex === idx;
                    return (
                      <Box
                        key={cat.id}
                        onMouseEnter={() => setActiveCategoryIndex(idx)}
                        onClick={() => setActiveCategoryIndex(idx)}
                        sx={{
                          py: 1.6,
                          px: 3,
                          cursor: "pointer",
                          backgroundColor: isSelected ? "#F8F9FA" : "transparent",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          transition: "background 0.15s ease",
                          "&:hover": {
                            backgroundColor: "#F8F9FA",
                          },
                        }}
                      >
                        <Box sx={{ pr: 1 }}>
                          <Typography
                            variant="subtitle2"
                            sx={{
                              fontWeight: isSelected ? 700 : 600,
                              color: isSelected ? "#0F172A" : "#334155",
                              fontSize: "0.96rem",
                              lineHeight: 1.25,
                            }}
                          >
                            {cat.title}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#64748B",
                              display: "block",
                              fontSize: "0.78rem",
                              mt: 0.35,
                              lineHeight: 1.35,
                            }}
                          >
                            {cat.subtitle}
                          </Typography>
                        </Box>

                        {/* Chevron right on active category matching Screenshot media_1791051109002.png */}
                        {isSelected && (
                          <ChevronRight size={17} color="#475569" style={{ flexShrink: 0 }} />
                        )}
                      </Box>
                    );
                  })}
                </Box>

                {/* Right Area: 3-Column Grid of White Cards (Matching both screenshots) */}
                <Box
                  sx={{
                    p: { xs: 2.5, md: 3.5 },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "grid",
                      gridTemplateColumns: {
                        xs: "1fr",
                        sm: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                      },
                      gap: 2,
                    }}
                  >
                    {selectedCategory.courses.map((course) => (
                      <Box
                        key={course.id}
                        component={Link}
                        href={course.href}
                        onClick={() => setMegaMenuOpen(false)}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          p: "14px 18px",
                          borderRadius: "12px",
                          backgroundColor: "#FFFFFF",
                          border: "1px solid #E5E7EB",
                          textDecoration: "none",
                          color: "inherit",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                          transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                          cursor: "pointer",
                          minHeight: 62,
                          "&:hover": {
                            borderColor: "#3B82F6",
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 18px rgba(37, 99, 235, 0.1)",
                          },
                        }}
                      >
                        {/* Colorful Icon Container (Matching the colorful icons in screenshots) */}
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "10px",
                            backgroundColor: course.iconBg || "#EFF6FF",
                            color: course.iconColor || "#2563EB",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <IconRenderer
                            name={course.icon}
                            size={21}
                            color={course.iconColor || "#2563EB"}
                          />
                        </Box>

                        {/* Title in bold black text */}
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 700,
                            color: "#1E293B",
                            fontSize: "0.96rem",
                            lineHeight: 1.25,
                          }}
                        >
                          {course.title}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        )}
      </Box>

      {/* Dimmed Backdrop when Mega Menu is open */}
      {megaMenuOpen && (
        <Box
          onClick={() => setMegaMenuOpen(false)}
          sx={{
            position: "fixed",
            top: 70,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15, 23, 42, 0.45)",
            backdropFilter: "blur(2px)",
            zIndex: 1150,
          }}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: "320px", maxWidth: "85vw", p: 2.5 },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Box sx={{ position: "relative", width: 120, height: 38 }}>
            <Image src="/images/logo.png" alt="Vini IAS" fill style={{ objectFit: "contain" }} />
          </Box>
          <IconButton onClick={() => setMobileOpen(false)}>
            <CloseIcon size={22} />
          </IconButton>
        </Box>

        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            setMobileOpen(false);
            onOpenAuth();
          }}
          startIcon={<User size={18} />}
          sx={{
            backgroundColor: "#1F242D",
            color: "#FFFFFF",
            fontWeight: 700,
            mb: 3,
            py: 1.2,
            borderRadius: "8px",
            textTransform: "none",
          }}
        >
          Login/Register
        </Button>

        <Typography variant="caption" sx={{ fontWeight: 800, color: "#94A3B8", textTransform: "uppercase" }}>
          Navigation
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, mt: 1, mb: 3 }}>
          {NAV_ITEMS.map((item) => (
            <Box
              key={item.id}
              component={Link}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              sx={{
                py: 1.2,
                px: 1.5,
                borderRadius: "8px",
                textDecoration: "none",
                color: "#1E293B",
                fontWeight: 600,
                fontSize: "0.95rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                "&:hover": { backgroundColor: "#F8FAFC", color: "#2563EB" },
              }}
            >
              <span>{item.label}</span>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: "auto", pt: 2, borderTop: "1px solid #E2E8F0" }}>
          <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.85rem", mb: 1 }}>
            Admission Helpline
          </Typography>
          <Button
            component="a"
            href="tel:+918544078245"
            fullWidth
            variant="outlined"
            startIcon={<PhoneCall size={16} />}
            sx={{
              borderColor: "#3B82F6",
              color: "#2563EB",
              fontWeight: 700,
              py: 1,
              borderRadius: "8px",
              textTransform: "none",
            }}
          >
            Call +91 8544 078245
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
