// moq10-inspect-a1.mjs — 確認 a1-posters 是否已進 generated, 並讀取其價階
import fs from 'fs';

const gen = fs.readFileSync('src/lib/price-data.generated.ts', 'utf-8');
const mapI = gen.indexOf('PRICE_TABLE_MAP');
const mapSeg = gen.slice(mapI, gen.indexOf('export function getPriceTableForSlug'));
for (const slug of ['a1-posters', 'a2-posters']) {
  const k = mapSeg.indexOf(`'${slug}': {`);
  console.log(`${slug}: in PRICE_TABLE_MAP = ${k >= 0}`);
}
const anchorI = gen.indexOf('UNIT_PRICE_ANCHORS');
const anchorSeg = gen.slice(anchorI, anchorI + 4200);
for (const slug of ['a1-posters', 'a2-posters']) {
  const k = anchorSeg.indexOf(`'${slug}': {`);
  if (k < 0) { console.log(`${slug}: NO ANCHOR`); continue; }
  console.log(`${slug} anchor: ${anchorSeg.slice(k, anchorSeg.indexOf('},', k) + 2).replace(/\s+/g, ' ')}`);
}

console.log('\n=== posters.json A1 configs 全階 ===');
const p = JSON.parse(fs.readFileSync('src/data/price-tables/posters.json', 'utf-8'));
for (const idx of [12, 13]) {
  const c = p.configs[idx];
  console.log(`config[${idx}] ${String(c.config).slice(0, 60)}`);
  console.log('   ' + c.tiers.map((t) => `${t.qty}→${t.sell_hkd ?? t.price}${t.eprint_hkd ? '(e' + t.eprint_hkd + ')' : ''}`).join('  '));
  console.log('   tier keys: ' + Object.keys(c.tiers[0]).join(',') + ' | src=' + (c.tiers[0].src || '-'));
}

console.log('\n=== a2-posters 生成後價階 (對照) ===');
const k2 = mapSeg.indexOf("'a2-posters': {");
let i2 = mapSeg.indexOf('{', k2), d = 0, e2 = -1;
for (let j = i2; j < mapSeg.length; j++) {
  if (mapSeg[j] === '{') d++; else if (mapSeg[j] === '}') { d--; if (d === 0) { e2 = j; break; } }
}
const b2 = mapSeg.slice(i2, e2 + 1);
const t2 = [...b2.matchAll(/"qty": (\d+),\s*\n\s*"priceHKD": (\d+)/g)].map((x) => `${x[1]}→${x[2]}`);
console.log('   ' + t2.slice(0, 12).join('  '));
