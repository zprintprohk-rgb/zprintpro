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
// 2026-08-04 18:30 P0 build 修复: fs/path 改为 dynamic import, 避免 client bundle 解析失败
// 根因: 8/4 11:15 commit 626a22a (popularity.ts) 在 module-level import fs/path, Next.js 14 客户端 bundle
//       找不到 Node.js 内置模块, build 失败. 后续 6 commits (8f3948d/98d1425/0992089/f726359/3bf6e1c/626a22a) 全部 build failure
// 修法: loadPopularity() 内部 typeof window === 'undefined' 判断 (server-only), 然后 dynamic import
//       client side 完全跳过 fs 读取, 走 weight_score fallback (8/6 GSC feedback loop 跑完后用 server-rendered 注入)

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
  // 2026-08-04 18:30 P0 build 修复: client side 完全跳过 fs 读取
  // (Next.js client bundle 不包含 Node.js 内置模块, 走 weight_score fallback)
  if (typeof window !== 'undefined') {
    cachedPopularity = weightScoreFallback();
    return cachedPopularity;
  }
  // Server side: dynamic import fs/path, 避免 client bundle 解析失败
  // 用 Function('return require')() 强制运行时解析, 完全绕开 webpack 静态分析
  try {
    // eslint-disable-next-line no-new-func
    const dynamicRequire: (name: string) => unknown = new Function('name', 'return require(name)') as any;
    const fs = dynamicRequire('fs') as typeof import('fs');
    const path = dynamicRequire('path') as typeof import('path');
    const matrixPath = path.join(process.cwd(), '.hermes', 'industry-keyword-matrix.json');
    if (fs.existsSync(matrixPath)) {
      const raw = fs.readFileSync(matrixPath, 'utf8');
      const m = JSON.parse(raw);
      if (m.sku_popularity && Array.isArray(m.sku_popularity) && m.sku_popularity.length > 0) {
        cachedPopularity = m.sku_popularity;
        return cachedPopularity as SkuPopularity[];
      }
    }
  } catch {
    /* fallback below */
  }
  cachedPopularity = weightScoreFallback();
  return cachedPopularity;
}

