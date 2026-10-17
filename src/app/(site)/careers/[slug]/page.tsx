import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Clock, MapPin, Star } from "lucide-react";
import { getCareersContent } from "@/services";
import { COLORS } from "@/theme/colors";
import ShareBlog from "@/sections/Blog/ShareBlog";
import JobApplyForm from "@/sections/Company/JobApplyForm";
import MobileApplyBar from "@/sections/Company/MobileApplyBar";
import { byNewest, formatPosted, jobPath, jobUrl, shareText, SITE_URL } from "@/sections/Company/careerUtils";
import { solidPill } from "@/sections/Company/careerStyles";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const { jobs } = await getCareersContent();
  return jobs.map((j) => ({ slug: j.id }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = (await getCareersContent()).jobs.find((j) => j.id === slug);
  if (!job) return {};
  const title = `${job.title} — ${job.location} | Careers at Vini IAS`;
  return { title, description: job.summary, alternates: { canonical: jobPath(job.id) }, openGraph: { title, description: job.summary, url: jobUrl(job.id), type: "website" } };
}

const EMPLOYMENT: Record<string, string> = { "Full-time": "FULL_TIME", "Part-time": "PART_TIME", Internship: "INTERN", Contract: "CONTRACTOR" };

function JdList({ title, items }: { title: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <Box sx={{ mt: 3.5 }}>
      <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "1.2rem", mb: 1.5 }}>{title}</Typography>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 1.25 }}>
        {items.map((t) => (
          <Box component="li" key={t} sx={{ display: "flex", gap: 1.25, color: COLORS.body, fontSize: "1rem", lineHeight: 1.6 }}>
            <CheckCircle2 size={19} color={COLORS.red} style={{ flexShrink: 0, marginTop: 3 }} /> {t}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default async function CareerJobPage({ params }: Params) {
  const { slug } = await params;
  const careers = await getCareersContent();
  const job = careers.jobs.find((j) => j.id === slug);
  if (!job) notFound();
  const others = careers.jobs.filter((j) => j.id !== job.id).sort(byNewest).slice(0, 3);
  const remote = /remote/i.test(job.location);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: `<p>${job.summary}</p><ul>${[...job.responsibilities, ...job.requirements].map((x) => `<li>${x}</li>`).join("")}</ul>`,
    datePosted: job.postedAt,
    employmentType: EMPLOYMENT[job.type] ?? "OTHER",
    hiringOrganization: { "@type": "Organization", name: "Vini Eduventure Pvt. Ltd. (VINI IAS)", sameAs: SITE_URL, logo: `${SITE_URL}/images/logo.png` },
    ...(remote ? { jobLocationType: "TELECOMMUTE", applicantLocationRequirements: { "@type": "Country", name: "India" } } : {}),
    jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: job.location.replace(/\s*\/\s*Remote/i, ""), addressCountry: "IN" } },
    directApply: true,
  };

  const meta = [
    { icon: <MapPin size={16} />, text: job.location },
    { icon: <Clock size={16} />, text: job.type },
    ...(job.experience ? [{ icon: <Star size={16} />, text: job.experience }] : []),
    { icon: <CalendarDays size={16} />, text: `Posted ${formatPosted(job.postedAt)}` },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* header band */}
      <Box component="section" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 3.5, md: 5 }, background: `linear-gradient(180deg, ${COLORS.redTintSoft} 0%, #FFFFFF 100%)`, borderBottom: `1px solid ${COLORS.border}` }}>
        <Container sx={{ maxWidth: "1120px !important" }}>
          <Box component={Link} href="/careers#openings" sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, color: COLORS.muted, fontWeight: 600, fontSize: "0.9rem", textDecoration: "none", "&:hover": { color: COLORS.red } }}>
            <ArrowLeft size={16} /> Back to all roles
          </Box>
          <Typography sx={{ mt: 2.5, color: COLORS.red, fontWeight: 800, fontSize: "0.78rem", letterSpacing: ".1em", textTransform: "uppercase" }}>{job.team}</Typography>
          <Typography component="h1" sx={{ mt: 0.75, fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.75rem", md: "2.5rem" }, lineHeight: 1.15 }}>{job.title}</Typography>
          <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 1 }}>
            {meta.map((m) => (
              <Box key={m.text} sx={{ display: "inline-flex", alignItems: "center", gap: 0.6, px: 1.25, py: 0.6, borderRadius: "10px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, color: COLORS.body, fontSize: "0.88rem", fontWeight: 500 }}>
                {m.icon} {m.text}
              </Box>
            ))}
          </Box>
          <Box sx={{ mt: 2.75, display: "flex", alignItems: "center", gap: 1.25 }}>
            <Box component="a" href="#apply" sx={{ ...solidPill, height: 46, px: 3 }}>Apply now <ArrowDown size={17} /></Box>
            <ShareBlog variant="icon" title={job.title} message={shareText(job)} url={jobUrl(job.id)} id={job.id} campaign={`job_${job.id}`} dialogTitle="Share this job" />
          </Box>
        </Container>
      </Box>

      {/* JD + apply */}
      <Container sx={{ maxWidth: "1120px !important", py: { xs: 4, md: 6 }, pb: { xs: 12, md: 8 }, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.25fr 1fr" }, gap: { xs: 4, md: 5 }, alignItems: "start" }}>
        <Box component="article">
          <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "1.2rem", mb: 1.25 }}>About the role</Typography>
          <Typography sx={{ color: COLORS.body, fontSize: "1.02rem", lineHeight: 1.7 }}>{job.summary}</Typography>
          <JdList title="What you'll do" items={job.responsibilities} />
          <JdList title="What we're looking for" items={job.requirements} />

          <Box sx={{ mt: 4, p: 2.5, borderRadius: "16px", bgcolor: "#FFFBEA", border: "1px solid #F5E08A" }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.navy, mb: 1 }}>Why VINI GROUP?</Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {careers.benefits.map((b) => (
                <Box key={b.title} component="span" sx={{ px: 1.25, py: 0.5, borderRadius: 999, bgcolor: "#FFFFFF", border: "1px solid #F5E08A", color: COLORS.body, fontSize: "0.85rem", fontWeight: 600 }}>{b.title}</Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box component="section" id="apply" aria-labelledby="apply-title" sx={{ scrollMarginTop: 90, position: { md: "sticky" }, top: { md: 96 }, p: { xs: 2.25, sm: 3 }, borderRadius: "20px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 18px 44px rgba(15,23,42,.08)" }}>
          <Typography id="apply-title" component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "1.35rem" }}>Apply for this role</Typography>
          <Typography sx={{ mt: 0.5, mb: 2.25, color: COLORS.textSecondary, fontSize: "0.9rem" }}>Takes about 2 minutes — verify your number and share your details.</Typography>
          <JobApplyForm job={job} />
        </Box>
      </Container>

      {/* more roles */}
      {others.length > 0 && (
        <Box component="section" sx={{ py: { xs: 5, md: 7 }, pb: { xs: 12, md: 7 }, bgcolor: COLORS.surface }}>
          <Container sx={{ maxWidth: "1120px !important" }}>
            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 2.5, gap: 2 }}>
              <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.3rem", md: "1.6rem" } }}>Other open roles</Typography>
              <Box component={Link} href="/careers#openings" sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, color: COLORS.red, fontWeight: 700, textDecoration: "none", fontSize: "0.92rem" }}>View all <ArrowRight size={16} /></Box>
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: 2 }}>
              {others.map((o) => (
                <Box key={o.id} component={Link} href={jobPath(o.id)} sx={{ display: "block", p: 2.25, borderRadius: "14px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, textDecoration: "none", transition: "border-color .2s, transform .2s", "&:hover": { borderColor: COLORS.redBorder, transform: "translateY(-2px)" } }}>
                  <Typography sx={{ color: COLORS.red, fontWeight: 800, fontSize: "0.7rem", letterSpacing: ".08em", textTransform: "uppercase" }}>{o.team}</Typography>
                  <Typography sx={{ mt: 0.5, fontWeight: 800, color: COLORS.navy, fontSize: "1.02rem" }}>{o.title}</Typography>
                  <Typography sx={{ mt: 0.75, color: COLORS.muted, fontSize: "0.82rem" }}>{o.location} · {o.type} · Posted {formatPosted(o.postedAt)}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      <MobileApplyBar />
    </>
  );
}
