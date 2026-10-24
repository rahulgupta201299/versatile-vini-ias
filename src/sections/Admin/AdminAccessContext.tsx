"use client";

import React, { createContext, useContext } from "react";
import { can, type AccessViewer, type SectionKey } from "@/lib/adminAccess";

/** The signed-in admin's role and permissions, for client components (set by AdminShell). */
const AdminAccessContext = createContext<AccessViewer>(null);

export function AdminAccessProvider({ admin, children }: { admin: AccessViewer; children: React.ReactNode }) {
  return <AdminAccessContext.Provider value={admin}>{children}</AdminAccessContext.Provider>;
}

export const useAdminViewer = () => useContext(AdminAccessContext);

/** What the signed-in admin may do in a section. The backend checks every request too. */
export function useSectionAccess(section: SectionKey) {
  const viewer = useContext(AdminAccessContext);

  return {
    canView: can(viewer, section, "view"),
    canEdit: can(viewer, section, "edit"),
    canDelete: can(viewer, section, "delete"),
  };
}
