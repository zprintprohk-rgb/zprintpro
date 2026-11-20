const fs = require('fs');
const sku = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');

// 1. which sku titles contain 圓角 (by slug + locale)
const blocks = sku.split('\n  "').slice(1);
const hits = [];
for (const b of blocks) {
  const slug = b.slice(0, b.indexOf('":'));
  const titleRe = /"(zh-hk|en|ja)":\s*\{[^}]*?"title":\s*"([^"]+)"/g;
  let m;
  while ((m = titleRe.exec(b))) {
    if (m[2].includes('圓角')) hits.push({ slug, locale: m[1], title: m[2] });
  }
}
console.log('=== sku-seo-data titles containing 圓角 ===');
for (const h of hits) console.log(`[${h.locale}] ${h.slug}: ${h.title}`);
console.log(`total: ${hits.length}`);

// 2. does products.ts a4-flyers (and flyer family) mention 圓角 anywhere?
const anchors = [...prod.matchAll(/\bslug:\s*'([a-z0-9-]+)'/g)].map((m) => ({ slug: m[1], idx: m.index }));
anchors.push({ slug: '__END__', idx: prod.length });
const flyerFamily = ['a4-flyers','a5-flyers','double-sided-flyers','folded-flyers','thick-paper-flyers','eco-flyers','small-batch-flyers','restaurant-menu-flyers','poster-size-flyers'];
for (const want of flyerFamily) {
  for (let i = 0; i < anchors.length - 1; i++) {
    if (anchors[i].slug !== want) continue;
    const b = prod.slice(anchors[i].idx, anchors[i + 1].idx);
    const hasRounded = /圓角|圆角|rounded corner|rounded-corner/i.test(b);
    const minQ = (b.match(/\bminQuantity:\s*(\d+)/) || [])[1];
    const finish = (b.match(/finish[^\n]{0,120}/i) || [])[0] || '';
    console.log(`${want}: 圓角=${hasRounded ? 'YES' : 'no'} minQ=${minQ} ${finish.slice(0,80)}`);
    break;
  }
}

// 3. does a4-flyers body mention 圓角?
const a4 = (() => { for (let i=0;i<anchors.length-1;i++){ if(anchors[i].slug==='a4-flyers') return prod.slice(anchors[i].idx,anchors[i+1].idx);} })();
console.log('\n=== products.ts a4-flyers 圓角 mentions ===');
const rm = [...a4.matchAll(/[^。\n]{0,40}圓角[^。\n]{0,40}/g)];
console.log(rm.length ? rm.map(x=>x[0].trim()).join('\n') : '(0 mentions in products.ts a4-flyers)');

// 4. body text of a4-flyers (sku-seo zh-hk body) — 圓角?
const a4s = (() => { for (const b of blocks){ if(b.slice(0,b.indexOf('":'))==='a4-flyers') return b; } })();
const bm = [...a4s.matchAll(/[^。\n]{0,50}圓角[^。\n]{0,50}/g)];
console.log('=== a4-flyers sku-seo body 圓角 mentions ===');
console.log(bm.length ? bm.map(x=>x[0].trim()).join('\n') : '(0 mentions in a4-flyers body)');
