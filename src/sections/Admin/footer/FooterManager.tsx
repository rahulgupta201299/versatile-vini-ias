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
import { AdminFooterSection, FooterColumnData, FooterColumnStyle, FooterLinkData, FooterSectionKey } from "@/types";
import { buttonSx, Field, FieldGrid, inputSx, ListEditor, primaryButtonSx, StatusToggle, TextInput } from "../allExams/formKit";
import { useSectionAccess } from "../AdminAccessContext";
import ViewOnlyNotice from "../common/ViewOnlyNotice";
import DeleteButton from "../common/DeleteButton";

const API_PATH = "footer";

/** The footer's sections, in footer order, with the heading a deleted one starts with when created again. */
const FOOTER_KEYS: FooterSectionKey[] = ["company", "freeLearningResources", "ecosystemBrands"];

const DEFAULT_TITLES: Record<FooterSectionKey, string> = { company: "Company footer", freeLearningResources: "Free Learning Resources", ecosystemBrands: "Our Ecosystem Brands" };

/** A deleted section, ready to be created again (no `_id` until it's saved). */
const blankSection = (key: FooterSectionKey): AdminFooterSection => ({ _id: "", key, title: DEFAULT_TITLES[key], isActive: true, links: [], columns: [] });

const DEFAULT_LINK_HINT = "Page or URL, e.g. /about-us";

/** Company footer columns: how their links look on the website. */
const COLUMN_STYLES: { value: FooterColumnStyle; label: string; linkHint: string }[] = [
  { value: "links", label: "Plain links", linkHint: DEFAULT_LINK_HINT },
  { value: "locations", label: "Locations — with a pin (e.g. Upcoming Centres)", linkHint: DEFAULT_LINK_HINT },
  {
    value: "contact",
    label: "Contact — email, chat, WhatsApp, call (e.g. Connect with us)",
    linkHint: "mailto:… → email · tel:+91… → Call button · https://wa.me/91… → WhatsApp button · anything else → chat icon. For Call / WhatsApp, the text is the number shown.",
  },
];

const linkHintFor = (style: FooterColumnStyle = "links") => COLUMN_STYLES.find(({ value }) => value === style)?.linkHint || DEFAULT_LINK_HINT;

/** What each section is, for its card. */
const SECTION_INFO: Record<FooterSectionKey, { description: string; itemsLabel: string; headingHint: string }> = {
  company: {
    description: "The columns next to the logo — Company, Upcoming Centres, Connect with us, Quick Links, Our Products, Prep Resources… Three per row on computers, two on phones.",
    itemsLabel: "Columns",
    headingHint: "For the admin only — each column shows its own title on the website.",
  },
  freeLearningResources: { description: "The wide block of titled columns (Study Material, Books…), each with its links.", itemsLabel: "Columns", headingHint: "Shown above the columns on the website." },
  ecosystemBrands: { description: "The row of brand chips at the bottom of the footer.", itemsLabel: "Brands", headingHint: "Shown above the brands on the website." },
};

const newLink = (): FooterLinkData => ({ text: "", link: "", badge: "" });

const newColumn = (): FooterColumnData => ({ title: "", style: "links", links: [newLink()] });

type SectionInput = Pick<AdminFooterSection, "title" | "isActive" | "links" | "columns">;

const toInput = ({ title, isActive, links, columns }: AdminFooterSection): SectionInput => ({ title, isActive, links, columns });

const linkProblems = (links: FooterLinkData[], where: string) =>
  links.flatMap(({ text, link }, index) => {
    if (text.trim() && link.trim()) return [];

    return [`${where}link ${index + 1}: text and link are both required.`];
  });

/** Problems that stop saving, as readable sentences. */
const validateSection = ({ title, links, columns }: SectionInput, hasColumns: boolean) => {
  const problems = title.trim() ? [] : ["Add the heading."];

  if (!hasColumns) return [...problems, ...linkProblems(links, "")];

  const columnProblems = columns.flatMap((column, index) => {
    const where = `Column ${index + 1} (${column.title || "untitled"}), `;
    const titleProblem = column.title.trim() ? [] : [`Column ${index + 1}: add its title.`];

    return [...titleProblem, ...linkProblems(column.links, where)];
  });

  return [...problems, ...columnProblems];
};

