/** Single source for contact details — the same number is used for calls and WhatsApp. */
const NUMBER = "8544078245";

export const CONTACT = {
  phoneDisplay: "+91 85440 78245",
  tel: `tel:+91${NUMBER}`,
  whatsappUrl: `https://wa.me/91${NUMBER}?text=${encodeURIComponent(
    "Hi Vini IAS, I need guidance for my exam preparation."
  )}`,
  /** Show the Meta Verified badge next to WhatsApp (only if the business account is verified). */
  whatsappVerified: true,
  email: "support@viniias.com",
};

/** Official social profiles (replace "#" once the profile exists). */
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/viniias",
  instagram: "https://instagram.com/viniias",
  youtube: "https://youtube.com/viniias",
  linkedin: "#",
  x: "https://x.com/viniias",
  telegram: "https://t.me/viniias",
};
