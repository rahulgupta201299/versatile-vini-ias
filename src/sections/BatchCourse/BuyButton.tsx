"use client";

import Link from "next/link";
import Box from "@mui/material/Box";
import { openAuth } from "@/utils/events";
import { externalLinkProps } from "@/utils/links";

type BuyButtonProps = {
  color: string;
  label?: string;
  /** Where to buy; without one the button opens the sign-up popup. */
  link?: string;
};

/** Plan "Buy Now" button. */
export default function BuyButton({ color, label = "Buy Now", link }: BuyButtonProps) {
  const sx = { display: "inline-flex", alignItems: "center", mt: 1, height: 36, px: { xs: 2, md: 3 }, border: "none", borderRadius: "9999px", backgroundColor: color, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: { xs: "0.8rem", md: "0.88rem" }, textDecoration: "none", cursor: "pointer", whiteSpace: "nowrap", transition: "filter .15s", "&:hover": { filter: "brightness(0.9)" } } as const;

  if (link) {
    return (
      <Box component={Link} href={link} {...externalLinkProps({ href: link })} sx={sx}>
        {label}
      </Box>
    );
  }

  return (
    <Box component="button" type="button" onClick={openAuth} sx={sx}>
      {label}
    </Box>
  );
}
