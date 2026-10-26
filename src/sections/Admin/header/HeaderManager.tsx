"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Collapse from "@mui/material/Collapse";
import { Check, ChevronDown, ChevronsDownUp, ChevronsUpDown, Save } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import IconRenderer, { ICON_NAMES } from "@/components/IconRenderer";
import { AdminHeaderSection, HeaderLinkData, HeaderMenuData, HeaderMobileItemData, HeaderMobileSectionData, HeaderSectionKey } from "@/types";
import { buttonSx, Field, FieldGrid, inputSx, ListEditor, primaryButtonSx, TextInput } from "../allExams/formKit";
import { useSectionAccess } from "../AdminAccessContext";
import ViewOnlyNotice from "../common/ViewOnlyNotice";

const API_PATH = "header";
const LINK_HINT = "Page or URL, e.g. /courses/csat or https://…";

type Status = "idle" | "saving" | "saved";

/* ---------- blanks ---------- */

const newLink = (): HeaderLinkData => ({ label: "", link: "" });
const newMenu = (): HeaderMenuData => ({ label: "", link: "", badge: "", items: [] });
const newTile = (): HeaderMobileItemData => ({ label: "", link: "", icon: "FileText" });
const newMobileSection = (): HeaderMobileSectionData => ({ title: "", items: [newTile()] });

/* ---------- checks ---------- */

const linkProblems = (links: HeaderLinkData[], where: string) =>
  links.flatMap(({ label, link }, index) => {
    if (label.trim() && link.trim()) return [];

    return [`${where}, item ${index + 1}: text and link are both required.`];
  });

const menuProblems = (menus: HeaderMenuData[]) =>
  menus.flatMap(({ label, link, items }, index) => {
    const where = `Menu ${index + 1}${label ? ` (${label})` : ""}`;
    const own = label.trim() && link.trim() ? [] : [`${where}: text and link are both required.`];

    return [...own, ...linkProblems(items, where)];
  });

const mobileProblems = (sections: HeaderMobileSectionData[]) =>
  sections.flatMap(({ title, items }, index) => {
    const where = `Section ${index + 1}${title ? ` (${title})` : ""}`;
    const own = title.trim() ? [] : [`${where}: add its title.`];

    return [...own, ...linkProblems(items, where)];
  });

const settingsProblems = ({ storeLink }: { storeLink: string }) => (storeLink.trim() ? [] : ["Add the Store link."]);

/* ---------- shared card ---------- */

/** The line next to the Save button. */
const saveMessage = (isDirty: boolean, status: Status) => {
  if (isDirty) return "Unsaved changes";

  if (status === "saved") return (<><Check size={15} /> Saved — live in the header</>);

  return "";
};

/** Saves one header part: keeps its input, the saved copy (to know about unsaved changes), problems and status. */
function usePart<T>(key: HeaderSectionKey, initial: T, { validate, toBody, fromSaved }: { validate: (input: T) => string[]; toBody: (input: T) => unknown; fromSaved: (saved: AdminHeaderSection) => T }) {
  const router = useRouter();
  const [input, setInput] = useState<T>(initial);
  const [snapshot, setSnapshot] = useState(() => JSON.stringify(initial));
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const update = (next: T) => {
    setInput(next);
    setProblems([]);
  };

  const save = async () => {
    const found = validate(input);

    setProblems(found);

    if (found.length) return;

    setStatus("saving");

    try {
      const saved = fromSaved(await adminRequest<AdminHeaderSection>(`${API_PATH}/${key}`, { method: "PUT", body: toBody(input) }));

      setInput(saved);
      setSnapshot(JSON.stringify(saved));
      setStatus("saved");
      router.refresh();
    } catch (error) {
      setProblems([error instanceof Error ? error.message : "Save failed."]);
      setStatus("idle");
    }
  };

  return { input, update, save, problems, status, isDirty: JSON.stringify(input) !== snapshot };
}

type PartCardProps = {
  id: string;
  step: number;
  title: string;
  description: string;
  summary: string;
  isOpen: boolean;
  onToggle: () => void;
  part: { save: () => void; problems: string[]; status: Status; isDirty: boolean };
  canEdit: boolean;
  children: React.ReactNode;
};

