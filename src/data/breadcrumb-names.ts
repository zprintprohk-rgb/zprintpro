/**
 * 轻量面包屑名称映射 — 仅供 Client Component 使用
 * 避免将含大段 HTML 的数据文件打包到客户端
 */

import { Locale } from '@/types/locale';
import { getBlogPostMetaBySlug } from '@/data/blog-posts';

// =============================================================================
// 通用路径段映射
// =============================================================================

const commonSegments: Record<string, Record<Locale, string>> = {
  products: { 'zh-hk': '產品', en: 'Products', ja: '製品' },
  product: { 'zh-hk': '產品詳情', en: 'Product', ja: '製品詳細' },
  category: { 'zh-hk': '產品分類', en: 'Categories', ja: '製品カテゴリ' },
  blog: { 'zh-hk': '印刷知識', en: 'Blog', ja: 'ブログ' },
  guide: { 'zh-hk': '印刷指南', en: 'Guides', ja: 'ガイド' },
  contact: { 'zh-hk': '聯絡我們', en: 'Contact', ja: 'お問い合わせ' },
  cart: { 'zh-hk': '購物車', en: 'Cart', ja: 'カート' },
  quote: { 'zh-hk': '報價', en: 'Quote', ja: '見積もり' },
  'case-studies': { 'zh-hk': '客戶案例', en: 'Case Studies', ja: '導入事例' },
  about: { 'zh-hk': '關於我們', en: 'About Us', ja: '会社概要' },
  faq: { 'zh-hk': '常見問題', en: 'FAQ', ja: 'よくある質問' },
  'help-center': { 'zh-hk': '幫助中心', en: 'Help Center', ja: 'ヘルプセンター' },
  terms: { 'zh-hk': '服務條款', en: 'Terms', ja: '利用規約' },
  privacy: { 'zh-hk': '隱私政策', en: 'Privacy', ja: 'プライバシー' },
  'company-news': { 'zh-hk': '公司新聞', en: 'Company News', ja: '会社ニュース' },
  'press-kit': { 'zh-hk': '媒體資源', en: 'Press Kit', ja: 'プレスキット' },
  'service-areas': { 'zh-hk': '服務地區', en: 'Service Areas', ja: 'サービスエリア' },
  search: { 'zh-hk': '搜索', en: 'Search', ja: '検索' },
  checkout: { 'zh-hk': '結帳', en: 'Checkout', ja: 'チェックアウト' },
  'order-confirmation': { 'zh-hk': '訂單確認', en: 'Order Confirmation', ja: '注文確認' },
  payment: { 'zh-hk': '付款', en: 'Payment', ja: 'お支払い' },
  success: { 'zh-hk': '付款成功', en: 'Payment Success', ja: '支払い完了' },
  stickers: { 'zh-hk': '貼紙印刷', en: 'Stickers', ja: 'シール印刷' },
  flyers: { 'zh-hk': '宣傳單張', en: 'Flyers', ja: 'チラシ印刷' },
  packaging: { 'zh-hk': '包裝盒定制', en: 'Packaging', ja: 'パッケージ印刷' },
  posters: { 'zh-hk': '定制海報', en: 'Posters', ja: 'ポスター印刷' },
  'paper-bags': { 'zh-hk': '紙袋印刷', en: 'Paper Bags', ja: '紙袋印刷' },
  'greeting-cards': { 'zh-hk': '賀卡印刷', en: 'Greeting Cards', ja: 'グリーティングカード・年賀状' },
  banners: { 'zh-hk': '噴繪廣告', en: 'Banners', ja: 'バナー印刷' },
  books: { 'zh-hk': '書籍印刷', en: 'Books', ja: '書籍印刷' },
  menus: { 'zh-hk': '餐牌印刷', en: 'Menus', ja: 'メニュー印刷' },
  envelopes: { 'zh-hk': '信封印刷', en: 'Envelopes', ja: '封筒印刷' },
  calendars: { 'zh-hk': '年曆印刷', en: 'Calendars', ja: 'カレンダー印刷' },
  'red-packets': { 'zh-hk': '利是封印刷', en: 'Red Packets', ja: 'ポチ袋印刷' },
  educational: { 'zh-hk': '校園教育印刷', en: 'Educational', ja: '教育印刷' },
  services: { 'zh-hk': '服務', en: 'Services', ja: 'サービス' },
  'rush-printing-delivery': { 'zh-hk': '即日速遞', en: 'Rush Printing & Delivery', ja: '特急印刷' },
};

