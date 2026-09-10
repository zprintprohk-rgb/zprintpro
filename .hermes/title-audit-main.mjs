/* 审计 main(生产) 版 SKU 标题: git show main:<file> → 解析 → 分类
   用法: node .hermes/title-audit-main.mjs
   输出: .hermes/title-audit-main.json (main 版全部 SKU 三语标题 + 当量) */
import { execSync } from 'node:child_process';
import fs from 'node:fs';

const show = (f) => execSync(`git show main:${f}`, { cwd: 'F:/zprintpro-nextjs', maxBuffer: 64 * 1024 * 1024 }).toString('utf8');

const seoTs = show('src/data/sku-seo-data.ts');
const prodTs = show('src/data/products.ts');

// 半角当量 (v4 §1.1: 全角×2)
const hw = (s) => [...(s || '')].reduce((n, ch) => n + (/[\u2E80-\u9FFF\uF900-\uFAFF\uFF01-\uFF60\u3000-\u303F]/.test(ch) ? 2 : 1), 0);
const cjkCount = (s) => (s || '').replace(/[^\u4e00-\u9fff\u3400-\u4dbf\u3040-\u30ff]/g, '').length;

// 解析 sku-seo-data.ts 条目 title (3 locale)
function parseSeoTitles(ts) {
  const out = {};
  const re = /"([a-z0-9-]+)"\s*:\s*\{/g;
  let m;
  while ((m = re.exec(ts))) {
    const slug = m[1];
    let depth = 0, i = m.index + m[0].length - 1;
    for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
    const block = ts.slice(m.index, i + 1);
    const zh = block.match(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/);
    if (!zh) { out[slug] = { 'zh-hk': '', en: '', ja: '' }; continue; }
    // 顺序: zh-hk title, en title, ja title — 分别捕获
    const titles = [...block.matchAll(/"title"\s*:\s*"((?:[^"\\]|\\.)*)"/g)].map((x) => JSON.parse('"' + x[1] + '"'));
    out[slug] = { 'zh-hk': titles[0] || '', en: titles[1] || '', ja: titles[2] || '' };
  }
  return out;
}
// 解析 products.ts title_zh/en/ja
function parseProductTitles(ts) {
  const out = {};
  const re = /\{\s*slug:\s*'([a-z0-9-]+)'/g;
  let m;
  while ((m = re.exec(ts))) {
    const slug = m[1];
    let depth = 0, i = m.index;
    for (; i < ts.length; i++) { if (ts[i] === '{') depth++; else if (ts[i] === '}') { depth--; if (depth === 0) break; } }
    const block = ts.slice(m.index, i + 1);
    const g = (k) => { const mm = block.match(new RegExp(k + "\\s*:\\s*'((?:[^'\\\\]|\\\\.)*)'")); return mm ? mm[1] : ''; };
    out[slug] = { 'zh-hk': g('title_zh'), en: g('title_en'), ja: g('title_ja') };
  }
  return out;
}

const seo = parseSeoTitles(seoTs);
const prod = parseProductTitles(prodTs);
const slugs = new Set([...Object.keys(seo), ...Object.keys(prod)]);

// 冻结 (9/9 工具定义 + 贺卡族 9/6 批)
const FROZEN = new Set(['premium-greeting-cards', 'thick-greeting-cards-400g', 'foil-greeting-cards', 'spot-uv-greeting-cards', 'matte-greeting-cards', 'rounded-corner-greeting-cards']);

const rows = [];
for (const slug of slugs) {
  if (slug === 'small-bags') continue; // 308 redirect 非线上
  const row = { slug, frozen: FROZEN.has(slug) };
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const st = (seo[slug] && seo[slug][loc]) || '';
    const pt = (prod[slug] && prod[slug][loc]) || '';
    const effective = st || pt;
    row[loc] = { seo: st, product: pt, effective, hw: hw(effective), cjk: cjkCount(effective) };
  }
  rows.push(row);
}
fs.writeFileSync('.hermes/title-audit-main.json', JSON.stringify(rows, null, 1), 'utf8');
// 汇总
const band = (hw) => hw < 50 ? 'FILL<50' : hw <= 54 ? 'OK50-54' : hw <= 60 ? 'LEGACY55-60' : 'RED>60';
for (const loc of ['zh-hk', 'en', 'ja']) {
  const st = {};
  for (const r of rows) { const b = band(r[loc].hw); st[b] = (st[b] || 0) + 1; }
  console.log(loc, JSON.stringify(st));
}
console.log('total sku (main):', rows.length);
