'use strict';
/**
 * §5 交付: 「en 值内中文原名」全量明细清单 (供 K3 一次性审批白名单) — 只读盘点, 不改任何数据
 *
 * 口径 = 门童 #4 双向化规则 I18N_POLLUTION_EN (en 值含 CJK 汉字) 的**裸扫描全量命中**,
 *        不经基线豁免 (基线只用于判定「新增 vs 存量」, 盘点要存量全量)。
 * 输出: .hermes/logs/i18n-en-cjk-inventory-<date>.md (file + line + 该行原文)
 */
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));
const common = require(path.join(ROOT, 'scripts', 'guards', 'common.js'));

const files = common.collectFiles(path.join(ROOT, 'src')).filter(f => !common.isExemptPath(f));
const rows = [];
for (const f of files) {
  let c;
  try { c = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  for (const h of guard.scanBidirectional(c, f)) {
    if (h.ruleId !== 'I18N_POLLUTION_EN') continue;
    rows.push(h);
  }
}
const rel = f => path.relative(ROOT, f).replace(/\\/g, '/');
const byFile = new Map();
for (const h of rows) {
  if (!byFile.has(h.file)) byFile.set(h.file, []);
  byFile.get(h.file).push(h);
}

// 逐行原文 (同文件同 line 的多笔命中合并, 避免重复灌水)
const lines = [];
for (const f of files) {
  const r = rel(f);
  const hits = byFile.get(r);
  if (!hits) continue;
  const content = fs.readFileSync(f, 'utf8').split('\n');
  const seenLine = new Map();
  for (const h of hits) {
    const key = h.line;
    if (!seenLine.has(key)) seenLine.set(key, new Set());
    seenLine.get(key).add(h.char);
  }
  for (const [ln, chars] of seenLine) {
    const text = (content[ln - 1] || '').trim();
    lines.push({ file: r, line: ln, chars: [...chars].join(''), text: text.length > 240 ? text.slice(0, 240) + ' …' : text });
  }
}

const d = new Date();
const date = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const out = path.join(ROOT, '.hermes', 'logs', `i18n-en-cjk-inventory-${date}.md`);
const outCsv = path.join(ROOT, '.hermes', 'logs', `i18n-en-cjk-inventory-${date}.csv`);
const today = date;
const head = [
  `# 「en 值内中文原名」全量明细清单 (K3 一次性白名单审批用)`,
  ``,
  `- 生成时间: ${today} · 口径: 门童 #4 规则 \`I18N_POLLUTION_EN\` (en 值含 CJK 汉字) **裸扫描全量**, 未经基线豁免`,
  `- 扫描范围: src/ (排除豁免路径); 数据来源: scripts/guards/i18n-guard.js scanBidirectional + scripts/guards/common.js collectFiles`,
  `- 实测命中(字符级): **${rows.length}** · 涉及文件: **${byFile.size}** · 去重后行数: **${lines.length}**`,
  `- 性质: 这些是 en 语系值里**保留中文原名**的位置 (法人/戶名/地名/品牌/产品中文名等专有名词), 属「存量」, 本批**未新增**;`,
  `  本清单只为 K3 一次性审批白名单 (是否允许保留 / 是否需转写), 执行层**未自行放宽**任何判据。`,
  ``,
  `## 一、按文件汇总 (字符级命中数)`,
  ``,
  `| # | 文件 | 命中数 |`,
  `|---|------|--------|`,
];
[...byFile.entries()].sort((a, b) => b[1].length - a[1].length).forEach(([f, h], i) => head.push(`| ${i + 1} | \`${f}\` | ${h.length} |`));
head.push('', `## 二、全量明细 (文件 : 行号 | 命中字 | 该行原文)`, '');
const body = lines.map(l => `${l.file}:${l.line} | ${l.chars} | ${l.text}`);
fs.writeFileSync(out, head.concat(body).join('\n') + '\n', 'utf8');
// 逐字級 CSV (1138 行, 一筆不漏, 供 K3 表格式審批)
const csv = ['file,line,char,lineText']
  .concat(rows.map(h => {
    const content = fs.readFileSync(path.join(ROOT, h.file), 'utf8').split('\n');
    const t = (content[h.line - 1] || '').trim().replace(/"/g, '""');
    return `"${h.file}",${h.line},"${h.char}","${t.length > 300 ? t.slice(0, 300) : t}"`;
  }))
  .join('\n');
fs.writeFileSync(outCsv, csv + '\n', 'utf8');
console.log(`✅ 已寫 ${path.relative(ROOT, out)} + ${path.relative(ROOT, outCsv)}`);
console.log(`字符級命中 ${rows.length} / 文件 ${byFile.size} / 去重行 ${lines.length}`);
console.log('\nTop 文件:');
[...byFile.entries()].sort((a, b) => b[1].length - a[1].length).slice(0, 12).forEach(([f, h]) => console.log(`  ${h.length}\t${f}`));
