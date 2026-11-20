// .hermes/_b1c7_recon.cjs — 簇7 calendars 六 SKU products.ts 真值 + faqSchema + ts body 侦察
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const lines = fs.readFileSync(path.join(REPO, 'src/data/products.ts'), 'utf8').split(/\r?\n/);
const src = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const SL = ['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'];

for (const s of SL) {
  const st = lines.findIndex(l => l.includes(`slug: '${s}'`));
  let end = st, depth = 0, begun = false;
  for (let i = st; i < lines.length; i++) {
    for (const ch of lines[i]) { if (ch === '{') { depth++; begun = true; } if (ch === '}') depth--; }
    if (begun && depth <= 0) { end = i; break; }
  }
  const seg = lines.slice(st, end + 1);
  const hasFaq = seg.some(l => l.includes('faqSchema'));
  console.log(`\n===== ${s} L${st + 1}-${end + 1} faqSchema:${hasFaq ? 'YES' : 'NO'}`);
  seg.forEach(l => { if (l.includes('【')) console.log('  F:', l.trim().slice(0, 160)); });
  const faq = seg.find(l => l.includes('faqSchema'));
  if (faq) { const m = faq.match(/"question": "([^"]{0,70})/); if (m) console.log('  FAQ1:', m[1]); }
  const t = seg.find(l => l.includes('turnaround'));
  if (t) console.log('  T:', t.trim().slice(0, 120));
  // ts body 现值
  const bi = src.indexOf(`"${s}": {`);
  const bseg = src.slice(bi, bi + 4000);
  const mb = bseg.match(/"body": "((?:[^"\\]|\\.){0,140})/);
  console.log('  body[:140]:', mb ? mb[1] : '(none)');
  const mf = bseg.match(/"faqs": \[(.{0,80})/);
  console.log('  faqs:', mf ? mf[1].slice(0, 60) : '?');
}
