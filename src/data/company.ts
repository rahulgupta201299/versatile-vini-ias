import { AboutContent, CareersContent } from "@/types";

/** /about-us — sample copy; replace via GET /pages/about once the CMS is live. */
export const ABOUT_CONTENT: AboutContent = {
  hero: {
    badge: "ABOUT VINI IAS",
    kicker: "Taiyari Kahin Se Bhi,",
    highlight: "Safalta",
    title: "Yahin Se",
    intro:
      "Vini IAS is an Indian EdTech platform that makes quality civil services preparation accessible and affordable. From UPSC CSE to BPSC and State PCS, we bring live classes, structured study material, daily answer writing and personal mentorship together — online, offline and hybrid — so that every aspirant, from any corner of the country, gets a fair shot at their dream.",
  },
  mission: [
    { icon: "equity", text: "To bring equity and inclusivity to civil services preparation", highlight: "equity and inclusivity" },
    { icon: "reach", text: "To reach aspirants in every town and village of the country", highlight: "every town and village" },
    { icon: "growth", text: "To build a sustainable, student-first learning ecosystem", highlight: "student-first" },
  ],
  vision: {
    points: [
      "To make quality UPSC, BPSC & State PCS preparation affordable for every aspirant.",
      "To give every student structured guidance, regular evaluation and honest feedback.",
      "To turn humble dreams into top ranks and be a lifelong learning partner.",
    ],
    tiles: [
      { value: "1000+", label: "Selections" },
      { value: "10 lakh+", label: "Hours of live learning" },
      { value: "10,000+", label: "Doubts solved" },
    ],
  },
  founders: [
    {
      name: "Rahul Yadav",
      role: "Founder & CEO, VINI GROUP",
      image: "/images/about/rahul-yadav.webp",
      quote: "My aim is to make quality civil services preparation reachable for every aspirant — whichever corner of the country they come from.",
      bio: [
        "Rahul Yadav founded Vini IAS with a simple belief: talent is everywhere, but quality guidance is not. As Founder & CEO of VINI GROUP, he leads the vision behind Vini IAS and its growing ecosystem of learning brands.",
        "Under his leadership, Vini IAS brings live classes, structured study material, daily answer writing and personal mentorship together — online, offline and hybrid — to help aspirants preparing for UPSC, BPSC and State PCS turn their dreams into ranks.",
      ],
    },
  ],
  presence: {
    intro: "Rooted in Bihar and growing across India — learn with us online from anywhere or walk into one of our centres.",
    stats: [
      { value: "5+", label: "Offline centres" },
      { value: "10 lakh+", label: "Monthly views" },
      { value: "3", label: "Exam tracks — UPSC, BPSC & State PCS" },
    ],
    centres: [
      { name: "Boring Road", city: "Patna", status: "Opening soon" },
      { name: "Old Rajinder Nagar", city: "New Delhi", status: "Opening soon" },
      { name: "Sector 62", city: "Noida", status: "Opening soon" },
      { name: "Laheriasarai", city: "Darbhanga", status: "Opening soon" },
      { name: "Station Road", city: "Bhagalpur", status: "Opening soon" },
    ],
  },
  culture: {
    title: "Build the future of learning with us",
    text: "We are a young, mission-driven team that cares deeply about students. If you want your work to change lives, we would love to hear from you.",
    cta: { label: "Explore careers", href: "/careers" },
  },
};

/** /careers — sample openings; replace via GET /pages/careers once the CMS is live. */
export const CAREERS_CONTENT: CareersContent = {
  hero: {
    notice: "We're hiring across teams",
    title: "Let's build the future of education together",
    subtitle: "Come, join us and together we can transform the way India prepares for civil services.",
  },
  stats: [
    { icon: "trophy", value: "1000+", label: "Selections" },
    { icon: "live", value: "10 lakh+", label: "Hours of live learning" },
    { icon: "views", value: "10 lakh+", label: "Monthly views" },
    { icon: "doubt", value: "10,000+", label: "Doubts solved" },
    { icon: "centre", value: "5+", label: "Offline centres" },
    { icon: "exams", value: "3", label: "Exam tracks" },
  ],
  pillars: [
    { text: "Students first. Always.", tone: "red" },
    { text: "Keep it simple.", tone: "cream" },
    { text: "Learn, unlearn, relearn.", tone: "navy" },
    { text: "Own it end to end.", tone: "yellow" },
    { text: "Bias for action.", tone: "navy" },
    { text: "Small team. Big impact.", tone: "red" },
  ],
  benefits: [
    { icon: "mission", title: "Work that matters", points: ["Directly shape how lakhs of aspirants prepare", "See the results of your work every exam season"] },
    { icon: "rocket", title: "Grow fast", points: ["Ownership from day one", "Learn from experienced mentors and leaders", "Regular reviews and feedback"] },
    { icon: "heart", title: "We've got your back", points: ["Competitive compensation", "Health cover and paid leaves", "Flexible, people-first policies"] },
    { icon: "learn", title: "Keep learning", points: ["Free access to all Vini IAS courses", "Workshops and upskilling sessions", "A culture of curiosity"] },
  ],
  jobs: [
    { id: "content-developer-gs", title: "Content Developer — General Studies", team: "Academics", location: "Patna", type: "Full-time", summary: "Research and write high-quality notes, MCQs and mains answer frameworks for UPSC & BPSC." },
    { id: "answer-evaluator", title: "Mains Answer Copy Evaluator", team: "Academics", location: "Remote", type: "Part-time", summary: "Evaluate daily answer writing copies with structured, actionable feedback." },
    { id: "video-editor", title: "Video Editor", team: "Production", location: "Patna", type: "Full-time", summary: "Edit lectures, shorts and promotional videos for YouTube and the app." },
    { id: "academic-counsellor", title: "Academic Counsellor", team: "Counselling", location: "Patna", type: "Full-time", summary: "Guide aspirants to the right course and help them plan their preparation." },
    { id: "frontend-developer", title: "Frontend Developer (Next.js)", team: "Technology", location: "Noida / Remote", type: "Full-time", summary: "Build fast, accessible web experiences for our website and learning platform." },
    { id: "social-media-executive", title: "Social Media Executive", team: "Marketing", location: "New Delhi", type: "Full-time", summary: "Plan and run content calendars across Instagram, YouTube and Telegram." },
    { id: "content-intern", title: "Current Affairs Intern", team: "Academics", location: "Remote", type: "Internship", summary: "Prepare daily current affairs summaries and quizzes from newspapers and PIB." },
  ],
  email: "careers@viniias.com",
};
