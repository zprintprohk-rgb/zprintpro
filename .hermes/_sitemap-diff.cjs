const fs = require('fs');
const ts = fs.readFileSync('src/data/products.ts', 'utf8');
const allSlugs = [...ts.matchAll(/^\s*slug:\s*'([a-z0-9-]+)',\s*$/gm)].map(m => m[1]);
const unique = [...new Set(allSlugs)];
// 复刻 generate-sitemap.js 的提取器
const lines = ts.split('\n');
const set = new Set();
for (let i = 0; i < lines.length; i++) {
  const m = lines[i].match(/^\s*slug:\s*['"]([^'"]+)['"],?\s*$/);
  if (!m) continue;
  const slug = m[1];
  for (let j = 1; j <= 25 && i + j < lines.length; j++) {
    const l = lines[i + j];
    if (/^\s*\}/.test(l)) break;
    if (/^\s*category:\s*['"]/.test(l)) { set.add(slug); break; }
  }
}
const xml = fs.readFileSync('public/sitemap.xml', 'utf8');
const xmlSlugs = new Set([...xml.matchAll(/\/product\/([a-z0-9-]+)\//g)].map(m => m[1]));
console.log('products.ts slug 行总数:', allSlugs.length, '去重:', unique.length);
console.log('提取器命中:', set.size);
const miss1 = unique.filter(s => !set.has(s));
console.log('提取器漏:', JSON.stringify(miss1));
const miss2 = [...set].filter(s => !xmlSlugs.has(s));
console.log('sitemap 漏:', JSON.stringify(miss2));
const dup = allSlugs.filter((s, i) => allSlugs.indexOf(s) !== i);
console.log('重复 slug 行:', JSON.stringify([...new Set(dup)]));
