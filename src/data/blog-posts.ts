/**
 * Unified Blog Posts Metadata (2026-06-25)
 *
 * Single source of truth for /blog/ list page + /blog/[slug]/ detail page.
 * Replaces the previous hardcoded slug arrays in BlogContent.tsx (caused
 * subcategory counts to all read 0) and the legacy `posts` object in
 * [slug]/page.tsx.
 *
 * 20 articles total:
 *   - 9 Buying Guides (from @/data/buying-guides.ts)  → categoryKey='buying-guide'
 *   - 11 Legacy Posts (from [slug]/page.tsx posts)    → categoryKey from real category
 *
 * Note: full article content (HTML strings) still lives in:
 *   - buying-guides.ts (for the 9 guides)
 *   - [slug]/page.tsx  (legacy `posts` object for the 10 legacy articles)
 * Use `getBlogPostMetaBySlug(slug)` for metadata here, and the respective
 * `getBuyingGuideBySlug(slug)` / `legacyPosts[locale][slug].content` for body.
 */

import { Locale } from '@/lib/seo';

export type BlogCategoryKey =
  | 'company-news'
  | 'sticker'
  | 'card'
  | 'packaging'
  | 'printing'
  | 'design'
  | 'branding'
  | 'hongkong'
  | 'trends'
  | 'flyers'
  | 'food-packaging'
  | 'paper-bags'
  | 'posters'
  | 'restaurant-flyer'
  | 'buying-guide'
  | 'menus'
  | 'red-packets'
  | 'cross-border'
  | 'education'
  | 'creator-ip'
  | 'banners'
  | 'wedding-envelope'
  | 'japan-doujin';

export type BlogPostSource = 'buying-guide' | 'legacy';

export interface BlogPostMeta {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  date: string;
  categoryKey: BlogCategoryKey;
  /**
   * Cover image per locale. Optional since 2026-07-04 — 每日 SEO 深度博客 (no-image)
   * 不写 cover,UI 会跳过 hero 图渲染,纯文字输出。当 cover 缺失或为空字符串时
   * getBlogCover 返回 '',UI 用此判定是否渲染 hero。
   */
  cover?: Record<Locale, string>;
  source: BlogPostSource;
}

export const defaultCover: Record<Locale, string> = {
  'zh-hk': '/images/blog/zh-hk/sticker-guide.webp',
  en: '/images/blog/zh-hk/sticker-guide.webp',
  ja: '/images/blog/zh-hk/sticker-guide.webp',
};

// =============================================================================
// 9 BUYING GUIDES  (categoryKey='buying-guide', dates 2025-01~02)
// =============================================================================

const bgBusinessCard: BlogPostMeta = {
  slug: 'business-card-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '名片印刷選購完全指南：材質、工藝、價格一次搞懂',
    en: 'Business Card Buying Guide: Materials, Finishes & Pricing Explained',
    ja: '名刺印刷選び方完全ガイド：材質、加工、価格を徹底解説',
  },
  excerpt: {
    'zh-hk': '從300g銅版紙到400g厚紙、從燙金到局部UV，香港名片印刷選購全攻略。智印雲印刷專家為您拆解材質、工藝與價格。',
    en: 'From 300g art paper to 400g thick stock, from foil stamping to spot UV — a complete guide to choosing business cards in Hong Kong.',
    ja: '300gアート紙から400g厚紙まで、箔押しから局部UVまで—香港名刺印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-zh-hk.webp',
    en: '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en.webp',
    ja: '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-ja.webp',
  },
};

const bgSticker: BlogPostMeta = {
  slug: 'sticker-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '貼紙印刷選購完全指南：材質、形狀、用途全解析',
    en: 'Sticker Buying Guide: Materials, Shapes & Applications Explained',
    ja: 'ステッカー印刷選び方完全ガイド：材質、形状、用途を徹底解説',
  },
  excerpt: {
    'zh-hk': '防水貼紙、透明貼紙、異形模切貼紙、燙金貼紙...面對眾多選擇如何下手？智印雲為您整理香港貼紙印刷的完整選購攻略。',
    en: 'Waterproof, transparent, die-cut, foil stickers — a complete guide to choosing the right sticker type for your needs.',
    ja: '防水ステッカー、透明ステッカー、ダイカットステッカー、箔押しステッカー—あなたのニーズに最適なステッカー選び方ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk.webp',
    en: '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en.webp',
    ja: '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja.webp',
  },
};

const bgFlyer: BlogPostMeta = {
  slug: 'flyer-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '傳單印刷選購完全指南：尺寸、紙質、摺法全攻略',
    en: 'Flyer Printing Buying Guide: Sizes, Paper & Folding Options',
    ja: 'チラシ印刷選び方完全ガイド：サイズ、用紙、折り方を徹底解説',
  },
  excerpt: {
    'zh-hk': 'A4傳單、A5傳單、對摺、三摺頁...傳單印刷點樣揀？智印雲為您整理香港傳單印刷的完整選購攻略。',
    en: 'A4 flyers, A5 flyers, bi-fold, tri-fold — a complete guide to choosing flyer printing in Hong Kong for maximum marketing impact.',
    ja: 'A4チラシ、A5チラシ、二つ折り、三つ折り—香港チラシ印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-ja-1.webp',
  },
};

const bgPackaging: BlogPostMeta = {
  slug: 'packaging-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '包裝盒定制選購完全指南：盒型、材質、工藝一次搞懂',
    en: 'Packaging Box Buying Guide: Styles, Materials & Finishes',
    ja: 'パッケージ箱選び方完全ガイド：箱型、材質、加工を徹底解説',
  },
  excerpt: {
    'zh-hk': '禮品盒、快遞盒、化妝品盒、食品盒...包裝盒點樣揀？智印雲為您整理香港包裝盒定制的完整選購攻略。',
    en: 'Gift boxes, shipping boxes, cosmetic boxes, food boxes — a complete guide to custom packaging in Hong Kong.',
    ja: 'ギフトボックス、配送箱、化粧品箱、食品箱—香港パッケージ印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja-1.webp',
  },
};

const bgPoster: BlogPostMeta = {
  slug: 'poster-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '海報印刷選購完全指南：尺寸、紙質、用途全解析',
    en: 'Poster Printing Buying Guide: Sizes, Paper & Applications',
    ja: 'ポスター印刷選び方完全ガイド：サイズ、用紙、用途を徹底解説',
  },
  excerpt: {
    'zh-hk': 'A1海報、A2海報、戶外海報、藝術海報...海報印刷點樣揀？智印雲為您整理香港海報印刷的完整選購攻略。',
    en: 'A1 posters, A2 posters, outdoor posters, art posters — a complete guide to poster printing in Hong Kong.',
    ja: 'A1ポスター、A2ポスター、屋外ポスター、アートポスター—香港ポスター印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-posters-a2-posters-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-1.webp',
  },
};

const bgPaperBag: BlogPostMeta = {
  slug: 'paper-bag-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-01-15',
  title: {
    'zh-hk': '紙袋印刷選購完全指南：紙質、尺寸、手挽全攻略',
    en: 'Paper Bag Printing Buying Guide: Materials, Sizes & Handles',
    ja: '紙袋印刷選び方完全ガイド：材質、サイズ、持ち手を徹底解説',
  },
  excerpt: {
    'zh-hk': '牛皮紙袋、白卡紙袋、禮品紙袋...紙袋印刷點樣揀？智印雲為您整理香港紙袋印刷的完整選購攻略。',
    en: 'Kraft bags, white card bags, gift bags — a complete guide to paper bag printing in Hong Kong.',
    ja: 'クラフト袋、白卡紙袋、ギフト袋—香港紙袋印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-1.webp',
  },
};

const bgBanner: BlogPostMeta = {
  slug: 'banner-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-02-01',
  title: {
    'zh-hk': '噴繪廣告選購完全指南：X展架、易拉寶、背景板全攻略',
    en: 'Banner Printing Buying Guide: X-Stands, Roll-ups & Backdrops',
    ja: 'バナー印刷選び方完全ガイド：Xスタンド、ロールアップ、背景板を徹底解説',
  },
  excerpt: {
    'zh-hk': 'X展架、易拉寶、背景板、戶外大橫幅...噴繪廣告點樣揀？智印雲為您整理香港噴繪廣告的完整選購攻略。',
    en: 'X-stands, roll-ups, backdrops, outdoor banners — a complete guide to banner printing in Hong Kong.',
    ja: 'Xスタンド、ロールアップ、背景板、屋外横断幕—香港バナー印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-zh-hk.webp',
    en: '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-en.webp',
    ja: '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-ja.webp',
  },
};

const bgBook: BlogPostMeta = {
  slug: 'book-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-02-05',
  title: {
    'zh-hk': '書籍印刷選購完全指南：裝訂方式、紙張、封面工藝全攻略',
    en: 'Book Printing Buying Guide: Binding, Paper & Cover Finishes',
    ja: '書籍印刷選び方完全ガイド：製本方式、紙、表紙加工を徹底解説',
  },
  excerpt: {
    'zh-hk': '騎馬釘、膠裝、精裝...書籍印刷點樣揀？智印雲為您整理香港書籍印刷的完整選購攻略。',
    en: 'Saddle-stitch, perfect binding, hardcover — a complete guide to book printing in Hong Kong.',
    ja: '中綴じ、無線綴じ、上製本—香港書籍印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja-1.webp',
  },
};

