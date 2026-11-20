/**
 * Blog M3 选图 v3（2026-09-12 老板指令）
 * 规则:
 *  1) 变体优先级 hero > variety > multi-angle > spread > detail > 其他(box-open/card-stand/calendar-open)
 *     —— 老板原话「我们主要用这个hero图片，如果没有找到适配的hero图片，才选variety图片或是multi-angle图片」
 *  2) 格式 .webp；体积 **严格 < 115KB**：候选本身达标直接用；若最佳语义候选是 hero 但 ≥115KB，
 *     用 sharp 重编码(质量递降 88→68)压到 <115KB 再落地（保 hero 语义 + 满足大小门禁）
 *  3) 语义: 文件名关键词 (category + productSlug 词元) 与文章 slug 词元重合度
 *  4) 全局唯一 (一张物理图只给一篇文章) + 三语同图 (1 篇 = 1 张)
 * 输出: public/images/blog-m3/{slug}.webp + src/data/blog-m3-images.ts + 日志
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const M3_ROOT = 'F:\\zprintpro-en-us-images M3的模型生成的图片';
const SRC_ROOT = 'F:\\zprintpro-nextjs';
const DEST = path.join(SRC_ROOT, 'public', 'images', 'blog-m3');
const LIMIT = 115 * 1024; // 严格小于

const KNOWN_CATS = ['paper-bags', 'red-packets', 'japan-doujin', 'greeting-cards', 'wedding-invitations', 'educational', 'envelopes', 'packaging', 'calendars', 'stickers', 'banners', 'posters', 'flyers', 'menus', 'books'];
const LOCALES = ['en', 'ja', 'zh-hk'];
const VARIANT_RANK = { hero: 0, variety: 1, 'multi-angle': 2, spread: 3, detail: 4, 'box-open': 5, 'card-stand': 6, 'calendar-open': 7 };

function parse(name) {
  if (!name.startsWith('zprintpro-') || !name.endsWith('.webp')) return null;
  const toks = name.slice('zprintpro-'.length, -'.webp'.length).split('-');
  let li = -1;
  for (let i = toks.length - 1; i >= 0; i--) if (LOCALES.includes(toks[i])) { li = i; break; }
  if (li < 2) return null;
  const locale = toks[li];
  const variant = toks.slice(li + 1).join('-') || 'other';
  const head = toks.slice(0, li);
  let ci = -1, cat = null;
  for (let i = 0; i < head.length; i++) {
    for (let n = 3; n >= 1; n--) {
      const cand = head.slice(i, i + n).join('-');
      if (KNOWN_CATS.includes(cand)) { cat = cand; ci = i; break; }
    }
    if (cat) break;
  }
  if (!cat) return null;
  const productSlug = head.slice(ci + cat.split('-').length).join('-');
  return { category: cat, locale, variant, productSlug };
}

// ── 索引 (含 ≥115KB 候选, 供重编码) ──
const pool = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { if (!e.name.startsWith('_')) walk(p); continue; }
    const parsed = parse(e.name);
    if (!parsed) continue;
    pool.push({ src: p, name: e.name, sku: path.basename(dir), size: fs.statSync(p).size, ...parsed });
  }
})(M3_ROOT);

function loadBlogPosts() {
  const s = fs.readFileSync(path.join(SRC_ROOT, 'src/data/blog-posts.ts'), 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?categoryKey:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
  const posts = []; let m;
  while ((m = re.exec(s))) posts.push({ slug: m[1], categoryKey: m[2], date: m[3] });
  return posts;
}

const CAT_MAP = {
  sticker: ['stickers'],
  packaging: ['packaging'],
  calendars: ['calendars'],
  'red-packets': ['red-packets'],
  banners: ['banners', 'posters'],
  books: ['books', 'educational'],
  'paper-bags': ['paper-bags', 'packaging'],
  'japan-doujin': ['japan-doujin', 'stickers'],
  'wedding-envelope': ['wedding-invitations', 'greeting-cards'],
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
function catsFor(post) {
  if (post.categoryKey !== 'buying-guide') return CAT_MAP[post.categoryKey] || ['stickers', 'packaging', 'greeting-cards'];
  const s = post.slug;
  if (/sticker|label/.test(s)) return ['stickers'];
  if (/paper-bag|shopping-bag|gift-bag|bag/.test(s)) return ['paper-bags', 'packaging'];
  if (/packag|box|carton/.test(s)) return ['packaging'];
  if (/flyer|leaflet/.test(s)) return ['flyers'];
  if (/poster/.test(s)) return ['posters'];
  if (/menu/.test(s)) return ['menus'];
  if (/calendar/.test(s)) return ['calendars'];
  if (/envelope/.test(s)) return ['envelopes'];
  if (/wedding|invitation/.test(s)) return ['wedding-invitations', 'greeting-cards'];
  if (/card|greeting/.test(s)) return ['greeting-cards'];
  if (/book|booklet|yearbook|catalog|catalogue|magazine|guide-book/.test(s)) return ['books', 'educational'];
  if (/banner|rollup/.test(s)) return ['banners'];
  if (/red-packet|packet/.test(s)) return ['red-packets'];
  if (/doujin|comiket/.test(s)) return ['japan-doujin'];
  if (/certificate|school|campus|education|exam/.test(s)) return ['educational', 'books'];
  return ['stickers', 'packaging', 'greeting-cards', 'books', 'flyers'];
}

const STOP = new Set(['guide', 'printing', 'print', 'hk', 'hong', 'kong', '2026', '2027', 'best', 'vs', 'and', 'the', 'for', 'a', 'an', 'custom', 'how', 'to', 'in', 'of', 'complete', 'ultimate', 'your', 'why']);
const tokens = (s) => s.split('-').filter((t) => t.length > 1 && !STOP.has(t));

async function place(srcEntry, destPath) {
  if (srcEntry.size < LIMIT) {
    fs.copyFileSync(srcEntry.src, destPath);
    return { bytes: srcEntry.size, reencoded: false, quality: null };
  }
  const tmp = `${destPath}.re.webp`; // sharp 需按扩展名推断输出格式
  try {
    for (const q of [88, 84, 80, 76, 72, 68, 64]) {
      await sharp(srcEntry.src).webp({ quality: q, effort: 5 }).toFile(tmp);
      const s = fs.statSync(tmp).size;
      if (s < LIMIT) { fs.renameSync(tmp, destPath); return { bytes: s, reencoded: true, quality: q }; }
    }
    // 最后手段: 缩边 + 质量 70
    await sharp(srcEntry.src).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 70, effort: 5 }).toFile(tmp);
    const s = fs.statSync(tmp).size;
    if (s < LIMIT) { fs.renameSync(tmp, destPath); return { bytes: s, reencoded: true, quality: 'resize70' }; }
  } catch (e) {
    console.error(`sharp failed for ${srcEntry.name}: ${String(e).slice(0, 120)}`);
  }
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  return null;
}

// ── 分配 ──
async function main() {
const seen = new Set();
const posts = loadBlogPosts().filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)));
const used = new Set();
const map = {}, log = [];
const stats = { hero: 0, variety: 0, 'multi-angle': 0, spread: 0, detail: 0, other: 0, reencoded: 0, noMatch: 0 };

fs.mkdirSync(DEST, { recursive: true });
for (const f of fs.readdirSync(DEST)) if (f.endsWith('.webp') || f.endsWith('.tmp')) fs.unlinkSync(path.join(DEST, f));

for (const post of posts) {
  const cats = catsFor(post);
  const pt = new Set(tokens(post.slug));
  const cands = pool
    .filter((f) => !used.has(f.src))
    .map((f) => {
      const overlap = tokens(f.productSlug).filter((t) => pt.has(t)).length;
      const inCat = cats.includes(f.category);
      return { f, overlap, catRank: inCat ? cats.indexOf(f.category) : 99, vRank: VARIANT_RANK[f.variant] ?? 9, locRank: f.locale === 'en' ? 0 : 1 };
    })
    .sort((a, b) => b.overlap - a.overlap || a.catRank - b.catRank || a.vRank - b.vRank || a.locRank - b.locRank || a.f.name.localeCompare(b.f.name));
  const pick = cands.find((c) => c.catRank < 99 && (c.overlap > 0 || c.vRank === 0)) || cands.find((c) => c.catRank < 99) || cands[0];
  if (!pick) { stats.noMatch++; log.push(`ERROR no image [${post.slug}]`); continue; }
  used.add(pick.f.src);
  const placed = await place(pick.f, path.join(DEST, `${post.slug}.webp`));
  if (!placed) { stats.noMatch++; log.push(`ERROR encode failed [${post.slug}] <- ${pick.f.name}`); continue; }
  const vk = pick.f.variant in stats ? pick.f.variant : 'other';
  stats[vk]++;
  if (placed.reencoded) stats.reencoded++;
  map[post.slug] = `/images/blog-m3/${post.slug}.webp`;
  log.push(`OK [${post.slug}] (${post.categoryKey}) <- ${pick.f.sku}/${pick.f.name} [${pick.f.variant}, ${(pick.f.size / 1024).toFixed(0)}KB${placed.reencoded ? ` → re-encode q=${placed.quality} ${(placed.bytes / 1024).toFixed(0)}KB` : ''}, overlap=${pick.overlap}]`);
}

const mapLines = Object.entries(map).map(([k, v]) => `  '${k}': '${v}',`).join('\n');
fs.writeFileSync(path.join(SRC_ROOT, 'src/data/blog-m3-images.ts'),
`/** 自动生成 (2026-09-12 build-blog-m3-images-v3.ts): blog → M3 模型生成图
 * 规则: 变体 hero 优先 > variety > multi-angle > spread > detail > 其他; 体积严格 <115KB (超标的 hero 走 sharp 重编码);
 *      文件名关键词语义匹配; 全局唯一; 三语同图 (1 slug = 1 张物理图)
 * 消费点: /blog/ 列表卡 + /blog/[slug] 详情 hero + 首页「印刷知識」栏 + 导航「印刷知識」下拉 (四处同一张图) */
