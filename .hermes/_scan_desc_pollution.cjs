// .hermes/_scan_desc_pollution.cjs — 扫 sku-seo-data.ts：en/ja description 含 CJK 的 slug
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const slugs = [...t.matchAll(/^  "([a-z0-9-]+)": \{/gm)].map(m => ({ s: m[1], o: m.index }));
const cjk = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length;
const desc = (blk, loc) => {
  const i = blk.indexOf(`"${loc}"`);
  const seg = blk.slice(i, i + 2500);
  const m = seg.match(/"description": "((?:[^"\\]|\\.)*)"/);
  return m ? m[1] : '';
};
const bad = { en: [], ja: [] };
for (let i = 0; i < slugs.length; i++) {
  const blk = t.slice(slugs[i].o, slugs[i + 1] ? slugs[i + 1].o : t.length);
  for (const loc of ['en', 'ja']) {
    const d = desc(blk, loc);
    if (!d) continue;
    const n = cjk(d);
    if (n / d.length > 0.3) bad[loc].push({ s: slugs[i].s, ratio: (n / d.length).toFixed(2), n, len: d.length });
  }
}
for (const loc of ['en', 'ja']) {
  console.log(`\n=== ${loc}: ${bad[loc].length} polluted`);
  bad[loc].forEach(x => console.log(`  ${x.s} cjk=${x.n}/${x.len} (${x.ratio})`));
}