const bgMenu: BlogPostMeta = {
  slug: 'menu-buying-guide',
  categoryKey: 'buying-guide',
  source: 'buying-guide',
  date: '2025-02-10',
  title: {
    'zh-hk': '餐牌印刷選購完全指南：材質、工藝、耐用度全攻略',
    en: 'Menu Printing Buying Guide: Materials, Finishes & Durability',
    ja: 'メニュー印刷選び方完全ガイド：材質、加工、耐久性を徹底解説',
  },
  excerpt: {
    'zh-hk': 'PVC餐牌、過膠餐牌、硬膠套、皮革餐牌...餐牌印刷點樣揀？智印雲為您整理香港餐牌印刷的完整選購攻略。',
    en: 'PVC menus, laminated menus, hard sleeves, leather menus — a complete guide to menu printing in Hong Kong.',
    ja: 'PVCメニュー、ラミネートメニュー、硬質ケース、革メニュー—香港メニュー印刷の選び方完全ガイド。',
  },
  cover: {
    'zh-hk': '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk-1.webp',
    en: '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en-1.webp',
    ja: '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja-1.webp',
  },
};

// =============================================================================
// 10 LEGACY POSTS  (from [slug]/page.tsx `posts` object, dates 2024-03~06)
// =============================================================================

const lpCompanyIntro: BlogPostMeta = {
  slug: 'company-intro',
  categoryKey: 'company-news',
  source: 'legacy',
  date: '2024-06-01',
  title: {
    'zh-hk': '智印雲印刷公司簡介：專業設備與一站式印刷服務',
    en: 'About ZprintPro: Professional Equipment & One-Stop Printing Services',
    ja: 'ZprintPro会社概要：専門設備とワンストップ印刷サービス',
  },
  excerpt: {
    'zh-hk': '智印雲擁有海德堡6+1印刷機、HP數碼印刷機、馬天尼膠裝線等先進設備，提供從設計到印刷到後加工的一站式服務。',
    en: 'ZprintPro features Heidelberg 6+1 printing presses, HP digital printers, and Martini perfect binding lines for full-service printing solutions.',
    ja: 'ZprintProはハイデルベルグ6+1印刷機、HPデジタル印刷機、マルティニ製本ラインなどの先進設備を保有し、ワンストップ印刷サービスを提供しています。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/company-intro.webp',
    en: '/images/blog/en/company-intro.webp',
    ja: '/images/blog/ja/company-intro.webp',
  },
};

const lpStickerGuide: BlogPostMeta = {
  slug: 'sticker-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2024-04-15',
  title: {
    'zh-hk': '香港貼紙印刷完全指南：材質、工藝與應用場景詳解',
    en: 'Complete Sticker Printing Guide: Materials, Finishes & Applications',
    ja: '香港ステッカー印刷完全ガイド：材質、加工、応用シーンを詳解',
  },
  excerpt: {
    'zh-hk': '深入了解香港貼紙印刷的各種材質選擇、表面處理工藝以及不同場景的應用建議。智印雲專家為您詳解防水、透明、燙金等熱門選項。',
    en: 'Deep dive into sticker material choices, surface treatments, and application scenarios.',
    ja: '香港ステッカー印刷の様々な材質選択、表面処理、応用シーンを詳しく解説。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/sticker-guide.webp',
    en: '/images/blog/en/sticker-guide.webp',
    ja: '/images/blog/ja/sticker-guide.webp',
  },
};

const lpBusinessCardDesign: BlogPostMeta = {
  slug: 'business-card-design',
  categoryKey: 'card',
  source: 'legacy',
  date: '2024-04-10',
  title: {
    'zh-hk': '名片設計的10個黃金法則：打造令人難忘的專業形象',
    en: '10 Golden Rules for Business Card Design',
    ja: '名刺デザインの10の黄金法則：印象に残るプロフェッショナルイメージを作る',
  },
  excerpt: {
    'zh-hk': '從排版到色彩搭配，掌握名片設計的核心技巧。智印雲設計專家分享10個黃金法則，助您打造令人印象深刻的專業名片。',
    en: 'Master the core techniques of business card design.',
    ja: 'レイアウトから色の組み合わせまで、名刺デザインの中核テクニックをマスター。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/business-card-design.webp',
    en: '/images/blog/en/business-card-design.webp',
    ja: '/images/blog/ja/business-card-design.webp',
  },
};

const lpPackagingTrends: BlogPostMeta = {
  slug: 'packaging-trends',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2024-04-05',
  title: {
    'zh-hk': '2024包裝盒設計趨勢解析：讓產品在貨架上脫穎而出',
    en: '2024 Packaging Design Trends Analysis',
    ja: '2024パッケージボックスデザイントレンド解析',
  },
  excerpt: {
    'zh-hk': '探索2024年最新包裝盒設計趨勢，從極簡主義到環保材質。智印雲為您解析如何讓產品包裝成為品牌最佳代言人。',
    en: 'Explore latest packaging design trends.',
    ja: '2024年最新パッケージボックスデザイントレンドを探る。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-packaging-trends-zh-hk.webp',
    en: '/images/blog/blog-sticker-guide-en.webp',
    ja: '/images/blog/blog-sticker-guide-ja.webp',
  },
};

const lpCmykGuide: BlogPostMeta = {
  slug: 'cmyk-guide',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2024-03-28',
  title: {
    'zh-hk': 'CMYK vs RGB：印刷色彩模式完全詳解',
    en: 'CMYK vs RGB: Complete Guide to Print Color Modes',
    ja: 'CMYK vs RGB：印刷カラーモード完全詳解',
  },
  excerpt: {
    'zh-hk': '理解CMYK和RGB色彩模式的區別，確保您的設計在印刷時呈現最佳效果。智印雲印刷專家為您詳解色彩管理。',
    en: 'Understand color modes for optimal print results.',
    ja: 'CMYKとRGBカラーモードの違いを理解し、印刷で最適な効果を得る。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-sticker-guide-zh-hk.webp',
    en: '/images/blog/blog-business-card-design-en-3.webp',
    ja: '/images/blog/blog-business-card-design-ja-3.webp',
  },
};

const lpPaperMaterials: BlogPostMeta = {
  slug: 'paper-materials',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2024-03-20',
  title: {
    'zh-hk': '印刷紙材選擇指南：從銅版紙到特種紙',
    en: 'Paper Selection Guide: From Art Paper to Specialty Stock',
    ja: '印刷紙材選択ガイド：コート紙から特殊紙まで',
  },
  excerpt: {
    'zh-hk': '不同紙材的特性與適用場景分析，幫助您為項目選擇最合適的印刷紙張。智印雲300+種紙材任您選擇。',
    en: 'Analysis of different paper characteristics.',
    ja: '異なる紙材の特性と適用シーンの分析。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-packaging-trends-zh-hk.webp',
    en: '/images/blog/blog-sticker-guide-en.webp',
    ja: '/images/blog/blog-sticker-guide-ja.webp',
  },
};

const lpEcoPrinting: BlogPostMeta = {
  slug: 'eco-printing',
  categoryKey: 'trends',
  source: 'legacy',
  date: '2024-03-15',
  title: {
    'zh-hk': '環保印刷：企業ESG與可持續包裝的未來',
    en: 'Eco-Friendly Printing: The Future of Sustainable Packaging',
    ja: 'エコ印刷：企業のESGと持続可能なパッケージの未来',
  },
  excerpt: {
    'zh-hk': '了解環保印刷材料和工藝，為地球和品牌形象雙贏做出選擇。智印雲助您實現綠色印刷目標。',
    en: 'Learn about eco-friendly printing materials.',
    ja: 'エコ印刷材料と工程を理解し、地球とブランドイメージの双赢を選択。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-packaging-trends-zh-hk-2.webp',
    en: '/images/blog/blog-sticker-guide-en-2.webp',
    ja: '/images/blog/blog-sticker-guide-ja-2.webp',
  },
};

const lpHKPrintingGuide: BlogPostMeta = {
  slug: 'hong-kong-printing-guide',
  categoryKey: 'hongkong',
  source: 'legacy',
  date: '2024-05-20',
  title: {
    'zh-hk': '香港印刷公司選擇完全指南：觀塘、九龍、新界哪裡最可靠？',
    en: 'Hong Kong Printing Company Guide: Kwun Tong, Kowloon & NT',
    ja: '香港印刷会社選択完全ガイド',
  },
  excerpt: {
    'zh-hk': '深入比較香港觀塘、九龍、新界的印刷公司，從價格、品質、交貨速度到客戶評價，幫您找到最適合的印刷合作夥伴。',
    en: 'Compare printing companies across Hong Kong from pricing to quality to find your ideal partner.',
    ja: '香港各区の印刷会社を価格、品質、納期から比較。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-sticker-guide-zh-hk.webp',
    en: '/images/blog/blog-sticker-guide-en-2.webp',
    ja: '/images/blog/blog-sticker-guide-ja-2.webp',
  },
};