export const blogM3Images: Record<string, string> = {
${mapLines}
};
`, 'utf8');

const logPath = path.join(SRC_ROOT, '.hermes/logs/2026-09-12-blog-m3-selection-v3.md');
fs.writeFileSync(logPath, `# Blog M3 选图 v3 日志 (2026-09-12)

- 源池(可解析): ${pool.length} 张（其中 <115KB 直接可用: ${pool.filter((f) => f.size < LIMIT).length} 张）
- 文章数(去重): ${posts.length}
- 变体分配: **hero=${stats.hero}** / variety=${stats.variety} / multi-angle=${stats['multi-angle']} / spread=${stats.spread} / detail=${stats.detail} / 其他=${stats.other}
- hero 重编码至 <115KB: ${stats.reencoded} 张
- 无匹配: ${stats.noMatch}

\`\`\`
${log.join('\n')}
\`\`\`
`, 'utf8');

console.log(`pool=${pool.length} (<115KB=${pool.filter((f) => f.size < LIMIT).length}) posts=${posts.length}`);
console.log(`variants: hero=${stats.hero} variety=${stats.variety} multi-angle=${stats['multi-angle']} spread=${stats.spread} detail=${stats.detail} other=${stats.other} reencoded=${stats.reencoded} noMatch=${stats.noMatch}`);
console.log(logPath);
}

main().catch((e) => { console.error(e); process.exit(1); });
