/**
 * Next.js Middleware
 * - 统一URL规范：非www + https + 尾部斜杠
 * - 修复 /quote 无斜杠 → /quote/（带查询参数场景）
 * - 修复缺少 locale 前缀的路径（如 /about/ → /zh-hk/about/）
 * - 确保单次301直达，避免重定向链
 * - 添加 Security Headers
 * 
 * 执行顺序（优先级递减）：
 *   1. www → non-www
 *   2. HTTP → HTTPS
 *   3. 缺少 locale 前缀 → 添加默认 locale
 *   4. /quote 无斜杠 → /quote/（带查询参数）
 *   5. 全局尾部斜杠兜底
 * 
 * 每个条件匹配后立即 return，确保单次重定向
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// 需要强制加斜杠的 quote 路径（不包含文件扩展名）
const BARE_QUOTE_PATHS = ['/quote', '/en/quote', '/ja/quote', '/zh-hk/quote'];

// 支持的 locale 列表
const LOCALES = ['/zh-hk/', '/en/', '/ja/'];

// 默认 locale（香港繁中）
const DEFAULT_LOCALE = '/zh-hk/';

/**
 * quote?product=xxx → /product/xxx/ 产品 slug 映射表
 * 所有通过 /quote?product=xxx 被错误索引的页面，301 跳转到正确的产品详情页
 */