// =============================================================================
// 支柱页 (guide/[slug])
// =============================================================================

const pillarNames: Record<string, Record<Locale, string>> = {
  'sticker-guide': {
    'zh-hk': '貼紙印刷完全指南',
    en: 'Complete Sticker Printing Guide',
    ja: 'シール印刷完全ガイド',
  },
  'flyer-guide': {
    'zh-hk': '宣傳單張印刷攻略',
    en: 'Flyer Printing Masterclass',
    ja: 'チラシ印刷マスターガイド',
  },
  'packaging-guide': {
    'zh-hk': '品牌包裝完全指南',
    en: 'Brand Packaging Guide',
    ja: 'ブランド包装完全ガイド',
  },
};

// =============================================================================
// 集群文章 (blog/[slug] — from pillar-content.ts clusters)
// =============================================================================

const clusterNames: Record<string, Record<Locale, string>> = {
  'sticker-materials': {
    'zh-hk': '防水貼紙材質比較：PVC vs 合成紙',
    en: 'Waterproof Sticker Materials: PVC vs Synthetic Paper',
    ja: '防水シール素材比較：PVCと合成紙',
  },
  'sticker-packaging-design': {
    'zh-hk': '產品包裝貼紙設計策略',
    en: 'Product Packaging Sticker Design',
    ja: '商品包装シールデザイン戦略',
  },
  'clear-vs-matte-stickers': {
    'zh-hk': '透明貼紙 vs 啞面貼紙',
    en: 'Clear vs Matte Stickers',
    ja: '透明シール vs マットシール',
  },
  'flyer-sizes-compared': {
    'zh-hk': 'A5 vs A6 傳單尺寸效果比較',
    en: 'A5 vs A6 Flyer Comparison',
    ja: 'A5 vs A6 チラシサイズ比較',
  },
  'flyer-distribution-strategy': {
    'zh-hk': '香港傳單派發策略',
    en: 'US Flyer Distribution Strategy',
    ja: '香港チラシ配布戦略',
  },
  'foil-flyers-industry': {
    'zh-hk': '燙金傳單行業應用',
    en: 'Foil Flyer Industry Applications',
    ja: '箔押しチラシの業界応用',
  },
  'rigid-vs-folding-boxes': {
    'zh-hk': '磁吸禮盒與摺疊盒成本比較',
    en: 'Rigid Box vs Folding Carton',
    ja: '箱包装の種類とコスト比較',
  },
  'eco-paper-bag-gsm': {
    'zh-hk': '環保紙袋趨勢與克重選擇指南',
    en: 'Eco Paper Bag Trends & GSM Selection',
    ja: 'エコ紙袋のトレンドと厚さ選び',
  },
  'packaging-color-psychology': {
    'zh-hk': '包裝設計色彩心理學',
    en: 'Packaging Color Psychology',
    ja: 'パッケージデザインの色彩心理学',
  },
};

// =============================================================================
// 选购指南 (blog/[slug] — from buying-guides.ts)
// =============================================================================

const buyingGuideNames: Record<string, Record<Locale, string>> = {
  'greeting-card-buying-guide': {
    'zh-hk': '賀卡印刷選購完全指南',
    en: 'Greeting Card Buying Guide',
    ja: 'グリーティングカード・年賀状印刷選び方完全ガイド',
  },
  'sticker-buying-guide': {
    'zh-hk': '貼紙印刷選購完全指南',
    en: 'Sticker Buying Guide',
    ja: 'ステッカー印刷選び方完全ガイド',
  },
  'flyer-buying-guide': {
    'zh-hk': '傳單印刷選購完全指南',
    en: 'Flyer Printing Buying Guide',
    ja: 'チラシ印刷選び方完全ガイド',
  },
  'packaging-buying-guide': {
    'zh-hk': '包裝盒定制選購完全指南',
    en: 'Packaging Box Buying Guide',
    ja: 'パッケージ箱選び方完全ガイド',
  },
  'poster-buying-guide': {
    'zh-hk': '海報印刷選購完全指南',
    en: 'Poster Printing Buying Guide',
    ja: 'ポスター印刷選び方完全ガイド',
  },
  'paper-bag-buying-guide': {
    'zh-hk': '紙袋印刷選購完全指南',
    en: 'Paper Bag Printing Buying Guide',
    ja: '紙袋印刷選び方完全ガイド',
  },
  'banner-buying-guide': {
    'zh-hk': '噴繪廣告選購完全指南',
    en: 'Banner Printing Buying Guide',
    ja: 'バナー印刷選び方完全ガイド',
  },
  'book-buying-guide': {
    'zh-hk': '書籍印刷選購完全指南',
    en: 'Book Printing Buying Guide',
    ja: '書籍印刷選び方完全ガイド',
  },
  'menu-buying-guide': {
    'zh-hk': '餐牌印刷選購完全指南',
    en: 'Menu Printing Buying Guide',
    ja: 'メニュー印刷選び方完全ガイド',
  },
};

