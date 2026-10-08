import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { CourseLandingContent } from "@/types";
import { COLORS } from "@/theme/colors";
import { badgeSx } from "./icons";

const TAG_COLORS = ["#2563EB", "#F97316", "#16A34A", "#7C3AED", "#DB2777", "#0891B2"];

/** Phone showing an infographic, with labels pointing out of it. */
function PhoneMockup({ tags }: { tags: string[] }) {
  return (
    <Box sx={{ position: "relative", width: { xs: 250, md: 300 }, height: { xs: 230, md: 270 }, mx: "auto" }}>
      <Box sx={{ position: "absolute", left: 0, top: 0, width: { xs: 140, md: 165 }, height: "100%", borderRadius: "26px", backgroundColor: "#111827", p: "8px", transform: "rotate(-6deg)", boxShadow: "0 18px 40px rgba(15,23,42,.25)" }}>
        <Box sx={{ width: "100%", height: "100%", borderRadius: "19px", backgroundColor: "#FFFFFF", p: 1.25, display: "flex", flexDirection: "column", gap: 0.75 }}>
          <Box sx={{ height: 6, width: "60%", borderRadius: 3, backgroundColor: "#CBD5E1" }} />
          <Box sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
            <Box sx={{ width: { xs: 44, md: 54 }, height: { xs: 44, md: 54 }, borderRadius: "50%", background: "radial-gradient(circle at 35% 35%, #60A5FA, #1D4ED8)", position: "relative", overflow: "hidden", "&::after": { content: '""', position: "absolute", inset: "30% 20% 25% 35%", borderRadius: "40%", backgroundColor: "#4ADE80", opacity: 0.85 } }} />
            <Box sx={{ flex: 1, display: "grid", gap: 0.5 }}>
              {[90, 70, 80].map((w) => (
                <Box key={w} sx={{ height: 4, width: `${w}%`, borderRadius: 2, backgroundColor: "#E2E8F0" }} />
              ))}
            </Box>
          </Box>
          {["#FDE68A", "#BFDBFE", "#BBF7D0", "#DDD6FE"].map((c, i) => (
            <Box key={c} sx={{ display: "flex", gap: 0.75, alignItems: "center" }}>
              <Box sx={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: c, flexShrink: 0 }} />
              <Box sx={{ height: 5, width: `${85 - i * 12}%`, borderRadius: 2, backgroundColor: "#E2E8F0" }} />
            </Box>
          ))}
          <Box sx={{ mt: "auto", height: 18, borderRadius: "6px", background: "linear-gradient(90deg, #FEE2E2, #DBEAFE)" }} />
        </Box>
      </Box>
      {tags.map((tag, i) => (
        <Box
          key={tag}
          sx={{
            position: "absolute",
            left: { xs: 118 + (i % 2) * 8, md: 142 + (i % 2) * 10 },
            top: `${12 + i * 21}%`,
            px: 1.25,
            py: 0.5,
            borderRadius: "6px",
            backgroundColor: TAG_COLORS[i % TAG_COLORS.length],
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: { xs: "0.72rem", md: "0.82rem" },
            whiteSpace: "nowrap",
            boxShadow: "0 6px 14px rgba(15,23,42,.18)",
          }}
        >
          {tag}
        </Box>
      ))}
    </Box>
  );
}

export default function LandingInfographic({ data }: { data: CourseLandingContent["infographic"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 4.5, md: 7 } }}>
      <Container sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(0, 1.1fr)" }, gap: { xs: 3.5, md: 6 }, alignItems: "center" }}>
        <PhoneMockup tags={data.tags} />
        <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
          <Box sx={badgeSx("#1D4ED8", "#DBEAFE", "#BFDBFE")}>{data.badge}</Box>
          <Typography component="h2" sx={{ mt: 1.5, fontWeight: 900, fontSize: { xs: "1.6rem", md: "2.1rem" }, color: COLORS.navy, lineHeight: 1.2, maxWidth: 420, mx: { xs: "auto", md: 0 } }}>
            {data.title}
          </Typography>
          <Typography sx={{ mt: 1.25, color: COLORS.body, fontSize: { xs: "0.95rem", md: "1.05rem" }, lineHeight: 1.7, maxWidth: 480, mx: { xs: "auto", md: 0 } }}>{data.text}</Typography>
        </Box>
      </Container>
    </Box>
  );
}