const lpDesignFileSpecs: BlogPostMeta = {
  slug: 'design-file-specs',
  categoryKey: 'design',
  source: 'legacy',
  date: '2024-05-15',
  title: {
    'zh-hk': '印刷文件設計規範：出血位、分辨率、色彩模式一次搞懂',
    en: 'Print File Design Specifications: Bleed, Resolution & Color Modes',
    ja: '印刷ファイルデザイン仕様',
  },
  excerpt: {
    'zh-hk': '從出血位設置到色彩模式轉換，這篇指南將幫助設計師和企業避免最常見的印刷文件錯誤。',
    en: 'Master bleed settings, resolution requirements, and color mode conversions for perfect prints.',
    ja: 'ブリード、解像度、カラーモードの変換をマスター。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-sticker-guide-zh-hk-2.webp',
    en: '/images/blog/blog-sticker-guide-en-3.webp',
    ja: '/images/blog/blog-sticker-guide-ja-3.webp',
  },
};

const lpBrandChecklist: BlogPostMeta = {
  slug: 'brand-materials-checklist',
  categoryKey: 'branding',
  source: 'legacy',
  date: '2024-05-10',
  title: {
    'zh-hk': '企業品牌物料清單：從名片到展架的全套印刷方案',
    en: 'Corporate Brand Materials Checklist: From Cards to Displays',
    ja: '企業ブランド資材チェックリスト',
  },
  excerpt: {
    'zh-hk': '無論是初創企業還是品牌升級，這份完整的品牌物料印刷清單將幫助您系統化地規劃所有印刷需求。',
    en: 'A complete checklist of printed brand materials for startups and brand refreshes.',
    ja: 'スタートアップからブランドリニューアルまで、完全な印刷資材チェックリスト。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-business-card-design-zh-hk.webp',
    en: '/images/blog/blog-business-card-design-en.webp',
    ja: '/images/blog/blog-business-card-design-ja.webp',
  },
};

const lpMtrSpecs: BlogPostMeta = {
  slug: 'mtr-advertising-specs',
  categoryKey: 'hongkong',
  source: 'legacy',
  date: '2024-05-05',
  title: {
    'zh-hk': '港鐵廣告印刷規格全解析：港島線、觀塘線、荃灣線投放指南',
    en: 'MTR Advertising Print Specs: Island, Kwun Tong & Tsuen Wan Lines',
    ja: 'MTR広告印刷規格全解析',
  },
  excerpt: {
    'zh-hk': '詳細解析港鐵各線路廣告位的印刷規格、尺寸要求和投放策略，助您在香港最繁忙的交通網絡中精準觸達目標客戶。',
    en: 'Detailed specifications and strategies for MTR advertising across Hong Kong.',
    ja: 'MTR各路線の広告枠の印刷規格、サイズ要件、投放戦略を詳しく解説。',
  },
  cover: {
    'zh-hk': '/images/blog/blog-business-card-design-zh-hk-2.webp',
    en: '/images/blog/blog-business-card-design-en-2.webp',
    ja: '/images/blog/blog-business-card-design-ja-2.webp',
  },
};

const lpFlyerPrintingGuide: BlogPostMeta = {
  slug: 'flyer-printing-guide',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '香港傳單印刷完全指南：尺寸、紙質、設計到派發全攻略',
    en: 'Flyer Printing Guide: Sizes, Paper, Design & Distribution in Hong Kong',
    ja: '香港チラシ印刷完全ガイド：サイズ、用紙、デザイン、配布まで徹底解説',
  },
  excerpt: {
    'zh-hk': '從A4傳單、A5傳單到三摺傳單，材質從銅版紙到書紙，智印雲為您拆解香港傳單印刷的尺寸選擇、紙質對比、設計要點與派發策略。',
    en: 'From A4 to A5, bi-fold to tri-fold, art paper to book paper — a complete guide to flyer printing in Hong Kong for marketing impact.',
    ja: 'A4、A5、二つ折り、三つ折り、コート紙から書籍用紙まで—香港チラシ印刷のサイズ、材質、デザイン、配布戦略を徹底解説。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/flyer-printing-guide.webp',
    en: '/images/blog/en/flyer-printing-guide.webp',
    ja: '/images/blog/ja/flyer-printing-guide.webp',
  },
};

const lpFoodPackagingGuide: BlogPostMeta = {
  slug: 'food-packaging-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '食品包裝印刷完全指南：材質、安全、法規與設計實務',
    en: 'Food Packaging Printing Guide: Materials, Safety & Compliance',
    ja: '食品パッケージ印刷完全ガイド：材質、安全性、法規制とデザイン実務',
  },
  excerpt: {
    'zh-hk': '食品級包裝印刷點樣揀？從牛皮紙盒到食品級淋膜，食品安全認證到設計實務，智印雲為您拆解食品包裝印刷的每個關鍵環節。',
    en: 'Food-grade packaging printing essentials — from kraft boxes to food-safe lamination, certifications to design best practices.',
    ja: '食品グレードパッケージ印刷の選び方—クラフト紙箱から食品対応ラミネート、認証からデザイン実務まで徹底解説。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/food-packaging-printing-guide.webp',
    en: '/images/blog/en/food-packaging-printing-guide.webp',
    ja: '/images/blog/ja/food-packaging-printing-guide.webp',
  },
};

const lpPaperBagPrintingGuide: BlogPostMeta = {
  slug: 'paper-bag-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '香港紙袋印刷完全指南：材質、尺寸、手挽與設計趨勢',
    en: 'Paper Bag Printing Guide: Materials, Sizes, Handles & Design Trends',
    ja: '香港紙袋印刷完全ガイド：材質、サイズ、持ち手とデザイントレンド',
  },
  excerpt: {
    'zh-hk': '牛皮紙袋、白卡紙袋、禮品紙袋、環保紙袋...紙袋印刷點樣揀？智印雲為您拆解香港紙袋印刷的材質、尺寸、手挽選擇與設計趨勢。',
    en: 'Kraft bags, white card bags, gift bags, eco bags — a complete guide to paper bag printing in Hong Kong.',
    ja: 'クラフト袋、白卡紙袋、ギフト袋、エコ袋—香港紙袋印刷の材質、サイズ、持ち手、デザイントレンドを徹底解説。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/paper-bag-printing-guide.webp',
    en: '/images/blog/en/paper-bag-printing-guide.webp',
    ja: '/images/blog/ja/paper-bag-printing-guide.webp',
  },
};


const lpPosterPrintingGuide: BlogPostMeta = {
  slug: 'poster-printing-guide',
  categoryKey: 'printing',
  source: 'legacy',
  date: '2026-07-02',
  title: {
    'zh-hk': '香港海報印刷完全指南：尺寸、紙質、工藝與設計要點',
    en: 'Poster Printing Guide: Sizes, Paper, Finishes & Design Tips in Hong Kong',
    ja: '香港ポスター印刷完全ガイド：サイズ、用紙、加工、デザインのポイント',
  },
  excerpt: {
    'zh-hk': '從A3到A0，從銅版紙到PP膠片，從海報筒包裝到批量交貨，智印雲為您拆解香港海報印刷的尺寸選擇、紙質對比、工藝選項與設計要點。',
    en: 'From A3 to A0, art paper to PP film, from tube packaging to bulk delivery — a comprehensive guide to poster printing in Hong Kong by ZprintPro.',
    ja: 'A3からA0まで、アート紙からPPフィルムまで、ポスター筒包装から一括納品まで—香港ポスタープリントのサイズ、素材、加工、デザインのポイントを徹底解説。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/poster-printing-guide.webp',
    en: '/images/blog/en/poster-printing-guide.webp',
    ja: '/images/blog/ja/poster-printing-guide.webp',
  },
};

const lpPackagingBoxCustomGuide: BlogPostMeta = {
  slug: 'packaging-box-custom-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-03',
  // 2026-07-05 fix (NAP vs SEO 内容脱钩): zh-hk 用户市场 = 香港 (保留 HK 视角);
  // en/ja 用户市场 = US/UK/AU/JP, 标题里硬塞"in Hong Kong / 香港" = 机械翻译, 无认同感.
  // en: 全球通用 + 强调"6 盒型对比 + 2026 最新"; ja: 强调"6 つの箱型徹底比較"
  title: {
    'zh-hk': '香港包裝盒訂製完全指南：盒型、材質、工藝與預算控制',
    en: 'Custom Packaging Box Guide 2026: 6 Box Styles, Materials & Finishes Compared | ZprintPro',
    ja: 'パッケージ箱カスタム完全ガイド2026：6つの箱型・素材・加工を徹底比較 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '從天地盒到飛機盒，從白卡紙到特種紙，從燙金到擊凸——智印雲為您拆解香港包裝盒訂製的盒型選擇、紙材對比、工藝搭配與預算控制策略，助您用合理成本打造品牌專屬包裝。',
    en: 'Lid-base, book-style, drawer, mailer, magnetic — 6 main box styles compared side by side. Pick the right box for your brand and budget, with paper tier and finish recommendations.',
    ja: '天地蓋箱・ブック型・引き出し箱・メールナー箱・マグネット式——6つの主要箱型を横並びで徹底比較。ブランドと予算に合った箱を、素材と加工の提案とともにお届け。',
  },
  cover: {
    'zh-hk': '/images/blog/zh-hk/sticker-guide.webp',
    en: '/images/blog/en/sticker-guide.webp',
    ja: '/images/blog/ja/sticker-guide.webp',
  },
};

