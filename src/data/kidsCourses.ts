/**
 * Homepage → "Courses for kids" cards (below Select Your Goal).
 * Local content for now; it moves to the backend when this section gets an admin.
 */
export type KidsCourseArt = "spokenEnglish" | "english" | "math" | "coding";

export interface KidsCourse {
  classes: string;
  title: string;
  text: string;
  href: string;
  art: KidsCourseArt;
}

/** Shown next to the heading. */
export const KIDS_CLASS_RANGE = "LKG - Class 8";

export const KIDS_COURSES: KidsCourse[] = [
  { classes: "Class LKG - 8", title: "Spoken English Program", text: "Master fluency in English speaking", href: "/#enquiry", art: "spokenEnglish" },
  { classes: "Class LKG - 8", title: "Learn English", text: "Level based holistic English Program", href: "/#enquiry", art: "english" },
  { classes: "Class KG - 8", title: "Learn math", text: "Turn your child into a Math wizard", href: "/#enquiry", art: "math" },
  { classes: "Class 1 - 8", title: "Coding classes", text: "Learn to build apps and games, be future ready", href: "/#enquiry", art: "coding" },
];
