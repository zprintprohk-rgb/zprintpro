/**
 * 产品类型系统
 */

import { Locale } from './locale';
import { SEOMetadata } from './seo';

export interface ProductVariant {
  id: string;
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  price: number;           // 基础价（HKD基准）
  images: Record<Locale, string[]>; // 多语言图片路径
  category: string;
  tags: string[];
  seo: Record<Locale, SEOMetadata>;
}

export interface CategoryData {
  slug: string;
  name: Record<Locale, string>;
  description: Record<Locale, string>;
  heroImage: Record<Locale, string>;
  products: ProductVariant[];
}
