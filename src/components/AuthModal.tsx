"use client";

import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import { X, CheckCircle2 } from "lucide-react";

export interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tab === 1 && !name.trim()) {
      setError("Please enter your name");
      return;
    }
    const cleanMobile = mobile.replace(/\D/g, "");
    if (cleanMobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setMobile("");
    setName("");
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleReset}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "20px",
          p: 1,
        },
      }}
    >
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#1E293B" }}>
            {tab === 0 ? "Welcome Back" : "Create Aspirant Account"}
          </Typography>
          <IconButton size="small" onClick={handleReset}>
            <X size={18} />
          </IconButton>
        </Box>

        <Tabs
          value={tab}
          onChange={(_, newVal) => {
            setTab(newVal);
            setError("");
          }}
          sx={{ mb: 3, borderBottom: "1px solid #E2E8F0" }}
        >
          <Tab label="Login" sx={{ fontWeight: 700, textTransform: "none", fontSize: "0.95rem" }} />
          <Tab label="Register" sx={{ fontWeight: 700, textTransform: "none", fontSize: "0.95rem" }} />
        </Tabs>

        {submitted ? (
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircle2 size={46} color="#16A34A" style={{ margin: "0 auto 12px auto" }} />
            <Typography variant="h6" sx={{ fontWeight: 800, color: "#166534", mb: 1 }}>
              OTP Sent Successfully!
            </Typography>
            <Typography variant="body2" sx={{ color: "#64748B", mb: 3 }}>
              A 6-digit verification code has been dispatched to <strong>+91 {mobile}</strong>.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handleReset}
              sx={{ backgroundColor: "#8B1D24", py: 1.2, fontWeight: 700 }}
            >
              Continue to Student Dashboard
            </Button>
          </Box>
        ) : (
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: "10px" }}>
                {error}
              </Alert>
            )}

            {tab === 1 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: "#334155", mb: 0.5, display: "block" }}>
                  Your Full Name
                </Typography>
                <TextField
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                  variant="outlined"
                  InputProps={{ sx: { borderRadius: "10px" } }}
                />
              </Box>
            )}

            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ fontWeight: 700, color: "#334155", mb: 0.5, display: "block" }}>
                Mobile Number
              </Typography>
              <TextField
                placeholder="10-digit mobile number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <Box sx={{ fontWeight: 800, color: "#8B1D24", mr: 1, fontSize: "0.95rem" }}>
                      +91
                    </Box>
                  ),
                  sx: { borderRadius: "10px" },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              sx={{
                background: "linear-gradient(135deg, #8B1D24 0%, #A8323A 100%)",
                color: "#FFFFFF",
                fontWeight: 800,
                py: 1.3,
                borderRadius: "10px",
                boxShadow: "0 4px 14px rgba(139, 29, 36, 0.25)",
              }}
            >
              {tab === 0 ? "Get Login OTP" : "Register with OTP"}
            </Button>

            <Typography variant="caption" sx={{ display: "block", textAlign: "center", color: "#94A3B8", mt: 2 }}>
              By logging in, you agree to our Terms of Service and Privacy Policy.
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}
