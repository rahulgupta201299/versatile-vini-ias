"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Eye, EyeOff, Pencil, UserPlus } from "lucide-react";
import { COLORS } from "@/theme/colors";
import { adminRequest } from "@/lib/adminClient";
import type { AdminUser } from "@/lib/adminAuth";
import { emptyPermissions, MEMBER, roleLabel, roleOf, SECTIONS, SUPER_ADMIN, type AccessViewer, type Permissions, type SectionKey } from "@/lib/adminAccess";
import { AdminAccessOptions, AdminAccount } from "@/types";
import { Chip, PageHeader } from "../ui";
import { buttonSx, Field, FieldGrid, inputSx, primaryButtonSx, StatusToggle, TextInput } from "../allExams/formKit";
import AccessPicker, { type AccessValue } from "./AccessPicker";

const formatDate = (iso?: string) => (iso ? new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }) : "Never");

const initials = ({ name, email }: AdminAccount) =>
  (name || email)
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

function PasswordInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <Box sx={{ position: "relative" }}>
      <Box component="input" type={visible ? "text" : "password"} autoComplete="new-password" value={value} placeholder={placeholder} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value)} sx={{ ...inputSx, pr: 5 }} />
      <Box component="button" type="button" aria-label={visible ? "Hide password" : "Show password"} onClick={() => setVisible((v) => !v)} sx={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, border: "none", bgcolor: "transparent", color: COLORS.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {visible ? <EyeOff size={17} /> : <Eye size={17} />}
      </Box>
    </Box>
  );
}

type UserFormValues = { name: string; email: string; password: string } & AccessValue;

type UserFormProps = {
  options: AdminAccessOptions;
  viewer: AccessViewer;
  initial: UserFormValues;
  isNew: boolean;
  submitLabel: string;
  onSubmit: (values: UserFormValues) => Promise<void>;
  onCancel: () => void;
};

const hasAnyAccess = (permissions: Permissions) => Object.values(permissions).some(({ level }) => level !== "none");

/** Add-user and edit-user form (inline, no pop-ups). Throw from onSubmit to show the message. */
function UserForm({ options, viewer, initial, isNew, submitLabel, onSubmit, onCancel }: UserFormProps) {
  const [values, setValues] = useState(initial);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const set = (changes: Partial<UserFormValues>) => {
    setValues((current) => ({ ...current, ...changes }));
    setError("");
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!values.name.trim()) return setError("Type the person's name.");
    if (isNew && !values.email.trim()) return setError("Type their email address.");
    if (isNew && values.password.length < 8) return setError("Set a password of at least 8 characters.");
    if (!isNew && values.password && values.password.length < 8) return setError("A new password needs at least 8 characters.");
    if (values.role !== SUPER_ADMIN && !hasAnyAccess(values.permissions)) return setError("Give access to at least one section.");

    setBusy(true);

    try {
      await onSubmit(values);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Couldn't save.");
      setBusy(false);
    }
  };

  return (
    <Box component="form" onSubmit={submit} noValidate sx={{ display: "grid", gap: 2 }}>
      <FieldGrid columns={3}>
        <Field label="Name" required>
          <TextInput value={values.name} onChange={(name) => set({ name })} placeholder="e.g. Priya Sharma" />
        </Field>
        <Field label="Email" required={isNew} hint={isNew ? "They sign in with this email." : "Used to sign in."}>
          <TextInput type="email" value={values.email} onChange={(email) => set({ email })} placeholder="name@groupvini.in" />
        </Field>
        <Field label={isNew ? "Password" : "New password"} required={isNew} hint={isNew ? "At least 8 characters — share it with them privately." : "Leave empty to keep the current password."}>
          <PasswordInput value={values.password} onChange={(password) => set({ password })} placeholder={isNew ? "At least 8 characters" : "Unchanged"} />
        </Field>
      </FieldGrid>

      <Field label="Role & access" required group hint="They only see the sections they can view — everything else is hidden. The server checks every change too.">
        <AccessPicker options={options} value={{ role: values.role, permissions: values.permissions }} onChange={(access) => set(access)} viewer={viewer} viewerRole={roleOf(viewer)} current={initial.permissions} />
      </Field>

      {error && <Box role="alert" sx={{ px: 1.5, py: 1.25, borderRadius: "10px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.85rem", fontWeight: 600 }}>{error}</Box>}

      <Box sx={{ display: "flex", gap: 1 }}>
        <Box component="button" type="submit" disabled={busy} sx={primaryButtonSx}>
          {busy && <CircularProgress size={16} sx={{ color: "#FFFFFF" }} />} {submitLabel}
        </Box>
        <Box component="button" type="button" disabled={busy} onClick={onCancel} sx={buttonSx}>Cancel</Box>
      </Box>
    </Box>
  );
}

