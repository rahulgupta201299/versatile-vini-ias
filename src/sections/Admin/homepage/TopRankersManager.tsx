"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ArrowUpDown, EyeOff, FolderPlus, Pencil } from "lucide-react";
import { COLORS } from "@/theme/colors";
import IconRenderer, { ICON_NAMES } from "@/components/IconRenderer";
import { adminRequest } from "@/lib/adminClient";
import { AdminRankerCategory, AdminRankerStat, AdminTopRankers, RankerStatInput } from "@/types";
import { Chip } from "../ui";
import CategoryNameForm from "../allExams/CategoryNameForm";
import { buttonSx, Field, FieldGrid, inputSx, StatusToggle, TextInput } from "../allExams/formKit";
import ItemManager from "../common/ItemManager";
import ReorderPanel from "../common/ReorderPanel";
import BannerManager from "./BannerManager";
import { RANKERS_SHAPE } from "./bannerShapes";

const API_PATH = "homepage/top-rankers";

const smallButtonSx = { ...buttonSx, height: 34, px: 1.5 };

const errorBoxSx = { px: 2, py: 1.5, borderRadius: "12px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 } as const;

const bannerCount = ({ banners }: AdminRankerCategory) => {
  const active = banners.filter(({ isActive }) => isActive).length;

  return `${active} of ${banners.length} banners`;
};

function PartHeading({ title, hint }: { title: string; hint: string }) {
  return (
    <Box sx={{ mb: 1.5 }}>
      <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1.15rem" }}>{title}</Typography>
      <Typography sx={{ color: COLORS.muted, fontSize: "0.84rem" }}>{hint}</Typography>
    </Box>
  );
}

/* ---------- headline boxes ---------- */

const newStat = (): RankerStatInput => ({ value: "", label: "", sublabel: "", icon: "Trophy", isActive: true });

const toStatInput = ({ value, label, sublabel, icon, isActive }: AdminRankerStat): RankerStatInput => ({ value, label, sublabel, icon, isActive });

const validateStat = ({ value, label }: RankerStatInput) => {
  const problems: string[] = [];

  if (!value.trim()) problems.push("Add the big value, e.g. “1000+” or “Rank 2”.");
  if (!label.trim()) problems.push("Add the label, e.g. “70th BPSC & PCS कुल चयन”.");

  return problems;
};

/** The box as it looks on the website, small. */
function StatPreview({ value, label, sublabel, icon }: AdminRankerStat) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, minWidth: 0 }}>
      <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: "12px", bgcolor: "#FFF7E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <IconRenderer name={icon} size={22} color={COLORS.red} />
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography sx={{ fontWeight: 900, color: COLORS.ink, fontSize: "1.15rem", lineHeight: 1.2 }}>{value}</Typography>
        <Typography sx={{ fontWeight: 700, color: "#9A3412", fontSize: "0.86rem" }}>{label}</Typography>
        {sublabel && <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>{sublabel}</Typography>}
      </Box>
    </Box>
  );
}

function renderStatForm(input: RankerStatInput, update: (changes: Partial<RankerStatInput>) => void) {
  return (
    <>
      <FieldGrid columns={3}>
        <Field label="Value" required hint="The big text">
          <TextInput value={input.value} onChange={(value) => update({ value })} placeholder="1000+" />
        </Field>
        <Field label="Label" required>
          <TextInput value={input.label} onChange={(label) => update({ label })} placeholder="70th BPSC & PCS कुल चयन" />
        </Field>
        <Field label="Small line" hint="Optional">
          <TextInput value={input.sublabel} onChange={(sublabel) => update({ sublabel })} placeholder="Highest In East India" />
        </Field>
      </FieldGrid>
      <Field label="Icon">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ width: 44, height: 44, flexShrink: 0, borderRadius: "12px", bgcolor: "#FFF7E8", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <IconRenderer name={input.icon} size={22} color={COLORS.red} />
          </Box>
          <Box component="select" value={input.icon} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => update({ icon: e.target.value })} sx={{ ...inputSx, maxWidth: 320 }}>
            {!ICON_NAMES.includes(input.icon) && <option value={input.icon}>{input.icon}</option>}
            {ICON_NAMES.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </Box>
        </Box>
      </Field>
    </>
  );
}

