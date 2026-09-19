// moq10-books-minquantity-10.mjs
// 2026-09-19 — K3 拍板第三波「書刊 minQuantity 100 → 10」
//
// 職責: 書刊本冊 SKU 的 minQuantity 由 100 改為 10, 並在 variables.quantities 首檔插入 10。
//
// 背景 (K3 2026-09-19 拍板):
//   「你已經拍板書刊 10 本起…除非 push 時書刊仍是 100 本起, 等於一個完整 push 中有一個品類的 MOQ 沒有落地」
//   ⇒ 先完成書刊產品資料層, 再合併 push。
//
// 前置已就緒 (前一輪):
//   · 價階: books.json 已有 10/25/50/75/99 modeled 檔 (10→179 … 99→922 ≤ anchor 941)
//   · 門童 #19 已改為動態讀 products.ts minQuantity, 故改產品資料後會自動跟隨
//
// ★ 冪等: 已是 10 者跳過。
// ★ 只動書刊本冊 6 個 SKU。

import fs from 'fs';
import path from 'path';

const FILE = path.join(process.cwd(), 'src', 'data', 'products.ts');

/** 書刊本冊 SKU (與 print-method-policy.ts 的 DIGITAL_LINE_BOOK_SLUGS 同源) */
const BOOK_SLUGS = [
  'catalog-printing',
  'perfect-bound-books',
  'hardcover-books',
  'spiral-notebooks',
  'saddle-stitch-booklets',
  'exercise-books',
];
const NEW_MOQ = 10;
const SMALL_BATCH_DISCOUNT = 2.35;   // 與紙品線小批量檔同源

const lines = fs.readFileSync(FILE, 'utf-8').split('\n');
const anchors = [];
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^ {4}slug: '([^']+)'/);
  if (m) anchors.push({ slug: m[1], line: i });
}

const report = [];

// 由後往前改, 避免行號位移
for (let a = anchors.length - 1; a >= 0; a--) {
  const { slug, line } = anchors[a];
  if (!BOOK_SLUGS.includes(slug)) continue;
  const end = a + 1 < anchors.length ? anchors[a + 1].line : lines.length;

  // 1) minQuantity
  let mqDone = false;
  for (let i = line; i < end; i++) {
    const m = lines[i].match(/^(\s+minQuantity:\s*)(\d+)(,.*)$/);
    if (!m) continue;
    if (Number(m[2]) === NEW_MOQ) { report.push(`${slug}: minQuantity 已是 ${NEW_MOQ} (冪等)`); mqDone = true; break; }
    report.push(`${slug}: minQuantity ${m[2]} → ${NEW_MOQ}`);
    lines[i] = `${m[1]}${NEW_MOQ}${m[3]}`;
    mqDone = true;
    break;
  }
  if (!mqDone) report.push(`${slug}: ⚠ 找不到 minQuantity`);

  // 2) quantities 首檔插入 10
  let qStart = -1;
  for (let i = line; i < end; i++) if (/^\s+quantities:\s*\[/.test(lines[i])) { qStart = i; break; }
  if (qStart < 0) {
    /*
     * 無 quantities 區塊 → 需補。
     * ⚠ 是否必要取決於渲染路徑 (2026-09-19 實測):
     *   · 有 price table (saddle-stitch / perfect-bound / exercise-books) → PDP 由
     *     ReferencePriceBlock 渲染, quantities 係死資料 ⇒ 可略過
     *   · 無 price table (catalog-printing / hardcover-books / spiral-notebooks) → PDP 走
     *     QuoteCalculator, 佢讀 `product.variables.quantities[0].value` 做預設數量
     *     ⇒ 必須有 10 檔, 否則預設仍係舊值, 與 minQuantity=10 不一致
     * 故此處一律補上 (新建 variables.quantities), 插在 seoTitle 之前對齊同線欄位順序。
     */
    let insertAt = -1;
    for (let i = line; i < end; i++) {
      if (/^ {4}seoTitle:/.test(lines[i])) { insertAt = i; break; }
    }
    if (insertAt < 0) {
      // 退而求其次: 插在 features 區塊之後
      for (let i = line; i < end; i++) {
        if (/^ {4}features:\s*\[/.test(lines[i])) {
          for (let k = i; k < end; k++) if (/^ {4}\],?\s*$/.test(lines[k])) { insertAt = k + 1; break; }
          break;
        }
      }
    }
    if (insertAt < 0) { report.push(`${slug}: ⚠ 無 quantities 且找不到插入點, 未補 10 檔`); continue; }
    const i6 = '      ', i4 = '    ';
    lines.splice(insertAt, 0,
      `${i4}variables: {`,
      `${i6}quantities: [`,
      `${i6}  { value: 10, label: '10', discount: ${SMALL_BATCH_DISCOUNT} },`,
      `${i6}  { value: 100, label: '100本', discount: 1 },`,
      `${i6}  { value: 500, label: '500本', discount: 0.85 },`,
      `${i6}  { value: 1000, label: '1000本', discount: 0.75 },`,
      `${i6}],`,
      `${i4}},`,
    );
    report.push(`${slug}: 新建 variables.quantities (10/100/500/1000)`);
    continue;
  }
  let qEnd = -1;
  for (let i = qStart; i < end; i++) if (/^\s+\],?\s*$/.test(lines[i])) { qEnd = i; break; }
  if (qEnd < 0) { report.push(`${slug}: ⚠ quantities 未閉合`); continue; }

  const block = lines.slice(qStart, qEnd + 1).join('\n');
  if (/value:\s*10\s*,/.test(block)) { report.push(`${slug}: quantities 已有 10 檔 (冪等)`); continue; }
  const firstEntry = lines.slice(qStart + 1, qEnd).find((l) => /value:/.test(l));
  const indent = firstEntry ? firstEntry.match(/^(\s*)/)[1] : '        ';
  lines.splice(qStart + 1, 0, `${indent}{ value: 10, label: '10', discount: ${SMALL_BATCH_DISCOUNT} },`);
  report.push(`${slug}: quantities 首檔插入 10`);
}

fs.writeFileSync(FILE, lines.join('\n'), 'utf-8');
console.log('=== 書刊 minQuantity → 10 ===');
for (const r of report) console.log('  ' + r);
