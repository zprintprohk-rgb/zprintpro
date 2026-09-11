/**
 * Blog M3 选图 v2（2026-09-12 老板指令）
 * - 源: F:\zprintpro-en-us-images M3的模型生成的图片\{SKU-编号}\zprintpro-{category}-{productSlug}-{locale}-{variant}.webp
 * - 门禁: .webp 且 **严格 < 115KB**（小于 115kb）；≥115KB 一律跳过
 * - 变体: **hero 优先**（主要用 hero）；无适配 hero 才退 variety / multi-angle（再退 spread / detail）
 * - 语义: 文件名关键词（category + productSlug）与文章 slug/categoryKey 做词元重合度评分
 * - 唯一: 全局 used 索引，一张物理图只分配给一篇文章
 * - 三语同图: 1 篇 = 1 张物理图（同图供 zh-hk/en/ja）
 * 输出: public/images/blog-m3/{slug}.webp + src/data/blog-m3-images.ts + 选图日志
 */
import fs from 'fs';
import path from 'path';

const M3_ROOT = 'F:\\zprintpro-en-us-images M3的模型生成的图片';
const SRC_ROOT = 'F:\\zprintpro-nextjs';
const DEST = path.join(SRC_ROOT, 'public', 'images', 'blog-m3');
const MAX_BYTES_EXCLUSIVE = 115 * 1024; // 严格小于

// ── 1. 索引源池 ─────────────────────────────────────────────
const KNOWN_CATS = [
  'paper-bags', 'red-packets', 'japan-doujin', 'greeting-cards', 'wedding-invitations',
  'wedding-envelope', 'educational', 'envelopes', 'packaging', 'calendars', 'stickers',
  'banners', 'posters', 'flyers', 'menus', 'books',
];
const VARIANTS = ['multi-angle', 'hero', 'variety', 'detail', 'spread'];

function parseName(name) {
  if (!name.startsWith('zprintpro-') || !name.endsWith('.webp')) return null;
  const base = name.slice('zprintpro-'.length, -'.webp'.length);
  let variant = null;
  for (const v of VARIANTS) if (base.endsWith(`-${v}`)) { variant = v; break; }
  if (!variant) return null;
  const rest = base.slice(0, -(variant.length + 1));
  let locale = null;
  for (const l of ['en', 'ja', 'zh-hk']) if (rest.endsWith(`-${l}`)) { locale = l; break; }
  if (!locale) return null;
  const rest2 = rest.slice(0, -(locale.length + 1));
  let category = null;
  for (const c of KNOWN_CATS) if (rest2.startsWith(`${c}-`)) { if (!category || c.length > category.length) category = c; }
  if (!category) return null;
  const productSlug = rest2.slice(category.length + 1);
  return { category, locale, variant, productSlug };
}

const pool = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!e.name.startsWith('_')) walk(p); continue; }
    const parsed = parseName(e.name);
    if (!parsed) continue;
    const size = fs.statSync(p).size;
    if (size >= MAX_BYTES_EXCLUSIVE) continue; // 门禁: 必须 <115KB
    pool.push({ src: p, name: e.name, sku: path.basename(dir), size, ...parsed });
  }
})(M3_ROOT);

