/**
 * /exams — "Latest Notification & Updates" and "Important Exams".
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
  importantExams: [
    [
      { title: "UPSC CSE 2027", href: cat("upsc") },
      { title: "UPSC NDA 2027", href: cat("defence") },
      { title: "UPSC CDS 2027", href: cat("defence") },
      { title: "UPSC EPFO 2027", href: cat("upsc") },
      { title: "UPSC CAPF 2027", href: cat("upsc") },
      { title: "UPSC IFoS 2027", href: cat("upsc") },
      { title: "UPSC ESE 2027", href: cat("upsc") },
      { title: "UPSC CMS 2027", href: cat("upsc") },
    ],
    [
      { title: "BPSC 72nd CCE", href: cat("state-psc") },
      { title: "UPPSC PCS 2027", href: cat("state-psc") },
      { title: "MPPSC 2027", href: cat("state-psc") },
      { title: "RPSC RAS 2027", href: cat("state-psc") },
      { title: "JPSC 2027", href: cat("state-psc") },
      { title: "UKPSC 2027", href: cat("state-psc") },
      { title: "HPSC HCS 2027", href: cat("state-psc") },
      { title: "BPSC TRE 4.0", href: cat("teaching") },
    ],
    [
      { title: "SSC CGL 2027", href: cat("ssc") },
      { title: "SSC CHSL 2027", href: cat("ssc") },
      { title: "SSC MTS 2027", href: cat("ssc") },
      { title: "SSC GD Constable 2027", href: cat("ssc") },
      { title: "SSC CPO 2027", href: cat("ssc") },
      { title: "SSC Stenographer 2027", href: cat("ssc") },
      { title: "SSC JE 2027", href: cat("ssc") },
      { title: "Delhi Police Constable 2027", href: cat("ssc") },
    ],
    [
      { title: "RRB NTPC 2026", href: cat("railways") },
      { title: "RRB Group D 2026", href: cat("railways") },
      { title: "RRB ALP 2026", href: cat("railways") },
      { title: "RRB JE 2026", href: cat("railways") },
      { title: "CTET 2026", href: cat("teaching") },
      { title: "UPTET 2026", href: cat("teaching") },
      { title: "KVS Recruitment 2026", href: cat("teaching") },
      { title: "AIIMS NORCET 2026", href: cat("nursing") },
    ],
    [
      { title: "SBI PO 2026", href: cat("banking") },
      { title: "IBPS PO 2026", href: cat("banking") },
      { title: "IBPS Clerk 2026", href: cat("banking") },
      { title: "RBI Grade B 2026", href: cat("banking") },
      { title: "NABARD Grade A 2026", href: cat("banking") },
      { title: "AFCAT 2026", href: cat("defence") },
      { title: "GATE 2027", href: cat("engineering") },
      { title: "NEET UG 2027", href: cat("medical") },
    ],
  ],
};
