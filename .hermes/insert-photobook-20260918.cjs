/**
 * Photo Book 独立验收 + 插入 (不采信写手自检, 全部自行复算)
 * §12 三件套: 计数断言 + 结果形状断言 + 备份
 */
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
const { equiv } = require(path.join(ROOT, 'scripts/guards/title-equiv.js'));
const STAGE = path.join(ROOT, '.hermes/staging/photo-book-content.json');
const BAK = path.join(ROOT, '.hermes/_bak-photobook-20260918');
const SLUG = 'photo-book-printing-guide';
const LOCS = ['zh-hk', 'en', 'ja'];
const DATA = { 'zh-hk': 'src/data/blog-data/zh-hk.json', en: 'src/data/blog-data/en.json', ja: 'src/data/blog-data/ja.json' };

const S = JSON.parse(fs.readFileSync(STAGE, 'utf8'));
let fail = 0;
const bad = (m) => { fail++; console.log('  FAIL ' + m); };

console.log('===== 阶段 1: 独立验收 (自行复算, 不采信自检) =====');
for (const loc of LOCS) {
  const t = S.title[loc], d = S.description[loc], c = S.content[loc];
  const te = equiv(t), de = equiv(d);
  console.log('\n--- ' + loc + ' ---');
  console.log('  title 当量 ' + te + (te >= 50 && te <= 58 ? ' OK' : ' ★出界'));
  if (!(te >= 50 && te <= 58)) bad('title 当量出界');
  console.log('  desc  当量 ' + de + (de >= 150 && de <= 160 ? ' OK' : ' ★出界'));
  if (!(de >= 150 && de <= 160)) bad('desc 当量出界');
  const n = (re) => (c.match(re) || []).length;
  const qa = n(/快速答案：|Quick Answer:|クイック回答：/g);
  const faq = n(/<p><strong>Q\d+[:：][\s\S]*?<\/strong><br\/>/g);
  const tb = n(/<table class="w-full text-sm border-collapse my-4">/g);
  const wa = n(/wa\.me\/8619880851334/g);
  const h2 = n(/<h2>/g);
  const h2q = (c.match(/<h2>[^<]*[？?]/g) || []).length;
  const links = new Set([...c.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).filter((h) => h.startsWith('/')));
  const script = n(/<script/g), img = n(/<img/g);
  console.log(`  快速答案=${qa}(3) FAQ=${faq}(4-5) 表格=${tb}(>=2) CTA=${wa}(2-3) H2=${h2}(>=6) H2问句=${h2q}(>半数) 唯一内链=${links.size}(>=7) script=${script}(0) img=${img}(0)`);
  if (qa !== 3) bad('快速答案数 ≠ 3');
  if (faq < 4 || faq > 5) bad('FAQ 数不在 4-5');
  if (tb < 2) bad('表格 < 2');
  if (wa < 2 || wa > 3) bad('CTA 数不在 2-3');
  if (h2 < 6) bad('H2 < 6');
  if (h2q * 2 <= h2) bad('H2 问句未过半');
  if (links.size < 7) bad('唯一内链 < 7');
  if (script || img) bad('含 script 或 img');
  // 红线
  const P = ['智印印港', '保证', '保證', '承诺', '承諾', '确保', '確保', '已具备', '已具備', '已完成', 'Alibaba', '500+', '10x', '500x', 'GSC', '攻艱', '衝首頁', 'Pillar', 'K3', '簇', 'cluster'];
  const hitP = P.filter((w) => c.includes(w) || t.includes(w) || d.includes(w));
  if (hitP.length) bad('红线词: ' + hitP.join(','));
  // 品牌分层
  if (loc === 'zh-hk' && (t.includes('ZprintPro') || c.includes('ZprintPro'))) bad('zh-hk 含 ZprintPro');
  if (loc !== 'zh-hk' && (t.includes('智印港') || c.includes('智印港'))) bad(loc + ' 含 智印港');
  if (/[\u4e00-\u9fff]/.test(t) && loc === 'en') bad('en title 含 CJK');
  // 首段长度
  const first = (c.match(/<p>([\s\S]*?)<\/p>/) || [])[1] || '';
  console.log('  首段当量 ' + equiv(first.replace(/<[^>]+>/g, '')));
}
console.log('\n阶段 1 结论: ' + (fail ? '❌ ' + fail + ' 项不过' : '✅ 全部通过'));
if (fail) process.exit(1);

console.log('\n===== 阶段 2: 备份 + 插入 blog-data =====');
fs.mkdirSync(BAK, { recursive: true });
const originals = {};
for (const loc of LOCS) {
  const p = path.join(ROOT, DATA[loc]);
  const raw = fs.readFileSync(p, 'utf8');
  originals[loc] = raw;
  const rt = JSON.stringify(JSON.parse(raw), null, 2) + '\n';
  if (rt !== raw) { console.error('❌ ' + loc + ' JSON 往返不一致, 中止'); process.exit(1); }
  fs.writeFileSync(path.join(BAK, path.basename(DATA[loc])), raw, 'utf8');
  const obj = JSON.parse(raw);
  if (obj[SLUG]) { console.error('❌ ' + loc + ' slug 已存在'); process.exit(1); }
  obj[SLUG] = { slug: SLUG, title: S.title[loc], description: S.description[loc], date: '2026-09-18', category: S.category[loc], content: S.content[loc] };
  fs.writeFileSync(p, JSON.stringify(obj, null, 2) + '\n', 'utf8');
  console.log('  WROTE ' + DATA[loc]);
}

