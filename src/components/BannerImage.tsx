import React from "react";
import { HeroBanner } from "@/types";

type BannerImageProps = {
  banner: HeroBanner;
  /** Show the phone artwork on small screens (only when every slide in the slider has one). */
  useMobileArt: boolean;
  priority?: boolean;
};

/**
 * A banner image that fills its slide. Phones get the mobile artwork through <picture>, so each
 * screen downloads only the image it shows. Works with uploaded images (data URLs today, S3 later).
 */
export default function BannerImage({ banner, useMobileArt, priority = false }: BannerImageProps) {
  const { imageUrl, mobileImageUrl, alt, title } = banner;

  return (
    <picture>
      {useMobileArt && mobileImageUrl && <source media="(max-width: 599px)" srcSet={mobileImageUrl} />}
      {/* Admin-uploaded artwork (data URL today, S3 later), so a plain <img> instead of next/image */}
      <img src={imageUrl} alt={alt || title} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
    </picture>
  );
}

/** True when every banner has phone artwork, so the slider can switch to the phone shape. */
export const hasMobileArt = (banners: HeroBanner[]) => banners.length > 0 && banners.every(({ mobileImageUrl }) => Boolean(mobileImageUrl));
