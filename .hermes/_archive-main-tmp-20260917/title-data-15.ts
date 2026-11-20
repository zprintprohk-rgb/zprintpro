/* 15 个空标题 SKU 的 products 真实数据 (数字钩子来源) + GSC 婚礼/枱卡词核查 */
import { products } from '../src/data/products';
import * as fs from 'fs';

const targets = ['corrugated-boxes', 'white-card-boxes', 'tuck-end-boxes',
  'foil-wedding-invitations', 'save-the-date-cards', 'wedding-thank-you-cards',
  'wedding-program-cards', 'wedding-menu-cards', 'wedding-suite-bundle',
  'wedding-place-cards', 'drink-tokens', 'escort-cards', 'name-tags-badges',
  'cafe-table-cards', 'wedding-seating-charts'];

for (const p of products) {
  if (!targets.includes(p.slug)) continue;
  const t = p as any;
  console.log(`\n== ${p.slug} [${p.category_slug}] ==`);
  console.log(`  name: ${t.name}`);
  console.log(`  nameEn: ${t.nameEn ?? ''}`);
  console.log(`  nameJa: ${t.nameJa ?? ''}`);
  console.log(`  price_range: ${t.price_range ?? ''} | minQuantity: ${t.minQuantity ?? ''}`);
  const specs = t.specs;
  if (Array.isArray(specs)) console.log(`  specs: ${specs.slice(0, 4).join(' / ')}`);
  else if (typeof specs === 'object' && specs) console.log(`  specs: ${JSON.stringify(specs).slice(0, 200)}`);
  else console.log(`  specs: ${typeof specs}`);
}

// GSC 婚礼/枱卡相关词 (三市场)
const hk = JSON.parse(fs.readFileSync('.hermes/hk28d-queries.json', 'utf8'));
const enja = JSON.parse(fs.readFileSync('.hermes/enja28d-queries.json', 'utf8'));
console.log('\n\n=== GSC 婚礼/枱卡/喜帖/酒水/席位 词 ===');
const pat = /婚|喜帖|枱卡|台卡|席|酒水|wedding|place card|invitation|save the date|escort|drink token|name tag|cafe|seating|ウエディング|席札|招待状|テーブル/;
for (const q of hk) if (pat.test(q.query)) console.log(`  hk ${q.imp}imp/${q.pos}pos: ${q.query}`);
for (const q of enja.en) if (pat.test(q.query)) console.log(`  en ${q.imp}imp/${q.pos}pos: ${q.query}`);
for (const q of enja.ja) if (pat.test(q.query)) console.log(`  ja ${q.imp}imp/${q.pos}pos: ${q.query}`);
console.log('\n=== GSC 包装盒 (en/ja) ===');
for (const q of enja.en) if (/box|packaging/.test(q.query) && q.imp >= 5) console.log(`  en ${q.imp}imp/${q.pos}pos: ${q.query}`);
for (const q of enja.ja) if (/パッケージ|ボックス|箱/.test(q.query)) console.log(`  ja ${q.imp}imp/${q.pos}pos: ${q.query}`);
