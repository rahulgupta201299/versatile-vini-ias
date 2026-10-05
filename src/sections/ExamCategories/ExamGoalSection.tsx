"use client";

import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, GraduationCap } from "lucide-react";
import { EXAM_CATEGORIES } from "@/data/exams";
import { ExamGoalCategory, SubCategory } from "@/types";

// Brand theme colours
const BRAND_RED = "#FE0034";
const BRAND_RED_DARK = "#CC002A";
const BRAND_YELLOW = "#FFE51F";
const BRAND_YELLOW_DARK = "#F2D500";

// Number of exams shown before "View More" (2 rows × 4 columns on desktop)
const INITIAL_VISIBLE = 8;

function ExamCard({ sub }: { sub: SubCategory }) {
  return (
    <Box
      component="a"
      href={sub.href || "#courses"}
      sx={{
        p: { xs: 1.25, sm: 1.75 },
        borderRadius: "10px",
        border: "1px solid #E5E7EB",
        backgroundColor: "#FFFFFF",
        display: "flex",
        alignItems: "center",
        gap: { xs: 1.25, sm: 2 },
        textDecoration: "none",
        minHeight: { xs: 60, sm: 68 },
        height: "100%",
        transition: "all 0.22s ease",
        cursor: "pointer",
        "&:hover": {
          borderColor: BRAND_RED,
          boxShadow: "0 4px 14px rgba(254, 0, 52, 0.10)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {sub.logo ? (
        <Box
          component="img"
          src={sub.logo}
          alt={`${sub.name} logo`}
          loading="lazy"
          sx={{ width: { xs: 32, sm: 40 }, height: { xs: 32, sm: 40 }, objectFit: "contain", flexShrink: 0 }}
        />
      ) : (
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "8px",
            backgroundColor: "#FFF0F3",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: BRAND_RED,
            flexShrink: 0,
          }}
        >
          <GraduationCap size={22} />
        </Box>
      )}
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: { xs: "0.82rem", sm: "0.95rem" },
          color: "#1E293B",
          lineHeight: 1.25,
        }}
      >
        {sub.name}
      </Typography>
    </Box>
  );
}

const gridSx = {
  display: "grid",
  gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
  gap: { xs: 1.25, sm: 2 },
} as const;

