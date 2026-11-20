const fs = require('fs');
const p = 'src/data/category-seo-content.ts';
let t = fs.readFileSync(p, 'utf8');
const reps = [
  ['/zh-hk/blog/kraft-paper-box-printing-guide/', '/zh-hk/blog/kraft-paper-box-types-comparison-2026/'],
  ['/zh-hk/blog/custom-packaging-box-design-guide/', '/zh-hk/blog/tea-beverage-gift-box-printing-guide/'],
];
for (const [a, b] of reps) {
  const n = t.split(a).length - 1;
  if (n !== 1) { console.log('SKIP/ABORT', a, n); process.exit(1); }
  t = t.replace(a, b);
}
fs.writeFileSync(p, t, 'utf8');
// 校验段落内 4 条链接均指向真实 slug
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const prod = fs.readFileSync('src/data/products.ts', 'utf8');
const ps = [...prod.matchAll(/^\s{4}slug: '([a-z0-9-]+)',$/gm)].map(m => m[1]);
const i = t.indexOf('食品包裝專節');
const seg = t.slice(i, i + 700);
const urls = [...seg.matchAll(/href="\/zh-hk\/(product|blog)\/([a-z0-9-]+)\/"/g)].map(m => ({ type: m[1], slug: m[2] }));
let bad = 0;
for (const u of urls) {
  const ok = u.type === 'blog' ? Object.prototype.hasOwnProperty.call(zh, u.slug) : ps.includes(u.slug);
  if (!ok) { bad++; console.log('BROKEN', u.type, u.slug); }
}
console.log(`links checked: ${urls.length}, broken: ${bad}`);
process.exit(bad ? 1 : 0);
