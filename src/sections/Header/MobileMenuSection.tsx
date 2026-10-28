"use client";

import React, { useState } from "react";
import Link from "next/link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ChevronDown, ChevronRight } from "lucide-react";
import { IconRenderer } from "@/components";
import { MenuSection, MenuTile, NavItem, NavLink } from "@/types";
import { externalLinkProps } from "@/utils/links";
import { COLORS } from "@/theme/colors";

const INK = "#1F2937";
const LINE = "#EEF0F3";
const COLUMNS = 2;

type MobileMenuSectionProps = {
  section: MenuSection;
  navItems: NavItem[];
  onClose: () => void;
};

const tileSx = (isOpen: boolean) => ({
  display: "flex",
  alignItems: "center",
  gap: 1,
  py: 1,
  minWidth: 0,
  width: "100%",
  border: "none",
  background: "none",
  textAlign: "left" as const,
  fontFamily: "inherit",
  cursor: "pointer",
  textDecoration: "none",
  color: isOpen ? COLORS.red : INK,
  "&:hover": { color: COLORS.red },
});

function DropdownLinks({ links, onClose }: { links: NavLink[]; onClose: () => void }) {
  return (
    <Box sx={{ gridColumn: "1 / -1", mb: 1, p: 1.25, borderRadius: "10px", bgcolor: COLORS.redTintSoft, border: `1px solid ${COLORS.redTintHover}`, position: "relative", zIndex: 1 }}>
      <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "grid", gap: 0.25 }}>
        {links.map((link) => (
          <Box component="li" key={link.label}>
            <Box
              component={Link}
              href={link.href}
              {...externalLinkProps(link)}
              onClick={onClose}
              sx={{ display: "flex", alignItems: "center", gap: 1, py: 0.75, color: "#374151", fontSize: "0.85rem", textDecoration: "none", "&::before": { content: '""', width: 5, height: 5, borderRadius: "50%", bgcolor: COLORS.red, flexShrink: 0 }, "&:hover": { color: COLORS.red } }}
            >
              {link.label}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

/** One titled section of the mobile menu: two columns of tiles. A tile linked to a desktop menu opens its dropdown under its row. */
export default function MobileMenuSection({ section, navItems, onClose }: MobileMenuSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const dropdownOf = ({ dropdownId }: MenuTile) => navItems.find(({ id }) => id === dropdownId)?.children || [];
  const openTile = openIndex === null ? null : section.items[openIndex];
  // The open dropdown shows after the last tile of its row
  const openRowEnd = openIndex === null ? -1 : Math.min(openIndex - (openIndex % COLUMNS) + COLUMNS - 1, section.items.length - 1);

  return (
    <Box sx={{ pt: 1.5, pb: 1, borderBottom: `1px solid ${LINE}` }}>
      <Typography sx={{ fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.06em", color: "#374151", textTransform: "uppercase", mb: 1 }}>{section.title}</Typography>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
          columnGap: 1.5,
          // vertical divider between the two columns
          backgroundImage: `linear-gradient(${LINE}, ${LINE})`,
          backgroundSize: "1px 100%",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {section.items.map((tile, index) => {
          const links = dropdownOf(tile);
          const isOpen = openIndex === index;
          const content = (
            <>
              <IconRenderer name={tile.icon} size={17} color={isOpen ? COLORS.red : "#374151"} />
              <Typography component="span" sx={{ flex: 1, minWidth: 0, fontSize: "0.84rem", lineHeight: 1.3, fontWeight: isOpen ? 600 : 400 }}>
                {tile.label}
              </Typography>
              {links.length ? (
                <ChevronDown size={15} color={isOpen ? COLORS.red : "#9CA3AF"} style={{ flexShrink: 0, transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s ease" }} />
              ) : (
                <ChevronRight size={15} color="#9CA3AF" style={{ flexShrink: 0 }} />
              )}
            </>
          );

          return (
            <React.Fragment key={`${tile.label}-${index}`}>
              {links.length ? (
                <Box component="button" type="button" aria-expanded={isOpen} onClick={() => setOpenIndex(isOpen ? null : index)} sx={tileSx(isOpen)}>
                  {content}
                </Box>
              ) : (
                <Box component={Link} href={tile.href} {...externalLinkProps(tile)} onClick={onClose} sx={tileSx(false)}>
                  {content}
                </Box>
              )}
              {index === openRowEnd && openTile && <DropdownLinks links={dropdownOf(openTile)} onClose={onClose} />}
            </React.Fragment>
          );
        })}
      </Box>
    </Box>
  );
}
