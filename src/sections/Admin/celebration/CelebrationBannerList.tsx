"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CalendarClock, Pencil, Plus } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import { AdminCelebrationBanner } from "@/types";
import { Chip, PageHeader } from "../ui";
import { buttonSx, primaryButtonSx, StatusToggle } from "../allExams/formKit";
import { API_PATH, BASE_PATH, formatDateTime, getBannerStatus } from "./celebrationForm";
import { useSectionAccess } from "../AdminAccessContext";
import DeleteButton from "../common/DeleteButton";

/** Web → Homepage → Celebration banner: every festival banner, active and inactive shown separately. */
export default function CelebrationBannerList({ banners }: { banners: AdminCelebrationBanner[] }) {
  const router = useRouter();
  const { canEdit, canDelete } = useSectionAccess("homepage");
  const [busyId, setBusyId] = useState("");
  const [actionError, setActionError] = useState("");

  const activeBanners = banners.filter(({ isActive }) => isActive);
  const inactiveBanners = banners.filter(({ isActive }) => !isActive);

  const setStatus = async (id: string, isActive: boolean) => {
    setBusyId(id);
    setActionError("");

    try {
      await adminRequest(`${API_PATH}/${id}`, { method: "PATCH", body: { isActive } });
      router.refresh();
    } catch (statusError) {
      setActionError(statusError instanceof Error ? statusError.message : "Couldn't change the status.");
    } finally {
      setBusyId("");
    }
  };

  const renderBanner = (banner: AdminCelebrationBanner) => {
    const { _id, title, theme, offers, startsAt, endsAt, isActive } = banner;
    const { label, tone, hint } = getBannerStatus(banner);

    return (
      <Box key={_id} sx={{ px: { xs: 2, md: 2.5 }, py: 1.75, display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", borderTop: `1px solid ${COLORS.borderLight}` }}>
        <Box aria-hidden sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: "12px", background: `linear-gradient(135deg, ${theme.background}, #FFFFFF)`, border: `1px solid ${theme.accentColor}55`, display: "flex", alignItems: "center", justifyContent: "center", color: theme.accentColor, fontSize: "1.2rem", filter: isActive ? "none" : "grayscale(1)" }}>✦</Box>
        <Box sx={{ flex: 1, minWidth: 220 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography component={Link} href={`${BASE_PATH}/${_id}`} sx={{ fontWeight: 800, color: theme.titleColor, fontSize: "0.98rem" }}>{title}</Typography>
            <Chip tone={tone}>{label}</Chip>
          </Box>
          <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap" }}>
            <CalendarClock size={13} /> {formatDateTime(startsAt)} → {formatDateTime(endsAt)} · {hint}
          </Typography>
          <Box sx={{ mt: 0.75, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
            {offers.map(({ title: offerTitle, priceLabel, price, color }, index) => (
              <Box key={index} component="span" sx={{ px: 1, py: 0.25, borderRadius: "999px", bgcolor: color, color: "#FFFFFF", fontSize: "0.72rem", fontWeight: 700 }}>
                {offerTitle} · {priceLabel} ₹{price.toLocaleString("en-IN")}
              </Box>
            ))}
          </Box>
        </Box>
        <StatusToggle isActive={isActive} disabled={!canEdit || busyId === _id} onChange={(next) => setStatus(_id, next)} label={`${title} status`} />
        {canDelete && <DeleteButton name={title} onDelete={() => adminRequest(`${API_PATH}/${_id}`, { method: "DELETE" })} onDeleted={() => router.refresh()} />}
        <Box component={Link} href={`${BASE_PATH}/${_id}`} sx={{ ...buttonSx, height: 34, px: 1.5 }}>
          <Pencil size={14} /> {canEdit ? "Edit" : "Open"}
        </Box>
      </Box>
    );
  };

  const renderGroup = (title: string, hint: string, items: AdminCelebrationBanner[]) => (
    <Box component="section" sx={{ borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
      <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.5, bgcolor: COLORS.surface }}>
        <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1rem" }}>
          {title} <Box component="span" sx={{ color: COLORS.muted, fontWeight: 600 }}>({items.length})</Box>
        </Typography>
        <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>{hint}</Typography>
      </Box>
      {items.map(renderBanner)}
      {!items.length && <Typography sx={{ px: { xs: 2, md: 2.5 }, py: 2, color: COLORS.muted, fontSize: "0.86rem", borderTop: `1px solid ${COLORS.borderLight}` }}>None.</Typography>}
    </Box>
  );

  return (
    <>
      <PageHeader
        eyebrow="Web / Homepage / Celebration banner"
        title="Celebration banner"
        subtitle="Festival sale banners shown under the hero slider. Each one goes live on its start date and switches off by itself after its end date."
        actions={
          canEdit && (
            <Box component={Link} href={`${BASE_PATH}/new`} sx={primaryButtonSx}>
              <Plus size={16} /> New banner
            </Box>
          )
        }
      />

      {actionError && <Box role="alert" sx={{ mb: 2.5, px: 2, py: 1.5, borderRadius: "12px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 }}>{actionError}</Box>}

      <Box sx={{ display: "grid", gap: 2.5 }}>
        {renderGroup("Active banners", "Live now or scheduled. If two overlap, the one that started last is shown.", activeBanners)}
        {renderGroup("Inactive banners", "Switched off or past their end date — hidden on the website.", inactiveBanners)}
      </Box>
    </>
  );
}
