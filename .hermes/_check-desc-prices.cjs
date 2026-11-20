const fs = require('fs');
const t = fs.readFileSync('src/data/products.ts', 'utf8');
for (const slug of ['same-day-flyers', 'small-batch-stickers', 'a2-posters', 'a1-posters', 'electronics-packaging-box', 'kraft-paper-packaging-box', 'premium-greeting-cards', 'matte-greeting-cards']) {
  const re = new RegExp(`slug: '${slug}',[\\s\\S]{0,2600}?features:`, '');
  const m = t.match(re);
  if (!m) { console.log(`--- ${slug}: NOT FOUND`); continue; }
  const seg = m[0];
  const prices = [...new Set([...seg.matchAll(/(?:HK\$|\$|¥)\s?\d+(?:\.\d+)?/g)].map((x) => x[0]))];
  const moqs = [...new Set([...seg.matchAll(/(\d+)\s*(?:張|本|個|份|件|枚|盒|冊|部|套|pcs|枚|セット|起)/g)].map((x) => x[1]))];
  console.log(`--- ${slug}: prices=[${prices.join(', ')}] moqs=[${moqs.join(', ')}]`);
}
