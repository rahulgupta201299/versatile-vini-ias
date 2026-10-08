"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CalendarDays, CheckCircle2, ChevronDown, Download, User, Zap } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { FreeResourcePage } from "@/types";
import { openAuth } from "@/utils/events";
import { useFormValidation, validateName, validateMobile, sanitizeName, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

const FIELD_SX = { backgroundColor: "#FFFFFF", borderRadius: "10px", height: 46, fontSize: "0.95rem" };

/** "Get a callback" card shown beside the course intro. */
function CallbackCard({ course }: { course: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const form = useFormValidation(
    { name: "", mobile: "" },
    { name: (v) => validateName(v), mobile: (v) => validateMobile(v) },
    { name: sanitizeName, mobile: sanitizeMobile }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validateAll(formRef.current)) setSubmitted(true);
  };

  return (
    <Box sx={{ p: { xs: 2.25, md: 3 }, borderRadius: "18px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.redBorder}`, boxShadow: "0 18px 44px rgba(15,23,42,.08)" }}>
      <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.1rem", md: "1.25rem" }, color: COLORS.ink, lineHeight: 1.3 }}>
        Crack UPSC with our Expert Guidance
      </Typography>
      <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem", mt: 0.5, mb: 2 }}>Get a Callback by our UPSC Expert!</Typography>

      {submitted ? (
        <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", gap: 1.25 }}>
          <CheckCircle2 size={22} color={COLORS.success} style={{ flexShrink: 0 }} />
          <Typography sx={{ fontSize: "0.88rem", color: COLORS.body }}>
            Thanks {form.values.name}! Our expert will call you at <b>+91 {form.values.mobile}</b> about {course}.
          </Typography>
        </Box>
      ) : (
        <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 1.25 }}>
          <TextField
            placeholder="Your name"
            {...form.fieldProps("name")}
            helperText={form.visibleError("name") || undefined}
            required
            autoComplete="name"
            inputProps={{ maxLength: 50, "aria-label": "Your name" }}
            InputProps={{ startAdornment: <InputAdornment position="start"><User size={17} color={COLORS.muted} /></InputAdornment>, sx: FIELD_SX }}
          />
          <TextField
            placeholder="Mobile number"
            {...form.fieldProps("mobile")}
            helperText={form.visibleError("mobile") || undefined}
            required
            type="tel"
            autoComplete="tel-national"
            inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
            InputProps={{ startAdornment: <InputAdornment position="start"><Box component="span" sx={{ fontWeight: 700, color: COLORS.ink }}>+91</Box></InputAdornment>, sx: FIELD_SX }}
          />
          <Box
            component="button"
            type="submit"
            sx={{ height: 48, border: "none", borderRadius: "12px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.98rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: COLORS.redDark } }}
          >
            Get Free Mentorship
          </Box>
          <Typography sx={{ fontSize: "0.72rem", color: COLORS.disabled, textAlign: "center" }}>By continuing, you agree to our terms and conditions.</Typography>
        </Box>
      )}
    </Box>
  );
}

export const scrollToDetails = () => document.getElementById("course-details")?.scrollIntoView({ behavior: "smooth" });

export default function FreeResourceHero({ page }: { page: FreeResourcePage }) {
  return (
    <Box component="section" id="course-top" sx={{ pt: { xs: 1.5, md: 2 }, pb: { xs: 3, md: 5 }, background: `linear-gradient(180deg, ${COLORS.redTintSoft} 0%, #FFFFFF 100%)` }}>
      <Container>
        <Breadcrumbs />

        {/* Title with underline swoosh */}
        <Box sx={{ textAlign: "center", mt: { xs: 2, md: 3 }, mb: { xs: 3, md: 4.5 } }}>
          <Typography component="h1" sx={{ fontWeight: 800, fontSize: { xs: "1.55rem", sm: "2rem", md: "2.5rem" }, lineHeight: 1.2, color: COLORS.ink, letterSpacing: "-0.01em" }}>
            {page.title}
          </Typography>
          <Box component="svg" viewBox="0 0 300 14" aria-hidden sx={{ display: "block", mx: "auto", mt: 1, width: { xs: 180, md: 280 }, height: "auto" }}>
            <path d="M4 10 C 80 2, 200 2, 296 8" stroke={COLORS.red} strokeWidth="5" strokeLinecap="round" fill="none" />
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.35fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 6 }, alignItems: "center" }}>
          <Box>
            <Typography sx={{ color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.75 }}>{page.summary}</Typography>

            <Typography sx={{ mt: { xs: 2, md: 2.5 }, fontWeight: 800, fontSize: { xs: "1.45rem", md: "1.8rem" }, color: page.isFree ? COLORS.success : COLORS.ink }}>{page.priceLabel}</Typography>

            <Box sx={{ mt: 1, display: "inline-flex", alignItems: "center", gap: 1, color: COLORS.redDark, fontWeight: 700, fontSize: { xs: "0.9rem", md: "0.98rem" } }}>
              <CalendarDays size={18} /> {page.startInfo}
            </Box>

            <Box sx={{ display: "flex", gap: 1.5, mt: { xs: 2.5, md: 3 }, "& > button": { flex: { xs: 1, sm: "0 0 auto" }, justifyContent: "center", px: { xs: 1.5, sm: 3 } } }}>
              <Box
                component="button"
                type="button"
                onClick={scrollToDetails}
                sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 48, px: 3, borderRadius: "12px", border: `1.5px solid ${COLORS.ink}`, backgroundColor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 700, fontSize: "0.98rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.surface } }}
              >
                Course Details <ChevronDown size={17} />
              </Box>
              <Box
                component="button"
                type="button"
                onClick={openAuth}
                sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 48, px: 3.5, borderRadius: "12px", border: "none", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.98rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: COLORS.redDark } }}
              >
                Enroll Now <Zap size={16} fill="currentColor" />
              </Box>
            </Box>
          </Box>

          <CallbackCard course={page.label} />
        </Box>

        {/* Syllabus download strip */}
        <Box
          sx={{
            mt: { xs: 3.5, md: 5 },
            mx: "auto",
            maxWidth: 760,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1.5,
            p: { xs: 2, md: 2.25 },
            pl: { sm: 3 },
            borderRadius: "14px",
            border: `1.5px solid ${COLORS.redBorder}`,
            backgroundColor: "#FFFFFF",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: { xs: "0.98rem", md: "1.05rem" } }}>Complete UPSC Topic-Wise Syllabus</Typography>
          <Box
            component="a"
            href={page.syllabusUrl}
            sx={{ display: "inline-flex", alignItems: "center", gap: 1, height: 44, px: 3, borderRadius: "10px", backgroundColor: COLORS.yellow, color: COLORS.ink, fontWeight: 800, fontSize: "0.9rem", textDecoration: "none", whiteSpace: "nowrap", "&:hover": { backgroundColor: COLORS.yellowDark } }}
          >
            <Download size={17} /> DOWNLOAD HERE
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
