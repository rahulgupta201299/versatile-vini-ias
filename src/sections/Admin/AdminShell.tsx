"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import { ChevronRight, Menu, X } from "lucide-react";
import { COLORS } from "@/theme/colors";
import type { AdminUser } from "@/lib/adminAuth";
import AdminSignOut from "./AdminSignOut";
import { WORKSPACES, isActive, workspaceFromPath, type AdminWorkspace } from "./adminNav";

const SIDEBAR_W = 264;

const initials = (admin: AdminUser) =>
  (admin.name || admin.email)
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const current = workspaceFromPath(pathname);
  const ws = WORKSPACES[current];

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: "#FFFFFF" }}>
      {/* Brand */}
      <Box component={Link} href="/admin/web" onClick={onNavigate} sx={{ display: "flex", alignItems: "center", gap: 1.25, px: 2.5, height: 72, flexShrink: 0 }}>
        <Box sx={{ position: "relative", width: 92, height: 34 }}>
          <Image src="/images/logo.png" alt="VINI IAS" fill sizes="92px" style={{ objectFit: "contain", objectPosition: "left center" }} priority />
        </Box>
        <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: 999, bgcolor: COLORS.yellow, color: COLORS.ink, fontSize: "0.66rem", fontWeight: 800, letterSpacing: ".12em" }}>ADMIN</Box>
      </Box>

      {/* Workspace switcher */}
      <Box sx={{ px: 2, pt: 1 }}>
        <Typography sx={{ px: 0.5, mb: 1, color: COLORS.muted, fontSize: "0.68rem", fontWeight: 800, letterSpacing: ".14em" }}>WORKSPACE</Typography>
        <Box role="tablist" aria-label="Workspace" sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0.5, p: 0.5, borderRadius: "12px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
          {(Object.keys(WORKSPACES) as AdminWorkspace[]).map((key) => {
            const w = WORKSPACES[key];
            const Icon = w.icon;
            const active = key === current;
            return (
              <Box
                key={key}
                component={Link}
                href={w.home}
                onClick={onNavigate}
                role="tab"
                aria-selected={active}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 0.75,
                  height: 36,
                  borderRadius: "9px",
                  fontSize: "0.86rem",
                  fontWeight: 700,
                  color: active ? "#FFFFFF" : COLORS.textSecondary,
                  bgcolor: active ? COLORS.red : "transparent",
                  boxShadow: active ? "0 4px 12px rgba(254,0,52,.25)" : "none",
                  transition: "all .2s",
                  "&:hover": active ? {} : { color: COLORS.red },
                }}
              >
                <Icon size={16} /> {w.label}
              </Box>
            );
          })}
        </Box>
        <Typography sx={{ px: 0.5, mt: 0.75, color: COLORS.muted, fontSize: "0.75rem" }}>{ws.description}</Typography>
      </Box>

      {/* Menu */}
      <Box component="nav" aria-label={`${ws.label} menu`} sx={{ px: 1.5, pt: 2.5, flex: 1, overflowY: "auto" }}>
        <Typography sx={{ px: 1.5, mb: 1, color: COLORS.muted, fontSize: "0.68rem", fontWeight: 800, letterSpacing: ".14em" }}>{ws.label.toUpperCase()} MENU</Typography>
        {ws.nav.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item);
          return (
            <Box
              key={item.href}
              component={Link}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                height: 46,
                px: 1.5,
                mb: 0.5,
                borderRadius: "12px",
                fontSize: "0.93rem",
                fontWeight: active ? 700 : 600,
                color: active ? COLORS.red : COLORS.body,
                bgcolor: active ? COLORS.redTint : "transparent",
                transition: "all .15s",
                "&:hover": { bgcolor: active ? COLORS.redTint : COLORS.surface, color: active ? COLORS.red : COLORS.ink },
              }}
            >
              <Icon size={19} strokeWidth={active ? 2.3 : 2} /> {item.label}
            </Box>
          );
        })}
      </Box>

      {/* Footer card */}
      <Box sx={{ m: 2, p: 2, borderRadius: "14px", bgcolor: COLORS.navy, color: "#FFFFFF", position: "relative", overflow: "hidden" }}>
        <Box aria-hidden sx={{ position: "absolute", right: -18, top: -18, width: 70, height: 70, borderRadius: "50%", bgcolor: COLORS.yellow, opacity: 0.9 }} />
        <Typography sx={{ position: "relative", fontWeight: 800, fontSize: "0.9rem" }}>VINI IAS Control</Typography>
        <Typography sx={{ position: "relative", mt: 0.5, color: "rgba(255,255,255,.72)", fontSize: "0.78rem", lineHeight: 1.5 }}>Manage the website and app content from one place.</Typography>
      </Box>
    </Box>
  );
}