// 2026-07-04 v2 純文字深度博客 (no cover, no inline img) — Tier A 行業 × P0 flyers 類目
const lpRestaurantOpeningFlyer: BlogPostMeta = {
  slug: 'restaurant-opening-flyer-printing-guide',
  categoryKey: 'flyers',
  source: 'legacy',
  date: '2026-07-04',
  title: {
    // 2026-07-05 fix (NAP vs SEO 内容脱钩): zh-hk 用户市场 = 香港 (保留 HK 视角);
    // en/ja 用户市场 = US/UK/AU/JP, 标题硬塞"Shenzhen Printing / 深圳印刷" = 机械翻译, 无认同感.
    // a38dc93 之前判断"en/ja 保留深圳 supplier origin"是错的——supplier origin 应在正文 (DHL/全球配送) 提及,
    // 不应塞标题主关键词前面. 改为全球通用 + 强调卖点 (size/paper/design)
    'zh-hk': '餐廳開業傳單印刷完全攻略 · 2026 香港餐飲開業旺季 | 智印雲 ZprintPro',
    en: 'Restaurant Opening Flyer Printing Guide: Sizes, Paper & Design Tips | ZprintPro',
    ja: 'レストラン開業チラシ印刷ガイド：サイズ・用紙・デザインの徹底解説 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '2026 年香港餐飲開業旺季,一張高質素傳單決定客人是否記得你的店。智印雲為香港餐廳老闆提供 50-200 張小批量到 5,000 張大批量傳單印刷,3 個工作天交期,DHL 全球 2-4 天到貨,順豐本地同日取貨。',
    en: 'Opening a new restaurant? A premium flyer decides whether walk-ins remember your shop. From 50-200 small batches to 5,000 bulk prints, 3-day turnaround, DHL 2-4 day global delivery from Asia factory.',
    ja: '新規オープン飲食店様へ。高品質チラシが walk-in 顧客の記憶に残るかどうかを決める。50-200枚小ロットから5,000枚大批注まで、3営業日納品、アジア工場から DHL 2-4日全世界配送。',
  },
  // 故意不写 cover 字段 — 純文字博客 (v2 硬约束 2026-07-04)
  // getBlogCover 检测 meta.cover 为 undefined 时返回 '',page.tsx 据此跳过 hero 图渲染
};

// 2026-07-06 v4 純文字深度博客 (no cover) — Tier A 寵物 × P0 stickers 類目
const lpPetFoodSticker: BlogPostMeta = {
  slug: 'pet-food-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    // NAP vs SEO 脱钩: zh-hk = 香港本地場景詞 (MTR/順豐/Pet Mart); en/ja = 全球通用 (waterproof/FDA/material)
    'zh-hk': '香港寵物食品品牌貼紙印刷指南 · 防水防油 FDA 認證 | 智印雲 ZprintPro',
    en: 'Pet Food Brand Sticker Printing Guide: Waterproof, Food-Safe Labels | ZprintPro',
    ja: 'ペットフードステッカー印刷ガイド：防水・FDA準拠ラベル素材 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '2026 年香港寵物市場規模突破 35 億,寵物食品、保健品、零食品牌爭相推新。一張高質素、防水防油的寵物食品貼紙決定貨架轉化率。智印雲為香港本地及跨境寵物品牌提供 FDA 認證食品級貼紙,1,000-100,000 枚小至大批量,5-7 個工作天,DHL 全球 2-4 天到貨。',
    en: 'Pet food, treat, supplement brand owners — premium waterproof and food-safe stickers decide shelf conversion. FDA-compliant label materials, 1,000 to 100,000-piece runs, 5-7 working day delivery from Asia factory with DHL 2-4 day global shipping.',
    ja: 'ペットフード・おやつ・サプリメントブランドオーナー様へ。防水・食品衛生基準準拠ステッカーが棚前転換率を決める。FDA 準拠素材、1,000〜100,000枚小〜大ロット、5-7営業日納品、DHL 2-4日全世界配送。',
  },
};

// 2026-07-06 v4 純文字深度博客 (no cover) — Tier A 服裝 × P0 paper-bags 類目
const lpApparelShoppingBag: BlogPostMeta = {
  slug: 'apparel-shopping-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '香港服裝品牌紙袋印刷指南 · 環保購物袋品牌升級 | 智印雲 ZprintPro',
    en: 'Apparel Brand Shopping Bag Printing Guide: Materials, Sizes & Logo Tips | ZprintPro',
    ja: 'アパレルブランドショッピングバッグ印刷ガイド：素材・サイズ・ロゴ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '服裝、潮牌、買手店老闆必睇。從白卡紙到黃牛皮、從棉繩到絲帶手挽、從燙金到 UV 局部,一個高質感的品牌紙袋決定客人是否會在 Instagram 打卡。智印雲為時裝品牌提供 500-100,000 枚小至大批量紙袋,5-10 個工作天交付。',
    en: 'Apparel, streetwear, and boutique owners — a premium branded shopping bag decides whether customers post on Instagram. Kraft, white card, cotton rope handles, foil stamping, 500-100,000 piece runs, 5-10 working day delivery from Asia factory.',
    ja: 'アパレル・ストリートウェア・セレクトショップオーナー様へ。プレミアム感のあるブランドショッピングバッグが Instagram 投稿を決める。クラフト紙・白カード・綿ロープ持ち手・箔押し、500〜100,000枚対応、5-10営業日納品。',
  },
};

// 2026-07-06 v4 純文字深度博客 (no cover) — Tier A 跨境電商 × P0 packaging 類目
const lpCrossBorderShipping: BlogPostMeta = {
  slug: 'cross-border-ecommerce-shipping-box-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '跨境電商快遞盒印刷指南 · DHL 全球 2-4 天送達 | 智印雲 ZprintPro',
    en: 'Cross-Border E-commerce Shipping Box Guide: DHL 2-4 Day Global Delivery | ZprintPro',
    ja: '越境EC配送箱カスタムガイド：DHL 2-4日グローバル配送 | ZprintPro',
  },
  excerpt: {
    'zh-hk': 'Shopify、Amazon FBA、獨立站賣家必睇。一個高質素、印刷精美的快遞盒決定客戶開箱體驗和回購率。智印雲提供 3 層 B 瓦楞抗壓結構、DHL/FedEx/UPS 全兼容尺寸、FSC 認證紙材,500-50,000 個小至大批量,3-7 個工作天交付。',
    en: 'Shopify, Amazon FBA, and DTC brand owners — a premium printed shipping box decides unboxing experience and repeat purchase. Durable 3-ply B-flute, DHL/FedEx/UPS-compatible sizes, FSC-certified materials, 500-50,000 piece runs, 3-7 working day delivery from Asia factory.',
    ja: 'Shopify、Amazon FBA、独立系 EC ブランドオーナー様へ。プレミアム感のある配送箱が開封体験とリピート率を決める。3層 B フルート耐圧構造、DHL/FedEx/UPS 互換サイズ、FSC 認証素材、500〜50,000個小〜大ロット、3-7営業日納品。',
  },
};

// 2026-07-07 v4 純文字深度博客 (no cover) — Tier A 美妝護膚 × P0 packaging 類目
// (Q-002, was queued since 2026-07-04, deployed today)
const lpCosmeticsPackagingBox: BlogPostMeta = {
  slug: 'cosmetics-packaging-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-07',
  title: {
    'zh-hk': '化妝品包裝盒定制指南 · 護膚品牌結構與材質全攻略 | 智印雲 ZprintPro',
    en: 'Custom Cosmetics Packaging Box Guide: Materials, Structure & Branding | ZprintPro',
    ja: '化粧品パッケージ箱カスタムガイド：素材・構造・ブランディング | ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港美妝護膚品牌、面膜、精華液、香水老闆必睇。一個結構精良、印刷精美的化妝品包裝盒決定貨架上的 3 秒購買決定。智印雲為香港及跨境美妝品牌提供天地盒、書型盒、磁吸盒全系列定制,50-10,000 個小至大批量,5-10 個工作天交付。',
    en: 'Skincare, serum, mask, perfume brand owners — a well-structured custom cosmetics packaging box decides the 3-second shelf purchase. ZprintPro supplies lid-base, book-style, and magnetic boxes, 50-10,000 piece runs, 5-10 working day delivery from Asia factory with DHL 2-4 day global shipping.',
    ja: 'スキンケア・美容液・マスク・香水ブランドオーナー様へ。精巧な構造と精美印刷の化粧品パッケージ箱が棚前 3秒の購買決定を決める。天地蓋箱・ブック型・マグネット式全シリーズ対応、50-10,000個小〜大ロット、5-10営業日納品。',
  },
};

