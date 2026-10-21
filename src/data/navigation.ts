import { NavItem, MenuSection } from "@/types";
import { COURSE_SECTIONS, FREE_RESOURCE_BASE, coursePagePath, freeResourcePath, pagePath, TEST_SERIES_URL } from "@/utils/slug";

/** Dropdown item — href defaults to its section page (/<section>/<item>), filled in below NAV_ITEMS. */
const c = (label: string, href = "") => ({ label, href });

export const NAV_ITEMS: NavItem[] = [
  { id: "all-exams", label: "All Exams", href: "/#goals", isMegaMenu: true },
  {
    id: "gs-foundation",
    label: "GS Foundation",
    href: FREE_RESOURCE_BASE,
    // Each item has its own page at /courses/gs-foundation/<resource> (content in data/freeResources.ts)
    children: [
      c("Beginner's Kit For UPSC", freeResourcePath("Beginner's Kit For UPSC")),
      c("NCERT Foundation Batch", freeResourcePath("NCERT Foundation Batch")),
      c("Foundation Batch 2027/29", freeResourcePath("Foundation Batch 2027/29")),
      // External links — open in a new tab (replace with the real URLs)
      c("Test Series (FLT)", TEST_SERIES_URL),
      c("Recorded Batch (₹4,999)", "https://store.viniias.com/recorded-batch"),
    ],
  },
  {
    id: "mentorship",
    label: "Mentorship",
    href: `/courses/${COURSE_SECTIONS.mentorship}`,
    // Pages at /courses/mentorship/<page> (content in data/mentorshipPages.ts); test series is external
    children: [
      c("1:1 Mentorship 2028/29", coursePagePath(COURSE_SECTIONS.mentorship, "1:1 Mentorship 2028/29")),
      c("Free Mentorship Program", coursePagePath(COURSE_SECTIONS.mentorship, "Free Mentorship Program")),
      c("Test Series (FLT)", TEST_SERIES_URL),
    ],
  },
  {
    id: "csat",
    label: "CSAT",
    href: `/courses/${COURSE_SECTIONS.csat}`,
    // Pages at /courses/csat/<page> (content in data/csatPages.ts); test series is external
    children: [
      c("Foundation Batch", coursePagePath(COURSE_SECTIONS.csat, "Foundation Batch")),
      c("CSAT PYQs with Solution", coursePagePath(COURSE_SECTIONS.csat, "CSAT PYQs with Solution")),
      c("CSAT Recorded Batch (₹1,999)", "https://store.viniias.com/csat-recorded-batch"),
      c("Test Series (FLT)", TEST_SERIES_URL),
    ],
  },
  {
    id: "optional",
    label: "Optional",
    href: `/courses/${COURSE_SECTIONS.optional}`,
    // One page template for every subject: /courses/optional/<subject> (content in data/optionalPages.ts)
    children: ["Hindi Literature", "History", "Geography", "PSIR", "Sociology", "Anthropology", "Public Administration", "Philosophy"].map((subject) =>
      c(subject, coursePagePath(COURSE_SECTIONS.optional, subject))
    ),
  },
  {
    id: "gs-mains",
    label: "GS Mains",
    href: `/courses/${COURSE_SECTIONS.gsMains}`,
    // Pages at /courses/gs-mains/<page> (content in data/gsMainsPages.ts); test series is external
    children: [
      c("GS Mains Mentorship", coursePagePath(COURSE_SECTIONS.gsMains, "GS Mains Mentorship")),
      c("GS Mains Foundation", coursePagePath(COURSE_SECTIONS.gsMains, "GS Mains Foundation")),
      c("GS Answer Writing", coursePagePath(COURSE_SECTIONS.gsMains, "GS Answer Writing")),
      c("Free Mains Mentorship", coursePagePath(COURSE_SECTIONS.gsMains, "Free Mains Mentorship")),
      c("Test Series (FLT)", TEST_SERIES_URL),
    ],
  },
  {
    id: "ethics-essay",
    label: "Ethics & Essay",
    href: pagePath("Ethics & Essay"),
    children: [
      // Each item has its own page at /courses/ethics-essay/<page> (content in data/ethicsEssayPages.ts)
      c("Ethics Foundation Batch", coursePagePath(COURSE_SECTIONS.ethicsEssay, "Ethics Foundation Batch")),
      c("Essay Foundation Batch", coursePagePath(COURSE_SECTIONS.ethicsEssay, "Essay Foundation Batch")),
      c("Ethics Answer Writing", coursePagePath(COURSE_SECTIONS.ethicsEssay, "Ethics Answer Writing")),
      // External link — opens in a new tab
      c("Test Series (FLT)", TEST_SERIES_URL),
      c("Free Mentorship", coursePagePath(COURSE_SECTIONS.mentorship, "Free Mentorship Program")),
    ],
  },
  {
    id: "upsc-plan-b",
    label: "UPSC Plan B",
    href: pagePath("UPSC Plan B"),
    // Each item has its own page at /courses/upsc-plan-b/<page> (content in data/planBPages.ts)
    children: [
      c("RBI Grade B Course", coursePagePath(COURSE_SECTIONS.upscPlanB, "RBI Grade B Course")),
      c("NABARD Grade A", coursePagePath(COURSE_SECTIONS.upscPlanB, "NABARD Grade A")),
      c("EPFO APFC", coursePagePath(COURSE_SECTIONS.upscPlanB, "EPFO APFC")),
      c("EPFO EO/AO", coursePagePath(COURSE_SECTIONS.upscPlanB, "EPFO EO/AO")),
      c("Free Mentorship", coursePagePath(COURSE_SECTIONS.mentorship, "Free Mentorship Program")),
    ],
  },
  {
    id: "offline-centre",
    label: "Offline Centre",
    href: "/#enquiry",
    children: ["Noida", "Old Rajinder Nagar", "Delhi", "Patna", "Gaya Ji", "Darbhanga", "Bhagalpur"].map((city) => c(city, "/#enquiry")),
  },
  { id: "test-series", label: "Test Series", href: TEST_SERIES_URL }, // external — opens in a new tab
].map((item) => ({
  ...item,
  children: item.children?.map((child) => ({ ...child, href: child.href || `${item.href}/${pagePath(child.label).slice(1)}` })),
}));

