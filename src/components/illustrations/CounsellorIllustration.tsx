import React from "react";
import Box from "@mui/material/Box";

/** Counsellor on a call (headset) in front of a browser window — original line illustration. */
export default function CounsellorIllustration({ width = 200 }: { width?: number | object }) {
  return (
    <Box component="svg" viewBox="0 0 200 130" aria-hidden sx={{ width, height: "auto", display: "block" }}>
      {/* ground line */}
      <path d="M4 126h192" stroke="#C7CBEA" strokeWidth="1.5" strokeLinecap="round" />
      {/* clock */}
      <circle cx="56" cy="16" r="11" fill="none" stroke="#C7CBEA" strokeWidth="1.5" strokeDasharray="2 3" />
      <path d="M56 9v7l4 3" stroke="#9AA0D6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      {/* chat bubble */}
      <rect x="126" y="22" width="30" height="12" rx="3" fill="#FFFFFF" stroke="#C7CBEA" strokeWidth="1.5" />
      <path d="M131 28h20" stroke="#C7CBEA" strokeWidth="1.5" strokeDasharray="2 2" />
      {/* browser window */}
      <rect x="40" y="46" width="124" height="80" rx="6" fill="#FFFFFF" stroke="#C7CBEA" strokeWidth="1.5" />
      <path d="M40 58h124" stroke="#C7CBEA" strokeWidth="1.5" />
      <circle cx="146" cy="52" r="1.8" fill="#FE0034" />
      <circle cx="152" cy="52" r="1.8" fill="#FE0034" />
      <circle cx="158" cy="52" r="1.8" fill="#FE0034" />
      <path d="M48 112l12-14 10 8 14-18" stroke="#C7CBEA" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <rect x="132" y="68" width="24" height="30" rx="2" fill="#FFF7D6" stroke="#E8D57A" strokeWidth="1.2" />
      <path d="M136 75h16M136 81h16M136 87h10" stroke="#E8D57A" strokeWidth="1.2" />
      {/* body */}
      <path d="M70 126c0-24 12-36 30-36s30 12 30 36z" fill="#FE0034" />
      <path d="M94 92l6 34 6-34" fill="#FFFFFF" />
      <path d="M88 96c-4 10-4 20-2 30M112 96c4 10 4 20 2 30" stroke="#CC002A" strokeWidth="1.5" fill="none" />
      {/* neck + head */}
      <rect x="95" y="80" width="10" height="12" rx="3" fill="#F2C9A5" />
      <ellipse cx="100" cy="68" rx="14" ry="15" fill="#F2C9A5" />
      {/* hair + bun */}
      <path d="M86 66c0-11 6-17 14-17s14 6 14 17c-3-5-8-8-14-8s-11 3-14 8z" fill="#1F2937" />
      <circle cx="100" cy="45" r="4.5" fill="#1F2937" />
      {/* headset */}
      <path d="M85 68a15 15 0 0 1 30 0" fill="none" stroke="#3B3F8C" strokeWidth="3" />
      <rect x="82" y="65" width="6" height="10" rx="2.5" fill="#3B3F8C" />
      <rect x="112" y="65" width="6" height="10" rx="2.5" fill="#3B3F8C" />
      <path d="M85 74c0 6 5 9 11 9" stroke="#3B3F8C" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="97" cy="83" r="2.2" fill="#3B3F8C" />
      {/* hand at chin */}
      <path d="M104 96c2-6 5-11 8-12 3 0 3 4 1 7l-4 7z" fill="#F2C9A5" />
      {/* face */}
      <path d="M95 70h2M103 70h2" stroke="#1F2937" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M97 76c2 1.5 4 1.5 6 0" stroke="#B4553B" strokeWidth="1.4" fill="none" strokeLinecap="round" />
    </Box>
  );
}
