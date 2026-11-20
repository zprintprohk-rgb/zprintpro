// 取证: 逐条 dump menus 6 SKU 的「起订量数字声称」上下文 (含 body / description / faqs / h1)
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
const slugs = Object.keys(data).filter((s) => /menu/i.test(s));
const LOCALES = ['zh-hk', 'en', 'ja'];
// 只要「数字 + 起订量单位/词」形态
const PAT = /.{0,28}(?:\d+\s*(?:張|张|份|本|個|个|枚|冊|册|MOQ|-\s?MOQ)|minimum order of \d+|最小注文[^\s。]{0,8}\d+|起訂量為\s*\d+|起訂量\s*\d+|minimum of \d+).{0,34}/g;

const rows = [];
for (const slug of slugs) {
  const e = data[slug];
  for (const loc of LOCALES) {
    const s = e.seo?.[loc] || {};
    for (const f of ['title', 'description', 'h1', 'body']) {
      if (!s[f]) continue;
      for (const m of String(s[f]).matchAll(PAT)) rows.push({ slug, loc, f, ctx: m[0].replace(/\s+/g, ' ').trim() });
    }
  }
  (e.faqs || []).forEach((q, i) => {
    for (const k of ['q', 'a']) {
      if (!q[k]) continue;
      for (const m of String(q[k]).matchAll(PAT)) rows.push({ slug, loc: 'faq', f: `faqs[${i}].${k}`, ctx: m[0].replace(/\s+/g, ' ').trim() });
    }
  });
}
for (const r of rows) console.log(`[${r.slug} | ${r.loc} | ${r.f}]\n    …${r.ctx}…`);
console.log(`\n合计 ${rows.length} 条「起订量数字声称」上下文`);
