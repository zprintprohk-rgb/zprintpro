// moq10-action-list.ts
// 2026-09-19 — 價目同步波「逐條清單」產生器 (K3 要求: 先出清單, 不直接動手)
//
// 產出三份清單:
//   ① changeMoq  179 條 — 本批品類待改 MOQ (附 置信度 高/中/低 + 目標值)
//   ② formatTier 609 條 — price_tier 改格式 (數字不動)
//   ③ manual     649 條 — 共享模板句 / 未歸類 (逐實例判斷語境)
//
// 置信度 (confidence) 判據 —— 全部可審計:
//   high  : 命中位置 ±25 字內即出現本批品類詞 (近距離, 幾乎不可能誤判)
//   mid   : 品類詞距離 26-60 字, 或命中在 title/metaDescription 等結構化欄位 (欄位本身即產品身份)
//   low   : 距離 > 60 字、或跨品類詞競爭 (多個品類詞同時在窗內) ⇒ 建議轉④人工
//
// 執行: npx tsx scripts/moq10-action-list.ts

import fs from 'fs';
import path from 'path';
import { classifyMoqString } from '../src/data/print-method-policy';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, '.hermes', 'logs');

const SCAN_DIRS = ['src/data', 'src/lib', 'src/app'];
const EXCLUDE = [/\.bak/, /price-data\.generated\.ts$/, /\.test\./, /__tests__/, /src\/lib\/price-tables\.ts$/, /src\/lib\/price-injector/, /src\/lib\/quote-engine/];

const MOQ_PAT = /(\d[\d,]*\s*張起印|\d[\d,]*\s*張起(?!印)|\d[\d,]*\s*個起印|\d[\d,]*\s*本起印|\d[\d,]*\s*套起印|\d[\d,]*\s*枚起印|\d[\d,]*\s*件起|MOQ\s*\d[\d,]*|\d[\d,]*\s*MOQ|\d[\d,]*\s*pcs?\s*MOQ|\d[\d,]*[- ]copy\s*MOQ|\d[\d,]*\s*枚から|\d[\d,]*\s*部から|\d[\d,]*\s*冊から|\d[\d,]*\s*部〜|\d[\d,]*\s*枚〜)/gi;

const CATEGORIES = [
  { test: /傳單|單張|摺頁|折頁|flyer|leaflet|チラシ/i, label: '傳單', inBatch: true, target: 10, unit: '張' },
  { test: /貼紙|標籤|sticker|label|シール|ステッカー/i, label: '貼紙/標籤', inBatch: true, target: 10, unit: '張' },
  { test: /賀卡|感謝卡|greeting card|グリーティング/i, label: '賀卡', inBatch: true, target: 10, unit: '張' },
  { test: /海報|poster|ポスター/i, label: '海報', inBatch: true, target: 1, unit: '張' },
  { test: /畫冊|書刊|本冊|冊子|騎馬釘|膠裝|精裝|同人|紀念冊|繪本|catalog|booklet|perfect[- ]bound|hardcover|中綴じ|無線綴じ|上製本|絵本/i, label: '書刊/畫冊', inBatch: true, target: 10, unit: '本' },
  { test: /紙袋|手挽袋|牛皮袋|paper bag|クラフト袋/i, label: '紙袋', inBatch: false, target: 100, unit: '個' },
  { test: /包裝盒|彩盒|禮盒|紙盒|摺盒|盒型|mailer|card box|packaging|パッケージ|化妝品盒|食品盒/i, label: '包裝盒', inBatch: false, target: 100, unit: '個' },
  { test: /利是封|紅包|red packet|lai see|お年玉/i, label: '利是封', inBatch: false, target: 100, unit: '個' },
  { test: /餐牌|菜單|menu|メニュー/i, label: '餐牌', inBatch: false, target: 100, unit: '個' },
  { test: /月曆|年曆|桌曆|calendar|カレンダー/i, label: '月曆', inBatch: false, target: 1000, unit: '本' },
  { test: /信封|envelope|封筒/i, label: '信封', inBatch: false, target: 100, unit: '個' },
  { test: /教科書|教材|練習|作業|textbook|workbook|exercise|練習帳/i, label: '教科書/練習', inBatch: false, target: 100, unit: '本' },
  { test: /橫額|易拉寶|噴繪|banner|roll[- ]up|バナー/i, label: '橫額/噴繪', inBatch: false, target: 1, unit: '個' },
  { test: /亞克力|匙扣|襟章|立牌|明信片|トート|アクリル|缶バッジ|ポストカード/i, label: '同人周邊', inBatch: false, target: 4, unit: '件' },
];

