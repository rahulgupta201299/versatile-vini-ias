"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";
import { CourseCta } from "@/types";
import { openAuth } from "@/utils/events";
import { externalLinkProps } from "@/utils/links";

export const scrollToDetails = () => document.getElementById("course-details")?.scrollIntoView({ behavior: "smooth" });

const DEFAULT_ACTIONS = { details: scrollToDetails, enroll: openAuth };

type CourseCtaButtonProps = {
  /** Text and link from the admin; without a link the button does its default action. */
  cta?: CourseCta;
  action: keyof typeof DEFAULT_ACTIONS;
  /** Text when the page has no CTA settings (pages not managed in the admin). */
  label: string;
  icon?: ReactNode;
  sx: SxProps<Theme>;
};

/** "Course Details" / "Enroll" button: a link when one is set, else scroll to the details / open the sign-up popup. */
export default function CourseCtaButton({ cta, action, label, icon, sx }: CourseCtaButtonProps) {
  const text = cta?.label || label;
  const link = cta?.link || "";
  const styles = [{ textDecoration: "none" }, ...(Array.isArray(sx) ? sx : [sx])];

  if (link) {
    return (
      <Box component={Link} href={link} {...externalLinkProps({ href: link })} sx={styles}>
        {text} {icon}
      </Box>
    );
  }

  return (
    <Box component="button" type="button" onClick={DEFAULT_ACTIONS[action]} sx={styles}>
      {text} {icon}
    </Box>
  );
}
