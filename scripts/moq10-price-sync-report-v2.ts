// moq10-price-sync-report.ts  (v2 — 強化品類歸屬, 修正 v1 假陽性)
//
// === v1 為何被否決 (抽驗 25/383 後) ===
// v1 用「同行 + 前後 2 行」滑窗判品類, 實測大量假陽性:
//   ① 共享模板句被判成「該檔所在段落」的品類:
//      「智印港支援小批量印刷，貼紙 10 張起、信封 100 張起、禮品包裝盒 100 個起」
//      —— 此句同時含「貼紙」(本批) 與「信封/禮品包裝盒」(非本批), 滑窗抓到「貼紙」⇒ 誤判為本批貼紙。實際係**公司級 FAQ**, 不應改。
//   ② 相鄰段落污染: 同行/鄰行提到「亞克力匙扣」⇒ 整段傳單/貼紙數字被歸到書刊。
//   ③ 已是正確值的字串 (「貼紙 10 張起」「明信片套裝 4 套起」) 只因含「起印量」關鍵詞就被列入「待改」。
//   ④ 註釋行 (print-method-policy.ts 的 * 行) 被當成內容行。
//
// === v2 判據 (三層, 皆可審計) ===
//   L1 最近產品名 (nearest-noun): 由**命中位置**向左右各取 60 字, 取**最近**出現的品類詞 ——
//      而非「整行有無」。這解決 ①②。
//   L2 排除非內容行: 行首為 // 或 * 的註釋行直接剔除 (解決 ④)。
//   L3 已達標過濾: 若命中字串的數字已等於該品類目標 (貼紙/傳單 10、海報 1、書刊 10) ⇒ 不列入待改 (解決 ③)。
//      共享模板句 (含「最低起印量」且跨多品類) 一律歸「需人工」, 不自動改。
//
// 產出: .hermes/logs/moq-price-sync-classification.{md,json}

import fs from 'fs';
import path from 'path';
import { classifyMoqString } from '../src/data/print-method-policy';

const ROOT = process.cwd();
const OUT_MD = path.join(ROOT, '.hermes', 'logs', 'moq-price-sync-classification.md');

const SCAN_DIRS = ['src/data', 'src/lib', 'src/app'];
const EXCLUDE = [
  /\.bak/, /price-data\.generated\.ts$/, /\.test\./, /__tests__/,
  /src\/lib\/price-tables\.ts$/, /src\/lib\/price-injector/, /src\/lib\/quote-engine/,
];

const MOQ_PAT = /(\d[\d,]*\s*張起印|\d[\d,]*\s*張起(?!印)|\d[\d,]*\s*個起印|\d[\d,]*\s*本起印|\d[\d,]*\s*套起印|\d[\d,]*\s*枚起印|\d[\d,]*\s*件起|MOQ\s*\d[\d,]*|\d[\d,]*\s*MOQ|\d[\d,]*\s*pcs?\s*MOQ|\d[\d,]*[- ]copy\s*MOQ|\d[\d,]*\s*枚から|\d[\d,]*\s*部から|\d[\d,]*\s*冊から|\d[\d,]*\s*部〜|\d[\d,]*\s*枚〜)/gi;

/** 品類詞表 — 附「該品類在本站的目標 MOQ」 */
const CATEGORIES = [
  { test: /傳單|單張|摺頁|折頁|flyer|leaflet|チラシ/i, label: '傳單', inBatch: true, target: 10, unit: '張' },
  { test: /貼紙|標籤|sticker|label|シール|ステッカー/i, label: '貼紙/標籤', inBatch: true, target: 10, unit: '張' },
  { test: /賀卡|感謝卡|greeting card|グリーティング/i, label: '賀卡', inBatch: true, target: 10, unit: '張' },
  { test: /海報|poster|ポスター/i, label: '海報', inBatch: true, target: 1, unit: '張' },
  { test: /畫冊|書刊|本冊|冊子|騎馬釘|膠裝|精裝|同人|紀念冊|繪本|catalog|booklet|perfect[- ]bound|hardcover|中綴じ|無線綴じ|上製本|絵本/i, label: '書刊/畫冊', inBatch: true, target: 10, unit: '本' },
  { test: /紙袋|手挽袋|牛皮袋|paper bag|クラフト袋|紙袋/i, label: '紙袋', inBatch: false, target: 100, unit: '個' },
  { test: /包裝盒|彩盒|禮盒|紙盒|摺盒|盒型|mailer|card box|packaging|パッケージ|化妝品盒|食品盒/i, label: '包裝盒', inBatch: false, target: 100, unit: '個' },
  { test: /利是封|紅包|red packet|lai see|お年玉/i, label: '利是封', inBatch: false, target: 100, unit: '個' },
  { test: /餐牌|菜單|menu|メニュー/i, label: '餐牌', inBatch: false, target: 100, unit: '個' },
  { test: /月曆|年曆|桌曆|calendar|カレンダー/i, label: '月曆', inBatch: false, target: 1000, unit: '本' },
  { test: /信封|envelope|封筒/i, label: '信封', inBatch: false, target: 100, unit: '個' },
  { test: /教科書|教材|練習|作業|textbook|workbook|exercise|練習帳|教科書/i, label: '教科書/練習', inBatch: false, target: 100, unit: '本' },
  { test: /橫額|易拉寶|噴繪|banner|roll[- ]up|バナー/i, label: '橫額/噴繪', inBatch: false, target: 1, unit: '個' },
  { test: /亞克力|匙扣|襟章|立牌|明信片|トート|アクリル|缶バッジ|ポストカード/i, label: '同人周邊', inBatch: false, target: 4, unit: '件' },
];

