/**
 * SEO / GEO 统一类型系统
 */

export interface SEOMetadata {
  title: string;           // 50-60 字符（中文按2字符算）
  description: string;     // 150-160 字符
  keywords?: string[];     // LSI 关键词，非堆砌
  canonical: string;
  ogImage: string;
  ogType: 'website' | 'article' | 'product';
  locale: string;          // zh-HK / en-US / ja
  alternateLocales?: Record<string, string>; // hreflang 映射
}

export interface GeoSignals {
  region: string;          // HK / US / UK / AU / JP
  currency: string;        // HKD / USD / GBP / AUD / JPY
  pricePrefix: string;     // HK$ / $ / £ / AU$ / ¥
  areaServed: string[];    // 服务地区数组
  phone?: string;
  address?: string;
  deliveryText: string;    // 物流描述
  geoKeywords: string[];   // 本地地理实体词
}

export interface SchemaOrgData {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}