/** One header part as an accordion: header (title, summary, unsaved badge) opens it; inside are its fields and Save. */
function PartCard({ id, step, title, description, summary, isOpen, onToggle, part, canEdit, children }: PartCardProps) {
  const { save, problems, status, isDirty } = part;

  return (
    <Box component="section" id={id} sx={{ scrollMarginTop: 90, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${isOpen ? COLORS.redBorder : COLORS.border}`, overflow: "hidden" }}>
      <Box component="button" type="button" onClick={onToggle} aria-expanded={isOpen} aria-controls={`${id}-panel`} sx={{ width: "100%", display: "flex", alignItems: "center", gap: 1.5, p: { xs: 2, md: 2.5 }, border: 0, bgcolor: "transparent", textAlign: "left", cursor: "pointer", fontFamily: "inherit", "&:hover": { bgcolor: "#FAFBFC" } }}>
        <Box sx={{ width: 30, height: 30, flexShrink: 0, borderRadius: "9px", bgcolor: COLORS.redTint, color: COLORS.red, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>{step}</Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
            <Typography component="h2" sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1.05rem" }}>{title}</Typography>
            <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: "999px", bgcolor: "#F1F3F7", color: COLORS.muted, fontSize: "0.74rem", fontWeight: 700 }}>{summary}</Box>
            {isDirty && <Box component="span" sx={{ px: 1, py: 0.25, borderRadius: "999px", bgcolor: COLORS.redTint, color: COLORS.redDark, fontSize: "0.74rem", fontWeight: 700 }}>Unsaved changes</Box>}
          </Box>
          <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.83rem" }}>{description}</Typography>
        </Box>
        <Box sx={{ flexShrink: 0, color: COLORS.muted, display: "flex", transition: "transform 0.2s", transform: isOpen ? "rotate(180deg)" : "none" }}>
          <ChevronDown size={20} />
        </Box>
      </Box>

      <Collapse in={isOpen} id={`${id}-panel`}>
        <Box sx={{ display: "grid", gap: 2, px: { xs: 2.25, md: 3 }, pb: { xs: 2.25, md: 3 }, pt: { xs: 2, md: 2.5 }, borderTop: `1px solid ${COLORS.border}` }}>
          {children}

          {!!problems.length && (
            <Box role="alert" sx={{ p: 1.5, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600 }}>
              {problems.map((problem) => (
                <div key={problem}>• {problem}</div>
              ))}
            </Box>
          )}

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
            <Box component="button" type="button" disabled={!canEdit || status === "saving" || !isDirty} onClick={save} sx={primaryButtonSx}>
              {status === "saving" ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />} Save {title.toLowerCase()}
            </Box>
            <Typography sx={{ color: isDirty ? COLORS.redDark : COLORS.success, fontSize: "0.84rem", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.5 }}>{saveMessage(isDirty, status)}</Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}

/** Text + link pair. */
function LinkFields({ value, onChange, textPlaceholder = "NCERT Foundation Batch" }: { value: HeaderLinkData; onChange: (value: HeaderLinkData) => void; textPlaceholder?: string }) {
  return (
    <FieldGrid>
      <Field label="Text" required>
        <TextInput value={value.label} onChange={(label) => onChange({ ...value, label })} placeholder={textPlaceholder} />
      </Field>
      <Field label="Link" required hint={LINK_HINT}>
        <TextInput value={value.link} onChange={(link) => onChange({ ...value, link })} placeholder="/courses/gs-foundation" />
      </Field>
    </FieldGrid>
  );
}

/* ---------- manager ---------- */

const PART_IDS: HeaderSectionKey[] = ["menus", "mobileMenu", "settings"];

/** Web → Header: the desktop menu (after All Exams), the mobile menu, and the Store link + trending searches. */
export default function HeaderManager({ sections }: { sections: AdminHeaderSection[] }) {
  const { canEdit } = useSectionAccess("header");
  const saved = (key: HeaderSectionKey) => sections.find((section) => section.key === key);
  const [openKeys, setOpenKeys] = useState<HeaderSectionKey[]>([]);
  const allOpen = openKeys.length === PART_IDS.length;

  const menus = usePart("menus", saved("menus")?.menus || [], {
    validate: menuProblems,
    toBody: (input) => ({ menus: input }),
    fromSaved: (section) => section.menus || [],
  });

  const mobile = usePart("mobileMenu", saved("mobileMenu")?.mobileSections || [], {
    validate: mobileProblems,
    toBody: (input) => ({ mobileSections: input }),
    fromSaved: (section) => section.mobileSections || [],
  });

  const settings = usePart("settings", { storeLink: saved("settings")?.storeLink || "", searchTrending: saved("settings")?.searchTrending || [] }, {
    validate: settingsProblems,
    toBody: (input) => input,
    fromSaved: (section) => ({ storeLink: section.storeLink || "", searchTrending: section.searchTrending || [] }),
  });

  const toggle = (key: HeaderSectionKey) =>
    setOpenKeys((current) => {
      if (current.includes(key)) return current.filter((openKey) => openKey !== key);

      return [...current, key];
    });

  const toggleAll = () => {
    if (allOpen) return setOpenKeys([]);

    setOpenKeys(PART_IDS);
  };

  const tileCount = mobile.input.reduce((total, { items }) => total + items.length, 0);

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!canEdit && <ViewOnlyNotice what="the header" />}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box component="button" type="button" onClick={toggleAll} sx={{ ...buttonSx, height: 36, fontSize: "0.82rem", gap: 0.75 }}>
          {allOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />} {allOpen ? "Collapse all" : "Expand all"}
        </Box>
      </Box>

      {/* 1. Desktop menu */}
      <PartCard id="menus" step={1} title="Desktop menu" description="The menu items after “All Exams” (GS Foundation, Mentorship…). A menu with items opens a dropdown; one without is a plain link." summary={`${menus.input.length} menus`} isOpen={openKeys.includes("menus")} onToggle={() => toggle("menus")} part={menus} canEdit={canEdit}>
        <ListEditor
          items={menus.input}
          onChange={menus.update}
          createItem={newMenu}
          addLabel="Add menu"
          emptyText="No menus yet."
          itemLabel={({ label, items }, index) => `${label || `Menu ${index + 1}`} · ${items.length ? `${items.length} items` : "plain link"}`}
          renderItem={(menu, updateMenu) => (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <FieldGrid columns={3}>
                <Field label="Text" required>
                  <TextInput value={menu.label} onChange={(label) => updateMenu({ ...menu, label })} placeholder="GS Foundation" />
                </Field>
                <Field label="Link" required hint="Where the menu name itself goes.">
                  <TextInput value={menu.link} onChange={(link) => updateMenu({ ...menu, link })} placeholder="/courses/gs-foundation" />
                </Field>
                <Field label="Badge (optional)" hint="A small tag next to the name, e.g. “New”.">
                  <TextInput value={menu.badge} onChange={(badge) => updateMenu({ ...menu, badge })} placeholder="New" />
                </Field>
              </FieldGrid>
              <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.85rem" }}>Dropdown items ({menu.items.length})</Typography>
              <ListEditor
                items={menu.items}
                onChange={(items) => updateMenu({ ...menu, items })}
                createItem={newLink}
                addLabel="Add dropdown item"
                emptyText="No dropdown — the menu is a plain link."
                itemLabel={({ label }, index) => label || `Item ${index + 1}`}
                renderItem={(item, updateItem) => <LinkFields value={item} onChange={updateItem} />}
              />
            </Box>
          )}
        />
      </PartCard>

      {/* 2. Mobile menu */}
      <PartCard id="mobileMenu" step={2} title="Mobile menu" description="The slide-in menu on phones: titled sections of tiles (Free Resources, Study Material, Featured), each with an icon and a link." summary={`${mobile.input.length} sections · ${tileCount} tiles`} isOpen={openKeys.includes("mobileMenu")} onToggle={() => toggle("mobileMenu")} part={mobile} canEdit={canEdit}>
        <ListEditor
          items={mobile.input}
          onChange={mobile.update}
          createItem={newMobileSection}
          addLabel="Add section"
          emptyText="No sections yet."
          itemLabel={({ title, items }, index) => `${title || `Section ${index + 1}`} · ${items.length} tiles`}
          renderItem={(section, updateSection) => (
            <Box sx={{ display: "grid", gap: 1.5 }}>
              <Field label="Section title" required>
                <TextInput value={section.title} onChange={(title) => updateSection({ ...section, title })} placeholder="Free Resources" />
              </Field>
              <ListEditor
                items={section.items}
                onChange={(items) => updateSection({ ...section, items })}
                createItem={newTile}
                addLabel="Add tile"
                emptyText="No tiles yet."
                itemLabel={({ label }, index) => label || `Tile ${index + 1}`}
                renderItem={(tile, updateTile) => (
                  <Box sx={{ display: "grid", gap: 1.5 }}>
                    <LinkFields value={tile} onChange={(value) => updateTile({ ...tile, ...value })} textPlaceholder="Current Affairs" />
                    <Box sx={{ maxWidth: { md: "50%" } }}>
                      <Field label="Icon">
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <Box sx={{ width: 42, height: 42, flexShrink: 0, borderRadius: "10px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.ink }}>
                            <IconRenderer name={tile.icon} size={19} />
                          </Box>
                          <Box component="select" value={tile.icon} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateTile({ ...tile, icon: e.target.value })} sx={inputSx}>
                            {!ICON_NAMES.includes(tile.icon) && <option value={tile.icon}>{tile.icon}</option>}
                            {ICON_NAMES.map((name) => (
                              <option key={name} value={name}>{name}</option>
                            ))}
                          </Box>
                        </Box>
                      </Field>
                    </Box>
                  </Box>
                )}
              />
            </Box>
          )}
        />
      </PartCard>

      {/* 3. Store & search */}
      <PartCard id="settings" step={3} title="Store & search" description="Where the Store button goes, and the trending searches shown in the search box." summary={`${settings.input.searchTrending.length} trending`} isOpen={openKeys.includes("settings")} onToggle={() => toggle("settings")} part={settings} canEdit={canEdit}>
        <Field label="Store link" required hint="The Store button in the header and the mobile menu. A full URL opens in a new tab.">
          <TextInput value={settings.input.storeLink} onChange={(storeLink) => settings.update({ ...settings.input, storeLink })} placeholder="https://store.viniias.com/" />
        </Field>
        <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.85rem" }}>Trending searches ({settings.input.searchTrending.length})</Typography>
        <ListEditor
          items={settings.input.searchTrending}
          onChange={(searchTrending) => settings.update({ ...settings.input, searchTrending })}
          createItem={() => ""}
          addLabel="Add search"
          emptyText="No trending searches."
          itemLabel={(term, index) => term || `Search ${index + 1}`}
          renderItem={(term, updateTerm) => (
            <Field label="Search text">
              <TextInput value={term} onChange={updateTerm} placeholder="UPSC CSE" />
            </Field>
          )}
        />
      </PartCard>
    </Box>
  );
}
