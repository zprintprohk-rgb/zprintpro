// .hermes/_b1c9_pt.cjs — products.ts 病灶逐 SKU 归属
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
const L = fs.readFileSync(path.join(REPO, 'src/data/products.ts'), 'utf8').split(/\r?\n/);
const marks = [];
L.forEach((ln, i) => { const m = ln.match(/^    slug: '([a-z0-9-]+)',$/); if (m) marks.push({ slug: m[1], line: i }); });
for (let k = 0; k < marks.length; k++) marks[k].end = k + 1 < marks.length ? marks[k + 1].line : L.length;
for (const mk of marks) {
  const seg = L.slice(mk.line, mk.end).join('\n');
  const m = seg.match(/minQuantity: (\d+)/);
  mk.minQ = m ? +m[1] : null;
}
const PATTERNS = ['10 張起印', '100 MOQ', '100-MOQ', '50-MOQ', 'ISO 9001', '15+ 年', '15+ years', 'SGS'];
let tot = 0;
for (const mk of marks) {
  const seg = L.slice(mk.line, mk.end).join('\n');
  const hits = [];
  for (const p of PATTERNS) {
    let c = 0, pos = 0;
    while (true) { const j = seg.indexOf(p, pos); if (j < 0) break; c++; pos = j + 1; }
    if (c) hits.push(`${p} x${c}`);
  }
  if (hits.length) { tot++; console.log(`${mk.slug} (minQ=${mk.minQ}): ${hits.join(' | ')}`); }
}
console.log('blocks-with-lesions:', tot);
