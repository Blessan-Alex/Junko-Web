import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www (aligns with hosting provider config)
  if (host === 'junko-fze.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.junko-fze.com';
    url.protocol = 'https';
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}