// 2026-07-07 v4 純文字深度博客 (no cover) — Tier A 茶飲食品 × P0 packaging 類目
// (Q-006, NEW)
const lpTeaBeverageGiftBox: BlogPostMeta = {
  slug: 'tea-beverage-gift-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-07',
  title: {
    'zh-hk': '香港茶飲品牌禮盒印刷指南 · 手搖、中茶、茶葉電商適用 | 智印雲 ZprintPro',
    en: 'Tea & Beverage Gift Box Printing Guide: Loose Leaf, Bubble Tea & E-commerce Brands | ZprintPro',
    ja: '茶・ドリンクギフトボックス印刷ガイド：リーフティー・タピオカ・ECブランド向け | ZprintPro',
  },
  excerpt: {
    'zh-hk': '手搖飲品店、茶葉電商、中式茶禮盒品牌老闆必睇。一個有質感的茶飲品牌禮盒決定客戶回購及節日送禮首選。智印雲為香港本地及跨境茶飲品牌提供 100-50,000 個食品級內襯禮盒定制,FDA 認證紙材,5-10 個工作天交付。',
    en: 'Bubble tea shops, loose-leaf tea e-commerce, and Chinese tea gift box brand owners — a premium tea gift box decides repeat purchase and seasonal gifting. ZprintPro supplies 100-50,000 piece FDA-certified food-grade inner liner gift boxes, 5-10 working day delivery from Asia factory.',
    ja: 'タピオカ店、リーフティー EC、中華茶ギフトボックスブランドオーナー様へ。上質感ある茶ギフトボックスがリピートと季節ギフトを決める。FDA 認証食品グレード内装 100-50,000個小〜大ロット、5-10営業日納品。',
  },
};

// 2026-07-07 v4 純文字深度博客 (no cover) — Tier A 婚慶 × P0 paper-bags 類目
// (Q-007, NEW)
const lpWeddingFavorBag: BlogPostMeta = {
  slug: 'wedding-favor-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-07',
  title: {
    'zh-hk': '香港婚慶喜帖 / 婚禮禮袋印刷指南 · 2026 婚嫁旺季必備 | 智印雲 ZprintPro',
    en: 'Wedding Favor Bag & Invitation Printing Guide 2026: Materials, Sizes & Personalization | ZprintPro',
    ja: 'ウェディング ギフトバッグ・招待状印刷ガイド2026：素材・サイズ・パーソナライズ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '準新人、婚禮統籌師、宴會場地必睇。2026 龍年結婚旺季,一個有質感的婚禮禮袋、喜帖、伴手禮袋決定賓客的第一印象。智印雲為香港婚慶市場提供 100-3,000 個小批量定制,絲帶手挽、燙金、個性化新人姓名,5-10 個工作天交付。',
    en: 'Engaged couples, wedding planners, and venues — premium wedding favor bags and invitations set the first impression for guests. ZprintPro supplies 100-3,000 small-batch custom orders with satin ribbon handles, foil stamping, and personalized names, 5-10 working day delivery from Asia factory.',
    ja: 'ご婚約カップル、ウェディングプランナー、式場様へ。2026辰年ブライダルシーズン、上質感のあるギフトバッグと招待状がゲストの第一印象を決める。サテンリボン持ち手・箔押し・新郎新婦名パーソナライズ、100-3,000個小ロット、5-10営業日納品。',
  },
};

// 2026-07-08 v4 純文字深度博客 (no cover) — P1 unlock 開始
// Q-P1-01 (posters × 零售精品)
const lpRetailPoster: BlogPostMeta = {
  slug: 'retail-shop-poster-printing-guide',
  categoryKey: 'posters',
  source: 'legacy',
  date: '2026-07-08',
  title: {
    'zh-hk': '香港零售精品店海報印刷指南 · 2026 開窗季檔期必備 | 智印雲 ZprintPro',
    en: 'Retail Shop Poster Printing Guide 2026: Sizes, Paper & Display Tips | ZprintPro',
    ja: '小売・セレクトショップ ポスター印刷ガイド2026：サイズ・用紙・ディスプレイ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '零售精品店、品牌 pop-up store、商場快閃店主理人必睇。一個高質素的店內海報決定顧客逗留時間與銷售轉化。智印雲為香港零售市場提供 10-1,000 張小至大批量海報印刷,A3/A2/A1/A0 全尺寸 + 防水 PP 膠片,3-5 個工作天交付。',
    en: 'Boutique, brand pop-up store, and mall retail owners — premium in-store posters decide customer dwell time and conversion. ZprintPro supplies 10-1,000 piece runs, A3/A2/A1/A0 full sizes, waterproof PP film options, 3-5 working day delivery from Asia factory.',
    ja: 'ブティック・ブランド pop-up・モール小売オーナー様へ。高品質店内ポスターが顧客滞在時間とコンバージョンを決める。ZprintProは10-1,000枚小〜大ロット、A3/A2/A1/A0 全サイズ、防水 PP フィルム、3-5営業日納品。',
  },
};

// Q-P1-02 (menus × 餐飲外賣)
const lpRestaurantMenu: BlogPostMeta = {
  slug: 'restaurant-menu-printing-guide',
  categoryKey: 'menus',
  source: 'legacy',
  date: '2026-07-08',
  title: {
    'zh-hk': '香港餐廳菜單印刷指南 · 2026 餐飲旺季防水防油首選 | 智印雲 ZprintPro',
    en: 'Restaurant Menu Printing Guide 2026: Waterproof, Fold & Material Tips | ZprintPro',
    ja: 'レストランメニュー印刷ガイド2026：防水・折りたたみ・素材 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '餐廳老闆、咖啡店、甜品店、酒樓必睇。一個高質素的菜單是顧客下單決定的最後一關,也是品牌形象的延伸。智印雲為香港餐飲市場提供 50-5,000 張小至大批量菜單印刷,防水 PP 過膠 / 硬皮精裝 / 紙巾式拋棄菜單全系列,5-7 個工作天交付。',
    en: 'Restaurant, cafe, dessert shop, and banquet owners — a premium menu is the last gate before order and an extension of brand identity. ZprintPro supplies 50-5,000 piece runs, waterproof PP lamination, hardcover, and disposable paper menus, 5-7 working day delivery from Asia factory.',
    ja: 'レストラン・カフェ・デザート店・宴会オーナー様へ。高品質メニューが注文決定の最後の関門でありブランドアイデンティティの延長。ZprintProは50-5,000枚小〜大ロット、防水 PP ラミネート・ハードカバー・使い捨て紙メニュー全シリーズ、5-7営業日納品。',
  },
};

// Q-P1-03 (red-packets × 婚慶)
const lpWeddingRedPacket: BlogPostMeta = {
  slug: 'wedding-red-packet-printing-guide',
  categoryKey: 'red-packets',
  source: 'legacy',
  date: '2026-07-08',
  title: {
    'zh-hk': '香港婚禮利是封印刷指南 · 2026 龍年婚嫁旺季必備 | 智印雲 ZprintPro',
    en: 'Wedding Red Packet Printing Guide 2026: Materials, Personalization & Bulk | ZprintPro',
    ja: 'ウエディング レッド packet 印刷ガイド2026：素材・パーソナライズ・大量印刷 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '準新人、婚禮統籌師、宴會場地必睇。2026 龍年結婚旺季,一套精美的婚禮利是封決定賓客對婚禮的第一印象。智印雲為香港婚慶市場提供 100-10,000 個小至大批量定制,燙金新人姓名、個性化祝福語、繁體中文工藝,5-10 個工作天交付。',
    en: 'Engaged couples, wedding planners, and venues — premium wedding red packets set the first impression for guests. ZprintPro supplies 100-10,000 piece custom orders with foil-stamped couple names, personalized blessings, 5-10 working day delivery from Asia factory.',
    ja: 'ご婚約カップル・ウェディングプランナー・式場様へ。2026辰年ブライダルシーズン、精致な結婚祝儀袋がゲストの第一印象を決める。ZprintProは100-10,000個カスタムオーダー対応、箔押し新郎新婦名・パーソナライズ祝福・繁体字工芸、5-10営業日納品。',
  },
};

// =============================================================================
// 2026-07-06 weekly-meta-refresh: Tier B 行业 + P0 categories 纯文字深度博客
// (手动补救: 11:00 weekly cron 跑但 session LLM API GOAWAY 崩了, 0 产出)
// =============================================================================

const lpRealEstateBrochureBox: BlogPostMeta = {
  slug: 'real-estate-brochure-box-printing-guide',
  categoryKey: 'packaging',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '香港新盤樓書印刷指南 · 豪宅資料匣與硬皮畫冊定制 | 智印雲 ZprintPro',
    en: 'Real Estate Brochure & Property Box Printing Guide: Materials, Finishes & Luxury Tips | ZprintPro',
    ja: '不動産パンフレット・資料箱カスタム印刷ガイド：素材・加工・高級感演出 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '發展商、中介、項目策展方必睇。一本高質素的樓書 + 一個硬皮資料匣決定準買家對項目的第一印象。智印雲為香港地產商提供騎馬釘、膠裝、精裝樓書 + 硬殼天地蓋資料匣,100-5,000 套小至大批量,5-10 個工作天交付,DHL 全球 2-4 天配送。',
    en: 'Property developers, agencies, and showroom curators — a premium brochure + rigid property box decides the first impression with serious buyers. ZprintPro delivers saddle stitch, perfect bound, hardcover brochures + rigid telescopic boxes, 100-5,000 piece runs, 5-10 working day delivery, DHL 2-4 day worldwide shipping.',
    ja: 'デベロッパー・仲介・ショールーム運営者様へ。プレミアムパンフレット＋ハードケース資料箱が本気で購入検討する顧客への第一印象を決める。中綴じ・無線綴じ・上製本＋ハードケース天地蓋箱、100-5,000セット対応、5-10営業日納品、DHL 2-4日国際配送。',
  },
};

