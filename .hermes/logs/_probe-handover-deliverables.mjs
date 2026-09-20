// .hermes/logs/_probe-handover-deliverables.mjs — 交接交付物探針（三層驗證）
//
// 三層：
//   ① 檔案存在性（本次交付的每份文件/腳本）
//   ② 門禁與斷言（本機可執行驗證）
//   ③ 線上狀態（雙 marker 判部署延遲 vs 修復失敗）
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const FILES = [
  // 技能與交接
  ['docs/skills/multi-layer-moq-consistency-audit.md', '技能沉澱（避坑+能力）'],
  ['docs/2026-09-20-handover-live-doc-moq-consistency.md', '交接活書'],
  // 報告
  ['docs/2026-09-19-moq-consistency-gate-and-scene-ssot-report.md', '主報告'],
  ['docs/2026-09-19-moq-scanner-coverage-retraction.md', '撤回「0 漂移」'],
  ['docs/2026-09-20-sku-seo-data-regen-hazard-and-sop5-exception.md', '重生成事故 + SOP-5 例外'],
  ['docs/2026-09-20-business-cards-inventory.md', 'business-cards 對照清單'],
  ['docs/2026-09-20-business-cards-key-reference-audit.md', 'business-cards 引用面審計'],
  ['docs/2026-09-19-duplicate-datasource-audit.md', '重複資料源盤點'],
  // 腳本
  ['scripts/moq10-books-context-scan.ts', '門童 #24 掃描器'],
  ['scripts/moq25-anchor-scan.ts', 'Anchor 掃描器（#25 候選）'],
  ['scripts/assert-sku-seo-keys.mjs', 'key 集合斷言'],
  ['scripts/gen-guard-manifest.mjs', '門童編號防撞'],
  ['scripts/guards/guard-manifest.json', '門童清單'],
  // 掃描產物
  ['.hermes/logs/moq-scan-latest.json', 'moq10 明細'],
  ['.hermes/logs/moq-anchor-scan-latest.json', 'anchor 明細'],
  ['.hermes/logs/moq-scanner-intersection.json', '交集結果'],
  ['.hermes/logs/moq-anchor-triage.json', '三分類結果'],
  ['.hermes/logs/sku-seo-keys-snapshot.json', 'key 集合快照'],
];

let ok = 0;
let missing = 0;
console.log('════════ ① 檔案存在性 ════════\n');
for (const [f, desc] of FILES) {
  const exists = fs.existsSync(f);
  if (exists) ok++;
  else missing++;
  const size = exists ? `${(fs.statSync(f).size / 1024).toFixed(1)}KB` : '—';
  console.log(`  ${exists ? '✅' : '🔴'} ${f.padEnd(62)} ${size.padStart(8)}  ${desc}`);
}
console.log(`\n  存在 ${ok} / 缺失 ${missing}\n`);

console.log('════════ ② 門禁與斷言（本機執行）════════\n');
const CMDS = [
  ['npx tsc --noEmit', 54, 'tsc 錯誤數（基線 54）'],
  ['npx tsx scripts/moq10-books-context-scan.ts --gate', 0, '門童 #24'],
  ['node scripts/gen-guard-manifest.mjs', 0, '門童編號衝突檢查'],
  ['node scripts/assert-sku-seo-keys.mjs', 0, 'key 集合斷言'],
];
let gateOk = 0;
for (const [cmd, expect, desc] of CMDS) {
  let exit = 0;
  let out = '';
  try {
    out = execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024 });
  } catch (e) {
    exit = e.status ?? 1;
    out = String(e.stdout || '') + String(e.stderr || '');
  }
  // 對 tsc 特判：以錯誤行數為準
  let actual;
  if (cmd.includes('tsc')) actual = (out.match(/error TS/g) || []).length;
  else actual = exit;
  const pass = actual === expect;
  if (pass) gateOk++;
  console.log(`  ${pass ? '✅' : '🔴'} ${desc.padEnd(18)} 期望 ${expect} ｜ 實際 ${actual}`);
}
console.log(`\n  通過 ${gateOk} / ${CMDS.length}\n`);

console.log('════════ ③ 線上狀態（雙 marker）════════\n');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const CHECKS = [
  { name: 'marker A · art-posters（早前改動）', url: 'https://zprintpro.com/zh-hk/product/art-posters/', want: ['1張起印', '1 張起印'], stale: ['100張起印'] },
  { name: 'marker B · pvc-menus 模板句（本輪）', url: 'https://zprintpro.com/zh-hk/product/pvc-menus/', want: ['10 張起印，48 小時快遞'], stale: ['50 張起印，48 小時快遞'] },
  { name: 'menus 首屏 · disposable-menus', url: 'https://zprintpro.com/zh-hk/product/disposable-menus/', want: ['100張起印', '100 張起印'], stale: [] },
  { name: '貼紙品類頁', url: 'https://zprintpro.com/zh-hk/category/stickers/', want: ['10 個起'], stale: ['50 個起印'] },
];
let liveOk = 0;
let liveStale = 0;
let liveInvalid = 0;
for (const c of CHECKS) {
  let r;
  try {
    r = await fetch(c.url, { headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZP-probe/1.0)' } });
  } catch (e) {
    console.log(`  🔴 ${c.name}: fetch 失敗 ${e.message}`);
    liveInvalid++;
    continue;
  }
  const html = await r.text();
  const valid = r.status === 200 && html.length > 20000;
  if (!valid) {
    console.log(`  🔴 ${c.name}: INVALID（HTTP ${r.status} / ${html.length}B）`);
    liveInvalid++;
    await sleep(600);
    continue;
  }
  const hasWant = c.want.some((w) => html.includes(w));
  const hasStale = c.stale.some((s) => html.includes(s));
  if (hasStale) {
    console.log(`  🔴 ${c.name}: 仍見舊值`);
    liveStale++;
  } else if (hasWant) {
    console.log(`  ✅ ${c.name}: 已生效`);
    liveOk++;
  } else {
    console.log(`  ⚠️ ${c.name}: 未見預期值（可能部署未完成）`);
  }
  await sleep(600);
}
console.log(`\n  已生效 ${liveOk} ｜ 仍見舊值 ${liveStale} ｜ INVALID ${liveInvalid} ｜ 共 ${CHECKS.length}`);
if (liveStale === 0 && liveInvalid === 0 && liveOk === CHECKS.length) {
  console.log('  ✅ 線上全部通過');
} else if (liveStale) {
  console.log('  → 仍見舊值：先確認 CF Pages build（勿直接判失敗，§0.23.2）');
}

console.log('\n════════ ④ git 狀態 ════════');
try {
  const head = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
  const origin = execSync('git rev-parse --short origin/main', { encoding: 'utf8' }).trim();
  const unpushed = execSync('git rev-list --count origin/main..HEAD', { encoding: 'utf8' }).trim();
  console.log(`  HEAD ${head} ｜ origin/main ${origin} ｜ unpushed ${unpushed}`);
} catch (e) {
  console.log(`  ⚠️ git 查詢失敗: ${e.message}`);
}
