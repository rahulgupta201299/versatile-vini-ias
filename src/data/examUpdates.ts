/**
 * /exams — "Latest Notification & Updates" ("Important Exams" are in admin → Footer).
 * SAMPLE content (placeholders) until GET /blogs/updates is configured. Links point to the exam's blog category.
 */
import { ExamUpdates } from "@/types";

const cat = (slug: string) => `/exams/${slug}`;

export const EXAM_UPDATES: ExamUpdates = {
  boards: [
    {
      id: "notifications",
      title: "Notifications",
      items: [
        { title: "UPSC CSE 2027 Notification: Expected Dates, Vacancies and Key Changes", href: cat("upsc") },
        { title: "BPSC 72nd CCE Notification 2026 Out, Check Vacancies and Eligibility", href: cat("state-psc") },
        { title: "SSC CGL 2027 Notification Expected Soon, Exam Calendar Released", href: cat("ssc") },
        { title: "RRB NTPC 2026 Notification Out for Graduate Level Posts, Apply Online", href: cat("railways") },
        { title: "CTET December 2026 Notification Released, Check Exam Date and Fee", href: cat("teaching") },
      ],
    },
    {
      id: "admit-cards",
      title: "Admit Cards",
      items: [
        { title: "UPSC CSE Mains 2026 Admit Card Out, Download e-Admit Card at upsc.gov.in", href: cat("upsc") },
        { title: "UPPSC PCS Mains 2026 Admit Card Released, Exam City Details", href: cat("state-psc") },
        { title: "SSC CHSL Tier 1 Admit Card 2026, Region-Wise Download Links", href: cat("ssc") },
        { title: "AIIMS NORCET 2026 Admit Card Out, Check Exam Pattern", href: cat("nursing") },
        { title: "IBPS PO Mains Admit Card 2026, Call Letter Download Link", href: cat("banking") },
      ],
    },
    {
      id: "results",
      title: "Results",
      items: [
        { title: "UPSC Prelims Result 2026 Out, Check Roll Number List PDF", href: cat("upsc") },
        { title: "BPSC 71st Final Result 2026 Declared, Merit List and Cut-Off Marks", href: cat("state-psc") },
        { title: "SSC GD Constable Result 2026, Cut-Off and Merit List", href: cat("ssc") },
        { title: "RRB Group D Result 2026 Out, Zone-Wise Cut-Off Marks", href: cat("railways") },
        { title: "NDA 2 2026 Written Result Declared, SSB Interview Schedule", href: cat("defence") },
      ],
    },
  ],
};
