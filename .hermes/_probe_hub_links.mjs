// .hermes/_probe_hub_links.mjs
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36';
const url = 'https://zprintpro.com/zh-hk/category/packaging/';
const r = await fetch(url, { headers: { 'user-agent': UA } });
const b = await r.text();
console.log('status', r.status, 'len', b.length);
const rawMd = (b.match(/\[產品鏈接\]/g) || []).length;
const rawMd2 = (b.match(/\]\(\/zh-hk\/product/g) || []).length;
const anchors = (b.match(/href="\/zh-hk\/product\/white-card-boxes\/"/g) || []).length;
const foodAnchor = (b.match(/href="\/zh-hk\/product\/food-boxes\/"/g) || []).length;
console.log('raw markdown markers:', rawMd, '| raw "](/zh-hk/product":', rawMd2);
console.log('anchors white-card-boxes:', anchors, '| food-boxes:', foodAnchor);
const i = b.indexOf('white-card-boxes');
if (i > 0) console.log('ctx:', JSON.stringify(b.slice(Math.max(0, i - 160), i + 30)));
