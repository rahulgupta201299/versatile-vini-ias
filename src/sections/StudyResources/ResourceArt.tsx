import { StudyResourceArt } from "@/data/studyResources";

/* Original artwork for the Study Resources cards (viewBox 260 × 190). */

const LINE = "#CBD5E1";

/** Grey text lines on a page. */
function TextLines({ x, y, width, rows, gap = 7 }: { x: number; y: number; width: number; rows: number; gap?: number }) {
  return (
    <g stroke={LINE} strokeWidth="2.2" strokeLinecap="round">
      {Array.from({ length: rows }, (_, row) => (
        <line key={row} x1={x} y1={y + row * gap} x2={x + width * (row % 3 === 2 ? 0.6 : 1)} y2={y + row * gap} />
      ))}
    </g>
  );
}

function Page({ transform, title }: { transform: string; title?: string }) {
  return (
    <g transform={transform}>
      <rect x="-42" y="-62" width="84" height="124" rx="3" fill="#FFFFFF" stroke="#E2E8F0" />
      {title && <rect x="-32" y="-52" width="64" height="10" rx="2" fill="#E2E8F0" />}
      {title && <text x="0" y="-44.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="6.5" fontWeight="700" fill="#334155">{title}</text>}
      <TextLines x={-32} y={-32} width={64} rows={12} />
    </g>
  );
}

const Papers = () => (
  <svg viewBox="0 0 260 190" aria-hidden>
    <g filter="drop-shadow(0 6px 10px rgba(15,23,42,.12))">
      <Page transform="translate(88 104) rotate(-14)" />
      <Page transform="translate(172 104) rotate(14)" />
      <Page transform="translate(130 96)" title="Daily Current Affairs" />
    </g>
  </svg>
);

const Notes = () => (
  <svg viewBox="0 0 260 190" aria-hidden>
    <g filter="drop-shadow(0 6px 10px rgba(15,23,42,.12))">
      <Page transform="translate(162 92) rotate(9)" />
      <g transform="translate(104 104) rotate(-11)">
        <rect x="-42" y="-62" width="84" height="124" rx="3" fill="#FFFFFF" stroke="#E2E8F0" />
        <path d="M-42 -36 L12 -62 L42 -62 L42 -50 L-42 -18 Z" fill="#334155" />
        <circle cx="-26" cy="-26" r="9" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
        <text x="-26" y="-22.5" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="10" fontWeight="800" fill="#334155">1</text>
        <TextLines x={-32} y={-6} width={64} rows={9} />
      </g>
    </g>
  </svg>
);

const ART = { papers: Papers, notes: Notes };

export default function ResourceArt({ name }: { name: StudyResourceArt }) {
  const Art = ART[name];

  return <Art />;
}
