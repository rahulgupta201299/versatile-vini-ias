import { BarChart3, Globe, Home, LayoutDashboard, PanelBottom, Search, ShoppingBag, Smartphone, UserCog, Users, type LucideIcon } from "lucide-react";
import { ACCESS, hasAccess, type AccessList } from "@/lib/adminAccess";

/**
 * Admin navigation. Three workspaces (switcher at the top of the sidebar) plus team settings.
 * Every item lists the roles that can open it — admins only see what they can open.
 */
export type AdminWorkspace = "web" | "app" | "store";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; exact?: boolean; access: AccessList };

type Workspace = { label: string; description: string; icon: LucideIcon; nav: AdminNavItem[] };

export const WORKSPACES: Record<AdminWorkspace, Workspace> = {
  web: {
    label: "Web",
    description: "viniias.com website",
    icon: Globe,
    nav: [
      { label: "Dashboard", href: "/admin/web", icon: LayoutDashboard, exact: true, access: ACCESS.webDashboard },
      { label: "Homepage", href: "/admin/web/homepage", icon: Home, access: ACCESS.homepage },
      { label: "Footer", href: "/admin/web/footer", icon: PanelBottom, access: ACCESS.footer },
      { label: "SEO", href: "/admin/web/seo", icon: Search, access: ACCESS.seo },
      { label: "Sales", href: "/admin/web/sales", icon: BarChart3, access: ACCESS.sales },
      { label: "HR & Careers", href: "/admin/web/hr", icon: Users, access: ACCESS.hr },
    ],
  },
  app: {
    label: "App",
    description: "VINI mobile app",
    icon: Smartphone,
    nav: [{ label: "Dashboard", href: "/admin/app", icon: LayoutDashboard, exact: true, access: ACCESS.app }],
  },
  store: {
    label: "Store",
    description: "Books & study material store",
    icon: ShoppingBag,
    nav: [{ label: "Dashboard", href: "/admin/store", icon: LayoutDashboard, exact: true, access: ACCESS.store }],
  },
};

/** Settings that aren't part of a workspace. */
export const TEAM_NAV: AdminNavItem[] = [{ label: "Admin users", href: "/admin/users", icon: UserCog, access: ACCESS.adminUsers }];

export const WORKSPACE_KEYS = Object.keys(WORKSPACES) as AdminWorkspace[];

type Viewer = { roles?: string[] } | null | undefined;

/** The workspace items this admin can open. */
export const visibleNav = (admin: Viewer, workspace: AdminWorkspace) => WORKSPACES[workspace].nav.filter((item) => hasAccess(admin, item.access));

/** Workspaces with at least one item this admin can open. */
export const visibleWorkspaces = (admin: Viewer) => WORKSPACE_KEYS.filter((key) => visibleNav(admin, key).length);

export const visibleTeamNav = (admin: Viewer) => TEAM_NAV.filter((item) => hasAccess(admin, item.access));

/** Where to send an admin who opens /admin: the first page they can open. */
export const firstAllowedPath = (admin: Viewer) => {
  const [firstWorkspace] = visibleWorkspaces(admin);

  if (firstWorkspace) return visibleNav(admin, firstWorkspace)[0].href;

  return visibleTeamNav(admin)[0]?.href ?? null;
};

export const workspaceFromPath = (pathname: string): AdminWorkspace | null =>
  WORKSPACE_KEYS.find((key) => pathname === `/admin/${key}` || pathname.startsWith(`/admin/${key}/`)) ?? null;

export const isActive = (pathname: string, item: AdminNavItem) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
