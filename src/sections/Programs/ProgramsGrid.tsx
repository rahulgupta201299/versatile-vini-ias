"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import { ChevronDown, ChevronUp } from "lucide-react";
import { POPULAR_PROGRAMS } from "@/data/popularPrograms";
import { COLORS } from "@/theme/colors";
import ProgramCard from "./ProgramCard";

/** Cards in one row at each screen size: phones 1, tablets 2, computers 3. */
const PER_ROW = { xs: 1, sm: 2, md: 3 } as const;

type Breakpoint = keyof typeof PER_ROW;

/** Space between cards, and above the list (theme spacing units). */
const GAP: Record<Breakpoint, number> = { xs: 2, sm: 2, md: 3 };
const TOP_SPACE: Record<Breakpoint, number> = { xs: 2.5, sm: 2.5, md: 3.5 };

const BREAKPOINTS = Object.keys(PER_ROW) as Breakpoint[];

const TOTAL = POPULAR_PROGRAMS.length;

/** A value per screen size, e.g. { xs: "flex", sm: "none", md: "none" }. */
const perBreakpoint = <T,>(valueFor: (breakpoint: Breakpoint) => T) =>
  Object.fromEntries(BREAKPOINTS.map((breakpoint) => [breakpoint, valueFor(breakpoint)])) as Record<Breakpoint, T>;

const buttonSx = { display: "inline-flex", alignItems: "center", gap: 0.75, height: 44, px: 3, borderRadius: "8px", border: `1px solid ${COLORS.ink}`, bgcolor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 500, fontSize: "1rem", cursor: "pointer", "&:hover": { bgcolor: COLORS.surface } } as const;

/**
 * The course cards: one row at first (3 / 2 / 1 cards by screen size); each "View More" adds one more row.
 * When everything is shown the button becomes "View Less", which goes back to one row.
 */
export default function ProgramsGrid() {
  const [rows, setRows] = useState(1);
  const hasMoreAt = (breakpoint: Breakpoint) => TOTAL > rows * PER_ROW[breakpoint];
  const canCollapseAt = (breakpoint: Breakpoint) => !hasMoreAt(breakpoint) && TOTAL > PER_ROW[breakpoint];

  const collapse = () => {
    // Back to the top of the section, so the page doesn't jump past it
    document.getElementById("popular-programs")?.scrollIntoView({ behavior: "smooth" });
    setRows(1);
  };

  return (
    <>
      <Box
        component="ul"
        id="popular-programs-list"
        sx={(theme) => ({
          listStyle: "none",
          m: 0,
          p: 0,
          display: "grid",
          // One block per screen size (several media blocks with the same key would overwrite each other):
          // columns and spacing, then show the cards again (same selector weight, so a bigger screen undoes a smaller one)
          // and hide every card after the rows opened so far
          ...Object.fromEntries(
            BREAKPOINTS.map((breakpoint) => [
              theme.breakpoints.up(breakpoint),
              {
                gridTemplateColumns: `repeat(${PER_ROW[breakpoint]}, minmax(0, 1fr))`,
                gap: theme.spacing(GAP[breakpoint]),
                marginTop: theme.spacing(TOP_SPACE[breakpoint]),
                "& > li:nth-of-type(n)": { display: "block" },
                [`& > li:nth-of-type(n + ${rows * PER_ROW[breakpoint] + 1})`]: { display: "none" },
              },
            ]),
          ),
        })}
      >
        {POPULAR_PROGRAMS.map((program) => (
          <Box component="li" key={program.title}>
            <ProgramCard program={program} />
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: { xs: 3, md: 4 }, display: "flex", justifyContent: "center" }}>
        <Box component="button" type="button" onClick={() => setRows(rows + 1)} aria-controls="popular-programs-list" sx={{ ...buttonSx, display: perBreakpoint((breakpoint) => (hasMoreAt(breakpoint) ? "inline-flex" : "none")) }}>
          View More <ChevronDown size={18} />
        </Box>
        <Box component="button" type="button" onClick={collapse} aria-controls="popular-programs-list" sx={{ ...buttonSx, display: perBreakpoint((breakpoint) => (canCollapseAt(breakpoint) ? "inline-flex" : "none")) }}>
          View Less <ChevronUp size={18} />
        </Box>
      </Box>
    </>
  );
}
