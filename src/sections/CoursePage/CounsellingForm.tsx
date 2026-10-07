"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import { CheckCircle2, PhoneCall, User } from "lucide-react";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { CONTACT } from "@/data/contact";
import { useFormValidation, validateName, validateMobile, validateRequiredSelect, sanitizeName, sanitizeMobile } from "@/utils/validation";
import { anchorSx, INK, MUTED, RED, RED_DARK, sectionSx } from "./theme";

import { COLORS } from "@/theme/colors";
const FIELD_SX = { backgroundColor: "#FFFFFF", borderRadius: "10px", height: 48, fontSize: "0.95rem" };

export default function CounsellingForm({ name, examOptions }: { name: string; examOptions: string[] }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const form = useFormValidation(
    { name: "", mobile: "", exam: name },
    {
      name: (v) => validateName(v),
      mobile: (v) => validateMobile(v),
      exam: validateRequiredSelect("an exam"),
    },
    { name: sanitizeName, mobile: sanitizeMobile }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.validateAll(formRef.current)) setSubmitted(true);
  };

  return (
    <Box component="section" id="counselling" sx={{ ...anchorSx, ...sectionSx, pt: { xs: 7, md: 9 } }}>
      <Container>
        <Box
          sx={{
            position: "relative",
            maxWidth: 640,
            mx: "auto",
            px: { xs: 2.5, md: 5 },
            pt: { xs: 7, md: 8 },
            pb: { xs: 3, md: 4 },
            borderRadius: { xs: "18px", md: "24px" },
            backgroundColor: "#FFFFFF",
            border: "1px solid #EEF0F3",
            boxShadow: "0 18px 44px rgba(15,23,42,.08)",
            textAlign: "center",
          }}
        >
          {/* Call illustration badge */}
          <Box
            sx={{
              position: "absolute",
              top: { xs: -52, md: -60 },
              left: "50%",
              transform: "translateX(-50%)",
              width: { xs: 104, md: 120 },
              height: { xs: 104, md: 120 },
              borderRadius: "50%",
              backgroundColor: COLORS.redTintSoft,
              border: "4px solid #FFFFFF",
              boxShadow: "0 10px 26px rgba(254,0,52,.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <CounsellorIllustration width={{ xs: 92, md: 106 }} />
          </Box>

          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.3rem", md: "1.7rem" }, color: INK, lineHeight: 1.25 }}>
            Get Free Counselling Today
          </Typography>
          <Typography sx={{ color: MUTED, fontSize: { xs: "0.88rem", md: "0.98rem" }, mt: 0.75, mb: 3 }}>
            and clear up all your doubts — talk to our counsellor
          </Typography>

          {submitted ? (
            <Box sx={{ p: 2.5, borderRadius: "12px", backgroundColor: "#F0FDF4", border: "1px solid #BBF7D0", display: "flex", gap: 1.5, textAlign: "left" }}>
              <CheckCircle2 size={26} color={COLORS.success} style={{ flexShrink: 0 }} />
              <Box>
                <Typography sx={{ fontWeight: 700, color: "#166534" }}>Request received!</Typography>
                <Typography sx={{ fontSize: "0.88rem", color: COLORS.body }}>
                  Thanks {form.values.name}, our counsellor will call you at <b>+91 {form.values.mobile}</b> shortly about {form.values.exam}.
                </Typography>
              </Box>
            </Box>
          ) : (
            <Box component="form" ref={formRef} onSubmit={onSubmit} noValidate sx={{ display: "grid", gap: 1.25, textAlign: "left" }}>
              <TextField
                placeholder="Student name"
                {...form.fieldProps("name")}
                helperText={form.visibleError("name") || undefined}
                required
                autoComplete="name"
                inputProps={{ maxLength: 50, "aria-label": "Student name" }}
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
                InputProps={{ startAdornment: <InputAdornment position="start"><Box component="span" sx={{ fontWeight: 700, color: INK }}>+91</Box></InputAdornment>, sx: FIELD_SX }}
              />
              <TextField
                select
                {...form.fieldProps("exam")}
                helperText={form.visibleError("exam") || undefined}
                required
                inputProps={{ "aria-label": "Choose exam" }}
                SelectProps={{ displayEmpty: true, onClose: () => form.markTouched("exam") }}
                InputProps={{ sx: FIELD_SX }}
              >
                {examOptions.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                component="button"
                type="submit"
                sx={{ mt: 0.75, height: 50, border: "none", borderRadius: "12px", backgroundColor: RED, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "1rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: RED_DARK } }}
              >
                Submit
              </Box>
              <Box component="a" href={CONTACT.tel} sx={{ justifySelf: "center", mt: 0.5, display: "inline-flex", alignItems: "center", gap: 0.75, color: MUTED, fontSize: "0.85rem", textDecoration: "none", "&:hover": { color: RED } }}>
                <PhoneCall size={15} /> or call us directly
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}
