// .hermes/logs/_restore-sku-seo.mjs — 用 node 直接還原（PowerShell Copy-Item 靜默失敗過一次）
import fs from 'node:fs';

const SRC = '.hermes/_bak-sku-seo-before-regen-20260920.ts';
const DST = 'src/data/sku-seo-data.ts';

const keysOf = (s) => [...s.matchAll(/^ {2}"([a-z0-9][a-z0-9-]*)":\s*\{/gm)].map((m) => m[1]);

const src = fs.readFileSync(SRC, 'utf8');
console.log(`來源 key 數: ${keysOf(src).length} ｜ 長度 ${src.length}`);

const before = fs.readFileSync(DST, 'utf8');
console.log(`目標（還原前）key 數: ${keysOf(before).length} ｜ 長度 ${before.length}`);

fs.writeFileSync(DST, src, 'utf8');

const after = fs.readFileSync(DST, 'utf8');
console.log(`目標（還原後）key 數: ${keysOf(after).length} ｜ 長度 ${after.length}`);
console.log(after === src ? '✅ 還原成功（逐字相同）' : '🔴 還原失敗');
