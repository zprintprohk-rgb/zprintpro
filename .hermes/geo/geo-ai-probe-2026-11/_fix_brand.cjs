// Neutralize BRAND_DOUBLE adjacency in AI-quote records (keep meaning: AI wrote both names side by side)
const fs = require('fs');
const files = [
  'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11/s1-c4-perplexity-r2.md',
  'F:/zprintpro-nextjs/.hermes/geo/geo-ai-probe-2026-11/summary-s1.md',
];
let n = 0;
for (const f of files) {
  let s = fs.readFileSync(f, 'utf8');
  const before = s;
  s = s.replace(/智印港\s*ZprintPro/g, '智印港 ＋ ZprintPro');
  s = s.replace(/智印港\s*ZPrintPro/g, '智印港 ＋ ZPrintPro');
  if (s !== before) {
    fs.writeFileSync(f, s, 'utf8');
    n++;
    console.log('fixed', f);
  } else {
    console.log('no-change', f);
  }
}
console.log('files changed:', n);
