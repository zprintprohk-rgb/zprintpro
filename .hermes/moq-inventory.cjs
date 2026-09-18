/** MOQ 口径全站盘点 (只读) */
const fs = require('fs');
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
// minQuantity 分布
const mq = [...prod.matchAll(/slug:\s*'([^']+)'[\s\S]{0,2500}?minQuantity:\s*(\d+)/g)].map((m) => ({ slug: m[1], min: +m[2] }));
const dist = {};
mq.forEach((x) => { dist[x.min] = (dist[x.min] || 0) + 1; });
console.log('=== products.ts minQuantity 分布 (n=' + mq.length + ') ===');
Object.keys(dist).sort((a, b) => a - b).forEach((k) => console.log('  ' + String(k).padStart(5) + ' → ' + dist[k] + ' 个 SKU'));
console.log('  最小 minQuantity = ' + Math.min(...mq.map((x) => x.min)));
console.log('\n=== 抽样 (前 12) ===');
mq.slice(0, 12).forEach((x) => console.log('  ' + x.slug.padEnd(34) + ' minQuantity=' + x.min));

// basePrice 与 minQuantity 的关系（BK-002 等）
const bk = mq.find((x) => x.slug === 'saddle-stitch-booklets');
console.log('\nBK-002 minQuantity = ' + (bk ? bk.min : '?'));

// 内容层 MOQ 声明盘点
console.log('\n=== 内容层 MOQ 声明盘点 (blog-data zh-hk) ===');
const arr = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const pats = [/(\d+)\s*(?:本|個|張|份)\s*起/g];
const tally = {};
for (const p of Object.values(arr)) {
  const s = [p.title, p.description, p.content].filter((x) => typeof x === 'string').join(' ');
  for (const m of s.matchAll(/(\d+)\s*(?:本|個|張|份)\s*起/g)) {
    tally[m[1]] = (tally[m[1]] || 0) + 1;
  }
}
Object.keys(tally).sort((a, b) => +a - +b).forEach((k) => console.log('  ' + k.padStart(4) + ' 起 → ' + tally[k] + ' 处'));

// 「無最低起印量 / 1 本 / 一本」类表述
console.log('\n=== 「1 本 / 一本 / 無起印量」类表述盘点 (blog-data zh-hk) ===');
const onePats = ['1 本起', '一本起', '無最低起印', '無最少起印', '1 張起', '一張起', '數碼印刷', '柯式', '膠印'];
for (const pat of onePats) {
  let n = 0, slugs = [];
  for (const p of Object.values(arr)) {
    const s = [p.title, p.description, p.content].filter((x) => typeof x === 'string').join(' ');
    const c = s.split(pat).length - 1;
    if (c) { n += c; slugs.push(p.slug); }
  }
  console.log('  ' + pat.padEnd(12) + ' 命中 ' + String(n).padStart(4) + ' 处 / ' + slugs.length + ' 篇');
}

// 全站活文件里的 MOQ 声明（src 层）
console.log('\n=== src 层 MOQ 关键串 ===');
const files = ['src/data/products.ts', 'src/data/product-faqs.ts', 'src/data/sku-seo-data.ts', 'src/data/category-seo-content.ts'];
for (const f of files) {
  if (!fs.existsSync(f)) { console.log('  (缺) ' + f); continue; }
  const c = fs.readFileSync(f, 'utf8');
  const hits = [];
  for (const pat of ['1 本起', '一本起', '50 本起', '50本起', '100 本起', '100個起', '100 個起', '500 本起', '無最低起印', '無數量限制', '1 張起', '1張起']) {
    const n = c.split(pat).length - 1;
    if (n) hits.push(pat + '×' + n);
  }
  console.log('  ' + f.padEnd(38) + hits.join(' , ') || '  ' + f + ' (无命中)');
}
