"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { CheckCircle2, ChevronRight } from "lucide-react";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { BatchCourseContent, CourseFaq } from "@/types";
import { useFormValidation, validateMobile, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

/** "Still confused?" card with a one-field callback form. */
function ExpertCard({ expert }: { expert: BatchCourseContent["expert"] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const form = useFormValidation({ mobile: "" }, { mobile: (v) => validateMobile(v) }, { mobile: sanitizeMobile });

  return (
    <Box sx={{ p: { xs: 2.25, md: 3.5 }, borderRadius: "20px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 18px 44px rgba(15,23,42,.08)" }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography component="h3" sx={{ fontWeight: 900, fontSize: { xs: "1.3rem", md: "1.65rem" }, color: COLORS.navy, lineHeight: 1.2 }}>
            {expert.title} <Box component="span" sx={{ color: COLORS.red }}>{expert.highlight}</Box>
          </Typography>
          <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: { xs: "0.88rem", md: "0.95rem" } }}>{expert.text}</Typography>
        </Box>
        <Box sx={{ display: { xs: "none", sm: "block" }, flexShrink: 0 }}>
          <CounsellorIllustration width={{ sm: 150, md: 180 }} />
        </Box>
      </Box>

      {sent ? (
        <Box sx={{ mt: 3, display: "flex", gap: 1.25, alignItems: "center", p: 1.75, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
          <CheckCircle2 size={22} color={COLORS.success} />
          <Typography sx={{ fontSize: "0.92rem", color: COLORS.body }}>
            Thanks! Our UPSC expert will call you at <b>+91 {form.values.mobile}</b> shortly.
          </Typography>
        </Box>
      ) : (
        <Box
          component="form"
          ref={formRef}
          noValidate
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            if (form.validateAll(formRef.current)) setSent(true);
          }}
          sx={{ mt: 3, display: "grid", gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" }, gap: 1.25, alignItems: "start" }}
        >
          <TextField
            placeholder="Enter Your Mobile Number"
            {...form.fieldProps("mobile")}
            helperText={form.visibleError("mobile") || undefined}
            required
            type="tel"
            autoComplete="tel-national"
            inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
            InputProps={{ sx: { height: 48, borderRadius: "10px", backgroundColor: "#FFFFFF", "& fieldset": { borderColor: COLORS.redBorder } } }}
          />
          <Box
            component="button"
            type="submit"
            sx={{ height: 48, px: 3, border: "none", borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer", whiteSpace: "nowrap", "&:hover": { backgroundColor: COLORS.redDark } }}
          >
            {expert.ctaLabel}
          </Box>
        </Box>
      )}
    </Box>
  );
}

/** FAQs (left) + talk-to-an-expert card (right). */
export default function BatchFaq({ faqs, expert }: { faqs: CourseFaq[]; expert: BatchCourseContent["expert"] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <Box component="section" id="faqs" sx={{ py: { xs: 5, md: 7 }, background: "linear-gradient(180deg, #FFFFFF 0%, #FFF6F0 100%)" }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.navy, mb: { xs: 3, md: 4 } }}>
          Frequently <Box component="span" sx={{ color: COLORS.red }}>Asked</Box> Questions
        </Typography>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.05fr)" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
          <Box sx={{ display: "grid", gap: 1.25 }}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <Box key={f.q} sx={{ borderRadius: "12px", backgroundColor: "#FFFFFF", border: `1px solid ${isOpen ? COLORS.redBorder : COLORS.border}`, boxShadow: "0 4px 12px rgba(15,23,42,.04)" }}>
                  <Box
                    component="button"
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                    sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1.5, px: 2, py: 1.75, border: "none", background: "none", textAlign: "left", fontFamily: "inherit", cursor: "pointer" }}
                  >
                    <Typography sx={{ flex: 1, fontWeight: 700, color: COLORS.navy, fontSize: { xs: "0.9rem", md: "0.98rem" } }}>{f.q}</Typography>
                    <ChevronRight size={18} color={isOpen ? COLORS.red : COLORS.muted} style={{ transform: isOpen ? "rotate(90deg)" : "none", transition: "transform .2s", flexShrink: 0 }} />
                  </Box>
                  {isOpen && <Typography sx={{ px: 2, pb: 2, mt: -0.5, color: COLORS.body, fontSize: { xs: "0.86rem", md: "0.92rem" }, lineHeight: 1.65 }}>{f.a}</Typography>}
                </Box>
              );
            })}
          </Box>

          <ExpertCard expert={expert} />
        </Box>
      </Container>
    </Box>
  );
}
