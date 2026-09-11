/**
 * v9.2.3 老板指令 (2026-09-11): blog 照片全部用 SKU 真实图 (不新产生图)
 * 选图机制: blog categoryKey → 产品类目映射 → getProductsByCategory
 *   → weight_score 降序 + isHot 优先 → top SKU → getProductMainImage(locale 首图)
 * 兜底链: SKU 图 → '' (调用方走 defaultCover / 几何渐变占位, 永不断裂)
 * 老板已批决策: printing→flyers (即日稿 6 场景以傳單为核心); 泛化类默认 stickers
 */
import { getProductMainImage } from '@/lib/product-image';
import { getProductsByCategory } from '@/data/products';
import { Locale } from '@/lib/seo';

/** blog categoryKey → 产品类目 slug (权威映射, 老板已批) */
const CATEGORY_KEY_TO_PRODUCT: Record<string, string> = {
  sticker: 'stickers',
  flyers: 'flyers',
  packaging: 'packaging',
  printing: 'flyers', // 即日/急件/綜合印刷 → 傳單 (2026-09-11 老板拍板)
  posters: 'posters',
  'paper-bags': 'paper-bags',
  banners: 'banners',
  menus: 'menus',
  calendars: 'calendars',
  'red-packets': 'red-packets',
  card: 'stickers', // zh-hk 'card' → 貼紙知識 (历史 typo 类目, 语义=貼紙)
  educational: 'educational',
  books: 'books',
  envelopes: 'envelopes',
};

/** 详情页 finalBlogCat 同源合法类目表 (blog/[slug]/page.tsx L977) */
const VALID_PRODUCT_CATEGORY_SLUGS = [
  'paper-bags', 'flyers', 'stickers', 'packaging', 'posters', 'books', 'menus',
  'envelopes', 'calendars', 'red-packets', 'banners', 'educational', 'japan-doujin',
];

/** 泛化类 (buying-guide/trends/design/branding/news 等) 无显式类目时的默认类目 */
const DEFAULT_PRODUCT_CATEGORY = 'stickers';

function resolveProductCategory(categoryKey: string, category?: string): string {
  const mapped = CATEGORY_KEY_TO_PRODUCT[categoryKey];
  if (mapped) return mapped;
  if (category && VALID_PRODUCT_CATEGORY_SLUGS.includes(category)) return category;
  return DEFAULT_PRODUCT_CATEGORY;
}

/**
 * 取 blog 的 SKU 真实图 (locale 首图)。
 * 返回 '' 表示无可用 SKU 图 (调用方应走 defaultCover / 渐变占位)。
 */
export function getBlogSkuImage(
  slug: string,
  locale: Locale,
  categoryKey: string,
  category?: string
): string {
  const cat = resolveProductCategory(categoryKey, category);
  const list = getProductsByCategory(cat);
  if (!list || list.length === 0) return '';

  // weight_score 降序 + isHot 优先 (与 PLP/PDP 排序口径一致)
  const sorted = [...list].sort(
    (a, b) =>
      (b.isHot ? 1 : 0) - (a.isHot ? 1 : 0) ||
      (b.weight_score || 0) - (a.weight_score || 0)
  );
  const top = sorted[0];

  const img = getProductMainImage(top, locale);
  if (!img || img.endsWith('/placeholder.jpg')) return '';
  return img;
}
