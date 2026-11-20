const fs = require('fs');
const txt = fs.readFileSync('F:/zprintpro-nextjs/src/data/sku-seo-data.ts', 'utf8');
const starts = [...txt.matchAll(/^(?: {2})?"([a-z0-9-]+)": \{/gm)].map((m) => ({ slug: m[1], idx: m.index }));
starts.push({ slug: '__END__', idx: txt.length });
const LOCALES = ['zh-hk', 'en', 'ja'];
const out = [];
for (let i = 0; i < starts.length - 1; i++) {
  const seg = txt.slice(starts[i].idx, starts[i + 1].idx);
  if (!seg.includes('"seo"')) continue;
  const slug = starts[i].slug;
  for (const loc of LOCALES) {
    const m = seg.match(new RegExp(`"${loc}": \\{\\s*"title": "((?:[^"\\\\]|\\\\.)*)"`));
    if (!m) continue;
    const t = m[1];
    const hits = [];
    if (/Free US Ship/i.test(t)) hits.push('Free US Ship');
    if (/最安|安い|激安/.test(t)) hits.push('最安/安い/激安');
    if (/ノベルティ 各種サイズ/.test(t)) hits.push('ノベルティ 各種サイズ');
    if (/品質保證|專業印刷|高品質/.test(t)) hits.push('空洞词');
    if (hits.length) out.push({ slug, locale: loc, title: t, hits });
  }
}
for (const r of out) console.log(`${r.slug}|${r.locale} [${r.hits.join(',')}] ${r.title}`);
console.log('total:', out.length);
