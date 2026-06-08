// 产品主图统一 fallback 链 (2026-06-08 修复 GSC 显示通用占位图 bug)
//
// 问题: 之前 15 个文件用 `imagesByLocale[locale]?.[0] || '/images/placeholder.jpg'`
//       1. imagesByLocale[locale]?.[0] 可能为 undefined (如 outdoor-posters/ja)
//       2. placeholder.jpg 之前是 0 字节空文件, GSC 抓取后显示通用图标
// 修复:
//       1. 完整 fallback: imagesByLocale[locale][0] → images[0] → placeholder.jpg
//       2. placeholder.jpg 现在是 9.5KB 真实 800x800 灰色占位图
//
// 用法:
//   const imageSrc = getProductMainImage(product, locale);
//
// 性能: O(1) lookup, 无副作用
import type { Product } from '@/data/products';
import type { Locale } from './seo';

export function getProductMainImage(
  product: Pick<Product, 'images' | 'imagesByLocale'>,
  locale: Locale
): string {
  // 1. 优先: 该 locale 专属图 (e.g. zh-hk 用户看 zh-hk 优化图)
  const localeImg = product.imagesByLocale?.[locale]?.[0];
  if (localeImg) return localeImg;

  // 2. 兜底: 通用图 (product.images[0] 几乎所有产品都有)
  const generalImg = product.images?.[0];
  if (generalImg) return generalImg;

  // 3. 最后: 真占位图 (现在不再是 0 字节)
  return '/images/placeholder.jpg';
}

export function getProductImages(
  product: Pick<Product, 'images' | 'imagesByLocale'>,
  locale: Locale
): string[] {
  const localeImgs = product.imagesByLocale?.[locale];
  if (localeImgs && localeImgs.length > 0) return localeImgs;

  const generalImgs = product.images;
  if (generalImgs && generalImgs.length > 0) return generalImgs;

  return ['/images/placeholder.jpg'];
}
