// .hermes/_md_scan_all.cjs — 其他数据文件裸 markdown 扫描
const fs = require('fs');
const files = ['src/data/products-content.ts', 'src/data/category-conversion-blocks.ts', 'src/data/product-faqs.ts', 'src/data/buying-guides.ts', 'src/data/pillar-content.ts'];
for (const f of files) {
  if (!fs.existsSync(f)) { console.log(f, 'MISSING'); continue; }
  const t = fs.readFileSync(f, 'utf8');
  const links = (t.match(/\[[^\]<]{1,30}\]\(\/[a-z0-9\-\/]+\)/g) || []);
  const bold = (t.match(/\*\*[^*\n<]{2,60}\*\*/g) || []);
  console.log(`${f}: mdLinks=${links.length} bold=${bold.length}`);
  if (links.length) console.log('   e.g.', links.slice(0, 3).join(' | '));
  if (bold.length) console.log('   bold e.g.', bold.slice(0, 2).join(' | '));
}