// =============================================================================
// 遗留博客文章 (blog/[slug] — legacy posts in blog/[slug]/page.tsx)
// =============================================================================

const legacyBlogNames: Record<string, Record<Locale, string>> = {
  'company-intro': {
    'zh-hk': '智印雲印刷公司簡介',
    en: 'ZprintPro Company Introduction',
    ja: 'ZprintPro会社概要',
  },
  'sticker-guide': {
    'zh-hk': '香港貼紙印刷完全指南',
    en: 'Complete Sticker Printing Guide',
    ja: 'ステッカー印刷完全ガイド',
  },
  'business-card-design': {
    'zh-hk': '名片設計指南',
    en: 'Business Card Design Guide',
    ja: '名刺デザインガイド',
  },
  'packaging-trends': {
    'zh-hk': '包裝設計趨勢',
    en: 'Packaging Design Trends',
    ja: '包装デザインのトレンド',
  },
  'hong-kong-printing-guide': {
    'zh-hk': '香港印刷完全指南',
    en: 'US Custom Printing Guide',
    ja: '香港印刷完全ガイド',
  },
  'design-file-specs': {
    'zh-hk': '設計檔案規格指南',
    en: 'Design File Specifications',
    ja: 'デザインデータ規格ガイド',
  },
  'brand-materials-checklist': {
    'zh-hk': '品牌物料清單',
    en: 'Brand Materials Checklist',
    ja: 'ブランド物料チェックリスト',
  },
  'mtr-advertising-specs': {
    'zh-hk': '港鐵廣告規格',
    en: 'Event Poster Print Specs',
    ja: 'MTR広告規格',
  },
  'cmyk-guide': {
    'zh-hk': 'CMYK色彩指南',
    en: 'CMYK Color Guide',
    ja: 'CMYKカラーガイド',
  },
  'paper-materials': {
    'zh-hk': '紙張材質指南',
    en: 'Paper Materials Guide',
    ja: '用紙材質ガイド',
  },
  'eco-printing': {
    'zh-hk': '環保印刷指南',
    en: 'Eco Printing Guide',
    ja: 'エコ印刷ガイド',
  },
};

// =============================================================================
// 查找函数
// =============================================================================

export function getSegmentName(segment: string, locale: Locale): string {
  // 1. 通用路径
  if (commonSegments[segment]?.[locale]) {
    return commonSegments[segment][locale];
  }

  // 2. 支柱页
  if (pillarNames[segment]?.[locale]) {
    return pillarNames[segment][locale];
  }

  // 3. 集群文章
  if (clusterNames[segment]?.[locale]) {
    return clusterNames[segment][locale];
  }

  // 4. 选购指南
  if (buyingGuideNames[segment]?.[locale]) {
    return buyingGuideNames[segment][locale];
  }

  // 5. 遗留博客文章
  if (legacyBlogNames[segment]?.[locale]) {
    return legacyBlogNames[segment][locale];
  }

  // 6. 2026-07-05 fix: blog-posts.ts meta 拿标题（修复面包屑 fallback 到驼峰化 slug 的问题）
  // 优先于驼峰化 fallback, 避免 "Packaging Box Custom Guide" 这种英文 slug 显示
  const blogMeta = getBlogPostMetaBySlug(segment);
  if (blogMeta?.title?.[locale]) {
    return blogMeta.title[locale];
  }

  // 7. 兜底：返回原样（但首字母大写美化）
  return segment
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
