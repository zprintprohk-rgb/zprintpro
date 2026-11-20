#!/usr/bin/env node
/* 导出 45 条提案为 JSON (供执行批使用) */
import fs from 'node:fs';
const src = fs.readFileSync('.hermes/title-proposals-verify.mjs', 'utf8');
const m = src.match(/const proposals = (\[[\s\S]*?\n\]);/);
if (!m) { console.error('parse fail'); process.exit(1); }
const proposals = eval(m[1]);
fs.writeFileSync('.hermes/title-proposals-45.json', JSON.stringify(proposals, null, 1), 'utf8');
console.log('导出', proposals.length, '条 → .hermes/title-proposals-45.json');
// 按 slug 聚合
const bySlug = {};
for (const p of proposals) { bySlug[p.slug] = bySlug[p.slug] || {}; bySlug[p.slug][p.zh ? 'zh-hk' : p.en ? 'en' : 'ja'] = p.zh || p.en || p.ja; }
fs.writeFileSync('.hermes/title-proposals-by-slug.json', JSON.stringify(bySlug, null, 1), 'utf8');
console.log('按 slug 聚合 → .hermes/title-proposals-by-slug.json');
