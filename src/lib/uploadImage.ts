/**
 * Turns an image picked in the admin panel into a URL that can be saved with the content.
 *
 * TEMPORARY: until S3 is connected, the image is stored inline as a data URL (kept small).
 * When S3 is ready, replace the body of this function with the S3 upload and return the file's URL —
 * nothing else in the admin panel needs to change.
 */
const MAX_IMAGE_BYTES = 1024 * 1024; // 1 MB

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Image is ${(file.size / 1024 / 1024).toFixed(1)} MB — please use one under 1 MB (S3 uploads will allow bigger files).`);
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Couldn't read the image. Please try another file."));
    reader.readAsDataURL(file);
  });
}

/** True for images uploaded with uploadImage() (stored inline until S3 is connected). */
export const isInlineImage = (url: string) => url.startsWith("data:");