export default function ExamGoalSection() {
  const [activeCategoryName, setActiveCategoryName] = useState<string>(
    EXAM_CATEGORIES[0].category
  );
  const [showAll, setShowAll] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const activeCategory: ExamGoalCategory =
    EXAM_CATEGORIES.find((cat) => cat.category === activeCategoryName) ||
    EXAM_CATEGORIES[0];

  // Auto-detect scroll positions for left/right scroll arrows
  const checkScrollState = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    checkScrollState();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkScrollState);
      window.addEventListener("resize", checkScrollState);
      return () => {
        el.removeEventListener("scroll", checkScrollState);
        window.removeEventListener("resize", checkScrollState);
      };
    }
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -280 : 280;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const visibleExams = activeCategory.subcategories.slice(0, INITIAL_VISIBLE);
  const extraExams = activeCategory.subcategories.slice(INITIAL_VISIBLE);

  const toggleShowAll = () => {
    if (showAll && sectionRef.current) {
      // When collapsing, bring the section heading back into view
      const top = sectionRef.current.getBoundingClientRect().top;
      if (top < 0) sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setShowAll((prev) => !prev);
  };

  return (
    <Box
      id="goals"
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 2.5, sm: 3, md: 3.5 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        {/* Section Heading */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2rem" },
            color: "#0F172A",
            letterSpacing: "-0.02em",
            mb: { xs: 2.5, sm: 3 },
          }}
        >
          Select Your Goal
        </Typography>

        {/* Categories Tab Pills with Responsive Scroll Controls */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            mb: { xs: 3, sm: 3.5 },
          }}
        >
          {/* Left Scroll Arrow */}
          {canScrollLeft && (
            <IconButton
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
              sx={{
                position: "absolute",
                left: 0,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                width: 36,
                height: 36,
                color: "#475569",
                zIndex: 3,
                "&:hover": {
                  backgroundColor: "#F8FAFC",
                  color: "#0F172A",
                },
              }}
            >
              <ChevronLeft size={20} />
            </IconButton>
          )}

          {/* Scrollable Pills Row */}
          <Box
            ref={scrollRef}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.25,
              overflowX: "auto",
              scrollBehavior: "smooth",
              py: 0.5,
              pl: canScrollLeft ? { xs: 5, sm: 6 } : 0,
              pr: canScrollRight ? { xs: 5, sm: 6 } : 0,
              "&::-webkit-scrollbar": { display: "none" },
              msOverflowStyle: "none",
              scrollbarWidth: "none",
            }}
          >
            {EXAM_CATEGORIES.map((cat) => {
              const isSelected = activeCategoryName === cat.category;
              return (
                <Box
                  key={cat.category}
                  component="button"
                  onClick={() => {
                    setActiveCategoryName(cat.category);
                    setShowAll(false);
                  }}
                  sx={{
                    borderRadius: "9999px",
                    px: { xs: 2.2, sm: 2.75 },
                    py: { xs: 0.85, sm: 0.95 },
                    fontSize: { xs: "0.85rem", sm: "0.92rem" },
                    fontWeight: isSelected ? 700 : 500,
                    whiteSpace: "nowrap",
                    backgroundColor: isSelected ? BRAND_RED : "#F1F5F9",
                    color: isSelected ? "#FFFFFF" : "#334155",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected
                      ? "0 4px 14px rgba(254, 0, 52, 0.28)"
                      : "none",
                    "&:hover": {
                      backgroundColor: isSelected ? BRAND_RED_DARK : "#E2E8F0",
                      color: isSelected ? "#FFFFFF" : "#0F172A",
                    },
                  }}
                >
                  {cat.category}
                </Box>
              );
            })}
          </Box>

          {/* Right Scroll Arrow */}
          {canScrollRight && (
            <IconButton
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
              sx={{
                position: "absolute",
                right: 0,
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                width: 36,
                height: 36,
                color: "#475569",
                zIndex: 3,
                "&:hover": {
                  backgroundColor: "#F8FAFC",
                  color: "#0F172A",
                },
              }}
            >
              <ChevronRight size={20} />
            </IconButton>
          )}
        </Box>

        {/* Exams grid: first rows always visible, the rest expand/collapse */}
        <Box sx={gridSx}>
          {visibleExams.map((sub, idx) => (
            <ExamCard key={`${activeCategory.category}-${sub.name}-${idx}`} sub={sub} />
          ))}
        </Box>

        {extraExams.length > 0 && (
          <Collapse in={showAll} timeout={350} unmountOnExit>
            <Box sx={{ ...gridSx, mt: { xs: 1.25, sm: 2 } }}>
              {extraExams.map((sub, idx) => (
                <ExamCard key={`${activeCategory.category}-extra-${sub.name}-${idx}`} sub={sub} />
              ))}
            </Box>
          </Collapse>
        )}

        {/* View More / View Less toggle */}
        {extraExams.length > 0 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: { xs: 2.5, sm: 3 } }}>
            <Button
              variant="contained"
              onClick={toggleShowAll}
              aria-expanded={showAll}
              endIcon={showAll ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              sx={{
                background: BRAND_YELLOW,
                color: "#000000",
                fontWeight: 700,
                fontSize: "0.9rem",
                px: 3,
                py: 0.9,
                borderRadius: "8px",
                boxShadow: "none",
                textTransform: "none",
                "&:hover": {
                  background: BRAND_YELLOW_DARK,
                  boxShadow: "0 2px 8px rgba(242, 213, 0, 0.35)",
                },
              }}
            >
              {showAll ? "View Less" : `View ${extraExams.length} More`}
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
