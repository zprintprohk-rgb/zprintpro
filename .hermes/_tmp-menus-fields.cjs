// 取证 (§0.23.2 闸门1: 先 dump 真实样本): 列出 menus 6 SKU 全部客户可见字段 + 数字型起订量声称
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
// 起订量声称模式 (中/日/英)
const QTY = /(\d+)\s*(張|张|份|本|個|个|枚|冊|册|套|起印|起訂|起订|セット|枚〜|冊〜|個〜|MOQ|MOQ\.|minimum order of|minimum of|起)/gi;
const NUM = /(HK\$|US\$|NT\$|¥|￥|\$)\s?\d+(?:[.,]\d+)?(?:\s?[-–〜~]\s?\$?\d+(?:[.,]\d+)?)?/g;

for (const slug of slugs) {
  const e = data[slug];
  console.log(`\n════════ ${slug} ════════`);
  for (const loc of LOCALES) {
    const s = e.seo?.[loc] || {};
    console.log(`-- ${loc} --`);
    for (const f of ['title', 'description', 'h1']) {
      if (!s[f]) continue;
      const q = [...String(s[f]).matchAll(QTY)].map((m) => m[0]);
      console.log(`  ${f}${q.length ? ' [起订声称: ' + q.join(' | ') + ']' : ''}: ${String(s[f]).slice(0, 200)}`);
    }
    if (s.body) {
      const q = [...s.body.matchAll(QTY)].map((m) => m[0]);
      const p = [...s.body.matchAll(NUM)].map((m) => m[0]);
      console.log(`  body 长度=${s.body.length} 起订声称=[${[...new Set(q)].join(' | ')}] 价格=[${[...new Set(p)].join(' | ')}]`);
    }
  }
  if (e.faqs) console.log(`  faqs: ${e.faqs.length} 组`);
}
