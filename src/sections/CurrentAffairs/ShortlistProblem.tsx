import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight, Filter, FolderKanban, Brain, BookX, Shuffle, CircleSlash } from "lucide-react";
import { ShortlistContent } from "@/types";
import { COLORS } from "@/theme/colors";

const PROBLEM_ICONS = [BookX, Shuffle, CircleSlash];
const SOLUTION_ICONS = [Filter, FolderKanban, Brain];

/** The Current Affairs problem vs the Shortlist system — two columns joined by arrows. */
export default function ShortlistProblem({ data }: { data: ShortlistContent["problem"] }) {
  const [first, rest] = data.title.split(data.highlight);
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 7 } }}>
      <Container>
        <Typography component="h2" sx={{ textAlign: "center", fontWeight: 900, fontSize: { xs: "1.5rem", md: "2.2rem" }, color: COLORS.navy, mb: { xs: 3, md: 4.5 } }}>
          {first}
          <Box component="span" sx={{ color: COLORS.red }}>{data.highlight}</Box>
          {rest}
        </Typography>
        <Box sx={{ maxWidth: 1080, mx: "auto", display: "grid", gap: { xs: 1.5, md: 2 } }}>
          {data.problems.map((p, i) => {
            const s = data.solutions[i];
            const PIcon = PROBLEM_ICONS[i % 3];
            const SIcon = SOLUTION_ICONS[i % 3];
            return (
              <Box key={p.title} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 48px minmax(0, 1fr)" }, gap: { xs: 1, md: 0 }, alignItems: "stretch" }}>
                <Box sx={{ display: "flex", gap: 1.75, p: { xs: 2, md: 2.5 }, borderRadius: "16px", backgroundColor: "#FFF1F2", border: "1px solid #FECDD3" }}>
                  <Box sx={{ flexShrink: 0, width: 46, height: 46, borderRadius: "12px", backgroundColor: "#FFFFFF", color: COLORS.redDark, display: "flex", alignItems: "center", justifyContent: "center" }}><PIcon size={22} /></Box>
                  <Box>
                    <Typography sx={{ fontWeight: 900, color: COLORS.ink, fontSize: { xs: "0.98rem", md: "1.08rem" }, textTransform: "uppercase" }}>{p.title}</Typography>
                    <Typography sx={{ mt: 0.25, color: COLORS.redDark, fontSize: "0.9rem", lineHeight: 1.5 }}>{p.text}</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.red, transform: { xs: "rotate(90deg)", md: "none" } }}><ArrowRight size={26} /></Box>
                {s && (
                  <Box sx={{ display: "flex", gap: 1.75, p: { xs: 2, md: 2.5 }, borderRadius: "16px", backgroundColor: "#EFF6FF", border: "1px solid #BFDBFE" }}>
                    <Box sx={{ flexShrink: 0, width: 46, height: 46, borderRadius: "12px", backgroundColor: COLORS.navy, color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center" }}><SIcon size={22} /></Box>
                    <Box>
                      <Typography sx={{ fontWeight: 900, color: COLORS.navy, fontSize: { xs: "0.98rem", md: "1.08rem" }, textTransform: "uppercase" }}>{s.title}</Typography>
                      <Typography sx={{ mt: 0.25, color: COLORS.body, fontSize: "0.9rem", lineHeight: 1.5 }}>{s.text}</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
