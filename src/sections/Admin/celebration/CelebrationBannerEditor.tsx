"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { ArrowLeft, Check, ExternalLink, Save } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import { AdminCelebrationBanner, CelebrationBannerInput, CelebrationOffer } from "@/types";
import CelebrationBanner from "@/sections/Celebration/CelebrationBanner";
import { Chip, PageHeader } from "../ui";
import ImageField from "../allExams/ImageField";
import { buttonSx, Field, FieldGrid, inputSx, NumberInput, primaryButtonSx, SectionCard, StatusToggle, TextInput } from "../allExams/formKit";
import ColorField from "./ColorField";
// [S3 SNAPSHOT] import { captureBannerSnapshot } from "@/lib/bannerSnapshot";
// [S3 SNAPSHOT] import { slugify } from "@/utils/slug";
import { API_PATH, BASE_PATH, cleanInput, countdownText, fromLocalInput, getBannerStatus, newBanner, toInput, toLocalInput, validateBanner } from "./celebrationForm";

function DateTimeInput({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  return <Box component="input" type="datetime-local" value={toLocalInput(value)} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(fromLocalInput(e.target.value))} sx={inputSx} />;
}

/** Create or edit a celebration banner, with a live phone preview of how it looks on the homepage. */
export default function CelebrationBannerEditor({ banner }: { banner?: AdminCelebrationBanner }) {
  const router = useRouter();
  const isNew = !banner;
  const [form, setForm] = useState<CelebrationBannerInput>(() => (banner ? toInput(banner) : newBanner()));
  const [savedSnapshot, setSavedSnapshot] = useState(() => (banner ? JSON.stringify(toInput(banner)) : ""));
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");
  // The live preview — also what becomes the final banner image (S3 snapshot)
  const previewRef = useRef<HTMLDivElement>(null);

  const isDirty = JSON.stringify(form) !== savedSnapshot;
  const bannerStatus = getBannerStatus(form);
  const isLive = !isNew && !isDirty && bannerStatus.label === "Live now";

  // Warn before leaving with unsaved changes
  useEffect(() => {
    if (!isDirty) return;

    const warn = (event: BeforeUnloadEvent) => event.preventDefault();

    window.addEventListener("beforeunload", warn);

    return () => window.removeEventListener("beforeunload", warn);
  }, [isDirty]);

  const update = (changes: Partial<CelebrationBannerInput>) => {
    setForm((current) => ({ ...current, ...changes }));
    setProblems([]);
  };

  const updateTheme = (changes: Partial<CelebrationBannerInput["theme"]>) => update({ theme: { ...form.theme, ...changes } });

  const updateOffer = (index: number, changes: Partial<CelebrationOffer>) => update({ offers: form.offers.map((offer, i) => (i === index ? { ...offer, ...changes } : offer)) });

  const save = async () => {
    const found = validateBanner(form);

    setProblems(found);

    if (found.length) return;

    setStatus("saving");

    try {
      const input = cleanInput(form);

      // [S3 SNAPSHOT] Turn the finished banner into one final image, upload it to S3 and save its URL with the banner
      // if (previewRef.current) input.snapshotUrl = await captureBannerSnapshot(previewRef.current, `${slugify(input.title) || "banner"}.png`);

      const saved = isNew
        ? await adminRequest<AdminCelebrationBanner>(API_PATH, { method: "POST", body: input })
        : await adminRequest<AdminCelebrationBanner>(`${API_PATH}/${banner._id}`, { method: "PUT", body: input });
      const savedInput = toInput(saved);

      setForm(savedInput);
      setSavedSnapshot(JSON.stringify(savedInput));
      setStatus("saved");

      if (isNew) router.replace(`${BASE_PATH}/${saved._id}`);
      else router.refresh();
    } catch (error) {
      setProblems([error instanceof Error ? error.message : "Save failed."]);
      setStatus("idle");
    }
  };

  const savedMessage = bannerStatus.label === "Live now" ? " — live on the homepage" : ` (${bannerStatus.label.toLowerCase()})`;

  return (
    <Box sx={{ pb: 12 }}>
      <PageHeader
        eyebrow="Web / Homepage / Celebration banner"
        title={isNew ? "New celebration banner" : form.title || "Edit celebration banner"}
        subtitle="A festival sale banner shown on the homepage under the hero slider, between its start and end dates."
        actions={
          <>
            <Box component={Link} href={BASE_PATH} sx={buttonSx}>
              <ArrowLeft size={16} /> All banners
            </Box>
            {isLive && (
              <Box component="a" href="/#celebration" target="_blank" rel="noopener" sx={buttonSx}>
                View on homepage <ExternalLink size={15} />
              </Box>
            )}
          </>
        }
      />

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) 400px" }, gap: 3, alignItems: "start" }}>
        <Box sx={{ display: "grid", gap: 2.5, minWidth: 0 }}>
          <SectionCard id="timeline" step={1} title="Timeline & status" description="The banner shows on the website only between these dates. After the end date it switches to inactive by itself.">
            <FieldGrid>
              <Field label="Starts" required>
                <DateTimeInput value={form.startsAt} onChange={(startsAt) => update({ startsAt })} />
              </Field>
              <Field label="Ends" required hint="Shown as a countdown, e.g. “Sale ends in 3 days”.">
                <DateTimeInput value={form.endsAt} onChange={(endsAt) => update({ endsAt })} />
              </Field>
            </FieldGrid>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
              <StatusToggle isActive={form.isActive} onChange={(isActive) => update({ isActive })} label="Banner status" />
              <Chip tone={bannerStatus.tone}>{bannerStatus.label}</Chip>
              <Typography sx={{ color: COLORS.muted, fontSize: "0.82rem" }}>{bannerStatus.hint}</Typography>
            </Box>
          </SectionCard>

          <SectionCard id="text" step={2} title="Heading" description="The big festive greeting and the line under it.">
            <FieldGrid>
              <Field label="Title" required>
                <TextInput value={form.title} onChange={(title) => update({ title })} placeholder="Happy Diwali" />
              </Field>
              <Field label="Line under the title" hint="Leave empty to count down to the end date automatically.">
                <TextInput value={form.subtitle} onChange={(subtitle) => update({ subtitle })} placeholder="Sale ends in 3 days (automatic)" />
              </Field>
            </FieldGrid>
          </SectionCard>

          <SectionCard id="artwork" step={3} title="Artwork" description="The festive illustration in the middle. Without an upload, the built-in lit diyas are shown.">
            <ImageField label="Illustration" value={form.imageUrl} onChange={(imageUrl) => update({ imageUrl })} aspectRatio="40 / 17" maxHeight={220} hint="Transparent PNG or WebP works best · wide, around 1200 × 500" />
          </SectionCard>

          <SectionCard id="colours" step={4} title="Colours" description="Match the festival — the preview updates as you pick.">
            <ColorField label="Title colour" value={form.theme.titleColor} onChange={(titleColor) => updateTheme({ titleColor })} />
            <ColorField label="Accent colour" value={form.theme.accentColor} onChange={(accentColor) => updateTheme({ accentColor })} hint="Used for ✦ stars, the countdown line and the card badges." />
            <ColorField label="Background" value={form.theme.background} onChange={(background) => updateTheme({ background })} presets={["#FFF8EF", "#FFF4E0", "#FFF0F3", "#FFFBEA", "#F1F8F4", "#EEF3FB", "#F6F0FB"]} hint="A light tint — it fades to white at the bottom." />
          </SectionCard>

          <SectionCard id="offers" step={5} title="Offer cards" description="The three cards at the bottom: text, price and the colour of the price strip.">
            {form.offers.map((offer, index) => (
              <Box key={index} sx={{ p: 2, borderRadius: "14px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, display: "grid", gap: 2 }}>
                <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.88rem" }}>Card {index + 1}</Typography>
                <Field label="Text" required>
                  <TextInput value={offer.title} onChange={(title) => updateOffer(index, { title })} placeholder="All Online Batches Offers" />
                </Field>
                <FieldGrid columns={3}>
                  <Field label="Before the price">
                    <TextInput value={offer.priceLabel} onChange={(priceLabel) => updateOffer(index, { priceLabel })} placeholder="Starting @" />
                  </Field>
                  <Field label="Price (₹)" required>
                    <NumberInput value={offer.price} onChange={(price) => updateOffer(index, { price })} placeholder="999" />
                  </Field>
                  <Field label="Link (on click)" hint="Page or URL, e.g. /courses">
                    <TextInput value={offer.link} onChange={(link) => updateOffer(index, { link })} placeholder="/courses" />
                  </Field>
                </FieldGrid>
                <ColorField label="Price strip colour" value={offer.color} onChange={(color) => updateOffer(index, { color })} />
              </Box>
            ))}
          </SectionCard>
        </Box>

        {/* Live preview */}
        <Box sx={{ position: { lg: "sticky" }, top: { lg: 88 }, order: { xs: -1, lg: 0 } }}>
          <Typography sx={{ mb: 1, color: COLORS.muted, fontSize: "0.72rem", fontWeight: 800, letterSpacing: ".08em" }}>PREVIEW · PHONE</Typography>
          <Box ref={previewRef} sx={{ p: 1.5, borderRadius: "28px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, boxShadow: "0 12px 32px rgba(15, 23, 42, .08)", maxWidth: 400, mx: "auto" }}>
            <CelebrationBanner isPreview banner={{ ...form, title: form.title || "Happy Diwali", alt: form.title, tagline: form.subtitle || countdownText(form.endsAt), offers: form.offers.map((offer, index) => ({ ...offer, title: offer.title || `Offer ${index + 1}` })) }} />
          </Box>
          <Typography sx={{ mt: 1, color: COLORS.muted, fontSize: "0.78rem", textAlign: "center" }}>On computers the same banner is wider, with bigger cards.</Typography>
        </Box>
      </Box>

      {/* Save bar */}
      <Box sx={{ position: "fixed", left: { xs: 0, lg: 264 }, right: 0, bottom: 0, zIndex: 20, borderTop: `1px solid ${COLORS.border}`, bgcolor: "rgba(255,255,255,.96)", backdropFilter: "blur(8px)" }}>
        {!!problems.length && (
          <Box role="alert" sx={{ maxWidth: 1360, mx: "auto", px: { xs: 2, md: 4 }, pt: 1.5 }}>
            <Box sx={{ p: 1.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600, maxHeight: 120, overflowY: "auto" }}>
              {problems.map((problem) => (
                <div key={problem}>• {problem}</div>
              ))}
            </Box>
          </Box>
        )}
        <Box sx={{ maxWidth: 1360, mx: "auto", px: { xs: 2, md: 4 }, py: 1.5, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5 }}>
          <Typography sx={{ color: isDirty ? COLORS.redDark : COLORS.success, fontSize: "0.85rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>
            {isDirty ? "Unsaved changes" : status === "saved" ? (<><Check size={16} /> Saved{savedMessage}</>) : "No changes"}
          </Typography>
          <Box component="button" type="button" disabled={status === "saving" || (!isDirty && !isNew)} onClick={save} sx={primaryButtonSx}>
            {status === "saving" ? <CircularProgress size={18} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />}
            {isNew ? "Create banner" : "Save changes"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
