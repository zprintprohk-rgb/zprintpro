// moq10-fix-category-hooks.mjs
// 2026-09-19 — 全網站起訂量修正 (紙品 100 → 10) 第 5 步
//
// 職責: 修正品類頁場景卡硬編碼的起印量文案。
//   範圍僅限「本次降為 10 的品類」: stickers / flyers。
//   不動: paper-bags (100 起, 不在本批) / red-packets / japan-doujin 紅包等。
//
// ★ 逐行精準替換, 不做全域 replace。
// ★ 注意 japan-doujin 場景卡寫 '100 張起 · 快速打樣' —— 該 SKU (doujinshi-printing)
//   minQuantity 本已是 10, 屬基線既存不一致, 不在本批範圍, 故不動 (零 churn)。

import fs from 'fs';
import path from 'path';

const FILES = [
  'src/components/category/CategorySharpHooks.tsx',
  'src/components/category/CategoryIndustries.tsx',
];

/** 行內精準替換對 (old → new), 只套用於含指定品類關鍵字的行 */
const LINE_RULES = [
  { match: /'zh-hk':.*FDA 食品級標籤/, from: '100 張起印 · 即日打樣', to: '10 張起印 · 即日打樣' },
  { match: /ja:.*FDA 食品グレードラベル/, from: '100枚から・即日サンプル', to: '10枚から・即日サンプル' },
  { match: /'zh-hk':.*A4\/A5 單張/, from: 'A4/A5 單張 · 100 張起印', to: 'A4/A5 單張 · 10 張起印' },
  { match: /en:.*Digital print \+ offset/, from: '100 MOQ · no plate fee', to: '10 MOQ · no plate fee' },
  { match: /ja:.*A4\/A5 チラシ/, from: 'A4/A5 チラシ · 100枚から', to: 'A4/A5 チラシ · 10枚から' },
];

const report = [];
for (const rel of FILES) {
  const abs = path.join(process.cwd(), rel);
  if (!fs.existsSync(abs)) { report.push(`${rel}: 檔案不存在, 略過`); continue; }
  const lines = fs.readFileSync(abs, 'utf-8').split('\n');
  let n = 0;
  for (let i = 0; i < lines.length; i++) {
    for (const r of LINE_RULES) {
      if (!r.match.test(lines[i])) continue;
      if (!lines[i].includes(r.from)) continue;
      lines[i] = lines[i].split(r.from).join(r.to);
      n++;
      report.push(`${path.basename(rel)}:${i + 1}: 「${r.from}」→「${r.to}」`);
    }
  }
  fs.writeFileSync(abs, lines.join('\n'), 'utf-8');
  if (!n) report.push(`${path.basename(rel)}: 0 處 (已冪等或無命中)`);
}

console.log('=== 品類頁場景卡起印量修正 ===');
for (const r of report) console.log('  ' + r);
