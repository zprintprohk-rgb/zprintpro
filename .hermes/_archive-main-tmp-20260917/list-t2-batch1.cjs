#!/usr/bin/env node
/* 只读: T2 首批 5 文件的品牌条目明细 (kind / 是否 title 字段 / 当前 title 半角当量) */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-main-tmp';
const M = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes', 'title-batch-T-manifest.json'), 'utf8'));
const FILES = ['src/data/products.ts', 'src/lib/seo.ts', 'src/lib/seo/schema-extensions.ts', 'src/lib/h1-builder.ts', 'src/app/[locale]/layout.tsx'];
const equiv = (s) => { let n = 0; for (const ch of s) n += ch.charCodeAt(0) > 127 ? 2 : 1; return n; };
for (const f of FILES) {
  const items = M.items.filter(i => i.file === f);
  const lines = fs.readFileSync(path.join(ROOT, f.replace(/\//g, '\\')), 'utf8').split(/\r?\n/);
  console.log(`\n=== ${f} (${items.length} 处) ===`);
  const seen = new Set();
  for (const it of items) {
    if (seen.has(it.line)) continue; seen.add(it.line);
    const line = lines[it.line - 1] || '';
    const isTitle = /title|Title|headline|h1/i.test(line);
    // 找 title 值
    const tm = line.match(/(?:title|title_zh|ogTitle|twitterTitle|h1)\s*:\s*['"`]([^'"`]{5,200})['"`]/i);
    const tval = tm ? tm[1] : null;
    console.log(`  L${it.line} [${it.kind}] ${isTitle ? 'TITLE' : 'non-title'} | ${tval ? `当量 ${equiv(tval)} :: ${tval.slice(0, 80)}` : line.trim().slice(0, 90)}`);
  }
}
