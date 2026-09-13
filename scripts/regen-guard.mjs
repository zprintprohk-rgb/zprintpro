#!/usr/bin/env node
/**
 * regen-guard.mjs — 派生文件重生成护栏 (2026-09-13 建, 起因: 24 个 SKU 静默丢失)
 *
 * 事故复盘: `node scripts/csv-to-sku-seo.mjs` 用 75 行 CSV 重生成, 把 100 条的
 * `src/data/sku-seo-data.ts` 覆盖成 75 条 -> 24 个 SKU 丢 SKU 级 SEO, 且**无任何报错**。
 *
 * 本护栏: 在 regen 前后对比「SKU 条目数」与「slug 集合」, 任何减少/丢失即 FAIL(exit 1)。
 *
 * 用法:
 *   node scripts/regen-guard.mjs snapshot          # regen 前: 落快照 .hermes/regen-snapshot.json
 *   node scripts/regen-guard.mjs verify            # regen 后: 对比, 减少即 exit 1
 *   node scripts/regen-guard.mjs snapshot && node scripts/csv-to-sku-seo.mjs && node scripts/regen-guard.mjs verify
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';

const TARGET = 'src/data/sku-seo-data.ts';
const SNAP = '.hermes/regen-snapshot.json';
const mode = process.argv[2];

function readState() {
  const t = readFileSync(TARGET, 'utf8');
  const slugs = [...t.matchAll(/"([a-z0-9-]+)":\s*\{/g)].map((m) => m[1]);
  return { keys: (t.match(/": \{/g) || []).length, titles: (t.match(/"title":/g) || []).length, slugs: [...new Set(slugs)] };
}

if (mode === 'snapshot') {
  const s = readState();
  writeFileSync(SNAP, JSON.stringify({ at: new Date().toISOString(), ...s }, null, 2), 'utf8');
  console.log(`[snapshot] entries=${s.slugs.length} keys=${s.keys} titles=${s.titles} -> ${SNAP}`);
  process.exit(0);
}

if (mode === 'verify') {
  if (!existsSync(SNAP)) { console.log('[FAIL] 无快照, 请先跑 snapshot'); process.exit(1); }
  const prev = JSON.parse(readFileSync(SNAP, 'utf8'));
  const now = readState();
  const lost = prev.slugs.filter((s) => !now.slugs.includes(s));
  console.log(`[verify] entries ${prev.slugs.length} -> ${now.slugs.length} | keys ${prev.keys} -> ${now.keys} | titles ${prev.titles} -> ${now.titles}`);
  if (lost.length) {
    console.log(`[FAIL] regen 丢失 ${lost.length} 个 SKU 条目 (前 10): ${lost.slice(0, 10).join(', ')}`);
    console.log('       -> 已发生的真实事故: 2026-09-13 24 个 SKU 静默丢 SEO。请从 .bak / git 恢复并改源头, 禁直接接受该 regen 结果。');
    process.exit(1);
  }
  if (now.keys < prev.keys) { console.log(`[FAIL] key 数减少 ${prev.keys} -> ${now.keys}`); process.exit(1); }
  console.log('[PASS] regen 未丢失任何 SKU 条目');
  process.exit(0);
}

console.log('用法: node scripts/regen-guard.mjs snapshot|verify');
process.exit(2);
