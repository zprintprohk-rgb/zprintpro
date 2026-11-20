// audit the i18n dictionary coverage against every raw string currently in price-data.generated.ts
import fs from 'fs';
import { localize, isCleanFor } from '../../scripts/lib/price-label-i18n.mjs';

const src = fs.readFileSync(process.argv[2] || '.hermes/_bak-pricedata-20260918/price-data.generated.ts.before', 'utf8');
const lines = src.split('\n');
const slugRe = /^\s{2}'([^']+)':\s*\{\s*$/;
const blockRe = /^\s*"(productName|label)":\s*\{\s*$/;
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;

const raws = new Set();
let slug = null, inBlock = null;
for (const l of lines) {
  const sm = l.match(slugRe); if (sm) { slug = sm[1]; inBlock = null; continue; }
  const bm = l.match(blockRe); if (bm && slug) { inBlock = bm[1]; continue; }
  if (inBlock && /^\s*\},?\s*$/.test(l)) { inBlock = null; continue; }
  if (!inBlock || !slug) continue;
  const m = l.match(locRe); if (!m) continue;
  if (m[1] === 'zh-hk') raws.add(m[2].replace(/\\"/g, '"'));
}

const sink = { unresolved: new Set(), unknownTerms: new Set() };
const issues = [];
const outs = { 'zh-hk': [], en: [], ja: [] };
for (const raw of raws) {
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const out = localize(raw, loc, sink);
    outs[loc].push(out);
    if (!isCleanFor(out, loc)) issues.push(`[${loc}] 語系乾淨度不合格: ${out}`);
    if (loc === 'en' && /[\u3400-\u4dbf\u4e00-\u9fff\u3040-\u30ff]/.test(out)) issues.push(`[en] 殘留 CJK: ${out}`);
    if (loc === 'ja' && /[\u4e00-\u9fff]/.test(out) && !/[\u3040-\u30ff]/.test(out)) issues.push(`[ja] 零假名漢字串: ${out}`);
  }
}

console.log('原始字串 (unique zh-hk) : ' + raws.size);
console.log('未收錄零件 (unresolved)  : ' + sink.unresolved.size);
[...sink.unresolved].sort().forEach(s => console.log('   ! ' + s));
console.log('語系乾淨度問題           : ' + issues.length);
issues.slice(0, 30).forEach(s => console.log('   ✗ ' + s));

// C 類殘餘檢查: ja 有漢字但零假名
const cHits = outs.ja.filter(v => /[\u4e00-\u9fff]/.test(v) && !/[\u3040-\u30ff]/.test(v));
console.log('\nja 零假名殘餘 (C 類): ' + cHits.length);

console.log('\n--- 抽樣 12 條三語輸出 ---');
[...raws].slice(0, 12).forEach(r => {
  console.log('RAW  : ' + r);
  console.log('  hk : ' + localize(r, 'zh-hk'));
  console.log('  en : ' + localize(r, 'en'));
  console.log('  ja : ' + localize(r, 'ja'));
});
process.exit(sink.unresolved.size === 0 && issues.length === 0 ? 0 : 1);
