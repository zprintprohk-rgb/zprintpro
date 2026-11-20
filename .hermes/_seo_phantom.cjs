// .hermes/_seo_phantom.cjs — 定位幻影 "seo": { 2-space 块 + 15+ years en 分布
const fs = require('fs');
const path = require('path');
const REPO = process.cwd();
const t = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const lines = t.split(/\r?\n/);
lines.forEach((ln, i) => {
  if (/^  "seo": \{/.test(ln)) {
    console.log(`L${i + 1}: FOUND 2-space "seo": {`);
    console.log('  ctx-before:', lines.slice(Math.max(0, i - 3), i).join(' | ').slice(0, 200));
    console.log('  ctx-after :', lines[i + 1]?.slice(0, 120));
  }
});
let idx = 0, n = 0;
while (n < 6) { const j = t.indexOf('15+ years', idx); if (j < 0) break; console.log('[15+ years] ...' + t.slice(Math.max(0, j - 60), j + 50).replace(/\s+/g, ' ') + '...'); idx = j + 1; n++; }
