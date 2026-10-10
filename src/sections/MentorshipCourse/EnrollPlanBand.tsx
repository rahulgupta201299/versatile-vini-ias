"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ExternalLink, Zap } from "lucide-react";
import { MentorshipContent } from "@/types";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";

type Picker = NonNullable<MentorshipContent["planPicker"]>;

/** "Enroll Now" band with plan tabs (Foundation / Foundation Plus), the fee of the chosen plan, Enroll and Course Details. */
export default function EnrollPlanBand({ data }: { data: Picker }) {
  const plans = data.plans.filter((p) => p.price);
  const [id, setId] = useState(data.defaultId ?? plans[0]?.id);
  const plan = plans.find((p) => p.id === id) ?? plans[0];
  if (!plan) return null;

  return (
    <Box component="section" sx={{ py: { xs: 4.5, md: 7 }, backgroundColor: COLORS.redTintSoft, textAlign: "center" }}>
      <Container>
        <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.9rem", md: "2.8rem" }, lineHeight: 1.15, color: COLORS.ink, letterSpacing: "-0.02em" }}>
          Enroll Now
        </Typography>

        <Box role="tablist" aria-label="Choose a plan" sx={{ mt: { xs: 2, md: 2.5 }, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 1.25 }}>
          {plans.map((p) => {
            const active = p.id === plan.id;
            return (
              <Box
                key={p.id}
                component="button"
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setId(p.id)}
                sx={{ height: 44, px: { xs: 2, md: 2.75 }, border: "none", borderRadius: "8px", backgroundColor: active ? COLORS.red : "#E5E7EB", color: active ? "#FFFFFF" : COLORS.ink, fontFamily: "inherit", fontWeight: 800, fontSize: { xs: "0.85rem", md: "0.95rem" }, cursor: "pointer", transition: "all .15s", boxShadow: active ? "0 8px 18px rgba(254,0,52,.25)" : "none" }}
              >
                {p.name}
              </Box>
            );
          })}
        </Box>

        <Typography sx={{ mt: 2.5, fontWeight: 700, color: COLORS.body, fontSize: { xs: "1rem", md: "1.1rem" } }}>
          Course Fee:{" "}
          <Box component="span" sx={{ color: COLORS.red, fontWeight: 900, fontSize: { xs: "1.3rem", md: "1.5rem" } }}>
            {plan.price}
          </Box>
        </Typography>
        {plan.priceNote && <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.9rem" }}>{plan.priceNote}</Typography>}

        <Box sx={{ mt: 2.5, display: "flex", flexDirection: "column", alignItems: "center", gap: 1.5 }}>
          <Box
            component="button"
            type="button"
            onClick={openAuth}
            sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, width: 240, height: 52, border: "none", borderRadius: "12px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "1.02rem", cursor: "pointer", boxShadow: "0 8px 20px rgba(254,0,52,.22)", "&:hover": { backgroundColor: COLORS.redDark } }}
          >
            Enroll Now <Zap size={17} fill="currentColor" />
          </Box>
          <Box
            component="button"
            type="button"
            onClick={() => document.getElementById("course-details")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 1, width: 240, height: 52, borderRadius: "12px", border: `2px solid ${COLORS.ink}`, backgroundColor: "#FFFFFF", color: COLORS.ink, fontFamily: "inherit", fontWeight: 700, fontSize: "1.02rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.surface } }}
          >
            Course Details <ExternalLink size={16} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
