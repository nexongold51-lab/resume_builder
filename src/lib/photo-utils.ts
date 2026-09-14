"use client";

// Client-side image processing: reads a File, crops it to a square, resizes to `size` px,
// and returns a JPEG data URL small enough (~30-50 KB at 320px) to embed directly in the resume JSON.
export async function fileToResizedDataUrl(file: File, size = 320, quality = 0.85): Promise<string> {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please upload an image file (JPG, PNG, or WebP).");
  }
  if (file.size > 5 * 1024 * 1024) {
    throw new Error("Image is too large. Please upload a file smaller than 5 MB.");
  }

  const bitmap = await createImageBitmap(file);
  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Your browser does not support image processing.");
  ctx.drawImage(bitmap, sx, sy, side, side, 0, 0, size, size);
  bitmap.close?.();

  return canvas.toDataURL("image/jpeg", quality);
}
