import type { Metadata } from "next";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight, Briefcase, Building2, GraduationCap, Headset, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { getSiteConfig } from "@/services";
import ContactForm from "@/sections/Contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Vini IAS",
  description: "Get in touch with VINI IAS for student support, admissions & counselling, careers and general enquiries. Head office: D-247/4A, Noida Sector 63, Uttar Pradesh.",
  alternates: { canonical: "/contact-us" },
};

const ADDRESS = "D-247/4A, Noida Sector 63, Uttar Pradesh (India)";
const MAP_QUERY = encodeURIComponent("Procapitus Business Park, D-247, 4A, D Block, Sector 63, Noida, Uttar Pradesh 201309");
/** Official Google Maps pin for the head office. */
const MAP_LINK = "https://maps.app.goo.gl/odASbVEKABeAeDMi6";
const PR_EMAIL = "pr@groupvini.in";
const CAREERS_EMAIL = "careers@groupvini.in";

const linkSx = { display: "inline-flex", alignItems: "center", gap: 0.75, color: COLORS.navy, fontWeight: 700, textDecoration: "none", wordBreak: "break-word", "&:hover": { color: COLORS.red } } as const;
const btn = (bg: string, fg: string, border = bg) => ({ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 0.75, height: 42, px: 2, borderRadius: 999, bgcolor: bg, color: fg, border: `1.5px solid ${border}`, fontWeight: 700, fontSize: "0.9rem", textDecoration: "none", whiteSpace: "nowrap", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-1px)", boxShadow: "0 6px 16px rgba(15,23,42,.12)" } }) as const;

function InfoCard({ icon, tone, title, text, children }: { icon: React.ReactNode; tone: { bg: string; fg: string; bar: string }; title: string; text: string; children: React.ReactNode }) {
  return (
    <Box sx={{ position: "relative", display: "flex", flexDirection: "column", p: { xs: 2.5, md: 3 }, borderRadius: "20px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, borderTop: `4px solid ${tone.bar}`, boxShadow: "0 14px 34px rgba(15,23,42,.07)", transition: "transform .25s, box-shadow .25s", "&:hover": { transform: "translateY(-4px)", boxShadow: "0 22px 44px rgba(15,23,42,.12)" } }}>
      <Box sx={{ width: 52, height: 52, borderRadius: "14px", bgcolor: tone.bg, color: tone.fg, display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</Box>
      <Typography component="h3" sx={{ mt: 2, fontWeight: 800, color: COLORS.navy, fontSize: "1.2rem" }}>{title}</Typography>
      <Typography sx={{ mt: 0.75, color: COLORS.textSecondary, fontSize: "0.94rem", lineHeight: 1.6 }}>{text}</Typography>
      <Box sx={{ mt: "auto", pt: 2.25, display: "grid", gap: 1.25 }}>{children}</Box>
    </Box>
  );
}

export default async function ContactUsPage() {
  const { contact } = await getSiteConfig();

  return (
    <>
      {/* hero */}
      <Box component="section" sx={{ position: "relative", overflow: "hidden", color: "#FFFFFF", textAlign: "center", pt: { xs: 6, md: 9 }, pb: { xs: 12, md: 14 }, background: `radial-gradient(circle at 15% 20%, rgba(254,0,52,.38), transparent 42%), radial-gradient(circle at 85% 85%, rgba(255,229,31,.16), transparent 40%), linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`, "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.08) 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" } }}>
        <Container sx={{ position: "relative", maxWidth: "860px !important" }}>
          <Box component="span" sx={{ display: "inline-block", px: 1.75, py: 0.5, borderRadius: 999, bgcolor: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: ".12em" }}>CONTACT US</Box>
          <Typography component="h1" sx={{ mt: 2.5, fontWeight: 800, fontSize: { xs: "2rem", sm: "2.6rem", md: "3.3rem" }, lineHeight: 1.12 }}>
            We&apos;re Here to Help You <Box component="span" sx={{ color: COLORS.yellow }}>Succeed!</Box>
          </Typography>
          <Typography sx={{ mt: 2.5, color: "rgba(255,255,255,.85)", fontSize: { xs: "1rem", md: "1.12rem" }, lineHeight: 1.7 }}>
            Have questions about UPSC, BPSC, or other competitive exam preparation? Our team is here to guide you at every step of your learning journey.
          </Typography>
          <Typography sx={{ mt: 1.25, color: "rgba(255,255,255,.7)", fontSize: { xs: "0.95rem", md: "1rem" } }}>
            Get in touch with VINI IAS and take the next step towards your dream career.
          </Typography>
        </Container>
      </Box>

      {/* get in touch */}
      <Container sx={{ maxWidth: "1160px !important", mt: { xs: -8, md: -9 }, position: "relative", zIndex: 1 }}>
        <Typography component="h2" sx={{ position: "absolute", top: 0, left: 0, width: "1px", height: "1px", m: "-1px", p: 0, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap", border: 0 }}>Get in Touch</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: { xs: 2, md: 2.5 } }}>
          <InfoCard icon={<Headset size={26} />} tone={{ bg: COLORS.redTint, fg: COLORS.red, bar: COLORS.red }} title="Student Support" text="For course access, app-related issues, study materials, and technical assistance.">
            <Box component="a" href={`mailto:${contact.email}`} sx={linkSx}><Mail size={17} color={COLORS.red} /> {contact.email}</Box>
            <Box component="a" href={contact.tel} sx={linkSx}><Phone size={17} color={COLORS.red} /> {contact.phoneDisplay}</Box>
          </InfoCard>
          <InfoCard icon={<GraduationCap size={26} />} tone={{ bg: "#FFF7CC", fg: "#8A6D00", bar: COLORS.yellowDark }} title="Admissions & Counselling" text="Need help choosing the right course? Connect with our counselling team for course details, fees, and batch information.">
            <Typography sx={{ color: COLORS.body, fontSize: "0.9rem", fontWeight: 600 }}>Contact us for course guidance.</Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Box component="a" href={contact.tel} sx={btn(COLORS.red, "#FFFFFF")}><Phone size={16} /> Call now</Box>
              <Box component="a" href={contact.whatsappUrl} target="_blank" rel="noopener noreferrer" sx={btn("#FFFFFF", "#128C4B", "#BBF7D0")}><MessageCircle size={16} /> WhatsApp</Box>
            </Box>
          </InfoCard>
          <InfoCard icon={<Building2 size={26} />} tone={{ bg: "#E8EEF8", fg: COLORS.navy, bar: COLORS.navy }} title="General Enquiries" text="For media, partnerships, business enquiries, institutional collaborations, and other official matters.">
            <Box component="a" href={`mailto:${PR_EMAIL}`} sx={linkSx}><Mail size={17} color={COLORS.red} /> {PR_EMAIL}</Box>
          </InfoCard>
        </Box>
      </Container>

      {/* form + office */}
      <Container sx={{ maxWidth: "1160px !important", py: { xs: 6, md: 9 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.35fr 1fr" }, gap: { xs: 3, md: 4 }, alignItems: "start" }}>
        <Box component="section" id="message" aria-labelledby="message-title" sx={{ scrollMarginTop: 90, p: { xs: 2.5, md: 4 }, borderRadius: "22px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 18px 44px rgba(15,23,42,.07)" }}>
          <Typography id="message-title" component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.5rem", md: "1.9rem" } }}>Send Us a Message</Typography>
          <Box sx={{ width: 56, height: 4, borderRadius: 2, mt: 1, background: `linear-gradient(90deg, ${COLORS.red}, ${COLORS.yellow})` }} />
          <Typography sx={{ mt: 1.5, mb: 3, color: COLORS.textSecondary }}>Fill out the form below, and our team will get in touch with you.</Typography>
          <ContactForm />
        </Box>

        <Box sx={{ display: "grid", gap: { xs: 2, md: 2.5 } }}>
          {/* head office */}
          <Box component="section" aria-labelledby="office-title" sx={{ borderRadius: "22px", overflow: "hidden", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 14px 34px rgba(15,23,42,.07)" }}>
            <Box component="iframe" title="VINI IAS head office map" src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" sx={{ display: "block", width: "100%", height: { xs: 200, md: 220 }, border: 0, bgcolor: COLORS.surface }} />
            <Box sx={{ p: { xs: 2.25, md: 2.75 } }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <MapPin size={20} color={COLORS.red} />
                <Typography id="office-title" component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "1.2rem" }}>Head Office</Typography>
              </Box>
              <Box component="a" href={MAP_LINK} target="_blank" rel="noopener noreferrer" sx={{ display: "block", mt: 1, color: COLORS.body, lineHeight: 1.6, textDecoration: "none", "&:hover": { color: COLORS.red } }}>
                Procapitus Business Park, {ADDRESS}
              </Box>
              <Box sx={{ mt: 1.75, pt: 1.75, borderTop: `1px dashed ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
                <Box>
                  <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem", fontWeight: 600 }}>Enquiry</Typography>
                  <Box component="a" href={`mailto:${contact.email}`} sx={linkSx}>{contact.email}</Box>
                </Box>
                <Box component="a" href={MAP_LINK} target="_blank" rel="noopener noreferrer" sx={btn("#FFFFFF", COLORS.navy, COLORS.border)}><Navigation size={15} /> Directions</Box>
              </Box>
            </Box>
          </Box>

          {/* careers */}
          <Box component="section" aria-labelledby="careers-title" sx={{ position: "relative", overflow: "hidden", p: { xs: 2.5, md: 3 }, borderRadius: "22px", color: "#FFFFFF", background: `linear-gradient(140deg, ${COLORS.navy} 0%, ${COLORS.navyDark} 100%)` }}>
            <Box aria-hidden sx={{ position: "absolute", right: -40, top: -40, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,229,31,.25), transparent 70%)" }} />
            <Box sx={{ position: "relative", display: "flex", alignItems: "center", gap: 1 }}>
              <Briefcase size={20} color={COLORS.yellow} />
              <Typography id="careers-title" component="h2" sx={{ fontWeight: 800, fontSize: "1.2rem" }}>For Careers</Typography>
            </Box>
            <Typography sx={{ position: "relative", mt: 0.75, color: "rgba(255,255,255,.8)", fontSize: "0.92rem" }}>Want to build the future of learning with us?</Typography>
            <Box component="a" href={`mailto:${CAREERS_EMAIL}`} sx={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 0.75, mt: 1.25, color: "#FFFFFF", fontWeight: 700, textDecoration: "none", "&:hover": { color: COLORS.yellow } }}>
              <Mail size={16} color={COLORS.yellow} /> {CAREERS_EMAIL}
            </Box>
            <Box sx={{ position: "relative", mt: 2 }}>
              <Box component={Link} href="/careers#openings" sx={{ ...btn(COLORS.yellow, COLORS.navy), height: 46, px: 2.75, fontWeight: 800 }}>
                Apply for Job <ArrowRight size={17} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* closing CTA */}
      <Box component="section" sx={{ position: "relative", overflow: "hidden", py: { xs: 7, md: 9 }, textAlign: "center", color: "#FFFFFF", background: `linear-gradient(120deg, ${COLORS.red} 0%, ${COLORS.redDarker} 100%)`, "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: "radial-gradient(rgba(255,255,255,.1) 1.2px, transparent 1.2px)", backgroundSize: "22px 22px" } }}>
        <Container sx={{ position: "relative", maxWidth: "820px !important" }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.7rem", md: "2.4rem" }, lineHeight: 1.2 }}>
            Your Dream. Our Guidance. <Box component="span" sx={{ color: COLORS.yellow }}>Your Success.</Box>
          </Typography>
          <Typography sx={{ mt: 2, color: "rgba(255,255,255,.88)", fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.7 }}>
            Every aspirant deserves the right guidance and an opportunity to succeed. Connect with VINI IAS and begin your preparation journey with confidence.
          </Typography>
          <Box component={Link} href="/courses" sx={{ ...btn(COLORS.yellow, COLORS.navy), mt: 3.5, height: 50, px: 3.5, fontSize: "1rem", fontWeight: 800, letterSpacing: ".03em" }}>
            EXPLORE OUR COURSES <ArrowRight size={18} />
          </Box>
        </Container>
      </Box>
    </>
  );
}
