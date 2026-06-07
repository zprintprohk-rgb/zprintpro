/**
 * 产品数据服务模块
 * 从CSV加载79个SKU产品数据
 * 提供分类、搜索、筛选功能
 */
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
  basePrice: number;
  weight_score: number;
  isHot: boolean;
  isNew: boolean;
  minQuantity: number;
  turnaround?: string;
  images: string[];
  imagesByLocale?: {
    'zh-hk'?: string[];
    en?: string[];
    ja?: string[];
  };
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

// 13个产品分类
export const categories: Category[] = [
  // 六大核心主营分类（按全球市场搜索量+利润率+战略优先级排序）
  { slug: 'stickers', name: '貼紙印刷', nameEn: 'Stickers', nameJa: 'ステッカー印刷', name_zh: '貼紙印刷', name_en: 'Stickers', name_ja: 'ステッカー印刷', sort_order: 1 },
  { slug: 'flyers', name: '宣傳單張', nameEn: 'Flyers', nameJa: 'チラシ印刷', name_zh: '宣傳單張', name_en: 'Flyers', name_ja: 'チラシ印刷', sort_order: 2 },
  { slug: 'packaging', name: '包裝盒定制', nameEn: 'Packaging', nameJa: 'パッケージ印刷', name_zh: '包裝盒定制', name_en: 'Packaging', name_ja: 'パッケージ印刷', sort_order: 3 },
  { slug: 'posters', name: '定制海報', nameEn: 'Posters', nameJa: 'ポスター印刷', name_zh: '定制海報', name_en: 'Posters', name_ja: 'ポスター印刷', sort_order: 4 },
  { slug: 'paper-bags', name: '紙袋印刷', nameEn: 'Paper Bags', nameJa: '紙袋印刷', name_zh: '紙袋印刷', name_en: 'Paper Bags', name_ja: '紙袋印刷', sort_order: 5 },
  { slug: 'business-cards', name: '咭片印刷', nameEn: 'Business Cards', nameJa: '名刺印刷', name_zh: '咭片印刷', name_en: 'Business Cards', name_ja: '名刺印刷', sort_order: 6 },
  // 次要分类
  { slug: 'banners', name: '噴繪廣告', nameEn: 'Banners', nameJa: 'バナー印刷', name_zh: '噴繪廣告', name_en: 'Banners', name_ja: 'バナー印刷', sort_order: 7 },
  { slug: 'books', name: '書籍印刷', nameEn: 'Books', nameJa: '書籍印刷', name_zh: '書籍印刷', name_en: 'Books', name_ja: '書籍印刷', sort_order: 8 },
  { slug: 'menus', name: '餐牌印刷', nameEn: 'Menus', nameJa: 'メニュー印刷', name_zh: '餐牌印刷', name_en: 'Menus', name_ja: 'メニュー印刷', sort_order: 9 },
  { slug: 'envelopes', name: '信封印刷', nameEn: 'Envelopes', nameJa: '封筒印刷', name_zh: '信封印刷', name_en: 'Envelopes', name_ja: '封筒印刷', sort_order: 10 },
  { slug: 'calendars', name: '年曆印刷', nameEn: 'Calendars', nameJa: 'カレンダー印刷', name_zh: '年曆印刷', name_en: 'Calendars', name_ja: 'カレンダー印刷', sort_order: 11 },
  { slug: 'red-packets', name: '利是封印刷', nameEn: 'Red Packets', nameJa: 'ポチ袋印刷', name_zh: '利是封印刷', name_en: 'Red Packets', name_ja: 'ポチ袋印刷', sort_order: 12 },
  { slug: 'educational', name: '校園教育印刷', nameEn: 'Educational', nameJa: '教育印刷', name_zh: '校園教育印刷', name_en: 'Educational', name_ja: '教育印刷', sort_order: 13 },
];

