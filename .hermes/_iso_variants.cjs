// .hermes/_iso_variants.cjs — 列出全部残余 ISO 9001 上下文 (ts + csv)
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
for (const [label, fp] of [['ts', 'src/data/sku-seo-data.ts'], ['csv', 'zprintpro-sku-seo-data.csv']]) {
  const t = fs.readFileSync(path.join(REPO, fp), 'utf8');
  let idx = 0, n = 0;
  while (n < 20) {
    const j = t.indexOf('ISO 9001', idx);
    if (j < 0) break;
    console.log(`[${label}] ...${t.slice(Math.max(0, j - 50), j + 60).replace(/\s+/g, ' ')}...`);
    idx = j + 1; n++;
  }
}
