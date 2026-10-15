"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown } from "lucide-react";
import { CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";

/** Article FAQs — accordion, first one open. */
export default function BlogFaqs({ faqs }: { faqs: CourseFaq[] }) {
  const [open, setOpen] = useState<number | false>(0);
  if (!faqs.length) return null;
  return (
    <Box component="section" aria-label="Frequently asked questions">
      <Typography component="h2" sx={{ fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "1.25rem", md: "1.5rem" }, color: "#27272A", mb: 1.5, pl: 1.5, borderLeft: `4px solid ${COLORS.red}` }}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ display: "grid", gap: 1 }}>
        {faqs.map((f, i) => (
          <Accordion
            key={f.q}
            disableGutters
            elevation={0}
            expanded={open === i}
            onChange={(_, isOpen) => setOpen(isOpen ? i : false)}
            sx={{ borderRadius: "12px !important", border: `1px solid ${open === i ? COLORS.redBorder : COLORS.border}`, backgroundColor: open === i ? COLORS.redTintSoft : "#FFFFFF", "&::before": { display: "none" } }}
          >
            <AccordionSummary expandIcon={<ChevronDown size={20} color={open === i ? COLORS.red : COLORS.muted} />} sx={{ px: 2, "& .MuiAccordionSummary-content": { my: 1.5 } }}>
              <Typography sx={{ fontFamily: "inherit", fontWeight: 600, fontSize: "1rem", color: "#27272A" }}>{f.q}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2, pt: 0, pb: 2 }}>
              <Typography sx={{ fontFamily: "inherit", fontSize: "0.95rem", lineHeight: 1.7, color: "#3F3F46" }}>{f.a}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
}
