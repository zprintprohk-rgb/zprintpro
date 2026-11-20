/**
 * bc-csv-rename.cjs — 名片批第一步: CSV 源头 2 行改名 (贺卡语义 -> 名片语义)
 *
 * 为什么用脚本而不是手改整行: CSV 19 列中文 + 引号字段, 整行重写极易破坏列对齐;
 *   本脚本只对**指定 slug 所在行**做行内定点替换, 并在写入前后断言列数不变 (引号/逗号未被破坏),
 *   符合 AGENTS.md SOP-5「派生数据禁手搓」(改源头 CSV, 再跑生成器)。
 *
 * 目标行: thick-greeting-cards-400g (厚卡名片) / foil-greeting-cards (燙金名片)
 * 用法: node .hermes/bc-csv-rename.cjs            # 干跑
 *       node .hermes/bc-csv-rename.cjs --apply    # 写入
 */
const fs = require('fs');

const APPLY = process.argv.includes('--apply');
const CSV = 'zprintpro-sku-seo-data.csv';
const TARGETS = ['thick-greeting-cards-400g', 'foil-greeting-cards'];

// 保留分隔符安全: 替换词不含逗号/引号
const RULES = [
  [/賀卡/g, '名片'],
  [/贺卡/g, '名片'],
  [/Greeting Cards/g, 'Business Cards'],
  [/greeting cards/g, 'business cards'],
  [/グリーティングカード/g, '名刺'],
  [/年賀状/g, '名刺'],
  [/婚禮卡/g, '商務名片'],
  [/wedding cards/gi, 'business cards'],
  [/ウェディングカード/g, '名刺'],
  [/聖誕卡/g, '商務名片'],
  [/Christmas cards/gi, 'corporate business cards'],
  [/クリスマスカード/g, '名刺'],
];

/** 极简 CSV 行解析 (只数顶层字段数, 用于列数断言) */
function countFields(line) {
  let n = 1;
  let q = false;
  for (const ch of line) {
    if (ch === '"') q = !q;
    else if (ch === ',' && !q) n++;
  }
  return n;
}

const raw = fs.readFileSync(CSV, 'utf8');
const lines = raw.split('\n');
const HEADER_FIELDS = countFields(lines[0]);
const report = [];

for (let i = 1; i < lines.length; i++) {
  const line = lines[i];
  if (!line.trim()) continue;
  const hit = TARGETS.find((s) => line.includes(s));
  if (!hit) continue;
  const before = countFields(line);
  let next = line;
  const applied = [];
  for (const [re, to] of RULES) {
    const m = next.match(re);
    if (m) { applied.push(`${re.source} x${m.length} -> ${to}`); next = next.replace(re, to); }
  }
  const after = countFields(next);
  report.push({ line: i + 1, slug: hit, before, after, applied, changed: before === after && next !== line });
  if (before !== after) { console.log(`[FAIL] L${i + 1} 列数被破坏 ${before} -> ${after}, 未写入`); process.exit(1); }
  if (APPLY && next !== line) lines[i] = next;
}

console.log(`=== bc-csv-rename (${APPLY ? 'APPLY' : 'DRY-RUN'}) ===`);
console.log(`CSV: ${CSV}  表头列数= ${HEADER_FIELDS}`);
for (const r of report) {
  console.log(`\nL${r.line} ${r.slug}  列数 ${r.before} -> ${r.after}  ${r.changed ? 'OK' : '(无变化?)'}`);
  for (const a of r.applied) console.log(`   ${a}`);
}
if (!report.length) { console.log('未命中任何目标行 -> 中止'); process.exit(1); }

if (APPLY) {
  const out = lines.join('\n');
  // 写后断言: 目标行不得再残留贺卡语义
  const bad = [];
  for (const l of out.split('\n')) {
    if (!TARGETS.some((s) => l.includes(s))) continue;
    if (/賀卡|Greeting Cards|greeting cards|グリーティングカード|年賀状/.test(l)) bad.push(l.slice(0, 80));
  }
  if (bad.length) { console.log(`\n[FAIL] 目标行仍残留贺卡语义 ${bad.length} 处 -> 未写入`); process.exit(1); }
  fs.writeFileSync(CSV, out, 'utf8');
  console.log('\n[OK] 已写入 CSV (列数未变 + 目标行无贺卡残留)');
  console.log('下一步: node scripts/csv-to-sku-seo.mjs');
}
process.exit(0);
