// .hermes/_foodguide_slots.cjs — zh 指南 h2 位置 + 断裂链接上下文
const fs = require('fs');
const j = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const c = j['food-packaging-printing-guide'].content;
const re = /<h2[^>]*>([\s\S]*?)<\/h2>/g;
let m;
while ((m = re.exec(c)) !== null) {
  console.log(`@${m.index} :: ${m[1].replace(/<[^>]+>/g, '').trim().slice(0, 50)}`);
}
const bi = c.indexOf('https://www. .com');
console.log('\n--- broken link ctx ---');
console.log(JSON.stringify(c.slice(Math.max(0, bi - 260), bi + 120)));
console.log('\n--- head 600 ---');
console.log(c.slice(0, 600));
