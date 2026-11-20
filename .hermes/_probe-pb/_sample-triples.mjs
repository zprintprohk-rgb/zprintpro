// print representative triples (one per SKU / label family) for manual review
import fs from 'fs';
import { localizeAll, localizeNameAll } from '../../scripts/lib/price-label-i18n.mjs';

const src = fs.readFileSync('.hermes/_bak-pricedata-20260918/price-data.generated.ts.before', 'utf8');
const lines = src.split('\n');
const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const blockRe = /^\s*"(productName|label)":\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;
let slug = null, inBlock = null;
const seen = new Map(); // slug -> Set of raw
for (const l of lines) {
  const sm = l.match(slugRe); if (sm) { slug = sm[1]; inBlock = null; continue; }
  const bm = l.match(blockRe); if (bm && slug) { inBlock = bm[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(l)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = l.match(locRe); if (!m) continue;
  if (m[1] !== 'zh-hk') continue;
  const raw = m[2].replace(/\\"/g, '"');
  if (!seen.has(slug)) seen.set(slug, new Set());
  seen.get(slug).add(inBlock + '⟶' + raw);
}
for (const [slug, raws] of seen) {
  console.log('\n########## ' + slug + ' ##########');
  const arr = [...raws].slice(0, 3);
  for (const r of arr) {
    const kind = r.split('⟶')[0];
    const raw = r.slice(kind.length + 1);
    const out = localizeAll(raw);
    console.log(`  [${kind}] RAW: ${raw}`);
    console.log(`         hk: ${out['zh-hk']}`);
    console.log(`         en: ${out.en}`);
    console.log(`         ja: ${out.ja}`);
  }
  if (raws.size > 3) console.log(`  …(${slug} 另有 ${raws.size - 3} 條同型字串)`);
}
