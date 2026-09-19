// moq10-verify-anchors.mjs — 驗證 UNIT_PRICE_ANCHORS 語意 (priceDisplay=最低單價, qty/batchPrice=起批檔)
import fs from 'fs';

const gen = fs.readFileSync('src/lib/price-data.generated.ts', 'utf-8');
const i = gen.indexOf('UNIT_PRICE_ANCHORS');
const seg = gen.slice(i, i + 6000);

const re = /'([a-z0-9-]+)': \{\s*\n\s*'zh-hk': \{ priceDisplay: '([^']+)', qty: (\d+), batchPrice: (\d+), unitLabel: '([^']+)' \}/g;
let m;
console.log('slug'.padEnd(26) + 'unitPrice'.padEnd(12) + '起批qty'.padEnd(10) + '起批整批價');
console.log('-'.repeat(64));
while ((m = re.exec(seg))) {
  console.log(m[1].padEnd(26) + m[2].padEnd(12) + m[3].padEnd(10) + m[4]);
}

// 交叉驗證: 起批檔的整批價是否等於 PRICE_TABLE_MAP 中同 qty 的 priceHKD
let bad = 0;
const mapSeg = gen.slice(gen.indexOf('PRICE_TABLE_MAP'), gen.indexOf('export function getPriceTableForSlug'));
re.lastIndex = 0;
while ((m = re.exec(seg))) {
  const [, slug, , qty, batch] = m;
  const k = mapSeg.indexOf(`'${slug}': {`);
  if (k < 0) continue;
  const tail = mapSeg.slice(k, k + 12000);
  const mm = tail.match(new RegExp(`"qty": ${qty},\\s*\\n\\s*"priceHKD": (\\d+)`));
  if (!mm) { console.log(`  ⚠ ${slug}: 找不到 qty ${qty} 的 priceHKD`); bad++; continue; }
  if (Number(mm[1]) !== Number(batch)) {
    console.log(`  ✗ ${slug}: anchor batchPrice=${batch} ≠ map priceHKD=${mm[1]} (qty ${qty})`);
    bad++;
  }
}
console.log(bad === 0 ? '\n✓ anchor 起批檔與 price table 一致' : `\n✗ ${bad} 處不一致`);
process.exit(bad ? 1 : 0);
