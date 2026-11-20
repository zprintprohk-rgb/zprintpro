// .hermes/_hub_links_ctx.cjs
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const pc = s.indexOf('packagingContent');
const zh = s.indexOf("'zh-hk': {", pc);
const blk = s.slice(zh, zh + 12000);
for (const key of ['white-card-boxes', 'gang-run-card-boxes']) {
  const i = blk.indexOf(key);
  console.log(`\n[${key}] @${i}`);
  console.log(JSON.stringify(blk.slice(Math.max(0, i - 420), i + 120)));
}
