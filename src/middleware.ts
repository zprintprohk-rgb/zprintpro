/**
 * Next.js Middleware
 * - 统一URL规范：非www + https + 尾部斜杠
 * - 修复 /quote 无斜杠 → /quote/（带查询参数场景）
 * - 确保单次301直达，避免重定向链
 * - 添加 Security Headers
 * 
 * 执行顺序（优先级递减）：
 *   1. www → non-www
 *   2. HTTP → HTTPS
 *   3. /quote 无斜杠 → /quote/（带查询参数）
 *   4. 全局尾部斜杠兜底
 * 
 * 每个条件匹配后立即 return，确保单次重定向
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 需要强制加斜杠的 quote 路径（不包含文件扩展名）
const BARE_QUOTE_PATHS = ['/quote', '/en/quote', '/ja/quote', '/zh-hk/quote'];

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const host = request.headers.get('host') || '';

  // 优先级1：www → 非www（301，立即返回）
  if (host === 'www.zprintpro.com') {
    url.host = 'zprintpro.com';
    return NextResponse.redirect(url, 301);
  }

  // 优先级2：HTTP → HTTPS（301，立即返回）
  if (url.protocol === 'http:') {
    url.protocol = 'https:';
    return NextResponse.redirect(url, 301);
  }

  const { pathname } = url;
  const isFile = /\.\w+$/.test(pathname);

  // 跳过静态文件/API路径的尾部斜杠处理
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/robots.txt') ||
    pathname.startsWith('/sitemap') ||
    pathname.startsWith('/manifest.json')
  ) {
    return thisResponseWithHeaders();
  }

  // 优先级3：/quote 无斜杠 → /quote/（保留查询参数，301）
  // Next.js trailingSlash: true 不处理查询参数前的路径，需手动处理
  if (BARE_QUOTE_PATHS.includes(pathname)) {
    url.pathname += '/';
    return NextResponse.redirect(url, 301);
  }

  // 优先级4：全局尾部斜杠兜底（对非文件路径，301）
  if (!pathname.endsWith('/') && !isFile) {
    url.pathname += '/';
    return NextResponse.redirect(url, 301);
  }

  // 无重定向：添加 Security Headers 后返回
  return thisResponseWithHeaders();
}

function thisResponseWithHeaders() {
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