// moq10-check-poster-content.mjs — 檢查 products-content.ts 內 poster 系 SKU 的 100 起印殘留
import fs from 'fs';

const s = fs.readFileSync('src/data/products-content.ts', 'utf-8');
const SLUGS = ['a1-posters', 'a2-posters', 'outdoor-posters', 'display-posters', 'art-posters', 'adhesive-posters', 'school-flyers', 'a4-flyers', 'a5-flyers'];

for (const slug of SLUGS) {
  const i = s.indexOf(`'${slug}': {`);
  if (i < 0) { console.log(`${slug}: 不在 products-content.ts`); continue; }
  const tail = s.slice(i + 10);
  const nx = tail.search(/\n {2}'[a-z0-9-]+': \{/);
  const blk = nx > 0 ? tail.slice(0, nx) : tail.slice(0, 60000);
  const hits = [...blk.matchAll(/100\s*張起印/g)];
  console.log(`\n${slug}: ${hits.length} 處`);
  const seen = new Set();
  for (const h of hits.slice(0, 3)) {
    const ctx = blk.slice(Math.max(0, h.index - 80), h.index + 70).replace(/\s+/g, ' ');
    if (seen.has(ctx)) continue;
    seen.add(ctx);
    console.log(`   …${ctx}…`);
  }
}