console.log('\n===== 阶段 3: blog-posts.ts 注册 (const 必须在数组之外) =====');
const BP = path.join(ROOT, 'src/data/blog-posts.ts');
const bpRaw = fs.readFileSync(BP, 'utf8');
fs.writeFileSync(path.join(BAK, 'blog-posts.ts'), bpRaw, 'utf8');
const ARRAY_DECL = 'export const blogPosts: BlogPostMeta[] = [';
const TAIL = '  lpZineSmallBatchBookletGuide,\n  ];';
if (!bpRaw.includes(ARRAY_DECL) || !bpRaw.includes(TAIL)) { console.error('❌ 锚点未找到'); process.exit(1); }
if (bpRaw.includes('lpPhotoBookPrintingGuide')) { console.error('❌ 已注册'); process.exit(1); }
const BLOCK = `
// 2026-09-18 队列 A #3 (v10 §四.2「4 篇新需求承接」剩余项; v10 卡未排期 = 净增量)
// 队列依据: docs/2026-09-17-k3-directive-v10-outbound-masterplan-v2.md §四 + docs/2026-09-17-website-traffic-expansion-plan-v1.md §四/§五 路径1
// 承接 SKU: perfect-bound-books / hardcover-books | 3 locale native | MOQ 口径 = 1 本起印 (K3 2026-09-18 业务口径)
const lpPhotoBookPrintingGuide: BlogPostMeta = {
  slug: '${SLUG}',
  categoryKey: 'printing',
  source: 'daily',
  date: '2026-09-18',
  title: {
    'zh-hk': ${JSON.stringify(S.title['zh-hk'])},
    en: ${JSON.stringify(S.title.en)},
    ja: ${JSON.stringify(S.title.ja)},
  },
  excerpt: {
    'zh-hk': ${JSON.stringify(S.excerpt['zh-hk'])},
    en: ${JSON.stringify(S.excerpt.en)},
    ja: ${JSON.stringify(S.excerpt.ja)},
  },
  targetKeywords: {
    primary: 'photo book printing',
    secondary: [
      'custom photo book printing', 'wedding photo album printing', 'photo book printing small batch',
      'hardcover photo book', 'perfect bound photo book', 'photography portfolio printing',
      '寫真書印刷', '相冊印刷', '相簿訂製', '婚禮相冊印刷', '攝影集印刷',
      'フォトブック 印刷', '写真集 印刷', 'アルバム 印刷', '少部数 印刷',
    ],
  },
};
`;
let bp = bpRaw.replace(ARRAY_DECL, BLOCK + '\n' + ARRAY_DECL);
bp = bp.replace(TAIL, '  lpZineSmallBatchBookletGuide,\n  lpPhotoBookPrintingGuide,\n  ];');
fs.writeFileSync(BP, bp, 'utf8');
console.log('  WROTE src/data/blog-posts.ts (' + bp.length + ' B)');

console.log('\n===== 阶段 4: 结果形状断言 =====');
let f2 = 0;
const chk = (label, ok) => { if (!ok) f2++; console.log('  ' + (ok ? 'OK  ' : 'FAIL') + ' ' + label); };
chk('const 声明早于数组声明', bp.indexOf('const lpPhotoBookPrintingGuide') < bp.indexOf(ARRAY_DECL));
chk('const 声明 1 处', (bp.match(/const lpPhotoBookPrintingGuide: BlogPostMeta/g) || []).length === 1);
chk('数组引用 1 处', (bp.match(/^  lpPhotoBookPrintingGuide,$/m) || []).length === 1);
chk('数组声明仍 1 处', (bp.match(/export const blogPosts: BlogPostMeta\[\] = \[/g) || []).length === 1);
chk('无 BOM', fs.readFileSync(BP)[0] !== 0xff);
for (const loc of LOCS) {
  const now = fs.readFileSync(path.join(ROOT, DATA[loc]), 'utf8');
  const obj = JSON.parse(now);
  chk(loc + ' 条目写入一致', obj[SLUG] && obj[SLUG].content === S.content[loc]);
  const o2 = JSON.parse(now);
  delete o2[SLUG];
  chk(loc + ' 原有条目零改动', JSON.stringify(o2, null, 2) + '\n' === originals[loc]);
  chk(loc + ' 条目数 +1', Object.keys(obj).length === Object.keys(JSON.parse(originals[loc])).length + 1);
}
if (f2) { console.error('\n❌ 形状断言未过 (' + f2 + ') —— 回滚'); for (const loc of LOCS) fs.copyFileSync(path.join(BAK, path.basename(DATA[loc])), path.join(ROOT, DATA[loc])); fs.copyFileSync(path.join(BAK, 'blog-posts.ts'), BP); process.exit(1); }
console.log('\n✅ Photo Book 插入完成 (备份: ' + BAK + ')');
