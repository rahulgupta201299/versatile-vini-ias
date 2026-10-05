"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import InputAdornment from "@mui/material/InputAdornment";
import { User, CheckCircle2, Sparkles } from "lucide-react";
import {
  useFormValidation,
  validateName,
  validateMobile,
  sanitizeName,
  sanitizeMobile,
} from "@/utils/validation";

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
        py: { xs: 3, md: 4 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        <Box
          sx={{
            borderRadius: { xs: "20px", md: "24px" },
            backgroundColor: "#EBF5FF", // Matching light blue background in Screenshot 18.04.50
            border: "1.5px solid #BFDBFE",
            p: { xs: 3, sm: 4, md: 5 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.2fr 0.8fr" },
            alignItems: "center",
            gap: { xs: 3, lg: 5 },
            boxShadow: "0 10px 30px rgba(37, 99, 235, 0.08)",
          }}
        >
          {/* Left Form Area (Matching Screenshot 18.04.50) */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "1.75rem", sm: "2.3rem", md: "2.75rem" },
                color: "#1E3A8A", // Deep royal blue
                letterSpacing: "-0.015em",
                lineHeight: 1.15,
                mb: 1,
              }}
            >
              Crack UPSC with our Expert Guidance
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "1.1rem", sm: "1.35rem" },
                color: "#2563EB",
                mb: 1.5,
              }}
            >
              Get a Callback by our UPSC Expert!
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#64748B",
                fontSize: "0.88rem",
                mb: 3,
              }}
            >
              By continuing, you agree to the{" "}
              <Box component="span" sx={{ textDecoration: "underline", color: "#2563EB", cursor: "pointer" }}>
                terms and conditions
              </Box>
              .
            </Typography>

            {submitted ? (
              <Box
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "#FFFFFF",
                  border: "2px solid #86EFAC",
                  textAlign: "center",
                }}
              >
                <CheckCircle2 size={44} color="#16A34A" style={{ margin: "0 auto 12px auto" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#166534", mb: 0.5 }}>
                  Callback Request Confirmed!
                </Typography>
                <Typography variant="body2" sx={{ color: "#334155" }}>
                  Thank you, <strong>{form.values.name}</strong>. Our senior UPSC mentor will contact you at{" "}
                  <strong>+91 {form.values.mobile}</strong> within 15 minutes.
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  sx={{ mt: 2, borderColor: "#16A34A", color: "#16A34A", fontWeight: 700 }}
                >
                  Submit Another Request
                </Button>
              </Box>
            ) : (
              <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "1fr 1.2fr" },
                    gap: 1.5,
                    mb: 1,
                  }}
                >
                  <TextField
                    placeholder="Your Name"
                    {...form.fieldProps("name")}
                    required
                    autoComplete="name"
                    inputProps={{ maxLength: 50, "aria-label": "Your name" }}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <User size={18} color="#64748B" />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      },
                    }}
                  />

                  <TextField
                    placeholder="Your mobile number"
                    {...form.fieldProps("mobile")}
                    required
                    type="tel"
                    autoComplete="tel-national"
                    inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ fontWeight: 800, color: "#1E3A8A", fontSize: "0.95rem", mr: 0.5 }}>
                            +91
                          </Box>
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: "#FFFFFF",
                        borderRadius: "12px",
                        fontSize: "0.95rem",
                        fontWeight: 600,
                      },
                    }}
                  />
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    background: "#FFE51F", // Brand yellow (overrides theme's red gradient)
                    color: "#000000",
                    fontWeight: 900,
                    fontSize: "1.05rem",
                    px: 4,
                    py: 1.4,
                    borderRadius: "12px",
                    boxShadow: "0 6px 18px rgba(242, 213, 0, 0.4)",
                    textTransform: "none",
                    "&:hover": {
                      background: "#F2D500",
                    },
                  }}
                >
                  Get Free Mentorship
                </Button>
              </Box>
            )}
          </Box>

          {/* Right Illustration Area (Matching Screenshot 18.04.50) */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 420,
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#FEF3C7",
                border: "2px solid #FDE68A",
                p: 3,
                boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
                textAlign: "center",
              }}
            >
              {/* Graphic icon grouping */}
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 90,
                  height: 90,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  mb: 2,
                  color: "#D97706",
                }}
              >
                <Sparkles size={46} />
              </Box>

              <Typography variant="h6" sx={{ fontWeight: 800, color: "#78350F", mb: 0.5 }}>
                1-on-1 Personalized Mentoring
              </Typography>
              <Typography variant="body2" sx={{ color: "#92400E", mb: 2, lineHeight: 1.45 }}>
                Discuss syllabus planning, strategy, booklist selection, and optional subject dilemma directly with serving civil servants.
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <Chip
                  label="100% Free Consultation"
                  size="small"
                  sx={{ backgroundColor: "#FFFFFF", color: "#166534", fontWeight: 800 }}
                />
                <Chip
                  label="Zero Obligation"
                  size="small"
                  sx={{ backgroundColor: "#FFFFFF", color: "#1E40AF", fontWeight: 800 }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
