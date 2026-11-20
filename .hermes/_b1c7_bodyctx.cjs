// .hermes/_b1c7_bodyctx.cjs — 簇7 六 SKU body 病灶句上下文提取
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..');
const src = fs.readFileSync(path.join(REPO, 'src/data/sku-seo-data.ts'), 'utf8');
const SL = ['wall-calendars', 'desk-calendars', 'custom-calendars', 'mini-calendars', 'photo-frame-calendars', 'magnetic-calendars'];
for (const s of SL) {
  const i = src.indexOf(`"${s}": {`);
  const seg = src.slice(i, src.indexOf('\n  },', i));
  console.log(`\n===== ${s} =====`);
  for (const p of ['50 本', '100 MOQ', '50 MOQ', '7-10', '50-copy', '100-copy', '7-10 day']) {
    let idx = 0, n = 0;
    while (n < 4) {
      const j = seg.indexOf(p, idx);
      if (j < 0) break;
      console.log(`  [${p}] ...${seg.slice(Math.max(0, j - 70), j + 90).replace(/\s+/g, ' ')}...`);
      idx = j + 1; n++;
    }
  }
}
