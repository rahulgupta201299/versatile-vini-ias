import { BarChart3, BookOpen, Contact, GraduationCap, Handshake, Globe, Home, LayoutDashboard, PanelBottom, PanelTop, Search, ShoppingBag, Smartphone, UserCog, Users, type LucideIcon } from "lucide-react";
import { can, canManageUsers, type AccessViewer, type SectionKey } from "@/lib/adminAccess";

/**
 * Admin navigation. Three workspaces (switcher at the top of the sidebar) plus team settings.
 * Every item names the sections it belongs to — admins only see items they can view (any of them).
 * A group (e.g. Courses) has children instead: it opens to show them, and its address is the start of theirs.
 */
export type AdminWorkspace = "web" | "app" | "store";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; exact?: boolean; sections: SectionKey[]; children?: AdminNavItem[] };

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
      {
        label: "Courses",
        href: "/admin/web/courses",
        icon: BookOpen,
        sections: ["gsFoundation", "mentorship"],
        children: [
          { label: "GS Foundation", href: "/admin/web/courses/gs-foundation", icon: GraduationCap, sections: ["gsFoundation"] },
          { label: "Mentorship", href: "/admin/web/courses/mentorship", icon: Handshake, sections: ["mentorship"] },
        ],
      },
      { label: "Contact Info", href: "/admin/web/contact", icon: Contact, sections: ["contact"] },
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

const canOpen = (admin: Viewer, { sections }: Pick<AdminNavItem, "sections">) => sections.some((section) => can(admin, section, "view"));

/** The workspace items this admin can open (view access to any of its sections); groups keep only those children, and drop out when none are left. */
export const visibleNav = (admin: Viewer, workspace: AdminWorkspace): AdminNavItem[] =>
  WORKSPACES[workspace].nav
    .filter((item) => canOpen(admin, item))
    .map((item) => (item.children ? { ...item, children: item.children.filter((child) => canOpen(admin, child)) } : item))
    .filter(({ children }) => !children || children.length);

/** Where an item opens: its own page, or a group's first child. */
export const entryHref = ({ href, children }: Pick<AdminNavItem, "href" | "children">) => (children ? children[0].href : href);

/** Every page of a menu, with the group it sits in (for the breadcrumb). */
export const flattenNav = (items: Omit<AdminNavItem, "sections">[]) =>
  items.flatMap((item) => (item.children ? item.children.map((child) => ({ ...child, group: item.label })) : [{ ...item, group: "" }]));

/** Workspaces with at least one item this admin can open. */
export const visibleWorkspaces = (admin: Viewer) => WORKSPACE_KEYS.filter((key) => visibleNav(admin, key).length);

export const visibleTeamNav = (admin: Viewer) => (canManageUsers(admin) ? TEAM_NAV : []);

/** Where to send an admin who opens /admin: the first page they can open. */
export const firstAllowedPath = (admin: Viewer) => {
  const [firstWorkspace] = visibleWorkspaces(admin);

  if (firstWorkspace) return entryHref(visibleNav(admin, firstWorkspace)[0]);

  return visibleTeamNav(admin)[0]?.href || null;
};

export const workspaceFromPath = (pathname: string): AdminWorkspace | null =>
  WORKSPACE_KEYS.find((key) => pathname === `/admin/${key}` || pathname.startsWith(`/admin/${key}/`)) || null;

export const isActive = (pathname: string, item: Pick<AdminNavItem, "href" | "exact">) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
