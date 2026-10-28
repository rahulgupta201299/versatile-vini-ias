"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown } from "lucide-react";
import { CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";

type FaqVariant = "tinted" | "card";

type FaqListProps = {
  faqs: CourseFaq[];
  /** "tinted": the open item turns light red. "card": white cards with a soft shadow. */
  variant?: FaqVariant;
  /** Index open on first render; `false` starts with everything closed. */
  defaultOpen?: number | false;
};

const VARIANTS: Record<FaqVariant, { question: string; openBg: string; shadow: string }> = {
  tinted: { question: COLORS.ink, openBg: COLORS.redTint, shadow: "none" },
  card: { question: COLORS.navy, openBg: "#FFFFFF", shadow: "0 6px 16px rgba(15,23,42,.05)" },
};

/** One FAQ accordion used by every page (course, goal, blog, magazine, batch). Only one item is open at a time. */
export default function FaqList({ faqs, variant = "tinted", defaultOpen = 0 }: FaqListProps) {
  const [open, setOpen] = useState<number | false>(defaultOpen);
  const { question, openBg, shadow } = VARIANTS[variant];

  return (
    <Box sx={{ display: "grid", gap: 1.25 }}>
      {faqs.map(({ q, a }, index) => {
        const isOpen = open === index;

        return (
          <Accordion
            key={q}
            disableGutters
            elevation={0}
            expanded={isOpen}
            onChange={(_, isExpanded) => setOpen(isExpanded ? index : false)}
            sx={{ borderRadius: "12px !important", border: `1px solid ${isOpen ? COLORS.redBorder : COLORS.border}`, bgcolor: isOpen ? openBg : "#FFFFFF", boxShadow: shadow, "&::before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ChevronDown size={20} color={isOpen ? COLORS.red : COLORS.muted} />} sx={{ px: { xs: 1.75, md: 2.25 }, "& .MuiAccordionSummary-content": { my: 1.5 } }}>
              <Typography sx={{ fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.92rem", md: "1rem" }, color: question }}>
                {q}
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: { xs: 1.75, md: 2.25 }, pt: 0, pb: 2 }}>
              <Typography sx={{ fontFamily: "inherit", color: COLORS.body, fontSize: { xs: "0.88rem", md: "0.95rem" }, lineHeight: 1.7 }}>{a}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
}
