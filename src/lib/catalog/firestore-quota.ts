import "server-only";

/** True only for Firestore/Firebase quota or rate-limit errors — not generic outages. */
export function isFirestoreQuotaExceeded(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;

  const e = error as {
    code?: number | string;
    message?: string;
    details?: string;
    status?: number | string;
  };

  const code = e.code;
  if (
    code === 8 ||
    code === 429 ||
    code === "RESOURCE_EXHAUSTED" ||
    code === "resource-exhausted"
  ) {
    return true;
  }

  const status = e.status;
  if (status === 429 || status === "RESOURCE_EXHAUSTED") {
    return true;
  }

  const msg = `${e.message ?? ""} ${e.details ?? ""}`.toLowerCase();
  return (
    msg.includes("resource_exhausted") ||
    msg.includes("resource exhausted") ||
    msg.includes("quota exceeded") ||
    msg.includes("exceeded your quota") ||
    msg.includes("too many requests")
  );
}
