import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { STUDY_RESOURCES } from "@/data/studyResources";
import { getSiteData } from "@/services/site";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";
import ResourceArt from "./ResourceArt";

/** Homepage "Study Resources" (layout after pw.live): centred heading, then near-square cards — 3 across on computers, a swipeable row on phones. Explore shows on hover where there is one. */
export default async function StudyResourcesSection() {
  const { storeHref } = (await getSiteData()).navigation;

  return (
    <Box component="section" id="study-resources" aria-labelledby="study-resources-title" sx={{ py: { xs: 4, md: 6 }, bgcolor: "#FFFFFF" }}>
      <Container>
        <Box sx={{ textAlign: "center", maxWidth: 760, mx: "auto" }}>
          <Typography id="study-resources-title" component="h2" sx={{ fontWeight: 700, fontSize: { xs: "1.45rem", md: "2rem" }, color: COLORS.ink, letterSpacing: "-0.01em" }}>
            Study Resources
          </Typography>
          <Typography sx={{ mt: 1.25, color: COLORS.body, fontSize: { xs: "1rem", md: "1.2rem" }, lineHeight: 1.55 }}>
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
            gridTemplateColumns: { md: "repeat(3, minmax(0, 1fr))" },
            gap: { xs: 2, md: 2 },
            overflowX: { xs: "auto", md: "visible" },
            scrollSnapType: { xs: "x mandatory", md: "none" },
            scrollPaddingInline: { xs: 16, sm: 0 },
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {STUDY_RESOURCES.map(({ title, text, href, tint, image, art = "papers" }) => {
            const link = href === "store" ? storeHref : href;

            return (
              <Box component="li" key={title} sx={{ flex: { xs: "0 0 86%", sm: "0 0 calc((100% - 16px) / 2)", md: "auto" }, scrollSnapAlign: "start", display: "flex" }}>
                <Box
                  component={Link}
                  href={link}
                  {...externalLinkProps({ href: link })}
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    minWidth: 0,
                    minHeight: { xs: 380, md: 420, lg: 450 },
                    p: { xs: 2.5, md: 2.25, lg: 3 },
                    pb: { xs: 2, lg: 2.5 },
                    borderRadius: "10px",
                    bgcolor: tint,
                    color: "inherit",
                    textDecoration: "none",
                    "& .explore": { opacity: { xs: 1, md: 0 }, transform: { md: "translateY(6px)" }, transition: "opacity .2s, transform .2s" },
                    "&:hover .explore, &:focus-visible .explore": { opacity: 1, transform: "none" },
                  }}
                >
                  <Typography component="h3" sx={{ fontWeight: 600, fontSize: { xs: "1.35rem", md: "1.45rem", lg: "1.65rem" }, color: COLORS.ink, letterSpacing: "-0.01em" }}>{title}</Typography>
                  <Typography sx={{ mt: 1, color: COLORS.textSecondary, fontSize: { xs: "0.92rem", lg: "1rem" }, lineHeight: 1.6 }}>{text}</Typography>
                  {/* The art sits in a fixed-height box in the card's flow: long text makes the card taller instead of overlapping it */}
                  <Box sx={{ flex: 1, mt: 1.5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end" }}>
                    <Box sx={{ position: "relative", width: "100%", maxWidth: 300, height: { xs: 190, md: 200, lg: 220 }, flexShrink: 0, "& svg": { width: "100%", height: "100%", display: "block" } }}>
                      {image && <Image src={image.src} alt={image.alt} fill sizes="(max-width: 900px) 86vw, 300px" style={{ objectFit: "contain" }} />}
                      {!image && <ResourceArt name={art} />}
                    </Box>
                    <Box component="span" className="explore" sx={{ mt: 1, px: 1.75, py: 0.6, borderRadius: "6px", bgcolor: COLORS.ink, color: "#FFFFFF", fontWeight: 500, fontSize: "1.05rem" }}>Explore</Box>
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
