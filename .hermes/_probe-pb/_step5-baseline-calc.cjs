const path = require('path');
const fs = require('fs');
const ROOT = 'F:\\zprintpro-nextjs';
const common = require(path.join(ROOT, 'scripts', 'guards', 'common.js'));
const guard = require(path.join(ROOT, 'scripts', 'guards', 'i18n-guard.js'));
const base = guard.loadI18nBaseline();

const files = common.collectFiles('src', false);
const all = [];
for (const f of files) {
  let c; try { c = fs.readFileSync(f, 'utf-8'); } catch { continue; }
  for (const x of guard.scanBidirectional(c, f)) all.push(x);
}
const per = {}, nonLegacy = {}, legacyPer = {};
for (const h of all) {
  per[h.file] = (per[h.file] || 0) + 1;
  if (h.legacyRed) legacyPer[h.file] = (legacyPer[h.file] || 0) + 1;
  else nonLegacy[h.file] = (nonLegacy[h.file] || 0) + 1;
}
const keys = [...new Set([...Object.keys(base.perFile), ...Object.keys(per)])].sort();
console.log('file | baseline | measured | nonLegacy | delta(nonLegacy-baseline)');
let sumBase = 0, sumNon = 0;
for (const k of keys) {
  const b = base.perFile[k] || 0, m = per[k] || 0, n = nonLegacy[k] || 0;
  sumBase += b; sumNon += n;
  const d = n - b;
  if (d !== 0 || m) console.log(`${d === 0 ? '  ' : '★ '}${k} | ${b} | ${m} | ${n} | ${d > 0 ? '+' : ''}${d}`);
}
console.log(`\nΣbaseline=${sumBase}  ΣnonLegacy=${sumNon}  measuredTotal=${all.length}  legacy=${all.filter(h => h.legacyRed).length}`);
console.log('=> 新 total (Σ perFile) 应为', sumNon, '; 新 measuredTotal 应为', all.length);
const st = guard.baselineStatus(all);
console.log('excessTotal', st.excessTotal, 'remaining', st.remaining);
