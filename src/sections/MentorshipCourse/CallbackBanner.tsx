"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { CheckCircle2 } from "lucide-react";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { useFormValidation, validateMobile, sanitizeMobile } from "@/utils/validation";
import { COLORS } from "@/theme/colors";

/** "Crack UPSC with our Expert Guidance" — full-width callback card. */
export default function CallbackBanner() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const form = useFormValidation({ mobile: "" }, { mobile: (v) => validateMobile(v) }, { mobile: sanitizeMobile });

  return (
    <Box component="section" id="callback" sx={{ py: { xs: 3, md: 5 } }}>
      <Container>
        <Box sx={{ maxWidth: 940, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.4fr) minmax(0, 1fr)" }, gap: { xs: 2, md: 4 }, alignItems: "center", p: { xs: 2.5, md: 4 }, borderRadius: "20px", background: "linear-gradient(135deg, #EEF5FF 0%, #F7FAFF 100%)", border: "1px solid #DCE8FB", boxShadow: "0 14px 34px rgba(15,23,42,.06)" }}>
          <Box>
            <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.45rem", md: "2rem" }, color: COLORS.navy, lineHeight: 1.2 }}>
              Crack UPSC with our Expert Guidance
            </Typography>
            <Typography sx={{ mt: 0.75, fontWeight: 700, color: "#2563EB", fontSize: { xs: "1rem", md: "1.2rem" } }}>Get a Callback by our UPSC Expert!</Typography>
            <Typography sx={{ mt: 0.5, fontSize: "0.75rem", color: COLORS.muted }}>By continuing, you agree to the terms and conditions.</Typography>

            {sent ? (
              <Box sx={{ mt: 2, display: "flex", gap: 1.25, alignItems: "center", p: 1.5, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0" }}>
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
                sx={{ mt: 2, display: "grid", gap: 1.25, maxWidth: 440 }}
              >
                <TextField
                  placeholder="Your mobile number"
                  {...form.fieldProps("mobile")}
                  helperText={form.visibleError("mobile") || undefined}
                  required
                  type="tel"
                  autoComplete="tel-national"
                  inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start"><Box component="span" sx={{ fontWeight: 700, color: COLORS.ink }}>+91</Box></InputAdornment>,
                    sx: { height: 48, borderRadius: "10px", backgroundColor: "#FFFFFF" },
                  }}
                />
                <Box
                  component="button"
                  type="submit"
                  sx={{ justifySelf: "start", height: 44, px: 3, border: "none", borderRadius: "10px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.92rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.redDark } }}
                >
                  Get Free Mentorship
                </Box>
              </Box>
            )}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" }, justifyContent: "center", p: 2, borderRadius: "16px", backgroundColor: "#FFFFFF" }}>
            <CounsellorIllustration width={260} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
