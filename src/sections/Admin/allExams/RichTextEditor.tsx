"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import { EditorContent, useEditor, useEditorState, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TableKit } from "@tiptap/extension-table";
import TextAlign from "@tiptap/extension-text-align";
import { Placeholder } from "@tiptap/extensions";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Columns3,
  Eraser,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link2,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Rows3,
  Strikethrough,
  Table as TableIcon,
  Trash2,
  Underline,
  Undo2,
} from "lucide-react";
import { COLORS } from "@/theme/colors";
import { richTextSx } from "@/theme/richText";
import { inputSx, primaryButtonSx, buttonSx } from "./formKit";

function ToolButton({ label, active = false, disabled = false, onClick, children }: { label: string; active?: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Box
      component="button"
      type="button"
      title={label}
      aria-label={label}
      aria-pressed={active}
      disabled={disabled}
      onMouseDown={(event: React.MouseEvent) => event.preventDefault()}
      onClick={onClick}
      sx={{
        width: 32,
        height: 32,
        flexShrink: 0,
        borderRadius: "8px",
        border: "none",
        bgcolor: active ? COLORS.redTint : "transparent",
        color: active ? COLORS.red : COLORS.ink,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        "&:hover:not(:disabled)": { bgcolor: active ? COLORS.redTint : COLORS.surface },
        "&:disabled": { color: COLORS.disabled, cursor: "default" },
      }}
    >
      {children}
    </Box>
  );
}

const Divider = () => <Box sx={{ width: "1px", height: 22, mx: 0.5, bgcolor: COLORS.border, flexShrink: 0 }} />;

