"use client";

import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { FREE_RESOURCES } from "@/data/resources";
import { IconRenderer } from "@/components";

export default function FreeResourcesSection() {
  return (
    <Box
      id="resources"
      component="section"
      sx={{
        py: { xs: 3, sm: 4, md: 4.5 },
        backgroundColor: "#FFFFFF",
      }}
    >
      <Container>
        {/* Section Heading matching uploaded screenshot media_1791115722404.jpg */}
        <Box sx={{ mb: { xs: 2.5, sm: 3, md: 3.5 } }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.45rem", sm: "1.75rem", md: "2.1rem" },
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              color: "#0F172A",
            }}
          >
            Browse Our{" "}
            <Box component="span" sx={{ color: "#DC2626" }}>
              Free Resources
            </Box>
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: "#64748B",
              fontSize: { xs: "0.85rem", sm: "0.95rem" },
              fontWeight: 500,
              mt: 0.5,
              lineHeight: 1.4,
            }}
          >
            Access high-quality study material, current affairs and more — absolutely free!
          </Typography>
        </Box>

        {/* Responsive Grid: 10 columns on desktop, 5 cols x 2 rows on mobile & tablet */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(5, 1fr)",
              sm: "repeat(5, 1fr)",
              md: "repeat(10, 1fr)",
            },
            gap: { xs: 1, sm: 1.25, md: 1.25, lg: 1.5 },
          }}
        >
          {FREE_RESOURCES.map((item) => (
            <Box
              key={item.id}
              component="a"
              href={item.href}
              sx={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: { xs: "12px", sm: "14px", md: "16px" },
                p: { xs: 1, sm: 1.25, md: 1.5 },
                minHeight: { xs: 90, sm: 100, md: 115 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                textDecoration: "none",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
                transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.08)",
                  borderColor: item.iconColor,
                },
              }}
            >
              {/* Soft Pastel Circle containing the Icon */}
              <Box
                sx={{
                  width: { xs: 36, sm: 42, md: 48 },
                  height: { xs: 36, sm: 42, md: 48 },
                  borderRadius: "50%",
                  backgroundColor: item.bgColor,
                  color: item.iconColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: { xs: 0.75, sm: 1 },
                  flexShrink: 0,
                  transition: "transform 0.2s ease",
                  ".MuiBox-root:hover &": {
                    transform: "scale(1.06)",
                  },
                }}
              >
                <IconRenderer
                  name={item.icon}
                  size={20}
                  color={item.iconColor}
                />
              </Box>

              {/* Title Text */}
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "0.68rem", sm: "0.76rem", md: "0.82rem" },
                  color: "#1E293B",
                  lineHeight: 1.2,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textAlign: "center",
                }}
              >
                {item.title}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
