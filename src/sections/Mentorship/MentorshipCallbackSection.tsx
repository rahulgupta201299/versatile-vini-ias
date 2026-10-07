"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { User, CheckCircle2 } from "lucide-react";
import {
  useFormValidation,
  validateName,
  validateMobile,
  sanitizeName,
  sanitizeMobile,
} from "@/utils/validation";

import { COLORS } from "@/theme/colors";
const FIELD_SX = {
  backgroundColor: "#FFFFFF",
  borderRadius: "10px",
  fontSize: "0.92rem",
  height: { xs: 44, md: 48 },
};

export default function MentorshipCallbackSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const form = useFormValidation(
    { name: "", mobile: "" },
    { name: (v) => validateName(v), mobile: (v) => validateMobile(v) },
    { name: sanitizeName, mobile: sanitizeMobile }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll(formRef.current)) return;
    setSubmitted(true);
  };

  return (
    <Box
      id="mentorship"
      sx={{
        py: { xs: 2.5, md: 3.5 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        <Box
          sx={{
            borderRadius: { xs: "16px", md: "20px" },
            backgroundColor: "#EBF5FF",
            border: "1px solid #BFDBFE",
            p: { xs: 2.5, sm: 3, md: 4 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "minmax(0, 0.9fr) minmax(0, 1.1fr)" },
            alignItems: "center",
            gap: { xs: 2, md: 4 },
          }}
        >
          {/* Heading */}
          <Box>
            <Typography
              component="h2"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "1.35rem", sm: "1.6rem", md: "1.85rem" },
                color: "#1E3A8A",
                letterSpacing: "-0.01em",
                lineHeight: 1.25,
                mb: 0.75,
              }}
            >
              Crack UPSC with our Expert Guidance
            </Typography>
            <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.92rem", md: "1rem" }, color: "#2563EB" }}>
              Get a Callback by our UPSC Expert!
            </Typography>
          </Box>

          {/* Form */}
          <Box>
            {submitted ? (
              <Box
                sx={{
                  p: 2.5,
                  borderRadius: "12px",
                  backgroundColor: "#FFFFFF",
                  border: "1.5px solid #86EFAC",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1.5,
                }}
              >
                <CheckCircle2 size={28} color={COLORS.success} style={{ flexShrink: 0 }} />
                <Box>
                  <Typography sx={{ fontWeight: 700, color: "#166534", fontSize: "0.98rem", mb: 0.25 }}>
                    Callback request confirmed!
                  </Typography>
                  <Typography sx={{ color: COLORS.body, fontSize: "0.86rem" }}>
                    Thank you, <strong>{form.values.name}</strong>. Our UPSC mentor will call you at{" "}
                    <strong>+91 {form.values.mobile}</strong> shortly.
                  </Typography>
                  <Button
                    size="small"
                    onClick={() => {
                      setSubmitted(false);
                      form.reset();
                    }}
                    sx={{ mt: 0.75, p: 0, minWidth: 0, color: COLORS.success, fontWeight: 700, textTransform: "none" }}
                  >
                    Submit another request
                  </Button>
                </Box>
              </Box>
            ) : (
              <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr auto" },
                    gap: { xs: 1.25, sm: 1.5 },
                    alignItems: "start",
                  }}
                >
                  <TextField
                    placeholder="Your name"
                    {...form.fieldProps("name")}
                    helperText={form.visibleError("name") || undefined}
                    required
                    autoComplete="name"
                    inputProps={{ maxLength: 50, "aria-label": "Your name" }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={17} color={COLORS.muted} />
                        </InputAdornment>
                      ),
                      sx: FIELD_SX,
                    }}
                  />

                  <TextField
                    placeholder="Mobile number"
                    {...form.fieldProps("mobile")}
                    helperText={form.visibleError("mobile") || undefined}
                    required
                    type="tel"
                    autoComplete="tel-national"
                    inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box component="span" sx={{ fontWeight: 700, color: "#1E3A8A", fontSize: "0.92rem" }}>
                            +91
                          </Box>
                        </InputAdornment>
                      ),
                      sx: FIELD_SX,
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      gridColumn: { xs: "auto", sm: "1 / -1", lg: "auto" },
                      height: { xs: 44, md: 48 },
                      px: 3,
                      background: COLORS.yellow,
                      color: "#000000",
                      fontWeight: 700,
                      fontSize: { xs: "0.95rem", md: "1rem" },
                      borderRadius: "10px",
                      boxShadow: "none",
                      textTransform: "none",
                      whiteSpace: "nowrap",
                      "&:hover": { background: COLORS.yellowDark, boxShadow: "0 4px 12px rgba(242, 213, 0, 0.35)" },
                    }}
                  >
                    Get Free Mentorship
                  </Button>
                </Box>

                <Typography sx={{ color: COLORS.muted, fontSize: "0.75rem", mt: 1.25 }}>
                  By continuing, you agree to the{" "}
                  <Box component="a" href="#" sx={{ color: "#2563EB", textDecoration: "underline" }}>
                    terms and conditions
                  </Box>
                  .
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
