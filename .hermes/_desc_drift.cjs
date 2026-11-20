const fs = require('fs');
const cur = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const csv = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8');
const lines = csv.split('\n');
const csvRow = (slug) => lines.find(l => l.split('\t')[3] === slug);
const block = (t, k) => {
  const i = t.indexOf(`"${k}": {`);
  const j = t.indexOf('\n  "', i + 5);
  return t.slice(i, j > 0 ? j : t.length);
};
const desc = (blk, loc) => {
  const i = blk.indexOf(`"${loc}"`);
  const seg = blk.slice(i, i + 2500);
  const m = seg.match(/"description": "((?:[^"\\]|\\.)*)"/);
  return m ? m[1] : '';
};
for (const slug of ['mailer-boxes', 'kraft-paper-bags', 'gift-bags', 'rigid-boxes']) {
  const blk = block(cur, slug);
  const row = csvRow(slug).split('\t');
  console.log(`\n### ${slug}`);
  for (const [ci, loc] of [[11, 'zh-hk'], [12, 'en'], [13, 'ja']]) {
    const ts = desc(blk, loc);
    const cv = (row[ci] || '').replace(/\\"/g, '"');
    if (ts !== cv) {
      console.log(`  [${loc}] TS(${ts.length}): ${ts.slice(0, 110)}`);
      console.log(`        CSV(${cv.length}): ${cv.slice(0, 110)}`);
    }
  }
}
