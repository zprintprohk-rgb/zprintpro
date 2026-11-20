'use strict';
/** 只讀: dump products.ts 規格三欄 (material/printMethod/finishing) 唯一中文字串 + 使用次數 */
const fs = require('fs');
const P = 'F:\\zprintpro-nextjs\\src\\data\\products.ts';
const s = fs.readFileSync(P, 'utf8');
const CJK = /[\u3400-\u4dbf\u4e00-\u9fff]/;
const parts = s.split(/\n  \{\n/);
const fields = ['material', 'printMethod', 'finishing'];
const seen = new Map();
const byField = {};
for (const b of parts) {
  const slug = (b.match(/slug:\s*'([^']+)'/) || [])[1];
  if (!slug) continue;
  for (const f of fields) {
    const re = new RegExp('(?:^|[\\s,{])' + f + ':\\s*([\\x27\\x22\\x60])([\\s\\S]*?)\\1', 'm');
    const m = b.match(re);
    if (!m) continue;
    const v = m[2].trim();
    if (!CJK.test(v)) continue;
    if (!seen.has(v)) seen.set(v, { n: 0, field: f, slug });
    seen.get(v).n++;
    byField[f] = (byField[f] || 0) + 1;
  }
}
const out = [...seen.entries()].map(([k, meta]) => ({ v: k, n: meta.n, field: meta.field }));
fs.writeFileSync('F:\\zprintpro-nextjs\\.hermes\\_probe-pb\\_spec-strings.json', JSON.stringify(out, null, 1), 'utf8');
console.log('unique = ' + out.length + '  byField=' + JSON.stringify(byField));
out.forEach((o, i) => console.log(String(i + 1).padStart(3) + ' [' + o.field + '] x' + o.n + ' ' + o.v));
