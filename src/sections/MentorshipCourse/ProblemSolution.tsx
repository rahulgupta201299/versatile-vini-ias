import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "lucide-react";
import { MentorshipContent } from "@/types";
import { COLORS } from "@/theme/colors";

const STEP_COLORS = ["#F59E0B", "#2563EB", COLORS.red];

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <Box sx={{ display: "inline-block", px: { xs: 1.5, md: 2.5 }, py: 0.75, backgroundColor: COLORS.yellow, fontWeight: 800, color: COLORS.ink, fontSize: { xs: "0.85rem", md: "1rem" }, boxShadow: "0 3px 0 rgba(15,23,42,.15)", fontStyle: "italic" }}>{children}</Box>
);

/** Knowing → Writing → Scoring problem strip, then the 4-step execution system. */
export default function ProblemSolution({ problem, solution }: { problem?: MentorshipContent["problem"]; solution?: MentorshipContent["solution"] }) {
  return (
    <Box component="section" id="course-details" sx={{ py: { xs: 4, md: 6 } }}>
      <Container>
        {problem && (
          <Box sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: `repeat(${problem.steps.length}, minmax(0, 1fr))` }, gap: { xs: 1.5, md: 0 }, maxWidth: 980, mx: "auto", textAlign: "left" }}>
              {problem.steps.map((s, i) => (
                <Box
                  key={s.title}
                  sx={{
                    position: "relative",
                    color: "#FFFFFF",
                    background: STEP_COLORS[i % STEP_COLORS.length],
                    pl: { xs: 2.5, md: i ? 5 : 3 },
                    pr: { xs: 2.5, md: 5 },
                    pt: 4.5,
                    pb: 2.5,
                    borderRadius: { xs: "12px", md: 0 },
                    clipPath: { md: i === 0 ? "polygon(0 0, calc(100% - 34px) 0, 100% 50%, calc(100% - 34px) 100%, 0 100%)" : "polygon(0 0, calc(100% - 34px) 0, 100% 50%, calc(100% - 34px) 100%, 0 100%, 34px 50%)" },
                    ml: { md: i ? "-18px" : 0 },
                  }}
                >
                  <Box sx={{ position: "absolute", top: 10, left: { xs: 16, md: i ? 40 : 20 }, px: 1, py: 0.25, backgroundColor: "rgba(255,255,255,.25)", fontWeight: 900, fontSize: "0.9rem" }}>{String(i + 1).padStart(2, "0")}</Box>
                  <Typography sx={{ fontWeight: 900, fontSize: { xs: "1.3rem", md: "1.45rem" } }}>{s.title}</Typography>
                  <Box component="ul" sx={{ m: 0, mt: 1, pl: 2.25, display: "grid", gap: 0.25 }}>
                    {s.points.map((p) => (
                      <Typography component="li" key={p} sx={{ fontWeight: 700, fontSize: { xs: "0.88rem", md: "0.95rem" }, lineHeight: 1.3 }}>{p}</Typography>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Highlight>{problem.quote}</Highlight>
            </Box>
          </Box>
        )}

        {solution && (
          <Box sx={{ textAlign: "center" }}>
            <Typography component="h2" sx={{ fontWeight: 900, fontSize: { xs: "1.7rem", md: "2.4rem" }, color: COLORS.ink }}>{solution.heading}</Typography>
            <Typography sx={{ mt: 1, mb: 2.5, fontWeight: 900, fontSize: { xs: "1.3rem", md: "1.8rem" }, color: "#2563EB" }}>{solution.title}</Typography>
            <Box sx={{ maxWidth: 640, mx: "auto", display: "grid", gap: 0 }}>
              {solution.steps.map((s, i) => (
                <Box key={s.label}>
                  {/* step label + connector */}
                  <Box sx={{ display: "inline-block", minWidth: { xs: 160, md: 200 }, px: 3, py: 1, border: `2px solid ${COLORS.ink}`, borderRadius: "6px", backgroundColor: "#FFFFFF", color: "#2563EB", fontWeight: 900, fontSize: { xs: "1rem", md: "1.2rem" }, letterSpacing: "0.03em" }}>{s.label}</Box>
                  <Box sx={{ mx: "auto", width: 6, height: 18, borderLeft: `2px solid ${COLORS.ink}`, borderRight: `2px solid ${COLORS.ink}` }} />
                  <Box sx={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)", alignItems: "center", gap: { xs: 1, md: 2.5 }, mb: i < solution.steps.length - 1 ? 2.5 : 0 }}>
                    <Box sx={{ minHeight: { xs: 70, md: 90 }, display: "flex", alignItems: "center", justifyContent: "center", px: 1.5, py: 1, border: `2px solid ${COLORS.ink}`, borderRadius: "8px", backgroundColor: "#FFFFFF", fontWeight: 800, color: COLORS.ink, fontSize: { xs: "0.82rem", md: "1rem" }, lineHeight: 1.3 }}>{s.from}</Box>
                    <Box sx={{ width: { xs: 32, md: 44 }, height: { xs: 32, md: 44 }, borderRadius: "50%", background: "linear-gradient(135deg, #FDBA74, #F97316)", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 14px rgba(249,115,22,.35)" }}>
                      <ArrowRight size={20} strokeWidth={3} />
                    </Box>
                    <Box sx={{ minHeight: { xs: 70, md: 90 }, display: "flex", alignItems: "center", justifyContent: "center", px: 1.5, py: 1, border: `2px solid ${COLORS.ink}`, borderRadius: "8px", backgroundColor: "#FFFFFF", fontWeight: 800, color: COLORS.ink, fontSize: { xs: "0.82rem", md: "1rem" }, lineHeight: 1.3 }}>{s.to}</Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ mt: 3 }}>
              <Highlight>{solution.note}</Highlight>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
