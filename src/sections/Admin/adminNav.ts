import { BarChart3, Globe, Home, LayoutDashboard, PanelBottom, PanelTop, Search, ShoppingBag, Smartphone, UserCog, Users, type LucideIcon } from "lucide-react";
import { can, canManageUsers, type AccessViewer, type SectionKey } from "@/lib/adminAccess";

/**
 * Admin navigation. Three workspaces (switcher at the top of the sidebar) plus team settings.
 * Every item names the sections it belongs to — admins only see items they can view (any of them).
 */
export type AdminWorkspace = "web" | "app" | "store";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; exact?: boolean; sections: SectionKey[] };

type Workspace = { label: string; description: string; icon: LucideIcon; nav: AdminNavItem[] };

export const WORKSPACES: Record<AdminWorkspace, Workspace> = {
  web: {
    label: "Web",
    description: "viniias.com website",
    icon: Globe,
    nav: [
      { label: "Dashboard", href: "/admin/web", icon: LayoutDashboard, exact: true, sections: ["webDashboard"] },
      // Homepage also holds All Exams
      { label: "Homepage", href: "/admin/web/homepage", icon: Home, sections: ["homepage", "allExams"] },
      { label: "Header & Menu", href: "/admin/web/header", icon: PanelTop, sections: ["header"] },
      { label: "Footer", href: "/admin/web/footer", icon: PanelBottom, sections: ["footer"] },
      { label: "SEO", href: "/admin/web/seo", icon: Search, sections: ["seo"] },
      { label: "Sales", href: "/admin/web/sales", icon: BarChart3, sections: ["sales"] },
      { label: "HR & Careers", href: "/admin/web/hr", icon: Users, sections: ["hr"] },
    ],
  },
  app: {
    label: "App",
    description: "VINI mobile app",
    icon: Smartphone,
    nav: [{ label: "Dashboard", href: "/admin/app", icon: LayoutDashboard, exact: true, sections: ["app"] }],
  },
  store: {
    label: "Store",
    description: "Books & study material store",
    icon: ShoppingBag,
    nav: [{ label: "Dashboard", href: "/admin/store", icon: LayoutDashboard, exact: true, sections: ["store"] }],
  },
};

/** Team settings — Super Admins and Admins. */
export const TEAM_NAV: Omit<AdminNavItem, "sections">[] = [{ label: "Admin users", href: "/admin/users", icon: UserCog }];

export const WORKSPACE_KEYS = Object.keys(WORKSPACES) as AdminWorkspace[];

type Viewer = AccessViewer;

/** The workspace items this admin can open (view access to any of its sections). */
export const visibleNav = (admin: Viewer, workspace: AdminWorkspace) =>
  WORKSPACES[workspace].nav.filter(({ sections }) => sections.some((section) => can(admin, section, "view")));

/** Workspaces with at least one item this admin can open. */
export const visibleWorkspaces = (admin: Viewer) => WORKSPACE_KEYS.filter((key) => visibleNav(admin, key).length);

export const visibleTeamNav = (admin: Viewer) => (canManageUsers(admin) ? TEAM_NAV : []);

/** Where to send an admin who opens /admin: the first page they can open. */
export const firstAllowedPath = (admin: Viewer) => {
  const [firstWorkspace] = visibleWorkspaces(admin);

  if (firstWorkspace) return visibleNav(admin, firstWorkspace)[0].href;

  return visibleTeamNav(admin)[0]?.href ?? null;
};

export const workspaceFromPath = (pathname: string): AdminWorkspace | null =>
  WORKSPACE_KEYS.find((key) => pathname === `/admin/${key}` || pathname.startsWith(`/admin/${key}/`)) ?? null;

export const isActive = (pathname: string, item: Pick<AdminNavItem, "href" | "exact">) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
