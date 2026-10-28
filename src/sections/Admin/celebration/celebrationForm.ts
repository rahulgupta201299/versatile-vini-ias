import { AdminCelebrationBanner, CelebrationBannerInput, CelebrationOffer } from "@/types";

export const BASE_PATH = "/admin/web/homepage/celebration-banners";
export const API_PATH = "homepage/celebration-banners";

/** Ready-made colours for the colour pickers (a custom colour can still be chosen). */
export const COLOR_PRESETS = ["#A8323E", "#8B1E2D", "#CC002A", "#E07B24", "#F29F05", "#1E7B4C", "#13294B", "#6B2FA0", "#C2185B"];

export const newOffer = (): CelebrationOffer => ({ title: "", priceLabel: "Starting @", price: 0, color: "#A8323E", link: "" });

const atEndOfDay = (date: Date) => {
  date.setHours(23, 59, 0, 0);

  return date;
};

/** A new banner: starts now, ends a week from today at 11:59 PM. */
export const newBanner = (): CelebrationBannerInput => {
  const start = new Date();

  start.setSeconds(0, 0);

  return {
    title: "",
    subtitle: "",
    imageUrl: "",
    theme: { titleColor: "#8B1E2D", accentColor: "#E07B24", background: "#FFF8EF" },
    offers: [newOffer(), newOffer(), newOffer()],
    startsAt: start.toISOString(),
    endsAt: atEndOfDay(new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000)).toISOString(),
    isActive: true,
  };
};

export const toInput = ({ title, subtitle, imageUrl, theme, offers, startsAt, endsAt, isActive }: AdminCelebrationBanner): CelebrationBannerInput => ({
  title,
  subtitle,
  imageUrl,
  theme,
  offers,
  startsAt,
  endsAt,
  isActive,
});

const pad = (value: number) => String(value).padStart(2, "0");

/** ISO date → value for <input type="datetime-local"> (the admin's own time zone). */
export const toLocalInput = (iso: string) => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) return "";

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

/** <input type="datetime-local"> value → ISO date. */
export const fromLocalInput = (value: string) => (value ? new Date(value).toISOString() : "");

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });

const DAY_MS = 24 * 60 * 60 * 1000;

const startOfDay = (time: number) => new Date(time).setHours(0, 0, 0, 0);

/** Countdown for the admin preview (the website gets the same text from the backend). */
export const countdownText = (endsAt: string, now = Date.now()) => {
  const days = Math.round((startOfDay(new Date(endsAt).getTime()) - startOfDay(now)) / DAY_MS);

  if (days <= 0) return "Sale ending today";

  if (days === 1) return "Sale ends tomorrow";

  return `Sale ends in ${days} days`;
};

export type BannerStatus = { label: string; tone: "success" | "yellow" | "neutral" | "red"; hint: string };

/** Where a banner stands right now: live, scheduled, expired or switched off. */
export const getBannerStatus = ({ isActive, startsAt, endsAt }: Pick<CelebrationBannerInput, "isActive" | "startsAt" | "endsAt">, now = Date.now()): BannerStatus => {
  const starts = new Date(startsAt).getTime();
  const ends = new Date(endsAt).getTime();

  if (ends <= now) return { label: "Expired", tone: "neutral", hint: `Ended ${formatDateTime(endsAt)}` };

  if (!isActive) return { label: "Switched off", tone: "neutral", hint: "Hidden on the website" };

  if (starts > now) return { label: "Scheduled", tone: "yellow", hint: `Goes live ${formatDateTime(startsAt)}` };

  return { label: "Live now", tone: "success", hint: `Until ${formatDateTime(endsAt)}` };
};

/** Problems that stop saving, as readable sentences. */
export const validateBanner = ({ title, offers, startsAt, endsAt, isActive }: CelebrationBannerInput) => {
  const problems: string[] = [];

  if (!title.trim()) problems.push("Add a title, e.g. “Happy Diwali”.");

  offers.forEach(({ title: offerTitle, price }, index) => {
    if (!offerTitle.trim()) problems.push(`Offer ${index + 1}: add the text.`);

    if (!Number.isFinite(price) || price < 0) problems.push(`Offer ${index + 1}: the price can't be negative.`);
  });

  if (!startsAt || !endsAt) problems.push("Choose a start and an end date.");
  else if (new Date(endsAt) <= new Date(startsAt)) problems.push("The end date must be after the start date.");
  else if (isActive && new Date(endsAt) <= new Date()) problems.push("The end date has passed — choose a later one to keep the banner active.");

  return problems;
};

export const cleanInput = (input: CelebrationBannerInput): CelebrationBannerInput => ({
  ...input,
  title: input.title.trim(),
  subtitle: input.subtitle.trim(),
  offers: input.offers.map((offer) => ({ ...offer, title: offer.title.trim(), priceLabel: offer.priceLabel.trim(), link: offer.link.trim() })),
});
