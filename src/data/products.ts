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
    longDescription: `智印云高級商務咭片採用300g高級銅版紙或250g啞粉藝術紙，配合海德堡四色柯式印刷，網點還原細膩，色彩飽和度達90%以上。表面可選啞膠或光膠覆膜，啞膠觸感絲滑不反光，光膠透亮耐磨；亦可升級局部UV或燙金工藝，提升品牌辨識度。成品尺寸標準85×54mm，支援圓角模切（R3mm），避免邊角翹起。我們提供免費色彩校樣與刀模檢查，確保批量印製時顏色一致。適合企業高管、金融業、法律顧問及創意產業人士。與分類頁內容一致，材質關鍵詞包含：銅版紙、啞粉紙、覆膜（啞膠／光膠）、局部UV、燙金。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Premium Business Cards use 300g premium glossy art paper or 250g matte art paper, paired with Heidelberg 4-color offset printing for fine halftone reproduction and 90%+ color saturation. Surface options include matte or gloss lamination with optional spot UV or foil stamping. Standard size 85×54mm with optional R3mm rounded corners. Free color proofing ensures batch consistency. Ideal for executives, finance, legal, and creative professionals.`,
    longDescriptionJa: `当サービスでは名刺印刷 即日対応にこだわり、300gの高級コート紙または250gマットアート紙を採用し、ハイデルベルク4色オフセット印刷で90%以上の色飽和と繊細な網点再現を実現しています。マット／グロスラミネートに加え、スポットUVや箔押し（金・銀・ローズゴールド）もご選択いただけ、ブランドの世界観に合わせたプレミアム名刺へと仕上げます。

名刺 印刷 激安 ネット注文をご希望の方へ。当サービスはネット注文の利便性と高品質を両立しており、100枚からご注文可能、500枚以上で15%オフ、1,000枚以上で25%オフ、2,000枚以上で35%オフの段階割引をご用意しています。最短当日データ確定後3営業日で全国へ出荷。東京・大阪・名古屋・福岡・横浜へは翌日配送にも対応し、ヤマト運輸・佐川急便での追跡可能な発送を行っております。

名刺 オーダーメイド 業者をお探しの皆様に。ロゴ・写真・QRコードまで鮮明に再現する4色プロセス印刷、完全データ入稿からデザイン作成サービス（3案まで無料）まで柔軟に対応。標準85×54mmサイズのほか、R3mm丸角ダイカット、600g超厚紙、特殊加工（エンボス・パール箔・ホログラム）などのカスタマイズも承っております。全工程を香港自社工場で印刷し、国内検品・税込価格表示・日本語サポートで日本市場向けに最適化しています。

名刺 印刷 テンプレート 無料をご希望の方へ。Ai・PDF・PNG・JPG対応の無料デザインテンプレートを豊富にご用意しており、初めての方でも安心してオリジナル名刺を作成できます。テンプレートは業種別（弁護士・デザイナー・エンジニア・飲食・美容など）100種以上を取り揃え、企業ロゴやブランドカラーの差し替えも簡単です。

名刺 印刷 失敗 事例で多い「色ズレ・糊不良・裁断ズレ」を未然に防ぐため、無料のカラープルーフと刀型チェックを全ご注文に標準で実施しています。印刷面と箔押し面の位置ズレ、CCMYK変換時の色域外警告、データ不備の事前検出まで一貫サポート。印刷品質に妥協したくない方に選ばれているサービスです。

運営会社：ZprintPro Limited（香港本社）。所在地：香港九龍観塘偉業街82号成運工業ビル。日本語サポート受付：平日 9:00-18:00（日本時間）。ISO 9001認証取得、国内検品体制、FSC認証紙対応。決済：JPY（日本円）、クレジットカード（VISA／Master／Amex／JCB）、Alipay、銀聯。送料：¥10,000以上のご注文で全国送料無料、特定商取引法に基づく表記・プライバシーポリシー・利用規約・お問い合わせの全リンクをフッターに掲載しております。今すぐご注文、無料見積もり、サンプル請求はこちらから。`,
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
      ja: '高級名刺 | プロ印刷・即日お見積もり | ZprintPro'
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
    longDescription: `智印云厚身咭片採用400g超厚銅版紙，厚度達標準名片的1.3倍，挺度極佳，手感沈穩厚實，彰顯尊貴品質。配合四色柯式印刷，網點細膩，色彩飽和。表面可選啞膠或光膠覆膜，亦可追加燙金或壓紋工藝。特別適合高端服務業、設計師、律師等需要展現專業權威的專業人士。成品標準85×54mm，邊角經過加壓處理不易翹曲。我們提供免費打樣與色彩確認服務。與分類頁內容一致，材質關鍵詞包含：400g銅版紙、厚身咭片、覆膜、燙金、壓紋。<h3>咭片克重對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">規格</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">質感</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用人群</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g 標準</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">一般商務、初創</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g 厚身</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">設計師、律師、高端服務</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g 特厚</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">奢侈品牌、VIP卡</td></tr></tbody></table><h3>咭片克重對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">規格</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">質感</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用人群</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g 標準</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">一般商務、初創</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g 厚身</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">設計師、律師、高端服務</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g 特厚</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">奢侈品牌、VIP卡</td></tr></tbody></table>

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Thick Business Cards use 400g ultra-thick glossy paper—1.3× standard thickness—with exceptional rigidity and a substantial, prestigious feel. Paired with 4-color offset printing for fine halftones and saturated color. Surface options include matte or gloss lamination, plus foil stamping or embossing. Ideal for high-end service professionals, designers, and lawyers. Standard 85×54mm with reinforced edges. Free sampling and color confirmation.<h3>Business Card GSM Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Weight</th><th class="p-2 text-center">Rigidity</th><th class="p-2 text-center">Feel</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">300g Standard</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">General business, startups</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">400g Thick</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Designers, lawyers, premium</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">600g Ultra</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Luxury brands, VIP cards</td></tr></tbody></table>`,
    longDescriptionJa: `厚紙名刺をZprintProでご注文。400g超厚コート紙、両面カラー、厚紙名刺でプレミアム感を演出。デザイナー・弁護士・高級サービス業様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '厚紙名刺(400g) | プロ印刷・即日お見積もり | ZprintPro'
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
    longDescription: `智印云燙金燙銀咭片採用300g高級銅版紙或棉質紙，配合四色柯式印刷與局部燙金工藝，在光線下呈現金屬光澤，瞬間提升品牌奢華感。可燙金色、銀色、玫瑰金等多種顏色，燙印區域精準控制在0.5mm以上線寬，確保細節清晰不糊。表面可選啞膠或光膠覆膜保護燙印層。適合高端品牌、奢侈品代理、珠寶及金融服務業。成品尺寸85×54mm，支援圓角模切。與分類頁內容一致，材質關鍵詞包含：燙金咭片、銅版紙、棉質紙、覆膜。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Foil Stamped Business Cards use 300g premium glossy or cotton paper with 4-color offset printing and foil stamping. Metallic shine under light instantly elevates brand luxury. Available in gold, silver, and rose gold with stamping precision at 0.5mm+ line width. Matte or gloss lamination protects the foil layer. Ideal for premium brands, luxury agents, jewelry, and financial services. Standard 85×54mm with optional rounded corners.`,
    longDescriptionJa: `箔押し名刺をZprintProでご注文。金箔・銀箔・銅箔の3色対応で、光沢と立体感が際立つプレミアム名刺です。光の下で輝く金属光沢がブランドの世界観を演出し、役員・弁護士・医師・不動産・ハイエンドB2B営業向けに最適です。【箔押し技術】K100%パスで鮮明な箔押しエリアを実現、金銀銅のほか青箔・赤箔・ホログラム箔も対応。箔の見本はサンプル請求で無料送付いたしますので、実物をご確認ください。【厚紙選択】300g・400g・600gの3種の厚紙から選択、マット/グロスラミネートで箔層を保護し長期使用でも箔剥がれを防止。【同時施工】スポットUV（部分的光沢）、エンボス/デボス（凹凸ロゴ）、角丸加工（R3mm/R6mm）と同時施工可能。デザインに応じてスタッフが最適な加工方法をご提案いたします。【ターゲット】役員名刺（黒+金箔）・不動産・弁護士向け（紺+銀箔）・美容・ラグジュアリー向け（白+ホログラム）の業界別デザイン事例も豊富。【データ入稿】Illustrator の場合、別レイヤーにK100%で箔押しエリアのパスを作成。入稿前にスタッフが無料でデータチェックを行います。【納期】100枚から対応、最短5営業日で出荷。500枚以上は7-10営業日。角丸加工や特殊紙の場合はさらに2-3日かかる場合がございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '箔押し名刺 | プロ印刷・即日お見積もり | ZprintPro'
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
    longDescription: `智印云UV局部光油咭片採用300g銅版紙或合成紙，配合四色柯式印刷與局部UV光油工藝，讓Logo或圖案呈現立體光澤效果，視覺衝擊力強。UV層厚度約20–30微米，耐磨耐刮且防水，與周圍啞面形成強烈質感對比。適合創意行業、設計公司、廣告代理及科技初創。成品尺寸85×54mm，可選圓角或直角。與分類頁內容一致，材質關鍵詞包含：局部UV咭片、銅版紙、合成紙、光油。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Spot UV Business Cards use 300g glossy or synthetic paper with 4-color offset printing and spot UV coating. Logos and designs gain dimensional gloss with strong visual impact. The UV layer at 20–30 microns is abrasion-resistant, scratch-proof, and water-resistant, creating a striking texture contrast against the matte surround. Ideal for creative industries, design firms, ad agencies, and tech startups. Standard 85×54mm.`,
    longDescriptionJa: `スポットUV名刺をZprintProでご注文。300gコート紙+スポットUV加工、ロゴやデザインに立体的な光沢効果を演出。クリエイティブ業界・デザイン事務所・テックスタートアップ様向け。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '局部UV名刺 | プロ印刷・即日お見積もり | ZprintPro'
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
    longDescription: `智印云啞膠咭片採用300g啞粉紙或環保紙，配合四色柯式印刷與啞膠覆膜工藝，表面絲滑細膩、低調內斂，不易留下指紋與反光，適合注重細節的專業人士。啞膠層厚度均勻，有效保護印刷面免受磨損，同時提升觸感層次。可選局部燙金或壓凹作為點綴。適合顧問業、會計師、法律界及醫療專業人士。成品尺寸85×54mm。與分類頁內容一致，材質關鍵詞包含：啞膠咭片、啞粉紙、環保紙、覆膜。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Matte Laminated Cards use 300g matte art or eco paper with 4-color offset printing and matte lamination. The silky, understated surface resists fingerprints and glare—ideal for detail-oriented professionals. The uniform lamination layer protects the print from wear while enhancing tactile depth. Optional foil stamping or debossing accents available. Ideal for consultants, accountants, legal, and medical professionals. Standard 85×54mm.`,
    longDescriptionJa: `マット名刺をZprintProでご注文。300gマットアート紙+マットPP加工、指紋や反射を防ぐ落ち着いた表面を実現。コンサルタント・会計士・法律・医療専門家様向け。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'マット名刺 | プロ印刷・即日お見積もり | ZprintPro'
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
    longDescription: `智印云圓角咭片採用300g銅版紙或藝術紙，配合四色柯式印刷與R3mm圓角模切工藝，邊角柔和美觀且不易折損，展現與眾不同的品味。圓角處理經過精密刀模，邊緣光滑無毛刺。表面可選啞膠或光膠覆膜，亦可追加燙金或局部UV作為點綴。特別適合創意產業、設計師、品牌顧問及藝術工作者。成品標準85×54mm。與分類頁內容一致，材質關鍵詞包含：圓角咭片、銅版紙、藝術紙、覆膜。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Rounded Corner Cards use 300g glossy or art paper with 4-color offset printing and R3mm rounded corner die-cutting. The soft, aesthetic corners resist damage and show distinctive taste. Corners are precisely die-cut with smooth, burr-free edges. Surface options include matte or gloss lamination with optional foil stamping or spot UV accents. Ideal for creative industries, designers, brand consultants, and artists. Standard 85×54mm.`,
    longDescriptionJa: `丸角名刺をZprintProでご注文。300gコート紙+R3mm丸角ダイカット、柔らかく美しいコーナーで折れにくい設計。クリエイター・デザイナー・ブランドコンサルタント様向け。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '丸角名刺 | プロ印刷・即日お見積もり | ZprintPro'
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
    longDescription: `智印云防水貼紙採用 PVC 或 PP 合成紙面材，配合耐水油墨與可選光膜／啞膜覆膜，適合香港潮濕氣候與短暫戶外曝曬。常用於電器標籤、食品外包裝貼、外賣杯貼、工具箱標示及工地設備貼紙。我們支援異形模切與可變序號／QR Code，方便批次管理與防偽。印前建議預留模切出血與最小線寬，避免細線在模切時斷裂。小批量數碼印刷可快速打樣，大批量可轉柯式以壓低單價。與分類頁內容一致，材質關鍵詞包含：防水 PVC 貼紙、PP 合成紙、銅版紙貼紙、覆膜（啞膜／光膜）、模切。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro waterproof stickers use PVC or PP synthetic facestock with water-resistant inks and optional gloss or matte lamination—suited to Hong Kong humidity and short outdoor exposure. Typical uses include appliance labels, outer food packaging decals, takeaway cup stickers, toolbox markings, and on-site equipment tags. We support die-cut shapes plus variable serial numbers or QR codes for batch control and anti-counterfeiting. Prepress: allow kiss-cut bleed and minimum line width so fine lines survive cutting. Digital suits low MOQ and fast sampling; offset becomes economical at higher volumes. Terminology aligns with our category pillar content: waterproof PVC stickers, PP synthetic paper, art paper stickers, lamination (matte/gloss), die-cutting.`,
    longDescriptionJa: `当サービスでは防水ステッカー印刷 業者として、PVCまたはPP合成紙の面材に耐水インクを組み合わせ、グロス／マットラミネートで防水・防晒・耐磨耗性能を強化した高品質なステッカーをご提供しています。日本向け最適化としてISO 9001認証取得済みの香港自社工場で印刷し、国内検品・税込表示・日本語サポート体制を整えております。

防水 ラベル 印刷 ネット注文の利便性。10枚からご注文可能で、100枚以上で20%オフ、500枚以上で35%オフの段階割引。最短3営業日で全国出荷、東京・大阪・名古屋へは翌日配送、ヤマト運輸・佐川急便・日本郵便（EMS）での追跡発送。Visa／Master／JCB／Alipay／銀聯対応、JPY（日本円）建てで明朗会計。

ステッカー 変形 カット 印刷にも対応。円形・四角・オリジナル形状・ハート型・キャラクターシルエットなど、変形ダイカットを完全サポート（一部有料）。カットラインはプロデザイナーが印前無料で確認し、細線の断裂リスクを事前にチェック。最小サイズ10×10mmから最大300×400mmまで、データ形式はIllustrator・PDF・PNG・JPGに対応します。

オリジナル ステッカー 印刷 激安をご希望の方へ。コストパフォーマンスに優れたPVC・PP・クラフト紙・蛍光紙の素材ラインアップを取り揃え、食品ラベル・商品タグ・屋外サイン・テイクアウトカップ・工具箱表示・車体デカールなど多様な用途に対応。可変QRコード・連番印刷にも対応し、ロット管理や偽造対策も万全です。UVカットインクと防水ラミネート加工により、屋外3年以上の色持ちを保証します。

ステッカー 印刷 失敗 例として多い「カットラインの断裂・粘着力低下・印刷かすれ」を防ぐため、当サービスでは入稿前の無料データチェック、糊面の温度管理、ブリード確保を全ご注文で実施。最小線幅0.3mm以上、型抜き安全距離0.5mm以上、糊種類（永久・再剥離・強粘着）の使い分けまで専門スタッフがご案内いたします。

