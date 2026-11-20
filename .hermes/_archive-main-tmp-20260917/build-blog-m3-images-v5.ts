/**
 * Blog M3 选图 v5（2026-09-12 老板两档体积规则）
 * 体积规则（按老板原话）:
 *   ① 图片 < 115KB → 直接选用（webp，不二次压缩，零画质损失）
 *   ② 图片 ≥ 115KB → 压缩处理后使用，目标 **< 100KB**
 * 选图规则:
 *   hero 优先 > variety > multi-angle > spread > detail > 其他(box-open/card-stand/calendar-open)
 *   文件名关键词 (category + productSlug) 与文章 slug 词元重合度；类目优先，类目耗尽跨类目兜底（保证 0 篇无图）
 *   全局唯一（顺序占位，一张图只给一篇）+ 三语同图（1 篇 = 1 张物理图）
 * 输出: public/images/blog-m3/{slug}.webp + src/data/blog-m3-images.ts + 日志
 */
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import sharp from 'sharp';

/** 物理内容哈希 (同一张图出现在多个 SKU 目录时去重, 保证线上卡片图视觉唯一) */
const hashCache = new Map();
function fileHash(p) {
  if (!hashCache.has(p)) hashCache.set(p, crypto.createHash('md5').update(fs.readFileSync(p)).digest('hex'));
  return hashCache.get(p);
}

const M3_ROOT = 'F:\\zprintpro-en-us-images M3的模型生成的图片';
const SRC_ROOT = 'F:\\zprintpro-nextjs';
const DEST = path.join(SRC_ROOT, 'public', 'images', 'blog-m3');
const GATE_DIRECT = 115 * 1024; // <115KB 直接用
const TARGET = 100 * 1024;      // ≥115KB 者压到 <100KB

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
  for (let i = 0; i < head.length && !cat; i++) {
    for (let n = 3; n >= 1; n--) {
      const cand = head.slice(i, i + n).join('-');
      if (KNOWN_CATS.includes(cand)) { cat = cand; ci = i; break; }
    }
  }
  if (!cat) return null;
  return { category: cat, locale, variant, productSlug: head.slice(ci + cat.split('-').length).join('-') };
}

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
  sticker: ['stickers'], packaging: ['packaging'], calendars: ['calendars'], 'red-packets': ['red-packets'],
  banners: ['banners', 'posters'], books: ['books', 'educational'], 'paper-bags': ['paper-bags', 'packaging'],
  'japan-doujin': ['japan-doujin', 'stickers'], 'wedding-envelope': ['wedding-invitations', 'greeting-cards'],
  card: ['greeting-cards'], printing: ['flyers', 'posters', 'stickers', 'packaging', 'books', 'menus', 'banners'],
  flyers: ['flyers', 'posters'], posters: ['posters', 'flyers', 'banners'], menus: ['menus', 'flyers'],
  educational: ['educational', 'books'], 'food-packaging': ['packaging'],
  'company-news': ['greeting-cards', 'stickers', 'packaging', 'books', 'banners'],
  trends: ['packaging', 'stickers', 'flyers', 'banners'], design: ['greeting-cards', 'stickers', 'packaging', 'posters'],
  branding: ['greeting-cards', 'packaging', 'stickers', 'paper-bags'], hongkong: ['stickers', 'flyers', 'packaging', 'banners'],
  'cross-border': ['packaging', 'paper-bags', 'stickers', 'books'], 'creator-ip': ['stickers', 'japan-doujin', 'greeting-cards'],
};
function catsFor(post) {
  if (post.categoryKey !== 'buying-guide') return CAT_MAP[post.categoryKey] || ['stickers', 'packaging', 'greeting-cards'];
  const s = post.slug;
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
  if (/banner|rollup/.test(s)) return ['banners'];
  if (/red-packet|packet/.test(s)) return ['red-packets'];
  if (/doujin|comiket/.test(s)) return ['japan-doujin'];
  if (/certificate|school|campus|education|exam/.test(s)) return ['educational', 'books'];
  return ['stickers', 'packaging', 'greeting-cards', 'books', 'flyers'];
}

