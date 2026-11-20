// .hermes/_b1c8_truth.cjs — 簇8 十一 SKU 真值 + 病灶上下文
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const L = fs.readFileSync(path.join(REPO, 'src/data/products.ts'), 'utf8').split(/\r?\n/);
const SL = ['cosmetic-boxes', 'mailer-boxes', 'rigid-boxes', 'magnetic-closure-gift-box', 'electronics-packaging-box', 'kraft-paper-packaging-box', 'gang-run-card-boxes', 'white-card-boxes', 'corrugated-boxes', 'tuck-end-boxes', 'outdoor-posters'];
for (const s of SL) {
  const i = L.findIndex(l => l === `    slug: '${s}',`);
  if (i < 0) { console.log(s + ': NOT FOUND'); continue; }
  let end = L.length;
  for (let k = i + 1; k < L.length; k++) {
    if (L[k].startsWith("    slug: '") || L[k] === '  ],' || L[k] === '  ]') { end = k; break; }
  }
  const seg = L.slice(i, end).join('\n');
  const g = (re) => { const m = seg.match(re); return m ? m[1] : '?'; };
  console.log(`${s} | ${g(/name: '([^']{0,44})/)} | minQ ${g(/minQuantity: (\d+)/)} | ${g(/price_range: '([^']{0,22})/)} | base ${g(/basePrice: ([\d.]+)/)} | en ${g(/basePrice_en: ([\d.]+)/)} | ja ${g(/basePrice_ja: ([\d.]+)/)} | faqL${(() => { const f = seg.findIndex !== undefined ? '' : ''; const idx = seg.split('\n').findIndex(l => l.startsWith('    faqSchema: ')); return idx >= 0 ? i + idx + 1 : '-'; })()}`);
}
// outdoor-posters ts body 100 MOQ 上下文
const src = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const oi = src.indexOf('"outdoor-posters": {');
const oseg = src.slice(oi, src.indexOf('\n  },', oi));
let idx = 0;
while (true) { const j = oseg.indexOf('100 MOQ', idx); if (j < 0) break; console.log('\n[outdoor 100MOQ] ...' + oseg.slice(Math.max(0, j - 100), j + 100).replace(/\s+/g, ' ') + '...'); idx = j + 1; }
// mailer-boxes 三语 body 首 100 字
const mi = src.indexOf('"mailer-boxes": {');
const mseg = src.slice(mi, src.indexOf('\n  },', mi));
for (const loc of ['zh-hk', 'en', 'ja']) {
  const li = mseg.indexOf(`"${loc}": {`);
  const lseg = mseg.slice(li, mseg.indexOf('\n      },', li));
  const m = lseg.match(/"body": "((?:[^"\\]|\\.){0,110})/);
  console.log(`\n[mailer ${loc} body] ${m ? m[1] : '(none)'}`);
}
