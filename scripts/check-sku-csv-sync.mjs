/**
 * check-sku-csv-sync.mjs — SOP-5 源头/派生 漂移检查 (只读)
 *
 * 背景: AGENTS.md §0.23「派生文件禁手搓 (SOP-5)」要求改源头
 *       (zprintpro-sku-seo-data.csv) 再跑 scripts/csv-to-sku-seo.mjs 生成
 *       src/data/sku-seo-data.ts。
 *       但 2026-09-10 起的多个批次直接手改派生 TS ⇒ 源头与派生漂移。
 *       本脚本量化漂移, 防止「盲跑生成器把线上标题回退」。
 *
 * 用法:
 *   node scripts/check-sku-csv-sync.mjs            # 汇总 + 样例
 *   node scripts/check-sku-csv-sync.mjs --json     # 机器可读
 *
 * 退出码: 0 = 无漂移; 1 = 有漂移 (调用方可据此门禁; 默认报告式不阻断)
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const LOCALES = ['zh-hk', 'en', 'ja'];
const CSV_TITLE_COL = { 'zh-hk': 'SEO标题(ZH)', en: 'SEO标题(EN)', ja: 'SEO标题(JA)' };

/* ---- 派生 TS ---- */
function parseTs() {
  const txt = read('src/data/sku-seo-data.ts');
  const starts = [...txt.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: txt.length });
  const out = {};
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
    out[starts[i].slug] = {};
    for (const loc of LOCALES) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      out[starts[i].slug][loc] = m ? m[1].replace(/\\"/g, '"') : null;
    }
  }
  return out;
}

/* ---- 源头 CSV (TAB 或 逗号) ---- */
function parseCsvLine(line, delim) {
  const cells = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') inQuote = !inQuote;
    else if (ch === delim && !inQuote) { cells.push(cur); cur = ''; }
    else cur += ch;
  }
  cells.push(cur);
  return cells;
}
function parseCsv() {
  const raw = read('zprintpro-sku-seo-data.csv');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim());
  // 分隔符探测: 表头里 TAB 与逗号谁多
  const tabs = (lines[0].match(/\t/g) || []).length;
  const commas = (lines[0].match(/,/g) || []).length;
  const delim = tabs >= commas ? '\t' : ',';
  const header = parseCsvLine(lines[0], delim);
  const colOf = (name) => header.findIndex((h) => h.trim().includes(name));
  const idxSlug = colOf('Slug');
  const idxTitle = { 'zh-hk': colOf(CSV_TITLE_COL['zh-hk']), en: colOf(CSV_TITLE_COL.en), ja: colOf(CSV_TITLE_COL.ja) };
  const out = {};
  for (const line of lines.slice(1)) {
    const c = parseCsvLine(line, delim);
    const slug = (c[idxSlug] || '').trim();
    if (!slug) continue;
    out[slug] = {};
    for (const loc of LOCALES) out[slug][loc] = (c[idxTitle[loc]] || '').trim();
  }
  return { rows: out, delim, header, columns: header.length };
}

const ts = parseTs();
const csv = parseCsv();

const diffs = [];
const onlyTs = [];
const onlyCsv = [];
for (const slug of Object.keys(ts)) {
  if (!(slug in csv.rows)) { onlyTs.push(slug); continue; }
  for (const loc of LOCALES) {
    const a = (ts[slug][loc] || '').trim();
    const b = (csv.rows[slug][loc] || '').trim();
    if (a !== b) diffs.push({ slug, locale: loc, ts: a, csv: b });
  }
}
for (const slug of Object.keys(csv.rows)) if (!(slug in ts)) onlyCsv.push(slug);

const summary = {
  csvDelimiter: csv.delim === '\t' ? 'TAB' : 'COMMA',
  csvColumns: csv.columns,
  csvSlugs: Object.keys(csv.rows).length,
  tsSlugs: Object.keys(ts).length,
  titleSlotsCompared: Object.keys(ts).length * LOCALES.length,
  driftedSlots: diffs.length,
  driftRate: ((diffs.length / (Object.keys(ts).length * LOCALES.length)) * 100).toFixed(1) + '%',
  inTsNotCsv: onlyTs.length,
  inCsvNotTs: onlyCsv.length,
  verdict: diffs.length === 0 && onlyTs.length === 0 && onlyCsv.length === 0 ? 'IN_SYNC' : 'DRIFTED',
  warning: 'DRIFTED ⇒ 禁止直接跑 scripts/csv-to-sku-seo.mjs (会把线上 title 回退到 CSV 旧值)',
};

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ summary, diffs, onlyTs, onlyCsv }, null, 1));
} else {
  console.log(JSON.stringify(summary, null, 1));
  console.log('\n--- 漂移样例 (前 12) ---');
  for (const d of diffs.slice(0, 12)) console.log(`  ${d.locale}\t${d.slug}\n    TS : ${d.ts}\n    CSV: ${d.csv}`);
  if (onlyTs.length) console.log('\nTS 有 / CSV 无:', onlyTs.slice(0, 10).join(', '));
  if (onlyCsv.length) console.log('CSV 有 / TS 无:', onlyCsv.slice(0, 10).join(', '));
}

const outDir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'sku-csv-sync-2026-09-19.json'), JSON.stringify({ summary, diffs }, null, 1));
process.exit(0); // 报告式 (不阻断), 与 §0.0.3 降级先例一致