const lpPharmaceuticalLabel: BlogPostMeta = {
  slug: 'pharmaceutical-label-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '香港藥品標籤印刷指南 · GMP 認證 + 防偽追溯碼定制 | 智印雲 ZprintPro',
    en: 'Pharmaceutical Label Printing Guide: GMP-Grade, FDA/EMA Compliance & Tamper-Evident | ZprintPro',
    ja: '医薬品ラベル印刷ガイド：GMP準拠・FDA/EMA対応・改ざん防止 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '藥廠、保健品品牌、臨床試驗機構必睇。一張符合 GMP 規範、可追溯、防偽的藥品標籤直接影響註冊審批。智印雲提供 FDA 21 CFR / EU GMP Annex 15 合規標籤,1,000-500,000 枚小至大批量,7-15 個工作天交付,DHL 全球 2-4 天配送。',
    en: 'Pharma manufacturers, supplement brands, and clinical trial operators — a GMP-compliant, traceable, tamper-evident label decides regulatory approval. ZprintPro delivers FDA 21 CFR / EU GMP Annex 15 compliant labels, 1,000-500,000 piece runs, 7-15 working day delivery, DHL 2-4 day shipping.',
    ja: '製薬会社・サプリメントブランド・臨床試験機関様へ。GMP準拠・トレーサブル・改ざん防止ラベルが承認審査の鍵。FDA 21 CFR / EU GMP Annex 15準拠ラベルを提供、1,000-500,000枚対応、7-15営業日納品、DHL 2-4日国際配送。',
  },
};

const lpJewelleryShoppingBag: BlogPostMeta = {
  slug: 'jewellery-shopping-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-06',
  title: {
    'zh-hk': '香港珠寶鐘錶品牌紙袋印刷指南 · 黑卡燙金 + 絲帶手挽定制 | 智印雲 ZprintPro',
    en: 'Jewellery & Watch Brand Paper Bag Printing Guide: Black Card, Foil & Satin Ribbon | ZprintPro',
    ja: '宝飾・腕時計ブランド紙袋印刷ガイド：ブラックカード・箔押し・サテンリボン | ZprintPro',
  },
  excerpt: {
    'zh-hk': '珠寶鐘錶品牌、買手店、奢侈品經銷商必睇。一個高質感的品牌紙袋決定客人離開店後的 1 小時曝光。智印雲為珠寶鐘錶品牌提供黑卡紙、白卡紙、燙金、UV 局部、絲帶手挽全套紙袋定制,200-50,000 枚小至大批量,7-15 個工作天交付,DHL 全球 2-4 天配送。',
    en: 'Jewellery, watch, and luxury boutique owners — a premium branded paper bag decides the 1-hour post-purchase exposure. ZprintPro delivers black card, white card, foil stamping, spot UV, satin ribbon handles, 200-50,000 piece runs, 7-15 working day delivery, DHL 2-4 day shipping.',
    ja: '宝飾・腕時計・ラグジュアリーブティックオーナー様へ。プレミアム感のあるブランド紙袋が購入後1時間の露出を決める。ZprintProはブラックカード・ホワイトカード・箔押し・スポットUV・サテンリボン持ち手を提供、200-50,000枚対応、7-15営業日納品、DHL 2-4日国際配送。',
  },
};

// =============================================================================
// 2026-07-09 v4 daily-content-evolve add 3 (Q-P1-04 + Q-008 + Q-009 new)
const lpProductLabel: BlogPostMeta = {
  slug: 'product-label-printing-guide',
  categoryKey: 'cross-border',
  source: 'legacy',
  date: '2026-07-09',
  title: {
    'zh-hk': '跨境電商產品標籤印刷指南 · GS1 條碼 + FDA 認證 SKU 標貼 | 智印雲 ZprintPro',
    en: 'Amazon FBA Product Label Printing: GS1 UPC Barcodes, FDA-Compliant SKU Labels for US Sellers | ZprintPro',
    ja: '越境EC製品ラベル印刷ガイド：GS1 バーコード・FDA 準拠 SKU ラベル | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '亞馬遜 FBA、Shopify 獨立站、Etsy、速賣通賣家必睇。一張合規的 SKU 產品標籤決定平台審核通過率與買家第一印象。智印雲為跨境電商提供 GS1 EAN/UPC 條碼 + FDA 食品級材質 + 防水防撕 SKU 標貼,1,000-500,000 枚小至大批量,5-7 個工作天交付。',
    en: 'Amazon US FBA, Etsy, Shopify, and DTC brand owners — a compliant UPC barcode, FDA-compliant, FNSKU-ready product label decides whether your shipment clears Amazon\'s Sort Center or sits stuck. ZprintPro prints GS1 UPC, FNSKU, Country of Origin, Prop 65 / CPSC / CPSIA labels for US-bound inventory in 1,000-500,000 piece runs, 5-7 business day production.',
    ja: 'Amazon FBA、Shopify 独立 station、Etsy、AliExpress セラーへ。コンプライアンス適合の SKU ラベルがプラットフォーム審査通過率と第一印象を決定。智印雲は GS1 EAN/UPC バーコード、FDA 食品衛生素材、防水耐裂 SKU ラベルを 1,000-500,000 枚規模で 5-7 営業日納品。',
  },
};

const lpGraduationYearbook: BlogPostMeta = {
  slug: 'graduation-yearbook-printing-guide',
  categoryKey: 'education',
  source: 'legacy',
  date: '2026-07-09',
  title: {
    'zh-hk': '畢業紀念冊印刷指南 · 香港中學大學院校定制方案 | 智印雲 ZprintPro',
    en: 'US High School Yearbook Printing Guide: Class of 2026 Binding Styles, Cover Designs & Sponsor Ad Pages | ZprintPro',
    ja: '卒業記念アルバム印刷ガイド：製本・用紙・パーソナライズ完全解説 | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '中學、大學、補習社、國際學校、家長會必睇。一本高質素的畢業紀念冊是學生時代的永恆回憶,也是校友網絡凝聚的起點。智印雲為香港教育市場提供騎馬釘 / 膠裝 / 精裝三種裝訂 + 個人班級照片 + 師長題詞 + 學校 logo 全頁客製化方案,50-500 本小批量,5-10 個工作天交付。',
    en: 'High school yearbook advisors, senior class officers, JROTC, booster clubs, homeschool co-ops — a US yearbook that wins a Columbia Scholastic Press Association Crown Award or NSPA Pacemaker costs US$8-22 per copy with ads. ZprintPro prints saddle stitch, perfect bound, and Smyth-sewn hardcover yearbooks in 50-2,000 copy runs in 5-10 business days.',
    ja: '中学校、大学、予備校、インターナショナルスクール、PTA へ。高品質卒業記念アルバムは永遠の思い出と同窓ネットワーク形成の起点。智印雲は中綴じ / 無線綴じ / 上製本の 3 種類装丁 + クラス写真 + 教員メッセージ + 学校ロゴ全面カスタマイズを 50-500 部小ロットで 5-10 営業日納品。',
  },
};

const lpIpCharacterSticker: BlogPostMeta = {
  slug: 'ip-character-sticker-printing-guide',
  categoryKey: 'creator-ip',
  source: 'legacy',
  date: '2026-07-09',
  title: {
    'zh-hk': '文創IP角色造型貼紙印刷指南 · 香港同人品牌模切定制方案 | 智印雲 ZprintPro',
    en: 'Custom Die-Cut Sticker Printing for US Creators, Etsy Sellers & Small Brands: Shapes, Premium Materials & Etsy US SEO | ZprintPro',
    ja: 'IP キャラクター型抜きステッカー印刷ガイド：カスタム形状・素材・工法の全解説 | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '插畫師、漫畫家、文創品牌、VTuber、動漫周邊設計師必睇。一張極具辨識度的 IP 角色造型貼紙決定品牌粉絲忠誠度與商品溢價能力。智印雲為香港及跨境文創市場提供任意形狀模切 + UV 印刷 + 多材質 + 燙金工藝全套定制,100-100,000 枚小至大批量,5-7 個工作天交付。',
    en: 'Etsy US shop owners, Comic-Con Artist Alley creators, TikTok-Instagram side hustlers, US small brand founders — a high-margin die-cut sticker shop runs on Etsy US SEO ranking signals, US$0.30-1.50 per-sticker COGS, and USPS-friendly packaging. ZprintPro prints holographic, glow, foil, and matte vinyl die-cut stickers for 100-100,000 piece runs in 5-7 business days.',
    ja: 'イラストレーター・漫画家・クリエイターブランド・VTuber・アニメ周辺デザイナーへ。認知度の高い IP キャラクター型ステッカーがファンロイヤルティと商品プレミアムを決定。智印雲は任意形状型抜き、UV 印刷、複数素材、箔押し工法を 100-100,000 枚規模で 5-7 営業日納品、DHL 国際配送対応。',
  },
};

