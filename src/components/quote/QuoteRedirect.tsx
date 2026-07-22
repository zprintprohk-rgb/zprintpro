'use client';

import { useEffect } from 'react';

interface QuoteRedirectProps {
  locale: string;
}

/**
 * QUOTE_PRODUCT_MAP - 从 middleware.ts 同步的产品映射表
 * /quote?product=xxx 中 product 参数值 → 产品详情页路径
 */
const QUOTE_PRODUCT_MAP: Record<string, string> = {
  // === Paper Bags ===
  'kraft-paper-bags': '/product/kraft-paper-bags/',
  'kraft-paper-packaging-box': '/product/kraft-paper-packaging-box/',
  // 2026-07-22 v6: gift-boxes 合并进 rigid-boxes (K3 拍板, GSC 28天数据互相抢词)
  'gift-boxes': '/product/rigid-boxes/',
  'cosmetic-boxes': '/product/cosmetic-boxes/',
  'gift-bags': '/product/gift-bags/',
  'mailer-boxes': '/product/mailer-boxes/',
  'rigid-boxes': '/product/rigid-boxes/',
  'drawer-slide-gift-box': '/product/drawer-slide-gift-box/',
  'magnetic-closure-gift-box': '/product/magnetic-closure-gift-box/',
  'electronics-packaging-box': '/product/electronics-packaging-box/',
  'food-boxes': '/product/food-boxes/',
  'folding-boxes': '/product/folding-boxes/',
  // === Stickers ===
  'waterproof-stickers': '/product/waterproof-stickers/',
  'die-cut-stickers': '/product/die-cut-stickers/',
  'removable-stickers': '/product/removable-stickers/',
  'security-stickers': '/product/security-stickers/',
  'transparent-stickers': '/product/transparent-stickers/',
  'small-batch-stickers': '/product/small-batch-stickers/',
  'foil-stickers': '/product/foil-stickers/',
  'fluorescent-stickers': '/product/fluorescent-stickers/',
  // === Posters ===
  'display-posters': '/product/display-posters/',
  'outdoor-posters': '/product/outdoor-posters/',
  'a2-posters': '/product/a2-posters/',
  'a1-posters': '/product/a1-posters/',
  'art-posters': '/product/art-posters/',
  'adhesive-posters': '/product/adhesive-posters/',
  // === Books ===
  'perfect-bound-books': '/product/perfect-bound-books/',
  'saddle-stitch-booklets': '/product/saddle-stitch-booklets/',
  'hardcover-books': '/product/hardcover-books/',
  'custom-calendars': '/product/custom-calendars/',
  'wall-calendars': '/product/wall-calendars/',
  'desk-calendars': '/product/desk-calendars/',
  // === Flyers ===
  'same-day-flyers': '/product/same-day-flyers/',
  'thick-paper-flyers': '/product/thick-paper-flyers/',
  'folded-leaflets': '/product/folded-leaflets/',
  'a4-flyers': '/product/a4-flyers/',
  'a5-flyers': '/product/a5-flyers/',
  // === Envelopes ===
  'business-envelopes': '/product/business-envelopes/',
  'colored-envelopes': '/product/colored-envelopes/',
  'large-envelopes': '/product/large-envelopes/',
  // === Banners ===
  'mesh-banners': '/product/mesh-banners/',
  'outdoor-vinyl-banners': '/product/outdoor-vinyl-banners/',
  'roll-up-banners': '/product/roll-up-banners/',
  // === Paper Bags variants ===
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

/**
 * 客户端硬重定向（SEO 修复版 v3）
 * 
 * 核心策略：/quote?product=xxx → window.location.href 硬重定向到 /{locale}/product/xxx/
 * 
 * 为什么用 window.location.href 而不是 router.replace？
 * 1. router.replace 是 SPA 客户端导航，不会触发 301 HTTP 状态码
 * 2. Googlebot 需要 301 来更新索引，但客户端 JS 无法发送 301
 * 3. 使用 window.location.href 是 true 硬导航，浏览器会发起新请求
 * 4. 配合 middleware.ts 的服务端 301（SSR 场景），双保险
 * 
 * Cloudflare Pages 场景说明：
 * - _redirects 不支持查询参数匹配（/?product=xxx）
 * - 静态导出时 middleware.ts 不运行
 * - 这是唯一的客户端兜底方案
 * 
 * Googlebot 抓取说明：
 * - Googlebot 会执行 JavaScript，看到 window.location.href
 * - Google 会将这种行为视为软重定向，数月后更新索引
 * - 配合 sitemap.xml 中的正确 URL，加速索引更新
 * 
 * 新增产品映射时需同步更新：
 * 1. 本文件 QUOTE_PRODUCT_MAP
 * 2. middleware.ts QUOTE_PRODUCT_MAP
 * 3. public/_redirects（Cloudflare Pages 重定向规则）
 */
export function QuoteRedirect({ locale }: QuoteRedirectProps) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const product = params.get('product');

    if (!product) {
      // 无 product 参数 → 基础报价表单页（不应被直接访问，重定向到 contact）
      window.location.href = `/${locale}/contact/`;
      return;
    }

    // 有 product 参数 → 查找产品映射，硬重定向到产品详情页
    const productPath = QUOTE_PRODUCT_MAP[product];
    if (productPath) {
      // 保留其他查询参数（如果有的话，去掉 product 和 locale 参数）
      params.delete('product');
      params.delete('locale');
      const remainingParams = params.toString();
      const targetUrl = `/${locale}${productPath}${remainingParams ? '?' + remainingParams : ''}`;
      window.location.href = targetUrl;
    } else {
      // 未映射的产品 → 重定向到 contact 页面
      window.location.href = `/${locale}/contact/?product=${encodeURIComponent(product)}`;
    }
  }, [locale]);

  // 重定向期间不渲染任何内容（只显示加载状态）
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#2873F5] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Redirecting...</p>
      </div>
    </main>
  );
}