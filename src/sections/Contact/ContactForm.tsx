"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CheckCircle2, Send } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { sanitizeMobile, sanitizeName, useFormValidation, validateMobile, validateName, validateRequiredSelect } from "@/utils/validation";
import { fieldSx, solidPill } from "@/sections/Company/careerStyles";

const EXAMS = ["UPSC", "BPSC", "State PCS", "Judiciary", "CLAT", "Other"];
const validateEmail = (v: string) => (!v.trim() ? "Email is required" : /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Enter a valid email address");
const validateMessage = (v: string) => (v.trim().length < 10 ? "Please write at least 10 characters" : "");

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <Box component="label" sx={{ display: "block" }}>
      <Typography component="span" sx={{ display: "block", mb: 0.6, color: COLORS.navy, fontWeight: 700, fontSize: "0.85rem" }}>
        {label} <Box component="span" sx={{ color: COLORS.red }}>*</Box>
      </Typography>
      {children}
      {error && <Typography role="alert" sx={{ mt: 0.5, color: COLORS.red, fontSize: "0.8rem", fontWeight: 600 }}>{error}</Typography>}
    </Box>
  );
}

/** "Send Us a Message" enquiry form. */
export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const form = useFormValidation(
    { name: "", mobile: "", email: "", exam: "", message: "" },
    { name: (v) => validateName(v), mobile: (v) => validateMobile(v), email: validateEmail, exam: validateRequiredSelect("an exam"), message: validateMessage },
    { name: sanitizeName, mobile: sanitizeMobile }
  );
  const err = (k: "name" | "mobile" | "email" | "exam" | "message") => form.visibleError(k) || undefined;
  const border = (k: "name" | "mobile" | "email" | "exam" | "message") => (form.visibleError(k) ? { borderColor: COLORS.red } : {});

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validateAll(formRef.current)) setSent(true);
  };

  if (sent) {
    return (
      <Box sx={{ textAlign: "center", py: { xs: 4, md: 6 } }}>
        <Box sx={{ mx: "auto", width: 68, height: 68, borderRadius: "50%", bgcolor: "#DCFCE7", color: COLORS.success, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CheckCircle2 size={36} />
        </Box>
        <Typography sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.3rem" }}>Thank you, {form.values.name.split(" ")[0]}!</Typography>
        <Typography sx={{ mt: 0.75, color: COLORS.textSecondary }}>
          We&apos;ve received your {form.values.exam} enquiry. Our team will contact you at <b>+91 {form.values.mobile}</b> shortly.
        </Typography>
        <Box component="button" type="button" onClick={() => setSent(false)} sx={{ mt: 2.5, border: "none", bgcolor: "transparent", color: COLORS.red, fontFamily: "inherit", fontWeight: 700, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}>
          Send another message
        </Box>
      </Box>
    );
  }

  type Key = "name" | "mobile" | "email" | "exam" | "message";
  // native inputs: keep only the DOM-safe props from the MUI-oriented helper
  const fp = (k: Key) => {
    const { name, value, onChange, onBlur } = form.fieldProps(k);
    return { name, value, onBlur, onChange: onChange as unknown as React.ChangeEventHandler<HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement> };
  };
  return (
    <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 2 }}>
      <Field label="Full Name" error={err("name")}>
        <Box component="input" {...fp("name")} autoComplete="name" maxLength={50} placeholder="Enter your full name" sx={{ ...fieldSx, ...border("name") }} />
      </Field>
      <Field label="Mobile Number" error={err("mobile")}>
        <Box sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontWeight: 700, color: COLORS.navy, fontSize: "0.95rem" }}>+91</Box>
          <Box component="input" {...fp("mobile")} type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="Enter your mobile number" sx={{ ...fieldSx, pl: 6, ...border("mobile") }} />
        </Box>
      </Field>
      <Field label="Email Address" error={err("email")}>
        <Box component="input" {...fp("email")} type="email" autoComplete="email" placeholder="Enter your email address" sx={{ ...fieldSx, ...border("email") }} />
      </Field>
      <Field label="Select Your Exam" error={err("exam")}>
        <Box component="select" {...fp("exam")} sx={{ ...fieldSx, cursor: "pointer", color: form.values.exam ? COLORS.ink : "#9CA3AF", ...border("exam") }}>
          <option value="">Choose an exam</option>
          {EXAMS.map((x) => <option key={x} value={x}>{x}</option>)}
        </Box>
      </Field>
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Field label="Your Message" error={err("message")}>
          <Box component="textarea" {...fp("message")} rows={4} maxLength={1000} placeholder="Tell us how we can help you" sx={{ ...fieldSx, height: "auto", py: 1.25, resize: "vertical", lineHeight: 1.55, ...border("message") }} />
        </Field>
      </Box>
      <Box sx={{ gridColumn: "1 / -1" }}>
        <Box component="button" type="submit" sx={{ ...solidPill, width: "100%", height: 52, fontSize: "1rem", letterSpacing: ".04em" }}>
          <Send size={18} /> SUBMIT ENQUIRY
        </Box>
        <Typography sx={{ mt: 1, textAlign: "center", color: COLORS.muted, fontSize: "0.78rem" }}>We usually respond within one working day.</Typography>
      </Box>
    </Box>
  );
}
