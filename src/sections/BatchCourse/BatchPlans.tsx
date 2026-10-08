import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Check, Tag, X } from "lucide-react";
import { BatchCourseContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { LANDING_ICONS } from "@/sections/CourseLanding/icons";
import BuyButton from "./BuyButton";
import PlanHighlighter from "./PlanHighlighter";

const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;
const ROW_BORDER = `1px solid ${COLORS.border}`;

function Mark({ yes }: { yes: boolean }) {
  return (
    <Box
      role="img"
      aria-label={yes ? "Included" : "Not included"}
      sx={{ width: 22, height: 22, mx: "auto", borderRadius: "50%", backgroundColor: yes ? "#22C55E" : "#EF4444", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {yes ? <Check size={13} strokeWidth={3.5} /> : <X size={12} strokeWidth={3.5} />}
    </Box>
  );
}

/** Feature comparison table with a price row and Buy Now per plan. */
export default function BatchPlans({ data }: { data: Pick<BatchCourseContent, "plans" | "features" | "plansTitle"> }) {
  const { plans, features, plansTitle } = data;
  const cols = `minmax(0, 1.6fr) repeat(${plans.length}, minmax(0, 1fr))`;

  return (
    <Box component="section" id="plans" sx={{ py: { xs: 5, md: 7 }, backgroundColor: COLORS.surface }}>
      <Container>
        <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
          <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.4rem" }, color: COLORS.navy, lineHeight: 1.2 }}>
            {plansTitle.before} <Box component="span" sx={{ color: COLORS.red }}>{plansTitle.highlight}</Box> {plansTitle.after}
          </Typography>
          <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: { xs: "0.92rem", md: "1.02rem" } }}>{plansTitle.subtitle}</Typography>
        </Box>

        <PlanHighlighter tableId="plans-table" />
        <Box
          id="plans-table"
          role="table"
          aria-label="Plan comparison"
          sx={{
            maxWidth: 960,
            mx: "auto",
            borderRadius: "18px",
            overflow: "hidden",
            backgroundColor: "#FFFFFF",
            border: ROW_BORDER,
            boxShadow: "0 18px 44px rgba(15,23,42,.08)",
            // highlight the plan chosen in the hero
            ...Object.fromEntries(
              plans.map((p) => [
                `&[data-active-plan="${p.id}"] [data-plan="${p.id}"]`,
                { boxShadow: `inset 2px 0 0 ${p.color}, inset -2px 0 0 ${p.color}`, filter: "saturate(1.15)" },
              ])
            ),
            ...Object.fromEntries(plans.map((p) => [`&[data-active-plan="${p.id}"] [data-plan-price="${p.id}"]`, { boxShadow: `inset 2px 0 0 ${p.color}, inset -2px 0 0 ${p.color}, inset 0 -2px 0 ${p.color}` }])),
          }}
        >
          {/* header */}
          <Box role="row" sx={{ display: "grid", gridTemplateColumns: cols }}>
            <Box role="columnheader" sx={{ p: { xs: 1.5, md: 2.25 }, backgroundColor: "#F1F5F9", fontWeight: 800, color: COLORS.navy, fontSize: { xs: "0.78rem", md: "0.95rem" }, textAlign: "center", letterSpacing: "0.04em" }}>
              FEATURES
            </Box>
            {plans.map((p) => (
              <Box key={p.id} role="columnheader" data-plan={p.id} sx={{ p: { xs: 1.5, md: 2.25 }, backgroundColor: p.color, color: "#FFFFFF", fontWeight: 800, fontSize: { xs: "0.72rem", md: "0.95rem" }, textAlign: "center", letterSpacing: "0.04em", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {p.name}
              </Box>
            ))}
          </Box>

          {/* feature rows */}
          {features.map((f) => {
            const Icon = LANDING_ICONS[f.icon];
            return (
              <Box key={f.label} role="row" sx={{ display: "grid", gridTemplateColumns: cols, borderTop: ROW_BORDER }}>
                <Box role="cell" sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 1.5 }, px: { xs: 1.25, md: 2.25 }, py: { xs: 1.25, md: 1.5 } }}>
                  <Box sx={{ display: { xs: "none", sm: "flex" }, width: 32, height: 32, borderRadius: "8px", backgroundColor: COLORS.redTintSoft, alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={16} color={COLORS.red} />
                  </Box>
                  <Typography sx={{ fontWeight: 700, color: COLORS.navy, fontSize: { xs: "0.8rem", md: "0.92rem" }, lineHeight: 1.3 }}>{f.label}</Typography>
                </Box>
                {plans.map((p) => (
                  <Box key={p.id} role="cell" data-plan={p.id} sx={{ display: "flex", alignItems: "center", backgroundColor: p.tint }}>
                    <Mark yes={f.plans.includes(p.id)} />
                  </Box>
                ))}
              </Box>
            );
          })}

          {/* price row */}
          <Box role="row" sx={{ display: "grid", gridTemplateColumns: cols, borderTop: ROW_BORDER }}>
            <Box role="cell" sx={{ display: "flex", alignItems: "center", gap: 1.5, px: { xs: 1.25, md: 2.25 }, py: 2 }}>
              <Box sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 }, borderRadius: "50%", backgroundColor: "#E0E7FF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Tag size={18} color="#4338CA" />
              </Box>
              <Typography sx={{ fontWeight: 900, color: COLORS.navy, fontSize: { xs: "0.95rem", md: "1.2rem" } }}>PRICE :</Typography>
            </Box>
            {plans.map((p) => (
              <Box key={p.id} role="cell" data-plan-price={p.id} sx={{ textAlign: "center", py: 2, px: 0.5, backgroundColor: p.tint }}>
                <Typography sx={{ fontWeight: 900, color: COLORS.ink, fontSize: { xs: "1.05rem", md: "1.6rem" }, lineHeight: 1.1 }}>{formatINR(p.price)}</Typography>
                <Typography sx={{ fontSize: { xs: "0.55rem", md: "0.65rem" }, color: COLORS.muted, fontWeight: 600 }}>(TAXES INCLUDED)</Typography>
                <BuyButton color={p.color} />
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
