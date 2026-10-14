# Vini IAS Frontend — project notes

## Brand colours (always use these)
- **Red** `#FE0034` (RGB 254, 0, 52) — `COLORS.red` (+ `redDark`, `redDarker`, `redTint`, `redTintSoft`, `redBorder`)
- **Yellow** `#FFE51F` (RGB 255, 229, 31) — `COLORS.yellow` (+ `yellowDark`)
- Text on yellow: near-black (`COLORS.ink`); text on red: white / yellow.
- Take colours from `src/theme/colors.ts` only — no new blues, greens or purples for backgrounds, buttons or accents.

## Content rules
- Never show educators / faculty on course pages.
- Plans are only **Foundation** and **Foundation Plus**.
- Toppers come from the homepage Top Rankers section.
- Every "Test Series" link is external (`TEST_SERIES_URL`, opens in a new tab).
