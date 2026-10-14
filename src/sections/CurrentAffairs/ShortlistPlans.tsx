"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight, CalendarClock, Crown } from "lucide-react";
import { ShortlistContent } from "@/types";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";

/** "Choose Your Plan" — same content in every plan, only validity differs. */
export default function ShortlistPlans({ data }: { data: ShortlistContent["plans"] }) {
  const [first, rest] = data.title.split(data.highlight);
  return (
    <Box component="section" id="plans" sx={{ py: { xs: 4, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.4rem" }, color: COLORS.navy }}>
          {first}
          <Box component="span" sx={{ color: COLORS.red }}>{data.highlight}</Box>
          {rest}
        </Typography>
        <Typography sx={{ mt: 1.25, textAlign: "center", color: COLORS.body, maxWidth: 720, mx: "auto", fontSize: { xs: "0.92rem", md: "1rem" } }}>{data.intro}</Typography>
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 1 }}>
          {data.notes.map((n, i) => (
            <Box key={n} sx={{ display: "inline-flex", alignItems: "center", gap: 0.75, px: 1.5, py: 0.6, borderRadius: "9999px", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, fontSize: "0.8rem", fontWeight: 600, color: COLORS.body }}>
              <Box component="span" sx={{ fontWeight: 900, color: COLORS.red }}>{i + 1}</Box> {n}
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: { xs: 4, md: 5 }, maxWidth: 1100, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 3, md: 3 }, alignItems: "stretch" }}>
          {data.items.map((p) => (
            <Box
              key={p.id}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                p: { xs: 2.5, md: 3 },
                borderRadius: "22px",
                backgroundColor: p.popular ? COLORS.navy : "#FFFFFF",
                color: p.popular ? "#FFFFFF" : COLORS.ink,
                border: p.popular ? `2px solid ${COLORS.navy}` : `1px solid ${COLORS.border}`,
                boxShadow: p.popular ? "0 24px 48px rgba(19,41,75,.32)" : "0 12px 28px rgba(15,23,42,.06)",
                transform: { md: p.popular ? "scale(1.04)" : "none" },
              }}
            >
              {p.popular && (
                <Box sx={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", display: "inline-flex", alignItems: "center", gap: 0.5, px: 1.75, py: 0.5, borderRadius: "9999px", backgroundColor: COLORS.yellow, color: COLORS.navy, fontWeight: 900, fontSize: "0.75rem", whiteSpace: "nowrap" }}>
                  <Crown size={14} /> MOST POPULAR
                </Box>
              )}
              <Typography sx={{ fontWeight: 800, fontSize: "0.78rem", letterSpacing: ".1em", textTransform: "uppercase", color: p.popular ? COLORS.yellow : COLORS.red }}>{p.option}</Typography>
              <Typography component="h3" sx={{ mt: 0.5, fontWeight: 900, fontSize: { xs: "1.3rem", md: "1.45rem" } }}>{p.name}</Typography>
              <Box sx={{ mt: 0.75, display: "inline-flex", alignItems: "center", gap: 0.75, fontSize: "0.88rem", fontWeight: 600, opacity: 0.85 }}>
                <CalendarClock size={16} /> {p.validity}
              </Box>

              <Box sx={{ my: 2.5, mx: "auto", width: 112, height: 112, borderRadius: "50%", border: `6px solid ${p.popular ? COLORS.yellow : COLORS.red}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                <Typography sx={{ fontWeight: 900, fontSize: "2.4rem", lineHeight: 1 }}>{p.months}</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: "0.8rem", opacity: 0.8 }}>Months</Typography>
              </Box>

              <Box sx={{ display: "grid", gap: 1, pt: 2, borderTop: `1px dashed ${p.popular ? "rgba(255,255,255,.25)" : COLORS.border}` }}>
                <Row label="Base price" value={p.basePrice} popular={p.popular} />
                {p.originalPrice && <Row label="Original price" value={p.originalPrice} popular={p.popular} strike />}
                <Box sx={{ mt: 0.5, p: 1.5, borderRadius: "12px", backgroundColor: p.popular ? "rgba(255,255,255,.08)" : COLORS.redTint, textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.78rem", fontWeight: 700, opacity: 0.85 }}>Launch price (incl. GST)</Typography>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.7rem", md: "1.9rem" }, color: p.popular ? COLORS.yellow : COLORS.red, lineHeight: 1.2 }}>{p.launchPrice}</Typography>
                </Box>
              </Box>

              <Box sx={{ flex: 1, minHeight: 20 }} />
              <Box component="button" type="button" onClick={openAuth} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, height: 48, border: "none", borderRadius: "12px", backgroundColor: p.popular ? COLORS.yellow : COLORS.red, color: p.popular ? COLORS.navy : "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "0.98rem", cursor: "pointer", "&:hover": { filter: "brightness(.95)" } }}>
                Choose Plan <ArrowRight size={18} />
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

function Row({ label, value, popular, strike }: { label: string; value: string; popular?: boolean; strike?: boolean }) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, fontSize: "0.9rem" }}>
      <Box component="span" sx={{ opacity: 0.75 }}>{label}</Box>
      <Box component="span" sx={{ fontWeight: 700, textDecoration: strike ? "line-through" : "none", color: strike ? (popular ? "rgba(255,255,255,.6)" : COLORS.muted) : "inherit" }}>{value}</Box>
    </Box>
  );
}
