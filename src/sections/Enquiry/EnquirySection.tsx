"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { PhoneCall, ChevronRight } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandLogos";
import { useSiteData } from "@/context/SiteDataContext";
import { CounsellingCard } from "@/sections/CoursePage/CounsellingForm";
import { COLORS } from "@/theme/colors";

const COURSE_OPTIONS = [
  "Sankalp UPSC CSE 2026/27 GS Foundation",
  "Aarambh 71st BPSC Prelims + Mains",
  "Mains Answer Writing & Enrichment Program (MAWEP)",
  "Ethics (GS-4) & Essay 250+ Marks Mastery",
  "Hindi Literature Optional Batch",
  "UPSC Plan B Comprehensive Package",
  "All India Prelims Test Series 2026",
];

/** "VINI IAS Learner Support" (hours + Call / WhatsApp) beside the "Get Free Counselling Today" form. */
export default function EnquirySection() {
  const { contact } = useSiteData().config;

  return (
    <Box
      component="section"
      id="enquiry"
      aria-labelledby="learner-support-title"
      sx={{ pt: { xs: 4, md: 6, lg: 10 }, pb: { xs: 4, md: 6 }, backgroundColor: COLORS.surface, borderTop: `1px solid ${COLORS.border}` }}
    >
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "minmax(0, 1fr)", lg: "1fr 1fr" }, gap: { xs: 9, lg: 7 }, alignItems: "center" }}>
          <Box sx={{ textAlign: { xs: "center", lg: "left" } }}>
            <Typography id="learner-support-title" component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", sm: "2rem", md: "2.4rem" }, color: COLORS.ink, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              VINI IAS <Box component="span" sx={{ color: COLORS.red }}>Learner Support</Box>
            </Typography>
            <Typography sx={{ mt: 1.25, mb: { xs: 2.5, md: 3.5 }, color: COLORS.muted, fontSize: { xs: "1rem", md: "1.15rem" }, lineHeight: 1.55 }}>
              Talk to our experts. We are available Monday to Saturday, 9 AM to 8 PM.
            </Typography>

            {/* Call + WhatsApp actions (number is used by the links, not displayed) */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: { xs: 1.25, sm: 2 },
                maxWidth: 560,
                mx: { xs: "auto", lg: 0 },
                textAlign: "left",
              }}
            >
              {[
                {
                  key: "call",
                  href: contact.tel,
                  title: "Call Us",
                  subtitle: "Talk to a counsellor",
                  ariaLabel: "Call a Vini IAS counsellor",
                  accent: COLORS.red,
                  tint: COLORS.redTint,
                  border: "#FFD1DA",
                  icon: <PhoneCall size={22} color={COLORS.red} strokeWidth={2.2} />,
                  external: false,
                },
                {
                  key: "whatsapp",
                  href: contact.whatsappUrl,
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
                      <Typography component="span" sx={{ fontSize: { xs: "0.92rem", sm: "1rem" }, fontWeight: 700, color: COLORS.ink }}>
                        {c.title}
                      </Typography>
                    </Box>
                    <Typography
                      component="span"
                      sx={{ display: "block", fontSize: { xs: "0.74rem", sm: "0.8rem" }, color: COLORS.muted, lineHeight: 1.35, whiteSpace: { xs: "normal", sm: "nowrap" }, overflow: "hidden", textOverflow: "ellipsis" }}
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

          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CounsellingCard examOptions={COURSE_OPTIONS} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
