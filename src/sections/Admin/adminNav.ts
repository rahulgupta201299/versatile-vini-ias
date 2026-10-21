import { Globe, Home, LayoutDashboard, Smartphone, type LucideIcon } from "lucide-react";

/** Admin workspaces. Each one has its own sidebar menu; the switcher at the top of the sidebar moves between them. */
export type AdminWorkspace = "web" | "app";

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; exact?: boolean };

export const WORKSPACES: Record<AdminWorkspace, { label: string; description: string; icon: LucideIcon; home: string; nav: AdminNavItem[] }> = {
  web: {
    label: "Web",
    description: "viniias.com website",
    icon: Globe,
    home: "/admin/web",
    nav: [
      { label: "Dashboard", href: "/admin/web", icon: LayoutDashboard, exact: true },
      { label: "Homepage", href: "/admin/web/homepage", icon: Home },
    ],
  },
  app: {
    label: "App",
    description: "VINI mobile app",
    icon: Smartphone,
    home: "/admin/app",
    nav: [{ label: "Dashboard", href: "/admin/app", icon: LayoutDashboard, exact: true }],
  },
};

export const workspaceFromPath = (pathname: string): AdminWorkspace => (pathname.startsWith("/admin/app") ? "app" : "web");

export const isActive = (pathname: string, item: AdminNavItem) =>
  item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