/** Inline "add link" bar (no browser pop-ups). */
function LinkBar({ editor, onClose }: { editor: Editor; onClose: () => void }) {
  const [href, setHref] = useState(editor.getAttributes("link").href || "");

  const apply = () => {
    const url = href.trim();
    const chain = editor.chain().focus().extendMarkRange("link");

    if (!url) chain.unsetLink().run();
    else chain.setLink({ href: /^(https?:|mailto:|tel:|\/|#)/i.test(url) ? url : `https://${url}` }).run();

    onClose();
  };

  return (
    <Box sx={{ display: "flex", gap: 1, p: 1, borderBottom: `1px solid ${COLORS.border}`, bgcolor: COLORS.surface, flexWrap: "wrap" }}>
      <Box
        component="input"
        autoFocus
        value={href}
        placeholder="Paste or type a link, e.g. https://vini.in/batches"
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setHref(event.target.value)}
        onKeyDown={(event: React.KeyboardEvent) => {
          if (event.key === "Enter") {
            event.preventDefault();
            apply();
          }

          if (event.key === "Escape") onClose();
        }}
        sx={{ ...inputSx, flex: 1, minWidth: 220, height: 36 }}
      />
      <Box component="button" type="button" onClick={apply} sx={{ ...primaryButtonSx, height: 36 }}>Apply</Box>
      {editor.isActive("link") && (
        <Box component="button" type="button" onClick={() => { editor.chain().focus().extendMarkRange("link").unsetLink().run(); onClose(); }} sx={{ ...buttonSx, height: 36 }}>Remove link</Box>
      )}
      <Box component="button" type="button" onClick={onClose} sx={{ ...buttonSx, height: 36 }}>Cancel</Box>
    </Box>
  );
}

function Toolbar({ editor }: { editor: Editor }) {
  const [isLinking, setIsLinking] = useState(false);

  const state = useEditorState({
    editor,
    selector: ({ editor: current }) => ({
      paragraph: current.isActive("paragraph"),
      h2: current.isActive("heading", { level: 2 }),
      h3: current.isActive("heading", { level: 3 }),
      h4: current.isActive("heading", { level: 4 }),
      bold: current.isActive("bold"),
      italic: current.isActive("italic"),
      underline: current.isActive("underline"),
      strike: current.isActive("strike"),
      bulletList: current.isActive("bulletList"),
      orderedList: current.isActive("orderedList"),
      blockquote: current.isActive("blockquote"),
      link: current.isActive("link"),
      left: current.isActive({ textAlign: "left" }),
      center: current.isActive({ textAlign: "center" }),
      right: current.isActive({ textAlign: "right" }),
      inTable: current.isActive("table"),
      canUndo: current.can().undo(),
      canRedo: current.can().redo(),
    }),
  });

  const run = (command: (chain: ReturnType<Editor["chain"]>) => ReturnType<Editor["chain"]>) => () => command(editor.chain().focus()).run();

  return (
    <Box sx={{ position: "sticky", top: 0, zIndex: 2, bgcolor: "#FFFFFF", borderBottom: `1px solid ${COLORS.border}`, borderRadius: "12px 12px 0 0" }}>
      <Box role="toolbar" aria-label="Formatting" sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.25, p: 0.75 }}>
        <ToolButton label="Paragraph" active={state.paragraph} onClick={run((c) => c.setParagraph())}><Pilcrow size={16} /></ToolButton>
        <ToolButton label="Heading" active={state.h2} onClick={run((c) => c.toggleHeading({ level: 2 }))}><Heading2 size={17} /></ToolButton>
        <ToolButton label="Sub-heading" active={state.h3} onClick={run((c) => c.toggleHeading({ level: 3 }))}><Heading3 size={17} /></ToolButton>
        <ToolButton label="Small heading" active={state.h4} onClick={run((c) => c.toggleHeading({ level: 4 }))}><Heading4 size={17} /></ToolButton>
        <Divider />
        <ToolButton label="Bold (Ctrl+B)" active={state.bold} onClick={run((c) => c.toggleBold())}><Bold size={16} /></ToolButton>
        <ToolButton label="Italic (Ctrl+I)" active={state.italic} onClick={run((c) => c.toggleItalic())}><Italic size={16} /></ToolButton>
        <ToolButton label="Underline (Ctrl+U)" active={state.underline} onClick={run((c) => c.toggleUnderline())}><Underline size={16} /></ToolButton>
        <ToolButton label="Strikethrough" active={state.strike} onClick={run((c) => c.toggleStrike())}><Strikethrough size={16} /></ToolButton>
        <ToolButton label="Link" active={state.link || isLinking} onClick={() => setIsLinking((open) => !open)}><Link2 size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Bulleted list" active={state.bulletList} onClick={run((c) => c.toggleBulletList())}><List size={17} /></ToolButton>
        <ToolButton label="Numbered list" active={state.orderedList} onClick={run((c) => c.toggleOrderedList())}><ListOrdered size={17} /></ToolButton>
        <ToolButton label="Quote" active={state.blockquote} onClick={run((c) => c.toggleBlockquote())}><Quote size={16} /></ToolButton>
        <ToolButton label="Divider line" onClick={run((c) => c.setHorizontalRule())}><Minus size={17} /></ToolButton>
        <Divider />
        <ToolButton label="Align left" active={state.left} onClick={run((c) => c.setTextAlign("left"))}><AlignLeft size={16} /></ToolButton>
        <ToolButton label="Align center" active={state.center} onClick={run((c) => c.setTextAlign("center"))}><AlignCenter size={16} /></ToolButton>
        <ToolButton label="Align right" active={state.right} onClick={run((c) => c.setTextAlign("right"))}><AlignRight size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Insert table" onClick={run((c) => c.insertTable({ rows: 3, cols: 3, withHeaderRow: true }))}><TableIcon size={16} /></ToolButton>
        <Divider />
        <ToolButton label="Clear formatting" onClick={run((c) => c.unsetAllMarks().clearNodes())}><Eraser size={16} /></ToolButton>
        <ToolButton label="Undo (Ctrl+Z)" disabled={!state.canUndo} onClick={run((c) => c.undo())}><Undo2 size={16} /></ToolButton>
        <ToolButton label="Redo (Ctrl+Shift+Z)" disabled={!state.canRedo} onClick={run((c) => c.redo())}><Redo2 size={16} /></ToolButton>
      </Box>

      {state.inTable && (
        <Box role="toolbar" aria-label="Table" sx={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 0.5, px: 1, py: 0.75, borderTop: `1px solid ${COLORS.borderLight}`, bgcolor: COLORS.surface, fontSize: "0.78rem" }}>
          <Box component="span" sx={{ fontWeight: 800, color: COLORS.muted, mr: 0.5 }}>TABLE</Box>
          {[
            { label: "Row above", icon: <Rows3 size={14} />, action: run((c) => c.addRowBefore()) },
            { label: "Row below", icon: <Rows3 size={14} />, action: run((c) => c.addRowAfter()) },
            { label: "Delete row", icon: <Trash2 size={14} />, action: run((c) => c.deleteRow()) },
            { label: "Column left", icon: <Columns3 size={14} />, action: run((c) => c.addColumnBefore()) },
            { label: "Column right", icon: <Columns3 size={14} />, action: run((c) => c.addColumnAfter()) },
            { label: "Delete column", icon: <Trash2 size={14} />, action: run((c) => c.deleteColumn()) },
            { label: "Header row", icon: <TableIcon size={14} />, action: run((c) => c.toggleHeaderRow()) },
            { label: "Merge / split cells", icon: <TableIcon size={14} />, action: run((c) => c.mergeOrSplit()) },
            { label: "Delete table", icon: <Trash2 size={14} />, action: run((c) => c.deleteTable()) },
          ].map(({ label, icon, action }) => (
            <Box key={label} component="button" type="button" onMouseDown={(event: React.MouseEvent) => event.preventDefault()} onClick={action} sx={{ display: "inline-flex", alignItems: "center", gap: 0.5, height: 28, px: 1, borderRadius: "7px", border: `1px solid ${COLORS.border}`, bgcolor: "#FFFFFF", color: label.startsWith("Delete") ? COLORS.redDark : COLORS.ink, fontFamily: "inherit", fontSize: "0.76rem", fontWeight: 700, cursor: "pointer", "&:hover": { borderColor: COLORS.redBorder } }}>
              {icon} {label}
            </Box>
          ))}
        </Box>
      )}

      {isLinking && <LinkBar editor={editor} onClose={() => setIsLinking(false)} />}
    </Box>
  );
}

