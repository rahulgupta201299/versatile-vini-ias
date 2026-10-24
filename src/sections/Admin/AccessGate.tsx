import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { can, canManageUsers, SECTIONS, type SectionKey } from "@/lib/adminAccess";
import AdminErrorState from "./AdminErrorState";

type AccessGateProps = {
  /** View access to any of these sections lets the admin in. */
  sections?: SectionKey[];
  /** Admin users screen: Super Admins and Admins. */
  users?: boolean;
  children: React.ReactNode;
};

/**
 * Server-side check for an admin section: renders it only for admins who may view it (Super Admin always).
 * Others see a "no access" message — the backend refuses their requests too.
 */
export default async function AccessGate({ sections = [], users = false, children }: AccessGateProps) {
  const admin = await getAdminSession();

  if (!admin) redirect("/admin/login");

  const isAllowed = users ? canManageUsers(admin) : sections.some((section) => can(admin, section, "view"));

  if (isAllowed) return <>{children}</>;

  const names = sections.map((section) => SECTIONS[section].label).join(" or ");
  const message = users ? "Only Super Admins and Admins manage users." : `You need View access to ${names}. Ask a Super Admin or Admin if you need it.`;

  return <AdminErrorState variant="no-access" title="You don't have access to this section" message={message} backHref="/admin" backLabel="Go to my sections" />;
}
