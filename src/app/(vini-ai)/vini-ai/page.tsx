import type { Metadata } from "next";
import ViniAiTutor from "@/sections/ViniAI/ViniAiTutor";

export const metadata: Metadata = {
  title: "VINI AI — Ask Doubt | Your personal AI study companion",
  description: "Ask any UPSC, BPSC or State PCS doubt, evaluate Mains answers, get daily current affairs summaries, study routines and NCERT notes with VINI AI.",
  alternates: { canonical: "/vini-ai" },
};

export default function ViniAiPage() {
  return <ViniAiTutor />;
}
