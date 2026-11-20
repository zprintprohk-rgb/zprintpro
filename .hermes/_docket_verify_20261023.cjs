// 2026-10-23 docket verification (double-method recount per §0.23.2)
const fs = require('fs');
const sku = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
const pc = fs.readFileSync('src/data/products-content.ts', 'utf8');
const bg = fs.readFileSync('src/data/buying-guides.ts', 'utf8');
const bdJa = fs.readFileSync('src/data/blog-data/ja.json', 'utf8');
const count = (s, p) => s.split(p).length - 1;
console.log('== method2 recount (order-19 claims) ==');
console.log('業界最安  sku:', count(sku, '業界最安'), '| pc:', count(pc, '業界最安'), '| bg:', count(bg, '業界最安'));
console.log('激安      sku:', count(sku, '激安'), '| pc:', count(pc, '激安'));
console.log('最安値    sku:', count(sku, '最安値'), '| bg:', count(bg, '最安値'), '| blog-ja:', count(bdJa, '最安値'));
console.log('低価格帯  sku:', count(sku, '低価格帯でご提供'));
console.log('');
console.log('== outdoor-posters zh body: 即日交貨 contexts ==');
const i = sku.indexOf('"outdoor-posters": {');
const end = sku.indexOf('\n  "', i + 5);
const seg = sku.slice(i, end > 0 ? end : sku.length);
let idx = 0, n = 0;
while ((idx = seg.indexOf('即日交貨', idx)) >= 0) {
  n++;
  console.log(`[${n}] ...${JSON.stringify(seg.slice(Math.max(0, idx - 80), idx + 25))}...`);
  idx += 4;
}
if (!n) console.log('(0 hits)');
console.log('');
console.log('== outdoor current CSV-domain values in ts ==');
const grab = (re) => { const m = seg.match(re); return m ? m[1] : '(not found)'; };
console.log('zh title :', grab(/"title":\s*"((?:[^"\\]|\\.)*)"/));
console.log('zh desc  :', grab(/"description":\s*"((?:[^"\\]|\\.)*)"/));
const enI = seg.indexOf('"en": {');
const enSeg = seg.slice(enI);
console.log('en alt   :', (enSeg.match(/"imageAlt"[\s\S]*?"en":\s*"((?:[^"\\]|\\.)*)"/) || [])[1]);
const jaI = seg.indexOf('"ja": {');
const jaSeg = seg.slice(jaI);
console.log('ja desc  :', (jaSeg.match(/"description":\s*"((?:[^"\\]|\\.)*)"/) || [])[1]);
console.log('');
console.log('== folding-boxes: food-boxes internal links ==');
const j = sku.indexOf('"folding-boxes": {');
const jend = sku.indexOf('\n  "', j + 5);
const fseg = sku.slice(j, jend > 0 ? jend : sku.length);
console.log('links:', (fseg.match(/\/product\/food-boxes\//g) || []).length);
console.log('');
console.log('== csv outdoor row (4 debt cells) ==');
const csv = fs.readFileSync('zprintpro-sku-seo-data.csv', 'utf8').split(/\r?\n/);
const hdr = csv[0].split('\t');
const slugC = hdr.indexOf('Slug');
const row = csv.find((l) => l.split('\t')[slugC] === 'outdoor-posters');
if (!row) { console.log('ROW NOT FOUND'); } else {
  const cells = row.split('\t');
  const show = (name) => console.log(name.padEnd(14), '=', cells[hdr.indexOf(name)] ?? '(empty)');
  ['SEO标题(ZH)', 'SEO描述(ZH)', 'SEO描述(JA)', '图片Alt标签(EN)'].forEach(show);
}