const QUOTE_PRODUCT_MAP: Record<string, string> = {
  'kraft-paper-bags': '/product/kraft-paper-bags/',
  'kraft-paper-packaging-box': '/product/kraft-paper-packaging-box/',
  'gift-boxes': '/product/gift-boxes/',
  'cosmetic-boxes': '/product/cosmetic-boxes/',
  'gift-bags': '/product/gift-bags/',
  'mailer-boxes': '/product/mailer-boxes/',
  'rigid-boxes': '/product/rigid-boxes/',
  'drawer-slide-gift-box': '/product/drawer-slide-gift-box/',
  'magnetic-closure-gift-box': '/product/magnetic-closure-gift-box/',
  'electronics-packaging-box': '/product/electronics-packaging-box/',
  'food-boxes': '/product/food-boxes/',
  'folding-boxes': '/product/folding-boxes/',
  'waterproof-stickers': '/product/waterproof-stickers/',
  'die-cut-stickers': '/product/die-cut-stickers/',
  'removable-stickers': '/product/removable-stickers/',
  'security-stickers': '/product/security-stickers/',
  'transparent-stickers': '/product/transparent-stickers/',
  'small-batch-stickers': '/product/small-batch-stickers/',
  'foil-stickers': '/product/foil-stickers/',
  'fluorescent-stickers': '/product/fluorescent-stickers/',
  'display-posters': '/product/display-posters/',
  'outdoor-posters': '/product/outdoor-posters/',
  'a2-posters': '/product/a2-posters/',
  'a1-posters': '/product/a1-posters/',
  'art-posters': '/product/art-posters/',
  'adhesive-posters': '/product/adhesive-posters/',
  'perfect-bound-books': '/product/perfect-bound-books/',
  'saddle-stitch-booklets': '/product/saddle-stitch-booklets/',
  'hardcover-books': '/product/hardcover-books/',
  'custom-calendars': '/product/custom-calendars/',
  'wall-calendars': '/product/wall-calendars/',
  'desk-calendars': '/product/desk-calendars/',
  'same-day-flyers': '/product/same-day-flyers/',
  'thick-paper-flyers': '/product/thick-paper-flyers/',
  'folded-leaflets': '/product/folded-leaflets/',
  'a4-flyers': '/product/a4-flyers/',
  'a5-flyers': '/product/a5-flyers/',
  'business-envelopes': '/product/business-envelopes/',
  'colored-envelopes': '/product/colored-envelopes/',
  'large-envelopes': '/product/large-envelopes/',
  'mesh-banners': '/product/mesh-banners/',
  'outdoor-vinyl-banners': '/product/outdoor-vinyl-banners/',
  'roll-up-banners': '/product/roll-up-banners/',
  'paper-bags': '/product/paper-bags/',
  'white-card-bags': '/product/white-card-bags/',
  'eco-paper-bags': '/product/eco-paper-bags/',
  // === Business Cards ===
  'premium-business-cards': '/product/premium-business-cards/',
  'thick-business-cards-400g': '/product/thick-business-cards-400g/',
  'foil-business-cards': '/product/foil-business-cards/',
  'spot-uv-business-cards': '/product/spot-uv-business-cards/',
  'matte-business-cards': '/product/matte-business-cards/',
  'rounded-corner-cards': '/product/rounded-corner-cards/',
  'double-sided-cards': '/product/double-sided-cards/',
  'same-day-business-cards': '/product/same-day-business-cards/',
  'eco-business-cards': '/product/eco-business-cards/',
  // === Handle Bags ===
  'handle-bags': '/product/handle-bags/',
  'small-bags': '/product/small-bags/',
  'large-bags': '/product/large-bags/',
  // === Eco Flyers ===
  'eco-flyers': '/product/eco-flyers/',
  'double-sided-flyers': '/product/double-sided-flyers/',
  // === Red Packets ===
  'foil-red-packets': '/product/foil-red-packets/',
  'embossed-red-packets': '/product/embossed-red-packets/',
  'custom-red-packets': '/product/custom-red-packets/',
  'cartoon-red-packets': '/product/cartoon-red-packets/',
  'eco-red-packets': '/product/eco-red-packets/',
  'large-red-packets': '/product/large-red-packets/',
  // === Mini Calendars ===
  'mini-calendars': '/product/mini-calendars/',
  'photo-frame-calendars': '/product/photo-frame-calendars/',
  'magnetic-calendars': '/product/magnetic-calendars/',
  // === Menus ===
  'pvc-menus': '/product/pvc-menus/',
  'laminated-menus': '/product/laminated-menus/',
  'hardcover-menus': '/product/hardcover-menus/',
  'drink-menus': '/product/drink-menus/',
  'disposable-menus': '/product/disposable-menus/',
  // === Additional Banners ===
  'adhesive-banners': '/product/adhesive-banners/',
  'vehicle-wraps': '/product/vehicle-wraps/',
  // === Books ===
  'catalog-printing': '/product/catalog-printing/',
  'spiral-notebooks': '/product/spiral-notebooks/',
  // === Envelopes ===
  'pearl-envelopes': '/product/pearl-envelopes/',
  // === Educational ===
  'exercise-books': '/product/exercise-books/',
  'certificates': '/product/certificates/',
  'school-flyers': '/product/school-flyers/',
  'textbooks': '/product/textbooks/',
};

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

  // 优先级3：缺少 locale 前缀 → 添加默认 locale（如 /about/ → /zh-hk/about/，301）
  // 检查是否以已知 locale 开头
  const hasLocale = LOCALES.some(locale => pathname === locale.slice(0, -1) || pathname.startsWith(locale));
  if (!hasLocale && !isFile) {
    // 确保路径以斜杠开头和结尾，以便拼接
    let cleanPath = pathname;
    if (!cleanPath.endsWith('/')) {
      cleanPath += '/';
    }
    url.pathname = DEFAULT_LOCALE + cleanPath.substring(1); // 去掉开头的 / 避免双斜杠
    // 保留查询参数
    return NextResponse.redirect(url, 301);
  }

  // 优先级4：/quote 无斜杠 → /quote/（保留查询参数，301）
  // Next.js trailingSlash: true 不处理查询参数前的路径，需手动处理
  if (BARE_QUOTE_PATHS.includes(pathname)) {
    url.pathname += '/';
    return NextResponse.redirect(url, 301);
  }

  // 优先级5：quote?product=xxx → /{locale}/product/xxx/ 301重定向
  // 核心SEO修复：如果quote页面有product参数，直接跳转到产品详情页
  const isQuotePath = /^\/(zh-hk|en|ja)\/quote\/?$/.test(pathname);
  if (isQuotePath) {
    const product = url.searchParams.get('product');
    if (product && QUOTE_PRODUCT_MAP[product]) {
      // 提取当前的 locale
      const localeMatch = pathname.match(/^\/(zh-hk|en|ja)/);
      const locale = localeMatch ? localeMatch[1] : 'zh-hk';
      url.pathname = `/${locale}${QUOTE_PRODUCT_MAP[product]}`;
      // 移除 product 查询参数，避免传递
      url.searchParams.delete('product');
      url.searchParams.delete('locale');
      return NextResponse.redirect(url, 301);
    }
  }

  // 优先级6：全局尾部斜杠兜底（对非文件路径，301）
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