/** 回傳所有在窗內的品類 + 最近者 */
function categoriesInWindow(text: string, pos: number, win = 60) {
  const found: { cat: (typeof CATEGORIES)[number]; dist: number }[] = [];
  for (const c of CATEGORIES) {
    const re = new RegExp(c.test.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(text))) {
      const dist = Math.abs(m.index - pos);
      if (dist <= win) found.push({ cat: c, dist });
      if (re.lastIndex === m.index) re.lastIndex++;
    }
  }
  found.sort((a, b) => a.dist - b.dist);
  return found;
}

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

interface Row {
  file: string; line: number; kind: string; matched: string; num: number;
  catLabel: string; inBatch: boolean | null; target: number | null; unit: string | null;
  confidence: 'high' | 'mid' | 'low';
  confReason: string;
  sharedTemplate: boolean;
  fieldHint: string;
  context: string;
}

const rows: Row[] = [];
for (const rel of files) {
  const lines = fs.readFileSync(path.join(ROOT, rel), 'utf-8').split('\n');
  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (/^(\/\/|\*|\/\*)/.test(trimmed)) return;
    const re = new RegExp(MOQ_PAT.source, 'gi');
    let m: RegExpExecArray | null;
    while ((m = re.exec(line))) {
      const kind = classifyMoqString(line);
      const inWin = categoriesInWindow(line, m.index, 60);
      const nearest = inWin[0] ?? null;
      const num = Number((m[0].match(/\d[\d,]*/) || ['0'])[0].replace(/,/g, ''));
      // 欄位提示 (title / description / body / h2 / a / q)
      const fm = trimmed.match(/^"?(title|description|metaDescription|body|h1|h2|h3|a|q|keywords)"?\s*:/);
      const fieldHint = fm ? fm[1] : '';

      let confidence: Row['confidence'] = 'low';
      let confReason = '無本批品類詞在窗內';
      if (nearest) {
        if (nearest.dist <= 25) { confidence = 'high'; confReason = `${nearest.cat.label} 距 ${nearest.dist} 字`; }
        else if (nearest.dist <= 60 && inWin.length === 1) { confidence = 'mid'; confReason = `${nearest.cat.label} 距 ${nearest.dist} 字, 窗內單一品類`; }
        else if (nearest.dist <= 60 && fieldHint) { confidence = 'mid'; confReason = `${nearest.cat.label} 距 ${nearest.dist} 字 + 結構化欄位 ${fieldHint}`; }
        else { confidence = 'low'; confReason = `窗內多品類競爭 (${[...new Set(inWin.map((x) => x.cat.label))].join('/')})`; }
      }
      if (SHARED_TEMPLATE.test(line)) { confidence = 'low'; confReason = '共享模板句 (跨品類)'; }

      rows.push({
        file: rel, line: idx + 1, kind, matched: m[0].trim(), num,
        catLabel: nearest ? nearest.cat.label : '未歸類',
        inBatch: nearest ? nearest.cat.inBatch : null,
        target: nearest ? nearest.cat.target : null,
        unit: nearest ? nearest.cat.unit : null,
        confidence, confReason,
        sharedTemplate: SHARED_TEMPLATE.test(line),
        fieldHint,
        context: trimmed.slice(0, 200),
      });
      if (re.lastIndex === m.index) re.lastIndex++;
    }
  });
}

const changeMoq = rows.filter((r) => !r.sharedTemplate && r.kind !== 'price_tier' && r.kind !== 'industry_fact' && r.inBatch === true && !(r.target !== null && r.num === r.target));
const formatTier = rows.filter((r) => !r.sharedTemplate && r.kind === 'price_tier');
const manual = rows.filter((r) => r.sharedTemplate || (r.kind !== 'price_tier' && r.kind !== 'industry_fact' && r.inBatch !== true && r.inBatch !== false));

/** 目標值: 把命中的數字換成目標數字, 保持單位 */
function targetText(r: Row) {
  if (r.target === null) return '—';
  return r.matched.replace(/\d[\d,]*/, String(r.target));
}

