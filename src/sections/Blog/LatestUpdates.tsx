import React from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChevronRight, Pin } from "lucide-react";
import { ExamUpdates } from "@/types";
import { COLORS } from "@/theme/colors";

/** "Latest Notification & Updates" — Notifications / Admit Cards / Results boards with a pin. */
export default function LatestUpdates({ boards }: { boards: ExamUpdates["boards"] }) {
  if (!boards.length) return null;
  return (
    <Box component="section" aria-label="Latest notification and updates" sx={{ mt: { xs: 4, md: 6 } }}>
      <Box sx={{ textAlign: "center", mb: { xs: 3, md: 4 } }}>
        <Typography component="h2" sx={{ fontFamily: "inherit", fontWeight: 800, fontSize: { xs: "1.45rem", md: "2rem" }, color: COLORS.navy }}>
          Latest Notification &amp; Updates
        </Typography>
        <Box sx={{ width: 64, height: 4, borderRadius: 2, mx: "auto", mt: 1, background: `linear-gradient(90deg, ${COLORS.yellowDark}, ${COLORS.red})` }} />
      </Box>
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: { xs: 3, md: 3 }, alignItems: "start" }}>
        {boards.map((b) => (
          <Box key={b.id} sx={{ position: "relative", p: { xs: 2, md: 2.5 }, borderRadius: "16px", backgroundColor: "#FFFDF7", border: `1px solid #F3EBCF`, boxShadow: "0 10px 26px rgba(15,23,42,.06)" }}>
            <Box aria-hidden sx={{ position: "absolute", top: -12, right: 18, color: COLORS.red, transform: "rotate(35deg)", filter: "drop-shadow(0 3px 4px rgba(254,0,52,.3))" }}>
              <Pin size={30} fill={COLORS.red} strokeWidth={1.5} color={COLORS.redDark} />
            </Box>
            <Typography component="h3" sx={{ fontFamily: "inherit", fontWeight: 800, fontSize: { xs: "1.15rem", md: "1.25rem" }, color: COLORS.navy, pb: 1.5, borderBottom: `2px dashed ${COLORS.yellowDark}88` }}>
              {b.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
              {b.items.map((it) => (
                <Box component="li" key={it.title} sx={{ "& + li": { borderTop: `1px dashed ${COLORS.border}` } }}>
                  <Box component={Link} href={it.href} sx={{ display: "flex", gap: 1, py: 1.25, color: "#27272A", textDecoration: "none", fontSize: { xs: "0.9rem", md: "0.95rem" }, lineHeight: 1.5, "&:hover": { color: COLORS.red } }}>
                    <ChevronRight size={16} color={COLORS.red} strokeWidth={3} style={{ flexShrink: 0, marginTop: 3 }} />
                    {it.title}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
