/**
 * analyze-title-separators.mjs — SKU 标题分隔符实测 (只读)
 *
 * 用途: 评估「分隔符 ｜ / | / ・ / · / - 的使用占比与当量代价」。
 * 背景: 2026-09-19 用户方案提出「破折号重写率 19.7% vs 管道符 41%, 建议评估 ｜→-」。
 *       评估第一步 = 先核实前提 (站点到底在用哪种分隔符), 再谈取舍 (§0.23.2 闸门 1)。
 *
 * 用法: node scripts/analyze-title-separators.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band } = require('./guards/title-equiv.js');

const ROOT = path.resolve(import.meta.dirname, '..');
const LOCALES = ['zh-hk', 'en', 'ja'];

const txt = fs.readFileSync(path.join(ROOT, 'src/data/sku-seo-data.ts'), 'utf8');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });

const rows = [];
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  for (const loc of LOCALES) {
    const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) continue;
    rows.push({ slug: starts[i].slug, locale: loc, title: m[1].replace(/\\"/g, '"') });
  }
}

// 分隔符统计: 同一标题可能混用, 故按「出现次数」与「标题数」双计
const SEPARATORS = [
  { key: '半角竖线 |', re: /\|/g, equiv: 1 },
  { key: '全角竖线 ｜', re: /｜/g, equiv: 2 },
  { key: '中黑点 ・', re: /・/g, equiv: 2 },
  { key: '间隔号 ·', re: /·/g, equiv: 1 },
  { key: '半角连字符 -', re: / - /g, equiv: 3 },
  { key: '空格斜杠 /', re: / \/ /g, equiv: 3 },
];

const perLocale = {};
for (const loc of LOCALES) {
  const sub = rows.filter((r) => r.locale === loc);
  const out = {};
  for (const s of SEPARATORS) {
    const titlesWith = sub.filter((r) => new RegExp(s.re.source).test(r.title)).length;
    const total = sub.reduce((n, r) => n + (r.title.match(s.re) || []).length, 0);
    out[s.key] = { titlesWith, occurrences: total, equivEach: s.equiv };
  }
  perLocale[loc] = { titles: sub.length, seps: out };
}

// 若把所有全角竖线 ｜ 换成半角 | , 当量节省与区间迁移预测
const conv = rows
  .filter((r) => r.title.includes('｜'))
  .map((r) => {
    const before = equiv(r.title);
    const after = equiv(r.title.replace(/｜/g, '|'));
    return { slug: r.slug, locale: r.locale, before, after, bandBefore: band(r.title), bandAfter: band(r.title.replace(/｜/g, '|')) };
  });

const wouldFlip = conv.filter((c) => c.bandBefore !== c.bandAfter);

console.log('=== 分隔符分布 (按 locale) ===');
for (const loc of LOCALES) {
  console.log(`\n[${loc}] ${perLocale[loc].titles} 条标题`);
  for (const [k, v] of Object.entries(perLocale[loc].seps)) {
    if (v.occurrences === 0) continue;
    const pct = ((v.titlesWith / perLocale[loc].titles) * 100).toFixed(0);
    console.log(`   ${k.padEnd(14)} 出现 ${String(v.occurrences).padStart(3)} 次 / 覆盖 ${String(v.titlesWith).padStart(3)} 条 (${pct}%) / 每个 ${v.equivEach} 当量`);
  }
}

console.log(`\n=== 含全角 ｜ 的标题: ${conv.length} 条 ===`);
for (const c of conv.slice(0, 10)) {
  console.log(`   ${c.locale}\t${c.slug}\t${c.before}→${c.after} 当量\t${c.bandBefore}→${c.bandAfter}`);
}
console.log(`\n仅靠 ｜→| 即可跨过 50/58 边界的标题: ${wouldFlip.length} 条`);
for (const c of wouldFlip) console.log(`   ★ ${c.locale}\t${c.slug}\t${c.before}( ${c.bandBefore}) → ${c.after}(${c.bandAfter})`);

// 尾缀品牌前用的分隔符 (最影响「品牌是否被截断」的那一个)
const brandTail = {};
for (const r of rows) {
  const parts = r.title.trim().split(/([|｜])/);
  const last = parts[parts.length - 2] || '(none)';
  brandTail[last] = (brandTail[last] || 0) + 1;
}
console.log('\n=== 品牌前紧邻的分隔符统计 (全 300 槽) ===');
for (const [k, v] of Object.entries(brandTail).sort((a, b) => b[1] - a[1])) {
  const label = k === '|' ? '半角 |' : k === '｜' ? '全角 ｜' : k;
  console.log(`   ${label.padEnd(10)} ${v} 条`);
}

const outDir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'title-separator-analysis-2026-09-19.json'), JSON.stringify({ perLocale, fullWidthPipeTitles: conv, wouldFlip, brandTail }, null, 1));
console.log('\nreport: .hermes/reports/title-separator-analysis-2026-09-19.json');
