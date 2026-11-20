'use strict';
/** Step B-5: 补面后 15 处新命中的逐条定性 (真泄漏 vs 误报) —— 客户可见性逐条判定 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));

const FILES = ['blog-data/ja.json', 'category-seo-content.ts', 'products-content.ts', 'blog-data/zh-hk.json', 'blog-data/en.json',
  'blog-posts.ts', 'buying-guides.ts', 'pillar-content.ts', 'products.ts', 'sku-seo-data.ts']
  .map(f => path.join(REPO, 'src', 'data', f)).filter(f => fs.existsSync(f));

(async () => {
  let n = 0;
  const dump = [];
  for (const f of FILES) {
    const hits = await guard.scan([f]);
    if (!hits.length) continue;
    console.log(`\n########## ${path.basename(f)} — ${hits.length} 命中 ##########`);
    for (const h of hits) {
      n++;
      console.log(`\n[${n}] ${h.file}:${h.line}  field=${(h.fix.match(/\[(.*?)@/) || [])[1]}`);
      console.log(`    命中词: ${JSON.stringify(h.match)}`);
      // 打印该行上下文
      const lines = fs.readFileSync(f, 'utf8').split('\n');
      const L = lines[h.line - 1] || '';
      const idx = L.indexOf(h.match.trim());
      console.log(`    上下文: ${JSON.stringify(L.slice(Math.max(0, idx - 200), idx + 200))}`);
      dump.push({ file: h.file, line: h.line, match: h.match, field: (h.fix.match(/\[(.*?)@/) || [])[1] });
    }
  }
  console.log(`\n=== 合计 ${n} 处 ===`);
  fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB-new-hits-detail.json'), JSON.stringify(dump, null, 2), 'utf8');
  console.log('明细已落盘: .hermes/_probe-pb/stepB-new-hits-detail.json');
  process.exit(0);
})();
