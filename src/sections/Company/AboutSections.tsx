import React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight, ChevronDown, ChevronsDown, MapPin, Quote, Star } from "lucide-react";
import { AboutContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { COMPANY_ICONS } from "./companyIcons";
import { LinkedInLogo } from "@/components/icons/BrandLogos";
import SectionHeading from "./SectionHeading";

const DOTS = "radial-gradient(rgba(255,255,255,.09) 1.2px, transparent 1.2px)";

/** Highlights `highlight` inside `text` in brand red. */
function withHighlight(text: string, highlight: string) {
  const i = text.indexOf(highlight);

  if (i < 0) return text;

  return (
    <>
      {text.slice(0, i)}
      <Box component="span" sx={{ color: COLORS.red, fontWeight: 700 }}>{highlight}</Box>
      {text.slice(i + highlight.length)}
    </>
  );
}

export function AboutHero({ hero }: { hero: AboutContent["hero"] }) {
  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        overflow: "hidden",
        color: "#FFFFFF",
        textAlign: "center",
        py: { xs: 8, md: 12 },
        background: `radial-gradient(circle at 12% 18%, rgba(254,0,52,.35), transparent 42%), radial-gradient(circle at 88% 82%, rgba(255,229,31,.18), transparent 40%), linear-gradient(160deg, ${COLORS.navyDark} 0%, ${COLORS.navy} 100%)`,
        "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: DOTS, backgroundSize: "22px 22px" },
      }}
    >
      <Container sx={{ position: "relative", maxWidth: "900px !important" }}>
        <Box component="span" sx={{ display: "inline-block", px: 1.75, py: 0.5, borderRadius: 999, bgcolor: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.22)", fontSize: "0.75rem", fontWeight: 700, letterSpacing: ".12em" }}>
          {hero.badge}
        </Box>
        <Typography sx={{ mt: 2.5, fontSize: { xs: "1.35rem", md: "2rem" }, fontWeight: 500, color: "rgba(255,255,255,.82)" }}>{hero.kicker}</Typography>
        <Typography component="h1" sx={{ fontSize: { xs: "2.3rem", sm: "3rem", md: "3.9rem" }, fontWeight: 800, lineHeight: 1.1, mt: 0.5 }}>
          <Box component="span" sx={{ color: COLORS.yellow }}>{hero.highlight}</Box> {hero.title}
        </Typography>
        <Typography sx={{ mt: { xs: 2.5, md: 3.5 }, color: "rgba(255,255,255,.8)", fontSize: { xs: "0.98rem", md: "1.08rem" }, lineHeight: 1.75 }}>{hero.intro}</Typography>
        <Box component="a" href="#mission" aria-label="Scroll to our mission" sx={{ mt: { xs: 4, md: 5.5 }, mx: "auto", width: 34, height: 52, borderRadius: 999, border: "1.5px solid rgba(255,255,255,.45)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", "&:hover": { borderColor: COLORS.yellow, color: COLORS.yellow } }}>
          <ChevronsDown size={18} />
        </Box>
      </Container>
    </Box>
  );
}

const OFFSETS = [COLORS.red, COLORS.yellow, "#3B5B8F"];