function Breadcrumb() {
  const pathname = usePathname();
  const ws = WORKSPACES[workspaceFromPath(pathname)];
  const page = [...ws.nav].sort((a, b) => b.href.length - a.href.length).find((i) => isActive(pathname, i));
  return (
    <Box sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center", gap: 1, fontSize: "0.88rem", minWidth: 0 }}>
      <Box component="span" sx={{ color: COLORS.muted }}>{ws.label}</Box>
      <ChevronRight size={15} color={COLORS.disabled} />
      <Box component="span" sx={{ color: COLORS.ink, fontWeight: 700 }}>{page?.label ?? "Dashboard"}</Box>
    </Box>
  );
}

/** Admin panel chrome: sidebar (workspace switcher + menu), top bar (breadcrumb, admin, sign out) and the page area. */
export default function AdminShell({ admin, children }: { admin: AdminUser; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ minHeight: "100dvh", bgcolor: COLORS.surface }}>
      {/* Desktop sidebar */}
      <Box component="aside" sx={{ display: { xs: "none", lg: "block" }, position: "fixed", inset: "0 auto 0 0", width: SIDEBAR_W, borderRight: `1px solid ${COLORS.border}`, zIndex: 20 }}>
        <Sidebar />
      </Box>

      {/* Mobile sidebar */}
      <Drawer open={open} onClose={() => setOpen(false)} sx={{ display: { lg: "none" } }} slotProps={{ paper: { sx: { width: SIDEBAR_W } } }}>
        <Box sx={{ position: "absolute", right: 10, top: 18, zIndex: 1 }}>
          <Box component="button" type="button" aria-label="Close menu" onClick={() => setOpen(false)} sx={{ width: 36, height: 36, border: "none", borderRadius: "10px", bgcolor: COLORS.surface, color: COLORS.body, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <X size={18} />
          </Box>
        </Box>
        <Sidebar onNavigate={() => setOpen(false)} />
      </Drawer>

      <Box sx={{ pl: { lg: `${SIDEBAR_W}px` } }}>
        {/* Top bar */}
        <Box component="header" sx={{ position: "sticky", top: 0, zIndex: 10, height: 68, px: { xs: 2, md: 4 }, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2, bgcolor: "rgba(255,255,255,.92)", backdropFilter: "blur(10px)", borderBottom: `1px solid ${COLORS.border}` }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
            <Box component="button" type="button" aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { xs: "flex", lg: "none" }, width: 40, height: 40, border: `1px solid ${COLORS.border}`, borderRadius: "10px", bgcolor: "#FFFFFF", color: COLORS.ink, alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
              <Menu size={20} />
            </Box>
            <Breadcrumb />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, sm: 1.5 }, minWidth: 0 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 0 }}>
              <Box sx={{ width: 38, height: 38, flexShrink: 0, borderRadius: "50%", bgcolor: COLORS.yellow, color: COLORS.ink, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.82rem" }}>{initials(admin)}</Box>
              <Box sx={{ display: { xs: "none", md: "block" }, minWidth: 0 }}>
                <Typography noWrap sx={{ fontWeight: 700, color: COLORS.ink, fontSize: "0.88rem", lineHeight: 1.25 }}>{admin.name || "Admin"}</Typography>
                <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.76rem", maxWidth: 220 }}>{admin.email}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "none", sm: "block" } }}><AdminSignOut variant="light" /></Box>
            <Box sx={{ display: { xs: "block", sm: "none" } }}><AdminSignOut variant="light" compact /></Box>
          </Box>
        </Box>

        <Box component="div" sx={{ px: { xs: 2, md: 4 }, py: { xs: 3, md: 4 }, maxWidth: 1360, mx: "auto" }}>{children}</Box>
      </Box>
    </Box>
  );
}