/** L1: 由命中位置向兩側找**最近**的品類詞 */
function nearestCategory(text: string, pos: number) {
  let best: { cat: (typeof CATEGORIES)[number]; dist: number } | null = null;
  for (const c of CATEGORIES) {
    const re = new RegExp(c.test.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const dist = Math.abs(m.index - pos);
      if (dist <= 60 && (!best || dist < best.dist)) best = { cat: c, dist };
      if (re.lastIndex === m.index) re.lastIndex++;
    }
  }
  return best ? best.cat : null;
}

/** L3: 共享模板句 (跨品類) → 一律人工 */
const SHARED_TEMPLATE = /(最低起印量是多少|最低訂購量|最低訂購量是多少|最少可以印|最低起印量)/;

const files: string[] = [];
function walk(d: string) {
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

const rows: any[] = [];
for (const rel of files) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf-8').split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    // L2: 剔除註釋行
    if (/^(\/\/|\*|\/\*)/.test(trimmed)) return;
    const re = new RegExp(MOQ_PAT.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      const kind = classifyMoqString(line);
      const cat = nearestCategory(line, m.index);
      const num = Number((m[0].match(/\d[\d,]*/) || ['0'])[0].replace(/,/g, ''));
      const isSharedTemplate = SHARED_TEMPLATE.test(line);
      // L3: 已達標?
      const alreadyOk = !!cat && cat.inBatch && num === cat.target;
      rows.push({
        file: rel, line: idx + 1, kind,
        matched: m[0].trim(),
        num,
        catLabel: cat ? cat.label : '未歸類',
        inBatch: cat ? cat.inBatch : null,
        target: cat ? cat.target : null,
        alreadyOk, isSharedTemplate,
        snippet: trimmed.slice(0, 130),
      });
      if (re.lastIndex === m.index) re.lastIndex++;
    }
  });
}

const byKind: Record<string, number> = {};
const byCat: Record<string, number> = {};
for (const r of rows) {
  byKind[r.kind] = (byKind[r.kind] || 0) + 1;
  byCat[r.catLabel] = (byCat[r.catLabel] || 0) + 1;
}

const ACTION = { changeMoq: [] as any[], formatTier: [] as any[], keep: [] as any[], manual: [] as any[] };
for (const r of rows) {
  if (r.isSharedTemplate) { ACTION.manual.push(r); continue; }        // L3: 共享模板 → 人工
  if (r.kind === 'price_tier') { ACTION.formatTier.push(r); continue; }
  if (r.kind === 'industry_fact') { ACTION.keep.push(r); continue; }
  if (r.alreadyOk) { ACTION.keep.push(r); continue; }                 // L3: 已達標
  if (r.inBatch === true) { ACTION.changeMoq.push(r); continue; }
  if (r.inBatch === false) { ACTION.keep.push(r); continue; }
  ACTION.manual.push(r);
}