type RichTextEditorProps = { value: string; onChange: (html: string) => void; placeholder?: string; label?: string };

/** WordPress-style editor for long content. Stores HTML (the server sanitises it again before saving). */
export default function RichTextEditor({ value, onChange, placeholder = "Start writing…", label = "Description" }: RichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, code: false, codeBlock: false, link: { openOnClick: false, autolink: true } }),
      TableKit.configure({ table: { resizable: false } }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: { attributes: { "aria-label": label, "aria-multiline": "true", role: "textbox", class: "rich-text-content" } },
    onUpdate: ({ editor: current }) => onChange(current.isEmpty ? "" : current.getHTML()),
  });

  return (
    <Box sx={{ border: `1px solid ${COLORS.border}`, borderRadius: "12px", bgcolor: "#FFFFFF", "&:focus-within": { borderColor: COLORS.red, boxShadow: `0 0 0 3px ${COLORS.redTint}` } }}>
      {editor ? <Toolbar editor={editor} /> : <Box sx={{ height: 46, borderBottom: `1px solid ${COLORS.border}` }} />}
      <Box
        sx={{
          ...richTextSx,
          px: 2,
          py: 1.5,
          minHeight: 280,
          maxHeight: 640,
          overflowY: "auto",
          "& .ProseMirror": { outline: "none", minHeight: 250 },
          "& .ProseMirror p.is-editor-empty:first-of-type::before": { content: "attr(data-placeholder)", color: COLORS.disabled, float: "left", height: 0, pointerEvents: "none" },
        }}
      >
        <EditorContent editor={editor} />
      </Box>
    </Box>
  );
}