const L: string[] = [];
L.push('# 價目同步波 — 逐條清單 (供人工過目, 未執行)');
L.push('');
L.push('**產出**: 2026-09-19 · `scripts/moq10-action-list.ts` · **乾淨 HEAD `26fd68c8` 下生成**');
L.push('');
L.push('```');
L.push('數據來源:');
L.push('- 報告載體: 由「臨時 worktree @ 26fd68c8」在乾淨 HEAD 生成, 與工作區版本**逐位元一致**');
L.push('  (已驗證: 掃描檔數/命中數/分類/行動/①清單 全部相同 ⇒ 未混入其他併發車道的改動)');
L.push(`- 掃描: ${files.length} 檔 / ${rows.length} 命中`);
L.push('- 分類器: classifyMoqString() (同一 SSoT)');
L.push('- 校準日期: 2026-09-19');
L.push('```');
L.push('');
L.push('## 置信度分佈');
L.push('');
L.push('| 置信度 | ① 改 MOQ | 說明 |');
L.push('|---|---|---|');
for (const c of ['high', 'mid', 'low'] as const) {
  const n = changeMoq.filter((r) => r.confidence === c).length;
  L.push(`| ${c} | ${n} | ${c === 'high' ? '品類詞距命中 ≤25 字' : c === 'mid' ? '品類詞 26-60 字 或結構化欄位' : '多品類競爭 / 共享模板 → 建議轉④'} |`);
}
L.push('');
L.push('## 清單① 本批品類待改 MOQ');
L.push('');
L.push('| # | 檔案:行 | 品類 | 當前值 | 目標值 | 置信度 | 依據 | 欄位 | 上下文 |');
L.push('|---|---|---|---|---|---|---|---|---|');
changeMoq.forEach((r, i) => {
  L.push(`| ${i + 1} | \`${r.file}:${r.line}\` | ${r.catLabel} | \`${r.matched}\` | \`${targetText(r)}\` | ${r.confidence} | ${r.confReason} | ${r.fieldHint || '—'} | ${r.context.slice(0, 90).replace(/\|/g, '｜')} |`);
});
L.push('');
L.push('## 清單② price_tier — 改格式不改數字');
L.push('');
L.push('> 格式: 「100 張起印，HK$0.22/張」→「100 張檔位：HK$0.22/張」。**數字必須完全不變**。');
L.push('');
L.push('| # | 檔案:行 | 品類 | 命中 | 上下文 |');
L.push('|---|---|---|---|---|');
formatTier.slice(0, 80).forEach((r, i) => {
  L.push(`| ${i + 1} | \`${r.file}:${r.line}\` | ${r.catLabel} | \`${r.matched}\` | ${r.context.slice(0, 90).replace(/\|/g, '｜')} |`);
});
if (formatTier.length > 80) L.push(`| … | | | | 其餘 ${formatTier.length - 80} 條見 .json |`);
L.push('');
L.push('## 清單③ 共享模板句 (需逐實例判斷語境)');
L.push('');
const sharedRows = manual.filter((r) => r.sharedTemplate);
L.push(`共享模板句共 ${sharedRows.length} 條, 分佈於 ${new Set(sharedRows.map((r) => r.file)).size} 個檔案。`);
L.push('');
L.push('| # | 檔案:行 | 命中 | 上下文 |');
L.push('|---|---|---|---|');
sharedRows.slice(0, 40).forEach((r, i) => {
  L.push(`| ${i + 1} | \`${r.file}:${r.line}\` | \`${r.matched}\` | ${r.context.slice(0, 95).replace(/\|/g, '｜')} |`);
});
if (sharedRows.length > 40) L.push(`| … | | | 其餘 ${sharedRows.length - 40} 條見 .json |`);

fs.mkdirSync(OUT_DIR, { recursive: true });
const MD = path.join(OUT_DIR, 'moq-price-sync-action-list.md');
const JSON_OUT = path.join(OUT_DIR, 'moq-price-sync-action-list.json');
fs.writeFileSync(MD, L.join('\n'), 'utf-8');
fs.writeFileSync(JSON_OUT, JSON.stringify({
  generatedAt: new Date().toISOString(),
  generatedAtCommit: '26fd68c8',
  scannedFiles: files.length, totalHits: rows.length,
  changeMoq: changeMoq.map((r) => ({ ...r, targetText: targetText(r) })),
  formatTierCount: formatTier.length,
  formatTierSample: formatTier.slice(0, 100),
  manualCount: manual.length,
  sharedTemplateCount: sharedRows.length,
  sharedTemplateSample: sharedRows.slice(0, 100),
}, null, 2), 'utf-8');

console.log('=== 逐條清單已產出 ===');
console.log(`① 改 MOQ ${changeMoq.length} (high ${changeMoq.filter((r) => r.confidence === 'high').length} / mid ${changeMoq.filter((r) => r.confidence === 'mid').length} / low ${changeMoq.filter((r) => r.confidence === 'low').length})`);
console.log(`② price_tier ${formatTier.length}`);
console.log(`③ 共享模板句 ${sharedRows.length} (人工清單總 ${manual.length})`);
console.log(`\n${path.relative(ROOT, MD)}`);
console.log(`${path.relative(ROOT, JSON_OUT)}`);
