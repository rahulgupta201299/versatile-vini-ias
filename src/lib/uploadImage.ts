/**
 * Turns an image picked in the admin panel into a URL that can be saved with the content.
 *
 * TEMPORARY: until S3 is connected, the image is stored inline as a data URL (kept small).
 * When S3 is ready, replace the body of this function with the S3 upload and return the file's URL —
 * nothing else in the admin panel needs to change.
 */
const MAX_IMAGE_BYTES = 1024 * 1024; // 1 MB

const MAX_DOCUMENT_BYTES = 3 * 1024 * 1024; // 3 MB (PDFs)

const toMegabytes = (bytes: number) => (bytes / 1024 / 1024).toFixed(1);

const readAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Couldn't read the file. Please try another one."));
    reader.readAsDataURL(file);
  });

export async function uploadImage(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Please choose an image file.");

  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error(`Image is ${toMegabytes(file.size)} MB — please use one under 1 MB (S3 uploads will allow bigger files).`);
  }

  return readAsDataUrl(file);
}

export const isPdfFile = (file: File) => file.type === "application/pdf";

/** An image (under 1 MB) or a PDF (under 3 MB), e.g. a syllabus. Same S3 note as uploadImage. */
export async function uploadImageOrPdf(file: File): Promise<string> {
  if (!isPdfFile(file)) return uploadImage(file);

  if (file.size > MAX_DOCUMENT_BYTES) throw new Error(`PDF is ${toMegabytes(file.size)} MB — please use one under 3 MB.`);

  return readAsDataUrl(file);
}

/** True for images uploaded with uploadImage() (stored inline until S3 is connected). */
export const isInlineImage = (url: string) => url.startsWith("data:");
