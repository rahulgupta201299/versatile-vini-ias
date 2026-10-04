"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import {
  Facebook,
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Send,
  Phone,
  Mail,
  MessageCircle,
  MapPin,
  Play,
  Apple,
} from "lucide-react";
import {
  COMPANY_LINKS,
  UPCOMING_CENTRES,
  QUICK_LINKS,
  OUR_PRODUCTS,
  OUR_BRANDS,
  FREE_LEARNING_RESOURCES,
} from "@/data/footerData";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#F8FAFC",
        borderTop: "1px solid #E2E8F0",
        color: "#334155",
        pt: { xs: 6, md: 8 },
        pb: 4,
      }}
    >
      <Container>
        {/* TIER 1: Company, App Buttons, Socials & Core Directories (PDF Page 4 & Screenshot 18.06.48) */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "2fr 1fr 1fr 1fr 1fr 1fr",
            },
            gap: 4,
            mb: 6,
          }}
        >
          {/* Brand Col */}
          <Box sx={{ gridColumn: { xs: "span 1", sm: "span 2", md: "span 1", lg: "span 1" } }}>
            <Box sx={{ position: "relative", width: 140, height: 46, mb: 2 }}>
              <Image src="/images/logo.png" alt="Vini IAS" fill style={{ objectFit: "contain" }} />
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "#64748B", fontSize: "0.85rem", lineHeight: 1.6, mb: 3, maxWidth: 300 }}
            >
              We understand that every student has unique needs and abilities, that&#39;s why our curriculum is designed to adapt to your needs and help you grow!
            </Typography>

            {/* App Badges */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25, mb: 3, maxWidth: 180 }}>
              <Box
                component="a"
                href="#download"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  p: "8px 14px",
                  borderRadius: "8px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  "&:hover": { backgroundColor: "#1E293B" },
                }}
              >
                <Play size={18} fill="#FFFFFF" />
                <Box>
                  <Typography variant="caption" sx={{ fontSize: "0.62rem", display: "block", opacity: 0.8 }}>
                    GET IT ON
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.78rem", fontWeight: 800 }}>
                    Google Play
                  </Typography>
                </Box>
              </Box>

              <Box
                component="a"
                href="#download"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.25,
                  p: "8px 14px",
                  borderRadius: "8px",
                  backgroundColor: "#000000",
                  color: "#FFFFFF",
                  textDecoration: "none",
                  "&:hover": { backgroundColor: "#1E293B" },
                }}
              >
                <Apple size={20} />
                <Box>
                  <Typography variant="caption" sx={{ fontSize: "0.62rem", display: "block", opacity: 0.8 }}>
                    Download on the
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "0.78rem", fontWeight: 800 }}>
                    App Store
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Social Links */}
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "0.88rem", mb: 1.25 }}>
              Let&#39;s get social :
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {[
                { icon: <Facebook size={18} />, color: "#1877F2", label: "Facebook" },
                { icon: <Instagram size={18} />, color: "#E4405F", label: "Instagram" },
                { icon: <Youtube size={18} />, color: "#CD201F", label: "YouTube" },
                { icon: <Linkedin size={18} />, color: "#0A66C2", label: "LinkedIn" },
                { icon: <Twitter size={18} />, color: "#1DA1F2", label: "Twitter" },
                { icon: <Send size={18} />, color: "#0088CC", label: "Telegram" },
              ].map((item, idx) => (
                <IconButton
                  key={idx}
                  size="small"
                  aria-label={item.label}
                  sx={{
                    backgroundColor: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    color: item.color,
                    "&:hover": { backgroundColor: "#F1F5F9" },
                  }}
                >
                  {item.icon}
                </IconButton>
              ))}
            </Box>
          </Box>

          {/* Col 2: Company */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "0.95rem", mb: 2 }}>
              Company
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {COMPANY_LINKS.map((link, idx) => (
                <Typography
                  key={idx}
                  component="a"
                  href={link.href}
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    "&:hover": { color: "#8B1D24" },
                  }}
                >
                  {link.name}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Col 3: Upcoming Centres */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "0.95rem", mb: 2 }}>
              Upcoming Centres
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {UPCOMING_CENTRES.map((centre, idx) => (
                <Typography
                  key={idx}
                  component="a"
                  href={centre.href}
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    "&:hover": { color: "#8B1D24" },
                  }}
                >
                  <MapPin size={13} color="#8B1D24" />
                  {centre.name}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Col 4: Connect With Us */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "0.95rem", mb: 2 }}>
              Connect with us
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.25 }}>
              <Typography
                component="a"
                href="mailto:support@viniias.com"
                variant="body2"
                sx={{
                  color: "#64748B",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  "&:hover": { color: "#8B1D24" },
                }}
              >
                <Mail size={15} color="#8B1D24" />
                Email us
              </Typography>

              <Typography
                component="a"
                href="#enquiry"
                variant="body2"
                sx={{
                  color: "#64748B",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  "&:hover": { color: "#8B1D24" },
                }}
              >
                <MessageCircle size={15} color="#8B1D24" />
                Talk to counsellor
              </Typography>

              <Typography
                component="a"
                href="https://wa.me/918544078245"
                target="_blank"
                variant="body2"
                sx={{
                  color: "#64748B",
                  textDecoration: "none",
                  fontSize: "0.85rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                  "&:hover": { color: "#16A34A" },
                }}
              >
                <Phone size={15} color="#16A34A" />
                WhatsApp Now
              </Typography>

              <Typography
                component="a"
                href="tel:+918544078245"
                variant="body2"
                sx={{
                  color: "#8B1D24",
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                }}
              >
                <Phone size={15} color="#8B1D24" />
                Call: 8544078245
              </Typography>
            </Box>
          </Box>

          {/* Col 5: Quick Links & Our Courses */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "0.95rem", mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {QUICK_LINKS.slice(0, 5).map((item, idx) => (
                <Typography
                  key={idx}
                  component="a"
                  href={item.href}
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    "&:hover": { color: "#8B1D24" },
                  }}
                >
                  {item.name}
                </Typography>
              ))}
            </Box>
          </Box>

          {/* Col 6: Our Products */}
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#1E293B", fontSize: "0.95rem", mb: 2 }}>
              Our Products
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {OUR_PRODUCTS.map((prod, idx) => (
                <Typography
                  key={idx}
                  component="a"
                  href={prod.href}
                  variant="body2"
                  sx={{
                    color: "#64748B",
                    textDecoration: "none",
                    fontSize: "0.85rem",
                    "&:hover": { color: "#8B1D24" },
                  }}
                >
                  {prod.name}
                </Typography>
              ))}
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#E2E8F0" }} />

        {/* TIER 2: Free Learning Resources (PDF Pages 4 & 5 & Screenshot 18.06.55) */}
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.3rem", sm: "1.5rem" },
              color: "#1E293B",
              mb: 3,
            }}
          >
            Free Learning Resources
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 4,
            }}
          >
            {FREE_LEARNING_RESOURCES.map((col, idx) => (
              <Box key={idx}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 800,
                    color: "#1E293B",
                    fontSize: "0.92rem",
                    mb: 1.5,
                  }}
                >
                  {col.title}
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 0.8 }}>
                  {col.links.map((link, lIdx) => (
                    <Typography
                      key={lIdx}
                      component="a"
                      href={link.href}
                      variant="body2"
                      sx={{
                        color: "#64748B",
                        textDecoration: "none",
                        fontSize: "0.82rem",
                        lineHeight: 1.4,
                        "&:hover": { color: "#8B1D24", textDecoration: "underline" },
                      }}
                    >
                      {link.name}
                    </Typography>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 4, borderColor: "#E2E8F0" }} />

        {/* TIER 3: Our Brands (PDF Page 6) */}
        <Box sx={{ mb: 5 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 800,
              color: "#1E293B",
              fontSize: "0.92rem",
              mb: 1.5,
            }}
          >
            Our Ecosystem Brands
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.25 }}>
            {OUR_BRANDS.map((brand, idx) => (
              <Box
                key={idx}
                component="a"
                href={brand.href}
                sx={{
                  px: 1.75,
                  py: 0.6,
                  borderRadius: "8px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  color: "#334155",
                  textDecoration: "none",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    borderColor: "#8B1D24",
                    color: "#8B1D24",
                    backgroundColor: "#FEF2F2",
                  },
                }}
              >
                {brand.name}
              </Box>
            ))}
          </Box>
        </Box>

        {/* TIER 4: Know about VINI IAS & We Stand Out (PDF Page 6 & Screenshot 18.07.01 SEO block) */}
        <Box sx={{ mb: 5, p: { xs: 2.5, md: 3.5 }, borderRadius: "16px", backgroundColor: "#FFFFFF", border: "1px solid #E2E8F0" }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#1E293B", mb: 1 }}>
            Know about VINI IAS
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.82rem", lineHeight: 1.6, mb: 2 }}>
            VINI IAS is an Indian EdTech platform that provides accessible &amp; comprehensive learning experiences to aspirants preparing for UPSC Civil Services, BPSC, State PCS, and other competitive examinations. We provide extensive study materials, NCERT solutions, previous year question papers, and daily answer writing guidance to empower thousands of students across the country.
          </Typography>

          <Typography variant="subtitle1" sx={{ fontWeight: 900, color: "#1E293B", mb: 1 }}>
            We Stand Out Because
          </Typography>
          <Typography variant="body2" sx={{ color: "#64748B", fontSize: "0.82rem", lineHeight: 1.6 }}>
            We provide students with intensive courses led by qualified &amp; experienced faculties and serving civil servant mentors. Vini IAS strives to make civil service preparation comprehensive, affordable, and accessible to students of all sections of society, transforming humble dreams into top ranks.
          </Typography>
        </Box>

        {/* Bottom Bar (PDF Page 6 & Screenshot 18.07.01) */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
            pt: 3,
            borderTop: "1px solid #E2E8F0",
            fontSize: "0.82rem",
            color: "#64748B",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Link href="#privacy" style={{ color: "inherit", textDecoration: "none" }}>
              Privacy Policy
            </Link>
            <span>|</span>
            <Link href="#terms" style={{ color: "inherit", textDecoration: "none" }}>
              Terms of Use
            </Link>
          </Box>

          <Typography variant="body2" sx={{ fontSize: "0.82rem", color: "#64748B" }}>
            Copyright © {new Date().getFullYear()} Vini Educentre Pvt. LTD. All rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
