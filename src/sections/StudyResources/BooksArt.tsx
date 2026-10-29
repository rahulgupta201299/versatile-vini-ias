/** Original artwork: three books standing on a two-step white podium (240 × 170). */
export default function BooksArt({ colors, label }: { colors: [string, string, string]; label: string }) {
  const [left, middle, right] = colors;
  // Unique per card, as several of these are on one page
  const gradientId = `podium-${label.toLowerCase()}`;
  const podium = `url(#${gradientId})`;

  return (
    <svg viewBox="0 0 240 170" aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#E5E7EB" />
        </linearGradient>
      </defs>
      {/* podium */}
      <ellipse cx="96" cy="128" rx="70" ry="12" fill={podium} />
      <rect x="26" y="116" width="140" height="12" fill={podium} />
      <ellipse cx="96" cy="116" rx="70" ry="12" fill="#FFFFFF" />
      <ellipse cx="160" cy="138" rx="62" ry="11" fill={podium} />
      <rect x="98" y="128" width="124" height="10" fill={podium} />
      <ellipse cx="160" cy="128" rx="62" ry="11" fill="#FFFFFF" />
      {/* left book */}
      <rect x="52" y="34" width="44" height="80" rx="3" fill={left} />
      <rect x="52" y="34" width="6" height="80" fill="#000" opacity=".18" />
      <rect x="62" y="44" width="28" height="10" rx="2" fill="#FFFFFF" opacity=".9" />
      <rect x="62" y="60" width="28" height="30" rx="3" fill="#FFFFFF" opacity=".25" />
      {/* right book */}
      <rect x="150" y="22" width="40" height="104" rx="3" fill={right} />
      <rect x="150" y="22" width="6" height="104" fill="#000" opacity=".2" />
      <rect x="158" y="32" width="26" height="9" rx="2" fill="#FFFFFF" opacity=".85" />
      <circle cx="171" cy="80" r="12" fill="#FFFFFF" opacity=".2" />
      {/* middle box set */}
      <rect x="98" y="56" width="52" height="76" rx="3" fill={middle} />
      <rect x="98" y="56" width="52" height="14" fill="#000" opacity=".2" />
      <rect x="98" y="104" width="52" height="12" fill="#FFFFFF" opacity=".25" />
      <text x="124" y="95" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize={label.length > 5 ? 8.5 : 11} fontWeight="800" fill="#FFFFFF">{label}</text>
    </svg>
  );
}
