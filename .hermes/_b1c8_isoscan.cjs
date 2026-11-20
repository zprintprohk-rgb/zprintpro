// .hermes/_b1c8_isoscan.cjs — mailer 块 ISO 9001 残留定位
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
const t = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const i = t.indexOf('"mailer-boxes": {');
const blk = t.slice(i, t.indexOf('\n  },', i));
let idx = 0;
while (true) {
  const j = blk.indexOf('ISO 9001', idx);
  if (j < 0) break;
  console.log('...' + blk.slice(Math.max(0, j - 70), j + 70).replace(/\s+/g, ' ') + '...');
  idx = j + 1;
}
