// 取证小工具: 列出全部 SKU 的 imageAlt.<locale> (只读, 结构解析)
const fs = require('node:fs');
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const start = raw.indexOf('export const skuSeoData');
const braceStart = raw.indexOf('{', start);
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
  if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === quote) inStr = false; continue; }
  if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
  if (c === '{') depth++;
  else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
}
const data = new Function('return ' + raw.slice(braceStart, end + 1))();
const CJK = /[\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/;
const loc = process.argv[2] || 'ja';
let n = 0;
for (const slug of Object.keys(data)) {
  const v = (data[slug].imageAlt || {})[loc];
  if (!v) continue;
  const flag = loc !== 'zh-hk' && CJK.test(v) ? '🔴CJK' : (loc !== 'zh-hk' && v.includes('智印港') ? '🔴BRAND' : '  ');
  if (loc !== 'zh-hk' && (CJK.test(v) || v.includes('智印港'))) { n++; console.log(`${flag} [${slug}] ${v}`); }
}
console.log(`\n${loc} 段 CJK/错品牌命中: ${n} 处`);
