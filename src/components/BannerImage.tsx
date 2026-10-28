import { HeroBanner } from "@/types";
import ArtDirectedImage from "./ArtDirectedImage";

type BannerImageProps = {
  banner: HeroBanner;
  /** Show the phone artwork on small screens (only when every slide in the slider has one). */
  useMobileArt: boolean;
  priority?: boolean;
};

/** A banner image that fills its slide; phones get the mobile artwork. */
export default function BannerImage({ banner, useMobileArt, priority = false }: BannerImageProps) {
  const { imageUrl, mobileImageUrl, alt, title } = banner;

  return <ArtDirectedImage src={imageUrl} mobileSrc={useMobileArt ? mobileImageUrl : undefined} alt={alt || title} priority={priority} />;
}

/** True when every banner has phone artwork, so the slider can switch to the phone shape. */
export const hasMobileArt = (banners: HeroBanner[]) => banners.length > 0 && banners.every(({ mobileImageUrl }) => Boolean(mobileImageUrl));
