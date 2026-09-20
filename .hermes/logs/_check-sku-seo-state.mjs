// .hermes/logs/_check-sku-seo-state.mjs — 確認 sku-seo-data.ts 的實際狀態
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const CUR = 'src/data/sku-seo-data.ts';
const BAK = '.hermes/_bak-sku-seo-before-regen-20260920.ts';

const cur = fs.readFileSync(CUR, 'utf8');
const bak = fs.readFileSync(BAK, 'utf8');

const keysOf = (s) => [...s.matchAll(/^ {2}"([a-z0-9][a-z0-9-]*)":\s*\{/gm)].map((m) => m[1]);
const kc = keysOf(cur);
const kb = keysOf(bak);

console.log(`當前檔 key 數: ${kc.length}`);
console.log(`備份檔 key 數: ${kb.length}`);
console.log(`當前檔長度: ${cur.length}`);
console.log(`備份檔長度: ${bak.length}`);
console.log(`兩者相同? ${cur === bak}`);
console.log('');

// HEAD 版本的 key 數（git show）
const headVer = execSync(`git show HEAD:${CUR.replace(/\\/g, '/')}`, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const kh = keysOf(headVer);
console.log(`HEAD 版 key 數: ${kh.length}`);
console.log('');

const onlyHead = kh.filter((k) => !kc.includes(k));
const onlyCur = kc.filter((k) => !kh.includes(k));
console.log(`僅 HEAD 有（當前檔丟失）: ${onlyHead.length}`);
if (onlyHead.length) console.log(`   ${onlyHead.slice(0, 25).join(', ')}`);
console.log(`僅當前有（當前檔新增）: ${onlyCur.length}`);
if (onlyCur.length) console.log(`   ${onlyCur.slice(0, 25).join(', ')}`);
