import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { BookOpen, CalendarDays, ChevronRight } from "lucide-react";
import { WhatsAppLogo } from "@/components/icons/BrandLogos";
import { PopularProgram } from "@/data/popularPrograms";
import { COLORS } from "@/theme/colors";

const SITE_URL = "https://viniias.com";

const formatINR = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

const percentOff = ({ price, originalPrice }: Pick<PopularProgram, "price" | "originalPrice">) => Math.round((1 - price / originalPrice) * 100);

/** "Share on WhatsApp" link for a course: its title and page. */
const whatsappShareHref = ({ title, detailsHref }: Pick<PopularProgram, "title" | "detailsHref">) => {
  const url = detailsHref.startsWith("http") ? detailsHref : `${SITE_URL}${detailsHref}`;

  return `https://wa.me/?text=${encodeURIComponent(`${title} — ${url}`)}`;
};

/** Card narrower than price + both buttons on one line (laptop widths with 3 cards a row). */
const NARROW_CARD = "@container (max-width: 350px)";

const ellipsis = { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } as const;

/** Batch card (layout after pw.live batches): banner + share, category / language, title, two detail rows, price and buttons. */
export default function ProgramCard({ program }: { program: PopularProgram }) {
  const { title, category, language, description, schedule, price, originalPrice, banner, buyHref, detailsHref } = program;

  return (
    <Box component="article" sx={{ containerType: "inline-size", height: "100%", display: "flex", flexDirection: "column", borderRadius: "16px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", overflow: "hidden", transition: "border-color .15s, box-shadow .15s", "&:hover": { borderColor: COLORS.ink, boxShadow: "0 8px 22px rgba(15,23,42,.06)" } }}>
      <Box sx={{ position: "relative", aspectRatio: "2 / 1", bgcolor: COLORS.surface }}>
        <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 900px) 380px, (min-width: 600px) 50vw, 100vw" style={{ objectFit: banner.fit || "cover" }} />
        <Box component="a" href={whatsappShareHref(program)} target="_blank" rel="noopener noreferrer" aria-label={`Share ${title} on WhatsApp`} sx={{ position: "absolute", top: 10, right: 10, width: 38, height: 38, borderRadius: "10px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.ink, "&:hover": { borderColor: COLORS.ink } }}>
          <WhatsAppLogo size={22} color={COLORS.ink} />
        </Box>
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", px: { xs: 2, md: 2.25 }, pt: 1.75, pb: { xs: 2, md: 2.25 } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
          <Typography sx={{ color: "#E8590C", fontWeight: 500, fontSize: { xs: "1rem", md: "1.05rem" } }}>{category}</Typography>
          <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: "4px", border: `1px solid ${COLORS.disabled}`, color: COLORS.ink, fontWeight: 500, fontSize: "0.8rem", letterSpacing: ".02em" }}>{language}</Box>
        </Box>
        <Typography component="h3" sx={{ mt: 0.75, fontWeight: 600, color: COLORS.ink, fontSize: { xs: "1.15rem", md: "1.3rem" }, lineHeight: 1.35, ...ellipsis }}>{title}</Typography>
        <Box sx={{ mt: 1.25, display: "grid", gap: 1, color: COLORS.body, fontSize: { xs: "0.95rem", md: "1rem" } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
            <BookOpen size={18} color={COLORS.muted} style={{ flexShrink: 0 }} />
            <Box component="span" sx={ellipsis}>{description}</Box>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
            <CalendarDays size={18} color={COLORS.muted} style={{ flexShrink: 0 }} />
            <Box component="span" sx={ellipsis}>{schedule}</Box>
          </Box>
        </Box>

        {/* Price and buttons share a line; on a narrow card the price takes its own line and the buttons fill the next */}
        <Box sx={{ mt: "auto", pt: 2.5, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1, rowGap: 1.5, [NARROW_CARD]: { "& .price": { flexBasis: "100%" }, "& .buy": { flex: 1, justifyContent: "center" } } }}>
          <Box className="price" sx={{ mr: "auto", minWidth: 0 }}>
            <Typography sx={{ fontWeight: 700, color: COLORS.ink, fontSize: { xs: "1.2rem", md: "1.3rem" }, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              {formatINR(price)}{" "}
              <Box component="s" sx={{ color: COLORS.muted, fontWeight: 400, fontSize: "0.9rem" }}>{formatINR(originalPrice)}</Box>
            </Typography>
            <Typography sx={{ mt: 0.25, color: COLORS.success, fontWeight: 500, fontSize: "1rem", whiteSpace: "nowrap" }}>{percentOff(program)}% OFF</Typography>
          </Box>
          <Box component={Link} href={buyHref} className="buy" sx={{ display: "inline-flex", alignItems: "center", height: 44, px: { xs: 2.5, md: 3 }, borderRadius: "8px", bgcolor: "#1B2124", color: "#FFFFFF", fontWeight: 500, fontSize: "1.05rem", textDecoration: "none", whiteSpace: "nowrap", "&:hover": { bgcolor: COLORS.ink } }}>
            Buy Now
          </Box>
          <Box component={Link} href={detailsHref} aria-label={`View ${title}`} sx={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, flexShrink: 0, borderRadius: "8px", border: `1px solid ${COLORS.border}`, color: COLORS.ink, "&:hover": { borderColor: COLORS.ink } }}>
            <ChevronRight size={22} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
