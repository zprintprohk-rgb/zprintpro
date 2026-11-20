// inventory raw (zh-hk == raw) label / productName strings in generated price data
import fs from 'fs';
const P = 'src/lib/price-data.generated.ts';
const s = fs.readFileSync(P, 'utf8');
const lines = s.split('\n');

const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const blockRe = /^\s*"(productName|label)":\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;

let slug = null, inBlock = null;
const out = {};   // slug -> { productName: Set, labels: Set }
const allNames = new Set(), allLabels = new Set(), allEn = new Set(), allJa = new Set();

for (const line of lines) {
  const sm = line.match(slugRe);
  if (sm) { slug = sm[1]; inBlock = null; out[slug] = out[slug] || { productName: new Set(), labels: new Set() }; continue; }
  const bm = line.match(blockRe);
  if (bm && slug) { inBlock = bm[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(line)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = line.match(locRe);
  if (!m) continue;
  const v = m[2].replace(/\\"/g, '"');
  if (m[1] === 'zh-hk') {
    if (inBlock === 'productName') { out[slug].productName.add(v); allNames.add(v); }
    else { out[slug].labels.add(v); allLabels.add(v); }
  } else if (m[1] === 'en') allEn.add(v);
  else if (m[1] === 'ja') allJa.add(v);
}

console.log('=== unique productName (raw/zh-hk) : ' + allNames.size + ' ===');
[...allNames].sort().forEach(v => console.log('  ' + v));
console.log('\n=== unique label (raw/zh-hk) : ' + allLabels.size + ' ===');
[...allLabels].sort().forEach(v => console.log('  ' + v));
console.log('\n=== per-slug counts ===');
for (const [k, v] of Object.entries(out)) console.log('  ' + k + '  names=' + v.productName.size + '  labels=' + v.labels.size);
console.log('\n=== unique en values currently : ' + allEn.size + ' ===');
console.log('=== unique ja values currently : ' + allJa.size + ' ===');
