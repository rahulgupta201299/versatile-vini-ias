/**
 * Site config built in the website: social links and app links (contact comes from GET /site-config,
 * footer from GET /footer — see services/site.ts).
 */
import { SiteConfig } from "@/types";
import { SOCIAL_LINKS } from "./contact";
import { APP_POINTS, APP_STORE_LINKS } from "./app";

export const SITE_CONFIG: SiteConfig = {
  // Filled from GET /site-config (admin → Contact Info) in services/site.ts
  contact: { phoneDisplay: "", tel: "", whatsappUrl: "", email: "", website: { label: "", href: "" } },
  social: SOCIAL_LINKS,
  app: { ...APP_STORE_LINKS, points: APP_POINTS },
  footer: {
    // Filled from GET /footer (admin → Footer) in services/site.ts
    columns: [],
    brandsTitle: "",
    brands: [],
    learningResourcesTitle: "",
    learningResources: [],
    importantExamsTitle: "",
    importantExams: [],
  },
};
