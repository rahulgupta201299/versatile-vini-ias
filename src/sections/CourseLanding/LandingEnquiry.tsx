"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { ArrowRight, CheckCircle2, Mail, Phone, Target, User } from "lucide-react";
import { CourseLandingContent } from "@/types";
import { useFormValidation, validateName, validateMobile, validateOptionalEmail, sanitizeName, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

const FIELD_SX = { backgroundColor: "#FFFFFF", borderRadius: "8px", height: 44, fontSize: "0.92rem" };
const adornment = (icon: React.ReactNode) => <InputAdornment position="start">{icon}</InputAdornment>;

/** Dark "Have any questions?" band with the enquiry form. */
export default function LandingEnquiry({ data, course }: { data: CourseLandingContent["enquiry"]; course: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const form = useFormValidation(
    { name: "", mobile: "", email: "" },
    { name: (v) => validateName(v), mobile: (v) => validateMobile(v), email: (v) => validateOptionalEmail(v) },
    { name: sanitizeName, mobile: sanitizeMobile }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validateAll(formRef.current)) setSubmitted(true);
  };

  return (
    <Box component="section" id="enquiry" sx={{ py: { xs: 4.5, md: 6 }, background: `linear-gradient(120deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, color: "#FFFFFF" }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.15fr) minmax(0, 1fr)" }, gap: { xs: 3, md: 6 }, alignItems: "center" }}>
        <Box sx={{ display: "flex", gap: { xs: 2, md: 3 }, alignItems: "center" }}>
          <Box sx={{ width: { xs: 70, md: 96 }, height: { xs: 70, md: 96 }, flexShrink: 0, borderRadius: "50%", background: "radial-gradient(circle, #FFFFFF 0 22%, #3B82F6 23% 44%, #FFFFFF 45% 62%, #3B82F6 63% 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.red, boxShadow: "0 10px 26px rgba(0,0,0,.25)" }}>
            <Target size={30} strokeWidth={2.5} />
          </Box>
          <Box>
            <Box sx={{ display: "inline-block", px: 1.25, py: 0.35, borderRadius: "6px", backgroundColor: "rgba(255,255,255,.14)", fontSize: "0.7rem", fontWeight: 800, letterSpacing: "0.06em" }}>{data.badge}</Box>
            <Typography component="h2" sx={{ mt: 1, fontWeight: 900, fontSize: { xs: "1.5rem", md: "2.1rem" }, lineHeight: 1.15 }}>
              {data.title}
            </Typography>
            <Typography sx={{ mt: 0.75, color: "rgba(255,255,255,.82)", fontSize: { xs: "0.88rem", md: "0.98rem" }, lineHeight: 1.6, maxWidth: 460 }}>{data.text}</Typography>
          </Box>
        </Box>

        <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "14px", backgroundColor: "#FFFFFF", boxShadow: "0 18px 40px rgba(0,0,0,.25)" }}>
          {submitted ? (
            <Box sx={{ display: "flex", gap: 1.25, alignItems: "flex-start", color: COLORS.body }}>
              <CheckCircle2 size={24} color={COLORS.success} style={{ flexShrink: 0 }} />
              <Typography sx={{ fontSize: "0.92rem" }}>
                Thanks {form.values.name}! Our team will call you at <b>+91 {form.values.mobile}</b> with the details of the {course}.
              </Typography>
            </Box>
          ) : (
            <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 1.1 }}>
              <TextField
                placeholder="Your Name"
                {...form.fieldProps("name")}
                helperText={form.visibleError("name") || undefined}
                required
                autoComplete="name"
                inputProps={{ maxLength: 50, "aria-label": "Your name" }}
                InputProps={{ startAdornment: adornment(<User size={16} color={COLORS.muted} />), sx: FIELD_SX }}
              />
              <TextField
                placeholder="Your Mobile Number"
                {...form.fieldProps("mobile")}
                helperText={form.visibleError("mobile") || undefined}
                required
                type="tel"
                autoComplete="tel-national"
                inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
                InputProps={{ startAdornment: adornment(<Phone size={16} color={COLORS.muted} />), sx: FIELD_SX }}
              />
              <TextField
                placeholder="Your Email (Optional)"
                {...form.fieldProps("email")}
                helperText={form.visibleError("email") || undefined}
                type="email"
                autoComplete="email"
                inputProps={{ maxLength: 80, "aria-label": "Email (optional)" }}
                InputProps={{ startAdornment: adornment(<Mail size={16} color={COLORS.muted} />), sx: FIELD_SX }}
              />
              <Box
                component="button"
                type="submit"
                sx={{ mt: 0.25, height: 46, border: "none", borderRadius: "8px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.98rem", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, "&:hover": { backgroundColor: COLORS.redDark } }}
              >
                {data.ctaLabel} <ArrowRight size={17} />
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
