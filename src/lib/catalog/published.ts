/** Public catalog visibility — matches admin “Live” (hidden only when published === false). */
export function isProductPublished(data: Record<string, unknown>): boolean {
  return data.published !== false;
}
