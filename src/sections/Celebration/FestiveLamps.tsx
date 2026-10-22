/** Built-in festive artwork (three lit diyas on a rangoli glow) — used when a banner has no uploaded image. */
export default function FestiveLamps({ accent = "#E07B24" }: { accent?: string }) {
  const diya = (x: number, scale: number) => (
    <g transform={`translate(${x} 132) scale(${scale})`}>
      {/* flame glow */}
      <ellipse cx="0" cy="-40" rx="26" ry="30" fill="#FFD34D" opacity=".28" />
      {/* flame */}
      <path d="M0 -66 C 12 -50, 11 -34, 0 -26 C -11 -34, -12 -50, 0 -66 Z" fill="#FFB020" />
      <path d="M0 -56 C 6 -46, 6 -36, 0 -31 C -6 -36, -6 -46, 0 -56 Z" fill="#FFF3B0" />
      {/* wick */}
      <rect x="-1.5" y="-28" width="3" height="8" rx="1.5" fill="#5B2A12" />
      {/* lamp bowl */}
      <path d="M-46 -20 Q 0 -14 46 -20 Q 40 14 0 18 Q -40 14 -46 -20 Z" fill="#B5442A" />
      <path d="M-46 -20 Q 0 -14 46 -20 Q 0 -6 -46 -20 Z" fill="#7A2A18" />
      <path d="M-30 -2 Q 0 6 30 -2" stroke="#F2C14E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="-16" cy="4" r="2.6" fill="#F2C14E" />
      <circle cx="0" cy="7" r="2.6" fill="#F2C14E" />
      <circle cx="16" cy="4" r="2.6" fill="#F2C14E" />
      {/* base */}
      <ellipse cx="0" cy="22" rx="22" ry="5" fill="#7A2A18" />
    </g>
  );

  const petals = Array.from({ length: 16 }, (_, i) => i * 22.5);
  const sparkles = [
    [40, 40, 7], [362, 36, 6], [80, 92, 4], [318, 100, 5], [200, 18, 5], [24, 128, 4], [380, 132, 4],
  ];

  return (
    <svg viewBox="0 0 400 170" role="img" aria-label="Lit diyas" style={{ width: "100%", height: "100%", display: "block" }}>
      {/* rangoli glow */}
      <g transform="translate(200 104)" opacity=".5">
        {petals.map((angle) => (
          <ellipse key={angle} cx="0" cy="-62" rx="13" ry="30" fill={accent} opacity=".14" transform={`rotate(${angle})`} />
        ))}
        <circle r="44" fill="#FFFFFF" opacity=".55" />
        <circle r="44" fill="none" stroke={accent} strokeOpacity=".35" strokeWidth="2" strokeDasharray="3 6" />
      </g>
      {/* sparkles */}
      {sparkles.map(([x, y, r]) => (
        <path key={`${x}-${y}`} d={`M${x} ${y - r * 2} L${x + r * 0.5} ${y - r * 0.5} L${x + r * 2} ${y} L${x + r * 0.5} ${y + r * 0.5} L${x} ${y + r * 2} L${x - r * 0.5} ${y + r * 0.5} L${x - r * 2} ${y} L${x - r * 0.5} ${y - r * 0.5} Z`} fill={accent} opacity=".7" />
      ))}
      {/* floor shadow */}
      <ellipse cx="200" cy="156" rx="170" ry="9" fill={accent} opacity=".12" />
      {diya(110, 0.8)}
      {diya(200, 1)}
      {diya(290, 0.8)}
    </svg>
  );
}
