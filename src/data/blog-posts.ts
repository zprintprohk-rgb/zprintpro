/**
 * Unified Blog Posts Metadata (2026-06-25)
 *
 * Single source of truth for /blog/ list page + /blog/[slug]/ detail page.
 * Replaces the previous hardcoded slug arrays in BlogContent.tsx (caused
 * subcategory counts to all read 0) and the legacy `posts` object in
 * [slug]/page.tsx.
 *
 * 19 articles total:
 *   - 9 Buying Guides (from @/data/buying-guides.ts)  → categoryKey='buying-guide'
 *   - 10 Legacy Posts (from [slug]/page.tsx posts)    → categoryKey from real category
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
  | 'buying-guide';

export type BlogPostSource = 'buying-guide' | 'legacy';

export interface BlogPostMeta {
  slug: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  date: string;
  categoryKey: BlogCategoryKey;
  /** Cover image per locale. Falls back to `defaultCover` when locale missing. */
  cover: Record<Locale, string>;
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

// =============================================================================
// Unified list (19 articles)
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
  // Legacy posts (10)
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
 * Falls back to zh-hk cover, then to defaultCover.
 */
export function getBlogCover(slug: string, locale: Locale): string {
  const meta = getBlogPostMetaBySlug(slug);
  if (!meta) return defaultCover[locale];
  return meta.cover[locale] || meta.cover['zh-hk'] || defaultCover[locale];
}