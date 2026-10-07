"use client";

import React, { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Card from "@mui/material/Card";
import { PhoneCall, CheckCircle2, Clock, ChevronRight } from "lucide-react";
import CounsellorIllustration from "@/components/illustrations/CounsellorIllustration";
import { WhatsAppLogo } from "@/components/icons/BrandLogos";
import { CONTACT } from "@/data/contact";
import {
  useFormValidation,
  validateName,
  validateMobile,
  validateRequiredSelect,
  validateConsent,
  sanitizeName,
  sanitizeMobile,
} from "@/utils/validation";

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
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const form = useFormValidation(
    { name: "", mobile: "", course: "", agree: true },
    {
      name: (v) => validateName(v),
      mobile: (v) => validateMobile(v),
      course: validateRequiredSelect("your target exam / course"),
      agree: (v) => validateConsent(v),
    },
    { name: sanitizeName, mobile: sanitizeMobile }
  );
  const { values } = form;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.validateAll(formRef.current)) return;
    setSubmitted(true);
  };

  return (
    <Box
      id="enquiry"
      sx={{
        py: { xs: 3.5, md: 5 },
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
            <CounsellorIllustration width={{ xs: 150, md: 200 }} />
            <Box sx={{ mb: 2 }} />
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

            {/* Call + WhatsApp actions (number is used by the links, not displayed) */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: { xs: 1.25, sm: 2 },
                mb: 4,
                maxWidth: 560,
              }}
            >
              {[
                {
                  key: "call",
                  href: CONTACT.tel,
                  title: "Call Us",
                  subtitle: "Talk to a counsellor",
                  ariaLabel: "Call a Vini IAS counsellor",
                  accent: "#FE0034",
                  tint: "#FFF0F3",
                  border: "#FFD1DA",
                  icon: <PhoneCall size={22} color="#FE0034" strokeWidth={2.2} />,
                  external: false,
                },
                {
                  key: "whatsapp",
                  href: CONTACT.whatsappUrl,
                  title: "WhatsApp",
                  subtitle: "Chat with us instantly",
                  ariaLabel: "Chat with Vini IAS on WhatsApp",
                  accent: "#128C4A",
                  tint: "#EAFBF1",
                  border: "#BDEFD2",
                  icon: <WhatsAppLogo size={24} color="#25D366" />,
                  external: true,
                },
              ].map((c) => (
                <Box
                  key={c.key}
                  component="a"
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={c.ariaLabel}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: { xs: 1.25, sm: 1.5 },
                    p: { xs: 1.5, sm: 1.75 },
                    borderRadius: "14px",
                    backgroundColor: "#FFFFFF",
                    border: `1px solid ${c.border}`,
                    boxShadow: "0 2px 10px rgba(15, 23, 42, 0.05)",
                    textDecoration: "none",
                    color: "inherit",
                    minWidth: 0,
                    transition: "transform .2s ease, box-shadow .2s ease, background-color .2s ease",
                    "& .arrow": { transition: "transform .2s ease" },
                    "&:hover": {
                      transform: "translateY(-2px)",
                      backgroundColor: c.tint,
                      boxShadow: "0 10px 24px rgba(15, 23, 42, 0.08)",
                      "& .arrow": { transform: "translateX(3px)" },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 40, sm: 46 },
                      height: { xs: 40, sm: 46 },
                      flexShrink: 0,
                      borderRadius: "12px",
                      backgroundColor: c.tint,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {c.icon}
                  </Box>
                  <Box sx={{ minWidth: 0, flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Typography component="span" sx={{ fontSize: { xs: "0.92rem", sm: "1rem" }, fontWeight: 700, color: "#0F172A" }}>
                        {c.title}
                      </Typography>
                    </Box>
                    <Typography
                      component="span"
                      sx={{ display: "block", fontSize: { xs: "0.74rem", sm: "0.8rem" }, color: "#64748B", lineHeight: 1.35, whiteSpace: { xs: "normal", sm: "nowrap" }, overflow: "hidden", textOverflow: "ellipsis" }}
                    >
                      {c.subtitle}
                    </Typography>
                  </Box>
                  <Box className="arrow" sx={{ display: { xs: "none", sm: "flex" }, color: c.accent, flexShrink: 0 }}>
                    <ChevronRight size={20} />
                  </Box>
                </Box>
              ))}
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
                  We have registered your query for <strong>{values.course}</strong>. Our counsellor will call you shortly on <strong>+91 {values.mobile}</strong>.
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setSubmitted(false);
                    form.reset();
                  }}
                  sx={{ borderColor: "#FE0034", color: "#FE0034", fontWeight: 700 }}
                >
                  Send Another Enquiry
                </Button>
              </Box>
            ) : (
              <Box component="form" ref={formRef} onSubmit={handleSubmit} noValidate>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ fontWeight: 700, color: "#334155", mb: 0.5, display: "block" }}>
                      Full Name *
                    </Typography>
                    <TextField
                      placeholder="e.g. Rahul Kumar"
                      {...form.fieldProps("name")}
                      required
                      autoComplete="name"
                      inputProps={{ maxLength: 50, "aria-label": "Full name" }}
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
                      {...form.fieldProps("mobile")}
                      required
                      type="tel"
                      autoComplete="tel-national"
                      inputProps={{ inputMode: "numeric", "aria-label": "Mobile number" }}
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
                      {...form.fieldProps("course")}
                      required
                      SelectProps={{
                        displayEmpty: true,
                        onClose: () => form.markTouched("course"),
                        renderValue: (v) =>
                          (v as string) || <span style={{ color: "#94A3B8" }}>Select your exam / course</span>,
                      }}
                      inputProps={{ "aria-label": "Target exam or course" }}
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

                  <Box>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={values.agree}
                        onChange={(e) => {
                          form.setValue("agree", e.target.checked);
                          form.markTouched("agree");
                        }}
                        inputProps={{ "aria-invalid": Boolean(form.visibleError("agree")) }}
                        sx={{ color: "#FE0034", "&.Mui-checked": { color: "#FE0034" } }}
                      />
                    }
                    label={
                      <Typography variant="caption" sx={{ color: "#64748B", fontSize: "0.8rem" }}>
                        By continuing, you agree to the Terms &amp; Conditions and Privacy Policy.
                      </Typography>
                    }
                  />
                  {form.visibleError("agree") && (
                    <FormHelperText error sx={{ mt: -0.5, ml: 0 }}>
                      {form.visibleError("agree")}
                    </FormHelperText>
                  )}
                  </Box>

                  {/* "Call Me Back" Button from PDF Page 3 */}
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{
                      background: "linear-gradient(135deg, #FE0034 0%, #FF3358 100%)",
                      color: "#FFFFFF",
                      fontWeight: 800,
                      fontSize: "1rem",
                      py: 1.4,
                      borderRadius: "12px",
                      boxShadow: "0 6px 18px rgba(254, 0, 52, 0.25)",
                      "&:hover": {
                        background: "linear-gradient(135deg, #CC002A 0%, #FE0034 100%)",
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
