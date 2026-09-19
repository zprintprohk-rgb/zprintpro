// moq10-fix-saddle-blog.mjs
// 2026-09-19 — 第三波配套: 騎馬釘小冊子博客三語 MOQ 口徑 100 → 10
//
// 為何必須改: 門童 #19 已於本波改為**動態讀 products.ts minQuantity**,
//   書刊 minQuantity = 10 後, 門童即要求三篇文章寫「10 本起」並禁「100 本起」⇒ 9 紅。
//   門童報的正是真矛盾 (產品頁 10 本起 vs 博客 100 本起)。
//
// ★ 逐句精準替換, **不動價目範例數字**:
//     「100 本起印」→「10 本起印」           (MOQ 口徑)
//     「100 本約 HK$3.8-4.2/本」→ 保留        (價目檔位)
//     「at 100 copies」/「100 冊約 ¥540」→ 保留 (價目檔位)
//
// ★ JSON 安全: JSON.parse → 字串替換 → JSON.stringify (門童 #15)

import fs from 'fs';
import path from 'path';

const DIR = path.join(process.cwd(), 'src', 'data', 'blog-data');
const SLUG = 'saddle-stitch-booklet-printing-guide';

/** 逐字串替換對 (old → new); 只列 MOQ 口徑, 不含價目檔位 */
const EDITS = {
  'zh-hk': [
    ['騎馬釘小冊子印刷 100 本起，8-64 頁', '騎馬釘小冊子印刷 10 本起，8-64 頁'],
    ['小冊子 100 本起印，8-64 頁', '小冊子 10 本起印，8-64 頁'],
    ['無開版費、100 本起印。', '無開版費、10 本起印。'],
    ['騎馬釘小冊子 100 本起印，8-64 頁、4 的倍數，100 本起印，', '騎馬釘小冊子 10 本起印，8-64 頁、4 的倍數，10 本起印，'],
    // 2026-09-19: 原文此句有重複字樣「10 本起印…100 本起印」，上列替換後仍剩後半，另補一條
    ['4 的倍數，100 本起印，補習社試刊', '4 的倍數，10 本起印，補習社試刊'],
    ['4+4 彩色印刷、100 本起印的市場參考價：', '4+4 彩色印刷、市場參考價：'],
    ['【騎馬釘小冊子 100 本起印、8-64 頁', '【騎馬釘小冊子 10 本起印、8-64 頁'],
    ['真低 MOQ 100 本起，', '真低 MOQ 10 本起，'],
    ['A：100 本起印，無開版費、100 本起印；', 'A：10 本起印，無開版費；'],
    ['成本最平、100 本起印；', '成本最平、10 本起印；'],
    ['專業騎馬釘小冊子印刷 100 本起，', '專業騎馬釘小冊子印刷 10 本起，'],
  ],
  en: [
    ['Saddle stitch booklets from 100 copies,', 'Saddle stitch booklets from 10 copies,'],
    ['print from <strong>100 copies</strong>,', 'print from <strong>10 copies</strong>,'],
    ['no plate fees, no minimums.', 'no plate fees, from 10 copies.'],
    ['start at 100 copies, 8-64 pages in multiples of 4, with no plate fees and no minimum on digital runs.', 'start at 10 copies, 8-64 pages in multiples of 4, with no plate fees and no minimum on digital runs.'],
    ['100-copy MOQ, 8-64 pages, US$1.84-7.36/book', '10-copy MOQ, 8-64 pages, US$1.84-7.36/book'],
    ['We start at 100 copies, with the same cost per unit at higher volumes.', 'We start at 10 copies, with the same cost per unit at higher volumes.'],
    ["that's where our 100-copy MOQ pays off.", "that's where our 10-copy MOQ pays off."],
    ['A：100 copies, with no plate fees', 'A：10 copies, with no plate fees'],
    ['— 100-copy MOQ, 8-64 pages', '— 10-copy MOQ, 8-64 pages'],
  ],
  ja: [
    ['低 MOQ | 100冊から対応', '低 MOQ | 10冊から対応'],
    ['中綴じ冊子印刷 100 冊から、8-64 ページ', '中綴じ冊子印刷 10 冊から、8-64 ページ'],
    ['中綴じ冊子印刷は 100 冊から対応、8-64 ページ', '中綴じ冊子印刷は 10 冊から対応、8-64 ページ'],
    ['中綴じ冊子は 100 冊から、8-64 ページ・4 の倍数', '中綴じ冊子は 10 冊から、8-64 ページ・4 の倍数'],
    ['両面フルカラー、100 冊から対応の市場参考価格：', '両面フルカラー、市場参考価格：'],
    ['【中綴じ冊子 100 冊から、8-64 ページ', '【中綴じ冊子 10 冊から、8-64 ページ'],
    ['真の低 MOQ 100 冊から対応で', '真の低 MOQ 10 冊から対応で'],
    ['A：100 冊から対応、版代不要', 'A：10 冊から対応、版代不要'],
    ['コスト最安、100 冊から対応。', 'コスト最安、10 冊から対応。'],
    ['中綴じ冊子印刷 100 冊から対応で、', '中綴じ冊子印刷 10 冊から対応で、'],
  ],
};

const report = [];
for (const loc of ['zh-hk', 'en', 'ja']) {
  const file = path.join(DIR, `${loc}.json`);
  const json = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const e = json[SLUG];
  if (!e) { report.push(`${loc}: 找不到 ${SLUG}`); continue; }
  let n = 0;
  for (const [field, val] of Object.entries(e)) {
    if (typeof val !== 'string') continue;
    let next = val;
    for (const [from, to] of EDITS[loc]) {
      if (next.includes(from)) { next = next.split(from).join(to); n++; }
    }
    if (next !== val) e[field] = next;
  }
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  report.push(`${loc}: ${n} 處已修正`);
}

console.log('=== 騎馬釘小冊子 MOQ 口徑 100 → 10 ===');
for (const r of report) console.log('  ' + r);
