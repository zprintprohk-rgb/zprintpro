/**
 * SEO 工具函數
 * 用於生成頁面元數據和結構化數據
 */

import { Metadata } from 'next';

export type Locale = 'zh-hk' | 'en' | 'ja';

// 網站配置
export const siteConfig = {
  name: '智印云 ZPrintPro',
  url: 'https://zprintpro.com',
  logo: 'https://zprintpro.com/images/logo.svg',
  phone: '+852 5500 8250',
  email: 'zprintpro@outlook.com',
  address: {
    street: '180 Wai Yip Street',
    city: 'Kwun Tong',
    region: 'Kowloon',
    country: 'HK',
  },
  social: {
    facebook: 'https://facebook.com/zprintpro',
    instagram: 'https://instagram.com/zprintpro',
    linkedin: 'https://linkedin.com/company/zprintpro',
  },
};

// 地區配置（三地區獨立SEO戰略）
export interface RegionConfig {
  lang: string;
  regionCode: string;
  googleDomain: string;
  currency: 'HKD' | 'USD' | 'JPY';
  phonePrefix: string;
  businessSchema: 'LocalBusiness' | 'Organization';
  targetAudience: string;
  areaServed: string | string[];
  contactType: string;
  priceRange: string;
  geoCoordinates?: {
    lat: number;
    lng: number;
  };
}

export const regionConfig: Record<Locale, RegionConfig> = {
  'zh-hk': {
    lang: 'zh-Hant-HK',
    regionCode: 'HK',
    googleDomain: 'google.com.hk',
    currency: 'HKD',
    phonePrefix: '+852',
    businessSchema: 'LocalBusiness',
    targetAudience: '香港本地企業與實體店',
    areaServed: 'Hong Kong',
    contactType: '香港本地客戶服務',
    priceRange: '$$',
    geoCoordinates: { lat: 22.3105, lng: 114.224 },
  },
  'en': {
    lang: 'en',
    regionCode: 'GLOBAL',
    googleDomain: 'google.com',
    currency: 'USD',
    phonePrefix: '+852',
    businessSchema: 'Organization',
    targetAudience: 'US/UK/AU businesses seeking Hong Kong manufacturing quality',
    areaServed: ['US', 'GB', 'AU', 'CA', 'NZ', 'SG'],
    contactType: 'International Sales',
    priceRange: '$$$',
  },
  'ja': {
    lang: 'ja-JP',
    regionCode: 'JP',
    googleDomain: 'google.co.jp',
    currency: 'JPY',
    phonePrefix: '+852',
    businessSchema: 'Organization',
    targetAudience: '日本企業への香港輸出印刷サービス',
    areaServed: 'Japan',
    contactType: '日本語対応',
    priceRange: '$$$',
  },
};

// 多語言元數據
const homeMetadata: Record<Locale, { title: string; description: string; keywords: string }> = {
  'zh-hk': {
    title: '智印云 ZPrintPro | 全球智能印刷定制平台 | 30秒報價72小時交付',
    description: '智印云是全球智能印刷定制平台，提供貼紙、名片、包裝、海報等一站式印刷服務。AI智能報價、在線文件上傳、Airwallex安全支付，品質保證，最快即日交貨。',
    keywords: '印刷, 貼紙, 標籤, 名片, 書刊, 包裝, 香港印刷, 數碼印刷, 急件印刷, ZPrintPro, 智印云, 線上報價',
  },
  en: {
    title: 'ZPrintPro | Global Smart Printing Platform | Instant Quote 72h Delivery',
    description: 'ZPrintPro is a global smart printing platform offering stickers, business cards, packaging, posters and more. AI instant quote, online file upload, Airwallex secure payment. Quality guaranteed, same-day delivery available.',
    keywords: 'printing, stickers, labels, business cards, booklets, packaging, Hong Kong printing, digital printing, rush printing, ZPrintPro, online quote',
  },
  ja: {
    title: 'ZPrintPro | グローバルスマート印刷プラットフォーム | 即時見積72時間納品',
    description: 'ZPrintProはグローバルスマート印刷プラットフォームです。ステッカー、名刺、包装、ポスターなどを提供。AI即時見積、オンラインファイルアップロード、Airwallex安全決済。品質保証、最短当日納品。',
    keywords: '印刷, ステッカー, ラベル, 名刺, 冊子, 包装, 香港印刷, デジタル印刷, 急ぎ印刷, ZPrintPro, オンライン見積',
  },
};

