// 取证: 列出某 locale 段里「实为 zh-hk 中文句」的 imageAlt (只读, 结构解析)
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
const loc = process.argv[2] || 'ja';
// zh-hk 专用信号: 繁体专用字 / 港式中文虚词 / 与 zh-hk 同段完全相同
const HK_ONLY = /[學國說這裡來發藥體讀寫讓變轉邊關隨靜驗髮鬥黃點齊應對會為個張訂製我們支持可以模式]/;
for (const slug of Object.keys(data)) {
  const v = (data[slug].imageAlt || {})[loc];
  if (!v) continue;
  const hk = (data[slug].imageAlt || {})['zh-hk'];
  const same = v === hk;
  const hasKana = /[\u3040-\u309F\u30A0-\u30FF]/.test(v);
  if (same) console.log(`🔴 与 zh-hk 完全相同  [${slug}] ${JSON.stringify(v)}`);
  else if (!hasKana && HK_ONLY.test(v)) console.log(`🟠 无假名且含繁体字  [${slug}] ${JSON.stringify(v)}`);
}
