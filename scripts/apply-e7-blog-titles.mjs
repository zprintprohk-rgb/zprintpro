/**
 * apply-e7-blog-titles.mjs — E7 標題整改應用器（塊級錨定，禁全檔重排）
 *
 * 流程: ① 讀 .hermes/_e7-title-proposals.json → ② 每條斷言（舊標題在檔且唯一於該 slug 塊 /
 *       新標題 band==OK / 新≠舊）→ ③ 寫 rollback 賬本 .hermes/_e7-title-rollback-20260921.json
 *       → ④ 字符串級替換（只在 slug 塊邊界內，不碰 JSON 其他位元組）→ ⑤ 改後全檔 JSON.parse 複驗
 * 用法: node scripts/apply-e7-blog-titles.mjs --dry | --apply
 */
import { readFileSync, writeFileSync, renameSync } from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { equiv, band } = require('./guards/title-equiv.js');

const APPLY = process.argv.includes('--apply');
const proposals = JSON.parse(readFileSync('.hermes/_e7-title-proposals.json', 'utf8')).proposals;

const errors = [];
const ledger = [];
const byLoc = new Map();
for (const p of proposals) {
  // 新標題 band 斷言（SSoT title-equiv.js）
  const eq = equiv(p.new);
  if (band(p.new) !== 'OK') errors.push(`${p.loc}/${p.slug}: 新標題 band=${band(p.new)} eq=${eq} ≠ OK`);
  if (p.new === p.old) errors.push(`${p.loc}/${p.slug}: 新=舊`);
  if (!byLoc.has(p.loc)) byLoc.set(p.loc, []);
  byLoc.get(p.loc).push(p);
}

const out = {};
for (const [loc, list] of byLoc) {
  const path = `src/data/blog-data/${loc}.json`;
  let txt = readFileSync(path, 'utf8');
  for (const p of list) {
    const keyIdx = txt.indexOf(`"${p.slug}"`);
    if (keyIdx === -1) { errors.push(`${loc}/${p.slug}: slug 不存在`); continue; }
    const oldJson = `"title": ${JSON.stringify(p.old)}`;
    // 全檔唯一性錨定（標題字串即錨, 不依賴塊邊界; 嵌套縮排各檔不一）
    const occurrences = txt.split(oldJson).length - 1;
    if (occurrences === 0) {
      errors.push(`${loc}/${p.slug}: 找不到舊標題（anchor 失敗, 禁模糊替換）`);
      continue;
    }
    if (occurrences > 1) { errors.push(`${loc}/${p.slug}: 舊標題在檔內重複 ${occurrences} 次`); continue; }
    ledger.push({ loc, slug: p.slug, old: p.old, new: p.new, oldEquiv: equiv(p.old), newEquiv: equiv(p.new) });
    const newJson = `"title": ${JSON.stringify(p.new)}`;
    txt = txt.replace(oldJson, newJson);
  }
  out[path] = txt;
}

if (errors.length) {
  console.error('❌ 斷言失敗（未寫檔）:\n' + errors.join('\n'));
  process.exit(1);
}

// 改後複驗: 每檔可解析 + 新標題在位 + 舊標題絕跡
for (const [path, txt] of Object.entries(out)) {
  try { JSON.parse(txt); } catch (e) { console.error(`❌ ${path} JSON 解析失敗: ${e.message}`); process.exit(1); }
  for (const l of ledger) {
    if (!path.includes(l.loc)) continue;
    if (!txt.includes(`"title": ${JSON.stringify(l.new)}`)) { console.error(`❌ ${path}: 新標題缺失信據`); process.exit(1); }
    if (txt.includes(`"title": ${JSON.stringify(l.old)}`)) { console.error(`❌ ${path}: 舊標題殘留`); process.exit(1); }
  }
}

console.log('新舊對照（eq = 半角當量）:');
for (const l of ledger) console.log(`  ${l.loc.padEnd(5)} ${l.slug}: ${l.oldEquiv} → ${l.newEquiv}  ${band(l.new)}`);

if (!APPLY) {
  console.log(`\nDRY-RUN 完成: ${ledger.length} 條全過（加 --apply 生效）`);
  process.exit(0);
}

writeFileSync('.hermes/_e7-title-rollback-20260921.json', JSON.stringify({ date: '2026-09-21', batch: 'E7', ledger }, null, 1), 'utf8');
for (const [path, txt] of Object.entries(out)) {
  renameSync(path, path + '.bak-e7');
  writeFileSync(path, txt, 'utf8');
}
console.log(`\n✅ APPLY: ${ledger.length} 梞標題已改, rollback 賬本 .hermes/_e7-title-rollback-20260921.json, 備份 *.bak-e7`);
