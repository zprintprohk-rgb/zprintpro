// moq10-price-sync-report.mjs
// 2026-09-19 — 價目同步波「第一步: 全量分類報告」(K3 規劃)
//
// 對 src/ 內所有含「起印量」字樣的字串做全量分類, 產出:
//   · 總量與分類分布 (moq_display / price_tier / industry_fact / other)
//   · 按檔案分組統計
//   · 每處的「品類歸屬」(由同行 + 同區塊上下文判斷)
//   · **行動清單**: 本批品類的 moq_display (需改) vs 非本批 (保留) vs price_tier (改格式不改數字)
//
// ★ 分類器直接引用 print-method-policy.ts 的 classifyMoqString (同一 SSoT),
//   不在本腳本重寫一份 regex —— 否則驗證的是「報告腳本以為什麼」, 不是實作行為。
// ★ 品類判斷用「同行 + 鄰近 3 行」滑窗, 因為模板句的品類詞在句首而數字在句中。

import fs from 'fs';
import path from 'path';
import { classifyMoqString } from '../src/data/print-method-policy';

const ROOT = process.cwd();
const OUT_MD = path.join(ROOT, '.hermes', 'logs', 'moq-price-sync-classification.md');

/** 掃描範圍: 只含「文字資料」層; 排除腳本 / 生成檔 / UI 元件 (UI 已於前波處理) */
const SCAN_DIRS = ['src/data', 'src/lib', 'src/app'];
const EXCLUDE = [
  /\.bak/, /price-data\.generated\.ts$/, /\.test\./, /__tests__/,
  /src\/lib\/price-tables\.ts$/, /src\/lib\/price-injector/, /src\/lib\/quote-engine/,
];

/** 起印量字樣 */
const MOQ_PAT = /(\d[\d,]*\s*張起印|\d[\d,]*\s*張起(?!印)|\d[\d,]*\s*個起印|\d[\d,]*\s*本起印|\d[\d,]*\s*套起印|\d[\d,]*\s*枚起印|MOQ\s*\d[\d,]*|\d[\d,]*\s*MOQ|\d[\d,]*\s*pcs?\s*MOQ|\d[\d,]*[- ]copy\s*MOQ|\d[\d,]*\s*枚から|\d[\d,]*\s*部から|\d[\d,]*\s*冊から|起印量|最低起印|最低訂購)/gi;

/** 品類判斷表: 本批 (已降至 10/1) vs 非本批 (維持 100+) */
const CATEGORIES = [
  { test: /傳單|單張|摺頁|折頁|flyer|leaflet/i, label: '傳單', inBatch: true, target: '10 張' },
  { test: /貼紙|標籤|sticker|label|シール|ステッカー/i, label: '貼紙/標籤', inBatch: true, target: '10 張' },
  { test: /賀卡|卡片|感謝卡|greeting/i, label: '賀卡', inBatch: true, target: '10 張' },
  { test: /海報|poster|ポスター/i, label: '海報', inBatch: true, target: '1 張' },
  { test: /畫冊|書刊|本冊|冊子|騎馬釘|膠裝|精裝|同人|紀念冊|catalog|booklet|perfect[- ]bound|hardcover/i, label: '書刊/畫冊', inBatch: true, target: '10 本' },
  { test: /紙袋|手挽袋|牛皮袋|bag/i, label: '紙袋', inBatch: false, target: null },
  { test: /包裝盒|彩盒|禮盒|紙盒|摺盒|盒型|mailer|card box|packaging|bo[x]/i, label: '包裝盒', inBatch: false, target: null },
  { test: /利是封|紅包|red packet|lai see/i, label: '利是封', inBatch: false, target: null },
  { test: /餐牌|菜單|menu/i, label: '餐牌', inBatch: false, target: null },
  { test: /月曆|年曆|桌曆|calendar/i, label: '月曆', inBatch: false, target: null },
  { test: /信封|envelope/i, label: '信封', inBatch: false, target: null },
  { test: /教科書|教材|練習|作業|textbook|workbook|exercise/i, label: '教科書/練習', inBatch: false, target: null },
  { test: /橫額|易拉寶|噴繪|banner|roll[- ]up/i, label: '橫額/噴繪', inBatch: false, target: null },
];

function categoryOf(ctx) {
  for (const c of CATEGORIES) if (c.test.test(ctx)) return c;
  return null;
}

/* ---- 建立掃描清單 ---- */
const files = [];
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) { walk(p); continue; }
    if (!/\.(ts|tsx)$/.test(f.name)) continue;
    const rel = path.relative(ROOT, p).replace(/\\/g, '/');
    if (EXCLUDE.some((re) => re.test(rel))) continue;
    files.push(rel);
  }
}
for (const d of SCAN_DIRS) if (fs.existsSync(d)) walk(d);

