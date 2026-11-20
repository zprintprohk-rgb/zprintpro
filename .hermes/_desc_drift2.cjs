// .hermes/_desc_drift2.cjs — 正确锚点比对 4 个漂移 slug
const fs = require('fs');
const cur = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const csvLines = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8').split('\n');
function seoDesc(blk, loc) {
  const si = blk.indexOf('"seo": {');
  if (si < 0) return '';
  const seg0 = blk.slice(si);
  const i = seg0.indexOf(`"${loc}": {`);
  const seg = seg0.slice(i, i + 2000);
  const m = seg.match(/"description": "((?:[^"\\]|\\.)*)"/);
  return m ? m[1].replace(/\\"/g, '"') : '';
}
for (const slug of ['mailer-boxes', 'kraft-paper-bags', 'gift-bags', 'rigid-boxes']) {
  const i = cur.indexOf(`"${slug}": {`);
  const blk = cur.slice(i, cur.indexOf('\n  "', i + 5));
  const row = csvLines.find(l => l.split('\t')[3] === slug).split('\t');
  console.log(`\n### ${slug}`);
  for (const [ci, loc] of [[11, 'zh-hk'], [12, 'en'], [13, 'ja']]) {
    const ts = seoDesc(blk, loc);
    const cv = (row[ci] || '').replace(/\\"/g, '"');
    console.log(`  [${loc}] ${ts === cv ? 'SAME' : 'DIFF'}`);
    if (ts !== cv) {
      console.log(`    TS : ${ts.slice(0, 120)}`);
      console.log(`    CSV: ${cv.slice(0, 120)}`);
    }
  }
}
