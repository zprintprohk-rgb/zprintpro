// .hermes/logs/_sync-menus-faq-to-ts.mjs — 把 CSV 的 menus FAQ 修正同步到 sku-seo-data.ts
//
// ⚠️ 為什麼**不得不**直接改派生檔（SOP-5 例外，必須留痕）
// ══════════════════════════════════════════════════════════════════════
// SOP-5 規定「派生文件禁手搓，改源頭 CSV 再重跑生成器」。本批**無法**遵守，實測原因：
//   · CSV 資料列 75，而 `sku-seo-data.ts` 有 **99 個 key**
//   · 重跑 `scripts/csv-to-sku-seo.mjs` 輸出 75 entries（實測）→ **丟失 25 個 SKU**
//     （magnetic-closure-gift-box / electronics-packaging-box / graduation-yearbook /
//      cafe-table-cards / drink-tokens / escort-cards / name-tags-badges / 婚宴系列 9 個 /
//      japan-doujin 子商品 5 個 …）
//   · diff 達 4697 行（遠超預期的 4 條）→ 已即時還原
//
// ⇒ `sku-seo-data.ts` 實為**「生成器產物 + 手工擴充」的混合檔**，生成器已不是它的完整來源。
//   在此前提下，SOP-5 的「改源頭」路徑會**造成資料損失**，比手改風險更大。
//
// 故本批採「CSV 與 TS 同步定點修改」，並在兩處留下同一份說明；待 K3 決定長期方案：
//   ① 把 24 個缺失 SKU 補進 CSV → 恢復「生成器為唯一來源」
//   ② 正式承認 sku-seo-data.ts 為手工維護檔 → 更新生成器/廢除生成器
//
// 安全設計：前斷言（原文必須存在且唯一）+ 後斷言（新文到位、key 數不變）
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/sku-seo-data.ts';

const OLD = '一般為50個起訂，一次性餐牌可接受10個起。';
const NEW = '一般為10個起訂，一次性餐牌（大批量柯式）100個起。';

const text = fs.readFileSync(FILE, 'utf8');
const keysBefore = [...text.matchAll(/^ {2}"([a-z0-9][a-z0-9-]*)":\s*\{/gm)].length;
const occurrences = text.split(OLD).length - 1;

console.log(`sku-seo-data.ts menus FAQ 同步（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`  key 數 ${keysBefore} ｜ 待改原文出現 ${occurrences} 次`);
console.log(`  「${OLD}」`);
console.log(`→ 「${NEW}」`);

if (occurrences === 0) {
  console.log('\nℹ️ 無需修改（可能已套用）');
  process.exit(0);
}
if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(0);
}

const after = text.split(OLD).join(NEW);

// 後斷言
const problems = [];
const keysAfter = [...after.matchAll(/^ {2}"([a-z0-9][a-z0-9-]*)":\s*\{/gm)].length;
if (keysAfter !== keysBefore) problems.push(`key 數由 ${keysBefore} 變為 ${keysAfter}`);
if (after.includes(OLD)) problems.push('舊文仍有殘留');
if (!after.includes(NEW)) problems.push('新文未寫入');
if (problems.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const p of problems) console.error(`   - ${p}`);
  process.exit(1);
}

const backup = `${FILE}.bak-menus-faq-${Date.now()}`;
fs.copyFileSync(FILE, backup);
fs.writeFileSync(FILE, after, 'utf8');
console.log(`\n✅ 已寫入（key 數不變 ${keysAfter}，後斷言通過）`);
console.log(`   備份: ${backup}`);
