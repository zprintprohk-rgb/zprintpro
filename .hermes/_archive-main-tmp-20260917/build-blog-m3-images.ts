/**
 * 老板执行提示词 (2026-09-11): blog 图片源切换 M3 模型生成图
 * - 源: F:\zprintpro-en-us-images M3的模型生成的图片 (live SKU 目录, 排除 _* 存档/raw)
 * - 门禁: .webp + ≤95KB (超标跳过记日志) + 三语同图 (1 slug = 1 张物理图)
 * - 匹配: 文章 categoryKey/主关键词 → 文件名语义前缀 (zprintpro-{category}-) → 变体优先级 hero>variety>spread>detail>multi-angle
 * - 唯一性: 全局 used 索引, 冲突按文件名排序取下一张
 * - 无匹配降级: 既有品牌封面池 (public/images/blog/** + og-image.jpg), 记 WARN: fallback used for [slug]
 * 输出: public/images/blog-m3/{slug}.webp (复制) + src/data/blog-m3-images.ts (映射) + 日志
 */
import fs from 'fs';
import path from 'path';

const M3_ROOT = 'F:\\zprintpro-en-us-images M3的模型生成的图片';
const DEST = 'F:\\zprintpro-nextjs\\public\\images\\blog-m3';
const SRC_ROOT = 'F:\\zprintpro-nextjs';
// 2026-09-11 老板拍板: 大小门禁 95KB → 115KB (95KB 仅 39 张合格致 67 篇降级, 放宽覆盖 flyers/educational/menus/packaging/posters 全类目)
const MAX_BYTES = 115 * 1024;

// 读取 blogPosts (从 blog-posts.ts 里抽 slug/categoryKey/date)
function loadBlogPosts() {
  const s = fs.readFileSync(path.join(SRC_ROOT, 'src/data/blog-posts.ts'), 'utf8');
  const re = /slug:\s*'([^']+)'[\s\S]*?categoryKey:\s*'([^']+)'[\s\S]*?date:\s*'([^']+)'/g;
  const posts = [];
  let m;
  while ((m = re.exec(s))) {
    posts.push({ slug: m[1], categoryKey: m[2], date: m[3] });
  }
  return posts;
}

// 扫描 M3 池
const pool = []; // { src, name, cat }
const KNOWN_CATS = ['stickers', 'packaging', 'calendars', 'red-packets', 'envelopes', 'banners', 'books', 'paper-bags', 'japan-doujin', 'wedding', 'greeting-cards', 'flyers', 'posters', 'menus', 'educational'];
function catOf(name) {
  for (const c of KNOWN_CATS) if (name.startsWith(`zprintpro-${c}-`)) return c;
  return null;
}
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name.startsWith('_') || e.name === 'raw') continue;
      walk(p);
      continue;
    }
    if (!e.name.endsWith('.webp')) continue;
    if (!e.name.startsWith('zprintpro-')) continue;
    const st = fs.statSync(p);
    if (st.size > MAX_BYTES) continue; // 超标跳过 (门禁)
    const cat = catOf(e.name);
    if (!cat) continue;
    pool.push({ src: p, name: e.name, cat });
  }
})(M3_ROOT);

// 兜底池: 既有品牌封面 (public/images/blog/** + og-image.jpg), ≤95KB
const fallbackPool = [];
(function walkPub(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) { walkPub(p); continue; }
    if (!e.name.endsWith('.webp') && !e.name.endsWith('.jpg')) continue;
    const st = fs.statSync(p);
    if (st.size > MAX_BYTES) continue;
    fallbackPool.push({ src: p, name: e.name });
  }
})(path.join(SRC_ROOT, 'public/images/blog'));
const ogPath = path.join(SRC_ROOT, 'public/og-image.jpg');
if (fs.existsSync(ogPath) && fs.statSync(ogPath).size <= MAX_BYTES) fallbackPool.push({ src: ogPath, name: 'og-image.jpg' });

