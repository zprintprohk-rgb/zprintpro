// Second pass: fix remaining BRAND_DOUBLE adjacency in c4-r1 + generator source
const fs = require('fs');
const files = [
  'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11/s1-c4-perplexity-r1.md',
  'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11/_gen_s1.cjs',
];
let changed = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  s = s.replace(/智印港\s*ZPrintPro/g, '智印港 ＋ ZPrintPro').replace(/智印港\s*ZprintPro/g, '智印港 ＋ ZprintPro');
  if (s !== before) { fs.writeFileSync(f, s, 'utf8'); changed++; console.log('fixed', f); }
}
console.log('changed:', changed);
// final sweep
const d = 'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11';
let left = 0;
for (const f of fs.readdirSync(d)) {
  const s = fs.readFileSync(d + '/' + f, 'utf8');
  if (/智印港\s*ZPrint?Pro/.test(s)) { console.log('STILL', f); left++; }
}
console.log('remaining:', left);
