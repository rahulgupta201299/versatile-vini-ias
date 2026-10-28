"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import { AdminHeaderSection, HeaderLinkData, HeaderMenuData, HeaderMobileItemData, HeaderMobileSectionData, HeaderSectionKey } from "@/types";
import { Field, FieldGrid, ListEditor, TextInput } from "../allExams/formKit";
import IconSelect from "../common/IconSelect";
import { ExpandAllButton, PartCard, useOpenParts, usePart } from "../common/PartAccordion";
import { useSectionAccess } from "../AdminAccessContext";
import ViewOnlyNotice from "../common/ViewOnlyNotice";

const API_PATH = "header";
const LINK_HINT = "Page or URL, e.g. /courses/csat or https://…";

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

const savePart = (key: HeaderSectionKey, body: unknown) => adminRequest<AdminHeaderSection>(`${API_PATH}/${key}`, { method: "PUT", body });

/** Web → Header: the desktop menu (after All Exams), the mobile menu, and the Store link + trending searches. */
export default function HeaderManager({ sections }: { sections: AdminHeaderSection[] }) {
  const { canEdit } = useSectionAccess("header");
  const saved = (key: HeaderSectionKey) => sections.find((section) => section.key === key);
  const { isOpen, toggle, toggleAll, isAllOpen } = useOpenParts(PART_IDS);

  const menus = usePart(saved("menus")?.menus || [], {
    validate: menuProblems,
    submit: (input) => savePart("menus", { menus: input }),
    fromSaved: (section) => section.menus || [],
  });

  const mobile = usePart(saved("mobileMenu")?.mobileSections || [], {
    validate: mobileProblems,
    submit: (input) => savePart("mobileMenu", { mobileSections: input }),
    fromSaved: (section) => section.mobileSections || [],
  });

  const settings = usePart({ storeLink: saved("settings")?.storeLink || "", searchTrending: saved("settings")?.searchTrending || [] }, {
    validate: settingsProblems,
    submit: (input) => savePart("settings", input),
    fromSaved: (section) => ({ storeLink: section.storeLink || "", searchTrending: section.searchTrending || [] }),
  });

  const tileCount = mobile.input.reduce((total, { items }) => total + items.length, 0);

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!canEdit && <ViewOnlyNotice what="the header" />}
      <ExpandAllButton isAllOpen={isAllOpen} onClick={toggleAll} />

      {/* 1. Desktop menu */}
      <PartCard id="menus" step={1} title="Desktop menu" description="The menu items after “All Exams” (GS Foundation, Mentorship…). A menu with items opens a dropdown; one without is a plain link." summary={`${menus.input.length} menus`} isOpen={isOpen("menus")} onToggle={() => toggle("menus")} part={menus} canEdit={canEdit} savedText="Saved — live in the header">
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
      <PartCard id="mobileMenu" step={2} title="Mobile menu" description="The slide-in menu on phones: titled sections of tiles (Free Resources, Study Material, Featured), each with an icon and a link." summary={`${mobile.input.length} sections · ${tileCount} tiles`} isOpen={isOpen("mobileMenu")} onToggle={() => toggle("mobileMenu")} part={mobile} canEdit={canEdit} savedText="Saved — live in the header">
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
                        <IconSelect value={tile.icon} onChange={(icon) => updateTile({ ...tile, icon })} />
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
      <PartCard id="settings" step={3} title="Store & search" description="Where the Store button goes, and the trending searches shown in the search box." summary={`${settings.input.searchTrending.length} trending`} isOpen={isOpen("settings")} onToggle={() => toggle("settings")} part={settings} canEdit={canEdit} savedText="Saved — live in the header">
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
