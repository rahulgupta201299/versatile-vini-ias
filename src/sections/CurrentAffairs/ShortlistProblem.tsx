import React from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { ShortlistContent } from "@/types";

/** The Current Affairs Problem → The Shortlist Course: two artwork panels, side by side on desktop, stacked on mobile. */
export default function ShortlistProblem({ data }: { data: ShortlistContent["problem"] }) {
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 7 } }}>
      <Container>
        <Box sx={{ maxWidth: 1180, mx: "auto", display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: { xs: 2, md: 3 } }}>
          {[data.problem, data.solution].map((panel) => (
            <Image
              key={panel.image}
              src={panel.image}
              alt={panel.alt}
              width={800}
              height={800}
              sizes="(max-width: 900px) 100vw, 580px"
              style={{ width: "100%", height: "auto", borderRadius: 20 }}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
