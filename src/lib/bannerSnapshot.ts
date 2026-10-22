/**
 * [S3 SNAPSHOT] — NOT ENABLED YET (S3 isn't connected).
 *
 * When an admin saves a celebration banner, the finished banner (title, artwork, offer cards, colours)
 * is turned into ONE final image and uploaded to S3, and its URL is saved with the banner as `snapshotUrl`
 * — ready for the app, emails or social posts.
 *
 * To enable:
 *   1. npm install html-to-image
 *   2. Uncomment the code below.
 *   3. Make uploadImage() (src/lib/uploadImage.ts) upload to S3 and return the file's URL.
 *   4. Uncomment the lines marked "[S3 SNAPSHOT]" in:
 *        - src/sections/Admin/celebration/CelebrationBannerEditor.tsx (calls captureBannerSnapshot on save)
 *        - src/types/index.ts (CelebrationBannerInput.snapshotUrl)
 *        - Backend: celebrationBanner.model.js (snapshotUrl field) and celebrationBanner.service.js
 */

// import { toBlob } from "html-to-image";
// import { uploadImage } from "@/lib/uploadImage";
//
// /** Phone-width banner at 3× pixels → a sharp image for any screen. */
// const PIXEL_RATIO = 3;
//
// /**
//  * Draws the element (the admin's live preview) as a PNG, uploads it and returns its URL.
//  * Uploaded artwork must be same-origin or allow CORS, or the browser leaves it out of the image.
//  */
// export async function captureBannerSnapshot(element: HTMLElement, fileName = "celebration-banner.png"): Promise<string> {
//   // Wait for web fonts so the text in the image matches the page
//   await document.fonts.ready;
//
//   const blob = await toBlob(element, { pixelRatio: PIXEL_RATIO, cacheBust: true, backgroundColor: "#FFFFFF" });
//
//   if (!blob) throw new Error("Couldn't make the banner image. Please try saving again.");
//
//   return uploadImage(new File([blob], fileName, { type: "image/png" }));
// }

export {};
