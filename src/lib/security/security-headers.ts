/**
 * Site-wide security headers for Next.js `headers()` config.
 *
 * CSP is Report-Only until production reports are clean (~1–2 weeks), then switch
 * `Content-Security-Policy-Report-Only` to enforcing `Content-Security-Policy`
 * using the same directive string from buildContentSecurityPolicy().
 */

function buildContentSecurityPolicy(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https://images.pexels.com https://*.public.blob.vercel-storage.com https://www.googletagmanager.com https://www.google-analytics.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.googleapis.com",
    "frame-ancestors 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; ");
}

export function getSecurityHeaders(): { key: string; value: string }[] {
  return [
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=()",
    },
    {
      key: "Content-Security-Policy-Report-Only",
      value: buildContentSecurityPolicy(),
    },
  ];
}
