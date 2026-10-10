/**
 * Mentorship pages — route: /courses/mentorship/[mentorship]
 *   /courses/mentorship/1-1-mentorship-2028-29
 *   /courses/mentorship/free-mentorship-program
 *
 * FALLBACK content — used when GET /courses/mentorship/:slug is not configured or fails.
 * Prices / dates are placeholders.
 */
import { FreeResourcePage } from "@/types";

const BANNER = { image: "/images/banners/banner-upsc-foundation-2027-28.webp", alt: "Vini IAS UPSC mentorship" };
const EMPTY = { guide: { heading: "", text: "" }, whatIs: [], learn: [], whyJoin: [], bestFor: [], syllabusUrl: "/#resources" };

export const MENTORSHIP_PAGES: FreeResourcePage[] = [
  {
    ...EMPTY,
    slug: "1-1-mentorship-2028-29",
    label: "1:1 Mentorship 2028/29",
    title: "1:1 Mentorship Program for UPSC CSE 2028/29 – Batch 1",
    summary:
      "Our 1:1 Mentorship Program is a structured and result-oriented guidance initiative designed for serious UPSC 2028/29 aspirants. The program focuses on personalised mentorship, expert-led interviews, continuous progress tracking, and customised study planning to ensure consistent improvement, strategic preparation, and complete exam readiness.",
    priceLabel: "₹34,999",
    isFree: false,
    startInfo: "Starting from 1st December 2026",
    mentorship: {
      batchLabel: "Batch 1",
      priceNote: "(Inclusive of all taxes)",
      media: { ...BANNER, caption: "How to Prepare for UPSC" },
      offer: { text: "Fill the form to get Special Offer", ctaLabel: "Fill the Form" },
      timeline: {
        title: "1:1 Mentorship Program",
        subtitle: "Timeline of the Program",
        phases: [
          { phase: "Phase 1", period: "December 2026 - December 2027", title: "MAINS READY" },
          { phase: "Phase 2", period: "January 2028 - May 2028", title: "PRELIMS READY" },
          { phase: "Phase 3", period: "May 2028 Onward", title: "FINAL LAP" },
        ],
      },
      howItWorks: {
        title: "How Program will work?",
        steps: [
          "Diagnosis Session (identification of level of preparation)",
          "Weekly Personalized Study Plan",
          "Implementation of Study Plan by Mentor",
          "On-demand Extra Mentorship Session",
          "Follow-up by Mentor over message after 3 days",
          "Attempt of Prelims & Mains Questions by the Mentee",
          "Performance Review Session by Mentor after 1 week and progress report",
          "Live Daily Answer Sessions",
        ],
      },
      features: {
        title: "Features of the Program",
        items: [
          { title: "15 syllabus-wise template based answer writing value addition lectures" },
          { title: "30+ content enrichment group sessions by interview-appeared mentors" },
          { title: "Peer learning through an exclusive performance-based Telegram group" },
          { title: "1-to-1 Personalised Mentorship" },
          { title: "18 Prelims Strategy Sessions" },
          { title: "18 Mains Answer Writing Lectures" },
          { title: "Weekly 1-to-1 Mentorship Session by Mentors" },
          { title: "Monthly Mentorship Session by Super Mentors" },
          { title: "Mains Test Series (17 Sectional + 2 Essay + 4 Full Length Tests)" },
          { title: "Prelims Test Series (16 Sectional + 4 Full Length Tests)" },
          { title: "Complete Study Material for Prelims & Mains (Static + Current Affairs)" },
          { title: "Current Affairs Classes (Online)" },
          { title: "Individualised Study Plan and Time Table" },
          { title: "Report Card to track the progress of the mentee" },
          { title: "One Pager Notes for Prelims & Mains" },
          { title: "Weekly Targets" },
          { title: "Daily Accountability and Productivity Sheet" },
          { title: "PYQ Workbooks for every Subject" },
          { title: "3000+ Prelims Practice Questions" },
          { title: "One-liner Active Recall Questions" },
          { title: "Annotated NCERTs for Smart Revision" },
        ],
      },
      showToppers: true,
    },
    faqs: [
      { q: "Who is this mentorship program for?", a: "This program is ideal for serious UPSC CSE 2028/29 aspirants who want personalised guidance for Prelims, Mains, and Current Affairs, along with continuous mentoring and performance tracking." },
      { q: "Who will be the mentor for this program?", a: "You will be guided one-to-one by our experienced mentors, along with exclusive answer writing sessions and mentorship by interview-appeared mentors for real exam insights." },
      { q: "Does the program cover both Prelims and Mains?", a: "Yes, the program comprehensively covers Prelims, Mains, and Current Affairs, including static subjects, answer writing practice, and full-length test series." },
      { q: "Are answer writing classes included?", a: "Yes, students get 18 dedicated answer writing lectures focusing on structure, content enrichment, presentation, and evaluation." },
      { q: "Will I get a personalised study plan?", a: "Yes, every student receives a customised study plan and timetable based on their background, preparation level, and available time." },
      { q: "What study material will be provided?", a: "Students receive complete study material for Prelims and Mains, including static content and updated current affairs resources." },
      { q: "How is progress tracked in this program?", a: "Each student receives a detailed report card along with regular reviews, helping track performance, consistency, and areas of improvement." },
      { q: "Is this program suitable for beginners?", a: "Yes, the program is suitable for both beginners and repeaters, as the study plan and mentoring approach are fully personalised." },
    ],
  },
  {
    ...EMPTY,
    slug: "free-mentorship-program",
    label: "Free Mentorship Program",
    title: "Free 1:1 Mentorship Program to Kickstart Your UPSC Preparation",
    summary:
      "Our Free Mentorship Program is a FREE 1:1 mentorship program designed to help UPSC aspirants kickstart their preparation under the guidance of our team of interview-appeared mentors. The program provides structured direction and clarity to aspirants. Each session lasts 30–45 minutes and focuses on building the right foundation for your UPSC journey.",
    priceLabel: "FREE Course",
    isFree: true,
    startInfo: "Starting from 1st November 2026",
    mentorship: {
      media: { ...BANNER, caption: "Free 1:1 Mentorship" },
      features: {
        title: "Features",
        items: [
          { title: "Personalized 1:1 Guidance", text: "Get individual mentorship sessions tailored to your preparation stage and specific challenges." },
          { title: "Expert Mentors", text: "Learn directly from UPSC interview-appeared candidates who’ve been through the journey themselves." },
          { title: "Strategy & Study Plan Review", text: "Refine your preparation strategy and get a customized roadmap for upcoming months." },
          { title: "Doubt & Clarity Sessions", text: "Discuss your concerns, preparation gaps, and confusion, and walk away with a clear action plan." },
          { title: "Free & Accessible to All", text: "Completely free for all UPSC aspirants, sessions are allotted on a first-come, first-served basis." },
          { title: "Session Duration", text: "Each mentorship session lasts 30–45 minutes per student." },
        ],
      },
    },
    faqs: [
      { q: "Who can apply for the Free Mentorship Program?", a: "Any UPSC aspirant, whether beginner or advanced, can apply for the program. It’s open to students at all stages of preparation." },
      { q: "Is it completely free?", a: "Yes! It is a 100% free mentorship program designed to guide and support aspirants without any cost." },
      { q: "Who will be my mentor?", a: "Your mentor will be one of our handpicked interview-appeared candidates who have personally gone through the UPSC journey." },
      { q: "How long is each session?", a: "Each mentorship session lasts around 30–45 minutes, focusing on your strategy, strengths, and areas for improvement." },
      { q: "How can I register?", a: "Simply fill out the registration form shared in your announcement section after enrollment. Sessions are allotted on a first-come, first-served basis." },
    ],
  },
];
