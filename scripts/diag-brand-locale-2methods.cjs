// 分诊: BRAND_LOCALE_MISMATCH 门童口径 vs 结构解析口径 逐条比对
// 背景: 门童 brand-guard.js 报 BRAND_LOCALE_MISMATCH (真值 39, 2026-09-20 提交时),
//       而 scripts/audit-sku-locale.cjs (结构解析) 同类检查报 0 处 ⇒ 两口径不一致, 必须找出差异来源。
// 门童口径 (scripts/guards/common.js resolveLocale): 取「命中位置左侧最近一个 locale 键」当归属,
//       行内三元优先; 本机复刻该口径 + 输出逐条明细 + 与结构解析结果对照。
// 用法: node scripts/diag-brand-locale-2methods.cjs [scopeDir=src]
const path = require('node:path');
const fs = require('node:fs');
const common = require('./guards/common.js');
const brand = require('./guards/brand-guard.js');

const scope = process.argv[2] || 'src';
const files = common.collectFiles(scope, false);
console.log(`扫描范围: ${scope}/  文件数=${files.length}  (与门童 collectFiles 同源)`);

// 方法 A: 门童口径 (调 brand-guard 本体, 拿完整明细; 注意 hits 会被 MAX_HITS_PER_RULE 截断)
// ⚠️ brand.scan() 是 async ⇒ 必须 await (首版漏 await ⇒ "hits is not iterable", 当场拦下)
(async () => {
const hits = await brand.scan(files);
console.log(`\n─── 方法 A: 门童 brand-guard 口径 ───`);
console.log(`明细返回 ${hits.length} 条 (可能被 MAX_HITS_PER_RULE=${common.MAX_HITS_PER_RULE} 截断)`);
const byRule = {};
for (const h of hits) byRule[h.ruleId] = (byRule[h.ruleId] || 0) + 1;
console.log('命中规则分布: ' + Object.entries(byRule).map(([k, v]) => `${k}=${v}`).join(' | ') || '(无)');

// 真实计数 (门童内部 SCAN_STATS, 未截断)
if (common.SCAN_STATS) {
  const s = Array.isArray(common.SCAN_STATS) ? common.SCAN_STATS : Object.values(common.SCAN_STATS);
  console.log('未截断真值: ' + JSON.stringify(common.getScanStats ? common.getScanStats() : s).slice(0, 400));
}

const mismatch = hits.filter((h) => h.ruleId === 'BRAND_LOCALE_MISMATCH');
if (mismatch.length) {
  console.log(`\nBRAND_LOCALE_MISMATCH 明细 (${mismatch.length} 条):`);
  for (const h of mismatch.slice(0, 60)) console.log(`  ${h.file}:${h.line}  ${h.match}`);
} else {
  console.log('\nBRAND_LOCALE_MISMATCH 明细: 0 条 (本次扫描内无命中)');
}

// 方法 B: 结构解析口径 (仅 src/data/sku-seo-data.ts, 与 audit-sku-locale.cjs 同构)
console.log(`\n─── 方法 B: 结构解析口径 (sku-seo-data.ts) ───`);
const FILE = 'src/data/sku-seo-data.ts';
const raw = fs.readFileSync(FILE, 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();
let bCount = 0;
for (const slug of Object.keys(data)) {
  const e = data[slug];
  const fields = [];
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const s = e.seo?.[loc] || {};
    for (const f of ['title', 'description', 'h1', 'body']) if (s[f]) fields.push([loc, f, String(s[f])]);
    if (e.imageAlt?.[loc]) fields.push([loc, 'imageAlt', String(e.imageAlt[loc])]);
  }
  for (const [loc, f, v] of fields) {
    if (loc !== 'zh-hk' && v.includes('智印港')) { bCount++; console.log(`  🔴 [${slug}/${loc}/${f}] 含智印港`); }
    if (loc === 'zh-hk' && v.includes('ZprintPro')) { bCount++; console.log(`  🔴 [${slug}/${loc}/${f}] 含 ZprintPro`); }
  }
}
console.log(`方法 B 命中: ${bCount} 条`);

// 差异结论
const inSku = mismatch.filter((h) => h.file.includes('sku-seo-data.ts'));
console.log(`\n─── sku-seo-data.ts 逐条明细 (门童口径) ───`);
const rawLines = fs.readFileSync(FILE, 'utf8').split('\n');
let shown = 0;
for (const h of inSku) {
  shown++;
  const ln = rawLines[h.line - 1] || '';
  const i = ln.indexOf(h.match.split(' ')[0]);
  const ctx = i < 0 ? ln.slice(0, 160) : ln.slice(Math.max(0, i - 70), i + 70);
  console.log(`  #${shown} L${h.line}  ${h.match}\n        …${ctx.trim()}…`);
}
if (!inSku.length) console.log('  (0 条)');
console.log(`\n─── 差异定位 ───`);
console.log(`方法 A 总命中(明细) ${mismatch.length} 条, 其中落在 sku-seo-data.ts 的 ${inSku.length} 条`);
const otherFiles = [...new Set(mismatch.filter((h) => !h.file.includes('sku-seo-data.ts')).map((h) => h.file))];
console.log(`方法 A 落在其他文件的条目来自: ${otherFiles.length ? otherFiles.join(', ') : '(无)'}`);
if (inSku.length && bCount === 0) {
  console.log(`⇒ 结论: 至少 ${inSku.length} 条是**门童归属口径**与结构解析的差异 (同文件内), 需逐条人读定真假。`);
} else if (!inSku.length && mismatch.length) {
  console.log(`⇒ 结论: 差异**不在** sku-seo-data.ts, 而在以下文件: ${otherFiles.join(', ')}`);
} else if (!mismatch.length) {
  console.log(`⇒ 结论: 本次范围 (${scope}/) 内门童口径亦为 0 —— 门禁报的 39 处**不在此范围** (可能在 messages/ docs/ .hermes/ 等), 需扩大范围复算。`);
}
})().catch((e) => { console.error('🔴 分诊脚本异常:', e.message); process.exit(1); });
