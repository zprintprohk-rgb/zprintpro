// .hermes/logs/_fix-csv-menus-faq.mjs — 改 CSV 的 menus FAQ 答案（SOP-5：改源頭）
//
// 背景：CSV [21] FAQ答案1(ZH) = 「一般為50個起訂，一次性餐牌可接受10個起。」
//   menus 簇真值已改 10（K3 市場基準），故此欄應對齊。
//   注意：此句同時提到「一次性餐牌可接受10個起」——一次性餐牌真值為 100，
//   故「10 個起」在此係指**少量急件**（與 sku-seo-data 的 ja 文案
//   「少量の急ぎは10枚から」同義）。改時須保留此語義，不可一律替換。
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const CSV = 'zprintpro-sku-seo-data.csv';

const OLD = '一般為50個起訂，一次性餐牌可接受10個起。';
const NEW = '一般為10個起訂，一次性餐牌（大批量柯式）100個起。';

const raw = fs.readFileSync(CSV, 'utf8');
const lines = raw.split(/\r?\n/);
const MENUS = ['pvc-menus', 'laminated-menus', 'hardcover-menus', 'drink-menus'];

const plans = [];
lines.forEach((l, i) => {
  if (!l.trim()) return;
  const cols = l.split('\t');
  const slug = cols[3];
  if (!MENUS.includes(slug)) return;
  // [21] = FAQ答案1(ZH)
  if ((cols[21] ?? '').includes(OLD)) {
    plans.push({ lineIdx: i, slug, before: cols[21] });
  }
});

console.log(`CSV menus FAQ 修正（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`計畫 ${plans.length} 條\n`);
for (const p of plans) {
  console.log(`  L${p.lineIdx + 1} [${p.slug}]`);
  console.log(`     ${OLD}`);
  console.log(`  →  ${NEW}`);
}

if (!plans.length) {
  console.log('\nℹ️ 無需修改（可能已套用過）');
  process.exit(0);
}
if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(0);
}

for (const p of plans) {
  const cols = lines[p.lineIdx].split('\t');
  cols[21] = cols[21].replace(OLD, NEW);
  lines[p.lineIdx] = cols.join('\t');
}
const after = lines.join('\n');
// 後斷言
function assertCsv(text) {
  const ls = text.split(/\r?\n/);
  let ok = 0;
  const bad = [];
  for (const slug of MENUS) {
    const l = ls.find((x) => x.split('\t')[3] === slug);
    if (!l) {
      bad.push(`${slug} 找不到`);
      continue;
    }
    const c = l.split('\t');
    if (c.length !== 31) bad.push(`${slug} 欄數 ${c.length} ≠ 31（TAB 分隔被破壞）`);
    if (!c[21].includes('10個起訂')) bad.push(`${slug} [21] 未更新`);
    ok++;
  }
  return { ok, bad };
}
const chk = assertCsv(after);
if (chk.bad.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const b of chk.bad) console.error(`   - ${b}`);
  process.exit(1);
}

const backup = `${CSV}.bak-menus-faq-${Date.now()}`;
fs.copyFileSync(CSV, backup);
fs.writeFileSync(CSV, after, 'utf8');
console.log(`\n✅ 已寫入 ${plans.length} 條（欄數/內容後斷言通過）`);
console.log(`   備份: ${backup}`);
