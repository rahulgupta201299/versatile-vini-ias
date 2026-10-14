"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ChevronDown, CheckCircle2 } from "lucide-react";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { CourseFaq, MagazineContent } from "@/types";
import { useFormValidation, validateMobile, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

/** "Frequently Asked Questions" accordion beside a "Doubt Regarding …?" callback card. */
export default function MagazineHelp({ faqs, help }: { faqs: CourseFaq[]; help: MagazineContent["help"] }) {
  const [open, setOpen] = useState<number | false>(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const form = useFormValidation({ mobile: "" }, { mobile: (v) => validateMobile(v) }, { mobile: sanitizeMobile });
  const [before, after] = help.title.split(help.highlight);

  return (
    <Box component="section" id="faqs" sx={{ py: { xs: 4.5, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.4rem" }, color: COLORS.navy }}>
          Frequently <Box component="span" sx={{ color: COLORS.red }}>Asked</Box> Questions
        </Typography>
        <Box sx={{ width: 120, height: 4, borderRadius: 2, mx: "auto", mt: 1, mb: { xs: 3, md: 4.5 }, backgroundColor: COLORS.red }} />

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
          <Box sx={{ display: "grid", gap: 1.25 }}>
            {faqs.map((f, i) => (
              <Accordion
                key={f.q}
                disableGutters
                elevation={0}
                expanded={open === i}
                onChange={(_, isOpen) => setOpen(isOpen ? i : false)}
                sx={{ borderRadius: "14px !important", border: `1px solid ${open === i ? COLORS.redBorder : COLORS.border}`, backgroundColor: "#FFFFFF", boxShadow: "0 6px 16px rgba(15,23,42,.05)", "&::before": { display: "none" } }}
              >
                <AccordionSummary expandIcon={<ChevronDown size={20} color={open === i ? COLORS.red : COLORS.muted} />} sx={{ px: 2.25, "& .MuiAccordionSummary-content": { my: 1.75 } }}>
                  <Typography sx={{ fontWeight: 700, fontSize: { xs: "0.92rem", md: "0.98rem" }, color: COLORS.navy }}>{f.q}</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ px: 2.25, pt: 0, pb: 2 }}>
                  <Typography sx={{ color: COLORS.body, fontSize: { xs: "0.88rem", md: "0.94rem" }, lineHeight: 1.7 }}>{f.a}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          <Box id="callback" sx={{ position: { md: "sticky" }, top: { md: 96 }, p: { xs: 2.5, md: 3.5 }, borderRadius: "22px", background: `linear-gradient(120deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, color: "#FFFFFF", boxShadow: "0 18px 40px rgba(12,28,54,.25)" }}>
            <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start", justifyContent: "space-between" }}>
              <Box>
                <Typography component="h3" sx={{ fontWeight: 900, fontSize: { xs: "1.35rem", md: "1.7rem" }, color: "#FFFFFF", lineHeight: 1.25 }}>
                  {before}
                  <Box component="span" sx={{ color: COLORS.yellow }}>{help.highlight}</Box>
                  {after}
                </Typography>
                <Typography sx={{ mt: 1, color: "rgba(255,255,255,.8)", fontSize: "0.92rem" }}>{help.text}</Typography>
              </Box>
              <Box sx={{ display: { xs: "none", sm: "block" }, flexShrink: 0, p: 1, borderRadius: "16px", backgroundColor: "#FFFFFF" }}>
                <CounsellorIllustration width={140} />
              </Box>
            </Box>
            {sent ? (
              <Box sx={{ mt: 2.5, display: "flex", gap: 1.25, alignItems: "center", p: 1.5, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
                <CheckCircle2 size={22} color={COLORS.success} />
                <Typography sx={{ fontSize: "0.92rem", color: COLORS.body }}>Thanks! Our mentor will call you at <b>+91 {form.values.mobile}</b> shortly.</Typography>
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
                sx={{ mt: 2.5, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1.25 }}
              >
                <TextField
                  placeholder="Enter your mobile number"
                  {...form.fieldProps("mobile")}
                  helperText={form.visibleError("mobile") || undefined}
                  required
                  type="tel"
                  autoComplete="tel-national"
                  inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Box component="span" sx={{ fontWeight: 700, color: COLORS.navy }}>+91</Box></InputAdornment>,
                    sx: { height: 48, borderRadius: "10px", backgroundColor: "#FFFFFF" },
                  }}
                  sx={{ flex: 1 }}
                />
                <Box component="button" type="submit" sx={{ height: 48, px: 3, border: "none", borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "0.92rem", cursor: "pointer", whiteSpace: "nowrap", "&:hover": { backgroundColor: COLORS.redDark } }}>
                  {help.ctaLabel}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