// 2026-07-10 v4 daily-content-evolve P2 unlock (matrix P0/P1 100% 饱和后 SKILL.md §3.8 P2 fallback)
// Q-P2-01 (banners × 跨境電商)
const lpTradeShowBanner: BlogPostMeta = {
  slug: 'trade-show-banner-printing-guide',
  categoryKey: 'banners',
  source: 'legacy',
  date: '2026-07-10',
  title: {
    'zh-hk': '香港貿易展易拉寶印刷指南 · 跨境電商品牌展會佈局 | 智印雲 ZprintPro',
    en: 'Trade Show Banner Printing Guide 2026: Retractable, Backdrop & USA Shipping | ZprintPro',
    ja: '展示会バナー印刷ガイド2026：ロールアップ・バックドロップ・短期納品 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '跨境電商、Amazon 賣家、Etsy 創作者、Comic-Con 同人攤位、品牌 pop-up 主理人必睇。一個高質素易拉寶決定展位 3 秒第一印象。智印雲提供 100-2,000 套 Roll-up 易拉寶 + X 型展架 + 背板舞台全套定制,3-7 個工作天交付,順豐本地港九新界 + DHL 全球配送。',
    en: 'US small business owners, Etsy / Shopify brands, Comic-Con / Anime Expo exhibitors — a premium retractable or backdrop banner decides booth traffic and brand recall. Free design, 100 MOQ, 5-7 business day production, free shipping over US$99, DHL Express 2-4 day delivery to US ZIP codes.',
    ja: '米国中小企業・Etsy/Shopify ブランド・Comic-Con / Anime Expo 出展者向け。高品質ロールアップバナー / バックドロップがブース動員とブランド想起を決定。無料デザイン・100 MOQ・5-7 営業日生産・US$99 以上無料配送・DHL Express 2-4 日米国配送。',
  },
};

// Q-P2-02 (envelopes × 婚慶)
const lpWeddingEnvelope: BlogPostMeta = {
  slug: 'wedding-invitation-envelope-printing-guide',
  categoryKey: 'wedding-envelope',
  source: 'legacy',
  date: '2026-07-10',
  title: {
    'zh-hk': '香港婚禮邀請信封印刷指南 · 2026 龍年婚嫁旺季必備 | 智印雲 ZprintPro',
    en: 'Wedding Invitation Envelope Printing Guide 2026: Pearl, Foil-Lined & Custom Sizes | ZprintPro',
    ja: 'ウエディング招待状封筒印刷ガイド2026：パール・箔押し内側・カスタムサイズ | ZprintPro',
  },
  excerpt: {
    'zh-hk': '準新人、婚禮統籌師、酒店宴會場地必睇。一個精緻嘅婚禮邀請信封決定賓客對婚禮嘅第一印象。智印雲為香港婚慶市場提供珍珠白、象牙白、燙金內襯、玫瑰金閃粉等 6 大材質,DL / A7 / C6 / 自訂尺寸全套定制,100-3,000 個小批量,5-10 個工作天交付,順豐本地港九新界免運費。',
    en: 'Engaged couples, wedding planners, stationery designers — premium pearl, foil-lined, custom-sized wedding invitation envelopes set the first impression. Free design, 100 MOQ, 5-10 business day production, DHL Express 2-4 day global shipping.',
    ja: 'ご婚約カップル・ウェディングプランナー・ステーショナリーデザイナー向け。上質パール・箔押し内側・カスタムサイズ封筒が第一印象を決定。無料デザイン・100 MOQ・5-10 営業日生産・DHL Express 国際配送対応。',
  },
};

// Q-P2-03 (japan-doujin × 文創IP)
const lpDoujinCircle: BlogPostMeta = {
  slug: 'doujin-circle-printing-guide',
  categoryKey: 'japan-doujin',
  source: 'legacy',
  date: '2026-07-10',
  title: {
    'zh-hk': '同人誌 / 同人周邊印刷指南 · 香港創作者小批量定制 | 智印雲 ZprintPro',
    en: 'Doujin Circle Printing Guide: Small-Batch Booklets, Fast Turnaround & Premium Quality for Indie Creators | ZprintPro',
    ja: '同人誌印刷ガイド：小ロット・少部数・高品質対応・短納期 | ZprintPro',
  },
  excerpt: {
    'zh-hk': '插畫師、漫畫家、Comic-Con 同人攤位、VTuber 周邊設計師、文創品牌必睇。一本高質素同人誌決定品牌辨識度與粉絲忠誠度。智印雲為香港同人市場提供 30 本起印 + 5 大裝訂 + 燙金封面 + 5-7 個工作天交付,DHL 全球 2-4 天配送至 Comiket、Anime Expo 等國際活動會場。',
    en: 'Indie comic creators, zine makers, Comic-Con Artist Alley exhibitors, indie game studios — premium small-batch doujin booklet printing with 30-copy MOQ, 5-7 business day production, free design mockup, and DHL Express global shipping.',
    ja: '同人作家・zine 作家・Comic-Con Artist Alley 出展者・インディーゲームスタジオ向け。プレミアム同人誌印刷 30 部 MOQ・5-7 営業日生産・無料デザインモックアップ・DHL Express 国際配送対応。',
  },
};

// Q-010 (stickers × 酒店民宿) - 2026-07-13 daily
const lpHotelAmenitySticker: BlogPostMeta = {
  slug: 'hotel-amenity-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '酒店民宿迎賓貼紙印刷指南 · 行李標籤 / 房卡套 / 客用品定制 | 智印雲 ZprintPro',
    en: 'Hotel & Resort Amenity Sticker Printing Guide: Luggage Tags, Welcome Kits & Branded Service for US Properties | ZprintPro',
    ja: 'ホテル・リゾート アメニティステッカー印刷ガイド：荷物タグ・ウェルカムキット・ロゴステッカー | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港酒店業、半島、洲際、悅榕庄、精品酒店同 B&B 民宿必睇。100 個起印 + 防水 PVC + 燙金 logo + 順豐本地配送 + 5-7 個工作天交貨。',
    en: 'US hotels, B&Bs, Airbnb hosts, resorts, spa properties: Free Shipping $99+ Continental US, 100 MOQ, Free Design Mockup, waterproof PVC + foil logo, 5-7 business day delivery.',
    ja: 'ホテル・旅館・民泊オーナー向け。100 個から小ロット + 防水 PVC + 箔押しロゴ + 日本全国 2-4 日配送 + 沖縄・北海道も同料金。',
  },
};

// Q-011 (paper-bags × 金融證券) - 2026-07-13 weekly
const lpFinanceSummitGiftBag: BlogPostMeta = {
  slug: 'finance-summit-gift-bag-printing-guide',
  categoryKey: 'paper-bags',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '香港金融峰會禮品袋印刷指南 · 銀行財富管理活動贊助商紙袋定制 | 智印雲 ZprintPro',
    en: 'Financial Summit Gift Bag Printing Guide: FSC, Foil Logo & VIP Bags for US Wealth Management | ZprintPro',
    ja: '金融サミット ギフトバッグ印刷ガイド：FSC認証・箔押し・VIPバッグ 日本ウェルス・マネジメント向け | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港金融機構、銀行、財富管理公司、券商、保險公司、家族辦公室必睇。FSC 認證環保牛皮紙袋，100 個起印，燙金 logo，港九中環 IFC / 灣仔 / 金鐘本地速遞，5-7 個工作天交貨。',
    en: 'US banks, wealth management firms, broker-dealers, insurance carriers, family offices: FSC-certified kraft + white card + magnetic closure, 100 MOQ, foil-stamped logo, 5-7 business day delivery to US ZIP codes.',
    ja: '日本の銀行、ウェルス・マネジメント会社、証券会社、保険会社、ファミリーオフィス向け。FSC 認証クラフト・白カード・磁石クロージャー、100 個から小ロット対応、5-7 営業日生産、全国送料無料。',
  },
};

// Q-012 (posters × 體育賽事) - 2026-07-13 weekly
const lpMarathonEventPoster: BlogPostMeta = {
  slug: 'marathon-event-poster-printing-guide',
  categoryKey: 'posters',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '馬拉松賽事海報印刷指南 · 防水 A1/A2 跑手包 + 起跑拱門 | 智印雲 ZprintPro',
    en: 'Marathon Event Poster Printing Guide: Waterproof A1/A2 Race Posters, Runner Packets & Start-Line Arches | ZprintPro',
    ja: 'マラソン大会ポスター印刷ガイド：防水 A1/A2 レースポスター・ランナーパケット・スタートアーチ | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港渣打馬拉松、街馬、半馬拉松、學界田徑必睇。100 張起印，A1/A2 防水 PP + 13oz 戶外燈布起跑拱門，順豐本地港九新界免運費，3-5 個工作天交貨。',
    en: 'US race directors, running clubs, charity foundations: 100 MOQ, waterproof A1/A2 + 13oz vinyl start arches, runner packet inserts, sponsor recognition walls, 3-5 business day delivery to US ZIP codes.',
    ja: '日本のレースディレクター、ランニングクラブ、チャリティ財団向け。100 枚から対応、防水 A1/A2 + 13oz ビニール スタートアーチ、ランナーパケット挿入物、3-5 営業日生産、全国送料無料。',
  },
};