export function AboutMission({ items }: { items: AboutContent["mission"] }) {
  return (
    <Box component="section" id="mission" sx={{ scrollMarginTop: 80, position: "relative", overflow: "hidden", py: { xs: 7, md: 10 }, bgcolor: COLORS.navyDark, "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: DOTS, backgroundSize: "26px 26px" } }}>
      <Container sx={{ position: "relative" }}>
        <SectionHeading title="Our Mission" light />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" }, gap: { xs: 3.5, md: 4 }, pr: { xs: 1.25, md: 1.5 } }}>
          {items.map((m, i) => {
            const Icon = COMPANY_ICONS[m.icon];

            return (
              <Box key={m.text} sx={{ position: "relative" }}>
                <Box aria-hidden sx={{ position: "absolute", inset: 0, transform: "translate(10px, 10px)", borderRadius: "14px", bgcolor: OFFSETS[i % OFFSETS.length] }} />
                <Box sx={{ position: "relative", height: "100%", display: "flex", alignItems: "center", gap: 2, p: { xs: 2.25, md: 2.75 }, borderRadius: "14px", bgcolor: "#FFFFFF", boxShadow: "0 12px 28px rgba(0,0,0,.25)" }}>
                  <Box sx={{ flexShrink: 0, width: 56, height: 56, borderRadius: "14px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon size={28} />
                  </Box>
                  <Typography sx={{ color: COLORS.ink, fontSize: { xs: "1rem", md: "1.05rem" }, fontWeight: 500, lineHeight: 1.45 }}>{withHighlight(m.text, m.highlight)}</Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

const HEX = "polygon(25% 4%, 75% 4%, 100% 50%, 75% 96%, 25% 96%, 0% 50%)";
const HEX_FILLS = [`linear-gradient(145deg, ${COLORS.red}, ${COLORS.redDarker})`, `linear-gradient(145deg, ${COLORS.navy}, ${COLORS.navyDark})`, `linear-gradient(145deg, ${COLORS.yellow}, #F5B800)`];

export function AboutVision({ vision }: { vision: AboutContent["vision"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, background: "linear-gradient(180deg, #FFFBEA 0%, #FFF6F1 100%)" }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1.1fr 1fr" }, gap: { xs: 5, md: 6 }, alignItems: "center" }}>
        <Box>
          <SectionHeading title="Our Vision" />
          <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 2.25 }}>
            {vision.points.map((p) => (
              <Box component="li" key={p} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                <Star size={20} fill={COLORS.yellowDark} color={COLORS.yellowDark} style={{ flexShrink: 0, marginTop: 3 }} />
                <Typography sx={{ color: COLORS.body, fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.6 }}>{p}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* honeycomb of headline numbers */}
        <Box sx={{ position: "relative", mx: "auto", width: { xs: 300, sm: 360 }, height: { xs: 300, sm: 350 } }}>
          {vision.tiles.slice(0, 3).map((t, i) => {
            const pos = [
              { top: 0, left: 0 },
              { top: { xs: 76, sm: 88 }, left: { xs: 150, sm: 180 } },
              { top: { xs: 152, sm: 176 }, left: 0 },
            ][i];

            return (
              <Box key={t.label} sx={{ position: "absolute", ...pos, width: { xs: 150, sm: 180 }, height: { xs: 140, sm: 168 }, clipPath: HEX, background: HEX_FILLS[i], color: i === 2 ? COLORS.navy : "#FFFFFF", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", px: 3, filter: "drop-shadow(0 10px 18px rgba(0,0,0,.15))" }}>
                <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.5rem", sm: "1.8rem" }, lineHeight: 1.1 }}>{t.value}</Typography>
                <Typography sx={{ fontWeight: 600, fontSize: { xs: "0.78rem", sm: "0.86rem" }, mt: 0.5, opacity: 0.92 }}>{t.label}</Typography>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

export function AboutPresence({ presence }: { presence: AboutContent["presence"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, bgcolor: "#FFFFFF" }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1.1fr" }, gap: { xs: 4, md: 7 }, alignItems: "center" }}>
        <Box>
          <SectionHeading title="Our Presence" subtitle={presence.intro} />
          <Box sx={{ display: "grid", gap: 1.5, maxWidth: 420 }}>
            {presence.stats.map((s) => (
              <Box key={s.label} sx={{ display: "flex", alignItems: "baseline", gap: 1, px: 2.5, py: 1.4, borderRadius: 999, background: `linear-gradient(90deg, #FFF3B8 0%, rgba(255,243,184,0) 100%)` }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.navy, fontSize: "1.25rem" }}>{s.value}</Typography>
                <Typography sx={{ color: COLORS.body, fontSize: "1rem" }}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 1.75 }}>
          {presence.centres.map((c) => (
            <Box key={c.name + c.city} sx={{ display: "flex", gap: 1.5, alignItems: "center", p: 2, borderRadius: "14px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", transition: "border-color .2s, box-shadow .2s, transform .2s", "&:hover": { borderColor: COLORS.redBorder, boxShadow: "0 10px 24px rgba(254,0,52,.08)", transform: "translateY(-2px)" } }}>
              <Box sx={{ flexShrink: 0, width: 44, height: 44, borderRadius: "12px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={22} />
              </Box>
              <Box sx={{ minWidth: 0 }}>
                <Typography sx={{ fontWeight: 700, color: COLORS.navy, lineHeight: 1.3 }}>{c.city}</Typography>
                <Typography sx={{ color: COLORS.muted, fontSize: "0.88rem" }}>{c.name}</Typography>
              </Box>
              <Box component="span" sx={{ ml: "auto", flexShrink: 0, px: 1, py: 0.25, borderRadius: 999, fontSize: "0.7rem", fontWeight: 700, bgcolor: c.status === "Open" ? "#DCFCE7" : "#FFF7CC", color: c.status === "Open" ? "#166534" : "#8A6D00" }}>
                {c.status}
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export function AboutCulture({ culture }: { culture: AboutContent["culture"] }) {
  return (
    <Box component="section" sx={{ position: "relative", overflow: "hidden", py: { xs: 7, md: 9 }, background: `linear-gradient(120deg, ${COLORS.red} 0%, ${COLORS.redDarker} 100%)`, color: "#FFFFFF", "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: DOTS, backgroundSize: "22px 22px" } }}>
      <Container sx={{ position: "relative", display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: 3 }}>
        <Box sx={{ maxWidth: 640 }}>
          <Typography component="h2" sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2.2rem" }, lineHeight: 1.2, color: COLORS.yellow }}>{culture.title}</Typography>
          <Typography sx={{ mt: 1.5, color: "rgba(255,255,255,.88)", fontSize: { xs: "1rem", md: "1.08rem" }, lineHeight: 1.6 }}>{culture.text}</Typography>
        </Box>
        <Box component={Link} href={culture.cta.href} sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 1, px: 3, py: 1.5, borderRadius: "12px", bgcolor: COLORS.yellow, color: COLORS.navy, fontWeight: 800, textDecoration: "none", boxShadow: "0 10px 24px rgba(0,0,0,.2)", transition: "transform .2s", "&:hover": { transform: "translateY(-2px)" } }}>
          {culture.cta.label} <ArrowRight size={18} />
        </Box>
      </Container>
    </Box>
  );
}

/** "Our Founders" — navy band with founder cards (photo, quote, expandable bio), pw.live style. */
export function AboutFounders({ founders }: { founders: AboutContent["founders"] }) {
  if (!founders.length) return null;

  const single = founders.length === 1;

  return (
    <Box component="section" sx={{ position: "relative", overflow: "hidden", py: { xs: 7, md: 10 }, bgcolor: COLORS.navyDark, "&::before": { content: '""', position: "absolute", inset: 0, backgroundImage: DOTS, backgroundSize: "26px 26px" }, "&::after": { content: '""', position: "absolute", width: 520, height: 520, borderRadius: "50%", right: -220, top: -180, background: "radial-gradient(circle, rgba(254,0,52,.35), transparent 65%)" } }}>
      <Container sx={{ position: "relative", zIndex: 1 }}>
        <SectionHeading title={single ? "Our Founder" : "Our Founders"} light />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: single ? "1fr" : "repeat(2, 1fr)" }, gap: { xs: 3, md: 4 }, maxWidth: single ? 980 : "none", mx: "auto" }}>
          {founders.map((f) => (
            <Box key={f.name} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: single ? "300px 1fr" : "1fr" }, borderRadius: "20px", overflow: "hidden", bgcolor: "#FFFFFF", boxShadow: "0 24px 50px rgba(0,0,0,.35)" }}>
              <Box sx={{ position: "relative", bgcolor: "#000", aspectRatio: { xs: "4 / 4.2", sm: "auto" }, minHeight: { sm: 360 }, borderBottom: { xs: `4px solid ${COLORS.red}`, sm: "none" }, borderRight: { sm: `4px solid ${COLORS.red}` } }}>
                <Image src={f.image} alt={`${f.name}, ${f.role}`} fill sizes="(max-width: 600px) 100vw, 300px" style={{ objectFit: "cover", objectPosition: "50% 15%" }} />
              </Box>
              <Box sx={{ p: { xs: 2.5, sm: 3.5, md: 4.5 }, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
                  <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.navy, fontSize: { xs: "1.6rem", md: "2rem" }, lineHeight: 1.15 }}>{f.name}</Typography>
                  {f.linkedin && (
                    <Box component="a" href={f.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${f.name} on LinkedIn`} sx={{ flexShrink: 0, width: 42, height: 42, borderRadius: "12px", border: "1px solid #D6E4F5", bgcolor: "#F2F7FD", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-2px)", boxShadow: "0 8px 18px rgba(10,102,194,.22)" } }}>
                      <LinkedInLogo size={24} />
                    </Box>
                  )}
                </Box>
                <Box component="span" sx={{ alignSelf: "flex-start", mt: 1, px: 1.5, py: 0.5, borderRadius: 999, bgcolor: COLORS.redTint, color: COLORS.redDark, fontWeight: 700, fontSize: "0.82rem", letterSpacing: ".02em" }}>{f.role}</Box>
                <Box sx={{ position: "relative", mt: 3, pl: { xs: 4.5, md: 5.5 } }}>
                  <Quote aria-hidden size={34} color={COLORS.yellowDark} fill={COLORS.yellow} style={{ position: "absolute", left: 0, top: -4, transform: "scaleX(-1)" }} />
                  <Typography sx={{ color: COLORS.ink, fontStyle: "italic", fontSize: { xs: "1.05rem", md: "1.2rem" }, lineHeight: 1.6, fontWeight: 500 }}>&ldquo;{f.quote}&rdquo;</Typography>
                </Box>
                <Box component="details" sx={{ mt: 3, borderTop: `1px solid ${COLORS.border}`, pt: 2, "&[open] .chev": { transform: "rotate(180deg)" }, "& summary::-webkit-details-marker": { display: "none" } }}>
                  <Box component="summary" sx={{ listStyle: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 0.75, color: COLORS.red, fontWeight: 700, fontSize: "0.95rem", "&:hover": { color: COLORS.redDark } }}>
                    Read more about {f.name} <ChevronDown className="chev" size={18} style={{ transition: "transform .2s" }} />
                  </Box>
                  <Box sx={{ mt: 1.5, display: "grid", gap: 1.25 }}>
                    {f.bio.map((para) => (
                      <Typography key={para.slice(0, 24)} sx={{ color: COLORS.body, fontSize: "0.97rem", lineHeight: 1.7 }}>{para}</Typography>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

/** Public-relations card colour (green, per design request). */
const PR_GREEN = "#3DAE72";

/** Press + support contact cards below the careers band (Unacademy-style, theme colours). */
export function AboutContacts({ contacts }: { contacts: AboutContent["contacts"] }) {
  if (!contacts.length) return null;

  return (
    <Box component="section" aria-label="Get in touch" sx={{ py: { xs: 6, md: 8 }, bgcolor: COLORS.surface }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" }, gap: { xs: 3, md: 4 } }}>
        {contacts.map((c) => {
          const press = c.kind === "press";
          const bg = press ? PR_GREEN : COLORS.navy;

          return (
            <Box key={c.email} sx={{ borderRadius: "18px", overflow: "hidden", bgcolor: "#FFFFFF", boxShadow: "0 12px 30px rgba(15,23,42,.07)", transition: "transform .25s, box-shadow .25s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 18px 38px rgba(15,23,42,.12)" } }}>
              <Box sx={{ position: "relative", height: { xs: 150, md: 170 }, bgcolor: bg, overflow: "hidden" }}>
                {press ? (
                  <Box component="svg" viewBox="0 0 220 170" aria-hidden sx={{ position: "absolute", left: 0, bottom: 0, height: "100%" }}>
                    <circle cx="140" cy="62" r="46" fill="#FFFFFF" opacity=".16" />
                    <path d="M0 26h112a12 12 0 0 1 12 12v86l-46 46H0z" fill="#A6E8C5" />
                    <path d="M124 124l-46 46v-34a12 12 0 0 1 12-12z" fill="#DDF7EA" />
                    <rect x="20" y="58" width="62" height="14" rx="7" fill={PR_GREEN} opacity=".85" />
                    <rect x="26" y="82" width="48" height="14" rx="7" fill={PR_GREEN} opacity=".85" />
                  </Box>
                ) : (
                  <Box component="svg" viewBox="0 0 230 170" aria-hidden sx={{ position: "absolute", left: 0, bottom: 0, height: "100%" }}>
                    <path d="M26 92a22 22 0 0 1 22-22h70a22 22 0 0 1 22 22v40a22 22 0 0 1-22 22H62l-30 16 6-20a22 22 0 0 1-12-18z" fill="#DCE6F5" />
                    <path d="M98 50a24 24 0 0 1 24-24h68a24 24 0 0 1 24 24v52a24 24 0 0 1-24 24h-6l4 22-30-22h-36a24 24 0 0 1-24-24z" fill={COLORS.yellow} />
                    <circle cx="132" cy="76" r="6" fill={COLORS.navy} /><circle cx="156" cy="76" r="6" fill={COLORS.navy} /><circle cx="180" cy="76" r="6" fill={COLORS.navy} />
                  </Box>
                )}
                <Typography component="h2" sx={{ position: "absolute", right: { xs: 20, md: 28 }, bottom: { xs: 16, md: 22 }, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "1.5rem", md: "1.8rem" } }}>
                  {c.title}
                </Typography>
              </Box>
              <Box sx={{ p: { xs: 2.5, md: 3 } }}>
                <Typography sx={{ color: COLORS.textSecondary, fontSize: { xs: "1rem", md: "1.08rem" } }}>{c.text}</Typography>
                <Box component="a" href={`mailto:${c.email}`} sx={{ display: "inline-block", mt: 0.5, color: COLORS.red, fontWeight: 700, fontSize: { xs: "1.05rem", md: "1.15rem" }, textDecoration: "none", wordBreak: "break-all", "&:hover": { textDecoration: "underline" } }}>
                  {c.email}
                </Box>
              </Box>
            </Box>
          );
        })}
      </Container>
    </Box>
  );
}
