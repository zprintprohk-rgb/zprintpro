// Replicate generator splice to dump and eval newText
const fs = require('fs');
const ROOT = 'F:/zprintpro-nextjs';
const tsText = fs.readFileSync(ROOT + '/src/data/sku-seo-data.ts', 'utf8');
const csvText = fs.readFileSync(ROOT + '/zprintpro-sku-seo-data.csv', 'utf8');

// minimal csvEntries (name/seo per lang) mirroring generator
const lines = csvText.split(/\r?\n/).filter((l) => l.trim());
const header = lines[0].split('\t');
const col = (n) => header.indexOf(n);
const C = { nameZh: col('产品名称(ZH)'), nameEn: col('产品名称(EN)'), nameJa: col('产品名称(JA)'), slug: col('Slug'),
  titleZh: col('SEO标题(ZH)'), titleEn: col('SEO标题(EN)'), titleJa: col('SEO标题(JA)'),
  descZh: col('SEO描述(ZH)'), descEn: col('SEO描述(EN)'), descJa: col('SEO描述(JA)'),
  h1Zh: col('H1标题(ZH)'), h1En: col('H1标题(EN)'), h1Ja: col('H1标题(JA)'),
  kwZh: col('SEO关键词(ZH)'), kwEn: col('SEO关键词(EN)'), kwJa: col('SEO关键词(JA)'),
  altZh: col('图片Alt标签(ZH)'), altEn: col('图片Alt标签(EN)'), altJa: col('图片Alt标签(JA)') };
const csvEntries = {};
for (let i = 1; i < lines.length; i++) {
  const row = lines[i].split('\t');
  const slug = row[C.slug];
  if (!slug) continue;
  const pick = (lang) => ({
    title: row[lang === 'zh-hk' ? C.titleZh : lang === 'en' ? C.titleEn : C.titleJa] ?? '',
    description: row[lang === 'zh-hk' ? C.descZh : lang === 'en' ? C.descEn : C.descJa] ?? '',
    h1: row[lang === 'zh-hk' ? C.h1Zh : lang === 'en' ? C.h1En : C.h1Ja] ?? '',
    keywords: (row[lang === 'zh-hk' ? C.kwZh : lang === 'en' ? C.kwEn : C.kwJa] ?? '').split(/[,，]/).map((s) => s.trim()).filter(Boolean),
  });
  csvEntries[slug] = {
    name: { 'zh-hk': row[C.nameZh] ?? '', en: row[C.nameEn] ?? '', ja: row[C.nameJa] ?? '' },
    seo: { 'zh-hk': pick('zh-hk'), en: pick('en'), ja: pick('ja') },
    imageAlt: { 'zh-hk': row[C.altZh] ?? '', en: row[C.altEn] ?? '', ja: row[C.altJa] ?? '' },
  };
}
function loadTsFromText(txt) {
  let t = txt.replace(/^import[^\n]*\n/m, '');
  t = t.replace(/export interface SkuSeoEntry \{[\s\S]*?\n\}\n/, '');
  t = t.replace(/export const skuSeoData: Record<string, SkuSeoEntry> =/, 'const skuSeoData =');
  t = t.split('export function getSkuSeo')[0].replace(/;\s*$/, '');
  const mod = { exports: {} };
  new Function('module', 'exports', t + '\nmodule.exports = skuSeoData;')(mod, mod.exports);
  return mod.exports;
}
const tsData = loadTsFromText(tsText);
const tsKeys = Object.keys(tsData);
const merged = {};
for (const slug of tsKeys) {
  const cur = tsData[slug];
  if (csvEntries[slug]) {
    const c = csvEntries[slug];
    merged[slug] = {
      name: c.name,
      seo: {
        'zh-hk': { ...c.seo['zh-hk'], body: cur.seo?.['zh-hk']?.body ?? '' },
        en: { ...c.seo.en, body: cur.seo?.en?.body ?? '' },
        ja: { ...c.seo.ja, body: cur.seo?.ja?.body ?? '' },
      },
      faqs: cur.faqs,
      imageAlt: c.imageAlt,
    };
  } else merged[slug] = cur;
}
const keyRe = /^(?: {2})?"([a-z0-9-]+)": \{/gm;
const anchors = [...tsText.matchAll(keyRe)].map((m) => ({ slug: m[1], idx: m.index, indent: m[0].match(/^ */)[0].length }));
anchors.push({ slug: '__END__', idx: tsText.indexOf('\n};') });
let newText = tsText;
for (let i = anchors.length - 2; i >= 0; i--) {
  const a = anchors[i];
  const end = anchors[i + 1].idx;
  if (!(a.slug in csvEntries)) continue;
  const indent = ' '.repeat(a.indent);
  const entryJson = JSON.stringify(merged[a.slug], null, 2)
    .replace(/"keywords": \[\n([\s\S]*?)\n(\s*)\]/g, (m, inner, pad) => {
      const items = inner.split('\n').map((l) => l.trim()).filter(Boolean).map((l) => l.replace(/,$/, ''));
      return '"keywords": [' + items.join(',') + ']';
    })
    .split('\n').map((l, j) => (j === 0 ? l : indent + l)).join('\n');
  newText = newText.slice(0, a.idx) + `${indent}"${a.slug}": ${entryJson},\n` + newText.slice(end);
}
fs.writeFileSync(ROOT + '/.hermes/_debug-newText.ts', newText);
try {
  const d = loadTsFromText(newText);
  console.log('REPLICA EVAL OK keys:', Object.keys(d).length);
} catch (e) {
  console.log('REPLICA ERR:', e.message);
  const lm = e.stack.match(/<anonymous>:(\d+)/);
  if (lm) {
    const ln = parseInt(lm[1]);
    const L = newText.split('\n');
    for (let i = Math.max(0, ln - 8); i < Math.min(L.length, ln + 2); i++)
      console.log((i + 1).toString() + (i + 1 === ln ? '>> ' : ': ') + L[i].slice(0, 150));
  }
}
