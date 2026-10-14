/** Single source for contact details — the same number is used for calls and WhatsApp. */
const NUMBER = "8544078245";

export const CONTACT = {
  phoneDisplay: "+91 85440 78245",
  tel: `tel:+91${NUMBER}`,
  whatsappUrl: `https://wa.me/91${NUMBER}?text=${encodeURIComponent(
    "Hi Vini IAS, I need guidance for my exam preparation."
  )}`,
  email: "support@viniias.com",
  website: { label: "www.viniias.com", href: "https://viniias.com" },
};

/** Official social profiles. */
export const SOCIAL_LINKS = {
  facebook: "https://m.facebook.com/viniiasacademy",
  instagram: "https://instagram.com/viniiasofficial",
  youtube: "https://youtube.com/viniias",
  linkedin: "https://in.linkedin.com/company/viniiasofficial",
  x: "https://twitter.com/viniiasofficial",
  telegram: "https://telegram.me/viniiasofficial",
};
