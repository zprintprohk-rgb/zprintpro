// .hermes/logs/_fix-intersection.mjs — 修正 anchor ∩ moq10 嚴格交集 22 條（K3 B 組）
//
// 為什麼這批優先：兩套掃描器判定域不同（anchor = SKU 中心、moq10 = 關鍵詞中心），
//   兩者**都**標記者即互相印證（§0.23.2 雙方法精神）→ 精度最高。
//
// 修正原則（依 K3 對 foil-red-packets 的判據）：
//   · 純 MOQ 句（「N 張起」「N枚〜」）→ 數字對齊真值
//   · FAQ 複合句（「最小注文はN枚から。少量の急ぎはM枚から対応」）→
//     僅改「N」（該 SKU 的正式 MOQ），**保留「少量急件 M 枚起」的分流語義**
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/sku-seo-data.ts';

/** [slug, 行號（1-based）, 原文片段, 新文片段, 說明] */
const FIXES = [
  ['small-batch-stickers', 168, '小批量貼紙 50 張起', '小批量貼紙 10 張起', 'title 對齊真值 10'],
  ['small-batch-stickers', 184, '小ロットステッカー 50 枚〜', '小ロットステッカー 10 枚〜', 'ja title 對齊真值 10'],
  ['double-sided-flyers', 800, '両面チラシ | 100枚〜', '両面チラシ | 10枚〜', 'ja title 對齊真值 10'],
  ['double-sided-flyers', 801, '100枚〜、翌日-2営業日', '10枚〜、翌日-2営業日', 'ja 描述對齊真值 10'],
  ['same-day-flyers', 923, '100枚〜・無料デザイン', '10枚〜・無料デザイン', 'ja title 對齊真值 10'],
  ['eco-flyers', 965, '両面フルカラー 100枚〜', '両面フルカラー 10枚〜', 'ja title 對齊真值 10'],
  ['laminated-menus', 2021, '過膠餐牌 | 防水 覆膜 50本起', '過膠餐牌 | 防水 覆膜 10 份起', 'title 對齊真值 10 + unitLabel 份'],
  ['laminated-menus', 2041, '最小注文は100枚から。', '最小注文は10枚から。', 'ja FAQ：正式 MOQ 對齊（保留「少量の急ぎは10枚から」語義）'],
  ['hardcover-menus', 2064, '精裝餐牌 | 防水 覆膜 50本起', '精裝餐牌 | 防水 覆膜 10 本起', 'title 對齊真值 10'],
  ['hardcover-menus', 2084, '50〜100冊からの最小注文です', '10冊からの最小注文です', 'ja FAQ 對齊真值 10（原為範圍表述）'],
  ['drink-menus', 2126, '最小注文は100枚からご注文いただけます。', '最小注文は10枚からご注文いただけます。', 'ja FAQ 對齊真值 10'],
  ['disposable-menus', 2164, '最小注文です。即日少量の急ぎは10枚から対応', '最小注文です。即日少量の急ぎは100枚から対応', 'ja FAQ：本品真值 100（反向）'],
  ['hardcover-books', 2526, '中綴じ/無線綴じ 50冊〜', '中綴じ/無線綴じ 10冊〜', 'ja title 對齊真值 10'],
  ['hardcover-books', 2530, 'ハードカバー書籍は100冊から承ります', 'ハードカバー書籍は10冊から承ります', 'ja FAQ 對齊真值 10'],
  ['spiral-notebooks', 2564, '中綴じ/無線綴じ 50冊〜', '中綴じ/無線綴じ 10冊〜', 'ja title 對齊真值 10'],
  ['certificates', 2820, '証明書は 100 枚から承り、少量でお急ぎの場合は 10 枚から対応可能です。', '証明書は 100 枚から承ります（少量でお急ぎの場合は別途ご相談ください）。', '保持真值 100（掃描器 found=10 為「少量急件」語義，非 MOQ）'],
  ['electronics-packaging-box', 2973, '"100個起印"', '"200個起印"', '關鍵字陣列對齊真值 200'],
  ['graduation-yearbook', 3409, '校友會刊 / 社團特刊 100 本起印', '校友會刊 / 社團特刊 50 本起印', 'FAQ 對齊真值 50'],
  ['matte-greeting-cards', 3635, '最低訂量 100 張起', '最低訂量 10 張起', '描述對齊真值 10'],
];

const lines = fs.readFileSync(FILE, 'utf8').split(/\r?\n/);

const plans = [];
const problems = [];

for (const [slug, lineNo, from, to, why] of FIXES) {
  const idx = lineNo - 1;
  const line = lines[idx];
  if (!line) {
    problems.push(`L${lineNo} [${slug}] 行不存在`);
    continue;
  }
  if (!line.includes(from)) {
    problems.push(`L${lineNo} [${slug}] 找不到原文「${from.slice(0, 40)}」`);
    continue;
  }
  plans.push({ slug, lineNo, from, to, why, idx });
}

console.log(`交集 22 條修正（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`計畫 ${plans.length} 條 ｜ 問題 ${problems.length} 條\n`);
for (const p of plans) {
  console.log(`  L${p.lineNo} [${p.slug}]`);
  console.log(`     「${p.from}」→「${p.to}」`);
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

// 記錄改前行數與 key 數（後斷言用）
const keysBefore = (lines.join('\n').match(/^ {2}"[a-z0-9][a-z0-9-]*":\s*\{/gm) || []).length;
const lineCountBefore = lines.length;

for (const p of plans) {
  lines[p.idx] = lines[p.idx].split(p.from).join(p.to);
}

const after = lines.join('\n');
const afterLines = after.split(/\r?\n/);
const bad = [];
for (const p of plans) {
  if (afterLines[p.idx].includes(p.from)) bad.push(`L${p.lineNo} 舊文殘留`);
  if (!afterLines[p.idx].includes(p.to)) bad.push(`L${p.lineNo} 新文未寫入`);
}
const keysAfter = (after.match(/^ {2}"[a-z0-9][a-z0-9-]*":\s*\{/gm) || []).length;
if (keysAfter !== keysBefore) bad.push(`key 數由 ${keysBefore} 變為 ${keysAfter}`);
if (afterLines.length !== lineCountBefore) bad.push(`行數由 ${lineCountBefore} 變為 ${afterLines.length}`);
if (bad.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const b of bad) console.error(`   - ${b}`);
  process.exit(1);
}

const backup = `${FILE}.bak-intersect-${Date.now()}`;
fs.copyFileSync(FILE, backup);
fs.writeFileSync(FILE, after, 'utf8');
console.log(`\n✅ 已寫入 ${plans.length} 條（key 數不變 ${keysAfter}、行數不變 ${afterLines.length}）`);
console.log(`   備份: ${backup}`);