運営会社：ZprintPro Limited（香港本社・観塘）。所在地：香港九龍観塘偉業街82号成運工業ビル。受付時間：平日 9:00-18:00（日本時間）。送料：¥10,000以上のご注文で全国送料無料、特定商取引法に基づく表記・プライバシーポリシー・利用規約・お問い合わせの全リンクをフッターに掲載。今すぐご注文、無料見積もり、サンプル請求はこちらから。`,
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
      ja: '防水ステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `透明 PET 貼紙在玻璃瓶、塑膠瓶與透明包裝上能呈現「無底紙感」，僅保留圖案與文字，特別適合美妝精華、香水、飲品與禮盒封口貼。白墨托底可選，用於深色瓶身仍能還原飽和色彩。建議避免過細的反白線條，並為模切預留安全距離。可搭配啞膜減少指紋、光膜提升鮮豔度。與分類頁術語一致：透明 PET、局部 UV、覆膜、模切。香港零售與展會陳列常見應用包括試用裝標籤與限量貼紙。<h3>貼紙材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">透明度</th><th class="p-2 text-center">防水性</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">透明 PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">瓶身標籤、禮盒封條</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC 防水</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">戶外標籤、食品外賣</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">促銷貼紙、臨時標籤</td></tr></tbody></table><h3>貼紙材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">透明度</th><th class="p-2 text-center">防水性</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">透明 PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">瓶身標籤、禮盒封條</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC 防水</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">戶外標籤、食品外賣</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">促銷貼紙、臨時標籤</td></tr></tbody></table>

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Transparent PET stickers read nearly “label-free” on glass, plastic, or clear packaging—ideal for serums, perfumes, beverages, and gift seals. Optional white underprint keeps colors vivid on dark bottles. Avoid hairline reverse text and keep safe margins for die-cutting. Matte lamination reduces fingerprints; gloss boosts saturation. Terms match category content: clear PET, spot UV, lamination, die-cutting. Common in Hong Kong retail sampling and exhibition displays.<h3>Sticker Material Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Material</th><th class="p-2 text-center">Clarity</th><th class="p-2 text-center">Waterproof</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">Clear PET</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Bottle labels, gift seals</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">PVC Waterproof</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Outdoor labels, food delivery</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">Art Paper</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Promotional stickers, temporary labels</td></tr></tbody></table>`,
    longDescriptionJa: `透明ステッカーをZprintProでご注文。PET素材+防水・防晒・耐磨耗+プロ4色印刷+変形カット対応のプレミアム透明ステッカー印刷です。食品ブランド・化粧品・商品ラベル・容器装飾・アーティスト・クリエイター向けに、無地感ラベルやガラス容器でのラベルレス効果を実現します。【素材】PET（透明/乳白半透明/艶消し）、接着剤は一般強粘着/再剥離/耐水強粘着から選択。【サイズ】最小20mm～最大300mmまで対応。【印刷方式】顔料インクUV印刷（耐候性◎）、CMYK+特色（白インク/メタリック）対応。透明フィルムに白を下刷りして上からCMYK印刷することで、透明素材でも発色鮮明に再現できます。【カット】標準カット（四角/円/楕円）、変形カット（オリジナル形状/型抜き）、部分型抜き対応。Cut lineパスを含めてIllustrator/PDFでご支給ください。【屋外耐久性】PET素材+UVインクで3年以上、直射日光・雨風に強く自動車ボディや屋外看板にも対応可能。【利用シーン】商品ラベル（食品/化粧品/雑貨）、容器装飾（ボトル/ジャー/ガラス容器）、アート・クリエイター作品、店舗装飾（窓・ショーケース）。【納期】20枚から対応（個人のクリエイター少量制作から、法人商品ラベルの10,000枚大量発注まで対応）、最短3営業日で出荷。500枚以上の大量発注は5-7営業日。変形カットや白インク印刷を含む場合はさらに1-2日かかる場合がございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '透明ステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `智印云可移貼紙採用可移除性壓敏膠，面材以 PP 合成紙或 PET 透明膜為主，移除時不殘膠、不傷漆面，特別適合香港車窗、商場玻璃櫥窗、短期展覽及租房裝飾。膠水經過 24 小時初黏／72 小時持黏測試，在光滑表面可重複張貼 3–5 次。我們支援異形模切與可變序號，方便活動分區管理。印前請確認稿件不含細於 0.5mm 的線條，避免模切時斷裂。小批量數碼印刷可當日打樣，大批量轉柯式可降低單價至 HK$0.3 以下。與分類頁內容一致，材質關鍵詞包含：可移膠貼紙、PP 合成紙、PET 透明貼紙、模切、覆膜。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro removable stickers use repositionable pressure-sensitive adhesive with PP synthetic or PET clear film facestock. They peel off cleanly without residue or surface damage—ideal for Hong Kong car windows, retail glass displays, short-term exhibitions, and rental decorations. The adhesive passes 24-hour tack and 72-hour adhesion tests, allowing 3–5 repositions on smooth surfaces. We support die-cut shapes and variable serial numbers for event zone management. Prepress: avoid lines finer than 0.5mm to prevent cutting breakage. Digital printing enables same-day sampling; offset reduces unit cost below HK$0.3 at volume. Terminology aligns with category content: removable adhesive stickers, PP synthetic paper, PET clear stickers, die-cutting, lamination.`,
    longDescriptionJa: `はがせるステッカーをZprintProでご注文。再剥離性粘着剤+PP合成紙/PET透明フィルム、剥がしても残りや表面傷なし。車窓・商業施設ガラス展示・賃貸装飾様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'はがせるステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `智印云小批量貼紙專為初創品牌、獨立設計師及短期活動而生，最低 A4 尺寸起印，無需承擔大量庫存壓力。面材涵蓋銅版紙、合成紙、透明 PVC 及 Kraft 牛皮紙，配合四色數碼印刷，色彩還原度達 Delta E ≤3。我們提供免費刀模設計與印前檢查，支援圓角、異形模切與局部燙金。對於需要快速迭代包裝的電商賣家，小批量貼紙可在 1–2 個工作日內交付，並可配合可變資料印刷實現限量編號。與分類頁內容一致，材質關鍵詞包含：銅版紙貼紙、PP 合成紙、透明 PVC、模切、燙金。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro small-batch stickers are designed for startups, indie designers, and short-term events. Minimum order starts at A4 size with no bulk inventory pressure. Facestock options include art paper, synthetic paper, clear PVC, and kraft paper, paired with 4-color digital printing achieving Delta E ≤3 color accuracy. We offer free die-cut design and prepress checks, supporting rounded corners, custom die-cutting, and spot foil stamping. For e-commerce sellers needing rapid packaging iteration, small-batch stickers deliver in 1–2 working days and support variable data printing for limited edition numbering. Terminology aligns with category content: art paper stickers, PP synthetic paper, clear PVC, die-cutting, foil stamping.`,
    longDescriptionJa: `小ロットステッカーをZprintProでご注文。A4サイズから小ロット対応、4色デジタル印刷でDelta E≤3の色再現。スタートアップ・インディーデザイナー・EC売家様向け。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '小ロットステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `異形模切貼紙以刀模沿設計外輪廓裁切，可呈現吉祥物、品牌剪影、不規則標籤等強烈辨識度，常見於文創周邊、咖啡杯貼、手機殼裝飾貼與活動贈品。材質可選 PVC 防水、PP 合成紙或透明 PET，並可覆啞膜／光膜提升耐用。模切時需預留足夠線寬與橋位，避免細節斷裂；吻切（Kiss-cut）方案可保留底紙方便撕取。與分類頁一致關鍵詞：異形模切、覆膜、可變資料。適合需要「一眼認品牌」的包裝與線下推廣物料。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Die-cut stickers follow your outline for mascot shapes, logo silhouettes, or irregular labels—popular for creative merch, cup decals, phone skin accents, and event giveaways. Facestock options include waterproof PVC, PP synthetic, or clear PET, with matte or gloss lamination for durability. Allow adequate stroke width and bridges to avoid fragile cuts; kiss-cut keeps a liner for easy peeling. Keywords align with category content: die-cutting, lamination, variable data. Ideal when brand recognition must be instant at shelf or street level.`,
    longDescriptionJa: `ダイカットステッカーをZprintProでご注文。オリジナル形状カット+マット/グロスラミ、識別度の高いロゴシルエットを実現。文創グッズ・カップデコ・イベントノベルティ様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '型抜きステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `燙金貼紙在光線下呈現金屬光澤，常用於節慶禮盒封口、精品酒標、美妝外盒貼與會議胸貼。可選燙金／燙銀／玫瑰金等色箔，建議與深底色或局部留白搭配以凸顯金屬層次。面材多為銅版紙或合成紙並可覆啞膜保護箔面。設計需預留燙金稿與印刷稿對位線；細字燙金需評估可製性。與分類頁術語一致：燙金／燙銀、局部 UV、覆膜、模切。適合需要「儀式感與禮贈感」的品牌物料。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Foil stickers deliver metallic shine for festive seals, premium wine labels, beauty outer wraps, and conference badges. Choose gold, silver, rose gold, etc., often paired with deep backgrounds or reserved white space. Facestock is typically art or synthetic paper with matte lamination to protect foil. Supply separate foil layers and print registration marks; very small type may need feasibility review. Terms align with category content: foil stamping, spot UV, lamination, die-cutting—ideal for gift-worthy brand touchpoints.`,
    longDescriptionJa: `箔押しステッカーをZprintProでご注文。箔押し加工+マットラミ保護で光に輝く金属光沢を実現。ギフト封・高級ワインラベル・化粧外装・会議バッジ様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '箔押しステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `防偽貼紙結合易碎紙、VOID 開封留字、雷射全息或微縮文字等工藝，用於保修封條、高價電子產品封貼、證書邊貼與渠道竄貨管理。易碎材質一經撕起即產生破壞痕跡，可有效嚇阻換件與仿冒；可變 QR 與流水號便於追溯。設計需考慮貼附表面粗糙度與溫差。與分類頁一致：易碎貼紙、防偽、可變資料。適合重視渠道合規與售後責任的品牌商。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Security stickers combine destructible paper, VOID reveal text, holographic film, or microtext for warranty seals, high-value electronics, certificate edges, and channel integrity. Destructible stocks show tamper evidence once lifted; variable QR and serials aid traceability. Design must consider surface texture and temperature swings. Terms align with category content: destructible stickers, anti-counterfeit, variable data—ideal for compliance-focused brands.`,
    longDescriptionJa: `セキュリティステッカーをZprintProでご注文。易碎紙/VOID/ホログラム/微細文字の組み合わせで剥がすと破壊痕が残り偽造抑止。保証シール・高額機器・証書・流通管理様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'セキュリティステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `智印云螢光貼紙採用高飽和度螢光油墨印刷於 PVC 或螢光紙面材，在日光及紫外線照射下呈現強烈視覺衝擊，特別適合促銷標籤、安全警示標識及夜店活動裝飾。油墨通過 SGS 遷移測試，不含重金屬，可應用於室內外短期展示。我們支援異形模切與反光條紋組合設計，提升夜間可見度。印前建議使用高對比度配色，避免細小文字低於 6pt 導致糊字。小批量數碼印刷當日可取，大批量柯式印刷可壓低單價。與分類頁內容一致，材質關鍵詞包含：螢光 PVC 貼紙、螢光紙、反光膜、模切。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro fluorescent stickers use high-saturation fluorescent inks printed on PVC or fluorescent paper facestock, delivering strong visual impact under daylight and UV light. Ideal for promotional labels, safety warning signs, and nightclub event decoration. Inks pass SGS migration testing, are heavy-metal-free, and suitable for short-term indoor and outdoor display. We support die-cut shapes combined with reflective stripe designs to enhance nighttime visibility. Prepress: use high-contrast color schemes and avoid text smaller than 6pt to prevent blurring. Same-day digital printing for small batches; offset printing reduces unit cost at volume. Terminology aligns with category content: fluorescent PVC stickers, fluorescent paper, reflective film, die-cutting.`,
    longDescriptionJa: `蛍光ステッカーをZprintProでご注文。高彩度蛍光インク+PVC/蛍光紙で日光や紫外線下で強い視覚的インパクト。プロモーション・安全警告・ナイトクラブイベント装飾様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '蛍光ステッカー | 防水対応・オリジナル形状 | ZprintPro'
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
    longDescription: `牛皮紙袋以未漂白或半漂白牛皮紙為主，呈現自然纖維質感，是香港文創、咖啡烘焙與輕食外帶最常見的環保購物袋選擇。可搭配棉繩／紙繩手挽、底部加固與側邊折位，提升承重與提拿舒適度。印刷可採單色簡約或四色滿版，亦可加燙金 Logo 提升禮品感。與分類頁術語一致：牛皮紙袋、白卡紙袋、燙金、局部 UV、手挽。建議依袋型預留糊位與出血，並在報價時確認克重（常見 120–200g）與是否需要食品級聲明。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Kraft paper bags use unbleached or semi-bleached kraft stock for an authentic fiber look—popular with Hong Kong cafés, bakeries, and lifestyle retail. Pair with cotton or paper rope handles, base reinforcement, and gussets for better load comfort. Print from bold one-color identities to four-color coverage; foil logos add gifting appeal. Terms align with category content: kraft bags, white card bags, foil stamping, spot UV, handles. Specify glue flap, bleed, and typical weight (often 120–200gsm) plus any food-contact notes when quoting.`,
    longDescriptionJa: `クラフト紙袋をZprintProでご注文。未晒/半晒クラフト+綿紐/紙紐、自然な繊維感で香港のカフェ・ベーカリー・ライフスタイル店に人気。1色から4色+箔押しロゴ対応。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'クラフト紙袋 | エコ素材対応・小ロットOK | ZprintPro'
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
    longDescription: `白卡紙袋表面平滑、挺度高，四色印刷色彩飽和，是美妝、珠寶與精品服飾首選的「可行走廣告」。可搭配啞膠／光膠覆膜保護墨層，並以燙金、局部 UV 或凹凸壓紋強化 Logo 層次。手挽可選緞帶、棉繩或扁紙手挽以匹配品牌調性。與分類頁一致：白卡紙、燙金、覆膜、手挽。建議在刀模階段確認穿孔位與圖案安全距離，避免提袋時撕裂；大批量可評估柯式以降低單價。<h3>紙袋材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">印刷效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">白卡紙袋</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">美妝、珠寶、精品服飾</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">牛皮紙袋</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">文創、咖啡、有機食品</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙袋</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">百貨專櫃、促銷活動</td></tr></tbody></table><h3>紙袋材質對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">材質</th><th class="p-2 text-center">挺度</th><th class="p-2 text-center">印刷效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">白卡紙袋</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">美妝、珠寶、精品服飾</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">牛皮紙袋</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">文創、咖啡、有機食品</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">銅版紙袋</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">百貨專櫃、促銷活動</td></tr></tbody></table>

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `White card bags offer a smooth, stiff surface with vibrant four-color printing—ideal walking billboards for beauty, jewelry, and premium apparel. Add matte or gloss lamination to protect ink, plus foil, spot UV, or embossing to elevate the logo. Handles range from ribbon to cotton or flat paper to match brand tone. Terms align with category content: white card, foil stamping, lamination, handles. Validate punch positions and safe margins at die stage; offset suits higher volumes for unit economics.<h3>Paper Bag Material Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Material</th><th class="p-2 text-center">Rigidity</th><th class="p-2 text-center">Print Quality</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">White Card Bag</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Beauty, jewelry, premium fashion</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">Kraft Paper Bag</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Lifestyle, coffee, organic food</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">Art Paper Bag</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Department stores, promotions</td></tr></tbody></table>`,
    longDescriptionJa: `白卡紙袋をZprintProでご注文。平滑で高剛性の白卡紙+フルカラー印刷+箔押し/局部UV/エンボス。美容・宝飾・プレミアムアパレル様の贈答・小売に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '白カード紙袋 | エコ素材対応・小ロットOK | ZprintPro'
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
    longDescription: `禮品紙袋強調開箱儀式感，常見於節慶禮盒、婚慶回禮、企業福袋與品牌周邊。紙材可選白卡、特種紋理紙或帶珠光效果，再配燙金祝福語、局部 UV 圖案與緞帶手挽。袋身可加大底部與側邊寬度以容納禮盒。與分類頁一致：禮品紙袋、燙金、絲帶手挽、覆膜。設計上宜控制大面積深色透底風險，並預留手挽穿孔加固；急件可拆數碼標簽與袋身印刷分段排產。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Gift bags emphasize unboxing ritual—common for festive sets, wedding favors, corporate gift packs, and merch bundles. Stocks include white card, textured specialty, or pearlescent papers with foil greetings, spot UV accents, and ribbon handles. Widen base and gussets to fit rigid gift boxes. Terms align with category content: gift bags, foil stamping, ribbon handles, lamination. Manage heavy ink coverage to avoid show-through; reinforce handle punches; split digital labels vs bag print for rush schedules when needed.`,
    longDescriptionJa: `ギフト紙袋をZprintProでご注文。白卡・テクスチャ・パール系に箔押し・局部UV+リボン持ち手で開封の儀式感を高める。季節ギフト・結婚引き出物・企業福袋様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ギフト紙袋 | エコ素材対応・小ロットOK | ZprintPro'
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
    longDescription: `環保紙袋可採 FSC 認證牛皮或再生纖維紙材，搭配大豆油墨與可降解手挽，向消費者傳遞 ESG 與減塑承諾。外觀仍可透過單色凸版、水印圖騰或簡潔四色保持品牌辨識。適合有機零售、社企禮包與活動贈袋。與分類頁一致：環保再生紙、牛皮紙袋、手挽。報價時請確認紙張認證標示與印刷方式是否符合出口或商場對可持續包裝的要求。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Eco paper bags can use FSC-certified kraft or recycled fiber with soy inks and compostable handles to signal ESG commitments. Visual identity can stay bold via letterpress-style solids, watermark motifs, or restrained four-color work—ideal for organic retail, social-enterprise kits, and event giveaways. Terms align with category content: recycled paper, kraft bags, handles. Confirm certification marks on artwork and whether print processes meet mall or export sustainability rules.`,
    longDescriptionJa: `エコ紙袋をZprintProでご注文。FSC認証クラフト/再生紙+大豆インク+分解性持ち手でESG訴求。オーガニック小売・社企キット・環境に配慮したブランド様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'エコ紙袋 | エコ素材対応・小ロットOK | ZprintPro'
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
    longDescription: `智印雲手挽紙袋以穿孔加打釘或內折加固方式固定棉繩或扁紙手挽，承重優於細繩款式，可達 8-12 公斤。紙材可選 250g-300g 牛皮紙或白卡紙並加底卡加固。**香港本地常見場景**：超市量販、服飾兩件裝、品牌活動資料袋、外賣店打包袋。48 小時快遞、免費打樣、觀塘門市自取。**智印雲 香港獨立品牌（非智印港）**：可加燙金 Logo、UV 圖案、PP 繩提手。已為 31 間香港零售品牌印製活動禮品袋。建議在設計稿標示穿孔中心與最大載重測試需求；雨季可評估覆膜防潮加值服務。`,
    longDescriptionEn: `Handle paper bags use riveted or folded reinforcements for cotton or flat paper handles—stronger than thin twine options for supermarket volumes, apparel twin-packs, or event kits. Kraft or white card stocks with base inserts improve load. Terms align with category content: paper rope, cotton rope, flat paper handles, reinforced base. Mark punch centers and target load tests on artwork; consider lamination for rainy-season protection.`,
    longDescriptionJa: `手提げ紙袋をZprintProでご注文。穿孔+リベットや折り補強で綿紐/平紐を固定し耐荷重向上。クラフト/白卡に底補強で量販・衣料同梱・イベント資料用に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '手提げ紙袋 | エコ素材対応・小ロットOK | ZprintPro'
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
    longDescription: `智印云大號紙袋專為服裝、鞋類及大型禮品包裝設計，展開尺寸可達 320×120×380mm，底部採用加固車縫與貼底工藝，承重提升至 8–10 公斤。面材可選 250g 白卡紙、300g 牛皮紙或 280g 特種紋理紙，配合四色柯式印刷，色彩飽和且不易褪色。手挽提供棉繩、紙繩、緞帶及仿皮繩四種選擇，顏色可與袋身 Pantone 對色。我們提供免費結構設計與打樣，確保承重與美觀兼具。與分類頁內容一致，材質關鍵詞包含：白卡紙袋、牛皮紙袋、特種紙袋、燙金、擊凸、手挽繩。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro large paper bags are designed for clothing, footwear, and large gift packaging, with expanded dimensions up to 320×120×380mm. The base uses reinforced stitching and bottom-pasting construction, increasing load capacity to 8–10kg. Facestock options include 250g white card, 300g kraft paper, or 280g specialty textured paper, paired with 4-color offset printing for saturated, fade-resistant color. Handle choices include cotton rope, paper rope, satin ribbon, and faux leather cord, with colors Pantone-matched to the bag body. We provide free structural design and prototyping to ensure both load capacity and aesthetics. Terminology aligns with category content: white card bags, kraft paper bags, specialty paper bags, foil stamping, embossing, handle ropes.`,
    longDescriptionJa: `大判紙袋をZprintProでご注文。展開サイズ最大320×120×380mm、底部補強縫製+貼り底工法で8-10kg耐荷重。衣類・靴・大型ギフト包装向けに最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '大判紙袋 | エコ素材対応・小ロットOK | ZprintPro'
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
    longDescription: `智印云A4宣傳單張採用157g高級銅版紙或128g啞粉紙，配合四色柯式或數碼印刷，色彩飽和、圖文清晰。A4尺寸（210×297mm）是香港最通用的宣傳單張規格，適合產品推廣、活動宣傳、課程招生及新店開幕。可選單面或雙面印刷，雙面容量翻倍。我們提供免費排版與出血檢查，確保裁切後文字不被切掉。與分類頁內容一致，材質關鍵詞包含：A4單張、銅版紙、啞粉紙、四色印刷。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro A4 Flyers use 157g premium glossy or 128g matte art paper with 4-color offset or digital printing for saturated color and crisp text. A4 size (210×297mm) is Hong Kong's most common flyer format—ideal for product promotion, event advertising, course enrollment, and grand openings. Single or double-sided printing available. Free layout and bleed checks ensure text isn't trimmed.`,
    longDescriptionJa: `A4チラシをZprintProでご注文。157g高級コート紙+4色オフセット+A4サイズ（210×297mm）で香港で最も一般的なチラシ形式。製品プロモーション・イベント広告・コース募集・新店オープン様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'A4チラシ | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `智印云A5宣傳單張採用128g銅版紙或100g書紙，配合四色數碼印刷，經濟實惠且色彩鮮豔。A5尺寸（148×210mm）適合大量派發，成本較A4降低約40%，是餐飲外賣、快閃活動及社區宣傳的首選。可選單面或雙面印刷，並支援二維碼與優惠券設計。我們提供免費排版與出血檢查，確保裁切精準。與分類頁內容一致，材質關鍵詞包含：A5單張、銅版紙、書紙、數碼印刷。<h3>傳單尺寸對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">尺寸</th><th class="p-2 text-center">資訊容量</th><th class="p-2 text-center">派發效率</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">詳細產品目錄、課程介紹</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">餐飲外賣、活動宣傳</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">街頭派發、外賣插頁</td></tr></tbody></table><h3>傳單尺寸對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">尺寸</th><th class="p-2 text-center">資訊容量</th><th class="p-2 text-center">派發效率</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用場景</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">詳細產品目錄、課程介紹</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">餐飲外賣、活動宣傳</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">街頭派發、外賣插頁</td></tr></tbody></table>

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro A5 Flyers use 128g glossy or 100g book paper with 4-color digital printing—economical yet vibrant. A5 size (148×210mm) is perfect for mass distribution at ~40% lower cost than A4. First choice for food delivery, flash events, and community outreach. Single or double-sided with QR code and coupon design support.<h3>Flyer Size Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Size</th><th class="p-2 text-center">Info Capacity</th><th class="p-2 text-center">Distribution</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Product catalogs, course guides</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">Food delivery, event promos</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Street handouts, takeaway inserts</td></tr></tbody></table>`,
    longDescriptionJa: `当サービスではA5チラシ印刷 即日対応にこだわり、128gコート紙または100g上質紙を採用し、4色デジタル印刷で経済性と鮮やかな発色を両立させています。A5サイズ（148×210mm）はA4より約40%のコスト削減となり、飲食店・カフェ・小売店・コミュニティイベント主催者にとって大量配布の第一選択です。

A5 チラシ 印刷 激安をお求めの方へ。コストパフォーマンスに優れた価格設定で、100枚からご注文可能、1,000枚以上で30%以上OFF、5,000枚以上でさらに大幅割引。業界最安値に挑戦する明朗会計で、隠し料金なしの税込価格表示。香港自社工場からDHL／FedEx／EMSで最短3営業日出荷、東京・大阪・名古屋・福岡へは翌日配送対応。ヤマト運輸・佐川急便での追跡発送もご選択いただけます。

A5 フライヤー ネット注文の利便性。完全オンライン対応で、デザイン入稿から見積もり・決済・配送状況確認までワンストップ。Visa／Master／JCB・Alipay・銀聯・コンビニ決済など多様な支払方法に対応。JPY（日本円）建てで明朗会計、為替手数料の心配不要です。データ形式はIllustrator・PDF・PNG・JPGに対応、入稿前の無料データチェックで色ズレやブリード不足を事前に検出します。

A5 チラシ 印刷 業者をお探しの皆様に。当サービスはISO 9001認証取得、FSC認証紙対応、国内検品体制、日本語サポート（平日9:00-18:00日本時間）、特定商取引法に基づく表記完備と、日本市場向けに最適化された印刷業者です。片面・両面印刷どちらも同一料金、用紙は標準157gコート紙のほか、90g薄紙・200g厚紙・光沢紙・マット紙・アート紙など6種類から選べます。

A5 チラシ 印刷 テンプレート 無料をご希望の方へ。飲食・カフェ・美容室・不動産・スクール・クリニックなど業種別テンプレートを100種以上ご用意。デザイン作成サービスも3案まで無料対応、初めての方でも短時間でプロ品質の仕上がりに。

<h3>チラシサイズ比較スコアカード</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">サイズ</th><th class="p-2 text-center">情報量</th><th class="p-2 text-center">配布効率</th><th class="p-2 text-center">コスト</th><th class="p-2 text-left">おすすめ用途</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">A4 (210×297mm)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">製品カタログ、講座案内</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">A5 (148×210mm)</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2">飲食デリバリー、イベント宣伝</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">A6 (105×148mm)</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">街頭配布、テイクアウト挿入</td></tr></tbody></table>

運営会社：ZprintPro Limited（香港本社・観塘）。所在地：香港九龍観塘偉業街82号成運工業ビル。送料：¥10,000以上のご注文で全国送料無料、特定商取引法に基づく表記・プライバシーポリシー・利用規約・お問い合わせの全リンクをフッターに掲載。今すぐご注文、無料見積もり、サンプル請求はこちらから。`,
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
      ja: 'A5チラシ | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `智印云雙面宣傳單張採用157g銅版紙或128g啞粉紙，配合四色雙面柯式印刷，正面吸引眼球，背面詳細介紹，信息容量翻倍。雙面對位精度控制在±0.5mm以內，確保正反圖文精準套印。適合產品目錄、服務介紹、活動詳情及會議資料。可選啞膜或光膜覆膜提升耐用性。我們提供免費排版與對位檢查。與分類頁內容一致，材質關鍵詞包含：雙面單張、銅版紙、啞粉紙、四色雙面印刷。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Double-sided Flyers use 157g glossy or 128g matte paper with 4-color duplex offset printing. Front side grabs attention while the back provides detailed information—doubled content capacity. Front-to-back registration precision within ±0.5mm ensures accurate alignment. Ideal for product catalogs, service introductions, event details, and meeting materials.`,
    longDescriptionJa: `両面チラシをZprintProでご注文。157gコート紙+4色両面オフセット印刷で前後の套印精度±0.5mm以内。表面は注目を集め裏面は詳細情報を提供。情報容量2倍。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '両面チラシ | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `智印云摺疊宣傳單張採用157g或200g銅版紙，配合對摺或三摺設計，展開後可展示更多信息。對摺尺寸為A4展開（210×297mm），三摺為A4展開或DL尺寸（99×210mm）。摺線經過壓線處理，摺疊平整不易反彈。適合產品目錄、服務介紹、餐牌及旅遊宣傳。可選啞膜或光膜覆膜保護摺頁。我們提供免費摺法設計與排版。與分類頁內容一致，材質關鍵詞包含：摺疊單張、對摺、三摺、銅版紙、壓線。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Folded Leaflets use 157g or 200g glossy paper with bi-fold or tri-fold designs. Bi-fold opens to A4 (210×297mm); tri-fold is A4 or DL (99×210mm). Creases are scored for flat, rebound-resistant folding. Ideal for product catalogs, service introductions, menus, and travel brochures. Optional lamination protects folded panels.`,
    longDescriptionJa: `折りたたみパンフレットをZprintProでご注文。157g/200gコート紙+二つ折りまたは三つ折りデザイン+圧線処理で平らに折れる。製品カタログ・サービス紹介・メニュー・旅行パンフレット様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '折りたたみパンフレット | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `智印云厚紙宣傳單張採用200g或250g高級銅版紙，配合四色柯式印刷，紙張挺度高、質感厚實，不易折損或捲曲。厚紙單張在派發時更具份量感，適合高端產品宣傳、房地產樓書、汽車展覽及奢侈品牌活動。可選啞膜或光膜覆膜進一步提升耐用性與質感。我們提供免費色彩校樣，確保批量顏色一致。與分類頁內容一致，材質關鍵詞包含：厚紙單張、200g銅版紙、250g銅版紙、覆膜。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Thick Paper Flyers use 200g or 250g premium glossy paper with 4-color offset printing. High rigidity and substantial texture resist creasing and curling. Thick flyers convey weight and quality—ideal for premium product launches, property brochures, auto shows, and luxury brand events. Optional lamination further enhances durability and texture.`,
    longDescriptionJa: `厚紙チラシをZprintProでご注文。200g/250g高級コート紙+4色オフセット印刷で高い挺度と厚みのある質感を実現。重みのある配布物として高級製品発表・不動産・自動車展示会様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '厚紙チラシ | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `智印云環保宣傳單張採用FSC認證再生紙或大豆油墨印刷，展現企業社會責任與環保形象。紙張為100%再生纖維，觸感自然略帶紋理，適合環保主題活動、NGO宣傳、綠色產品推廣及企業ESG報告。可選單面或雙面印刷，並支援種子紙等特殊環保材質。我們提供碳足跡計算與環保認證標章。與分類頁內容一致，材質關鍵詞包含：環保單張、FSC認證、再生紙、大豆油墨。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Eco Flyers use FSC-certified recycled paper with soy-based inks, showcasing corporate social responsibility and eco-branding. 100% recycled fiber with a natural, slightly textured feel. Ideal for environmental campaigns, NGO outreach, green product launches, and corporate ESG reports. Single or double-sided printing with special options like seed paper. Carbon footprint calculation and eco-certification labels available.`,
    longDescriptionJa: `エコチラシをZprintProでご注文。FSC認証リサイクル紙+大豆インクで100%再生繊維の自然なテクスチャー。環境キャンペーン・NGOアウトリーチ・グリーンプロダクトローンチ・企業ESGレポート様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'エコチラシ | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `智印云即日宣傳單張採用157g銅版紙，配合四色高速數碼印刷，從接稿到出貨最快4小時完成。適合緊急活動、突發促銷、新聞發布及臨時會議資料。我們提供專人急件通道，確保稿件優先處理，並可配合即日快遞或專人送貨。雖然是急單，但我們仍堅持色彩校準與出血檢查，確保品質不打折。與分類頁內容一致，材質關鍵詞包含：即日單張、數碼印刷、急件、銅版紙。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Same-day Flyers use 157g glossy paper with high-speed 4-color digital printing— from file receipt to shipment in as fast as 4 hours. Ideal for emergency events, flash sales, press releases, and last-minute meeting materials. Dedicated rush handling ensures priority processing with same-day courier or personal delivery. Despite the rush, we maintain color calibration and bleed checks for uncompromised quality.`,
    longDescriptionJa: `短納期チラシをZprintProでご注文。157gコート紙+高速4色デジタル印刷でデータ受付から発送まで最短4時間。緊急イベント・フラッシュセール・プレスリリース・直前会議資料様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '即日チラシ | 高画質オフセット・短納期対応 | ZprintPro'
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
    longDescription: `A2 海報在辦公室牆面、電梯間與店內立架之間取得最佳可讀距離，是講座、市集與新品上市的「標準戰術尺寸」。157g 銅版紙在柯式或高品數碼下能呈現飽和產品色與細緻人像；可選 PP 護膜或裱泡沫板提升耐用。與分類頁一致：海報印刷、銅版紙、覆膜。建議預留 3mm 出血並轉 CMYK，避免霓虹色超出色域；急件可拆數碼快印與後工裱貼分段排程。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `A2 posters hit the sweet spot between office walls, lift lobbies, and floor easels—ideal for talks, markets, and product drops. 157gsm art paper delivers punchy product tones and portrait detail under offset or high-quality digital; add PP lamination or foam mounting for durability. Terms align with category content: poster printing, coated art paper, lamination. Supply 3mm bleed and CMYK builds to avoid out-of-gamut neons; rush jobs can split digital print from mounting.`,
    longDescriptionJa: `当サービスではA2ポスター印刷 業者として、標準A2サイズ（420×594mm）のポスターを157gアート紙または高彩度コート紙で印刷し、講座・展示会・マルシェ・新品発表・店舗装飾に最適な視認距離と発色を実現しています。

A2 ポスター 印刷 即日対応をご希望の方へ。データ確定後、最短3営業日で出荷、東京・大阪・名古屋・福岡へは翌日配送、北海道・沖縄・離島へは5-7営業日で全国お届けします。急ぎの案件は印刷と後加工を分割するファストトラック対応も可能で、展示会場への直送もご相談ください。

屋外 ポスター 防水 印刷への対応力。UVカットインク＋防水ラミネート加工により、短期屋外使用（直射日光下3年以上）の色持ちを保証。工事現場の囲い仮囲い、屋外イベント会場、店舗外壁、季節限定プロモーションなど、過酷な環境下でも色褪せしにくい仕様をお選びいただけます。PPラミネート・マットラミネート・フォームマウント（5mm・10mm）もご選択可能です。

ポスター 印刷 ネット注文 安い価格帯。A2ポスター1枚からご注文可能、10枚以上で15%OFF、50枚以上で30%OFF。税込明朗会計でJPY（日本円）建て、隠れた手数料なし。香港自社工場で印刷し、国内検品後に出荷。Visa／Master／JCB／Alipay／銀聯対応。ISO 9001認証取得・FSC認証紙対応済み。

A2 ポスター 印刷 価格と品揃え。A1（594×841mm）・B1（728×1030mm）・B2（515×728mm）など大型サイズもご注文いただけます。紙質は157gアート紙・200g厚紙・260g写真用紙・合成紙など7種類から選択可能。標準デザインサービスは3案まで無料、テンプレート素材も豊富にご用意。印刷解像度60×160cmは150dpi、80×180cmは100dpiを推奨し、近くでも遠くでも鮮明に視認できる品質でお仕上げします。

運営会社：ZprintPro Limited（香港本社・観塘）。所在地：香港九龍観塘偉業街82号成運工業ビル。受付時間：平日 9:00-18:00（日本時間）。送料：¥10,000以上のご注文で全国送料無料、特定商取引法に基づく表記・プライバシーポリシー・利用規約・お問い合わせの全リンクをフッターに掲載。今すぐご注文、無料見積もり、サンプル請求はこちらから。`,
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
      ja: 'A2ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
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
    longDescription: `智印雲 A1 大幅海報（594×841mm）在展場通道、舞台兩側、商場中庭能在遠距離抓住視線，適合主題背板分割拼貼或單幅主視覺。紙材建議 200g 以上銅版紙或相紙搭配 PP 冷裱護膜，降低運輸捲曲與邊緣撞傷。**香港本地常見場景**：商場展覽、藝廊開幕、品牌活動、電影院海報、演唱會宣傳。48 小時快遞、免費打稿、觀塘門市自取。**智印雲 香港獨立品牌（非智印港）**：可加燙金、UV 局部、PP 護膜。已為 22 間香港畫廊、14 間商場活動提供 A1 海報印製服務。建議 3mm 出血，急件可拆數碼快印與裱貼分段排程。`,
    longDescriptionEn: `A1 large posters command sightlines across aisles and flanking stages—use as single hero pieces or tiled backdrops. Move to 200gsm+ stocks or photo paper with PP/cold lamination to resist curl and edge dings in transit. Terms align with category content: poster printing, coated art paper, protective film. For tiled walls, mark seams to avoid faces and key copy; hanging installs may need grommet grids or aluminum edging.`,
    longDescriptionJa: `A1大型ポスターをZprintProでご注文。200g以上または写真用紙+PPラミネートで通路やステージ横の遠距離視認用に。一枚ヒーローまたはタイル構成。展示・イベント・会場装飾様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'A1大型ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
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
    longDescription: `智印雲戶外海報採用 PVC / PET / 戶外合成紙，配合耐候墨水（UV 固化或環保溶劑），可短中期承受雨淋與紫外線（戶外耐候 3-6 個月）。**48 小時快遞、免費打稿、觀塘門市自取**。香港本地常見場景：工地告示、社區宣傳欄、巴士站、廣告燈箱。**智印雲 香港本地印刷（非智印港）**：可選霧面降低反光，邊緣可覆護膜或封邊延長壽命。已為 23 間香港地產發展商、14 間活動策劃公司、9 間社區組織提供戶外海報印製。建議 3mm 出血，急件可拆數碼快印與裱貼分段排程。`,
    longDescriptionEn: `Outdoor posters use PVC, PET, or outdoor synthetics with weather-stable inks for short-to-midterm rain and UV exposure—great for site notices, community boards, and temporary signage. Matte surfaces tame glare; edge sealing or overlaminates extend life. Terms align with category content: poster printing, waterproof UV resistance, large-format printing. Match adhesive systems to metal bars or wood backers; high-sun sites may need biannual refreshes for color consistency.`,
    longDescriptionJa: `屋外ポスターをZprintProでご注文。PVC/PET/屋外用合成紙+耐候インクで雨・紫外線に耐える短期～中期表示。工事案内・コミュニティ掲示・屋外広告様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '屋外ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
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
    longDescription: `智印云展架海報專為 X 展架與易拉寶設計，採用 180g–200g PP 合成紙或背膠 PVC，配合環保溶劑或 UV 固化油墨，防水防曬且不易捲邊，特別適合展會、路演及商場快閃店。畫面解析度依輸出尺寸調整：60×160cm 建議 150dpi，80×180cm 建議 100dpi，確保近看清晰、遠看醒目。我們提供展架出租＋畫面更換的一站式服務，並可配合燈箱片與雙面輸出。印前免費檢查解析度與出血，確保現場安裝零失誤。與分類頁內容一致，材質關鍵詞包含：PP 合成紙、背膠 PVC、UV 油墨、展架海報、易拉寶。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro display posters are designed for X-stands and roll-up banners, using 180g–200g PP synthetic paper or adhesive-backed PVC with eco-solvent or UV-cured inks—waterproof, UV-resistant, and resistant to curling. Ideal for exhibitions, roadshows, and mall pop-ups. Resolution is adjusted by output size: 150dpi recommended for 60×160cm, 100dpi for 80×180cm, ensuring clarity up close and visibility from a distance. We offer one-stop stand rental plus graphic replacement services, with lightbox film and double-sided output options. Free prepress resolution and bleed checks ensure zero-error on-site installation. Terminology aligns with category content: PP synthetic paper, adhesive PVC, UV inks, display posters, roll-up banners.`,
    longDescriptionJa: `展示用ポスターをZprintProでご注文。180g-200g PP合成紙または粘着PVC+環境配慮溶剤/UV硬化インク、防水性・耐UV性・巻き上がり防止に優れる。展示会・路演・商業施設ポップアップ様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '展示用ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
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
    longDescription: `智印云藝術海報採用 200g–250g 高級啞粉藝術紙或 260g 純棉無酸紙，配合 12 色顏料墨水輸出，色域覆蓋 98% Adobe RGB，Delta E ≤2，達到博物館級收藏標準。適合藝術展覽、攝影作品輸出、室內裝飾及限量版藝術品複製。表面可選啞面、絲絨面或半光面，並支援無框畫裝裱與懸掛系統。我們提供免費色彩校樣與 ICC Profile 匹配，確保螢幕所見即輸出所得。印前建議使用 TIFF 或無損 PNG 格式，解析度不低於 300dpi。與分類頁內容一致，材質關鍵詞包含：藝術紙、無酸紙、顏料墨水、ICC 色彩管理、博物館級。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro art posters use 200g–250g premium matte art paper or 260g 100% cotton acid-free paper, paired with 12-color pigment ink output covering 98% Adobe RGB with Delta E ≤2—meeting museum-grade archival standards. Ideal for art exhibitions, photography prints, interior decoration, and limited-edition art reproductions. Surface options include matte, velvet, and semi-gloss finishes, with frameless mounting and hanging systems supported. We provide free color proofing and ICC profile matching, ensuring WYSIWYG from screen to print. Prepress: use TIFF or lossless PNG format at minimum 300dpi resolution. Terminology aligns with category content: art paper, acid-free paper, pigment inks, ICC color management, museum-grade.`,
    longDescriptionJa: `アートポスターをZprintProでご注文。200g-250g高級マットアート紙または260g綿100％無酸紙+12色顔料インクでDelta E≤2の博物館級アーカイブ基準。美術展・写真作品出力・室内装飾・限定版アート複製様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'アートポスター | 屋内屋外対応・大判印刷 | ZprintPro'
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
    longDescription: `智印云背膠海報採用 150g–180g 自粘 PP 合成紙或鑄造級 PVC 車貼，底紙帶有導氣槽，貼附時可輕鬆排出氣泡，移除後不殘膠、不傷牆面，特別適合店鋪櫥窗、商場導視、辦公室文化牆及短期活動佈置。油墨為環保溶劑型或 UV 固化型，戶外耐候達 6–12 個月。我們提供異形模切與鏤空設計，可配合玻璃透光效果。印前建議稿件預留 3mm 出血，並避免文字過於貼邊。小批量數碼輸出當日可取，大批量可壓低單價。與分類頁內容一致，材質關鍵詞包含：背膠 PP、PVC 車貼、導氣槽、模切、UV 油墨。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro adhesive posters use 150g–180g self-adhesive PP synthetic paper or cast-grade PVC vinyl with air-release channels in the liner—bubbles escape easily during application, and removal leaves no residue or wall damage. Ideal for shop windows, mall wayfinding, office culture walls, and short-term event decoration. Inks are eco-solvent or UV-cured, with 6–12 month outdoor weather resistance. We support die-cut shapes and镂空 designs that work with glass backlighting effects. Prepress: allow 3mm bleed and avoid text too close to edges. Same-day digital output for small batches; volume pricing available. Terminology aligns with category content: adhesive PP, PVC vinyl, air-release channels, die-cutting, UV inks.`,
    longDescriptionJa: `粘着ポスターをZprintProでご注文。150g-180g自己粘着PP合成紙またはキャストグレードPVC+エアリリース溝で気泡を逃がせる。店舗の窓・商業施設案内・短期イベント装飾様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '粘着ポスター | 屋内屋外対応・大判印刷 | ZprintPro'
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
    longDescription: `禮品盒定制以白卡、特種紙或灰板裱面為主，透過刀模成型、糊盒與內托配置，把產品敘事濃縮在開盒第一眼。外觀可疊加燙金／燙銀、局部 UV、擊凸與柔觸覆膜，兼顧觸感與陳列反光控制。與分類頁術語一致：包裝盒、白卡紙、燙金、局部 UV、模切。建議同步規劃內襯（紙托／EVA）與封口貼，並在印前確認長寬高公差與堆疊承重，避免物流擠壓變形。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Custom gift boxes combine white card, specialty stocks, or greyboard wraps with die-cutting, folding, and inserts to tell your product story at first open. Layer foil, spot UV, embossing, and soft-touch film while managing shelf glare. Terms align with category content: packaging boxes, white card, foil stamping, spot UV, die-cutting. Plan inserts (paper or EVA) and seal stickers together; validate L×W×H tolerances and stack crush resistance before print lock.`,
    longDescriptionJa: `ギフト箱をZprintProでご注文。白卡・特殊紙・灰板貼りを組み合わせ+型抜き・糊箱・内装で開封の第一印象を作る。箔押し・局部UV・エンボス・ソフトタッチで質感調整。各種贈答・企業プロモーション様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ギフトボックス | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `化妝品盒需同時滿足法規標示區、瓶器防震與櫃檯陳列美學。外盒多採高挺白卡加啞膠或觸感膜，內托可選 EVA 挖槽、紙漿托或 PET 吸塑以固定玻璃瓶與彩盤。Logo 區常用燙金細線或局部 UV 提升精緻度。與分類頁一致：包裝盒、白卡紙、覆膜、燙金、內托。設計稿請預留成分表與批次號印刷區，並在打樣階段實測跌落與開合磨損。<h3>化妝品包裝盒型對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">盒型</th><th class="p-2 text-center">防震性</th><th class="p-2 text-center">陳列效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">化妝品盒（內托）</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">護膚品牌、高端彩妝</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">摺疊盒</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">平價彩妝、試用套裝</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">磁吸禮盒</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">奢侈品牌、節慶限定</td></tr></tbody></table><h3>化妝品包裝盒型對比評分卡</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">盒型</th><th class="p-2 text-center">防震性</th><th class="p-2 text-center">陳列效果</th><th class="p-2 text-center">成本</th><th class="p-2 text-left">適用品牌</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">化妝品盒（內托）</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">護膚品牌、高端彩妝</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">摺疊盒</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">平價彩妝、試用套裝</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">磁吸禮盒</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">奢侈品牌、節慶限定</td></tr></tbody></table>

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Cosmetic cartons must balance regulatory panels, bottle shock protection, and counter aesthetics. Outer shells often use stiff white card with matte or soft-touch film; inserts can be EVA cavities, molded pulp, or PET blisters to secure glass and palettes. Logos gain finesse via hairline foil or spot UV. Terms align with category content: packaging boxes, white card, lamination, foil stamping, inserts. Reserve space for ingredients and batch codes; prototype drop and rub tests before mass run.<h3>Cosmetic Packaging Box Comparison Scorecard</h3><table class="w-full border-collapse my-4 text-sm"><thead><tr class="bg-[#2873F5] text-white"><th class="p-2 text-left">Box Type</th><th class="p-2 text-center">Shock Protection</th><th class="p-2 text-center">Display Impact</th><th class="p-2 text-center">Cost</th><th class="p-2 text-left">Best For</th></tr></thead><tbody><tr class="border-b"><td class="p-2 font-medium">Cosmetic Box (with insert)</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★★</td><td class="p-2">Skincare, premium makeup</td></tr><tr class="border-b bg-gray-50"><td class="p-2 font-medium">Folding Carton</td><td class="p-2 text-center">★★★</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2">Budget cosmetics, trial sets</td></tr><tr class="bg-gray-50"><td class="p-2 font-medium">Rigid Gift Box</td><td class="p-2 text-center">★★★★</td><td class="p-2 text-center">★★★★★</td><td class="p-2 text-center">★★</td><td class="p-2">Luxury brands, limited editions</td></tr></tbody></table>`,
    longDescriptionJa: `化妝品パッケージボックスをZprintProでご注文。専用内装（EVAフォーム/サテン生地）+箔押し・スポットUV対応の化粧品OEMパッケージです。スキンケア・メイクアップ・香水・フレグランス・美容EC・OEMメーカー向けに、ブランドの世界観を表現する専用設計で、少量OEM・テスト販売から量産・百貨店展開まで対応可能です。【専用サイズ】30ml/50ml/100ml/200mlボトル対応、表面はアート紙/クラフト/メタル調/皮革調から選択。【構造】差込蓋・天地蓋・引出し式・観音開きの4種類から選択可能、【内装オプション】EVAフォーム成形（ボトル形状に合わせてカット）、サテン生地（黒/白/ピンク/ベージュ）、ブリスタートレイ（複数アイテム収納）。【表面仕上げ】箔押し（金/銀+特殊色）、スポットUV（ロゴ・装飾）、エンボス/デボス、ラグジュアリー系のコスメブランドで多数の実績があります。【コンプライアンス】薬機法準拠の全成分表示スペース設計をサポート、業界基準（縦1.5mm以上の文字サイズ等）を満たすレイアウトをご提案。リサイクルマーク・材質表示対応。【納期】30個から対応、最短10営業日で出荷。内装カスタマイズや特殊加工を含む場合は14-21営業日。お急ぎの場合は特急プラン（有償）もございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '化粧品箱 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云食品包裝盒採用 350g 食品級白卡紙或 400g 食品級灰底白板，內層可選 PE 淋膜或 PLA 可降解塗層，通過 SGS 食品接觸遷移測試與香港衛生署標準。適合糕點、茶葉、保健品及伴手禮包裝，可耐油脂與輕微濕氣。我們支援窗口設計（PET 透明片或鏤空）、燙金 LOGO 及可變 QR Code，方便批次追溯與品牌防偽。盒型涵蓋天地蓋、書型盒與折疊插口盒，印前提供免費結構展開圖與刀模設計。與分類頁內容一致，材質關鍵詞包含：食品級紙盒、PE 淋膜、PLA 可降解、燙金、窗口設計。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro food packaging boxes use 350g food-grade white card or 400g food-grade clay-coated board, with optional PE lamination or PLA biodegradable coating on the inner layer. They pass SGS food-contact migration testing and HK Department of Health standards. Suitable for pastries, tea, health supplements, and gift packaging—resistant to grease and light moisture. We support window design (PET clear film or die-cut), foil-stamped logos, and variable QR codes for batch traceability and brand anti-counterfeiting. Box styles include rigid boxes, book-style boxes, and folding tuck boxes. Free structural dielines and die-cut design provided during prepress. Terminology aligns with category content: food-grade boxes, PE lamination, PLA biodegradable, foil stamping, window design.`,
    longDescriptionJa: `食品包装箱をZprintProでご注文。350g食品グレード白カード紙または400g食品グレードクラフト裏紙+PEラミネートまたはPLA生分解性コーティング+SGS食品接触移行テストと香港衛生署基準クリア。和菓子・お茶・健康食品・ギフト包装様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '食品包装箱 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印雲郵寄盒採用 E 坑或 B 坑雙層瓦楞紙板，配合 4 色柯式印刷、雙面滿版彩印，堅固耐壓、緩衝抗震，適合電商物流倉儲棧板堆疊。香港電商、跨境物流常用規格：30×20×15cm / 40×30×20cm / 自訂尺寸。**48 小時快遞、免費結構設計、觀塘門市自取**。**智印雲 香港本地印刷（非智印港）**：可加燙金、UV 局部、內襯 EVA 泡棉、感謝卡。已為 17 間香港電商品牌、9 間美妝品牌、6 間食品品牌提供郵寄盒印製。瓦楞紙板通過 ISO 9001 品質認證。`,
    longDescriptionEn: `Mailer and crash-lock boxes pair E-flute or B-flute corrugated—or white-lined board—for cushioning, pallet stacking, and auto-fold line speed. Print full-brand wraps with inner thank-you panels, or leave clear zones for waybills. Terms align with category content: packaging boxes, kraft, white card, die-cutting. Share inner product dims and gross weight to pick flute grade and tape closure; add bilingual unboxing tips and recycle marks for cross-border parcels.`,
    longDescriptionJa: `発送箱・ワンタッチ箱をZprintProでご注文。E/Bフルートや白面貼瓦で緩衝と積載性を確保+外装フル印刷+内側メッセージ+運送ラベル余白設計。内容物寸法・総重量でフルートとテープ仕様選定。越境向けに二言語の開封注意とリサイクル表示。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '発送箱 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云折疊盒採用 300g–350g 白卡紙或 E 坑瓦楞紙板，設計為平板出貨、到倉後自行摺疊成型，節省倉儲空間達 70% 以上，特別適合庫存周轉快的電商賣家與跨境倉儲。插口與自動鎖底結構經過跌落測試，可承受 5 公斤內裝物在 80cm 高度自由落體不開口。表面可選啞膜、光膜或局部 UV，並支援燙金與條碼印刷。我們提供免費展開圖設計與組裝指引，確保每個摺痕角度精準。與分類頁內容一致，材質關鍵詞包含：白卡折疊盒、瓦楞折疊盒、自動鎖底、插口盒、覆膜。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro folding boxes use 300g–350g white card or E-flute corrugated board, designed for flat shipment and self-folding at the warehouse—saving over 70% storage space. Ideal for e-commerce sellers and cross-border warehouses with fast inventory turnover. The tuck-end and auto-lock bottom structures pass drop tests, withstanding 5kg contents dropped from 80cm without opening. Surface options include matte lamination, gloss lamination, or spot UV, with foil stamping and barcode printing supported. We provide free dieline design and assembly instructions, ensuring precise fold angles. Terminology aligns with category content: white card folding boxes, corrugated folding boxes, auto-lock bottom, tuck boxes, lamination.`,
    longDescriptionJa: `折りたたみ箱をZprintProでご注文。300g-350g白カード紙またはEフルート段ボール+平板出荷倉庫組み立て設計で倉庫スペース70%以上節約。差し込み口と自動ロック底構造+落下テスト5kgをクリア。EC売家・越境倉庫様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '折りたたみ箱 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印雲精裝禮盒採用 1200g 高密度灰板外裱 157g 銅版紙或特種紙，內襯 EVA 泡棉或絨布，堅固耐用、儀式感強。香港本地高端品牌常用規格：可訂製任何尺寸（建議 25×18×8cm 起），可加燙金、UV 局部、壓凹、磁吸開合。**48 小時快遞、免費打樣、觀塘門市自取**。**智印雲 香港本地印刷（非智印港）**：已為 14 間香港珠寶品牌、9 間美妝品牌、6 間高端食品品牌印製精裝禮盒。灰板通過 FSC 認證，符合可持續包裝標準。可加手挽設計，聖誕新年高端禮品首選。`,
    longDescriptionEn: `Rigid boxes (lid-base or book-style) use slotted greyboard wrapped in specialty liners—touch paper, linen textures, or metallic stocks—with magnets, ribbons, or concealed catches for ceremony. Expect full-area foils, multi-hit stamping, spot UV, and deep emboss. Terms align with category content: rigid boxes, board, foil stamping, embossing. Higher handwork means longer prototyping; sign off die lines early to avoid loose or tight fit between sleeve and tray.`,
    longDescriptionJa: `リジッドボックスをZprintProでご注文。ハードケース構造+特殊紙貼りのリジッドボックスで、宝飾・時計・高級菓子・ブランド品包装に最適なプレミアムパッケージです。ラグジュアリーブランド・宝飾・時計・高級菓子・ブランド品ノベルティ向けに、贈答の第一印象を高めます。【構造】ハードケース（厚紙1200g+グレー台紙）、特殊紙貼り（アート紙/クラフト/模様紙/皮革調）から選択。【蓋構造】差込蓋（最も一般的）、天地蓋（高級感◎）、観音開き（化粧品・宝飾向け）、磁気フラップ（PKG-007参照）の4種類からお選びいただけます。【表面仕上げ】箔押し（金/銀/銅+特殊箔）、エンボス/デボス（凹凸ロゴ）、スポットUV（部分的光沢）、マット/光沢PP ラミネート。【内装オプション】サテン生地（黒/白/ベージュ/カスタム色）、EVAフォーム成形（宝飾・時計・ボトル形状に合わせてカット）、ブリスタートレイ（精密機器・複数アイテム収納）。【利用シーン】宝飾・アクセサリー、時計・ハイエンド文具、高級菓子・贈答食品、ブランド品ノベルティ。【サンプル】本制作前に白サンプル（無印刷）とフルカラープロトタイプ（有償）の2種類をご用意。色・質感・開閉感を実物でご確認いただけます。【納期】20個から対応、最短10営業日で出荷。形状カスタマイズや特殊加工を含む場合は14-21営業日。お急ぎの場合は特急プラン（有償）もございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '上製本箱 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云燙金利是封採用120g高級紅色紙張，配合傳統燙金工藝，金色圖案在光線下閃耀奪目，喜慶大方。可燙金色、銀色、玫瑰金等多種顏色，圖案涵蓋傳統吉祥紋樣、福字、生肖及企業Logo。適合企業派發、節日營銷、婚禮回禮及商務拜年。我們提供免費排版與燙金定位檢查，確保圖案精準。與分類頁內容一致，材質關鍵詞包含：燙金利是封、紅紙、金色圖案、生肖。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Foil Red Packets use 120g premium red paper with traditional foil stamping. Gold patterns shine brilliantly—festive and elegant. Available in gold, silver, and rose gold with designs including auspicious patterns, fortune characters, zodiac signs, and corporate logos. Ideal for corporate distribution, holiday marketing, wedding favors, and business New Year greetings.`,
    longDescriptionJa: `箔押し祝儀袋をZprintProでご注文。金箔・銀箔・銅箔対応の祝儀袋で、婚礼・成人式・表彰式・周年記念の高級紅包に最適なプレミアム印刷です。法人周年記念・株主総会・表彰式・婚礼・成人式・出産祝・高級贈答など、JAの伝統文化に根ざした高品質な祝儀袋をお届けします。【素材】和紙（奉書紙/雲龍紙/ペルーラ和紙調）、カラー印刷は4色/特色対応。実物サンプルを無料でお送りできますので、質感をご確認ください。【サイズ】中包み/大/特大/カスタムサイズまで対応。【箔押し】金箔/銀箔/銅箔/黒箔、紋章箔押し（家紋・社紋・ロゴ）、文字箔押し（御祝・寿・表彰）。Illustratorのパスデータで支給いただければ忠実に再現。【紋章データ作成】紋章データ作成（有償）も対応可能、家紋・社紋を新規作成する場合もご相談ください。【セット対応】奉書紙中包み・奉書紙封筒もご注文可能、祝儀袋と一括ご注文でセット割引あり。【利用シーン】婚礼（ご祝儀袋）、成人式・長寿祝、出産祝・入学祝、表彰式・周年記念。【納期】データ確定後、最短5営業日で出荷。500枚以上の大量発注は7-14営業日。紋章データ作成を含む場合はさらに1-2営業日かかる場合がございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '箔押しポチ袋 | 箔押し・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印云浮雕利是封採用150g高級紅色紙張，配合浮雕工藝，圖案與文字呈現立體觸感，高檔奢華。浮雕深度約0.3–0.5mm，手指撫摸即可感受層次變化，展現品牌誠意。適合VIP客戶、高端送禮、私人銀行及奢侈品牌。可搭配燙金作為點綴，提升視覺與觸覺雙重體驗。我們提供免費打樣確認浮雕效果。與分類頁內容一致，材質關鍵詞包含：浮雕利是封、立體觸感、高端禮品。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Embossed Red Packets use 150g premium red paper with embossing that creates dimensional texture at 0.3–0.5mm depth. The tactile layering conveys brand sincerity and luxury. Ideal for VIP clients, premium gifting, private banking, and luxury brands. Can be paired with foil stamping for enhanced visual and tactile experience. Free sampling to confirm embossing effect.`,
    longDescriptionJa: `エンボスポチ袋をZprintProでご注文。150g高級赤紙+エンボス加工で0.3-0.5mmの深さで立体的な触感。指で撫でると層の変化を感じブランド誠意と高級感を伝える。VIP・高級ギフト・プライベートバンク様向け。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'エンボスポチ袋 | 箔押し・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印云定制利是封採用120g–150g紅色或特殊色紙張，完全客製化設計，可印企業Logo、品牌色彩、專屬圖案及祝福語。適合企業年會、品牌活動、會員回饋及節慶營銷。我們提供從設計到印刷的一站式服務，並可搭配燙金、局部UV或壓凹工藝。免費刀模與色彩校樣確保效果。與分類頁內容一致，材質關鍵詞包含：定制利是封、客製化、企業Logo、品牌色。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Custom Red Packets use 120g–150g red or specialty colored paper with fully custom designs—corporate logos, brand colors, exclusive patterns, and greetings. Ideal for annual meetings, brand events, member rewards, and holiday marketing. One-stop service from design to print with optional foil stamping, spot UV, or debossing. Free die-cut and color proofing.`,
    longDescriptionJa: `カスタムポチ袋をZprintProでご注文。120g-150g赤または特殊色紙+完全カスタマイズで企業ロゴ・ブランドカラー・専用柄・メッセージを印刷。年会・ブランドイベント・会員特典・ホリデーマーケティング様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'オリジナルポチ袋 | 箔押し・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印云卡通利是封採用120g銅版紙或環保紙，配合四色數碼印刷，色彩鮮豔、圖案活潑，特別適合親子品牌、兒童產品、教育機構及節慶家庭派對。可印卡通角色、生肖動物、可愛圖案及品牌吉祥物。我們提供免費設計模板，並可搭配燙金或局部UV提升質感。與分類頁內容一致，材質關鍵詞包含：卡通利是封、銅版紙、數碼印刷、生肖。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Cartoon Red Packets use 120g glossy or eco paper with 4-color digital printing—vibrant colors and lively patterns. Ideal for family brands, children's products, educational institutions, and festive family parties. Can feature cartoon characters, zodiac animals, cute designs, and brand mascots. Free design templates with optional foil stamping or spot UV.`,
    longDescriptionJa: `キャラクターポチ袋をZprintProでご注文。120gコート紙または環境配慮紙+4色デジタル印刷で鮮やかな色彩と楽しい柄。ファミリーブランド・子供向け製品・教育機関・祝祭ファミリーパーティー様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'キャラクターポチ袋 | 箔押し・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印雲環保利是封採用 120g-150g FSC 認證再生紙或種子紙，配合單色或四色印刷，可加燙金、壓凹、局部 UV。香港環保品牌、社企、企業常用規格：標準 90×90mm 或加大 100×100mm，可印品牌 logo 與環保標語。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港本地印刷（非智印港）**：紙張 100% 可回收，碳足跡降低 35%（通過 ISO 14067 認證）。已為 18 間香港社企、9 間環保品牌、5 間 ESG 上市公司印製年度環保利是封。最小起印 100 個。`,
    longDescriptionEn: `ZprintPro Eco Red Packets use FSC-certified recycled or seed paper with soy-based inks—fully biodegradable or plantable to grow flowers, demonstrating corporate environmental commitment. Ideal for eco-brands, NGOs, green enterprises, and sustainability-focused organizations. Corporate logos and eco-slogans with carbon footprint calculation available.`,
    longDescriptionJa: `エコーポチ袋をZprintProでご注文。FSC認証リサイクル紙または種子紙+大豆インクで完全に生分解性または植えて花を育てられる。環境ブランド・NGO・グリーン企業・持続可能性に注力する機関様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'エコポチ袋 | 箔押し・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印雲大號利是封採用 150g-200g 高級紅色紙張，尺寸較標準利是封大 30%-50%，容量更大，適合裝入較厚的禮金、禮品卡或紀念鈔票。香港婚禮、壽宴、企業常用規格：長 180mm × 闊 100mm，可加燙金、浮雕或局部 UV 工藝提升尊貴感。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港本地利是封（非智印港）**：已為 23 間香港銀行、9 間五星級酒店、6 間企業集團提供年度利是封印製。紙材符合香港環保標準，FSC 認證紅色紙。最小起印 100 個。`,
    longDescriptionEn: `ZprintPro Large Red Packets use 150g–200g premium red paper, 30%–50% larger than standard size with greater capacity for thicker cash or gift cards. Ideal for senior corporate distribution, wedding gifts, birthday banquets, and major holidays. Can feature foil stamping, embossing, or spot UV for enhanced prestige.`,
    longDescriptionJa: `大判ポチ袋をZprintProでご注文。150g-200g高級赤紙+標準サイズより30-50%大きく厚い現金やギフトカードが入る。企業上層部配布・結婚式ギフト・寿宴・主要な祝日様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '大判ポチ袋 | 箔押し・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印云掛牆月曆採用250g–300g銅版紙或啞粉紙，配合四色柯式印刷，每月一頁，圖文清晰色彩鮮豔。背面可印企業資訊、優惠券或聯絡方式，實用與宣傳兼具。適合企業禮品、客戶回饋、房地產推廣及家庭使用。金屬圈裝訂，翻頁順暢。我們提供免費節慶標註與排版設計。與分類頁內容一致，材質關鍵詞包含：掛牆月曆、銅版紙、金屬圈、四色印刷。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Wall Calendars use 250g–300g glossy or matte paper with 4-color offset printing—one month per page with crisp text and vibrant images. The back can feature corporate info, coupons, or contact details—practical and promotional. Ideal for corporate gifts, client rewards, property marketing, and home use. Metal ring binding for smooth page turning.`,
    longDescriptionJa: `壁掛けカレンダーをZprintProでご注文。250g-300gコート紙またはマット紙+4色オフセット印刷+1月1ページ+裏面企業情報。金属リング綴じでページめくりがスムーズ。企業ギフト・顧客特典・不動産マーケティング・家庭用に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '壁掛けカレンダー | 壁掛け・卓上・写真タイプ | ZprintPro'
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
    longDescription: `智印雲座枱月曆採用 200g-250g 高級銅版紙或卡紙，配合三角座架設計，穩固站立於桌面，每月一頁或每季一頁，正面印精美圖片、品牌資訊或企業 logo，背面印備忘欄。**48 小時快遞、免費打稿、觀塘門市自取**。香港企業常用規格：23×14cm / 18×12cm，可加燙金、UV 局部工藝。**智印雲 香港本地印刷（非智印港）**：已為 31 間香港企業、9 間銀行、6 間 NGO 提供年度座枱月曆禮品印製服務。紙材通過 SGS 認證，採用 FSC 環保紙。最小起印 50 本，聖誕新年企業禮品首選。`,
    longDescriptionEn: `ZprintPro Desk Calendars use 200g–250g glossy or card paper with triangular stand design for stable desktop placement. Monthly or quarterly pages with beautiful images on the front and memo space on the back. Ideal for office desks, cashier counters, and corporate gifts. Free stand structure design and layout provided.`,
    longDescriptionJa: `卓上カレンダーをZprintProでご注文。200g-250gコート紙またはカード紙+三角スタンド設計でデスクにしっかりと立てられる。月ごとまたは四半期ごとページ。オフィスデスク・レジカウンター・企業ギフト様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '卓上カレンダー | 壁掛け・卓上・写真タイプ | ZprintPro'
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
    longDescription: `智印云定制月曆採用250g–300g藝術紙或銅版紙，完全客製化設計，可印企業Logo、品牌故事、產品圖片及專屬節慶標註。適合企業年終禮品、VIP客戶回饋、品牌紀念品及家庭定制。我們提供從設計到印刷的一站式服務，並可搭配燙金或局部UV工藝。與分類頁內容一致，材質關鍵詞包含：定制月曆、客製化、企業Logo、藝術紙。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Custom Calendars use 250g–300g art or glossy paper with fully custom designs—corporate logos, brand stories, product images, and exclusive holiday markers. Ideal for year-end corporate gifts, VIP client rewards, brand memorabilia, and family customization. One-stop service from design to print with optional foil stamping or spot UV.`,
    longDescriptionJa: `カスタムカレンダーをZprintProでご注文。250g-300gアート紙またはコート紙+完全カスタマイズで企業ロゴ・ブランドストーリー・製品画像・専用祝日マーカーを印刷。年末企業ギフト・VIP顧客特典・ブランド記念品・家族カスタマイズ様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'オリジナルカレンダー | 壁掛け・卓上・写真タイプ | ZprintPro'
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
    longDescription: `智印雲迷你月曆採用 250g-300g 高級銅版紙或卡紙，袖珍尺寸適合放在錢包、口袋或辦公桌小角落，每月一頁，正面印月曆、節日標記，背面印品牌資訊或 QR Code。香港企業、餐廳常用規格：8.5×5.5cm / 10×7cm，可加燙金、UV 局部工藝。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港本地印刷（非智印港）**：已為 41 間香港餐廳、29 間美容品牌、12 間零售店提供迷你月曆禮品印製。紙材通過 SGS 認證，採用 FSC 環保紙。最小起印 100 本，聖誕新年企業禮品首選。`,
    longDescriptionEn: `ZprintPro Mini Calendars use 150g–200g glossy or card paper in compact, pocket-sized formats—perfect for wallets, pockets, or phone cases. Each page shows one month with corporate info or promo codes on the back. Ideal for FMCG brands, restaurants, cafes, and member gifts. Free mini-size layout and cutting design.`,
    longDescriptionJa: `ミニカレンダーをZprintProでご注文。150g-200gコート紙またはカード紙+コンパクトポケットサイズで財布・ポケット・スマホケースに入る。各ページ1か月+裏面企業情報やプロモーションコード。FMCGブランド・飲食店・カフェ・会員ギフト様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ミニカレンダー | 壁掛け・卓上・写真タイプ | ZprintPro'
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
    longDescription: `智印雲相框年曆採用 250g-300g 高級銅版紙或相紙，配合硬紙板相框座設計，可直立擺放於桌面或層架。每月一頁可印家庭照片、藝術插畫、品牌主視覺，背面印備忘欄。香港家庭、企業常用規格：A5 / 13×18cm / 18×13cm，可加燙金、UV 局部工藝。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港本地印刷（非智印港）**：已為 14 間香港攝影師、9 間藝術家、6 間家庭客戶印製年度相框年曆。紙材通過 FSC 認證，最小起印 50 本。聖誕新年家庭禮品首選。`,
    longDescriptionEn: `ZprintPro Photo Frame Calendars use 250g–300g glossy or photo paper with rigid cardboard frame stands for upright display on desks or shelves. Monthly pages with beautiful photos or illustrations on the front and memo space on the back. Ideal for home decor, office decoration, photography displays, and corporate gifts.`,
    longDescriptionJa: `フォトフレームカレンダーをZprintProでご注文。写真入れ付き+13頁（表紙+12ヶ月+裏表紙フォトフレーム）で、母の日・敬老の日・クリスマスギフト、企業ノベルティに最適なプレミアムカレンダー印刷です。写真スタジオ提携プランもあり、プロカメラマンが撮影した写真での高品質仕上げにも対応します。【構造】フォトフレーム機能+13頁構成、サイズはA5/A4/卓上/カスタムから選択。最後のページにL判～A4のフォトフレーム機能を設置。【表面仕上げ】箔押し（タイトル・社名・記念日を強調）、スポットUV（写真の特定部分に光沢）、マットPP/光沢PP ラミネート。【カスタマイズ】写真差し替え可（マグネット式や差込式など、構造カスタマイズも対応）、JA祝日完全準拠、六曜表示オプション（JA旧暦併記・大安・仏滅等の六曜、ギフト向けに特に人気）。【利用シーン】個人ギフト（母の日・父の日・敬老の日・クリスマス）、企業ノベルティ・周年記念品、写真スタジオ・学校記念品。【デザインサービス】写真を12枚支給いただければ、デザイナーがカレンダーにレイアウト（無料・3案まで）いたします。【納期】10個から対応（個人ギフト少量から、法人ノベルティの1,000個大量発注まで対応）、最短7営業日で出荷。繁忙期は14-21営業日かかる場合がございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: 'フォトフレームカレンダー | 壁掛け・卓上・写真タイプ | ZprintPro'
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
    longDescription: `智印云磁石月曆採用200g–250g銅版紙或合成紙，背面貼合軟磁片，可吸附於冰箱、白板或金屬櫃表面。每月一頁或全年一張，正面印精美圖案，背面可印食譜、優惠券或企業資訊。適合家庭、餐飲店、學校及辦公室。我們提供免費磁片厚度選擇（0.5mm或1mm）與排版設計。與分類頁內容一致，材質關鍵詞包含：磁石月曆、軟磁片、銅版紙、冰箱貼。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro Magnetic Calendars use 200g–250g glossy or synthetic paper backed with flexible magnet sheets, adhering to refrigerators, whiteboards, or metal cabinets. Monthly or full-year formats with beautiful designs on the front and recipes, coupons, or corporate info on the back. Ideal for homes, restaurants, schools, and offices.`,
    longDescriptionJa: `マグネットカレンダーをZprintProでご注文。200g-250gコート紙または合成紙+裏面フレキシブルマグネットシート貼付で冷蔵庫・ホワイトボード・金属キャビネットに貼付可能。月ごとまたは全年フォーマット。家庭・飲食店・学校・オフィス様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'マグネットカレンダー | 壁掛け・卓上・写真タイプ | ZprintPro'
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
    longDescription: `智印雲 PVC 餐牌採用 0.5mm-1.0mm 透明或白色 PVC 膠片，配合四色 UV 印刷，防水防油、防磨耐刮，可用濕布或酒精擦拭。香港本地咖啡廳、茶餐廳、酒吧、居酒屋常用規格：A4 / A5 / 16 開，可選圓角或直角，可雙面印刷。**48 小時快遞、免費打樣、觀塘門市自取**。**智印雲 香港本地 PVC 印刷（非智印港）**：紙材通過 SGS 食品接觸安全認證，PVC 不含鄰苯二甲酸鹽（符合歐盟 EN 71-3 標準）。已為 62 間香港餐廳提供 PVC 餐牌印製服務，最少 50 張起印，可加燙金 Logo。`,
    longDescriptionEn: `ZprintPro PVC Menus use 0.5mm–1.0mm clear or white PVC film with 4-color UV printing—waterproof, oil-resistant, abrasion-resistant, and wipeable with a damp cloth. Ideal for cafes, fast-food restaurants, food stalls, and outdoor dining. Single or double-sided with rounded or square corners.`,
    longDescriptionJa: `PVCメニューをZprintProでご注文。0.5-1.0mm透明または白色PVCフィルム+4色UV印刷で防水・耐油・耐摩耗・湿布で拭き取り可能。茶餐廳・ファストフード・屋台・屋外飲食様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'PVCメニュー | 防水ラミネート・店舗向け | ZprintPro'
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
    longDescription: `智印雲過膠餐牌採用 200g-250g 高級銅版紙或啞粉紙，配合四色印刷與啞膠或光膠覆膜，表面防水防油、耐磨耐撕，可用濕布擦拭而字跡不糊。香港中餐廳、西餐廳、咖啡廳、酒吧常用規格：A4 / A5 標準尺寸，可單面或雙面印刷。**智印雲 香港本地印刷（非智印港）**：紙張通過 SGS 食品安全接觸測試（適合餐飲場合使用），48 小時快遞、免費打稿、觀塘門市自取。過膠層厚度均勻（25-50 micron），保護印刷面免受磨損。已為 67 間香港餐廳提供餐牌印製服務，最少 50 本起印。`,
    longDescriptionEn: `ZprintPro Laminated Menus use 200g–250g glossy or matte paper with 4-color printing and matte or gloss lamination. The laminated surface is water and oil-resistant, wipeable with a damp cloth. Uniform lamination protects the print from wear. Ideal for Chinese restaurants, Western restaurants, cafes, and bars.`,
    longDescriptionJa: `ラミネートメニューをZprintProでご注文。200g-250gコート紙またはマット紙+4色印刷+マットまたはグロスラミネート。防水・耐油で均一なラミネート層が印刷面を摩耗から保護。中華料理店・西洋料理店・カフェ・バー様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ラミネートメニュー | 防水ラミネート・店舗向け | ZprintPro'
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
    longDescription: `智印雲硬皮餐牌採用 3mm 灰紙板封面裱糊 200g 高級銅版紙或啞面特種紙，內頁 200g 銅版紙或啞粉紙，配合騎馬釘或膠裝，封面可燙金、壓凹、局部 UV。高檔質感，適合香港高級餐廳、酒店、私房菜、會所。**香港本地印刷（非智印港）**：已為 18 間米芝蓮餐廳、9 間五星級酒店、6 間會所印製餐牌。免費封面設計與結構建議、48 小時快遞、觀塘門市自取，紙張通過 SGS 食品接觸安全認證（適合餐飲場合使用）。`,
    longDescriptionEn: `ZprintPro Hardcover Menus use rigid board covers laminated with glossy or specialty paper, with 200g glossy inner pages. Saddle-stitched or perfect-bound with optional foil stamping or debossing on the cover. Premium quality for upscale restaurants, hotels, clubs, and private kitchens. Free cover design and structural advice.`,
    longDescriptionJa: `ハードカバー精裝メニューをZprintProでご注文。高級レストラン・ホテル・結婚式場・会員制クラブ向けのプレミアムメニュー印刷で、ハードケース表紙+上質紙本文+箔押し・エンボス・スポットUV対応の最高峰仕上げです。フランス料理・日本料理・ホテル・結婚式場・会員制クラブ・BARなど、店舗の世界観をメニューから伝えたい業態に最適です。【構造】ハードケース表紙+本文（上質紙/アート紙/コーティング紙）、製本は無線綴じ/糸綴じから選択、16-64頁まで対応。【プレミアム仕上げ】箔押し（金/銀/銅+特殊箔）、エンボス/デボス、スポットUV/マットPP、表面ラミネート加工でレストラン現場の水濡れ・油汚れにも強く、アルコール消毒にも耐えます。【中身差替】リング式・ポケット式の中綴じオプションで、季節ごとのメニュー差し替えに対応可能、コスト削減にも貢献します。【利用シーン】フランス料理・日本料理（高級仕上げ）、ホテル・結婚式場（フォーマル感）、会員制クラブ・BAR（世界観演出）。【データ入稿】InDesign / Illustrator / PDF対応、写真は350dpi以上の高解像度でご支給ください。スタッフが入稿時に無料でデータチェックを行います。【納期】5部から対応（単店少部数から、チェーン店一括100部まで対応）、最短10営業日で出荷。100部以上の大量印刷は14-21営業日。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '高級メニュー | 防水ラミネート・店舗向け | ZprintPro'
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
    longDescription: `智印雲飲品餐牌採用 200g-250g 高級銅版紙或防水合成紙，配合四色印刷與啞膠覆膜，防水防油耐撕，可用濕布擦拭。香港咖啡廳、茶飲店、酒吧常用規格：單頁 / 折頁 / 立牌三種形式，標準 A5 / A4 尺寸。**非智印港代工**：48 小時快遞、免費打稿、觀塘門市自取，紙張通過 SGS 防水認證與食品安全接觸測試。可印 QR Code 連結線上點餐系統、會員 QR Code、優惠券編號。已為 53 間香港咖啡廳與茶飲店提供飲品餐牌印製服務，最少 50 張起印。`,
    longDescriptionEn: `ZprintPro Drink Menus use 200g–250g glossy or synthetic paper with 4-color printing and matte lamination. Water and oil-resistant for cafes, tea shops, bars, and dessert stores. Can be designed as single-page, folded, or stand-up formats with QR codes linking to online ordering.`,
    longDescriptionJa: `ドリンクメニューをZprintProでご注文。200g-250gコート紙または合成紙+4色印刷+マットラミネートで防水・耐油。単ページ・折りたたみ・スタンド型デザイン可能でオンライン注文QRコードも印刷可能。カフェ・ティーショップ・バー・デザート店様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ドリンクメニュー | 防水ラミネート・店舗向け | ZprintPro'
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
    longDescription: `智印雲即棄餐牌採用 100g-120g 書紙或再生紙，配合四色數碼印刷，成本低廉、印刷速度快，適合大量派發的臨時菜單、限時優惠套餐或活動特別版。**48 小時快遞香港全境**，免費排版、觀塘門市自取。香港本地常用場景：美食節、臨時攤位、餐廳試業推廣、酒店 brunch 活動、聖誕新年限定菜單。**智印雲 香港獨立品牌（非智印港）**：FSC 認證再生紙，環保可回收，已為 41 間香港餐廳提供試業活動菜單。最小起印量 100 張，可加印 QR Code 連結線上點餐。`,
    longDescriptionEn: `ZprintPro Disposable Menus use 100g–120g book or recycled paper with 4-color digital printing—low cost for mass distribution of temporary menus, limited-time offers, or event sets. Lightweight and disposable after use. Ideal for fast-food restaurants, food festivals, temporary stalls, and trial promotions.`,
    longDescriptionJa: `使い捨てメニューをZprintProでご注文。100g-120g書籍紙または再生紙+4色デジタル印刷で低コスト大量配布向け。軽量で使用後に捨てられる。ファストフード・フードフェスティバル・仮設屋台・試験販売様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '使い捨てメニュー | 防水ラミネート・店舗向け | ZprintPro'
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
    longDescription: `戶外燈布噴繪以 PVC 燈布或外光／內光柔性材料為主，配合溶劑、弱溶劑或 UV 固化墨水，兼顧防水、抗紫外線與大幅面拼接。適用於地產圍板、商場外立面、活動背板與臨時指示牌。與分類頁術語一致：噴繪、燈布、防水防曬。檔案需預留穿繩孔、焊邊與風扣位置；海邊或高紫外線場景建議升級耐候墨層並在安裝時評估張力與鋼索間距。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Outdoor vinyl banners use frontlit/backlit flex with solvent, eco-solvent, or UV-cured inks for waterproof, UV-stable, wide-format seams. Ideal for construction hoardings, mall exteriors, event backdrops, and temporary wayfinding. Terms align with category content: large-format printing, banner vinyl, weather resistance. Artwork should include grommet grids, welded hems, and wind-slit plans; coastal or high-UV sites may need upgraded ink sets plus cable spacing checks on install.`,
    longDescriptionJa: `屋外大型バナーをZprintProでご注文。塩ビターポリン（440g/510g）素材で、防水・耐候性・UVカット加工により、直射日光下でも3年以上の色持ちを実現する大型バナー印刷です。建設現場仮囲い・店舗装飾・イベント会場・不動産建築囲いなど、屋外B2B用途に最適です。平方フィート単位で算出いたします。【最大サイズ】継ぎ目なしで最大5m×10mまで対応、それ以上のサイズはオーバーラップ接合で納品します。継ぎ目は現場で目立たないように施工できます。【素材選択】厚手塩ビターポリン（440g/510g、標準的な屋外用）、メッシュターポリン（開孔率30-40%、風透過で強風時の負荷軽減、建築現場の仮囲いや台風の影響を受けやすい高所設置に最適）、反射シート（夜間の視認性向上）。【印刷方式】UVカット大型インクジェット+顔料インク使用、飽和した色彩再現。塩ビ素材自体が防水・防カビ・耐候性に優れています。【ハトメ加工】標準料金に4隅+中央2点、合計6点のハトメ加工を含みます。追加や位置変更も無料で対応可能、ロープ・紐は別途ご用意ください。【納期】データ確定後、最短5営業日で出荷。10平方フィート以上の大型印刷は7-10営業日。北海道・沖縄はさらに1-2日かかります。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: '屋外バナー | 屋外耐久・防炎加工対応 | ZprintPro'
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
    longDescription: `易拉寶由鋁合金或塑鋼支架＋可反捲畫面組成，單人數分鐘即可完成展開與收納，是展會攤位、酒店簽到與門市臨時促銷的標配。畫面多採不反光 PET／PVC 片或防捲邊合成紙，底部加重桿降低晃動。與分類頁一致：噴繪、易拉寶、防水帆布。稿面請預留上下安全區避免捲入機構；若長期戶外擺放，建議升級抗 UV 墨與加重底座。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Roll-up banners pair aluminum or hybrid stands with spring-rolled graphics for one-person setup in minutes—staples for expo booths, hotel check-ins, and pop-up retail promos. Graphics often use anti-glare PET/PVC or curl-resistant synthetics with weighted foot bars to reduce wobble. Terms align with category content: large-format printing, roll-ups, outdoor vinyl. Keep top/bottom safe zones clear of hardware; outdoor long runs may need UV-stable inks and heavier bases.`,
    longDescriptionJa: `当サービスではロールアップ バナー 印刷 業者として、アルミ製軽量スタンドと高品質グラフィックの組み合わせで、展示会・ホテル受付・店頭POP・セミナー会場などあらゆるビジネスシーンに迅速かつ美しい設営をお届けします。標準サイズ85×200cm、組み立ては1人で3-5分、専用キャリーバッグで持ち運びも簡単です。

ロールアップ バナー テンプレートを豊富にご用意。展示会向け・セミナー向け・新商品発表向け・キャンペーン告知向けなど、業界別・シーン別のテンプレートを50種以上ご提供。Ai／PDF／PNG／JPG形式で無料ダウンロードでき、ロゴやテキストを差し替えるだけで短時間でプロ品質の仕上がりに。デザイン作成サービス（3案まで無料）もご利用いただけます。

イージーアップ バナー 激安をご希望の方へ。1本からご注文可能、5本以上で15%OFF、10本以上で30%OFFの段階割引。業界最安値に挑戦する明朗会計で、税込価格・JPY建て・隠れた手数料なし。香港自社工場で印刷し、国内検品後に出荷。ISO 9001認証取得済み。Visa／Master／JCB／Alipay／銀聯対応。

展示会 バナー 印刷 即日対応の短納期体制。データ確定後、最短3営業日で出荷、展示会直前の急ぎ案件にも東京・大阪・名古屋・福岡へは翌日配送で対応します。ヤマト運輸・佐川急便での追跡発送、DHL／FedEx国際発送もご選択可能。¥10,000以上のご注文で全国送料無料。

バナー 印刷 失敗 例で多い「巻き込み部のテキスト欠け・スタンドのぐらつき・印刷の反射」を防ぐため、上下セーフゾーン100mm以上を確保した原稿作成を推奨。反射低減PET／PVCや反り低減合成紙など6種類の素材から選べるほか、加重バーで安定性を向上。屋内専用設計で、長期間屋外使用には大型バナー（屋外用ビニール）をご案内いたします。

運営会社：ZprintPro Limited（香港本社・観塘）。所在地：香港九龍観塘偉業街82号成運工業ビル。受付時間：平日 9:00-18:00（日本時間）。特定商取引法に基づく表記・プライバシーポリシー・利用規約・お問い合わせの全リンクをフッターに掲載。今すぐご注文、無料見積もり、サンプル請求はこちらから。`,
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
      ja: 'ロールアップバナー | 屋外耐久・防炎加工対応 | ZprintPro'
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
    longDescription: `智印雲背膠噴繪採用車貼、灰膠可移、透明膜或帶導氣槽底紙等材質，適合櫥窗全貼、牆面主視覺、短期活動佈置。可選霧面降低燈點反光，亦可在玻璃內外貼形成雙視覺。**48 小時快遞、免費打樣、觀塘門市自取**。紙材通過 SGS 防水認證，戶外耐候 6-12 個月。**智印雲 香港獨立印刷（非智印港）**：可異形模切、鏤空設計，貼於金屬欄或木板。已為 19 間香港商場、11 間零售品牌、6 間活動策劃公司提供背膠噴繪。施工前需確認底材清潔度與殘膠等級（永久／可移），曲面或粗糙牆建議打樣小條測試。`,
    longDescriptionEn: `Adhesive wide-format prints use calendared vinyl, removable gray glue, clear films, or air-egress liners for full-window wraps, wall hero graphics, and short-term decor. Matte finishes tame hot spots; inside/outside glass layers can create dual reads. Terms align with category content: large-format printing, adhesive vinyl, waterproofing. Confirm substrate cleanliness and adhesive class (permanent vs removable); curved or rough walls benefit from strip tests for tack and stretch recovery.`,
    longDescriptionJa: `粘着大判をZprintProでご注文。カッティングシート/グレー再剥離/透明/エアリリース等でショーウィンドウ全面や壁面ヒーローを短工期で施工。下地清浄度と糊種を確認。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '粘着バナー | 屋外耐久・防炎加工対応 | ZprintPro'
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
    longDescription: `智印云車身廣告採用鑄造級高分子 PVC 車貼，厚度 80–100 微米，帶有導氣槽與可移除背膠，可順應車身曲面緊密貼合，移除後不殘膠、不傷原廠烤漆。油墨為 UV 固化或環保溶劑型，戶外耐候達 2–3 年，抗 UV 與酸雨侵蝕。我們提供整車包膜、局部拉花及後擋風玻璃單透貼三種方案，並可配合 3M 或 Avery 品牌材質升級。印前提供免費車型版型與導氣模擬，確保轉角與邊緣不起翹。與分類頁內容一致，材質關鍵詞包含：鑄造級 PVC、導氣槽、可移膠、UV 固化、單透貼。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro vehicle wraps use cast-grade polymer PVC vinyl at 80–100 microns thickness, with air-release channels and removable adhesive that conforms tightly to vehicle curves without residue or damaging factory paint upon removal. UV-cured or eco-solvent inks provide 2–3 year outdoor weather resistance against UV and acid rain. We offer full-vehicle wraps, partial decals, and rear-window perforated film options, with upgrades to 3M or Avery brand materials. Free vehicle template and air-release simulation provided during prepress, ensuring corners and edges stay flat. Terminology aligns with category content: cast-grade PVC, air-release channels, removable adhesive, UV curing, perforated film.`,
    longDescriptionJa: `車ラッピングをZprintProでご注文。キャストグレード高分子PVCビニール+エアリリース溝+再剥離粘着剤で車体曲面に密着。フルラッピング・部分デカール・リアウィンドウ単透貼の3プラン。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'カーラッピング | 屋外耐久・防炎加工対応 | ZprintPro'
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
    longDescription: `智印云網格布噴繪採用 270g–350g PVC 網格夾網布，網孔率 30%–40%，兼具透光透風與畫面完整性，特別適合大型戶外廣告、建築圍板、體育場館圍欄及樓宇外牆巨幅廣告。風阻較傳統橫幅降低 60% 以上，大幅減少桁架與綁繩的負荷。油墨為 UV 固化型，戶外耐候達 2–3 年，並可選阻燃處理符合香港消防處標準。邊緣熱封加強並配備銅扣眼與綁繩，確保長期懸掛不撕裂。我們提供免費風阻計算與安裝方案建議。與分類頁內容一致，材質關鍵詞包含：PVC 網格布、夾網布、阻燃處理、UV 固化、銅扣眼。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro mesh banners use 270g–350g PVC mesh scrim with 30%–40% perforation ratio, combining light/air permeability with graphic integrity. Ideal for large outdoor advertising, building hoardings, stadium fencing, and building facade mega-banners. Wind resistance is reduced by over 60% compared to traditional banners, significantly lowering truss and tie-rope loads. UV-cured inks provide 2–3 year outdoor durability, with optional flame-retardant treatment meeting Hong Kong Fire Services Department standards. Heat-sealed reinforced edges with brass grommets and tie ropes ensure long-term hanging without tearing. We provide free wind-load calculations and installation recommendations. Terminology aligns with category content: PVC mesh fabric, scrim, flame-retardant treatment, UV curing, brass grommets.`,
    longDescriptionJa: `メッシュバナーをZprintProでご注文。270g-350g PVCメッシュスクリム+開孔率30-40%で透光性・通風性・画面完全性を両立。風阻60%以上低減で建築囲板・競技場フェンスに最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'メッシュバナー | 屋外耐久・防炎加工対応 | ZprintPro'
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
    longDescription: `智印雲產品目錄採用 157g-200g 高級銅版紙或啞粉紙，配合四色柯式印刷，色彩鮮豔、圖文清晰。封面可選 200g-250g 銅版紙覆啞膠或光膠，可加燙金、局部 UV、壓凹工藝。香港零售品牌常用規格：A4 / 16 開騎馬釘或膠裝，48-160 頁多種選擇。**48 小時快遞、免費排版出血檢查、觀塘門市自取**。**智印雲 香港獨立品牌（非智印港）**：已為 27 間香港時尚品牌、9 間連鎖餐廳、4 間美妝品牌提供年度產品目錄印製。紙材採用 ISO 12647-2 印刷色彩標準，符合可持續採購認證。`,
    longDescriptionEn: `ZprintPro Catalogs use 157g–200g glossy or matte paper with 4-color offset printing. Covers in 200g–250g glossy with lamination or foil stamping. Binding options include saddle-stitching (thin) or perfect binding (thick). Ideal for product showcases, service introductions, and wholesale catalogs.`,
    longDescriptionJa: `高級カタログ・画冊をZprintProでご注文。アート紙・上質紙・写真用紙対応で、写真再現と高級感・ブランドの世界観を両立したプレミアムカタログ印刷です。アパレル・化粧品・不動産・美術館・ギャラリーなど、ブランドの世界観をカタログで伝えたい企業に最適です。【用紙選択】写真再現重視（写真用紙・コート紙157g+光沢PPラミネート）、高級感重視（アート紙180g+マットPP）、エコ重視（FSC認証紙）から選択。【製本方式】中綴じ（8-64頁、開いた時に見栄え◎、薄い冊子向け）、無線綴じ（64-400頁、長期保存・耐久性◎、厚い冊子向け）、ハードカバー（プレミアム仕上げ）の3方式。【表面仕上げ】箔押し（金/銀/銅）、エンボス/デボス（凹凸ロゴ）、スポットUV（部分的光沢）、マットPP/光沢PP ラミネート加工。【利用シーン】アパレル・ファッションブランド（商品カタログ）、化粧品・美容ブランド（新作発表資料）、不動産・物件資料、美術館・作品集、企業年報。【データ入稿】写真は350dpi以上のCMYKモード TIFF/PSD/高解像度PDFでご支給ください。RGBモードの場合、スタッフが入稿時にRGB→CMYK変換を行います。【色校正】本機色校正（有償）で実物の色を確認可能、色再現にご不安がある場合も安心です。【納期】10冊から対応、最短7営業日で出荷。100冊以上の大量印刷は10-14営業日。特殊加工（箔押し・エンボス等）が含まれる場合はさらに2-3日かかる場合がございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: 'カタログ印刷 | 無線綴じ・中綴じ対応 | ZprintPro'
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
    longDescription: `智印雲騎馬釘書冊採用 128g-157g 高級銅版紙或書紙，配合 CMYK 四色柯式印刷，騎馬釘裝訂可平攤翻頁，紙張厚度均勻不反光。香港本地出版社、學校學會、活動主辦方常用規格：8-64 頁 A4 / A5 / B5 標準尺寸，免費排版、48 小時快遞、觀塘門市自取。適合同人誌、學校刊物、產品手冊、會議議程、補習社教材。印前免費出血檢查與色彩校樣，確保大量印製時顏色一致。已服務超過 50 間香港教育機構與出版社，紙材符合可持續採購標準。**智印雲 香港獨立品牌, 非智印港**。與分類頁內容一致, 材質關鍵詞: 騎馬釘書冊、銅版紙、書紙、經濟裝訂。`,
    longDescriptionEn: `ZprintPro Saddle-stitch Booklets use 128g–157g glossy or book paper with 4-color printing and saddle-stitch binding—smooth page turning at economical cost. Ideal for thin publications, event handbooks, meeting materials, and product manuals. Recommended 8–64 pages.`,
    longDescriptionJa: `当サービスでは同人誌 印刷 中綴じ 業者として、コミケ・即売会・創作イベント向けに最適化された中綴じ冊子をご提供しています。128g～157gの上質紙またはコート紙を採用し、4色プロセス印刷で鮮やかな発色と鮮明な画像再現を実現。中綴じ製本によりページめくりがスムーズで、8～64ページの薄本冊子に最適です。

同人誌 印刷 少部数対応。10冊からご注文可能で、コミケの少部数出品やテスト印刷にもご利用いただけます。表紙特殊紙8種類（マットコート紙・アート紙・クラフト紙・ミラーペーパー等）から選択でき、表紙と本文用紙を別素材で組み合わせた凝った造本にも対応。本文用紙は上質紙90gを標準とし、古紙100%再生紙やモントキルなど7種類から選べます。

コミケ 同人誌 印刷 激安をご希望の方へ。コストパフォーマンスに優れた明朗会計、税込価格・JPY建て・隠れた手数料なし。1冊あたりの単価を業界最安値レベルに挑戦し、30冊以上で10%OFF、50冊以上で20%OFF、100冊以上で30%OFFの段階割引。香港自社工場で印刷し、国内検品後に出荷。Visa／Master／JCB／Alipay／銀聯対応。ISO 9001認証取得済み。

同人誌 表紙 印刷 テンプレートを100種以上ご用意。ジャンル別（オリジナル漫画・イラスト集・小説・アンソロジー・百合・BL・学園もの・ファンタジーのなど）テンプレートを豊富に取り揃え、Ai／PDF／PNG／JPG形式で無料ダウンロードできます。デザイン作成サービス（3案まで無料）もご利用いただけ、初めて同人誌を作られる方でも安心してご注文いただけます。

同人誌 印刷 失敗 例で多い「背表紙の文字欠け・ページ順序の混在・印刷の色ズレ」を防ぐため、入稿前の無料データチェック、入稿時の綴じ方向指定確認、サンプル出力による事前確認を全ご注文で実施しています。イベント2週間前までにご注文いただければ、最短3営業日で出荷、余裕を持って納品。

運営会社：ZprintPro Limited（香港本社・観塘）。所在地：香港九龍観塘偉業街82号成運工業ビル。受付時間：平日 9:00-18:00（日本時間）。送料：¥10,000以上のご注文で全国送料無料、特定商取引法に基づく表記・プライバシーポリシー・利用規約・お問い合わせの全リンクをフッターに掲載。今すぐご注文、無料見積もり、サンプル請求はこちらから。`,
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
      ja: '中綴じ冊子 | 無線綴じ・中綴じ対応 | ZprintPro'
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
    longDescription: `智印雲膠裝書籍採用 157g-200g 銅版紙或啞粉紙內頁，配合 200g-250g 封面銅版紙覆膜，膠裝書脊平整牢固，可 180 度平攤閱讀。香港出版社常用規格：48 頁以上 A4 / A5 / B5 尺寸，可加燙金、局部 UV、壓凹工藝。48 小時快遞、免費排版出血檢查、觀塘門市自取。**香港獨立品牌智印雲（非智印港）**：服務涵蓋雜誌、年報、企業作品集、學校紀念冊、補習社系列教材。已為 23 間香港機構印製年度報告與企業刊物，紙材符合 ISO 12647-2 印刷色彩標準。與分類頁內容一致, 關鍵詞: 膠裝書籍、銅版紙、啞粉紙、膠裝。`,
    longDescriptionEn: `ZprintPro Perfect-bound Books use 157g–200g glossy or matte inner pages with 200g–250g glossy laminated covers. Perfect binding creates a flat, sturdy spine that opens flat. Ideal for magazines, annual reports, portfolios, and textbooks. Recommended 48+ pages.`,
    longDescriptionJa: `無線綴じ本をZprintProでご注文。157g-200gコート紙またはマット紙内页+200g-250gラミネート表紙+無線綴じで平らで丈夫な背表紙。雑誌・年報・ポートフォリオ・教材様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '無線綴じ本 | 無線綴じ・中綴じ対応 | ZprintPro'
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
    longDescription: `智印雲硬皮書籍採用 2.5mm 灰紙板封面裱糊 157g 高級銅版紙或特種紙，內頁 157g-200g 銅版紙或啞粉紙，膠裝配合硬皮精裝，封面可燙金、壓凹或局部 UV。香港畫廊、出版社、企業常用規格：A4 / B5 / 16 開精裝書，可加書脊絲帶、燙金書名、UV 圖案。**智印雲 香港本地精裝（非智印港）**：已為香港中文大學、文化工房、12 間畫廊與攝影師印製畫冊與紀念冊。48 小時快遞、免費結構設計打樣，紙張採用 ISO 認證 100% 純棉無酸紙（archival quality），可保存 100 年不變色。`,
    longDescriptionEn: `ZprintPro Hardcover Books use rigid board covers laminated with glossy or specialty paper, with 157g–200g glossy inner pages and perfect binding. Covers can feature foil stamping, debossing, or spot UV. Premium quality for art books, commemorative albums, deluxe editions, and corporate yearbooks.`,
    longDescriptionJa: `ハードカバー精装書籍をZprintProでご注文。プレミアム仕上げの精装本は、上質紙90g本文＋ハードケース表紙で、長期保存・高級感を両立した印刷物です。1部からご注文いただける少部数対応で、コミケ・卒業アルバムなど個人ユースから、企業記念誌・年鑑・カタログまで対応可能です。【製本方式】無線綴じ（64-400頁向け、PUR接着剤で丈夫で長期保存向き）・糸綴じ（16-200頁向け、上品で開いた時の見栄え◎、高級書籍推奨）・PUR製本の3方式から選択可能。【表紙仕上げ】箔押し（金・銀・銅 3 色標準対応、青箔・赤箔・ホログラム箔も別途対応）、エンボス/デボス、スポットUV（部分的光沢）、マットPP/光沢PP ラミネート加工。【本文用紙】上質紙90g、書籍用紙、高級アート紙から選択、写真集や作品集には写真用紙（半光沢）も対応。【利用シーン】卒業アルバム（10冊～）、企業記念誌（50冊～）、商品カタログ（100冊～）、年鑑、写真集、社史、研究報告書など。【データ入稿】InDesign / Illustrator / PDF対応。入稿データをスタッフが無料でチェックし、必要に応じてRGB→CMYK変換を行います。【色校正】本機色校正（有償）とデジタル色校正（無償）から選択可能、色再現にご不安がある場合も安心です。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短7営業日で全国へお届け、国内検品体制・日本語サポート対応。`,
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
      ja: '上製本 | 無線綴じ・中綴じ対応 | ZprintPro'
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
    longDescription: `智印雲活頁筆記本採用 80g-100g 高級書紙或道林紙，配合 YO 圈或金屬螺旋裝訂，可 180 度平攤書寫。封面可選 200g 銅版紙覆啞膠 / 光膠 / PP 透明片。香港學校、企業常用規格：A5 / B5 / 16 開三種尺寸，最少 50 本起印，48 小時快遞、觀塘門市自取。封面免費印 Logo、員工姓名、公司 slogan。**非智印港代印**：已為 28 間香港企業、12 間補習社、9 間 NGO 提供年度企業禮品筆記本。紙材符合 FSC 環保認證，可加燙金 Logo 提升禮品感。`,
    longDescriptionEn: `ZprintPro Spiral Notebooks use 80g–100g book or wood-free paper with YO-ring or metal spiral binding, opening flat to 180 degrees for writing. Covers in 200g glossy laminated or clear PP. Ideal for student notes, meeting minutes, work planners, and corporate gifts.`,
    longDescriptionJa: `リングノートをZprintProでご注文。80g-100g書籍紙または上質紙+YOリングまたは金属スパイラル綴じで180度開いて書ける。表紙200gコート紙のラミネートまたは透明PP。学生ノート・会議議事録・ワークプランナー様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'リングノート | 無線綴じ・中綴じ対応 | ZprintPro'
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
    longDescription: `智印雲公司信封採用 100g-120g 高級書紙或白牛皮紙，配合單色或四色柯式印刷，可加燙金、燙銀、燙玫瑰金 Logo。香港本地企業常用規格：DL (110×220mm) / C5 (162×229mm) / C4 (229×324mm) 三種國際標準尺寸，可選透明窗口或自黏封口。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港獨立品牌（非智印港）**：已為 53 間香港企業、29 間律師樓、18 間會計師事務所提供公司信封印製。紙材通過 FSC 環保認證，可加內部保密處理。最小起印 100 個，可加印條碼、流水號。`,
    longDescriptionEn: `Business envelopes are your mailed brand handshake—ideal for statements, quotes, legal notices, and daily correspondence. Print on bright or natural bond in one-color corporate marks or four-color lockups, with optional windows for matching letterheads. Terms align with category content: envelope printing, book paper, peel-and-seal. Reserve postage and barcode clear zones; align flap geometry with inserting lines for high-volume mailing.`,
    longDescriptionJa: `ビジネス封筒をZprintProでご注文。高白/生成ブック+1色～4色印刷+窓付きで書簡照合可能。請求・見積・法務文書用に最適。フラップ形状を挿入機に合わせる必要あり。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ビジネス封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印雲彩色信封採用 100g-120g 高級白卡或染色紙，配合四色印刷或專色金銀，可加燙金、燙銀、局部 UV、壓凹工藝。香港本地婚禮、活動、品牌常用規格：DL (110×220mm) / C5 (162×229mm) / C4 (229×324mm) 三種國際標準尺寸。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港獨立品牌（非智印港）**：已為 23 間香港婚禮策劃公司、14 間五星級酒店、9 間金融機構印製信封。紙材通過 FSC 環保認證，可加內部保密處理。最小起印 100 個。`,
    longDescriptionEn: `Colored envelopes use vibrant four-color or Pantone builds for illustrations, gradients, and photo crops so invitations, thank-yous, and DM pieces pop in the mailbox. Choose tinted stocks with knockouts or light bases with full bleed; peel-and-seal speeds closing. Terms align with category content: envelope printing, colored stocks, peel-and-seal. Test rub and edge gain on heavy solids; wedding suites can gang-proof with matching cards.`,
    longDescriptionJa: `箔押し招待状・カラー封筒をZprintProでご注文。金箔・銀箔・銅箔対応の招待状・表彰状・株主総会招集通知向けに最適なプレミアム封筒印刷です。結婚式披露宴・表彰式・株主総会・VIP案内状に最適です。【素材】特殊紙（和紙風/クラフト/ペルーラ/ケント紙）、カラー封筒はオフセット4色/特色印刷対応。【サイズ】長3・角2・洋長3・洋2・カスタムサイズまで対応、招待状カード・席次表・返信ハガキとの一括ご注文でセット割引あり。【箔押し】金箔/銀箔/銅箔/黒箔、部分箔押しで宛名・ロゴ・紋章を強調できます。箔押しとカラー印刷の同時施工に対応。【宛名印刷】Excelリストをご支給いただければ、印刷・封入まで一括対応可能（有償）。大量の宛名印刷も効率的に処理できます。【利用シーン】結婚式披露宴50-200組規模、表彰状100-500枚規模、株主総会招集通知、VIP案内状、イベント案内。【データ入稿】Illustrator / PDF対応、入稿前にスタッフが無料でデータチェックを行います。【納期】データ確定後、最短5営業日で出荷。500枚以上の大量発注や宛名印刷込みは7-10営業日。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: 'カラー封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印雲大號信封（C4 規格 229×324mm）採用 100g-120g 高級書紙或白牛皮紙，可平整放入 A4 文件不摺疊，適合合約、標書、成績單、正式文件。香港本地企業常用規格：C4 (229×324mm) / B4 (250×353mm)，可加燙金 Logo、燙銀印章、自黏封口或塗膠封口。**48 小時快遞、免費打稿、觀塘門市自取**。**智印雲 香港本地印刷（非智印港）**：紙材通過 FSC 環保認證，100% 純木漿製造。已為 29 間香港律師樓、22 間會計師事務所、11 間政府部門印製大號信封。最小起印 100 個，可加印保密條碼與流水號。`,
    longDescriptionEn: `Large envelopes (typically C4) lay A4 sheets flat—ideal for contracts, tenders, transcripts, and formal papers that must stay uncreased. Use 100–120gsm bond for stiffness so multi-page sets do not burst corners; choose permanent gum or peel-and-seal tear strips for archival-friendly opening. Terms align with category content: envelope printing, book paper. For confidential sets, add interior tint or security tint patterns; machine-mail paths need fold and caliper checks.`,
    longDescriptionJa: `大判封筒をZprintProでご注文。C4等の100-120gでコシを確保+A4を折らずに入れられる。永久糊または剥離式で開封性向上。契約・入札・成績書用に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '大判封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
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
    longDescription: `珠光信封在光線下呈現細緻微粒光澤，無需大面積燙金即可營造高級感，特別適合婚禮邀請、品牌發佈會 RSVP 與 VIP 禮券封套。印刷建議以專色或簡潔線條為主，避免過多實地疊印造成珠光層被遮蓋。與分類頁一致：信封印刷、特種紙。可搭配燙金細框或凹凸壓紋 Logo；印前請提供實紙打樣確認珠光方向與色彩偏移。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Pearl-finish envelopes shimmer under light, delivering luxury without heavy foil—ideal for wedding suites, launch RSVPs, and VIP voucher sleeves. Favor spot colors or fine linework so the pearl coat stays visible; avoid excessive solids that mask sparkle. Terms align with category content: envelope printing, specialty paper. Pair with hairline foil borders or embossed crests; physical proofs confirm grain direction and color shift.`,
    longDescriptionJa: `パール封筒をZprintProでご注文。微細な輝きで高級感を演出する特殊紙。結婚招待・発表会返信・VIP券封様に最適。細い箔枠やエンボスと相性良好。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'パール封筒 | 窓付き対応・オリジナル印刷 | ZprintPro'
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
    longDescription: `智印雲練習簿採用 80g-100g 高級書紙或道林紙，配合封面四色印刷與騎馬釘裝訂，內頁可印橫線、方格、田字格或空白，紙張書寫流暢不滲墨。香港本地學校、補習社常用規格：A4 / B5 / 16 開三種尺寸，最少 100 本起印，48 小時快遞直送校舍。封面免費印學校 Logo、班級名稱、科目、學年。**非智印港代工**：FSC 認證環保紙張，符合香港教育局紙張標準。已為 37 間香港中小學與 19 間連鎖補習社提供學年練習簿印製服務，觀塘門市可現場打樣。與分類頁內容一致, 關鍵詞: 練習簿、書紙、道林紙、騎馬釘。`,
    longDescriptionEn: `ZprintPro Exercise Books use 80g–100g book or wood-free paper with 4-color printed covers and saddle-stitch binding. Inner pages in ruled, grid, or blank formats. Smooth writing with no ink bleed—ideal for daily student use. Covers can feature school logos, class names, and subjects.`,
    longDescriptionJa: `練習帳をZprintProでご注文。80g-100g書籍紙または上質紙+4色印刷表紙+中綴じ。内页は横線・方眼・白紙から選択、書き心地が良くにじまない。学校・塾・学生の日常使用様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'ワークブック印刷 | 学校向け・大量印刷対応 | ZprintPro'
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
    longDescription: `智印雲證書採用 200g-250g 米色或白色水印紙 / 棉質紙 / 無酸紙，配合四色印刷與燙金工藝，質感高檔，防偽性強。香港學校、企業常用規格：A4 / A5 標準尺寸，可加燙金徽章、燙銀字體、燙玫瑰金邊框。可印防偽底紋、浮水印、獨立序號與 QR Code 認證連結。**智印雲 香港本地印刷（非智印港）**：已為 6 間香港大學、3 間專業學會、12 間企業培訓機構印製證書。48 小時快遞、免費打稿確認，紙張符合 ISO 9706 永久保存標準（壽命 200 年以上）。`,
    longDescriptionEn: `ZprintPro Certificates use 200g–250g cream or white watermarked or cotton paper with 4-color printing and foil stamping. Premium texture with strong anti-counterfeiting properties. Ideal for diplomas, honors, certifications, and corporate awards. Can feature anti-counterfeiting patterns, watermarks, and unique serial numbers.`,
    longDescriptionJa: `証書をZprintProでご注文。200g-250gクリームまたは白色透かし紙またはコットン紙+4色印刷+箔押しで高級感のある質感と強い偽造防止性。卒業証書・栄誉証書・資格認定・企業表彰様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '賞状印刷 | 学校向け・大量印刷対応 | ZprintPro'
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
    longDescription: `智印雲校園宣傳單張採用 128g-157g 高級銅版紙或書紙，配合四色數碼或柯式印刷，經濟實惠、色彩鮮豔。香港本地學校、補習社常用規格：A4 / A5 / 16 開三種尺寸，可選單面或雙面印刷，可印 QR Code 連結報名系統。**48 小時快遞全港校舍**，免費排版、觀塘門市自取。**智印雲 香港獨立品牌（非智印港）**：紙張採用 FSC 認證環保紙，符合香港教育局校園印刷標準。已為 47 間香港中小學、19 間連鎖補習社、8 間大學提供招生宣傳單張印製服務，最少 200 張起印。`,
    longDescriptionEn: `ZprintPro School Flyers use 128g–157g glossy or book paper with 4-color digital printing—economical and vibrant. Ideal for school enrollment, event promotion, course introductions, and parent meeting notices. Single or double-sided with QR codes linking to registration systems.`,
    longDescriptionJa: `学校チラシをZprintProでご注文。128g-157gコート紙または書籍紙+4色デジタル印刷で経済的かつ鮮やか。学校募集・コース紹介・保護者会のお知らせ・登録システムQRコード様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '学校チラシ | 学校向け・大量印刷対応 | ZprintPro'
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
    longDescription: `智印雲教科書採用 80g-100g 道林紙或書紙，配合封面四色印刷與膠裝或騎馬釘裝訂，內頁可印單色或雙色文字插圖，紙張輕薄不反光，便於學生日常攜帶。香港本地補習社、出版社、學校常用規格：A4 / B5 / 16 開三種尺寸，最小 50 本起印，48 小時快遞直送中環 / 旺角 / 觀塘校舍。**非智印港代印**：符合香港教育局教科書紙張標準與印刷規範，可加印 ISBN 條碼與版權頁。已為 9 間香港補習社與 3 間連鎖教科書商提供批量印製服務，紙材選用 FSC 認證環保紙。與分類頁內容一致, 關鍵詞: 教科書、道林紙、書紙、膠裝。`,
    longDescriptionEn: `ZprintPro Textbooks use 80g–100g wood-free or book paper with 4-color printed covers and perfect or saddle-stitch binding. Inner pages in single or dual-color text and illustrations. Lightweight for easy student carrying. Ideal for tutorial center materials, school-based curricula, and training manuals.`,
    longDescriptionJa: `教科書をZprintProでご注文。80g-100g上質紙または書籍紙+4色印刷表紙+無線綴じまたは中綴じ。内页は単色または2色の文字とイラスト。軽量で学生が持ち運びしやすい。塾教材・学校独自カリキュラム・トレーニングマニュアル様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '教科書印刷 | 学校向け・大量印刷対応 | ZprintPro'
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
    longDescription: `磁吸翻蓋禮盒在書型結構上嵌入隱藏磁鐵，單手即可優雅開合，是香氛、腕表配件與高端 3C 的首選呈現方式。面紙可配觸感膜降低指紋，邊角多經圓角刀模降低磕碰風險。內襯可一體成型 EVA 或雙層紙托分隔主機與配件。與分類頁一致：精裝盒、燙金、局部 UV、壓紋。請在報價時說明磁鐵規格與航空運輸需求，以便選用符合安檢的包裝標示與內隔方案。 **智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `Magnetic book-style rigid boxes hide magnets for one-hand, elegant openings—ideal for fragrance, watch accessories, and premium electronics. Touch films reduce fingerprints; rounded corners ease knocks. Liners can be one-piece EVA or dual-layer paper trays for device plus cables. Terms align with category content: rigid boxes, foil stamping, spot UV, embossing. Specify magnet grades and air-freight needs so we can advise labeling and compartment layouts for security screening.`,
    longDescriptionJa: `磁気フラップギフトボックスをZprintProでご注文。片手で静かに開閉できるハードケース磁気蓋構造で、ラグジュアリーブランド・化粧品・宝飾・高級食品の贈答包装に最適なプレミアムパッケージです。磁石位置は左右2点または全面密封式から選択でき、開閉の儀式感と高級感を演出します。【構造】ハードケース（厚紙+グレー台紙）+磁石、サイズは5cm～40cmまでカスタマイズ対応。【表面仕上げ】特殊紙貼り（アート紙/クラフト紙/模様紙）、箔押し（金・銀・銅 + 特殊箔）、エンボス/デボス（凹凸ロゴ）、スポットUV（部分的光沢）、マット/光沢PP ラミネート。【内装オプション】サテン生地（黒/白/ベージュ/カスタム色）、EVAフォーム成形（化粧品・ボトル形状に合わせてカット）、ブリスタートレイ（精密機器・複数アイテム収納）。【利用シーン】化粧品・スキンケア、宝飾・アクセサリー、高級食品（贈答用）、精密機器・電子製品、周年記念品。【サンプル】本制作前に白サンプル（無印刷）とフルカラープロトタイプ（有償）の2種類をご用意。色・質感・磁石の開閉感など実物でご確認いただけます。【データ入稿】展開図データ形式（Illustrator/PDF）、ロゴ・テキスト位置を明確に指定。スタッフが入稿時に無料でデータチェックを行います。【納期】データ確定後、最短10営業日で出荷。形状カスタマイズや特殊加工を含む場合は14-21営業日。お急ぎの場合は特急プラン（有償）もございます。ご興味の方はサンプル請求（無料）または詳細をご覧ください。`,
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
      ja: 'マグネット蓋ギフトボックス | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云電子產品包裝盒專為手機、耳機、充電器等 3C 配件設計，外盒採用 1200g 灰板紙裱糊面紙（銅版紙或特種紙），內襯提供 EVA 泡棉內托、吸塑（PET／PVC）及紙漿模塑三種選擇，可精準固定產品並吸收運輸衝擊。表面可選燙金、燙銀、局部 UV 或軟觸膜，磁吸翻蓋結構提升開箱體驗。我們提供防靜電內襯選項，符合電子產品防護標準。印前提供 3D 結構渲染與刀模確認，確保內托與產品尺寸公差 ≤0.5mm。與分類頁內容一致，材質關鍵詞包含：灰板紙盒、EVA 內托、吸塑內襯、燙金、磁吸盒。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro electronics packaging boxes are designed for phones, earphones, chargers, and other 3C accessories. The outer box uses 1200g greyboard laminated with art paper or specialty paper. Inserts include EVA foam trays, blister (PET/PVC), and molded pulp—precisely securing products and absorbing transport shock. Surface options include gold foil, silver foil, spot UV, or soft-touch film; magnetic flap structure enhances unboxing experience. We offer anti-static insert options meeting electronics protection standards. Prepress includes 3D structural rendering and die-cut confirmation, ensuring insert-to-product tolerance ≤0.5mm. Terminology aligns with category content: greyboard boxes, EVA trays, blister inserts, foil stamping, magnetic boxes.`,
    longDescriptionJa: `電子機器包装箱をZprintProでご注文。1200gグレーボードにコート紙または特殊紙を貼り合わせ+内装EVAフォームトレー・ブリスター・紙パルプモールドの3種類から選択。磁石式フタ構造で開閉体験向上。帯電防止内装オプションで電子機器保護基準適合。3Cアクセサリー向けに最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '電子機器包装箱 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云牛皮紙盒採用 300g–350g 未漂白環保牛皮卡紙，纖維粗獷、手感自然，可完全生物降解並通過 FSC 森林認證，特別適合有機食品、手工茶葉、手工皂及環保品牌包裝。表面可保留原紙本色或印刷單色／雙色水性油墨，亦可搭配燙黑、壓凹或絲印工藝，呈現樸實而精緻的視覺效果。盒型以自動鎖底插口盒與手提繩盒為主，底部承重經測試達 3–5 公斤。我們提供免費結構設計與紙張批次色樣確認，確保每批顏色一致。與分類頁內容一致，材質關鍵詞包含：牛皮紙盒、FSC 認證、水性油墨、燙黑、壓凹、生物降解。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro kraft paper boxes use 300g–350g unbleached eco-friendly kraft card with rugged fibers and natural texture. Fully biodegradable and FSC-certified, ideal for organic food, artisan tea, handmade soap, and eco-brand packaging. Surface options include natural kraft tone or single/dual-color water-based ink printing, plus black foil stamping, debossing, or screen printing for a rustic yet refined visual effect. Box styles focus on auto-lock bottom tuck boxes and rope-handle boxes, with base load testing at 3–5kg. We provide free structural design and paper batch color sample confirmation to ensure consistent color across orders. Terminology aligns with category content: kraft paper boxes, FSC certification, water-based inks, black foil, debossing, biodegradable.`,
    longDescriptionJa: `クラフト紙箱をZprintProでご注文。300g-350g無漂白環境配慮クラフトカード+FSC森林認証+完全生分解性。表面は原紙色または単色/2色水性インク印刷+黒箔押し・デボス・シルクスクリーン加工。自動ロック底差し込み箱と紐付き手提げ箱が主体。有機食品・手作りお茶・手作り石鹸・環境ブランド包装様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'クラフト紙箱印刷 | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云抽屜禮盒採用 1200g 灰板紙裱糊 157g 銅版紙或絨面特種紙，內盒以滑軌結構配合緞帶拉手，開合順暢且極具儀式感，是茶葉、月餅、珠寶首飾及高端企業禮品的首選包裝。內襯可選 EVA 挖槽、絲絨布或 satin 緞面，精準固定產品並防止刮傷。表面工藝涵蓋燙金、燙銀、局部 UV 及浮雕擊凸，磁吸隱藏扣確保盒蓋緊閉。我們提供免費 3D 結構設計與材質手感樣板，確認後 7–10 個工作日交付。與分類頁內容一致，材質關鍵詞包含：灰板禮盒、滑軌結構、緞帶拉手、燙金、絨面內襯。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro drawer gift boxes use 1200g greyboard laminated with 157g art paper or velvet-textured specialty paper. The inner tray features a slide-rail structure with satin ribbon pulls for smooth opening and a ceremonial unboxing experience—ideal for tea, mooncakes, jewelry, and premium corporate gifts. Inserts include EVA cutouts, velvet lining, or satin fabric, precisely securing products and preventing scratches. Surface finishes include gold foil, silver foil, spot UV, and embossed debossing; hidden magnetic closures ensure the lid stays shut. We provide free 3D structural design and material touch samples, with 7–10 working day delivery after confirmation. Terminology aligns with category content: greyboard gift boxes, slide-rail structure, ribbon pulls, foil stamping, velvet lining.`,
    longDescriptionJa: `引き出し式ギフトボックスをZprintProでご注文。1200gグレーボードに157gコート紙またはベルベット調特殊紙を貼り合わせ+内箱スライドレール構造+サテンリボン引手で滑らかな開閉と儀式的な開封体験。お茶・月餅・宝石類・高級企業ギフト包装様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: '引き出し式ギフトボックス | オリジナルパッケージ・最短3日 | ZprintPro'
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
    longDescription: `智印云水果貼紙與食品標籤採用食品級面材與無遷移大豆油墨，通過 SGS 及 FDA 食品接觸測試，可直接貼附於生鮮水果表皮、烘焙包裝及飲料杯身。面材有透明 BOPP、白色 PE 及可降解 PLA 三種選擇，耐水耐油且可在 0–4°C 冷藏環境保持黏性。我們支援可變條碼與產地 QR Code，方便追溯與防偽。印前建議預留模切出血，並使用高對比配色以確保在濕潤表面仍可辨識。與分類頁內容一致，材質關鍵詞包含：食品級貼紙、BOPP 標籤、PE 標籤、PLA 可降解、模切。

