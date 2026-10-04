import { Ranker, StatItem } from "@/types";

export const RANKER_STATS: StatItem[] = [
  {
    value: "1000+",
    label: "70th BPSC & PCS कुल चयन",
    sublabel: "Highest In East India",
    icon: "Trophy",
  },
  {
    value: "Rank 2",
    label: "SDM All India Rank",
    sublabel: "Shashank Gaurav (BPSC)",
    icon: "Medal",
  },
  {
    value: "Top 10 में 4",
    label: "शीर्ष रैंकर्स",
    sublabel: "Rank 2, 5, 8, 10 Selections",
    icon: "Users",
  },
  {
    value: "50+",
    label: "SDM & DSP अधिकारी",
    sublabel: "Direct In 70th BPSC",
    icon: "BookOpen",
  },
];

export const RANKERS: Ranker[] = [
  {
    id: "shashank-gaurav",
    name: "Shashank Gaurav",
    hindiName: "शशांक गौरव",
    rank: 2,
    exam: "70th BPSC",
    category: "BPSC",
    designation: "अनुमंडल पदाधिकारी (SDM)",
    location: "Saran (Chhapra), Bihar",
    quoteHindi: "निरंतर प्रयास और सही दिशा ही सफलता की कुंजी है।",
    quoteEnglish: "Village to SDM - the power of consistent self-study and focus",
    optionalSubject: "Geography",
    attempts: 2,
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    readStory: {
      background:
        "Hailing from a small village in Saran (Chhapra), Shashank completed his schooling in Hindi medium and pursued his civil service ambition with disciplined consistency.",
      strategy:
        "Focused intensely on high-yield static syllabus mapping, NCERT foundational clarity, and structured 3-point answer writing with maps and flowcharts.",
      timetable: "6-8 hours daily of uninterrupted deep focus, divided into 3 study slots with evening current affairs consolidation.",
      recommendedBooks: [
        "Vini IAS BPSC Special Study Notes",
        "M. Laxmikanth - Indian Polity",
        "Spectrum - Modern History",
        "G.C. Leong - Physical Geography",
      ],
      adviceToAspirants:
        "Never fear your background or medium. What matters is the clarity of concepts and the consistency with which you practice answer writing.",
    },
  },
  {
    id: "uday-pratap-yadav",
    name: "Uday Pratap Yadav",
    hindiName: "उदय प्रताप यादव",
    rank: 5,
    exam: "70th BPSC",
    category: "BPSC",
    designation: "अनुमंडल पदाधिकारी (SDM)",
    location: "Patna, Bihar",
    quoteHindi: "सटीक उत्तर लेखन और निरंतर मूल्यांकन से मिली सफलता।",
    quoteEnglish: "Knowledge + balance + practice = Rank 5 success",
    optionalSubject: "Public Administration",
    attempts: 1,
    photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    readStory: {
      background:
        "An engineer by graduation, Uday chose civil services to make an impactful difference in rural administration and public service delivery.",
      strategy:
        "Balanced static revision with daily 2-hour answer writing drills evaluated by Vini IAS mentors.",
      timetable: "7 hours daily with dedicated weekly mock test simulations every Sunday.",
      recommendedBooks: [
        "Vini IAS Mains Answer Writing Booklet",
        "Ramesh Singh - Indian Economy",
        "Bipin Chandra - India's Struggle for Independence",
      ],
      adviceToAspirants:
        "Do not collect dozens of books for one subject. Read one standard source 10 times rather than 10 sources once.",
    },
  },
  {
    id: "chandrakanta-kumari",
    name: "Chandrakanta Kumari",
    hindiName: "चंद्रकांता कुमारी",
    rank: 8,
    exam: "70th BPSC",
    category: "BPSC",
    designation: "अनुमंडल पदाधिकारी (SDM)",
    location: "Gaya, Bihar",
    quoteHindi: "सपनों को सच करने के लिए अनुशासन और धैर्य सबसे ज़रूरी है।",
    quoteEnglish: "From social dedication to SDM - hard work pays off",
    optionalSubject: "Sociology",
    attempts: 2,
    photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    readStory: {
      background:
        "Balancing household responsibilities and family commitments, Chandrakanta proved that determination and right mentorship overcome every obstacle.",
      strategy:
        "Created concise micro-notes on A4 sheets for quick 1-hour revisions before examinations.",
      timetable: "Early morning 4:30 AM to 8:30 AM slot followed by afternoon answer writing practice.",
      recommendedBooks: [
        "Vini IAS Bihar Current Digest",
        "NCERT Class 11 & 12 Sociology",
        "Shankar IAS Environment",
      ],
      adviceToAspirants:
        "To all women aspirants: believe firmly in your potential and protect your daily study hours fiercely.",
    },
  },
  {
    id: "priya",
    name: "Priya",
    hindiName: "प्रिया",
    rank: 10,
    exam: "70th BPSC",
    category: "BPSC",
    designation: "अनुमंडल पदाधिकारी (SDM)",
    location: "Darbhanga, Bihar",
    quoteHindi: "खुद पर अटूट विश्वास ही आपको आपकी मंज़िल तक पहुँचाता है।",
    quoteEnglish: "Self-belief and guided answer writing paved the path to Rank 10",
    optionalSubject: "History",
    attempts: 1,
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80",
    readStory: {
      background:
        "A student of Darbhanga who relied completely on Vini IAS online live classes and test series without moving away from home.",
      strategy:
        "Utilized Vini IAS online test series and daily doubt resolution sessions to track improvement week by week.",
      timetable: "6 hours daily regular study schedule with dedicated Sunday test analysis.",
      recommendedBooks: [
        "Vini IAS History Special Module",
        "Upinder Singh - Ancient History",
        "Satish Chandra - Medieval History",
      ],
      adviceToAspirants:
        "You do not need to migrate to Delhi to crack civil services today. Quality online mentorship brings Delhi's top guidance to your home.",
    },
  },
  {
    id: "satyam-kumar",
    name: "Satyam Kumar",
    hindiName: "सत्यम कुमार",
    rank: 20,
    exam: "70th BPSC",
    category: "BPSC",
    designation: "अनुमंडल पदाधिकारी (SDM)",
    location: "Samastipur, Bihar",
    quoteHindi: "सीखने की प्रक्रिया कभी रुकनी नहीं चाहिए।",
    quoteEnglish: "Teacher to SDM - sharing knowledge refined my concepts",
    optionalSubject: "Hindi Literature",
    attempts: 2,
    photoUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    readStory: {
      background:
        "Worked as a local educator while preparing for state civil services during evening hours.",
      strategy:
        "Mastered Hindi Literature with Vini IAS test series and perfected vyakhya and bhasha khand scoring.",
      timetable: "Evening 5 PM to 11 PM focused revision and model answer drafting.",
      recommendedBooks: [
        "Vini IAS Hindi Literature Complete Set",
        "Dr. Nagendra - Hindi Sahitya Ka Itihas",
      ],
      adviceToAspirants:
        "Teaching concepts to others or writing down explanations in your own words helps cement concepts permanently.",
    },
  },
  {
    id: "saurabh-raj",
    name: "Saurabh Raj",
    hindiName: "सौरभ राज",
    rank: 22,
    exam: "70th BPSC",
    category: "BPSC",
    designation: "अनुमंडल पदाधिकारी (SDM)",
    location: "Muzaffarpur, Bihar",
    quoteHindi: "सही रणनीति और मॉक टेस्ट ही सफलता का मुख्य आधार हैं।",
    quoteEnglish: "Local roots, clear strategy - Muzaffarpur to Top 25 ranker",
    optionalSubject: "Polity",
    attempts: 2,
    photoUrl: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    readStory: {
      background:
        "Graduated from Muzaffarpur and cracked BPSC on his second attempt by correcting analytical mistakes in General Studies 2.",
      strategy:
        "Analyzed previous 10 years papers deeply to forecast expected topics in economic survey and Bihar budget.",
      timetable: "7 hours daily with extensive diagram and flowchart inclusion in answers.",
      recommendedBooks: [
        "Vini IAS Bihar Budget & Survey Analysis",
        "D.D. Basu - Introduction to the Constitution",
      ],
      adviceToAspirants:
        "Pay special attention to presentation. Examiners evaluate hundreds of copies; make your key points jump off the page with clear headings.",
    },
  },
];
