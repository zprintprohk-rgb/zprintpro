const { execSync } = require('child_process');
const fs = require('fs');
const ROOT = 'F:/zprintpro-nextjs';
function parseTitles(src) {
  const out = {};
  const starts = [...src.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
  starts.push({ slug: '__END__', idx: src.length });
  for (let i = 0; i < starts.length - 1; i++) {
    const seg = src.slice(starts[i].idx, starts[i + 1].idx);
    if (!seg.includes('"seo"')) continue;
    for (const loc of ['zh-hk', 'en', 'ja']) {
      const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
      if (m) out[`${starts[i].slug}|${loc}`] = m[1].replace(/\\"/g, '"');
    }
  }
  return out;
}
const parent = parseTitles(execSync('git show 8267e8bf:src/data/sku-seo-data.ts', { cwd: ROOT, encoding: 'utf8', maxBuffer: 30 * 1024 * 1024 }));
const cur = parseTitles(fs.readFileSync(ROOT + '/src/data/sku-seo-data.ts', 'utf8'));
const changedKeys = new Set(Object.keys(cur).filter((k) => (parent[k] || '') !== cur[k]));
// K3 报告声称的 28 槽
const claimed = [
  'waterproof-stickers|zh-hk','transparent-stickers|zh-hk','removable-stickers|zh-hk','die-cut-stickers|zh-hk','security-stickers|zh-hk','fluorescent-stickers|zh-hk','a4-flyers|zh-hk','double-sided-flyers|zh-hk','folded-leaflets|zh-hk','same-day-flyers|zh-hk','custom-red-packets|zh-hk',
  'transparent-stickers|en','die-cut-stickers|en','security-stickers|en','fluorescent-stickers|en','small-batch-stickers|en','kraft-paper-bags|en','a5-flyers|en','exercise-books|en','textbooks|en','magnetic-calendars|en','pvc-menus|en','doujinshi-printing|en',
  'doujinshi-printing|ja','custom-red-packets|ja','perfect-bound-books|ja','kraft-paper-packaging-box|ja','catalog-printing|ja',
];
console.log('claimed:', claimed.length);
console.log('=== claimed but NOT changed (parent==cur):');
for (const k of claimed) if (!changedKeys.has(k)) {
  console.log(`  ${k}: parent="${parent[k]}" cur="${cur[k]}"`);
}
console.log('=== changed but NOT claimed:');
for (const k of changedKeys) if (!claimed.includes(k)) console.log('  ' + k);
