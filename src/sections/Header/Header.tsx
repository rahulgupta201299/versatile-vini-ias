"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import Collapse from "@mui/material/Collapse";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Search,
  ShoppingCart,
  GraduationCap,
} from "lucide-react";
import { NAV_ITEMS, MEGA_MENU_CATEGORIES, STORE_HREF } from "@/data/navigation";
import { IconRenderer } from "@/components";
import SearchDialog from "@/components/SearchDialog";
import MobileMenu from "./MobileMenu";

/* Layout references: pw.live (menu, All Courses panel) and the header screenshots provided. */
const RED = "#FE0034";
const RED_DARK = "#CC002A";
const RED_TINT = "#FFF0F3"; // light red (Store button)
const RED_TINT_BORDER = "#FFCCD6";
const HEADER_H = { xs: 64, lg: 72 };
/** Logo height — the All Exams pill and the header buttons match it. */
const LOGO_H = { xs: 36, sm: 42 };

interface HeaderProps {
  onOpenAuth: () => void;
}

const NAV_LINKS = NAV_ITEMS.filter((item) => !item.isMegaMenu);
/** Desktop shows the first few links inline; the rest go under "More". */
const INLINE_LINKS = 5;
const PRIMARY_LINKS = NAV_LINKS.slice(0, INLINE_LINKS);
const MORE_LINKS = NAV_LINKS.slice(INLINE_LINKS);
const ALL_COURSES_LABEL = NAV_ITEMS.find((item) => item.isMegaMenu)?.label ?? "All Exams";

const pillBase = {
  borderRadius: "9999px",
  textTransform: "none" as const,
  fontWeight: 700,
  boxShadow: "none",
  whiteSpace: "nowrap" as const,
  minWidth: 0,
};

