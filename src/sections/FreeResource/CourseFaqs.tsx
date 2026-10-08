"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown } from "lucide-react";
import { CourseFaq } from "@/types";
import { COLORS } from "@/theme/colors";

export default function CourseFaqs({ faqs }: { faqs: CourseFaq[] }) {
  const [open, setOpen] = useState<number | false>(0);
  return (
    <Box component="section" id="faqs" sx={{ py: { xs: 4, md: 6 }, backgroundColor: COLORS.surface }}>
      <Container sx={{ maxWidth: "880px !important" }}>
        <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.75rem" }, color: COLORS.ink, textAlign: "center", mb: { xs: 2, md: 3 } }}>
          FAQs
        </Typography>
        <Box sx={{ display: "grid", gap: 1 }}>
          {faqs.map((f, i) => (
            <Accordion
              key={f.q}
              disableGutters
              elevation={0}
              expanded={open === i}
              onChange={(_, isOpen) => setOpen(isOpen ? i : false)}
              sx={{ borderRadius: "12px !important", border: `1px solid ${open === i ? COLORS.redBorder : COLORS.border}`, backgroundColor: open === i ? COLORS.redTint : "#FFFFFF", "&::before": { display: "none" } }}
            >
              <AccordionSummary expandIcon={<ChevronDown size={20} color={open === i ? COLORS.red : COLORS.muted} />} sx={{ px: { xs: 1.75, md: 2.5 }, "& .MuiAccordionSummary-content": { my: 1.5 } }}>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.92rem", md: "1rem" }, color: COLORS.ink }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 1.75, md: 2.5 }, pt: 0, pb: 2 }}>
                <Typography sx={{ color: COLORS.body, fontSize: { xs: "0.88rem", md: "0.95rem" }, lineHeight: 1.7 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
