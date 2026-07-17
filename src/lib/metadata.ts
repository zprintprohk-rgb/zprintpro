/**
 * 多语言 Metadata 工厂
 */

import { Metadata } from 'next';
import { Locale, hreflangMap } from '@/types/locale';
import { SEOMetadata } from '@/types/seo';
import { geoConfig } from './seo';

const BASE_URL = 'https://zprintpro.com';

export function createMetadata(seo: SEOMetadata, locale: Locale): Metadata {
  const geo = geoConfig[locale];

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords?.join(', '),
    alternates: {
      canonical: seo.canonical,
      languages: {
        'zh-HK': `${BASE_URL}/zh-hk`,
        'en-US': `${BASE_URL}/en`,
        'en-GB': `${BASE_URL}/en`,
        'en-AU': `${BASE_URL}/en`,
        'ja': `${BASE_URL}/ja`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      siteName: 'ZprintPro 智印雲',
      images: [{ url: seo.ogImage, width: 1200, height: 630 }],
      locale: hreflangMap[locale],
      type: seo.ogType === 'product' ? 'website' : seo.ogType,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage],
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
    other: {
      'geo.region': geo.region,
      'geo.placename': geo.areaServed[0],
      'ICBM': '22.3193, 114.1694',
    },
  };
}

// 竞争对手关键词植入模板（标题/描述生成器）
export function generateProductTitle(productName: string, locale: Locale, price?: number): string {
  const geo = geoConfig[locale];
  const priceStr = price ? `From ${geo.pricePrefix}${price} ` : '';

  const templates: Record<Locale, (name: string, price: string) => string> = {
    'zh-hk': (n, p) => `${n} 香港 | ${p}| 專業印刷服務 - ZprintPro 智印雲`,
    'en': (n, p) => `Custom ${n} ${p}| Premium Printing for US/UK/AU - ZprintPro`,
    'ja': (n, p) => `${n} オーダーメイド | ${p}| 国際配送対応 - ZprintPro`,
  };

  return templates[locale](productName, priceStr).substring(0, 60);
}

export function generateProductDescription(productDesc: string, locale: Locale): string {
  const geo = geoConfig[locale];
  const templates: Record<Locale, string> = {
    'zh-hk': `專業${productDesc}印刷服務，${geo.deliveryText}。燙金、UV、棉紙等多種工藝，立即獲取報價！`,
    'en': `Premium ${productDesc} printing with foil, UV, and cotton paper options. ${geo.deliveryText}. Get an instant quote today!`,
    'ja': `高品質${productDesc}印刷。箔押し、UV、和紙対応。${geo.deliveryText}。今すぐお見積り！`,
  };
  return templates[locale].substring(0, 160);
}
