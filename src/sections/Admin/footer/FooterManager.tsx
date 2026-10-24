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
import { AdminFooterSection, FooterColumnData, FooterLinkData, FooterSectionKey } from "@/types";
import { buttonSx, Field, FieldGrid, ListEditor, primaryButtonSx, StatusToggle, TextInput } from "../allExams/formKit";

const API_PATH = "footer";

/** What each section is, for its card. */
const SECTION_INFO: Record<FooterSectionKey, { description: string; itemsLabel: string }> = {
  company: {
    description: "The “Company” column next to the logo — links to About Us, Contact Us, Careers…",
    itemsLabel: "Links",
  },
  freeLearningResources: {
    description: "The wide “Free Learning Resources” block — titled columns (Study Material, Books…), each with its links.",
    itemsLabel: "Columns",
  },
  ecosystemBrands: {
    description: "The “Our Ecosystem Brands” row of brand chips at the bottom of the footer.",
    itemsLabel: "Brands",
  },
};

const newLink = (): FooterLinkData => ({ text: "", link: "" });

const newColumn = (): FooterColumnData => ({ title: "", links: [newLink()] });

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
function LinkFields({ value, onChange }: { value: FooterLinkData; onChange: (value: FooterLinkData) => void }) {
  return (
    <FieldGrid>
      <Field label="Text" required>
        <TextInput value={value.text} onChange={(text) => onChange({ ...value, text })} placeholder="About Us" />
      </Field>
      <Field label="Link" required hint="Page or URL, e.g. /about-us">
        <TextInput value={value.link} onChange={(link) => onChange({ ...value, link })} placeholder="/about-us" />
      </Field>
    </FieldGrid>
  );
}

function LinksEditor({ links, onChange, addLabel }: { links: FooterLinkData[]; onChange: (links: FooterLinkData[]) => void; addLabel: string }) {
  return (
    <ListEditor
      items={links}
      onChange={onChange}
      createItem={newLink}
      addLabel={addLabel}
      emptyText="No links yet."
      itemLabel={({ text }, index) => text || `Link ${index + 1}`}
      renderItem={(link, update) => <LinkFields value={link} onChange={update} />}
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
  const { key } = section;
  const hasColumns = key === "freeLearningResources";
  const { description, itemsLabel } = SECTION_INFO[key];
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
            <Badge tone={input.isActive ? "success" : "muted"}>{input.isActive ? "Active" : "Inactive"}</Badge>
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
          <FieldGrid>
            <Field label="Heading" required hint="Shown above the links on the website.">
              <TextInput value={input.title} onChange={(title) => update({ title })} placeholder="Company" />
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
                  <Field label="Column title" required>
                    <TextInput value={column.title} onChange={(title) => updateColumn({ ...column, title })} placeholder="Study Material" />
                  </Field>
                  <LinksEditor links={column.links} onChange={(links) => updateColumn({ ...column, links })} addLabel="Add link" />
                </Box>
              )}
            />
          ) : (
            <LinksEditor links={input.links} onChange={(links) => update({ links })} addLabel={key === "ecosystemBrands" ? "Add brand" : "Add link"} />
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
            <Box component="button" type="button" disabled={status === "saving" || !isDirty} onClick={save} sx={primaryButtonSx}>
              {status === "saving" ? <CircularProgress size={16} sx={{ color: "#FFFFFF" }} /> : <Save size={16} />} Save {input.title || "section"}
            </Box>
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

/** Footer → Company, Free Learning Resources and Our Ecosystem Brands. */
export default function FooterManager({ sections }: { sections: AdminFooterSection[] }) {
  const [openKeys, setOpenKeys] = useState<FooterSectionKey[]>([]);
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
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box component="button" type="button" onClick={toggleAll} sx={{ ...buttonSx, height: 36, fontSize: "0.82rem", gap: 0.75 }}>
          {allOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />} {allOpen ? "Collapse all" : "Expand all"}
        </Box>
      </Box>
      {sections.map((section, index) => (
        <FooterSectionCard key={section.key} section={section} step={index + 1} isOpen={openKeys.includes(section.key)} onToggle={() => toggle(section.key)} />
      ))}
    </Box>
  );
}