// ── 2. 读 blog 文章 ────────────────────────────────────────
function loadBlogPosts() {
  const s = fs.readFileSync(path.join(SRC_ROOT, 'src/data/blog-posts.ts'), 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?categoryKey:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
  const posts = []; let m;
  while ((m = re.exec(s))) posts.push({ slug: m[1], categoryKey: m[2], date: m[3] });
  return posts;
}

// categoryKey → 允许的图片类目 (优先级由数组顺序体现)
const CAT_MAP = {
  sticker: ['stickers'],
  packaging: ['packaging'],
  calendars: ['calendars'],
  'red-packets': ['red-packets'],
  banners: ['banners', 'posters'],
  books: ['books', 'educational'],
  'paper-bags': ['paper-bags', 'packaging'],
  'japan-doujin': ['japan-doujin', 'stickers'],
  'wedding-envelope': ['wedding-invitations', 'wedding-envelope', 'greeting-cards'],
  card: ['greeting-cards'],
  printing: ['flyers', 'posters', 'stickers', 'packaging', 'books', 'menus', 'banners'],
  flyers: ['flyers', 'posters'],
  posters: ['posters', 'flyers', 'banners'],
  menus: ['menus', 'flyers'],
  educational: ['educational', 'books'],
  'food-packaging': ['packaging'],
  'company-news': ['greeting-cards', 'stickers', 'packaging', 'books', 'banners'],
  trends: ['packaging', 'stickers', 'flyers', 'banners'],
  design: ['greeting-cards', 'stickers', 'packaging', 'posters'],
  branding: ['greeting-cards', 'packaging', 'stickers', 'paper-bags'],
  hongkong: ['stickers', 'flyers', 'packaging', 'banners'],
  'cross-border': ['packaging', 'paper-bags', 'stickers', 'books'],
  'creator-ip': ['stickers', 'japan-doujin', 'greeting-cards'],
};
// buying-guide: 按 slug 关键词判定类目
function buyingGuideCats(slug) {
  const s = slug;
  if (/sticker|label/.test(s)) return ['stickers'];
  if (/paper-bag|shopping-bag|gift-bag/.test(s)) return ['paper-bags', 'packaging'];
  if (/packag|box|carton/.test(s)) return ['packaging'];
  if (/flyer|leaflet/.test(s)) return ['flyers'];
  if (/poster/.test(s)) return ['posters'];
  if (/menu/.test(s)) return ['menus'];
  if (/calendar/.test(s)) return ['calendars'];
  if (/envelope/.test(s)) return ['envelopes'];
  if (/wedding|invitation/.test(s)) return ['wedding-invitations', 'greeting-cards'];
  if (/card|greeting/.test(s)) return ['greeting-cards'];
  if (/book|booklet|yearbook|catalog|catalogue|magazine/.test(s)) return ['books', 'educational'];
  if (/banner|rollup|roll-up/.test(s)) return ['banners'];
  if (/red-packet|red-packet|packet/.test(s)) return ['red-packets'];
  if (/doujin|comiket/.test(s)) return ['japan-doujin'];
  if (/certificate|school|campus|education/.test(s)) return ['educational', 'books'];
  return ['stickers', 'packaging', 'greeting-cards', 'books', 'flyers'];
}

function catsFor(post) {
  if (post.categoryKey === 'buying-guide') return buyingGuideCats(post.slug);
  return CAT_MAP[post.categoryKey] || ['stickers', 'packaging', 'greeting-cards'];
}

const STOP = new Set(['guide', 'printing', 'print', 'hk', 'hong', 'kong', '2026', '2027', 'best', 'vs', 'and', 'the', 'for', 'a', 'an', 'custom', 'how', 'to', 'in', 'of', 'complete', 'ultimate']);
const tokens = (s) => s.split('-').filter((t) => t.length > 1 && !STOP.has(t));

const VARIANT_RANK = { hero: 0, variety: 1, 'multi-angle': 2, spread: 3, detail: 4 };

// ── 3. 分配 ────────────────────────────────────────────────
const posts = loadBlogPosts();
const seenSlug = new Set();
const uniqPosts = posts.filter((p) => (seenSlug.has(p.slug) ? false : (seenSlug.add(p.slug), true)));
const used = new Set();
const map = {};
const log = [];
const stats = { hero: 0, variety: 0, 'multi-angle': 0, spread: 0, detail: 0, noMatch: 0 };

fs.mkdirSync(DEST, { recursive: true });
// 清理旧文件 (避免残留非当前映射的图)
for (const f of fs.readdirSync(DEST)) if (f.endsWith('.webp')) fs.unlinkSync(path.join(DEST, f));

for (const post of uniqPosts) {
  const cats = catsFor(post);
  const pt = new Set(tokens(post.slug));
  const scored = pool
    .filter((f) => !used.has(f.src) && cats.includes(f.category))
    .map((f) => {
      const ft = tokens(f.productSlug);
      const overlap = ft.filter((t) => pt.has(t)).length;
      return { f, overlap, catRank: cats.indexOf(f.category), vRank: VARIANT_RANK[f.variant], locRank: f.locale === 'en' ? 0 : 1 };
    })
    .sort((a, b) =>
      b.overlap - a.overlap ||        // 关键词重合优先 (语义适配)
      a.catRank - b.catRank ||        // 类目优先级
      a.vRank - b.vRank ||            // hero 优先, 再 variety / multi-angle
      a.locRank - b.locRank ||        // 优先 en
      a.f.name.localeCompare(b.f.name)
    );
  // 双保险: 若无 overlap>0 的候选, 退到该类目任意 hero/variety/multi-angle
  const pick = scored.find((s) => s.overlap > 0) || scored[0];
  if (!pick) { stats.noMatch++; log.push(`ERROR: no pool image for [${post.slug}] cats=${cats.join('|')}`); continue; }
  used.add(pick.f.src);
  stats[pick.f.variant]++;
  const dest = path.join(DEST, `${post.slug}.webp`);
  fs.copyFileSync(pick.f.src, dest);
  map[post.slug] = `/images/blog-m3/${post.slug}.webp`;
  log.push(`OK [${post.slug}] (${post.categoryKey}) <- ${pick.f.sku}/${pick.f.name} [${pick.f.variant}, ${(pick.f.size / 1024).toFixed(1)}KB, overlap=${pick.overlap}]`);
}

// ── 4. 写映射 + 日志 ────────────────────────────────────────
const mapLines = Object.entries(map).map(([k, v]) => `  '${k}': '${v}',`).join('\n');
const ts = `/** 自动生成 (2026-09-12 build-blog-m3-images-v2.ts): blog → M3 模型生成图
 * 规则: hero 优先 > variety > multi-angle > spread > detail; 严格 <115KB; 三语同图 (1 slug = 1 张)
 * 消费点: /blog/ 列表卡 + /blog/[slug] 详情 hero + 首页「印刷知識」栏 + 导航「印刷知識」下拉 (同一张图) */
export const blogM3Images: Record<string, string> = {
${mapLines}
};
`;
fs.writeFileSync(path.join(SRC_ROOT, 'src/data/blog-m3-images.ts'), ts, 'utf8');

const logPath = path.join(SRC_ROOT, '.hermes/logs/2026-09-12-blog-m3-selection-v2.md');
fs.writeFileSync(logPath, `# Blog M3 选图 v2 日志 (2026-09-12)\n\n- 源池(严格 <115KB): ${pool.length} 张\n- 文章数(去重): ${uniqPosts.length}\n- 变体分配: hero=${stats.hero} variety=${stats.variety} multi-angle=${stats['multi-angle']} spread=${stats.spread} detail=${stats.detail}\n- 无匹配: ${stats.noMatch}\n\n\`\`\`\n${log.join('\n')}\n\`\`\`\n`, 'utf8');

console.log(`pool(<115KB)=${pool.length} posts=${uniqPosts.length}`);
console.log(`variants: hero=${stats.hero} variety=${stats.variety} multi-angle=${stats['multi-angle']} spread=${stats.spread} detail=${stats.detail} noMatch=${stats.noMatch}`);
console.log(logPath);
