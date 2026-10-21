"use client";

import React from "react";
import Box from "@mui/material/Box";
import { ExamBanner } from "@/types";
import { Field, FieldGrid, ListEditor, TextInput } from "./formKit";
import ImageField from "./ImageField";
import { newBanner } from "./examForm";

/** Banners with separate web and mobile art — used for the hero banners and the top rankers. */
export default function BannerListEditor({ banners, onChange, itemName, webHint, mobileHint }: { banners: ExamBanner[]; onChange: (banners: ExamBanner[]) => void; itemName: string; webHint: string; mobileHint: string }) {
  return (
    <ListEditor
      items={banners}
      onChange={onChange}
      createItem={newBanner}
      addLabel={`Add ${itemName.toLowerCase()}`}
      emptyText={`No ${itemName.toLowerCase()}s yet.`}
      itemLabel={(banner, index) => `${itemName} ${index + 1}${banner.title ? ` — ${banner.title}` : ""}`}
      renderItem={(banner, update) => (
        <Box sx={{ display: "grid", gap: 2 }}>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" }, gap: 2, alignItems: "start" }}>
            <ImageField label="Web image" hint={webHint} aspectRatio="2.9 / 1" value={banner.webImageUrl} onChange={(webImageUrl) => update({ ...banner, webImageUrl })} />
            <ImageField label="Mobile image" hint={mobileHint} aspectRatio="3 / 4" value={banner.mobileImageUrl} onChange={(mobileImageUrl) => update({ ...banner, mobileImageUrl })} />
          </Box>
          <FieldGrid columns={3}>
            <Field label="Title">
              <TextInput value={banner.title} onChange={(title) => update({ ...banner, title })} placeholder="e.g. UPSC Foundation Batch 2027/28" />
            </Field>
            <Field label="Link (on click)" hint="Page or URL, e.g. /#courses">
              <TextInput value={banner.link} onChange={(link) => update({ ...banner, link })} placeholder="/#courses" />
            </Field>
            <Field label="Alt text" hint="Describes the image for search engines">
              <TextInput value={banner.alt} onChange={(alt) => update({ ...banner, alt })} />
            </Field>
          </FieldGrid>
        </Box>
      )}
    />
  );
}
