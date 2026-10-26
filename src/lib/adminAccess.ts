/**
 * Admin access (RBAC) — mirrors the backend's src/config/permissions.js (keep both in sync).
 * Every admin has a role and, unless Super Admin, a permission per section: level none / view / edit
 * (edit includes view) and `canDelete` (delete items for good — needs edit).
 *   superAdmin → everything, manages every user, the only one who gives Delete access
 *   admin      → its own sections, plus manages Members
 *   member     → its own sections
 */
export const ROLE_LABELS = { superAdmin: "Super Admin", admin: "Admin", member: "Member" } as const;

export type RoleKey = keyof typeof ROLE_LABELS;

export const SUPER_ADMIN: RoleKey = "superAdmin";
export const ADMIN: RoleKey = "admin";
export const MEMBER: RoleKey = "member";

/** Admin panel sections. `deletable: false` → nothing in it can be deleted (only edited). */
export const SECTIONS = {
  webDashboard: { label: "Web dashboard", workspace: "Web", deletable: false },
  homepage: { label: "Homepage", workspace: "Web", deletable: true },
  allExams: { label: "All Exams", workspace: "Web", deletable: true },
  header: { label: "Header & Menu", workspace: "Web", deletable: false },
  footer: { label: "Footer", workspace: "Web", deletable: true },
  seo: { label: "SEO", workspace: "Web", deletable: true },
  sales: { label: "Sales", workspace: "Web", deletable: true },
  hr: { label: "HR & Careers", workspace: "Web", deletable: true },
  app: { label: "App", workspace: "App", deletable: true },
  store: { label: "Store", workspace: "Store", deletable: true },
} as const;

export type SectionKey = keyof typeof SECTIONS;
export const SECTION_KEYS = Object.keys(SECTIONS) as SectionKey[];

export type Level = "none" | "view" | "edit";
export type Action = "view" | "edit" | "delete";
export type SectionPermission = { level: Level; canDelete: boolean };
export type Permissions = Record<SectionKey, SectionPermission>;

const LEVEL_RANK: Record<Level, number> = { none: 0, view: 1, edit: 2 };

/** Who is asking: the signed-in admin (from /admin/auth/me). `roles` only on old demo sessions. */
export type AccessViewer = { role?: string; permissions?: Partial<Permissions>; roles?: string[] } | null | undefined;

export const emptyPermissions = (): Permissions =>
  Object.fromEntries(SECTION_KEYS.map((section) => [section, { level: "none", canDelete: false }])) as Permissions;

/** The viewer's role ("member" when unknown — Super Admin only when the server says so). */
export const roleOf = (viewer: AccessViewer): RoleKey => {
  const { role = "", roles = [] } = viewer || {};

  if (role in ROLE_LABELS) return role as RoleKey;
  if (roles.includes(SUPER_ADMIN)) return SUPER_ADMIN;

  return MEMBER;
};

/** True when the viewer may do `action` in `section`. Super Admin always may. */
export const can = (viewer: AccessViewer, section: SectionKey, action: Action = "view") => {
  if (!viewer) return false;
  if (roleOf(viewer) === SUPER_ADMIN) return true;

  const { level = "none", canDelete = false } = viewer.permissions?.[section] || {};

  if (action === "delete") return level === "edit" && canDelete && SECTIONS[section].deletable;

  return LEVEL_RANK[level] >= LEVEL_RANK[action];
};

/** True when `level` is no higher than `limit`. */
export const isLevelWithin = (level: Level, limit: Level) => LEVEL_RANK[level] <= LEVEL_RANK[limit];

/** Super Admins and Admins manage users (Admins only Members). */
export const canManageUsers = (viewer: AccessViewer) => ([SUPER_ADMIN, ADMIN] as RoleKey[]).includes(roleOf(viewer));

export const roleLabel = (role: string) => ROLE_LABELS[role as RoleKey] || role;
