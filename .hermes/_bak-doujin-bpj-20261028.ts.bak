/**
 * 产品数据服务模块
 * 从CSV加载84个SKU产品数据
 * 提供分类、搜索、筛选功能
 */

import { buildProductH1ZhHk, buildProductH1En, buildProductH1Ja } from '@/lib/h1-builder';
import { getSkuSeo } from '@/data/sku-seo-data';

export interface Product {
  id: string;
  sku_code: string;
  slug: string;
  category: string;
  category_slug: string;
  name: string;
  nameEn: string;
  nameJa: string;
  title_zh: string;
  description: string;
  descriptionEn: string;
  descriptionJa: string;
  description_zh: string;
  longDescription?: string;
  longDescriptionEn?: string;
  longDescriptionJa?: string;
  price_range: string;
  basePrice: number;          // HKD list price (zh-hk source of truth)
  basePrice_en?: number;       // USD list price (en market, locale-optimized)
  basePrice_ja?: number;       // JPY list price (ja market, locale-optimized)
  weight_score: number;
  isHot: boolean;
  isNew: boolean;
  minQuantity: number;
  /**
   * 起訂量顯示單位（K3 2026-09-20 裁決：按品類區分，不統一為「本」）。
   *
   * 為什麼需要：起訂量在不同品類的量詞不同——餐牌用「張/份」、精裝用「本」、
   *   貼紙用「張」。原先展示層一律以「本」組句（見 getDisplayMinOrder*），
   *   對餐牌/貼紙類不自然。
   *
   * 市場依據（K3 提供）：PVC 餐牌 print88king 用「張」、精裝香港印刷中心用「本」、
   *   紙質餐牌 design-easy/高碧 用「張」、酒水單市場無明確慣例（用「份」較通用）。
   *
   * ★ 向後兼容：未設定時沿用既有「本」（現行展示層行為），不影響其他品類。
   */
  unitLabel?: string;
  turnaround?: string;
  images: string[];
  imagesByLocale?: {
    'zh-hk'?: string[];
    en?: string[];
    ja?: string[];
  };
  optimizedAt?: string;
  optimizationRound?: number;
  seoImages?: {
    filename: { 'zh-hk': string; en: string; ja: string };
    alt: { 'zh-hk': string; en: string; ja: string };
  };
  features?: string[];
  specs?: {
    material?: string;
    size?: string;
    printMethod?: string;
    finishing?: string;
  };
  options?: {
    material?: { value: string; label: string; priceAdjustment?: number }[];
    size?: { value: string; label: string; priceAdjustment?: number }[];
    finishing?: { value: string; label: string; priceAdjustment?: number }[];
  };
  variables?: {
    sizes?: { value: string; label: string; multiplier: number }[];
    materials?: { value: string; label: string; surcharge: number }[];
    finishings?: { value: string; label: string; surcharge: number }[];
    quantities?: { value: number; label: string; discount: number }[];
  };
  // === V18 升级 (K3 8/14 10:48 + 15:50 任务): SEO + GEO ===
  seoTitle?: { 'zh-hk': string; en: string; ja: string };
  seoDescription?: { 'zh-hk': string; en: string; ja: string };
  metaTitle?: string;
  aiSearchSummary?: { en: string; 'zh-hk': string; ja: string };
  knowledgePanelData?: {
    brand: string;
    foundingDate: string;
    parentOrg: string;
    products: string[];
    industries: string[];
  };
  relatedEntities?: { sameAs: string[]; mentions: string[] };
  expertReview?: { reviewer: string; credentials: string; review: string };
  authorBio?: { name: string; role: string; bio: string };
  // === V15 升级 (K3 8/14 10:48 任务): 12 字段 metadata (生图提示词) ===
  client?: string;
  design_desc?: string;
  extra_design?: string;
  text?: string;
  font_desc?: string;
  position?: string;
  layout_note?: string;
  material?: string;
  finish?: string;
  weight?: string;
  colors?: string;
  style_note?: string;
}

export interface Category {
  slug: string;
  name: string;
  nameEn: string;
  nameJa: string;
  name_zh: string;
  name_en: string;
  name_ja: string;
  sort_order: number;
}

// 14个产品分类
export const categories: Category[] = [
  // 六大核心主营分类（按全球市场搜索量+利润率+战略优先级排序）
  { slug: 'stickers', name: '貼紙印刷 / 透明貼 / 防水貼', nameEn: 'Stickers / Waterproof / Transparent', nameJa: 'ステッカー / 透明 / 防水', name_zh: '貼紙印刷 / 透明貼 / 防水貼', name_en: 'Stickers / Waterproof / Transparent', name_ja: 'ステッカー / 透明 / 防水', sort_order: 1 },
  { slug: 'flyers', name: '宣傳單張印刷', nameEn: 'Flyers', nameJa: 'チラシ印刷', name_zh: '宣傳單張印刷', name_en: 'Flyers', name_ja: 'チラシ印刷', sort_order: 2 },
  { slug: 'packaging', name: '包裝盒訂製', nameEn: 'Packaging Boxes', nameJa: 'パッケージ印刷', name_zh: '包裝盒訂製', name_en: 'Packaging Boxes', name_ja: 'パッケージ印刷', sort_order: 3 },
  { slug: 'posters', name: '海報印刷', nameEn: 'Posters', nameJa: 'ポスター印刷', name_zh: '海報印刷', name_en: 'Posters', name_ja: 'ポスター印刷', sort_order: 4 },
  { slug: 'paper-bags', name: '紙袋印刷 / 訂做紙袋', nameEn: 'Paper Bags / Custom', nameJa: '紙袋印刷 / カスタム', name_zh: '紙袋印刷 / 訂做紙袋', name_en: 'Paper Bags / Custom', name_ja: '紙袋印刷 / カスタム', sort_order: 5 },
  { slug: 'greeting-cards', name: '賀卡印刷', nameEn: 'Greeting Cards', nameJa: 'グリーティングカード・年賀状', name_zh: '賀卡印刷', name_en: 'Greeting Cards', name_ja: 'グリーティングカード・年賀状', sort_order: 6 },
  // 次要分类
  { slug: 'banners', name: '噴繪廣告', nameEn: 'Banners', nameJa: 'バナー印刷', name_zh: '噴繪廣告', name_en: 'Banners', name_ja: 'バナー印刷', sort_order: 7 },
  { slug: 'books', name: '小冊子・書刊印刷', nameEn: 'Booklet Printing', nameJa: '冊子印刷・書籍', name_zh: '小冊子・書刊印刷', name_en: 'Booklet Printing', name_ja: '冊子印刷・書籍', sort_order: 8 },
  { slug: 'menus', name: '餐牌印刷', nameEn: 'Menus', nameJa: 'メニュー印刷', name_zh: '餐牌印刷', name_en: 'Menus', name_ja: 'メニュー印刷', sort_order: 9 },
  { slug: 'envelopes', name: '信封印刷', nameEn: 'Envelopes', nameJa: '封筒印刷', name_zh: '信封印刷', name_en: 'Envelopes', name_ja: '封筒印刷', sort_order: 10 },
  { slug: 'calendars', name: '月曆印刷', nameEn: 'Calendars', nameJa: 'カレンダー印刷', name_zh: '月曆印刷', name_en: 'Calendars', name_ja: 'カレンダー印刷', sort_order: 11 },
  { slug: 'red-packets', name: '利是封印刷', nameEn: 'Red Packets', nameJa: 'ポチ袋印刷', name_zh: '利是封印刷', name_en: 'Red Packets', name_ja: 'ポチ袋印刷', sort_order: 12 },
  { slug: 'educational', name: '學校印刷・證書', nameEn: 'School Printing', nameJa: '教科書印刷・証明書', name_zh: '學校印刷・證書', name_en: 'School Printing', name_ja: '教科書印刷・証明書', sort_order: 13 },
  { slug: 'japan-doujin', name: '同人誌印刷・周邊', nameEn: 'Doujinshi & Anime Goods', nameJa: '同人誌・アニメグッズ', name_zh: '同人誌印刷・周邊', name_en: 'Doujinshi & Anime Goods', name_ja: '同人誌・アニメグッズ', sort_order: 14 },
  // 2026-08-17 K3 §11 业务子类目豁免 Step 2 (3 新类目)
  { slug: 'wedding-invitations', name: '喜帖印刷', nameEn: 'Wedding Invitations', nameJa: '結婚式招待状', name_zh: '喜帖印刷', name_en: 'Wedding Invitations', name_ja: '結婚式招待状', sort_order: 15 },
  { slug: 'place-cards', name: '枱卡 / 酒水牌 / 座位卡印刷', nameEn: 'Place Cards / Drink Tokens', nameJa: '席札 / ドリンクトークン', name_zh: '枱卡 / 酒水牌 / 座位卡印刷', name_en: 'Place Cards / Drink Tokens', name_ja: '席札 / ドリンクトークン', sort_order: 16 },
];