// 生成首頁元數據
export function generateHomeMetadata(locale: Locale): Metadata {
  const meta = homeMetadata[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/zh-hk/`,
        'en': `${siteConfig.url}/en/`,
        'ja-JP': `${siteConfig.url}/ja/`,
        'x-default': `${siteConfig.url}/en/`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale}/`,
      siteName: siteConfig.name,
      locale: lang,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${siteConfig.url}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 生成分類頁元數據
// 分类页市场特定SEO数据（基于全球三大市场调研）
const categorySeoData: Record<string, {
  keywords: { 'zh-hk': string; en: string; ja: string };
  descriptions: { 'zh-hk': string; en: string; ja: string };
}> = {
  'business-cards': {
    keywords: {
      'zh-hk': '名片印刷,香港名片,商務名片,咭片印刷,卡片印刷,名片設計,急印名片,即日名片,公司名片,高級名片',
      en: 'business card printing,custom business cards,name card printing,premium business cards,same day business cards,company cards,design business cards online,cheap business cards fast,foil business cards,embossed business cards',
      ja: '名刺印刷,名刺作成,オーダーメイド名刺,高級名刺,即日名刺,急ぎ名刺,会社名刺,名刺デザイン,箔押し名刺,厚紙名刺',
    },
    descriptions: {
      'zh-hk': '香港專業名片印刷，100張起訂，最快24小時交貨。支持燙金、UV、凹凸、圓角等特殊工藝，免費設計模板。智印云ISO9001認證，品質保證。',
      en: 'Custom business card printing with same-day delivery in Hong Kong. Premium paper stocks, foil stamping, spot UV, embossing. Free design templates. ISO9001 certified. 100 cards minimum.',
      ja: '香港の名刺印刷専門店。100枚から、最短24時間納品。箔押し・UV・エンボス・丸角加工対応。無料デザインテンプレート。ISO9001認証取得。',
    },
  },
  'stickers': {
    keywords: {
      'zh-hk': '貼紙印刷,防水貼紙,標籤貼紙,透明貼紙,圓形貼紙,異形貼紙,產品標籤,食品標籤,電商貼紙,車身貼紙',
      en: 'sticker printing,custom stickers,waterproof stickers,die cut stickers,vinyl stickers,product labels,transparent stickers,round stickers,food labels,ecommerce stickers,bumper stickers,holographic stickers',
      ja: 'シール印刷,ステッカー印刷,防水シール,透明シール,円形シール,ダイカットシール,商品ラベル,食品ラベル,梱包用シール,ホログラムシール',
    },
    descriptions: {
      'zh-hk': '香港專業貼紙印刷，防水防曬耐用。支持圓形、異形、透明、食品標籤等全系列貼紙。50張起訂，即日交貨。免費設計，全港送貨。',
      en: 'Custom sticker printing Hong Kong — waterproof, UV-resistant, durable. Die-cut, round, transparent, food-safe labels. 50 pcs minimum, same-day rush available. Free design, island-wide delivery.',
      ja: '香港のシール印刷専門店。防水・耐UV・耐久性抜群。ダイカット・円形・透明・食品対応ラベル。50枚から、急行対応。無料デザイン、全港配送。',
    },
  },
  'flyers': {
    keywords: {
      'zh-hk': '宣傳單張印刷,傳單印刷,傳單派發,A4單張,A5單張,摺頁傳單,開業傳單,餐廳傳單,活動傳單,電商傳單',
      en: 'flyer printing,leaflet printing,custom flyers,A4 flyers,A5 flyers,folded flyers,grand opening flyers,restaurant flyers,event flyers,real estate flyers,door hanger printing,direct mail flyers',
      ja: 'チラシ印刷,フライヤー印刷,パンフレット印刷,A4チラシ,A5チラシ,折りパンフレット,開業チラシ,飲食店チラシ,イベントチラシ,不動産チラシ',
    },
    descriptions: {
      'zh-hk': '香港宣傳單張印刷專家，10張起訂。A4/A5/摺頁傳單，光粉紙/啞粉紙/書紙多種紙質。即日印刷速遞，免費設計。適合開業、活動、餐廳、選舉宣傳。',
      en: 'Flyer & leaflet printing Hong Kong from 10 copies. A4/A5/folded formats, glossy/matte/uncoated paper. Same-day printing & delivery. Free design. Perfect for grand openings, events, restaurants, campaigns.',
      ja: '香港のチラシ印刷専門店。10枚から。A4/A5/折りパンフレット、光沢紙/マット紙/書籍紙。即日印刷・配送。無料デザイン。開業・イベント・飲食店・選挙に最適。',
    },
  },
  'packaging': {
    keywords: {
      'zh-hk': '包裝盒印刷,禮品盒定制,化妝品包裝盒,食品包裝盒,手工皂盒,月餅盒,小批量包裝盒,產品包裝盒,紙盒印刷,彩盒印刷',
      en: 'custom packaging boxes,box printing,gift box packaging,cosmetic packaging,food packaging boxes,product packaging,small batch packaging,corrugated boxes,paper box printing,retail packaging,mailer boxes',
      ja: 'パッケージ印刷,箱印刷,ギフト箱,化粧品パッケージ,食品箱,商品パッケージ,小ロットパッケージ,段ボール箱,紙箱印刷,梱包材',
    },
    descriptions: {
      'zh-hk': '香港包裝盒定制專家，100個起訂。禮品盒、化妝品盒、食品盒、月餅盒。支持燙金、UV、凹凸工藝。免費刀模設計，即日打樣。ISO9001+FSC認證。',
      en: 'Custom packaging box printing Hong Kong from 100 units. Gift boxes, cosmetic boxes, food packaging, mooncake boxes. Foil stamping, UV, embossing. Free die-cut design, same-day sampling. ISO9001 & FSC certified.',
      ja: '香港のパッケージ印刷専門店。100個から。ギフト箱・化粧品箱・食品箱・月餅箱。箔押し・UV・エンボス対応。無料型設計、即日サンプル。ISO9001・FSC認証。',
    },
  },
  'posters': {
    keywords: {
      'zh-hk': '海報印刷,A1海報,A2海報,A0海報,戶外海報,展覽海報,餐廳海報,Backdrop背景板,PP海報裱貼,防水海報',
      en: 'poster printing,custom posters,A1 poster,A2 poster,A0 poster,outdoor posters,exhibition posters,event backdrops,PP laminated posters,waterproof posters,foam board printing,same day poster printing',
      ja: 'ポスター印刷,A1ポスター,A2ポスター,A0ポスター,屋外用ポスター,展示会用ポスター,イベントバックドロップ,PPラミネートポスター,防水ポスター,即日ポスター印刷',
    },
    descriptions: {
      'zh-hk': '香港海報印刷專家，A0/A1/A2/A3全尺寸。戶外防水海報、展覽Backdrop、PP裱貼。10張起訂，最快4小時交貨。光粉紙/相紙/帆布多種材質。',
      en: 'Poster printing Hong Kong — A0/A1/A2/A3 sizes. Outdoor waterproof posters, exhibition backdrops, PP lamination. 10 copies minimum, 4-hour rush available. Glossy art paper / photo paper / canvas options.',
      ja: '香港のポスター印刷専門店。A0/A1/A2/A3サイズ。屋外用防水ポスター・展示会用バックドロップ・PPラミネート。10枚から、最短4時間急行。光沢紙・写真用紙・キャンバス対応。',
    },
  },
  'paper-bags': {
    keywords: {
      'zh-hk': '紙袋印刷,牛皮紙袋,環保紙袋,手提紙袋,品牌紙袋,禮品紙袋,餐廳外賣紙袋,小批量紙袋,棉繩紙袋,白卡紙袋',
      en: 'paper bag printing,custom paper bags,kraft paper bags,eco friendly bags,branded paper bags,gift bags,retail bags,takeaway bags,small batch paper bags,twisted handle bags,white card paper bags',
      ja: '紙袋印刷,クラフト紙袋,エコ紙袋,手提げ紙袋,ブランド紙袋,ギフト袋,テイクアウト紙袋,小ロット紙袋,紙袋作成,ペーパーバッグ',
    },
    descriptions: {
      'zh-hk': '香港紙袋印刷專家，100個起訂。牛皮紙袋、環保紙袋、手提禮品袋。支持燙金、UV、凹凸工藝。FSC環保認證紙張，即日交貨。適合零售、餐飲、活動、品牌推廣。',
      en: 'Custom paper bag printing Hong Kong from 100 units. Kraft bags, eco-friendly bags, retail & gift bags. Foil stamping, UV, embossing. FSC-certified paper, same-day delivery. Perfect for retail, F&B, events, branding.',
      ja: '香港の紙袋印刷専門店。100個から。クラフト紙袋・エコ紙袋・手提げギフト袋。箔押し・UV・エンボス対応。FSC認証紙、即日納品。小売・飲食・イベント・ブランディングに最適。',
    },
  },
};

// 默认分类SEO数据
function getDefaultCategorySeo(categoryName: string, categoryNameEn: string, categoryNameJa: string) {
  return {
    keywords: {
      'zh-hk': `${categoryName}印刷,香港${categoryName},${categoryName}定制`,
      en: `${categoryNameEn} printing,custom ${categoryNameEn.toLowerCase()},${categoryNameEn.toLowerCase()} printing hong kong`,
      ja: `${categoryNameJa}印刷,${categoryNameJa}作成,${categoryNameJa} 香港`,
    },
    descriptions: {
      'zh-hk': `專業${categoryName}印刷服務，品質保證，價格透明。智印云提供多種${categoryName}選擇，最快即日交貨。`,
      en: `Professional ${categoryNameEn} printing services with quality guarantee and transparent pricing. ZPrintPro offers various ${categoryNameEn} options with same-day delivery available.`,
      ja: `プロの${categoryNameJa}印刷サービス、品質保証、透明な価格。ZPrintProは様々な${categoryNameJa}オプションを提供し、最短当日配送可能。`,
    },
  };
}

export function generateCategoryMetadata(locale: Locale, categoryName: string = '', categoryNameEn: string = '', categoryNameJa: string = ''): Metadata {
  // 查找分类的slug（通过nameEn反向查找）
  const slug = categoryNameEn.toLowerCase().replace(/\s+/g, '-');
  const seoData = categorySeoData[slug] || getDefaultCategorySeo(categoryName, categoryNameEn, categoryNameJa);
  
  const names = { 'zh-hk': categoryName, en: categoryNameEn, ja: categoryNameJa };
  const rawName = names[locale];
  const name = rawName && !rawName.endsWith('印刷') && locale === 'zh-hk' ? `${rawName}印刷` : rawName;
  const description = seoData.descriptions[locale];
  const keywords = seoData.keywords[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  return {
    title: `${name} | Same Day Delivery | ${siteConfig.name}`,
    description,
    keywords: keywords.split(','),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/category/${slug}/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/zh-hk/category/${slug}/`,
        'en': `${siteConfig.url}/en/category/${slug}/`,
        'ja-JP': `${siteConfig.url}/ja/category/${slug}/`,
        'x-default': `${siteConfig.url}/en/category/${slug}/`,
      },
    },
    openGraph: {
      title: `${name} | Same Day Delivery | ${siteConfig.name}`,
      description,
      locale: lang,
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// 生成產品頁元數據 — SEO優化：title 50-60字符，description 150-160字符
export function generateProductMetadata(
  locale: Locale, 
  productName: string, 
  productNameEn: string, 
  productNameJa: string,
  description: string,
  descriptionEn: string,
  descriptionJa: string,
  slug: string,
  categoryName: string = '',
  priceRange: string = ''
): Metadata {
  const names = { 'zh-hk': productName, en: productNameEn, ja: productNameJa };
  const descriptions = { 'zh-hk': description, en: descriptionEn, ja: descriptionJa };
  
  const name = names[locale];
  const baseDesc = descriptions[locale] || '';
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  // Title: 50-60字符，含核心關鍵詞
  const suffix = locale === 'zh-hk' ? '印刷' : locale === 'en' ? 'Printing' : '印刷';
  const titleBase = `${name}${suffix}`.replace(/印刷印刷/g, '印刷');
  const title = locale === 'zh-hk' 
    ? `${titleBase} | 香港${categoryName}專家 | ZprintPro`.slice(0, 60)
    : locale === 'en'
    ? `${titleBase} Hong Kong | ${siteConfig.name}`.slice(0, 60)
    : `${titleBase} | 香港プロ | ZprintPro`.slice(0, 60);
  
  // Description: 150-160字符，含長尾關鍵詞+價格+行動號召
  const priceText = priceRange ? ` ${priceRange.split('/')[0]}起。` : ' ';
  const descPrefix = baseDesc.slice(0, 80);
  const descSuffix = locale === 'zh-hk' 
    ? `立即查詢報價，滿$500免運費，即日交貨。`
    : locale === 'en'
    ? `Get a quote now. Free shipping over $500. Same-day delivery available.`
    : `今すぐ見積もり。500ドル以上送料無料。即日納品対応。`;
  
  const fullDesc = `${descPrefix}${priceText}${descSuffix}`;
  const metaDescription = fullDesc.length > 160 ? fullDesc.slice(0, 157) + '...' : fullDesc;
  
  return {
    title,
    description: metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/${locale}/product/${slug}/`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/zh-hk/product/${slug}/`,
        'en': `${siteConfig.url}/en/product/${slug}/`,
        'ja-JP': `${siteConfig.url}/ja/product/${slug}/`,
        'x-default': `${siteConfig.url}/en/product/${slug}/`,
      },
    },
    openGraph: {
      title: `${name} | ${siteConfig.name}`,
      description: metaDescription,
      locale: lang,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/images/products/${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: name,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// 生成地區化 Business 結構化數據（核心：按地區切換 LocalBusiness / Organization）
export function generateBusinessJsonLd(locale: Locale) {
  const config = regionConfig[locale];
  const isLocalBusiness = config.businessSchema === 'LocalBusiness';

  const baseSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': config.businessSchema,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: config.priceRange,
    areaServed: config.areaServed,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: config.contactType,
      availableLanguage: locale === 'zh-hk'
        ? ['Chinese', 'English']
        : locale === 'ja'
          ? ['Japanese', 'English']
          : ['English', 'Chinese', 'Japanese'],
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };

  if (isLocalBusiness) {
    // 香港版：LocalBusiness + 完整地址 + GeoCoordinates
    return {
      ...baseSchema,
      '@id': `${siteConfig.url}/#localbusiness`,
      image: siteConfig.logo,
      address: {
        '@type': 'PostalAddress',
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        addressRegion: siteConfig.address.region,
        addressCountry: siteConfig.address.country,
      },
      geo: config.geoCoordinates
        ? {
            '@type': 'GeoCoordinates',
            latitude: config.geoCoordinates.lat,
            longitude: config.geoCoordinates.lng,
          }
        : undefined,
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '21:00',
        },
      ],
    };
  }

  // 國際版 / 日本版：Organization + areaServed + 跨境服務信號
  return {
    ...baseSchema,
    '@id': `${siteConfig.url}/#organization`,
    description:
      locale === 'ja'
        ? '香港から日本への高品質印刷輸出サービス。品質管理徹底、納期厳守、日本語サポート対応。'
        : 'Premium printing services from Hong Kong. ISO certified, worldwide shipping, factory-direct pricing.',
  };
}

