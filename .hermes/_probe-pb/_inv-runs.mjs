// list every maximal CJK run across all raw label/productName strings
import fs from 'fs';
const P = 'src/lib/price-data.generated.ts';
const lines = fs.readFileSync(P, 'utf8').split('\n');
const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const blockRe = /^\s*"(productName|label)":\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;
let slug = null, inBlock = null;
const raws = new Set();
for (const line of lines) {
  const sm = line.match(slugRe); if (sm) { slug = sm[1]; inBlock = null; continue; }
  const bm = line.match(blockRe); if (bm && slug) { inBlock = bm[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(line)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = line.match(locRe); if (!m) continue;
  if (m[1] === 'zh-hk') raws.add(m[2].replace(/\\"/g, '"'));
}
// maximal CJK runs
const runs = new Map();
for (const r of raws) {
  for (const m of r.matchAll(/[\u3400-\u4dbf\u4e00-\u9fff\u3000-\u303f\uff00-\uffef]+/g)) {
    // split fullwidth punctuation out
    for (const piece of m[0].split(/[（）()・·【】\[\]，,、\uff0f\/]/)) {
      if (!piece) continue;
      if (!/[\u4e00-\u9fff]/.test(piece)) continue;
      runs.set(piece, (runs.get(piece) || 0) + 1);
    }
  }
}
const list = [...runs.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
console.log('unique CJK runs: ' + list.length + '\n');
for (const [k, n] of list) console.log(String(n).padStart(3) + '  ' + k);