/* ---- 逐檔案掃描 ---- */
const rows = [];
const perFile = new Map();

for (const rel of files) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf-8').split('\n');
  lines.forEach((line, idx) => {
    const m = line.match(MOQ_PAT);
    if (!m) return;
    // 上下文 = 同行 + 前後 2 行 (模板句的品類詞可能在句首或鄰行)
    const ctx = lines.slice(Math.max(0, idx - 2), idx + 3).join(' ');
    const kind = classifyMoqString(line);
    const cat = categoryOf(`${line} ${ctx}`);
    rows.push({
      file: rel, line: idx + 1, kind,
      catLabel: cat ? cat.label : '未歸類',
      inBatch: cat ? cat.inBatch : null,
      target: cat ? cat.target : null,
      snippet: line.trim().slice(0, 120),
      matches: [...new Set(m.map((x) => x.trim()))].slice(0, 4),
    });
    perFile.set(rel, (perFile.get(rel) || 0) + 1);
  });
}

/* ---- 統計 ---- */
const byKind = {};
const byCat = {};
const byInBatch = { inBatch: 0, outBatch: 0, unknown: 0 };
for (const r of rows) {
  byKind[r.kind] = (byKind[r.kind] || 0) + 1;
  byCat[r.catLabel] = (byCat[r.catLabel] || 0) + 1;
  if (r.inBatch === true) byInBatch.inBatch++;
  else if (r.inBatch === false) byInBatch.outBatch++;
  else byInBatch.unknown++;
}

/* ---- 行動分類 ---- */
const ACTION = { changeMoq: [], formatTier: [], keep: [], manual: [] };
for (const r of rows) {
  if (r.kind === 'price_tier') { ACTION.formatTier.push(r); continue; }
  if (r.kind === 'industry_fact') { ACTION.keep.push(r); continue; }
  if (r.inBatch === true) { ACTION.changeMoq.push(r); continue; }
  if (r.inBatch === false) { ACTION.keep.push(r); continue; }
  ACTION.manual.push(r);
}

