import React from "react";
import {
  Atom,
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  ClipboardCheck,
  Code,
  Compass,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Landmark,
  Library,
  Lightbulb,
  Map,
  Medal,
  PenLine,
  Book,
  Download,
  Folder,
  MapPin,
  Newspaper,
  Palette,
  PlaySquare,
  Scale,
  School,
  Shield,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  TrainTrack,
  TrendingUp,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";

/**
 * Only the icons referenced by name in /src/data are imported here.
 * (Importing `* as Icons` pulled the entire lucide library into the bundle.)
 * Add an icon to this map when a new name is used in the data files.
 */
const ICONS: Record<string, LucideIcon> = {
  Atom,
  Award,
  BookMarked,
  BookOpen,
  Briefcase,
  Building2,
  Calculator,
  CalendarCheck,
  ClipboardCheck,
  Code,
  Compass,
  FileCheck,
  FileSpreadsheet,
  FileText,
  Globe,
  GraduationCap,
  HardHat,
  HeartPulse,
  Landmark,
  Library,
  Lightbulb,
  Map,
  Medal,
  PenLine,
  Book,
  Download,
  Folder,
  MapPin,
  Newspaper,
  Palette,
  PlaySquare,
  Scale,
  School,
  Shield,
  Smile,
  Sparkles,
  Star,
  Stethoscope,
  TrainTrack,
  TrendingUp,
  Trophy,
  Users,
};

interface IconRendererProps {
  name: string;
  size?: number;
  color?: string;
}

export default function IconRenderer({ name, size = 22, color = "currentColor" }: IconRendererProps) {
  const Component = ICONS[name] ?? BookOpen;
  return <Component size={size} color={color} />;
}
