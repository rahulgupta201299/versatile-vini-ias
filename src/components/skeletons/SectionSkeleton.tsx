import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Shimmer from "./Shimmer";
import TextLinesSkeleton from "./TextLinesSkeleton";

/**
 * Section-shaped loading placeholders. A page skeleton is a list of sections in page order, each with the real
 * section's height per screen size (phone / tablet / laptop / desktop), so swapping in the page moves nothing.
 */

/** A value per screen size: xs (phones), sm (tablets, 600+), md (laptops, 900+), lg (desktops, 1200+). */
export type Responsive<T> = { xs: T; sm?: T; md?: T; lg?: T };

type Align = "left" | "center";

export type SectionShape =
  /** A full-width banner (hero slider, promo banner, app card). */
  | { kind: "banner" }
  /** Heading, then cards in a grid that fills the section. */
  | { kind: "cards"; heading?: Align; columns: Responsive<number>; rows?: Responsive<number> }
  /** Heading, then small tiles (e.g. Free Resources). */
  | { kind: "tiles"; heading?: Align; columns: Responsive<number>; count: number }
  /** Text and buttons beside a picture or form (stacked on phones). */
  | { kind: "split"; reverse?: boolean }
  /** Course hero: breadcrumb, centred title, then text + buttons beside the media. */
  | { kind: "courseHero" }
  /** A row of pills (tab strips, category bars). */
  | { kind: "chips"; count: number }
  /** Page title band: breadcrumb, centred title and a line of text. */
  | { kind: "titleBand" }
  /** Heading, then rows (FAQs, steps, lists). */
  | { kind: "rows"; heading?: Align; count: number }
  /** Heading, then paragraphs (policies, articles). */
  | { kind: "text"; heading?: Align; paragraphs: number };

export type SectionSkeletonSpec = { height: Responsive<number>; shape: SectionShape; tint?: string };

function Heading({ align = "left" }: { align?: Align }) {
  const isCentered = align === "center";

  return (
    <Box sx={{ flexShrink: 0, mb: { xs: 2, md: 3 }, display: "grid", gap: 1, justifyItems: isCentered ? "center" : "start" }}>
      <Shimmer height={30} sx={{ width: { xs: "70%", sm: 360 } }} />
      <Shimmer variant="text" height={20} sx={{ width: { xs: "85%", sm: 480 } }} />
    </Box>
  );
}

const repeatColumns = (columns: Responsive<number>) =>
  Object.fromEntries(Object.entries(columns).map(([key, count]) => [key, `repeat(${count}, minmax(0, 1fr))`]));

function TextBlock() {
  return (
    <Box sx={{ display: "grid", gap: 1.5, alignContent: "center", minWidth: 0 }}>
      <Shimmer height={32} width="80%" />
      <TextLinesSkeleton lines={4} />
      <Box sx={{ display: "flex", gap: 1.5, mt: 1 }}>
        <Shimmer width={150} height={46} sx={{ borderRadius: "12px" }} />
        <Shimmer width={150} height={46} sx={{ borderRadius: "12px" }} />
      </Box>
    </Box>
  );
}