const L: string[] = [];
L.push('# 價目同步波 — 全量分類報告 (v2 強化品類歸屬)');
L.push('');
L.push(`**產出**: 2026-09-19 · \`scripts/moq10-price-sync-report.ts\` · 分類器 = \`classifyMoqString()\` (同一 SSoT)`);
L.push('');
L.push('```');
L.push('數據來源:');
L.push(`- 掃描: ${SCAN_DIRS.join(' / ')} 內 .ts/.tsx (排除 .bak / 生成檔 / 測試 / quote-engine)`);
L.push(`- 檔案數: ${files.length} · 命中數: ${rows.length}`);
L.push('- 品類歸屬: L1 最近產品名 (命中位置 ±60 字取最近) — v1 的「整行滑窗」已證實會大量假陽性');
L.push('- 剔除: L2 註釋行 · L3 已達標值 / 共享模板句 (轉人工)');
L.push('- 校準日期: 2026-09-19');
L.push('```');
L.push('');
L.push('## 一、分類分布');
L.push('');
L.push('| 分類 | 數量 | 佔比 |');
L.push('|---|---|---|');
for (const [k, v] of Object.entries(byKind).sort((a, b) => b[1] - a[1])) L.push(`| ${k} | ${v} | ${((v / rows.length) * 100).toFixed(1)}% |`);
L.push(`| **合計** | **${rows.length}** | 100% |`);
L.push('');
L.push('## 二、品類分布');
L.push('');
L.push('| 品類 | 數量 | 本批? | 目標 MOQ |');
L.push('|---|---|---|---|');
for (const [k, v] of Object.entries(byCat).sort((a, b) => b[1] - a[1])) {
  const c = CATEGORIES.find((x) => x.label === k);
  L.push(`| ${k} | ${v} | ${c ? (c.inBatch ? '✅ 本批' : '➖ 非本批') : '❓'} | ${c ? c.target + ' ' + c.unit : '—'} |`);
}
L.push('');
L.push('## 三、行動清單');
L.push('');
L.push('| 行動 | 數量 | 說明 |');
L.push('|---|---|---|');
L.push(`| ① 改 MOQ 數字 | ${ACTION.changeMoq.length} | 本批品類且數字未達標 → 改為現行 MOQ |`);
L.push(`| ② 改格式不改數字 | ${ACTION.formatTier.length} | price_tier → 「XX 張檔位：HK$YY」 |`);
L.push(`| ③ 保留不動 | ${ACTION.keep.length} | 非本批品類 / industry_fact / 已達標 |`);
L.push(`| ④ 人工判斷 | ${ACTION.manual.length} | 共享模板句 / 未歸類 |`);
L.push('');
L.push('## 四、按檔案分布');
L.push('');
L.push('| 檔案 | 命中 | ①改MOQ | ②改格式 | ③保留 | ④人工 |');
L.push('|---|---|---|---|---|---|');
const fileAgg = new Map<string, any>();
const bump = (f: string, k: string) => {
  if (!fileAgg.has(f)) fileAgg.set(f, { changeMoq: 0, formatTier: 0, keep: 0, manual: 0, total: 0 });
  fileAgg.get(f)[k]++; fileAgg.get(f).total++;
};
for (const r of ACTION.changeMoq) bump(r.file, 'changeMoq');
for (const r of ACTION.formatTier) bump(r.file, 'formatTier');
for (const r of ACTION.keep) bump(r.file, 'keep');
for (const r of ACTION.manual) bump(r.file, 'manual');
for (const [f, a] of [...fileAgg.entries()].sort((x, y) => y[1].total - x[1].total)) {
  L.push(`| \`${f}\` | ${a.total} | ${a.changeMoq} | ${a.formatTier} | ${a.keep} | ${a.manual} |`);
}
L.push('');
L.push('## 五、行動清單① 明細 (本批品類待改 MOQ)');
L.push('');
for (const r of ACTION.changeMoq) L.push(`- \`${r.file}:${r.line}\` **[${r.catLabel} → ${r.target}${r.target === 10 ? '本/張' : ''}]** \`${r.matched}\` — ${r.snippet.slice(0, 100)}`);
L.push('');
L.push('## 六、行動清單④ 明細 (共享模板句 / 未歸類, 需人工)');
L.push('');
for (const r of ACTION.manual.slice(0, 50)) L.push(`- \`${r.file}:${r.line}\` ${r.isSharedTemplate ? '[共享模板]' : '[未歸類]'} ${r.snippet.slice(0, 110)}`);
if (ACTION.manual.length > 50) L.push(`- …(其餘 ${ACTION.manual.length - 50} 條見 JSON)`);
L.push('');
L.push('## 七、v1 → v2 差異 (為何重做)');
L.push('');
L.push('| 項目 | v1 | v2 |');
L.push('|---|---|---|');
L.push('| 品類判據 | 整行 + 前後 2 行滑窗 | **最近產品名** (命中位置 ±60 字) |');
L.push('| 註釋行 | 計入 | 剔除 |');
L.push('| 已達標值 | 誤列為待改 | 過濾 (轉③) |');
L.push('| 共享模板句 | 誤歸單一品類 | 轉④人工 |');
L.push('| 待改數 | 383 (含大量假陽性) | 見 §三 |');
L.push('');
L.push('---');
L.push('');
L.push('*本報告由 `scripts/moq10-price-sync-report.ts` 自動產生。抽驗未過之版本 (v1) 已作廢, 見 §七。*');

fs.mkdirSync(path.dirname(OUT_MD), { recursive: true });
fs.writeFileSync(OUT_MD, L.join('\n'), 'utf-8');
fs.writeFileSync(OUT_MD.replace(/\.md$/, '.json'), JSON.stringify({
  generatedAt: new Date().toISOString(), version: 'v2',
  scannedFiles: files.length, totalHits: rows.length,
  byKind, byCat,
  actions: { changeMoq: ACTION.changeMoq.length, formatTier: ACTION.formatTier.length, keep: ACTION.keep.length, manual: ACTION.manual.length },
  changeMoqList: ACTION.changeMoq,
  manualList: ACTION.manual.slice(0, 200),
}, null, 2), 'utf-8');

console.log('=== 價目同步波 — 全量分類報告 v2 ===');
console.log(`檔案 ${files.length} | 命中 ${rows.length}`);
console.log(`分類: ${JSON.stringify(byKind)}`);
console.log(`行動: ①改MOQ ${ACTION.changeMoq.length} / ②改格式 ${ACTION.formatTier.length} / ③保留 ${ACTION.keep.length} / ④人工 ${ACTION.manual.length}`);
console.log(`報告: .hermes/logs/moq-price-sync-classification.md`);
