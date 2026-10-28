import { KidsCourseArt as ArtName } from "@/data/kidsCourses";

/* Small hand-drawn style illustrations for the "Courses for kids" cards (original artwork, 64 × 64). */

const SpokenEnglish = () => (
  <svg viewBox="0 0 64 64" aria-hidden>
    <rect x="2" y="4" width="56" height="56" rx="12" fill="#FBE3D6" />
    <path d="M2 16a12 12 0 0 1 12-12h12v22H2z" fill="#F4C95D" />
    <circle cx="32" cy="32" r="9" fill="none" stroke="#111827" strokeWidth="3.5" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
      <line key={angle} x1="32" y1="15" x2="32" y2="19.5" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" transform={`rotate(${angle} 32 32)`} />
    ))}
  </svg>
);

const English = () => (
  <svg viewBox="0 0 64 64" aria-hidden>
    <ellipse cx="24" cy="40" rx="20" ry="14" fill="#F9C6D4" opacity=".7" />
    <path d="M14 10h38a6 6 0 0 1 6 6v20a6 6 0 0 1-6 6H34l-8 9v-9h-12a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z" fill="#DBEAFE" stroke="#111827" strokeWidth="2.5" strokeLinejoin="round" />
    <text x="33" y="33" textAnchor="middle" fontFamily="Georgia, serif" fontSize="17" fontWeight="700" fill="#111827">Aa</text>
    <path d="M44 50l3 4M50 47l4 2" stroke="#6366F1" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const MathArt = () => (
  <svg viewBox="0 0 64 64" aria-hidden>
    <ellipse cx="34" cy="38" rx="26" ry="20" fill="#A7F3D0" opacity=".75" />
    <rect x="16" y="14" width="34" height="38" rx="7" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" transform="rotate(-8 33 33)" />
    <g stroke="#111827" strokeWidth="2.5" strokeLinecap="round" transform="rotate(-8 33 33)">
      <line x1="33" y1="16" x2="33" y2="50" />
      <line x1="18" y1="33" x2="48" y2="33" />
      <path d="M21 24h8M25 20v8M37 24h8M21 39l6 6M27 39l-6 6M37 40h8M37 45h8" />
    </g>
    <path d="M8 12l3 3M6 20h4" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const Coding = () => (
  <svg viewBox="0 0 64 64" aria-hidden>
    <circle cx="34" cy="38" r="22" fill="#E0E7FF" />
    <rect x="12" y="22" width="40" height="28" rx="5" fill="#FFFFFF" stroke="#111827" strokeWidth="2.5" />
    <path d="M12 29h40" stroke="#111827" strokeWidth="2.5" />
    <circle cx="17" cy="25.5" r="1.3" fill="#EF4444" />
    <circle cx="21" cy="25.5" r="1.3" fill="#F59E0B" />
    <path d="M26 35l-5 5 5 5M38 35l5 5-5 5M34 33l-4 14" stroke="#6366F1" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M48 6c4 2 6 7 4 12l-5 1-4-4 1-5c1-2 2-3 4-4z" fill="#F97316" />
    <path d="M44 15l-4 4" stroke="#F97316" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const ART: Record<ArtName, () => React.JSX.Element> = { spokenEnglish: SpokenEnglish, english: English, math: MathArt, coding: Coding };

export default function KidsCourseArt({ name }: { name: ArtName }) {
  const Art = ART[name];

  return <Art />;
}
