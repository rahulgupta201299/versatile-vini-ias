/** FALLBACK site config (contact, social, app, footer) — used when GET /site-config is unavailable. */
import { SiteConfig } from "@/types";
import { CONTACT, SOCIAL_LINKS } from "./contact";
import { APP_POINTS, APP_STORE_LINKS } from "./app";

export const SITE_CONFIG: SiteConfig = {
  contact: CONTACT,
  social: SOCIAL_LINKS,
  app: { ...APP_STORE_LINKS, points: APP_POINTS },
  footer: {
    // Filled from GET /footer (admin → Footer) in services/site.ts
    columns: [],
    brandsTitle: "",
    brands: [],
    learningResourcesTitle: "",
    learningResources: [],
  },
};
