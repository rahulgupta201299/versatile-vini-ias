"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";
import IconRenderer, { ICON_NAMES } from "@/components/IconRenderer";
import { adminRequest } from "@/lib/adminClient";
import { AdminFreeResource, FreeResourceInput } from "@/types";
import { Field, FieldGrid, inputSx, TextInput } from "../allExams/formKit";
import ColorField from "../celebration/ColorField";
import ItemManager from "../common/ItemManager";

const API_PATH = "homepage/free-resources";

/** The colours the tiles use today, offered as one-click choices. */
const RESOURCE_COLORS = ["#0284C7", "#2563EB", "#9333EA", "#0D9488", "#E11D48", "#D97706", "#4F46E5", "#16A34A", "#DB2777"];

const newResource = (): FreeResourceInput => ({ title: "", icon: "BookOpen", color: "#0284C7", link: "", isActive: true });

const toInput = ({ title, icon, color, link, isActive }: AdminFreeResource): FreeResourceInput => ({ title, icon, color, link, isActive });

const validate = ({ title, link, color }: FreeResourceInput) => {
  const problems: string[] = [];

  if (!title.trim()) problems.push("Add a title, e.g. “Current Affairs”.");
  if (!link.trim()) problems.push("Add the link the tile opens, e.g. /exams.");
  if (!/^#[\da-f]{6}$/i.test(color)) problems.push("Choose a colour like #0284C7.");

  return problems;
};

/** The round icon as it looks on the website (soft background made from the colour). */
function ResourceIcon({ icon, color, size = 44 }: { icon: string; color: string; size?: number }) {
  return (
    <Box sx={{ width: size, height: size, flexShrink: 0, borderRadius: "50%", bgcolor: `${color}1A`, border: `1px solid ${color}40`, color, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <IconRenderer name={icon} size={Math.round(size * 0.5)} color={color} />
    </Box>
  );
}

/** Homepage → "Browse Our Free Resources" tiles. */
export default function FreeResourceManager({ resources }: { resources: AdminFreeResource[] }) {
  const renderPreview = ({ title, icon, color, link }: AdminFreeResource) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
      <ResourceIcon icon={icon} color={color} />
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.92rem" }}>{title}</Typography>
        <Typography noWrap sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>{link}</Typography>
      </Box>
    </Box>
  );

  const renderForm = (input: FreeResourceInput, update: (changes: Partial<FreeResourceInput>) => void) => (
    <>
      <FieldGrid>
        <Field label="Title" required>
          <TextInput value={input.title} onChange={(title) => update({ title })} placeholder="Current Affairs" />
        </Field>
        <Field label="Link (on click)" required hint="Page or URL, e.g. /exams or https://play.google.com/…">
          <TextInput value={input.link} onChange={(link) => update({ link })} placeholder="/exams" />
        </Field>
      </FieldGrid>
      <Field label="Icon">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <ResourceIcon icon={input.icon} color={input.color} />
          <Box component="select" value={input.icon} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ icon: e.target.value })} sx={{ ...inputSx, maxWidth: 320 }}>
            {!ICON_NAMES.includes(input.icon) && <option value={input.icon}>{input.icon}</option>}
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </Box>
        </Box>
      </Field>
      <ColorField label="Colour" value={input.color} onChange={(color) => update({ color })} presets={RESOURCE_COLORS} hint="The icon colour — the soft circle behind it is made from it." />
    </>
  );

  return (
    <ItemManager
      items={resources}
      itemName="tile"
      itemsName="tiles"
      orderDescription="The homepage shows the tiles in this order."
      getName={({ title }) => title}
      newInput={newResource}
      toInput={toInput}
      validate={validate}
      renderPreview={renderPreview}
      renderForm={renderForm}
      onCreate={(input) => adminRequest(API_PATH, { method: "POST", body: input })}
      onUpdate={(id, input) => adminRequest(`${API_PATH}/${id}`, { method: "PUT", body: input })}
      onStatus={(id, isActive) => adminRequest(`${API_PATH}/${id}`, { method: "PATCH", body: { isActive } })}
      onReorder={(ids) => adminRequest(`${API_PATH}/order`, { method: "PUT", body: { ids } })}
      onDelete={(id) => adminRequest(`${API_PATH}/${id}`, { method: "DELETE" })}
      activeHint="Shown on the homepage in this order."
      inactiveHint="Hidden on the homepage. Switch one on to show it again."
    />
  );
}
