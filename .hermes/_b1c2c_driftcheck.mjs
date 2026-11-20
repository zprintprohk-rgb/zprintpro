// Replicate csv-to-sku-seo.mjs tsBlockTitles exactly and inspect matches for the 4 slugs.
import fs from 'node:fs';
const tsText = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
function tsBlockTitles(slug) {
  const i = tsText.indexOf(`"${slug}": {`);
  if (i < 0) return null;
  const j = tsText.indexOf('\n  "', i + 4);
  const seg = tsText.slice(i, j > 0 ? j : tsText.length);
  return [...seg.matchAll(/"title":\s*"((?:[^"\\]|\\.)*)"/g)].map((m) => m[1]).slice(0, 3);
}
for (const slug of ['cartoon-red-packets', 'eco-red-packets', 'large-red-packets', 'embossed-red-packets']) {
  const t = tsBlockTitles(slug);
  console.log('===', slug, 'segStart=', tsText.indexOf(`"${slug}": {`));
  t.forEach((x, k) => console.log('  t' + k, 'len', x.length, JSON.stringify(x)));
}