/** A text + link pair, used for every footer link. */
function LinkFields({ value, onChange, linkHint = DEFAULT_LINK_HINT, withBadge = false }: { value: FooterLinkData; onChange: (value: FooterLinkData) => void; linkHint?: string; withBadge?: boolean }) {
  return (
    <FieldGrid columns={withBadge ? 3 : 2}>
      <Field label="Text" required>
        <TextInput value={value.text} onChange={(text) => onChange({ ...value, text })} placeholder="About Us" />
      </Field>
      <Field label="Link" required hint={linkHint}>
        <TextInput value={value.link} onChange={(link) => onChange({ ...value, link })} placeholder="/about-us" />
      </Field>
      {withBadge && (
        <Field label="Badge (optional)" hint="A small animated tag beside the link, e.g. “We are hiring”. Keep it short.">
          <TextInput value={value.badge || ""} onChange={(badge) => onChange({ ...value, badge })} placeholder="We are hiring" />
        </Field>
      )}
    </FieldGrid>
  );
}

function LinksEditor({ links, onChange, addLabel, linkHint, withBadge }: { links: FooterLinkData[]; onChange: (links: FooterLinkData[]) => void; addLabel: string; linkHint?: string; withBadge?: boolean }) {
  return (
    <ListEditor
      items={links}
      onChange={onChange}
      createItem={newLink}
      addLabel={addLabel}
      emptyText="No links yet."
      itemLabel={({ text }, index) => text || `Link ${index + 1}`}
      renderItem={(link, update) => <LinkFields value={link} onChange={update} linkHint={linkHint} withBadge={withBadge} />}
    />
  );
}

const BADGE_TONES = {
  muted: { color: COLORS.muted, background: "#F1F3F7" },
  success: { color: COLORS.success, background: "#E9F8EF" },
  warning: { color: COLORS.redDark, background: COLORS.redTint },
};

