"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Dialog from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import { Search, TrendingUp, CornerDownLeft, ArrowRight } from "lucide-react";
import { MEGA_MENU_CATEGORIES, NAV_ITEMS, SEARCH_TRENDING } from "@/data/navigation";
import { EXAM_CATEGORIES } from "@/data/exams";
import { coursePath } from "@/utils/slug";

import { COLORS } from "@/theme/colors";
const ACCENT = COLORS.red;

interface SearchItem {
  label: string;
  group: string;
  href: string;
}

/** Everything searchable on the site (menu courses, nav links, exams). */
function buildIndex(): SearchItem[] {
  const items: SearchItem[] = [
    ...NAV_ITEMS.filter((n) => !n.isMegaMenu).map((n) => ({ label: n.label, group: "Menu", href: n.href })),
    ...NAV_ITEMS.flatMap((n) => (n.children ?? []).map((ch) => ({ label: ch.label, group: n.label, href: ch.href }))),
    ...MEGA_MENU_CATEGORIES.flatMap((c) => c.courses.map((co) => ({ label: co.title, group: c.title, href: coursePath(co.title) }))),
    ...EXAM_CATEGORIES.flatMap((c) => c.subcategories.map((s) => ({ label: s.name, group: c.category, href: s.href || coursePath(s.name) }))),
  ];
  const seen = new Set<string>();
  return items.filter((i) => {
    const k = i.label.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

const Kbd = ({ children }: { children: React.ReactNode }) => (
  <Box
    component="kbd"
    sx={{
      fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
      fontSize: "0.72rem",
      color: COLORS.muted,
      border: `1px solid ${COLORS.border}`,
      borderRadius: "6px",
      px: 0.75,
      py: 0.25,
      backgroundColor: "#FFFFFF",
      lineHeight: 1.4,
    }}
  >
    {children}
  </Box>
);

interface SearchDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  useEffect(() => setIsMac(/Mac|iPhone|iPad/.test(navigator.platform)), []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return index
      .filter((i) => i.label.toLowerCase().includes(q) || i.group.toLowerCase().includes(q))
      .sort((a, b) => Number(!a.label.toLowerCase().startsWith(q)) - Number(!b.label.toLowerCase().startsWith(q)))
      .slice(0, 8);
  }, [index, query]);

  const go = (href: string) => {
    onClose();
    setQuery("");
    window.location.href = href;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[active]) go(results[active].href);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        setQuery("");
      }}
      TransitionProps={{ onEntered: () => inputRef.current?.focus() }}
      fullWidth
      maxWidth="md"
      slotProps={{ backdrop: { sx: { backgroundColor: "rgba(15,23,42,0.45)", backdropFilter: "blur(4px)" } } }}
      PaperProps={{
        sx: {
          alignSelf: "flex-start",
          mt: { xs: 2, sm: "10vh" },
          mx: { xs: 1.5, sm: 4 },
          width: { xs: "calc(100% - 24px)", sm: "100%" },
          borderRadius: { xs: "18px", sm: "24px" },
          overflow: "hidden",
        },
      }}
    >
      {/* Input row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: { xs: 2, sm: 3 }, py: { xs: 1.5, sm: 2.25 }, borderBottom: "1px solid #F1F5F9" }}>
        <Search size={22} color={ACCENT} style={{ flexShrink: 0 }} />
        <InputBase
          inputRef={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onKeyDown}
          placeholder="Search courses, tests, exams..."
          inputProps={{ "aria-label": "Search courses, tests, exams" }}
          sx={{ flex: 1, fontSize: { xs: "1rem", sm: "1.2rem" }, "& input::placeholder": { color: COLORS.disabled, opacity: 1 } }}
        />
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          <Kbd>{isMac ? "⌘K" : "Ctrl+K"}</Kbd>
        </Box>
      </Box>

      {/* Body */}
      <Box sx={{ px: { xs: 2, sm: 3 }, py: 2.5, maxHeight: "55vh", overflowY: "auto" }}>
        {!query.trim() && (
          <>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, color: COLORS.disabled, mb: 1.5 }}>
              <TrendingUp size={16} />
              <Typography sx={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em" }}>TRENDING</Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
              {SEARCH_TRENDING.map((t) => (
                <Box
                  key={t}
                  component="button"
                  type="button"
                  onClick={() => {
                    setQuery(t);
                    setActive(0);
                    inputRef.current?.focus();
                  }}
                  sx={{
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "inherit",
                    fontSize: "0.92rem",
                    fontWeight: 600,
                    color: ACCENT,
                    backgroundColor: COLORS.redTint,
                    borderRadius: "9999px",
                    px: 2,
                    py: 0.9,
                    "&:hover": { backgroundColor: COLORS.redTintHover },
                  }}
                >
                  {t}
                </Box>
              ))}
            </Box>
          </>
        )}

        {query.trim() && results.length === 0 && (
          <Typography sx={{ color: COLORS.muted, fontSize: "0.92rem", py: 1 }}>
            No results for “{query.trim()}”. Try a different exam or course name.
          </Typography>
        )}

        {results.length > 0 && (
          <Box component="ul" role="listbox" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {results.map((r, i) => (
              <Box
                component="li"
                key={`${r.group}-${r.label}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onClick={() => go(r.href)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 2,
                  px: 1.5,
                  py: 1.1,
                  borderRadius: "10px",
                  cursor: "pointer",
                  backgroundColor: i === active ? COLORS.redTint : "transparent",
                }}
              >
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, color: COLORS.ink, fontSize: "0.95rem" }} noWrap>
                    {r.label}
                  </Typography>
                  <Typography sx={{ color: COLORS.disabled, fontSize: "0.78rem" }} noWrap>
                    {r.group}
                  </Typography>
                </Box>
                <ArrowRight size={16} color={i === active ? ACCENT : "#CBD5E1"} />
              </Box>
            ))}
          </Box>
        )}
      </Box>

      {/* Hints */}
      <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 2.5, px: 3, py: 1.5, borderTop: "1px solid #F1F5F9", color: COLORS.muted, fontSize: "0.8rem" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Kbd>
            <CornerDownLeft size={11} />
          </Kbd>
          to search
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <Kbd>Esc</Kbd>
          to close
        </Box>
      </Box>
    </Dialog>
  );
}
