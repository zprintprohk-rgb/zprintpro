// .hermes/logs/_fix-menus-template-moq.mjs — 修正 menus 頁「已服務的本地客戶」模板句的 MOQ
//
// K3 2026-09-20 線上實測發現：五個 menus PDP 底部該區塊均寫「50 張起印」，與真值矛盾。
//   真值：pvc/laminated/hardcover/drink = 10 ｜ disposable = 100
//   單位：pvc=張、laminated=份、hardcover=本、drink=份、disposable=份
//
// ★ 為什麼**不能**統一套用同一句：5 個 SKU 的真值與單位都不同
//   （10/份、10/本、100/份）→ 必須逐 SKU 用其 unitLabel 組句，否則會製造新矛盾。
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/products-content.ts';

/** SKU → { minQuantity, unitLabel, 期望修正後片段 } */
const PLAN = [
  { slug: 'pvc-menus', mq: 10, unit: '張' },
  { slug: 'laminated-menus', mq: 10, unit: '份' },
  { slug: 'hardcover-menus', mq: 10, unit: '本' },
  { slug: 'drink-menus', mq: 10, unit: '份' },
  { slug: 'disposable-menus', mq: 100, unit: '份' },
];

const OLD = '50 張起印，48 小時快遞';

const lines = fs.readFileSync(FILE, 'utf8').split(/\r?\n/);

// 建 SKU 區塊
const starts = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {2}'?([a-z0-9-]+)'?:\s*\{/);
  if (m) starts.push({ slug: m[1], line: i });
});
const ownerOf = (i) => {
  let o = null;
  for (const s of starts) if (s.line <= i) o = s.slug;
  return o;
};

const plans = [];
const problems = [];
for (const p of PLAN) {
  const want = `${p.mq} ${p.unit}起印，48 小時快遞`;
  const hits = [];
  lines.forEach((l, i) => {
    if (l.includes(OLD) && ownerOf(i) === p.slug) hits.push(i);
  });
  if (hits.length === 0) {
    problems.push(`[${p.slug}] 找不到「${OLD}」（可能已修）`);
    continue;
  }
  for (const i of hits) plans.push({ ...p, lineIdx: i, want });
}

console.log(`menus 模板句 MOQ 修正（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`計畫 ${plans.length} 條 ｜ 問題 ${problems.length} 條\n`);
for (const p of plans) {
  console.log(`  ✓ [${p.slug}] L${p.lineIdx + 1}: 「${OLD}」→「${p.want}」`);
}
if (problems.length) {
  console.log('\n問題:');
  for (const x of problems) console.log(`   - ${x}`);
}
if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(0);
}
if (problems.length) {
  console.error('\n🔴 有問題，整批中止（避免半套修正）');
  process.exit(1);
}

for (const p of plans) {
  lines[p.lineIdx] = lines[p.lineIdx].replace(OLD, p.want);
}

const after = lines.join('\n');
// 後斷言
const chk = after.split(/\r?\n/);
const bad = [];
const cstarts = [];
chk.forEach((l, i) => {
  const m = l.match(/^ {2}'?([a-z0-9-]+)'?:\s*\{/);
  if (m) cstarts.push({ slug: m[1], line: i });
});
const cowner = (i) => {
  let o = null;
  for (const s of cstarts) if (s.line <= i) o = s.slug;
  return o;
};
for (const p of PLAN) {
  const want = `${p.mq} ${p.unit}起印，48 小時快遞`;
  const hit = chk.some((l, i) => l.includes(want) && cowner(i) === p.slug);
  if (!hit) bad.push(`[${p.slug}] 修正後片段未找到`);
  const stale = chk.some((l, i) => l.includes(OLD) && cowner(i) === p.slug);
  if (stale) bad.push(`[${p.slug}] 仍有「${OLD}」殘留`);
}
if (bad.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const b of bad) console.error(`   - ${b}`);
  process.exit(1);
}

const backup = `${FILE}.bak-menus-template-${Date.now()}`;
fs.copyFileSync(FILE, backup);
fs.writeFileSync(FILE, after, 'utf8');
console.log(`\n✅ 已寫入 ${plans.length} 條（逐 SKU 用各自 unitLabel 組句）`);
console.log(`   備份: ${backup}`);
