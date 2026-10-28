"use client";

import Image from "next/image";
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Smartphone } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import { AdminHomepageBanner, HomepageBannerInput } from "@/types";
import ImageField from "../allExams/ImageField";
import { Field, FieldGrid, TextInput } from "../allExams/formKit";
import ItemManager from "../common/ItemManager";

export type BannerShape = {
  /** Web artwork shape, e.g. "2.9 / 1" */
  webAspect: string;
  webHint: string;
  /** Phone artwork shape, e.g. "16 / 9" */
  mobileAspect: string;
  mobileHint: string;
};

type BannerManagerProps = {
  banners: AdminHomepageBanner[];
  /** e.g. "homepage/hero-banners" */
  apiPath: string;
  /** Sent with every add / save / reorder, e.g. { placement: "first" } or { category: "<tab id>" }. */
  extraBody?: Record<string, string>;
  /** Off for banners that may have only phone art (Top rankers). */
  requireWebImage?: boolean;
  shape: BannerShape;
  /** e.g. "slide" */
  itemName: string;
  itemsName: string;
  orderDescription: string;
  /** Hint under "Active …" (defaults to how sliders use phone art). */
  activeHint?: string;
};

/** "Web + phone images", "Phone image only", … */
const imageSizesText = (webImageUrl: string, mobileImageUrl: string) => {
  if (!webImageUrl) return "Phone image only";

  if (!mobileImageUrl) return "No phone image";

  return "Web + phone images";
};

const newBanner = (): HomepageBannerInput => ({ title: "", webImageUrl: "", mobileImageUrl: "", link: "", isActive: true });

const toInput = ({ title, webImageUrl, mobileImageUrl, link, isActive }: AdminHomepageBanner): HomepageBannerInput => ({ title, webImageUrl, mobileImageUrl, link, isActive });

const validateBanner = ({ title, webImageUrl, mobileImageUrl }: HomepageBannerInput, requireWebImage: boolean) => {
  const problems: string[] = [];

  if (!title.trim()) problems.push("Add a title (it also describes the image for search engines).");

  if (requireWebImage && !webImageUrl) problems.push("Upload the web image.");

  if (!requireWebImage && !webImageUrl && !mobileImageUrl) problems.push("Upload a web image, a phone image, or both.");

  return problems;
};

/** Hero slides and marketing banners: image(s), title and link, switched on / off and reordered. */
export default function BannerManager({ banners, apiPath, extraBody = {}, requireWebImage = true, shape, itemName, itemsName, orderDescription, activeHint = "Shown on the website in this order. Phones use the phone images when every active one has one." }: BannerManagerProps) {
  const { webAspect, webHint, mobileAspect, mobileHint } = shape;

  const renderPreview = ({ title, webImageUrl, mobileImageUrl, link }: AdminHomepageBanner) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.75, minWidth: 0 }}>
      <Box sx={{ position: "relative", width: { xs: 120, sm: 180 }, aspectRatio: webAspect, flexShrink: 0, borderRadius: "10px", overflow: "hidden", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
        {(webImageUrl || mobileImageUrl) && <Image src={webImageUrl || mobileImageUrl} alt="" fill sizes="180px" style={{ objectFit: webImageUrl ? "cover" : "contain" }} />}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.92rem", lineHeight: 1.35 }}>{title}</Typography>
        <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>{link || "No link"}</Typography>
        <Typography sx={{ mt: 0.5, display: "flex", alignItems: "center", gap: 0.5, color: mobileImageUrl ? COLORS.success : COLORS.muted, fontSize: "0.74rem", fontWeight: 700 }}>
          <Smartphone size={13} /> {imageSizesText(webImageUrl, mobileImageUrl)}
        </Typography>
      </Box>
    </Box>
  );

  const renderForm = (input: HomepageBannerInput, update: (changes: Partial<HomepageBannerInput>) => void) => (
    <>
      <FieldGrid>
        <Field label="Title" required hint="Not shown on the banner — describes the image for search engines and screen readers.">
          <TextInput value={input.title} onChange={(title) => update({ title })} placeholder="UPSC Foundation Batch 2027/28" />
        </Field>
        <Field label="Link (on click)" hint="Page or URL, e.g. /#courses">
          <TextInput value={input.link} onChange={(link) => update({ link })} placeholder="/#courses" />
        </Field>
      </FieldGrid>
      <FieldGrid>
        <ImageField label={requireWebImage ? "Web image" : "Web image (optional if there's a phone image)"} hint={webHint} aspectRatio={webAspect} maxHeight={260} value={input.webImageUrl} onChange={(webImageUrl) => update({ webImageUrl })} />
        <ImageField label="Phone image (optional)" hint={mobileHint} aspectRatio={mobileAspect} maxHeight={260} value={input.mobileImageUrl} onChange={(mobileImageUrl) => update({ mobileImageUrl })} />
      </FieldGrid>
    </>
  );

  const create = (input: HomepageBannerInput) => adminRequest(apiPath, { method: "POST", body: { ...input, ...extraBody } });
  const update = (id: string, input: HomepageBannerInput) => adminRequest(`${apiPath}/${id}`, { method: "PUT", body: { ...input, ...extraBody } });
  const setStatus = (id: string, isActive: boolean) => adminRequest(`${apiPath}/${id}`, { method: "PATCH", body: { isActive } });
  const reorder = (ids: string[]) => adminRequest(`${apiPath}/order`, { method: "PUT", body: { ids, ...extraBody } });

  return (
    <ItemManager
      items={banners}
      itemName={itemName}
      itemsName={itemsName}
      orderDescription={orderDescription}
      getName={({ title }) => title}
      newInput={newBanner}
      toInput={toInput}
      validate={(input) => validateBanner(input, requireWebImage)}
      renderPreview={renderPreview}
      renderForm={renderForm}
      onCreate={create}
      onUpdate={update}
      onStatus={setStatus}
      onReorder={reorder}
      onDelete={(id) => adminRequest(`${apiPath}/${id}`, { method: "DELETE" })}
      activeHint={activeHint}
      inactiveHint="Hidden on the website. Switch one on to show it again."
    />
  );
}
