// 取证: 列出 (a) ja description 含「智印港」的完整串 (b) 全部 imageAlt.<locale> (只读, 结构解析)
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++; else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();
const mode = process.argv[2] || 'brand';
if (mode === 'brand') {
  for (const slug of Object.keys(data)) {
    const d = (data[slug].seo?.ja || {}).description;
    if (d && d.includes('智印港')) console.log(`[${slug}]\n  ${JSON.stringify(d)}\n`);
  }
} else {
  const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
  const loc = process.argv[3] || 'ja';
  for (const slug of Object.keys(data)) {
    const v = (data[slug].imageAlt || {})[loc];
    if (!v) continue;
    const bad = (loc !== 'zh-hk' && (CJK.test(v) || v.includes('智印港')));
    if (bad) console.log(`🔴 [${slug}] ${JSON.stringify(v)}`);
  }
}
