import { ResourceItem } from "@/types";

import { COLORS } from "@/theme/colors";
export const FREE_RESOURCES: ResourceItem[] = [
  {
    id: "current-affairs",
    title: "Current Affairs",
    subtitle: "Daily Hindu & PIB Analysis",
    icon: "Newspaper",
    bgColor: "#E0F2FE", // Soft Cyan / Blue circle
    iconColor: "#0284C7",
    borderColor: "#BAE6FD",
    href: "/#resources",
  },
  {
    id: "blogs",
    title: "Blogs",
    subtitle: "Strategy & Toppers Insights",
    icon: "BookOpen",
    bgColor: "#DBEAFE", // Soft Blue circle
    iconColor: "#2563EB",
    borderColor: "#BFDBFE",
    href: "#blogs",
  },
  {
    id: "pyqs",
    title: "PYQs",
    subtitle: "Solved Past 15 Year Papers",
    icon: "FileCheck",
    bgColor: "#F3E8FF", // Soft Purple circle
    iconColor: "#9333EA",
    borderColor: "#E9D5FF",
    href: "/#resources",
  },
  {
    id: "notes",
    title: "Notes",
    subtitle: "Class & Mindmap Notes",
    icon: "BookMarked",
    bgColor: "#CCFBF1", // Soft Mint circle
    iconColor: "#0D9488",
    borderColor: "#99F6E4",
    href: "/#resources",
  },
  {
    id: "test-series",
    title: "Test Series",
    subtitle: "All-India Mock Simulation",
    icon: "FileSpreadsheet",
    bgColor: "#FFE4E6", // Soft Rose circle
    iconColor: "#E11D48",
    borderColor: "#FECDD3",
    href: "/#courses",
  },
  {
    id: "free-batches",
    title: "Free Batches",
    subtitle: "NCERT & Foundation Concepts",
    icon: "CalendarCheck",
    bgColor: "#E0F2FE", // Soft Sky circle
    iconColor: "#0284C7",
    borderColor: "#BAE6FD",
    href: "/#courses",
  },
  {
    id: "topper-copy",
    title: "Topper Copy",
    subtitle: "Evaluated GS & Essay Copies",
    icon: "Star",
    bgColor: "#FEF3C7", // Soft Gold / Amber circle
    iconColor: "#D97706",
    borderColor: "#FDE68A",
    href: "/#rankers",
  },
  {
    id: "ncert-books",
    title: "NCERT Books",
    subtitle: "Class 6-12 Summaries & Crux",
    icon: "Library",
    bgColor: "#E0E7FF", // Soft Indigo circle
    iconColor: "#4F46E5",
    borderColor: "#C7D2FE",
    href: "/#resources",
  },
  {
    id: "our-selections",
    title: "Our Selections",
    subtitle: "1000+ Achievers Hall of Fame",
    icon: "Users",
    bgColor: "#DCFCE7", // Soft Green circle
    iconColor: COLORS.success,
    borderColor: "#BBF7D0",
    href: "/#rankers",
  },
  {
    id: "paid-batches",
    title: "Paid Batches",
    subtitle: "Targeted Classroom Programs",
    icon: "PlaySquare",
    bgColor: "#FCE7F3", // Soft Pink / Rose circle
    iconColor: "#E11D48",
    borderColor: "#FBCFE8",
    href: "/#courses",
  },
];
