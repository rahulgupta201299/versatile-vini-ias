export type ErrorVariant = "error" | "notFound";

/** Shared wording for every error screen (site, VINI AI and the root fallback). */
export const ERROR_COPY: Record<ErrorVariant, { badge: string; title: string; message: string }> = {
  error: {
    badge: "Oops!",
    title: "Something went wrong",
    message: "We couldn't load this page right now. Like any good revision, a second attempt usually does it — please try again.",
  },
  notFound: {
    badge: "404",
    title: "This page isn't on the syllabus",
    message: "The page you're looking for doesn't exist or has moved. Pick up your preparation from one of the links below.",
  },
};

export const HELPFUL_LINKS = [
  { label: "All Exams", href: "/exams" },
  { label: "Courses", href: "/#courses" },
  { label: "About Us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];