// 84个SKU产品数据
export const products: Product[] = [
  // 卡片印刷 (6 SKU)
  {
    id: 'BC-001',
    sku_code: 'BC-001',
    slug: 'premium-greeting-cards',
    optimizedAt: '2026-07-30',
    optimizationRound: 1,
    category: 'greeting-cards',
    category_slug: 'greeting-cards',
    name: '高級賀卡', nameEn: 'Premium Greeting Cards', nameJa: '年賀状印刷 | プレミアムグリーティングカード', title_zh: '高級賀卡',
    description: '300g 高級銅版紙賀卡,四色印刷精美,可選啞膠/光膠/燙金/UV 局部光油。聖誕卡、新年卡、婚禮感謝卡、節日禮品卡首選,免費打樣,DHL 全球 2-4 天配送。 適配行業: 婚慶/聖誕節/新年/節日禮品/品牌活動/酒店迎賓/企業定制.', descriptionEn: '300g premium greeting cards with 4-color printing. Optional matte/gloss lamination, foil stamping, spot UV. Perfect for Christmas cards, New Year cards, wedding thank-you cards, holiday gift cards. Free sample, DHL Express 2-4 day global delivery from Asia factory. Best for: weddings / Christmas / New Year / holiday gifts / brand events / hotel welcome / corporate customization.', descriptionJa: '300g 高級グリーティングカード、4色印刷精美。マット/グロスラミネーション、ホットスタンプ、スポットUV選択可。クリスマスカード、新年カード、ウェディングサンキュー、ハロウィンカードに最適。無料サンプル、DHL Express 国際 2-4 日納品対応。 適合業種: 婚礼 / クリスマス / 新年 / 节日ギフト / ブランドイベント / ホテル歓迎 / 企業カスタム.', description_zh: '300g 高級銅版紙賀卡,四色印刷精美,可選啞膠/光膠/燙金/UV 局部光油。聖誕卡、新年卡、婚禮感謝卡、節日禮品卡首選,免費打樣,DHL 全球 2-4 天配送。 適配行業: 婚慶/聖誕節/新年/節日禮品/品牌活動/酒店迎賓/企業定制.',
    features: [
      '【127×178mm標準尺寸】兼容全球卡夾',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【300g銅版／250g啞粉】高級紙張，挺度與觸感兼具',
      '【10 張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或250g啞粉藝術紙；啞膠／光膠覆膜',
      size: '127×178mm（標準）；R3mm圓角可選',
      printMethod: '四色柯式印刷（海德堡）',
      finishing: '覆膜（啞膠／光膠）、局部UV、燙金、圓角模切',
    },
    price_range: 'HK$100-180/100張',
    basePrice: 1.0,
    basePrice_en: 0.13,
    basePrice_ja: 20,
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/v26/greeting-cards/premium/zh-hk/hero.webp'],
  imagesByLocale: {
            'zh-hk': [
      '/images/v26/greeting-cards/premium/zh-hk/hero.webp',
      '/images/v26/greeting-cards/premium/zh-hk/detail.webp',
      '/images/v26/greeting-cards/premium/zh-hk/multi-angle.webp',
      '/images/v26/greeting-cards/premium/zh-hk/variety.webp',
    ],
            'en': [
      '/images/v26/greeting-cards/premium/en/hero.webp',
      '/images/v26/greeting-cards/premium/en/detail.webp',
      '/images/v26/greeting-cards/premium/en/multi-angle.webp',
      '/images/v26/greeting-cards/premium/en/variety.webp',
    ],
            'ja': [
      '/images/v26/greeting-cards/premium/ja/hero.webp',
      '/images/v26/greeting-cards/premium/ja/detail.webp',
      '/images/v26/greeting-cards/premium/ja/multi-angle.webp',
      '/images/v26/greeting-cards/premium/ja/variety.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-greeting-cards-premium-greeting-cards-zh-hk-hero.webp', en: 'zprintpro-stickers-premium-stickers-en.webp', ja: 'zprintpro-stickers-premium-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港高級賀卡印刷 300g銅版紙 覆膜（啞膠／光膠）',
      en: 'Premium Greeting Cards | Professional Greeting Cards Online',
      ja: 'プレミアムグリーティングカード | プロ印刷・即日お見積もり | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準尺寸 (90×54mm)', multiplier: 1 },
        { value: 'square', label: '方形 (65×65mm)', multiplier: 1.2 },
      ],
      materials: [
        { value: '300g', label: '300g銅版紙', surcharge: 0 },
        { value: '400g', label: '400g厚紙', surcharge: 100 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'matte', label: '啞膠', surcharge: 30 },
        { value: 'gloss', label: '光膠', surcharge: 30 },
        { value: 'spot-uv', label: '局部UV', surcharge: 80 },
        { value: 'foil', label: '燙金/燙銀', surcharge: 150 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BC-002',
    sku_code: 'BC-002',
    slug: 'thick-greeting-cards-400g',
    category: 'greeting-cards',
    category_slug: 'greeting-cards',
    name: '厚卡名片 (400g 起)', nameEn: 'Thick Business Cards (400g+)', nameJa: '厚手名刺印刷 (400g〜)', title_zh: '厚卡名片｜400g 超厚 · 三合一裱貼 · 90×54mm',
    description: '400g 超厚名片,挺度極佳手感沈穩,地產代理／律師／會計／設計師事務所及企業形象名片首選。90×54mm 標準名片尺寸,可選三合一裱貼 (700-810g 超厚檔)、燙金／燙銀、局部UV、擊凸、圓角,10 張起印,免費打樣,DHL 全球 2-4 天配送。 適配行業: 房地產/律師會計/金融保險/設計創意/初創企業/酒店餐飲/零售精品/跨境電商.', descriptionEn: 'Thick 400g+ business cards with a substantial premium hand-feel - the standard choice for estate agents, law firms, accountants, design studios and corporate identity. 90x54mm standard business card size, optional triple-layer lamination (700-810g ultra-thick), foil stamping, spot UV, embossing and rounded corners. MOQ 10 pcs, free sample, DHL Express 2-4 day global delivery. Best for: real estate / law & accounting / finance & insurance / design & creative / startups / hospitality / retail / e-commerce.', descriptionJa: '400g 超厚名刺、剛性と重厚感が高く、不動産・法律事務所・会計士・デザイン事務所・企業イメージ名刺に最適。90x54mm 標準名刺サイズ、三層貼り合わせ (700-810g 超厚)・箔押し・スポットUV・エンボス・角丸選択可。10枚から、無料サンプル、DHL Express 国際 2-4 日納品。 適合業種: 不動産 / 法律・会計 / 金融保険 / デザイン / スタートアップ / ホテル飲食 / 小売 / 越境EC.', description_zh: '400g 超厚名片,挺度極佳手感沈穩,地產代理／律師／會計／設計師事務所及企業形象名片首選。90×54mm 標準名片尺寸,可選三合一裱貼 (700-810g 超厚檔)、燙金／燙銀、局部UV、擊凸、圓角,10 張起印,免費打樣,DHL 全球 2-4 天配送。 適配行業: 房地產/律師會計/金融保險/設計創意/初創企業/酒店餐飲/零售精品/跨境電商.',
    features: [
      '【90×54mm標準名片尺寸】全球通用規格，兼容名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【400g超厚紙】可升級三合一裱貼 700-810g 超厚檔，手感沉穩尊貴',
      '【10 張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '400g超厚銅版紙；啞膠／光膠覆膜；可選三合一裱貼（700-810g 超厚檔）',
      size: '90×54mm（標準名片）；54×54mm 方形可選',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膠／光膠）、燙金／燙銀、局部UV、擊凸、圓角模切',
    },
    price_range: 'HK$120-220/100張',
    basePrice: 1.2,
    basePrice_en: 0.15,
    basePrice_ja: 23,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/v26/greeting-cards/thick-400g/zh-hk/hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/v26/greeting-cards/thick-400g/zh-hk/hero.webp',
      '/images/v26/greeting-cards/thick-400g/zh-hk/detail.webp',
      '/images/v26/greeting-cards/thick-400g/zh-hk/multi-angle.webp',
      '/images/v26/greeting-cards/thick-400g/zh-hk/variety.webp',
    ],
    'en': [
      '/images/v26/greeting-cards/thick-400g/en/hero.webp',
      '/images/v26/greeting-cards/thick-400g/en/detail.webp',
      '/images/v26/greeting-cards/thick-400g/en/multi-angle.webp',
      '/images/v26/greeting-cards/thick-400g/en/variety.webp',
    ],
    'ja': [
      '/images/v26/greeting-cards/thick-400g/ja/hero.webp',
      '/images/v26/greeting-cards/thick-400g/ja/detail.webp',
      '/images/v26/greeting-cards/thick-400g/ja/multi-angle.webp',
      '/images/v26/greeting-cards/thick-400g/ja/variety.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準尺寸 (90×54mm)', multiplier: 1 },
        { value: 'square', label: '方形 (65×65mm)', multiplier: 1.2 },
      ],
      materials: [
        { value: '300g', label: '300g銅版紙', surcharge: 0 },
        { value: '400g', label: '400g厚紙', surcharge: 100 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'matte', label: '啞膠', surcharge: 30 },
        { value: 'gloss', label: '光膠', surcharge: 30 },
        { value: 'spot-uv', label: '局部UV', surcharge: 80 },
        { value: 'foil', label: '燙金/燙銀', surcharge: 150 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-greeting-cards-thick-greeting-cards-400g-zh-hk-hero.webp', en: 'zprintpro-stickers-thick-stickers-400g-en.webp', ja: 'zprintpro-stickers-thick-stickers-400g-ja.webp' },
    alt: {
      'zh-hk': '香港厚身賀卡(400g)印刷 400g超厚銅版紙 覆膜（啞膠／光膠）',
      en: 'Thick Greeting Cards (400g) | Professional Greeting Cards Online',
      ja: '厚紙グリーティングカード(400g) | プロ印刷・即日お見積もり | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BC-003',
    sku_code: 'BC-003',
    slug: 'foil-greeting-cards',
    category: 'greeting-cards',
    category_slug: 'greeting-cards',
    name: '燙金/燙銀賀卡 | 賀卡 / 燙銀工藝 / 婚禮卡', nameEn: 'Foil-Stamped Greeting Cards | Gold/Silver Foil Wedding Cards', nameJa: '年賀状印刷 | 箔押しグリーティングカード | 金箔/銀箔', title_zh: '燙金/燙銀賀卡 10個起印 5-7天 · 智印港',
    description: '燙金/燙銀/玫瑰金賀卡,金屬光澤瞬間提升奢華感,聖誕/婚禮/百日宴/感謝卡高端首選。300g 銅版紙+金屬箔層,免費打樣,DHL 全球 2-4 天配送。', descriptionEn: 'Foil-stamped greeting cards (gold/silver/rose gold). Metallic luster elevates premium feel for Christmas, wedding, baby 100-day celebration, thank-you cards. 300g coated card with metallic foil layer. Free sample, DHL Express 2-4 day global delivery.', descriptionJa: '箔押し/銀箔/ローズゴールドグリーティングカード。金属光泽で高級感アップ、クリスマス/ウェディング/百日祝/サンキューカードに最適。300g コート紙+金属箔層、無料サンプル、DHL Express 国際 2-4 日納品対応。', description_zh: '燙金/燙銀/玫瑰金賀卡,金屬光澤瞬間提升奢華感,聖誕/婚禮/百日宴/感謝卡高端首選。300g 銅版紙+金屬箔層,免費打樣,DHL 全球 2-4 天配送。',
    features: [
      '【127×178mm標準尺寸】兼容全球卡夾',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【三色燙金】金／銀／玫瑰金，奢華品牌首選',
      '【10 張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或棉質紙；燙金／燙銀／玫瑰金',
      size: '127×178mm（標準）',
      printMethod: '四色柯式＋燙金',
      finishing: '覆膜（啞膠／光膠）、燙金、圓角模切',
    },
    price_range: 'HK$180-320/100張',
    basePrice: 1.8,
    basePrice_en: 0.23,
    basePrice_ja: 35,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/v26/greeting-cards/foil/zh-hk/hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/v26/greeting-cards/foil/zh-hk/hero.webp',
      '/images/v26/greeting-cards/foil/zh-hk/detail.webp',
      '/images/v26/greeting-cards/foil/zh-hk/multi-angle.webp',
      '/images/v26/greeting-cards/foil/zh-hk/variety.webp',
    ],
    'en': [
      '/images/v26/greeting-cards/foil/en/hero.webp',
      '/images/v26/greeting-cards/foil/en/detail.webp',
      '/images/v26/greeting-cards/foil/en/multi-angle.webp',
      '/images/v26/greeting-cards/foil/en/variety.webp',
    ],
    'ja': [
      '/images/v26/greeting-cards/foil/ja/hero.webp',
      '/images/v26/greeting-cards/foil/ja/detail.webp',
      '/images/v26/greeting-cards/foil/ja/multi-angle.webp',
      '/images/v26/greeting-cards/foil/ja/variety.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準尺寸 (90×54mm)', multiplier: 1 },
        { value: 'square', label: '方形 (65×65mm)', multiplier: 1.2 },
      ],
      materials: [
        { value: '300g', label: '300g銅版紙', surcharge: 0 },
        { value: '400g', label: '400g厚紙', surcharge: 100 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'matte', label: '啞膠', surcharge: 30 },
        { value: 'gloss', label: '光膠', surcharge: 30 },
        { value: 'spot-uv', label: '局部UV', surcharge: 80 },
        { value: 'foil', label: '燙金/燙銀', surcharge: 150 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-greeting-cards-foil-greeting-cards-zh-hk-hero.webp', en: 'zprintpro-stickers-foil-stickers-en.webp', ja: 'zprintpro-stickers-foil-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港燙金/燙銀賀卡印刷 300g銅版紙 覆膜（啞膠／光膠）',
      en: 'Foil Stamped Greeting Cards | Professional Greeting Cards Online',
      ja: '箔押しグリーティングカード | プロ印刷・即日お見積もり | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BC-004',
    sku_code: 'BC-004',
    slug: 'spot-uv-greeting-cards',
    category: 'greeting-cards',
    category_slug: 'greeting-cards',
    name: 'UV局部光油賀卡', nameEn: 'Spot UV Greeting Cards', nameJa: '年賀状印刷 | スポットUVグリーティングカード', title_zh: 'UV局部光油賀卡',
    description: 'UV 局部光油賀卡,Logo/图案加亮 + 啞面底材形成強烈對比,聖誕/新年/感謝卡視覺衝擊力強。300g 銅版紙 + UV 局部光油,免費打樣,DHL 全球 2-4 天配送。', descriptionEn: 'Spot UV greeting cards with logo/pattern highlight + matte substrate for high contrast. Strong visual impact for Christmas, New Year, thank-you cards. 300g coated card with spot UV. Free sample, DHL Express 2-4 day global delivery.', descriptionJa: 'スポットUVグリーティングカード、ロゴ/パターン加亮 + マット下地で强い対比。クリスマス/新年/サンキューカードに視覚冲击力。300g コート紙 + スポットUV、無料サンプル、DHL Express 国際 2-4 日納品対応。', description_zh: 'UV 局部光油賀卡,Logo/图案加亮 + 啞面底材形成強烈對比,聖誕/新年/感謝卡視覺衝擊力強。300g 銅版紙 + UV 局部光油,免費打樣,DHL 全球 2-4 天配送。',
    features: [
      '【127×178mm標準尺寸】兼容全球卡夾',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【局部UV】20–30微米立體光澤，視覺衝擊強烈',
      '【10 張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或合成紙；局部UV光油',
      size: '127×178mm（標準）',
      printMethod: '四色柯式＋局部UV',
      finishing: '局部UV、覆膜（啞膠／光膠）、圓角模切',
    },
    price_range: 'HK$140-260/100張',
    basePrice: 1.4,
    basePrice_en: 0.18,
    basePrice_ja: 27,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/v26/greeting-cards/spot-uv/zh-hk/hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/v26/greeting-cards/spot-uv/zh-hk/hero.webp',
      '/images/v26/greeting-cards/spot-uv/zh-hk/detail.webp',
      '/images/v26/greeting-cards/spot-uv/zh-hk/multi-angle.webp',
      '/images/v26/greeting-cards/spot-uv/zh-hk/variety.webp',
    ],
    'en': [
      '/images/v26/greeting-cards/spot-uv/en/hero.webp',
      '/images/v26/greeting-cards/spot-uv/en/detail.webp',
      '/images/v26/greeting-cards/spot-uv/en/multi-angle.webp',
      '/images/v26/greeting-cards/spot-uv/en/variety.webp',
    ],
    'ja': [
      '/images/v26/greeting-cards/spot-uv/ja/hero.webp',
      '/images/v26/greeting-cards/spot-uv/ja/detail.webp',
      '/images/v26/greeting-cards/spot-uv/ja/multi-angle.webp',
      '/images/v26/greeting-cards/spot-uv/ja/variety.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準尺寸 (90×54mm)', multiplier: 1 },
        { value: 'square', label: '方形 (65×65mm)', multiplier: 1.2 },
      ],
      materials: [
        { value: '300g', label: '300g銅版紙', surcharge: 0 },
        { value: '400g', label: '400g厚紙', surcharge: 100 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'matte', label: '啞膠', surcharge: 30 },
        { value: 'gloss', label: '光膠', surcharge: 30 },
        { value: 'spot-uv', label: '局部UV', surcharge: 80 },
        { value: 'foil', label: '燙金/燙銀', surcharge: 150 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-greeting-cards-spot-uv-greeting-cards-zh-hk-hero.webp', en: 'zprintpro-stickers-spot-uv-stickers-en.webp', ja: 'zprintpro-stickers-spot-uv-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港UV局部光油賀卡印刷 300g銅版紙 局部UV',
      en: 'Spot UV Greeting Cards | Professional Greeting Cards Online',
      ja: '局部UVグリーティングカード | プロ印刷・即日お見積もり | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BC-005',
    sku_code: 'BC-005',
    slug: 'matte-greeting-cards',
    category: 'greeting-cards',
    category_slug: 'greeting-cards',
    name: '啞膠賀卡', nameEn: 'Matte Greeting Cards', nameJa: '年賀状印刷 | マットラミネートグリーティングカード', title_zh: '啞膠賀卡',
    description: '啞膠覆膜賀卡,表面霧面絲滑、防指紋、觸感高級。聖誕卡/新年卡/感謝卡簡約風格首選。300g 銅版紙+啞膠覆膜,免費打樣,DHL 全球 2-4 天配送。', descriptionEn: 'Matte lamination greeting cards with smooth anti-fingerprint premium feel. Ideal for minimalist Christmas, New Year, thank-you cards. 300g coated card with matte lamination. Free sample, DHL Express 2-4 day global delivery.', descriptionJa: 'マットラミネートグリーティングカード、防指紋で滑らかな高級触感。ミニマルなクリスマス/新年/サンキューカードに最適。300g コート紙+マットラミ、無料サンプル、DHL Express 国際 2-4 日納品対応。', description_zh: '啞膠覆膜賀卡,表面霧面絲滑、防指紋、觸感高級。聖誕卡/新年卡/感謝卡簡約風格首選。300g 銅版紙+啞膠覆膜,免費打樣,DHL 全球 2-4 天配送。',
    features: [
      '【127×178mm標準尺寸】兼容全球卡夾',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【啞膠覆膜】絲滑細膩，指紋反光雙抗性',
      '【10 張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g啞粉紙或環保紙；啞膠覆膜',
      size: '127×178mm（標準）',
      printMethod: '四色柯式印刷',
      finishing: '啞膠覆膜、燙金、壓凹、圓角模切',
    },
    price_range: 'HK$110-190/100張',
    basePrice: 1.1,
    basePrice_en: 0.14,
    basePrice_ja: 21,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/v26/greeting-cards/matte/zh-hk/hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/v26/greeting-cards/matte/zh-hk/hero.webp',
      '/images/v26/greeting-cards/matte/zh-hk/detail.webp',
      '/images/v26/greeting-cards/matte/zh-hk/multi-angle.webp',
      '/images/v26/greeting-cards/matte/zh-hk/variety.webp',
    ],
    'en': [
      '/images/v26/greeting-cards/matte/en/hero.webp',
      '/images/v26/greeting-cards/matte/en/detail.webp',
      '/images/v26/greeting-cards/matte/en/multi-angle.webp',
      '/images/v26/greeting-cards/matte/en/variety.webp',
    ],
    'ja': [
      '/images/v26/greeting-cards/matte/ja/hero.webp',
      '/images/v26/greeting-cards/matte/ja/detail.webp',
      '/images/v26/greeting-cards/matte/ja/multi-angle.webp',
      '/images/v26/greeting-cards/matte/ja/variety.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準尺寸 (90×54mm)', multiplier: 1 },
        { value: 'square', label: '方形 (65×65mm)', multiplier: 1.2 },
      ],
      materials: [
        { value: '300g', label: '300g銅版紙', surcharge: 0 },
        { value: '400g', label: '400g厚紙', surcharge: 100 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'matte', label: '啞膠', surcharge: 30 },
        { value: 'gloss', label: '光膠', surcharge: 30 },
        { value: 'spot-uv', label: '局部UV', surcharge: 80 },
        { value: 'foil', label: '燙金/燙銀', surcharge: 150 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-greeting-cards-matte-greeting-cards-zh-hk-hero.webp', en: 'zprintpro-stickers-matte-stickers-en.webp', ja: 'zprintpro-stickers-matte-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港啞膠賀卡印刷 300g啞粉紙 啞膠覆膜',
      en: 'Matte Laminated Cards | Professional Greeting Cards Online',
      ja: 'マットグリーティングカード | プロ印刷・即日お見積もり | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BC-006',
    sku_code: 'BC-006',
    slug: 'rounded-corner-greeting-cards',
    category: 'greeting-cards',
    category_slug: 'greeting-cards',
    name: '圓角賀卡', nameEn: 'Rounded Corner Greeting Cards', nameJa: '年賀状印刷 | 角丸グリーティングカード', title_zh: '圓角賀卡',
    description: '圓角賀卡 (R3mm 圓角模切),邊角不翹起、手感柔和。聖誕卡/生日卡/感謝卡可愛風格首選,300g 銅版紙+圓角模切,免費打樣,DHL 全球 2-4 天配送。', descriptionEn: 'Rounded corner greeting cards (R3mm die-cut), soft tactile feel with no corner lift. Perfect for cute Christmas, birthday, thank-you cards. 300g coated card with rounded corner die-cut. Free sample, DHL Express 2-4 day global delivery.', descriptionJa: '角丸グリーティングカード (R3mm 丸型抜き)、角が浮かない柔らかい触感。可愛いクリスマス/バースデー/サンキューカードに最適。300g コート紙+角丸抜き、無料サンプル、DHL Express 国際 2-4 日納品対応。', description_zh: '圓角賀卡 (R3mm 圓角模切),邊角不翹起、手感柔和。聖誕卡/生日卡/感謝卡可愛風格首選,300g 銅版紙+圓角模切,免費打樣,DHL 全球 2-4 天配送。',
    features: [
      '【127×178mm標準尺寸】兼容全球卡夾',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【R3mm圓角】柔和美觀，邊角不易折損',
      '【10 張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或藝術紙；啞膠／光膠覆膜',
      size: '127×178mm（標準）；R3mm圓角',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膠／光膠）、燙金、局部UV、圓角模切',
    },
    price_range: 'HK$100-170/100張',
    basePrice: 1.0,
    basePrice_en: 0.13,
    basePrice_ja: 20,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/v26/greeting-cards/rounded-corner/zh-hk/hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/v26/greeting-cards/rounded-corner/zh-hk/hero.webp',
      '/images/v26/greeting-cards/rounded-corner/zh-hk/detail.webp',
      '/images/v26/greeting-cards/rounded-corner/zh-hk/multi-angle.webp',
      '/images/v26/greeting-cards/rounded-corner/zh-hk/variety.webp',
    ],
    'en': [
      '/images/v26/greeting-cards/rounded-corner/en/hero.webp',
      '/images/v26/greeting-cards/rounded-corner/en/detail.webp',
      '/images/v26/greeting-cards/rounded-corner/en/multi-angle.webp',
      '/images/v26/greeting-cards/rounded-corner/en/variety.webp',
    ],
    'ja': [
      '/images/v26/greeting-cards/rounded-corner/ja/hero.webp',
      '/images/v26/greeting-cards/rounded-corner/ja/detail.webp',
      '/images/v26/greeting-cards/rounded-corner/ja/multi-angle.webp',
      '/images/v26/greeting-cards/rounded-corner/ja/variety.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-greeting-cards-rounded-corner-greeting-cards-zh-hk-hero.webp', en: 'zprintpro-stickers-rounded-corner-cards-en.webp', ja: 'zprintpro-stickers-rounded-corner-cards-ja.webp' },
    alt: {
      'zh-hk': '香港圓角賀卡印刷 300g銅版紙 覆膜（啞膠／光膠）',
      en: 'Rounded Corner Cards | Professional Greeting Cards Online',
      ja: '丸角グリーティングカード | プロ印刷・即日お見積もり | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    variables: {
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.7 },
      ],
    },
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 貼紙印刷 (8 SKU)
  // 貼紙印刷 (8 SKU)
  {
    id: 'ST-001',
    sku_code: 'ST-001',
    slug: 'waterproof-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '防水貼紙 / 戶外貼紙 訂製 | PVC 防水 / 異形貼紙', nameEn: 'Waterproof Stickers / Outdoor Stickers | Waterproof & Die-Cut', nameJa: '防水ステッカー / 屋外ステッカー | 防水ステッカー / ダイカット', title_zh: '防水貼紙 / 戶外貼紙 訂製 10個起印 · 5-7天交期 · 智印港',
    description: '防水貼紙 / 戶外貼紙 PVC材質，防水防曬耐磨，適合戶外使用、產品標籤、車身貼紙、設備標識、活動紀念。5-7 天交期，DHL 全球 2-4 天。', descriptionEn: 'Waterproof stickers / outdoor stickers PVC with excellent water, UV, and abrasion resistance. Perfect for outdoor use, product labels, car decals, equipment signs, event souvenirs. 5-7 day turnaround, DHL global 2-4 days.', descriptionJa: '防水ステッカー / 屋外ステッカー PVC、防水・UV・耐摩耗性に優れる。屋外使用、製品ラベル、車用ステッカー、設備サイン、記念品に最適。5-7日納期, DHL グローバル 2-4日。', description_zh: '防水貼紙 / 戶外貼紙 PVC材質，防水防曬耐磨，適合戶外使用、產品標籤、車身貼紙、設備標識、活動紀念。',
    features: [
      '面材：PVC 防水或 PP 合成紙，戶外短期耐候',
      '可選啞膜／光膜覆膜，提升耐磨與抗污',
      '支援異形模切與可變資料（序號／條碼／QR）',
      'ICC 色彩管理，品牌色還原穩定',
      '小批量數碼快印，適合試產與活動急件',
      '可搭配 3M 等強力背膠（視稿與材質）',
      '印前免費檢查刀模線與安全距離',
    ],
    specs: {
      material: 'PVC 防水／PP 合成紙；可覆啞膜或光膜',
      size: '最小約 10×10mm，最大約 300×400mm（依稿而定）',
      printMethod: '四色數碼或柯式（依數量）',
      finishing: '模切、覆膜（啞膜／光膜）、局部可選工藝',
    },
    price_range: 'HK$0.22-1.0/張',
    basePrice: 0.22,
    basePrice_en: 0.32,
    basePrice_ja: 41,
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-zh-hk-hero.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-zh-hk-detail.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-zh-hk-variety.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-en-hero.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-en-detail.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-en-variety.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-ja-hero.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-ja-detail.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-ja-variety.webp', '/images/products/v28_5/waterproof-stickers/zprintpro-stickers-waterproof-stickers-ja-multi-angle.webp']
  },
    optimizedAt: '2026-07-14',
    optimizationRound: 1,
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-waterproof-stickers-zh-hk.webp', en: 'zprintpro-stickers-waterproof-stickers-en.webp', ja: 'zprintpro-stickers-waterproof-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港防水貼紙印刷 PVC 防水／PP 合成紙 模切',
      en: 'Waterproof Stickers & Custom Vinyl | Waterproof Stickers | Professional Stickers Online',
      ja: '防水ステッカー / ダイカットステッカー | 防水ステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-002',
    sku_code: 'ST-002',
    slug: 'transparent-stickers',

        optimizedAt: '2026-07-29',
        optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '透明貼紙 / 透明貼 訂製 | 防水貼紙 / 異形貼紙', nameEn: 'Transparent Stickers / Clear Stickers | Waterproof & Die-Cut', nameJa: '透明ステッカー / 透明 ステッカー | 防水ステッカー / ダイカット', title_zh: '透明貼 / 透明貼紙 訂製 · 10 張起印',
    description: '透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。 適配行業: 美妝護膚、食品酒類、飲品品牌、香水、玻璃容器、無標籤產品、電商禮盒.', descriptionEn: 'Transparent PET material creates invisible effect when applied. Perfect for cosmetics, food packaging, glass decoration. Best for: Beauty, Food & Beverage, Drinks brands, Perfume, Glass containers, No-label products, E-commerce gift boxes.', descriptionJa: '透明PET素材、貼り付け後無感効果。化粧品、食品包裝、ガラス装飾に最適。 適合業種: 美容、食品・飲料、飲み物ブランド、香水、ガラス容器、ノーラベル商品、ECギフトボックス。', description_zh: '透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。 適配行業: 美妝護膚、食品酒類、飲品品牌、香水、玻璃容器、無標籤產品、電商禮盒.',
    features: [
      '高透明 PET 面材，可選白墨打底',
      '適合玻璃瓶、化妝品與透明盒貼標',
      '可覆啞膜／光膜，兼顧質感與耐用',
      '支援精細模切與品牌輪廓造型',
      '四色印刷＋專色／白墨方案可諮詢',
      '符合一般室內陳列與冷鏈外貼需求（依材質組合）',
      '印前協助檢查反白與最小字級',
    ],
    specs: {
      material: '透明 PET；可選白墨、啞膜／光膜',
      size: '客製模切外形，常用寬邊 20–120mm 級距',
      printMethod: 'CMYK＋可選白墨（依設計）',
      finishing: '覆膜（啞膜／光膜）、模切、可選局部 UV',
    },
    price_range: 'HK$0.38-1.50/張',
    basePrice: 0.38,
    basePrice_en: 0.41,
    basePrice_ja: 51,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-zh-hk-hero.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-zh-hk-detail.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-zh-hk-variety.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-en-hero.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-en-detail.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-en-variety.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-ja-hero.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-ja-detail.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-ja-variety.webp', '/images/products/v28_5/transparent-stickers/zprintpro-stickers-transparent-stickers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-transparent-stickers-zh-hk-1.webp', en: 'zprintpro-stickers-transparent-stickers-en.webp', ja: 'zprintpro-stickers-transparent-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港透明貼紙印刷 透明 PET 覆膜（啞膜／光膜）',
      en: 'Waterproof Stickers & Custom Vinyl | Transparent Stickers Printing Clear PET Laminated',
      ja: '防水ステッカー / ダイカットステッカー | 透明ステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-003',
    sku_code: 'ST-003',
    slug: 'removable-stickers',
    optimizedAt: '2026-08-05',
    optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '可移貼紙(無殘膠) / 可移貼紙訂製 | 防水貼紙 / 異形貼紙', nameEn: 'Removable Stickers | Waterproof & Die-Cut Stickers', nameJa: 'はがせるステッカー | 防水ステッカー / ダイカット', title_zh: '可移貼紙訂製 玻璃不留膠 10張起印 · 智印港',
    description: '特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。 适配行业:季節性推廣、活動短期宣傳、試用品包裝、玻璃櫥窗裝飾、學校活動、餐廳當日貼紙、零售促銷 適配行業：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。', descriptionEn: 'Special adhesive design leaves no residue when removed. Perfect for car windows, glass displays, short-term exhibitions. Best for:seasonal campaigns, short-term event promo, sample packaging, glass window decoration, school activities, restaurant daily specials, retail promotions Best for: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.', descriptionJa: '特殊粘着設計、剥がしても残りません。車窓、ガラス展示、短期展示会に最適。 適用業界:季節キャンペーン、短期イベントプロモーション、サンプル包装、ガラス窓装飾、学校行事、レストラン日替わり、小売プロモーション 適用業界：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。', description_zh: '特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。',
    features: [
      '【可移膠】移除不留殘膠，保護車漆與玻璃表面',
      '【PP/PET 面材】可選合成紙或透明膜，適配不同展示需求',
      '【3–5 次重貼】24 小時初黏測試，平滑面可反覆調整位置',
      '【異形模切】支援任意形狀裁切，活動分區管理更方便',
      '【可變資料】序號／條碼／QR Code，批次追蹤與防偽',
      '【數碼快印】10 張起印，當日打樣，適合急件與試產',
      '【覆膜選項】啞膜／光膜，提升耐磨與抗污能力',
    ],
    specs: {
      material: 'PP 合成紙／PET 透明膜；可移膠',
      size: '最小約 15×15mm，最大約 250×350mm',
      printMethod: '四色數碼或柯式（依數量）',
      finishing: '模切、覆膜（啞膜／光膜）',
    },
    price_range: 'HK$0.45-1.60/張',
    basePrice: 0.45,
    basePrice_en: 0.37,
    basePrice_ja: 46,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-zh-hk-hero.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-zh-hk-detail.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-zh-hk-variety.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-en-hero.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-en-detail.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-en-variety.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-ja-hero.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-ja-detail.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-ja-variety.webp', '/images/products/v28_5/removable-stickers/zprintpro-stickers-removable-stickers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-removable-stickers-zh-hk.webp', en: 'zprintpro-stickers-removable-stickers-en.webp', ja: 'zprintpro-stickers-removable-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港可移貼紙(無殘膠)印刷 PP 合成紙／PET 透明膜 模切',
      en: 'Waterproof Stickers & Custom Vinyl | Removable Stickers | Professional Stickers Online',
      ja: '防水ステッカー / ダイカットステッカー | はがせるステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-004',
    sku_code: 'ST-004',
    slug: 'small-batch-stickers',
    optimizedAt: '2026-07-28',
    optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '小批量貼紙 / label printing | 防水貼紙 / 異形貼紙', nameEn: 'Small Batch Stickers / Label Printing | Waterproof & Die-Cut Labels', nameJa: '小ロットステッカー / ラベル印刷 | 防水ステッカー / ダイカット', title_zh: '小批量貼紙 / label printing · 訂製',
    description: '最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。 适配行业: 文創IP、同人周邊、餐飲、零售品牌活動、初創電商、測試樣本、活動贈品.', descriptionEn: 'Minimum A4 size order, no bulk inventory pressure. Perfect for startups, event promotion, personal creations. 适配行业: Indie IP, Doujin creators, Food & Beverage, Retail events, Startup e-commerce, Test samples, Promotional gifts.', descriptionJa: '最小A4サイズから、大量在庫の心配なし。スタートアップ、イベント宣伝、個人創作に最適。 适配行业: インディーIP、同人創作、飲食、小売イベント、スタートアップEC、テストサンプル、プロモーションギフト.', description_zh: '最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。 适配行业: 文創IP、同人周邊、餐飲、零售品牌活動、初創電商、測試樣本、活動贈品.',
    features: [
      '【A4 起印】無最低數量壓力，適合試產與限量活動',
      '【多材質】銅版紙／PP／PVC／Kraft，匹配品牌調性',
      '【Delta E ≤3】ICC 色彩管理，品牌色穩定還原',
      '【免費刀模】異形模切與圓角設計，印前免費檢查',
      '【1–2 天交付】數碼快印，適合急單與快速迭代',
      '【可變資料】限量編號、QR Code，防偽與批次管理',
      '【局部燙金】金／銀箔選項，提升包裝高級感',
    ],
    specs: {
      material: '銅版紙／PP 合成紙／透明 PVC／Kraft 牛皮紙',
      size: 'A4 起印；單張尺寸最小 10×10mm，最大 300×400mm',
      printMethod: '四色數碼印刷（HP Indigo）',
      finishing: '模切、圓角、局部燙金、覆膜',
    },
    price_range: 'HK$38-120/A4',
    basePrice: 38,
    basePrice_en: 0.55,
    basePrice_ja: 69,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-zh-hk-hero.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-zh-hk-detail.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-zh-hk-variety.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-en-hero.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-en-detail.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-en-variety.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-ja-hero.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-ja-detail.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-ja-variety.webp', '/images/products/v28_5/small-batch-stickers/zprintpro-stickers-small-batch-stickers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-small-batch-stickers-zh-hk.webp', en: 'zprintpro-stickers-small-batch-stickers-en.webp', ja: 'zprintpro-stickers-small-batch-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港小批量貼紙印刷 銅版紙／PP 合成紙／透明 PVC／Kr 模切',
      en: 'Waterproof Stickers & Custom Vinyl | Small Batch Stickers | Professional Stickers Online',
      ja: '防水ステッカー / ダイカットステッカー | 小ロットステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-005',
    sku_code: 'ST-005',
    slug: 'die-cut-stickers',

        optimizedAt: '2026-07-29',
        optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '異形模切貼紙 | 防水貼紙 / 異形貼紙', nameEn: 'Die-cut Stickers | Waterproof & Die-Cut Stickers', nameJa: '型抜きステッカー | 防水ステッカー / ダイカット', title_zh: '異形模切貼紙 · 文創IP角色造型模切定製 | 智印港',
    description: '任意形狀模切，讓創意不受限製。可切出Logo形狀、卡通形象等獨特輪廓。適配行業: 文創IP / VTuber / 動漫周邊 / 個人插畫師 / 品牌吉祥物 / 同人誌 / 活動贈品。 適配行業: 文創IP、品牌吉祥物、活動贈品、零售精品、跨境電商、電商賣家、寵物食品.', descriptionEn: 'Any shape die-cutting, creativity without limits. Can cut logo shapes, cartoon characters, unique contours. Best for: creator IP / VTuber / anime merch / illustrators / brand mascots / doujinshi / event giveaways. Free die-cut setup · Free shipping over $99 USA · 10 MOQ · Custom shapes for product labels, packaging, and promotional use. 适配行业: Indie IP, Brand mascots, Event giveaways, Retail, Cross-border e-commerce, E-commerce sellers, Pet food.', descriptionJa: '任意形状の型抜き、創作の自由を製限しません。適用業界: クリエイターIP / VTuber / アニメ周边 / 個人イラストレーター / ブランドマスコット / 同人誌 / イベント赠り物。。型代無料・全国送料込み・10枚から。製品ラベル・パッケージ・プロモーション用カスタム形状。 适配行业: インディーIP、ブランドマスコット、イベント景品、小売、越境EC、EC seller、ペットフード。', description_zh: '任意形狀模切，讓創意不受限製。可切出Logo形狀、卡通形象等獨特輪廓。適配行業: 文創IP / VTuber / 動漫周邊 / 個人插畫師 / 品牌吉祥物 / 同人誌 / 活動贈品。 適配行業: 文創IP、品牌吉祥物、活動贈品、零售精品、跨境電商、電商賣家、寵物食品.',
    features: [
      '任意外形模切，強化品牌造型記憶',
      '可選 PVC／PP／PET 面材與覆膜',
      '支援吻切或全切工藝配置',
      '可變序號／QR 批次管理',
      '文創與活動限量款友好',
      '印前刀模合理性審閱',
      'ICC 控色，批次穩定',
    ],
    specs: {
      material: 'PVC／PP 合成紙／透明 PET；可覆膜',
      size: '依稿模切；建議最小元素寬度 ≥1.5mm（視材質）',
      printMethod: '四色數碼或柯式',
      finishing: '模切（全切／吻切）、啞膜／光膜',
    },
    price_range: 'HK$0.58-2.20/張',
    basePrice: 0.58,
    basePrice_en: 0.46,
    basePrice_ja: 60,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-zh-hk-hero.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-zh-hk-detail.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-zh-hk-variety.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-en-hero.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-en-detail.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-en-variety.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-ja-hero.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-ja-detail.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-ja-variety.webp', '/images/products/v28_5/die-cut-stickers/zprintpro-stickers-die-cut-stickers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-die-cut-stickers-zh-hk.webp', en: 'zprintpro-stickers-die-cut-stickers-en.webp', ja: 'zprintpro-stickers-die-cut-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港異形模切貼紙印刷 PVC／PP 合成紙／透明 PET 模切（全切／吻切）',
      en: 'Waterproof Stickers & Custom Vinyl | Die-cut Stickers | Professional Stickers Online',
      ja: '防水ステッカー / ダイカットステッカー | 型抜きステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-006',
    sku_code: 'ST-006',
    slug: 'foil-stickers',
    optimizedAt: '2026-07-30',
    optimizationRound: 2,
    category: 'stickers',
    category_slug: 'stickers',
    name: '燙金貼紙 | 防水貼紙 / 異形貼紙', nameEn: 'Foil Stickers | Waterproof & Die-Cut Stickers', nameJa: '箔押しステッカー | 防水ステッカー / ダイカット', title_zh: '燙金貼紙 · 訂製',
    description: '燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。 适配行业: 美妝護膚、食品酒類、零售精品、品牌活動、禮品包裝、VIP標識、跨境電商. 適配行業: 餐飲外賣/美妝護膚/茶飲食品/寵物食品/母嬰/服裝/禮品包裝.', descriptionEn: 'Foil stamping gives stickers premium quality feel. Perfect for luxury product labels, gift packaging, VIP badges. Gold/silver foil · 10 MOQ · Free design proof · Fast 4-day turnaround. Perfect for beauty brands, wedding favors, premium packaging. Best for: beauty & skincare / food & beverage / tea brands / pet food / baby & maternity / apparel / gift packaging.', descriptionJa: '箔押し加工でステッカーに高級感。ラグジュアリー商品ラベル、ギフトパッケージ、VIPバッジに最適。ゴールド/シルバーホイル・10枚から・無料デザイン確認・4日仕上げ。 beauty & skincare / food & beverage / tea brands / pet food / baby & maternity / apparel / gift packaging.', description_zh: '燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。 适配行业: 美妝護膚、食品酒類、零售精品、品牌活動、禮品包裝、VIP標識、跨境電商. 適配行業: 餐飲外賣/美妝護膚/茶飲食品/寵物食品/母嬰/服裝/禮品包裝.',
    features: [
      '多色箔可選（金／銀／玫瑰金等）',
      '適合禮盒、酒標、美妝與 VIP 物料',
      '可搭配覆膜保護箔面',
      '燙金＋四色套印工藝可諮詢',
      '印前對位與可製性檢查',
      '品牌節慶與限量款首選',
      '與局部 UV 層次搭配常見',
    ],
    specs: {
      material: '銅版紙／合成紙；可覆啞膜／光膜',
      size: '依稿模切；箔面最小字高視稿評估',
      printMethod: '四色印刷＋燙金（分版）',
      finishing: '燙金／燙銀、模切、可選局部 UV',
    },
    price_range: 'HK$0.78-2.80/張',
    basePrice: 0.78,
    basePrice_en: 0.51,
    basePrice_ja: 64,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-zh-hk-hero.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-zh-hk-detail.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-zh-hk-variety.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-en-hero.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-en-detail.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-en-variety.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-ja-hero.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-ja-detail.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-ja-variety.webp', '/images/products/v28_5/foil-stickers/zprintpro-stickers-foil-stickers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-foil-stickers-zh-hk.webp', en: 'zprintpro-stickers-foil-stickers-en.webp', ja: 'zprintpro-stickers-foil-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港燙金貼紙印刷 銅版紙／合成紙 燙金／燙銀',
      en: 'Waterproof Stickers & Custom Vinyl | Foil Stickers | Professional Stickers Online',
      ja: '防水ステッカー / ダイカットステッカー | 箔押しステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-007',
    sku_code: 'ST-007',
    slug: 'security-stickers',
    optimizedAt: '2026-08-01',
    optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '防偽貼紙 | 防水貼紙 / 異形貼紙', nameEn: 'Security Stickers | Waterproof & Die-Cut Stickers', nameJa: 'セキュリティステッカー | 防水ステッカー / ダイカット', title_zh: '防偽貼紙',
    description: '特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'Special anti-counterfeiting processes including holographic labels, fragile paper, protecting brands from counterfeiting. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '特殊な偽造防止加工、ホログラムラベル、壊れやすい紙など。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。',
    features: [
      '易碎／VOID 等防拆材可選',
      '可變序號、QR、條碼防竄貨',
      '適用保修、3C、證書與封條',
      '可搭配雷射全息提升辨識',
      '印前防偽工藝組合建議',
      '批次留樣與色差控製',
      '支援多語警示文案',
    ],
    specs: {
      material: '易碎紙／VOID／合成紙＋全息膜等（依方案）',
      size: '依應用模切；小標籤至 A4 拼版皆可',
      printMethod: '可變數碼印刷為主；可搭配專色',
      finishing: '模切、全息冷燙或燙金（依稿）',
    },
    price_range: 'HK$1.15-4.00/張',
    basePrice: 1.15,
    basePrice_en: 0.41,
    basePrice_ja: 51,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-zh-hk-hero.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-zh-hk-detail.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-zh-hk-variety.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-en-hero.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-en-detail.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-en-variety.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-ja-hero.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-ja-detail.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-ja-variety.webp', '/images/products/v28_5/security-stickers/zprintpro-stickers-security-stickers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小尺寸(≤50mm)', multiplier: 1 },
        { value: 'medium', label: '中尺寸(51-100mm)', multiplier: 1.5 },
        { value: 'large', label: '大尺寸(>100mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'pvc', label: 'PVC防水', surcharge: 0 },
        { value: 'pp', label: 'PP合成紙', surcharge: 10 },
        { value: 'pet', label: 'PET透明', surcharge: 15 },
      ],
      finishings: [
        { value: 'gloss', label: '光膜', surcharge: 0 },
        { value: 'matte', label: '啞膜', surcharge: 5 },
        { value: 'diecut', label: '異形模切', surcharge: 30 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-security-stickers-zh-hk.webp', en: 'zprintpro-stickers-security-stickers-en.webp', ja: 'zprintpro-stickers-security-stickers-ja.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港防偽貼紙印刷 易碎紙／VOID／合成紙＋全息膜等（依方 模切',
      en: 'Waterproof Stickers & Custom Vinyl | Security Stickers | Professional Stickers Online',
      ja: '防水ステッカー / ダイカットステッカー | セキュリティステッカー | 防水対応・オリジナル形状 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ST-010',
    sku_code: 'ST-010',
    slug: 'roll-stickers',
    optimizedAt: '2026-10-12',
    optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '卷裝貼紙 | 卷裝標籤 / 貼標機適用', nameEn: 'Roll Labels | Custom Roll Stickers for Label Applicators', nameJa: 'ロールラベル | ラベラー対応 ロールシール', title_zh: '卷裝貼紙',
    description: '卷裝貼紙出貨即成卷，上貼標機即用：卷芯直徑 4cm、出標方向可選、每卷 1,000 張，銅板紙熱熔膠格仔底，食品飲料、美妝、日化生產線適用。10 張起印，3,000 張低至 HK$0.20/張。', descriptionEn: 'Roll labels shipped wound on 4cm cores, unwind direction options, 1,000 labels per roll - applicator-ready for food, beverage, beauty and FMCG lines. From 10 pcs, as low as $0.03 per label at 3,000 pcs.', descriptionJa: 'ロールラベルは巻芯径4cm・繰り出し方向指定可・1巻1,000枚で出荷、食品・飲料・化粧品・日用品のラベラーラインにそのまま対応。10枚から、3,000枚で1枚¥4.1〜。', description_zh: '卷裝貼紙出貨即成卷，上貼標機即用：卷芯直徑 4cm、出標方向可選、每卷 1,000 張，銅板紙熱熔膠格仔底。',
    features: [
      '【貼標機適用】卷芯直徑 4cm、出標方向可選（如橫版左出標）、每卷 1,000 張，上機即用',
      '【熱熔膠銅板】格仔底紙 + 熱熔膠，貼附牢、出標順，通用食品飲料與日化瓶罐',
      '【小批量起印】10 張起印數碼快印，試產與大貨同線，3,000 張低至 HK$0.20/張',
      '【異形模切】任意形狀啤切，品牌輪廓標籤亦可上機',
      '【可變資料】序號／QR／條碼逐張可變，批次管理與防竄貨',
      '【SGS 遷移測試】油墨無重金屬遷移，間接食品接觸適用',
      '【1 小時打稿】免費數碼打稿 + 2 次免費修改，5-7 個工作天交貨',
    ],
    specs: {
      material: '銅板紙（熱熔膠）＋格仔底紙',
      size: '常用 150×100mm 級距，任意尺寸可報',
      printMethod: 'HP Indigo 數碼／柯式（依數量）',
      finishing: '卷裝復卷（卷芯 4cm・出標方向可選・每卷 1,000 張）、異形模切(啤)',
    },
    price_range: 'HK$0.20-5.50/張',
    basePrice: 0.20,
    basePrice_en: 0.03,
    basePrice_ja: 4,
    weight_score: 80,
    isHot: false,
    isNew: true,
    minQuantity: 10,
    images: ['/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-1.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-roll-stickers-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-roll-stickers-zh-hk.webp', en: 'zprintpro-stickers-roll-stickers-en.webp', ja: 'zprintpro-stickers-roll-stickers-ja.webp' },
    alt: {
      'zh-hk': '卷裝貼紙 / 卷裝標籤 | 香港卷裝標籤印刷 卷芯4cm 貼標機適用 | 智印港',
      en: 'Custom Roll Labels on 4cm cores for label applicators | ZprintPro',
      ja: 'ロールラベル 印刷 | 巻芯径4cm・ラベラー対応 | ZprintPro'
    },
  },

    // === 2026-10-12 新建: 卷裝貼紙 (K3 拍板荧光→卷裝), 價格真值 = price-data.generated.ts roll 檔 ===
    variables: {
      quantities: [
        { value: 10, label: '10', discount: 7.75 },
        { value: 25, label: '25', discount: 3.24 },
        { value: 50, label: '50張', discount: 1.72 },
        { value: 75, label: '75張', discount: 1.23 },
        { value: 99, label: '99張', discount: 1 },
        { value: 3000, label: '3000張', discount: 0.29 },
      ],
    },
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 紙袋印刷 (6 SKU)
  {
    id: 'PB-001',
    sku_code: 'PB-001',
    slug: 'kraft-paper-bags',

    optimizedAt: '2026-07-23',
    optimizationRound: 3,    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '牛皮紙袋 | 紙袋 / 牛皮紙袋 / 手提袋', nameEn: 'Kraft Paper Bags | Paper Bags & Kraft Bags', nameJa: 'クラフト紙袋 | 紙袋 / クラフト紙袋 / ハンドル', title_zh: '牛皮紙袋印刷訂製 100個起印 免費刀模 FSC認證 · 服裝品牌跨境電商適配 | 智印港',
    description: '牛皮紙袋印刷訂製 100 個起，HK$8 起/個。牛皮紙 120–200g 級，多尺寸多規格，免費刀模設計，支援燙金／局部 UV。標準生產 3-5 個工作天，港九新界滿 $500 順豐免運，零售餐飲活動品牌推廣。 適配行業:服裝品牌、買手店、餐廳外賣、咖啡店、手搖飲品、婚慶喜帖、跨境電商 Etsy、禮品店', descriptionEn: 'Eco-friendly kraft paper, natural and rustic, loved by consumers. Perfect for clothing stores, gift shops, coffee shops., internationally certified quality management system. Eco-friendly kraft · 100 MOQ · Twisted/ribbon handle options · Free shipping over $99 USA. Perfect for retail, bakery, fashion brands. Best for:apparel brands, boutique stores, restaurant takeout, cafe & bubble tea, wedding favors, cross-border Etsy, gift shops, eco-conscious DTC brands', descriptionJa: '環境に優しいクラフト紙、質朴で自然、消費者に人気。衣料品店、ギフトショップ、コーヒーショップに最適。。エコクラフト紙・100枚から・紐/リボン手提げ選択可・全国送料込み。小売・ベーカリー・アパレルブランドに最適。 適用業界:アパレルブランド、セレクトショップ、飲食テイクアウト、カフェ・タピオカ、ブライダル、越境EC Etsy、ギフトショップ、エコDTCブランド', description_zh: '環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定製Logo印刷。 2026 旺季: ESG 環保品牌、有機食品品牌、文創市集限定、減塑徵費合規。',
    features: [
      '牛皮紙質感，環保形象鮮明',
      '可選棉繩／紙繩手挽與底部加固',
      '支援燙金／UV 等品牌工藝',
      '多尺寸小／中／大袋型可配置',
      '適合零售購物袋與活動贈袋',
      '印前展開圖與糊位檢查',
      '與白卡／特種紙方案可並行比較',
    ],
    specs: {
      material: '牛皮紙 120–200g 級（依報價）；可配手挽材',
      size: '小／中／大袋型或客製展開尺寸',
      printMethod: '單色至四色；可數碼打樣',
      finishing: '燙金／燙銀、局部 UV、覆膜（視材）',
    },
    price_range: 'HK$3-8/個',
    basePrice: 8,
    basePrice_en: 1.84,
    basePrice_ja: 240,
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/kraft-paper-bags.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-paper-bags-kraft-paper-bags-zh-hk.webp', en: 'zprintpro-paper-bags-kraft-paper-bags-en.webp', ja: 'zprintpro-paper-bags-kraft-paper-bags-ja.webp' },
    alt: {
      'zh-hk': '紙袋印刷 / 牛皮紙袋 / 手提紙袋 | 香港牛皮紙袋印刷 牛皮紙 120–200g 級（依報價） 燙金／燙銀',
      en: 'Paper Bag Printing & Kraft Bags | Kraft Paper Bags | Professional Paper Bags Online',
      ja: '紙袋印刷 / クラフト紙袋 / ショッピング | クラフト紙袋 | エコ素材対応・小ロットOK | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(180×230×80mm)', multiplier: 1 },
        { value: 'medium', label: '中號(250×300×100mm)', multiplier: 1.4 },
        { value: 'large', label: '大號(320×400×120mm)', multiplier: 2 },
      ],
      materials: [
        { value: 'kraft', label: '牛皮紙', surcharge: 0 },
        { value: 'white', label: '白卡紙', surcharge: 50 },
        { value: 'art', label: '銅版紙', surcharge: 30 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 150 },
        { value: 'uv', label: 'UV', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 200, label: '200個', discount: 0.9 },
        { value: 500, label: '500個', discount: 0.75 },
        { value: 1000, label: '1000個', discount: 0.6 },
      ],
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PB-002',
    sku_code: 'PB-002',
    slug: 'white-card-bags',
    optimizedAt: '2026-07-29',
    optimizationRound: 2,
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '白卡紙袋 | 紙袋 / 牛皮紙袋 / 手提袋', nameEn: 'White Card Bags | Paper Bags & Kraft Bags', nameJa: '白カード紙袋 | 紙袋 / クラフト紙袋 / ハンドル', title_zh: '白卡紙袋 · 服裝珠寶品牌升級首選',
    description: '白卡紙材質，表面平整光滑，印刷效果佳。適合高端品牌、化妝品店。適配行業: 服裝品牌、買手店、珠寶首飾、化妝品、禮品店、婚慶禮品、生活精品店。 適配行業: 服裝、珠寶鐘錶、禮品店、品牌活動、活動贈品、酒店迎賓、食品店.', descriptionEn: 'White card paper, smooth surface, excellent printing effect. Perfect for high-end brands, cosmetic stores. Best for: apparel brands, boutiques, jewelry, cosmetics, gift shops, wedding favors, lifestyle concept stores. 适配行业: Apparel, Jewelry & Watches, Gift shops, Brand events, Event giveaways, Hotel hospitality, Food stores.', descriptionJa: '白カード紙、表面が滑らかで印刷効果が抜群。高級ブランド、化粧品店に最適。 適用業界: アパレルブランド、ブティック、宝飾・アクセサリー、化粧品、ギフトショップ、ブライダルギフト、ライフスタイル コンセプト ストア。 适配行业: アパレル、宝飾・腕時計、ギフトショップ、ブランドイベント、イベント景品、ホテル、食品店。', description_zh: '白卡紙材質，表面平整光滑，印刷效果佳。適合高端品牌、化妝品店。 適配行業: 服裝、珠寶鐘錶、禮品店、品牌活動、活動贈品、酒店迎賓、食品店.',
    features: [
      '白卡紙高挺度，色彩還原佳',
      '可覆啞膠／光膠、燙金、局部 UV',
      '多款手挽材質可選',
      '適合百貨專櫃與品牌旗艦',
      '支援客製袋型與開窗（可諮詢）',
      '印前色彩與刀模審閱',
      '批量價階清晰',
    ],
    specs: {
      material: '白卡紙 200–300g 級（依報價）；可覆膜',
      size: '小／中／大或客製展開',
      printMethod: '四色＋可選專色／燙金',
      finishing: '覆膜、燙金／燙銀、局部 UV、模切糊袋',
    },
    price_range: 'HK$5-12/個',
    basePrice: 12,
    basePrice_en: 2.76,
    basePrice_ja: 360,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-zh-hk-1.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(180×230×80mm)', multiplier: 1 },
        { value: 'medium', label: '中號(250×300×100mm)', multiplier: 1.4 },
        { value: 'large', label: '大號(320×400×120mm)', multiplier: 2 },
      ],
      materials: [
        { value: 'kraft', label: '牛皮紙', surcharge: 0 },
        { value: 'white', label: '白卡紙', surcharge: 50 },
        { value: 'art', label: '銅版紙', surcharge: 30 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 150 },
        { value: 'handle', label: '手挽繩', surcharge: 20 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-paper-bags-white-card-bags-zh-hk.webp', en: 'zprintpro-paper-bags-white-card-bags-en.webp', ja: 'zprintpro-paper-bags-white-card-bags-ja.webp' },
    alt: {
      'zh-hk': '紙袋印刷 / 牛皮紙袋 / 手提紙袋 | 香港白卡紙袋印刷 白卡紙 200–300g 級（依報價） 覆膜',
      en: 'Paper Bag Printing & Kraft Bags | White Card Bags | Professional Paper Bags Online',
      ja: '紙袋印刷 / クラフト紙袋 / ショッピング | 白カード紙袋 | エコ素材対応・小ロットOK | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PB-003',
    sku_code: 'PB-003',
    slug: 'gift-bags',
    optimizedAt: '2026-07-30',
    optimizationRound: 2,
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '禮品紙袋 | 紙袋 / 牛皮紙袋 / 手提袋', nameEn: 'Gift Bags | Paper Bags & Kraft Bags', nameJa: 'ギフト紙袋 | 紙袋 / クラフト紙袋 / ハンドル', title_zh: '禮品紙袋印刷訂製 高檔禮品袋 100個起印 燙金LOGO | 智印港',
    description: '禮品紙袋印刷訂製，100個起印，HK$3.5起/個。棉繩緞帶手挽，燙金UV壓凹工藝，支援多尺寸客製LOGO。適合品牌活動週年慶贈品，即日交貨，全港免費送貨。 适配行业: 婚慶、珠寶鐘錶、茶飲食品、服裝、禮品、品牌活動、酒店迎賓. 適配行業: 婚慶/珠寶鐘錶/茶飲食品/服裝/禮品店/品牌活動/酒店迎賓.', descriptionEn: 'Exquisite design with foil stamping, UV and other processes. Essential for gifting, elevates gift quality., internationally certified quality management system. Custom printed gift bags · 100 MOQ · Foil logo option · Wedding favor, retail, event bags. Free design mockup. 适配行业: Wedding, Jewelry & Watches, Tea & Beverage, Apparel, Gifts, Brand events, Hotel hospitality. Best for: weddings / jewelry & watches / tea & F&B / apparel / gift shops / brand events / hotel welcome.', descriptionJa: '精巧なデザイン、箔押し・UVなどの加工付き。ギフトに必須、ギフトの質を向上。。オリジナルギフト紙袋・100枚から・箔押し選択可。ウェディング・小売・イベント用。校正無料。 适配行业: ウェディング、宝飾・腕時計、茶・飲料、アパレル、ギフト、ブランドイベント、ホテル. 適合業種: 婚礼 / 宝飾時計 / お茶飲食 / アパレル / ギフトショップ / ブランドイベント / ホテル歓迎.', description_zh: '精美設計，配合燙金、UV等工藝。送禮必備，提升禮品檔次。 适配行业: 婚慶、珠寶鐘錶、茶飲食品、服裝、禮品、品牌活動、酒店迎賓. 適配行業: 婚慶/珠寶鐘錶/茶飲食品/服裝/禮品店/品牌活動/酒店迎賓.',
    features: [
      '禮贈場景導向，工藝層次豐富',
      '可搭燙金、局部 UV、緞帶手挽',
      '袋型可加深底寬容納禮盒',
      '特種／珠光紙提升質感',
      '適合節慶與企業批量採購',
      '印前對色與穿孔加固建議',
      '可分批交貨支援活動檔期',
    ],
    specs: {
      material: '白卡／特種紙／珠光紙（依稿）；可覆膜',
      size: '禮品常用中／大袋或客製',
      printMethod: '四色＋燙金／局部 UV',
      finishing: '燙金、局部 UV、緞帶或棉繩手挽',
    },
    price_range: 'HK$10-20/個',
    basePrice: 20,
    basePrice_en: 4.6,
    basePrice_ja: 600,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/gift-bags.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(180×230×80mm)', multiplier: 1 },
        { value: 'medium', label: '中號(250×300×100mm)', multiplier: 1.4 },
        { value: 'large', label: '大號(320×400×120mm)', multiplier: 2 },
      ],
      materials: [
        { value: 'kraft', label: '牛皮紙', surcharge: 0 },
        { value: 'white', label: '白卡紙', surcharge: 50 },
        { value: 'art', label: '銅版紙', surcharge: 30 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 150 },
        { value: 'handle', label: '手挽繩', surcharge: 20 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-paper-bags-gift-bags-zh-hk.webp', en: 'zprintpro-paper-bags-gift-bags-en.webp', ja: 'zprintpro-paper-bags-gift-bags-ja.webp' },
    alt: {
      'zh-hk': '紙袋印刷 / 牛皮紙袋 / 手提紙袋 | 香港禮品紙袋印刷 白卡／特種紙／珠光紙（依稿） 燙金',
      en: 'Paper Bag Printing & Kraft Bags | Gift Bags | Professional Paper Bags Online',
      ja: '紙袋印刷 / クラフト紙袋 / ショッピング | ギフト紙袋 | エコ素材対応・小ロットOK | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PB-004',
    sku_code: 'PB-004',
    slug: 'eco-paper-bags',
    optimizedAt: '2026-07-27',
    optimizationRound: 1,
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '環保紙袋 | 紙袋 / 牛皮紙袋 / 手提袋', nameEn: 'Eco Paper Bags | Paper Bags & Kraft Bags', nameJa: 'エコ紙袋 | 紙袋 / クラフト紙袋 / ハンドル', title_zh: '環保紙袋印刷訂製 FSC再生認證 100個起印 | 智印港',
    description: '環保紙袋印刷訂製 100 個起，HK$8 起/個。可選 FSC 認證牛皮紙或再生紙，大豆油墨印刷，袋底可加印認證標示。適合 ESG 品牌碳審計、減塑徵費合規。標準生產 3-5 個工作天，港九新界滿 $500 順豐免運。 適配行業: ESG認證品牌、環保美妝、有機食品、公平貿易、咖啡店、買手店、服裝品牌、禮品店.', descriptionEn: 'FSC-certified eco-friendly paper, sustainable development. Perfect for environmentally conscious brands., internationally certified quality management system. 100% recycled paper · 100 MOQ · FSC-certified · Sustainable packaging for eco-conscious brands. Typical uses: ESG brands, eco beauty, organic food, fair trade, Cafés, Boutiques, Apparel, Gift shops.', descriptionJa: 'FSC認証の環境に優しい紙、持続可能な開発。環境に配慮するブランドに最適。。再生紙100%・100枚から・FSC認証。エコロジーブランド向けサステナブルパッケージ。 主な用途: ESG、エコ美容、オーガニック、フェアトレード、カフェ、ブティック、アパレル.', description_zh: 'FSC認證環保紙張，可持續發展。適合注重環保的品牌。 適配行業: ESG認證品牌、環保美妝、有機食品、公平貿易、咖啡店、買手店、服裝品牌、禮品店.',
    features: [
      '可選 FSC 認證與再生紙材',
      '大豆油墨與環保手挽方案',
      '適合 ESG 與社企品牌形象',
      '簡潔設計亦具識別度',
      '可搭配燙金低調金屬點綴',
      '活動與門市贈袋常用',
      '印前認證標示位置協助',
    ],
    specs: {
      material: 'FSC 牛皮／再生紙（依供應）；大豆油墨',
      size: '小／中／大袋或客製',
      printMethod: '單色至四色（依設計）',
      finishing: '手挽、可選燙金／覆膜（視材）',
    },
    price_range: 'HK$3-8/個',
    basePrice: 8,
    basePrice_en: 1.84,
    basePrice_ja: 240,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/eco-paper-bags.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-11.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-12.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-13.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-14.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(180×230×80mm)', multiplier: 1 },
        { value: 'medium', label: '中號(250×300×100mm)', multiplier: 1.4 },
        { value: 'large', label: '大號(320×400×120mm)', multiplier: 2 },
      ],
      materials: [
        { value: 'kraft', label: '牛皮紙', surcharge: 0 },
        { value: 'white', label: '白卡紙', surcharge: 50 },
        { value: 'art', label: '銅版紙', surcharge: 30 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 150 },
        { value: 'handle', label: '手挽繩', surcharge: 20 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-paper-bags-eco-paper-bags-zh-hk.webp', en: 'zprintpro-paper-bags-eco-paper-bags-en.webp', ja: 'zprintpro-paper-bags-eco-paper-bags-ja.webp' },
    alt: {
      'zh-hk': '紙袋印刷 / 牛皮紙袋 / 手提紙袋 | 香港環保紙袋印刷 FSC 牛皮／再生紙（依供應） 手挽',
      en: 'Paper Bag Printing & Kraft Bags | Eco Paper Bags | Professional Paper Bags Online',
      ja: '紙袋印刷 / クラフト紙袋 / ショッピング | エコ紙袋 | エコ素材対応・小ロットOK | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PB-005',
    sku_code: 'PB-005',
    slug: 'handle-bags',
    optimizedAt: '2026-07-29',
    optimizationRound: 2,
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '手挽紙袋 | 紙袋 / 牛皮紙袋 / 手提袋', nameEn: 'Handle Bags | Paper Bags & Kraft Bags', nameJa: '手提げ紙袋 | 紙袋 / クラフト紙袋 / ハンドル', title_zh: '手挽紙袋訂製 · 邊度買紙袋 餐飲零售採購首選',
    description: '堅固手挽設計，承重能力強，邊度買紙袋首選：餐廳、咖啡店、烘焙坊、零售店。適合購物中心、超市。紙袋訂製、訂做紙袋、邊度買紙袋 WhatsApp 30 秒報價。適配行業: 餐廳外賣、咖啡店、烘焙坊、零售店、便利店、品牌快閃、展會攤位、活動禮品袋。', descriptionEn: 'Sturdy handle design, strong load-bearing capacity. Perfect for shopping centers, supermarkets., internationally certified quality management system Best for: restaurant takeout, cafes, bakeries, retail stores, convenience stores, pop-up shops, trade show booths, event favor bags.', descriptionJa: '頑丈な持ち手デザイン、強い耐荷重能力。ショッピングセンター、スーパーに最適。 適用業界: レストラン テイクアウト、カフェ、ベーカリー、小売店、コンビニ、ブランド ポップアップ、展示会ブース、イベント ノベルティ バッグ。', description_zh: '堅固手挽設計，承重能力強。適合購物中心、超市。',
    features: [
      '手挽加固，承重更佳',
      '適合量販與雙件服飾購物',
      '可配底卡與側邊結實糊工',
      '棉繩／扁紙挽可選',
      '可與品牌四色＋燙金搭配',
      '印前穿孔位與拉力風險檢查',
      '多店分批配送可諮詢',
    ],
    specs: {
      material: '牛皮／白卡；手挽棉繩或扁紙',
      size: '中／大袋為主；可客製',
      printMethod: '四色印刷為主',
      finishing: '穿孔打釘、底卡加固、可覆膜',
    },
    price_range: 'HK$3-8/個',
    basePrice: 8,
    basePrice_en: 1.84,
    basePrice_ja: 240,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/handle-bags.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-ja-3.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(180×230×80mm)', multiplier: 1 },
        { value: 'medium', label: '中號(250×300×100mm)', multiplier: 1.4 },
        { value: 'large', label: '大號(320×400×120mm)', multiplier: 2 },
      ],
      materials: [
        { value: 'kraft', label: '牛皮紙', surcharge: 0 },
        { value: 'white', label: '白卡紙', surcharge: 50 },
        { value: 'art', label: '銅版紙', surcharge: 30 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 150 },
        { value: 'handle', label: '手挽繩', surcharge: 20 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-paper-bags-handle-bags-zh-hk.webp', en: 'zprintpro-paper-bags-handle-bags-en.webp', ja: 'zprintpro-paper-bags-handle-bags-ja.webp' },
    alt: {
      'zh-hk': '紙袋印刷 / 牛皮紙袋 / 手提紙袋 | 香港手挽紙袋印刷 牛皮／白卡 穿孔打釘',
      en: 'Paper Bag Printing & Kraft Bags | Handle Bags | Professional Paper Bags Online',
      ja: '紙袋印刷 / クラフト紙袋 / ショッピング | 手提げ紙袋 | エコ素材対応・小ロットOK | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PB-007',
    sku_code: 'PB-007',
    slug: 'large-bags',
    optimizedAt: '2026-08-03',
    optimizationRound: 1,
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '大號紙袋 | 紙袋 / 牛皮紙袋 / 手提袋', nameEn: 'Large Bags | Paper Bags & Kraft Bags', nameJa: '大判紙袋 | 紙袋 / クラフト紙袋 / ハンドル', title_zh: '大號紙袋',
    description: '加大尺寸，適合服裝、鞋類等大件商品。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'Large size, perfect for clothing, shoes and other large items., internationally certified quality management system Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '大きなサイズ、衣類、靴などの大物に最適。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '加大尺寸，適合服裝、鞋類等大件商品。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動',
    features: [
      '【320×120×380mm】加大尺寸，適合外套、鞋盒、大型禮品',
      '【加固車縫】底部貼底工藝，承重達 8–10 公斤',
      '【白卡／牛皮／特種紙】250g–300g，觸感與強度兼具',
      '【四色柯式】色彩飽和，Pantone 對色誤差 ≤2',
      '【四種手挽】棉繩／紙繩／緞帶／仿皮繩，可對色',
      '【燙金擊凸】LOGO 金／銀箔或立體擊凸，品牌質感提升',
      '【免費打樣】結構設計與承重測試，確認後量產',
    ],
    specs: {
      material: '250g 白卡紙／300g 牛皮紙／280g 特種紋理紙',
      size: '展開約 320×120×380mm（可客製）',
      printMethod: '四色柯式印刷',
      finishing: '燙金／燙銀、擊凸、手挽繩、底部加固',
    },
    price_range: 'HK$6-15/個',
    basePrice: 15,
    basePrice_en: 3.45,
    basePrice_ja: 450,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/large-bags.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-4.webp',
    ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-paper-bags-large-bags-zh-hk.webp', en: 'zprintpro-paper-bags-large-bags-en.webp', ja: 'zprintpro-paper-bags-large-bags-ja.webp' },
    alt: {
      'zh-hk': '紙袋印刷 / 牛皮紙袋 / 手提紙袋 | 香港大號紙袋印刷 250g 白卡紙／300g 牛皮紙／28 燙金／燙銀',
      en: 'Paper Bag Printing & Kraft Bags | Large Bags | Professional Paper Bags Online',
      ja: '紙袋印刷 / クラフト紙袋 / ショッピング | 大判紙袋 | エコ素材対応・小ロットOK | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 傳單印刷 (7 SKU) — 保留即日傳單印刷作为SEO流量入口
  {
    id: 'FL-001',
    sku_code: 'FL-001',
    slug: 'a4-flyers',
    optimizedAt: '2026-08-05',
    optimizationRound: 2,
    category: 'flyers',
    category_slug: 'flyers',
    name: 'A4傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'A4 Flyers | A4/A5 Flyers & Leaflets', nameJa: 'A4チラシ | A4/A5 チラシ・フライヤー', title_zh: 'A4傳單印刷 10 張起印 HK$0.3/張 雙面彩印 | 智印港',
    description: 'A4傳單印刷訂製，10 張起印，HK$0.3起/張。157g銅版紙雙面四色印刷，免費設計打樣。適合餐廳地產活動宣傳，48小時交貨，全港速遞免費。 适配行业: 餐飲外賣、房地產、零售精品、教育培訓、活動展會、美容美髮、社區中心. 適配行業：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。', descriptionEn: 'Standard A4 size, most common flyer format. 157g glossy paper, 4-color printing, vibrant colors., internationally certified quality management system 适配行业: Food delivery, Real estate, Retail, Education, Events, Beauty, Community. Best for: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.', descriptionJa: '標準A4サイズ、最も一般的なチラシ形式。157gコート紙、4色印刷、鮮やかな色彩。 适配行业: 飲食デリバリー、不動産、小売、教育、イベント、美容、コミュニティ. 適用業界：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。', description_zh: '標準A4尺寸，最常用的傳單印刷規格。157g銅版紙，四色印刷，色彩鮮豔。適合產品推廣、活動宣傳。 适配行业: 餐飲外賣、房地產、零售精品、教育培訓、活動展會、美容美髮、社區中心.',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【210×297mm】香港最通用規格，派發效果佳',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g銅版紙或128g啞粉紙',
      size: 'A4（210×297mm）',
      printMethod: '四色柯式或數碼印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.35-0.95/張',
    basePrice: 0.35,
    basePrice_en: 0.55,
    basePrice_ja: 70,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-zh-hk-hero.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-zh-hk-detail.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-zh-hk-variety.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-en-hero.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-en-detail.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-en-variety.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-ja-hero.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-ja-detail.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-ja-variety.webp', '/images/products/v28_5/a4-flyers/zprintpro-flyers-a4-flyers-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-a4-flyers-zh-hk.webp', en: 'zprintpro-flyers-a4-flyers-en.webp', ja: 'zprintpro-flyers-a4-flyers-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港A4傳單印刷印刷 157g銅版紙 覆膜（啞膜／光膜可選）',
      en: 'Flyer Printing & Leaflet Design | A4 Flyers | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | A4チラシ | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺頁', surcharge: 35 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'FL-002',
    sku_code: 'FL-002',
    slug: 'a5-flyers',
    optimizedAt: '2026-08-03',
    optimizationRound: 2,
    category: 'flyers',
    category_slug: 'flyers',
    name: 'A5傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'A5 Flyers | A4/A5 Flyers & Leaflets', nameJa: 'A5チラシ | A4/A5 チラシ・フライヤー', title_zh: 'A5傳單印刷 10 張起印 雙面四色 免費設計 | 智印港',
    description: 'A5傳單印刷訂製，10 張起印，HK$0.18起/張。157g銅版紙雙面四色，免費設計排版。適合餐廳地產活動宣傳，48小時交貨，全港速遞免費。 适配行业: 餐飲外賣、房地產、零售精品、教育培訓、活動展會、美容美髮、社區中心. 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'A5 size, economical, perfect for mass distribution. First choice for food delivery, flash events. 适配行业: Food delivery, Real estate, Retail, Education, Events, Beauty, Community. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: 'A5サイズ、経済的、大量配布に最適。フードデリバリー、フラッシュイベントの第一選択。 适配行业: 飲食デリバリー、不動産、小売、教育、イベント、美容、コミュニティ. 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: 'A5尺寸，經濟實惠，適合大量派發。餐飲外賣、快閃活動首選。 适配行业: 餐飲外賣、房地產、零售精品、教育培訓、活動展會、美容美髮、社區中心. 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【148×210mm】大量派發成本低40%',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '128g銅版紙或100g書紙',
      size: 'A5（148×210mm）',
      printMethod: '四色數碼印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.25-0.65/張',
    basePrice: 0.25,
    basePrice_en: 0.4,
    basePrice_ja: 50,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-zh-hk-hero.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-zh-hk-detail.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-zh-hk-variety.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-en-hero.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-en-detail.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-en-variety.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-ja-hero.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-ja-detail.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-ja-variety.webp', '/images/products/v28_5/a5-flyers/zprintpro-flyers-a5-flyers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺疊', surcharge: 35 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-a5-flyers-zh-hk.webp', en: 'zprintpro-flyers-a5-flyers-en.webp', ja: 'zprintpro-flyers-a5-flyers-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港A5傳單印刷印刷 128g銅版紙 覆膜（啞膜／光膜可選）',
      en: 'Flyer Printing & Leaflet Design | A5 Flyers | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | A5チラシ | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'FL-003',
    sku_code: 'FL-003',
    slug: 'double-sided-flyers',

        optimizedAt: '2026-07-29',
        optimizationRound: 1,
    category: 'flyers',
    category_slug: 'flyers',
    name: '雙面傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'Double-sided Flyers | A4/A5 Flyers & Leaflets', nameJa: '両面チラシ | A4/A5 チラシ・フライヤー', title_zh: '雙面傳單印刷',
    description: '雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細介紹。 適配行業: 餐飲外賣、房地產、教育培訓、活動展會、美容美髮、社區中心、零售品牌.', descriptionEn: 'Double-sided full color printing, doubled information capacity. 适配行业: Food delivery, Real estate, Education & Training, Events & Exhibitions, Beauty salons, Community centers, Retail brands.', descriptionJa: '両面フルカラー印刷、情報容量が2倍。 适配行业: 飲食デリバリー、不動産、教育・研修、イベント・展示会、美容室、コミュニティセンター、小売ブランド。', description_zh: '雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細介紹。 適配行業: 餐飲外賣、房地產、教育培訓、活動展會、美容美髮、社區中心、零售品牌.',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【雙面對位±0.5mm】正反圖文精準套印',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g銅版紙或128g啞粉紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色雙面柯式印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.40-0.95/張',
    basePrice: 0.40,
    basePrice_en: 0.65,
    basePrice_ja: 85,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-zh-hk-hero.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-zh-hk-detail.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-zh-hk-variety.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-en-hero.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-en-detail.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-en-variety.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-ja-hero.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-ja-detail.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-ja-variety.webp', '/images/products/v28_5/double-sided-flyers/zprintpro-flyers-double-sided-flyers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺疊', surcharge: 35 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-double-sided-flyers-zh-hk.webp', en: 'zprintpro-flyers-double-sided-flyers-en.webp', ja: 'zprintpro-flyers-double-sided-flyers-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港雙面傳單印刷印刷 157g銅版紙 覆膜（啞膜／光膜可選）',
      en: 'Flyer Printing & Leaflet Design | Double-sided Flyers | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | 両面チラシ | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'FL-004',
    sku_code: 'FL-004',
    slug: 'folded-leaflets',
    optimizedAt: '2026-08-05',
    optimizationRound: 1,
    category: 'flyers',
    category_slug: 'flyers',
    name: '摺疊傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'Folded Leaflets | A4/A5 Flyers & Leaflets', nameJa: '折りたたみパンフレット | A4/A5 チラシ・フライヤー', title_zh: '折疊傳單印刷 A4 雙面 對摺三摺 · 餐廳菜單地產樓書活動宣傳適配 | 智印港',
    description: '三摺雙摺宣傳單印刷訂製，10 張起印，HK$0.45起/張。157g-250g銅版紙，免費摺頁設計排版。適合企業簡介產品目錄活動宣傳，3-5天交貨，全港送貨。 适配行业:餐廳菜單地產樓書、活動傳單印刷、學校院院校刊、培訓機構課程表、旅遊景點導覽、零售品牌推廣 適配行業：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。', descriptionEn: 'Bi-fold or tri-fold design, can display more information. Best for:restaurant menus, real estate brochures, event flyers, school & college publications, training course catalogues, tourism guidebooks, retail brand promotions Best for: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.', descriptionJa: '二つ折りまたは三つ折りデザイン、より多くの情報を表示可能。 適用業界:レストランメニュー、不動産パンフレット、イベントチラシ、学校・大学・機関紙、研修コースカタログ、観光ガイド、小売ブランド 適用業界：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。', description_zh: '對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【對摺／三摺】壓線處理，摺疊平整不反彈',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g或200g銅版紙',
      size: 'A4展開（210×297mm）或DL（99×210mm）',
      printMethod: '四色柯式或數碼印刷',
      finishing: '壓線、覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.70-1.95/張',
    basePrice: 0.70,
    basePrice_en: 0.8,
    basePrice_ja: 110,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-zh-hk-hero.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-zh-hk-detail.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-zh-hk-variety.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-en-hero.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-en-detail.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-en-variety.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-ja-hero.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-ja-detail.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-ja-variety.webp', '/images/products/v28_5/folded-leaflets/zprintpro-flyers-folded-leaflets-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺疊', surcharge: 35 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-folded-leaflets-zh-hk.webp', en: 'zprintpro-flyers-folded-leaflets-en.webp', ja: 'zprintpro-flyers-folded-leaflets-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港摺疊傳單印刷印刷 157g 壓線',
      en: 'Flyer Printing & Leaflet Design | Folded Leaflets | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | 折りたたみパンフレット | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'FL-005',
    sku_code: 'FL-005',
    slug: 'thick-paper-flyers',
    optimizedAt: '2026-08-01',
    optimizationRound: 1,
    category: 'flyers',
    category_slug: 'flyers',
    name: '厚紙傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'Thick Paper Flyers | A4/A5 Flyers & Leaflets', nameJa: '厚紙チラシ | A4/A5 チラシ・フライヤー', title_zh: '厚紙傳單印刷',
    description: '200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: '200g+ thick paper, better texture, not easily damaged. From 10 pieces · Free shipping over $99 USA · 24h rush available. Ideal for restaurant opening, retail promo, event marketing. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '200g以上の厚紙、質感が良く折れにくい。。10枚から対応・全国送料込み・翌日特急対応。飲食店開業・小売プロモーション・イベント营销に最適。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【200g–250g厚紙】挺度高，質感厚實不捲曲',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '200g或250g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.45-1.20/張',
    basePrice: 0.45,
    basePrice_en: 0.7,
    basePrice_ja: 95,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-zh-hk-hero.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-zh-hk-detail.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-zh-hk-variety.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-en-hero.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-en-detail.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-en-variety.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-ja-hero.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-ja-detail.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-ja-variety.webp', '/images/products/v28_5/thick-paper-flyers/zprintpro-flyers-thick-paper-flyers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺疊', surcharge: 35 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-thick-paper-flyers-zh-hk.webp', en: 'zprintpro-flyers-thick-paper-flyers-en.webp', ja: 'zprintpro-flyers-thick-paper-flyers-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港厚紙傳單印刷印刷 200g 覆膜（啞膜／光膜可選）',
      en: 'Flyer Printing & Leaflet Design | Thick Paper Flyers | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | 厚紙チラシ | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'FL-007',
    sku_code: 'FL-007',
    slug: 'eco-flyers',
    optimizedAt: '2026-07-30',
    optimizationRound: 1,
    category: 'flyers',
    category_slug: 'flyers',
    name: '環保傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'Eco Flyers | A4/A5 Flyers & Leaflets', nameJa: 'エコチラシ | A4/A5 チラシ・フライヤー', title_zh: '環保傳單印刷',
    description: '環保紙張印刷，展現企業責任。適合環保主題活動。 適配行業: 環保主題活動/ESG 報告/社會企業/有機品牌/校園推廣/餐廳菜單/咖啡烘焙.', descriptionEn: 'Eco-friendly paper printing, showing corporate responsibility. 100% recycled paper · 10 MOQ · Free shipping over $99 USA. Eco-friendly marketing for sustainable brands. Best for: eco campaigns / ESG reports / social enterprises / organic brands / school promotion / restaurant menus / coffee roasters.', descriptionJa: '環境に優しい紙の印刷、企業の責任を示す。。再生紙100%・10枚から・全国送料込み。サステナブルブランド向けエコマーケティング。 適合業種: エコキャンペーン / ESGレポート / 社会企業 / オーガニックブランド / 学校推广 / レストランメニュー / コーヒー焙煎.', description_zh: '環保紙張印刷，展現企業責任。適合環保主題活動。 適配行業: 環保主題活動/ESG 報告/社會企業/有機品牌/校園推廣/餐廳菜單/咖啡烘焙.',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【FSC認證再生紙】100%再生纖維，環保形象加分',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【環保工藝】無覆膜（環保）或水性光油'
    ],
    specs: {
      material: 'FSC認證再生紙；大豆油墨',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '無覆膜（環保）或水性光油',
    },
    price_range: 'HK$0.38-0.95/張',
    basePrice: 0.38,
    basePrice_en: 0.6,
    basePrice_ja: 75,
    weight_score: 80,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-zh-hk-hero.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-zh-hk-detail.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-zh-hk-variety.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-en-hero.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-en-detail.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-en-variety.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-ja-hero.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-ja-detail.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-ja-variety.webp', '/images/products/v28_5/eco-flyers/zprintpro-flyers-eco-flyers-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.65 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g銅版紙', surcharge: 0 },
        { value: '157g', label: '157g銅版紙', surcharge: 15 },
        { value: '200g', label: '200g厚紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'single', label: '單面印刷', surcharge: 0 },
        { value: 'double', label: '雙面印刷', surcharge: 20 },
        { value: 'fold', label: '摺疊', surcharge: 35 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.8 },
        { value: 1000, label: '1000張', discount: 0.65 },
        { value: 5000, label: '5000張', discount: 0.5 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-eco-flyers-zh-hk.webp', en: 'zprintpro-flyers-eco-flyers-en.webp', ja: 'zprintpro-flyers-eco-flyers-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港環保傳單印刷印刷 FSC認證再生紙 無覆膜（環保）或水性光油',
      en: 'Flyer Printing & Leaflet Design | Eco Flyers | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | エコチラシ | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'FL-008',
    sku_code: 'FL-008',
    slug: 'same-day-flyers',
    optimizedAt: '2026-08-05',
    optimizationRound: 1,
    category: 'flyers',
    category_slug: 'flyers',
    name: '即日傳單印刷 | 傳單印刷 / 折頁 / A4/A5', nameEn: 'Same-day Flyers | A4/A5 Flyers & Leaflets', nameJa: '即日チラシ | A4/A5 チラシ・フライヤー', title_zh: '即日傳單印刷',
    description: '緊急活動首選，最快當天交貨。即日印刷、即日快遞出貨，急件不擔心。 適配行業：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。', descriptionEn: 'First choice for emergency events, same-day printing and courier delivery available. Best for: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.', descriptionJa: '緊急イベントの第一選択、最短当日印刷・宅配便発送。 適用業界：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。', description_zh: '緊急活動首選，最快當天交貨。即日印刷、即日快遞出貨，急件不擔心。',
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【4小時出貨】從接稿到出貨，急單品質不打折',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】標準尺寸刀模模板',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色高速數碼印刷',
      finishing: '無覆膜或啞膜（加時）',
    },
    price_range: 'HK$0.55-1.50/張',
    basePrice: 0.55,
    basePrice_en: 0.95,
    basePrice_ja: 125,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-zh-hk-hero.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-zh-hk-detail.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-zh-hk-variety.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-en-hero.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-en-detail.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-en-variety.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-ja-hero.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-ja-detail.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-ja-variety.webp', '/images/products/v28_5/same-day-flyers/zprintpro-flyers-same-day-flyers-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-same-day-flyers-zh-hk.webp', en: 'zprintpro-flyers-same-day-flyers-en.webp', ja: 'zprintpro-flyers-same-day-flyers-ja.webp' },
    alt: {
      'zh-hk': '傳單印刷 / 折頁 / 彩頁 | 香港即日傳單印刷印刷 157g銅版紙 無覆膜或啞膜（加時）',
      en: 'Flyer Printing & Leaflet Design | Same-day Flyers | Professional Flyers Online',
      ja: 'チラシ印刷 / 折込フライヤー | 即日チラシ | 高画質オフセット・短納期対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 海報定製 (6 SKU)
  {
    id: 'PO-001',
    sku_code: 'PO-001',
    slug: 'a2-posters',
    category: 'posters',
    category_slug: 'posters',
    name: 'A2海報印刷 / a2 poster printing | A1/A2 海報 / 展覽海報', nameEn: 'A2 Poster Printing / a2 poster size | A1/A2 Posters & Exhibition', nameJa: 'A2ポスター | A1/A2 ポスター / 展示会', title_zh: 'A2海報印刷 a2 poster printing 10張起印 HK$12.9/張 | 智印港',
    description: 'A2海報印刷訂製，10張起印，HK$12.9起/張。200g銅版紙/PP合成紙，雙面四色印刷，防水防曬耐用。適合地產活動展覽店舖推廣，1-2天交貨，全港送貨。適配行業:零售精品店、品牌 pop-up、商場快閃、餐廳菜單推廣、咖啡店、教育培訓機構、藝廊展覽、婚慶活動。', descriptionEn: 'Standard A2 size, first choice for event promotion. 157g glossy paper, vibrant colors, 10-sheet minimum, 1-2 day turnaround. Best for: retail boutique, brand pop-up, mall flash store, restaurant menu promo, cafe, education training, gallery exhibition, wedding events.', descriptionJa: '標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、10枚から、1-2日納期。適用業界:小売セレクト、ブランド pop-up、ショッピングモール フラッシュ、レストランメニュー、カフェ、教育研修、ギャラリー展示、ブライダルイベント。', description_zh: '標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，10張起訂。',
    optimizedAt: '2026-07-08',
    optimizationRound: 1,
    features: [
      '標準 A2，陳列與手持皆宜',
      '157g 銅版紙色彩飽和',
      '可升級厚紙或相紙',
      'PP 護膜、裱板後工可選',
      '適合活動宣傳與店內 POP',
      '印前出血與色域提醒',
      '支援批量階梯價',
    ],
    specs: {
      material: '157g 銅版紙（可升 200g／相紙）',
      size: 'A2 420×594mm（可改比例）',
      printMethod: '柯式或高品數碼',
      finishing: 'PP 裱貼、泡沫板裱貼（可選）',
    },
    price_range: 'HK$95-1,017',
    basePrice: 16,
    basePrice_en: 2.3,
    basePrice_ja: 300,
    weight_score: 95,
    isHot: true,
    isNew: false,
    // K3 2026-09-19 裁決: A2 銅版紙海報屬標準數碼印刷, 10 張起技術可行;
    // 原值 100 與 price-tables 價階（由 10 起）及全站文案「10張起印」矛盾 → 對齊為 10。
    minQuantity: 10,
    images: ['/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-zh-hk-hero.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-zh-hk-detail.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-zh-hk-variety.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-en-hero.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-en-detail.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-en-variety.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-ja-hero.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-ja-detail.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-ja-variety.webp', '/images/products/v28_5/a2-posters/zprintpro-posters-a2-posters-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-a2-posters-zh-hk.webp', en: 'zprintpro-posters-a2-posters-en.webp', ja: 'zprintpro-posters-a2-posters-ja.webp' },
    alt: {
      'zh-hk': '海報印刷 / A1/A2 / 防水海報 | 香港A2海報印刷印刷 157g 銅版紙（可升 200g／相紙） PP 裱貼',
      en: 'Poster Printing A1/A2 / Waterproof | A2 Posters | Professional Posters Online',
      ja: 'ポスター印刷 / A1/A2 / 防水 | A2ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'a2', label: 'A2 (420×594mm)', multiplier: 1 },
        { value: 'a1', label: 'A1 (594×841mm)', multiplier: 1.8 },
        { value: 'a0', label: 'A0 (841×1189mm)', multiplier: 3.2 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 50 },
        { value: 'photo', label: '相紙', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'pp', label: 'PP裱貼', surcharge: 30 },
        { value: 'foam', label: '泡沫板裱貼', surcharge: 60 },
      ],
      quantities: [
        { value: 10, label: '10張', discount: 1 },
        { value: 20, label: '20張', discount: 0.72 },
        { value: 50, label: '50張', discount: 0.56 },
        { value: 100, label: '100張', discount: 0.35 },
        { value: 200, label: '200張', discount: 0.19 },
        { value: 300, label: '300張', discount: 0.14 },
      ],
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PO-002',
    sku_code: 'PO-002',
    slug: 'a1-posters',
    optimizedAt: '2026-07-27',
    optimizationRound: 1,
    category: 'posters',
    category_slug: 'posters',
    name: 'A1大幅海報 | A1/A2 海報 / 展覽海報', nameEn: 'A1 Large Posters | A1/A2 Posters & Exhibition', nameJa: 'A1大型ポスター | A1/A2 ポスター / 展示会', title_zh: 'A1大幅海報',
    description: 'A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。 适配行业: 展覽會場、零售品牌、演唱會活動、學院招生、房地產、文創海報.', descriptionEn: 'A1 large size, strong visual impact. Perfect for exhibitions, venue decoration., internationally certified quality management system 适配行业: Exhibitions, Retail brands, Concerts, School admissions, Real estate, Art posters.', descriptionJa: 'A1大きなサイズ、強い視覚的インパクト。展示会、会場裝飾に最適。 适配行业: 展示会、小売ブランド、コンサート、學校招生、不動産、美術ポスター.', description_zh: 'A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。 适配行业: 展覽會場、零售品牌、演唱會活動、學院招生、房地產、文創海報.',
    features: [
      'A1 遠距離主視覺衝擊',
      '可單幅或拼貼背板',
      '厚紙／相紙＋護膜更耐運',
      '適合展覽、會場、發佈會',
      '中縫對位與出血標示協助',
      '可配穿繩或裱板',
      '大批量柯式經濟',
    ],
    specs: {
      material: '157–200g 銅版或相紙',
      size: 'A1 594×841mm',
      printMethod: '柯式為主；急件數碼',
      finishing: 'PP 護膜、泡沫板裱貼（可選）',
    },
    price_range: 'HK$290-7,200 · 噴繪成品 · 不含安裝裱貼',
    basePrice: 20,
    basePrice_en: 4.6,
    basePrice_ja: 600,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-zh-hk-hero.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-zh-hk-detail.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-zh-hk-variety.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-en-hero.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-en-detail.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-en-variety.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-ja-hero.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-ja-detail.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-ja-variety.webp', '/images/products/v28_5/a1-posters/zprintpro-posters-a1-posters-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a2', label: 'A2 (420×594mm)', multiplier: 1 },
        { value: 'a1', label: 'A1 (594×841mm)', multiplier: 1.8 },
        { value: 'a0', label: 'A0 (841×1189mm)', multiplier: 3.2 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 50 },
        { value: 'photo', label: '相紙', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'pp', label: 'PP護膜', surcharge: 30 },
        { value: 'foam', label: '泡沫板裱貼', surcharge: 60 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 3, label: '3張', discount: 0.86 },
        { value: 5, label: '5張', discount: 0.77 },
        { value: 10, label: '10張', discount: 0.64 },
        { value: 20, label: '20張', discount: 0.55 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-a1-posters-zh-hk.webp', en: 'zprintpro-posters-a1-posters-en.webp', ja: 'zprintpro-posters-a1-posters-ja.webp' },
    alt: {
      'zh-hk': '海報印刷 / A1/A2 / 防水海報 | 香港A1大幅海報印刷 157–200g 銅版 PP 護膜',
      en: 'Poster Printing A1/A2 / Waterproof | A1 Large Posters | Professional Posters Online',
      ja: 'ポスター印刷 / A1/A2 / 防水 | A1大型ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PO-003',
    sku_code: 'PO-003',
    slug: 'outdoor-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '戶外海報 | A1/A2 海報 / 展覽海報', nameEn: 'Outdoor Posters | A1/A2 Posters & Exhibition', nameJa: '屋外ポスター | A1/A2 ポスター / 展示会', title_zh: '戶外海報',
    description: '防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。', descriptionEn: 'Waterproof and UV-resistant material, no fading for outdoor use.', descriptionJa: '防水・UV耐性素材、屋外使用でも色褪せません。', description_zh: '防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。',
    features: [
      '耐候材＋戶外墨水方案',
      '防水防曬，短中期戶外可用',
      '霧面降低強光反光',
      '適合告示欄、圍板、指示牌',
      '可覆膜或封邊加強壽命',
      '膠系與底材相容諮詢',
      '多尺寸可拚接',
    ],
    specs: {
      material: '戶外 PVC／PET／合成紙',
      size: '依稿面；可對標 A 系列或全幅',
      printMethod: '戶外噴繪或 UV',
      finishing: '霧面護膜、打扣（可選）',
    },
    price_range: 'HK$16-55/張',
    basePrice: 16,
    basePrice_en: 3.68,
    basePrice_ja: 480,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/outdoor-posters.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-en-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-en-3.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'a2', label: 'A2 (420×594mm)', multiplier: 1 },
        { value: 'a1', label: 'A1 (594×841mm)', multiplier: 1.8 },
        { value: 'a0', label: 'A0 (841×1189mm)', multiplier: 3.2 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 50 },
        { value: 'photo', label: '相紙', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'pp', label: 'PP護膜', surcharge: 30 },
        { value: 'foam', label: '泡沫板裱貼', surcharge: 60 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 3, label: '3張', discount: 0.86 },
        { value: 5, label: '5張', discount: 0.77 },
        { value: 10, label: '10張', discount: 0.64 },
        { value: 20, label: '20張', discount: 0.55 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-outdoor-posters-zh-hk.webp', en: 'zprintpro-posters-outdoor-posters-en.webp', ja: 'zprintpro-posters-outdoor-posters-ja.webp' },
    alt: {
      'zh-hk': '海報印刷 / A1/A2 / 防水海報 | 香港戶外海報印刷 戶外 PVC／PET／合成紙 霧面護膜',
      en: 'Poster Printing A1/A2 / Waterproof | Outdoor Posters | Professional Posters Online',
      ja: 'ポスター印刷 / A1/A2 / 防水 | 屋外ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PO-004',
    sku_code: 'PO-004',
    slug: 'display-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '展架海報 | A1/A2 海報 / 展覽海報', nameEn: 'Display Posters | A1/A2 Posters & Exhibition', nameJa: '展示用ポスター | A1/A2 ポスター / 展示会', title_zh: '展架海報',
    description: '配合X展架或易拉寶使用，便攜易裝。展會、路演必備。', descriptionEn: 'Compatible with X-stands or roll-up banners, portable and easy to install.', descriptionJa: 'Xスタンドまたはロールアップバナーと互換、持ち運び可能で設置簡単。', description_zh: '配合X展架或易拉寶使用，便攜易裝。展會、路演必備。',
    features: [
      '【PP／PVC 面材】180g–200g，防水防曬不捲邊',
      '【X 展架／易拉寶兼容】標準 60×160cm 與 80×180cm 規格',
      '【解析度優化】60×160cm 用 150dpi，80×180cm 用 100dpi',
      '【展架出租】框架租賃＋畫面更換，一次性活動省成本',
      '【UV 固化油墨】戶外耐候 1–2 年，色彩不褪色',
      '【雙面輸出】可選雙面印刷，通道懸掛最大化曝光',
      '【免費印前檢查】解析度、出血、安全距離全面確認',
    ],
    specs: {
      material: '180g–200g PP 合成紙／背膠 PVC；UV 固化油墨',
      size: 'X 展架 60×160cm／80×180cm；易拉寶 85×200cm（可客製）',
      printMethod: '環保溶劑或 UV 大判噴繪',
      finishing: '覆膜（啞膜／光膜）、穿繩孔、雙面輸出',
    },
    price_range: 'HK$32-100/套',
    basePrice: 32,
    basePrice_en: 7.36,
    basePrice_ja: 960,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/display-posters.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-posters-display-posters-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-posters-display-posters-en.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-en-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-posters-display-posters-ja.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-display-posters-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'a2', label: 'A2 (420×594mm)', multiplier: 1 },
        { value: 'a1', label: 'A1 (594×841mm)', multiplier: 1.8 },
        { value: 'a0', label: 'A0 (841×1189mm)', multiplier: 3.2 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 50 },
        { value: 'photo', label: '相紙', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'pp', label: 'PP護膜', surcharge: 30 },
        { value: 'foam', label: '泡沫板裱貼', surcharge: 60 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 3, label: '3張', discount: 0.86 },
        { value: 5, label: '5張', discount: 0.77 },
        { value: 10, label: '10張', discount: 0.64 },
        { value: 20, label: '20張', discount: 0.55 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-display-posters-zh-hk.webp', en: 'zprintpro-posters-display-posters-en.webp', ja: 'zprintpro-posters-display-posters-ja.webp' },
    alt: {
      'zh-hk': '海報印刷 / A1/A2 / 防水海報 | 香港展架海報印刷 180g–200g PP 合成紙／背膠  覆膜（啞膜／光膜）',
      en: 'Poster Printing A1/A2 / Waterproof | Display Posters | Professional Posters Online',
      ja: 'ポスター印刷 / A1/A2 / 防水 | 展示用ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PO-005',
    sku_code: 'PO-005',
    slug: 'art-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '藝術海報 | A1/A2 海報 / 展覽海報', nameEn: 'Art Posters | A1/A2 Posters & Exhibition', nameJa: 'アートポスター | A1/A2 ポスター / 展示会', title_zh: '藝術海報印刷 1張起印 美術紙/相紙 高端畫冊 | 智印港',
    description: '藝術海報印刷訂製，1張起印，HK$15起/張。200g美術紙/啞粉紙/RC相紙，Giclée級色彩管理。適合攝影師藝術家畫廊展覽，3-5天交貨，全球配送。', descriptionEn: 'Premium art paper, high color accuracy. Perfect for art exhibitions, photography works.', descriptionJa: '高級アート紙、高い色再現性。美術展、寫真作品に最適。', description_zh: '高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。',
    features: [
      '【200g–250g 藝術紙】高級啞粉或 260g 純棉無酸紙',
      '【12 色顏料墨水】色域 98% Adobe RGB，Delta E ≤2',
      '【博物館級標準】無酸紙可保存 100 年以上不褪色',
      '【三種表面】啞面／絲絨面／半光面，適配不同展示風格',
      '【無框畫裝裱】提供懸掛系統，即掛即展',
      '【免費色彩校樣】ICC Profile 匹配，所見即所得',
      '【300dpi 建議】TIFF／PNG 格式，確保細節清晰',
    ],
    specs: {
      material: '200g–250g 啞粉藝術紙／260g 純棉無酸紙；12 色顏料墨水',
      size: 'A4 至 A0（59.4×84.1cm），更大尺寸可拼接',
      printMethod: '12 色藝術微噴（Giclée）',
      finishing: '啞面／絲絨面／半光面、無框畫裝裱',
    },
    price_range: 'HK$26-85/張',
    basePrice: 26,
    basePrice_en: 5.98,
    basePrice_ja: 780,
    weight_score: 85,
    isHot: false,
    isNew: false,
    // K3 2026-09-19 裁決: 依印刷方式判定 —— 本品為「12 色藝術微噴（Giclée）」+ 200g 美術紙/RC 相紙,
    // 屬噴繪/寫真類（同 a1-posters 的 1 張起印線）, 非柯式銅版紙海報。
    // 故真值改 1（與全站文案「1張起印」一致）; 原值 100 屬誤植。
    minQuantity: 1,
    images: ['/images/products/art-posters.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-posters-art-posters-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-posters-art-posters-en.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-en-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-posters-art-posters-ja.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-art-posters-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'a2', label: 'A2 (420×594mm)', multiplier: 1 },
        { value: 'a1', label: 'A1 (594×841mm)', multiplier: 1.8 },
        { value: 'a0', label: 'A0 (841×1189mm)', multiplier: 3.2 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 50 },
        { value: 'photo', label: '相紙', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'pp', label: 'PP護膜', surcharge: 30 },
        { value: 'foam', label: '泡沫板裱貼', surcharge: 60 },
      ],
      quantities: [
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-art-posters-zh-hk.webp', en: 'zprintpro-posters-art-posters-en.webp', ja: 'zprintpro-posters-art-posters-ja.webp' },
    alt: {
      'zh-hk': '海報印刷 / A1/A2 / 防水海報 | 香港藝術海報印刷 200g–250g 啞粉藝術紙／260g 啞面／絲絨面／半光面',
      en: 'Poster Printing A1/A2 / Waterproof | Art Posters | Professional Posters Online',
      ja: 'ポスター印刷 / A1/A2 / 防水 | アートポスター | 屋内屋外対応・大判印刷 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PO-006',
    sku_code: 'PO-006',
    slug: 'adhesive-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '背膠海報 | A1/A2 海報 / 展覽海報', nameEn: 'Adhesive Posters | A1/A2 Posters & Exhibition', nameJa: '粘着ポスター | A1/A2 ポスター / 展示会', title_zh: '背膠海報',
    description: '自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。', descriptionEn: 'Self-adhesive, can be directly applied. Perfect for shop windows, wall decoration.', descriptionJa: '自己粘着、直接貼付可能。店舗の窓、壁の裝飾に最適。', description_zh: '自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。',
    features: [
      '【導氣槽底紙】貼附時輕鬆排氣泡，移除不殘膠',
      '【PP／PVC 面材】150g–180g，可選室內或戶外耐候型',
      '【6–12 個月戶外耐候】UV 固化油墨，陽光下不褪色',
      '【異形模切】任意形狀裁切，配合櫥窗鏤空設計',
      '【玻璃透光】透明或鏤空區域可配合背光效果',
      '【當日可取】數碼輸出，1 張起印，急單無憂',
      '【3mm 出血建議】印前免費檢查，避免文字貼邊',
    ],
    specs: {
      material: '150g–180g 背膠 PP／鑄造級 PVC；導氣槽底紙',
      size: 'A4 至 A0，異形模切依稿件而定',
      printMethod: '環保溶劑或 UV 大判噴繪',
      finishing: '模切、鏤空、光膜／啞膜覆合',
    },
    price_range: 'HK$13-42/張',
    basePrice: 13,
    basePrice_en: 2.99,
    basePrice_ja: 390,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/adhesive-posters.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-en.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-en-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-ja.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-adhesive-posters-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-adhesive-posters-zh-hk.webp', en: 'zprintpro-posters-adhesive-posters-en.webp', ja: 'zprintpro-posters-adhesive-posters-ja.webp' },
    alt: {
      'zh-hk': '海報印刷 / A1/A2 / 防水海報 | 香港背膠海報印刷 150g–180g 背膠 PP／鑄造級  模切',
      en: 'Poster Printing A1/A2 / Waterproof | Adhesive Posters | Professional Posters Online',
      ja: 'ポスター印刷 / A1/A2 / 防水 | 粘着ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 包裝盒定製 (5 SKU)
  {
    id: 'PK-003',
    sku_code: 'PK-003',
    slug: 'food-boxes',
    optimizedAt: '2026-07-21',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '食品包裝訂製 / 食品包裝盒 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Food Packaging / Food Boxes | Custom Packaging & Gift Boxes', nameJa: '食品パッケージ / 食品包装箱 | パッケージボックス・化粧箱', title_zh: '食品包裝盒印刷 訂製 100個起 HK$2.5 防油紙卡 | 智印港',
    description: '食品包裝盒印刷訂製，100個起印，HK$2.5起/個。食品級紙材（以訂單確認），牛皮紙白卡紙可選，支援燙金UV印刷。適合糕點茶葉巧克力月餅食品品牌，3-5天交貨。適配行業: 茶葉品牌、手搖飲品店、烘焙坊、咖啡店、月餅端午節禮盒、餐廳外賣、跨境食品電商。', descriptionEn: 'Food-grade material, safe and eco-friendly. Best for: tea brands, bubble tea shops, bakeries, coffee shops, mooncake / Dragon Boat Festival gift boxes, restaurant takeout, cross-border food e-commerce.', descriptionJa: '食品グレード素材、安全で環境に優しい。 適用業界: 茶ブランド、タピオカ店、ベーカリー、カフェ、月餅・端午節ギフト ボックス、レストラン テイクアウト、越境食品EC。', description_zh: '食品級材質，安全環保。適合糕點、茶葉、保健品。 2026 旺季: 春節年糕禮盒、端午粽、夏日冰品配送、中秋月餅聖誕禮籃。',
    features: [
      '【食品級紙材】食品級紙材選項（以訂單確認）',
      '【350g／400g 紙板】高挺度，保護糕點與茶葉不變形',
      '【PE／PLA 內層】防油防濕，環保選項（落單時註明）',
      '【窗口設計】PET 透明片或鏤空，展示內裝產品',
      '【燙金 LOGO】金／銀箔或局部 UV，提升品牌高級感',
      '【可變 QR Code】批次追溯與防偽，方便消費者查驗',
      '【免費刀模】天地蓋、書型盒、折疊插口盒結構設計',
    ],
    specs: {
      material: '350g 食品級白卡／400g 灰底白板；PE 淋膜或 PLA 內層',
      size: '完全訂製，常見 15×10×5cm 至 25×20×8cm',
      printMethod: '四色柯式或數碼（依數量）',
      finishing: '燙金／燙銀、窗口（PET）、局部 UV、覆膜',
    },
    price_range: 'HK$2.5-18/個',
    basePrice: 2.5,
    basePrice_en: 0.74,
    basePrice_ja: 101,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/food-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-en-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-ja.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-food-boxes-ja-5.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-food-boxes-zh-hk.webp', en: 'zprintpro-packaging-food-boxes-en.webp', ja: 'zprintpro-packaging-food-boxes-ja.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港食品包裝盒印刷 350g 食品級白卡／400g 灰底白板 燙金／燙銀',
      en: 'Custom Packaging Boxes & Gift Boxes | Food Boxes | Professional Packaging Online',
      ja: 'パッケージボックス / ギフトボックス | 食品包装箱 | オリジナルパッケージ・最短3日 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PK-002',
    sku_code: 'PK-002',
    slug: 'cosmetic-boxes',
    optimizedAt: '2026-07-22',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '化妝品包裝盒 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Cosmetic Packaging Boxes | Gift Boxes & Custom Packaging', nameJa: '化粧品パッケージボックス | パッケージボックス・化粧箱', title_zh: '化妝品盒訂製 100個起印 燙金局部UV · 美妝護膚面膜精華液品牌適配 | 智印港',
    description: '美妝護膚品牌化妝品包裝盒定製, 天地蓋 / 磁吸翻蓋 / 抽屜式 / 書型 4 種盒型, 內托 EVA / 紙托 / 吸塑可定製, 燙金 + 局部 UV + 內襯緞布。香港本地、跨境美妝電商、日本市場適用。 适配行业:美妝護膚品牌、面膜品牌、精華液品牌、口紅彩妝、香水品牌、手作護膚品、跨境電商', descriptionEn: 'Custom cosmetic packaging boxes for beauty and skincare brands — 4 box styles (lift-off lid, magnetic, drawer, book-style) with EVA/molded pulp/PET inner trays. Foil stamping, spot UV, satin lining. Cross-border e-commerce and Japan market ready. Best for:skincare brands, sheet mask brands, serum brands, lipstick & makeup, perfume brands, hand-made skincare, cross-border e-commerce', descriptionJa: '化粧品パッケージボックス カスタム — 天地蓋 / マグネット蓋 / 引き出し式 / ブック型の 4 種類, EVA / 紙 / ペット内裝トレイ選択可。箔押し・スポット UV ・サテン裏地対応。越境 EC ・日本市場向け。 適用業界:スキンケアブランド、シートマスクブランド、美容液ブランド、口紅・メイク、香水ブランド、手作りスキンケア、越境EC', description_zh: '美妝護膚品牌化妝品包裝盒定製, 天地蓋 / 磁吸翻蓋 / 抽屜式 / 書型 4 種盒型, 內托可定製, 燙金 + 局部 UV + 內襯緞布。',
    features: [
      '【4 種盒型】天地蓋 / 磁吸翻蓋 / 抽屜式 / 書型, 全部可選',
      '【內托定製】EVA 挖槽 / 紙漿模塑 / PET 吸塑 3 種材質',
      '【法規標示】合規文件以訂單確認',
      '【表面工藝】啞膠 / 觸感膜 / 光膠 + 燙金細線 + 局部 UV',
      '【內襯升級】黑 / 白 / 粉 / 米 EVA 或緞布可選',
      '【DHL 全球】國際訂單 2-4 個工作天送達',
      '【小批量】100 個起印, 500+ 享 85 折, 1000+ 享 7 折',
    ],
    specs: {
      material: '1200-1500g 灰板裱糊 白卡 / 觸感紙 / 珠光紙; 內托 EVA / 紙漿 / PET 吸塑',
      size: '依瓶器三維客製; 標準 50×50×30mm 至 250×250×120mm',
      printMethod: '四色柯式 + 專色; 可逆向 UV',
      finishing: '覆膜 (啞/觸感/光) + 燙金 (金/銀/玫瑰金) + 局部 UV + 擊凸 + 糊盒',
    },
    price_range: 'HK$8-65/個',
    basePrice: 8,
    basePrice_en: 1.84,
    basePrice_ja: 240,
    weight_score: 96,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/cosmetic-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-zh-hk-6.webp',
    ],
    en: [
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-5.webp',
    ],
    ja: [
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-ja.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-ja-6.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-cosmetic-boxes-zh-hk.webp', en: 'zprintpro-packaging-cosmetic-boxes-en.webp', ja: 'zprintpro-packaging-cosmetic-boxes-ja.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港化妝品包裝盒印刷 4 種盒型 天地蓋磁吸抽屜書型 內托定製',
      en: 'Custom Packaging Boxes & Gift Boxes | Cosmetic Packaging Boxes | 4 Box Styles | Custom Inner Tray | ZprintPro',
      ja: 'パッケージボックス / ギフトボックス | 化粧品パッケージボックス | 4 種類ボックススタイル | 内裝カスタム | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PK-004',
    sku_code: 'PK-004',
    slug: 'mailer-boxes',

    optimizedAt: '2026-07-23',
    optimizationRound: 2,
    category: 'packaging',
    category_slug: 'packaging',
    name: '100 MOQ 快遞盒/飛機盒 · 跨境 FBA DHL 2-4 天送達 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: '100 MOQ Mailer Boxes · Free Design · DHL 2-4 Day Global | Gift Boxes & Custom Packaging', nameJa: '100個〜 発送箱 · 越境EC FBA · DHL 2-4日配送 | パッケージボックス・化粧箱', title_zh: '100 MOQ 快遞盒/飛機盒 · 跨境電商 FBA 標配 · DHL 2-4 天',
    description: '堅固耐用，電商發貨首選。可印品牌Logo，提升開箱體驗。適配行業: 亞馬遜 FBA、Shopify 獨立站、Etsy、跨境電商品牌、訂閱盒直運、DTC 品牌、3PL 物流倉。', descriptionEn: 'Built for e-commerce shipping. Best for: Amazon FBA, Shopify DTC, Etsy, cross-border e-commerce brands, subscription box dropship, DTC brands, 3PL fulfillment warehouses.', descriptionJa: '頑丈で耐久性があり、EC発送の第一選択。 適用業界: Amazon FBA、Shopify DTC、Etsy、越境ECブランド、サブスクリプション ボックス dropship、DTC ブランド、3PL フルフィルメント倉庫。', description_zh: '堅固耐用，電商發貨首選。可印品牌Logo，提升開箱體驗。 2026 旺季重點: D2C 美妝配送、茶飲/手搖外送、訂閱盒盲盒、Kickstarter 集資送貨。',
    features: [
      '電商出貨耐壓楞型可選',
      '滿版外印＋內側品牌訊息',
      '飛機盒快速折合成型',
      '可預留面單黏貼安全區',
      '適合訂閱盒與批次發貨',
      '楞厚與內容物重量匹配建議',
      '可加環保回收圖示',
    ],
    specs: {
      material: 'E／B 坑瓦楞或白卡裱瓦（依載重）',
      size: '小／中／大或依內裝物客製',
      printMethod: '柔性版或柯式（依量與色數）',
      finishing: '模切、壓線、自黏封口（可諮詢）',
    },
    price_range: 'HK$3.5-10/個',
    basePrice: 3.5,
    basePrice_en: 0.8,
    basePrice_ja: 105,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/mailer-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-ja.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-mailer-boxes-ja-5.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-mailer-boxes-zh-hk.webp', en: 'zprintpro-packaging-mailer-boxes-en.webp', ja: 'zprintpro-packaging-mailer-boxes-ja.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港快遞盒/飛機盒印刷 E／B 坑瓦楞 模切',
      en: 'Custom Packaging Boxes & Gift Boxes | Mailer Boxes | Professional Packaging Online',
      ja: 'パッケージボックス / ギフトボックス | 発送箱 | オリジナルパッケージ・最短3日 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PK-005',
    sku_code: 'PK-005',
    slug: 'folding-boxes',

    optimizedAt: '2026-07-23',
    optimizationRound: 1,    category: 'packaging',
    category_slug: 'packaging',
    name: '折疊盒 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Folding Boxes | Gift Boxes & Custom Packaging', nameJa: '折りたたみ箱 | パッケージボックス・化粧箱', title_zh: '折疊盒',
    description: '可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。', descriptionEn: 'Foldable design, saves warehouse space. Custom size · 100 MOQ · Eco kraft options · Free shipping over $99 USA. Fits DTC ecommerce, tea/beverage, food packaging.', descriptionJa: '折りたたみ可能なデザイン、倉庫スペースを節約。。カスタムサイズ・100個から・クラフト紙対応・全国送料込み。D2C EC・茶/飲料・食品パッケージに適合。', description_zh: '可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。 2026 旺季: 環保品牌限定、ESG 碳審計合規、月餅糕點禮盒、聖誕節日禮盒。',
    features: [
      '【平板出貨】節省倉儲空間 70% 以上，降低庫存成本',
      '【自動鎖底】插口結構穩固，測試表現以訂單規格為準',
      '【300g–350g 白卡】高挺度摺疊，成型後棱角分明',
      '【E 坑瓦楞】可選加固，適合較重電商產品',
      '【燙金條碼】支援金／銀箔與可變條碼，品牌與物流兼顧',
      '【免費展開圖】提供組裝指引，確保摺痕角度精準',
      '【覆膜選項】啞膜／光膜／局部 UV，防刮耐磨',
    ],
    specs: {
      material: '300g–350g 白卡紙／E 坑瓦楞紙板',
      size: '展開平板約 40×30cm 至 60×50cm；成型後約 15×10×5cm 起',
      printMethod: '四色柯式或數碼（依數量）',
      finishing: '覆膜（啞膜／光膜）、燙金、局部 UV、條碼',
    },
    price_range: 'HK$2.5-15/個',
    basePrice: 2.5,
    basePrice_en: 0.51,
    basePrice_ja: 69,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/folding-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-ja.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-folding-boxes-ja-5.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-folding-boxes-zh-hk.webp', en: 'zprintpro-packaging-folding-boxes-en.webp', ja: 'zprintpro-packaging-folding-boxes-ja.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港折疊盒印刷 300g–350g 白卡紙／E 坑瓦楞紙 覆膜（啞膜／光膜）',
      en: 'Custom Packaging Boxes & Gift Boxes | Folding Boxes | Professional Packaging Online',
      ja: 'パッケージボックス / ギフトボックス | 折りたたみ箱 | オリジナルパッケージ・最短3日 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PK-006',
    sku_code: 'PK-006',
    slug: 'rigid-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '精裝盒 / 精裝盒報價 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Rigid Boxes / Custom Quote | Gift Boxes & Premium Packaging', nameJa: '貼り箱（リジッドボックス） / 見積もり | パッケージボックス・化粧箱', title_zh: '精裝盒報價 100個起印 HK$4.5起/個 天地蓋書型磁吸 · 智印港',
    description: '精品盒/禮品盒訂製印刷，100個起印，HK$4.5起/個。硬殼天地盒磁吸盒抽屜盒，灰板裱藝術紙，燙金UV壓凹工藝。適合化妝品珠寶首飾婚慶禮盒週年慶品牌活動贈品，3-7天交貨，全球配送。 适配行业:鐘錶珠寶品牌、3C電子產品、手機配件、禮品店、婚慶喜糖、聖誕禮盒、跨境電商亞馬遜', descriptionEn: 'Hardcover rigid construction, luxurious and premium. Premium setup box · 100 MOQ · Magnetic closure available · Foil + spot UV finish. Luxury packaging for jewelry, electronics, high-end gifts. Best for:watch & jewellery brands, 3C electronics, phone accessories, premium gift shops, wedding favours, Christmas hampers, Amazon FBA sellers', descriptionJa: '硬い上製本構造、豪華でプレミアム。。プレミアムセットアップ箱・100個から・マグネット式・箔押し+スポットUV。宝飾/電子機器/高級ギフト向けラグジュアリーパッケージ。 適用業界:腕時計・宝飾ブランド、3C電子機器、携帯電話アクセサリー、プレミアムギフト、ブライダル、クリスマス、Amazon FBA', description_zh: '硬殼精裝/禮品盒，高檔奢華。適合高端產品、限量版、婚慶/週年慶贈品。',
    features: [
      '灰板裱面，結構挺括',
      '磁吸、緞帶等開合儀式感配置',
      '多工藝疊加：燙金、壓紋、局部 UV',
      '適合限量與高客單價商品',
      '可內嵌 EVA 或絨布內襯',
      '刀模會簽控公差',
      '精品陳列與禮贈場景',
    ],
    specs: {
      material: '灰板＋特種裱面紙；可選磁吸五金',
      size: '全客製內徑；常用禮品三階尺寸',
      printMethod: '柯式面紙印刷＋後工',
      finishing: '燙金、壓紋、局部 UV、手工糊盒',
    },
    price_range: 'HK$8-42/個',
    basePrice: 8,
    basePrice_en: 1.84,
    basePrice_ja: 240,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/rigid-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-en-3.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-ja.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-rigid-boxes-ja-3.webp',
    ],
  },
    optimizedAt: '2026-07-22',
    optimizationRound: 2,
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-rigid-boxes-zh-hk.webp', en: 'zprintpro-packaging-rigid-boxes-en.webp', ja: 'zprintpro-packaging-rigid-boxes-ja.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港精裝盒印刷 灰板＋特種裱面紙 燙金',
      en: 'Custom Packaging Boxes & Gift Boxes | Rigid Boxes | Professional Packaging Online',
      ja: 'パッケージボックス / ギフトボックス | 貼り箱 | オリジナルパッケージ・最短3-5日 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 利是封印刷 (6 SKU)
  {
    id: 'RP-001',
    sku_code: 'RP-001',
    slug: 'foil-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '燙金利是封 | 利是封 / 春聯 / 燙金', nameEn: 'Foil Red Packets | CNY Red Packets & Foil', nameJa: '箔押しポチ袋 | 紅包 / 旧正月 / 箔押し', title_zh: '燙金利是封 · 婚慶/年會/品牌活動定製 | 智印港',
    description: '傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定製專屬設計。適合企業派發、節日營銷。適配行業:婚慶喜宴、企業年會、品牌活動、春節促銷、客戶禮贈、酒店開業、金融證券回饋、奢侈品品牌營銷。', descriptionEn: 'Traditional foil stamping, festive and elegant. Multiple auspicious patterns or custom designs. Best for: wedding banquets, corporate annual events, brand activations, Spring Festival promos, client gifting, hotel openings, financial client rewards, luxury brand marketing.', descriptionJa: '伝統的な箔押し加工、縁起が良く上品。複数の縁起の良い柄またはカスタムデザイン。適用業界:ブライダル宴会、企業年会、ブランドアクティベーション、春節促销、クライアントギフト、ホテル開業、金融顧客還元、ラグジュアリーブランド マーケティング。', description_zh: '傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定製專屬設計。適合企業派發、節日營銷。',
    optimizedAt: '2026-07-08',
    optimizationRound: 1,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【三色燙金】金／銀／玫瑰金，傳統喜慶',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: '120g紅色紙張；燙金／燙銀',
      size: '標準約90×170mm（可客製）',
      printMethod: '四色印刷＋燙金',
      finishing: '燙金、壓凹、局部UV',
    },
    price_range: 'HK$1.10-4.80/個',
    basePrice: 1.10,
    basePrice_en: 0.46,
    basePrice_ja: 64,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-en.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-ja.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-foil-red-packets-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-red-packets-foil-red-packets-zh-hk.webp', en: 'zprintpro-red-packets-foil-red-packets-en.webp', ja: 'zprintpro-red-packets-foil-red-packets-ja.webp' },
    alt: {
      'zh-hk': '利是封印刷 / 燙金 / 春節紅包 | 香港燙金利是封印刷 120g紅色紙張 燙金 100個起印 | 智印港',
      en: 'Red Packet Printing / Gold Foil / Lunar New Year | Foil Red Packets 120gsm, 100 pcs MOQ | ZprintPro',
      ja: 'ポチ袋印刷 / 旧正月 / 箔押し | 箔押しポチ袋 120g・100枚から | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'RP-002',
    sku_code: 'RP-002',
    slug: 'embossed-red-packets',
    optimizedAt: '2026-07-27',
    optimizationRound: 1,
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '浮雕利是封 | 利是封 / 春聯 / 燙金', nameEn: 'Embossed Red Packets | CNY Red Packets & Foil', nameJa: 'エンボスポチ袋 | 紅包 / 旧正月 / 箔押し', title_zh: '浮雕利是封 · 訂製',
    description: '浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。 适配行业: 婚慶嫁娶、春節賀年、酒店迎賓、銀行公關、品牌活動、茶葉禮盒、母嬰品牌.', descriptionEn: 'Embossed craftsmanship, dimensional texture, luxurious feel. Typical uses: wedding banquets, Lunar New Year gifting, hotel welcome kits, bank PR, brand events, tea gift sets and baby brands.', descriptionJa: 'エンボス加工、立体的な触感、豪華な質感。主な用途: ウェディング、春節、ホテル、バンクPR、ブランドイベント、茶ギフト、ベビー.', description_zh: '浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。 适配行业: 婚慶嫁娶、春節賀年、酒店迎賓、銀行公關、品牌活動、茶葉禮盒、母嬰品牌.',
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【0.3–0.5mm浮雕】立體觸感，品牌誠意倍增',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: '150g紅色紙張；浮雕＋燙金',
      size: '標準約90×170mm（可客製）',
      printMethod: '四色印刷＋浮雕',
      finishing: '浮雕、燙金、壓凹',
    },
    price_range: 'HK$3.00-9.50/個',
    basePrice: 3.00,
    basePrice_en: 0.92,
    basePrice_ja: 129,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-zh-hk.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-en.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-ja.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-embossed-red-packets-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準 (90×170mm)', multiplier: 1 },
        { value: 'large', label: '大號 (100×190mm)', multiplier: 1.3 },
        { value: 'premium', label: '豪華 (120×220mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g紅紙', surcharge: 0 },
        { value: '157g', label: '157g厚紅紙', surcharge: 15 },
        { value: 'special', label: '特種紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'none', label: '燙金', surcharge: 0 },
        { value: 'foil', label: '燙金浮雕', surcharge: 50 },
        { value: 'emboss', label: '立體燙金', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-red-packets-embossed-red-packets-zh-hk.webp', en: 'zprintpro-red-packets-embossed-red-packets-en.webp', ja: 'zprintpro-red-packets-embossed-red-packets-ja.webp' },
    alt: {
      'zh-hk': '利是封印刷 / 浮雕 / 春節紅包 | 香港浮雕利是封印刷 150g紅色紙張 浮雕 100個起印 | 智印港',
      en: 'Red Packet Printing / Embossed / Lunar New Year | Embossed Red Packets 150gsm, 100 pcs MOQ | ZprintPro',
      ja: 'ポチ袋印刷 / 旧正月 / エンボス | エンボスポチ袋 150g・100枚から | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'RP-003',
    sku_code: 'RP-003',
    slug: 'custom-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '定製利是封 | 利是封 / 春聯 / 燙金', nameEn: 'Custom Red Packets | CNY Red Packets & Foil', nameJa: 'オリジナルポチ袋 | 紅包 / 旧正月 / 箔押し', title_zh: '定製利是封',
    description: '專屬設計，印上公司Logo和祝福語。強化品牌印象，節日營銷必備。', descriptionEn: 'Exclusive design with company logo and greetings. Strengthens brand impression.', descriptionJa: '独占的なデザイン、会社ロゴと祝福の言葉。ブランドイメージを強化。', description_zh: '專屬設計，印上公司Logo和祝福語。強化品牌印象，節日營銷必備。',
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【完全客製】Logo、品牌色、專屬圖案全可印',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: '120g–150g紅色或特殊色紙張',
      size: '完全訂製',
      printMethod: '四色印刷＋燙金／UV',
      finishing: '燙金、局部UV、壓凹、異形模切',
    },
    price_range: 'HK$1.90-6.40/個',
    basePrice: 1.90,
    basePrice_en: 0.74,
    basePrice_ja: 103,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-zh-hk.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-en.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-ja.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-custom-red-packets-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準 (90×170mm)', multiplier: 1 },
        { value: 'large', label: '大號 (100×190mm)', multiplier: 1.3 },
        { value: 'premium', label: '豪華 (120×220mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g紅紙', surcharge: 0 },
        { value: '157g', label: '157g厚紅紙', surcharge: 15 },
        { value: 'special', label: '特種紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'none', label: '燙金', surcharge: 0 },
        { value: 'foil', label: '燙金浮雕', surcharge: 50 },
        { value: 'emboss', label: '立體燙金', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-red-packets-custom-red-packets-zh-hk.webp', en: 'zprintpro-red-packets-custom-red-packets-en.webp', ja: 'zprintpro-red-packets-custom-red-packets-ja.webp' },
    alt: {
      'zh-hk': '利是封印刷 / 定製 / 春節紅包 | 香港定製利是封印刷 120g–150g紅色紙張 100個起印 | 智印港',
      en: 'Red Packet Printing / Custom / Lunar New Year | Custom Red Packets 120–150gsm, 100 pcs MOQ | ZprintPro',
      ja: 'ポチ袋印刷 / 旧正月 / オリジナル | オリジナルポチ袋 120g–150g・100枚から | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'RP-004',
    sku_code: 'RP-004',
    slug: 'cartoon-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '卡通利是封 | 利是封 / 春聯 / 燙金', nameEn: 'Cartoon Red Packets | CNY Red Packets & Foil', nameJa: 'キャラクターポチ袋 | 紅包 / 旧正月 / 箔押し', title_zh: '卡通利是封 · 訂製',
    description: '可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。', descriptionEn: 'Cute cartoon design, loved by young people.', descriptionJa: 'かわいいキャラクターデザイン、若者に人気。', description_zh: '可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。',
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【卡通設計】活潑圖案，親子品牌首選',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: '120g銅版紙或環保紙',
      size: '標準約90×170mm',
      printMethod: '四色數碼印刷',
      finishing: '燙金、局部UV（可選）',
    },
    price_range: 'HK$1.10-3.80/個',
    basePrice: 1.10,
    basePrice_en: 0.46,
    basePrice_ja: 64,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-zh-hk.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-en.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-cartoon-red-packets-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準 (90×170mm)', multiplier: 1 },
        { value: 'large', label: '大號 (100×190mm)', multiplier: 1.3 },
        { value: 'premium', label: '豪華 (120×220mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g紅紙', surcharge: 0 },
        { value: '157g', label: '157g厚紅紙', surcharge: 15 },
        { value: 'special', label: '特種紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'none', label: '燙金', surcharge: 0 },
        { value: 'foil', label: '燙金浮雕', surcharge: 50 },
        { value: 'emboss', label: '立體燙金', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-red-packets-cartoon-red-packets-zh-hk.webp', en: 'zprintpro-red-packets-cartoon-red-packets-en.webp', ja: 'zprintpro-red-packets-cartoon-red-packets-ja.webp' },
    alt: {
      'zh-hk': '利是封印刷 / 卡通 / 春節紅包 | 香港卡通利是封印刷 120g銅版紙 彩色 100個起印 | 智印港',
      en: 'Red Packet Printing / Cartoon / Lunar New Year | Cartoon Red Packets 120gsm Art Paper, 100 pcs MOQ | ZprintPro',
      ja: 'ポチ袋印刷 / 旧正月 / キャラクター | キャラクターポチ袋 120gコート紙・100枚から | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'RP-005',
    sku_code: 'RP-005',
    slug: 'eco-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '環保利是封 | 利是封 / 春聯 / 燙金', nameEn: 'Eco Red Packets | CNY Red Packets & Foil', nameJa: 'エコポチ袋 | 紅包 / 旧正月 / 箔押し', title_zh: '環保利是封 · 訂製',
    description: '採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。', descriptionEn: 'Eco-friendly paper and ink, sustainable development concept.', descriptionJa: '環境に優しい紙とインク、持続可能な開発の理念。', description_zh: '採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。',
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【FSC再生紙／種子紙】可降解或種植，環保承諾',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: 'FSC認證再生紙或種子紙；大豆油墨',
      size: '標準約90×170mm',
      printMethod: '四色數碼或柯式印刷',
      finishing: '無覆膜（環保）',
    },
    price_range: 'HK$1.90-5.20/個',
    basePrice: 1.90,
    basePrice_en: 0.74,
    basePrice_ja: 103,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-zh-hk.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-en.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-ja.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-eco-red-packets-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準 (90×170mm)', multiplier: 1 },
        { value: 'large', label: '大號 (100×190mm)', multiplier: 1.3 },
        { value: 'premium', label: '豪華 (120×220mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g紅紙', surcharge: 0 },
        { value: '157g', label: '157g厚紅紙', surcharge: 15 },
        { value: 'special', label: '特種紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'none', label: '燙金', surcharge: 0 },
        { value: 'foil', label: '燙金浮雕', surcharge: 50 },
        { value: 'emboss', label: '立體燙金', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-red-packets-eco-red-packets-zh-hk.webp', en: 'zprintpro-red-packets-eco-red-packets-en.webp', ja: 'zprintpro-red-packets-eco-red-packets-ja.webp' },
    alt: {
      'zh-hk': '利是封印刷 / 環保 / 春節紅包 | 香港環保利是封印刷 FSC認證再生紙 無覆膜 100個起印 | 智印港',
      en: 'Red Packet Printing / Eco / Lunar New Year | Eco Red Packets FSC Recycled Paper Unlaminated, 100 pcs MOQ | ZprintPro',
      ja: 'ポチ袋印刷 / 旧正月 / エコ | エコポチ袋 FSC再生紙 無PP加工・100枚から | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'RP-006',
    sku_code: 'RP-006',
    slug: 'large-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '大號利是封 | 利是封 / 春聯 / 燙金', nameEn: 'Large Red Packets | CNY Red Packets & Foil', nameJa: '大判ポチ袋 | 紅包 / 旧正月 / 箔押し', title_zh: '大號利是封 · 訂製',
    description: '加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。', descriptionEn: 'Larger size, can hold more cash or gift cards.', descriptionJa: '大きなサイズ、より多くの現金やギフトカードを入れられます。', description_zh: '加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。',
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【加大30%–50%】容量更大，適合厚禮金',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: '150g–200g紅色紙張',
      size: '約110×200mm（較標準大30%–50%）',
      printMethod: '四色印刷＋燙金',
      finishing: '燙金、浮雕、局部UV',
    },
    price_range: 'HK$2.20-7.50/個',
    basePrice: 2.20,
    basePrice_en: 0.92,
    basePrice_ja: 129,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-zh-hk.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-en.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-ja.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-red-packets-large-red-packets-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'standard', label: '標準 (90×170mm)', multiplier: 1 },
        { value: 'large', label: '大號 (100×190mm)', multiplier: 1.3 },
        { value: 'premium', label: '豪華 (120×220mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '128g', label: '128g紅紙', surcharge: 0 },
        { value: '157g', label: '157g厚紅紙', surcharge: 15 },
        { value: 'special', label: '特種紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'none', label: '燙金', surcharge: 0 },
        { value: 'foil', label: '燙金浮雕', surcharge: 50 },
        { value: 'emboss', label: '立體燙金', surcharge: 100 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-red-packets-large-red-packets-zh-hk.webp', en: 'zprintpro-red-packets-large-red-packets-en.webp', ja: 'zprintpro-red-packets-large-red-packets-ja.webp' },
    alt: {
      'zh-hk': '利是封印刷 / 大號 / 春節紅包 | 香港大號利是封印刷 150g–200g紅色紙張 100個起印 | 智印港',
      en: 'Red Packet Printing / Large Size / Lunar New Year | Large Red Packets 150–200gsm, 100 pcs MOQ | ZprintPro',
      ja: 'ポチ袋印刷 / 旧正月 / 大判 | 大判ポチ袋 150g–200g・100枚から | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 年曆印刷 (6 SKU)
  {
    id: 'CL-001',
    sku_code: 'CL-001',
    slug: 'wall-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '掛牆年曆 | 桌曆 / 掛曆 / 2027年曆', nameEn: 'Wall Calendars | Wall & Desk Calendars 2027', nameJa: '壁掛けカレンダー | 卓上カレンダー / 壁掛け 2027', title_zh: '掛牆年曆 · 訂製',
    description: '標準A3或A2掛牆年曆，13頁設計（封面+12個月）。適合家庭、辦公室使用，全年品牌曝光。', descriptionEn: 'Standard A3 or A2 wall calendars, 13-page design. Perfect for home and office use.', descriptionJa: '標準A3またはA2壁掛けカレンダー、13ページデザイン。家庭やオフィスに最適。', description_zh: '標準A3或A2掛牆年曆，13頁設計（封面+12個月）。適合家庭、辦公室使用，全年品牌曝光。',
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【每月一頁】背面可印企業資訊，實用宣傳雙效',
      '【免費排版】每月版面設計與節慶標註',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '250g–300g銅版紙或啞粉紙；金屬圈',
      size: 'A3（297×420mm）或A4（210×297mm）',
      printMethod: '四色柯式或數碼印刷',
      finishing: '金屬圈裝訂、打掛孔',
    },
    price_range: 'HK$3-8/本',
    basePrice: 3,
    basePrice_en: 0.40,
    basePrice_ja: 50,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-zh-hk-hero.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-zh-hk-detail.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-zh-hk-variety.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-en-hero.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-en-detail.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-en-variety.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-ja-hero.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-ja-detail.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-ja-variety.webp', '/images/products/v28_5/wall-calendars/zprintpro-calendars-wall-calendars-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-wall-calendars-zh-hk.webp', en: 'zprintpro-calendars-wall-calendars-en.webp', ja: 'zprintpro-calendars-wall-calendars-ja.webp' },
    alt: {
      'zh-hk': '年曆 / 桌曆 / 掛曆 / 2027年曆 | 香港掛牆年曆印刷 250g–300g銅版紙 金屬圈裝訂',
      en: 'Calendar Printing / Wall / Desk / 2027 | Wall Calendars | Professional Calendars Online',
      ja: 'カレンダー印刷 / 卓上 / 壁掛け 2027 | 壁掛けカレンダー | 壁掛け・卓上・寫真タイプ | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'CL-002',
    sku_code: 'CL-002',
    slug: 'desk-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '座檯年曆 | 桌曆 / 掛曆 / 2027年曆', nameEn: 'Desk Calendars | Wall & Desk Calendars 2027', nameJa: '卓上カレンダー | 卓上カレンダー / 壁掛け 2027', title_zh: '座檯年曆 · 訂製',
    description: '三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌接觸。', descriptionEn: 'Triangular desk design, stable and beautiful. Perfect for office desk display.', descriptionJa: '三角形の卓上デザイン、安定して美しい。オフィスデスクに最適。', description_zh: '三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌接觸。',
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【三角座架】穩固站立，桌面擺放首選',
      '【免費排版】每月版面設計與節慶標註',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '200g–250g銅版紙或卡紙；三角座架',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '三角座架、騎馬釘或膠裝',
    },
    price_range: 'HK$3-8/本',
    basePrice: 3,
    basePrice_en: 0.40,
    basePrice_ja: 50,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-zh-hk-hero.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-zh-hk-detail.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-zh-hk-variety.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-en-hero.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-en-detail.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-en-variety.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-ja-hero.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-ja-detail.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-ja-variety.webp', '/images/products/v28_5/desk-calendars/zprintpro-calendars-desk-calendars-ja-multi-angle.webp']
  },
    variables: {
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '250g', label: '250g卡紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'spiral', label: '鐵圈裝', surcharge: 15 },
        { value: 'perfect', label: '膠裝', surcharge: 20 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-desk-calendars-zh-hk.webp', en: 'zprintpro-calendars-desk-calendars-en.webp', ja: 'zprintpro-calendars-desk-calendars-ja.webp' },
    alt: {
      'zh-hk': '年曆 / 桌曆 / 掛曆 / 2027年曆 | 香港座檯年曆印刷 200g–250g銅版紙 三角座架',
      en: 'Calendar Printing / Wall / Desk / 2027 | Desk Calendars | Professional Calendars Online',
      ja: 'カレンダー印刷 / 卓上 / 壁掛け 2027 | 卓上カレンダー | 壁掛け・卓上・寫真タイプ | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'CL-003',
    sku_code: 'CL-003',
    slug: 'custom-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '定製年曆 | 桌曆 / 掛曆 / 2027年曆', nameEn: 'Custom Calendars | Wall & Desk Calendars 2027', nameJa: 'オリジナルカレンダー | 卓上カレンダー / 壁掛け 2027', title_zh: '定製年曆',
    description: '專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。', descriptionEn: 'Exclusive design, each page can feature company products or services.', descriptionJa: '独占的なデザイン、各ページに会社の製品やサービスを掲載可能。', description_zh: '專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。',
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【完全客製】Logo、品牌故事、產品圖片全可印',
      '【免費排版】每月版面設計與節慶標註',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '250g–300g藝術紙或銅版紙',
      size: 'A3、A4或完全客製',
      printMethod: '四色柯式或數碼印刷',
      finishing: '燙金、局部UV、金屬圈或騎馬釘',
    },
    price_range: 'HK$3-8/本',
    basePrice: 3,
    basePrice_en: 0.40,
    basePrice_ja: 50,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-zh-hk-hero.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-zh-hk-detail.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-zh-hk-variety.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-en-hero.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-en-detail.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-en-variety.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-ja-hero.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-ja-detail.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-ja-variety.webp', '/images/products/v28_5/custom-calendars/zprintpro-calendars-custom-calendars-ja-multi-angle.webp']
  },
    variables: {
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '250g', label: '250g卡紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'spiral', label: '鐵圈裝', surcharge: 15 },
        { value: 'perfect', label: '膠裝', surcharge: 20 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-custom-calendars-zh-hk.webp', en: 'zprintpro-calendars-custom-calendars-en.webp', ja: 'zprintpro-calendars-custom-calendars-ja.webp' },
    alt: {
      'zh-hk': '年曆 / 桌曆 / 掛曆 / 2027年曆 | 香港定製年曆印刷 250g–300g藝術紙 燙金',
      en: 'Calendar Printing / Wall / Desk / 2027 | Custom Calendars | Professional Calendars Online',
      ja: 'カレンダー印刷 / 卓上 / 壁掛け 2027 | オリジナルカレンダー | 壁掛け・卓上・寫真タイプ | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'CL-004',
    sku_code: 'CL-004',
    slug: 'mini-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '迷你年曆 | 桌曆 / 掛曆 / 2027年曆', nameEn: 'Mini Calendars | Wall & Desk Calendars 2027', nameJa: 'ミニカレンダー | 卓上カレンダー / 壁掛け 2027', title_zh: '迷你年曆 · 訂製',
    description: '小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。', descriptionEn: 'Compact and portable, fits in wallet or pocket.', descriptionJa: 'コンパクトで持ち運び可能、財布やポケットに入ります。', description_zh: '小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。',
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【口袋尺寸】小巧精緻，攜帶方便',
      '【免費排版】每月版面設計與節慶標註',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '150g–200g銅版紙或卡紙',
      size: '約85×55mm或90×60mm',
      printMethod: '四色數碼印刷',
      finishing: '騎馬釘或單張裁切',
    },
    price_range: 'HK$3-8/本',
    basePrice: 3,
    basePrice_en: 0.40,
    basePrice_ja: 50,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-zh-hk-hero.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-zh-hk-detail.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-zh-hk-variety.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-en-hero.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-en-detail.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-en-variety.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-ja-hero.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-ja-detail.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-ja-variety.webp', '/images/products/v28_5/mini-calendars/zprintpro-calendars-mini-calendars-ja-multi-angle.webp']
  },
    variables: {
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '250g', label: '250g卡紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'spiral', label: '鐵圈裝', surcharge: 15 },
        { value: 'perfect', label: '膠裝', surcharge: 20 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-mini-calendars-zh-hk.webp', en: 'zprintpro-calendars-mini-calendars-en.webp', ja: 'zprintpro-calendars-mini-calendars-ja.webp' },
    alt: {
      'zh-hk': '年曆 / 桌曆 / 掛曆 / 2027年曆 | 香港迷你年曆印刷 150g–200g銅版紙 騎馬釘或單張裁切',
      en: 'Calendar Printing / Wall / Desk / 2027 | Mini Calendars | Professional Calendars Online',
      ja: 'カレンダー印刷 / 卓上 / 壁掛け 2027 | ミニカレンダー | 壁掛け・卓上・寫真タイプ | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'CL-005',
    sku_code: 'CL-005',
    slug: 'photo-frame-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '相框年曆 | 桌曆 / 掛曆 / 2027年曆', nameEn: 'Photo Frame Calendars | Wall & Desk Calendars 2027', nameJa: 'フォトフレームカレンダー | 卓上カレンダー / 壁掛け 2027', title_zh: '相框年曆 · 訂製',
    description: '結合相框功能，可替換照片。實用美觀，家庭必備。', descriptionEn: 'Combined photo frame function, photos can be replaced.', descriptionJa: 'フォトフレーム機能付き、寫真を交換可能。', description_zh: '結合相框功能，可替換照片。實用美觀，家庭必備。',
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【硬紙板相架】直立擺放，桌面裝飾首選',
      '【免費排版】每月版面設計與節慶標註',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '250g–300g銅版紙或相紙；硬紙板相架',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '硬紙板相架底座、騎馬釘',
    },
    price_range: 'HK$3-8/本',
    basePrice: 3,
    basePrice_en: 0.40,
    basePrice_ja: 50,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-zh-hk-hero.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-zh-hk-detail.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-zh-hk-variety.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-en-hero.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-en-detail.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-en-variety.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-ja-hero.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-ja-detail.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-ja-variety.webp', '/images/products/v28_5/photo-frame-calendars/zprintpro-calendars-photo-frame-calendars-ja-multi-angle.webp']
  },
    variables: {
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '250g', label: '250g卡紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'spiral', label: '鐵圈裝', surcharge: 15 },
        { value: 'perfect', label: '膠裝', surcharge: 20 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-photo-frame-calendars-zh-hk.webp', en: 'zprintpro-calendars-photo-frame-calendars-en.webp', ja: 'zprintpro-calendars-photo-frame-calendars-ja.webp' },
    alt: {
      'zh-hk': '年曆 / 桌曆 / 掛曆 / 2027年曆 | 香港相框年曆印刷 250g–300g銅版紙 硬紙板相架底座',
      en: 'Calendar Printing / Wall / Desk / 2027 | Photo Frame Calendars | Professional Calendars Online',
      ja: 'カレンダー印刷 / 卓上 / 壁掛け 2027 | フォトフレームカレンダー | 壁掛け・卓上・寫真タイプ | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'CL-006',
    sku_code: 'CL-006',
    slug: 'magnetic-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '磁石年曆 | 桌曆 / 掛曆 / 2027年曆', nameEn: 'Magnetic Calendars | Wall & Desk Calendars 2027', nameJa: 'マグネットカレンダー | 卓上カレンダー / 壁掛け 2027', title_zh: '磁石年曆 · 訂製',
    description: '磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。', descriptionEn: 'Magnetic backing, can stick to refrigerator and other metal surfaces.', descriptionJa: 'マグネット背面、冷蔵庫などの金属面に貼付可能。', description_zh: '磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。',
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【軟磁片背面】吸附冰箱白板，實用性強',
      '【免費排版】每月版面設計與節慶標註',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '200g–250g銅版紙或合成紙；0.5mm或1mm軟磁片',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼印刷',
      finishing: '軟磁片貼合、圓角裁切',
    },
    price_range: 'HK$3-8/本',
    basePrice: 3,
    basePrice_en: 0.40,
    basePrice_ja: 50,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-zh-hk-hero.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-zh-hk-detail.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-zh-hk-variety.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-en-hero.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-en-detail.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-en-variety.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-ja-hero.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-ja-detail.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-ja-variety.webp', '/images/products/v28_5/magnetic-calendars/zprintpro-calendars-magnetic-calendars-ja-multi-angle.webp']
  },
    variables: {
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '250g', label: '250g卡紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'spiral', label: '鐵圈裝', surcharge: 15 },
        { value: 'perfect', label: '膠裝', surcharge: 20 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-magnetic-calendars-zh-hk.webp', en: 'zprintpro-calendars-magnetic-calendars-en.webp', ja: 'zprintpro-calendars-magnetic-calendars-ja.webp' },
    alt: {
      'zh-hk': '年曆 / 桌曆 / 掛曆 / 2027年曆 | 香港磁石年曆印刷 200g–250g銅版紙 軟磁片貼合',
      en: 'Calendar Printing / Wall / Desk / 2027 | Magnetic Calendars | Professional Calendars Online',
      ja: 'カレンダー印刷 / 卓上 / 壁掛け 2027 | マグネットカレンダー | 壁掛け・卓上・寫真タイプ | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 餐牌印刷 (5 SKU)
  {
    id: 'MN-001',
    sku_code: 'MN-001',
    slug: 'pvc-menus',
    category: 'menus',
    category_slug: 'menus',
    name: 'PVC餐牌 | 餐牌 / 菜單 / 防水PVC', nameEn: 'PVC Menus | Restaurant Menus & PVC', nameJa: 'PVCメニュー | レストランメニュー / 防水', title_zh: 'PVC 餐牌印刷 · 防水防油可水洗 | 餐廳/咖啡店/酒吧菜單 | 智印港 · 訂製',
    description: '防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。適配行業:餐廳、咖啡店、酒吧、茶餐廳、火鍋店、居酒屋、酒店餐廳、婚宴酒樓。', descriptionEn: 'Waterproof and oil-resistant PVC material, easy to clean and durable. Best for: restaurants, cafes, bars, cha chaan teng, hot pot, izakaya, hotel restaurants, wedding banquet halls.', descriptionJa: '防水・耐油性PVC素材、お手入れ簡単で耐久性あり。適用業界:レストラン、カフェ、バー、茶餐廳 (中華風食堂)、火鍋店、居酒屋、ホテルレストラン、ブライダル宴会。', description_zh: '防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。',
    optimizedAt: '2026-07-08',
    optimizationRound: 1,
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【0.5–1.0mm PVC】防水防油，直接擦拭清潔',
      '【免費排版】菜品分類與價格標註',
      '【可更新設計】季節菜單可快速改版'
    ],
    specs: {
      material: '0.5mm–1.0mm透明或白色PVC膠片',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色UV印刷',
      finishing: '圓角或直角裁切',
    },
    price_range: 'HK$8-32/張',
    basePrice: 8,
    basePrice_en: 2.76,
    basePrice_ja: 386,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    unitLabel: '張',
    images: ['/images/products/pvc-menus.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-pvc-menus-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-menus-pvc-menus-zh-hk.webp', en: 'zprintpro-menus-pvc-menus-en.webp', ja: 'zprintpro-menus-pvc-menus-ja.webp' },
    alt: {
      'zh-hk': '餐牌印刷 / 防水PVC / 精裝菜單 | 香港PVC餐牌印刷 0.5mm–1.0mm透明 圓角或直角裁切',
      en: 'Menu Printing / PVC / Waterproof | PVC Menus | Professional Menus Online',
      ja: 'メニュー印刷 / 防水 / ハードカバー | PVCメニュー | 防水ラミネート・店舗向け | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'MN-002',
    sku_code: 'MN-002',
    slug: 'laminated-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '過膠餐牌 | 餐牌 / 菜單 / 覆膜', nameEn: 'Laminated Menus | Restaurant Menus & PVC', nameJa: 'ラミネートメニュー | レストランメニュー / 防水', title_zh: '過膠餐牌 · 訂製',
    description: '紙質過膠處理，防水耐用且成本較低。經濟實惠之選。', descriptionEn: 'Paper with lamination, waterproof and durable at lower cost.', descriptionJa: 'ラミネート加工紙、防水で耐久性がありコストも低い。', description_zh: '紙質過膠處理，防水耐用且成本較低。經濟實惠之選。',
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【啞膠／光膠覆膜】防水防油，保護印刷面',
      '【免費排版】菜品分類與價格標註',
      '【可更新設計】季節菜單可快速改版'
    ],
    specs: {
      material: '200g–250g銅版紙或啞粉紙；啞膠或光膠覆膜',
      size: 'A4（210×297mm）或A3（297×420mm）',
      printMethod: '四色印刷',
      finishing: '覆膜（啞膠／光膠）、圓角裁切',
    },
    price_range: 'HK$5-22/張',
    basePrice: 5,
    basePrice_en: 1.84,
    basePrice_ja: 258,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    unitLabel: '份',
    images: ['/images/products/laminated-menus.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-en.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-en-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-en-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-en-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-ja.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-laminated-menus-ja-5.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.7 },
        { value: 'dl', label: 'DL (99×210mm)', multiplier: 0.5 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '300g', label: '300g卡紙', surcharge: 50 },
      ],
      finishings: [
        { value: 'single', label: '單面', surcharge: 0 },
        { value: 'double', label: '雙面', surcharge: 15 },
        { value: 'laminate', label: '過膠', surcharge: 25 },
      ],
      quantities: [
        { value: 50, label: '50張', discount: 1 },
        { value: 100, label: '100張', discount: 0.85 },
        { value: 500, label: '500張', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-menus-laminated-menus-zh-hk.webp', en: 'zprintpro-menus-laminated-menus-en.webp', ja: 'zprintpro-menus-laminated-menus-ja.webp' },
    alt: {
      'zh-hk': '餐牌印刷 / 覆膜 / 精裝菜單 | 香港過膠餐牌印刷 200g–250g銅版紙 覆膜（啞膠／光膠）',
      en: 'Menu Printing / PVC / Waterproof | Laminated Menus | Professional Menus Online',
      ja: 'メニュー印刷 / 防水 / ハードカバー | ラミネートメニュー | 防水ラミネート・店舗向け | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'MN-003',
    sku_code: 'MN-003',
    slug: 'hardcover-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '精裝餐牌 | 餐牌 / 菜單 / 硬殼裝訂', nameEn: 'Hardcover Menus | Restaurant Menus & PVC', nameJa: '高級メニュー | レストランメニュー / 防水', title_zh: '精裝餐牌 · 訂製',
    description: '硬殼精裝，高檔大氣。適合高級餐廳、酒店。', descriptionEn: 'Hardcover binding, elegant and grand. Perfect for fine dining restaurants, hotels.', descriptionJa: '上製本裝丁、エレガントで格式高い。高級レストラン、ホテルに最適。', description_zh: '硬殼精裝，高檔大氣。適合高級餐廳、酒店。',
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【硬紙板封面】高檔質感，適合高級餐廳',
      '【免費排版】菜品分類與價格標註',
      '【可更新設計】季節菜單可快速改版'
    ],
    specs: {
      material: '硬紙板封面裱糊銅版紙；內頁200g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色印刷',
      finishing: '燙金、壓凹、騎馬釘或膠裝',
    },
    price_range: 'HK$28-120/本',
    basePrice: 28,
    basePrice_en: 9.2,
    basePrice_ja: 1288,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    unitLabel: '本',
    images: ['/images/products/hardcover-menus.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-en.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-en-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-en-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-en-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-ja.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-menus-hardcover-menus-ja-5.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.7 },
        { value: 'dl', label: 'DL (99×210mm)', multiplier: 0.5 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '300g', label: '300g卡紙', surcharge: 50 },
      ],
      finishings: [
        { value: 'single', label: '單面', surcharge: 0 },
        { value: 'double', label: '雙面', surcharge: 15 },
        { value: 'laminate', label: '過膠', surcharge: 25 },
      ],
      quantities: [
        { value: 50, label: '50張', discount: 1 },
        { value: 100, label: '100張', discount: 0.85 },
        { value: 500, label: '500張', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-menus-hardcover-menus-zh-hk.webp', en: 'zprintpro-menus-hardcover-menus-en.webp', ja: 'zprintpro-menus-hardcover-menus-ja.webp' },
    alt: {
      'zh-hk': '餐牌印刷 / 硬殼裝訂 / 精裝菜單 | 香港精裝餐牌印刷 硬紙板封面裱糊銅版紙 燙金',
      en: 'Menu Printing / PVC / Waterproof | Hardcover Menus | Professional Menus Online',
      ja: 'メニュー印刷 / 防水 / ハードカバー | 高級メニュー | 防水ラミネート・店舗向け | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'MN-004',
    sku_code: 'MN-004',
    slug: 'drink-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '酒水牌 | 餐牌 / 菜單 / 覆膜', nameEn: 'Drink Menus | Restaurant Menus & PVC', nameJa: 'ドリンクメニュー | レストランメニュー / 防水', title_zh: '酒水牌 · 訂製',
    description: '專為酒水設計，可立式或手持。酒吧、餐廳必備。', descriptionEn: 'Specially designed for drinks, can be standing or handheld.', descriptionJa: 'ドリンク専用設計、立てかけまたは手持ち可能。', description_zh: '專為酒水設計，可立式或手持。酒吧、餐廳必備。',
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【QR Code連結】線上點餐，減少接觸',
      '【免費排版】菜品分類與價格標註',
      '【可更新設計】季節菜單可快速改版'
    ],
    specs: {
      material: '200g–250g銅版紙或合成紙；啞膠覆膜',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色印刷',
      finishing: '覆膜（啞膠）、圓角裁切',
    },
    price_range: 'HK$12-48/張',
    basePrice: 12,
    basePrice_en: 3.68,
    basePrice_ja: 515,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    unitLabel: '份',
    images: ['/images/products/drink-menus.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-en.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-en-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-en-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-ja.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-drink-menus-ja-4.webp',
    ],
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 0.7 },
        { value: 'dl', label: 'DL (99×210mm)', multiplier: 0.5 },
      ],
      materials: [
        { value: '157g', label: '157g銅版紙', surcharge: 0 },
        { value: '200g', label: '200g厚紙', surcharge: 20 },
        { value: '300g', label: '300g卡紙', surcharge: 50 },
      ],
      finishings: [
        { value: 'single', label: '單面', surcharge: 0 },
        { value: 'double', label: '雙面', surcharge: 15 },
        { value: 'laminate', label: '過膠', surcharge: 25 },
      ],
      quantities: [
        { value: 50, label: '50張', discount: 1 },
        { value: 100, label: '100張', discount: 0.85 },
        { value: 500, label: '500張', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-menus-drink-menus-zh-hk.webp', en: 'zprintpro-menus-drink-menus-en.webp', ja: 'zprintpro-menus-drink-menus-ja.webp' },
    alt: {
      'zh-hk': '餐牌印刷 / 覆膜 / 精裝菜單 | 香港酒水牌印刷 200g–250g銅版紙 覆膜（啞膠）',
      en: 'Menu Printing / PVC / Waterproof | Drink Menus | Professional Menus Online',
      ja: 'メニュー印刷 / 防水 / ハードカバー | ドリンクメニュー | 防水ラミネート・店舗向け | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 噴繪廣告 (5 SKU)
  {
    id: 'BN-001',
    sku_code: 'BN-001',
    slug: 'outdoor-vinyl-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '戶外燈布噴繪 | 易拉寶 / 戶外橫幅 / 噴繪', nameEn: 'Outdoor Vinyl Banners | Roll-up & Outdoor Banners', nameJa: '屋外バナー | ロールアップバナー / 屋外バナー', title_zh: '戶外燈布噴繪',
    description: '大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、建築圍板。', descriptionEn: 'Large outdoor vinyl banners, waterproof and UV-resistant, strong weather resistance.', descriptionJa: '大型屋外ビニールバナー、防水・UV耐性、強い耐候性。', description_zh: '大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、建築圍板。',
    features: [
      '大幅面無縫或低縫拼接',
      '防水、抗 UV 戶外墨水方案',
      '可配打扣、焊邊、風扣',
      '適合圍板、外牆、活動背板',
      '檔案出血與安裝孔位協助',
      '高風壓場景材質可升級',
      '按平方米計價透明',
    ],
    specs: {
      material: '外光／內光 PVC 燈布（依場景）',
      size: '按客製長寬平方米計',
      printMethod: '弱溶劑／溶劑／UV 噴繪',
      finishing: '打扣、焊邊、筒芯出貨（可選）',
    },
    price_range: 'HK$12-55/平方米',
    basePrice: 12,
    basePrice_en: 2.76,
    basePrice_ja: 360,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-zh-hk-hero.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-zh-hk-detail.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-zh-hk-variety.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-en-hero.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-en-detail.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-en-variety.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-ja-hero.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-ja-detail.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-ja-variety.webp', '/images/products/v28_5/outdoor-vinyl-banners/zprintpro-banners-outdoor-vinyl-banners-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-banners-outdoor-vinyl-banners-zh-hk.webp', en: 'zprintpro-banners-outdoor-vinyl-banners-en.webp', ja: 'zprintpro-banners-outdoor-vinyl-banners-ja.webp' },
    alt: {
      'zh-hk': '噴繪印刷 / 易拉寶 / 戶外橫幅 | 香港戶外燈布噴繪印刷 外光／內光 PVC 燈布（依場景） 打扣',
      en: 'Banner Printing / Roll-up / X-Stand | Outdoor Vinyl Banners | Professional Banners Online',
      ja: 'バナー印刷 / ロールアップ / 屋外 | 屋外バナー | 屋外耐久・防炎加工対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BN-002',
    sku_code: 'BN-002',
    slug: 'roll-up-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '易拉寶 | 易拉寶 / 戶外橫幅 / 噴繪', nameEn: 'Roll-up Banners | Roll-up & Outdoor Banners', nameJa: 'ロールアップバナー | ロールアップバナー / 屋外バナー', title_zh: '易拉寶',
    description: '便攜易拉寶展架，安裝簡便。展會、路演必備。', descriptionEn: 'Portable roll-up banner stands, easy to install. Essential for exhibitions and roadshows.', descriptionJa: 'ポータブルロールアップバナースタンド、設置簡単。展示会やロードショーに必須。', description_zh: '便攜易拉寶展架，安裝簡便。展會、路演必備。',
    features: [
      '單人快裝快收，便於攜帶',
      '多款寬幅與高度可選',
      '畫面可換芯重複使用支架',
      '防捲邊與不反光材可選',
      '適合展會、路演、門市',
      '印前安全區與出血標示協助',
      '可加硬殼包材便於物流',
    ],
    specs: {
      material: 'PET／PVC 片或防水合成紙；鋁合金支架',
      size: '常見 850×2000mm 至 1200×3000mm 級',
      printMethod: '噴繪或 UV 印刷（依材）',
      finishing: '加重桿、牛津布袋／硬殼箱（可選）',
    },
    price_range: 'HK$85-300/套',
    basePrice: 85,
    basePrice_en: 46.0,
    basePrice_ja: 6440,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-zh-hk-hero.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-zh-hk-detail.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-zh-hk-variety.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-en-hero.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-en-detail.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-en-variety.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-ja-hero.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-ja-detail.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-ja-variety.webp', '/images/products/v28_5/roll-up-banners/zprintpro-banners-roll-up-banners-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(850×2000mm)', multiplier: 1 },
        { value: 'medium', label: '中號(1000×2500mm)', multiplier: 1.5 },
        { value: 'large', label: '大號(1200×3000mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'vinyl', label: '防水帆布', surcharge: 0 },
        { value: 'mesh', label: '網孔布', surcharge: 30 },
        { value: 'fabric', label: '旗幟布', surcharge: 50 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'eyelets', label: '打孔', surcharge: 20 },
        { value: 'pole-pocket', label: '穿杆袋', surcharge: 30 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 5, label: '5張', discount: 0.8 },
        { value: 10, label: '10張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-banners-roll-up-banners-zh-hk.webp', en: 'zprintpro-banners-roll-up-banners-en.webp', ja: 'zprintpro-banners-roll-up-banners-ja.webp' },
    alt: {
      'zh-hk': '噴繪印刷 / 易拉寶 / 戶外橫幅 | 香港易拉寶印刷 PET／PVC 片 加重桿',
      en: 'Banner Printing / Roll-up / X-Stand | Roll-up Banners | Professional Banners Online',
      ja: 'バナー印刷 / ロールアップ / 屋外 | ロールアップバナー | 屋外耐久・防炎加工対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BN-003',
    sku_code: 'BN-003',
    slug: 'adhesive-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '背膠噴繪 | 易拉寶 / 戶外橫幅 / 噴繪', nameEn: 'Adhesive Banners | Roll-up & Outdoor Banners', nameJa: '粘着バナー | ロールアップバナー / 屋外バナー', title_zh: '背膠噴繪',
    description: '自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。', descriptionEn: 'Self-adhesive, can be directly applied to walls or glass.', descriptionJa: '自己粘着、壁やガラスに直接貼付可能。', description_zh: '自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。',
    features: [
      '多種膠性：永久、可移、透明',
      '大幅面無縫或低縫拼接',
      '適合櫥窗、牆面、活動背板',
      '可霧面抗反光處理',
      '印前導氣槽與裁切線協助',
      '短期撤展可移膠方案',
      '按平方米計價',
    ],
    specs: {
      material: 'PVC 車貼／可移膠／透明膜（依場景）',
      size: '按客製長寬平方米計',
      printMethod: '溶劑／弱溶劑／UV 噴繪',
      finishing: '霧面護膜、異形裁切（可選）',
    },
    price_range: 'HK$10-45/平方米',
    basePrice: 10,
    basePrice_en: 2.3,
    basePrice_ja: 300,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-zh-hk-hero.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-zh-hk-detail.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-zh-hk-variety.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-en-hero.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-en-detail.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-en-variety.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-ja-hero.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-ja-detail.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-ja-variety.webp', '/images/products/v28_5/adhesive-banners/zprintpro-banners-adhesive-banners-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(850×2000mm)', multiplier: 1 },
        { value: 'medium', label: '中號(1000×2500mm)', multiplier: 1.5 },
        { value: 'large', label: '大號(1200×3000mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'vinyl', label: '防水帆布', surcharge: 0 },
        { value: 'mesh', label: '網孔布', surcharge: 30 },
        { value: 'fabric', label: '旗幟布', surcharge: 50 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'eyelets', label: '打孔', surcharge: 20 },
        { value: 'pole-pocket', label: '穿杆袋', surcharge: 30 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 5, label: '5張', discount: 0.8 },
        { value: 10, label: '10張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-banners-adhesive-banners-zh-hk.webp', en: 'zprintpro-banners-adhesive-banners-en.webp', ja: 'zprintpro-banners-adhesive-banners-ja.webp' },
    alt: {
      'zh-hk': '噴繪印刷 / 易拉寶 / 戶外橫幅 | 香港背膠噴繪印刷 PVC 車貼／可移膠／透明膜（依場景） 霧面護膜',
      en: 'Banner Printing / Roll-up / X-Stand | Adhesive Banners | Professional Banners Online',
      ja: 'バナー印刷 / ロールアップ / 屋外 | 粘着バナー | 屋外耐久・防炎加工対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BN-004',
    sku_code: 'BN-004',
    slug: 'vehicle-wraps',
    category: 'banners',
    category_slug: 'banners',
    name: '車身廣告 | 易拉寶 / 戶外橫幅 / 噴繪', nameEn: 'Vehicle Wraps | Roll-up & Outdoor Banners', nameJa: 'カーラッピング | ロールアップバナー / 屋外バナー', title_zh: '車身廣告',
    description: '專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。', descriptionEn: 'Specialized vehicle wrap vinyl, strong weather resistance, no residue when removed.', descriptionJa: '専用車体ラップビニール、強い耐候性、剥がしても残りません。', description_zh: '專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。',
    features: [
      '【鑄造級 PVC】80–100 微米，柔韌貼合車身曲面',
      '【導氣槽底紙】貼附無氣泡，轉角不起翹',
      '【可移除背膠】移除不殘膠，保護原廠烤漆',
      '【2–3 年戶外耐候】UV 固化油墨，抗紫外線與酸雨',
      '【三種方案】整車包膜／局部拉花／後擋單透貼',
      '【3M／Avery 升級】品牌材質可選，質感與耐久雙提升',
      '【免費版型】印前車型模板與導氣模擬，確保精準貼合',
    ],
    specs: {
      material: '鑄造級 PVC 車貼 80–100 微米；可移膠＋導氣槽',
      size: '依車型版型，常見轎車約 15–20 平方米',
      printMethod: 'UV 固化或環保溶劑大判噴繪',
      finishing: '亮面／啞面覆膜、單透孔、3M／Avery 品牌升級',
    },
    price_range: 'HK$28-120/平方米',
    basePrice: 28,
    basePrice_en: 6.44,
    basePrice_ja: 840,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 1,
    images: ['/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-zh-hk-hero.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-zh-hk-detail.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-zh-hk-variety.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-en-hero.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-en-detail.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-en-variety.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-ja-hero.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-ja-detail.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-ja-variety.webp', '/images/products/v28_5/vehicle-wraps/zprintpro-banners-vehicle-wraps-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(850×2000mm)', multiplier: 1 },
        { value: 'medium', label: '中號(1000×2500mm)', multiplier: 1.5 },
        { value: 'large', label: '大號(1200×3000mm)', multiplier: 2.2 },
      ],
      materials: [
        { value: 'vinyl', label: '防水帆布', surcharge: 0 },
        { value: 'mesh', label: '網孔布', surcharge: 30 },
        { value: 'fabric', label: '旗幟布', surcharge: 50 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'eyelets', label: '打孔', surcharge: 20 },
        { value: 'pole-pocket', label: '穿杆袋', surcharge: 30 },
      ],
      quantities: [
        { value: 1, label: '1張', discount: 1 },
        { value: 5, label: '5張', discount: 0.8 },
        { value: 10, label: '10張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-banners-vehicle-wraps-zh-hk.webp', en: 'zprintpro-banners-vehicle-wraps-en.webp', ja: 'zprintpro-banners-vehicle-wraps-ja.webp' },
    alt: {
      'zh-hk': '噴繪印刷 / 易拉寶 / 戶外橫幅 | 香港車身廣告印刷 鑄造級 PVC 車貼 80–100 微米 亮面／啞面覆膜',
      en: 'Banner Printing / Roll-up / X-Stand | Vehicle Wraps | Professional Banners Online',
      ja: 'バナー印刷 / ロールアップ / 屋外 | カーラッピング | 屋外耐久・防炎加工対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 書籍印刷 (5 SKU)
  {
    id: 'BK-001',
    sku_code: 'BK-001',
    slug: 'catalog-printing',
    category: 'books',
    category_slug: 'books',
    name: '香港畫冊印刷 / Bulk Catalog Printing / Wholesale Book Supplier — 攝影集 / 展覽圖錄 / 產品型錄', nameEn: 'Custom Bulk Catalog Printing / Wholesale Book Supplier | Photo Books, Lookbooks, Product Catalogs', nameJa: 'カタログ印刷 / 大量印刷 / 卸売サプライヤー | 寫真集・作品集・プロダクトカタログ', title_zh: '香港畫冊印刷 / Bulk Catalog Printing 10本起 · 全球配送 DHL 2-4天',
    description: '香港畫冊/攝影集/產品型錄印刷服務，色彩還原度達 95%+。適合藝術展覽圖錄、品牌作品集、攝影集、企業年報、珍藏紀念冊。10 本起印，48 小時香港本地速遞。適用行業：藝術畫廊、品牌企業、婚慶攝影、教育院校、餐飲食品、美妝護膚、文創IP、政企機構。', descriptionEn: 'Catalog, photo book & exhibition lookbook printing with 95%+ color accuracy. Ideal for art exhibition lookbooks, brand portfolios, photography books, annual reports, keepsake albums. 10 MOQ, free design mockup, 30-second AI quote. Ideal for art galleries, brand portfolios, wedding photography, education, F&B, cosmetics, IP merchandise, and government/corporate publications.', descriptionJa: 'カタログ・寫真集・作品集印刷サービス、色再現性95%+。美術展作品集、ブランドポートフォリオ、寫真集、企業年報、記念アルバムに最適。10冊〜、無料デザインモックアップ、30秒 AI 見積もり。美術ギャラリー、ブランド、結婚式写真、教育機関、飲食、コスメ、同人、官公庁・企業出版物に最適。', description_zh: '香港畫冊/攝影集/產品型錄印刷服務，色彩還原度達 95%+。適合藝術展覽圖錄、品牌作品集、攝影集、企業年報、珍藏紀念冊。10 本起印，48 小時香港本地速遞。適用行業：藝術畫廊、品牌企業、婚慶攝影、教育院校、餐飲食品、美妝護膚、文創IP、政企機構。',
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【封面覆膜或燙金】品牌質感提升',
      '【免費排版】目錄、頁碼與章節標註',
      '【10本起訂】小批量數碼，大量柯式',
      '【節慶檔期】Q4為高峰期，建議提早確認'
    ],
    specs: {
      material: '內頁157g–200g銅版紙；封面200g–250g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膜／光膜）、燙金、騎馬釘或膠裝',
    },
    price_range: 'HK$2.8-1000/本',
    basePrice: 24,
    basePrice_en: 4.6,
    basePrice_ja: 644,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-zh-hk-hero.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-zh-hk-detail.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-zh-hk-variety.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-en-hero.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-en-detail.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-en-variety.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-ja-hero.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-ja-detail.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-ja-variety.webp', '/images/products/v28_5/catalog-printing/zprintpro-books-catalog-printing-ja-multi-angle.webp']
  },
    optimizedAt: '2026-09-14',
    optimizationRound: 1,
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-catalog-printing-zh-hk.webp', en: 'zprintpro-books-catalog-printing-en.webp', ja: 'zprintpro-books-catalog-printing-ja.webp' },
    alt: {
      'zh-hk': '香港畫冊印刷印刷 內頁157g–200g銅版紙 覆膜（啞膜／光膜）',
      en: 'Catalog Printing | Professional Books Online',
      ja: 'カタログ印刷 | 無線綴じ・中綴じ対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    // 2026-08-24 v3.17 B3 批 1 改写: 4 词 cluster (catalog book + china catalog + catalog printing china + bulk catalog) + bulk/wholesale 段 + 4 FAQ (4 词 / 4 binding / 4 paper / 4 size)
    variables: {
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100本', discount: 1 },
        { value: 500, label: '500本', discount: 0.85 },
        { value: 1000, label: '1000本', discount: 0.75 },
      ],
    },
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BK-002',
    sku_code: 'BK-002',
    slug: 'saddle-stitch-booklets',
    category: 'books',
    category_slug: 'books',
    name: '香港騎馬釘小冊子印刷訂製 / 騎馬釘書刊 / 騎馬釘印刷 — 目錄/雜誌/練習冊 10 本起', nameEn: 'Saddle Stitch Booklet Printing | Custom Catalogs 10 Copies MOQ | US$1.84-7.36/pc', nameJa: '中綴じ冊子印刷 / 騎馬釘書刊 — カタログ・雑誌・ドリル 10冊から', title_zh: '騎馬釘小冊子印刷訂製 / 騎馬釘書刊 / 騎馬釘印刷 — 目錄/雜誌/練習冊 10 本起',
    description: '騎馬釘小冊子印刷訂製 / 騎馬釘書刊 / 騎馬釘印刷，企業文化手冊、活動場刊、文學作品集、學校練習冊首選。8-64 頁可平攤 180°翻閱。MOQ 10 本（vs Alibaba 黃頁 500+）、30 秒 AI 即時報價（vs 郵件詢盤 2 天）、DHL 全球 2-4 天（vs 海運 3-4 週）。HK$6-32/pc。適用行業：餐飲外賣、零售精品、教育培訓、婚慶、文創IP、寵物、母嬰、茶飲食品、物流快遞、服裝。', descriptionEn: 'Saddle stitch booklet printing 10-copy MOQ (vs Alibaba yellow pages 500+), 30-second AI instant quote (vs 2-day email inquiry), DHL 2-4 day global delivery (vs 3-4 week sea freight). 8-64 pages, lays flat at 180°, uniform paper weight. US$1.84-7.36/pc. Ideal for F&B, retail, education, wedding, IP merchandise, pet, baby & mom, tea & beverage, logistics, apparel, and cross-border e-commerce brands.', descriptionJa: '中綴じ冊子印刷 10冊 MOQ（Alibaba 黄頁 500+ 相比）、30秒 AI 即時見積もり（メール 2日 相比）、DHL グローバル 2-4日（海上 3-4週 相比）。8-64頁、180°フラット開き、均一紙厚。¥258-1030/個。飲食・小売・教育・結婚式・同人・ペット・ベビー・茶飲・物流・アパレル・越境EC業界に最適。', description_zh: '騎馬釘小冊子印刷訂製 / 騎馬釘書刊 / 騎馬釘印刷，企業文化手冊、活動場刊、文學作品集、學校練習冊首選。8-64 頁可平攤 180°翻閱。MOQ 10 本（vs Alibaba 黃頁 500+）、30 秒 AI 即時報價（vs 郵件詢盤 2 天）、DHL 全球 2-4 天（vs 海運 3-4 週）。HK$6-32/pc。適用行業：餐飲外賣、零售精品、教育培訓、婚慶、文創IP、寵物、母嬰、茶飲食品、物流快遞、服裝。',
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【騎馬釘裝訂】8–64頁薄本，經濟實惠',
      '【免費排版】目錄、頁碼與章節標註',
      '【10本起訂】小批量數碼，大量柯式',
      '【節慶檔期】Q4為高峰期，建議提早確認'
    ],
    specs: {
      material: '128g–157g銅版紙或書紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '騎馬釘裝訂、覆膜（可選）',
    },
    price_range: 'HK$6-32/本',
    basePrice: 6,
    basePrice_en: 1.84,
    basePrice_ja: 258,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-zh-hk-hero.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-zh-hk-detail.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-zh-hk-variety.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-en-hero.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-en-detail.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-en-variety.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-ja-hero.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-ja-detail.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-ja-variety.webp', '/images/products/v28_5/saddle-stitch-booklets/zprintpro-books-saddle-stitch-booklets-ja-multi-angle.webp']
  },
    optimizedAt: '2026-09-14',
    optimizationRound: 1,
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 1 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1.5 },
        { value: 'b5', label: 'B5 (176×250mm)', multiplier: 1.3 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 20 },
        { value: '128g', label: '128g銅版紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'perfect', label: '膠裝', surcharge: 30 },
        { value: 'hardcover', label: '精裝', surcharge: 100 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-saddle-stitch-booklets-zh-hk.webp', en: 'zprintpro-books-saddle-stitch-booklets-en.webp', ja: 'zprintpro-books-saddle-stitch-booklets-ja.webp' },
    alt: {
      'zh-hk': '香港騎馬釘小冊子印刷 128g–157g銅版紙 騎馬釘裝訂',
      en: 'Saddle Stitch Booklets | Professional Books Online',
      ja: '中綴じ冊子 | 無線綴じ・中綴じ対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BK-003',
    sku_code: 'BK-003',
    slug: 'perfect-bound-books',
    category: 'books',
    category_slug: 'books',
    name: '香港無線膠裝書籍 — 學術論文集 / 年度報告 / CSR 社會責任報告 / 文學作品集', nameEn: 'Perfect-Bound Books for Academic Papers, Annual Reports & CSR Publications', nameJa: '無線綴じ書籍 — 學術論文集・年次報告書・CSR レポート・文學作品集', title_zh: '香港無線膠裝書籍 — 學術論文集 / 年度報告 / CSR 社會責任報告 / 文學作品集',
    description: '無線膠裝書籍印刷，學術論文集、年度報告、CSR 社會責任報告、文學作品集首選。48-400 頁，書脊平整牢固，可印書名/條碼/ISBN。適用行業：教育培訓、金融證券、房地產、醫藥保健、政企機構、物流服裝、餐飲零售。', descriptionEn: 'Perfect-bound book printing for academic papers, annual reports, CSR reports, literary collections. 48-400 pages, sturdy flat spine, can print title/barcode/ISBN for archival quality. Ideal for education, finance & securities, real estate, pharma & healthcare, government, logistics & apparel, F&B, and retail publications.', descriptionJa: '無線綴じ書籍印刷、學術論文集、年次報告書、CSR レポート、文學作品集に最適。48-400頁、堅牢な背表紙、書名・バーコード・ISBN印刷対応、長期保存可。教育・金融・不動産・医薬・官公庁・物流・アパレル・飲食・小売業界の出版物に最適。', description_zh: '無線膠裝書籍印刷，學術論文集、年度報告、CSR 社會責任報告、文學作品集首選。48-400 頁，書脊平整牢固，可印書名/條碼/ISBN。適用行業：教育培訓、金融證券、房地產、醫藥保健、政企機構、物流服裝、餐飲零售。',
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【膠裝書脊】平整牢固，48頁以上適用',
      '【免費排版】目錄、頁碼與章節標註',
      '【10本起訂】小批量數碼，大量柯式',
      '【節慶檔期】Q4為高峰期，建議提早確認'
    ],
    specs: {
      material: '內頁157g–200g銅版紙；封面200g–250g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色柯式印刷',
      finishing: '膠裝、封面覆膜（啞膜／光膜）',
    },
    price_range: 'HK$16-80/本',
    basePrice: 16,
    basePrice_en: 4.6,
    basePrice_ja: 644,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-zh-hk-hero.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-zh-hk-detail.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-zh-hk-variety.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-en-hero.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-en-detail.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-en-variety.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-ja-hero.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-ja-detail.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-ja-variety.webp', '/images/products/v28_5/perfect-bound-books/zprintpro-books-perfect-bound-books-ja-multi-angle.webp']
  },
    optimizedAt: '2026-09-14',
    optimizationRound: 1,
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 1 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1.5 },
        { value: 'b5', label: 'B5 (176×250mm)', multiplier: 1.3 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 20 },
        { value: '128g', label: '128g銅版紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'perfect', label: '膠裝', surcharge: 30 },
        { value: 'hardcover', label: '精裝', surcharge: 100 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-perfect-bound-books-zh-hk.webp', en: 'zprintpro-books-perfect-bound-books-en.webp', ja: 'zprintpro-books-perfect-bound-books-ja.webp' },
    alt: {
      'zh-hk': '香港無線膠裝書籍印刷 內頁157g–200g銅版紙 膠裝',
      en: 'Perfect Bound Books | Professional Books Online',
      ja: '無線綴じ本 | 無線綴じ・中綴じ対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BK-004',
    sku_code: 'BK-004',
    slug: 'hardcover-books',
    category: 'books',
    category_slug: 'books',
    name: '香港精裝書籍 — 婚慶紀念書 / 家族史冊 / 畢業紀念冊 / 校友會刊', nameEn: 'Hardcover Books for Wedding Albums, Family Histories & Graduation Yearbooks', nameJa: 'ハードカバー書籍 — 結婚記念アルバム・家族史・卒業記念アルバム・同窓会誌', title_zh: '香港精裝書籍 — 婚慶紀念書 / 家族史冊 / 畢業紀念冊 / 校友會刊',
    description: '精裝書籍印刷，婚慶紀念書、家族史冊、畢業紀念冊、校史特刊首選。2.5mm 灰紙板封面硬挺高檔，可加燙金書名與絲帶書籤。適用行業：婚慶、教育院校、企業品牌、文創IP、攝影、藝術展覽、政企機構、酒店民宿。', descriptionEn: 'Hardcover book printing for wedding albums, family histories, graduation yearbooks, school anniversary publications. 2.5mm gray board cover with foil-stamped titles and ribbon bookmarks. Ideal for weddings, education, corporate branding, IP merchandise, photography, art exhibitions, government & organizations, and hospitality.', descriptionJa: 'ハードカバー書籍印刷、結婚記念アルバム、家族史、卒業記念アルバム、校史特刊に最適。2.5mm 厚紙ボード表紙、箔押しタイトルとリボン栞付き。結婚式、教育機関、企業ブランド、同人・IP、写真、アート展示、官公庁・団体、ホテル・宿泊業界に最適。', description_zh: '精裝書籍印刷，婚慶紀念書、家族史冊、畢業紀念冊、校史特刊首選。2.5mm 灰紙板封面硬挺高檔，可加燙金書名與絲帶書籤。適用行業：婚慶、教育院校、企業品牌、文創IP、攝影、藝術展覽、政企機構、酒店民宿。',
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【硬紙板封面】高檔精裝，畫冊年鑑首選',
      '【免費排版】目錄、頁碼與章節標註',
      '【10本起訂】小批量數碼，大量柯式',
      '【節慶檔期】Q4為高峰期，建議提早確認'
    ],
    specs: {
      material: '硬紙板封面裱糊銅版紙；內頁157g–200g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色柯式印刷',
      finishing: '膠裝、燙金、壓凹、局部UV、封面覆膜',
    },
    price_range: 'HK$40-240/本',
    basePrice: 40,
    basePrice_en: 13.8,
    basePrice_ja: 1932,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    optimizedAt: '2026-09-16',
    optimizationRound: 1,
    images: ['/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-zh-hk-hero.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-zh-hk-detail.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-zh-hk-variety.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-en-hero.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-en-detail.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-en-variety.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-ja-hero.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-ja-detail.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-ja-variety.webp', '/images/products/v28_5/hardcover-books/zprintpro-books-hardcover-books-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 1 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1.5 },
        { value: 'b5', label: 'B5 (176×250mm)', multiplier: 1.3 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 20 },
        { value: '128g', label: '128g銅版紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'perfect', label: '膠裝', surcharge: 30 },
        { value: 'hardcover', label: '精裝', surcharge: 100 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
      filename: { 'zh-hk': 'zprintpro-books-hardcover-books-zh-hk.webp', en: 'zprintpro-books-hardcover-books-en.webp', ja: 'zprintpro-books-hardcover-books-ja.webp' },
      alt: {
        'zh-hk': '香港精裝書籍 - 精裝書籍印刷，婚慶紀念書、家族史冊、畢業紀念冊、校史特刊首選。2.5mm 灰紙板封面硬挺高檔，可加燙金書名與絲帶書籤。',
        en: 'Hardcover Books - Premium hardcover book printing for wedding albums, family histories, graduation yearbooks, school anniversary publications. 2.5mm gray board cover with foil-stamped titles and ribbon bookmarks.',
        ja: 'Hardcover Books - ハードカバー書籍印刷、結婚記念アルバム、家族史、卒業記念アルバム、校史特刊に最適。2.5mm 厚紙ボード表紙、箔押しタイトルとリボン栞付き。',
      },
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'BK-005',
    sku_code: 'BK-005',
    slug: 'spiral-notebooks',
    category: 'books',
    category_slug: 'books',
    name: '香港線圈筆記本 — 企業禮品 / 補習社教材 / 活頁筆記本 / 校園紀念本', nameEn: 'Spiral Notebooks for Corporate Gifts, Training Materials & School Mementos', nameJa: 'スパイラルノート — 企業ギフト・研修教材・スクール記念・リングノート', title_zh: '香港線圈筆記本 — 企業禮品 / 補習社教材 / 活頁筆記本 / 校園紀念本',
    description: '線圈筆記本印刷，企業禮品、補習社教材、培訓手冊、校園紀念本首選。金屬/塑料 YO 圈可拆卸重組，10 本起印。', descriptionEn: 'Spiral notebook printing for corporate gifts, training materials, school mementos, classroom supplies. Metal/plastic YO rings, pages fully removable, 10 MOQ.', descriptionJa: 'スパイラルノート印刷、企業ギフト、研修教材、學校記念品、教材用に最適。金属・プラスチック YO リングでページ交換可能、10冊〜。', description_zh: '線圈筆記本印刷，企業禮品、補習社教材、培訓手冊、校園紀念本首選。金屬/塑料 YO 圈可拆卸重組，10 本起印。',
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【YO圈／螺旋裝訂】180度平攤，書寫順暢',
      '【免費排版】目錄、頁碼與章節標註',
      '【10本起訂】小批量數碼，大量柯式',
      '【節慶檔期】Q4為高峰期，建議提早確認'
    ],
    specs: {
      material: '內頁80g–100g書紙或道林紙；封面200g銅版紙或PP',
      size: 'A5（148×210mm）或B5（176×250mm）',
      printMethod: '四色數碼印刷',
      finishing: 'YO圈或螺旋裝訂、封面覆膜',
    },
    price_range: 'HK$8-40/本',
    basePrice: 8,
    basePrice_en: 2.76,
    basePrice_ja: 386,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-zh-hk-hero.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-zh-hk-detail.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-zh-hk-variety.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-en-hero.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-en-detail.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-en-variety.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-ja-hero.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-ja-detail.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-ja-variety.webp', '/images/products/v28_5/spiral-notebooks/zprintpro-books-spiral-notebooks-ja-multi-angle.webp']
  },
    variables: {
      sizes: [
        { value: 'a5', label: 'A5 (148×210mm)', multiplier: 1 },
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1.5 },
        { value: 'b5', label: 'B5 (176×250mm)', multiplier: 1.3 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 20 },
        { value: '128g', label: '128g銅版紙', surcharge: 40 },
      ],
      finishings: [
        { value: 'saddle', label: '騎馬釘', surcharge: 0 },
        { value: 'perfect', label: '膠裝', surcharge: 30 },
        { value: 'hardcover', label: '精裝', surcharge: 100 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-spiral-notebooks-zh-hk.webp', en: 'zprintpro-books-spiral-notebooks-en.webp', ja: 'zprintpro-books-spiral-notebooks-ja.webp' },
    alt: {
      'zh-hk': '香港線圈筆記本印刷 內頁80g–100g書紙 YO圈或螺旋裝訂',
      en: 'Spiral Notebooks | Professional Books Online',
      ja: 'リングノート | 無線綴じ・中綴じ対応 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 信封印刷 (4 SKU)
  {
    id: 'EV-001',
    sku_code: 'EV-001',
    slug: 'business-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '公司信封 | 信封 / 牛皮信封 / 開窗', nameEn: 'Business Envelopes | Envelopes & Kraft', nameJa: 'ビジネス封筒 | 封筒 / クラフト封筒 / 窓付き', title_zh: '公司信封',
    description: '定製公司信封，印上Logo和地址。專業形象，商務必備。', descriptionEn: 'Custom business envelopes with logo and address. Professional image, essential for business.', descriptionJa: 'カスタムビジネス封筒、ロゴと住所を印刷。プロフェッショナルなイメージ。', description_zh: '定製公司信封，印上Logo和地址。專業形象，商務必備。',
    features: [
      'Logo、地址、合規字樣一體排版',
      '可選開窗或全封無窗',
      '書紙克重可依郵寄厚度調整',
      '適合機械封裝與大量郵寄',
      '單色公函至四色品牌款皆可',
      '印前郵資區與條碼留白提示',
      '與信紙、卡片色系可對齊',
    ],
    specs: {
      material: '80–120g 書紙／本白書紙',
      size: 'DL／C5／C4 等常用規格',
      printMethod: '單色至四色柯式或數碼',
      finishing: '自黏封口、開窗貼片（可選）',
    },
    price_range: 'HK$0.22-1.80/個',
    basePrice: 0.22,
    basePrice_en: 0.14,
    basePrice_ja: 20,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-zh-hk-hero.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-zh-hk-detail.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-zh-hk-variety.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-en-hero.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-en-detail.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-en-variety.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-ja-hero.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-ja-detail.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-ja-variety.webp', '/images/products/v28_5/business-envelopes/zprintpro-envelopes-business-envelopes-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-business-envelopes-zh-hk.webp', en: 'zprintpro-envelopes-business-envelopes-en.webp', ja: 'zprintpro-envelopes-business-envelopes-ja.webp' },
    alt: {
      'zh-hk': '信封印刷 / 牛皮信封 / 企業LOGO | 香港公司信封印刷 80–120g 書紙／本白書紙 自黏封口',
      en: 'Envelope Printing / Kraft / Business | Business Envelopes | Professional Envelopes Online',
      ja: '封筒印刷 / クラフト / 企業 | ビジネス封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
    },
  },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'EV-002',
    sku_code: 'EV-002',
    slug: 'colored-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '彩色信封 | 信封 / 牛皮信封 / 開窗', nameEn: 'Colored Envelopes | Envelopes & Kraft', nameJa: 'カラー封筒 | 封筒 / クラフト封筒 / 窓付き', title_zh: '彩色信封',
    description: '彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件。', descriptionEn: 'Colorful printing, strong visual appeal. Perfect for invitations, greeting cards.', descriptionJa: 'カラフルな印刷、強い視覚的アピール。招待状、グリーティングカードに最適。', description_zh: '彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件。',
    features: [
      '四色／專色還原插畫與品牌色',
      '彩色紙或白底滿版皆可',
      '自黏封口便於大量封裝',
      'DL／C5／C4 多規格',
      '適合邀請、賀卡、營銷郵件',
      '深色稿耐磨與邊緣檢查建議',
      '可與喜帖／卡片同批對色',
    ],
    specs: {
      material: '80–120g 書紙／彩色書紙',
      size: 'DL、C5、C4（變數可選）',
      printMethod: '柯式四色＋可選專色',
      finishing: '開窗、自黏封口（變數可選）',
    },
    price_range: 'HK$0.38-2.60/個',
    basePrice: 0.38,
    basePrice_en: 0.18,
    basePrice_ja: 25,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-zh-hk-hero.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-zh-hk-detail.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-zh-hk-variety.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-en-hero.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-en-detail.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-en-variety.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-ja-hero.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-ja-detail.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-ja-variety.webp', '/images/products/v28_5/colored-envelopes/zprintpro-envelopes-colored-envelopes-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-colored-envelopes-zh-hk-1.webp', en: 'zprintpro-envelopes-colored-envelopes-en-1.webp', ja: 'zprintpro-envelopes-colored-envelopes-ja-1.webp' },
    alt: {
      'zh-hk': '信封印刷 / 牛皮信封 / 企業LOGO | 香港彩色信封印刷 120g雙膠紙 四色印刷',
      en: 'Envelope Printing / Kraft / Business | Colored Envelopes Printing 120g Offset Paper 4-Color',
      ja: '封筒印刷 / クラフト / 企業 | カラー封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'dl', label: 'DL (110×220mm)', multiplier: 1 },
        { value: 'c5', label: 'C5 (162×229mm)', multiplier: 1.3 },
        { value: 'c4', label: 'C4 (229×324mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無窗口', surcharge: 0 },
        { value: 'window', label: '有窗口', surcharge: 15 },
        { value: 'peel', label: '自黏封口', surcharge: 10 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'EV-003',
    sku_code: 'EV-003',
    slug: 'large-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '大號信封 | 信封 / 牛皮信封 / 開窗', nameEn: 'Large Envelopes | Envelopes & Kraft', nameJa: '大判封筒 | 封筒 / クラフト封筒 / 窓付き', title_zh: '大號信封',
    description: 'A4尺寸大信封，可裝入文件、合同。辦公室必備。', descriptionEn: 'A4 size large envelopes, can hold documents and contracts. Office essential.', descriptionJa: 'A4サイズの大きな封筒、書類や契約書を入れられます。オフィスに必須。', description_zh: 'A4尺寸大信封，可裝入文件、合同。辦公室必備。',
    features: [
      '可平放 A4，減少折痕',
      '較高克重提升多頁承重',
      '封口膠型可選',
      '適合合同、標書、公文',
      '可諮詢保密內印',
      '機械封裝厚度建議',
      '與文件夾色系可統一',
    ],
    specs: {
      material: '100–120g 書紙為主（可諮詢）',
      size: 'C4（229×324mm）等',
      printMethod: '單色至四色',
      finishing: '自黏封口、開窗（可選）',
    },
    price_range: 'HK$0.60-3.40/個',
    basePrice: 0.60,
    basePrice_en: 0.28,
    basePrice_ja: 39,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-zh-hk-hero.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-zh-hk-detail.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-zh-hk-variety.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-en-hero.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-en-detail.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-en-variety.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-ja-hero.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-ja-detail.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-ja-variety.webp', '/images/products/v28_5/large-envelopes/zprintpro-envelopes-large-envelopes-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-large-envelopes-zh-hk-1.webp', en: 'zprintpro-envelopes-large-envelopes-en-1.webp', ja: 'zprintpro-envelopes-large-envelopes-ja-1.webp' },
    alt: {
      'zh-hk': '信封印刷 / 牛皮信封 / 企業LOGO | 香港大號信封印刷 150g牛皮紙 耐用厚實',
      en: 'Envelope Printing / Kraft / Business | Large Envelopes Printing 150g Kraft Paper Durable',
      ja: '封筒印刷 / クラフト / 企業 | 大判封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'dl', label: 'DL (110×220mm)', multiplier: 1 },
        { value: 'c5', label: 'C5 (162×229mm)', multiplier: 1.3 },
        { value: 'c4', label: 'C4 (229×324mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無窗口', surcharge: 0 },
        { value: 'window', label: '有窗口', surcharge: 15 },
        { value: 'peel', label: '自黏封口', surcharge: 10 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'EV-004',
    sku_code: 'EV-004',
    slug: 'pearl-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '珠光信封 | 信封 / 牛皮信封 / 開窗', nameEn: 'Pearl Envelopes | Envelopes & Kraft', nameJa: 'パール封筒 | 封筒 / クラフト封筒 / 窓付き', title_zh: '珠光信封',
    description: '珠光紙張，閃耀質感。適合婚禮邀請、高端活動。', descriptionEn: 'Pearl paper, shimmering quality. Perfect for wedding invitations, high-end events.', descriptionJa: 'パール紙、輝く質感。結婚式の招待状、高級イベントに最適。', description_zh: '珠光紙張，閃耀質感。適合婚禮邀請、高端活動。',
    features: [
      '珠光質感，禮儀場景吸睛',
      '適合婚禮與高端活動郵寄',
      '可搭細線燙金或凹凸',
      '專色與簡潔線稿更顯層次',
      '多規格 DL／C5／C4',
      '實紙打樣確認珠光走向',
      '與喜帖／卡紙可同色系',
    ],
    specs: {
      material: '珠光／冰白特種書紙',
      size: 'DL、C5、C4（變數可選）',
      printMethod: '四色／專色＋可選燙金',
      finishing: '自黏封口、開窗、擊凸（可選）',
    },
    price_range: 'HK$1.15-5.20/個',
    basePrice: 1.15,
    basePrice_en: 0.46,
    basePrice_ja: 64,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-zh-hk-hero.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-zh-hk-detail.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-zh-hk-variety.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-en-hero.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-en-detail.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-en-variety.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-ja-hero.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-ja-detail.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-ja-variety.webp', '/images/products/v28_5/pearl-envelopes/zprintpro-envelopes-pearl-envelopes-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-pearl-envelopes-zh-hk-1.webp', en: 'zprintpro-envelopes-pearl-envelopes-en-1.webp', ja: 'zprintpro-envelopes-pearl-envelopes-ja-1.webp' },
    alt: {
      'zh-hk': '信封印刷 / 牛皮信封 / 企業LOGO | 香港珠光信封印刷 120g珠光紙 高檔質感',
      en: 'Envelope Printing / Kraft / Business | Pearl Envelopes Printing 120g Pearl Paper Premium',
      ja: '封筒印刷 / クラフト / 企業 | パール封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'dl', label: 'DL (110×220mm)', multiplier: 1 },
        { value: 'c5', label: 'C5 (162×229mm)', multiplier: 1.3 },
        { value: 'c4', label: 'C4 (229×324mm)', multiplier: 1.8 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無窗口', surcharge: 0 },
        { value: 'window', label: '有窗口', surcharge: 15 },
        { value: 'peel', label: '自黏封口', surcharge: 10 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // 校園教育印刷 (4 SKU)
  {
    id: 'ED-001',
    sku_code: 'ED-001',
    slug: 'exercise-books',
    category: 'educational',
    category_slug: 'educational',
    name: 'Exercise Book Printing School Programs | K12 練習簿 / 學年作業本 / Tutoring Centers / Custom School Programs', nameEn: 'School Exercise Book Printing | K12 Workbooks & School Textbook Printing', nameJa: '練習帳印刷 — 補習校教材・K12 練習帳・學年内ノート・學校オーダー', title_zh: '香港練習簿印刷 / School Exercise Book Printing — MOQ 10 30秒AI報價 DHL 2-4天',
    description: 'School exercise book printing 練習簿印刷服務, 補習社教材、K12 練習簿、學年作業本、校園訂製首選。書紙/道林紙輕薄不反光, 內頁可加方格/橫線/空白。適用行業：教育培訓、校園、補習社、K12 學校、海外教育部門、職業培訓。', descriptionEn: 'School exercise book printing service — 10 book MOQ (vs Alibaba yellow pages 500+ MOQ), 30-second AI quote (vs 2-day email inquiry), DHL 2-4 day global delivery (vs 3-4 week sea freight). Africa/Middle East/Southeast Asia education ministries, tutoring centers, K12 schools. Custom school textbook printing, grade-level workbooks. Ideal for education & training, K12 schools, tutoring centers, ministries of education, and vocational training.', descriptionJa: '練習帳印刷サービス、補習校教材、K12 練習帳、學年別教材、學校オリジナル製作に最適。上質紙・薄手で反射防止、内側罫線（マス・横罫・無地）選択可。教育・研修、K12 学校、学習塾、教育省、職業訓練業界に最適。', description_zh: 'School exercise book printing 練習簿印刷服務, 補習社教材、K12 練習簿、學年作業本、校園訂製首選。書紙/道林紙輕薄不反光, 內頁可加方格/橫線/空白。適用行業：教育培訓、校園、補習社、K12 學校、海外教育部門、職業培訓。',
    features: [
      '【80g–100g書紙或道林紙】書寫流暢，不滲墨',
      '【四色印刷】封面色彩鮮豔，內頁清晰',
      '【騎馬釘或膠裝】牢固耐用，翻頁順暢',
      '【橫線／方格／空白】三種內頁可選',
      '【免費排版】頁碼、章節與習題欄位',
      '【10本起訂】小批量數碼，大量柯式',
      '【學期檔期】開學前2週為高峰期'
    ],
    specs: {
      material: '80g–100g書紙或道林紙；封面200g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '封面四色印刷；內頁單色或雙色',
      finishing: '騎馬釘裝訂、封面覆膜（可選）',
    },
    price_range: 'HK$4-16/本',
    basePrice: 4,
    basePrice_en: 1.84,
    basePrice_ja: 258,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    optimizedAt: '2026-09-16',
    optimizationRound: 1,
    images: ['/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-zh-hk-hero.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-zh-hk-detail.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-zh-hk-variety.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-en-hero.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-en-detail.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-en-variety.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-ja-hero.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-ja-detail.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-ja-variety.webp', '/images/products/v28_5/exercise-books/zprintpro-educational-exercise-books-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-exercise-books-zh-hk-1.webp', en: 'zprintpro-educational-exercise-books-en-1.webp', ja: 'zprintpro-educational-exercise-books-ja-1.webp' },
    alt: {
      'zh-hk': '香港練習簿印刷 80g書寫紙 膠裝裝訂',
      en: 'Exercise Books Printing 80g Writing Paper Perfect Bound',
      ja: 'ワークブック印刷 | 學校向け・大量印刷対応 | ZprintPro'
    },
  },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    variables: {
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 100, label: '100本', discount: 1 },
        { value: 500, label: '500本', discount: 0.85 },
        { value: 1000, label: '1000本', discount: 0.75 },
      ],
    },
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ED-002',
    sku_code: 'ED-002',
    slug: 'certificates',
    category: 'educational',
    category_slug: 'educational',
    name: '香港證書印刷 — 畢業證書 / 獎狀 / 校友會證書 / 培訓證書', nameEn: 'Certificate Printing for Diplomas, Awards & Training Programs', nameJa: '証明書印刷 — 卒業証書・賞状・同窓会証書・研修証明書', title_zh: '香港證書印刷 — 畢業證書 / 獎狀 / 校友會證書 / 培訓證書',
    description: '證書印刷服務，畢業證書、獎狀、校友會證書、培訓證書、榮譽證書首選。封面可加燙金/壓凹/UV 局部工藝。', descriptionEn: 'Certificate printing service for diplomas, awards, alumni certificates, training certificates, honor certificates. Foil stamping, embossing & spot UV available.', descriptionJa: '証明書印刷サービス、卒業証書、賞状、同窓会証書、研修証明書、栄誉証明書に最適。箔押し・エンボス・スポット UV 加工対応。', description_zh: '證書印刷服務，畢業證書、獎狀、校友會證書、培訓證書、榮譽證書首選。封面可加燙金/壓凹/UV 局部工藝。',
    features: [
      '【80g–100g書紙或道林紙】書寫流暢，不滲墨',
      '【四色印刷】封面色彩鮮豔，內頁清晰',
      '【騎馬釘或膠裝】牢固耐用，翻頁順暢',
      '【浮水印紙】防偽性強，官方認證適用',
      '【免費排版】頁碼、章節與習題欄位',
      '【100本起訂】小批量數碼，大量柯式',
      '【學期檔期】開學前2週為高峰期'
    ],
    specs: {
      material: '200g–250g水印紙或棉質紙',
      size: 'A4（210×297mm）或A3（297×420mm）',
      printMethod: '四色印刷＋燙金',
      finishing: '燙金、壓凹、防偽底紋、浮水印',
    },
    price_range: 'HK$8-40/張',
    basePrice: 8,
    basePrice_en: 2.76,
    basePrice_ja: 386,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/v28_5/certificates/zprintpro-educational-certificates-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/certificates/zprintpro-educational-certificates-zh-hk-hero.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-zh-hk-detail.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-zh-hk-variety.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/certificates/zprintpro-educational-certificates-en-hero.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-en-detail.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-en-variety.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/certificates/zprintpro-educational-certificates-ja-hero.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-ja-detail.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-ja-variety.webp', '/images/products/v28_5/certificates/zprintpro-educational-certificates-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-certificates-zh-hk-1.webp', en: 'zprintpro-educational-certificates-en-1.webp', ja: 'zprintpro-educational-certificates-ja-1.webp' },
    alt: {
      'zh-hk': '香港證書印刷 250g珠光紙 燙金工藝',
      en: 'Certificates Printing 250g Pearl Paper Foil Stamped',
      ja: '賞状印刷 | 學校向け・大量印刷対応 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'b4', label: 'B4 (250×353mm)', multiplier: 1.5 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'staple', label: '釘裝', surcharge: 5 },
        { value: 'perfect', label: '膠裝', surcharge: 15 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ED-003',
    sku_code: 'ED-003',
    slug: 'school-flyers',
    category: 'educational',
    category_slug: 'educational',
    name: '香港學校單張 — 校刊 / 通告 / 校史特刊 / 校友會刊', nameEn: 'School Flyers for Newsletters, Announcements & Alumni Publications', nameJa: '學校フライヤー — 學校新聞・お知らせ・校史特刊・同窓会誌', title_zh: '香港學校單張 — 校刊 / 通告 / 校史特刊 / 校友會刊',
    description: '學校單張印刷，校刊、通告、校史特刊、校友會刊、活動傳單印刷首選。10 張起印，48 小時香港本地速遞。', descriptionEn: 'School flyer printing for newsletters, announcements, school anniversary publications, alumni magazines, event flyers. 10 MOQ, 2-4 day worldwide delivery.', descriptionJa: '學校フライヤー印刷、學校新聞、お知らせ、校史特刊、同窓会誌、イベント案内に最適。10枚〜、48時間国際速達対応。', description_zh: '學校單張印刷，校刊、通告、校史特刊、校友會刊、活動傳單印刷首選。10 張起印，48 小時香港本地速遞。',
    features: [
      '【80g–100g書紙或道林紙】書寫流暢，不滲墨',
      '【四色印刷】封面色彩鮮豔，內頁清晰',
      '【騎馬釘或膠裝】牢固耐用，翻頁順暢',
      '【QR Code連結】線上報名，減少紙本流程',
      '【免費排版】頁碼、章節與習題欄位',
      '【10本起訂】小批量數碼，大量柯式',
      '【學期檔期】開學前2週為高峰期'
    ],
    specs: {
      material: '128g–157g銅版紙或書紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色數碼印刷',
      finishing: '覆膜（可選）',
    },
    price_range: 'HK$0.2-0.8/張',
    basePrice: 0.2,
    basePrice_en: 0.14,
    basePrice_ja: 20,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 10,
    images: ['/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-zh-hk-hero.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-zh-hk-detail.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-zh-hk-variety.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-en-hero.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-en-detail.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-en-variety.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-ja-hero.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-ja-detail.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-ja-variety.webp', '/images/products/v28_5/school-flyers/zprintpro-educational-school-flyers-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-school-flyers-zh-hk-1.webp', en: 'zprintpro-educational-school-flyers-en-1.webp', ja: 'zprintpro-educational-school-flyers-ja-1.webp' },
    alt: {
      'zh-hk': '香港學校單張印刷 157g銅版紙 雙面彩色',
      en: 'School Flyers Printing 157g Glossy Paper Double-sided Color',
      ja: '學校チラシ | 學校向け・大量印刷対応 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'b4', label: 'B4 (250×353mm)', multiplier: 1.5 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'staple', label: '釘裝', surcharge: 5 },
        { value: 'perfect', label: '膠裝', surcharge: 15 },
      ],
      quantities: [
        { value: 10, label: '10', discount: 2.35 },
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'ED-004',
    sku_code: 'ED-004',
    slug: 'textbooks',
    category: 'educational',
    category_slug: 'educational',
    name: '香港教科書印刷 / 教科書 印刷 — K12 教科書 / 補習社教材 / 學年教材 / 培訓手冊', nameEn: 'Textbook Printing for K12 Schools, Tutoring Centers & Training Manuals', nameJa: '教科書印刷 — K12 教科書・補習校教材・学年別教材・研修マニュアル', title_zh: '香港教科書印刷 教科書 印刷 — K12 教科書 / 補習社教材 / 學年教材 / 培訓手冊',
    description: '教科書印刷 / 教科書 印刷 服務，K12 教科書、補習社教材、學年教材、培訓手冊、練習題庫首選。書紙/道林紙護眼，可加 ISBN/條碼。適用行業：教育培訓、校園、補習社、出版社、企業培訓、政企機構。', descriptionEn: 'Textbook printing service for K12 schools, tutoring centers, grade-level curricula, training manuals, exercise workbooks. Wood-free eye-friendly paper, ISBN/barcode support available. Ideal for education & training, K12 schools, tutoring centers, publishers, corporate training, and government organizations.', descriptionJa: '教科書印刷サービス、K12 教科書、補習校教材、學年別教材、研修マニュアル、問題集に最適。目に優しい上質紙、ISBN・バーコード対応。教育・研修、K12 学校、学習塾、出版社、企業研修、官公庁・団体に最適。', description_zh: '教科書印刷 / 教科書 印刷 服務，K12 教科書、補習社教材、學年教材、培訓手冊、練習題庫首選。書紙/道林紙護眼。適用行業：教育培訓、校園、補習社、出版社、企業培訓、政企機構。',
    features: [
      '【80g–100g書紙或道林紙】書寫流暢，不滲墨',
      '【四色印刷】封面色彩鮮豔，內頁清晰',
      '【騎馬釘或膠裝】牢固耐用，翻頁順暢',
      '【輕薄紙張】80g–100g，便於學生攜帶',
      '【免費排版】頁碼、章節與習題欄位',
      '【100本起訂】小批量數碼，大量柯式',
      '【學期檔期】開學前2週為高峰期'
    ],
    specs: {
      material: '80g–100g道林紙或書紙；封面200g銅版紙',
      size: 'A4（210×297mm）或B5（176×250mm）',
      printMethod: '封面四色；內頁單色或雙色',
      finishing: '膠裝或騎馬釘、封面覆膜（可選）',
    },
    price_range: 'HK$5-50/本',
    basePrice: 24,
    basePrice_en: 9.2,
    basePrice_ja: 1288,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    optimizedAt: '2026-09-16',
    optimizationRound: 1,
    images: ['/images/products/v28_5/textbooks/zprintpro-educational-textbooks-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/textbooks/zprintpro-educational-textbooks-zh-hk-hero.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-zh-hk-detail.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-zh-hk-variety.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/textbooks/zprintpro-educational-textbooks-en-hero.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-en-detail.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-en-variety.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/textbooks/zprintpro-educational-textbooks-ja-hero.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-ja-detail.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-ja-variety.webp', '/images/products/v28_5/textbooks/zprintpro-educational-textbooks-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-textbooks-zh-hk-1.webp', en: 'zprintpro-educational-textbooks-en-1.webp', ja: 'zprintpro-educational-textbooks-ja-1.webp' },
    alt: {
      'zh-hk': '香港教科書印刷 80g雙膠紙 膠裝精裝',
      en: 'Textbooks Printing 80g Offset Paper Perfect Bound',
      ja: '教科書印刷 | 學校向け・大量印刷対応 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'b4', label: 'B4 (250×353mm)', multiplier: 1.5 },
      ],
      materials: [
        { value: '80g', label: '80g書紙', surcharge: 0 },
        { value: '100g', label: '100g書紙', surcharge: 10 },
        { value: '120g', label: '120g彩色紙', surcharge: 20 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'staple', label: '釘裝', surcharge: 5 },
        { value: 'perfect', label: '膠裝', surcharge: 15 },
      ],
      quantities: [
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // ===== 校園教育印刷擴展 (ED-005 graduation-yearbook, 2026-07-08 Layer A SKU 拓點) =====
  {
    id: 'ED-005',
    sku_code: 'ED-005',
    slug: 'graduation-yearbook',
    optimizedAt: '2026-07-27',
    optimizationRound: 1,
    category: 'educational',
    category_slug: 'educational',
    name: '香港畢業紀念冊 — 畢業紀念冊 / 校史特刊 / 校友會刊 / 社團特刊', nameEn: 'Graduation Yearbooks, School Anniversary & Alumni Publications', nameJa: '卒業記念アルバム — 卒業記念・校史特刊・同窓会誌・クラブ特刊', title_zh: '香港畢業紀念冊 — 畢業紀念冊 / 校史特刊 / 校友會刊 / 社團特刊',
    description: '香港畢業紀念冊/校史特刊/校友會刊/社團特刊定製，騎馬釘/膠裝/精裝三種裝訂，支持班級照片、師長題詞、學校 logo 全頁。香港本地 48 小時交付，DHL 全球 2-4 天。 适配行业: 中學畢業紀念冊、大學畢業紀念冊、校友會、培訓機構、校園活動、教會團契、補習社.', descriptionEn: 'Graduation yearbooks, school anniversary & alumni publication printing — saddle stitch / perfect bound / hardcover, supporting class photos, faculty messages, school logos. Free design mockup, 1 MOQ, DHL Express global 2-4 day delivery from Asia factory. 适配行业: High school yearbook, College yearbook, Alumni, Training, School events, Church, Tutoring.', descriptionJa: '卒業記念アルバム・校史特刊・同窓会誌・クラブ特刊印刷、中綴じ/無線綴じ/上製本の3方式、クラス寫真・先生メッセージ・學校ロゴ全面対応。無料デザインモックアップ、1冊〜、アジア自社工場からDHL国際速達2-4日。 适配行业: 高校卒業アルバム、大学卒業アルバム、同窓会、研修、学校活動、教会、塾.', description_zh: '香港畢業紀念冊/校史特刊/校友會刊/社團特刊定製，騎馬釘/膠裝/精裝三種裝訂，支持班級照片、師長題詞、學校 logo 全頁。香港本地 48 小時交付，DHL 全球 2-4 天。 适配行业: 中學畢業紀念冊、大學畢業紀念冊、校友會、培訓機構、校園活動、教會團契、補習社.',
    price_range: 'HK$45-180/本',
    basePrice: 45,
    basePrice_en: 10.35,
    basePrice_ja: 1350,
    weight_score: 88,
    isHot: true,
    isNew: true,
    minQuantity: 1,
    images: ['/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-zh-hk-hero.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-zh-hk-detail.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-zh-hk-variety.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-en-hero.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-en-detail.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-en-variety.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-ja-hero.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-ja-detail.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-ja-variety.webp', '/images/products/v28_5/graduation-yearbook/zprintpro-educational-graduation-yearbook-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-graduation-yearbook-zh-hk.webp', en: 'zprintpro-educational-graduation-yearbook-en.webp', ja: 'zprintpro-educational-graduation-yearbook-ja.webp' },
    alt: {
      'zh-hk': '香港畢業紀念冊印刷 — 校史特刊/校友會刊/社團特刊定製，騎馬釘/膠裝/精裝 3 種裝訂，支援班級照片、師長題詞、學校 logo 全頁。香港本地 48 小時交付，DHL 全球 2-4 天。',
      en: 'Graduation Yearbook Printing — school anniversary / alumni / club publication, saddle stitch / perfect bound / hardcover, full class photos, faculty messages, school logos. 48hr HK local, DHL 2-4 day global.',
      ja: '卒業記念アルバム印刷 — 校史特刊/同窓会誌/クラブ特刊，中綴じ/無線綴じ/上製本の3方式，クラス寫真・先生メッセージ・学校ロゴ全面対応。香港48時間，DHL国際2-4日。',
    },
  },

    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // ===== 新增包裝盒產品（SEO重點布局） =====
  {
    id: 'PKG-007',
    sku_code: 'PKG-007',
    slug: 'magnetic-closure-gift-box',
    optimizedAt: '2026-07-28',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '磁吸翻蓋禮盒印刷 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Magnetic Closure Gift Box | Gift Boxes & Custom Packaging', nameJa: 'マグネット蓋ギフトボックス | パッケージボックス・化粧箱', title_zh: '磁吸翻蓋禮盒印刷',
    description: '高檔磁吸翻蓋硬盒，適合奢侈品、化妝品、電子產品包裝。支持燙金、UV、壓紋工藝。 适配行业: 美妝護膚、珠寶鐘錶、婚慶、茶飲食品、電子產品、禮品、節日送禮.', descriptionEn: 'Premium magnetic closure rigid boxes for luxury goods, cosmetics, electronics. Foil stamping, UV, embossing available. 适配行业: Beauty, Jewelry & Watches, Wedding, Tea & Beverage, Electronics, Gifts, Holiday gifts.', descriptionJa: '高級マグネット蓋硬箱。高級品、化粧品、電子機器の包裝に最適。箔押し、UV、エンボス加工対応。 适配行业: 美容、宝飾・腕時計、ウェディング、茶・飲料、エレクトロニクス、ギフト、シーズンギフト.', description_zh: '高檔磁吸翻蓋硬盒，適合奢侈品、化妝品、電子產品包裝。支持燙金、UV、壓紋工藝。 适配行业: 美妝護膚、珠寶鐘錶、婚慶、茶飲食品、電子產品、禮品、節日送禮.',
    features: [
      '磁吸翻蓋，單手開合體驗佳',
      '硬盒結構＋觸感覆膜可選',
      '燙金、壓紋、局部 UV 多工藝',
      '內襯可 EVA 分格保護電子件',
      '適合奢侈品與節慶禮盒',
      '圓角刀模降低運輸磕碰',
      '可協助磁鐵與空運標示評估',
    ],
    specs: {
      material: '灰板裱面＋隱藏磁吸；可觸感膜',
      size: '依產品＋內襯厚度全客製',
      printMethod: '面紙四色／專色＋後工',
      finishing: '燙金、壓紋、局部 UV、手工糊盒',
    },
    price_range: 'HK$15-80/個',
    basePrice: 15,
    basePrice_en: 3.45,
    basePrice_ja: 450,
    weight_score: 98,
    isHot: true,
    isNew: true,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-1.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-en-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-magnetic-closure-gift-box-ja-6.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-magnetic-closure-gift-box-zh-hk-1.webp', en: 'zprintpro-packaging-magnetic-closure-gift-box-en-1.webp', ja: 'zprintpro-packaging-magnetic-closure-gift-box-ja-1.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港磁吸翻蓋禮盒印刷 350g白卡紙 燙金Logo',
      en: 'Custom Packaging Boxes & Gift Boxes | Magnetic Closure Gift Box Printing 350g White Card Foil Logo',
      ja: 'パッケージボックス / ギフトボックス | マグネット蓋ギフトボックス | オリジナルパッケージ・最短3日 | ZprintPro'
    },
  },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PKG-008',
    sku_code: 'PKG-008',
    slug: 'electronics-packaging-box',
    optimizedAt: '2026-08-05',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '電子產品包裝盒定製 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Electronics Packaging Box | Gift Boxes & Custom Packaging', nameJa: '電子機器包裝箱 | パッケージボックス・化粧箱', title_zh: '電子產品包裝盒定製',
    description: '手機、耳機、充電器等3C產品包裝盒。EVA內托、吸塑、紙托多種內襯選擇。支持環保材質。 適配行業：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。', descriptionEn: 'Packaging boxes for phones, earphones, chargers. EVA foam, blister, paper tray inserts. Eco-friendly options. Best for: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.', descriptionJa: 'スマホ、イヤホン、充電器等のパッケージ箱。EVAフォーム、ブリスター、紙トレイ内裝。環境配慮素材対応。 適用業界：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。', description_zh: '手機、耳機、充電器等3C產品包裝盒。EVA內托、吸塑、紙托多種內襯選擇。支持環保材質。',
    features: [
      '【1200g 灰板】高挺度外盒，抗壓耐摔',
      '【EVA／吸塑／紙漿內托】三種內襯，精準固定 3C 產品',
      '【防靜電選項】符合電子產品防護標準，避免靜電損傷',
      '【燙金／局部 UV】LOGO 與產品賣點視覺強化',
      '【磁吸翻蓋】單手開啟，提升品牌開箱體驗',
      '【3D 渲染確認】印前結構可視化，尺寸公差 ≤0.5mm',
      '【軟觸膜】親膚質感，高端 3C 品牌首選',
    ],
    specs: {
      material: '1200g 灰板紙裱糊銅版紙；EVA／PET 吸塑／紙漿內托',
      size: '完全訂製，常見 10×10×4cm 至 20×15×6cm',
      printMethod: '四色柯式印刷',
      finishing: '燙金／燙銀、局部 UV、軟觸膜、磁吸扣',
    },
    price_range: 'HK$8-50/個',
    basePrice: 8,
    basePrice_en: 1.84,
    basePrice_ja: 240,
    weight_score: 96,
    isHot: true,
    isNew: true,
    minQuantity: 200,
    images: ['/images/products/cosmetic-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-en-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-electronics-packaging-box-ja-6.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-electronics-packaging-box-zh-hk-1.webp', en: 'zprintpro-packaging-electronics-packaging-box-en-1.webp', ja: 'zprintpro-packaging-electronics-packaging-box-ja-1.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港電子產品包裝盒印刷 400g灰板紙 防靜電設計',
      en: 'Custom Packaging Boxes & Gift Boxes | Electronics Packaging Box Printing 400g Grey Board Anti-static',
      ja: 'パッケージボックス / ギフトボックス | 電子機器包裝箱 | オリジナルパッケージ・最短3日 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PKG-009',
    sku_code: 'PKG-009',
    slug: 'kraft-paper-packaging-box',
    optimizedAt: '2026-07-29',
    optimizationRound: 2,
    category: 'packaging',
    category_slug: 'packaging',
    name: '牛皮紙盒印刷訂製 / クラフト紙 パッケージ印刷 | 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'Kraft Paper Packaging Box | Gift Boxes & Custom Packaging', nameJa: 'クラフト紙 パッケージ印刷 / クラフト紙 箱印刷 | パッケージボックス・化粧箱', title_zh: '牛皮紙盒印刷訂製 · 環保品牌跨境電商首選',
    description: '環保牛皮紙盒，適合食品、茶葉、手工皂包裝。可印刷Logo，支持多種尺寸。適配行業: 有機食品品牌、環保美妝、ESG 認證品牌、跨境電商、FSC 認證供應鏈、減塑合規品牌。 適配行業: 跨境電商、食品包裝、美妝護膚、禮品、奢侈品、電子產品、母嬰.', descriptionEn: 'Eco-friendly kraft paper boxes for food, tea, handmade soap packaging. Custom logo printing, multiple sizes. Best for: organic food brands, eco-beauty, ESG-certified brands, cross-border e-commerce, FSC-certified supply chains, plastic-reduction compliance brands. 适配行业: Cross-border e-commerce, Food packaging, Beauty, Gifts, Luxury, Electronics, Baby products.', descriptionJa: 'クラフト紙 パッケージ印刷 / クラフト紙 箱印刷 環境に優しいクラフト紙箱。食品、お茶、手作り石鹸の包裝に最適。ロゴ印刷、サイズ豊富。 適用業界: オーガニック食品ブランド、エコ ビューティ、ESG 認証ブランド、越境EC、FSC 認証サプライチェーン、プラスチック削減コンプライアンス ブランド。 适配行业: 越境EC、食品包装、美容、ギフト、贅沢品、エレクトロニクス、ベビー用品。', description_zh: '環保牛皮紙盒，適合食品、茶葉、手工皂包裝。可印刷Logo，支持多種尺寸。 適配行業: 跨境電商、食品包裝、美妝護膚、禮品、奢侈品、電子產品、母嬰.',
    features: [
      '【300g–350g 牛皮卡】未漂白原漿，纖維粗獷自然',
      '【FSC 認證紙可選】森林可持續來源（落單時註明）',
      '【環保紙材】生物降解表現以訂單確認',
      '【水性油墨】單色／雙色印刷，低 VOC 排放',
      '【燙黑／壓凹】樸實中帶精緻，適合文創與手作品牌',
      '【自動鎖底】底部結構穩固，承重表現以訂單規格為準',
      '【免費色樣確認】每批紙張批次對色，確保一致性',
    ],
    specs: {
      material: '300g–350g FSC 牛皮卡紙；水性油墨',
      size: '常見 12×8×5cm 至 20×15×8cm（可客製）',
      printMethod: '單色／雙色水性印刷或四色柯式',
      finishing: '燙黑、壓凹、絲印、手提繩',
    },
    price_range: 'HK$1.5-1000/個',
    basePrice: 5,
    basePrice_en: 1.15,
    basePrice_ja: 150,
    weight_score: 94,
    isHot: true,
    isNew: false,
    minQuantity: 300,
    images: ['/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-zh-hk-1.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-en-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-en-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-kraft-paper-packaging-box-ja-6.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-kraft-paper-packaging-box-zh-hk-1.webp', en: 'zprintpro-packaging-kraft-paper-packaging-box-en-1.webp', ja: 'zprintpro-packaging-kraft-paper-packaging-box-ja-1.webp' },
    alt: {
      'zh-hk': '包裝盒 / 禮品盒 / 定製包裝 | 香港牛皮紙包裝盒印刷 300g牛皮紙 環保材質',
      en: 'Custom Packaging Boxes & Gift Boxes | Kraft Paper Packaging Box Printing 300g Kraft Paper Eco-friendly',
      ja: 'パッケージボックス / ギフトボックス | クラフト紙箱印刷 | オリジナルパッケージ・最短3日 | ZprintPro'
    },
  },
    variables: {
      sizes: [
        { value: 'small', label: '小號(100×80×50mm)', multiplier: 1 },
        { value: 'medium', label: '中號(150×120×80mm)', multiplier: 1.6 },
        { value: 'large', label: '大號(200×180×100mm)', multiplier: 2.5 },
      ],
      materials: [
        { value: 'white-card', label: '白卡紙', surcharge: 0 },
        { value: 'kraft', label: '牛皮紙', surcharge: 10 },
        { value: 'rigid', label: '硬紙板', surcharge: 80 },
      ],
      finishings: [
        { value: 'none', label: '無', surcharge: 0 },
        { value: 'foil', label: '燙金', surcharge: 60 },
        { value: 'uv', label: 'UV', surcharge: 50 },
        { value: 'emboss', label: '擊凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
    
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PKG-016',
    sku_code: 'PKG-016',
    slug: 'gang-run-card-boxes',
    optimizedAt: '2026-08-01',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '拼版白卡彩盒(免刀模費) | 彩盒印刷 / 白卡盒 / 禮品盒', nameEn: 'Gang-Run White Card Boxes (No Die-Cut Fee) | Gift Boxes & Custom Packaging', nameJa: '合版ホワイトカードボックス(型代不要) | パッケージボックス・化粧箱', title_zh: '拼版白卡彩盒(免刀模費) 彩盒印刷 500個起印 · 免刀模費 · 智印港',
    description: '拼版白卡彩盒 / 彩盒印刷 / 白卡盒訂製, 固定刀模共用, 免刀模費 + 免排版費, 成本更抵。4 種紙材(350g/400g 單粉卡、375g 銀卡、375g 鐳射銀卡), 3 種盒型(飛機盒/扣底盒/雙插盒), 8 檔標準尺寸。500-10,000 個, 交期以報價為準。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'Gang-run white card boxes with shared die-cut mold, no die-cut fee, lower cost, 500pc MOQ, lead time per quote, free shipping over $500. 4 paper stocks, 3 box styles, 8 standard sizes. ZprintPro Hong Kong. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '合版ホワイトカードボックス 固定型代不要、コスト削減、500個最低ロット、納期はご注文時に確認、$500相当以上送料無料。4 種素材 3 種箱型 8 標準サイズ。ZprintPro。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '拼版白卡彩盒 / 彩盒印刷 / 白卡盒訂製, 固定刀模共用, 免刀模費 + 免排版費, 成本更抵。4 種紙材, 3 種盒型, 8 檔標準尺寸。',
    features: [
      '【免刀模費】固定刀模共用, 拼版生產成本更抵',
      '【4 種紙材】350g 單粉卡(超高松) / 400g 單粉卡 / 375g 銀卡紙 / 375g 鐳射銀卡',
      '【3 種盒型】飛機盒 / 普通扣底盒 / 雙插盒, 8 檔標準尺寸(60x40x20 ~ 200x150x80mm)',
      '【500-10,000 個】湊版起印, 中小批量最優解',
      '【交期以報價為準】湊版生產, 不接急件, 如實標註',
      '【覆膜工藝】啞膜 / 光膜可選;銀卡類含印白墨 + 逆向 UV',
      '【加值工藝】可選燙金 / UV / 擊凸 / 貼膠片, 提升品牌質感',
    ],
    specs: {
      material: '350g/400g 單粉卡(超高松) / 375g 銀卡紙 / 375g 鐳射銀卡',
      size: '60x40x20 / 80x60x35 / 100x70x35 / 100x80x120 / 120x80x40 / 150x100x60 / 150x50x100 / 200x150x80 mm (8 檔標準尺寸, 飛機盒/扣底盒/雙插盒 3 種盒型)',
      printMethod: '四色柯式印刷 + 覆光膜/啞膜',
      finishing: '燙金 / UV 局部 / 擊凸 / 貼膠片 / 印白墨(銀卡類) / 逆向 UV(鐳射銀卡類)',
    },
    price_range: 'HK$129-17,214',
    basePrice: 129,
    weight_score: 90,
    isHot: true,
    isNew: true,
    minQuantity: 500,
    images: ['/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-zh-hk.webp'],
    imagesByLocale: {
      'zh-hk': [
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-zh-hk.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-zh-hk-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-zh-hk-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-zh-hk-4.webp',
      ],
      'en': [
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-en.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-en-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-en-3.webp',
      ],
      'ja': [
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-ja.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-ja-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-gang-run-card-boxes-ja-3.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-gang-run-card-boxes-zh-hk.webp', en: 'zprintpro-packaging-gang-run-card-boxes-en.webp', ja: 'zprintpro-packaging-gang-run-card-boxes-ja.webp' },
      alt: {
        'zh-hk': '拼版白卡彩盒(免刀模費) - 固定刀模共用，免刀模費 + 免排版費，成本更抵。4 種紙材 (350g/400g 單粉卡、375g 銀卡、375g 鐳射銀卡)，3 種盒型 (飛機盒/扣底盒/雙插盒)，8 檔標準尺寸。500-10,000 個，交期以報價為準。',
        en: 'Gang-Run White Card Boxes (No Die-Cut Fee) - Shared die-cut mold, no die-cut fee, no setup fee, lower cost than custom. 4 paper stocks (350g/400g single-side, 375g silver card, 375g holographic silver), 3 box styles (airplane/lock-bottom/double-tuck), 8 standard sizes. 500-10,000 pieces, lead time per quote.',
        ja: 'Gang-Run White Card Boxes (No Die-Cut Fee) - 共有型代、型代不要・版代不要、カスタム比コスト削減。4 種素材 (350g/400g 単粉カード、375g 銀カード、375g ホログラム銀カード)、3 種箱型 (飛行機箱/ロック底箱/両挿箱)、8 種標準サイズ。500-10,000 個、納期はご注文時に確認。',
      },
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},

  // ===== 新增 packaging SKU (M3 v4 · 2026-07-21) — 卡盒/坑盒/插口盒 =====
  {
    id: 'PKG-013',
    sku_code: 'PKG-013',
    slug: 'white-card-boxes',
    optimizedAt: '2026-08-03',
    optimizationRound: 1,
    category: 'packaging',
    category_slug: 'packaging',
    name: '白卡彩盒印刷定製 | 卡盒 / 包裝盒 / 禮品盒 / 化妝品盒', nameEn: 'White Cardboard Boxes | Custom Packaging & Gift Boxes', nameJa: '白カードボックス | パッケージ・ギフトボックス', title_zh: '白卡彩盒印刷訂製 卡盒/紙盒訂製 · 500個起印 5-7天交期 · 智印港',
    description: '高檔白卡紙盒（卡盒），挺度佳、印刷精美，4C+0 標準彩印。可加燙金、UV 局部、壓凸。紙盒訂製、白卡彩盒訂製適用：零售精品店、美妝護膚品牌、跨境電商 DTC、訂閱盒直運、輕奢飾品、有機食品品牌、煙酒禮盒、文創IP周邊。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'Premium white cardboard boxes with excellent rigidity and sharp print reproduction, standard 4C+0 process. Optional foil stamping, spot UV, and embossing available. Best for: retail boutique stores, beauty & skincare brands, cross-border e-commerce DTC, subscription box dropship, lightweight luxury jewelry, organic food brands, wine & spirits gift boxes, IP merchandise packaging. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '高級白カード紙箱、剛性に優れ、印刷精美、4C+0 標準プロセス。箔押し、スポット UV、エンボス加工オプション。 適用業界: 小売ブティック、 beauty・スキンケア ブランド、越境EC DTC、サブスクリプション ボックス dropship、軽奢饰品、オーガニック食品ブランド、ワイン・スピリッツギフトボックス、IP 商品パッケージ。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '高檔白卡紙盒（卡盒），挺度佳、印刷精美，4C+0 標準彩印。 2026 升級方案: 拼版彩盒試水反應好 → 升級白卡彩盒 50-10,000 件,單件 +HK$1-2。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動',
    images: ['/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-zh-hk-1.webp'],
    imagesByLocale: {
      'zh-hk': [
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-zh-hk-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-zh-hk-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-zh-hk-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-zh-hk-4.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-zh-hk-5.webp',
      ],
      'en': [
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-en-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-en-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-en-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-en-4.webp',
      ],
      'ja': [
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-ja-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-ja-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-ja-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-white-card-boxes-ja-4.webp',
      ],
    },
    price_range: 'HK$0.50-3.00/個',
    basePrice: 129,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-white-card-boxes-zh-hk-1.webp', en: 'zprintpro-packaging-white-card-boxes-en-1.webp', ja: 'zprintpro-packaging-white-card-boxes-ja-1.webp' },
      alt: {
        'zh-hk': '白卡彩盒印刷定製 | 香港零售精品美妝護膚包裝盒 | 智印港',
        en: 'White Cardboard Boxes | Premium Retail & Beauty Packaging | ZprintPro',
        ja: '白カードボックス | 高級小売・ビューティパッケージ | ZprintPro',
      },
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PKG-014',
    sku_code: 'PKG-014',
    slug: 'corrugated-boxes',
    optimizedAt: '2026-08-03',
    optimizationRound: 2,
    category: 'packaging',
    category_slug: 'packaging',
    name: '瓦楞彩盒印刷訂製 (坑盒/E坑/F坑) | 包裝盒 / 物流盒', nameEn: 'Corrugated Boxes (E/F Flute) | Custom Packaging & Shipping', nameJa: '段ボール箱 (E/Fフルート) | パッケージ・物流', title_zh: '瓦楞彩盒印刷訂製 坑盒/紙盒印刷 · 跨境電商物流抗壓首選 · 智印港',
    description: 'E坑/F坑 瓦楞彩印盒（坑盒），3 層 / 5 層結構可選，抗壓、防震、跨境運輸。瓦楞紙盒訂製、紙盒印刷適用：跨境電商 DTC、訂閱盒直運、物流快遞、3C 電子、汽配零件、寵物食品、烘焙連鎖。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'E-flute / F-flute corrugated color-printed boxes, 3-ply / 5-ply structure options, pressure-resistant, shock-absorbing, cross-border shipping. Best for: cross-border e-commerce DTC, subscription box dropship, logistics & shipping, 3C electronics, auto parts, pet food, bakery chains. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: 'E フルート / F フルート段ボールカラープリントボックス、3 層 / 5 層構造オプション、耐圧、衝撃吸収、越境輸送。 適用業界: 越境EC DTC、サブスクリプションボックス dropship、物流配送、3C 電子、Auto 部品、ペットフード、 bakery チェーン。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: 'E坑/F坑 瓦楞彩印盒（坑盒），3 層 / 5 層結構可選，抗壓、防震、跨境運輸。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動',
    images: ['/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-zh-hk-1.webp'],
    imagesByLocale: {
      'zh-hk': [
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-zh-hk-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-zh-hk-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-zh-hk-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-zh-hk-4.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-zh-hk-5.webp',
      ],
      'en': [
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-en-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-en-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-en-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-en-4.webp',
      ],
      'ja': [
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-ja-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-ja-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-ja-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-ja-4.webp',
        '/images/products/seedream-webp/zprintpro-packaging-corrugated-boxes-ja-5.webp',
      ],
    },
    price_range: 'HK$1,517-7,278',
    basePrice: 1517,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-corrugated-boxes-zh-hk-1.webp', en: 'zprintpro-packaging-corrugated-boxes-en-1.webp', ja: 'zprintpro-packaging-corrugated-boxes-ja-1.webp' },
      alt: {
        'zh-hk': '瓦楞彩盒印刷定製 (E坑/F坑) | 香港跨境電商物流快遞包裝盒 | 智印港',
        en: 'Corrugated Boxes (E/F Flute) | Cross-Border E-Commerce & Shipping | ZprintPro',
        ja: '段ボール箱 (E/Fフルート) | 越境EC・物流パッケージ | ZprintPro',
      },
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  {
    id: 'PKG-015',
    sku_code: 'PKG-015',
    slug: 'tuck-end-boxes',
    optimizedAt: '2026-07-21',
    optimizationRound: 2,
    category: 'packaging',
    category_slug: 'packaging',
    name: '插口盒印刷訂製 (卡盒/直插/飛機插) | 包裝盒 / 輕量彩盒', nameEn: 'Tuck End Boxes (Straight/Airplane) | Custom Packaging & Lightweight', nameJa: '差し込み式ボックス (直挿/飛行機挿) | パッケージ・軽量', title_zh: '卡盒/插口盒印刷訂製 免刀模 · 餐飲外賣零售快消首選 · 智印港',
    description: '直插 / 反插 / 飛機插 3 大結構可選，250-350g 粉咭 / 白卡（卡盒結構），平面運輸節省 70% 倉儲，組裝 5 秒無需膠水。插口盒訂製、免刀模費適用：餐飲外賣、零售精品、跨境電商、化妝品小樣、訂閱盒、烘焙連鎖、文創周邊。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'Straight tuck / reverse tuck / auto-bottom (airplane) 3 structure options, 250-350g coated paper / white card, flat shipping saves 70% storage, 5-second assembly no glue required. Best for: F&B takeaway, retail boutique, cross-border e-commerce, beauty samples, subscription boxes, bakery chains, IP merchandise. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '直挿 / 反挿 / 飛行機挿 3 大構造オプション、250-350g コート紙 / 白カード、平面輸送で 70% ストレージ節約、5 秒組み立て接着剤不要。 適用業界: F&B テイクアウト、小売ブティック、越境EC、化粧品サンプル、サブスクリプションボックス、ベーカリーチェーン、IP 周辺。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '直插 / 反插 / 飛機插 3 大結構可選，250-350g 粉咭 / 白卡（卡盒結構），平面運輸節省 70% 倉儲。',
    images: ['/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-zh-hk-2.webp'],
    imagesByLocale: {
      'zh-hk': [
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-zh-hk-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-zh-hk-3.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-zh-hk-4.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-zh-hk-5.webp',
      ],
      'en': [
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-en-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-en-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-en-3.webp',
      ],
      'ja': [
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-ja-1.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-ja-2.webp',
        '/images/products/seedream-webp/zprintpro-packaging-tuck-end-boxes-ja-3.webp',
      ],
    },
    price_range: 'HK$1,538-7,478',
    basePrice: 1538,
    weight_score: 5,
    isHot: false,
    isNew: true,
    minQuantity: 500,
    turnaround: '5-7 working days',
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-tuck-end-boxes-zh-hk-2.webp', en: 'zprintpro-packaging-tuck-end-boxes-en-1.webp', ja: 'zprintpro-packaging-tuck-end-boxes-ja-1.webp' },
      alt: {
        'zh-hk': '插口盒印刷定製 (直插/反插/飛機插) | 香港餐飲外賣零售快消包裝盒 | 智印港',
        en: 'Tuck End Boxes (Straight/Reverse/Auto-Bottom) | F&B Takeaway & Retail | ZprintPro',
        ja: '差し込み式ボックス (直挿/反挿/飛行機) | F&B テイクアウト・小売 | ZprintPro',
      },
    },
  
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
  // ===== 新增貼紙產品（SEO長尾詞覆盖） =====
  {
    id: 'ST-009',
    sku_code: 'ST-009',
    slug: 'fruit-food-label-stickers',
    optimizedAt: '2026-08-03',
    optimizationRound: 1,
    category: 'stickers',
    category_slug: 'stickers',
    name: '水果貼紙食品標籤印刷 | 防水貼紙 / 異形貼紙', nameEn: 'Fruit & Food Label Stickers | Waterproof & Die-Cut Stickers', nameJa: 'フルーツ・食品ラベルシール | 防水ステッカー / ダイカット', title_zh: '水果貼紙食品標籤印刷 防水防油 跨境電商 SKU 標貼 | 智印港',
    description: '防水防油的水果貼紙和食品標籤，適合生鮮、烘焙、飲料包裝。適配行業: 跨境電商 SKU 標籤 / 生鮮水果品牌 / 烘焙食品 / 茶飲品牌 / 保健食品 / GS1 條碼貼標。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動', descriptionEn: 'Waterproof and oil-resistant fruit stickers and food labels for fresh produce, bakery, beverage packaging. Best for: cross-border e-commerce SKU labels / fresh fruit brands / bakery / beverage / health food / GS1 barcode labels. Best for: Restaurants & Catering, Retail & Boutique, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding & Events, Brand Activations', descriptionJa: '耐水耐油のフルーツシールと食品ラベル。生鮮食品、ベーカリー、飲料包裝に最適。適用業界: 越境EC SKU ラベル / 生鮮フルーツブランド / ベーカリー / ドリンク / 健康食品 / GS1 バーコードラベル。 適合業種: 飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント', description_zh: '防水防油的水果貼紙和食品標籤，適合生鮮、烘焙、飲料包裝。適配行業: 跨境電商 SKU 標籤 / 生鮮水果品牌 / 烘焙食品 / 茶飲品牌 / 保健食品 / GS1 條碼貼標。 適配行業: 餐飲外賣/零售精品/跨境電商/美妝護膚/教育培訓/婚慶/品牌活動',
    features: [
      '【防水防油】防水防油紙，適用生鮮、烘焙、飲料包裝標籤',
      '【耐冷耐濕】0–4°C 冷藏環境保持黏性，適合生鮮與冷鏈',
      '【BOPP／PE／PLA】透明、白色或可降解三種面材選擇',
      '【可變條碼】每張獨立序號／QR Code，產地追溯與防偽',
      '【模切精準】異形裁切，適配圓形水果與各類包裝曲面',
      '【覆膜保護】光膜／啞膜，防水防油延長標籤壽命',
      '【印前檢查】免費檢查刀模線與食品安全標註',
    ],
    specs: {
      material: '食品級 BOPP／PE／PLA；大豆油墨',
      size: '最小約 20×20mm，最大約 200×300mm',
      printMethod: '四色數碼或柯式（依數量）',
      finishing: '模切、覆膜（啞膜／光膜）、可變條碼',
    },
    price_range: 'HK$0.22-1.20/張',
    basePrice: 0.22,
    basePrice_en: 0.23,
    weight_score: 95,
    isHot: true,
    isNew: true,
    minQuantity: 500,
    images: ['/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': ['/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-zh-hk-hero.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-zh-hk-detail.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-zh-hk-variety.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-zh-hk-multi-angle.webp'],
    'en': ['/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-en-hero.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-en-detail.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-en-variety.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-en-multi-angle.webp'],
    'ja': ['/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-ja-hero.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-ja-detail.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-ja-variety.webp', '/images/products/v28_5/fruit-food-label-stickers/zprintpro-stickers-fruit-food-label-stickers-ja-multi-angle.webp']
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-fruit-food-label-stickers-zh-hk-1.webp', en: 'zprintpro-stickers-fruit-food-label-stickers-en-1.webp', ja: 'zprintpro-stickers-fruit-food-label-stickers-ja-1.webp' },
    alt: {
      'zh-hk': '防水貼紙 / 不干膠印刷 | 香港水果食品標籤貼紙印刷 防水材質 食品安全級',
      en: 'Waterproof Stickers & Custom Vinyl | Fruit Food Label Stickers Printing Waterproof Food-safe',
      ja: '防水ステッカー / ダイカットステッカー | フルーツ・食品ラベルシール | 防水対応・オリジナル形状 | ZprintPro'
    },
  },

    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},
{
      id: 'DJ-001',
      sku_code: 'DJ-001',
      slug: 'doujinshi-printing',
      optimizedAt: '2026-08-07',
      optimizationRound: 1,
      category: 'japan-doujin',
      category_slug: 'japan-doujin',
      name: '同人誌印刷',
      nameEn: 'Doujinshi Printing',
      nameJa: '同人誌印刷',
      title_zh: '同人誌印刷 | Comiket 對應 | 智印港',
      description: '專為 Comiket 及同人活動設計的同人誌印刷。A5/B5 標準尺寸,封面彩色、內頁單色。10 本起印,Comiket 前 24 小時特急対応。 適配行業：餐飲外賣、零售精品、跨境電商、美妝護膚、教育培訓、婚慶、品牌活動。',
      descriptionEn: 'Doujinshi printing for Comiket and doujin events. A5/B5 sizes, full-color cover + mono interior. MOQ 10 books. 24-hour rush available before Comiket. Best for: Food & Beverage, Retail, Cross-border E-commerce, Beauty & Skincare, Education & Training, Wedding, Brand Activations.',
      descriptionJa: 'コミケ・即売会向け同人誌印刷。A5/B5 サイズ対応、表紙フルカラー、本文モノクロ。本文 10 部から対応、コミケ前 24 時間特急対応可能。 適用業界：飲食・ケータリング、小売・ブティック、越境EC、美容・スキンケア、教育・研修、婚礼・冠婚葬祭、ブランドイベント。',
      description_zh: '專為 Comiket 及同人活動設計的同人誌印刷。A5/B5 標準尺寸,封面彩色、內頁單色。10 本起印,Comiket 前 24 小時特急対応。',
            price_range: '¥7,500〜/部〜',
      basePrice: 7500,
    basePrice_en: 1245.0,
      weight_score: 0.7,
      isHot: true,
      isNew: true,
      minQuantity: 10,
      turnaround: '5-7 営業日 (コミケ前 24時間特急対応)',
      images: [
        '/images/japan/doujinshi-printing.webp',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-1.jpg',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-2.jpg',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-3.jpg',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-4.jpg'
      ],
      imagesByLocale: {
        'zh-hk': [
          '/images/japan/doujinshi-printing.webp',
        ],
        en: [
          '/images/japan/doujinshi-printing.webp',
        ],
        ja: [
          '/images/japan/doujinshi-printing.webp',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-1.jpg',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-2.jpg',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-3.jpg',
      '/images/japan/zprintpro-doujinshi-doujinshi-printing-ja-4.jpg'
        ],
      },
      seoImages: {
        filename: {
          'zh-hk': 'doujinshi-printing.webp',
          en: 'doujinshi-printing.webp',
          ja: 'doujinshi-printing.webp',
        },
        alt: {
          'zh-hk': '同人誌印刷-Comiket對應-A5-B5尺寸',
          en: 'doujinshi-printing-comiket-a5-b5-format',
          ja: '同人誌印刷-コミケ対応-A5-B5サイズ',
        },
      },
      features: [
        'Comiket 前 24 小時特急対応可',
        '10 本起印,少量対応',
        '深圳自營工廠 + DHL Express 直送日本 2-4 個工作天',
        'FSC 認證紙材 / ISO 12647 色彩管理',
        '繁體中文 / 日文雙語支援 + WhatsApp 對應',
        'A5 (148×210mm) / B5 (182×257mm) 標準尺寸'
      ],
      specs: {
        material: 'FSC 認證道林紙 90g / 銅版紙 90g (封面)',
        size: 'A5 (148×210mm) / B5 (182×257mm) / A4 (可選)',
        printMethod: '封面: 柯式四色 / 內頁: 數碼或柯式印刷',
        finishing: '膠裝 / 騎馬釘 (8-64頁) / 書脊封面',
      },
      options: {
        material: [
          { value: 'standard', label: '標準', priceAdjustment: 0 },
          { value: 'premium', label: '進階', priceAdjustment: 1500 },
        ],
        size: [
          { value: 'standard', label: '標準尺寸', priceAdjustment: 0 },
          { value: 'custom', label: '自訂尺寸', priceAdjustment: 800 },
        ],
      },
      variables: {
        quantities: [
          { value: 10, label: '10 件起', discount: 0 },
          { value: 50, label: '50 件', discount: 0.05 },
          { value: 100, label: '100 件', discount: 0.10 },
          { value: 500, label: '500 件', discount: 0.15 },
        ],
      },
    
    longDescription: `<h3>裝訂方式點樣揀：膠裝 vs 騎馬釘</h3>
<table>
  <thead><tr><th>裝訂</th><th>頁數範圍</th><th>適用場景</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>騎馬釘</td><td>8-64 頁</td><td>薄本漫畫、今撮本、場刊；可完全攤平，翻閱方便</td></tr>
    <tr><td>膠裝（Perfect Binding）</td><td>65 頁以上</td><td>厚本畫集、合同本；有書脊，方便書架陳列同系列收藏</td></tr>
  </tbody>
</table>
<h3>內頁紙材點揀</h3>
<p>標準配置係 FSC 認證道林紙 90g 內頁 + 銅版紙 90g 封面（封面彩色、內頁單色）。內頁文字為主揀 90g 已足夠；滿版插畫想提升質感可升級進階選項。尺寸支援 A5（148×210mm）/ B5（182×257mm）/ A4 自訂。</p>
<h3>出血同安全區（入稿前必讀）</h3>
<p>跨頁插畫記得預留 3mm 出血，重要線稿、對白同簽名放喺安全區（裁切線內 5mm）以內。騎馬釘裝訂要留意釘位預留：跨頁位預留 5mm 裝訂邊，避免重要畫面被釘書釘遮擋。PDF 入稿前將所有字體轉外框（Outline），色彩模式用 CMYK。</p>
<h3>交期點計</h3>
<p>標準交期 5-7 個工作天，深圳自營工廠 + DHL Express 直送日本 2-4 個工作天。Comiket 前提供 24 小時特急對應，夏天（6-7 月）同冬天（12 月）落單高峰建議提早 10-15 個工作天落單。</p>
`,
    longDescriptionEn: `<h3>Binding Options: Perfect Binding vs Saddle Stitch</h3>
<table>
  <thead><tr><th>Binding</th><th>Page Range</th><th>Best For</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td><a href="/en/blog/zine-small-batch-booklet-printing-guide/">Saddle Stitch</a></td><td>8-64 pages</td><td>Thin manga, event booklets; lays fully flat for reading</td></tr>
    <tr><td>Perfect Binding</td><td>65+ pages</td><td>Thick art books, anthologies; printable spine for shelf display</td></tr>
  </tbody>
</table>
<h3>Interior Paper Selection</h3>
<p>Standard spec: FSC-certified uncoated 90gsm interior + 90gsm coated cover (full-color cover, mono interior). Text-heavy pages work well on 90gsm; upgrade to the premium option for full-bleed illustration work. Sizes: A5 (148×210mm), B5 (182×257mm), custom A4.</p>
<h3>Bleed and Safe Zone (Read Before Uploading)</h3>
<p>Keep 3mm bleed on all full-bleed artwork; place key linework, dialogue and signatures inside the 5mm safe zone from trim. For saddle stitch, reserve a 5mm binding margin at the spine side of spreads so staples never cover key art. Convert all fonts to outlines and submit in CMYK PDF.</p>
<h3>Turnaround</h3>
<p>Standard production is 5-7 business days, then DHL Express from our Shenzhen factory to Japan in 2-4 business days. A 24-hour rush is available <a href="/en/blog/comiket-printing-prep-guide/">before Comiket</a>; during peak seasons (June-July and December) plan 10-15 business days ahead.</p>
`,
    longDescriptionJa: `<h3>製本の選び方：無線綴じ vs 中綴じ</h3>
<table>
  <thead><tr><th>製本</th><th>ページ数</th><th>おすすめの用途</th></tr></thead>
  <tbody>
    <tr class="border-b border-gray-200"><td>中綴じ（騎馬釘）</td><td>8-64 ページ</td><td>薄めの漫画・イベント本。完全に開き、閲覧しやすい</td></tr>
    <tr><td>無線綴じ（膠裝）</td><td>65 ページ以上</td><td>厚めの画集・合同誌。背表紙あり、棚に並べて保管しやすい</td></tr>
  </tbody>
</table>
<h3>本文用紙の選び方</h3>
<p>標準仕様：FSC 認証上質紙 90g（本文）+ コート紙 90g（表紙）。表紙フルカラー・本文モノクロ。文字主体なら 90g で十分、塗り絵・イラスト主体ならプレミアム選択肢へ。サイズは A5（148×210mm）/ B5（182×257mm）/ A4 カスタム対応。</p>
<h3>塗り足しとセーフゾーン（入稿前の必読）</h3>
<p>見開きイラストは 3mm の塗り足し（ドブ）を確保し、重要な線画・セリフ・サインは断裁線から 5mm 内側のセーフゾーンへ。中綴じはノド側に 5mm のマージンを取り、ホチキス針が重要な絵を隠さないように。フォントはアウトライン化、カラーモードは CMYK の PDF でご入稿ください。</p>
<h3>納期の目安</h3>
<p>標準納期 5-7 営業日、深圳自社工場から DHL Express で日本へ 2-4 営業日。コミケ前は 24 時間特急対応可。夏（6-7 月）・冬（12 月）の繁忙期は 10-15 営業日の余裕を持ってご発注ください。</p>
`,
    // === V18 CLEARED 2026-09-12: 编造内容清毒 (品牌关联/假评审/假数字), zero consumers, v92 接线时按真实实体 + 拍板口径重填 ===
    seoTitle: {"zh-hk": "", "en": "", "ja": ""},
    seoDescription: {"zh-hk": "", "en": "", "ja": ""},
    metaTitle: "",
    aiSearchSummary: {"en": "", "zh-hk": "", "ja": ""},
    knowledgePanelData: {"brand": "", "foundingDate": "", "parentOrg": "", "products": [], "industries": []},
    relatedEntities: {"sameAs": [], "mentions": []},
    expertReview: {"reviewer": "", "credentials": "", "review": ""},
    authorBio: {"name": "", "role": "", "bio": ""},
},


  // === 喜帖印刷 (6 SKU, K3 8/17 拍板 Step 2) ===
  {
    id: 'WI-001',
    sku_code: 'WI-001',
    slug: 'foil-wedding-invitations',

    title_zh: '燙金喜帖',
    description_zh: '300g 棉紙燙金喜帖,玫瑰金 / 香檳金 / 銀色燙金工藝,50 套起印。順豐本地滿 HK$500 免費 + DHL 全球 2-4 天。適配行業: 婚...',
    basePrice: 1.2,
    weight_score: 50,
    images: ['/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-zh-hk-hero.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-zh-hk-detail.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-zh-hk-multi-angle.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-zh-hk-variety.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-en-hero.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-en-detail.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-en-multi-angle.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-en-variety.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-ja-hero.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-ja-detail.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-ja-multi-angle.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-foil-wedding-invitations-ja-variety.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-wedding-invitations-foil-wedding-invitations-zh-hk-hero.webp', en: 'zprintpro-wedding-invitations-foil-wedding-invitations-en-hero.webp', ja: 'zprintpro-wedding-invitations-foil-wedding-invitations-ja-hero.webp' },
    alt: {
      'zh-hk': '燙金結婚請帖 香港婚禮請柬印刷 厚卡燙金浮雕定制 | 智印港',
      en: 'Foil Wedding Invitations Gold Stamping Thick Cardstock Hong Kong | ZprintPro',
      ja: '箔押し結婚式招待状 厚紙カード 香港印刷 カスタム | ZprintPro',
    },
  },
    isHot: false,
    isNew: true,
    minQuantity: 50,
        category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '燙金喜帖', nameEn: 'Foil Wedding Invitations', nameJa: '箔押し結婚式招待状',
    description: '300g 棉紙燙金喜帖,玫瑰金 / 香檳金 / 銀色燙金工藝,50 套起印。順豐本地滿 HK$500 免費 + DHL 全球 2-4 天。適配行業: 婚慶/酒店/教堂/海外婚禮/Save the Date/感謝卡.',
    descriptionEn: '300gsm cotton foil wedding invitations in rose gold / champagne / silver finishes, 50 sets MOQ. Free shipping over $99 to USA + DHL Express 2-4 day global. Best for: weddings / hotels / chapels / destination weddings / Save the Date / thank you cards.',
    descriptionJa: '300g コットン箔押し結婚式招待状、ローズゴールド/シャンパンゴールド/銀仕上げ、50 セットから。DHL 国際 2-4 日配送。適合業種: 結婚式 / ホテル / チャペル /  destination wedding / Save the Date / サンキュカード.',
    price_range: 'NT$25-95 / 套',
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    specs: { material: '300g 棉紙 / 350g 剛古紙 / 300g 銅版紙', size: '130×190mm 標準請帖 / 190×260mm 對摺請帖', finishing: '燙金 (金/銀/玫瑰金/香檳金) + UV 局部 + 模切異形', printMethod: '柯式印刷 4C + 燙金' },
  },
  {
    id: 'WI-003',
    sku_code: 'WI-003',
    slug: 'wedding-thank-you-cards',

    title_zh: '婚禮感謝卡',
    description_zh: '婚禮感謝卡 100 套起印,300g 棉紙 / 銅版紙 / 剛古紙 + 燙金 / UV / 模切,配信封。順豐本地 + DHL 全球。適配行業: 婚慶答...',
    basePrice: 0.65,
    weight_score: 50,
    images: ['/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-zh-hk-hero.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-zh-hk-hero.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-zh-hk-detail.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-zh-hk-multi-angle.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-zh-hk-variety.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-en-hero.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-en-detail.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-en-multi-angle.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-en-variety.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-ja-hero.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-ja-detail.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-ja-multi-angle.webp',
      '/images/products/seedream-webp/zprintpro-wedding-invitations-wedding-thank-you-cards-ja-variety.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-wedding-invitations-wedding-thank-you-cards-zh-hk-hero.webp', en: 'zprintpro-wedding-invitations-wedding-thank-you-cards-en-hero.webp', ja: 'zprintpro-wedding-invitations-wedding-thank-you-cards-ja-hero.webp' },
    alt: {
      'zh-hk': '婚禮感謝卡 香港結婚回謝卡印刷 厚卡定制 | 智印港',
      en: 'Wedding Thank You Cards Custom Printing Hong Kong | ZprintPro',
      ja: '結婚式サンキューカード 香港印刷 オーダーメイド | ZprintPro',
    },
  },
    isHot: false,
    isNew: true,
    minQuantity: 50,
        category: 'wedding-invitations',
    category_slug: 'wedding-invitations',
    name: '婚禮感謝卡', nameEn: 'Wedding Thank You Cards', nameJa: '結婚式サンキュカード',
    description: '婚禮感謝卡 100 套起印,300g 棉紙 / 銅版紙 / 剛古紙 + 燙金 / UV / 模切,配信封。順豐本地 + DHL 全球。適配行業: 婚慶答謝/教堂/海外婚禮/教堂紀念/感謝卡.',
    descriptionEn: 'Wedding thank you cards 50 sets MOQ, 300gsm cotton / art / Conqueror paper + foil / UV / die-cut, envelopes included. Free shipping over $99 + DHL 2-4 day global. Best for: wedding thank-yous / chapels / destination weddings / church memorials / thank you cards.',
    descriptionJa: '結婚式サンキュカード 100 セットから、300g コットン / コート / コンカラー紙 + 箔押し / UV / 抜型、封筒付き。DHL 国際 2-4 日配送。適合業種: 結婚式サンキュー / チャペル /  destination wedding / 教会記念 / サンキュカード.',
    price_range: 'NT$15-55 / 套',
    optimizedAt: '2026-08-18',
    optimizationRound: 1,
    specs: { material: '300g 棉紙 / 銅版紙 / 剛古紙', size: 'A6 (105×148mm) / 對摺 A5', finishing: '燙金 / UV / 模切 / 折卡', printMethod: '柯式印刷 4C + 折卡' },
  },

  // === 枱卡 / 酒水牌 / 座位卡 (6 SKU, K3 8/17 拍板 Step 2) ===
];

// 获取所有产品
export function getAllProducts(): Product[] {
  return products;
}

// 根据slug获取产品
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

// 获取所有分类
export function getCategories(): Category[] {
  return categories;
}

// 根据分类slug获取分类
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

// 根据分类获取产品
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.category === categorySlug);
}

// 搜索产品 — 复用 search-helpers 模块 (2026-06-08 抽出)
// 实际实现在 src/data/search-helpers.ts, 这里 re-export 保持向后兼容
export { searchProducts, searchCategories, searchAll } from './search-helpers';

// 获取产品标题（根据语言）
// 2026-07-14 P0 fix: name 字段结构是 "短名 | 短名 / 类目长尾"，如 "防水貼紙 | 防水貼紙 / 異形貼紙"
// 之前直接 return product.name 会让 H1 / breadcrumb / image alt 出现 3x 重复
// 修法: 按 '|' split 取 [0] 短名（去重 + 干净），影响 9 个用法（page.tsx / ProductCard / RelatedProducts / HotProducts / QuoteCalculator / guide / not-found / blog / BlogContent）
export function getProductTitle(product: Product, locale: string): string {
  let raw: string;
  switch (locale) {
    case 'zh-hk':
      raw = product.name;
      break;
    case 'en':
      raw = product.nameEn;
      break;
    case 'ja':
      raw = product.nameJa;
      break;
    default:
      raw = product.name;
  }
  // 短名化: 按 '|' split 取 [0]（处理 "A | B" 或 "A | B / C" 两种 pattern）
  // 注意: 拆完再做 trim 避免 "A | B" → " A" 残留
  const short = raw.split('|')[0].trim();
  return short || raw;  // 极端 fallback（空 short 时回退原 name）
}

// V8 优化版 display title (SSoT for ALL display contexts: 首页/搜索/RelatedProducts/QuoteCalculator)
// 2026-07-15 修首页短标题 root cause: 4 caller 之前直接用 getProductTitle 返 V6 短名
//   - HotProducts.tsx (首页)
//   - src/components/ProductCard.tsx (search page, capital P)
//   - RelatedProducts.tsx (PDP 推荐)
//   - QuoteCalculator.tsx (报价计算器)
//
// 修法: 新加此函数永远返 V8 (走 h1-builder for 3 locale), 4 caller 切换即可.
// page.tsx (PDP) 仍用 getProductTitle (V6) 因为 h1-builder input 需要短名, 不能 V8 → V8 builder.
export function getProductDisplayTitle(product: Product, locale: string): string {
  const baseTitle = getProductTitle(product, locale); // V6 短名
  switch (locale) {
    case 'en':
      return buildProductH1En(baseTitle, product.category_slug);
    case 'ja':
      return buildProductH1Ja(baseTitle, product.category_slug);
    case 'zh-hk':
    default: {
      // 优先用 title_zh 字段 (Cline V8 期间补的短名), 没有再 fallback 到 getProductTitle
      const shortBase = (product as any).title_zh || baseTitle;
      const cat = categories.find(c => c.slug === product.category);
      return buildProductH1ZhHk(
        shortBase,
        (cat as any)?.name_zh || (cat as any)?.name || product.category,
        product.category,
        product.slug
      );
    }
  }
}

// 获取产品描述（根据语言）
export function getProductDescription(product: Product, locale: string): string {
  switch (locale) {
    case 'zh-hk':
      return product.description;
    case 'en':
      return product.descriptionEn;
    case 'ja':
      return product.descriptionJa;
    default:
      return product.description;
  }
}

// 获取分类名称（根据语言）
export function getCategoryName(category: Category, locale: string): string {
  switch (locale) {
    case 'zh-hk':
      return category.name_zh;
    case 'en':
      return category.name_en;
    case 'ja':
      return category.name_ja;
    default:
      return category.name_zh;
  }
}

// SEO-optimized image alt text generator
// 2026-07-14 P0 fix: 加 isValidImageAlt() 质量防护
// 背景: 之前 cron 误把 FAQ 内容（如 "這款貼紙的最小訂購量是多少？"）寫到 imageAlt 字段
// 修法: 检测 FAQ 特征（问号/？/长度>120/含特定 trigger 词），命中则降级到 fallback
function isValidImageAlt(alt: string): boolean {
  if (!alt || alt.length === 0) return false;
  if (alt.length > 120) return false;  // 正常 alt < 80 字符
  // FAQ 特征：问号开头 或 含 FAQ 触发词
  if (/^[？?]/.test(alt.trim())) return false;
  if (/[？?]$/.test(alt.trim())) return false;  // 也拒绝句末问号
  const faqTriggers = ['多少', '什么', '哪裡', '哪些', '如何', '怎么', '可以嗎', '嗎', '呢', 'what is', 'how to', 'why', 'when', 'where'];
  const lower = alt.toLowerCase();
  for (const t of faqTriggers) {
    if (lower.includes(t)) return false;
  }
  return true;
}

export function getProductImageAlt(product: Product, locale: string): string {
  // 优先：从 sku-seo-data 取（78 个 SKU 的高质量 alt）
  const sku = getSkuSeo(product.slug);
  const candidate = sku?.imageAlt?.[locale as 'zh-hk' | 'en' | 'ja'];
  if (candidate && isValidImageAlt(candidate)) {
    return candidate;
  }
  // 降级: 走短名（避免 product.name 出现 3x 重复）+ description 截断
  const shortName = (product.name.split('|')[0] || product.name).trim();
  const shortNameEn = (product.nameEn.split('|')[0] || product.nameEn).trim();
  const shortNameJa = (product.nameJa.split('|')[0] || product.nameJa).trim();
  const titles: Record<string, string> = {
    'zh-hk': `香港${shortName}印刷 | ${product.description.slice(0, 25)} | 智印港`,
    en: `${shortNameEn} Printing | ${product.descriptionEn.slice(0, 35)} | ZprintPro`,
    ja: `${shortNameJa} | ${product.descriptionJa.slice(0, 25)} | ZprintPro`,
  };
  return titles[locale] || titles['zh-hk'];
}