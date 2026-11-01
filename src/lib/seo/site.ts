export const SITE_ORIGIN = 'https://www.junko-fze.com';

export const SITE_CONTACT = {
  telephone: '+971503426615',
  email: 'info@junko-fze.com',
} as const;

export const SITE_ADDRESS = {
  streetAddress: 'E-9G-10, Hamriyah Free Zone',
  addressLocality: 'Sharjah',
  addressRegion: 'Sharjah',
  addressCountry: 'AE',
} as const;

export const SITE_LOGO_URL = `${SITE_ORIGIN}/icon.png`;

export function absoluteCanonical(path: string): string {
  if (!path || path === '/') return `${SITE_ORIGIN}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${normalized}`;
}

export function absoluteAssetUrl(path: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return absoluteCanonical(path);
}
