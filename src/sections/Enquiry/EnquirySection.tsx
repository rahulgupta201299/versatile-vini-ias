"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import Card from "@mui/material/Card";
import { PhoneCall, CheckCircle2, Clock } from "lucide-react";

const COURSE_OPTIONS = [
  "Sankalp UPSC CSE 2026/27 GS Foundation",
  "Aarambh 71st BPSC Prelims + Mains",
  "Mains Answer Writing & Enrichment Program (MAWEP)",
  "Ethics (GS-4) & Essay 250+ Marks Mastery",
  "Hindi Literature Optional Batch",
  "UPSC Plan B Comprehensive Package",
  "All India Prelims Test Series 2026",
];

export default function EnquirySection() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [course, setCourse] = useState(COURSE_OPTIONS[0]);
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please provide your name");
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      setError("Please provide a valid 10-digit mobile number");
      return;
    }
    if (!agree) {
      setError("Please agree to the Terms & Conditions to proceed");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  return (
    <Box
      id="enquiry"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: "#F8FAFC",
        borderTop: "1px solid #E2E8F0",
      }}
    >
      <Container>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1.1fr 1fr" },
            gap: { xs: 4, lg: 7 },
            alignItems: "center",
          }}
        >
          {/* Left Description (From PDF Page 3) */}
          <Box>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                fontSize: { xs: "2rem", sm: "2.6rem", md: "3.2rem" },
                color: "#1E293B",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
                mb: 1.5,
              }}
            >
              Still In Doubt?
            </Typography>

            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#64748B",
                fontSize: { xs: "1.05rem", sm: "1.25rem" },
                lineHeight: 1.5,
                mb: 3,
              }}
            >
              Let us know any query regarding your UPSC or State PCS preparation and we&#39;ll guide you in the right direction.
            </Typography>

            {/* Direct Phone Call Card from PDF Page 3 */}
            <Box
              component="a"
              href="tel:+918544078245"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                p: { xs: 2, sm: 2.5 },
                borderRadius: "16px",
                backgroundColor: "#FFFFFF",
                border: "2px solid #8B1D24",
                boxShadow: "0 8px 20px rgba(139, 29, 36, 0.08)",
                textDecoration: "none",
                color: "inherit",
                mb: 4,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 28px rgba(139, 29, 36, 0.15)",
                },
              }}
            >
              <Box
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  backgroundColor: "#FEF2F2",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#8B1D24",
                }}
              >
                <PhoneCall size={26} />
              </Box>
              <Box>
                <Typography variant="caption" sx={{ color: "#64748B", fontWeight: 700, textTransform: "uppercase" }}>
                  Direct Helpline
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 900, color: "#8B1D24", letterSpacing: "0.02em" }}>
                  +91 8544 078245
                </Typography>
              </Box>
            </Box>

            {/* Trust points */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#334155" }}>
                <CheckCircle2 size={18} color="#16A34A" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Personal counselling by faculty members who have cleared UPSC/PCS Mains
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, color: "#334155" }}>
                <Clock size={18} color="#2563EB" />
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  Immediate response guaranteed between 9:00 AM – 8:00 PM (Mon-Sat)
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Form Card (From PDF Page 3) */}
          <Card
            sx={{
              p: { xs: 3, sm: 4 },
              borderRadius: "24px",
              border: "1px solid #E2E8F0",
              boxShadow: "0 12px 32px rgba(0,0,0,0.06)",
              backgroundColor: "#FFFFFF",
            }}
          >
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#1E293B", mb: 0.5 }}>
              Request a Guided Call
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", mb: 3 }}>
              Fill in your details below and our academic mentor will call you back.
            </Typography>

            {submitted ? (
              <Box sx={{ textAlign: "center", py: 3 }}>
                <CheckCircle2 size={50} color="#16A34A" style={{ margin: "0 auto 12px auto" }} />
                <Typography variant="h6" sx={{ fontWeight: 800, color: "#166534", mb: 1 }}>
                  Enquiry Submitted Successfully!
                </Typography>
                <Typography variant="body2" sx={{ color: "#475569", mb: 3 }}>
                  We have registered your query for <strong>{course}</strong>. Our counsellor will call you shortly on <strong>+91 {mobile}</strong>.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSubmitted(false);
                    setName("");
                    setMobile("");
                  }}
                  sx={{ borderColor: "#8B1D24", color: "#8B1D24", fontWeight: 700 }}
                >
                  Send Another Enquiry
                </Button>
              </Box>
            ) : (
              <Box component="form" onSubmit={handleSubmit} noValidate>
                {error && (
                  <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
                    {error}
                  </Alert>
                )}

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2.25 }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#334155", mb: 0.5, display: "block" }}>
                      Full Name *
                    </Typography>
                    <TextField
                      placeholder="e.g. Rahul Kumar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      InputProps={{ sx: { borderRadius: "10px" } }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#334155", mb: 0.5, display: "block" }}>
                      Mobile Number (+91) *
                    </Typography>
                    <TextField
                      placeholder="10-digit mobile number"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      InputProps={{ sx: { borderRadius: "10px" } }}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#334155", mb: 0.5, display: "block" }}>
                      Target Exam / Course *
                    </Typography>
                    <TextField
                      select
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      fullWidth
                      variant="outlined"
                      size="medium"
                      InputProps={{ sx: { borderRadius: "10px" } }}
                    >
                      {COURSE_OPTIONS.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                          {opt}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={agree}
                        onChange={(e) => setAgree(e.target.checked)}
                        sx={{ color: "#8B1D24", "&.Mui-checked": { color: "#8B1D24" } }}
                      />
                    }
                    label={
                      <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.8rem" }}>
                        By continuing, you agree to the Terms &amp; Conditions and Privacy Policy.
                      </Typography>
                    }
                  />

                  {/* "Call Me Back" Button from PDF Page 3 */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, #8B1D24 0%, #A8323A 100%)",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "1rem",
                      py: 1.4,
                      borderRadius: "12px",
                      boxShadow: "0 6px 18px rgba(139, 29, 36, 0.25)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #70161C 0%, #8B1D24 100%)",
                      },
                    }}
                  >
                    Call Me Back
                  </Button>
                </Box>
              </Box>
            )}
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
