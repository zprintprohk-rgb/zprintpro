import fs from 'fs';
const lines = fs.readFileSync('src/lib/price-data.generated.ts', 'utf8').split('\n');
const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;
let slug = null, inBlock = null;
for (const l of lines) {
  const sm = l.match(slugRe); if (sm) { slug = sm[1]; inBlock = null; continue; }
  const bm = l.match(/^\s*"(productName|label)":\s*\{\s*$/); if (bm && slug) { inBlock = bm[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(l)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = l.match(locRe); if (!m) continue;
  if (inBlock === 'productName') console.log(slug + ' [' + m[1] + '] ' + m[2]);
}
