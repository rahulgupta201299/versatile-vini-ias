import { BadgeCheck, BookOpen, Building2, Eye, Globe2, HeartHandshake, MapPin, MessageCircleQuestion, PlayCircle, Rocket, Scale, Sprout, Target, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CompanyIcon } from "@/types";

export const COMPANY_ICONS: Record<CompanyIcon, LucideIcon> = {
  equity: Scale,
  reach: Globe2,
  growth: Sprout,
  trophy: Trophy,
  live: PlayCircle,
  centre: Building2,
  views: Eye,
  doubt: MessageCircleQuestion,
  exams: BadgeCheck,
  mission: Target,
  rocket: Rocket,
  heart: HeartHandshake,
  learn: BookOpen,
  pin: MapPin,
};
