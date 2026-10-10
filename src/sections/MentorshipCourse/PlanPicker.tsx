"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { MentorshipContent } from "@/types";
import { openAuth } from "@/utils/events";
import { COLORS } from "@/theme/colors";

type Picker = NonNullable<MentorshipContent["planPicker"]>;

/** "CHOOSE COURSE" — plan tabs; each shows a description, the course name, Enroll and the fee. */
export default function PlanPicker({ data }: { data: Picker }) {
  const [id, setId] = useState(data.defaultId ?? data.plans[0]?.id);
  const plan = data.plans.find((p) => p.id === id) ?? data.plans[0];
  if (!plan) return null;

  return (
    <Box component="section" id="choose-course" sx={{ py: { xs: 4, md: 6 } }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.3rem" }, color: COLORS.navy }}>{data.title}</Typography>
        <Box sx={{ width: 120, height: 4, mx: "auto", mt: 1, borderRadius: 2, backgroundColor: COLORS.red }} />

        <Box role="tablist" sx={{ mt: 3, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: { xs: 1, md: 2 } }}>
          {data.plans.map((p) => {
            const active = p.id === plan.id;
            return (
              <Box
                key={p.id}
                component="button"
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setId(p.id)}
                sx={{ minWidth: { xs: 90, md: 130 }, height: 46, px: 2, border: "none", borderRadius: "6px", backgroundColor: active ? COLORS.red : "#E5E7EB", color: active ? "#FFFFFF" : COLORS.ink, fontFamily: "inherit", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", transition: "all .15s", boxShadow: active ? "0 8px 18px rgba(254,0,52,.25)" : "none" }}
              >
                {p.name}
              </Box>
            );
          })}
        </Box>

        <Box key={plan.id} role="tabpanel" sx={{ mt: { xs: 3, md: 4 }, maxWidth: 980, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" }, gap: { xs: 2.5, md: 4 }, alignItems: "start", animation: "planIn .2s ease", "@keyframes planIn": { from: { opacity: 0, transform: "translateY(6px)" } } }}>
          <Box sx={{ p: { xs: 2.25, md: 3 }, borderRadius: "16px", backgroundColor: "#FFF8EC" }}>
            <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.4rem", md: "1.7rem" }, color: COLORS.navy }}>{plan.name}</Typography>
            <Typography sx={{ mt: 1.25, color: COLORS.body, fontSize: { xs: "0.9rem", md: "0.98rem" }, lineHeight: 1.7 }}>{plan.description}</Typography>
          </Box>
          <Box sx={{ display: "grid", gap: 1.5, pt: { md: 2 } }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, alignItems: "center" }}>
              <Box sx={{ flex: 1, minWidth: 200, px: 2, py: 1.5, borderRadius: "8px", backgroundColor: "#EEF4FF", color: COLORS.navy, fontWeight: 700, fontSize: "0.95rem" }}>{plan.course}</Box>
              <Box component="button" type="button" onClick={openAuth} sx={{ height: 46, px: 3, border: "none", borderRadius: "6px", backgroundColor: COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 800, fontSize: "0.95rem", cursor: "pointer", "&:hover": { backgroundColor: COLORS.redDark } }}>
                ENROLL
              </Box>
            </Box>
            <Box sx={{ justifySelf: "start", px: 2, py: 1.25, borderRadius: "8px", border: `1.5px solid ${COLORS.yellowDark}`, backgroundColor: "#FFFBEB", fontWeight: 800, color: COLORS.ink, fontSize: "0.95rem" }}>Course Fee: {plan.fee}</Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
