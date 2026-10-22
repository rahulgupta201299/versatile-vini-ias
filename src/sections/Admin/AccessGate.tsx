import React from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/adminAuth";
import { hasAccess, roleLabel, type AccessList } from "@/lib/adminAccess";
import AdminErrorState from "./AdminErrorState";

/**
 * Server-side check for an admin section: renders the section only for admins with one of the roles
 * (Super Admin always). Others see a "no access" message — the backend refuses their requests too.
 */
export default async function AccessGate({ access, children }: { access: AccessList; children: React.ReactNode }) {
  const admin = await getAdminSession();

  if (!admin) redirect("/admin/login");

  if (!hasAccess(admin, access)) {
    const needed = access.length ? access.map(roleLabel).join(" or ") : "Super Admin";

    return (
      <AdminErrorState
        variant="no-access"
        title="You don't have access to this section"
        message={`This section is for ${needed}. Ask a Super Admin if you need access.`}
        backHref="/admin"
        backLabel="Go to my sections"
      />
    );
  }

  return <>{children}</>;
}