export default function Header({ onOpenAuth }: HeaderProps) {
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerView, setDrawerView] = useState<"menu" | "courses">("menu");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [moreAnchor, setMoreAnchor] = useState<HTMLElement | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const coursesButtonRef = useRef<HTMLButtonElement>(null);

  // Close desktop mega menu on outside click / Escape
  useEffect(() => {
    if (!megaMenuOpen) return;
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (!megaMenuRef.current?.contains(t) && !coursesButtonRef.current?.contains(t)) setMegaMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [megaMenuOpen]);

  // Ctrl/⌘ + K opens search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setMegaMenuOpen(false);
        setSearchOpen(true);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /** "All Courses" pill: dropdown on desktop, pw-style full panel on smaller screens. */
  const onCoursesClick = () => {
    if (window.matchMedia("(min-width: 1200px)").matches) {
      setMegaMenuOpen((prev) => !prev);
    } else {
      setDrawerView("courses");
      setDrawerOpen(true);
    }
  };

  const openMenu = () => {
    setDrawerView("menu");
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
    setExpandedCategory(null);
  };

  const selectedCategory = MEGA_MENU_CATEGORIES[activeCategoryIndex] || MEGA_MENU_CATEGORIES[0];

  return (
    <>
      <Box
        component="header"
        sx={{
          // Fixed menu bar — always visible while scrolling
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1200,
          backgroundColor: "#FFFFFF",
          borderBottom: "1px solid #E5E7EB",
          boxShadow: megaMenuOpen ? "none" : "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        <Container>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: HEADER_H, gap: { xs: 1, sm: 2 } }}>
            {/* Left: logo + All Courses pill */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 2 }, flexShrink: 0 }}>
              <Box component={Link} href="/" aria-label="Vini IAS home" sx={{ display: "flex", flexShrink: 0 }}>
                <Box sx={{ position: "relative", width: { xs: 88, sm: 102 }, height: LOGO_H }}>
                  <Image src="/images/logo.png" alt="Vini IAS" fill sizes="120px" style={{ objectFit: "contain", objectPosition: "left" }} priority />
                </Box>
              </Box>

              <Button
                ref={coursesButtonRef}
                onClick={onCoursesClick}
                aria-haspopup="true"
                aria-expanded={megaMenuOpen}
                endIcon={
                  <ChevronDown
                    size={16}
                    style={{ transform: megaMenuOpen ? "rotate(180deg)" : "none", transition: "transform .25s ease" }}
                  />
                }
                sx={{
                  ...pillBase,
                  flexShrink: 0,
                  fontWeight: 600,
                  color: "#374151",
                  border: "1.5px solid #E5E7EB",
                  backgroundColor: megaMenuOpen ? "#FFF0F3" : "#FFFFFF",
                  fontSize: { xs: "0.82rem", sm: "0.95rem" },
                  px: { xs: 1.25, sm: 2.25 },
                  height: LOGO_H,
                  "& .MuiButton-endIcon": { ml: 0.5 },
                  "&:hover": { borderColor: RED, color: RED, backgroundColor: "#FFF0F3" },
                }}
              >
                {ALL_COURSES_LABEL}
              </Button>
            </Box>

            {/* Middle: nav links (desktop) */}
            <Box component="nav" aria-label="Main" sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", gap: { lg: 2, xl: 2.75 } }}>
              {PRIMARY_LINKS.map((item) => (
                <NavLinkWithDropdown key={item.id} item={item} />
              ))}
              {MORE_LINKS.length > 0 && (
                <>
                  <Box
                    component="button"
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={Boolean(moreAnchor)}
                    onClick={(e: React.MouseEvent<HTMLElement>) => setMoreAnchor(e.currentTarget)}
                    sx={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 0.4,
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      color: moreAnchor ? RED : "#374151",
                      fontWeight: 600,
                      fontSize: "0.93rem",
                      p: 0,
                      "&:hover": { color: RED },
                    }}
                  >
                    More
                    <ChevronDown size={16} style={{ transform: moreAnchor ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                  </Box>
                  <Menu
                    anchorEl={moreAnchor}
                    open={Boolean(moreAnchor)}
                    onClose={() => setMoreAnchor(null)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    slotProps={{ paper: { sx: { mt: 1.5, borderRadius: "12px", minWidth: 240, maxHeight: "70vh", boxShadow: "0 12px 32px rgba(15,23,42,.14)" } } }}
                  >
                    {MORE_LINKS.map((item) =>
                      item.children?.length ? (
                        <Box key={item.id} sx={{ px: 2, pt: 1.25, pb: 0.5, "&:not(:first-of-type)": { borderTop: "1px solid #F1F5F9", mt: 0.5 } }}>
                          <Typography sx={{ fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.06em", color: "#9CA3AF", textTransform: "uppercase", mb: 0.5 }}>
                            {item.label}
                          </Typography>
                          {item.children.map((child) => (
                            <Box
                              key={child.label}
                              component={Link}
                              href={child.href}
                              onClick={() => setMoreAnchor(null)}
                              sx={{ display: "block", py: 0.6, color: "#374151", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none", "&:hover": { color: RED } }}
                            >
                              {child.label}
                            </Box>
                          ))}
                        </Box>
                      ) : (
                        <MenuItem
                          key={item.id}
                          component={Link}
                          href={item.href}
                          onClick={() => setMoreAnchor(null)}
                          sx={{ fontWeight: 600, fontSize: "0.93rem", color: "#374151", py: 1.25, "&:hover": { color: RED, backgroundColor: "#FFF5F7" } }}
                        >
                          {item.label}
                        </MenuItem>
                      )
                    )}
                  </Menu>
                </>
              )}
            </Box>

            {/* Right: search, Store (yellow), Login (red, desktop) / hamburger (mobile) */}
            <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 0.75, sm: 1.25 }, flexShrink: 0 }}>
              <IconButton
                onClick={() => setSearchOpen(true)}
                aria-label="Search"
                sx={{ width: LOGO_H, height: LOGO_H, backgroundColor: "#F5F5F5", color: "#4B5563", "&:hover": { backgroundColor: "#ECECEC" } }}
              >
                <Search size={20} />
              </IconButton>

              <Button
                component={Link}
                href={STORE_HREF}
                startIcon={<ShoppingCart size={18} />}
                aria-label="Store"
                sx={{
                  ...pillBase,
                  height: LOGO_H,
                  px: { xs: 1.1, sm: 2.25 },
                  fontSize: "0.95rem",
                  color: RED,
                  backgroundColor: RED_TINT,
                  border: `1.5px solid ${RED_TINT_BORDER}`,
                  "& .MuiButton-startIcon": { mr: { xs: 0, sm: 0.75 }, ml: 0 },
                  "&:hover": { backgroundColor: "#FFE0E6", borderColor: "#FFB3C2" },
                  // very small phones: Store stays available in the slide menu
                  "@media (max-width: 359px)": { display: "none" },
                }}
              >
                <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                  Store
                </Box>
              </Button>

              <Button
                onClick={onOpenAuth}
                startIcon={<GraduationCap size={19} />}
                sx={{
                  ...pillBase,
                  display: { xs: "none", lg: "inline-flex" },
                  height: LOGO_H,
                  px: 2.5,
                  fontSize: "0.95rem",
                  color: "#FFFFFF",
                  backgroundColor: RED,
                  "&:hover": { backgroundColor: RED_DARK, boxShadow: "0 4px 12px rgba(254,0,52,.25)" },
                }}
              >
                Login
              </Button>

              <IconButton
                onClick={openMenu}
                aria-label="Open menu"
                sx={{ display: { xs: "inline-flex", lg: "none" }, width: LOGO_H, height: LOGO_H, backgroundColor: "#F5F5F5", color: "#1F2937" }}
              >
                <MenuIcon size={22} />
              </IconButton>
            </Box>
          </Box>
        </Container>

        {/* Desktop mega menu */}
        {megaMenuOpen && (
          <Box
            ref={megaMenuRef}
            sx={{
              display: { xs: "none", lg: "block" },
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: "#FFFFFF",
              borderBottom: "1px solid #E5E7EB",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.22)",
              zIndex: 1300,
              animation: "fadeInDown .18s ease-out",
              "@keyframes fadeInDown": { from: { opacity: 0, transform: "translateY(-6px)" }, to: { opacity: 1, transform: "none" } },
            }}
          >
            <Container sx={{ p: 0 }}>
              <Box sx={{ display: "grid", gridTemplateColumns: "310px 1fr", minHeight: 440 }}>
                <Box sx={{ borderRight: "1px solid #F1F5F9", py: 1.5 }}>
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
                          backgroundColor: isSelected ? "#FFF5F7" : "transparent",
                          borderLeft: `3px solid ${isSelected ? RED : "transparent"}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          "&:hover": { backgroundColor: "#FFF5F7" },
                        }}
                      >
                        <Box sx={{ pr: 1 }}>
                          <Typography sx={{ fontWeight: isSelected ? 700 : 600, color: isSelected ? "#0F172A" : "#334155", fontSize: "0.96rem", lineHeight: 1.25 }}>
                            {cat.title}
                          </Typography>
                          <Typography sx={{ color: "#64748B", fontSize: "0.78rem", mt: 0.35, lineHeight: 1.35 }}>{cat.subtitle}</Typography>
                        </Box>
                        {isSelected && <ChevronRight size={17} color={RED} style={{ flexShrink: 0 }} />}
                      </Box>
                    );
                  })}
                </Box>
                <Box sx={{ p: 3.5 }}>
                  <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
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
                          border: "1px solid #E5E7EB",
                          textDecoration: "none",
                          color: "inherit",
                          minHeight: 62,
                          transition: "all .2s ease",
                          "&:hover": { borderColor: RED, transform: "translateY(-2px)", boxShadow: "0 8px 18px rgba(254,0,52,.10)" },
                        }}
                      >
                        <Box
                          sx={{
                            width: 38,
                            height: 38,
                            borderRadius: "10px",
                            backgroundColor: course.iconBg || "#FFF0F3",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <IconRenderer name={course.icon} size={21} color={course.iconColor || RED} />
                        </Box>
                        <Typography sx={{ fontWeight: 700, color: "#1E293B", fontSize: "0.96rem", lineHeight: 1.25 }}>{course.title}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Container>
          </Box>
        )}
      </Box>

      {/* Spacer so page content starts below the fixed header */}
      <Box aria-hidden sx={{ height: HEADER_H, flexShrink: 0 }} />

      {/* Backdrop for desktop mega menu */}
      {megaMenuOpen && (
        <Box
          onClick={() => setMegaMenuOpen(false)}
          sx={{
            display: { xs: "none", lg: "block" },
            position: "fixed",
            top: 72,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(15,23,42,.45)",
            backdropFilter: "blur(2px)",
            zIndex: 1150,
          }}
        />
      )}

      {/* Left slide menu (tablet / mobile) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{ sx: { width: { xs: "86%", sm: 400 }, maxWidth: 400, display: "flex", flexDirection: "column" } }}
      >
        {drawerView === "menu" ? (
          <MobileMenu
            onClose={closeDrawer}
            onOpenAuth={onOpenAuth}
            onOpenSearch={() => {
              closeDrawer();
              setSearchOpen(true);
            }}
            onOpenExams={() => setDrawerView("courses")}
          />
        ) : (
          <>
            {/* pw.live-style "All Courses" panel */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, px: 1.5, height: 72, borderBottom: "1px solid #EEF0F3", flexShrink: 0 }}>
              <IconButton onClick={() => setDrawerView("menu")} aria-label="Back to menu">
                <ChevronLeft size={24} />
              </IconButton>
              <Typography sx={{ flex: 1, fontWeight: 700, fontSize: "1.2rem", color: "#111827" }}>{ALL_COURSES_LABEL}</Typography>
              <IconButton onClick={closeDrawer} aria-label="Close menu">
                <CloseIcon size={24} />
              </IconButton>
            </Box>

            <Box sx={{ flex: 1, overflowY: "auto" }}>
              {MEGA_MENU_CATEGORIES.map((cat) => {
                const open = expandedCategory === cat.id;
                return (
                  <Box key={cat.id} sx={{ borderBottom: "1px solid #EEF0F3" }}>
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setExpandedCategory(open ? null : cat.id)}
                      aria-expanded={open}
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        textAlign: "left",
                        px: 2.5,
                        py: 2,
                        border: "none",
                        background: open ? "#FFF5F7" : "#FFFFFF",
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 700, fontSize: "1.02rem", color: "#111827", mb: 0.4 }}>{cat.title}</Typography>
                        <Typography sx={{ fontSize: "0.86rem", color: "#6B7280", lineHeight: 1.45 }}>
                          {cat.courses.map((c) => c.title).join(", ")}
                        </Typography>
                      </Box>
                      <ChevronDown size={22} color="#374151" style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
                    </Box>
                    <Collapse in={open} timeout={220} unmountOnExit>
                      <Box sx={{ px: 2.5, pb: 2, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1 }}>
                        {cat.courses.map((course) => (
                          <Box
                            key={course.id}
                            component={Link}
                            href={course.href}
                            onClick={closeDrawer}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.25,
                              p: "10px 12px",
                              borderRadius: "10px",
                              border: "1px solid #E5E7EB",
                              textDecoration: "none",
                              color: "#1E293B",
                              fontWeight: 600,
                              fontSize: "0.9rem",
                              "&:hover": { borderColor: RED, color: RED },
                            }}
                          >
                            <IconRenderer name={course.icon} size={18} color={course.iconColor || RED} />
                            {course.title}
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  </Box>
                );
              })}
            </Box>
          </>
        )}
      </Drawer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

/** Desktop nav link; items with children show a dropdown on hover / keyboard focus. */
function NavLinkWithDropdown({ item }: { item: (typeof NAV_ITEMS)[number] }) {
  const hasChildren = Boolean(item.children?.length);
  return (
    <Box
      sx={{
        position: "relative",
        "&:hover > .nav-dd, &:focus-within > .nav-dd": { opacity: 1, visibility: "visible", transform: "translate(-50%, 0)" },
        "&:hover > a, &:focus-within > a": { color: RED },
      }}
    >
      <Box
        component={Link}
        href={item.href}
        aria-haspopup={hasChildren ? "true" : undefined}
        sx={{
          display: "inline-flex",
          alignItems: "center",
          gap: 0.4,
          color: "#374151",
          fontWeight: 600,
          fontSize: "0.93rem",
          textDecoration: "none",
          whiteSpace: "nowrap",
          py: 2.5,
          transition: "color .15s ease",
        }}
      >
        {item.label}
        {hasChildren && <ChevronDown size={15} />}
      </Box>
      {hasChildren && (
        <Box
          className="nav-dd"
          role="menu"
          sx={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, 6px)",
            minWidth: 240,
            p: 1,
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            border: "1px solid #F1F5F9",
            boxShadow: "0 16px 36px rgba(15,23,42,.14)",
            opacity: 0,
            visibility: "hidden",
            transition: "opacity .15s ease, transform .15s ease, visibility .15s",
            zIndex: 1300,
          }}
        >
          {item.children!.map((child) => (
            <Box
              key={child.label}
              component={Link}
              href={child.href}
              role="menuitem"
              sx={{
                display: "block",
                px: 1.5,
                py: 1,
                borderRadius: "8px",
                color: "#374151",
                fontSize: "0.9rem",
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
                "&:hover, &:focus-visible": { backgroundColor: "#FFF5F7", color: RED },
              }}
            >
              {child.label}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
