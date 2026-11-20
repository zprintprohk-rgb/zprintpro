// 一次性只读审计: 导出全量 title -> .hermes/_audit-titles.json
const fs = require('fs');
const { equiv, band } = require('../scripts/guards/title-equiv.js');
const txt = fs.readFileSync(__dirname + '/../src/data/sku-seo-data.ts', 'utf8');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map(m => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });
const out = [];
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  for (const loc of ['zh-hk', 'en', 'ja']) {
    const re = new RegExp('"' + loc + '": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"');
    const m = seg.match(re);
    const t = m ? m[1].replace(/\\"/g, '"') : null;
    out.push({ slug: starts[i].slug, locale: loc, title: t, equiv: t ? equiv(t) : null, band: t ? band(t) : null });
  }
}
fs.writeFileSync(__dirname + '/_audit-titles.json', JSON.stringify(out, null, 1));
console.log('slots:', out.length, 'missing:', out.filter(r => !r.title).length);
const bands = {}; out.forEach(r => { bands[r.band] = (bands[r.band] || 0) + 1; });
console.log('bands:', JSON.stringify(bands));
const sep = {}; out.forEach(r => { if (!r.title) return; const s = r.title.includes('｜') ? 'fullwidth' : (r.title.includes('|') ? 'half' : 'none'); sep[s] = (sep[s] || 0) + 1; });
console.log('separators:', JSON.stringify(sep));
