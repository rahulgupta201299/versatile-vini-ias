"use client";

import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import {
  X as CloseIcon,
  Trophy,
  MapPin,
  Clock,
  BookOpen,
  Award,
  CheckCircle2,
  Quote,
} from "lucide-react";
import { Ranker } from "@/types";

export interface RankerStoryModalProps {
  ranker: Ranker | null;
  onClose: () => void;
}

export default function RankerStoryModal({ ranker, onClose }: RankerStoryModalProps) {
  if (!ranker) return null;

  return (
    <Dialog
      open={Boolean(ranker)}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          border: "2px solid #FDE68A",
        },
      }}
    >
      {/* Header Banner */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #70161C 0%, #8B1D24 50%, #A8323A 100%)",
          color: "#FFFFFF",
          p: { xs: 2.5, sm: 3.5 },
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 14,
            right: 14,
            color: "#FFFFFF",
            backgroundColor: "rgba(0,0,0,0.2)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.4)" },
          }}
        >
          <CloseIcon size={20} />
        </IconButton>

        <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", gap: 2.5 }}>
          <Box sx={{ position: "relative" }}>
            <Avatar
              src={ranker.photoUrl}
              alt={ranker.name}
              sx={{
                width: 90,
                height: 90,
                borderRadius: "18px",
                border: "3px solid #F59E0B",
                boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -4,
                right: -4,
                backgroundColor: "#16A34A",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "2px solid #FFFFFF",
              }}
            >
              <CheckCircle2 size={14} color="#FFFFFF" />
            </Box>
          </Box>

          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" }, gap: 1, mb: 0.75 }}>
              <Chip
                icon={<Trophy size={14} color="#92400E" />}
                label={`RANK ${ranker.rank}`}
                size="small"
                sx={{
                  backgroundColor: "#FEF3C7",
                  color: "#92400E",
                  fontWeight: 900,
                  fontSize: "0.78rem",
                }}
              />
              <Chip
                label={ranker.exam}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                }}
              />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: "1.4rem", sm: "1.8rem" }, color: "#FFFFFF" }}>
              {ranker.name} <span style={{ fontSize: "1.1rem", opacity: 0.85 }}>({ranker.hindiName})</span>
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", sm: "flex-start" }, gap: 1.5, mt: 0.5 }}>
              <Chip
                label={ranker.designation}
                size="small"
                sx={{ backgroundColor: "#DCFCE7", color: "#166534", fontWeight: 700 }}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, color: "#FEF08A", fontSize: "0.85rem" }}>
                <MapPin size={15} />
                <span>{ranker.location}</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Modal Body Content */}
      <DialogContent sx={{ p: { xs: 2.5, sm: 3.5 }, backgroundColor: "#FFFDF9" }}>
        {/* Quote banner */}
        <Box
          sx={{
            backgroundColor: "#FEF3C7",
            border: "1px solid #FDE68A",
            borderRadius: "14px",
            p: 2,
            mb: 3,
            display: "flex",
            gap: 1.5,
          }}
        >
          <Quote size={24} color="#B45309" style={{ flexShrink: 0 }} />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: "#78350F", fontStyle: "italic" }}>
              &ldquo;{ranker.quoteHindi}&rdquo;
            </Typography>
            <Typography variant="caption" sx={{ color: "#92400E", fontWeight: 600 }}>
              — {ranker.quoteEnglish}
            </Typography>
          </Box>
        </Box>

        {/* Section 1: Journey & Background */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#70161C", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Award size={20} color="#70161C" />
          Background &amp; Preparation Journey
        </Typography>
        <Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.65, mb: 3 }}>
          {ranker.readStory.background}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Section 2: Strategy & Mains Answer Writing */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#70161C", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <CheckCircle2 size={20} color="#16A34A" />
          Mains Answer Writing &amp; Strategy
        </Typography>
        <Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.65, mb: 3 }}>
          {ranker.readStory.strategy}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Section 3: Daily Routine & Timetable */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#70161C", mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
          <Clock size={20} color="#2563EB" />
          Daily Routine &amp; Study Schedule
        </Typography>
        <Typography variant="body1" sx={{ color: "#334155", lineHeight: 1.65, mb: 3 }}>
          {ranker.readStory.timetable}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Section 4: Recommended Books */}
        <Typography variant="h6" sx={{ fontWeight: 800, color: "#70161C", mb: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
          <BookOpen size={20} color="#D97706" />
          Recommended Booklist by Ranker
        </Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, gap: 1.25, mb: 3 }}>
          {ranker.readStory.recommendedBooks.map((book, idx) => (
            <Box
              key={idx}
              sx={{
                p: 1.25,
                borderRadius: "8px",
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <CheckCircle2 size={16} color="#16A34A" />
              <Typography variant="body2" sx={{ fontWeight: 600, color: "#1E293B", fontSize: "0.85rem" }}>
                {book}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Section 5: Golden Advice */}
        <Box sx={{ p: 2, borderRadius: "12px", backgroundColor: "#FEF2F2", border: "1px solid #FECACA" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 800, color: "#991B1B", mb: 0.5 }}>
            Message to Future Aspirants:
          </Typography>
          <Typography variant="body2" sx={{ color: "#7F1D1D", lineHeight: 1.5 }}>
            &ldquo;{ranker.readStory.adviceToAspirants}&rdquo;
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, backgroundColor: "#FFFDF9", borderTop: "1px solid #F1E2C3" }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: "#70161C",
            color: "#FFFFFF",
            fontWeight: 700,
            px: 4,
            py: 1,
            borderRadius: "8px",
            "&:hover": { backgroundColor: "#541014" },
          }}
        >
          Close Story
        </Button>
      </DialogActions>
    </Dialog>
  );
}
