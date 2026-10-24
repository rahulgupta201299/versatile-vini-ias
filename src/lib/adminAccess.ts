/**
 * Admin roles (RBAC) — mirrors the backend's src/admin/admins/admin.roles.js (keep both in sync).
 * Every admin section lists the roles that may open it; Super Admin opens everything.
 */
export const ROLE_LABELS = {
  superAdmin: "Super Admin",
  webManager: "Web Manager",
  appManager: "App Manager",
  seoManager: "SEO Manager",
  salesManager: "Sales Manager",
  editor: "Editor",
  hrManager: "HR Manager",
  storeManager: "Store Manager",
} as const;

export type RoleKey = keyof typeof ROLE_LABELS;

export const SUPER_ADMIN: RoleKey = "superAdmin";

/** Who can open each admin section (Super Admin always can). An empty list = Super Admin only. */
export const ACCESS = {
  webDashboard: ["webManager"],
  homepage: ["webManager", "editor"],
  footer: ["webManager", "editor"],
  seo: ["seoManager"],
  sales: ["salesManager"],
  hr: ["hrManager"],
  app: ["appManager"],
  store: ["storeManager"],
  adminUsers: [],
} satisfies Record<string, RoleKey[]>;

export type AccessList = readonly RoleKey[];

/** True when the admin has one of the roles (Super Admin always passes). */
export const hasAccess = (admin: { roles?: string[] } | null | undefined, access: AccessList) => {
  const roles = admin?.roles ?? [];

  return roles.includes(SUPER_ADMIN) || access.some((role) => roles.includes(role));
};

export const roleLabel = (role: string) => ROLE_LABELS[role as RoleKey] ?? role;
