import fs from 'node:fs';
const raw = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const strip = (s) => {
  let o = '', iS = false, e = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (e) { o += c; e = false; continue; }
    if (c === '\\' && iS) { o += c; e = true; continue; }
    if (c === '"') { iS = !iS; o += c; continue; }
    if (c === ',' && !iS) { let j = i + 1; while (j < s.length && /\s/.test(s[j])) j++; if (s[j] === '}' || s[j] === ']') continue; }
    o += c;
  }
  return o;
};
const start = raw.indexOf('export const skuSeoData');
const data = JSON.parse(strip(raw.slice(raw.indexOf('{', start), raw.lastIndexOf('};') + 1)));
const missing = [];
for (const [slug, e] of Object.entries(data)) for (const loc of ['zh-hk', 'en', 'ja']) {
  const d = e?.seo?.[loc];
  if (!d || !d.description) missing.push(slug + ' [' + loc + ']');
}
console.log('total keys:', Object.keys(data).length, '| slots with empty/missing description:', missing.length);
console.log(missing.join('\n'));
