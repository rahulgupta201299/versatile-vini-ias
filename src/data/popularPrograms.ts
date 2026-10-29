/**
 * Homepage → "Explore our most popular programs" (below Free Resources), one tab per track.
 * SAMPLE content until these programs are added to the backend / admin.
 */
export type ProgramIcon = "MessageCircle" | "Mic" | "Briefcase" | "BarChart3" | "Megaphone" | "Monitor";

export interface PopularProgram {
  provider: string;
  title: string;
  location: string;
  mode: string;
  dates: string;
  icon: ProgramIcon;
  /** Cover gradient: from → to */
  colors: [string, string];
  viewHref: string;
  applyHref: string;
}

export interface ProgramTrack {
  id: string;
  label: string;
  programs: PopularProgram[];
}

const ENQUIRY = "/#enquiry";

export const PROGRAM_TRACKS: ProgramTrack[] = [
  {
    id: "spoken-english",
    label: "Spoken English",
    programs: [
      { provider: "VINI Spoken English", title: "Spoken English Foundation for Beginners", location: "Live Online", mode: "Live Online Classes", dates: "Starts 16th Nov 2026", icon: "MessageCircle", colors: ["#FE0034", "#FF7A59"], viewHref: ENQUIRY, applyHref: ENQUIRY },
      { provider: "VINI Spoken English", title: "Interview & Personality Communication", location: "Patna Centre", mode: "In person Workshop", dates: "5th - 7th Dec 2026", icon: "Mic", colors: ["#13294B", "#3B5B8F"], viewHref: ENQUIRY, applyHref: ENQUIRY },
      { provider: "VINI Spoken English", title: "Business English & Workplace Communication", location: "Noida Centre", mode: "Weekend Batch", dates: "Starts 22nd Nov 2026", icon: "Briefcase", colors: ["#7C3AED", "#C084FC"], viewHref: ENQUIRY, applyHref: ENQUIRY },
    ],
  },
  {
    id: "skills",
    label: "Skills",
    programs: [
      { provider: "VINI Skills", title: "Data Analytics with Excel & Power BI", location: "Live Online", mode: "Live Online Classes", dates: "Starts 1st Dec 2026", icon: "BarChart3", colors: ["#0F766E", "#2DD4BF"], viewHref: ENQUIRY, applyHref: ENQUIRY },
      { provider: "VINI Skills", title: "Digital Marketing Certification Program", location: "Patna Centre", mode: "In person Classes", dates: "Starts 8th Dec 2026", icon: "Megaphone", colors: ["#EA580C", "#FBBF24"], viewHref: ENQUIRY, applyHref: ENQUIRY },
      { provider: "VINI Skills", title: "Computer Course for Government Exams (CCC)", location: "Darbhanga Centre", mode: "In person Classes", dates: "Starts 15th Dec 2026", icon: "Monitor", colors: ["#2563EB", "#60A5FA"], viewHref: ENQUIRY, applyHref: ENQUIRY },
    ],
  },
];

/** Homepage → "Find us in your neighborhood" (below Impact). */
export const OFFLINE_CENTRE = {
  eyebrow: "Find us in your neighborhood",
  title: "Build Job Ready Skills at a",
  highlight: "VINI Offline Centre",
  image: { src: "/images/centres/vini-offline-experience-centre.webp", alt: "VINI IAS Offline Experience Centre storefront" },
  points: ["100% classroom-based learning experience", "Spoken English, Computer & Digital skills with UPSC preparation", "Career guidance and hands-on projects"],
  exploreHref: "/contact-us",
  callbackHref: ENQUIRY,
};