/* ---------- tab pill ---------- */

function TabPill({ category, isSelected, onSelect }: { category: AdminRankerCategory; isSelected: boolean; onSelect: () => void }) {
  return (
    <Box
      component="button"
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1,
        height: 40,
        px: 2,
        borderRadius: "999px",
        border: `1px solid ${isSelected ? COLORS.red : COLORS.border}`,
        bgcolor: isSelected ? COLORS.red : "#FFFFFF",
        color: isSelected ? "#FFFFFF" : COLORS.ink,
        fontFamily: "inherit",
        fontWeight: 700,
        fontSize: "0.88rem",
        cursor: "pointer",
        opacity: category.isActive ? 1 : 0.6,
        textDecoration: category.isActive ? "none" : "line-through",
      }}
    >
      {category.name}
      <Box component="span" sx={{ fontSize: "0.74rem", fontWeight: 600, opacity: 0.8 }}>{category.banners.length}</Box>
    </Box>
  );
}

/** Homepage → "Our Top Rankers": headline boxes, and result banners in tabs (UPSC / State PCS / Other Exams). */
export default function TopRankersManager({ data }: { data: AdminTopRankers }) {
  const { stats, categories } = data;
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(categories[0]?._id || "");
  const [isCreating, setIsCreating] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isReordering, setIsReordering] = useState(false);
  const [busy, setBusy] = useState(false);
  const [actionError, setActionError] = useState("");

  const selected = categories.find(({ _id }) => _id === selectedId) || categories[0];

  const select = (id: string) => {
    setSelectedId(id);
    setIsRenaming(false);
  };

  const createTab = async (name: string) => {
    const created = await adminRequest<AdminRankerCategory>(`${API_PATH}/categories`, { method: "POST", body: { name } });

    setIsCreating(false);
    setSelectedId(created._id);
    router.refresh();
  };

  const renameTab = async (name: string) => {
    await adminRequest(`${API_PATH}/categories/${selected._id}`, { method: "PATCH", body: { name } });
    setIsRenaming(false);
    router.refresh();
  };

  const setTabStatus = async (isActive: boolean) => {
    setBusy(true);
    setActionError("");

    try {
      await adminRequest(`${API_PATH}/categories/${selected._id}`, { method: "PATCH", body: { isActive } });
      router.refresh();
    } catch (error) {
      setActionError(error instanceof Error ? error.message : "Couldn't change the status.");
    } finally {
      setBusy(false);
    }
  };

  const saveTabOrder = async (ids: string[]) => {
    await adminRequest(`${API_PATH}/categories/order`, { method: "PUT", body: { ids } });
    setIsReordering(false);
    router.refresh();
  };

  const orderItems = categories.map((category) => ({ _id: category._id, name: category.name, isActive: category.isActive, detail: bannerCount(category) }));

  return (
    <Box sx={{ display: "grid", gap: 4 }}>
      {/* Headline boxes */}
      <Box component="section">
        <PartHeading title="Headline boxes" hint="The big numbers above the tabs, e.g. “1000+ · 70th BPSC & PCS कुल चयन”. Four fill one row on computers (two rows on phones)." />
        <ItemManager
          items={stats}
          itemName="box"
          itemsName="boxes"
          orderDescription="The boxes show left to right in this order."
          getName={({ value, label }) => `${value} — ${label}`}
          newInput={newStat}
          toInput={toStatInput}
          validate={validateStat}
          renderPreview={StatPreview}
          renderForm={renderStatForm}
          onCreate={(input) => adminRequest(`${API_PATH}/stats`, { method: "POST", body: input })}
          onUpdate={(id, input) => adminRequest(`${API_PATH}/stats/${id}`, { method: "PUT", body: input })}
          onStatus={(id, isActive) => adminRequest(`${API_PATH}/stats/${id}`, { method: "PATCH", body: { isActive } })}
          onReorder={(ids) => adminRequest(`${API_PATH}/stats/order`, { method: "PUT", body: { ids } })}
          activeHint="Shown on the website in this order."
          inactiveHint="Hidden on the website. Switch one on to show it again."
        />
      </Box>

      {/* Result banners in tabs */}
      <Box component="section" sx={{ display: "grid", gap: 2 }}>
        <PartHeading title="Result banners" hint="Tabs (UPSC, State PCS, Other Exams…) and the banner slider in each. Exam pages use the matching tab when they have no toppers of their own." />

        {actionError && <Box role="alert" sx={errorBoxSx}>{actionError}</Box>}

        {isReordering && <ReorderPanel items={orderItems} title="Reorder tabs" description="The tabs show left to right in this order." onSave={saveTabOrder} onCancel={() => setIsReordering(false)} />}

        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
          {categories.map((category) => (
            <TabPill key={category._id} category={category} isSelected={category._id === selected?._id} onSelect={() => select(category._id)} />
          ))}
          <Box sx={{ flex: 1 }} />
          <Box component="button" type="button" disabled={isCreating} onClick={() => setIsCreating(true)} sx={smallButtonSx}>
            <FolderPlus size={15} /> New tab
          </Box>
          <Box component="button" type="button" disabled={isReordering || categories.length < 2} onClick={() => setIsReordering(true)} sx={smallButtonSx}>
            <ArrowUpDown size={15} /> Reorder tabs
          </Box>
        </Box>

        {isCreating && (
          <Box sx={{ p: 1.5, borderRadius: "12px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.redBorder}` }}>
            <CategoryNameForm submitLabel="Create" placeholder="e.g. SSC" onSubmit={createTab} onCancel={() => setIsCreating(false)} />
          </Box>
        )}

        {selected && (
          <>
            <Box sx={{ p: { xs: 2, md: 2.5 }, borderRadius: "16px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, flexWrap: "wrap" }}>
              {isRenaming ? (
                <CategoryNameForm initialName={selected.name} submitLabel="Save" onSubmit={renameTab} onCancel={() => setIsRenaming(false)} />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, flexWrap: "wrap" }}>
                  <Typography component="h3" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1.1rem" }}>{selected.name} tab</Typography>
                  <Chip tone="neutral">{bannerCount(selected)}</Chip>
                  {!selected.isActive && (
                    <Typography sx={{ display: "flex", alignItems: "center", gap: 0.5, color: COLORS.muted, fontSize: "0.8rem" }}>
                      <EyeOff size={14} /> Hidden on the website, with all its banners
                    </Typography>
                  )}
                </Box>
              )}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <StatusToggle isActive={selected.isActive} disabled={busy} onChange={setTabStatus} label={`${selected.name} tab status`} />
                {!isRenaming && (
                  <Box component="button" type="button" onClick={() => setIsRenaming(true)} sx={smallButtonSx}>
                    <Pencil size={14} /> Rename
                  </Box>
                )}
              </Box>
            </Box>

            <BannerManager
              key={selected._id}
              banners={selected.banners}
              apiPath={`${API_PATH}/banners`}
              extraBody={{ category: selected._id }}
              requireWebImage={false}
              shape={RANKERS_SHAPE}
              itemName="banner"
              itemsName="banners"
              orderDescription={`The “${selected.name}” slider shows its banners in this order.`}
              activeHint="Shown in this tab's slider, in this order. Banners with only a web or only a phone image show only on that screen size."
            />
          </>
        )}
      </Box>
    </Box>
  );
}
