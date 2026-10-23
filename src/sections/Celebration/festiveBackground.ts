import { CelebrationTheme } from "@/types";

/** The festive background: the banner colour with two soft accent glows, fading to white at the bottom. */
export const festiveBackground = ({ accentColor, background }: CelebrationTheme, fadeAt = "92%") =>
  `radial-gradient(circle at 12% 12%, ${accentColor}1F, transparent 38%), radial-gradient(circle at 88% 8%, ${accentColor}1A, transparent 36%), linear-gradient(180deg, ${background} 0%, ${background} 45%, #FFFFFF ${fadeAt})`;
