#!/usr/bin/env node
/**
 * blog-title-census-e7.mjs — E7 獨立輪: blog 長文標題 50-57 半角當量盤點 (只讀, 不改檔)
 *
 * 數據源: src/data/blog-data/{zh-hk,en,ja}.json → posts[].title / .slug
 * 口徑: scripts/guards/title-equiv.js (TITLE_MIN=50, TITLE_MAX=57, CJK×2)
 * 輸出: .hermes/_e7-title-census.json + 終端表格 (band: OK / TRIM(>57) / FILL(<50))
 *
 * 範圍: 18 篇 12 段長文 (6 篇 × 3 語) — 以審計文件第四節清單為準, 全量掃描後按 slug 對照。
 * 用法: node scripts/blog-title-census-e7.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band } = require('./guards/title-equiv.js');

// 審計文件第四節點名的 6 篇長文 slug (docs/2026-09-20-12seg-compliance-audit-and-plan.md)
// 先全量掃, 再以此對照; 若 slug 名對不上, 以全量 OUT 清單為準輸出。
const LONGFORM_HINTS = [
  'cost-baseline', 'sticker', 'foil', 'poster', 'packaging', 'campus',
  'hong-kong-printing-cost-baseline-2026',
];

const results = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  const data = JSON.parse(readFileSync(`src/data/blog-data/${loc}.json`, 'utf8'));
  // 結構: { [slug]: { title, ... } } (無 posts 陣列層)
  const posts = Object.entries(data)
    .filter(([, v]) => v && typeof v === 'object' && v.title)
    .map(([slug, v]) => ({ slug, ...v }));
  if (posts.length === 0) { console.error(`${loc}: 無任何含 title 的文章`); process.exit(1); }
  for (const p of posts) {
    if (!p.title || !p.slug) continue;
    const eq = equiv(p.title);
    results.push({
      loc, slug: p.slug, title: p.title, equiv: eq,
      band: band(p.title), // 'OK' | 'TRIM' | 'FILL'
      longform: LONGFORM_HINTS.some(h => p.slug.includes(h)),
    });
  }
}

const out = results.filter(r => r.band !== 'OK');
const longformOut = out.filter(r => r.longform);
console.log(`總 posts: ${results.length} · OUT 總數: ${out.length} · 長文 OUT: ${longformOut.length}`);
console.log('--- 全部 OUT (band≠OK) ---');
for (const r of out.sort((a, b) => b.equiv - a.equiv)) {
  console.log(`${r.band.padEnd(4)} eq=${String(r.equiv).padStart(3)}  ${r.loc.padEnd(5)} ${r.slug}${r.longform ? ' ★長文' : ''}`);
}
writeFileSync('.hermes/_e7-title-census.json', JSON.stringify({ all: results, out }, null, 1), 'utf8');
console.log('已寫 .hermes/_e7-title-census.json');
