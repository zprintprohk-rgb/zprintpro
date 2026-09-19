// moq10-verify-a1-generated.mjs — 用括號配對精準驗證 a1-posters 的生成結果
import fs from 'fs';

const gen = fs.readFileSync('src/lib/price-data.generated.ts', 'utf-8');
const readBlock = (src, key) => {
  const k = src.indexOf(key);
  if (k < 0) return null;
  let i = src.indexOf('{', k);
  let d = 0;
  for (let j = i; j < src.length; j++) {
    if (src[j] === '{') d++;
    else if (src[j] === '}') { d--; if (d === 0) return src.slice(i, j + 1); }
  }
  return null;
};

for (const slug of ['a1-posters', 'a2-posters']) {
  const b = readBlock(gen, `'${slug}': {`);
  if (!b) { console.log(`${slug}: NOT FOUND`); continue; }
  const tiers = [...b.matchAll(/"qty": (\d+),\s*\n\s*"priceHKD": (\d+),\s*\n\s*"priceUSD": (\d+),\s*\n\s*"priceJPY": (\d+)/g)]
    .map((x) => ({ qty: +x[1], hkd: +x[2], usd: +x[3], jpy: +x[4] }));
  const cfgCount = (b.match(/"label":/g) || []).length;
  console.log(`--- ${slug} (configs≈${cfgCount}) ---`);
  console.log('   ' + tiers.slice(0, 10).map((t) => `${t.qty}→HK$${t.hkd}`).join('  '));
}

console.log('\n=== UNIT_PRICE_ANCHORS ===');
const ai = gen.indexOf('UNIT_PRICE_ANCHORS');
const aSeg = gen.slice(ai);
for (const slug of ['a1-posters', 'a2-posters']) {
  const k = aSeg.indexOf(`'${slug}': {`);
  if (k < 0) { console.log(`${slug}: NO ANCHOR ❌`); continue; }
  const seg = aSeg.slice(k, aSeg.indexOf("\n  },\n", k) + 6);
  console.log(`${slug}: ${seg.replace(/\s+/g, ' ').slice(0, 200)}`);
}