// 前缀候选映射
const GENERIC = ['zprintpro-banners-', 'zprintpro-stickers-', 'zprintpro-greeting-cards-', 'zprintpro-packaging-', 'zprintpro-calendars-'];
const M3_CANDIDATES = {
  sticker: ['zprintpro-stickers-'],
  packaging: ['zprintpro-packaging-'],
  calendars: ['zprintpro-calendars-'],
  'red-packets': ['zprintpro-red-packets-'],
  banners: ['zprintpro-banners-'],
  books: ['zprintpro-books-'],
  'paper-bags': ['zprintpro-paper-bags-'],
  'japan-doujin': ['zprintpro-japan-doujin-'],
  'wedding-envelope': ['zprintpro-wedding-', 'zprintpro-greeting-cards-'],
  card: ['zprintpro-greeting-cards-'],
  printing: ['zprintpro-flyers-', 'zprintpro-posters-', 'zprintpro-banners-', 'zprintpro-stickers-', 'zprintpro-packaging-'],
  flyers: ['zprintpro-flyers-'],
  posters: ['zprintpro-posters-'],
  menus: ['zprintpro-menus-'],
  educational: ['zprintpro-educational-'],
  'food-packaging': ['zprintpro-packaging-'],
  'company-news': GENERIC,
  trends: GENERIC,
  design: GENERIC,
  branding: GENERIC,
  hongkong: GENERIC,
  'cross-border': GENERIC,
  'creator-ip': GENERIC,
};
function candidatesFor(post) {
  if (post.categoryKey === 'buying-guide') {
    const s = post.slug;
    if (s.includes('sticker')) return ['zprintpro-stickers-'];
    if (s.includes('paper-bag')) return ['zprintpro-paper-bags-'];
    if (s.includes('packag')) return ['zprintpro-packaging-'];
    if (s.includes('flyer')) return ['zprintpro-flyers-'];
    if (s.includes('poster')) return ['zprintpro-posters-'];
    if (s.includes('menu')) return ['zprintpro-menus-'];
    if (s.includes('calendar')) return ['zprintpro-calendars-'];
    return GENERIC;
  }
  return M3_CANDIDATES[post.categoryKey] || GENERIC;
}

const variantRank = (name) => {
  if (name.includes('-hero')) return 0;
  if (name.includes('-variety')) return 1;
  if (name.includes('-spread')) return 2;
  if (name.includes('-detail')) return 3;
  if (name.includes('-multi-angle')) return 4;
  return 5;
};

// 分配
const posts = loadBlogPosts().sort((a, b) => (b.date || '').localeCompare(a.date || ''));
const used = new Set(); // 已用 M3 物理文件
const usedFallback = new Set(); // 已用兜底物理文件
const map = {}; // slug -> public path
const log = []; // 选择日志
const stats = { m3: 0, fallback: 0, total: posts.length };

fs.mkdirSync(DEST, { recursive: true });

for (const post of posts) {
  const prefixes = candidatesFor(post);
  const cands = pool
    .filter((f) => !used.has(f.src) && prefixes.some((p) => f.name.startsWith(p)))
    .sort((a, b) => variantRank(a.name) - variantRank(b.name) || a.name.localeCompare(b.name));
  let src = null;
  let mode = 'm3';
  if (cands.length) {
    src = cands[0].src;
    used.add(src);
    stats.m3++;
  } else {
    // 降级: 品牌氛围图 (既有封面池, 唯一轮转)
    const fb = fallbackPool.filter((f) => !usedFallback.has(f.src)).sort((a, b) => a.name.localeCompare(b.name));
    if (fb.length) {
      src = fb[0].src;
      usedFallback.add(src);
      mode = 'fallback';
      stats.fallback++;
      log.push(`WARN: fallback used for [${post.slug}] (categoryKey=${post.categoryKey}, candidates=${prefixes.join('|') || 'none'})`);
    } else {
      log.push(`ERROR: no image at all for [${post.slug}]`);
      continue;
    }
  }
  const size = fs.statSync(src).size;
  const dest = path.join(DEST, `${post.slug}.webp`);
  fs.copyFileSync(src, dest);
  map[post.slug] = `/images/blog-m3/${post.slug}.webp`;
  log.push(`OK  [${post.slug}] ${mode} <- ${path.basename(src)} (${Math.round(size / 102.4) / 10}KB) -> ${dest.replace(SRC_ROOT, '')}`);
}

// 写映射文件
const mapLines = Object.entries(map).map(([k, v]) => `  '${k}': '${v}',`).join('\n');
const ts = `/** 自动生成 (2026-09-11 build-blog-m3-images.ts): blog → M3 模型生成图 (三语同图, 1 slug = 1 张) */\nexport const blogM3Images: Record<string, string> = {\n${mapLines}\n};\n`;
fs.writeFileSync(path.join(SRC_ROOT, 'src/data/blog-m3-images.ts'), ts, 'utf8');

// 写日志
const logPath = path.join(SRC_ROOT, '.hermes/logs/blog-m3-selection-2026-09-11.md');
const logText = `# Blog M3 图选择日志 (2026-09-11)\n\n- M3 池: ${pool.length} 张唯一 ≤95KB (live 目录)\n- 兜底池: ${fallbackPool.length} 张既有品牌封面 ≤95KB\n- 分配: M3=${stats.m3} / fallback=${stats.fallback} / total=${stats.total}\n\n${log.join('\n')}\n`;
fs.writeFileSync(logPath, logText, 'utf8');

console.log(`M3 pool: ${pool.length}, fallback pool: ${fallbackPool.length}`);
console.log(`assigned: M3=${stats.m3} fallback=${stats.fallback} total=${stats.total}`);
const warns = log.filter((l) => l.startsWith('WARN'));
console.log(`WARN fallbacks: ${warns.length}`);
console.log(logPath);
