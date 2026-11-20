const fs = require('fs');
const t = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const i = t.indexOf('食品包裝專節');
const seg = t.slice(i, i + 700);
console.log(JSON.stringify(seg.slice(0, 640)));
console.log('\n食品包裝專節 count:', (t.match(/食品包裝專節/g) || []).length);
console.log('dangling ,:', /\n\s+,\n/.test(t));
// 链接目标存在性
for (const u of ['food-boxes', 'food-packaging-printing-guide', 'kraft-paper-box-printing-guide', 'custom-packaging-box-design-guide']) {
  const has = fs.existsSync(`src/app/[locale]/blog/${u}`) || fs.existsSync(`src/data/blog-data/zh-hk.json`) && fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8').includes(`"${u}"`);
  console.log(u, 'exists:', has);
}
