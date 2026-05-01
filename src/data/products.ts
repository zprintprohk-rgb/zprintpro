/**
 * 产品数据服务模块
 * 从CSV加载79个SKU产品数据
 * 提供分类、搜索、筛选功能
 */

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
    price_range: 'HK$100-180/100張',
    basePrice: 1.0,
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/premium-business-cards.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-business-cards-premium-business-cards-zh-hk.jpg', en: 'zprintpro-business-cards-premium-business-cards-en.jpg', ja: 'zprintpro-business-cards-premium-business-cards-ja.jpg' },
      alt: { 'zh-hk': '香港高級商務咭片印刷 HK$100-180/100張 起｜採用300g高級銅版紙，配合專業四色印刷，展現企業｜ZprintPro智印港', en: 'Premium Business Cards Printing Hong Kong HK$100-180/100張｜300g premium glossy paper with prof｜ZprintPro', ja: '香港高級名刺 HK$100-180/100張｜300g高級コート紙、プロ4色印刷。マットまたはグ｜ZprintPro' },
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
    price_range: 'HK$120-220/100張',
    basePrice: 1.2,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/thick-business-cards-400g.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-business-cards-thick-business-cards-400g-zh-hk.jpg', en: 'zprintpro-business-cards-thick-business-cards-400g-en.jpg', ja: 'zprintpro-business-cards-thick-business-cards-400g-ja.jpg' },
      alt: { 'zh-hk': '香港厚身咭片(400g)印刷 HK$120-220/100張 起｜400g超厚紙質，厚實手感彰顯尊貴品質。特別適合高｜ZprintPro智印港', en: 'Thick Business Cards (400g) Printing Hong Kong HK$120-220/100張｜400g ultra-thick paper with substan｜ZprintPro', ja: '香港厚紙名刺(400g) HK$120-220/100張｜400g超厚紙、重厚な質感。高級サービス業、デザイ｜ZprintPro' },
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
    price_range: 'HK$180-320/100張',
    basePrice: 1.8,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/foil-business-cards.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-business-cards-foil-business-cards-zh-hk.jpg', en: 'zprintpro-business-cards-foil-business-cards-en.jpg', ja: 'zprintpro-business-cards-foil-business-cards-ja.jpg' },
      alt: { 'zh-hk': '香港燙金/燙銀咭片印刷 HK$180-320/100張 起｜局部燙金或燙銀工藝，在光線下閃耀奪目，瞬間提升品牌｜ZprintPro智印港', en: 'Foil Stamped Business Cards Printing Hong Kong HK$180-320/100張｜Foil stamping in gold or silver, sh｜ZprintPro', ja: '香港箔押し名刺 HK$180-320/100張｜部分的な箔押し加工、光に輝いてブランドイメージ向上｜ZprintPro' },
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
    price_range: 'HK$140-260/100張',
    basePrice: 1.4,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/spot-uv-business-cards.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-business-cards-spot-uv-business-cards-zh-hk.jpg', en: 'zprintpro-business-cards-spot-uv-business-cards-en.jpg', ja: 'zprintpro-business-cards-spot-uv-business-cards-ja.jpg' },
      alt: { 'zh-hk': '香港UV局部光油咭片印刷 HK$140-260/100張 起｜局部UV光油工藝，讓Logo或圖案呈現立體光澤效果｜ZprintPro智印港', en: 'Spot UV Business Cards Printing Hong Kong HK$140-260/100張｜Spot UV coating creates glossy, dim｜ZprintPro', ja: '香港局部UV名刺 HK$140-260/100張｜部分UVコーティングでロゴやデザインに立体的な光沢｜ZprintPro' },
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
    price_range: 'HK$110-190/100張',
    basePrice: 1.1,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/matte-business-cards.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-business-cards-matte-business-cards-zh-hk.jpg', en: 'zprintpro-business-cards-matte-business-cards-en.jpg', ja: 'zprintpro-business-cards-matte-business-cards-ja.jpg' },
      alt: { 'zh-hk': '香港啞膠咭片印刷 HK$110-190/100張 起｜啞膠表面處理，低調內斂的質感，不易留下指紋。適合注｜ZprintPro智印港', en: 'Matte Laminated Cards Printing Hong Kong HK$110-190/100張｜Matte lamination provides understat｜ZprintPro', ja: '香港マット名刺 HK$110-190/100張｜マットラミネーション加工、落ち着いた質感で指紋が付｜ZprintPro' },
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
    price_range: 'HK$100-170/100張',
    basePrice: 1.0,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/rounded-corner-cards.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-business-cards-rounded-corner-cards-zh-hk.jpg', en: 'zprintpro-business-cards-rounded-corner-cards-en.jpg', ja: 'zprintpro-business-cards-rounded-corner-cards-ja.jpg' },
      alt: { 'zh-hk': '香港圓角咭片印刷 HK$100-170/100張 起｜圓角設計，柔和美觀且不易折損。展現與眾不同的品味，｜ZprintPro智印港', en: 'Rounded Corner Cards Printing Hong Kong HK$100-170/100張｜Rounded corners for soft aesthetics｜ZprintPro', ja: '香港丸角名刺 HK$100-170/100張｜丸角デザイン、柔らかく美しく折れにくい。クリエイテ｜ZprintPro' },
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
    price_range: 'HK$0.22-1.0/張',
    basePrice: 0.22,
    weight_score: 98,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/waterproof-stickers.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-stickers-waterproof-stickers-zh-hk.jpg', en: 'zprintpro-stickers-waterproof-stickers-en.jpg', ja: 'zprintpro-stickers-waterproof-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港防水貼紙印刷 HK$0.22-1.0/張 起｜PVC材質防水貼紙，具有出色的防水、防曬、耐磨性能｜ZprintPro智印港', en: 'Waterproof Stickers Printing Hong Kong HK$0.22-1.0/張｜PVC waterproof stickers with excell｜ZprintPro', ja: '香港防水ステッカー HK$0.22-1.0/張｜PVC防水ステッカー、優れた防水・UV・耐摩耗性。｜ZprintPro' },
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
    price_range: 'HK$0.38-1.50/張',
    basePrice: 0.38,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/transparent-stickers.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-stickers-transparent-stickers-zh-hk.jpg', en: 'zprintpro-stickers-transparent-stickers-en.jpg', ja: 'zprintpro-stickers-transparent-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港透明貼紙印刷 HK$0.38-1.50/張 起｜透明PET材質，貼合後呈現無感效果，完美展現產品本｜ZprintPro智印港', en: 'Transparent Stickers Printing Hong Kong HK$0.38-1.50/張｜Transparent PET material creates in｜ZprintPro', ja: '香港透明ステッカー HK$0.38-1.50/張｜透明PET素材、貼り付け後無感効果。化粧品、食品包｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-removable-stickers-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-stickers-removable-stickers-zh-hk.jpg', en: 'zprintpro-stickers-removable-stickers-en.jpg', ja: 'zprintpro-stickers-removable-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港可移貼紙(無殘膠)印刷 HK$0.45-1.60/張 起｜特殊背膠設計，移除後不留殘膠，保護貼附表面。適合車｜ZprintPro智印港', en: 'Removable Stickers Printing Hong Kong HK$0.45-1.60/張｜Special adhesive design leaves no r｜ZprintPro', ja: '香港はがせるステッカー HK$0.45-1.60/張｜特殊粘着設計、剥がしても残りません。車窓、ガラス展｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-small-batch-stickers-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-stickers-small-batch-stickers-zh-hk.jpg', en: 'zprintpro-stickers-small-batch-stickers-en.jpg', ja: 'zprintpro-stickers-small-batch-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港小批量貼紙印刷 HK$38-120/A4 起｜最低A4尺寸起印，無需大量庫存壓力。適合初創品牌、｜ZprintPro智印港', en: 'Small Batch Stickers Printing Hong Kong HK$38-120/A4｜Minimum A4 size order, no bulk inve｜ZprintPro', ja: '香港小ロットステッカー HK$38-120/A4｜最小A4サイズから、大量在庫の心配なし。スタートア｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-die-cut-stickers-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-stickers-die-cut-stickers-zh-hk.jpg', en: 'zprintpro-stickers-die-cut-stickers-en.jpg', ja: 'zprintpro-stickers-die-cut-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港異形模切貼紙印刷 HK$0.58-2.20/張 起｜任意形狀模切，讓創意不受限制。可切出Logo形狀、｜ZprintPro智印港', en: 'Die-cut Stickers Printing Hong Kong HK$0.58-2.20/張｜Any shape die-cutting, creativity w｜ZprintPro', ja: '香港型抜きステッカー HK$0.58-2.20/張｜任意形状の型抜き、創作の自由を制限しません。｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-foil-stickers-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-stickers-foil-stickers-zh-hk.jpg', en: 'zprintpro-stickers-foil-stickers-en.jpg', ja: 'zprintpro-stickers-foil-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港燙金貼紙印刷 HK$0.78-2.80/張 起｜燙金工藝，讓貼紙呈現高級質感。適合高端產品標籤、禮｜ZprintPro智印港', en: 'Foil Stickers Printing Hong Kong HK$0.78-2.80/張｜Foil stamping gives stickers premiu｜ZprintPro', ja: '香港箔押しステッカー HK$0.78-2.80/張｜箔押し加工でステッカーに高級感。高級製品ラベル、ギ｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-security-stickers-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-stickers-security-stickers-zh-hk.jpg', en: 'zprintpro-stickers-security-stickers-en.jpg', ja: 'zprintpro-stickers-security-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港防偽貼紙印刷 HK$1.15-4.00/張 起｜特殊防偽工藝，包括雷射標籤、易碎紙等，保護品牌免受｜ZprintPro智印港', en: 'Security Stickers Printing Hong Kong HK$1.15-4.00/張｜Special anti-counterfeiting process｜ZprintPro', ja: '香港セキュリティステッカー HK$1.15-4.00/張｜特殊な偽造防止加工、ホログラムラベル、壊れやすい紙｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-en-4.webp',
      ],
      ja: [
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-stickers-fluorescent-stickers-ja-4.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-stickers-fluorescent-stickers-zh-hk.jpg', en: 'zprintpro-stickers-fluorescent-stickers-en.jpg', ja: 'zprintpro-stickers-fluorescent-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港螢光貼紙印刷 HK$0.52-2.00/張 起｜螢光色彩，在光線下格外醒目。適合促銷標籤、安全標識｜ZprintPro智印港', en: 'Fluorescent Stickers Printing Hong Kong HK$0.52-2.00/張｜Fluorescent colors, highly visible ｜ZprintPro', ja: '香港蛍光ステッカー HK$0.52-2.00/張｜蛍光色、光の下で非常に目立ちます。プロモーションラ｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-en-4.webp',
      ],
      ja: [
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-kraft-paper-bags-ja-4.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-paper-bags-kraft-paper-bags-zh-hk.jpg', en: 'zprintpro-paper-bags-kraft-paper-bags-en.jpg', ja: 'zprintpro-paper-bags-kraft-paper-bags-ja.jpg' },
      alt: { 'zh-hk': '香港牛皮紙袋印刷 HK$3-8/個 起｜環保牛皮紙材質，質樸自然，深受消費者喜愛。適合服裝｜ZprintPro智印港', en: 'Kraft Paper Bags Printing Hong Kong HK$3-8/個｜Eco-friendly kraft paper, natural a｜ZprintPro', ja: '香港クラフト紙袋 HK$3-8/個｜環境に優しいクラフト紙、質朴で自然、消費者に人気。｜ZprintPro' },
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
    price_range: 'HK$5-12/個',
    basePrice: 12,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/white-card-bags.jpg'],
    imagesByLocale: {
      en: [
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-white-card-bags-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-paper-bags-white-card-bags-zh-hk.jpg', en: 'zprintpro-paper-bags-white-card-bags-en.jpg', ja: 'zprintpro-paper-bags-white-card-bags-ja.jpg' },
      alt: { 'zh-hk': '香港白卡紙袋印刷 HK$5-12/個 起｜白卡紙材質，表面平整光滑，印刷效果佳。適合高端品牌｜ZprintPro智印港', en: 'White Card Bags Printing Hong Kong HK$5-12/個｜White card paper, smooth surface, e｜ZprintPro', ja: '香港白カード紙袋 HK$5-12/個｜白カード紙、表面が滑らかで印刷効果が抜群。高級ブラ｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-gift-bags-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-paper-bags-gift-bags-zh-hk.jpg', en: 'zprintpro-paper-bags-gift-bags-en.jpg', ja: 'zprintpro-paper-bags-gift-bags-ja.jpg' },
      alt: { 'zh-hk': '香港禮品紙袋印刷 HK$10-20/個 起｜精美設計，配合燙金、UV等工藝。送禮必備，提升禮品｜ZprintPro智印港', en: 'Gift Bags Printing Hong Kong HK$10-20/個｜Exquisite design with foil stamping｜ZprintPro', ja: '香港ギフト紙袋 HK$10-20/個｜精巧なデザイン、箔押し・UVなどの加工付き。ギフト｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-eco-paper-bags-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-paper-bags-eco-paper-bags-zh-hk.jpg', en: 'zprintpro-paper-bags-eco-paper-bags-en.jpg', ja: 'zprintpro-paper-bags-eco-paper-bags-ja.jpg' },
      alt: { 'zh-hk': '香港環保紙袋印刷 HK$3-8/個 起｜FSC認證環保紙張，可持續發展。適合注重環保的品牌｜ZprintPro智印港', en: 'Eco Paper Bags Printing Hong Kong HK$3-8/個｜FSC-certified eco-friendly paper, s｜ZprintPro', ja: '香港エコ紙袋 HK$3-8/個｜FSC認証の環境に優しい紙、持続可能な開発。環境に｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-handle-bags-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-paper-bags-handle-bags-zh-hk.jpg', en: 'zprintpro-paper-bags-handle-bags-en.jpg', ja: 'zprintpro-paper-bags-handle-bags-ja.jpg' },
      alt: { 'zh-hk': '香港手挽紙袋印刷 HK$3-8/個 起｜堅固手挽設計，承重能力強。適合購物中心、超市。｜ZprintPro智印港', en: 'Handle Bags Printing Hong Kong HK$3-8/個｜Sturdy handle design, strong load-b｜ZprintPro', ja: '香港手提げ紙袋 HK$3-8/個｜頑丈な持ち手デザイン、強い耐荷重能力。ショッピング｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-en-4.webp',
      ],
      ja: [
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-3.webp',
      '/images/products/seedream-webp/zprintpro-paper-bags-large-bags-ja-4.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-paper-bags-large-bags-zh-hk.jpg', en: 'zprintpro-paper-bags-large-bags-en.jpg', ja: 'zprintpro-paper-bags-large-bags-ja.jpg' },
      alt: { 'zh-hk': '香港大號紙袋印刷 HK$6-15/個 起｜加大尺寸，適合服裝、鞋類等大件商品。｜ZprintPro智印港', en: 'Large Bags Printing Hong Kong HK$6-15/個｜Large size, perfect for clothing, s｜ZprintPro', ja: '香港大判紙袋 HK$6-15/個｜大きなサイズ、衣類、靴などの大物に最適。｜ZprintPro' },
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
    price_range: 'HK$0.18-0.65/張',
    basePrice: 0.18,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-en-2.webp',
      ],
      ja: [
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-a4-flyers-ja-2.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-flyers-a4-flyers-zh-hk.jpg', en: 'zprintpro-flyers-a4-flyers-en.jpg', ja: 'zprintpro-flyers-a4-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港A4宣傳單張印刷 HK$0.18-0.65/張 起｜標準A4尺寸，最常用的宣傳單張規格。157g銅版紙｜ZprintPro智印港', en: 'A4 Flyers Printing Hong Kong HK$0.18-0.65/張｜Standard A4 size, most common flyer｜ZprintPro', ja: '香港A4チラシ HK$0.18-0.65/張｜標準A4サイズ、最も一般的なチラシ形式。157gコ｜ZprintPro' },
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
    price_range: 'HK$0.12-0.40/張',
    basePrice: 0.12,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-a5-flyers-en-1.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-flyers-a5-flyers-zh-hk.jpg', en: 'zprintpro-flyers-a5-flyers-en.jpg', ja: 'zprintpro-flyers-a5-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港A5宣傳單張印刷 HK$0.12-0.40/張 起｜A5尺寸，經濟實惠，適合大量派發。餐飲外賣、快閃活｜ZprintPro智印港', en: 'A5 Flyers Printing Hong Kong HK$0.12-0.40/張｜A5 size, economical, perfect for ma｜ZprintPro', ja: '香港A5チラシ HK$0.12-0.40/張｜A5サイズ、経済的、大量配布に最適。フードデリバリ｜ZprintPro' },
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
    price_range: 'HK$0.22-0.80/張',
    basePrice: 0.22,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-double-sided-flyers-en-2.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-flyers-double-sided-flyers-zh-hk.jpg', en: 'zprintpro-flyers-double-sided-flyers-en.jpg', ja: 'zprintpro-flyers-double-sided-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港雙面宣傳單張印刷 HK$0.22-0.80/張 起｜雙面全彩印刷，信息容量翻倍。正面吸引眼球，背面詳細｜ZprintPro智印港', en: 'Double-sided Flyers Printing Hong Kong HK$0.22-0.80/張｜Double-sided full color printing, d｜ZprintPro', ja: '香港両面チラシ HK$0.22-0.80/張｜両面フルカラー印刷、情報容量が2倍。｜ZprintPro' },
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
    price_range: 'HK$0.45-1.60/張',
    basePrice: 0.45,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-folded-leaflets-en-2.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-flyers-folded-leaflets-zh-hk.jpg', en: 'zprintpro-flyers-folded-leaflets-en.jpg', ja: 'zprintpro-flyers-folded-leaflets-ja.jpg' },
      alt: { 'zh-hk': '香港摺疊宣傳單張印刷 HK$0.45-1.60/張 起｜對摺或三摺設計，可展示更多信息。適合產品目錄、服務｜ZprintPro智印港', en: 'Folded Leaflets Printing Hong Kong HK$0.45-1.60/張｜Bi-fold or tri-fold design, can dis｜ZprintPro', ja: '香港折りたたみパンフレット HK$0.45-1.60/張｜二つ折りまたは三つ折りデザイン、より多くの情報を表｜ZprintPro' },
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
    price_range: 'HK$0.28-0.95/張',
    basePrice: 0.28,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-thick-paper-flyers-en-2.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-flyers-thick-paper-flyers-zh-hk.jpg', en: 'zprintpro-flyers-thick-paper-flyers-en.jpg', ja: 'zprintpro-flyers-thick-paper-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港厚紙宣傳單張印刷 HK$0.28-0.95/張 起｜200g以上厚紙，質感更佳，不易折損。適合高端產品｜ZprintPro智印港', en: 'Thick Paper Flyers Printing Hong Kong HK$0.28-0.95/張｜200g+ thick paper, better texture, ｜ZprintPro', ja: '香港厚紙チラシ HK$0.28-0.95/張｜200g以上の厚紙、質感が良く折れにくい。｜ZprintPro' },
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
    price_range: 'HK$0.22-0.80/張',
    basePrice: 0.22,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-eco-flyers-en-3.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-flyers-eco-flyers-zh-hk.jpg', en: 'zprintpro-flyers-eco-flyers-en.jpg', ja: 'zprintpro-flyers-eco-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港環保宣傳單張印刷 HK$0.22-0.80/張 起｜環保紙張印刷，展現企業責任。適合環保主題活動。｜ZprintPro智印港', en: 'Eco Flyers Printing Hong Kong HK$0.22-0.80/張｜Eco-friendly paper printing, showin｜ZprintPro', ja: '香港エコチラシ HK$0.22-0.80/張｜環境に優しい紙の印刷、企業の責任を示す。｜ZprintPro' },
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
    price_range: 'HK$0.32-1.20/張',
    basePrice: 0.32,
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
      en: [
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-en-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-en-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-en-3.webp',
      ],
      ja: [
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-flyers-same-day-flyers-ja-3.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-flyers-same-day-flyers-zh-hk.jpg', en: 'zprintpro-flyers-same-day-flyers-en.jpg', ja: 'zprintpro-flyers-same-day-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港即日宣傳單張印刷 HK$0.32-1.20/張 起｜緊急活動首選，最快當天交貨。即日印刷、即日快遞出貨｜ZprintPro智印港', en: 'Same-day Flyers Printing Hong Kong HK$0.32-1.20/張｜First choice for emergency events, ｜ZprintPro', ja: '香港即日チラシ HK$0.32-1.20/張｜緊急イベントの第一選択、最短当日印刷・宅配便発送。｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-en-3.webp',
      ],
      ja: [
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a2-posters-ja-3.webp',
      ],
    },
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-posters-a2-posters-zh-hk.jpg', en: 'zprintpro-posters-a2-posters-en.jpg', ja: 'zprintpro-posters-a2-posters-ja.jpg' },
      alt: { 'zh-hk': '香港A2海報印刷印刷 HK$10-35/張 起｜標準A2尺寸，活動宣傳、產品推廣首選。157g銅版｜ZprintPro智印港', en: 'A2 Posters Printing Hong Kong HK$10-35/張｜Standard A2 size, first choice for ｜ZprintPro', ja: '香港A2ポスター HK$10-35/張｜標準A2サイズ、イベント宣伝の第一選択。157gコ｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-3.webp',
      '/images/products/seedream-webp/zprintpro-posters-a1-posters-en-4.webp',
      ],
      ja: [
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
      filename: { 'zh-hk': 'zprintpro-posters-a1-posters-zh-hk.jpg', en: 'zprintpro-posters-a1-posters-en.jpg', ja: 'zprintpro-posters-a1-posters-ja.jpg' },
      alt: { 'zh-hk': '香港A1大幅海報印刷 HK$20-70/張 起｜A1大尺寸，視覺衝擊力強。適合展覽、會場佈置。｜ZprintPro智印港', en: 'A1 Large Posters Printing Hong Kong HK$20-70/張｜A1 large size, strong visual impact｜ZprintPro', ja: '香港A1大型ポスター HK$20-70/張｜A1大きなサイズ、強い視覚的インパクト。展示会、会｜ZprintPro' },
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
      en: [
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-en-1.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-en-2.webp',
      '/images/products/seedream-webp/zprintpro-posters-outdoor-posters-en-3.webp',
      ],
      ja: [

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
      filename: { 'zh-hk': 'zprintpro-posters-outdoor-posters-zh-hk.jpg', en: 'zprintpro-posters-outdoor-posters-en.jpg', ja: 'zprintpro-posters-outdoor-posters-ja.jpg' },
      alt: { 'zh-hk': '香港戶外海報印刷 HK$16-55/張 起｜防水防曬材質，戶外使用不褪色。適合戶外廣告、建築圍｜ZprintPro智印港', en: 'Outdoor Posters Printing Hong Kong HK$16-55/張｜Waterproof and UV-resistant materia｜ZprintPro', ja: '香港屋外ポスター HK$16-55/張｜防水・UV耐性素材、屋外使用でも色褪せません。｜ZprintPro' },
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
    price_range: 'HK$32-100/套',
    basePrice: 32,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/display-posters.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-posters-display-posters-zh-hk.jpg', en: 'zprintpro-posters-display-posters-en.jpg', ja: 'zprintpro-posters-display-posters-ja.jpg' },
      alt: { 'zh-hk': '香港展架海報印刷 HK$32-100/套 起｜配合X展架或易拉寶使用，便攜易裝。展會、路演必備。｜ZprintPro智印港', en: 'Display Posters Printing Hong Kong HK$32-100/套｜Compatible with X-stands or roll-up｜ZprintPro', ja: '香港展示用ポスター HK$32-100/套｜Xスタンドまたはロールアップバナーと互換、持ち運び｜ZprintPro' },
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
    price_range: 'HK$26-85/張',
    basePrice: 26,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/art-posters.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-posters-art-posters-zh-hk.jpg', en: 'zprintpro-posters-art-posters-en.jpg', ja: 'zprintpro-posters-art-posters-ja.jpg' },
      alt: { 'zh-hk': '香港藝術海報印刷 HK$26-85/張 起｜高級藝術紙張，色彩還原度高。適合藝術展覽、攝影作品｜ZprintPro智印港', en: 'Art Posters Printing Hong Kong HK$26-85/張｜Premium art paper, high color accur｜ZprintPro', ja: '香港アートポスター HK$26-85/張｜高級アート紙、高い色再現性。美術展、写真作品に最適｜ZprintPro' },
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
    price_range: 'HK$13-42/張',
    basePrice: 13,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/adhesive-posters.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-posters-adhesive-posters-zh-hk.jpg', en: 'zprintpro-posters-adhesive-posters-en.jpg', ja: 'zprintpro-posters-adhesive-posters-ja.jpg' },
      alt: { 'zh-hk': '香港背膠海報印刷 HK$13-42/張 起｜自帶背膠，可直接粘貼。適合店鋪櫥窗、牆面裝飾。｜ZprintPro智印港', en: 'Adhesive Posters Printing Hong Kong HK$13-42/張｜Self-adhesive, can be directly appl｜ZprintPro', ja: '香港粘着ポスター HK$13-42/張｜自己粘着、直接貼付可能。店舗の窓、壁の装飾に最適。｜ZprintPro' },
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
    price_range: 'HK$4-25/個',
    basePrice: 4,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/gift-boxes.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-gift-boxes-zh-hk.jpg', en: 'zprintpro-packaging-gift-boxes-en.jpg', ja: 'zprintpro-packaging-gift-boxes-ja.jpg' },
      alt: { 'zh-hk': '香港禮品盒定制印刷 HK$4-25/個 起｜精緻禮品盒，配合燙金、UV等工藝。送禮首選，提升產｜ZprintPro智印港', en: 'Gift Boxes Printing Hong Kong HK$4-25/個｜Exquisite gift boxes with foil stam｜ZprintPro', ja: '香港ギフトボックス HK$4-25/個｜精巧なギフトボックス、箔押し・UVなどの加工付き。｜ZprintPro' },
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
    price_range: 'HK$6-32/個',
    basePrice: 6,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/cosmetic-boxes.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-cosmetic-boxes-zh-hk.jpg', en: 'zprintpro-packaging-cosmetic-boxes-en.jpg', ja: 'zprintpro-packaging-cosmetic-boxes-ja.jpg' },
      alt: { 'zh-hk': '香港化妝品盒印刷 HK$6-32/個 起｜專為化妝品設計，內托可定制。適合護膚品、彩妝品牌。｜ZprintPro智印港', en: 'Cosmetic Boxes Printing Hong Kong HK$6-32/個｜Specially designed for cosmetics, c｜ZprintPro', ja: '香港化粧品箱 HK$6-32/個｜化粧品専用設計、カスタマイズ可能な内側トレイ。｜ZprintPro' },
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
    price_range: 'HK$2.5-18/個',
    basePrice: 2.5,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/food-boxes.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-food-boxes-zh-hk.jpg', en: 'zprintpro-packaging-food-boxes-en.jpg', ja: 'zprintpro-packaging-food-boxes-ja.jpg' },
      alt: { 'zh-hk': '香港食品包裝盒印刷 HK$2.5-18/個 起｜食品級材質，安全環保。適合糕點、茶葉、保健品。｜ZprintPro智印港', en: 'Food Boxes Printing Hong Kong HK$2.5-18/個｜Food-grade material, safe and eco-f｜ZprintPro', ja: '香港食品包装箱 HK$2.5-18/個｜食品グレード素材、安全で環境に優しい。｜ZprintPro' },
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
    price_range: 'HK$1.8-10/個',
    basePrice: 1.8,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/mailer-boxes.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-mailer-boxes-zh-hk.jpg', en: 'zprintpro-packaging-mailer-boxes-en.jpg', ja: 'zprintpro-packaging-mailer-boxes-ja.jpg' },
      alt: { 'zh-hk': '香港快遞盒/飛機盒印刷 HK$1.8-10/個 起｜堅固耐用，電商發貨首選。可印品牌Logo，提升開箱｜ZprintPro智印港', en: 'Mailer Boxes Printing Hong Kong HK$1.8-10/個｜Sturdy and durable, first choice fo｜ZprintPro', ja: '香港発送箱 HK$1.8-10/個｜頑丈で耐久性があり、EC発送の第一選択。｜ZprintPro' },
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
    price_range: 'HK$2.5-15/個',
    basePrice: 2.5,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/folding-boxes.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-folding-boxes-zh-hk.jpg', en: 'zprintpro-packaging-folding-boxes-en.jpg', ja: 'zprintpro-packaging-folding-boxes-ja.jpg' },
      alt: { 'zh-hk': '香港折疊盒印刷 HK$2.5-15/個 起｜可折疊設計，節省倉儲空間。適合大量存貨的電商賣家。｜ZprintPro智印港', en: 'Folding Boxes Printing Hong Kong HK$2.5-15/個｜Foldable design, saves warehouse sp｜ZprintPro', ja: '香港折りたたみ箱 HK$2.5-15/個｜折りたたみ可能なデザイン、倉庫スペースを節約。｜ZprintPro' },
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
    price_range: 'HK$8-42/個',
    basePrice: 8,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/rigid-boxes.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-rigid-boxes-zh-hk.jpg', en: 'zprintpro-packaging-rigid-boxes-en.jpg', ja: 'zprintpro-packaging-rigid-boxes-ja.jpg' },
      alt: { 'zh-hk': '香港精裝盒印刷 HK$8-42/個 起｜硬殼精裝，高檔奢華。適合高端產品、限量版商品。｜ZprintPro智印港', en: 'Rigid Boxes Printing Hong Kong HK$8-42/個｜Hardcover rigid construction, luxur｜ZprintPro', ja: '香港上製本箱 HK$8-42/個｜硬い上製本構造、豪華でプレミアム。｜ZprintPro' },
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
    price_range: 'HK$1.10-4.80/個',
    basePrice: 1.10,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/foil-red-packets.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-red-packets-foil-red-packets-zh-hk.jpg', en: 'zprintpro-red-packets-foil-red-packets-en.jpg', ja: 'zprintpro-red-packets-foil-red-packets-ja.jpg' },
      alt: { 'zh-hk': '香港燙金利是封印刷 HK$1.10-4.80/個 起｜傳統燙金工藝，喜慶大方。多種吉祥圖案可選，也可定制｜ZprintPro智印港', en: 'Foil Red Packets Printing Hong Kong HK$1.10-4.80/個｜Traditional foil stamping, festive ｜ZprintPro', ja: '香港箔押しポチ袋 HK$1.10-4.80/個｜伝統的な箔押し加工、縁起が良く上品。複数の縁起の良｜ZprintPro' },
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
    price_range: 'HK$3.00-9.50/個',
    basePrice: 3.00,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/embossed-red-packets.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-red-packets-embossed-red-packets-zh-hk.jpg', en: 'zprintpro-red-packets-embossed-red-packets-en.jpg', ja: 'zprintpro-red-packets-embossed-red-packets-ja.jpg' },
      alt: { 'zh-hk': '香港浮雕利是封印刷 HK$3.00-9.50/個 起｜浮雕工藝，立體觸感，高檔奢華。展現品牌誠意，適合V｜ZprintPro智印港', en: 'Embossed Red Packets Printing Hong Kong HK$3.00-9.50/個｜Embossed craftsmanship, dimensional｜ZprintPro', ja: '香港エンボスポチ袋 HK$3.00-9.50/個｜エンボス加工、立体的な触感、豪華な質感。｜ZprintPro' },
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
    price_range: 'HK$1.90-6.40/個',
    basePrice: 1.90,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/custom-red-packets.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-red-packets-custom-red-packets-zh-hk.jpg', en: 'zprintpro-red-packets-custom-red-packets-en.jpg', ja: 'zprintpro-red-packets-custom-red-packets-ja.jpg' },
      alt: { 'zh-hk': '香港定制利是封印刷 HK$1.90-6.40/個 起｜專屬設計，印上公司Logo和祝福語。強化品牌印象，｜ZprintPro智印港', en: 'Custom Red Packets Printing Hong Kong HK$1.90-6.40/個｜Exclusive design with company logo ｜ZprintPro', ja: '香港オリジナルポチ袋 HK$1.90-6.40/個｜独占的なデザイン、会社ロゴと祝福の言葉。ブランドイ｜ZprintPro' },
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
    price_range: 'HK$1.10-3.80/個',
    basePrice: 1.10,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/cartoon-red-packets.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-red-packets-cartoon-red-packets-zh-hk.jpg', en: 'zprintpro-red-packets-cartoon-red-packets-en.jpg', ja: 'zprintpro-red-packets-cartoon-red-packets-ja.jpg' },
      alt: { 'zh-hk': '香港卡通利是封印刷 HK$1.10-3.80/個 起｜可愛卡通設計，深受年輕人喜愛。適合親子品牌、教育機｜ZprintPro智印港', en: 'Cartoon Red Packets Printing Hong Kong HK$1.10-3.80/個｜Cute cartoon design, loved by young｜ZprintPro', ja: '香港キャラクターポチ袋 HK$1.10-3.80/個｜かわいいキャラクターデザイン、若者に人気。｜ZprintPro' },
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
    price_range: 'HK$1.90-5.20/個',
    basePrice: 1.90,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/eco-red-packets.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-red-packets-eco-red-packets-zh-hk.jpg', en: 'zprintpro-red-packets-eco-red-packets-en.jpg', ja: 'zprintpro-red-packets-eco-red-packets-ja.jpg' },
      alt: { 'zh-hk': '香港環保利是封印刷 HK$1.90-5.20/個 起｜採用環保紙張和油墨，可持續發展理念。適合注重環保的｜ZprintPro智印港', en: 'Eco Red Packets Printing Hong Kong HK$1.90-5.20/個｜Eco-friendly paper and ink, sustain｜ZprintPro', ja: '香港エコポチ袋 HK$1.90-5.20/個｜環境に優しい紙とインク、持続可能な開発の理念。｜ZprintPro' },
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
    price_range: 'HK$2.20-7.50/個',
    basePrice: 2.20,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/large-red-packets.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-red-packets-large-red-packets-zh-hk.jpg', en: 'zprintpro-red-packets-large-red-packets-en.jpg', ja: 'zprintpro-red-packets-large-red-packets-ja.jpg' },
      alt: { 'zh-hk': '香港大號利是封印刷 HK$2.20-7.50/個 起｜加大尺寸，可放入更多鈔票或禮品卡。實用大氣，送禮更｜ZprintPro智印港', en: 'Large Red Packets Printing Hong Kong HK$2.20-7.50/個｜Larger size, can hold more cash or ｜ZprintPro', ja: '香港大判ポチ袋 HK$2.20-7.50/個｜大きなサイズ、より多くの現金やギフトカードを入れら｜ZprintPro' },
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
    price_range: 'HK$12-40/本',
    basePrice: 12,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/wall-calendars.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-calendars-wall-calendars-zh-hk.jpg', en: 'zprintpro-calendars-wall-calendars-en.jpg', ja: 'zprintpro-calendars-wall-calendars-ja.jpg' },
      alt: { 'zh-hk': '香港掛牆年曆印刷 HK$12-40/本 起｜標準A3或A2掛牆年曆，13頁設計（封面+12個月｜ZprintPro智印港', en: 'Wall Calendars Printing Hong Kong HK$12-40/本｜Standard A3 or A2 wall calendars, 1｜ZprintPro', ja: '香港壁掛けカレンダー HK$12-40/本｜標準A3またはA2壁掛けカレンダー、13ページデザ｜ZprintPro' },
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
    price_range: 'HK$16-50/本',
    basePrice: 16,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/desk-calendars.jpg'],
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'desk', label: '座檯 (150×200mm)', multiplier: 0.6 },
      ],
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
      filename: { 'zh-hk': 'zprintpro-calendars-desk-calendars-zh-hk.jpg', en: 'zprintpro-calendars-desk-calendars-en.jpg', ja: 'zprintpro-calendars-desk-calendars-ja.jpg' },
      alt: { 'zh-hk': '香港座檯年曆印刷 HK$16-50/本 起｜三角形座檯設計，穩固美觀。適合辦公桌擺放，每日品牌｜ZprintPro智印港', en: 'Desk Calendars Printing Hong Kong HK$16-50/本｜Triangular desk design, stable and ｜ZprintPro', ja: '香港卓上カレンダー HK$16-50/本｜三角形の卓上デザイン、安定して美しい。オフィスデス｜ZprintPro' },
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
    price_range: 'HK$20-65/本',
    basePrice: 20,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/custom-calendars.jpg'],
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'desk', label: '座檯 (150×200mm)', multiplier: 0.6 },
      ],
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
      filename: { 'zh-hk': 'zprintpro-calendars-custom-calendars-zh-hk.jpg', en: 'zprintpro-calendars-custom-calendars-en.jpg', ja: 'zprintpro-calendars-custom-calendars-ja.jpg' },
      alt: { 'zh-hk': '香港定制年曆印刷 HK$20-65/本 起｜專屬設計，每頁可印公司產品或服務。企業禮品首選，送｜ZprintPro智印港', en: 'Custom Calendars Printing Hong Kong HK$20-65/本｜Exclusive design, each page can fea｜ZprintPro', ja: '香港オリジナルカレンダー HK$20-65/本｜独占的なデザイン、各ページに会社の製品やサービスを｜ZprintPro' },
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
    price_range: 'HK$6-20/本',
    basePrice: 6,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/mini-calendars.jpg'],
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'desk', label: '座檯 (150×200mm)', multiplier: 0.6 },
      ],
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
      filename: { 'zh-hk': 'zprintpro-calendars-mini-calendars-zh-hk.jpg', en: 'zprintpro-calendars-mini-calendars-en.jpg', ja: 'zprintpro-calendars-mini-calendars-ja.jpg' },
      alt: { 'zh-hk': '香港迷你年曆印刷 HK$6-20/本 起｜小巧便攜，可放入錢包或口袋。創意禮品，年輕人喜愛。｜ZprintPro智印港', en: 'Mini Calendars Printing Hong Kong HK$6-20/本｜Compact and portable, fits in walle｜ZprintPro', ja: '香港ミニカレンダー HK$6-20/本｜コンパクトで持ち運び可能、財布やポケットに入ります｜ZprintPro' },
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
    price_range: 'HK$24-80/本',
    basePrice: 24,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/photo-frame-calendars.jpg'],
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'desk', label: '座檯 (150×200mm)', multiplier: 0.6 },
      ],
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
      filename: { 'zh-hk': 'zprintpro-calendars-photo-frame-calendars-zh-hk.jpg', en: 'zprintpro-calendars-photo-frame-calendars-en.jpg', ja: 'zprintpro-calendars-photo-frame-calendars-ja.jpg' },
      alt: { 'zh-hk': '香港相框年曆印刷 HK$24-80/本 起｜結合相框功能，可替換照片。實用美觀，家庭必備。｜ZprintPro智印港', en: 'Photo Frame Calendars Printing Hong Kong HK$24-80/本｜Combined photo frame function, phot｜ZprintPro', ja: '香港フォトフレームカレンダー HK$24-80/本｜フォトフレーム機能付き、写真を交換可能。｜ZprintPro' },
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
    price_range: 'HK$10-30/本',
    basePrice: 10,
    weight_score: 82,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/magnetic-calendars.jpg'],
    variables: {
      sizes: [
        { value: 'a4', label: 'A4 (210×297mm)', multiplier: 1 },
        { value: 'a3', label: 'A3 (297×420mm)', multiplier: 1.8 },
        { value: 'desk', label: '座檯 (150×200mm)', multiplier: 0.6 },
      ],
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
      filename: { 'zh-hk': 'zprintpro-calendars-magnetic-calendars-zh-hk.jpg', en: 'zprintpro-calendars-magnetic-calendars-en.jpg', ja: 'zprintpro-calendars-magnetic-calendars-ja.jpg' },
      alt: { 'zh-hk': '香港磁石年曆印刷 HK$10-30/本 起｜磁石背膠，可貼於冰箱等金屬表面。每日多次接觸，品牌｜ZprintPro智印港', en: 'Magnetic Calendars Printing Hong Kong HK$10-30/本｜Magnetic backing, can stick to refr｜ZprintPro', ja: '香港マグネットカレンダー HK$10-30/本｜マグネット背面、冷蔵庫などの金属面に貼付可能。｜ZprintPro' },
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
    price_range: 'HK$8-32/張',
    basePrice: 8,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/pvc-menus.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-menus-pvc-menus-zh-hk.jpg', en: 'zprintpro-menus-pvc-menus-en.jpg', ja: 'zprintpro-menus-pvc-menus-ja.jpg' },
      alt: { 'zh-hk': '香港PVC餐牌印刷 HK$8-32/張 起｜防水防油PVC材質，易清潔耐用。餐廳、咖啡店首選。｜ZprintPro智印港', en: 'PVC Menus Printing Hong Kong HK$8-32/張｜Waterproof and oil-resistant PVC ma｜ZprintPro', ja: '香港PVCメニュー HK$8-32/張｜防水・耐油性PVC素材、お手入れ簡単で耐久性あり。｜ZprintPro' },
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
    price_range: 'HK$5-22/張',
    basePrice: 5,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/laminated-menus.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-menus-laminated-menus-zh-hk.jpg', en: 'zprintpro-menus-laminated-menus-en.jpg', ja: 'zprintpro-menus-laminated-menus-ja.jpg' },
      alt: { 'zh-hk': '香港過膠餐牌印刷 HK$5-22/張 起｜紙質過膠處理，防水耐用且成本較低。經濟實惠之選。｜ZprintPro智印港', en: 'Laminated Menus Printing Hong Kong HK$5-22/張｜Paper with lamination, waterproof a｜ZprintPro', ja: '香港ラミネートメニュー HK$5-22/張｜ラミネート加工紙、防水で耐久性がありコストも低い。｜ZprintPro' },
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
    price_range: 'HK$28-120/本',
    basePrice: 28,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/hardcover-menus.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-menus-hardcover-menus-zh-hk.jpg', en: 'zprintpro-menus-hardcover-menus-en.jpg', ja: 'zprintpro-menus-hardcover-menus-ja.jpg' },
      alt: { 'zh-hk': '香港精裝餐牌印刷 HK$28-120/本 起｜硬殼精裝，高檔大氣。適合高級餐廳、酒店。｜ZprintPro智印港', en: 'Hardcover Menus Printing Hong Kong HK$28-120/本｜Hardcover binding, elegant and gran｜ZprintPro', ja: '香港高級メニュー HK$28-120/本｜上製本装丁、エレガントで格式高い。高級レストラン、｜ZprintPro' },
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
    price_range: 'HK$12-48/張',
    basePrice: 12,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/drink-menus.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-menus-drink-menus-zh-hk.jpg', en: 'zprintpro-menus-drink-menus-en.jpg', ja: 'zprintpro-menus-drink-menus-ja.jpg' },
      alt: { 'zh-hk': '香港酒水牌印刷 HK$12-48/張 起｜專為酒水設計，可立式或手持。酒吧、餐廳必備。｜ZprintPro智印港', en: 'Drink Menus Printing Hong Kong HK$12-48/張｜Specially designed for drinks, can ｜ZprintPro', ja: '香港ドリンクメニュー HK$12-48/張｜ドリンク専用設計、立てかけまたは手持ち可能。｜ZprintPro' },
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
    price_range: 'HK$0.22-1.20/張',
    basePrice: 0.22,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/disposable-menus.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-menus-disposable-menus-zh-hk.jpg', en: 'zprintpro-menus-disposable-menus-en.jpg', ja: 'zprintpro-menus-disposable-menus-ja.jpg' },
      alt: { 'zh-hk': '香港一次性餐牌印刷 HK$0.22-1.20/張 起｜經濟紙質，適合快餐店、外賣店。可頻繁更換內容。｜ZprintPro智印港', en: 'Disposable Menus Printing Hong Kong HK$0.22-1.20/張｜Economical paper, perfect for fast ｜ZprintPro', ja: '香港使い捨てメニュー HK$0.22-1.20/張｜経済的な紙、ファストフードやテイクアウト店に最適。｜ZprintPro' },
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
    price_range: 'HK$12-55/平方米',
    basePrice: 12,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/outdoor-vinyl-banners.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-banners-outdoor-vinyl-banners-zh-hk.jpg', en: 'zprintpro-banners-outdoor-vinyl-banners-en.jpg', ja: 'zprintpro-banners-outdoor-vinyl-banners-ja.jpg' },
      alt: { 'zh-hk': '香港戶外燈布噴繪印刷 HK$12-55/平方米 起｜大型戶外燈布，防水防曬，耐候性強。適合戶外廣告牌、｜ZprintPro智印港', en: 'Outdoor Vinyl Banners Printing Hong Kong HK$12-55/平方米｜Large outdoor vinyl banners, waterp｜ZprintPro', ja: '香港屋外バナー HK$12-55/平方米｜大型屋外ビニールバナー、防水・UV耐性、強い耐候性｜ZprintPro' },
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
    price_range: 'HK$85-300/套',
    basePrice: 85,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/roll-up-banners.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-banners-roll-up-banners-zh-hk.jpg', en: 'zprintpro-banners-roll-up-banners-en.jpg', ja: 'zprintpro-banners-roll-up-banners-ja.jpg' },
      alt: { 'zh-hk': '香港易拉寶印刷 HK$85-300/套 起｜便攜易拉寶展架，安裝簡便。展會、路演必備。｜ZprintPro智印港', en: 'Roll-up Banners Printing Hong Kong HK$85-300/套｜Portable roll-up banner stands, eas｜ZprintPro', ja: '香港ロールアップバナー HK$85-300/套｜ポータブルロールアップバナースタンド、設置簡単。展｜ZprintPro' },
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
    price_range: 'HK$10-45/平方米',
    basePrice: 10,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/adhesive-banners.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-banners-adhesive-banners-zh-hk.jpg', en: 'zprintpro-banners-adhesive-banners-en.jpg', ja: 'zprintpro-banners-adhesive-banners-ja.jpg' },
      alt: { 'zh-hk': '香港背膠噴繪印刷 HK$10-45/平方米 起｜自帶背膠，可直接粘貼於牆面或玻璃。適合店鋪裝飾、活｜ZprintPro智印港', en: 'Adhesive Banners Printing Hong Kong HK$10-45/平方米｜Self-adhesive, can be directly appl｜ZprintPro', ja: '香港粘着バナー HK$10-45/平方米｜自己粘着、壁やガラスに直接貼付可能。｜ZprintPro' },
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
    price_range: 'HK$28-120/平方米',
    basePrice: 28,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/vehicle-wraps.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-banners-vehicle-wraps-zh-hk.jpg', en: 'zprintpro-banners-vehicle-wraps-en.jpg', ja: 'zprintpro-banners-vehicle-wraps-ja.jpg' },
      alt: { 'zh-hk': '香港車身廣告印刷 HK$28-120/平方米 起｜專用車身貼紙，耐候性強，移除不留痕。流動廣告，曝光｜ZprintPro智印港', en: 'Vehicle Wraps Printing Hong Kong HK$28-120/平方米｜Specialized vehicle wrap vinyl, str｜ZprintPro', ja: '香港カーラッピング HK$28-120/平方米｜専用車体ラップビニール、強い耐候性、剥がしても残り｜ZprintPro' },
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
    price_range: 'HK$16-75/平方米',
    basePrice: 16,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/mesh-banners.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-banners-mesh-banners-zh-hk.jpg', en: 'zprintpro-banners-mesh-banners-en.jpg', ja: 'zprintpro-banners-mesh-banners-ja.jpg' },
      alt: { 'zh-hk': '香港網格布噴繪印刷 HK$16-75/平方米 起｜網格設計，透光透風。適合大型戶外廣告、建築圍板。｜ZprintPro智印港', en: 'Mesh Banners Printing Hong Kong HK$16-75/平方米｜Mesh design, light and air permeabl｜ZprintPro', ja: '香港メッシュバナー HK$16-75/平方米｜メッシュデザイン、光と空気を通す。大型屋外広告に最｜ZprintPro' },
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
    price_range: 'HK$24-120/本',
    basePrice: 24,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/catalog-printing.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-books-catalog-printing-zh-hk.jpg', en: 'zprintpro-books-catalog-printing-en.jpg', ja: 'zprintpro-books-catalog-printing-ja.jpg' },
      alt: { 'zh-hk': '香港畫冊印刷印刷 HK$24-120/本 起｜高級畫冊，色彩還原度高。適合產品目錄、企業年報、藝｜ZprintPro智印港', en: 'Catalog Printing Printing Hong Kong HK$24-120/本｜Premium catalogs with high color ac｜ZprintPro', ja: '香港カタログ印刷 HK$24-120/本｜高級カタログ、高い色再現性。製品カタログ、年次報告｜ZprintPro' },
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
    price_range: 'HK$6-32/本',
    basePrice: 6,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/saddle-stitch-booklets.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-books-saddle-stitch-booklets-zh-hk.jpg', en: 'zprintpro-books-saddle-stitch-booklets-en.jpg', ja: 'zprintpro-books-saddle-stitch-booklets-ja.jpg' },
      alt: { 'zh-hk': '香港騎馬釘小冊子印刷 HK$6-32/本 起｜經濟裝訂方式，適合頁數較少的冊子。產品說明書、活動｜ZprintPro智印港', en: 'Saddle Stitch Booklets Printing Hong Kong HK$6-32/本｜Economical binding method, perfect ｜ZprintPro', ja: '香港中綴じ冊子 HK$6-32/本｜経済的な製本方法、ページ数の少ない冊子に最適。｜ZprintPro' },
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
    price_range: 'HK$16-80/本',
    basePrice: 16,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/perfect-bound-books.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-books-perfect-bound-books-zh-hk.jpg', en: 'zprintpro-books-perfect-bound-books-en.jpg', ja: 'zprintpro-books-perfect-bound-books-ja.jpg' },
      alt: { 'zh-hk': '香港無線膠裝書籍印刷 HK$16-80/本 起｜平整書脊，可印刷書名。適合頁數較多的書籍、雜誌。｜ZprintPro智印港', en: 'Perfect Bound Books Printing Hong Kong HK$16-80/本｜Flat spine, can print book title. P｜ZprintPro', ja: '香港無線綴じ本 HK$16-80/本｜平らな背表紙、書名を印刷可能。ページ数の多い本や雑｜ZprintPro' },
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
    price_range: 'HK$40-240/本',
    basePrice: 40,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/hardcover-books.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-books-hardcover-books-zh-hk.jpg', en: 'zprintpro-books-hardcover-books-en.jpg', ja: 'zprintpro-books-hardcover-books-ja.jpg' },
      alt: { 'zh-hk': '香港精裝書籍印刷 HK$40-240/本 起｜硬殼精裝，高檔耐用。適合珍藏版書籍、企業年鑑。｜ZprintPro智印港', en: 'Hardcover Books Printing Hong Kong HK$40-240/本｜Hardcover binding, luxurious and du｜ZprintPro', ja: '香港上製本 HK$40-240/本｜上製本装丁、豪華で耐久性あり。愛蔵版、企業年鑑に最｜ZprintPro' },
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
    price_range: 'HK$8-40/本',
    basePrice: 8,
    weight_score: 85,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/spiral-notebooks.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-books-spiral-notebooks-zh-hk.jpg', en: 'zprintpro-books-spiral-notebooks-en.jpg', ja: 'zprintpro-books-spiral-notebooks-ja.jpg' },
      alt: { 'zh-hk': '香港線圈筆記本印刷 HK$8-40/本 起｜線圈裝訂，可180度平攤。適合筆記本、工作手冊。｜ZprintPro智印港', en: 'Spiral Notebooks Printing Hong Kong HK$8-40/本｜Spiral binding, can lay flat at 180｜ZprintPro', ja: '香港リングノート HK$8-40/本｜スパイラル製本、180度に開く。ノート、ワークブッ｜ZprintPro' },
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
    price_range: 'HK$0.22-1.80/個',
    basePrice: 0.22,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/business-envelopes.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-envelopes-business-envelopes-zh-hk.jpg', en: 'zprintpro-envelopes-business-envelopes-en.jpg', ja: 'zprintpro-envelopes-business-envelopes-ja.jpg' },
      alt: { 'zh-hk': '香港公司信封印刷 HK$0.22-1.80/個 起｜定制公司信封，印上Logo和地址。專業形象，商務必｜ZprintPro智印港', en: 'Business Envelopes Printing Hong Kong HK$0.22-1.80/個｜Custom business envelopes with logo｜ZprintPro', ja: '香港ビジネス封筒 HK$0.22-1.80/個｜カスタムビジネス封筒、ロゴと住所を印刷。プロフェッ｜ZprintPro' },
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
    price_range: 'HK$0.38-2.60/個',
    basePrice: 0.38,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/colored-envelopes.jpg'],
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
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-envelopes-colored-envelopes-zh-hk.jpg', en: 'zprintpro-envelopes-colored-envelopes-en.jpg', ja: 'zprintpro-envelopes-colored-envelopes-ja.jpg' },
      alt: { 'zh-hk': '香港彩色信封印刷 HK$0.38-2.60/個 起｜彩色印刷，視覺吸引力強。適合邀請函、賀卡、營銷郵件｜ZprintPro智印港', en: 'Colored Envelopes Printing Hong Kong HK$0.38-2.60/個｜Colorful printing, strong visual ap｜ZprintPro', ja: '香港カラー封筒 HK$0.38-2.60/個｜カラフルな印刷、強い視覚的アピール。招待状、グリー｜ZprintPro' },
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
    price_range: 'HK$0.60-3.40/個',
    basePrice: 0.60,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/large-envelopes.jpg'],
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
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-envelopes-large-envelopes-zh-hk.jpg', en: 'zprintpro-envelopes-large-envelopes-en.jpg', ja: 'zprintpro-envelopes-large-envelopes-ja.jpg' },
      alt: { 'zh-hk': '香港大號信封印刷 HK$0.60-3.40/個 起｜A4尺寸大信封，可裝入文件、合同。辦公室必備。｜ZprintPro智印港', en: 'Large Envelopes Printing Hong Kong HK$0.60-3.40/個｜A4 size large envelopes, can hold d｜ZprintPro', ja: '香港大判封筒 HK$0.60-3.40/個｜A4サイズの大きな封筒、書類や契約書を入れられます｜ZprintPro' },
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
    price_range: 'HK$1.15-5.20/個',
    basePrice: 1.15,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/pearl-envelopes.jpg'],
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
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-envelopes-pearl-envelopes-zh-hk.jpg', en: 'zprintpro-envelopes-pearl-envelopes-en.jpg', ja: 'zprintpro-envelopes-pearl-envelopes-ja.jpg' },
      alt: { 'zh-hk': '香港珠光信封印刷 HK$1.15-5.20/個 起｜珠光紙張，閃耀質感。適合婚禮邀請、高端活動。｜ZprintPro智印港', en: 'Pearl Envelopes Printing Hong Kong HK$1.15-5.20/個｜Pearl paper, shimmering quality. Pe｜ZprintPro', ja: '香港パール封筒 HK$1.15-5.20/個｜パール紙、輝く質感。結婚式の招待状、高級イベントに｜ZprintPro' },
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
    price_range: 'HK$4-16/本',
    basePrice: 4,
    weight_score: 95,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/exercise-books.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-educational-exercise-books-zh-hk.jpg', en: 'zprintpro-educational-exercise-books-en.jpg', ja: 'zprintpro-educational-exercise-books-ja.jpg' },
      alt: { 'zh-hk': '香港作業簿印刷印刷 HK$4-16/本 起｜學校作業簿，可定制封面和內頁格式。適合中小學、補習｜ZprintPro智印港', en: 'Exercise Books Printing Hong Kong HK$4-16/本｜School exercise books, customizable｜ZprintPro', ja: '香港ワークブック印刷 HK$4-16/本｜学校のワークブック、カスタマイズ可能な表紙と内側ペ｜ZprintPro' },
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
    price_range: 'HK$8-40/張',
    basePrice: 8,
    weight_score: 92,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/certificates.jpg'],
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
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-educational-certificates-zh-hk.jpg', en: 'zprintpro-educational-certificates-en.jpg', ja: 'zprintpro-educational-certificates-ja.jpg' },
      alt: { 'zh-hk': '香港證書印刷印刷 HK$8-40/張 起｜精美證書，配合燙金、壓紋等工藝。畢業證書、獎狀、資｜ZprintPro智印港', en: 'Certificates Printing Hong Kong HK$8-40/張｜Exquisite certificates with foil st｜ZprintPro', ja: '香港賞状印刷 HK$8-40/張｜精巧な賞状、箔押し・エンボスなどの加工付き。卒業証｜ZprintPro' },
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
    price_range: 'HK$0.2-0.8/張',
    basePrice: 0.2,
    weight_score: 90,
    isHot: true,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/school-flyers.jpg'],
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
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-educational-school-flyers-zh-hk.jpg', en: 'zprintpro-educational-school-flyers-en.jpg', ja: 'zprintpro-educational-school-flyers-ja.jpg' },
      alt: { 'zh-hk': '香港學校單張印刷 HK$0.2-0.8/張 起｜學校通告、活動宣傳單張。經濟實惠，大量印刷。｜ZprintPro智印港', en: 'School Flyers Printing Hong Kong HK$0.2-0.8/張｜School notices, event promotional f｜ZprintPro', ja: '香港学校チラシ HK$0.2-0.8/張｜学校の通知、イベント宣伝チラシ。経済的、大量印刷。｜ZprintPro' },
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
    price_range: 'HK$24-120/本',
    basePrice: 24,
    weight_score: 88,
    isHot: false,
    isNew: false,
    minQuantity: 100,
    images: ['/images/products/textbooks.jpg'],
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
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-educational-textbooks-zh-hk.jpg', en: 'zprintpro-educational-textbooks-en.jpg', ja: 'zprintpro-educational-textbooks-ja.jpg' },
      alt: { 'zh-hk': '香港教科書印刷印刷 HK$24-120/本 起｜教材、教科書印刷。專業排版，品質保證。｜ZprintPro智印港', en: 'Textbooks Printing Hong Kong HK$24-120/本｜Teaching materials, textbook printi｜ZprintPro', ja: '香港教科書印刷 HK$24-120/本｜教材、教科書の印刷。プロの組版、品質保証。｜ZprintPro' },
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
    price_range: 'HK$15-80/個',
    basePrice: 15,
    weight_score: 98,
    isHot: true,
    isNew: true,
    minQuantity: 100,
    images: ['/images/hero-v21/gift-box.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-magnetic-closure-gift-box-zh-hk.jpg', en: 'zprintpro-packaging-magnetic-closure-gift-box-en.jpg', ja: 'zprintpro-packaging-magnetic-closure-gift-box-ja.jpg' },
      alt: { 'zh-hk': '香港磁吸翻蓋禮盒印刷印刷 HK$15-80/個 起｜高檔磁吸翻蓋硬盒，適合奢侈品、化妝品、電子產品包裝｜ZprintPro智印港', en: 'Magnetic Closure Gift Box Printing Hong Kong HK$15-80/個｜Premium magnetic closure rigid boxe｜ZprintPro', ja: '香港マグネット蓋ギフトボックス HK$15-80/個｜高級マグネット蓋硬箱。高級品、化粧品、電子機器の包｜ZprintPro' },
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
    price_range: 'HK$8-50/個',
    basePrice: 8,
    weight_score: 96,
    isHot: true,
    isNew: true,
    minQuantity: 200,
    images: ['/images/products/cosmetic-boxes.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-electronics-packaging-box-zh-hk.jpg', en: 'zprintpro-packaging-electronics-packaging-box-en.jpg', ja: 'zprintpro-packaging-electronics-packaging-box-ja.jpg' },
      alt: { 'zh-hk': '香港電子產品包裝盒定制印刷 HK$8-50/個 起｜手機、耳機、充電器等3C產品包裝盒。EVA內托、吸｜ZprintPro智印港', en: 'Electronics Packaging Box Printing Hong Kong HK$8-50/個｜Packaging boxes for phones, earphon｜ZprintPro', ja: '香港電子機器包装箱 HK$8-50/個｜スマホ、イヤホン、充電器等のパッケージ箱。EVAフ｜ZprintPro' },
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
    price_range: 'HK$5-30/個',
    basePrice: 5,
    weight_score: 94,
    isHot: true,
    isNew: false,
    minQuantity: 300,
    images: ['/images/hero-v21/kraft-bag.jpg'],
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
      filename: { 'zh-hk': 'zprintpro-packaging-kraft-paper-packaging-box-zh-hk.jpg', en: 'zprintpro-packaging-kraft-paper-packaging-box-en.jpg', ja: 'zprintpro-packaging-kraft-paper-packaging-box-ja.jpg' },
      alt: { 'zh-hk': '香港牛皮紙盒印刷定制印刷 HK$5-30/個 起｜環保牛皮紙盒，適合食品、茶葉、手工皂包裝。可印刷L｜ZprintPro智印港', en: 'Kraft Paper Packaging Box Printing Hong Kong HK$5-30/個｜Eco-friendly kraft paper boxes for ｜ZprintPro', ja: '香港クラフト紙箱印刷 HK$5-30/個｜環境に優しいクラフト紙箱。食品、お茶、手作り石鹸の｜ZprintPro' },
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
    price_range: 'HK$12-60/個',
    basePrice: 12,
    weight_score: 93,
    isHot: false,
    isNew: true,
    minQuantity: 200,
    images: ['/images/hero-v21/gift-box.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-packaging-drawer-slide-gift-box-zh-hk.jpg', en: 'zprintpro-packaging-drawer-slide-gift-box-en.jpg', ja: 'zprintpro-packaging-drawer-slide-gift-box-ja.jpg' },
      alt: { 'zh-hk': '香港抽屜禮盒滑軌盒印刷印刷 HK$12-60/個 起｜精緻抽屜式禮盒，絲帶拉手設計。適合茶葉、月餅、珠寶｜ZprintPro智印港', en: 'Drawer Slide Gift Box Printing Hong Kong HK$12-60/個｜Exquisite drawer-style gift boxes w｜ZprintPro', ja: '香港引き出し式ギフトボックス HK$12-60/個｜精巧な引き出し式ギフトボックス。リボン引手付き。お｜ZprintPro' },
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
    price_range: 'HK$0.22-1.20/張',
    basePrice: 0.22,
    weight_score: 95,
    isHot: true,
    isNew: true,
    minQuantity: 500,
    images: ['/images/products/transparent-stickers.jpg'],
    seoImages: {
      filename: { 'zh-hk': 'zprintpro-stickers-fruit-food-label-stickers-zh-hk.jpg', en: 'zprintpro-stickers-fruit-food-label-stickers-en.jpg', ja: 'zprintpro-stickers-fruit-food-label-stickers-ja.jpg' },
      alt: { 'zh-hk': '香港水果貼紙食品標籤印刷印刷 HK$0.22-1.20/張 起｜防水防油的水果貼紙和食品標籤，適合生鮮、烘焙、飲料｜ZprintPro智印港', en: 'Fruit & Food Label Stickers Printing Hong Kong HK$0.22-1.20/張｜Waterproof and oil-resistant fruit ｜ZprintPro', ja: '香港フルーツ・食品ラベルシール HK$0.22-1.20/張｜耐水耐油のフルーツシールと食品ラベル。生鮮食品、ベ｜ZprintPro' },
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

// 搜索产品
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.nameEn.toLowerCase().includes(lowerQuery) ||
      p.nameJa.toLowerCase().includes(lowerQuery) ||
      p.sku_code.toLowerCase().includes(lowerQuery)
  );
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
  const titles: Record<string, string> = {
    'zh-hk': `香港${product.name}印刷 | ${product.description.slice(0, 25)} | ZprintPro智印港`,
    en: `${product.nameEn} Printing Hong Kong | ${product.descriptionEn.slice(0, 35)} | ZprintPro`,
    ja: `香港${product.nameJa} | ${product.descriptionJa.slice(0, 25)} | ZprintPro`,
  };
  return titles[locale] || titles['zh-hk'];
}
