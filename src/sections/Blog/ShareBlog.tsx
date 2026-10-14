"use client";

import React, { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Check, Copy, MoreHorizontal, Share2, X } from "lucide-react";
import { FacebookLogo, LinkedInLogo, TelegramLogo, WhatsAppLogo, XLogo } from "@/components/icons/BrandLogos";
import { COLORS } from "@/theme/colors";

/** "Share" pill → "Share Blog" dialog: link with tracking params, copy button and social apps (like pw.live). */
export default function ShareBlog({ title, url, id }: { title: string; url: string; id: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = useMemo(() => `${url}?utm_source=direct_copy&utm_medium=social_share&utm_campaign=blog_${id}`, [url, id]);
  const forApp = (source: string) => encodeURIComponent(`${url}?utm_source=${source}&utm_medium=social_share&utm_campaign=blog_${id}`);
  const t = encodeURIComponent(title);
  const apps = [
    { label: "WhatsApp", icon: <WhatsAppLogo size={26} />, href: `https://wa.me/?text=${t}%20${forApp("whatsapp")}` },
    { label: "Facebook", icon: <FacebookLogo size={26} />, href: `https://www.facebook.com/sharer/sharer.php?u=${forApp("facebook")}` },
    { label: "X", icon: <XLogo size={20} />, href: `https://twitter.com/intent/tweet?text=${t}&url=${forApp("twitter")}` },
    { label: "LinkedIn", icon: <LinkedInLogo size={26} />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${forApp("linkedin")}` },
    { label: "Telegram", icon: <TelegramLogo size={26} />, href: `https://t.me/share/url?url=${forApp("telegram")}&text=${t}` },
  ];
  const canNativeShare = typeof navigator !== "undefined" && typeof navigator.share === "function";

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
    } catch {
      /* clipboard blocked — the link stays visible to copy manually */
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.75, height: 36, px: 1.5, borderRadius: "9999px", border: `1px solid ${COLORS.border}`, backgroundColor: "#FFFFFF", color: "#27272A", fontFamily: "inherit", fontSize: "0.92rem", fontWeight: 500, cursor: "pointer", boxShadow: "0 2px 6px rgba(15,23,42,.06)", "&:hover": { borderColor: COLORS.redBorder, color: COLORS.red } }}
      >
        <Share2 size={16} /> Share
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs" slotProps={{ paper: { sx: { borderRadius: "16px", m: 2 } } }}>
        <Box sx={{ p: { xs: 2.25, sm: 2.75 } }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography component="h2" sx={{ fontFamily: "inherit", fontWeight: 700, fontSize: "1.2rem", color: "#27272A" }}>Share Blog</Typography>
            <IconButton aria-label="Close" onClick={() => setOpen(false)} size="small"><X size={20} /></IconButton>
          </Box>

          <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1, p: 0.75, pl: 1.5, borderRadius: "10px", border: `1px solid ${COLORS.border}`, backgroundColor: COLORS.surface }}>
            <Typography sx={{ flex: 1, minWidth: 0, fontFamily: "inherit", fontSize: "0.85rem", color: COLORS.body, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={link}>{link}</Typography>
            <Box component="button" type="button" onClick={copy} sx={{ flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 0.5, height: 34, px: 1.5, borderRadius: "8px", border: "none", backgroundColor: copied ? COLORS.success : COLORS.red, color: "#FFFFFF", fontFamily: "inherit", fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>
              {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
            </Box>
          </Box>

          <Typography sx={{ mt: 2.5, mb: 1.25, fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem", color: "#27272A" }}>Share via</Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))", gap: 1.5 }}>
            {apps.map((a) => (
              <Box key={a.label} component="a" href={a.href} target="_blank" rel="noopener noreferrer" sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, textDecoration: "none", color: COLORS.body, fontSize: "0.72rem", "&:hover .ic": { transform: "translateY(-2px)" } }}>
                <Box className="ic" sx={{ width: 46, height: 46, borderRadius: "50%", backgroundColor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 2px 6px rgba(15,23,42,.06)", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform .15s" }}>{a.icon}</Box>
                {a.label}
              </Box>
            ))}
            {canNativeShare && (
              <Box component="button" type="button" onClick={() => navigator.share({ title, url: link }).catch(() => null)} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0.5, border: "none", background: "none", p: 0, cursor: "pointer", fontFamily: "inherit", color: COLORS.body, fontSize: "0.72rem" }}>
                <Box sx={{ width: 46, height: 46, borderRadius: "50%", backgroundColor: COLORS.surface, border: `1px solid ${COLORS.border}`, color: COLORS.navy, display: "flex", alignItems: "center", justifyContent: "center" }}><MoreHorizontal size={22} /></Box>
                More
              </Box>
            )}
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
