/**
 * Web dashboard — static sample data. Replace each export with a backend call
 * (e.g. GET /admin/web/dashboard) once analytics and leads are stored in MongoDB.
 */

export const STATS = [
  { key: "visitors", label: "Website visitors", value: "48,920", change: 12.4 },
  { key: "leads", label: "Leads & enquiries", value: "1,284", change: 8.1 },
  { key: "enrolments", label: "Course enrolments", value: "312", change: 5.6 },
  { key: "callbacks", label: "Callback requests", value: "196", change: -3.2 },
] as const;

export const WEEKLY_TRAFFIC = [
  { day: "Mon", visitors: 1420 },
  { day: "Tue", visitors: 1735 },
  { day: "Wed", visitors: 1610 },
  { day: "Thu", visitors: 2080 },
  { day: "Fri", visitors: 1890 },
  { day: "Sat", visitors: 2310 },
  { day: "Sun", visitors: 2145 },
];

export const LEAD_SOURCES = [
  { label: "Enquiry form", value: 482 },
  { label: "Counselling form", value: 356 },
  { label: "Call-back requests", value: 196 },
  { label: "Free resource downloads", value: 250 },
];

export const TOP_PAGES = [
  { path: "/", title: "Homepage", views: 18240, change: 9.2 },
  { path: "/goal/upsc", title: "UPSC goal page", views: 7615, change: 14.8 },
  { path: "/goal/bpsc", title: "BPSC goal page", views: 6120, change: 6.3 },
  { path: "/exams", title: "Current affairs & articles", views: 5480, change: 21.5 },
  { path: "/live-ethics-foundation-batch-2027", title: "Ethics Foundation 2027", views: 2935, change: -2.1 },
];

export const RECENT_ENQUIRIES = [
  { name: "Aman K.", course: "UPSC Foundation", source: "Enquiry form", time: "12 min ago", status: "New" },
  { name: "Priya S.", course: "71st BPSC Foundation", source: "Counselling form", time: "48 min ago", status: "New" },
  { name: "Rohit M.", course: "Ethics & Essay", source: "Call-back", time: "2 h ago", status: "Contacted" },
  { name: "Neha R.", course: "UPSC Mentorship", source: "Enquiry form", time: "5 h ago", status: "Contacted" },
  { name: "Vikash T.", course: "Foundation Plus", source: "Free resource", time: "Yesterday", status: "Enrolled" },
] as const;

export const CONTENT_STATUS = [
  { label: "Homepage sections", value: "10", note: "live on viniias.com" },
  { label: "Blog articles", value: "128", note: "published" },
  { label: "Active banners", value: "7", note: "hero + promo" },
  { label: "Open job roles", value: "4", note: "careers page" },
];
