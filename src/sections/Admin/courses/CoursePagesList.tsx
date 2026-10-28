import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChevronRight, ExternalLink } from "lucide-react";
import { AdminCoursePageSummary } from "@/types";
import { COLORS } from "@/theme/colors";

const LAYOUT_LABELS = { guide: "Course guide page", batch: "Live batch page" };

const formatUpdated = (date?: string) => (date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "");

/** Web → GS Foundation: the pages managed here, each opening its editor. */
export default function CoursePagesList({ pages }: { pages: AdminCoursePageSummary[] }) {
  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {pages.map(({ _id: id, section, slug, label, layout, title, updatedAt }) => (
        <Box key={id} sx={{ display: "flex", alignItems: "center", gap: 2, p: { xs: 2, md: 2.5 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, "&:hover": { borderColor: COLORS.redBorder } }}>
          <Box component={Link} href={`/admin/web/gs-foundation/${slug}`} sx={{ flex: 1, minWidth: 0, textDecoration: "none" }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.ink }}>{label}</Typography>
            <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.84rem" }}>{title}</Typography>
            <Typography sx={{ mt: 0.5, color: COLORS.disabled, fontSize: "0.76rem", fontWeight: 600 }}>
              {LAYOUT_LABELS[layout]}
              {updatedAt && ` · updated ${formatUpdated(updatedAt)}`}
            </Typography>
          </Box>
          <Box component="a" href={`/courses/${section}/${slug}`} target="_blank" rel="noopener noreferrer" aria-label={`Open ${label} on the website`} sx={{ display: "flex", color: COLORS.muted, "&:hover": { color: COLORS.red } }}>
            <ExternalLink size={18} />
          </Box>
          <Box component={Link} href={`/admin/web/gs-foundation/${slug}`} aria-label={`Edit ${label}`} sx={{ display: "flex", color: COLORS.muted }}>
            <ChevronRight size={20} />
          </Box>
        </Box>
      ))}
    </Box>
  );
}
