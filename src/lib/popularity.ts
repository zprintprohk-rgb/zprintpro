/**
 * Popularity 跟踪 — Q1=C (K3 8/4 11:13 拍板)
 *
 * 数据源策略 (按 K3 11:13 拍板 C "用每周的GSC的数据"):
 * - 优先: .hermes/industry-keyword-matrix.json `sku_popularity` 字段 (gsc-feedback-loop 周三 8/6 跑出后自动填)
 * - 兜底: products.ts weight_score + isHot + isNew 综合 (8/6 前用)
 *
 * 实现: 服务端 module-level cache, 1 次加载后复用, 0 hot reload
 */

import { products, categories, type Product } from '@/data/products';
import fs from 'fs';
import path from 'path';

interface SkuPopularity {
  slug: string;
  gsc_impressions: number;
  gsc_clicks: number;
  gsc_ctr: number;
  gsc_position: number;
  source: 'gsc' | 'weight_score_fallback';
  last_updated: string;
}

let cachedPopularity: SkuPopularity[] | null = null;

function loadPopularity(): SkuPopularity[] {
  if (cachedPopularity) return cachedPopularity;
  try {
    const matrixPath = path.join(process.cwd(), '.hermes', 'industry-keyword-matrix.json');
    if (fs.existsSync(matrixPath)) {
      const raw = fs.readFileSync(matrixPath, 'utf8');
      const m = JSON.parse(raw);
      if (m.sku_popularity && Array.isArray(m.sku_popularity) && m.sku_popularity.length > 0) {
        cachedPopularity = m.sku_popularity;
        return cachedPopularity;
      }
    }
  } catch {
    /* fallback below */
  }
  // Fallback: weight_score + isHot + isNew proxy
  cachedPopularity = products.map((p) => ({
    slug: p.slug,
    gsc_impressions: p.weight_score * 100,
    gsc_clicks: p.isHot ? p.weight_score * 5 : p.weight_score * 2,
    gsc_ctr: p.isHot ? 0.05 : 0.02,
    gsc_position: p.weight_score > 80 ? 5 : 20,
    source: 'weight_score_fallback' as const,
    last_updated: '2026-08-04',
  }));
  return cachedPopularity;
}

function popularityScore(slug: string): number {
  const p = loadPopularity().find((x) => x.slug === slug);
  return p?.gsc_impressions ?? 0;
}

function categoryHeat(): Map<string, number> {
  const heat = new Map<string, number>();
  for (const c of categories) {
    let total = 0;
    for (const p of products.filter((p) => p.category_slug === c.slug)) {
      total += popularityScore(p.slug) || p.weight_score;
    }
    heat.set(c.slug, total);
  }
  return heat;
}

/**
 * Sidebar 14 条 — K3 11:02 拍板
 * 14 类各取 1 条 top SKU (按 popularity), 按分类热度排
 * @param limit 14
 */
export function getTopSkuByCategory(limit = 14): Product[] {
  const heat = categoryHeat();
  const topPerCategory: Product[] = [];
  for (const c of categories) {
    const candidates = products.filter((p) => p.category_slug === c.slug);
    if (candidates.length === 0) continue;
    const sorted = [...candidates].sort(
      (a, b) => (popularityScore(b.slug) || b.weight_score) - (popularityScore(a.slug) || a.weight_score)
    );
    topPerCategory.push(sorted[0]);
  }
  topPerCategory.sort(
    (a, b) => (heat.get(b.category_slug) ?? 0) - (heat.get(a.category_slug) ?? 0)
  );
  return topPerCategory.slice(0, limit);
}

/**
 * Blog 主题相关 — K3 11:02 拍板 "其它 blog 底部相关主题相关 SKU"
 * 按 blog category_slug 取 top 4 SKU
 * @param blogCategorySlug blog 的 category_slug
 * @param limit 4
 */
export function getRelatedByCategory(blogCategorySlug: string, limit = 4): Product[] {
  return products
    .filter((p) => p.category_slug === blogCategorySlug)
    .sort(
      (a, b) => (popularityScore(b.slug) || b.weight_score) - (popularityScore(a.slug) || a.weight_score)
    )
    .slice(0, limit);
}

/**
 * 推断 blog category_slug (从 blog post object 找 4 个 hint)
 * 优先: post.category / buying-guide category / fallback 'stickers'
 */
export function inferBlogCategory(post: { category?: string; linkedProducts?: string[] }): string {
  if (post.linkedProducts && post.linkedProducts.length > 0) {
    const first = products.find((p) => p.slug === post.linkedProducts![0]);
    if (first) return first.category_slug;
  }
  // Map blog category string → product category_slug
  const map: Record<string, string> = {
    同人週邊: 'japan-doujin',
    同人誌印刷: 'japan-doujin',
    貼紙知識: 'stickers',
    包裝知識: 'packaging',
    印刷工藝: 'stickers',
    印刷知識: 'flyers',
    行業趨勢: 'packaging',
    設計技巧: 'flyers',
    品牌建設: 'packaging',
    '餐飲外賣': 'flyers',
    '美妝護膚': 'packaging',
    寵物: 'stickers',
    'Sticker Guide': 'stickers',
    'Packaging Guide': 'packaging',
    'Printing Techniques': 'stickers',
    'Industry Trends': 'packaging',
    'Hong Kong Local': 'flyers',
    'Design Tips': 'flyers',
    Branding: 'packaging',
    '餐廳開業': 'flyers',
    '餐飲旺季': 'flyers',
    'Religious Ceremony': 'packaging',
    'Industrial Nameplate': 'stickers',
    'Construction Sample Book': 'books',
    'Apparel Bags': 'paper-bags',
    'Gang-Run Boxes': 'packaging',
    '服裝紙袋': 'paper-bags',
    '拼版彩盒': 'packaging',
    'Financial Institution': 'paper-bags',
    'Real Estate': 'posters',
  };
  if (post.category && map[post.category]) return map[post.category];
  return 'stickers';
}