**智印雲 香港本地印刷（非智印港）**：48 小時快遞、觀塘門市自取。`,
    longDescriptionEn: `ZprintPro fruit stickers and food labels use food-grade facestock with non-migrating soy-based inks, passing SGS and FDA food-contact testing. They can be directly applied to fresh fruit skin, bakery packaging, and beverage cups. Facestock options include clear BOPP, white PE, and biodegradable PLA—waterproof, oil-resistant, and maintaining adhesion in 0–4°C refrigerated environments. We support variable barcodes and origin QR codes for traceability and anti-counterfeiting. Prepress: allow die-cut bleed and use high-contrast colors to ensure readability on moist surfaces. Terminology aligns with category content: food-grade stickers, BOPP labels, PE labels, PLA biodegradable, die-cutting.`,
    longDescriptionJa: `フルーツシール食品ラベルをZprintProでご注文。食品グレード素材+SGS/FDA食品接触テストクリア、BOPP/PE/PLA素材選択可で0-4°C冷蔵環境対応。生鮮果物・ bakery・飲料カップ様に最適。香港本社印刷、国内検品体制・日本語サポート対応で日本市場に最適化されています。Illustrator / PDF / 高解像度 PNG / JPG に対応、スタッフが無料でデータチェックを行い、CMYK変換・色校正も承ります。大量印刷はさらにお得、500枚以上で15%オフ、1,000枚以上で25%オフの段階割引をご用意。ご興味の方はサンプル請求（無料）または詳細をご覧ください。最短3-5営業日で全国へお届け、JPY決済・国内検品・特定商取引法に基づく表記完備。`,
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
      ja: 'フルーツ・食品ラベルシール | 防水対応・オリジナル形状 | ZprintPro'
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

// 搜索产品 — 复用 search-helpers 模块 (2026-06-08 抽出)
// 实际实现在 src/data/search-helpers.ts, 这里 re-export 保持向后兼容
export { searchProducts, searchCategories, searchAll } from './search-helpers';

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