const STOP = new Set(['guide', 'printing', 'print', 'hk', 'hong', 'kong', '2026', '2027', 'best', 'vs', 'and', 'the', 'for', 'a', 'an', 'custom', 'how', 'to', 'in', 'of', 'complete', 'ultimate', 'your', 'why']);
const tokens = (s) => s.split('-').filter((t) => t.length > 1 && !STOP.has(t));

/** 两档体积规则落地 */
async function place(srcEntry, destPath) {
  if (srcEntry.size < GATE_DIRECT) { fs.copyFileSync(srcEntry.src, destPath); return { bytes: srcEntry.size, mode: 'copy(<115KB)' }; }
  const tmp = `${destPath}.re.webp`;
  try {
    // 阶梯 1: 保分辨率, 轻中度降质
    for (const q of [88, 84, 80, 76, 72, 68, 64, 60]) {
      await sharp(srcEntry.src).webp({ quality: q, effort: 5 }).toFile(tmp);
      const s = fs.statSync(tmp).size;
      if (s < TARGET) { fs.renameSync(tmp, destPath); return { bytes: s, mode: `q${q}` }; }
    }
    // 阶梯 2: 降分辨率但保较高画质 (观感优于极低质量) — 2026-09-12 加, 避免 q50 这类低质产物
    for (const w of [1080, 1000, 920, 840]) {
      for (const q of [84, 80, 78]) {
        await sharp(srcEntry.src).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(tmp);
        const s = fs.statSync(tmp).size;
        if (s < TARGET) { fs.renameSync(tmp, destPath); return { bytes: s, mode: `w${w}q${q}` }; }
      }
    }
    // 阶梯 3: 极低质量兜底 (最后手段)
    for (const q of [55, 50, 45, 40]) {
      await sharp(srcEntry.src).webp({ quality: q, effort: 5 }).toFile(tmp);
      const s = fs.statSync(tmp).size;
      if (s < TARGET) { fs.renameSync(tmp, destPath); return { bytes: s, mode: `q${q}` }; }
    }
    // 阶梯 4: 深度降分辨率兜底 (保证 0 篇无图; 观感仍优于 q40 全尺寸)
    for (const w of [820, 760, 700, 640]) {
      for (const q of [78, 74, 70]) {
        await sharp(srcEntry.src).resize({ width: w, withoutEnlargement: true }).webp({ quality: q, effort: 5 }).toFile(tmp);
        const s = fs.statSync(tmp).size;
        if (s < TARGET) { fs.renameSync(tmp, destPath); return { bytes: s, mode: `w${w}q${q}` }; }
      }
    }
  } catch (e) {
    console.error(`sharp failed ${srcEntry.name}: ${String(e).slice(0, 120)}`);
  }
  if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  return null;
}

