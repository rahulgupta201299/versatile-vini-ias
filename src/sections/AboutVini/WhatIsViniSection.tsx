import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

/** Homepage "Rahul, what is Vini IAS?" illustration, under "Browse Our Free Resources". */
export default function WhatIsViniSection() {
  return (
    <Box component="section" aria-label="What is Vini IAS" sx={{ py: { xs: 2, md: 3 }, bgcolor: "#FFFFFF" }}>
      <Container>
        <Box sx={{ maxWidth: 880, mx: "auto" }}>
          <Image
            src="/images/home/vini-what-is-vini-ias.webp"
            alt="“Rahul, what is Vini IAS?” — “Vini IAS is a leading edtech platform for UPSC and other competitive exams.”"
            width={1637}
            height={823}
            sizes="(max-width: 960px) 100vw, 880px"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </Box>
      </Container>
    </Box>
  );
}
