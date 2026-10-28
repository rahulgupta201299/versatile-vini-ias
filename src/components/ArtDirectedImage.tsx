import { getImageProps } from "next/image";

type ArtDirectedImageProps = {
  /** Empty while an image hasn't been uploaded — nothing is rendered then. */
  src?: string;
  alt: string;
  /** Phone artwork, used below `mobileMaxWidth`. */
  mobileSrc?: string;
  mobileMaxWidth?: number;
  sizes?: string;
  priority?: boolean;
};

/** Optimised srcSet, or the plain src when Next can't optimise it (data: / blob: URLs). */
const toSrcSet = ({ srcSet, src }: { srcSet?: string; src?: string }) => srcSet || src;

/**
 * next/image with art direction: phones download the phone artwork, larger screens the web one.
 * Fills its (relative, sized) parent, so the parent's aspect ratio reserves the space — no layout shift.
 */
export default function ArtDirectedImage({ src, alt, mobileSrc, mobileMaxWidth = 599, sizes = "(min-width: 1280px) 1200px, 100vw", priority = false }: ArtDirectedImageProps) {
  if (!src) return null;

  const common = { alt, sizes, fill: true, priority, style: { objectFit: "cover", objectPosition: "center" } } as const;
  const { props: imageProps } = getImageProps({ ...common, src });

  const mobileProps = mobileSrc ? getImageProps({ ...common, src: mobileSrc }).props : null;

  return (
    <picture>
      {mobileProps && <source media={`(max-width: ${mobileMaxWidth}px)`} srcSet={toSrcSet(mobileProps)} sizes={sizes} />}
      <img {...imageProps} alt={alt} draggable={false} />
    </picture>
  );
}