/* ---- 產出報告 ---- */
const L = [];
L.push('# 價目同步波 — 全量分類報告');
L.push('');
L.push('**產出**: 2026-09-19 · 掃描器 `scripts/moq10-price-sync-report.mjs`');
L.push('**分類器**: `src/data/print-method-policy.ts` 的 `classifyMoqString()` (同一 SSoT, 報告與實作不分叉)');
L.push('');
L.push('```');
L.push('數據來源:');
L.push(`- 掃描範圍: ${SCAN_DIRS.join(' / ')} 內 .ts/.tsx (排除 .bak / 生成檔 / 測試 / quote-engine)`);
L.push(`- 掃描檔案數: ${files.length}`);
L.push(`- 命中行數: ${rows.length}`);
L.push('- 分類器: classifyMoqString() (MOQ+價格 -> price_tier 優先; 行業慣例 -> industry_fact; 純 MOQ -> moq_display)');
L.push('- 校準日期: 2026-09-19');
L.push('```');
L.push('');
L.push('## 一、總量與分類分布');
L.push('');
L.push('| 分類 | 數量 | 佔比 |');
L.push('|---|---|---|');
for (const [k, v] of Object.entries(byKind).sort((a, b) => b[1] - a[1])) {
  L.push(`| ${k} | ${v} | ${((v / rows.length) * 100).toFixed(1)}% |`);
}
L.push(`| **合計** | **${rows.length}** | 100% |`);
L.push('');
L.push('## 二、品類歸屬 (本批 vs 非本批)');
L.push('');
L.push(`- **本批品類** (已降至 10 張/本/1 張): ${byInBatch.inBatch}`);
L.push(`- **非本批品類** (維持 100+, 本來就正確): ${byInBatch.outBatch}`);
L.push(`- 未歸類 (需人工): ${byInBatch.unknown}`);
L.push('');
L.push('| 品類 | 數量 | 是否本批 |');
L.push('|---|---|---|');
for (const [k, v] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  const c = CATEGORIES.find((x) => x.label === k);
  L.push(`| ${k} | ${v} | ${c ? (c.inBatch ? '✅ 本批 (改)' : '➖ 非本批 (保留)') : '❓ 待判'} |`);
}
L.push('');
L.push('## 三、行動清單');
L.push('');
L.push('| 行動 | 數量 | 說明 |');
L.push('|---|---|---|');
L.push(`| ① 改 MOQ 數字 | ${ACTION.changeMoq.length} | 本批品類的 moq_display → 改為現行 MOQ |`);
L.push(`| ② 改格式不改數字 | ${ACTION.formatTier.length} | price_tier → 「XX 張檔位：HK$YY」 |`);
L.push(`| ③ 保留不動 | ${ACTION.keep.length} | 非本批品類 / industry_fact |`);
L.push(`| ④ 人工判斷 | ${ACTION.manual.length} | 未歸類或分類不明的 |`);
L.push('');
L.push('## 四、按檔案分布 (優先級排序)');
L.push('');
L.push('| 檔案 | 命中 | 改 MOQ | 改格式 | 保留 | 人工 |');
L.push('|---|---|---|---|---|---|');
const fileAgg = new Map();
const bump = (f, k) => {
  if (!fileAgg.has(f)) fileAgg.set(f, { changeMoq: 0, formatTier: 0, keep: 0, manual: 0, total: 0 });
  fileAgg.get(f)[k]++;
  fileAgg.get(f).total++;
};
for (const r of ACTION.changeMoq) bump(r.file, 'changeMoq');
for (const r of ACTION.formatTier) bump(r.file, 'formatTier');
for (const r of ACTION.keep) bump(r.file, 'keep');
for (const r of ACTION.manual) bump(r.file, 'manual');
for (const [f, a] of [...fileAgg.entries()].sort((x, y) => y[1].total - x[1].total)) {
  L.push(`| \`${f}\` | ${a.total} | ${a.changeMoq} | ${a.formatTier} | ${a.keep} | ${a.manual} |`);
}
L.push('');
L.push('## 五、行動清單① 明細 — 本批品類待改 MOQ');
L.push('');
if (!ACTION.changeMoq.length) L.push('(無 — 本批品類已無 moq_display 殘留)');
for (const r of ACTION.changeMoq) {
  L.push(`- \`${r.file}:${r.line}\` **[${r.catLabel} → ${r.target}]** ${r.snippet}`);
}
L.push('');
L.push('## 六、行動清單② 明細 — price_tier (改格式, 數字不動)');
L.push('');
L.push('> 只改「起印/起訂」語意為「檔位」, **不得改動任何數字** (報價承諾)。');
L.push('');
for (const r of ACTION.formatTier.slice(0, 60)) {
  L.push(`- \`${r.file}:${r.line}\` [${r.catLabel}] ${r.snippet}`);
}
if (ACTION.formatTier.length > 60) L.push(`- …(其餘 ${ACTION.formatTier.length - 60} 條見 JSON 明細)`);
L.push('');
L.push('## 七、行動清單④ 明細 — 待人工判斷');
L.push('');
for (const r of ACTION.manual.slice(0, 40)) {
  L.push(`- \`${r.file}:${r.line}\` [${r.catLabel}] (${r.kind}) ${r.snippet}`);
}
if (ACTION.manual.length > 40) L.push(`- …(其餘 ${ACTION.manual.length - 40} 條)`);
L.push('');
L.push('## 八、下一步 (依 K3 規劃)');
L.push('');
L.push('1. 先處理行動清單① (本批品類改 MOQ) — 風險最低, 直接對齊 PDP 口徑');
L.push('2. 再處理行動清單② (price_tier 改格式) — 用 `formatPriceTier()`, 數字守恆由 smoke G 段把關');
L.push('3. 行動清單④ 逐條人工判斷後歸入①或③');
L.push('4. 動態生成注入 (sku-seo-data 改呼叫 getDisplayMinOrderV2) 與本波同批進行 — 只對①類語境注入, 不可對②類注入');
L.push('');
L.push('---');
L.push('');
L.push('*本報告由 `scripts/moq10-price-sync-report.mjs` 自動產生; 分類器與生產邏輯共用同一模組。*');
L.push('');

fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
fs.writeFileSync(OUT_MD, L.join('\n'), 'utf-8');

// 另出機器可讀 JSON
const OUT_JSON = OUT_MD.replace(/\.md$/, '.json');
fs.writeFileSync(OUT_JSON, JSON.stringify({
  generatedAt: new Date().toISOString(),
  scannedFiles: files.length,
  totalHits: rows.length,
  byKind, byCat, byInBatch,
  actions: {
    changeMoq: ACTION.changeMoq.length,
    formatTier: ACTION.formatTier.length,
    keep: ACTION.keep.length,
    manual: ACTION.manual.length,
  },
  changeMoqList: ACTION.changeMoq,
}, null, 2), 'utf-8');

console.log('=== 價目同步波 — 全量分類報告 ===');
console.log(`掃描檔案: ${files.length} | 命中行: ${rows.length}`);
console.log(`分類: ${JSON.stringify(byKind)}`);
console.log(`品類: 本批 ${byInBatch.inBatch} / 非本批 ${byInBatch.outBatch} / 未歸類 ${byInBatch.unknown}`);
console.log(`行動: 改MOQ ${ACTION.changeMoq.length} / 改格式 ${ACTION.formatTier.length} / 保留 ${ACTION.keep.length} / 人工 ${ACTION.manual.length}`);
console.log(`\n報告: ${path.relative(ROOT, OUT_MD)}`);
console.log(`JSON: ${path.relative(ROOT, OUT_JSON)}`);
