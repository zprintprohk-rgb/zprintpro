/**
 * SEO 工具函數
 * 用於生成頁面元數據和結構化數據
 */

import { Metadata } from 'next';

export type Locale = 'zh-hk' | 'en' | 'ja';

// 網站配置
export const siteConfig = {
  name: '智印港 ZPrintPro',
  url: 'https://zprintpro.com',
  logo: 'https://zprintpro.com/logo.png',
  phone: '+86 181 2638 0255',
  email: 'zprintpro@outlook.com',
  address: {
    street: '16 Shing Yip Street',
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

// 多語言元數據
const homeMetadata: Record<Locale, { title: string; description: string; keywords: string }> = {
  'zh-hk': {
    title: '智印港 ZPrintPro | 香港專業印刷服務 | 貼紙標籤卡片書刊印刷',
    description: '智印港提供一站式專業印刷服務，包括貼紙、標籤、名片、書刊、包裝等。品質保證，價格透明，最快即日交貨。免費送貨滿$500。',
    keywords: '印刷, 貼紙, 標籤, 名片, 書刊, 包裝, 香港印刷, 數碼印刷, 急件印刷, ZPrintPro, 智印港',
  },
  en: {
    title: 'ZPrintPro | Professional Printing Services Hong Kong | Stickers Labels Cards Booklets',
    description: 'ZPrintPro offers one-stop professional printing services including stickers, labels, business cards, booklets, and packaging. Quality guaranteed, transparent pricing, same-day delivery available. Free shipping over $500.',
    keywords: 'printing, stickers, labels, business cards, booklets, packaging, Hong Kong printing, digital printing, rush printing, ZPrintPro',
  },
  ja: {
    title: 'ZPrintPro | 香港プロ印刷サービス | ステッカーラベル名刺冊子印刷',
    description: 'ZPrintProはステッカー、ラベル、名刺、冊子、包装などのワンストッププロ印刷サービスを提供します。品質保証、透明な価格、最短当日配送。500ドル以上送料無料。',
    keywords: '印刷, ステッカー, ラベル, 名刺, 冊子, 包装, 香港印刷, デジタル印刷, 急ぎ印刷, ZPrintPro',
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
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale}`,
      languages: {
        'zh-HK': `${siteConfig.url}/`,
        'en': `${siteConfig.url}/en/`,
        'ja': `${siteConfig.url}/ja/`,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale}`,
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
export function generateCategoryMetadata(locale: Locale, categoryName: string = '', categoryNameEn: string = '', categoryNameJa: string = ''): Metadata {
  const names = { 'zh-hk': categoryName, en: categoryNameEn, ja: categoryNameJa };
  const descriptions = {
    'zh-hk': `專業${categoryName}印刷服務，品質保證，價格透明。智印港提供多種${categoryName}選擇，最快即日交貨。`,
    en: `Professional ${categoryNameEn} printing services with quality guarantee and transparent pricing. ZPrintPro offers various ${categoryNameEn} options with same-day delivery available.`,
    ja: `プロの${categoryNameJa}印刷サービス、品質保証、透明な価格。ZPrintProは様々な${categoryNameJa}オプションを提供し、最短当日配送可能。`,
  };
  
  const rawName = names[locale];
  const name = rawName && !rawName.endsWith('印刷') && locale === 'zh-hk' ? `${rawName}印刷` : rawName;
  const description = descriptions[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  return {
    title: `${name} | ${siteConfig.name}`,
    description,
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}category/${categoryNameEn.toLowerCase().replace(/\s+/g, '-')}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/category/${categoryNameEn.toLowerCase().replace(/\s+/g, '-')}/`,
        'en': `${siteConfig.url}/en/category/${categoryNameEn.toLowerCase().replace(/\s+/g, '-')}/`,
        'ja': `${siteConfig.url}/ja/category/${categoryNameEn.toLowerCase().replace(/\s+/g, '-')}/`,
      },
    },
    openGraph: {
      title: `${name} | ${siteConfig.name}`,
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

// 生成產品頁元數據
export function generateProductMetadata(
  locale: Locale, 
  productName: string, 
  productNameEn: string, 
  productNameJa: string,
  description: string,
  descriptionEn: string,
  descriptionJa: string,
  slug: string
): Metadata {
  const names = { 'zh-hk': productName, en: productNameEn, ja: productNameJa };
  const descriptions = { 'zh-hk': description, en: descriptionEn, ja: descriptionJa };
  
  const name = names[locale];
  const desc = descriptions[locale];
  const lang = locale === 'zh-hk' ? 'zh-HK' : locale;
  
  const suffix = locale === 'zh-hk' ? '專業印刷' : locale === 'en' ? 'Professional Printing' : 'プロ印刷';
  
  return {
    title: `${name} | ${suffix} | ${siteConfig.name}`,
    description: desc,
    alternates: {
      canonical: `${siteConfig.url}/${locale === 'zh-hk' ? '' : locale + '/'}product/${slug}/`,
      languages: {
        'zh-HK': `${siteConfig.url}/product/${slug}/`,
        'en': `${siteConfig.url}/en/product/${slug}/`,
        'ja': `${siteConfig.url}/ja/product/${slug}/`,
      },
    },
    openGraph: {
      title: `${name} | ${siteConfig.name}`,
      description: desc,
      locale: lang,
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}/products/${slug}.jpg`,
          width: 800,
          height: 600,
          alt: name,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// 生成 Organization 結構化數據
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: siteConfig.logo,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English', 'Japanese'],
    },
    sameAs: [
      siteConfig.social.facebook,
      siteConfig.social.instagram,
      siteConfig.social.linkedin,
    ],
  };
}

// 生成 LocalBusiness 結構化數據
export function generateLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    image: siteConfig.logo,
    '@id': `${siteConfig.url}/#localbusiness`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.region,
      addressCountry: siteConfig.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.3105,
      longitude: 114.224,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    priceRange: '$$',
  };
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
    'zh-hk': '即時報價 | 智印港 ZPrintPro',
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
        'zh-HK': `${siteConfig.url}/zh-hk/quote`,
        'en': `${siteConfig.url}/en/quote`,
        'ja': `${siteConfig.url}/ja/quote`,
      },
    },
  };
}

// Hreflang 標籤生成
export function generateHreflangTags(path: string = '') {
  const basePath = path.replace(/^\//, '');
  return [
    { lang: 'zh-HK', url: `${siteConfig.url}/${basePath}` },
    { lang: 'en', url: `${siteConfig.url}/en/${basePath}` },
    { lang: 'ja', url: `${siteConfig.url}/ja/${basePath}` },
    { lang: 'x-default', url: `${siteConfig.url}/${basePath}` },
  ];
}