function weightScoreFallback(): SkuPopularity[] {
  return products.map((p) => ({
    slug: p.slug,
    gsc_impressions: p.weight_score * 100,
    gsc_clicks: p.isHot ? p.weight_score * 5 : p.weight_score * 2,
    gsc_ctr: p.isHot ? 0.05 : 0.02,
    gsc_position: p.weight_score > 80 ? 5 : 20,
    source: 'weight_score_fallback' as const,
    last_updated: '2026-08-04',
  }));
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

// 2026-08-05 K3 12:24 拍板: 排除贺卡印刷类目 (greeting-cards) 在首页 12 条 / blog sidebar 14 条 top SKU 排名
// §11 主营品类约束: 不写名片/咭片/business cards; K3 8/4 18:35 决策"贺卡印刷"同属非核心主营, 一并排除
// 修法: popularity.ts getTopSkuByCategory 加 blocklist, 跳过 excluded categories
// 影响: 14 类减 1 = 13 类有效, 首页 top 12 / sidebar top 14 自动从 13 类中选, 不再含 greeting-cards
const EXCLUDED_CATEGORIES: ReadonlyArray<string> = ['greeting-cards'];

/**
 * Sidebar 14 条 — K3 11:02 拍板
 * 14 类各取 1 条 top SKU (按 popularity), 按分类热度排
 * 2026-08-05 K3 12:24: 排除 EXCLUDED_CATEGORIES (greeting-cards)
 * @param limit 14
 */
export function getTopSkuByCategory(limit = 14): Product[] {
  const heat = categoryHeat();
  const topPerCategory: Product[] = [];
  for (const c of categories) {
    // 2026-08-05 K3 拍板: 跳过非核心主营类目 (greeting-cards 等)
    if (EXCLUDED_CATEGORIES.includes(c.slug)) continue;
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
 * 优先级 1: post.title 关键词 (zh-hk/en/ja 全 locale 标题关键词, 最稳)
 * 优先级 2: post.linkedProducts[0] (如果博客作者 hardcode 了相关产品, 跟产品走)
 * 优先级 3: post.category 字符串 map (BlogContent 22 tabs 10 内容类型 + 12 产品类目)
 * 优先级 4: fallback 'flyers' (8/4 12:24 K3 拍板: 不要默认 'stickers', 改 'flyers' 是最常见博客主题)
 *
 * 2026-08-05 K3 12:24 拍板: blog 详情页底部"相关产品推荐"需要跟 blog 标题相关 (e.g. flyer blog → 推荐 flyer 类目 SKU)
 * 根因 (8/4 11:15 popularity.ts 626a22a): "印刷工藝" → 'stickers' sticky default, 让 "即日傳單印刷印刷指南" 错推 sticker SKU
 * 修法: 加 title 关键词推断 (优先级 1), 跟标题 locale 强匹配, 4 个 locale 全 cover
 */
export function inferBlogCategory(post: { title?: string; category?: string; linkedProducts?: string[] }): string {
  // 优先级 1: blog post title 关键词 (zh-hk + en + ja 全 locale) — 最稳, 跟主题强相关
  if (post.title) {
    const title = post.title;
    // 关键: 任何匹配的关键词都 return, 顺序按 specificity 排 (具体词先于通用词)
    const titleMap: Array<[RegExp, string]> = [
      // flyer / 傳單印刷 / チラシ (specific)
      [/傳單印刷|傳單|flyer|leaflet|brochure|チラシ|フライヤー/i, 'flyers'],
      // sticker / 貼紙 / ステッカー
      [/貼紙|防水貼|透明貼|不乾膠|sticker|label|ステッカー|シール/i, 'stickers'],
      // paper-bags / 紙袋 / 紙袋 (zh-hk + en + ja 全 locale, 8/5 14:20 K3 拍板 + 8/5 15:30 增补 kraft/paper 细分)
      [/紙袋|購物袋|牛皮紙袋|手提袋|環保袋|禮品袋|包裝袋|paper bag|kraft bag|shopping bag|carrier bag|merchandise bag|手提げ袋|紙バッグ|ショッピングバッグ|手提げ紙袋/i, 'paper-bags'],
      // packaging / 包裝盒 / パッケージ (8/5 15:30 K3 拍板: 加 盒 单字匹配 "白卡彩盒" + paper bag 加细分)
      [/包裝盒|禮盒|磁吸盒|飛機盒|彩盒|天地盒|摺盒|盒|packaging|box|package|パッケージ|箱|cardboard box|gift box|mailer box|rigid box/i, 'packaging'],
      // posters / 海報 / ポスター
      [/海報|poster|ポスター/i, 'posters'],
      // books / 書籍 / 書籍
      [/書刊|書籍|冊子|book|booklet|書籍|冊子|ブック/i, 'books'],
      // menus / 餐牌 / メニュー
      [/餐牌|菜單|menu|メニュー|料理/i, 'menus'],
      // envelopes / 信封 / 封筒
      [/信封|envelope|封筒/i, 'envelopes'],
      // calendars / 年曆 / カレンダー
      [/年曆|桌曆|月曆|calendar|カレンダー|手帳/i, 'calendars'],
      // red-packets / 利是封 / ポチ袋
      [/利是封|紅包|红包|red packet|red envelope|ポチ袋|のし袋/i, 'red-packets'],
      // banners / 噴繪 / バナー
      [/噴繪|banner|バナー|看板/i, 'banners'],
      // educational / 校園 / 教育
      [/校園|教育|練習簿|educational|school|教育|学園|練習帳/i, 'educational'],
      // doujin / 同人 / 同人誌
      [/同人|同人誌|doujin|同人誌|アニメ/i, 'japan-doujin'],
    ];
    for (const [pattern, catSlug] of titleMap) {
      if (pattern.test(title)) return catSlug;
    }
  }
  // 优先级 2: post.linkedProducts[0] → 跟产品类目走
  if (post.linkedProducts && post.linkedProducts.length > 0) {
    const first = products.find((p) => p.slug === post.linkedProducts![0]);
    if (first) return first.category_slug;
  }
  // 优先级 2.5 (2026-08-05 K3 14:20 拍板): post.category 是 BlogPostMeta.categoryKey 字段
  // categoryKey 已经是 product category_slug (e.g. 'paper-bags' / 'flyers' / 'stickers'),
  // 直接接受, 避免 priority 1 title 关键词没匹配时再走 priority 3 map (map 里没 'paper-bags' 这种 slug 字符串)
  // 验证 category 是有效 product category_slug (在 categories 列表里)
  if (post.category && categories.some((c) => c.slug === post.category)) {
    return post.category;
  }
  // 优先级 3: Map blog category string → product category_slug (兼容老的 BlogContent 22 tabs 中文/英文 category 字符串)
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
  // 优先级 4: fallback 'flyers' (8/4 12:24 K3 拍板: 改 'stickers' → 'flyers', 避免非 flyer 主题 blog 错推 sticker SKU)
  return 'flyers';
}
