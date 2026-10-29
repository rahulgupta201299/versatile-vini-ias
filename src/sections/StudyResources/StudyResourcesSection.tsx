import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ArrowRight } from "lucide-react";
import { STUDY_RESOURCES } from "@/data/studyResources";
import { getSiteData } from "@/services/site";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";
import BooksArt from "./BooksArt";

/** Homepage "Study Resources": centred heading, then cards (4 across on computers, a swipeable row on phones). */
export default async function StudyResourcesSection() {
  const { storeHref } = (await getSiteData()).navigation;

  return (
    <Box component="section" id="study-resources" aria-labelledby="study-resources-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: "#FFFFFF" }}>
      <Container>
        <Box sx={{ textAlign: "center", maxWidth: 560, mx: "auto" }}>
          <Typography id="study-resources-title" component="h2" sx={{ fontWeight: 700, fontSize: { xs: "1.45rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.01em" }}>
            Study Resources
          </Typography>
          <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: { xs: "1rem", md: "1.1rem" }, lineHeight: 1.55 }}>
            A diverse array of learning materials to enhance your educational journey.
          </Typography>
        </Box>

        <Box
          component="ul"
          sx={{
            listStyle: "none",
            m: 0,
            mt: { xs: 2.5, md: 4 },
            mx: { xs: -2, sm: 0 },
            px: { xs: 2, sm: 0 },
            pb: { xs: 1, md: 0 },
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: { md: "repeat(4, minmax(0, 1fr))" },
            gap: { xs: 2, md: 2.5 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            scrollPaddingInline: { xs: 16, sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {STUDY_RESOURCES.map(({ title, text, href, tint, books, label }) => {
            const link = href === "store" ? storeHref : href;

            return (
              <Box component="li" key={title} sx={{ flex: { xs: "0 0 84%", sm: "0 0 calc((100% - 16px) / 2)", md: "auto" }, scrollSnapAlign: "start", display: "flex" }}>
                <Box
                  component={Link}
                  href={link}
                  {...externalLinkProps({ href: link })}
                  sx={{ flex: 1, display: "flex", flexDirection: "column", p: { xs: 2.5, md: 3 }, borderRadius: "16px", bgcolor: tint, color: "inherit", textDecoration: "none", transition: "transform .2s, box-shadow .2s", "&:hover": { transform: "translateY(-3px)", boxShadow: "0 14px 30px rgba(15,23,42,.08)" }, "&:hover .arrow": { transform: "translateX(4px)" } }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                    <Typography component="h3" sx={{ fontWeight: 600, fontSize: { xs: "1.15rem", md: "1.25rem" }, color: COLORS.ink }}>{title}</Typography>
                    <ArrowRight className="arrow" size={24} color={COLORS.ink} style={{ flexShrink: 0, transition: "transform .2s" }} />
                  </Box>
                  <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: "0.9rem", lineHeight: 1.6 }}>{text}</Typography>
                  <Box sx={{ mt: "auto", pt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Box sx={{ width: "100%", maxWidth: 240, "& svg": { width: "100%", height: "auto", display: "block" } }}>
                      <BooksArt colors={books} label={label} />
                    </Box>
                    <Box component="span" sx={{ mt: 1, px: 2, py: 0.75, borderRadius: "8px", bgcolor: COLORS.ink, color: "#FFFFFF", fontWeight: 600, fontSize: "0.95rem" }}>Explore</Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