async function main() {
  const seen = new Set();
  const posts = loadBlogPosts().filter((p) => (seen.has(p.slug) ? false : (seen.add(p.slug), true)));
  const used = new Set();
  const usedHashes = new Set();
  const map = {}, log = [];
  const stats = { hero: 0, variety: 0, 'multi-angle': 0, spread: 0, detail: 0, other: 0, compressed: 0, noMatch: 0, crossCat: 0 };

  fs.mkdirSync(DEST, { recursive: true });
  for (const f of fs.readdirSync(DEST)) if (f.endsWith('.webp')) fs.unlinkSync(path.join(DEST, f));

  // 顺序分配: 即时占位保证全局唯一
  for (const post of posts) {
    const cats = catsFor(post);
    const pt = new Set(tokens(post.slug));
    const rank = (allowCross) => pool
      .filter((f) => !used.has(f.src) && !usedHashes.has(fileHash(f.src)))
      .map((f) => {
        const overlap = tokens(f.productSlug).filter((t) => pt.has(t)).length;
        const inCat = cats.includes(f.category);
        return { f, overlap, catRank: inCat ? cats.indexOf(f.category) : (allowCross ? 50 : 99), vRank: VARIANT_RANK[f.variant] ?? 9, locRank: f.locale === 'en' ? 0 : 1 };
      })
      .sort((a, b) => b.overlap - a.overlap || a.catRank - b.catRank || a.vRank - b.vRank || a.locRank - b.locRank || a.f.name.localeCompare(b.f.name));

    let pick = rank(false).find((c) => c.catRank < 99 && (c.overlap > 0 || c.vRank <= 2)) || rank(false).find((c) => c.catRank < 99);
    let crossCat = false;
    if (!pick) { const all = rank(true); if (all.length) { pick = all[0]; crossCat = true; } }
    if (!pick) { stats.noMatch++; log.push(`ERROR no image [${post.slug}]`); continue; }

    used.add(pick.f.src);
    usedHashes.add(fileHash(pick.f.src));
    const placed = await place(pick.f, path.join(DEST, `${post.slug}.webp`));
    if (!placed) { stats.noMatch++; log.push(`ERROR compress failed [${post.slug}] <- ${pick.f.name} (${(pick.f.size / 1024).toFixed(0)}KB)`); continue; }
    if (crossCat) stats.crossCat++;
    const vk = pick.f.variant in stats ? pick.f.variant : 'other';
    stats[vk]++;
    if (placed.mode !== 'copy(<115KB)') stats.compressed++;
    map[post.slug] = `/images/blog-m3/${post.slug}.webp`;
    log.push(`OK [${post.slug}] (${post.categoryKey}) <- ${pick.f.sku}/${pick.f.name} [${pick.f.variant}${crossCat ? ',跨类目' : ''}, ${(pick.f.size / 1024).toFixed(0)}KB → ${(placed.bytes / 1024).toFixed(1)}KB ${placed.mode}, overlap=${pick.overlap}]`);
  }

  const mapLines = Object.entries(map).map(([k, v]) => `  '${k}': '${v}',`).join('\n');
  fs.writeFileSync(path.join(SRC_ROOT, 'src/data/blog-m3-images.ts'),
`/** 自动生成 (2026-09-12 build-blog-m3-images-v5.ts): blog → M3 模型生成图
 * 体积两档规则: <115KB 直接选用; ≥115KB 压缩至 <100KB 后使用
 * 选图: hero 优先 > variety > multi-angle > spread > detail > 其他; 文件名关键词语义匹配; 全局唯一; 三语同图
 * 消费点: /blog/ 列表卡 + /blog/[slug] 详情 hero + 首页「印刷知識」栏 + 导航「印刷知識」下拉 (四处同一张图) */
export const blogM3Images: Record<string, string> = {
${mapLines}
};
`, 'utf8');

  const sizes = fs.readdirSync(DEST).filter((f) => f.endsWith('.webp')).map((f) => fs.statSync(path.join(DEST, f)).size);
  const over115 = sizes.filter((s) => s >= GATE_DIRECT).length;
  const maxSize = Math.max(...sizes);
  const logPath = path.join(SRC_ROOT, '.hermes/logs/2026-09-12-blog-m3-selection-v5.md');
  fs.writeFileSync(logPath, `# Blog M3 选图 v5 日志 (2026-09-12)

体积两档: <115KB 直接用 / ≥115KB 压到 <100KB

- 源池(可解析): ${pool.length} 张（其中 <115KB: ${pool.filter((f) => f.size < GATE_DIRECT).length} 张）
- 文章数(去重): ${posts.length}
- 变体分配: **hero=${stats.hero}** / variety=${stats.variety} / multi-angle=${stats['multi-angle']} / spread=${stats.spread} / detail=${stats.detail} / 其他=${stats.other}
- 跨类目兜底: ${stats.crossCat} 篇; 压缩后使用: ${stats.compressed} 张; 无匹配: ${stats.noMatch}
- 落地: ${sizes.length} 张, 最大 ${(maxSize / 1024).toFixed(1)}KB, ≥115KB 的 ${over115} 张

\`\`\`
${log.join('\n')}
\`\`\`
`, 'utf8');

  console.log(`pool=${pool.length} posts=${posts.length}`);
  console.log(`variants: hero=${stats.hero} variety=${stats.variety} multi-angle=${stats['multi-angle']} spread=${stats.spread} detail=${stats.detail} other=${stats.other}`);
  console.log(`compressed=${stats.compressed} crossCat=${stats.crossCat} noMatch=${stats.noMatch}`);
  console.log(`placed=${sizes.length} maxSize=${(maxSize / 1024).toFixed(1)}KB over115=${over115}`);
  console.log(logPath);
}

main().catch((e) => { console.error(e); process.exit(1); });