/** Mobile slide-menu sections (2-column tiles), in display order. */
export const MOBILE_MENU_SECTIONS: MenuSection[] = [
  {
    id: "free-resources",
    title: "Free Resources",
    items: [
      { label: "GS Foundation", href: "/#courses", icon: "Landmark", dropdownId: "gs-foundation" },
      { label: "GS Mains", href: "/#courses", icon: "PenLine", dropdownId: "gs-mains" },
      { label: "Mentorship", href: "/#mentorship", icon: "Users", dropdownId: "mentorship" },
      { label: "Ethics", href: "/#courses", icon: "Scale", dropdownId: "ethics-essay" },
      { label: "CSAT", href: "/#courses", icon: "Calculator", dropdownId: "csat" },
      { label: "Essay", href: "/#courses", icon: "FileText", dropdownId: "ethics-essay" },
      { label: "Optional", href: "/#courses", icon: "BookOpen", dropdownId: "optional" },
      { label: "UPSC Plan B", href: "/#courses", icon: "CalendarCheck", dropdownId: "upsc-plan-b" },
    ],
  },
  {
    id: "study-material",
    title: "Study Material",
    items: [
      { label: "Prelims", href: "/#resources", icon: "FileText" },
      { label: "प्रारंभिक परीक्षा", href: "/#resources", icon: "FileText" },
      { label: "Mains", href: "/#resources", icon: "Folder" },
      { label: "मुख्य परीक्षा", href: "/#resources", icon: "Folder" },
      { label: "Current Affairs", href: coursePagePath(COURSE_SECTIONS.freeResources, "Current Affairs"), icon: "Newspaper" },
      { label: "करेंट अफेयर्स", href: coursePagePath(COURSE_SECTIONS.freeResources, "Current Affairs"), icon: "Newspaper" },
      { label: "Vini Specials", href: "/#resources", icon: "Sparkles" },
      { label: "विनी स्पेशल्स", href: "/#resources", icon: "Sparkles" },
      { label: "Free Downloads", href: "/#resources", icon: "Download" },
      { label: "डाउनलोड्स", href: "/#resources", icon: "Download" },
      { label: "Ethics", href: "/#resources", icon: "Scale" },
      { label: "वीडियो सेक्शन", href: "/#resources", icon: "PlaySquare" },
      { label: "Videos", href: "/#resources", icon: "PlaySquare" },
      { label: "सिविल सेवा परीक्षा", href: "/#resources", icon: "Landmark" },
    ],
  },
  {
    id: "featured",
    title: "Featured",
    items: [
      { label: "News", href: "/#resources", icon: "Newspaper" },
      { label: "Trend", href: "/#resources", icon: "TrendingUp" },
      { label: "Books", href: "/#resources", icon: "Book" },
      { label: "Magazine", href: "/#resources", icon: "BookOpen" },
      { label: "Test Series", href: TEST_SERIES_URL, icon: "ClipboardCheck" },
      { label: "Toppers Copies", href: "/#resources", icon: "FileCheck" },
      { label: "Blogs Articles", href: "/#resources", icon: "Lightbulb" },
      { label: "Vini Publication", href: "/#resources", icon: "BookMarked" },
      { label: "Offline Centre", href: "/#enquiry", icon: "MapPin", dropdownId: "offline-centre" },
    ],
  },
];


export const SEARCH_TRENDING = ["UPSC CSE", "BPSC", "State PSC", "SSC", "CSAT", "Ethics & Essay"];

/** Store link used by the header "Store" button and the mobile menu. */
export const STORE_HREF = "/#market-ad";
