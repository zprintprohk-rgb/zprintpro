// .hermes/logs/_verify-regen-safety.mjs — 驗證「重跑生成器是否安全」（SOP-5 前置檢查）
//
// 事故（2026-09-20 實測）：改 CSV 後重跑 `scripts/csv-to-sku-seo.mjs`，
//   生成器輸出 75 entries，而 `sku-seo-data.ts` 原有 **99 個 key**
//   → 直接覆蓋會**丟失 24 個 SKU**，且 diff 達 4697 行（遠超預期的 4 條）。
//   已從備份還原。
//
// 本腳本把此檢查固化：**任何重跑生成器之前，先確認 CSV 列數 vs 目標檔 key 數**。
import fs from 'node:fs';

const CSV = 'zprintpro-sku-seo-data.csv';
const TARGET = 'src/data/sku-seo-data.ts';

const csvLines = fs.readFileSync(CSV, 'utf8').split(/\r?\n/).filter((l) => l.trim());
const csvRows = csvLines.length - 1; // 去表頭
const csvSlugs = csvLines.slice(1).map((l) => l.split('\t')[3]).filter(Boolean);

const target = fs.readFileSync(TARGET, 'utf8');
const targetKeys = [...target.matchAll(/^ {2}"([a-z0-9][a-z0-9-]*)":\s*\{/gm)].map((m) => m[1]);

console.log('=== 重跑生成器安全性檢查 ===');
console.log(`  CSV 資料列: ${csvRows} ｜ 目標檔 key: ${targetKeys.length}`);

const csvSet = new Set(csvSlugs);
const keySet = new Set(targetKeys);
const onlyTarget = [...keySet].filter((k) => !csvSet.has(k));
const onlyCsv = [...csvSet].filter((k) => !keySet.has(k));

console.log(`  僅目標檔有（重生成會**丟失**）: ${onlyTarget.length} 個`);
if (onlyTarget.length) {
  console.log(`     ${onlyTarget.slice(0, 20).join(', ')}${onlyTarget.length > 20 ? ' …' : ''}`);
}
console.log(`  僅 CSV 有（重生成會**新增**）: ${onlyCsv.length} 個`);
if (onlyCsv.length) console.log(`     ${onlyCsv.slice(0, 20).join(', ')}`);

if (onlyTarget.length || onlyCsv.length) {
  console.log('\n🔴 **不安全** — 重跑生成器會改變 SKU 集合（非單純更新文案）。');
  console.log('   處置選項：');
  console.log('   ① 把缺失的 SKU 補進 CSV（回源頭），再重生成');
  console.log('   ② 只針對需要的欄位做**定點修改**（放棄「改 CSV 重生成」路徑）');
  console.log('   ③ 若確認目標檔為**手工擴充**（生成器未涵蓋），應更新生成器而非手改目標檔');
  process.exit(1);
}
console.log('\n✅ 安全 — SKU 集合一致，重跑生成器只會更新內容。');
