const fs = require('fs');
const t = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
for (const [tag, needle] of [['en', 'Minimum order and price bands at a glance'], ['ja', '最小ロットと価格帯の目安']]) {
  const i = t.indexOf(needle);
  console.log(`\n[${tag}] @${i}`);
  console.log(JSON.stringify(t.slice(i - 60, i + 240)));
}
console.log('\n份 in file:', (t.match(/份/g) || []).length);
