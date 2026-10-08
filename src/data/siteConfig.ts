/** FALLBACK site config (contact, social, app, footer) — used when GET /site-config is unavailable. */
import { SiteConfig } from "@/types";
import { CONTACT, SOCIAL_LINKS } from "./contact";
import { APP_POINTS, APP_STORE_LINKS } from "./app";
import { COMPANY_LINKS, FREE_LEARNING_RESOURCES, OUR_BRANDS, OUR_PRODUCTS, QUICK_LINKS, UPCOMING_CENTRES } from "./footerData";

export const SITE_CONFIG: SiteConfig = {
  contact: CONTACT,
  social: SOCIAL_LINKS,
  app: { ...APP_STORE_LINKS, points: APP_POINTS },
  footer: {
    companyLinks: COMPANY_LINKS,
    upcomingCentres: UPCOMING_CENTRES,
    quickLinks: QUICK_LINKS,
    products: OUR_PRODUCTS,
    brands: OUR_BRANDS,
    learningResources: FREE_LEARNING_RESOURCES,
  },
};
