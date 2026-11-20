// .hermes/_final_audit_1022.cjs — B1-B8 终态复算（双方法：h2 计数 + 字符计数）
const fs = require('fs');
const L = (f) => JSON.parse(fs.readFileSync(`src/data/blog-data/${f}.json`, 'utf8'));
const zh = L('zh-hk'), en = L('en'), ja = L('ja');
const SPEC = [
  ['B1', 'ja', 'new-year-card-printing-2027-guide'],
  ['B2', 'ja', 'comiket-printing-prep-guide'],
  ['B3', 'en', 'comiket-printing-prep-guide'],
  ['B4', 'zh-hk', 'cny-2027-red-packet-printing-guide'],
  ['B5', 'zh-hk', 'corporate-calendar-customization-2027'],
  ['B6', 'en', 'calendar-sizes-print-reference'],
  ['B7', 'en', 'corporate-holiday-cards-printing-guide'],
  ['B8', 'zh-hk', 'paper-bag-printing-guide'],
];
const M = { 'zh-hk': zh, en, ja };
let ok = 0, bad = 0;
for (const [id, loc, slug] of SPEC) {
  const p = M[loc][slug];
  if (!p) { console.log(`${id} MISSING`); bad++; continue; }
  const c = p.content || '';
  const h2 = (c.match(/<h2/g) || []).length;
  const txt = c.replace(/<[^>]+>/g, '').replace(/\s+/g, '');
  const links = new Set([...c.matchAll(/href="([^"]+)"/g)].map(m => m[1])).size;
  const qa = /快速答案|Quick Answer|クイック回答/.test(c);
  const pass = h2 >= 12 && links >= 5 && /(HK\$|¥|US\$)/.test(c);
  pass ? ok++ : bad++;
  console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${loc} h2=${h2} txt=${txt.length} links=${links} qa=${qa ? 'Y' : 'N'} date=${p.date}`);
}
console.log(`\n== ${ok} PASS / ${bad} FAIL ==`);
