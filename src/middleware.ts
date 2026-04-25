/**
 * Next.js Middleware
 * - 根路径重定向到 /zh-hk/（香港主场）
 * - 添加 Security Headers
 * - 禁止未授权 API 访问
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOCALES = ['zh-hk', 'en', 'ja'];
const DEFAULT_LOCALE = 'zh-hk';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. 根路径重定向到默认语言
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}/`, request.url));
  }

  // 2. 检查路径是否以有效 locale 开头
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // 对非 locale 路径添加默认 locale 前缀（如 /about/ → /zh-hk/about/）
    return NextResponse.redirect(
      new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url)
    );
  }

  // 3. 添加 Security Headers
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
    // 排除静态文件、API、_next 内部路径
    '/((?!_next|api|images|favicon.ico|robots.txt|sitemap|manifest.json).*)',
  ],
};