function Body({ shape }: { shape: SectionShape }) {
  const fill = { flex: 1, minHeight: 0 };

  if (shape.kind === "banner") return <Shimmer height="auto" sx={{ ...fill, borderRadius: { xs: "12px", md: "20px" } }} />;

  if (shape.kind === "cards") {
    const { heading, columns, rows = { xs: 1 } } = shape;

    return (
      <>
        {heading && <Heading align={heading} />}
        <Box sx={{ ...fill, display: "grid", gridTemplateColumns: repeatColumns(columns), gridAutoRows: "1fr", gap: { xs: 2, md: 3 }, overflow: "hidden" }}>
          {/* Enough cards for the widest grid; extra ones are clipped */}
          {Array.from({ length: Math.max(...Object.values(columns)) * Math.max(...Object.values(rows)) }, (_, index) => (
            <Shimmer key={index} height="100%" />
          ))}
        </Box>
      </>
    );
  }

  if (shape.kind === "tiles") {
    return (
      <>
        {shape.heading && <Heading align={shape.heading} />}
        <Box sx={{ ...fill, display: "grid", gridTemplateColumns: repeatColumns(shape.columns), gridAutoRows: "1fr", gap: { xs: 1, md: 1.5 } }}>
          {Array.from({ length: shape.count }, (_, index) => (
            <Shimmer key={index} height="100%" />
          ))}
        </Box>
      </>
    );
  }

  if (shape.kind === "split" || shape.kind === "courseHero") {
    const isHero = shape.kind === "courseHero";
    const reverse = shape.kind === "split" && shape.reverse;

    return (
      <>
        {isHero && (
          <Box sx={{ flexShrink: 0, display: "grid", justifyItems: "center", gap: 1.25, mb: { xs: 3, md: 4 } }}>
            <Shimmer variant="text" width={220} height={18} sx={{ justifySelf: "start" }} />
            <Shimmer height={36} sx={{ width: { xs: "90%", md: 760 }, mt: 1 }} />
            <Shimmer height={36} sx={{ width: { xs: "60%", md: 420 } }} />
          </Box>
        )}
        <Box sx={{ ...fill, display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1.1fr) minmax(0, 1fr)" }, gridTemplateRows: { xs: "auto minmax(0, 1fr)", md: "1fr" }, gap: { xs: 3, md: 6 } }}>
          <Box sx={{ order: { md: reverse ? 2 : 1 } }}>
            <TextBlock />
          </Box>
          <Shimmer height="100%" sx={{ order: { md: reverse ? 1 : 2 }, minHeight: 0, borderRadius: "16px" }} />
        </Box>
      </>
    );
  }

  if (shape.kind === "chips") {
    return (
      <Box sx={{ ...fill, display: "flex", alignItems: "center", gap: 1.5, overflow: "hidden" }}>
        {Array.from({ length: shape.count }, (_, index) => (
          <Shimmer key={index} width={110} height={34} sx={{ flexShrink: 0, borderRadius: 999 }} />
        ))}
      </Box>
    );
  }

  if (shape.kind === "titleBand") {
    return (
      <Box sx={{ ...fill, display: "grid", alignContent: "center", justifyItems: "center", gap: 1.5 }}>
        <Shimmer variant="text" width={200} height={18} />
        <Shimmer height={40} sx={{ width: { xs: "85%", md: 560 } }} />
        <Box sx={{ width: { xs: "90%", md: 640 } }}>
          <TextLinesSkeleton lines={2} />
        </Box>
      </Box>
    );
  }

  if (shape.kind === "rows") {
    return (
      <>
        {shape.heading && <Heading align={shape.heading} />}
        <Box sx={{ ...fill, display: "grid", gridAutoRows: "minmax(0, 1fr)", gap: 1.5, overflow: "hidden", maxWidth: 980, width: "100%", mx: "auto" }}>
          {Array.from({ length: shape.count }, (_, index) => (
            <Shimmer key={index} height="100%" sx={{ minHeight: 0 }} />
          ))}
        </Box>
      </>
    );
  }

  return (
    <>
      {shape.heading && <Heading align={shape.heading} />}
      <Box sx={{ ...fill, display: "grid", alignContent: "start", gap: 4, overflow: "hidden", maxWidth: 900 }}>
        {Array.from({ length: shape.paragraphs }, (_, index) => (
          <Box key={index} sx={{ display: "grid", gap: 1.25 }}>
            <Shimmer height={26} width="45%" />
            <TextLinesSkeleton lines={5} />
          </Box>
        ))}
      </Box>
    </>
  );
}

/** One section at its real height; everything inside fills it. */
export function SectionSkeleton({ height, shape, tint = "#FFFFFF" }: SectionSkeletonSpec) {
  const isEdgeToEdge = shape.kind === "banner" || shape.kind === "chips";

  return (
    <Box sx={{ height, overflow: "hidden", bgcolor: tint }}>
      <Container sx={{ height: "100%", display: "flex", flexDirection: "column", py: isEdgeToEdge ? { xs: 1.5, md: 2 } : { xs: 3, md: 5 } }}>
        <Body shape={shape} />
      </Container>
    </Box>
  );
}

/** A whole page of section skeletons, in page order. */
export function PageSectionsSkeleton({ sections }: { sections: SectionSkeletonSpec[] }) {
  return (
    <Box aria-busy aria-label="Loading">
      {sections.map((section, index) => (
        <SectionSkeleton key={index} {...section} />
      ))}
    </Box>
  );
}