/** "Homepage · Edit + Delete", "Footer · View" … for the user list. */
const accessSummary = ({ role, permissions }: AdminAccount) => {
  if (role === SUPER_ADMIN) return [{ key: "all", text: "Everything", tone: "red" as const }];

  return (Object.keys(permissions) as SectionKey[])
    .filter((section) => permissions[section].level !== "none")
    .map((section) => {
      const { level, canDelete } = permissions[section];
      const levelText = level === "edit" ? "Edit" : "View";

      return { key: section, text: `${SECTIONS[section].label} · ${levelText}${canDelete ? " + Delete" : ""}`, tone: canDelete ? ("red" as const) : ("neutral" as const) };
    });
};

type AdminUsersProps = { admins: AdminAccount[]; options: AdminAccessOptions; viewer: AdminUser | null };

/**
 * Team → Admin users. Super Admins add anyone and set every permission (the only ones who give Delete access);
 * Admins add and change Members, up to their own access.
 */
export default function AdminUsers({ admins, options, viewer }: AdminUsersProps) {
  const router = useRouter();
  const viewerRole = roleOf(viewer);
  const isSuperViewer = viewerRole === SUPER_ADMIN;
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [busyId, setBusyId] = useState("");
  const [actionError, setActionError] = useState("");

  const activeAdmins = admins.filter(({ isActive }) => isActive);
  const inactiveAdmins = admins.filter(({ isActive }) => !isActive);
  // Admins manage Members only
  const canManage = ({ role }: AdminAccount) => isSuperViewer || role === MEMBER;

  const addUser = async ({ name, email, password, role, permissions }: UserFormValues) => {
    await adminRequest("admins", { method: "POST", body: { name, email, password, role, permissions } });
    setIsAdding(false);
    router.refresh();
  };

  const updateUser = async (id: string, { name, email, password, role, permissions }: UserFormValues) => {
    await adminRequest(`admins/${id}`, { method: "PATCH", body: { name, email, role, permissions, ...(password && { password }) } });
    setEditingId("");
    router.refresh();
  };

  const setStatus = async (id: string, isActive: boolean) => {
    setBusyId(id);
    setActionError("");

    try {
      await adminRequest(`admins/${id}`, { method: "PATCH", body: { isActive } });
      router.refresh();
    } catch (statusError) {
      setActionError(statusError instanceof Error ? statusError.message : "Couldn't change the status.");
    } finally {
      setBusyId("");
    }
  };

  const renderUser = (account: AdminAccount) => {
    const { id, name, email, role, permissions, isActive, lastLoginAt } = account;
    const isSelf = id === viewer?.id;
    const isManageable = canManage(account) && !isSelf;

    return (
      <Box key={id} sx={{ px: { xs: 2, md: 2.5 }, py: 1.75, borderTop: `1px solid ${COLORS.borderLight}`, opacity: isActive ? 1 : 0.8 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
          <Box sx={{ width: 40, height: 40, flexShrink: 0, borderRadius: "50%", bgcolor: role === SUPER_ADMIN ? COLORS.yellow : COLORS.surface, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.82rem", color: COLORS.ink }}>{initials(account)}</Box>
          <Box sx={{ flex: 1, minWidth: 200 }}>
            <Typography sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "0.92rem", display: "flex", alignItems: "center", gap: 0.75, flexWrap: "wrap" }}>
              {name} <Chip tone={role === SUPER_ADMIN ? "red" : "neutral"}>{roleLabel(role)}</Chip> {isSelf && <Chip tone="yellow">You</Chip>}
            </Typography>
            <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>{email} · last sign-in {formatDate(lastLoginAt)}</Typography>
            <Box sx={{ mt: 0.75, display: "flex", gap: 0.5, flexWrap: "wrap" }}>
              {accessSummary(account).map(({ key, text, tone }) => (
                <Chip key={key} tone={tone}>{text}</Chip>
              ))}
              {!accessSummary(account).length && <Chip tone="neutral">No access</Chip>}
            </Box>
          </Box>
          <StatusToggle isActive={isActive} disabled={!isManageable || busyId === id} onChange={(next) => setStatus(id, next)} label={`${name} status`} />
          {isManageable && editingId !== id && (
            <Box component="button" type="button" onClick={() => setEditingId(id)} sx={{ ...buttonSx, height: 34 }}>
              <Pencil size={14} /> Edit
            </Box>
          )}
          {!canManage(account) && <Typography sx={{ color: COLORS.muted, fontSize: "0.78rem" }}>Managed by a Super Admin</Typography>}
        </Box>

        {editingId === id && (
          <Box sx={{ mt: 2, p: 2, borderRadius: "14px", bgcolor: COLORS.surface, border: `1px solid ${COLORS.border}` }}>
            <UserForm options={options} viewer={viewer} isNew={false} submitLabel="Save changes" initial={{ name, email, password: "", role, permissions }} onSubmit={(values) => updateUser(id, values)} onCancel={() => setEditingId("")} />
          </Box>
        )}
      </Box>
    );
  };

  const renderGroup = (title: string, hint: string, accounts: AdminAccount[]) => (
    <Box component="section" sx={{ borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.border}`, overflow: "hidden" }}>
      <Box sx={{ px: { xs: 2, md: 2.5 }, py: 1.5, bgcolor: COLORS.surface }}>
        <Typography component="h2" sx={{ fontWeight: 800, color: COLORS.ink, fontSize: "1rem" }}>
          {title} <Box component="span" sx={{ color: COLORS.muted, fontWeight: 600 }}>({accounts.length})</Box>
        </Typography>
        <Typography sx={{ color: COLORS.muted, fontSize: "0.8rem" }}>{hint}</Typography>
      </Box>
      {accounts.map(renderUser)}
      {!accounts.length && <Typography sx={{ px: { xs: 2, md: 2.5 }, py: 2, color: COLORS.muted, fontSize: "0.86rem", borderTop: `1px solid ${COLORS.borderLight}` }}>None.</Typography>}
    </Box>
  );

  const subtitle = isSuperViewer
    ? "Add people by email, choose their role and what they can view, edit and delete. Switch someone off instead of deleting them."
    : "Add Members and choose what they can view and edit — up to your own access. Only a Super Admin can give Delete access.";

  return (
    <>
      <PageHeader
        eyebrow="Team / Admin users"
        title="Admin users"
        subtitle={subtitle}
        actions={
          <Box component="button" type="button" disabled={isAdding} onClick={() => setIsAdding(true)} sx={primaryButtonSx}>
            <UserPlus size={16} /> Add user
          </Box>
        }
      />

      {actionError && <Box role="alert" sx={{ mb: 2.5, px: 2, py: 1.5, borderRadius: "12px", bgcolor: COLORS.redTint, border: `1px solid ${COLORS.redBorder}`, color: COLORS.redDark, fontSize: "0.88rem", fontWeight: 600 }}>{actionError}</Box>}

      {isAdding && (
        <Box sx={{ mb: 2.5, p: { xs: 2, md: 2.5 }, borderRadius: "18px", bgcolor: "#FFFFFF", border: `1px solid ${COLORS.redBorder}` }}>
          <Typography component="h2" sx={{ mb: 2, fontWeight: 800, color: COLORS.ink, fontSize: "1rem" }}>New admin user</Typography>
          <UserForm options={options} viewer={viewer} isNew submitLabel="Add user" initial={{ name: "", email: "", password: "", role: MEMBER, permissions: emptyPermissions() }} onSubmit={addUser} onCancel={() => setIsAdding(false)} />
        </Box>
      )}

      <Box sx={{ display: "grid", gap: 2.5 }}>
        {renderGroup("Active users", "Can sign in and open the sections they have access to.", activeAdmins)}
        {renderGroup("Inactive users", "Can't sign in. Switch them on to give access back.", inactiveAdmins)}
      </Box>
    </>
  );
}
