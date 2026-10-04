import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { MapPin, Trophy, CheckCircle2, ArrowRight } from "lucide-react";
import { Ranker } from "@/types";

export interface RankerCardProps {
  ranker: Ranker;
  onReadStory: (ranker: Ranker) => void;
}

export default function RankerCard({ ranker, onReadStory }: RankerCardProps) {
  return (
    <Card
      sx={{
        backgroundColor: "#FFFFFF",
        borderRadius: "20px",
        border: "1.5px solid #F1E2C3",
        boxShadow: "0 8px 24px rgba(139, 29, 36, 0.06)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        p: { xs: 2.2, sm: 2.5 },
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 18px 36px rgba(139, 29, 36, 0.12)",
          borderColor: "#D97706",
        },
      }}
    >
      {/* Top Badges Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 0.6,
            backgroundColor: "#FEF3C7",
            color: "#92400E",
            border: "1px solid #FDE68A",
            px: 1.4,
            py: 0.4,
            borderRadius: "8px",
            fontSize: "0.82rem",
            fontWeight: 800,
            letterSpacing: "0.02em",
          }}
        >
          <Trophy size={14} color="#D97706" />
          RANK {ranker.rank}
        </Box>

        <Box
          sx={{
            backgroundColor: "#FFFBEB",
            color: "#B45309",
            border: "1px solid #FDE68A",
            px: 1.4,
            py: 0.4,
            borderRadius: "8px",
            fontSize: "0.78rem",
            fontWeight: 700,
          }}
        >
          {ranker.exam}
        </Box>
      </Box>

      {/* Student Profile Row */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ position: "relative" }}>
          <Avatar
            src={ranker.photoUrl}
            alt={ranker.name}
            variant="rounded"
            sx={{
              width: 72,
              height: 72,
              borderRadius: "14px",
              border: "2.5px solid #F59E0B",
              boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: -4,
              right: -4,
              backgroundColor: "#16A34A",
              borderRadius: "50%",
              width: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #FFFFFF",
            }}
          >
            <CheckCircle2 size={12} color="#FFFFFF" />
          </Box>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "1.1rem", sm: "1.2rem" },
              color: "#1E293B",
              lineHeight: 1.2,
            }}
          >
            {ranker.name}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              fontSize: "0.88rem",
              color: "#8B1D24",
              fontWeight: 700,
              mb: 0.75,
            }}
          >
            {ranker.hindiName}
          </Typography>

          <Chip
            label={ranker.designation}
            size="small"
            sx={{
              backgroundColor: "#DCFCE7",
              color: "#166534",
              fontWeight: 700,
              fontSize: "0.72rem",
              border: "1px solid #BBF7D0",
              height: "22px",
            }}
          />
        </Box>
      </Box>

      {/* Location */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 1.75, color: "#64748B" }}>
        <MapPin size={15} color="#DC2626" />
        <Typography variant="body2" sx={{ fontSize: "0.82rem", fontWeight: 600 }}>
          {ranker.location}
        </Typography>
      </Box>

      {/* Motivational Quote Box */}
      <Box
        sx={{
          backgroundColor: "#FFFDF5",
          border: "1px solid #FEF08A",
          borderRadius: "12px",
          p: 1.75,
          mb: 2.25,
          flexGrow: 1,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "0.88rem",
            fontWeight: 700,
            color: "#1E293B",
            fontStyle: "italic",
            lineHeight: 1.4,
            mb: 0.5,
          }}
        >
          &ldquo;{ranker.quoteHindi}&rdquo;
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: "0.75rem",
            color: "#64748B",
            display: "block",
            lineHeight: 1.35,
          }}
        >
          — {ranker.quoteEnglish}
        </Typography>
      </Box>

      {/* Read Story Action Button */}
      <Button
        variant="contained"
        fullWidth
        onClick={() => onReadStory(ranker)}
        endIcon={<ArrowRight size={16} />}
        sx={{
          backgroundColor: "#70161C",
          color: "#FFFFFF",
          fontWeight: 700,
          fontSize: "0.88rem",
          py: 1.1,
          borderRadius: "10px",
          textTransform: "none",
          boxShadow: "0 4px 12px rgba(112, 22, 28, 0.2)",
          "&:hover": {
            backgroundColor: "#541014",
            boxShadow: "0 6px 16px rgba(112, 22, 28, 0.3)",
          },
        }}
      >
        सफलता की कहानी देखें (Read Story)
      </Button>
    </Card>
  );
}