/** Small pill in a section's header. */
function Badge({ children, tone = "muted" }: { children: React.ReactNode; tone?: "muted" | "success" | "warning" }) {
  const { color, background } = BADGE_TONES[tone];

  return (
    <Box
      component="span"
      sx={{
        px: 1,
        py: 0.25,
        borderRadius: "999px",
        bgcolor: background,
        color,
        fontSize: "0.74rem",
        fontWeight: 700,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Box>
  );
}

/** The line next to the Save button. */
const saveMessage = (isDirty: boolean, status: "idle" | "saving" | "saved") => {
  if (isDirty) return "Unsaved changes";

  if (status === "saved")
    return (
      <>
        <Check size={15} /> Saved — live in the footer
      </>
    );

  return "";
};

type FooterSectionCardProps = {
  section: AdminFooterSection;
  step: number;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * One footer section as an accordion: the header (heading, status, count) opens and closes it; inside are the
 * heading, on / off, and its links (or columns of links). Saved on its own. A closed section keeps its edits.
 */
function FooterSectionCard({ section, step, isOpen, onToggle }: FooterSectionCardProps) {
  const router = useRouter();
  const { canEdit, canDelete } = useSectionAccess("footer");
  const { key } = section;
  // Deleted: not in the database (and not on the website) until it's saved again
  const isDeleted = !section._id;
  const hasColumns = key !== "ecosystemBrands";
  const hasStyles = key === "company";
  const { description, itemsLabel, headingHint } = SECTION_INFO[key];
  const [input, setInput] = useState<SectionInput>(() => toInput(section));
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(toInput(section)));
  const [problems, setProblems] = useState<string[]>([]);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const isDirty = JSON.stringify(input) !== savedSnapshot;

  const update = (changes: Partial<SectionInput>) => {
    setInput((current) => ({ ...current, ...changes }));
    setProblems([]);
  };

  const save = async () => {
    const found = validateSection(input, hasColumns);

    setProblems(found);

    if (found.length) return;

    setStatus("saving");

    try {
      const saved = await adminRequest<AdminFooterSection>(`${API_PATH}/${key}`, { method: "PUT", body: input });
      const savedInput = toInput(saved);

      setInput(savedInput);
      setSavedSnapshot(JSON.stringify(savedInput));
      setStatus("saved");
      router.refresh();
    } catch (error) {
      setProblems([error instanceof Error ? error.message : "Save failed."]);
      setStatus("idle");
    }
  };

  const count = hasColumns ? input.columns.length : input.links.length;
  const panelId = `${key}-panel`;

  return (
    <Box
      component="section"
      id={key}
      sx={{
        scrollMarginTop: 90,
        borderRadius: "18px",
        bgcolor: "#FFFFFF",
        border: `1px solid ${isOpen ? COLORS.redBorder : COLORS.border}`,
        overflow: "hidden",
      }}
    >
      <Box
        component="button"
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          p: { xs: 2, md: 2.5 },
          border: 0,
          bgcolor: "transparent",
          textAlign: "left",
          cursor: "pointer",
          fontFamily: "inherit",
          "&:hover": { bgcolor: "#FAFBFC" },
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            flexShrink: 0,
            borderRadius: "9px",
            bgcolor: COLORS.redTint,
            color: COLORS.red,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: "0.85rem",
          }}
        >
          {step}
        </Box>
        <Box sx={{ minWidth: 0, flex: 1 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              flexWrap: "wrap",
            }}
          >
            <Typography component="h2" sx={{ color: COLORS.ink, fontWeight: 800, fontSize: "1.05rem" }}>
              {input.title || "Untitled section"}
            </Typography>
            {isDeleted && <Badge tone="warning">Deleted — not on the website</Badge>}
            {!isDeleted && <Badge tone={input.isActive ? "success" : "muted"}>{input.isActive ? "Active" : "Inactive"}</Badge>}
            <Badge>{`${count} ${itemsLabel.toLowerCase()}`}</Badge>
            {isDirty && <Badge tone="warning">Unsaved changes</Badge>}
          </Box>
          <Typography sx={{ mt: 0.25, color: COLORS.muted, fontSize: "0.83rem" }}>{description}</Typography>
        </Box>
        <Box
          sx={{
            flexShrink: 0,
            color: COLORS.muted,
            display: "flex",
            transition: "transform 0.2s",
            transform: isOpen ? "rotate(180deg)" : "none",
          }}
        >
          <ChevronDown size={20} />
        </Box>
      </Box>

      <Collapse in={isOpen} id={panelId}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            px: { xs: 2.25, md: 3 },
            pb: { xs: 2.25, md: 3 },
            pt: { xs: 2, md: 2.5 },
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          {isDeleted && (
            <Typography sx={{ p: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, color: COLORS.redDark, fontSize: "0.84rem", fontWeight: 600 }}>
              This section was deleted, so the website leaves it out. Fill it in and create it to add it back.
            </Typography>
          )}
          <FieldGrid>
            <Field label="Heading" required hint={headingHint}>
              <TextInput value={input.title} onChange={(title) => update({ title })} placeholder={DEFAULT_TITLES[key]} />
            </Field>
            <Field label="Status" group>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  minHeight: 44,
                }}
              >
                <StatusToggle isActive={input.isActive} onChange={(isActive) => update({ isActive })} label={`${input.title} status`} />
                <Typography sx={{ color: COLORS.muted, fontSize: "0.82rem" }}>{input.isActive ? "Shown in the footer" : "Hidden from the footer"}</Typography>
              </Box>
            </Field>
          </FieldGrid>

          <Typography sx={{ fontWeight: 800, color: COLORS.heading, fontSize: "0.9rem" }}>
            {itemsLabel}{" "}
            <Box component="span" sx={{ color: COLORS.muted, fontWeight: 600 }}>
              ({count})
            </Box>
          </Typography>

          {hasColumns ? (
            <ListEditor
              items={input.columns}
              onChange={(columns) => update({ columns })}
              createItem={newColumn}
              addLabel="Add column"
              emptyText="No columns yet."
              itemLabel={({ title, links }, index) => `${title || `Column ${index + 1}`} · ${links.length} links`}
              renderItem={(column, updateColumn) => (
                <Box sx={{ display: "grid", gap: 1.5 }}>
                  <FieldGrid columns={hasStyles ? 2 : 1}>
                    <Field label="Column title" required>
                      <TextInput value={column.title} onChange={(title) => updateColumn({ ...column, title })} placeholder={hasStyles ? "Upcoming Centres" : "Study Material"} />
                    </Field>
                    {hasStyles && (
                      <Field label="Style" hint="How its links look on the website.">
                        <Box component="select" value={column.style || "links"} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateColumn({ ...column, style: e.target.value as FooterColumnStyle })} sx={inputSx}>
                          {COLUMN_STYLES.map(({ value, label }) => (
                            <option key={value} value={value}>{label}</option>
                          ))}
                        </Box>
                      </Field>
                    )}
                  </FieldGrid>
                  <LinksEditor links={column.links} onChange={(links) => updateColumn({ ...column, links })} addLabel="Add link" linkHint={linkHintFor(column.style)} withBadge={hasStyles} />
                </Box>
              )}
            />
          ) : (
            <LinksEditor links={input.links} onChange={(links) => update({ links })} addLabel="Add brand" />
          )}

          {!!problems.length && (
            <Box
              role="alert"
              sx={{
                p: 1.5,
                borderRadius: "10px",
                bgcolor: COLORS.redTint,
                border: `1px solid ${COLORS.redBorder}`,
                color: COLORS.redDark,
                fontSize: "0.84rem",
                fontWeight: 600,
              }}
            >
              {problems.map((problem) => (
                <div key={problem}>• {problem}</div>
              ))}
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              flexWrap: "wrap",
            }}
          >
            <Box component="button" type="button" disabled={!canEdit || status === "saving" || (!isDirty && !isDeleted)} onClick={save} sx={primaryButtonSx}>
              {status === "saving" ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />} {isDeleted ? "Create" : "Save"} {input.title || "section"}
            </Box>
            {canDelete && !isDeleted && (
              <DeleteButton
                name={input.title || DEFAULT_TITLES[key]}
                label="Delete section"
                onDelete={() => adminRequest(`${API_PATH}/${key}`, { method: "DELETE" })}
                onDeleted={() => router.refresh()}
              />
            )}
            <Typography
              sx={{
                color: isDirty ? COLORS.redDark : COLORS.success,
                fontSize: "0.84rem",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              {saveMessage(isDirty, status)}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}

/** Footer → Company footer (the columns next to the logo), Free Learning Resources and Our Ecosystem Brands. */
export default function FooterManager({ sections: savedSections }: { sections: AdminFooterSection[] }) {
  // Every section, also deleted ones (shown so they can be created again)
  const sections = FOOTER_KEYS.map((key) => savedSections.find((section) => section.key === key) || blankSection(key));
  const [openKeys, setOpenKeys] = useState<FooterSectionKey[]>([]);
  const { canEdit } = useSectionAccess("footer");
  const allOpen = openKeys.length === sections.length;

  const toggle = (key: FooterSectionKey) =>
    setOpenKeys((current) => {
      if (current.includes(key)) return current.filter((openKey) => openKey !== key);

      return [...current, key];
    });

  const toggleAll = () => {
    if (allOpen) return setOpenKeys([]);

    setOpenKeys(sections.map(({ key }) => key));
  };

  return (
    <Box sx={{ display: "grid", gap: 1.5 }}>
      {!canEdit && <ViewOnlyNotice what="the footer" />}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box component="button" type="button" onClick={toggleAll} sx={{ ...buttonSx, height: 36, fontSize: "0.82rem", gap: 0.75 }}>
          {allOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />} {allOpen ? "Collapse all" : "Expand all"}
        </Box>
      </Box>
      {sections.map((section, index) => (
        <FooterSectionCard key={`${section.key}-${section._id}`} section={section} step={index + 1} isOpen={openKeys.includes(section.key)} onToggle={() => toggle(section.key)} />
      ))}
    </Box>
  );
}
