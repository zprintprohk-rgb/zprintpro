/**
 * Next.js Middleware
 * - 添加 Security Headers
 * - 静态导出时不执行，Cloudflare Pages 通过 _redirects 处理根路径重定向
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 排除静态文件、API、_next 内部路径
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/manifest.json')
  ) {
    return NextResponse.next();
  }

  // 添加 Security Headers
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://checkout.airwallex.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self'; connect-src 'self' https://*.supabase.co https://api.airwallex.com; frame-src https://checkout.airwallex.com;"
  );

  return response;
}

export const config = {
  matcher: [
    '/((?!_next|api|images|favicon.ico|robots.txt|sitemap|manifest.json).*)',
  ],
};
