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
import { anchorSx, BODY, INK, MUTED, RED, RED_TINT, sectionSx, titleSx } from "./theme";

import { COLORS } from "@/theme/colors";
interface AboutExamProps {
  name: string;
  about: string[];
  highlights: { label: string; value: string }[];
  faqs: CourseFaq[];
}

export default function AboutExam({ name, about, highlights, faqs }: AboutExamProps) {
  const [expanded, setExpanded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | false>(0);

  return (
    <Box component="section" id="about-exam" sx={{ ...anchorSx, ...sectionSx, backgroundColor: COLORS.surface }}>
      <Container>
        <Typography component="h2" sx={titleSx}>
          All About {name} Exam
        </Typography>
        <Typography sx={{ color: MUTED, fontSize: { xs: "0.85rem", md: "0.95rem" }, mt: 0.5, mb: { xs: 2, md: 3 } }}>Your complete guide to exam preparation</Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", md: "repeat(4, minmax(0, 1fr))" }, gap: { xs: 1, md: 2 }, mb: { xs: 2.5, md: 3 } }}>
          {highlights.map((h) => (
            <Box key={h.label} sx={{ p: { xs: 1.5, md: 2 }, borderRadius: "12px", backgroundColor: "#FFFFFF", border: "1px solid #EEF0F3", borderLeft: `3px solid ${RED}` }}>
              <Typography sx={{ fontSize: "0.72rem", fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: "0.05em" }}>{h.label}</Typography>
              <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, fontWeight: 700, color: INK, mt: 0.25 }}>{h.value}</Typography>
            </Box>
          ))}
        </Box>

        <Box sx={{ p: { xs: 2, md: 3 }, borderRadius: "16px", backgroundColor: "#FFFFFF", border: "1px solid #EEF0F3", mb: { xs: 3, md: 4 } }}>
          <Box
            sx={{
              position: "relative",
              maxHeight: expanded ? "none" : { xs: 150, md: 120 },
              overflow: "hidden",
              "&::after": expanded ? {} : { content: '""', position: "absolute", left: 0, right: 0, bottom: 0, height: 56, background: "linear-gradient(transparent, #FFFFFF)" },
            }}
          >
            {about.map((p, i) => (
              <Typography key={i} sx={{ color: BODY, fontSize: { xs: "0.9rem", md: "0.98rem" }, lineHeight: 1.75, mb: 1.5 }}>
                {p}
              </Typography>
            ))}
          </Box>
          <Box component="button" type="button" onClick={() => setExpanded((e) => !e)} sx={{ mt: 0.5, p: 0, border: "none", background: "none", color: RED, fontWeight: 700, fontSize: "0.9rem", fontFamily: "inherit", cursor: "pointer" }}>
            {expanded ? "Read less" : "Read more"}
          </Box>
        </Box>

        <Typography component="h3" sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.35rem" }, color: INK, mb: 1.5 }}>
          Frequently Asked Questions
        </Typography>
        <Box sx={{ display: "grid", gap: 1 }}>
          {faqs.map((f, i) => (
            <Accordion
              key={f.q}
              disableGutters
              elevation={0}
              expanded={openFaq === i}
              onChange={(_, open) => setOpenFaq(open ? i : false)}
              sx={{
                borderRadius: "12px !important",
                border: `1px solid ${openFaq === i ? COLORS.redBorder : "#EEF0F3"}`,
                backgroundColor: openFaq === i ? RED_TINT : "#FFFFFF",
                "&::before": { display: "none" },
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown size={20} color={openFaq === i ? RED : COLORS.muted} />} sx={{ px: { xs: 1.75, md: 2.5 }, "& .MuiAccordionSummary-content": { my: 1.5 } }}>
                <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.92rem", md: "1rem" }, color: INK }}>{f.q}</Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ px: { xs: 1.75, md: 2.5 }, pt: 0, pb: 2 }}>
                <Typography sx={{ color: BODY, fontSize: { xs: "0.88rem", md: "0.95rem" }, lineHeight: 1.7 }}>{f.a}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
