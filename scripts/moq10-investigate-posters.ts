// moq10-investigate-posters.ts — 查海報類 SKU 的真實尺寸/門檻, 為子品類細分提供依據
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const src = fs.readFileSync(path.join(ROOT, 'src/data/products.ts'), 'utf-8');
const anchors = [...src.matchAll(/\n {4}slug: '([^']+)'/g)].map((m) => ({ slug: m[1], at: m.index }));

console.log('=== posters category 全部 SKU ===');
for (let i = 0; i < anchors.length; i++) {
  const end = i + 1 < anchors.length ? anchors[i + 1].at : src.length;
  const b = src.slice(anchors[i].at, end);
  const cat = (b.match(/category_slug:\s*'([^']+)'/) || [])[1];
  if (cat !== 'posters') continue;
  const mq = (b.match(/minQuantity:\s*(\d+)/) || [])[1];
  const pr = (b.match(/price_range:\s*'([^']*)'/) || [])[1];
  const qs = b.match(/quantities:\s*\[([\s\S]*?)\]/);
  const q0 = qs ? (qs[1].match(/value:\s*(\d+)/) || [])[1] : 'NO-BLOCK';
  console.log(`  ${anchors[i].slug.padEnd(20)} minQ=${String(mq).padEnd(5)} qty0=${String(q0).padEnd(8)} price_range=${pr}`);
}

console.log('\n=== posters.json 全部 config (尺寸/材質) ===');
const p = JSON.parse(fs.readFileSync(path.join(ROOT, 'src/data/price-tables/posters.json'), 'utf-8'));
if (p.configs) {
  p.configs.forEach((c: any, i: number) => {
    const tiers = c.tiers.map((t: any) => t.qty);
    const first = c.tiers[0];
    console.log(`  [${i}] ${String(c.config).slice(0, 62)}`);
    console.log(`      qty=${tiers.slice(0, 8).join(',')} | first=${first.sell_hkd ?? first.price} src=${first.src ?? '-'}`);
  });
}

console.log('\n=== PRICE_TABLE_MAP 內的海報 slug ===');
const gen = fs.readFileSync(path.join(ROOT, 'src/lib/price-data.generated.ts'), 'utf-8');
const mapI = gen.indexOf('PRICE_TABLE_MAP');
const mapSeg = gen.slice(mapI, gen.indexOf('export function getPriceTableForSlug'));
for (const s of ['a1-posters', 'a2-posters', 'outdoor-posters', 'display-posters', 'art-posters', 'adhesive-posters']) {
  console.log(`  ${s.padEnd(20)} in map = ${mapSeg.includes(`'${s}': {`)}`);
}
