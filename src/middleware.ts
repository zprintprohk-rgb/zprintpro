import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['zh-hk', 'en', 'ja'];
const defaultLocale = 'zh-hk';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // 如果路径已经是 /zh-hk/、/en/、/ja/ 开头，不做处理
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 根路径或其他路径重定向到默认语言
  const newUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    // 排除静态文件和API路径
    '/((?!_next|api|favicon.ico|robots.txt|sitemap|images|manifest).*)',
  ],
};