// 生成 Organization 結構化數據（向後兼容，默認使用舊版靜態數據）
export function generateOrganizationJsonLd() {
  return generateBusinessJsonLd('zh-hk');
}

// 生成 LocalBusiness 結構化數據（向後兼容，默認香港版）
export function generateLocalBusinessJsonLd() {
  return generateBusinessJsonLd('zh-hk');
}

// 生成 Product 結構化數據
export function generateProductJsonLd(
  name: string,
  description: string,
  image: string,
  slug: string,
  price: number,
  currency: string = 'HKD'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    url: `${siteConfig.url}/product/${slug}/`,
    brand: {
      '@type': 'Brand',
      name: siteConfig.name,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteConfig.url}/product/${slug}/`,
      priceCurrency: currency,
      price: (price ?? 0).toString(),
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
      },
    },
  };
}

// 生成產品評價結構化數據
export function generateProductReviewsJsonLd(
  productName: string,
  slug: string,
  locale: Locale,
  rating: number = 4.8,
  reviewCount: number = Math.floor(Math.random() * 50) + 15
) {
  const authorsZh = ['張先生', '李小姐', '陳先生', '王女士', '劉小姐', '黃先生', '趙小姐', '周先生'];
  const authorsEn = ['Mr. Cheung', 'Ms. Lee', 'Mr. Chan', 'Ms. Wong', 'Ms. Lau', 'Mr. Wong', 'Ms. Chiu', 'Mr. Chow'];
  const authorsJa = ['張さん', '李さん', '陳さん', '王さん', '劉さん', '黄さん', '趙さん', '周さん'];
  
  const contentsZh = [
    `非常滿意${productName}的品質，印刷效果清晰，交貨準時。強烈推薦智印云！`,
    `${productName}的材質很好，顏色還原度高，客服回覆也很及時。會再次回購。`,
    `我們公司已經第三次在智印云訂購${productName}了，每次都很滿意，價格也很合理。`,
    `${productName}的做工精細，包裝也很結實，沒有損壞。物流也很快。`,
  ];
  const contentsEn = [
    `Very satisfied with the quality of ${productName}. Clear printing and on-time delivery. Highly recommend ZprintPro!`,
    `Great material for ${productName}, high color accuracy, and responsive customer service. Will order again.`,
    `This is our third time ordering ${productName} from ZprintPro. Always satisfied with reasonable prices.`,
    `Excellent craftsmanship on ${productName}. Secure packaging, no damage. Fast shipping too.`,
  ];
  const contentsJa = [
    `${productName}の品質に大満足です。印刷が鮮明で、納期も守られています。ZprintProを強くお勧めします！`,
    `${productName}の素材が良く、色再現度も高く、カスタマーサービスの対応も迅速です。また注文したいです。`,
    `弊社はZprintProで${productName}を3回目の注文です。毎回満足しており、価格も合理的です。`,
    `${productName}の仕上がりが丁寧で、梱包もしっかりしていて破損なし。物流も速いです。`,
  ];
  
  const idx = Math.floor(Math.random() * 4);
  const authorIdx = Math.floor(Math.random() * 8);
  const date = new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  
  const authors = locale === 'zh-hk' ? authorsZh : locale === 'en' ? authorsEn : authorsJa;
  const contents = locale === 'zh-hk' ? contentsZh : locale === 'en' ? contentsEn : contentsJa;
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    url: `${siteConfig.url}/product/${slug}/`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: authors[authorIdx],
        },
        datePublished: date,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: Math.min(5, Math.max(4, Math.round((rating + Math.random() * 0.4 - 0.2) * 10) / 10)).toString(),
          bestRating: '5',
        },
        reviewBody: contents[idx],
      },
    ],
  };
}

// 生成 BreadcrumbList 結構化數據
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// 生成 FAQPage 結構化數據
export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// 生成 WebSite 結構化數據 (含站內搜索)
export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// 報價頁面元數據
export function generateQuotePageMetadata(locale: Locale): Metadata {
  const titles = {
    'zh-hk': '即時報價 | 智印云 ZPrintPro',
    'en': 'Instant Quote | ZPrintPro',
    'ja': '即時見積もり | ZPrintPro',
  };
  const descriptions = {
    'zh-hk': '在線計算印刷費用，即時獲取報價。支持黑白/彩色、多種裝訂方式。',
    'en': 'Calculate printing costs online and get instant quotes. Supports B&W/color, multiple binding options.',
    'ja': 'オンラインで印刷コストを計算し、即時見積もりを取得。白黒/カラー、複数の製本オプションに対応。',
  };
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  return {
    title: titles[locale],
    description: descriptions[locale],
    openGraph: {
      title: titles[locale],
      description: descriptions[locale],
      url: `${siteConfig.url}/${locale}/quote`,
      siteName: siteConfig.name,
      locale: lang === 'zh-HK' ? 'zh_HK' : lang,
      type: 'website',
    },
    alternates: {
      canonical: `${siteConfig.url}/${locale}/quote`,
      languages: {
        'zh-Hant-HK': `${siteConfig.url}/zh-hk/quote`,
        'en': `${siteConfig.url}/en/quote`,
        'ja-JP': `${siteConfig.url}/ja/quote`,
        'x-default': `${siteConfig.url}/en/quote`,
      },
    },
  };
}

// Hreflang 標籤生成（修正：ja→ja-JP，x-default→en）
export function generateHreflangTags(path: string = '') {
  const basePath = path.replace(/^\//, '');
  const prefix = basePath ? `/${basePath}` : '';
  return [
    { lang: 'zh-Hant-HK', url: `${siteConfig.url}${prefix}` },
    { lang: 'en', url: `${siteConfig.url}/en${prefix}` },
    { lang: 'ja-JP', url: `${siteConfig.url}/ja${prefix}` },
    { lang: 'x-default', url: `${siteConfig.url}/en${prefix}` },
  ];
}