// T-B-04 (stickers × 汽車汽配) - 2026-07-13 weekly
const lpCarDealershipAmenitySticker: BlogPostMeta = {
  slug: 'car-dealership-amenity-sticker-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '汽車 4S 店 / 二手車行貼紙印刷指南 · 防水 PVC 試駕車身貼 + 服務提醒 | 智印雲 ZprintPro',
    en: 'Car Dealership Amenity Sticker Printing Guide: Waterproof PVC, Test Drive Decals & Service Reminders for US Auto Industry | ZprintPro',
    ja: '自動車ディーラー アメニティステッカー印刷ガイド：防水 PVC・試乗デカール・サービス注意喚起 日本自動車業界向け | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港 4S 店、二手車行、汽車美容、輪胎中心、維修工場必睇。100 張起印，防水 PVC + 透明 BOPP + 耐油 PVC，順豐本地港九新界免運費，3-5 個工作天交貨。',
    en: 'US car dealerships, auto body shops, tire centers, quick lubes, EV brand experience studios: 100 MOQ, waterproof PVC + transparent BOPP + oil-resistant vinyl, 3-5 business day delivery to US ZIP codes.',
    ja: '日本の自動車ディーラー、鈑金塗装工場、タイヤセンター、Quick Lube、EV ブランド体験スタジオ向け。100 枚から対応、防水 PVC + 透明 BOPP + 耐油ビニール、3-5 営業日生産、全国送料無料。',
  },
};

// T-B-09 (stickers × 酒店拓點) - 2026-07-13 weekly
const lpHotelKeycardSleeve: BlogPostMeta = {
  slug: 'hotel-keycard-sleeve-printing-guide',
  categoryKey: 'sticker',
  source: 'legacy',
  date: '2026-07-13',
  title: {
    'zh-hk': '酒店房卡套 + 行李牌印刷指南 · 軟觸啞面 + 燙金 logo 客用品包裝 | 智印雲 ZprintPro',
    en: 'Hotel Key Card Sleeve & Luggage Tag Printing Guide: Soft-Touch Matte, Foil Logo & Glass Welcome Signs for US Hospitality | ZprintPro',
    ja: 'ホテル ルームキー スリーブ・荷物タグ印刷ガイド：ソフトタッチマット・箔押し・ガラス ウェルカム 日本ホテル業界向け | 智印雲 ZprintPro',
  },
  excerpt: {
    'zh-hk': '香港五星級酒店、精品酒店、B&B 民宿、Airbnb 短租必睇。100 張起印，軟觸啞面 PVC + 燙金箔 + 局部 UV，順豐本地港九新界免運費，3-5 個工作天交貨。',
    en: 'US five-star hotels, boutique hotels, B&Bs, Airbnb hosts, resort spas: 100 MOQ, soft-touch matte PVC + foil + spot UV, room key sleeves, luggage tags, turn-down seals, 3-5 business day delivery to US ZIP codes.',
    ja: '日本の五つ星ホテル、ブティックホテル、B&B、民泊、リゾートスパ向け。100 枚から対応、ソフトタッチマット PVC + 箔押し + スポット UV、ルームキー スリーブ、荷物タグ、3-5 営業日生産、全国送料無料。',
  },
};
// Unified list (36 articles)
// =============================================================================

export const blogPosts: BlogPostMeta[] = [
  // Buying guides (9)
  bgBusinessCard,
  bgSticker,
  bgFlyer,
  bgPackaging,
  bgPoster,
  bgPaperBag,
  bgBanner,
  bgBook,
  bgMenu,
  // Legacy posts (11)
  lpCompanyIntro,
  lpStickerGuide,
  lpBusinessCardDesign,
  lpPackagingTrends,
  lpCmykGuide,
  lpPaperMaterials,
  lpEcoPrinting,
  lpHKPrintingGuide,
  lpDesignFileSpecs,
  lpBrandChecklist,
  lpMtrSpecs,
  lpFlyerPrintingGuide,
  lpFoodPackagingGuide,
  lpPaperBagPrintingGuide,
  lpPosterPrintingGuide,
  lpPackagingBoxCustomGuide,
  // 2026-07-04 v2: 純文字深度博客上線
  lpRestaurantOpeningFlyer,
  // 2026-07-06 v4: 半年压縮鑽石版每天 3 篇博客 (P0 categories × Tier A industries)
  // - lpPetFoodSticker: stickers × 寵物 (Q-003)
  // - lpApparelShoppingBag: paper-bags × 服裝 (Q-004)
  // - lpCrossBorderShipping: packaging × 跨境電商 (Q-005)
  lpPetFoodSticker,
  lpApparelShoppingBag,
  lpCrossBorderShipping,
  // 2026-07-06 v3 weekly-meta-refresh (手动补救: 11:00 weekly cron 跑了但 session LLM API GOAWAY 崩了, 0 产出; 现在手动补 3 篇 Tier B)
  // - lpRealEstateBrochureBox: packaging × 房地產 (Tier B T1)
  // - lpPharmaceuticalLabel: stickers × 醫藥保健 (Tier B T2)
  // - lpJewelleryShoppingBag: paper-bags × 珠寶鐘錶 (Tier B T3)
  lpRealEstateBrochureBox,
  lpPharmaceuticalLabel,
  lpJewelleryShoppingBag,
  // 2026-07-07 v4 daily-content-evolve (3 blogs): P0 100% (Q-002) + 新行業 (Q-006/007)
  // - lpCosmeticsPackagingBox: packaging × 美妝護膚 (Q-002) — 補完 P0 全 8
  // - lpTeaBeverageGiftBox: packaging × 茶飲食品 (Q-006) — 新行業
  // - lpWeddingFavorBag: paper-bags × 婚慶 (Q-007) — 新行業
  lpCosmeticsPackagingBox,
  lpTeaBeverageGiftBox,
  lpWeddingFavorBag,
  // 2026-07-08 v4 daily-content-evolve (3 blogs): P1 unlock 開始 (matrix 4 P1 排隊)
  // - lpRetailPoster: posters × 零售精品 (Q-P1-01) — P1 unlock 第 1 篇
  // - lpRestaurantMenu: menus × 餐飲外賣 (Q-P1-02) — 同行業 menu 補完
  // - lpWeddingRedPacket: red-packets × 婚慶 (Q-P1-03) — 婚慶行業第 2 篇
  lpRetailPoster,
  lpRestaurantMenu,
  lpWeddingRedPacket,
  // 2026-07-09 v4 daily-content-evolve (3 blogs): Q-P1-04 收尾 + P1 補完 (Q-008) + 新行業 (Q-009 new)
  // - lpProductLabel: stickers × 跨境電商 (Q-P1-04) — GSC high_potential 食品包裝訂製 48 imps rank 22.88 命中補完
  // - lpGraduationYearbook: educational × 教育培訓 (Q-008) — P1 補完
  // - lpIpCharacterSticker: stickers × 文創IP (Q-009 new) — 新行業 Tier A
  lpProductLabel,
  lpGraduationYearbook,
  lpIpCharacterSticker,
  // 2026-07-10 v4 daily-content-evolve P2 unlock (3 P2 blogs)
  lpTradeShowBanner,
  lpWeddingEnvelope,
  lpDoujinCircle,
  // 2026-07-13 daily-content-evolve Tier B 拓點 (酒店民宿)
  lpHotelAmenitySticker,
  // 2026-07-13 weekly-meta-refresh Tier B 拓點 (金融證券 / 體育賽事 / 汽車汽配 / 酒店拓點)
  lpFinanceSummitGiftBag,
  lpMarathonEventPoster,
  lpCarDealershipAmenitySticker,
  lpHotelKeycardSleeve,
];

// =============================================================================
// Helpers
// =============================================================================

export function getBlogPostMetaBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPostSlugs(): string[] {
  return blogPosts.map((p) => p.slug);
}

export function getBlogPostsByCategory(categoryKey: BlogCategoryKey): BlogPostMeta[] {
  return blogPosts.filter((p) => p.categoryKey === categoryKey);
}

/**
 * Resolve cover image for a slug in a given locale.
 * 2026-07-04 修订：返回空字符串 '' 表示"无封面图",UI 据此跳过 hero 渲染。
 * 老博客 (有 cover 字段) 仍走默认 fallback;新每日博客 (无 cover 字段) 返回 ''。
 */
export function getBlogCover(slug: string, locale: Locale): string {
  const meta = getBlogPostMetaBySlug(slug);
  if (!meta || !meta.cover) return ''; // 无封面 → 纯文字博客
  return meta.cover[locale] || meta.cover['zh-hk'] || defaultCover[locale];
}