// 79个SKU产品数据
export const products: Product[] = [
  // 咭片印刷 (6 SKU)
  {
    id: 'BC-001',
    sku_code: 'BC-001',
    slug: 'premium-business-cards',
    category: 'business-cards',
    category_slug: 'business-cards',
    name: '高級商務咭片', nameEn: 'Premium Business Cards', nameJa: '高級名刺', title_zh: '高級商務咭片',
    description: '採用300g高級銅版紙，配合專業四色印刷，展現企業專業形象。可選啞膠或光膠表面處理，觸感細膩，色彩鮮豔持久。', descriptionEn: '300g premium glossy paper with professional 4-color printing. Optional matte or glossy lamination for a refined touch.', descriptionJa: '300g高級コート紙、プロ4色印刷。マットまたはグロスラミネーション選択可。', description_zh: '採用300g高級銅版紙，配合專業四色印刷，展現企業專業形象。可選啞膠或光膠表面處理，觸感細膩，色彩鮮豔持久。',
    longDescription: `智印云高級商務咭片採用300g高級銅版紙或250g啞粉藝術紙，配合海德堡四色柯式印刷，網點還原細膩，色彩飽和度達90%以上。表面可選啞膠或光膠覆膜，啞膠觸感絲滑不反光，光膠透亮耐磨；亦可升級局部UV或燙金工藝，提升品牌辨識度。成品尺寸標準85×54mm，支援圓角模切（R3mm），避免邊角翹起。我們提供免費色彩校樣與刀模檢查，確保批量印製時顏色一致。適合企業高管、金融業、法律顧問及創意產業人士。與分類頁內容一致，材質關鍵詞包含：銅版紙、啞粉紙、覆膜（啞膠／光膠）、局部UV、燙金。`,
    longDescriptionEn: `ZprintPro Premium Business Cards use 300g premium glossy art paper or 250g matte art paper, paired with Heidelberg 4-color offset printing for fine halftone reproduction and 90%+ color saturation. Surface options include matte or gloss lamination with optional spot UV or foil stamping. Standard size 85×54mm with optional R3mm rounded corners. Free color proofing ensures batch consistency. Ideal for executives, finance, legal, and creative professionals.`,
    longDescriptionJa: `智印云の高級名刺は300g高級コート紙または250gマットアート紙を使用し、ハイデルベルク4色オフセット印刷で細かい網点再現と90%以上の色飽和を実現します。表面はマットまたはグロスラミネートが選べ、局部UVや箔押しも可能です。標準サイズ85×54mm、R3mm丸角ダイカット対応。無料のカラープルーフでロットの色合いを一定に保ちます。`,
    features: [
      '【85×54mm標準尺寸】兼容全球名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【300g銅版／250g啞粉】高級紙張，挺度與觸感兼具',
      '【100張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或250g啞粉藝術紙；啞膠／光膠覆膜',
      size: '85×54mm（標準）；R3mm圓角可選',
      printMethod: '四色柯式印刷（海德堡）',
      finishing: '覆膜（啞膠／光膠）、局部UV、燙金、圓角模切',
    },
    price_range: 'HK$100-180/100張',
    basePrice: 1.0,
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/premium-business-cards.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-ja.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-premium-business-cards-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-business-cards-premium-business-cards-zh-hk.webp', en: 'zprintpro-business-cards-premium-business-cards-en.webp', ja: 'zprintpro-business-cards-premium-business-cards-ja.webp' },
    alt: {
      'zh-hk': '香港高級商務咭片印刷 300g銅版紙 覆膜（啞膠／光膠）',
      en: 'Premium Business Cards | Professional Business Cards Hong Kong',
      ja: '高級名刺 | 香港プロ名刺'
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  },
  {
    id: 'BC-002',
    sku_code: 'BC-002',
    slug: 'thick-business-cards-400g',
    category: 'business-cards',
    category_slug: 'business-cards',
    name: '厚身咭片(400g)', nameEn: 'Thick Business Cards (400g)', nameJa: '厚紙名刺(400g)', title_zh: '厚身咭片(400g)',
    description: '400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。', descriptionEn: '400g ultra-thick paper with substantial feel. Perfect for high-end service industry, designers, lawyers.', descriptionJa: '400g超厚紙、重厚な質感。高級サービス業、デザイナー、弁護士向け。', description_zh: '400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高端服務業、設計師、律師等專業人士。',
    longDescription: `智印云厚身咭片採用400g超厚銅版紙，厚度達標準名片的1.3倍，挺度極佳，手感沈穩厚實，彰顯尊貴品質。配合四色柯式印刷，網點細膩，色彩飽和。表面可選啞膠或光膠覆膜，亦可追加燙金或壓紋工藝。特別適合高端服務業、設計師、律師等需要展現專業權威的專業人士。成品標準85×54mm，邊角經過加壓處理不易翹曲。我們提供免費打樣與色彩確認服務。與分類頁內容一致，材質關鍵詞包含：400g銅版紙、厚身咭片、覆膜、燙金、壓紋。<h3>咭片克重對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">規格</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">質感</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用人群</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g 標準</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">一般商務、初創</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g 厚身</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">設計師、律師、高端服務</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g 特厚</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">奢侈品牌、VIP卡</td></tr></tbody></table><h3>咭片克重對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">規格</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">質感</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用人群</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g 標準</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">一般商務、初創</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g 厚身</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">設計師、律師、高端服務</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g 特厚</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">奢侈品牌、VIP卡</td></tr></tbody></table>`,
    longDescriptionEn: `ZprintPro Thick Business Cards use 400g ultra-thick glossy paper—1.3× standard thickness—with exceptional rigidity and a substantial, prestigious feel. Paired with 4-color offset printing for fine halftones and saturated color. Surface options include matte or gloss lamination, plus foil stamping or embossing. Ideal for high-end service professionals, designers, and lawyers. Standard 85×54mm with reinforced edges. Free sampling and color confirmation.<h3>Business Card GSM Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Weight</th><th class="p-2 text-center">Rigidity</th><th class="p-2 text-center">Feel</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g Standard</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">General business, startups</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g Thick</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Designers, lawyers, premium</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g Ultra</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Luxury brands, VIP cards</td></tr></tbody></table>`,
    longDescriptionJa: `智印云の厚紙名刺は400g超厚コート紙を使用し、標準の1.3倍の厚さで優れた挺度と重厚な質感を実現します。4色オフセット印刷で細かい網点と飽和した色彩を再現。マットまたはグロスラミネートに加え、箔押しやエンボスも可能です。高級サービス業、デザイナー、弁護士向け。標準85×54mm、補強されたエッジ。無料サンプルとカラー確認。<h3>名刺厚さ比較スコアカード</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">規格</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">質感</th><th class="p-2 text-center">コスト</th><th class="p-2 text-left">おすすめ用途</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g 標準</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">一般ビジネス、スタートアップ</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g 厚紙</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">デザイナー、弁護士、高級サービス</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g 超厚</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">ラグジュアリーブランド、VIPカード</td></tr></tbody></table>`,
    features: [
      '【85×54mm標準尺寸】兼容全球名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【400g超厚紙】厚度1.3倍，手感沈穩尊貴',
      '【100張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '400g超厚銅版紙；啞膠／光膠覆膜',
      size: '85×54mm（標準）',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膠／光膠）、燙金、壓紋',
    },
    price_range: 'HK$120-220/100張',
    basePrice: 1.2,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/thick-business-cards-400g.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-en.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-en-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-en-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-en-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-ja.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-thick-business-cards-400g-ja-5.webp',
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-business-cards-thick-business-cards-400g-zh-hk.webp', en: 'zprintpro-business-cards-thick-business-cards-400g-en.webp', ja: 'zprintpro-business-cards-thick-business-cards-400g-ja.webp' },
    alt: {
      'zh-hk': '香港厚身咭片(400g)印刷 400g超厚銅版紙 覆膜（啞膠／光膠）',
      en: 'Thick Business Cards (400g) | Professional Business Cards Hong Kong',
      ja: '厚紙名刺(400g) | 香港プロ名刺'
    },
  },
  },
  {
    id: 'BC-003',
    sku_code: 'BC-003',
    slug: 'foil-business-cards',
    category: 'business-cards',
    category_slug: 'business-cards',
    name: '燙金/燙銀咭片', nameEn: 'Foil Stamped Business Cards', nameJa: '箔押し名刺', title_zh: '燙金/燙銀咭片',
    description: '局部燙金或燙銀工藝，在光線下閃耀奪目，瞬間提升品牌檔次。可燙金色、銀色、玫瑰金等多種顏色。', descriptionEn: 'Foil stamping in gold or silver, shining under light to elevate brand image. Available in gold, silver, rose gold.', descriptionJa: '部分的な箔押し加工、光に輝いてブランドイメージ向上。金・銀・ローズゴールド対応。', description_zh: '局部燙金或燙銀工藝，在光線下閃耀奪目，瞬間提升品牌檔次。可燙金色、銀色、玫瑰金等多種顏色。',
    longDescription: `智印云燙金燙銀咭片採用300g高級銅版紙或棉質紙，配合四色柯式印刷與局部燙金工藝，在光線下呈現金屬光澤，瞬間提升品牌奢華感。可燙金色、銀色、玫瑰金等多種顏色，燙印區域精準控制在0.5mm以上線寬，確保細節清晰不糊。表面可選啞膠或光膠覆膜保護燙印層。適合高端品牌、奢侈品代理、珠寶及金融服務業。成品尺寸85×54mm，支援圓角模切。與分類頁內容一致，材質關鍵詞包含：燙金咭片、銅版紙、棉質紙、覆膜。`,
    longDescriptionEn: `ZprintPro Foil Stamped Business Cards use 300g premium glossy or cotton paper with 4-color offset printing and foil stamping. Metallic shine under light instantly elevates brand luxury. Available in gold, silver, and rose gold with stamping precision at 0.5mm+ line width. Matte or gloss lamination protects the foil layer. Ideal for premium brands, luxury agents, jewelry, and financial services. Standard 85×54mm with optional rounded corners.`,
    longDescriptionJa: `智印云の箔押し名刺は300g高級コート紙またはコットン紙を使用し、4色オフセット印刷と局部箔押しで光に輝く金属光沢を演出します。金、銀、ローズゴールド対応で、0.5mm以上の線幅で細部まで鮮明に押印。マットまたはグロスラミネートで箔層を保護します。高級ブランド、高級品代理、宝石、金融サービス業向け。`,
    features: [
      '【85×54mm標準尺寸】兼容全球名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【三色燙金】金／銀／玫瑰金，奢華品牌首選',
      '【100張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或棉質紙；燙金／燙銀／玫瑰金',
      size: '85×54mm（標準）',
      printMethod: '四色柯式＋燙金',
      finishing: '覆膜（啞膠／光膠）、燙金、圓角模切',
    },
    price_range: 'HK$180-320/100張',
    basePrice: 1.8,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/foil-business-cards.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-en.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-en-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-en-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-ja.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-foil-business-cards-ja-5.webp',
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-business-cards-foil-business-cards-zh-hk.webp', en: 'zprintpro-business-cards-foil-business-cards-en.webp', ja: 'zprintpro-business-cards-foil-business-cards-ja.webp' },
    alt: {
      'zh-hk': '香港燙金/燙銀咭片印刷 300g銅版紙 覆膜（啞膠／光膠）',
      en: 'Foil Stamped Business Cards | Professional Business Cards Hong Kong',
      ja: '箔押し名刺 | 香港プロ名刺'
    },
  },
  },
  {
    id: 'BC-004',
    sku_code: 'BC-004',
    slug: 'spot-uv-business-cards',
    category: 'business-cards',
    category_slug: 'business-cards',
    name: 'UV局部光油咭片', nameEn: 'Spot UV Business Cards', nameJa: '局部UV名刺', title_zh: 'UV局部光油咭片',
    description: '局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。', descriptionEn: 'Spot UV coating creates glossy, dimensional effects on logos or designs. Strong visual impact for creative industries.', descriptionJa: '部分UVコーティングでロゴやデザインに立体的な光沢効果。クリエイティブ業界向け。', description_zh: '局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。適合創意行業、設計公司。',
    longDescription: `智印云UV局部光油咭片採用300g銅版紙或合成紙，配合四色柯式印刷與局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。UV層厚度約20–30微米，耐磨耐刮且防水，與周圍啞面形成強烈質感對比。適合創意行業、設計公司、廣告代理及科技初創。成品尺寸85×54mm，可選圓角或直角。與分類頁內容一致，材質關鍵詞包含：局部UV咭片、銅版紙、合成紙、光油。`,
    longDescriptionEn: `ZprintPro Spot UV Business Cards use 300g glossy or synthetic paper with 4-color offset printing and spot UV coating. Logos and designs gain dimensional gloss with strong visual impact. The UV layer at 20–30 microns is abrasion-resistant, scratch-proof, and water-resistant, creating a striking texture contrast against the matte surround. Ideal for creative industries, design firms, ad agencies, and tech startups. Standard 85×54mm.`,
    longDescriptionJa: `智印云の局部UV名刺は300gコート紙または合成紙を使用し、4色オフセット印刷と局部UVコーティングでロゴやデザインに立体的な光沢効果を与えます。UV層は20～30ミクロンで耐摩耗、耐傷、耐水性があり、マットな周囲との質感対比が際立ちます。クリエイティブ業界、デザイン事務所、広告代理店、テックスタートアップ向け。`,
    features: [
      '【85×54mm標準尺寸】兼容全球名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【局部UV】20–30微米立體光澤，視覺衝擊強烈',
      '【100張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或合成紙；局部UV光油',
      size: '85×54mm（標準）',
      printMethod: '四色柯式＋局部UV',
      finishing: '局部UV、覆膜（啞膠／光膠）、圓角模切',
    },
    price_range: 'HK$140-260/100張',
    basePrice: 1.4,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/spot-uv-business-cards.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-en.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-en-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-en-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-ja.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-spot-uv-business-cards-ja-4.webp',
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-business-cards-spot-uv-business-cards-zh-hk.webp', en: 'zprintpro-business-cards-spot-uv-business-cards-en.webp', ja: 'zprintpro-business-cards-spot-uv-business-cards-ja.webp' },
    alt: {
      'zh-hk': '香港UV局部光油咭片印刷 300g銅版紙 局部UV',
      en: 'Spot UV Business Cards | Professional Business Cards Hong Kong',
      ja: '局部UV名刺 | 香港プロ名刺'
    },
  },
  },
  {
    id: 'BC-005',
    sku_code: 'BC-005',
    slug: 'matte-business-cards',
    category: 'business-cards',
    category_slug: 'business-cards',
    name: '啞膠咭片', nameEn: 'Matte Laminated Cards', nameJa: 'マット名刺', title_zh: '啞膠咭片',
    description: '啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。', descriptionEn: 'Matte lamination provides understated elegance and resists fingerprints. For detail-oriented professionals.', descriptionJa: 'マットラミネーション加工、落ち着いた質感で指紋が付きにくい。', description_zh: '啞膠表面處理，低調內斂的質感，不易留下指紋。適合注重細節的專業人士。',
    longDescription: `智印云啞膠咭片採用300g啞粉紙或環保紙，配合四色柯式印刷與啞膠覆膜工藝，表面絲滑細膩、低調內斂，不易留下指紋與反光，適合注重細節的專業人士。啞膠層厚度均勻，有效保護印刷面免受磨損，同時提升觸感層次。可選局部燙金或壓凹作為點綴。適合顧問業、會計師、法律界及醫療專業人士。成品尺寸85×54mm。與分類頁內容一致，材質關鍵詞包含：啞膠咭片、啞粉紙、環保紙、覆膜。`,
    longDescriptionEn: `ZprintPro Matte Laminated Cards use 300g matte art or eco paper with 4-color offset printing and matte lamination. The silky, understated surface resists fingerprints and glare—ideal for detail-oriented professionals. The uniform lamination layer protects the print from wear while enhancing tactile depth. Optional foil stamping or debossing accents available. Ideal for consultants, accountants, legal, and medical professionals. Standard 85×54mm.`,
    longDescriptionJa: `智印云のマット名刺は300gマットアート紙または環境配慮紙を使用し、4色オフセット印刷とマットラミネートで絹のような細やかで落ち着いた表面を実現します。指紋や反射を防ぎ、細部にこだわるプロフェッショナル向け。均一なラミネート層が印刷面を摩耗から保護し、触感の深みを演出します。コンサルタント、会計士、法律、医療専門家向け。`,
    features: [
      '【85×54mm標準尺寸】兼容全球名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【啞膠覆膜】絲滑細膩，指紋反光雙抗性',
      '【100張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g啞粉紙或環保紙；啞膠覆膜',
      size: '85×54mm（標準）',
      printMethod: '四色柯式印刷',
      finishing: '啞膠覆膜、燙金、壓凹、圓角模切',
    },
    price_range: 'HK$110-190/100張',
    basePrice: 1.1,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/matte-business-cards.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-en.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-en-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-en-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-en-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-ja.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-matte-business-cards-ja-5.webp',
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.75 },
        { value: 2000, label: '2000張', discount: 0.65 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-business-cards-matte-business-cards-zh-hk.webp', en: 'zprintpro-business-cards-matte-business-cards-en.webp', ja: 'zprintpro-business-cards-matte-business-cards-ja.webp' },
    alt: {
      'zh-hk': '香港啞膠咭片印刷 300g啞粉紙 啞膠覆膜',
      en: 'Matte Laminated Cards | Professional Business Cards Hong Kong',
      ja: 'マット名刺 | 香港プロ名刺'
    },
  },
  },
  {
    id: 'BC-006',
    sku_code: 'BC-006',
    slug: 'rounded-corner-cards',
    category: 'business-cards',
    category_slug: 'business-cards',
    name: '圓角咭片', nameEn: 'Rounded Corner Cards', nameJa: '丸角名刺', title_zh: '圓角咭片',
    description: '圓角設計，柔和美觀且不易折損。展現與眾不同的品味，適合創意產業。', descriptionEn: 'Rounded corners for soft aesthetics and durability. Shows unique taste, perfect for creative industries.', descriptionJa: '丸角デザイン、柔らかく美しく折れにくい。クリエイティブ業界向け。', description_zh: '圓角設計，柔和美觀且不易折損。展現與眾不同的品味，適合創意產業。',
    longDescription: `智印云圓角咭片採用300g銅版紙或藝術紙，配合四色柯式印刷與R3mm圓角模切工藝，邊角柔和美觀且不易折損，展現與眾不同的品味。圓角處理經過精密刀模，邊緣光滑無毛刺。表面可選啞膠或光膠覆膜，亦可追加燙金或局部UV作為點綴。特別適合創意產業、設計師、品牌顧問及藝術工作者。成品標準85×54mm。與分類頁內容一致，材質關鍵詞包含：圓角咭片、銅版紙、藝術紙、覆膜。`,
    longDescriptionEn: `ZprintPro Rounded Corner Cards use 300g glossy or art paper with 4-color offset printing and R3mm rounded corner die-cutting. The soft, aesthetic corners resist damage and show distinctive taste. Corners are precisely die-cut with smooth, burr-free edges. Surface options include matte or gloss lamination with optional foil stamping or spot UV accents. Ideal for creative industries, designers, brand consultants, and artists. Standard 85×54mm.`,
    longDescriptionJa: `智印云の丸角名刺は300gコート紙またはアート紙を使用し、4色オフセット印刷とR3mm丸角ダイカットで柔らかく美しいコーナーを実現します。折れにくく、個性的な品味を演出します。精密な型抜きでバリのない滑らかなエッジ。マットまたはグロスラミネートに加え、箔押しや局部UVのオプションも可能です。クリエイティブ業界、デザイナー、ブランドコンサルタント、アーティスト向け。`,
    features: [
      '【85×54mm標準尺寸】兼容全球名片夾與卡套',
      '【四色柯式印刷】網點細膩，色彩飽和度≥90%',
      '【ICC色彩管理】品牌色還原穩定，批量一致',
      '【R3mm圓角】柔和美觀，邊角不易折損',
      '【100張起印】小批量數碼可當日取，大量轉柯式',
      '【免費刀模檢查】確保圓角與模切精準',
      '【覆膜保護】啞膠／光膠可選，耐磨防指紋'
    ],
    specs: {
      material: '300g銅版紙或藝術紙；啞膠／光膠覆膜',
      size: '85×54mm（標準）；R3mm圓角',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膠／光膠）、燙金、局部UV、圓角模切',
    },
    price_range: 'HK$100-170/100張',
    basePrice: 1.0,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/rounded-corner-cards.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-en.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-en-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-en-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-en-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-ja.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-business-cards-rounded-corner-cards-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-business-cards-rounded-corner-cards-zh-hk.webp', en: 'zprintpro-business-cards-rounded-corner-cards-en.webp', ja: 'zprintpro-business-cards-rounded-corner-cards-ja.webp' },
    alt: {
      'zh-hk': '香港圓角咭片印刷 300g銅版紙 覆膜（啞膠／光膠）',
      en: 'Rounded Corner Cards | Professional Business Cards Hong Kong',
      ja: '丸角名刺 | 香港プロ名刺'
    },
  },
  },
  // 貼紙印刷 (8 SKU)
  // 貼紙印刷 (8 SKU)
  {
    id: 'ST-001',
    sku_code: 'ST-001',
    slug: 'waterproof-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '防水貼紙', nameEn: 'Waterproof Stickers', nameJa: '防水ステッカー', title_zh: '防水貼紙',
    description: 'PVC材質防水貼紙，具有出色的防水、防曬、耐磨性能。適合戶外使用、產品標籤、車身貼紙等場景。', descriptionEn: 'PVC waterproof stickers with excellent water, UV, and abrasion resistance. Perfect for outdoor use, product labels, car decals.', descriptionJa: 'PVC防水ステッカー、優れた防水・UV・耐摩耗性。屋外使用、製品ラベル、車用ステッカーに最適。', description_zh: 'PVC材質防水貼紙，具有出色的防水、防曬、耐磨性能。適合戶外使用、產品標籤、車身貼紙等場景。',
    longDescription: `智印云防水貼紙採用 PVC 或 PP 合成紙面材，配合耐水油墨與可選光膜／啞膜覆膜，適合香港潮濕氣候與短暫戶外曝曬。常用於電器標籤、食品外包裝貼、外賣杯貼、工具箱標示及工地設備貼紙。我們支援異形模切與可變序號／QR Code，方便批次管理與防偽。印前建議預留模切出血與最小線寬，避免細線在模切時斷裂。小批量數碼印刷可快速打樣，大批量可轉柯式以壓低單價。與分類頁內容一致，材質關鍵詞包含：防水 PVC 貼紙、PP 合成紙、銅版紙貼紙、覆膜（啞膜／光膜）、模切。`,
    longDescriptionEn: `ZprintPro waterproof stickers use PVC or PP synthetic facestock with water-resistant inks and optional gloss or matte lamination—suited to Hong Kong humidity and short outdoor exposure. Typical uses include appliance labels, outer food packaging decals, takeaway cup stickers, toolbox markings, and on-site equipment tags. We support die-cut shapes plus variable serial numbers or QR codes for batch control and anti-counterfeiting. Prepress: allow kiss-cut bleed and minimum line width so fine lines survive cutting. Digital suits low MOQ and fast sampling; offset becomes economical at higher volumes. Terminology aligns with our category pillar content: waterproof PVC stickers, PP synthetic paper, art paper stickers, lamination (matte/gloss), die-cutting.`,
    longDescriptionJa: `智印云の防水ステッカーはPVCまたはPP合成紙の面材に耐水インク、必要に応じてグロス／マットのラミネートを組み合わせ、香港の多湿環境や短時間の屋外使用に適します。家電ラベル、食品外装、テイクアウトカップ、工具箱表示、現場機材タグなどに利用されます。型抜きや可変の連番／QRコードにも対応し、ロット管理や偽造対策に役立ちます。印前では型抜きのブリードと最小線幅を確保してください。小ロットはデジタル、大量はオフセットで単価最適化。カテゴリ用語：防水PVCステッカー、PP合成紙、コート紙、ラミネート（マット／グロス）、ダイカット。`,
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
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/waterproof-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-waterproof-stickers-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-waterproof-stickers-zh-hk.webp', en: 'zprintpro-stickers-waterproof-stickers-en.webp', ja: 'zprintpro-stickers-waterproof-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港防水貼紙印刷 PVC 防水／PP 合成紙 模切',
      en: 'Waterproof Stickers | Professional Stickers Hong Kong',
      ja: '防水ステッカー | 香港プロステッカー'
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  },
  {
    id: 'ST-002',
    sku_code: 'ST-002',
    slug: 'transparent-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '透明貼紙', nameEn: 'Transparent Stickers', nameJa: '透明ステッカー', title_zh: '透明貼紙',
    description: '透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。', descriptionEn: 'Transparent PET material creates invisible effect when applied. Perfect for cosmetics, food packaging, glass decoration.', descriptionJa: '透明PET素材、貼り付け後無感効果。化粧品、食品包装、ガラス装飾に最適。', description_zh: '透明PET材質，貼合後呈現無感效果，完美展現產品本身。適合化妝品、食品包裝、玻璃貼飾。',
    longDescription: `透明 PET 貼紙在玻璃瓶、塑膠瓶與透明包裝上能呈現「無底紙感」，僅保留圖案與文字，特別適合美妝精華、香水、飲品與禮盒封口貼。白墨托底可選，用於深色瓶身仍能還原飽和色彩。建議避免過細的反白線條，並為模切預留安全距離。可搭配啞膜減少指紋、光膜提升鮮豔度。與分類頁術語一致：透明 PET、局部 UV、覆膜、模切。香港零售與展會陳列常見應用包括試用裝標籤與限量貼紙。<h3>貼紙材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">透明度</th><th class="p-2 text-center">防水性</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">透明 PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">瓶身標籤、禮盒封條</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC 防水</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">戶外標籤、食品外賣</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">促銷貼紙、臨時標籤</td></tr></tbody></table><h3>貼紙材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">透明度</th><th class="p-2 text-center">防水性</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">透明 PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">瓶身標籤、禮盒封條</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC 防水</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">戶外標籤、食品外賣</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">促銷貼紙、臨時標籤</td></tr></tbody></table>`,
    longDescriptionEn: `Transparent PET stickers read nearly “label-free” on glass, plastic, or clear packaging—ideal for serums, perfumes, beverages, and gift seals. Optional white underprint keeps colors vivid on dark bottles. Avoid hairline reverse text and keep safe margins for die-cutting. Matte lamination reduces fingerprints; gloss boosts saturation. Terms match category content: clear PET, spot UV, lamination, die-cutting. Common in Hong Kong retail sampling and exhibition displays.<h3>Sticker Material Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Material</th><th class="p-2 text-center">Clarity</th><th class="p-2 text-center">Waterproof</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">Clear PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Bottle labels, gift seals</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC Waterproof</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Outdoor labels, food delivery</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">Art Paper</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Promotional stickers, temporary labels</td></tr></tbody></table>`,
    longDescriptionJa: `透明PETステッカーはガラス瓶やクリアパッケージでラベルレスに近い見え方を実現し、美容液・香水・飲料・ギフト封に適します。濃色容器には白下地で発色を確保。細すぎる抜きと型抜き安全距離に注意。マットラミで指紋軽減、グロスで鮮やかさ向上。用語はカテゴリと整合：透明PET、局部UV、ラミネート、ダイカット。香港の店頭サンプルや展示会でも好まれます。<h3>シール素材比較スコアカード</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">素材</th><th class="p-2 text-center">透明感</th><th class="p-2 text-center">防水性</th><th class="p-2 text-center">コスト</th><th class="p-2 text-left">おすすめ用途</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">透明PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">ボトルラベル、ギフト封</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC防水</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">屋外ラベル、食品デリバリー</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">コート紙</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">プロモーションシール、臨時ラベル</td></tr></tbody></table>`,
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
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-1.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-en.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-ja.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-transparent-stickers-ja-4.webp',
    ],
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-transparent-stickers-zh-hk-1.webp', en: 'zprintpro-stickers-transparent-stickers-en.webp', ja: 'zprintpro-stickers-transparent-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港透明貼紙印刷 透明 PET 覆膜（啞膜／光膜）',
      en: 'Hong Kong Transparent Stickers Printing Clear PET Laminated',
      ja: '透明ステッカー | 香港プロステッカー'
    },
  },
  },
  {
    id: 'ST-003',
    sku_code: 'ST-003',
    slug: 'removable-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '可移貼紙(無殘膠)', nameEn: 'Removable Stickers', nameJa: 'はがせるステッカー', title_zh: '可移貼紙(無殘膠)',
    description: '特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。', descriptionEn: 'Special adhesive design leaves no residue when removed. Perfect for car windows, glass displays, short-term exhibitions.', descriptionJa: '特殊粘着設計、剥がしても残りません。車窓、ガラス展示、短期展示会に最適。', description_zh: '特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車窗、玻璃櫥窗、短期展覽。',
    longDescription: `智印云可移貼紙採用可移除性壓敏膠，面材以 PP 合成紙或 PET 透明膜為主，移除時不殘膠、不傷漆面，特別適合香港車窗、商場玻璃櫥窗、短期展覽及租房裝飾。膠水經過 24 小時初黏／72 小時持黏測試，在光滑表面可重複張貼 3–5 次。我們支援異形模切與可變序號，方便活動分區管理。印前請確認稿件不含細於 0.5mm 的線條，避免模切時斷裂。小批量數碼印刷可當日打樣，大批量轉柯式可降低單價至 HK$0.3 以下。與分類頁內容一致，材質關鍵詞包含：可移膠貼紙、PP 合成紙、PET 透明貼紙、模切、覆膜。`,
    longDescriptionEn: `ZprintPro removable stickers use repositionable pressure-sensitive adhesive with PP synthetic or PET clear film facestock. They peel off cleanly without residue or surface damage—ideal for Hong Kong car windows, retail glass displays, short-term exhibitions, and rental decorations. The adhesive passes 24-hour tack and 72-hour adhesion tests, allowing 3–5 repositions on smooth surfaces. We support die-cut shapes and variable serial numbers for event zone management. Prepress: avoid lines finer than 0.5mm to prevent cutting breakage. Digital printing enables same-day sampling; offset reduces unit cost below HK$0.3 at volume. Terminology aligns with category content: removable adhesive stickers, PP synthetic paper, PET clear stickers, die-cutting, lamination.`,
    longDescriptionJa: `智印云のはがせるステッカーは再剥離性圧敏粘着剤を使用し、面材はPP合成紙またはPET透明フィルムです。剥がしても残りや表面傷がなく、香港の車窓、商業施設のガラス展示、短期展示会、賃貸装飾に最適です。接着剤は24時間タック／72時間保持テストをクリアし、平滑面で3～5回の再貼付が可能です。型抜きと可変連番に対応し、イベントのゾーン管理に便利です。印前では0.5mm未満の細線を避けてください。小ロットはデジタル印刷で当日サンプル、大量はオフセットで単価HK$0.3以下に最適化。カテゴリ用語：はがせるステッカー、PP合成紙、PET透明シール、ダイカット、ラミネート。`,
    features: [
      '【可移膠】移除不留殘膠，保護車漆與玻璃表面',
      '【PP/PET 面材】可選合成紙或透明膜，適配不同展示需求',
      '【3–5 次重貼】24 小時初黏測試，平滑面可反覆調整位置',
      '【異形模切】支援任意形狀裁切，活動分區管理更方便',
      '【可變資料】序號／條碼／QR Code，批次追蹤與防偽',
      '【數碼快印】100 張起印，當日打樣，適合急件與試產',
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/removable-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-ja-3.webp',
    ],
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-removable-stickers-zh-hk.webp', en: 'zprintpro-stickers-removable-stickers-en.webp', ja: 'zprintpro-stickers-removable-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港可移貼紙(無殘膠)印刷 PP 合成紙／PET 透明膜 模切',
      en: 'Removable Stickers | Professional Stickers Hong Kong',
      ja: 'はがせるステッカー | 香港プロステッカー'
    },
  },
  },
  {
    id: 'ST-004',
    sku_code: 'ST-004',
    slug: 'small-batch-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '小批量貼紙', nameEn: 'Small Batch Stickers', nameJa: '小ロットステッカー', title_zh: '小批量貼紙',
    description: '最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。', descriptionEn: 'Minimum A4 size order, no bulk inventory pressure. Perfect for startups, event promotion, personal creations.', descriptionJa: '最小A4サイズから、大量在庫の心配なし。スタートアップ、イベント宣伝、個人創作に最適。', description_zh: '最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、活動宣傳、個人創作。',
    longDescription: `智印云小批量貼紙專為初創品牌、獨立設計師及短期活動而生，最低 A4 尺寸起印，無需承擔大量庫存壓力。面材涵蓋銅版紙、合成紙、透明 PVC 及 Kraft 牛皮紙，配合四色數碼印刷，色彩還原度達 Delta E ≤3。我們提供免費刀模設計與印前檢查，支援圓角、異形模切與局部燙金。對於需要快速迭代包裝的電商賣家，小批量貼紙可在 1–2 個工作日內交付，並可配合可變資料印刷實現限量編號。與分類頁內容一致，材質關鍵詞包含：銅版紙貼紙、PP 合成紙、透明 PVC、模切、燙金。`,
    longDescriptionEn: `ZprintPro small-batch stickers are designed for startups, indie designers, and short-term events. Minimum order starts at A4 size with no bulk inventory pressure. Facestock options include art paper, synthetic paper, clear PVC, and kraft paper, paired with 4-color digital printing achieving Delta E ≤3 color accuracy. We offer free die-cut design and prepress checks, supporting rounded corners, custom die-cutting, and spot foil stamping. For e-commerce sellers needing rapid packaging iteration, small-batch stickers deliver in 1–2 working days and support variable data printing for limited edition numbering. Terminology aligns with category content: art paper stickers, PP synthetic paper, clear PVC, die-cutting, foil stamping.`,
    longDescriptionJa: `智印云の小ロットステッカーはスタートアップ、インディーデザイナー、短期イベント向けに設計されました。最小発注はA4サイズからで、大量在庫の心配がありません。面材はコート紙、合成紙、透明PVC、クラフト紙を含み、4色デジタル印刷でDelta E ≤3の色再現性を実現。無料の型抜き設計と印前チェックを提供し、丸角、異形ダイカット、局部箔押しに対応します。迅速なパッケージ更新が必要なEC売家には、1～2営業日で納品し、可変データ印刷で限定版連番も可能です。カテゴリ用語：コート紙ステッカー、PP合成紙、透明PVC、ダイカット、箔押し。`,
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/small-batch-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-ja-4.webp',
    ],
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-small-batch-stickers-zh-hk.webp', en: 'zprintpro-stickers-small-batch-stickers-en.webp', ja: 'zprintpro-stickers-small-batch-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港小批量貼紙印刷 銅版紙／PP 合成紙／透明 PVC／Kr 模切',
      en: 'Small Batch Stickers | Professional Stickers Hong Kong',
      ja: '小ロットステッカー | 香港プロステッカー'
    },
  },
  },
  {
    id: 'ST-005',
    sku_code: 'ST-005',
    slug: 'die-cut-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '異形模切貼紙', nameEn: 'Die-cut Stickers', nameJa: '型抜きステッカー', title_zh: '異形模切貼紙',
    description: '任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。', descriptionEn: 'Any shape die-cutting, creativity without limits. Can cut logo shapes, cartoon characters, unique contours.', descriptionJa: '任意形状の型抜き、創作の自由を制限しません。', description_zh: '任意形狀模切，讓創意不受限制。可切出Logo形狀、卡通形象等獨特輪廓。',
    longDescription: `異形模切貼紙以刀模沿設計外輪廓裁切，可呈現吉祥物、品牌剪影、不規則標籤等強烈辨識度，常見於文創周邊、咖啡杯貼、手機殼裝飾貼與活動贈品。材質可選 PVC 防水、PP 合成紙或透明 PET，並可覆啞膜／光膜提升耐用。模切時需預留足夠線寬與橋位，避免細節斷裂；吻切（Kiss-cut）方案可保留底紙方便撕取。與分類頁一致關鍵詞：異形模切、覆膜、可變資料。適合需要「一眼認品牌」的包裝與線下推廣物料。`,
    longDescriptionEn: `Die-cut stickers follow your outline for mascot shapes, logo silhouettes, or irregular labels—popular for creative merch, cup decals, phone skin accents, and event giveaways. Facestock options include waterproof PVC, PP synthetic, or clear PET, with matte or gloss lamination for durability. Allow adequate stroke width and bridges to avoid fragile cuts; kiss-cut keeps a liner for easy peeling. Keywords align with category content: die-cutting, lamination, variable data. Ideal when brand recognition must be instant at shelf or street level.`,
    longDescriptionJa: `ダイカットステッカーはナイフ線に沿って輪郭を裁断し、マスコットやロゴシルエットなど識別度の高い形状を実現。文創グッズ、カップデコ、イベントノベルティに適します。PVC防水、PP合成紙、透明PETから選択し、マット／グロスラミで耐久性向上。細線は断裂しやすいため線幅とブリッジを確保。キスカットで台紙残しも可。カテゴリ用語：ダイカット、ラミネート、可変データ。`,
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/die-cut-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-ja-4.webp',
    ],
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-die-cut-stickers-zh-hk.webp', en: 'zprintpro-stickers-die-cut-stickers-en.webp', ja: 'zprintpro-stickers-die-cut-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港異形模切貼紙印刷 PVC／PP 合成紙／透明 PET 模切（全切／吻切）',
      en: 'Die-cut Stickers | Professional Stickers Hong Kong',
      ja: '型抜きステッカー | 香港プロステッカー'
    },
  },
  },
  {
    id: 'ST-006',
    sku_code: 'ST-006',
    slug: 'foil-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '燙金貼紙', nameEn: 'Foil Stickers', nameJa: '箔押しステッカー', title_zh: '燙金貼紙',
    description: '燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。', descriptionEn: 'Foil stamping gives stickers premium quality feel. Perfect for luxury product labels, gift packaging, VIP badges.', descriptionJa: '箔押し加工でステッカーに高級感。高級製品ラベル、ギフト包装、VIPバッジに最適。', description_zh: '燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮品包裝、VIP標識。',
    longDescription: `燙金貼紙在光線下呈現金屬光澤，常用於節慶禮盒封口、精品酒標、美妝外盒貼與會議胸貼。可選燙金／燙銀／玫瑰金等色箔，建議與深底色或局部留白搭配以凸顯金屬層次。面材多為銅版紙或合成紙並可覆啞膜保護箔面。設計需預留燙金稿與印刷稿對位線；細字燙金需評估可製性。與分類頁術語一致：燙金／燙銀、局部 UV、覆膜、模切。適合需要「儀式感與禮贈感」的品牌物料。`,
    longDescriptionEn: `Foil stickers deliver metallic shine for festive seals, premium wine labels, beauty outer wraps, and conference badges. Choose gold, silver, rose gold, etc., often paired with deep backgrounds or reserved white space. Facestock is typically art or synthetic paper with matte lamination to protect foil. Supply separate foil layers and print registration marks; very small type may need feasibility review. Terms align with category content: foil stamping, spot UV, lamination, die-cutting—ideal for gift-worthy brand touchpoints.`,
    longDescriptionJa: `箔押しステッカーは光で金属光沢を呈し、ギフト封、高級ワインラベル、化粧外装、会議バッジに使用されます。金・銀・ローズゴールドなどを選べ、濃色地や余白設計でコントラストを強調。コート紙や合成紙にマットラミで箔面保護。箔版と印刷版の位置合わせが重要で、極小文字は製作可否を確認。用語：箔押し、局部UV、ラミネート、ダイカット。`,
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
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/foil-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-ja-4.webp',
    ],
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-foil-stickers-zh-hk.webp', en: 'zprintpro-stickers-foil-stickers-en.webp', ja: 'zprintpro-stickers-foil-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港燙金貼紙印刷 銅版紙／合成紙 燙金／燙銀',
      en: 'Foil Stickers | Professional Stickers Hong Kong',
      ja: '箔押しステッカー | 香港プロステッカー'
    },
  },
  },
  {
    id: 'ST-007',
    sku_code: 'ST-007',
    slug: 'security-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '防偽貼紙', nameEn: 'Security Stickers', nameJa: 'セキュリティステッカー', title_zh: '防偽貼紙',
    description: '特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。', descriptionEn: 'Special anti-counterfeiting processes including holographic labels, fragile paper, protecting brands from counterfeiting.', descriptionJa: '特殊な偽造防止加工、ホログラムラベル、壊れやすい紙など。', description_zh: '特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受假冒。',
    longDescription: `防偽貼紙結合易碎紙、VOID 開封留字、雷射全息或微縮文字等工藝，用於保修封條、高價電子產品封貼、證書邊貼與渠道竄貨管理。易碎材質一經撕起即產生破壞痕跡，可有效嚇阻換件與仿冒；可變 QR 與流水號便於追溯。設計需考慮貼附表面粗糙度與溫差。與分類頁一致：易碎貼紙、防偽、可變資料。適合重視渠道合規與售後責任的品牌商。`,
    longDescriptionEn: `Security stickers combine destructible paper, VOID reveal text, holographic film, or microtext for warranty seals, high-value electronics, certificate edges, and channel integrity. Destructible stocks show tamper evidence once lifted; variable QR and serials aid traceability. Design must consider surface texture and temperature swings. Terms align with category content: destructible stickers, anti-counterfeit, variable data—ideal for compliance-focused brands.`,
    longDescriptionJa: `セキュリティステッカーは易碎紙、VOID、ホログラム、微細文字などを組み合わせ、保証シール、高額機器、証書、流通管理に使用。剥がすと破壊痕が残り偽造抑止。可変QRと連番で追跡性向上。貼付面の粗さや温度差を考慮。用語：易碎、偽造防止、可変データ。`,
    features: [
      '易碎／VOID 等防拆材可選',
      '可變序號、QR、條碼防竄貨',
      '適用保修、3C、證書與封條',
      '可搭配雷射全息提升辨識',
      '印前防偽工藝組合建議',
      '批次留樣與色差控制',
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
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/security-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-ja-4.webp',
    ],
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.75 },
        { value: 1000, label: '1000張', discount: 0.6 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-security-stickers-zh-hk.webp', en: 'zprintpro-stickers-security-stickers-en.webp', ja: 'zprintpro-stickers-security-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港防偽貼紙印刷 易碎紙／VOID／合成紙＋全息膜等（依方 模切',
      en: 'Security Stickers | Professional Stickers Hong Kong',
      ja: 'セキュリティステッカー | 香港プロステッカー'
    },
  },
  },
  {
    id: 'ST-008',
    sku_code: 'ST-008',
    slug: 'fluorescent-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '螢光貼紙', nameEn: 'Fluorescent Stickers', nameJa: '蛍光ステッカー', title_zh: '螢光貼紙',
    description: '螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。', descriptionEn: 'Fluorescent colors, highly visible under light. Perfect for promotional labels, safety signs, event decoration.', descriptionJa: '蛍光色、光の下で非常に目立ちます。プロモーションラベル、安全標識、イベント装飾に最適。', description_zh: '螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識、活動裝飾。',
    longDescription: `智印云螢光貼紙採用高飽和度螢光油墨印刷於 PVC 或螢光紙面材，在日光及紫外線照射下呈現強烈視覺衝擊，特別適合促銷標籤、安全警示標識及夜店活動裝飾。油墨通過 SGS 遷移測試，不含重金屬，可應用於室內外短期展示。我們支援異形模切與反光條紋組合設計，提升夜間可見度。印前建議使用高對比度配色，避免細小文字低於 6pt 導致糊字。小批量數碼印刷當日可取，大批量柯式印刷可壓低單價。與分類頁內容一致，材質關鍵詞包含：螢光 PVC 貼紙、螢光紙、反光膜、模切。`,
    longDescriptionEn: `ZprintPro fluorescent stickers use high-saturation fluorescent inks printed on PVC or fluorescent paper facestock, delivering strong visual impact under daylight and UV light. Ideal for promotional labels, safety warning signs, and nightclub event decoration. Inks pass SGS migration testing, are heavy-metal-free, and suitable for short-term indoor and outdoor display. We support die-cut shapes combined with reflective stripe designs to enhance nighttime visibility. Prepress: use high-contrast color schemes and avoid text smaller than 6pt to prevent blurring. Same-day digital printing for small batches; offset printing reduces unit cost at volume. Terminology aligns with category content: fluorescent PVC stickers, fluorescent paper, reflective film, die-cutting.`,
    longDescriptionJa: `智印云の蛍光ステッカーは高彩度蛍光インクをPVCまたは蛍光紙に印刷し、日光や紫外線下で強い視覚的インパクトを生み出します。プロモーションラベル、安全警告標識、ナイトクラブイベント装飾に最適です。インクはSGS移行テストをクリアし、重金属フリーで、短期の屋内・屋外展示に対応します。型抜きと反射ストライプの組み合わせデザインで夜間視認性を向上。印前では高コントラスト配色を推奨し、6pt未満の細字は避けてください。小ロットは当日デジタル印刷、大量はオフセットで単価最適化。カテゴリ用語：蛍光PVCステッカー、蛍光紙、反射フィルム、ダイカット。`,
    features: [
      '【螢光油墨】高飽和度，日光下即顯強烈視覺衝擊',
      '【PVC／螢光紙】可選防水膜或紙質，適配室內外場景',
      '【SGS 認證】無重金屬遷移，安全用於食品與兒童相關標籤',
      '【反光組合】可搭配反光條紋，提升夜間可見度達 200%',
      '【異形模切】任意形狀裁切，安全標識與促銷標籤皆可',
      '【數碼快印】100 張起印，當日打樣，急單無憂',
      '【高對比建議】印前免費配色建議，確保 6pt 以上文字清晰',
    ],
    specs: {
      material: '螢光 PVC 膜／螢光紙；螢光油墨',
      size: '最小約 20×20mm，最大約 280×380mm',
      printMethod: '四色數碼或柯式（依數量）',
      finishing: '模切、反光條紋覆合、覆膜',
    },
    price_range: 'HK$0.52-2.00/張',
    basePrice: 0.52,
    weight_score: 80,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/fluorescent-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-fluorescent-stickers-zh-hk.webp', en: 'zprintpro-stickers-fluorescent-stickers-en.webp', ja: 'zprintpro-stickers-fluorescent-stickers-ja.webp' },
    alt: {
      'zh-hk': '香港螢光貼紙印刷 螢光 PVC 膜／螢光紙 模切',
      en: 'Fluorescent Stickers | Professional Stickers Hong Kong',
      ja: '蛍光ステッカー | 香港プロステッカー'
    },
  },
  },
  // 紙袋印刷 (6 SKU)
  {
    id: 'PB-001',
    sku_code: 'PB-001',
    slug: 'kraft-paper-bags',
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '牛皮紙袋', nameEn: 'Kraft Paper Bags', nameJa: 'クラフト紙袋', title_zh: '牛皮紙袋',
    description: '環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。', descriptionEn: 'Eco-friendly kraft paper, natural and rustic, loved by consumers. Perfect for clothing stores, gift shops, coffee shops.', descriptionJa: '環境に優しいクラフト紙、質朴で自然、消費者に人気。衣料品店、ギフトショップ、コーヒーショップに最適。', description_zh: '環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝店、禮品店、咖啡店。多種尺寸可選，可定制Logo印刷。',
    longDescription: `牛皮紙袋以未漂白或半漂白牛皮紙為主，呈現自然纖維質感，是香港文創、咖啡烘焙與輕食外帶最常見的環保購物袋選擇。可搭配棉繩／紙繩手挽、底部加固與側邊折位，提升承重與提拿舒適度。印刷可採單色簡約或四色滿版，亦可加燙金 Logo 提升禮品感。與分類頁術語一致：牛皮紙袋、白卡紙袋、燙金、局部 UV、手挽。建議依袋型預留糊位與出血，並在報價時確認克重（常見 120–200g）與是否需要食品級聲明。`,
    longDescriptionEn: `Kraft paper bags use unbleached or semi-bleached kraft stock for an authentic fiber look—popular with Hong Kong cafés, bakeries, and lifestyle retail. Pair with cotton or paper rope handles, base reinforcement, and gussets for better load comfort. Print from bold one-color identities to four-color coverage; foil logos add gifting appeal. Terms align with category content: kraft bags, white card bags, foil stamping, spot UV, handles. Specify glue flap, bleed, and typical weight (often 120–200gsm) plus any food-contact notes when quoting.`,
    longDescriptionJa: `クラフト紙袋は未晒／半晒クラフトで自然な繊維感を出し、香港のカフェやベーカリー、ライフスタイル店に好まれます。綿紐／紙紐、底補強、マチで耐荷重と持ち心地を改善。1色のミニマルから四色まで、箔押しロゴでギフト感も。用語：クラフト袋、白卡、箔押し、局部UV、持ち手。糊代・ブリード、斤量（120–200g級）と食品表記の要否を見積もりで確認。`,
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
      'zh-hk': '香港牛皮紙袋印刷 牛皮紙 120–200g 級（依報價） 燙金／燙銀',
      en: 'Kraft Paper Bags | Professional Paper Bags Hong Kong',
      ja: 'クラフト紙袋 | 香港プロ紙袋'
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
  },
  {
    id: 'PB-002',
    sku_code: 'PB-002',
    slug: 'white-card-bags',
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '白卡紙袋', nameEn: 'White Card Bags', nameJa: '白カード紙袋', title_zh: '白卡紙袋',
    description: '白卡紙材質，表面平整光滑，印刷效果佳。適合高端品牌、化妝品店。', descriptionEn: 'White card paper, smooth surface, excellent printing effect. Perfect for high-end brands, cosmetic stores.', descriptionJa: '白カード紙、表面が滑らかで印刷効果が抜群。高級ブランド、化粧品店に最適。', description_zh: '白卡紙材質，表面平整光滑，印刷效果佳。適合高端品牌、化妝品店。',
    longDescription: `白卡紙袋表面平滑、挺度高，四色印刷色彩飽和，是美妝、珠寶與精品服飾首選的「可行走廣告」。可搭配啞膠／光膠覆膜保護墨層，並以燙金、局部 UV 或凹凸壓紋強化 Logo 層次。手挽可選緞帶、棉繩或扁紙手挽以匹配品牌調性。與分類頁一致：白卡紙、燙金、覆膜、手挽。建議在刀模階段確認穿孔位與圖案安全距離，避免提袋時撕裂；大批量可評估柯式以降低單價。<h3>紙袋材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">印刷效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">白卡紙袋</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">美妝、珠寶、精品服飾</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">牛皮紙袋</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">文創、咖啡、有機食品</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙袋</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">百貨專櫃、促銷活動</td></tr></tbody></table><h3>紙袋材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">印刷效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">白卡紙袋</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">美妝、珠寶、精品服飾</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">牛皮紙袋</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">文創、咖啡、有機食品</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙袋</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">百貨專櫃、促銷活動</td></tr></tbody></table>`,
    longDescriptionEn: `White card bags offer a smooth, stiff surface with vibrant four-color printing—ideal walking billboards for beauty, jewelry, and premium apparel. Add matte or gloss lamination to protect ink, plus foil, spot UV, or embossing to elevate the logo. Handles range from ribbon to cotton or flat paper to match brand tone. Terms align with category content: white card, foil stamping, lamination, handles. Validate punch positions and safe margins at die stage; offset suits higher volumes for unit economics.<h3>Paper Bag Material Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Material</th><th class="p-2 text-center">Rigidity</th><th class="p-2 text-center">Print Quality</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">White Card Bag</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Beauty, jewelry, premium fashion</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">Kraft Paper Bag</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Lifestyle, coffee, organic food</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">Art Paper Bag</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Department stores, promotions</td></tr></tbody></table>`,
    longDescriptionJa: `白卡紙袋は平滑で高剛性、フルカラーの発色が美しく、美容・宝飾・プレミアムアパレルに適します。マット／グロスラミで保護し、箔押し・局部UV・エンボスでロゴを強調。持ち手はリボン、綿紐、平紙などから選択。用語：白卡、箔押し、ラミネート、持ち手。穿孔位置と安全距離を刀模で確認。大量はオフセットで単価最適化。<h3>紙袋素材比較スコアカード</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">素材</th><th class="p-2 text-center">剛性</th><th class="p-2 text-center">印刷品質</th><th class="p-2 text-center">コスト</th><th class="p-2 text-left">おすすめ用途</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">白卡紙袋</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">美容、宝飾、プレミアムファッション</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">クラフト紙袋</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">ライフスタイル、コーヒー、有機食品</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">コート紙袋</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">百貨店、プロモーション</td></tr></tbody></table>`,
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
      'zh-hk': '香港白卡紙袋印刷 白卡紙 200–300g 級（依報價） 覆膜',
      en: 'White Card Bags | Professional Paper Bags Hong Kong',
      ja: '白カード紙袋 | 香港プロ紙袋'
    },
  },
  },
  {
    id: 'PB-003',
    sku_code: 'PB-003',
    slug: 'gift-bags',
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '禮品紙袋', nameEn: 'Gift Bags', nameJa: 'ギフト紙袋', title_zh: '禮品紙袋',
    description: '精美設計，配合燙金、UV等工藝。送禮必備，提升禮品檔次。', descriptionEn: 'Exquisite design with foil stamping, UV and other processes. Essential for gifting, elevates gift quality.', descriptionJa: '精巧なデザイン、箔押し・UVなどの加工付き。ギフトに必須、ギフトの質を向上。', description_zh: '精美設計，配合燙金、UV等工藝。送禮必備，提升禮品檔次。',
    longDescription: `禮品紙袋強調開箱儀式感，常見於節慶禮盒、婚慶回禮、企業福袋與品牌周邊。紙材可選白卡、特種紋理紙或帶珠光效果，再配燙金祝福語、局部 UV 圖案與緞帶手挽。袋身可加大底部與側邊寬度以容納禮盒。與分類頁一致：禮品紙袋、燙金、絲帶手挽、覆膜。設計上宜控制大面積深色透底風險，並預留手挽穿孔加固；急件可拆數碼標簽與袋身印刷分段排產。`,
    longDescriptionEn: `Gift bags emphasize unboxing ritual—common for festive sets, wedding favors, corporate gift packs, and merch bundles. Stocks include white card, textured specialty, or pearlescent papers with foil greetings, spot UV accents, and ribbon handles. Widen base and gussets to fit rigid gift boxes. Terms align with category content: gift bags, foil stamping, ribbon handles, lamination. Manage heavy ink coverage to avoid show-through; reinforce handle punches; split digital labels vs bag print for rush schedules when needed.`,
    longDescriptionJa: `ギフト紙袋は開封の儀式感を高め、季節ギフト、結婚引き出物、企業福袋、グッズに使用。白卡・テクスチャ・パール系に箔押し、局部UV、リボン持ち手。底やマチを広げて箱に対応。用語：ギフト袋、箔押し、リボン、ラミネート。濃色ベタの透けに注意し、持ち手穴補強を。急ぎはラベルと袋印刷の分割も可。`,
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
      'zh-hk': '香港禮品紙袋印刷 白卡／特種紙／珠光紙（依稿） 燙金',
      en: 'Gift Bags | Professional Paper Bags Hong Kong',
      ja: 'ギフト紙袋 | 香港プロ紙袋'
    },
  },
  },
  {
    id: 'PB-004',
    sku_code: 'PB-004',
    slug: 'eco-paper-bags',
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '環保紙袋', nameEn: 'Eco Paper Bags', nameJa: 'エコ紙袋', title_zh: '環保紙袋',
    description: 'FSC認證環保紙張，可持續發展。適合注重環保的品牌。', descriptionEn: 'FSC-certified eco-friendly paper, sustainable development. Perfect for environmentally conscious brands.', descriptionJa: 'FSC認証の環境に優しい紙、持続可能な開発。環境に配慮するブランドに最適。', description_zh: 'FSC認證環保紙張，可持續發展。適合注重環保的品牌。',
    longDescription: `環保紙袋可採 FSC 認證牛皮或再生纖維紙材，搭配大豆油墨與可降解手挽，向消費者傳遞 ESG 與減塑承諾。外觀仍可透過單色凸版、水印圖騰或簡潔四色保持品牌辨識。適合有機零售、社企禮包與活動贈袋。與分類頁一致：環保再生紙、牛皮紙袋、手挽。報價時請確認紙張認證標示與印刷方式是否符合出口或商場對可持續包裝的要求。`,
    longDescriptionEn: `Eco paper bags can use FSC-certified kraft or recycled fiber with soy inks and compostable handles to signal ESG commitments. Visual identity can stay bold via letterpress-style solids, watermark motifs, or restrained four-color work—ideal for organic retail, social-enterprise kits, and event giveaways. Terms align with category content: recycled paper, kraft bags, handles. Confirm certification marks on artwork and whether print processes meet mall or export sustainability rules.`,
    longDescriptionJa: `エコ紙袋はFSC認証クラフトや再生紙、大豆インク、分解性持ち手でESG訴求。単色や透かしモチーフ、抑えた四色でブランドを表現。オーガニック小売や社企キットに適合。用語：再生紙、クラフト、持ち手。認証表示と商業施設／輸出のサステ要件を確認。`,
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
      'zh-hk': '香港環保紙袋印刷 FSC 牛皮／再生紙（依供應） 手挽',
      en: 'Eco Paper Bags | Professional Paper Bags Hong Kong',
      ja: 'エコ紙袋 | 香港プロ紙袋'
    },
  },
  },
  {
    id: 'PB-005',
    sku_code: 'PB-005',
    slug: 'handle-bags',
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '手挽紙袋', nameEn: 'Handle Bags', nameJa: '手提げ紙袋', title_zh: '手挽紙袋',
    description: '堅固手挽設計，承重能力強。適合購物中心、超市。', descriptionEn: 'Sturdy handle design, strong load-bearing capacity. Perfect for shopping centers, supermarkets.', descriptionJa: '頑丈な持ち手デザイン、強い耐荷重能力。ショッピングセンター、スーパーに最適。', description_zh: '堅固手挽設計，承重能力強。適合購物中心、超市。',
    longDescription: `手挽紙袋以穿孔加打釘或內折加固方式固定棉繩／扁紙挽，承重優於細繩款式，適合超市量販、服飾兩件裝與活動資料袋。紙材可選牛皮或白卡並加底卡加固。與分類頁一致：紙繩手挽、棉繩手挽、扁紙手挽、底部加固。建議在設計稿標示穿孔中心與最大載重測試需求；雨季可評估覆膜防潮。`,
    longDescriptionEn: `Handle paper bags use riveted or folded reinforcements for cotton or flat paper handles—stronger than thin twine options for supermarket volumes, apparel twin-packs, or event kits. Kraft or white card stocks with base inserts improve load. Terms align with category content: paper rope, cotton rope, flat paper handles, reinforced base. Mark punch centers and target load tests on artwork; consider lamination for rainy-season protection.`,
    longDescriptionJa: `手提げ紙袋は穿孔＋リベットや折り補強で綿紐／平紐を固定し、量販や衣料同梱、イベント資料に適します。クラフト／白卡に底補強。用語：紙紐、綿紐、平紐、底補強。孔位置と耐荷重を図面に明示。雨季はラミネートも検討。`,
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
      'zh-hk': '香港手挽紙袋印刷 牛皮／白卡 穿孔打釘',
      en: 'Handle Bags | Professional Paper Bags Hong Kong',
      ja: '手提げ紙袋 | 香港プロ紙袋'
    },
  },
  },
  {
    id: 'PB-007',
    sku_code: 'PB-007',
    slug: 'large-bags',
    category: 'paper-bags',
    category_slug: 'paper-bags',
    name: '大號紙袋', nameEn: 'Large Bags', nameJa: '大判紙袋', title_zh: '大號紙袋',
    description: '加大尺寸，適合服裝、鞋類等大件商品。', descriptionEn: 'Large size, perfect for clothing, shoes and other large items.', descriptionJa: '大きなサイズ、衣類、靴などの大物に最適。', description_zh: '加大尺寸，適合服裝、鞋類等大件商品。',
    longDescription: `智印云大號紙袋專為服裝、鞋類及大型禮品包裝設計，展開尺寸可達 320×120×380mm，底部採用加固車縫與貼底工藝，承重提升至 8–10 公斤。面材可選 250g 白卡紙、300g 牛皮紙或 280g 特種紋理紙，配合四色柯式印刷，色彩飽和且不易褪色。手挽提供棉繩、紙繩、緞帶及仿皮繩四種選擇，顏色可與袋身 Pantone 對色。我們提供免費結構設計與打樣，確保承重與美觀兼具。與分類頁內容一致，材質關鍵詞包含：白卡紙袋、牛皮紙袋、特種紙袋、燙金、擊凸、手挽繩。`,
    longDescriptionEn: `ZprintPro large paper bags are designed for clothing, footwear, and large gift packaging, with expanded dimensions up to 320×120×380mm. The base uses reinforced stitching and bottom-pasting construction, increasing load capacity to 8–10kg. Facestock options include 250g white card, 300g kraft paper, or 280g specialty textured paper, paired with 4-color offset printing for saturated, fade-resistant color. Handle choices include cotton rope, paper rope, satin ribbon, and faux leather cord, with colors Pantone-matched to the bag body. We provide free structural design and prototyping to ensure both load capacity and aesthetics. Terminology aligns with category content: white card bags, kraft paper bags, specialty paper bags, foil stamping, embossing, handle ropes.`,
    longDescriptionJa: `智印云の大判紙袋は衣類、靴、大型ギフト包装向けに設計され、展開サイズは最大320×120×380mmです。底部は補強縫製と貼り底工法を採用し、耐荷重を8～10kgに向上させます。面材は250g白カード紙、300gクラフト紙、280g特殊テクスチャ紙から選択でき、4色オフセット印刷で飽和しにくい発色を実現します。取っ手は綿紐、紙紐、サテンリボン、合成皮革紐の4種類から選べ、袋身のPantone対色も可能です。無料の構造設計とサンプル提供で、耐荷重と美観を両立させます。カテゴリ用語：白カード紙袋、クラフト紙袋、特殊紙袋、箔押し、エンボス、取っ手紐。`,
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
      'zh-hk': '香港大號紙袋印刷 250g 白卡紙／300g 牛皮紙／28 燙金／燙銀',
      en: 'Large Bags | Professional Paper Bags Hong Kong',
      ja: '大判紙袋 | 香港プロ紙袋'
    },
  },
  },
  // 宣傳單張 (7 SKU) — 保留即日宣傳單張作为SEO流量入口
  {
    id: 'FL-001',
    sku_code: 'FL-001',
    slug: 'a4-flyers',
    category: 'flyers',
    category_slug: 'flyers',
    name: 'A4宣傳單張', nameEn: 'A4 Flyers', nameJa: 'A4チラシ', title_zh: 'A4宣傳單張',
    description: '標準A4尺寸，最常用的宣傳單張規格。157g銅版紙，四色印刷，色彩鮮豔。適合產品推廣、活動宣傳。', descriptionEn: 'Standard A4 size, most common flyer format. 157g glossy paper, 4-color printing, vibrant colors.', descriptionJa: '標準A4サイズ、最も一般的なチラシ形式。157gコート紙、4色印刷、鮮やかな色彩。', description_zh: '標準A4尺寸，最常用的宣傳單張規格。157g銅版紙，四色印刷，色彩鮮豔。適合產品推廣、活動宣傳。',
    longDescription: `智印云A4宣傳單張採用157g高級銅版紙或128g啞粉紙，配合四色柯式或數碼印刷，色彩飽和、圖文清晰。A4尺寸（210×297mm）是香港最通用的宣傳單張規格，適合產品推廣、活動宣傳、課程招生及新店開幕。可選單面或雙面印刷，雙面容量翻倍。我們提供免費排版與出血檢查，確保裁切後文字不被切掉。與分類頁內容一致，材質關鍵詞包含：A4單張、銅版紙、啞粉紙、四色印刷。`,
    longDescriptionEn: `ZprintPro A4 Flyers use 157g premium glossy or 128g matte art paper with 4-color offset or digital printing for saturated color and crisp text. A4 size (210×297mm) is Hong Kong's most common flyer format—ideal for product promotion, event advertising, course enrollment, and grand openings. Single or double-sided printing available. Free layout and bleed checks ensure text isn't trimmed.`,
    longDescriptionJa: `智印云のA4チラシは157g高級コート紙または128gマットアート紙を使用し、4色オフセットまたはデジタル印刷で飽和した色彩と鮮明な文字を実現します。A4サイズ（210×297mm）は香港で最も一般的なチラシ形式で、製品プロモーション、イベント広告、コース募集、新店オープンに最適です。片面または両面印刷が可能です。`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【210×297mm】香港最通用規格，派發效果佳',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g銅版紙或128g啞粉紙',
      size: 'A4（210×297mm）',
      printMethod: '四色柯式或數碼印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.22-0.80/張',
    basePrice: 0.22,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/a4-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-zh-hk-2.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-en-2.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-ja-2.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-a4-flyers-zh-hk.webp', en: 'zprintpro-flyers-a4-flyers-en.webp', ja: 'zprintpro-flyers-a4-flyers-ja.webp' },
    alt: {
      'zh-hk': '香港A4宣傳單張印刷 157g銅版紙 覆膜（啞膜／光膜可選）',
      en: 'A4 Flyers | Professional Flyers Hong Kong',
      ja: 'A4チラシ | 香港プロチラシ'
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
  },
  {
    id: 'FL-002',
    sku_code: 'FL-002',
    slug: 'a5-flyers',
    category: 'flyers',
    category_slug: 'flyers',
    name: 'A5宣傳單張', nameEn: 'A5 Flyers', nameJa: 'A5チラシ', title_zh: 'A5宣傳單張',
    description: 'A5尺寸，經濟實惠，適合大量派發。餐飲外賣、快閃活動首選。', descriptionEn: 'A5 size, economical, perfect for mass distribution. First choice for food delivery, flash events.', descriptionJa: 'A5サイズ、経済的、大量配布に最適。フードデリバリー、フラッシュイベントの第一選択。', description_zh: 'A5尺寸，經濟實惠，適合大量派發。餐飲外賣、快閃活動首選。',
    longDescription: `智印云A5宣傳單張採用128g銅版紙或100g書紙，配合四色數碼印刷，經濟實惠且色彩鮮豔。A5尺寸（148×210mm）適合大量派發，成本較A4降低約40%，是餐飲外賣、快閃活動及社區宣傳的首選。可選單面或雙面印刷，並支援二維碼與優惠券設計。我們提供免費排版與出血檢查，確保裁切精準。與分類頁內容一致，材質關鍵詞包含：A5單張、銅版紙、書紙、數碼印刷。<h3>傳單尺寸對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">尺寸</th><th class="p-2 text-center">資訊容量</th><th class="p-2 text-center">派發效率</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">詳細產品目錄、課程介紹</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">餐飲外賣、活動宣傳</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">街頭派發、外賣插頁</td></tr></tbody></table><h3>傳單尺寸對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">尺寸</th><th class="p-2 text-center">資訊容量</th><th class="p-2 text-center">派發效率</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">詳細產品目錄、課程介紹</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">餐飲外賣、活動宣傳</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">街頭派發、外賣插頁</td></tr></tbody></table>`,
    longDescriptionEn: `ZprintPro A5 Flyers use 128g glossy or 100g book paper with 4-color digital printing—economical yet vibrant. A5 size (148×210mm) is perfect for mass distribution at ~40% lower cost than A4. First choice for food delivery, flash events, and community outreach. Single or double-sided with QR code and coupon design support.<h3>Flyer Size Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Size</th><th class="p-2 text-center">Info Capacity</th><th class="p-2 text-center">Distribution</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Product catalogs, course guides</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Food delivery, event promos</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Street handouts, takeaway inserts</td></tr></tbody></table>`,
    longDescriptionJa: `智印云のA5チラシは128gコート紙または100g書籍紙を使用し、4色デジタル印刷で経済的かつ鮮やかです。A5サイズ（148×210mm）は大量配布に最適で、A4より約40%コスト削減。フードデリバリー、フラッシュイベント、コミュニティアウトリーチの第一選択です。<h3>チラシサイズ比較スコアカード</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">サイズ</th><th class="p-2 text-center">情報量</th><th class="p-2 text-center">配布効率</th><th class="p-2 text-center">コスト</th><th class="p-2 text-left">おすすめ用途</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">製品カタログ、講座案内</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">フードデリバリー、イベント宣伝</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">街頭配布、テイクアウト挿入</td></tr></tbody></table>`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【148×210mm】大量派發成本低40%',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '128g銅版紙或100g書紙',
      size: 'A5（148×210mm）',
      printMethod: '四色數碼印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.18-0.65/張',
    basePrice: 0.18,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/a5-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-en-1.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-ja-2.webp',
    ],
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
      'zh-hk': '香港A5宣傳單張印刷 128g銅版紙 覆膜（啞膜／光膜可選）',
      en: 'A5 Flyers | Professional Flyers Hong Kong',
      ja: 'A5チラシ | 香港プロチラシ'
    },
  },
  },
  {
    id: 'FL-003',
    sku_code: 'FL-003',
    slug: 'double-sided-flyers',
    category: 'flyers',
    category_slug: 'flyers',
    name: '雙面宣傳單張', nameEn: 'Double-sided Flyers', nameJa: '両面チラシ', title_zh: '雙面宣傳單張',
    description: '雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細介紹。', descriptionEn: 'Double-sided full color printing, doubled information capacity.', descriptionJa: '両面フルカラー印刷、情報容量が2倍。', description_zh: '雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細介紹。',
    longDescription: `智印云雙面宣傳單張採用157g銅版紙或128g啞粉紙，配合四色雙面柯式印刷，正面吸引眼球，背面詳細介紹，信息容量翻倍。雙面對位精度控制在±0.5mm以內，確保正反圖文精準套印。適合產品目錄、服務介紹、活動詳情及會議資料。可選啞膜或光膜覆膜提升耐用性。我們提供免費排版與對位檢查。與分類頁內容一致，材質關鍵詞包含：雙面單張、銅版紙、啞粉紙、四色雙面印刷。`,
    longDescriptionEn: `ZprintPro Double-sided Flyers use 157g glossy or 128g matte paper with 4-color duplex offset printing. Front side grabs attention while the back provides detailed information—doubled content capacity. Front-to-back registration precision within ±0.5mm ensures accurate alignment. Ideal for product catalogs, service introductions, event details, and meeting materials.`,
    longDescriptionJa: `智印云の両面チラシは157gコート紙または128gマット紙を使用し、4色両面オフセット印刷で表面は注目を集め、裏面は詳細情報を提供します。情報容量が2倍に。前後の套印精度は±0.5mm以内で正確な位置合わせを保証します。製品カタログ、サービス紹介、イベント詳細、会議資料に最適です。`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【雙面對位±0.5mm】正反圖文精準套印',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g銅版紙或128g啞粉紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色雙面柯式印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.27-0.95/張',
    basePrice: 0.27,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/double-sided-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-en-2.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-ja-2.webp',
    ],
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
    filename: { 'zh-hk': 'zprintpro-flyers-double-sided-flyers-zh-hk.webp', en: 'zprintpro-flyers-double-sided-flyers-en.webp', ja: 'zprintpro-flyers-double-sided-flyers-ja.webp' },
    alt: {
      'zh-hk': '香港雙面宣傳單張印刷 157g銅版紙 覆膜（啞膜／光膜可選）',
      en: 'Double-sided Flyers | Professional Flyers Hong Kong',
      ja: '両面チラシ | 香港プロチラシ'
    },
  },
  },
  {
    id: 'FL-004',
    sku_code: 'FL-004',
    slug: 'folded-leaflets',
    category: 'flyers',
    category_slug: 'flyers',
    name: '摺疊宣傳單張', nameEn: 'Folded Leaflets', nameJa: '折りたたみパンフレット', title_zh: '摺疊宣傳單張',
    description: '對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。', descriptionEn: 'Bi-fold or tri-fold design, can display more information.', descriptionJa: '二つ折りまたは三つ折りデザイン、より多くの情報を表示可能。', description_zh: '對摺或三摺設計，可展示更多信息。適合產品目錄、服務介紹。',
    longDescription: `智印云摺疊宣傳單張採用157g或200g銅版紙，配合對摺或三摺設計，展開後可展示更多信息。對摺尺寸為A4展開（210×297mm），三摺為A4展開或DL尺寸（99×210mm）。摺線經過壓線處理，摺疊平整不易反彈。適合產品目錄、服務介紹、餐牌及旅遊宣傳。可選啞膜或光膜覆膜保護摺頁。我們提供免費摺法設計與排版。與分類頁內容一致，材質關鍵詞包含：摺疊單張、對摺、三摺、銅版紙、壓線。`,
    longDescriptionEn: `ZprintPro Folded Leaflets use 157g or 200g glossy paper with bi-fold or tri-fold designs. Bi-fold opens to A4 (210×297mm); tri-fold is A4 or DL (99×210mm). Creases are scored for flat, rebound-resistant folding. Ideal for product catalogs, service introductions, menus, and travel brochures. Optional lamination protects folded panels.`,
    longDescriptionJa: `智印云の折りたたみパンフレットは157gまたは200gコート紙を使用し、二つ折りまたは三つ折りデザイン。二つ折りはA4（210×297mm）、三つ折りはA4またはDL（99×210mm）。折り目は圧線処理で平らに折れ、反発しにくいです。製品カタログ、サービス紹介、メニュー、旅行パンフレットに最適です。`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【對摺／三摺】壓線處理，摺疊平整不反彈',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g或200g銅版紙',
      size: 'A4展開（210×297mm）或DL（99×210mm）',
      printMethod: '四色柯式或數碼印刷',
      finishing: '壓線、覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.55-1.95/張',
    basePrice: 0.55,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/folded-leaflets.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-zh-hk-2.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-en-2.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-ja-2.webp',
    ],
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
      'zh-hk': '香港摺疊宣傳單張印刷 157g 壓線',
      en: 'Folded Leaflets | Professional Flyers Hong Kong',
      ja: '折りたたみパンフレット | 香港プロチラシ'
    },
  },
  },
  {
    id: 'FL-005',
    sku_code: 'FL-005',
    slug: 'thick-paper-flyers',
    category: 'flyers',
    category_slug: 'flyers',
    name: '厚紙宣傳單張', nameEn: 'Thick Paper Flyers', nameJa: '厚紙チラシ', title_zh: '厚紙宣傳單張',
    description: '200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。', descriptionEn: '200g+ thick paper, better texture, not easily damaged.', descriptionJa: '200g以上の厚紙、質感が良く折れにくい。', description_zh: '200g以上厚紙，質感更佳，不易折損。適合高端產品宣傳。',
    longDescription: `智印云厚紙宣傳單張採用200g或250g高級銅版紙，配合四色柯式印刷，紙張挺度高、質感厚實，不易折損或捲曲。厚紙單張在派發時更具份量感，適合高端產品宣傳、房地產樓書、汽車展覽及奢侈品牌活動。可選啞膜或光膜覆膜進一步提升耐用性與質感。我們提供免費色彩校樣，確保批量顏色一致。與分類頁內容一致，材質關鍵詞包含：厚紙單張、200g銅版紙、250g銅版紙、覆膜。`,
    longDescriptionEn: `ZprintPro Thick Paper Flyers use 200g or 250g premium glossy paper with 4-color offset printing. High rigidity and substantial texture resist creasing and curling. Thick flyers convey weight and quality—ideal for premium product launches, property brochures, auto shows, and luxury brand events. Optional lamination further enhances durability and texture.`,
    longDescriptionJa: `智印云の厚紙チラシは200gまたは250g高級コート紙を使用し、4色オフセット印刷で高い挺度と厚みのある質感を実現します。折れや巻き上がりを防ぎます。重みのある配布物として、高級製品発表、不動産パンフレット、自動車ショー、高級ブランドイベントに最適です。`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【200g–250g厚紙】挺度高，質感厚實不捲曲',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '200g或250g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膜／光膜可選）',
    },
    price_range: 'HK$0.35-1.20/張',
    basePrice: 0.35,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/thick-paper-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-zh-hk-2.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-en-2.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-ja-2.webp',
    ],
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
    filename: { 'zh-hk': 'zprintpro-flyers-thick-paper-flyers-zh-hk.webp', en: 'zprintpro-flyers-thick-paper-flyers-en.webp', ja: 'zprintpro-flyers-thick-paper-flyers-ja.webp' },
    alt: {
      'zh-hk': '香港厚紙宣傳單張印刷 200g 覆膜（啞膜／光膜可選）',
      en: 'Thick Paper Flyers | Professional Flyers Hong Kong',
      ja: '厚紙チラシ | 香港プロチラシ'
    },
  },
  },
  {
    id: 'FL-007',
    sku_code: 'FL-007',
    slug: 'eco-flyers',
    category: 'flyers',
    category_slug: 'flyers',
    name: '環保宣傳單張', nameEn: 'Eco Flyers', nameJa: 'エコチラシ', title_zh: '環保宣傳單張',
    description: '環保紙張印刷，展現企業責任。適合環保主題活動。', descriptionEn: 'Eco-friendly paper printing, showing corporate responsibility.', descriptionJa: '環境に優しい紙の印刷、企業の責任を示す。', description_zh: '環保紙張印刷，展現企業責任。適合環保主題活動。',
    longDescription: `智印云環保宣傳單張採用FSC認證再生紙或大豆油墨印刷，展現企業社會責任與環保形象。紙張為100%再生纖維，觸感自然略帶紋理，適合環保主題活動、NGO宣傳、綠色產品推廣及企業ESG報告。可選單面或雙面印刷，並支援種子紙等特殊環保材質。我們提供碳足跡計算與環保認證標章。與分類頁內容一致，材質關鍵詞包含：環保單張、FSC認證、再生紙、大豆油墨。`,
    longDescriptionEn: `ZprintPro Eco Flyers use FSC-certified recycled paper with soy-based inks, showcasing corporate social responsibility and eco-branding. 100% recycled fiber with a natural, slightly textured feel. Ideal for environmental campaigns, NGO outreach, green product launches, and corporate ESG reports. Single or double-sided printing with special options like seed paper. Carbon footprint calculation and eco-certification labels available.`,
    longDescriptionJa: `智印云のエコチラシはFSC認証リサイクル紙と大豆インクを使用し、企業の社会的責任と環境ブランディングを演出します。100%再生繊維で自然なテクスチャー。環境キャンペーン、NGOアウトリーチ、グリーンプロダクトローンチ、企業ESGレポートに最適です。`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【FSC認證再生紙】100%再生纖維，環保形象加分',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: 'FSC認證再生紙；大豆油墨',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '無覆膜（環保）或水性光油',
    },
    price_range: 'HK$0.27-0.95/張',
    basePrice: 0.27,
    weight_score: 80,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/eco-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-en-3.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-ja-3.webp',
    ],
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
      'zh-hk': '香港環保宣傳單張印刷 FSC認證再生紙 無覆膜（環保）或水性光油',
      en: 'Eco Flyers | Professional Flyers Hong Kong',
      ja: 'エコチラシ | 香港プロチラシ'
    },
  },
  },
  {
    id: 'FL-008',
    sku_code: 'FL-008',
    slug: 'same-day-flyers',
    category: 'flyers',
    category_slug: 'flyers',
    name: '即日宣傳單張', nameEn: 'Same-day Flyers', nameJa: '即日チラシ', title_zh: '即日宣傳單張',
    description: '緊急活動首選，最快當天交貨。即日印刷、即日快遞出貨，急件不擔心。', descriptionEn: 'First choice for emergency events, same-day printing and courier delivery available.', descriptionJa: '緊急イベントの第一選択、最短当日印刷・宅配便発送。', description_zh: '緊急活動首選，最快當天交貨。即日印刷、即日快遞出貨，急件不擔心。',
    longDescription: `智印云即日宣傳單張採用157g銅版紙，配合四色高速數碼印刷，從接稿到出貨最快4小時完成。適合緊急活動、突發促銷、新聞發布及臨時會議資料。我們提供專人急件通道，確保稿件優先處理，並可配合即日快遞或專人送貨。雖然是急單，但我們仍堅持色彩校準與出血檢查，確保品質不打折。與分類頁內容一致，材質關鍵詞包含：即日單張、數碼印刷、急件、銅版紙。`,
    longDescriptionEn: `ZprintPro Same-day Flyers use 157g glossy paper with high-speed 4-color digital printing— from file receipt to shipment in as fast as 4 hours. Ideal for emergency events, flash sales, press releases, and last-minute meeting materials. Dedicated rush handling ensures priority processing with same-day courier or personal delivery. Despite the rush, we maintain color calibration and bleed checks for uncompromised quality.`,
    longDescriptionJa: `智印云の即日チラシは157gコート紙を使用し、高速4色デジタル印刷で、データ受付から発送まで最短4時間。緊急イベント、フラッシュセール、プレスリリース、直前の会議資料に最適です。専用の急便処理で優先的に対応し、当日宅配便または個人配達も可能です。急いでも色彩キャリブレーションとブリードチェックを徹底し、品質を妥協しません。`,
    features: [
      '【A4／A5標準尺寸】最常見派發規格，兼容性強',
      '【四色數碼／柯式】色彩鮮豔，適合照片與圖文混排',
      '【157g–250g紙張】銅版紙或啞粉紙，挺度適中',
      '【4小時出貨】從接稿到出貨，急單品質不打折',
      '【即日可取】數碼印刷急單當天交付',
      '【免費刀模】異形裁切與圓角可選',
      '【覆膜選項】啞膜／光膜提升耐用性'
    ],
    specs: {
      material: '157g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色高速數碼印刷',
      finishing: '無覆膜或啞膜（加時）',
    },
    price_range: 'HK$0.40-1.50/張',
    basePrice: 0.4,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/same-day-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-en-3.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-ja-3.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-flyers-same-day-flyers-zh-hk.webp', en: 'zprintpro-flyers-same-day-flyers-en.webp', ja: 'zprintpro-flyers-same-day-flyers-ja.webp' },
    alt: {
      'zh-hk': '香港即日宣傳單張印刷 157g銅版紙 無覆膜或啞膜（加時）',
      en: 'Same-day Flyers | Professional Flyers Hong Kong',
      ja: '即日チラシ | 香港プロチラシ'
    },
  },
  },
  // 海報定制 (6 SKU)
  {
    id: 'PO-001',
    sku_code: 'PO-001',
    slug: 'a2-posters',
    category: 'posters',
    category_slug: 'posters',
    name: 'A2海報印刷', nameEn: 'A2 Posters', nameJa: 'A2ポスター', title_zh: 'A2海報印刷',
    description: '標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，即日交貨。', descriptionEn: 'Standard A2 size, first choice for event promotion. 157g glossy paper, vibrant colors, same-day delivery.', descriptionJa: '標準A2サイズ、イベント宣伝の第一選択。157gコート紙、鮮やかな色彩、即日納品。', description_zh: '標準A2尺寸，活動宣傳、產品推廣首選。157g銅版紙，色彩鮮豔，即日交貨。',
    longDescription: `A2 海報在辦公室牆面、電梯間與店內立架之間取得最佳可讀距離，是講座、市集與新品上市的「標準戰術尺寸」。157g 銅版紙在柯式或高品數碼下能呈現飽和產品色與細緻人像；可選 PP 護膜或裱泡沫板提升耐用。與分類頁一致：海報印刷、銅版紙、覆膜。建議預留 3mm 出血並轉 CMYK，避免霓虹色超出色域；急件可拆數碼快印與後工裱貼分段排程。`,
    longDescriptionEn: `A2 posters hit the sweet spot between office walls, lift lobbies, and floor easels—ideal for talks, markets, and product drops. 157gsm art paper delivers punchy product tones and portrait detail under offset or high-quality digital; add PP lamination or foam mounting for durability. Terms align with category content: poster printing, coated art paper, lamination. Supply 3mm bleed and CMYK builds to avoid out-of-gamut neons; rush jobs can split digital print from mounting.`,
    longDescriptionJa: `A2ポスターはオフィス壁、エレベーター前、イーゼルで視認距離に最適。講演・マルシェ・新商品に。157gアート紙で発色と肌質を両立。PPラミやフォームマウントで耐久向上。用語：ポスター印刷、コート紙、ラミネート。3mmブリードとCMYK変換を推奨。急ぎは印刷と後加工を分割も可。`,
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
    price_range: 'HK$10-35/張',
    basePrice: 10,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/a2-posters.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-zh-hk-3.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-3.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-3.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-a2-posters-zh-hk.webp', en: 'zprintpro-posters-a2-posters-en.webp', ja: 'zprintpro-posters-a2-posters-ja.webp' },
    alt: {
      'zh-hk': '香港A2海報印刷印刷 157g 銅版紙（可升 200g／相紙） PP 裱貼',
      en: 'A2 Posters | Professional Posters Hong Kong',
      ja: 'A2ポスター | 香港プロポスター'
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
        { value: 50, label: '50張', discount: 0.8 },
        { value: 100, label: '100張', discount: 0.6 },
      ],
    },
  },
  {
    id: 'PO-002',
    sku_code: 'PO-002',
    slug: 'a1-posters',
    category: 'posters',
    category_slug: 'posters',
    name: 'A1大幅海報', nameEn: 'A1 Large Posters', nameJa: 'A1大型ポスター', title_zh: 'A1大幅海報',
    description: 'A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。', descriptionEn: 'A1 large size, strong visual impact. Perfect for exhibitions, venue decoration.', descriptionJa: 'A1大きなサイズ、強い視覚的インパクト。展示会、会場装飾に最適。', description_zh: 'A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。',
    longDescription: `A1 大幅海報在展場通道與舞台兩側能在遠距離抓住視線，適合主題背板分割拼貼或單幅主視覺。紙材建議 200g 以上或相紙搭配 PP／冷裱，降低運輸捲曲與邊緣撞傷。與分類頁一致：海報印刷、銅版紙、護膜。拼貼稿請標示中縫避開人臉與關鍵字；吊掛場景可預留穿繩孔或鋁邊條位置。`,
    longDescriptionEn: `A1 large posters command sightlines across aisles and flanking stages—use as single hero pieces or tiled backdrops. Move to 200gsm+ stocks or photo paper with PP/cold lamination to resist curl and edge dings in transit. Terms align with category content: poster printing, coated art paper, protective film. For tiled walls, mark seams to avoid faces and key copy; hanging installs may need grommet grids or aluminum edging.`,
    longDescriptionJa: `A1大型ポスターは通路やステージ横で遠距離視認。一枚ヒーローまたはタイル構成。200g以上や写真用紙＋PPで反りと端損傷を抑制。用語：ポスター印刷、コート紙、保護フィルム。継ぎ目を顔や重要コピーから外す。吊り下げはハトメやアルミ縁を計画。`,
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
    price_range: 'HK$20-70/張',
    basePrice: 20,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/a1-posters.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-ja-4.webp',
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
    filename: { 'zh-hk': 'zprintpro-posters-a1-posters-zh-hk.webp', en: 'zprintpro-posters-a1-posters-en.webp', ja: 'zprintpro-posters-a1-posters-ja.webp' },
    alt: {
      'zh-hk': '香港A1大幅海報印刷 157–200g 銅版 PP 護膜',
      en: 'A1 Large Posters | Professional Posters Hong Kong',
      ja: 'A1大型ポスター | 香港プロポスター'
    },
  },
  },
  {
    id: 'PO-003',
    sku_code: 'PO-003',
    slug: 'outdoor-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '戶外海報', nameEn: 'Outdoor Posters', nameJa: '屋外ポスター', title_zh: '戶外海報',
    description: '防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。', descriptionEn: 'Waterproof and UV-resistant material, no fading for outdoor use.', descriptionJa: '防水・UV耐性素材、屋外使用でも色褪せません。', description_zh: '防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍板。',
    longDescription: `戶外海報採 PVC、PET 或戶外合成紙配合耐候墨水，可短中期承受雨淋與紫外線，適合工地告示、社區宣傳欄與臨時指示牌。表面可選霧面降低反光，邊緣可覆護膜或封邊延長壽命。與分類頁一致：海報印刷、防水防曬、噴繪。若貼於金屬欄或木板，請確認底材與膠系相容；長期暴晒建議半年巡檢換畫以維持品牌色彩一致。`,
    longDescriptionEn: `Outdoor posters use PVC, PET, or outdoor synthetics with weather-stable inks for short-to-midterm rain and UV exposure—great for site notices, community boards, and temporary signage. Matte surfaces tame glare; edge sealing or overlaminates extend life. Terms align with category content: poster printing, waterproof UV resistance, large-format printing. Match adhesive systems to metal bars or wood backers; high-sun sites may need biannual refreshes for color consistency.`,
    longDescriptionJa: `屋外ポスターはPVC／PET／屋外用合成紙と耐候インクで雨・紫外線に耐える短期〜中期表示。工事案内やコミュニティ掲示に。マットで反射抑制、エッジシールで寿命延長。用語：ポスター印刷、防水・UV、大判。金属柵や木材との接着系を確認。強日射は定期交換で色管理。`,
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-outdoor-posters-zh-hk.webp', en: 'zprintpro-posters-outdoor-posters-en.webp', ja: 'zprintpro-posters-outdoor-posters-ja.webp' },
    alt: {
      'zh-hk': '香港戶外海報印刷 戶外 PVC／PET／合成紙 霧面護膜',
      en: 'Outdoor Posters | Professional Posters Hong Kong',
      ja: '屋外ポスター | 香港プロポスター'
    },
  },
  },
  {
    id: 'PO-004',
    sku_code: 'PO-004',
    slug: 'display-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '展架海報', nameEn: 'Display Posters', nameJa: '展示用ポスター', title_zh: '展架海報',
    description: '配合X展架或易拉寶使用，便攜易裝。展會、路演必備。', descriptionEn: 'Compatible with X-stands or roll-up banners, portable and easy to install.', descriptionJa: 'Xスタンドまたはロールアップバナーと互換、持ち運び可能で設置簡単。', description_zh: '配合X展架或易拉寶使用，便攜易裝。展會、路演必備。',
    longDescription: `智印云展架海報專為 X 展架與易拉寶設計，採用 180g–200g PP 合成紙或背膠 PVC，配合環保溶劑或 UV 固化油墨，防水防曬且不易捲邊，特別適合展會、路演及商場快閃店。畫面解析度依輸出尺寸調整：60×160cm 建議 150dpi，80×180cm 建議 100dpi，確保近看清晰、遠看醒目。我們提供展架出租＋畫面更換的一站式服務，並可配合燈箱片與雙面輸出。印前免費檢查解析度與出血，確保現場安裝零失誤。與分類頁內容一致，材質關鍵詞包含：PP 合成紙、背膠 PVC、UV 油墨、展架海報、易拉寶。`,
    longDescriptionEn: `ZprintPro display posters are designed for X-stands and roll-up banners, using 180g–200g PP synthetic paper or adhesive-backed PVC with eco-solvent or UV-cured inks—waterproof, UV-resistant, and resistant to curling. Ideal for exhibitions, roadshows, and mall pop-ups. Resolution is adjusted by output size: 150dpi recommended for 60×160cm, 100dpi for 80×180cm, ensuring clarity up close and visibility from a distance. We offer one-stop stand rental plus graphic replacement services, with lightbox film and double-sided output options. Free prepress resolution and bleed checks ensure zero-error on-site installation. Terminology aligns with category content: PP synthetic paper, adhesive PVC, UV inks, display posters, roll-up banners.`,
    longDescriptionJa: `智印云の展示用ポスターはXスタンドとロールアップバナー向けに設計され、180g～200g PP合成紙または粘着PVCに環境配慮溶剤またはUV硬化インクを使用し、防水性・耐UV性・巻き上がり防止に優れています。展示会、路演、商業施設のポップアップに最適です。解像度は出力サイズに応じて調整：60×160cmは150dpi、80×180cmは100dpiを推奨し、近くで見ても鮮明、遠くから見ても目立ちます。スタンドレンタルと画面交換のワンストップサービスを提供し、ライトボックスフィルムと両面出力も対応します。印前で無料の解像度とブリードチェックを行い、現場での設置ミスをゼロにします。カテゴリ用語：PP合成紙、粘着PVC、UVインク、展示ポスター、ロールアップバナー。`,
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
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
        { value: 100, label: '100張', discount: 1 },
        { value: 500, label: '500張', discount: 0.85 },
        { value: 1000, label: '1000張', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-posters-display-posters-zh-hk.webp', en: 'zprintpro-posters-display-posters-en.webp', ja: 'zprintpro-posters-display-posters-ja.webp' },
    alt: {
      'zh-hk': '香港展架海報印刷 180g–200g PP 合成紙／背膠  覆膜（啞膜／光膜）',
      en: 'Display Posters | Professional Posters Hong Kong',
      ja: '展示用ポスター | 香港プロポスター'
    },
  },
  },
  {
    id: 'PO-005',
    sku_code: 'PO-005',
    slug: 'art-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '藝術海報', nameEn: 'Art Posters', nameJa: 'アートポスター', title_zh: '藝術海報',
    description: '高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。', descriptionEn: 'Premium art paper, high color accuracy. Perfect for art exhibitions, photography works.', descriptionJa: '高級アート紙、高い色再現性。美術展、写真作品に最適。', description_zh: '高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品。',
    longDescription: `智印云藝術海報採用 200g–250g 高級啞粉藝術紙或 260g 純棉無酸紙，配合 12 色顏料墨水輸出，色域覆蓋 98% Adobe RGB，Delta E ≤2，達到博物館級收藏標準。適合藝術展覽、攝影作品輸出、室內裝飾及限量版藝術品複製。表面可選啞面、絲絨面或半光面，並支援無框畫裝裱與懸掛系統。我們提供免費色彩校樣與 ICC Profile 匹配，確保螢幕所見即輸出所得。印前建議使用 TIFF 或無損 PNG 格式，解析度不低於 300dpi。與分類頁內容一致，材質關鍵詞包含：藝術紙、無酸紙、顏料墨水、ICC 色彩管理、博物館級。`,
    longDescriptionEn: `ZprintPro art posters use 200g–250g premium matte art paper or 260g 100% cotton acid-free paper, paired with 12-color pigment ink output covering 98% Adobe RGB with Delta E ≤2—meeting museum-grade archival standards. Ideal for art exhibitions, photography prints, interior decoration, and limited-edition art reproductions. Surface options include matte, velvet, and semi-gloss finishes, with frameless mounting and hanging systems supported. We provide free color proofing and ICC profile matching, ensuring WYSIWYG from screen to print. Prepress: use TIFF or lossless PNG format at minimum 300dpi resolution. Terminology aligns with category content: art paper, acid-free paper, pigment inks, ICC color management, museum-grade.`,
    longDescriptionJa: `智印云のアートポスターは200g～250g高級マットアート紙または260g綿100％無酸紙を使用し、12色顔料インクで出力、98％のAdobe RGB色域をカバーし、Delta E ≤2を実現、博物館級のアーカイブ基準を満たします。美術展、写真作品出力、室内装飾、限定版アート複製に最適です。表面はマット、ベルベット、半光沢から選択でき、額なしマウントと吊り下げシステムにも対応します。無料のカラープルーフとICCプロファイルマッチングを提供し、画面で見た通りの出力を保証します。印前ではTIFFまたは非圧縮PNG形式、最低300dpiの解像度を推奨します。カテゴリ用語：アート紙、無酸紙、顔料インク、ICCカラーマネジメント、博物館級。`,
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
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
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
      'zh-hk': '香港藝術海報印刷 200g–250g 啞粉藝術紙／260g 啞面／絲絨面／半光面',
      en: 'Art Posters | Professional Posters Hong Kong',
      ja: 'アートポスター | 香港プロポスター'
    },
  },
  },
  {
    id: 'PO-006',
    sku_code: 'PO-006',
    slug: 'adhesive-posters',
    category: 'posters',
    category_slug: 'posters',
    name: '背膠海報', nameEn: 'Adhesive Posters', nameJa: '粘着ポスター', title_zh: '背膠海報',
    description: '自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。', descriptionEn: 'Self-adhesive, can be directly applied. Perfect for shop windows, wall decoration.', descriptionJa: '自己粘着、直接貼付可能。店舗の窓、壁の装飾に最適。', description_zh: '自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。',
    longDescription: `智印云背膠海報採用 150g–180g 自粘 PP 合成紙或鑄造級 PVC 車貼，底紙帶有導氣槽，貼附時可輕鬆排出氣泡，移除後不殘膠、不傷牆面，特別適合店鋪櫥窗、商場導視、辦公室文化牆及短期活動佈置。油墨為環保溶劑型或 UV 固化型，戶外耐候達 6–12 個月。我們提供異形模切與鏤空設計，可配合玻璃透光效果。印前建議稿件預留 3mm 出血，並避免文字過於貼邊。小批量數碼輸出當日可取，大批量可壓低單價。與分類頁內容一致，材質關鍵詞包含：背膠 PP、PVC 車貼、導氣槽、模切、UV 油墨。`,
    longDescriptionEn: `ZprintPro adhesive posters use 150g–180g self-adhesive PP synthetic paper or cast-grade PVC vinyl with air-release channels in the liner—bubbles escape easily during application, and removal leaves no residue or wall damage. Ideal for shop windows, mall wayfinding, office culture walls, and short-term event decoration. Inks are eco-solvent or UV-cured, with 6–12 month outdoor weather resistance. We support die-cut shapes and镂空 designs that work with glass backlighting effects. Prepress: allow 3mm bleed and avoid text too close to edges. Same-day digital output for small batches; volume pricing available. Terminology aligns with category content: adhesive PP, PVC vinyl, air-release channels, die-cutting, UV inks.`,
    longDescriptionJa: `智印云の粘着ポスターは150g～180g自己粘着PP合成紙またはキャストグレードPVCビニールを使用し、裏紙にエアリリース溝があり、貼付時に気泡を簡単に逃がせ、剥がしても残りや壁面の傷がありません。店舗の窓、商業施設の案内表示、オフィスの文化壁、短期イベント装飾に最適です。インクは環境配慮溶剤型またはUV硬化型で、屋外耐候性は6～12ヶ月です。型抜きと抜き加工デザインに対応し、ガラスの透光効果と組み合わせられます。印前では3mmのブリードを確保し、文字が端に寄りすぎないようにしてください。小ロットは当日デジタル出力、大量は単価最適化が可能です。カテゴリ用語：粘着PP、PVCビニール、エアリリース溝、ダイカット、UVインク。`,
    features: [
      '【導氣槽底紙】貼附時輕鬆排氣泡，移除不殘膠',
      '【PP／PVC 面材】150g–180g，可選室內或戶外耐候型',
      '【6–12 個月戶外耐候】UV 固化油墨，陽光下不褪色',
      '【異形模切】任意形狀裁切，配合櫥窗鏤空設計',
      '【玻璃透光】透明或鏤空區域可配合背光效果',
      '【當日可取】數碼輸出，100 張起印，急單無憂',
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
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
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
      'zh-hk': '香港背膠海報印刷 150g–180g 背膠 PP／鑄造級  模切',
      en: 'Adhesive Posters | Professional Posters Hong Kong',
      ja: '粘着ポスター | 香港プロポスター'
    },
  },
  },
  // 包裝盒定制 (6 SKU)
  {
    id: 'PK-001',
    sku_code: 'PK-001',
    slug: 'gift-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '禮品盒定制', nameEn: 'Gift Boxes', nameJa: 'ギフトボックス', title_zh: '禮品盒定制',
    description: '精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。', descriptionEn: 'Exquisite gift boxes with foil stamping, UV and other processes.', descriptionJa: '精巧なギフトボックス、箔押し・UVなどの加工付き。', description_zh: '精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產品價值。',
    longDescription: `禮品盒定制以白卡、特種紙或灰板裱面為主，透過刀模成型、糊盒與內托配置，把產品敘事濃縮在開盒第一眼。外觀可疊加燙金／燙銀、局部 UV、擊凸與柔觸覆膜，兼顧觸感與陳列反光控制。與分類頁術語一致：包裝盒、白卡紙、燙金、局部 UV、模切。建議同步規劃內襯（紙托／EVA）與封口貼，並在印前確認長寬高公差與堆疊承重，避免物流擠壓變形。`,
    longDescriptionEn: `Custom gift boxes combine white card, specialty stocks, or greyboard wraps with die-cutting, folding, and inserts to tell your product story at first open. Layer foil, spot UV, embossing, and soft-touch film while managing shelf glare. Terms align with category content: packaging boxes, white card, foil stamping, spot UV, die-cutting. Plan inserts (paper or EVA) and seal stickers together; validate L×W×H tolerances and stack crush resistance before print lock.`,
    longDescriptionJa: `ギフト箱は白卡・特殊紙・灰板貼りを組み合わせ、型抜き・糊箱・内装で開封の第一印象を作ります。箔押し・局部UV・エンボス・ソフトタッチで質感調整。用語：包装箱、白卡、箔押し、局部UV、型抜き。紙トレイ／EVA内装とシールも同時設計。寸法公差と積載耐圧を印前で確認。`,
    features: [
      '白卡／特種紙／裱灰板多方案',
      '燙金、局部 UV、擊凸可疊加',
      '可配內托與封口貼一體規劃',
      '小／中／大盒型或客製內徑',
      '適合節慶禮贈與品牌周邊',
      '印前刀模與糊位檢查',
      '批量階梯價清晰',
    ],
    specs: {
      material: '白卡紙／牛皮裱面／硬紙板結構（依報價）',
      size: '100×80×50mm 起至大號或全客製',
      printMethod: '四色柯式＋可選專色／燙金',
      finishing: '覆膜、燙金、局部 UV、擊凸、糊盒成型',
    },
    price_range: 'HK$4-25/個',
    basePrice: 4,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/gift-boxes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-gift-boxes-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-gift-boxes-zh-hk.webp', en: 'zprintpro-packaging-gift-boxes-en.webp', ja: 'zprintpro-packaging-gift-boxes-ja.webp' },
    alt: {
      'zh-hk': '香港禮品盒定制印刷 白卡紙／牛皮裱面／硬紙板結構（依報價） 覆膜',
      en: 'Gift Boxes | Professional Packaging Hong Kong',
      ja: 'ギフトボックス | 香港プロパッケージ'
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
        { value: 'emboss', label: '凹凸', surcharge: 70 },
      ],
      quantities: [
        { value: 100, label: '100個', discount: 1 },
        { value: 500, label: '500個', discount: 0.85 },
        { value: 1000, label: '1000個', discount: 0.7 },
      ],
    },
  },
  {
    id: 'PK-002',
    sku_code: 'PK-002',
    slug: 'cosmetic-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '化妝品盒', nameEn: 'Cosmetic Boxes', nameJa: '化粧品箱', title_zh: '化妝品盒',
    description: '專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。', descriptionEn: 'Specially designed for cosmetics, customizable inner tray.', descriptionJa: '化粧品専用設計、カスタマイズ可能な内側トレイ。', description_zh: '專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。',
    longDescription: `化妝品盒需同時滿足法規標示區、瓶器防震與櫃檯陳列美學。外盒多採高挺白卡加啞膠或觸感膜，內托可選 EVA 挖槽、紙漿托或 PET 吸塑以固定玻璃瓶與彩盤。Logo 區常用燙金細線或局部 UV 提升精緻度。與分類頁一致：包裝盒、白卡紙、覆膜、燙金、內托。設計稿請預留成分表與批次號印刷區，並在打樣階段實測跌落與開合磨損。<h3>化妝品包裝盒型對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">盒型</th><th class="p-2 text-center">防震性</th><th class="p-2 text-center">陳列效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">化妝品盒（內托）</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">護膚品牌、高端彩妝</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">摺疊盒</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">平價彩妝、試用套裝</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">磁吸禮盒</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">奢侈品牌、節慶限定</td></tr></tbody></table><h3>化妝品包裝盒型對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">盒型</th><th class="p-2 text-center">防震性</th><th class="p-2 text-center">陳列效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">化妝品盒（內托）</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">護膚品牌、高端彩妝</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">摺疊盒</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">平價彩妝、試用套裝</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">磁吸禮盒</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">奢侈品牌、節慶限定</td></tr></tbody></table>`,
    longDescriptionEn: `Cosmetic cartons must balance regulatory panels, bottle shock protection, and counter aesthetics. Outer shells often use stiff white card with matte or soft-touch film; inserts can be EVA cavities, molded pulp, or PET blisters to secure glass and palettes. Logos gain finesse via hairline foil or spot UV. Terms align with category content: packaging boxes, white card, lamination, foil stamping, inserts. Reserve space for ingredients and batch codes; prototype drop and rub tests before mass run.<h3>Cosmetic Packaging Box Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Box Type</th><th class="p-2 text-center">Shock Protection</th><th class="p-2 text-center">Display Impact</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">Cosmetic Box (with insert)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Skincare, premium makeup</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">Folding Carton</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Budget cosmetics, trial sets</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">Rigid Gift Box</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">Luxury brands, limited editions</td></tr></tbody></table>`,
    longDescriptionJa: `化粧品箱は表示面、瓶の衝撃、陳列美を両立。外箱は高剛性白卡＋マット／ソフトタッチ、内装はEVA溝、パルプ、PETブリスター。ロゴは細線箔・局部UV。用語：包装箱、白卡、ラミネート、箔押し、内トレイ。成分・ロット欄を確保し、落下・開閉摩耗を試作で確認。<h3>化粧品包装箱比較スコアカード</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">箱型</th><th class="p-2 text-center">衝撃保護</th><th class="p-2 text-center">陳列効果</th><th class="p-2 text-center">コスト</th><th class="p-2 text-left">おすすめ用途</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">化粧品箱（内トレイ付）</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">スキンケア、高級メイク</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">組み立て箱</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">プチプラ化粧品、トライアルセット</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">化粧箱</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">ラグジュアリーブランド、限定版</td></tr></tbody></table>`,
    features: [
      '護膚／彩妝瓶器防震內托可選',
      '高挺白卡＋覆膜保護墨層',
      '燙金、局部 UV 強化精品感',
      '預留法規標示與批次印刷區',
      '適合專櫃與電商禮盒線',
      '刀模實物打樣驗證開合',
      '可與外箱貼紙／封套配套',
    ],
    specs: {
      material: '白卡／硬紙板；內托 EVA／紙托／吸塑',
      size: '依瓶器三維客製或選小／中／大',
      printMethod: '四色＋專色；可逆向 UV',
      finishing: '覆膜、燙金、局部 UV、擊凸、糊盒',
    },
    price_range: 'HK$6-32/個',
    basePrice: 6,
    weight_score: 92,
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
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-cosmetic-boxes-en-5.webp',
    ],
    'ja': [
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
      'zh-hk': '香港化妝品盒印刷 白卡／硬紙板 覆膜',
      en: 'Cosmetic Boxes | Professional Packaging Hong Kong',
      ja: '化粧品箱 | 香港プロパッケージ'
    },
  },
  },
  {
    id: 'PK-003',
    sku_code: 'PK-003',
    slug: 'food-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '食品包裝盒', nameEn: 'Food Boxes', nameJa: '食品包装箱', title_zh: '食品包裝盒',
    description: '食品級材質，安全環保。適合糕點、茶葉、保健品。', descriptionEn: 'Food-grade material, safe and eco-friendly.', descriptionJa: '食品グレード素材、安全で環境に優しい。', description_zh: '食品級材質，安全環保。適合糕點、茶葉、保健品。',
    longDescription: `智印云食品包裝盒採用 350g 食品級白卡紙或 400g 食品級灰底白板，內層可選 PE 淋膜或 PLA 可降解塗層，通過 SGS 食品接觸遷移測試與香港衛生署標準。適合糕點、茶葉、保健品及伴手禮包裝，可耐油脂與輕微濕氣。我們支援窗口設計（PET 透明片或鏤空）、燙金 LOGO 及可變 QR Code，方便批次追溯與品牌防偽。盒型涵蓋天地蓋、書型盒與折疊插口盒，印前提供免費結構展開圖與刀模設計。與分類頁內容一致，材質關鍵詞包含：食品級紙盒、PE 淋膜、PLA 可降解、燙金、窗口設計。`,
    longDescriptionEn: `ZprintPro food packaging boxes use 350g food-grade white card or 400g food-grade clay-coated board, with optional PE lamination or PLA biodegradable coating on the inner layer. They pass SGS food-contact migration testing and HK Department of Health standards. Suitable for pastries, tea, health supplements, and gift packaging—resistant to grease and light moisture. We support window design (PET clear film or die-cut), foil-stamped logos, and variable QR codes for batch traceability and brand anti-counterfeiting. Box styles include rigid boxes, book-style boxes, and folding tuck boxes. Free structural dielines and die-cut design provided during prepress. Terminology aligns with category content: food-grade boxes, PE lamination, PLA biodegradable, foil stamping, window design.`,
    longDescriptionJa: `智印云の食品包装箱は350g食品グレード白カード紙または400g食品グレードクラフト裏紙を使用し、内層にPEラミネートまたはPLA生分解性コーティングを選択可能です。SGS食品接触移行テストと香港衛生署基準をクリアしています。和菓子、お茶、健康食品、ギフト包装に適し、油脂と軽い湿気に耐えます。窓デザイン（PET透明フィルムまたは抜き加工）、箔押しロゴ、可変QRコードに対応し、ロット追跡とブランド偽造対策が可能です。箱型は化粧箱、ブック型箱、組み立て差し込み箱を含み、印前で無料の構造展開図と型抜き設計を提供します。カテゴリ用語：食品グレード箱、PEラミネート、PLA生分解性、箔押し、窓デザイン。`,
    features: [
      '【食品級認證】SGS 與香港衛生署標準通過，安全接觸食品',
      '【350g／400g 紙板】高挺度，保護糕點與茶葉不變形',
      '【PE／PLA 內層】防油防濕，可降解選項滿足環保需求',
      '【窗口設計】PET 透明片或鏤空，展示內裝產品',
      '【燙金 LOGO】金／銀箔或局部 UV，提升品牌高級感',
      '【可變 QR Code】批次追溯與防偽，方便消費者查驗',
      '【免費刀模】天地蓋、書型盒、折疊插口盒結構設計',
    ],
    specs: {
      material: '350g 食品級白卡／400g 灰底白板；PE 淋膜或 PLA 內層',
      size: '完全客製化，常見 15×10×5cm 至 25×20×8cm',
      printMethod: '四色柯式或數碼（依數量）',
      finishing: '燙金／燙銀、窗口（PET）、局部 UV、覆膜',
    },
    price_range: 'HK$2.5-18/個',
    basePrice: 2.5,
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
      'zh-hk': '香港食品包裝盒印刷 350g 食品級白卡／400g 灰底白板 燙金／燙銀',
      en: 'Food Boxes | Professional Packaging Hong Kong',
      ja: '食品包装箱 | 香港プロパッケージ'
    },
  },
  },
  {
    id: 'PK-004',
    sku_code: 'PK-004',
    slug: 'mailer-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '快遞盒/飛機盒', nameEn: 'Mailer Boxes', nameJa: '発送箱', title_zh: '快遞盒/飛機盒',
    description: '堅固耐用，電商發貨首選。可印品牌Logo，提升開箱體驗。', descriptionEn: 'Sturdy and durable, first choice for e-commerce shipping.', descriptionJa: '頑丈で耐久性があり、EC発送の第一選択。', description_zh: '堅固耐用，電商發貨首選。可印品牌Logo，提升開箱體驗。',
    longDescription: `快遞盒／飛機盒以 E 坑／B 坑瓦楞或高強白卡裱瓦為核心，兼顧緩衝、堆疊與自動折盒產線效率。外印可滿版品牌色加內側感謝語，亦可局部留白方便貼快遞單。與分類頁一致：包裝盒、牛皮紙、白卡紙、模切。報價請提供內裝物尺寸與總重量，以便選擇楞型與膠帶封口方案；跨境件可加雙語拆箱提示與環保回收標識。`,
    longDescriptionEn: `Mailer and crash-lock boxes pair E-flute or B-flute corrugated—or white-lined board—for cushioning, pallet stacking, and auto-fold line speed. Print full-brand wraps with inner thank-you panels, or leave clear zones for waybills. Terms align with category content: packaging boxes, kraft, white card, die-cutting. Share inner product dims and gross weight to pick flute grade and tape closure; add bilingual unboxing tips and recycle marks for cross-border parcels.`,
    longDescriptionJa: `発送箱・ワンタッチ箱はE／Bフルートや白面貼瓦で緩衝と積載性を確保。外装フル印刷＋内側メッセージ、運送ラベル余白も設計可能。用語：包装箱、クラフト、白卡、型抜き。内容物寸法・総重量でフルートとテープ仕様を選定。越境向けに二言語の開封注意とリサイクル表示。`,
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
    price_range: 'HK$1.8-10/個',
    basePrice: 1.8,
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
      'zh-hk': '香港快遞盒/飛機盒印刷 E／B 坑瓦楞 模切',
      en: 'Mailer Boxes | Professional Packaging Hong Kong',
      ja: '発送箱 | 香港プロパッケージ'
    },
  },
  },
  {
    id: 'PK-005',
    sku_code: 'PK-005',
    slug: 'folding-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '折疊盒', nameEn: 'Folding Boxes', nameJa: '折りたたみ箱', title_zh: '折疊盒',
    description: '可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。', descriptionEn: 'Foldable design, saves warehouse space.', descriptionJa: '折りたたみ可能なデザイン、倉庫スペースを節約。', description_zh: '可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。',
    longDescription: `智印云折疊盒採用 300g–350g 白卡紙或 E 坑瓦楞紙板，設計為平板出貨、到倉後自行摺疊成型，節省倉儲空間達 70% 以上，特別適合庫存周轉快的電商賣家與跨境倉儲。插口與自動鎖底結構經過跌落測試，可承受 5 公斤內裝物在 80cm 高度自由落體不開口。表面可選啞膜、光膜或局部 UV，並支援燙金與條碼印刷。我們提供免費展開圖設計與組裝指引，確保每個摺痕角度精準。與分類頁內容一致，材質關鍵詞包含：白卡折疊盒、瓦楞折疊盒、自動鎖底、插口盒、覆膜。`,
    longDescriptionEn: `ZprintPro folding boxes use 300g–350g white card or E-flute corrugated board, designed for flat shipment and self-folding at the warehouse—saving over 70% storage space. Ideal for e-commerce sellers and cross-border warehouses with fast inventory turnover. The tuck-end and auto-lock bottom structures pass drop tests, withstanding 5kg contents dropped from 80cm without opening. Surface options include matte lamination, gloss lamination, or spot UV, with foil stamping and barcode printing supported. We provide free dieline design and assembly instructions, ensuring precise fold angles. Terminology aligns with category content: white card folding boxes, corrugated folding boxes, auto-lock bottom, tuck boxes, lamination.`,
    longDescriptionJa: `智印云の折りたたみ箱は300g～350g白カード紙またはEフルート段ボールを使用し、平板出荷して倉庫で組み立てる設計で、倉庫スペースを70％以上節約します。在庫回転の速いEC売家や越境倉庫に最適です。差し込み口と自動ロック底構造は落下テストをクリアし、5kgの内容物を80cmの高さから落下させても開きません。表面はマット、グロス、局部UVから選択でき、箔押しとバーコード印刷も対応します。無料の展開図設計と組み立て説明書を提供し、各折り目の角度を正確に保ちます。カテゴリ用語：白カード折りたたみ箱、段ボール折りたたみ箱、自動ロック底、差し込み箱、ラミネート。`,
    features: [
      '【平板出貨】節省倉儲空間 70% 以上，降低庫存成本',
      '【自動鎖底】插口結構經 80cm 跌落測試，5kg 不開口',
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
      'zh-hk': '香港折疊盒印刷 300g–350g 白卡紙／E 坑瓦楞紙 覆膜（啞膜／光膜）',
      en: 'Folding Boxes | Professional Packaging Hong Kong',
      ja: '折りたたみ箱 | 香港プロパッケージ'
    },
  },
  },
  {
    id: 'PK-006',
    sku_code: 'PK-006',
    slug: 'rigid-boxes',
    category: 'packaging',
    category_slug: 'packaging',
    name: '精裝盒', nameEn: 'Rigid Boxes', nameJa: '上製本箱', title_zh: '精裝盒',
    description: '硬殼精裝，高檔奢華。適合高端產品、限量版商品。', descriptionEn: 'Hardcover rigid construction, luxurious and premium.', descriptionJa: '硬い上製本構造、豪華でプレミアム。', description_zh: '硬殼精裝，高檔奢華。適合高端產品、限量版商品。',
    longDescription: `精裝盒（天地盒／書型盒）以灰板開槽裱面為結構核心，面紙可選觸感紙、布紋或特種金屬紙，再配磁吸、緞帶或隱形磁扣提升儀式感。工藝常見全幅燙金、多色燙、局部 UV 與深壓紋。與分類頁一致：精裝盒、硬紙板、燙金、壓紋。因手工比重高，建議預留較長打樣週期並在刀模會簽時確認書脊與內盒公差，避免套盒過鬆或過緊。`,
    longDescriptionEn: `Rigid boxes (lid-base or book-style) use slotted greyboard wrapped in specialty liners—touch paper, linen textures, or metallic stocks—with magnets, ribbons, or concealed catches for ceremony. Expect full-area foils, multi-hit stamping, spot UV, and deep emboss. Terms align with category content: rigid boxes, board, foil stamping, embossing. Higher handwork means longer prototyping; sign off die lines early to avoid loose or tight fit between sleeve and tray.`,
    longDescriptionJa: `上製箱（天地／ブック型）は溝入れ灰板に表紙を貼り、触感紙・布目・メタリック等。マグネットやリボンで儀式感。全面箔、多色箔、局部UV、深エンボス。用語：上製箱、厚紙、箔押し、エンボス。手作業比率高めのため試作期間に余裕。スリーブと内箱の公差を刀模で確定。`,
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
      'zh-hk': '香港精裝盒印刷 灰板＋特種裱面紙 燙金',
      en: 'Rigid Boxes | Professional Packaging Hong Kong',
      ja: '上製本箱 | 香港プロパッケージ'
    },
  },
  },
  // 利是封印刷 (6 SKU)
  {
    id: 'RP-001',
    sku_code: 'RP-001',
    slug: 'foil-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '燙金利是封', nameEn: 'Foil Red Packets', nameJa: '箔押しポチ袋', title_zh: '燙金利是封',
    description: '傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定制專屬設計。適合企業派發、節日營銷。', descriptionEn: 'Traditional foil stamping, festive and elegant. Multiple auspicious patterns or custom designs.', descriptionJa: '伝統的な箔押し加工、縁起が良く上品。複数の縁起の良い柄またはカスタムデザイン。', description_zh: '傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定制專屬設計。適合企業派發、節日營銷。',
    longDescription: `智印云燙金利是封採用120g高級紅色紙張，配合傳統燙金工藝，金色圖案在光線下閃耀奪目，喜慶大方。可燙金色、銀色、玫瑰金等多種顏色，圖案涵蓋傳統吉祥紋樣、福字、生肖及企業Logo。適合企業派發、節日營銷、婚禮回禮及商務拜年。我們提供免費排版與燙金定位檢查，確保圖案精準。與分類頁內容一致，材質關鍵詞包含：燙金利是封、紅紙、金色圖案、生肖。`,
    longDescriptionEn: `ZprintPro Foil Red Packets use 120g premium red paper with traditional foil stamping. Gold patterns shine brilliantly—festive and elegant. Available in gold, silver, and rose gold with designs including auspicious patterns, fortune characters, zodiac signs, and corporate logos. Ideal for corporate distribution, holiday marketing, wedding favors, and business New Year greetings.`,
    longDescriptionJa: `智印云の箔押しポチ袋は120g高級赤紙を使用し、伝統的な箔押し加工で金色の柄が光に輝き、縁起が良く上品です。金、銀、ローズゴールド対応で、縁起の良い紋様、福字、干支、企業ロゴを含みます。企業配布、ホリデーマーケティング、結婚式の引き出物、ビジネス新年の挨拶に最適です。`,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【三色燙金】金／銀／玫瑰金，傳統喜慶',
      '【500個起訂】小批量數碼，大批量柯式',
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
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/foil-red-packets.jpg'],
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
      'zh-hk': '香港燙金利是封印刷 120g紅色紙張 燙金',
      en: 'Foil Red Packets | Professional Red Packets Hong Kong',
      ja: '箔押しポチ袋 | 香港プロポチ袋'
    },
  },
  },
  {
    id: 'RP-002',
    sku_code: 'RP-002',
    slug: 'embossed-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '浮雕利是封', nameEn: 'Embossed Red Packets', nameJa: 'エンボスポチ袋', title_zh: '浮雕利是封',
    description: '浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。', descriptionEn: 'Embossed craftsmanship, dimensional texture, luxurious feel.', descriptionJa: 'エンボス加工、立体的な触感、豪華な質感。', description_zh: '浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合VIP客戶、高端送禮。',
    longDescription: `智印云浮雕利是封採用150g高級紅色紙張，配合浮雕工藝，圖案與文字呈現立體觸感，高檔奢華。浮雕深度約0.3–0.5mm，手指撫摸即可感受層次變化，展現品牌誠意。適合VIP客戶、高端送禮、私人銀行及奢侈品牌。可搭配燙金作為點綴，提升視覺與觸覺雙重體驗。我們提供免費打樣確認浮雕效果。與分類頁內容一致，材質關鍵詞包含：浮雕利是封、立體觸感、高端禮品。`,
    longDescriptionEn: `ZprintPro Embossed Red Packets use 150g premium red paper with embossing that creates dimensional texture at 0.3–0.5mm depth. The tactile layering conveys brand sincerity and luxury. Ideal for VIP clients, premium gifting, private banking, and luxury brands. Can be paired with foil stamping for enhanced visual and tactile experience. Free sampling to confirm embossing effect.`,
    longDescriptionJa: `智印云のエンボスポチ袋は150g高級赤紙を使用し、エンボス加工で0.3～0.5mmの深さで立体的な触感を演出します。指で撫でると層の変化を感じられ、ブランドの誠意と高級感を伝えます。VIP顧客、高級ギフト、プライベートバンク、高級ブランド向け。箔押しとの組み合わせで視覚と触覚の両方を向上させます。`,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【0.3–0.5mm浮雕】立體觸感，品牌誠意倍增',
      '【500個起訂】小批量數碼，大批量柯式',
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/embossed-red-packets.jpg'],
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
      'zh-hk': '香港浮雕利是封印刷 150g紅色紙張 浮雕',
      en: 'Embossed Red Packets | Professional Red Packets Hong Kong',
      ja: 'エンボスポチ袋 | 香港プロポチ袋'
    },
  },
  },
  {
    id: 'RP-003',
    sku_code: 'RP-003',
    slug: 'custom-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '定制利是封', nameEn: 'Custom Red Packets', nameJa: 'オリジナルポチ袋', title_zh: '定制利是封',
    description: '專屬設計，印上公司Logo和祝福語。強化品牌印象，節日營銷必備。', descriptionEn: 'Exclusive design with company logo and greetings. Strengthens brand impression.', descriptionJa: '独占的なデザイン、会社ロゴと祝福の言葉。ブランドイメージを強化。', description_zh: '專屬設計，印上公司Logo和祝福語。強化品牌印象，節日營銷必備。',
    longDescription: `智印云定制利是封採用120g–150g紅色或特殊色紙張，完全客製化設計，可印企業Logo、品牌色彩、專屬圖案及祝福語。適合企業年會、品牌活動、會員回饋及節慶營銷。我們提供從設計到印刷的一站式服務，並可搭配燙金、局部UV或壓凹工藝。免費刀模與色彩校樣確保效果。與分類頁內容一致，材質關鍵詞包含：定制利是封、客製化、企業Logo、品牌色。`,
    longDescriptionEn: `ZprintPro Custom Red Packets use 120g–150g red or specialty colored paper with fully custom designs—corporate logos, brand colors, exclusive patterns, and greetings. Ideal for annual meetings, brand events, member rewards, and holiday marketing. One-stop service from design to print with optional foil stamping, spot UV, or debossing. Free die-cut and color proofing.`,
    longDescriptionJa: `智印云のカスタムポチ袋は120g～150g赤または特殊色紙を使用し、完全にカスタマイズされたデザイン。企業ロゴ、ブランドカラー、専用柄、メッセージを印刷可能です。年会、ブランドイベント、会員特典、ホリデーマーケティングに最適。デザインから印刷までワンストップサービスで、箔押し、局部UV、デボスも可能です。`,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【完全客製】Logo、品牌色、專屬圖案全可印',
      '【500個起訂】小批量數碼，大批量柯式',
      '【免費刀模】異形或標準長方形可選',
      '【燙金定位】±0.3mm精度，細線清晰',
      '【節慶檔期】農曆新年前3週為高峰期，建議提早下單'
    ],
    specs: {
      material: '120g–150g紅色或特殊色紙張',
      size: '完全客製化',
      printMethod: '四色印刷＋燙金／UV',
      finishing: '燙金、局部UV、壓凹、異形模切',
    },
    price_range: 'HK$1.90-6.40/個',
    basePrice: 1.90,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/custom-red-packets.jpg'],
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
      'zh-hk': '香港定制利是封印刷 120g–150g紅色 燙金',
      en: 'Custom Red Packets | Professional Red Packets Hong Kong',
      ja: 'オリジナルポチ袋 | 香港プロポチ袋'
    },
  },
  },
  {
    id: 'RP-004',
    sku_code: 'RP-004',
    slug: 'cartoon-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '卡通利是封', nameEn: 'Cartoon Red Packets', nameJa: 'キャラクターポチ袋', title_zh: '卡通利是封',
    description: '可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。', descriptionEn: 'Cute cartoon design, loved by young people.', descriptionJa: 'かわいいキャラクターデザイン、若者に人気。', description_zh: '可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機構、兒童產品。',
    longDescription: `智印云卡通利是封採用120g銅版紙或環保紙，配合四色數碼印刷，色彩鮮豔、圖案活潑，特別適合親子品牌、兒童產品、教育機構及節慶家庭派對。可印卡通角色、生肖動物、可愛圖案及品牌吉祥物。我們提供免費設計模板，並可搭配燙金或局部UV提升質感。與分類頁內容一致，材質關鍵詞包含：卡通利是封、銅版紙、數碼印刷、生肖。`,
    longDescriptionEn: `ZprintPro Cartoon Red Packets use 120g glossy or eco paper with 4-color digital printing—vibrant colors and lively patterns. Ideal for family brands, children's products, educational institutions, and festive family parties. Can feature cartoon characters, zodiac animals, cute designs, and brand mascots. Free design templates with optional foil stamping or spot UV.`,
    longDescriptionJa: `智印云のキャラクターポチ袋は120gコート紙または環境配慮紙を使用し、4色デジタル印刷で鮮やかな色彩と楽しい柄を実現します。ファミリーブランド、子供向け製品、教育機関、祝祭のファミリーパーティーに最適。キャラクター、干支の動物、かわいいデザイン、ブランドマスコットを印刷可能。無料デザインテンプレートあり。`,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【卡通設計】活潑圖案，親子品牌首選',
      '【500個起訂】小批量數碼，大批量柯式',
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/cartoon-red-packets.jpg'],
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
      'zh-hk': '香港卡通利是封印刷 120g銅版紙 燙金',
      en: 'Cartoon Red Packets | Professional Red Packets Hong Kong',
      ja: 'キャラクターポチ袋 | 香港プロポチ袋'
    },
  },
  },
  {
    id: 'RP-005',
    sku_code: 'RP-005',
    slug: 'eco-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '環保利是封', nameEn: 'Eco Red Packets', nameJa: 'エコポチ袋', title_zh: '環保利是封',
    description: '採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。', descriptionEn: 'Eco-friendly paper and ink, sustainable development concept.', descriptionJa: '環境に優しい紙とインク、持続可能な開発の理念。', description_zh: '採用環保紙張和油墨，可持續發展理念。適合注重環保的企業。',
    longDescription: `智印云環保利是封採用FSC認證再生紙或種子紙，配合大豆油墨印刷，可完全生物降解或種植出花草，展現企業環保承諾。適合環保品牌、NGO、綠色企業及注重可持續發展的機構。可印企業Logo與環保標語，並提供碳足跡計算。與分類頁內容一致，材質關鍵詞包含：環保利是封、FSC認證、再生紙、種子紙、大豆油墨。`,
    longDescriptionEn: `ZprintPro Eco Red Packets use FSC-certified recycled or seed paper with soy-based inks—fully biodegradable or plantable to grow flowers, demonstrating corporate environmental commitment. Ideal for eco-brands, NGOs, green enterprises, and sustainability-focused organizations. Corporate logos and eco-slogans with carbon footprint calculation available.`,
    longDescriptionJa: `智印云のエコポチ袋はFSC認証リサイクル紙または種子紙を使用し、大豆インクで印刷。完全に生分解性または植えて花を育てられ、企業の環境への取り組みを示します。環境ブランド、NGO、グリーン企業、持続可能性に注力する機関に最適。企業ロゴと環境スローガン、カーボンフットプリント計算も可能です。`,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【FSC再生紙／種子紙】可降解或種植，環保承諾',
      '【500個起訂】小批量數碼，大批量柯式',
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
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/eco-red-packets.jpg'],
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
      'zh-hk': '香港環保利是封印刷 FSC認證再生紙 無覆膜（環保）',
      en: 'Eco Red Packets | Professional Red Packets Hong Kong',
      ja: 'エコポチ袋 | 香港プロポチ袋'
    },
  },
  },
  {
    id: 'RP-006',
    sku_code: 'RP-006',
    slug: 'large-red-packets',
    category: 'red-packets',
    category_slug: 'red-packets',
    name: '大號利是封', nameEn: 'Large Red Packets', nameJa: '大判ポチ袋', title_zh: '大號利是封',
    description: '加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。', descriptionEn: 'Larger size, can hold more cash or gift cards.', descriptionJa: '大きなサイズ、より多くの現金やギフトカードを入れられます。', description_zh: '加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更有面子。',
    longDescription: `智印云大號利是封採用150g–200g高級紅色紙張，尺寸較標準利是封大30%–50%，容量更大，適合裝入較厚的禮金或禮品卡。適合企業高層派發、婚禮大禮、壽宴及重要節慶。可搭配燙金、浮雕或局部UV工藝，提升尊貴感。與分類頁內容一致，材質關鍵詞包含：大號利是封、厚紙、燙金、婚禮。`,
    longDescriptionEn: `ZprintPro Large Red Packets use 150g–200g premium red paper, 30%–50% larger than standard size with greater capacity for thicker cash or gift cards. Ideal for senior corporate distribution, wedding gifts, birthday banquets, and major holidays. Can feature foil stamping, embossing, or spot UV for enhanced prestige.`,
    longDescriptionJa: `智印云の大判ポチ袋は150g～200g高級赤紙を使用し、標準サイズより30～50%大きく、厚い現金やギフトカードも入ります。企業の上層部配布、結婚式のギフト、寿宴、主要な祝日に最適。箔押し、エンボス、局部UVで格式を高められます。`,
    features: [
      '【120g–150g紅色紙張】喜慶質感，挺度適中',
      '【四色印刷】金色文字與圖案鮮豔持久',
      '【加大30%–50%】容量更大，適合厚禮金',
      '【500個起訂】小批量數碼，大批量柯式',
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
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/large-red-packets.jpg'],
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
      'zh-hk': '香港大號利是封印刷 150g–200g紅色紙張 燙金',
      en: 'Large Red Packets | Professional Red Packets Hong Kong',
      ja: '大判ポチ袋 | 香港プロポチ袋'
    },
  },
  },
  // 年曆印刷 (6 SKU)
  {
    id: 'CL-001',
    sku_code: 'CL-001',
    slug: 'wall-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '掛牆年曆', nameEn: 'Wall Calendars', nameJa: '壁掛けカレンダー', title_zh: '掛牆年曆',
    description: '標準A3或A2掛牆年曆，13頁設計（封面+12個月）。適合家庭、辦公室使用，全年品牌曝光。', descriptionEn: 'Standard A3 or A2 wall calendars, 13-page design. Perfect for home and office use.', descriptionJa: '標準A3またはA2壁掛けカレンダー、13ページデザイン。家庭やオフィスに最適。', description_zh: '標準A3或A2掛牆年曆，13頁設計（封面+12個月）。適合家庭、辦公室使用，全年品牌曝光。',
    longDescription: `智印云掛牆月曆採用250g–300g銅版紙或啞粉紙，配合四色柯式印刷，每月一頁，圖文清晰色彩鮮豔。背面可印企業資訊、優惠券或聯絡方式，實用與宣傳兼具。適合企業禮品、客戶回饋、房地產推廣及家庭使用。金屬圈裝訂，翻頁順暢。我們提供免費節慶標註與排版設計。與分類頁內容一致，材質關鍵詞包含：掛牆月曆、銅版紙、金屬圈、四色印刷。`,
    longDescriptionEn: `ZprintPro Wall Calendars use 250g–300g glossy or matte paper with 4-color offset printing—one month per page with crisp text and vibrant images. The back can feature corporate info, coupons, or contact details—practical and promotional. Ideal for corporate gifts, client rewards, property marketing, and home use. Metal ring binding for smooth page turning.`,
    longDescriptionJa: `智印云の壁掛けカレンダーは250g～300gコート紙またはマット紙を使用し、4色オフセット印刷で1月1ページ、鮮明な文字と鮮やかな画像。裏面には企業情報、クーポン、連絡先を印刷可能で、実用性と宣伝性を兼ね備えます。企業ギフト、顧客特典、不動産マーケティング、家庭用に最適。金属リング綴じでページめくりがスムーズです。`,
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【每月一頁】背面可印企業資訊，實用宣傳雙效',
      '【免費排版】每月版面設計與節慶標註',
      '【500本起印】大批量柯式，小批量數碼',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '250g–300g銅版紙或啞粉紙；金屬圈',
      size: 'A3（297×420mm）或A4（210×297mm）',
      printMethod: '四色柯式或數碼印刷',
      finishing: '金屬圈裝訂、打掛孔',
    },
    price_range: 'HK$12-40/本',
    basePrice: 12,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/wall-calendars.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-en.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-en-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-en-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-en-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-ja.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-wall-calendars-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-calendars-wall-calendars-zh-hk.webp', en: 'zprintpro-calendars-wall-calendars-en.webp', ja: 'zprintpro-calendars-wall-calendars-ja.webp' },
    alt: {
      'zh-hk': '香港掛牆年曆印刷 250g–300g銅版紙 金屬圈裝訂',
      en: 'Wall Calendars | Professional Calendars Hong Kong',
      ja: '壁掛けカレンダー | 香港プロカレンダー'
    },
  },
  },
  {
    id: 'CL-002',
    sku_code: 'CL-002',
    slug: 'desk-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '座檯年曆', nameEn: 'Desk Calendars', nameJa: '卓上カレンダー', title_zh: '座檯年曆',
    description: '三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌接觸。', descriptionEn: 'Triangular desk design, stable and beautiful. Perfect for office desk display.', descriptionJa: '三角形の卓上デザイン、安定して美しい。オフィスデスクに最適。', description_zh: '三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌接觸。',
    longDescription: `智印云座枱月曆採用200g–250g銅版紙或卡紙，配合三角座架設計，穩固站立於桌面。每月一頁或每季一頁，正面印精美圖片，背面印備忘欄。適合辦公室桌面、收銀台擺放及企業禮品。我們提供免費座架結構設計與排版。與分類頁內容一致，材質關鍵詞包含：座枱月曆、銅版紙、三角座架、桌面擺放。`,
    longDescriptionEn: `ZprintPro Desk Calendars use 200g–250g glossy or card paper with triangular stand design for stable desktop placement. Monthly or quarterly pages with beautiful images on the front and memo space on the back. Ideal for office desks, cashier counters, and corporate gifts. Free stand structure design and layout provided.`,
    longDescriptionJa: `智印云の卓上カレンダーは200g～250gコート紙またはカード紙を使用し、三角スタンド設計でデスクにしっかりと立てられます。月ごとまたは四半期ごとのページで、表面に美しい画像、裏面にメモ欄。オフィスデスク、レジカウンター、企業ギフトに最適。無料のスタンド構造設計とレイアウト提供。`,
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【三角座架】穩固站立，桌面擺放首選',
      '【免費排版】每月版面設計與節慶標註',
      '【500本起印】大批量柯式，小批量數碼',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '200g–250g銅版紙或卡紙；三角座架',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '三角座架、騎馬釘或膠裝',
    },
    price_range: 'HK$16-50/本',
    basePrice: 16,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/desk-calendars.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-en.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-en-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-en-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-desk-calendars-en-4.webp',
    ],
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
      'zh-hk': '香港座檯年曆印刷 200g–250g銅版紙 三角座架',
      en: 'Desk Calendars | Professional Calendars Hong Kong',
      ja: '卓上カレンダー | 香港プロカレンダー'
    },
  },
  },
  {
    id: 'CL-003',
    sku_code: 'CL-003',
    slug: 'custom-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '定制年曆', nameEn: 'Custom Calendars', nameJa: 'オリジナルカレンダー', title_zh: '定制年曆',
    description: '專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。', descriptionEn: 'Exclusive design, each page can feature company products or services.', descriptionJa: '独占的なデザイン、各ページに会社の製品やサービスを掲載可能。', description_zh: '專屬設計，每頁可印公司產品或服務。企業禮品首選，送客戶最佳選擇。',
    longDescription: `智印云定制月曆採用250g–300g藝術紙或銅版紙，完全客製化設計，可印企業Logo、品牌故事、產品圖片及專屬節慶標註。適合企業年終禮品、VIP客戶回饋、品牌紀念品及家庭定制。我們提供從設計到印刷的一站式服務，並可搭配燙金或局部UV工藝。與分類頁內容一致，材質關鍵詞包含：定制月曆、客製化、企業Logo、藝術紙。`,
    longDescriptionEn: `ZprintPro Custom Calendars use 250g–300g art or glossy paper with fully custom designs—corporate logos, brand stories, product images, and exclusive holiday markers. Ideal for year-end corporate gifts, VIP client rewards, brand memorabilia, and family customization. One-stop service from design to print with optional foil stamping or spot UV.`,
    longDescriptionJa: `智印云のカスタムカレンダーは250g～300gアート紙またはコート紙を使用し、完全にカスタマイズされたデザイン。企業ロゴ、ブランドストーリー、製品画像、専用の祝日マーカーを印刷可能です。年末の企業ギフト、VIP顧客特典、ブランド記念品、家族のカスタマイズに最適。デザインから印刷までワンストップサービスで、箔押しや局部UVも可能です。`,
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【完全客製】Logo、品牌故事、產品圖片全可印',
      '【免費排版】每月版面設計與節慶標註',
      '【500本起印】大批量柯式，小批量數碼',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '250g–300g藝術紙或銅版紙',
      size: 'A3、A4或完全客製',
      printMethod: '四色柯式或數碼印刷',
      finishing: '燙金、局部UV、金屬圈或騎馬釘',
    },
    price_range: 'HK$20-65/本',
    basePrice: 20,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/custom-calendars.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-en.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-en-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-en-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-ja.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-custom-calendars-ja-4.webp',
    ],
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
      'zh-hk': '香港定制年曆印刷 250g–300g藝術紙 燙金',
      en: 'Custom Calendars | Professional Calendars Hong Kong',
      ja: 'オリジナルカレンダー | 香港プロカレンダー'
    },
  },
  },
  {
    id: 'CL-004',
    sku_code: 'CL-004',
    slug: 'mini-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '迷你年曆', nameEn: 'Mini Calendars', nameJa: 'ミニカレンダー', title_zh: '迷你年曆',
    description: '小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。', descriptionEn: 'Compact and portable, fits in wallet or pocket.', descriptionJa: 'コンパクトで持ち運び可能、財布やポケットに入ります。', description_zh: '小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。',
    longDescription: `智印云迷你月曆採用150g–200g銅版紙或卡紙，尺寸小巧精緻，適合錢包、口袋或手機殼內攜帶。每頁印一個月份，背面可印企業資訊或優惠碼。適合快消品牌、餐飲店、咖啡店及會員禮品。我們提供免費迷你尺寸排版與裁切設計。與分類頁內容一致，材質關鍵詞包含：迷你月曆、銅版紙、小巧尺寸、攜帶方便。`,
    longDescriptionEn: `ZprintPro Mini Calendars use 150g–200g glossy or card paper in compact, pocket-sized formats—perfect for wallets, pockets, or phone cases. Each page shows one month with corporate info or promo codes on the back. Ideal for FMCG brands, restaurants, cafes, and member gifts. Free mini-size layout and cutting design.`,
    longDescriptionJa: `智印云のミニカレンダーは150g～200gコート紙またはカード紙を使用し、コンパクトでポケットサイズ。財布、ポケット、スマホケースに入るサイズ。各ページに1か月を表示し、裏面には企業情報やプロモーションコード。 FMCGブランド、飲食店、カフェ、会員ギフトに最適。無料のミニサイズレイアウトと裁断設計。`,
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【口袋尺寸】小巧精緻，攜帶方便',
      '【免費排版】每月版面設計與節慶標註',
      '【500本起印】大批量柯式，小批量數碼',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '150g–200g銅版紙或卡紙',
      size: '約85×55mm或90×60mm',
      printMethod: '四色數碼印刷',
      finishing: '騎馬釘或單張裁切',
    },
    price_range: 'HK$6-20/本',
    basePrice: 6,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/mini-calendars.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-en.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-en-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-en-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-ja.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-mini-calendars-ja-4.webp',
    ],
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
      'zh-hk': '香港迷你年曆印刷 150g–200g銅版紙 騎馬釘或單張裁切',
      en: 'Mini Calendars | Professional Calendars Hong Kong',
      ja: 'ミニカレンダー | 香港プロカレンダー'
    },
  },
  },
  {
    id: 'CL-005',
    sku_code: 'CL-005',
    slug: 'photo-frame-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '相框年曆', nameEn: 'Photo Frame Calendars', nameJa: 'フォトフレームカレンダー', title_zh: '相框年曆',
    description: '結合相框功能，可替換照片。實用美觀，家庭必備。', descriptionEn: 'Combined photo frame function, photos can be replaced.', descriptionJa: 'フォトフレーム機能付き、写真を交換可能。', description_zh: '結合相框功能，可替換照片。實用美觀，家庭必備。',
    longDescription: `智印云相架月曆採用250g–300g銅版紙或相紙，配合硬紙板相架底座，可直立擺放於桌面或書架。每月一頁，正面印精美照片或插畫，背面印備忘欄。適合家庭擺設、辦公室裝飾、攝影作品展示及企業禮品。我們提供免費相架結構設計與排版。與分類頁內容一致，材質關鍵詞包含：相架月曆、相紙、銅版紙、桌面擺設。`,
    longDescriptionEn: `ZprintPro Photo Frame Calendars use 250g–300g glossy or photo paper with rigid cardboard frame stands for upright display on desks or shelves. Monthly pages with beautiful photos or illustrations on the front and memo space on the back. Ideal for home decor, office decoration, photography displays, and corporate gifts.`,
    longDescriptionJa: `智印云のフォトフレームカレンダーは250g～300gコート紙または写真用紙を使用し、厚紙のフレームスタンドでデスクや本棚に直立して飾られます。月ごとのページで、表面に美しい写真やイラスト、裏面にメモ欄。家庭の装飾、オフィスの装飾、写真展示、企業ギフトに最適。`,
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【硬紙板相架】直立擺放，桌面裝飾首選',
      '【免費排版】每月版面設計與節慶標註',
      '【500本起印】大批量柯式，小批量數碼',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '250g–300g銅版紙或相紙；硬紙板相架',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼或柯式印刷',
      finishing: '硬紙板相架底座、騎馬釘',
    },
    price_range: 'HK$24-80/本',
    basePrice: 24,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/photo-frame-calendars.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-en.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-en-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-en-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-en-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-ja.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-photo-frame-calendars-ja-5.webp',
    ],
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
      'zh-hk': '香港相框年曆印刷 250g–300g銅版紙 硬紙板相架底座',
      en: 'Photo Frame Calendars | Professional Calendars Hong Kong',
      ja: 'フォトフレームカレンダー | 香港プロカレンダー'
    },
  },
  },
  {
    id: 'CL-006',
    sku_code: 'CL-006',
    slug: 'magnetic-calendars',
    category: 'calendars',
    category_slug: 'calendars',
    name: '磁石年曆', nameEn: 'Magnetic Calendars', nameJa: 'マグネットカレンダー', title_zh: '磁石年曆',
    description: '磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。', descriptionEn: 'Magnetic backing, can stick to refrigerator and other metal surfaces.', descriptionJa: 'マグネット背面、冷蔵庫などの金属面に貼付可能。', description_zh: '磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌曝光率高。',
    longDescription: `智印云磁石月曆採用200g–250g銅版紙或合成紙，背面貼合軟磁片，可吸附於冰箱、白板或金屬櫃表面。每月一頁或全年一張，正面印精美圖案，背面可印食譜、優惠券或企業資訊。適合家庭、餐飲店、學校及辦公室。我們提供免費磁片厚度選擇（0.5mm或1mm）與排版設計。與分類頁內容一致，材質關鍵詞包含：磁石月曆、軟磁片、銅版紙、冰箱貼。`,
    longDescriptionEn: `ZprintPro Magnetic Calendars use 200g–250g glossy or synthetic paper backed with flexible magnet sheets, adhering to refrigerators, whiteboards, or metal cabinets. Monthly or full-year formats with beautiful designs on the front and recipes, coupons, or corporate info on the back. Ideal for homes, restaurants, schools, and offices.`,
    longDescriptionJa: `智印云のマグネットカレンダーは200g～250gコート紙または合成紙を使用し、裏面にフレキシブルマグネットシートを貼付。冷蔵庫、ホワイトボード、金属キャビネットに貼付可能。月ごとまたは全年のフォーマットで、表面に美しいデザイン、裏面にレシピ、クーポン、企業情報。家庭、飲食店、学校、オフィスに最適。`,
    features: [
      '【300g銅版紙或啞粉紙】挺度佳，色彩還原準確',
      '【四色柯式或數碼】適合照片與插畫印刷',
      '【金屬圈或騎馬釘】翻頁順暢，牢固耐用',
      '【軟磁片背面】吸附冰箱白板，實用性強',
      '【免費排版】每月版面設計與節慶標註',
      '【500本起印】大批量柯式，小批量數碼',
      '【節慶檔期】Q4為高峰期，建議10月底前確認'
    ],
    specs: {
      material: '200g–250g銅版紙或合成紙；0.5mm或1mm軟磁片',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼印刷',
      finishing: '軟磁片貼合、圓角裁切',
    },
    price_range: 'HK$10-30/本',
    basePrice: 10,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/magnetic-calendars.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-en.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-en-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-en-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-en-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-ja.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-calendars-magnetic-calendars-ja-5.webp',
    ],
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
      'zh-hk': '香港磁石年曆印刷 200g–250g銅版紙 軟磁片貼合',
      en: 'Magnetic Calendars | Professional Calendars Hong Kong',
      ja: 'マグネットカレンダー | 香港プロカレンダー'
    },
  },
  },
  // 餐牌印刷 (5 SKU)
  {
    id: 'MN-001',
    sku_code: 'MN-001',
    slug: 'pvc-menus',
    category: 'menus',
    category_slug: 'menus',
    name: 'PVC餐牌', nameEn: 'PVC Menus', nameJa: 'PVCメニュー', title_zh: 'PVC餐牌',
    description: '防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。', descriptionEn: 'Waterproof and oil-resistant PVC material, easy to clean and durable.', descriptionJa: '防水・耐油性PVC素材、お手入れ簡単で耐久性あり。', description_zh: '防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。',
    longDescription: `智印云PVC餐牌採用0.5mm–1.0mm透明或白色PVC膠片，配合四色UV印刷，防水防油、耐磨耐刮，可直接用濕布擦拭清潔。適合茶餐廳、快餐店、大排檔及戶外餐飲攤位。可單面或雙面印刷，並可選圓角或直角裁切。與分類頁內容一致，材質關鍵詞包含：PVC餐牌、UV印刷、防水防油、透明膠片。`,
    longDescriptionEn: `ZprintPro PVC Menus use 0.5mm–1.0mm clear or white PVC film with 4-color UV printing—waterproof, oil-resistant, abrasion-resistant, and wipeable with a damp cloth. Ideal for cafes, fast-food restaurants, food stalls, and outdoor dining. Single or double-sided with rounded or square corners.`,
    longDescriptionJa: `智印云のPVCメニューは0.5mm～1.0mm透明または白色PVCフィルムを使用し、4色UV印刷で防水、耐油、耐摩耗、湿布で拭き取り可能。茶餐廳、ファストフード、屋台、屋外飲食に最適。片面または両面印刷、丸角または直角の選択肢あり。`,
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【0.5–1.0mm PVC】防水防油，直接擦拭清潔',
      '【免費排版】菜品分類與價格標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
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
      'zh-hk': '香港PVC餐牌印刷 0.5mm–1.0mm透明 圓角或直角裁切',
      en: 'PVC Menus | Professional Menus Hong Kong',
      ja: 'PVCメニュー | 香港プロメニュー'
    },
  },
  },
  {
    id: 'MN-002',
    sku_code: 'MN-002',
    slug: 'laminated-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '過膠餐牌', nameEn: 'Laminated Menus', nameJa: 'ラミネートメニュー', title_zh: '過膠餐牌',
    description: '紙質過膠處理，防水耐用且成本較低。經濟實惠之選。', descriptionEn: 'Paper with lamination, waterproof and durable at lower cost.', descriptionJa: 'ラミネート加工紙、防水で耐久性がありコストも低い。', description_zh: '紙質過膠處理，防水耐用且成本較低。經濟實惠之選。',
    longDescription: `智印云過膠餐牌採用200g–250g銅版紙或啞粉紙，配合四色印刷與啞膠或光膠覆膜，表面防水防油，可用濕布輕拭。過膠層厚度均勻，保護印刷面免受磨損。適合中餐廳、西餐廳、咖啡廳及酒吧。可單面或雙面印刷。與分類頁內容一致，材質關鍵詞包含：過膠餐牌、銅版紙、啞粉紙、覆膜。`,
    longDescriptionEn: `ZprintPro Laminated Menus use 200g–250g glossy or matte paper with 4-color printing and matte or gloss lamination. The laminated surface is water and oil-resistant, wipeable with a damp cloth. Uniform lamination protects the print from wear. Ideal for Chinese restaurants, Western restaurants, cafes, and bars.`,
    longDescriptionJa: `智印云のラミネートメニューは200g～250gコート紙またはマット紙を使用し、4色印刷とマットまたはグロスラミネート。ラミネート表面は防水、耐油で、湿布で軽く拭けます。均一なラミネート層が印刷面を摩耗から保護。中華料理店、西洋料理店、カフェ、バーに最適。`,
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【啞膠／光膠覆膜】防水防油，保護印刷面',
      '【免費排版】菜品分類與價格標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
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
      'zh-hk': '香港過膠餐牌印刷 200g–250g銅版紙 覆膜（啞膠／光膠）',
      en: 'Laminated Menus | Professional Menus Hong Kong',
      ja: 'ラミネートメニュー | 香港プロメニュー'
    },
  },
  },
  {
    id: 'MN-003',
    sku_code: 'MN-003',
    slug: 'hardcover-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '精裝餐牌', nameEn: 'Hardcover Menus', nameJa: '高級メニュー', title_zh: '精裝餐牌',
    description: '硬殼精裝，高檔大氣。適合高級餐廳、酒店。', descriptionEn: 'Hardcover binding, elegant and grand. Perfect for fine dining restaurants, hotels.', descriptionJa: '上製本装丁、エレガントで格式高い。高級レストラン、ホテルに最適。', description_zh: '硬殼精裝，高檔大氣。適合高級餐廳、酒店。',
    longDescription: `智印云硬皮餐牌採用硬紙板封面裱糊銅版紙或特種紙，內頁200g銅版紙，配合騎馬釘或膠裝，封面可燙金或壓凹。高檔質感，適合高級餐廳、酒店、會所及私房菜。我們提供免費封面設計與結構建議。與分類頁內容一致，材質關鍵詞包含：硬皮餐牌、硬紙板封面、燙金、騎馬釘。`,
    longDescriptionEn: `ZprintPro Hardcover Menus use rigid board covers laminated with glossy or specialty paper, with 200g glossy inner pages. Saddle-stitched or perfect-bound with optional foil stamping or debossing on the cover. Premium quality for upscale restaurants, hotels, clubs, and private kitchens. Free cover design and structural advice.`,
    longDescriptionJa: `智印云のハードカバーメニューは厚紙の表紙にコート紙または特殊紙を貼り合わせ、内页は200gコート紙。中綴じまたは無線綴じで、表紙に箔押しやデボスが可能。高級感のある仕上がりで、高級レストラン、ホテル、クラブ、プライベートキッチンに最適。無料の表紙デザインと構造アドバイス。`,
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【硬紙板封面】高檔質感，適合高級餐廳',
      '【免費排版】菜品分類與價格標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
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
      'zh-hk': '香港精裝餐牌印刷 硬紙板封面裱糊銅版紙 燙金',
      en: 'Hardcover Menus | Professional Menus Hong Kong',
      ja: '高級メニュー | 香港プロメニュー'
    },
  },
  },
  {
    id: 'MN-004',
    sku_code: 'MN-004',
    slug: 'drink-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '酒水牌', nameEn: 'Drink Menus', nameJa: 'ドリンクメニュー', title_zh: '酒水牌',
    description: '專為酒水設計，可立式或手持。酒吧、餐廳必備。', descriptionEn: 'Specially designed for drinks, can be standing or handheld.', descriptionJa: 'ドリンク専用設計、立てかけまたは手持ち可能。', description_zh: '專為酒水設計，可立式或手持。酒吧、餐廳必備。',
    longDescription: `智印云飲品餐牌採用200g–250g銅版紙或合成紙，配合四色印刷與啞膠覆膜，防水防油，適合咖啡廳、茶飲店、酒吧及甜品店。可設計為單頁、折頁或立牌形式，並可印QR Code連結線上點餐。與分類頁內容一致，材質關鍵詞包含：飲品餐牌、銅版紙、合成紙、QR Code。`,
    longDescriptionEn: `ZprintPro Drink Menus use 200g–250g glossy or synthetic paper with 4-color printing and matte lamination. Water and oil-resistant for cafes, tea shops, bars, and dessert stores. Can be designed as single-page, folded, or stand-up formats with QR codes linking to online ordering.`,
    longDescriptionJa: `智印云のドリンクメニューは200g～250gコート紙または合成紙を使用し、4色印刷とマットラミネート。防水、耐油でカフェ、ティーショップ、バー、デザート店に最適。単ページ、折りたたみ、スタンド型のデザインが可能で、オンライン注文にリンクするQRコードも印刷可能。`,
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【QR Code連結】線上點餐，減少接觸',
      '【免費排版】菜品分類與價格標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
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
      'zh-hk': '香港酒水牌印刷 200g–250g銅版紙 覆膜（啞膠）',
      en: 'Drink Menus | Professional Menus Hong Kong',
      ja: 'ドリンクメニュー | 香港プロメニュー'
    },
  },
  },
  {
    id: 'MN-005',
    sku_code: 'MN-005',
    slug: 'disposable-menus',
    category: 'menus',
    category_slug: 'menus',
    name: '一次性餐牌', nameEn: 'Disposable Menus', nameJa: '使い捨てメニュー', title_zh: '一次性餐牌',
    description: '經濟紙質，適合快餐店、外賣店。可頻繁更換內容。', descriptionEn: 'Economical paper, perfect for fast food and takeaway shops.', descriptionJa: '経済的な紙、ファストフードやテイクアウト店に最適。', description_zh: '經濟紙質，適合快餐店、外賣店。可頻繁更換內容。',
    longDescription: `智印云即棄餐牌採用100g–120g書紙或再生紙，配合四色數碼印刷，成本低廉，適合大量派發的臨時菜單、限時優惠或活動套餐。紙質輕薄，用後可棄置。適合快餐店、美食節、臨時攤位及試業推廣。與分類頁內容一致，材質關鍵詞包含：即棄餐牌、書紙、再生紙、數碼印刷。`,
    longDescriptionEn: `ZprintPro Disposable Menus use 100g–120g book or recycled paper with 4-color digital printing—low cost for mass distribution of temporary menus, limited-time offers, or event sets. Lightweight and disposable after use. Ideal for fast-food restaurants, food festivals, temporary stalls, and trial promotions.`,
    longDescriptionJa: `智印云の使い捨てメニューは100g～120g書籍紙または再生紙を使用し、4色デジタル印刷で低コスト。大量配布に適した臨時メニュー、期間限定オファー、イベントセットに最適。軽量で使用後に捨てられます。ファストフード、フードフェスティバル、仮設屋台、試験販売に最適。`,
    features: [
      '【防水防油】覆膜或PVC材質，適合餐飲環境',
      '【四色印刷】食物圖片鮮豔誘人',
      '【圓角或直角】依品牌風格選擇',
      '【100g–120g輕薄紙】成本低廉，適合大量派發',
      '【免費排版】菜品分類與價格標註',
      '【50本起訂】小批量數碼，大量柯式',
      '【可更新設計】季節菜單可快速改版'
    ],
    specs: {
      material: '100g–120g書紙或再生紙',
      size: 'A5（148×210mm）或A4（210×297mm）',
      printMethod: '四色數碼印刷',
      finishing: '無覆膜（即棄）',
    },
    price_range: 'HK$0.22-1.20/張',
    basePrice: 0.22,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/disposable-menus.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-en.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-en-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-en-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-ja.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-menus-disposable-menus-ja-4.webp',
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
    filename: { 'zh-hk': 'zprintpro-menus-disposable-menus-zh-hk.webp', en: 'zprintpro-menus-disposable-menus-en.webp', ja: 'zprintpro-menus-disposable-menus-ja.webp' },
    alt: {
      'zh-hk': '香港一次性餐牌印刷 100g–120g書紙 無覆膜（即棄）',
      en: 'Disposable Menus | Professional Menus Hong Kong',
      ja: '使い捨てメニュー | 香港プロメニュー'
    },
  },
  },
  // 噴繪廣告 (5 SKU)
  {
    id: 'BN-001',
    sku_code: 'BN-001',
    slug: 'outdoor-vinyl-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '戶外燈布噴繪', nameEn: 'Outdoor Vinyl Banners', nameJa: '屋外バナー', title_zh: '戶外燈布噴繪',
    description: '大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、建築圍板。', descriptionEn: 'Large outdoor vinyl banners, waterproof and UV-resistant, strong weather resistance.', descriptionJa: '大型屋外ビニールバナー、防水・UV耐性、強い耐候性。', description_zh: '大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、建築圍板。',
    longDescription: `戶外燈布噴繪以 PVC 燈布或外光／內光柔性材料為主，配合溶劑、弱溶劑或 UV 固化墨水，兼顧防水、抗紫外線與大幅面拼接。適用於地產圍板、商場外立面、活動背板與臨時指示牌。與分類頁術語一致：噴繪、燈布、防水防曬。檔案需預留穿繩孔、焊邊與風扣位置；海邊或高紫外線場景建議升級耐候墨層並在安裝時評估張力與鋼索間距。`,
    longDescriptionEn: `Outdoor vinyl banners use frontlit/backlit flex with solvent, eco-solvent, or UV-cured inks for waterproof, UV-stable, wide-format seams. Ideal for construction hoardings, mall exteriors, event backdrops, and temporary wayfinding. Terms align with category content: large-format printing, banner vinyl, weather resistance. Artwork should include grommet grids, welded hems, and wind-slit plans; coastal or high-UV sites may need upgraded ink sets plus cable spacing checks on install.`,
    longDescriptionJa: `屋外バナーはPVCフロント／バックライト系に溶剤・弱溶剤・UVインクで防水・耐紫外線・大型継ぎを両立。工事囲い、商業外壁、イベント看板に。用語：大判プリント、ターポリン、耐候性。ハトメ、溶接ヘム、風抜き位置をデータに。海岸・高UVはインクグレードアップとワイヤー張力を確認。`,
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
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/outdoor-vinyl-banners.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-en.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-en-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-en-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-en-4.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-ja.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-banners-outdoor-vinyl-banners-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-banners-outdoor-vinyl-banners-zh-hk.webp', en: 'zprintpro-banners-outdoor-vinyl-banners-en.webp', ja: 'zprintpro-banners-outdoor-vinyl-banners-ja.webp' },
    alt: {
      'zh-hk': '香港戶外燈布噴繪印刷 外光／內光 PVC 燈布（依場景） 打扣',
      en: 'Outdoor Vinyl Banners | Professional Banners Hong Kong',
      ja: '屋外バナー | 香港プロバナー'
    },
  },
  },
  {
    id: 'BN-002',
    sku_code: 'BN-002',
    slug: 'roll-up-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '易拉寶', nameEn: 'Roll-up Banners', nameJa: 'ロールアップバナー', title_zh: '易拉寶',
    description: '便攜易拉寶展架，安裝簡便。展會、路演必備。', descriptionEn: 'Portable roll-up banner stands, easy to install. Essential for exhibitions and roadshows.', descriptionJa: 'ポータブルロールアップバナースタンド、設置簡単。展示会やロードショーに必須。', description_zh: '便攜易拉寶展架，安裝簡便。展會、路演必備。',
    longDescription: `易拉寶由鋁合金或塑鋼支架＋可反捲畫面組成，單人數分鐘即可完成展開與收納，是展會攤位、酒店簽到與門市臨時促銷的標配。畫面多採不反光 PET／PVC 片或防捲邊合成紙，底部加重桿降低晃動。與分類頁一致：噴繪、易拉寶、防水帆布。稿面請預留上下安全區避免捲入機構；若長期戶外擺放，建議升級抗 UV 墨與加重底座。`,
    longDescriptionEn: `Roll-up banners pair aluminum or hybrid stands with spring-rolled graphics for one-person setup in minutes—staples for expo booths, hotel check-ins, and pop-up retail promos. Graphics often use anti-glare PET/PVC or curl-resistant synthetics with weighted foot bars to reduce wobble. Terms align with category content: large-format printing, roll-ups, outdoor vinyl. Keep top/bottom safe zones clear of hardware; outdoor long runs may need UV-stable inks and heavier bases.`,
    longDescriptionJa: `ロールアップは軽量スタンドと反巻きグラフィックで数分設営。展示会、ホテル受付、店頭POPに最適。反射低減PET／PVCや反り低減合成紙、加重バーで安定。用語：大判、ロールアップ、防水帆布。上下セーフゾーンを確保。屋外長期はUVインクと重いベースを検討。`,
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/roll-up-banners.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-en.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-en-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-en-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-ja.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-roll-up-banners-ja-4.webp',
    ],
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
      'zh-hk': '香港易拉寶印刷 PET／PVC 片 加重桿',
      en: 'Roll-up Banners | Professional Banners Hong Kong',
      ja: 'ロールアップバナー | 香港プロバナー'
    },
  },
  },
  {
    id: 'BN-003',
    sku_code: 'BN-003',
    slug: 'adhesive-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '背膠噴繪', nameEn: 'Adhesive Banners', nameJa: '粘着バナー', title_zh: '背膠噴繪',
    description: '自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。', descriptionEn: 'Self-adhesive, can be directly applied to walls or glass.', descriptionJa: '自己粘着、壁やガラスに直接貼付可能。', description_zh: '自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活動佈置。',
    longDescription: `背膠噴繪以車貼、灰膠可移、透明膜或導氣槽底紙等材質為主，適合櫥窗全貼、牆面主視覺與短期活動佈置。可霧面降低燈點反光，亦可在玻璃內外貼形成雙視覺。與分類頁一致：噴繪、背膠、防水。施工前需確認底材清潔度與殘膠等級（永久／可移）；曲面或粗糙牆建議打樣小條測試黏著與拉伸回彈。`,
    longDescriptionEn: `Adhesive wide-format prints use calendared vinyl, removable gray glue, clear films, or air-egress liners for full-window wraps, wall hero graphics, and short-term decor. Matte finishes tame hot spots; inside/outside glass layers can create dual reads. Terms align with category content: large-format printing, adhesive vinyl, waterproofing. Confirm substrate cleanliness and adhesive class (permanent vs removable); curved or rough walls benefit from strip tests for tack and stretch recovery.`,
    longDescriptionJa: `粘着大判はカッティングシート、グレー再剥離、透明、エアリリース等でショーウィンドウ全面や壁面ヒーローを短工期で施工。マットで反射抑制。用語：大判、粘着、防水。下地清浄度と糊種（永久／再剥離）を確認。曲面・粗面はテストストリップ推奨。`,
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/adhesive-banners.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-en.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-en-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-en-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-en-4.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-ja.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-adhesive-banners-ja-4.webp',
    ],
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
      'zh-hk': '香港背膠噴繪印刷 PVC 車貼／可移膠／透明膜（依場景） 霧面護膜',
      en: 'Adhesive Banners | Professional Banners Hong Kong',
      ja: '粘着バナー | 香港プロバナー'
    },
  },
  },
  {
    id: 'BN-004',
    sku_code: 'BN-004',
    slug: 'vehicle-wraps',
    category: 'banners',
    category_slug: 'banners',
    name: '車身廣告', nameEn: 'Vehicle Wraps', nameJa: 'カーラッピング', title_zh: '車身廣告',
    description: '專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。', descriptionEn: 'Specialized vehicle wrap vinyl, strong weather resistance, no residue when removed.', descriptionJa: '専用車体ラップビニール、強い耐候性、剥がしても残りません。', description_zh: '專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光率高。',
    longDescription: `智印云車身廣告採用鑄造級高分子 PVC 車貼，厚度 80–100 微米，帶有導氣槽與可移除背膠，可順應車身曲面緊密貼合，移除後不殘膠、不傷原廠烤漆。油墨為 UV 固化或環保溶劑型，戶外耐候達 2–3 年，抗 UV 與酸雨侵蝕。我們提供整車包膜、局部拉花及後擋風玻璃單透貼三種方案，並可配合 3M 或 Avery 品牌材質升級。印前提供免費車型版型與導氣模擬，確保轉角與邊緣不起翹。與分類頁內容一致，材質關鍵詞包含：鑄造級 PVC、導氣槽、可移膠、UV 固化、單透貼。`,
    longDescriptionEn: `ZprintPro vehicle wraps use cast-grade polymer PVC vinyl at 80–100 microns thickness, with air-release channels and removable adhesive that conforms tightly to vehicle curves without residue or damaging factory paint upon removal. UV-cured or eco-solvent inks provide 2–3 year outdoor weather resistance against UV and acid rain. We offer full-vehicle wraps, partial decals, and rear-window perforated film options, with upgrades to 3M or Avery brand materials. Free vehicle template and air-release simulation provided during prepress, ensuring corners and edges stay flat. Terminology aligns with category content: cast-grade PVC, air-release channels, removable adhesive, UV curing, perforated film.`,
    longDescriptionJa: `智印云のカーラッピングはキャストグレード高分子PVCビニールを使用し、厚さ80～100ミクロン、エアリリース溝と再剥離粘着剤付きで、車体の曲面に密着し、剥がしても残りや純正塗装の傷がありません。UV硬化または環境配慮溶剤型インクで、屋外耐候性は2～3年、紫外線と酸雨に強いです。フルラッピング、部分デカール、リアウィンドウ単透貼の3種類のプランを提供し、3MまたはAveryブランド素材へのアップグレードも可能です。印前で無料の車種テンプレートとエアリリースシミュレーションを提供し、角や端の浮き上がりを防ぎます。カテゴリ用語：キャストグレードPVC、エアリリース溝、はがせる粘着剤、UV硬化、単透貼。`,
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/vehicle-wraps.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-en.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-en-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-en-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-ja.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-vehicle-wraps-ja-4.webp',
    ],
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
      'zh-hk': '香港車身廣告印刷 鑄造級 PVC 車貼 80–100 微米 亮面／啞面覆膜',
      en: 'Vehicle Wraps | Professional Banners Hong Kong',
      ja: 'カーラッピング | 香港プロバナー'
    },
  },
  },
  {
    id: 'BN-005',
    sku_code: 'BN-005',
    slug: 'mesh-banners',
    category: 'banners',
    category_slug: 'banners',
    name: '網格布噴繪', nameEn: 'Mesh Banners', nameJa: 'メッシュバナー', title_zh: '網格布噴繪',
    description: '網格設計，透光透風。適合大型戶外廣告、建築圍板。', descriptionEn: 'Mesh design, light and air permeable. Perfect for large outdoor advertising.', descriptionJa: 'メッシュデザイン、光と空気を通す。大型屋外広告に最適。', description_zh: '網格設計，透光透風。適合大型戶外廣告、建築圍板。',
    longDescription: `智印云網格布噴繪採用 270g–350g PVC 網格夾網布，網孔率 30%–40%，兼具透光透風與畫面完整性，特別適合大型戶外廣告、建築圍板、體育場館圍欄及樓宇外牆巨幅廣告。風阻較傳統橫幅降低 60% 以上，大幅減少桁架與綁繩的負荷。油墨為 UV 固化型，戶外耐候達 2–3 年，並可選阻燃處理符合香港消防處標準。邊緣熱封加強並配備銅扣眼與綁繩，確保長期懸掛不撕裂。我們提供免費風阻計算與安裝方案建議。與分類頁內容一致，材質關鍵詞包含：PVC 網格布、夾網布、阻燃處理、UV 固化、銅扣眼。`,
    longDescriptionEn: `ZprintPro mesh banners use 270g–350g PVC mesh scrim with 30%–40% perforation ratio, combining light/air permeability with graphic integrity. Ideal for large outdoor advertising, building hoardings, stadium fencing, and building facade mega-banners. Wind resistance is reduced by over 60% compared to traditional banners, significantly lowering truss and tie-rope loads. UV-cured inks provide 2–3 year outdoor durability, with optional flame-retardant treatment meeting Hong Kong Fire Services Department standards. Heat-sealed reinforced edges with brass grommets and tie ropes ensure long-term hanging without tearing. We provide free wind-load calculations and installation recommendations. Terminology aligns with category content: PVC mesh fabric, scrim, flame-retardant treatment, UV curing, brass grommets.`,
    longDescriptionJa: `智印云のメッシュバナーは270g～350g PVCメッシュスクリムを使用し、開孔率30％～40％で、透光性と通風性と画面の完全性を両立させています。大型屋外広告、建築囲板、競技場フェンス、ビル外壁の巨大広告に最適です。従来のバナーに比べ風阻を60％以上低減し、トラスと結び紐の負荷を大幅に軽減します。UV硬化インクで屋外耐候性は2～3年、香港消防処基準に適合する難燃処理オプションもあります。熱融着補強エッジに真鍮ハトメと結び紐を備え、長期吊り下げでも破れません。無料の風荷重計算と設置方案提案を提供します。カテゴリ用語：PVCメッシュ生地、スクリム、難燃処理、UV硬化、真鍮ハトメ。`,
    features: [
      '【270g–350g 網格布】網孔率 30%–40%，透光透風',
      '【風阻降低 60%】大幅減少桁架負荷，適合高層外牆',
      '【2–3 年戶外耐候】UV 固化油墨，抗紫外線與酸雨',
      '【阻燃處理】可選香港消防處標準阻燃，公共場所安心',
      '【熱封邊緣】銅扣眼與綁繩加固，長期懸掛不撕裂',
      '【巨幅輸出】最大寬度 5 米，長度無限拼接',
      '【免費風阻計算】提供安裝方案與桁架建議',
    ],
    specs: {
      material: '270g–350g PVC 網格夾網布；UV 固化油墨',
      size: '最大寬度 5 米，長度無限；常見 3×6m、4×8m',
      printMethod: 'UV 大判噴繪',
      finishing: '熱封邊、銅扣眼、阻燃處理、雙面縫邊',
    },
    price_range: 'HK$16-75/平方米',
    basePrice: 16,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/mesh-banners.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-en.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-en-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-en-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-ja.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-banners-mesh-banners-ja-4.webp',
    ],
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
    filename: { 'zh-hk': 'zprintpro-banners-mesh-banners-zh-hk.webp', en: 'zprintpro-banners-mesh-banners-en.webp', ja: 'zprintpro-banners-mesh-banners-ja.webp' },
    alt: {
      'zh-hk': '香港網格布噴繪印刷 270g–350g PVC 網格夾網布 熱封邊',
      en: 'Mesh Banners | Professional Banners Hong Kong',
      ja: 'メッシュバナー | 香港プロバナー'
    },
  },
  },
  // 書籍印刷 (5 SKU)
  {
    id: 'BK-001',
    sku_code: 'BK-001',
    slug: 'catalog-printing',
    category: 'books',
    category_slug: 'books',
    name: '畫冊印刷', nameEn: 'Catalog Printing', nameJa: 'カタログ印刷', title_zh: '畫冊印刷',
    description: '高級畫冊，色彩還原度高。適合產品目錄、企業年報、藝術作品集。', descriptionEn: 'Premium catalogs with high color accuracy. Perfect for product catalogs, annual reports.', descriptionJa: '高級カタログ、高い色再現性。製品カタログ、年次報告書に最適。', description_zh: '高級畫冊，色彩還原度高。適合產品目錄、企業年報、藝術作品集。',
    longDescription: `智印云產品目錄採用157g–200g銅版紙或啞粉紙，配合四色柯式印刷，色彩鮮豔、圖文清晰。封面可選200g–250g銅版紙覆膜或燙金。裝訂方式可選騎馬釘（薄本）或膠裝（厚本）。適合企業產品展示、服務介紹及批發目錄。與分類頁內容一致，材質關鍵詞包含：產品目錄、銅版紙、騎馬釘、膠裝。`,
    longDescriptionEn: `ZprintPro Catalogs use 157g–200g glossy or matte paper with 4-color offset printing. Covers in 200g–250g glossy with lamination or foil stamping. Binding options include saddle-stitching (thin) or perfect binding (thick). Ideal for product showcases, service introductions, and wholesale catalogs.`,
    longDescriptionJa: `智印云の製品カタログは157g～200gコート紙またはマット紙を使用し、4色オフセット印刷。表紙は200g～250gコート紙にラミネートまたは箔押し。綴じ方は中綴じ（薄い本）または無線綴じ（厚い本）。製品展示、サービス紹介、卸売カタログに最適。`,
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【封面覆膜或燙金】品牌質感提升',
      '【免費排版】目錄、頁碼與章節標註',
      '【50本起訂】小批量數碼，大量柯式',
      '【節慶檔期】Q4為高峰期，建議提早確認'
    ],
    specs: {
      material: '內頁157g–200g銅版紙；封面200g–250g銅版紙',
      size: 'A4（210×297mm）或A5（148×210mm）',
      printMethod: '四色柯式印刷',
      finishing: '覆膜（啞膜／光膜）、燙金、騎馬釘或膠裝',
    },
    price_range: 'HK$24-120/本',
    basePrice: 24,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/catalog-printing.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-en.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-en-2.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-en-3.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-en-4.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-en-5.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-ja.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-books-catalog-printing-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-catalog-printing-zh-hk.webp', en: 'zprintpro-books-catalog-printing-en.webp', ja: 'zprintpro-books-catalog-printing-ja.webp' },
    alt: {
      'zh-hk': '香港畫冊印刷印刷 內頁157g–200g銅版紙 覆膜（啞膜／光膜）',
      en: 'Catalog Printing | Professional Books Hong Kong',
      ja: 'カタログ印刷 | 香港プロ書籍'
    },
  },
  },
  {
    id: 'BK-002',
    sku_code: 'BK-002',
    slug: 'saddle-stitch-booklets',
    category: 'books',
    category_slug: 'books',
    name: '騎馬釘小冊子', nameEn: 'Saddle Stitch Booklets', nameJa: '中綴じ冊子', title_zh: '騎馬釘小冊子',
    description: '經濟裝訂方式，適合頁數較少的冊子。產品說明書、活動手冊首選。', descriptionEn: 'Economical binding method, perfect for booklets with fewer pages.', descriptionJa: '経済的な製本方法、ページ数の少ない冊子に最適。', description_zh: '經濟裝訂方式，適合頁數較少的冊子。產品說明書、活動手冊首選。',
    longDescription: `智印云騎馬釘書冊採用128g–157g銅版紙或書紙，配合四色印刷與騎馬釘裝訂，翻頁順暢，成本經濟。適合薄本刊物、活動手冊、會議資料及產品說明書。頁數建議8–64頁。與分類頁內容一致，材質關鍵詞包含：騎馬釘書冊、銅版紙、書紙、經濟裝訂。`,
    longDescriptionEn: `ZprintPro Saddle-stitch Booklets use 128g–157g glossy or book paper with 4-color printing and saddle-stitch binding—smooth page turning at economical cost. Ideal for thin publications, event handbooks, meeting materials, and product manuals. Recommended 8–64 pages.`,
    longDescriptionJa: `智印云の中綴じ冊子は128g～157gコート紙または書籍紙を使用し、4色印刷と中綴じでページめくりがスムーズで経済的。薄い出版物、イベントハンドブック、会議資料、製品マニュアルに最適。8～64ページ推奨。`,
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【騎馬釘裝訂】8–64頁薄本，經濟實惠',
      '【免費排版】目錄、頁碼與章節標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/saddle-stitch-booklets.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-en.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-en-2.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-en-3.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-ja.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-books-saddle-stitch-booklets-ja-6.webp',
    ],
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
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-saddle-stitch-booklets-zh-hk.webp', en: 'zprintpro-books-saddle-stitch-booklets-en.webp', ja: 'zprintpro-books-saddle-stitch-booklets-ja.webp' },
    alt: {
      'zh-hk': '香港騎馬釘小冊子印刷 128g–157g銅版紙 騎馬釘裝訂',
      en: 'Saddle Stitch Booklets | Professional Books Hong Kong',
      ja: '中綴じ冊子 | 香港プロ書籍'
    },
  },
  },
  {
    id: 'BK-003',
    sku_code: 'BK-003',
    slug: 'perfect-bound-books',
    category: 'books',
    category_slug: 'books',
    name: '無線膠裝書籍', nameEn: 'Perfect Bound Books', nameJa: '無線綴じ本', title_zh: '無線膠裝書籍',
    description: '平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。', descriptionEn: 'Flat spine, can print book title. Perfect for books and magazines with more pages.', descriptionJa: '平らな背表紙、書名を印刷可能。ページ数の多い本や雑誌に最適。', description_zh: '平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。',
    longDescription: `智印云膠裝書籍採用157g–200g銅版紙或啞粉紙內頁，配合200g–250g封面銅版紙覆膜，膠裝書脊平整牢固，可平攤閱讀。適合雜誌、年報、作品集及教材。頁數建議48頁以上。與分類頁內容一致，材質關鍵詞包含：膠裝書籍、銅版紙、啞粉紙、膠裝。`,
    longDescriptionEn: `ZprintPro Perfect-bound Books use 157g–200g glossy or matte inner pages with 200g–250g glossy laminated covers. Perfect binding creates a flat, sturdy spine that opens flat. Ideal for magazines, annual reports, portfolios, and textbooks. Recommended 48+ pages.`,
    longDescriptionJa: `智印云の無線綴じ本は157g～200gコート紙またはマット紙の内页に、200g～250gコート紙のラミネート表紙。無線綴じで平らで丈夫な背表紙ができ、開いて読めます。雑誌、年報、ポートフォリオ、教材に最適。48ページ以上推奨。`,
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【膠裝書脊】平整牢固，48頁以上適用',
      '【免費排版】目錄、頁碼與章節標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/perfect-bound-books.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-2.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-3.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-4.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-5.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-books-perfect-bound-books-ja-5.webp',
    ],
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
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-perfect-bound-books-zh-hk.webp', en: 'zprintpro-books-perfect-bound-books-en.webp', ja: 'zprintpro-books-perfect-bound-books-ja.webp' },
    alt: {
      'zh-hk': '香港無線膠裝書籍印刷 內頁157g–200g銅版紙 膠裝',
      en: 'Perfect Bound Books | Professional Books Hong Kong',
      ja: '無線綴じ本 | 香港プロ書籍'
    },
  },
  },
  {
    id: 'BK-004',
    sku_code: 'BK-004',
    slug: 'hardcover-books',
    category: 'books',
    category_slug: 'books',
    name: '精裝書籍', nameEn: 'Hardcover Books', nameJa: '上製本', title_zh: '精裝書籍',
    description: '硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。', descriptionEn: 'Hardcover binding, luxurious and durable. Perfect for collector\'s editions.', descriptionJa: '上製本装丁、豪華で耐久性あり。愛蔵版、企業年鑑に最適。', description_zh: '硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。',
    longDescription: `智印云硬皮書籍採用硬紙板封面裱糊銅版紙或特種紙，內頁157g–200g銅版紙，配合膠裝與硬皮封面，封面可燙金、壓凹或局部UV。高檔質感，適合畫冊、紀念冊、精裝書及企業年鑑。與分類頁內容一致，材質關鍵詞包含：硬皮書籍、硬紙板封面、燙金、精裝。`,
    longDescriptionEn: `ZprintPro Hardcover Books use rigid board covers laminated with glossy or specialty paper, with 157g–200g glossy inner pages and perfect binding. Covers can feature foil stamping, debossing, or spot UV. Premium quality for art books, commemorative albums, deluxe editions, and corporate yearbooks.`,
    longDescriptionJa: `智印云のハードカバー本は厚紙の表紙にコート紙または特殊紙を貼り合わせ、内页は157g～200gコート紙。無線綴じで、表紙に箔押し、デボス、局部UVが可能。高級感のある仕上がりで、画集、記念アルバム、豪華版、企業年鑑に最適。`,
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【硬紙板封面】高檔精裝，畫冊年鑑首選',
      '【免費排版】目錄、頁碼與章節標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/hardcover-books.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-en.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-en-2.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-en-3.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-ja.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-books-hardcover-books-ja-4.webp',
    ],
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
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-hardcover-books-zh-hk.webp', en: 'zprintpro-books-hardcover-books-en.webp', ja: 'zprintpro-books-hardcover-books-ja.webp' },
    alt: {
      'zh-hk': '香港精裝書籍印刷 硬紙板封面裱糊銅版紙 膠裝',
      en: 'Hardcover Books | Professional Books Hong Kong',
      ja: '上製本 | 香港プロ書籍'
    },
  },
  },
  {
    id: 'BK-005',
    sku_code: 'BK-005',
    slug: 'spiral-notebooks',
    category: 'books',
    category_slug: 'books',
    name: '線圈筆記本', nameEn: 'Spiral Notebooks', nameJa: 'リングノート', title_zh: '線圈筆記本',
    description: '線圈裝訂，可180度平攤。適合筆記本、工作手冊。', descriptionEn: 'Spiral binding, can lay flat at 180 degrees. Perfect for notebooks, workbooks.', descriptionJa: 'スパイラル製本、180度に開く。ノート、ワークブックに最適。', description_zh: '線圈裝訂，可180度平攤。適合筆記本、工作手冊。',
    longDescription: `智印云活頁筆記本採用80g–100g書紙或道林紙，配合YO圈或金屬螺旋裝訂，可180度平攤書寫。封面可選200g銅版紙覆膜或PP透明片。適合學生筆記、會議記錄、工作手帳及企業禮品。與分類頁內容一致，材質關鍵詞包含：活頁筆記本、書紙、道林紙、YO圈裝訂。`,
    longDescriptionEn: `ZprintPro Spiral Notebooks use 80g–100g book or wood-free paper with YO-ring or metal spiral binding, opening flat to 180 degrees for writing. Covers in 200g glossy laminated or clear PP. Ideal for student notes, meeting minutes, work planners, and corporate gifts.`,
    longDescriptionJa: `智印云のリングノートは80g～100g書籍紙または上質紙を使用し、YOリングまたは金属スパイラル綴じで180度開いて書けます。表紙は200gコート紙のラミネートまたは透明PP。学生のノート、会議議事録、ワークプランナー、企業ギフトに最適。`,
    features: [
      '【157g–200g銅版紙或啞粉紙】內頁挺度佳，圖文清晰',
      '【四色柯式印刷】色彩飽和，適合照片與插畫',
      '【多種裝訂】騎馬釘、膠裝、線裝或硬皮',
      '【YO圈／螺旋裝訂】180度平攤，書寫順暢',
      '【免費排版】目錄、頁碼與章節標註',
      '【50本起訂】小批量數碼，大量柯式',
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
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/spiral-notebooks.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-en.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-en-2.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-en-3.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-en-4.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-ja.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-books-spiral-notebooks-ja-5.webp',
    ],
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
        { value: 50, label: '50本', discount: 1 },
        { value: 100, label: '100本', discount: 0.85 },
        { value: 500, label: '500本', discount: 0.7 },
      ],
    },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-books-spiral-notebooks-zh-hk.webp', en: 'zprintpro-books-spiral-notebooks-en.webp', ja: 'zprintpro-books-spiral-notebooks-ja.webp' },
    alt: {
      'zh-hk': '香港線圈筆記本印刷 內頁80g–100g書紙 YO圈或螺旋裝訂',
      en: 'Spiral Notebooks | Professional Books Hong Kong',
      ja: 'リングノート | 香港プロ書籍'
    },
  },
  },
  // 信封印刷 (4 SKU)
  {
    id: 'EV-001',
    sku_code: 'EV-001',
    slug: 'business-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '公司信封', nameEn: 'Business Envelopes', nameJa: 'ビジネス封筒', title_zh: '公司信封',
    description: '定制公司信封，印上Logo和地址。專業形象，商務必備。', descriptionEn: 'Custom business envelopes with logo and address. Professional image, essential for business.', descriptionJa: 'カスタムビジネス封筒、ロゴと住所を印刷。プロフェッショナルなイメージ。', description_zh: '定制公司信封，印上Logo和地址。專業形象，商務必備。',
    longDescription: `公司信封是對外郵寄的第一張名片，適合賬單、報價、律師函及日常公函。可採高白書紙或本白書紙，單色或四色印刷公司標誌、回信地址與合規提示語；亦可加開窗方便對照內頁抬頭。與分類頁術語一致：信封印刷、書紙、自黏封口。建議在稿面預留郵資區與條碼留白，並確認封口舌位與機械封裝線相容，以利大量郵寄作業。`,
    longDescriptionEn: `Business envelopes are your mailed brand handshake—ideal for statements, quotes, legal notices, and daily correspondence. Print on bright or natural bond in one-color corporate marks or four-color lockups, with optional windows for matching letterheads. Terms align with category content: envelope printing, book paper, peel-and-seal. Reserve postage and barcode clear zones; align flap geometry with inserting lines for high-volume mailing.`,
    longDescriptionJa: `ビジネス封筒は対外郵送の名刺。請求・見積・法務文書に。高白／生成ブック、1色〜4色でロゴと返信先。窓付きで書簡照合も。用語：封筒印刷、書籍紙、剥離糊。郵便料金・バーコード余白とフラップ形状を挿入機に合わせる。`,
    features: [
      'Logo、地址、合規字樣一體排版',
      '可選開窗或全封無窗',
      '書紙克重可依郵寄厚度調整',
      '適合機械封裝與大量郵寄',
      '單色公函至四色品牌款皆可',
      '印前郵資區與條碼留白提示',
      '與信紙、名片色系可對齊',
    ],
    specs: {
      material: '80–120g 書紙／本白書紙',
      size: 'DL／C5／C4 等常用規格',
      printMethod: '單色至四色柯式或數碼',
      finishing: '自黏封口、開窗貼片（可選）',
    },
    price_range: 'HK$0.22-1.80/個',
    basePrice: 0.22,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/business-envelopes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-zh-hk.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-en.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-en-5.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-ja.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-business-envelopes-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-business-envelopes-zh-hk.webp', en: 'zprintpro-envelopes-business-envelopes-en.webp', ja: 'zprintpro-envelopes-business-envelopes-ja.webp' },
    alt: {
      'zh-hk': '香港公司信封印刷 80–120g 書紙／本白書紙 自黏封口',
      en: 'Business Envelopes | Professional Envelopes Hong Kong',
      ja: 'ビジネス封筒 | 香港プロ封筒'
    },
  },
  },
  {
    id: 'EV-002',
    sku_code: 'EV-002',
    slug: 'colored-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '彩色信封', nameEn: 'Colored Envelopes', nameJa: 'カラー封筒', title_zh: '彩色信封',
    description: '彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件。', descriptionEn: 'Colorful printing, strong visual appeal. Perfect for invitations, greeting cards.', descriptionJa: 'カラフルな印刷、強い視覚的アピール。招待状、グリーティングカードに最適。', description_zh: '彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件。',
    longDescription: `彩色信封以飽和四色或品牌專色呈現插畫、漸層與攝影裁切，讓邀請函、感謝卡與 DM 在信箱中一眼被挑中。紙張可選彩色底紙＋反白印刷，或白／淺色底滿版印刷；搭配自黏封口節省封蠟時間。與分類頁一致：信封印刷、彩色紙、自黏封口。深色大面積稿建議加測耐磨與邊緣爆墨；婚禮套裝可與同批次喜帖對色。`,
    longDescriptionEn: `Colored envelopes use vibrant four-color or Pantone builds for illustrations, gradients, and photo crops so invitations, thank-yous, and DM pieces pop in the mailbox. Choose tinted stocks with knockouts or light bases with full bleed; peel-and-seal speeds closing. Terms align with category content: envelope printing, colored stocks, peel-and-seal. Test rub and edge gain on heavy solids; wedding suites can gang-proof with matching cards.`,
    longDescriptionJa: `カラー封筒はフルカラー／特色でイラストやグラデ、写真切り抜きを際立たせ、招待状やDMの開封率を高めます。色紙＋ノックアウト、または淡色ベースのベタ。剥離糊で封かん効率化。用語：封筒印刷、色紙、剥離糊。濃色ベタは擦れ・端ムラを確認。婚礼セットは同批次で色合わせ。`,
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/colored-envelopes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-en-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-colored-envelopes-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-colored-envelopes-zh-hk-1.webp', en: 'zprintpro-envelopes-colored-envelopes-en-1.webp', ja: 'zprintpro-envelopes-colored-envelopes-ja-1.webp' },
    alt: {
      'zh-hk': '香港彩色信封印刷 120g雙膠紙 四色印刷',
      en: 'Hong Kong Colored Envelopes Printing 120g Offset Paper 4-Color',
      ja: 'カラー封筒 | 香港プロ封筒'
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
    },
  {
    id: 'EV-003',
    sku_code: 'EV-003',
    slug: 'large-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '大號信封', nameEn: 'Large Envelopes', nameJa: '大判封筒', title_zh: '大號信封',
    description: 'A4尺寸大信封，可裝入文件、合同。辦公室必備。', descriptionEn: 'A4 size large envelopes, can hold documents and contracts. Office essential.', descriptionJa: 'A4サイズの大きな封筒、書類や契約書を入れられます。オフィスに必須。', description_zh: 'A4尺寸大信封，可裝入文件、合同。辦公室必備。',
    longDescription: `大號信封以 C4 等可平放 A4 內頁的開口為主，適合合同、標書、成績單與無需折痕的正式文件。建議採 100–120g 書紙提升挺度，避免厚疊文件撐破邊角；封口可選永久膠或自黏易撕條方便收件人存檔。與分類頁一致：信封印刷、書紙。若內含保密資料，可搭配內印隱紋或深色內襯紙；機寄請預留折線與厚度測試。`,
    longDescriptionEn: `Large envelopes (typically C4) lay A4 sheets flat—ideal for contracts, tenders, transcripts, and formal papers that must stay uncreased. Use 100–120gsm bond for stiffness so multi-page sets do not burst corners; choose permanent gum or peel-and-seal tear strips for archival-friendly opening. Terms align with category content: envelope printing, book paper. For confidential sets, add interior tint or security tint patterns; machine-mail paths need fold and caliper checks.`,
    longDescriptionJa: `大判封筒（C4等）はA4を折らずに入れ、契約・入札・成績などに。100–120gでコシを確保。永久糊または剥離式で開封性向上。用語：封筒印刷、書籍紙。機密は内側色柄を。機械投入は厚みと折り線を確認。`,
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/large-envelopes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-en-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-large-envelopes-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-large-envelopes-zh-hk-1.webp', en: 'zprintpro-envelopes-large-envelopes-en-1.webp', ja: 'zprintpro-envelopes-large-envelopes-ja-1.webp' },
    alt: {
      'zh-hk': '香港大號信封印刷 150g牛皮紙 耐用厚實',
      en: 'Hong Kong Large Envelopes Printing 150g Kraft Paper Durable',
      ja: '大判封筒 | 香港プロ封筒'
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
    },
  {
    id: 'EV-004',
    sku_code: 'EV-004',
    slug: 'pearl-envelopes',
    category: 'envelopes',
    category_slug: 'envelopes',
    name: '珠光信封', nameEn: 'Pearl Envelopes', nameJa: 'パール封筒', title_zh: '珠光信封',
    description: '珠光紙張，閃耀質感。適合婚禮邀請、高端活動。', descriptionEn: 'Pearl paper, shimmering quality. Perfect for wedding invitations, high-end events.', descriptionJa: 'パール紙、輝く質感。結婚式の招待状、高級イベントに最適。', description_zh: '珠光紙張，閃耀質感。適合婚禮邀請、高端活動。',
    longDescription: `珠光信封在光線下呈現細緻微粒光澤，無需大面積燙金即可營造高級感，特別適合婚禮邀請、品牌發佈會 RSVP 與 VIP 禮券封套。印刷建議以專色或簡潔線條為主，避免過多實地疊印造成珠光層被遮蓋。與分類頁一致：信封印刷、特種紙。可搭配燙金細框或凹凸壓紋 Logo；印前請提供實紙打樣確認珠光方向與色彩偏移。`,
    longDescriptionEn: `Pearl-finish envelopes shimmer under light, delivering luxury without heavy foil—ideal for wedding suites, launch RSVPs, and VIP voucher sleeves. Favor spot colors or fine linework so the pearl coat stays visible; avoid excessive solids that mask sparkle. Terms align with category content: envelope printing, specialty paper. Pair with hairline foil borders or embossed crests; physical proofs confirm grain direction and color shift.`,
    longDescriptionJa: `パール封筒は微細な輝きで高級感を出し、結婚招待、発表会返信、VIP券封に最適。特色や線画で珠光を活かし、ベタ過多は避ける。用語：封筒印刷、特殊紙。細い箔枠やエンボスと相性良好。実紙校正で繊維方向と色ズレを確認。`,
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
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/pearl-envelopes.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-en-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-en-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-en-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-en-4.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-envelopes-pearl-envelopes-ja-4.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-envelopes-pearl-envelopes-zh-hk-1.webp', en: 'zprintpro-envelopes-pearl-envelopes-en-1.webp', ja: 'zprintpro-envelopes-pearl-envelopes-ja-1.webp' },
    alt: {
      'zh-hk': '香港珠光信封印刷 120g珠光紙 高檔質感',
      en: 'Hong Kong Pearl Envelopes Printing 120g Pearl Paper Premium',
      ja: 'パール封筒 | 香港プロ封筒'
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
    },
  // 校園教育印刷 (4 SKU)
  {
    id: 'ED-001',
    sku_code: 'ED-001',
    slug: 'exercise-books',
    category: 'educational',
    category_slug: 'educational',
    name: '作業簿印刷', nameEn: 'Exercise Books', nameJa: 'ワークブック印刷', title_zh: '作業簿印刷',
    description: '學校作業簿，可定制封面和內頁格式。適合中小學、補習社。', descriptionEn: 'School exercise books, customizable cover and inner page formats. Perfect for schools.', descriptionJa: '学校のワークブック、カスタマイズ可能な表紙と内側ページ形式。小中校、塾に最適。', description_zh: '學校作業簿，可定制封面和內頁格式。適合中小學、補習社。',
    longDescription: `智印云練習簿採用80g–100g書紙或道林紙，配合封面四色印刷與騎馬釘裝訂，內頁可印橫線、方格或空白。紙張書寫流暢，不滲墨，適合學生日常使用。封面可印學校Logo、班級名稱及科目。與分類頁內容一致，材質關鍵詞包含：練習簿、書紙、道林紙、騎馬釘。`,
    longDescriptionEn: `ZprintPro Exercise Books use 80g–100g book or wood-free paper with 4-color printed covers and saddle-stitch binding. Inner pages in ruled, grid, or blank formats. Smooth writing with no ink bleed—ideal for daily student use. Covers can feature school logos, class names, and subjects.`,
    longDescriptionJa: `智印云の練習帳は80g～100g書籍紙または上質紙を使用し、4色印刷の表紙と中綴じ。内页は横線、方眼、または白紙。書き心地が良く、にじみません。学生の日常使用に最適。表紙には学校ロゴ、クラス名、科目を印刷可能。`,
    features: [
      '【80g–100g書紙或道林紙】書寫流暢，不滲墨',
      '【四色印刷】封面色彩鮮豔，內頁清晰',
      '【騎馬釘或膠裝】牢固耐用，翻頁順暢',
      '【橫線／方格／空白】三種內頁可選',
      '【免費排版】頁碼、章節與習題欄位',
      '【100本起訂】小批量數碼，大量柯式',
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
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/exercise-books.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-en-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-en-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-en-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-exercise-books-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-exercise-books-zh-hk-1.webp', en: 'zprintpro-educational-exercise-books-en-1.webp', ja: 'zprintpro-educational-exercise-books-ja-1.webp' },
    alt: {
      'zh-hk': '香港練習簿印刷 80g書寫紙 膠裝裝訂',
      en: 'Hong Kong Exercise Books Printing 80g Writing Paper Perfect Bound',
      ja: 'ワークブック印刷 | 香港プロ教育印刷'
    },
  },
    },
  {
    id: 'ED-002',
    sku_code: 'ED-002',
    slug: 'certificates',
    category: 'educational',
    category_slug: 'educational',
    name: '證書印刷', nameEn: 'Certificates', nameJa: '賞状印刷', title_zh: '證書印刷',
    description: '精美證書，配合燙金、壓紋等工藝。畢業證書、獎狀、資格證明。', descriptionEn: 'Exquisite certificates with foil stamping, embossing and other processes.', descriptionJa: '精巧な賞状、箔押し・エンボスなどの加工付き。卒業証書、賞状、資格証明。', description_zh: '精美證書，配合燙金、壓紋等工藝。畢業證書、獎狀、資格證明。',
    longDescription: `智印云證書採用200g–250g米色或白色水印紙或棉質紙，配合四色印刷與燙金工藝，質感高檔，防偽性強。適合畢業證書、榮譽證書、資格認證及企業表彰。可印防偽底紋、浮水印及唯一編號。與分類頁內容一致，材質關鍵詞包含：證書、水印紙、棉質紙、燙金、防偽。`,
    longDescriptionEn: `ZprintPro Certificates use 200g–250g cream or white watermarked or cotton paper with 4-color printing and foil stamping. Premium texture with strong anti-counterfeiting properties. Ideal for diplomas, honors, certifications, and corporate awards. Can feature anti-counterfeiting patterns, watermarks, and unique serial numbers.`,
    longDescriptionJa: `智印云の証書は200g～250gクリームまたは白色の透かし紙またはコットン紙を使用し、4色印刷と箔押し。高級感のある質感で、強い偽造防止性。卒業証書、栄誉証書、資格認定、企業表彰に最適。偽造防止パターン、透かし、ユニークな連番を印刷可能。`,
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
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/certificates.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-educational-certificates-en-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-en-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-en-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-en-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-educational-certificates-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-ja5.webp',
      '/images/products/seedream-webp/zprintpro-educational-certificates-ja-6.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-certificates-zh-hk-1.webp', en: 'zprintpro-educational-certificates-en-1.webp', ja: 'zprintpro-educational-certificates-ja-1.webp' },
    alt: {
      'zh-hk': '香港證書印刷 250g珠光紙 燙金工藝',
      en: 'Hong Kong Certificates Printing 250g Pearl Paper Foil Stamped',
      ja: '賞状印刷 | 香港プロ教育印刷'
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
    },
  {
    id: 'ED-003',
    sku_code: 'ED-003',
    slug: 'school-flyers',
    category: 'educational',
    category_slug: 'educational',
    name: '學校單張', nameEn: 'School Flyers', nameJa: '学校チラシ', title_zh: '學校單張',
    description: '學校通告、活動宣傳單張。經濟實惠，大量印刷。', descriptionEn: 'School notices, event promotional flyers. Economical, bulk printing.', descriptionJa: '学校の通知、イベント宣伝チラシ。経済的、大量印刷。', description_zh: '學校通告、活動宣傳單張。經濟實惠，大量印刷。',
    longDescription: `智印云校園宣傳單張採用128g–157g銅版紙或書紙，配合四色數碼印刷，經濟實惠，色彩鮮豔。適合學校招生、活動宣傳、課程介紹及家長會通知。可選單面或雙面印刷，並可印QR Code連結報名系統。與分類頁內容一致，材質關鍵詞包含：校園單張、銅版紙、書紙、數碼印刷。`,
    longDescriptionEn: `ZprintPro School Flyers use 128g–157g glossy or book paper with 4-color digital printing—economical and vibrant. Ideal for school enrollment, event promotion, course introductions, and parent meeting notices. Single or double-sided with QR codes linking to registration systems.`,
    longDescriptionJa: `智印云の学校チラシは128g～157gコート紙または書籍紙を使用し、4色デジタル印刷で経済的かつ鮮やか。学校の募集、イベントプロモーション、コース紹介、保護者会のお知らせに最適。片面または両面印刷で、登録システムにリンクするQRコードも可能。`,
    features: [
      '【80g–100g書紙或道林紙】書寫流暢，不滲墨',
      '【四色印刷】封面色彩鮮豔，內頁清晰',
      '【騎馬釘或膠裝】牢固耐用，翻頁順暢',
      '【QR Code連結】線上報名，減少紙本流程',
      '【免費排版】頁碼、章節與習題欄位',
      '【100本起訂】小批量數碼，大量柯式',
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
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/school-flyers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-zh-hk5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-en-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-en-5.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-educational-school-flyers-ja-6.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-school-flyers-zh-hk-1.webp', en: 'zprintpro-educational-school-flyers-en-1.webp', ja: 'zprintpro-educational-school-flyers-ja-1.webp' },
    alt: {
      'zh-hk': '香港校園傳單印刷 157g銅版紙 雙面彩色',
      en: 'Hong Kong School Flyers Printing 157g Glossy Paper Double-sided Color',
      ja: '学校チラシ | 香港プロ教育印刷'
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
    },
  {
    id: 'ED-004',
    sku_code: 'ED-004',
    slug: 'textbooks',
    category: 'educational',
    category_slug: 'educational',
    name: '教科書印刷', nameEn: 'Textbooks', nameJa: '教科書印刷', title_zh: '教科書印刷',
    description: '教材、教科書印刷。專業排版，品質保證。', descriptionEn: 'Teaching materials, textbook printing. Professional typesetting, quality guaranteed.', descriptionJa: '教材、教科書の印刷。プロの組版、品質保証。', description_zh: '教材、教科書印刷。專業排版，品質保證。',
    longDescription: `智印云教科書採用80g–100g道林紙或書紙，配合封面四色印刷與膠裝或騎馬釘裝訂，內頁可印單色或雙色文字與插圖。紙張輕薄，便於學生攜帶。適合補習社教材、校本課程及培訓手冊。與分類頁內容一致，材質關鍵詞包含：教科書、道林紙、書紙、膠裝。`,
    longDescriptionEn: `ZprintPro Textbooks use 80g–100g wood-free or book paper with 4-color printed covers and perfect or saddle-stitch binding. Inner pages in single or dual-color text and illustrations. Lightweight for easy student carrying. Ideal for tutorial center materials, school-based curricula, and training manuals.`,
    longDescriptionJa: `智印云の教科書は80g～100g上質紙または書籍紙を使用し、4色印刷の表紙と無線綴じまたは中綴じ。内页は単色または2色の文字とイラスト。軽量で学生が持ち運びしやすい。塾の教材、学校独自のカリキュラム、トレーニングマニュアルに最適。`,
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
    price_range: 'HK$24-120/本',
    basePrice: 24,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/textbooks.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-educational-textbooks-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-zh-hk-4.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-educational-textbooks-en-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-en-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-en-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-educational-textbooks-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-educational-textbooks-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-educational-textbooks-zh-hk-1.webp', en: 'zprintpro-educational-textbooks-en-1.webp', ja: 'zprintpro-educational-textbooks-ja-1.webp' },
    alt: {
      'zh-hk': '香港教科書印刷 80g雙膠紙 膠裝精裝',
      en: 'Hong Kong Textbooks Printing 80g Offset Paper Perfect Bound',
      ja: '教科書印刷 | 香港プロ教育印刷'
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
    },
  // ===== 新增包裝盒產品（SEO重點布局） =====
  {
    id: 'PKG-007',
    sku_code: 'PKG-007',
    slug: 'magnetic-closure-gift-box',
    category: 'packaging',
    category_slug: 'packaging',
    name: '磁吸翻蓋禮盒印刷', nameEn: 'Magnetic Closure Gift Box', nameJa: 'マグネット蓋ギフトボックス', title_zh: '磁吸翻蓋禮盒印刷',
    description: '高檔磁吸翻蓋硬盒，適合奢侈品、化妝品、電子產品包裝。支持燙金、UV、壓紋工藝。', descriptionEn: 'Premium magnetic closure rigid boxes for luxury goods, cosmetics, electronics. Foil stamping, UV, embossing available.', descriptionJa: '高級マグネット蓋硬箱。高級品、化粧品、電子機器の包装に最適。箔押し、UV、エンボス加工対応。', description_zh: '高檔磁吸翻蓋硬盒，適合奢侈品、化妝品、電子產品包裝。支持燙金、UV、壓紋工藝。',
    longDescription: `磁吸翻蓋禮盒在書型結構上嵌入隱藏磁鐵，單手即可優雅開合，是香氛、腕表配件與高端 3C 的首選呈現方式。面紙可配觸感膜降低指紋，邊角多經圓角刀模降低磕碰風險。內襯可一體成型 EVA 或雙層紙托分隔主機與配件。與分類頁一致：精裝盒、燙金、局部 UV、壓紋。請在報價時說明磁鐵規格與航空運輸需求，以便選用符合安檢的包裝標示與內隔方案。`,
    longDescriptionEn: `Magnetic book-style rigid boxes hide magnets for one-hand, elegant openings—ideal for fragrance, watch accessories, and premium electronics. Touch films reduce fingerprints; rounded corners ease knocks. Liners can be one-piece EVA or dual-layer paper trays for device plus cables. Terms align with category content: rigid boxes, foil stamping, spot UV, embossing. Specify magnet grades and air-freight needs so we can advise labeling and compartment layouts for security screening.`,
    longDescriptionJa: `マグネット蓋のブック型硬箱は片手で静かに開閉でき、フレグランス、時計小物、高級3Cに最適。ソフトタッチで指紋低減、角はRカット。内装は一体EVAや二段紙トレイ。用語：上製箱、箔押し、局部UV、エンボス。磁石仕様と航空輸送要件を共有し、保安表示と区画を調整。`,
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
      'zh-hk': '香港磁吸翻蓋禮盒印刷 350g白卡紙 燙金Logo',
      en: 'Hong Kong Magnetic Closure Gift Box Printing 350g White Card Foil Logo',
      ja: 'マグネット蓋ギフトボックス | 香港プロパッケージ'
    },
  },
    },
  {
    id: 'PKG-008',
    sku_code: 'PKG-008',
    slug: 'electronics-packaging-box',
    category: 'packaging',
    category_slug: 'packaging',
    name: '電子產品包裝盒定制', nameEn: 'Electronics Packaging Box', nameJa: '電子機器包装箱', title_zh: '電子產品包裝盒定制',
    description: '手機、耳機、充電器等3C產品包裝盒。EVA內托、吸塑、紙托多種內襯選擇。支持環保材質。', descriptionEn: 'Packaging boxes for phones, earphones, chargers. EVA foam, blister, paper tray inserts. Eco-friendly options.', descriptionJa: 'スマホ、イヤホン、充電器等のパッケージ箱。EVAフォーム、ブリスター、紙トレイ内装。環境配慮素材対応。', description_zh: '手機、耳機、充電器等3C產品包裝盒。EVA內托、吸塑、紙托多種內襯選擇。支持環保材質。',
    longDescription: `智印云電子產品包裝盒專為手機、耳機、充電器等 3C 配件設計，外盒採用 1200g 灰板紙裱糊面紙（銅版紙或特種紙），內襯提供 EVA 泡棉內托、吸塑（PET／PVC）及紙漿模塑三種選擇，可精準固定產品並吸收運輸衝擊。表面可選燙金、燙銀、局部 UV 或軟觸膜，磁吸翻蓋結構提升開箱體驗。我們提供防靜電內襯選項，符合電子產品防護標準。印前提供 3D 結構渲染與刀模確認，確保內托與產品尺寸公差 ≤0.5mm。與分類頁內容一致，材質關鍵詞包含：灰板紙盒、EVA 內托、吸塑內襯、燙金、磁吸盒。`,
    longDescriptionEn: `ZprintPro electronics packaging boxes are designed for phones, earphones, chargers, and other 3C accessories. The outer box uses 1200g greyboard laminated with art paper or specialty paper. Inserts include EVA foam trays, blister (PET/PVC), and molded pulp—precisely securing products and absorbing transport shock. Surface options include gold foil, silver foil, spot UV, or soft-touch film; magnetic flap structure enhances unboxing experience. We offer anti-static insert options meeting electronics protection standards. Prepress includes 3D structural rendering and die-cut confirmation, ensuring insert-to-product tolerance ≤0.5mm. Terminology aligns with category content: greyboard boxes, EVA trays, blister inserts, foil stamping, magnetic boxes.`,
    longDescriptionJa: `智印云の電子機器包装箱はスマートフォン、イヤホン、充電器等の3Cアクセサリー向けに設計されています。外箱は1200gグレーボードにコート紙または特殊紙を貼り合わせ、内装はEVAフォームトレー、ブリスター（PET／PVC）、紙パルプモールドの3種類から選択できます。製品を正確に固定し、輸送衝撃を吸収します。表面は金箔、銀箔、局部UV、ソフトタッチフィルムから選択でき、磁石式フタ構造で開封体験を向上させます。帯電防止内装オプションも提供し、電子機器保護基準に適合します。印前では3D構造レンダリングと型抜き確認を行い、内装と製品の公差を0.5mm以下に抑えます。カテゴリ用語：グレーボード箱、EVAトレー、ブリスター内装、箔押し、磁石式箱。`,
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
      size: '完全客製化，常見 10×10×4cm 至 20×15×6cm',
      printMethod: '四色柯式印刷',
      finishing: '燙金／燙銀、局部 UV、軟觸膜、磁吸扣',
    },
    price_range: 'HK$8-50/個',
    basePrice: 8,
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
      'zh-hk': '香港電子產品包裝盒印刷 400g灰板紙 防靜電設計',
      en: 'Hong Kong Electronics Packaging Box Printing 400g Grey Board Anti-static',
      ja: '電子機器包装箱 | 香港プロパッケージ'
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
    },
  {
    id: 'PKG-009',
    sku_code: 'PKG-009',
    slug: 'kraft-paper-packaging-box',
    category: 'packaging',
    category_slug: 'packaging',
    name: '牛皮紙盒印刷定制', nameEn: 'Kraft Paper Packaging Box', nameJa: 'クラフト紙箱印刷', title_zh: '牛皮紙盒印刷定制',
    description: '環保牛皮紙盒，適合食品、茶葉、手工皂包裝。可印刷Logo，支持多種尺寸。', descriptionEn: 'Eco-friendly kraft paper boxes for food, tea, handmade soap packaging. Custom logo printing, multiple sizes.', descriptionJa: '環境に優しいクラフト紙箱。食品、お茶、手作り石鹸の包装に最適。ロゴ印刷、サイズ豊富。', description_zh: '環保牛皮紙盒，適合食品、茶葉、手工皂包裝。可印刷Logo，支持多種尺寸。',
    longDescription: `智印云牛皮紙盒採用 300g–350g 未漂白環保牛皮卡紙，纖維粗獷、手感自然，可完全生物降解並通過 FSC 森林認證，特別適合有機食品、手工茶葉、手工皂及環保品牌包裝。表面可保留原紙本色或印刷單色／雙色水性油墨，亦可搭配燙黑、壓凹或絲印工藝，呈現樸實而精緻的視覺效果。盒型以自動鎖底插口盒與手提繩盒為主，底部承重經測試達 3–5 公斤。我們提供免費結構設計與紙張批次色樣確認，確保每批顏色一致。與分類頁內容一致，材質關鍵詞包含：牛皮紙盒、FSC 認證、水性油墨、燙黑、壓凹、生物降解。`,
    longDescriptionEn: `ZprintPro kraft paper boxes use 300g–350g unbleached eco-friendly kraft card with rugged fibers and natural texture. Fully biodegradable and FSC-certified, ideal for organic food, artisan tea, handmade soap, and eco-brand packaging. Surface options include natural kraft tone or single/dual-color water-based ink printing, plus black foil stamping, debossing, or screen printing for a rustic yet refined visual effect. Box styles focus on auto-lock bottom tuck boxes and rope-handle boxes, with base load testing at 3–5kg. We provide free structural design and paper batch color sample confirmation to ensure consistent color across orders. Terminology aligns with category content: kraft paper boxes, FSC certification, water-based inks, black foil, debossing, biodegradable.`,
    longDescriptionJa: `智印云のクラフト紙箱は300g～350g無漂白環境配慮クラフトカードを使用し、繊維が粗く自然な手触りです。完全に生分解性でFSC森林認証を取得しており、有機食品、手作りお茶、手作り石鹸、環境ブランドの包装に最適です。表面は原紙の色を活かすか、単色／2色の水性インク印刷、黒箔押し、デボス、シルクスクリーン加工で素朴で繊細な視覚効果を演出します。箱型は自動ロック底差し込み箱と紐付き手提げ箱が主体で、底部の耐荷重テストは3～5kgをクリアしています。無料の構造設計と紙ロット色見本確認を提供し、毎回の色合いを一定に保ちます。カテゴリ用語：クラフト紙箱、FSC認証、水性インク、黒箔押し、デボス、生分解性。`,
    features: [
      '【300g–350g 牛皮卡】未漂白原漿，纖維粗獷自然',
      '【FSC 認證】森林可持續來源，品牌環保形象加分',
      '【完全生物降解】90 天內自然分解，無塑化劑殘留',
      '【水性油墨】單色／雙色印刷，低 VOC 排放',
      '【燙黑／壓凹】樸實中帶精緻，適合文創與手作品牌',
      '【自動鎖底】承重 3–5 公斤，底部穩固不塌',
      '【免費色樣確認】每批紙張批次對色，確保一致性',
    ],
    specs: {
      material: '300g–350g FSC 牛皮卡紙；水性油墨',
      size: '常見 12×8×5cm 至 20×15×8cm（可客製）',
      printMethod: '單色／雙色水性印刷或四色柯式',
      finishing: '燙黑、壓凹、絲印、手提繩',
    },
    price_range: 'HK$5-30/個',
    basePrice: 5,
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
      'zh-hk': '香港牛皮紙包裝盒印刷 300g牛皮紙 環保材質',
      en: 'Hong Kong Kraft Paper Packaging Box Printing 300g Kraft Paper Eco-friendly',
      ja: 'クラフト紙箱印刷 | 香港プロパッケージ'
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
    },
  {
    id: 'PKG-010',
    sku_code: 'PKG-010',
    slug: 'drawer-slide-gift-box',
    category: 'packaging',
    category_slug: 'packaging',
    name: '抽屜禮盒滑軌盒印刷', nameEn: 'Drawer Slide Gift Box', nameJa: '引き出し式ギフトボックス', title_zh: '抽屜禮盒滑軌盒印刷',
    description: '精緻抽屜式禮盒，絲帶拉手設計。適合茶葉、月餅、珠寶首飾包裝。', descriptionEn: 'Exquisite drawer-style gift boxes with ribbon pull. Perfect for tea, mooncakes, jewelry packaging.', descriptionJa: '精巧な引き出し式ギフトボックス。リボン引手付き。お茶、月餅、宝石類の包装に最適。', description_zh: '精緻抽屜式禮盒，絲帶拉手設計。適合茶葉、月餅、珠寶首飾包裝。',
    longDescription: `智印云抽屜禮盒採用 1200g 灰板紙裱糊 157g 銅版紙或絨面特種紙，內盒以滑軌結構配合緞帶拉手，開合順暢且極具儀式感，是茶葉、月餅、珠寶首飾及高端企業禮品的首選包裝。內襯可選 EVA 挖槽、絲絨布或 satin 緞面，精準固定產品並防止刮傷。表面工藝涵蓋燙金、燙銀、局部 UV 及浮雕擊凸，磁吸隱藏扣確保盒蓋緊閉。我們提供免費 3D 結構設計與材質手感樣板，確認後 7–10 個工作日交付。與分類頁內容一致，材質關鍵詞包含：灰板禮盒、滑軌結構、緞帶拉手、燙金、絨面內襯。`,
    longDescriptionEn: `ZprintPro drawer gift boxes use 1200g greyboard laminated with 157g art paper or velvet-textured specialty paper. The inner tray features a slide-rail structure with satin ribbon pulls for smooth opening and a ceremonial unboxing experience—ideal for tea, mooncakes, jewelry, and premium corporate gifts. Inserts include EVA cutouts, velvet lining, or satin fabric, precisely securing products and preventing scratches. Surface finishes include gold foil, silver foil, spot UV, and embossed debossing; hidden magnetic closures ensure the lid stays shut. We provide free 3D structural design and material touch samples, with 7–10 working day delivery after confirmation. Terminology aligns with category content: greyboard gift boxes, slide-rail structure, ribbon pulls, foil stamping, velvet lining.`,
    longDescriptionJa: `智印云の引き出し式ギフトボックスは1200gグレーボードに157gコート紙またはベルベット調特殊紙を貼り合わせ、内箱はスライドレール構造にサテンリボンの引手を組み合わせ、滑らかな開閉と儀式的な開封体験を提供します。お茶、月餅、宝石類、高級企業ギフトの包装に最適です。内装はEVA掘り込み、ベルベット裏地、サテン生地から選択でき、製品を正確に固定し傷を防ぎます。表面加工は金箔、銀箔、局部UV、エンボスデボスを含み、隠し磁石でフタが閉じた状態を保持します。無料の3D構造設計と材質触感サンプルを提供し、確認後7～10営業日で納品します。カテゴリ用語：グレーボードギフト箱、スライドレール構造、リボン引手、箔押し、ベルベット裏地。`,
    features: [
      '【滑軌結構】抽屜式開合順暢，緞帶拉手儀式感滿分',
      '【1200g 灰板＋157g 銅版】高挺度外殼，抗壓耐摔',
      '【EVA／絨布／緞面內襯】精準挖槽固定，防刮傷',
      '【磁吸隱藏扣】盒蓋緊閉，運輸中不鬆脫',
      '【燙金／浮雕】金／銀箔或立體擊凸，提升奢華質感',
      '【3D 結構設計】免費渲染確認，尺寸精準至 0.5mm',
      '【7–10 天交付】確認後量產，適合節慶禮品檔期',
    ],
    specs: {
      material: '1200g 灰板紙裱糊 157g 銅版紙／絨面特種紙；EVA／絨布內襯',
      size: '常見 15×10×6cm 至 25×18×8cm（可客製）',
      printMethod: '四色柯式印刷',
      finishing: '燙金／燙銀、局部 UV、浮雕擊凸、磁吸扣、緞帶拉手',
    },
    price_range: 'HK$12-60/個',
    basePrice: 12,
    weight_score: 93,
    isHot: false,
    isNew: true,
    minQuantity: 200,
    images: ['/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-1.webp'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-zh-hk-5.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-en-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-en-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-en-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-en-4.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-ja-5.webp',
      '/images/products/seedream-webp/zprintpro-packaging-drawer-slide-gift-box-ja-6.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-packaging-drawer-slide-gift-box-zh-hk-1.webp', en: 'zprintpro-packaging-drawer-slide-gift-box-en-1.webp', ja: 'zprintpro-packaging-drawer-slide-gift-box-ja-1.webp' },
    alt: {
      'zh-hk': '香港抽屜式禮盒印刷 350g白卡紙 緞帶拉手',
      en: 'Hong Kong Drawer Slide Gift Box Printing 350g White Card Ribbon Pull',
      ja: '引き出し式ギフトボックス | 香港プロパッケージ'
    },
  },
    },
  // ===== 新增貼紙產品（SEO長尾詞覆盖） =====
  {
    id: 'ST-009',
    sku_code: 'ST-009',
    slug: 'fruit-food-label-stickers',
    category: 'stickers',
    category_slug: 'stickers',
    name: '水果貼紙食品標籤印刷', nameEn: 'Fruit & Food Label Stickers', nameJa: 'フルーツ・食品ラベルシール', title_zh: '水果貼紙食品標籤印刷',
    description: '防水防油的水果貼紙和食品標籤，適合生鮮、烘焙、飲料包裝。符合食品安全標準。', descriptionEn: 'Waterproof and oil-resistant fruit stickers and food labels for fresh produce, bakery, beverage packaging. Food-safe compliant.', descriptionJa: '耐水耐油のフルーツシールと食品ラベル。生鮮食品、ベーカリー、飲料包装に最適。食品衛生基準適合。', description_zh: '防水防油的水果貼紙和食品標籤，適合生鮮、烘焙、飲料包裝。符合食品安全標準。',
    longDescription: `智印云水果貼紙與食品標籤採用食品級面材與無遷移大豆油墨，通過 SGS 及 FDA 食品接觸測試，可直接貼附於生鮮水果表皮、烘焙包裝及飲料杯身。面材有透明 BOPP、白色 PE 及可降解 PLA 三種選擇，耐水耐油且可在 0–4°C 冷藏環境保持黏性。我們支援可變條碼與產地 QR Code，方便追溯與防偽。印前建議預留模切出血，並使用高對比配色以確保在濕潤表面仍可辨識。與分類頁內容一致，材質關鍵詞包含：食品級貼紙、BOPP 標籤、PE 標籤、PLA 可降解、模切。`,
    longDescriptionEn: `ZprintPro fruit stickers and food labels use food-grade facestock with non-migrating soy-based inks, passing SGS and FDA food-contact testing. They can be directly applied to fresh fruit skin, bakery packaging, and beverage cups. Facestock options include clear BOPP, white PE, and biodegradable PLA—waterproof, oil-resistant, and maintaining adhesion in 0–4°C refrigerated environments. We support variable barcodes and origin QR codes for traceability and anti-counterfeiting. Prepress: allow die-cut bleed and use high-contrast colors to ensure readability on moist surfaces. Terminology aligns with category content: food-grade stickers, BOPP labels, PE labels, PLA biodegradable, die-cutting.`,
    longDescriptionJa: `智印云のフルーツシールと食品ラベルは食品グレードの面材と非移行性の大豆インクを使用し、SGSおよびFDA食品接触テストをクリアしています。生鮮果物の皮、ベーカリー包装、飲料カップに直接貼付可能です。面材は透明BOPP、白色PE、生分解性PLAの3種類から選択でき、耐水耐油性に優れ、0～4°Cの冷蔵環境でも粘着力を保持します。可変バーコードと産地QRコードに対応し、トレーサビリティと偽造対策が可能です。印前では型抜きのブリードを確保し、湿った表面でも識別できる高コントラスト配色を推奨します。カテゴリ用語：食品グレードシール、BOPPラベル、PEラベル、PLA生分解性、ダイカット。`,
    features: [
      '【食品級認證】SGS／FDA 通過，大豆油墨無遷移，可直接接觸食品',
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
    weight_score: 95,
    isHot: true,
    isNew: true,
    minQuantity: 500,
    images: ['/images/products/transparent-stickers.jpg'],
  imagesByLocale: {
    'zh-hk': [
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-5.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-zh-hk-6.webp',
    ],
    'en': [
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-en-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-en-5.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-en-6.webp',
    ],
    'ja': [
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-ja-4.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fruit-food-label-stickers-ja-5.webp',
    ],
  },
  seoImages: {
    filename: { 'zh-hk': 'zprintpro-stickers-fruit-food-label-stickers-zh-hk-1.webp', en: 'zprintpro-stickers-fruit-food-label-stickers-en-1.webp', ja: 'zprintpro-stickers-fruit-food-label-stickers-ja-1.webp' },
    alt: {
      'zh-hk': '香港水果食品標籤貼紙印刷 防水材質 食品安全級',
      en: 'Hong Kong Fruit Food Label Stickers Printing Waterproof Food-safe',
      ja: 'フルーツ・食品ラベルシール | 香港プロステッカー'
    },
  },
    },
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

// 简繁字符映射 (2026-06-07 修复搜索 "宣传单张" 找不到)
// 字符数组: [繁体, 简体, 繁体, 简体, ...] — 避免 object literal 重复 key 错误
const TRAD_SIMP_PAIRS: Array<[string, string]> = [
  ['宣', '宣'], ['傳', '传'], ['單', '单'], ['張', '张'], ['圖', '图'], ['個', '个'], ['們', '们'],
  ['時', '时'], ['間', '间'], ['價', '价'], ['錢', '钱'], ['銀', '银'], ['紙', '纸'], ['樣', '样'],
  ['現', '现'], ['實', '实'], ['話', '话'], ['語', '语'], ['車', '车'], ['馬', '马'], ['鳥', '鸟'],
  ['魚', '鱼'], ['龍', '龙'], ['門', '门'], ['開', '开'], ['關', '关'], ['長', '长'],
  ['遠', '远'], ['東', '东'], ['顏', '颜'], ['紅', '红'], ['藍', '蓝'], ['黃', '黄'],
  ['綠', '绿'], ['產', '产'], ['業', '业'], ['電', '电'], ['腦', '脑'],
  ['網', '网'], ['絡', '络'], ['設', '设'], ['計', '计'], ['劃', '划'], ['專', '专'],
  ['購', '购'], ['買', '买'], ['賣', '卖'], ['質', '质'], ['標', '标'], ['準', '准'],
  ['訂', '订'], ['貨', '货'], ['據', '据'], ['處', '处'], ['員', '员'],
  ['廠', '厂'], ['機', '机'], ['備', '备'], ['裝', '装'],
  ['製', '制'], ['創', '创'], ['藝', '艺'], ['術', '术'],
  ['學', '学'], ['習', '习'], ['書', '书'], ['報', '报'], ['雜', '杂'], ['誌', '志'],
  ['貼', '贴'], ['盒', '盒'], ['袋', '袋'], ['戶', '户'], ['服', '服'], ['務', '务'],
  ['聯', '联'], ['應', '应'], ['該', '该'], ['當', '当'], ['為', '为'], ['種', '种'], ['類', '类'],
  ['選', '选'], ['擇', '择'], ['滿', '满'], ['費', '费'],
  ['經', '经'], ['驗', '验'],
];

function toSimplified(s: string): string {
  const map = new Map(TRAD_SIMP_PAIRS);
  return s.split('').map((c) => map.get(c) || c).join('');
}

// 搜索产品
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  // 简体 query, 映射到繁体 (e.g. "宣传" → "宣傳") 让繁简都能匹配
  const simpQuery = toSimplified(lowerQuery);
  // 反向映射: 简体→繁体 (用 Map 反向遍历)
  const tradMap = new Map(TRAD_SIMP_PAIRS.map(([t, s]) => [s, t]));
  const tradQuery = lowerQuery.split('').map((c) => tradMap.get(c) || c).join('');

  return products.filter((p) => {
    // 扫描 7 个字段 (含 description / slug / category)
    const fields = [
      p.name, p.nameEn, p.nameJa, p.sku_code,
      p.description, p.descriptionEn, p.descriptionJa, p.description_zh,
      p.slug, p.category_slug, p.category,
    ];
    for (const f of fields) {
      if (!f) continue;
      const lower = f.toLowerCase();
      if (lower.includes(lowerQuery) || lower.includes(simpQuery) || lower.includes(tradQuery)) {
        return true;
      }
      // category name 查表
      if (p.category_slug) {
        const cat = categories.find((c) => c.slug === p.category_slug);
        if (cat) {
          const catFields = [cat.name, cat.nameEn, cat.nameJa, cat.name_zh];
          for (const cf of catFields) {
            if (cf && (cf.includes(lowerQuery) || cf.includes(simpQuery))) return true;
          }
        }
      }
    }
    return false;
  });
}

// 获取产品标题（根据语言）
export function getProductTitle(product: Product, locale: string): string {
  switch (locale) {
    case 'zh-hk':
      return product.name;
    case 'en':
      return product.nameEn;
    case 'ja':
      return product.nameJa;
    default:
      return product.name;
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
export function getProductImageAlt(product: Product, locale: string): string {
  // 优先：从 sku-seo-data 取（78 个 SKU 的高质量 alt）
  const sku = getSkuSeo(product.slug);
  if (sku?.imageAlt?.[locale as 'zh-hk' | 'en' | 'ja']) {
    return sku.imageAlt[locale as 'zh-hk' | 'en' | 'ja'];
  }
  const titles: Record<string, string> = {
    'zh-hk': `香港${product.name}印刷 | ${product.description.slice(0, 25)} | ZprintPro智印云`,
    en: `${product.nameEn} Printing Hong Kong | ${product.descriptionEn.slice(0, 35)} | ZprintPro`,
    ja: `香港${product.nameJa} | ${product.descriptionJa.slice(0, 25)} | ZprintPro`,
  };
  return titles[locale] || titles['zh-hk'];
}
