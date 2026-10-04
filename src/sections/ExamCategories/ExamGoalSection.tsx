"use client";

import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react";
import { EXAM_CATEGORIES, ExamGoalCategory } from "@/data/exams";

// View More count labels matching the official portal screenshots
const VIEW_MORE_LABELS: Record<string, string> = {
  "State PSC": "View 38 More",
  "UPSC": "View 2 More",
  "SSC": "View 20 More",
  "Railways": "View 8 More",
  "Teaching": "View 42 More",
  "Defence": "View 12 More",
  "Banking": "View 16 More",
  "Engineering": "View 24 More",
  "Medical": "View 18 More",
  "Management": "View 14 More",
  "Police": "View 22 More",
  "Science": "View 15 More",
  "PSU Recruitment": "View 10 More",
  "Law": "View 8 More",
  "Arts": "View 10 More",
  "Insurance": "View 6 More",
  "Board": "View All",
  "Study Abroad": "View All",
  "Scholarship": "View All",
  "Nursing": "View All",
};

export default function ExamGoalSection() {
  const [activeCategoryName, setActiveCategoryName] = useState<string>("State PSC");
  const [showAll, setShowAll] = useState(false);
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

  const viewMoreText =
    VIEW_MORE_LABELS[activeCategory.category] || "View All";

  return (
    <Box
      id="goals"
      component="section"
      sx={{
        py: { xs: 3.5, sm: 4.5, md: 5 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        {/* Section Heading matching screenshot 'Choose your exam' */}
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
          Choose your exam
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
                    backgroundColor: isSelected ? "#2563EB" : "#F1F5F9",
                    color: isSelected ? "#FFFFFF" : "#334155",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isSelected
                      ? "0 4px 14px rgba(37, 99, 235, 0.28)"
                      : "none",
                    "&:hover": {
                      backgroundColor: isSelected ? "#1D4ED8" : "#E2E8F0",
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

        {/* 4-Column × 2-Row Sub-Exams Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: { xs: 1.5, sm: 2 },
            mb: 3.5,
          }}
        >
          {activeCategory.subcategories.map((sub, idx) => (
            <Box
              key={`${activeCategory.category}-${sub.name}-${idx}`}
              component="a"
              href="#courses"
              sx={{
                p: { xs: 1.5, sm: 1.75 },
                borderRadius: "10px",
                border: "1px solid #E5E7EB",
                backgroundColor: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                gap: 2,
                textDecoration: "none",
                minHeight: 68,
                transition: "all 0.22s ease",
                cursor: "pointer",
                "&:hover": {
                  borderColor: "#CBD5E1",
                  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
                  transform: "translateY(-2px)",
                },
              }}
            >
              {sub.logo ? (
                <Box
                  component="img"
                  src={sub.logo}
                  alt={sub.name}
                  sx={{
                    width: 38,
                    height: 38,
                    objectFit: "contain",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: "8px",
                    backgroundColor: "#EFF6FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#2563EB",
                    flexShrink: 0,
                  }}
                >
                  <GraduationCap size={22} />
                </Box>
              )}

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  color: "#1E293B",
                  lineHeight: 1.25,
                }}
              >
                {sub.name}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Yellow Action Button matching reference screenshots (e.g. 'View 38 More', 'View 20 More', 'View All') */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 1 }}>
          <Button
            variant="contained"
            onClick={() => setShowAll(!showAll)}
            sx={{
              backgroundColor: "#FACC15",
              color: "#1E293B",
              fontWeight: 700,
              fontSize: "0.88rem",
              px: 3,
              py: 0.85,
              borderRadius: "8px",
              boxShadow: "none",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#EAB308",
                boxShadow: "0 2px 8px rgba(234, 179, 8, 0.3)",
              },
            }}
          >
            {showAll ? "Show Less" : viewMoreText}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
