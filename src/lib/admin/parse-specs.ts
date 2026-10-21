/** Convert stored specs to plain text for the admin textarea. */
export function specsToPlainText(specs?: Record<string, string>): string {
  if (!specs || Object.keys(specs).length === 0) return "";
  return Object.entries(specs)
    .map(([key, value]) => {
      const v = String(value ?? "");
      if (v.includes("\n")) return `${key}:\n${v}`;
      return `${key}: ${v}`;
    })
    .join("\n");
}

/**
 * Accept normal text (one spec per line as "Label: value") or legacy JSON objects.
 */
export function parseSpecsPlainText(text: string): Record<string, string> {
  const trimmed = text.trim();
  if (!trimmed) return {};

  if (trimmed.startsWith("{")) {
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return Object.fromEntries(
          Object.entries(parsed as Record<string, unknown>).map(([k, v]) => [
            k,
            String(v ?? ""),
          ]),
        );
      }
    } catch {
      /* fall through to line-based parsing */
    }
  }

  const out: Record<string, string> = {};
  const lines = trimmed.split("\n");
  let pendingKey: string | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) continue;

    const colon = line.indexOf(":");
    if (colon > 0) {
      const key = line.slice(0, colon).trim();
      const value = line.slice(colon + 1).trim();
      if (key) {
        out[key] = value;
        pendingKey = key;
        continue;
      }
    }

    if (pendingKey && out[pendingKey] !== undefined) {
      out[pendingKey] = `${out[pendingKey]}\n${line.trim()}`;
    } else {
      const prev = out.Details;
      out.Details = prev ? `${prev}\n${line.trim()}` : line.trim();
      pendingKey = "Details";
    }
  }

  if (Object.keys(out).length === 0) {
    return { Specifications: trimmed };
  }

  return out;
}
