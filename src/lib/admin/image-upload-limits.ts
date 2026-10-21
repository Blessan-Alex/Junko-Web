/** Hard limit enforced on client and server. */
export const IMAGE_UPLOAD_MAX_BYTES = 700 * 1024;

/** Shown as guidance in the admin UI. */
export const IMAGE_UPLOAD_GUIDANCE_KB = {
  max: 700,
  preferBelow: 600,
  idealBelow: 300,
} as const;

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function imageUploadTooLargeMessage(sizeBytes: number): string {
  return `This file is ${formatFileSize(sizeBytes)}. Images must be under ${IMAGE_UPLOAD_GUIDANCE_KB.max} KB. For faster loading, compress photos to under ${IMAGE_UPLOAD_GUIDANCE_KB.preferBelow} KB (ideally under ${IMAGE_UPLOAD_GUIDANCE_KB.idealBelow} KB) before uploading.`;
}
