const fs = require('fs');
const files = [
  'src/data/blog-data/zh-hk.json',
  'src/data/blog-data/en.json',
  'src/data/blog-data/ja.json',
  'src/data/blog-posts.ts',
  'src/data/pillar-content.ts',
];
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const n = (t.match(/认证体系/g) || []).length;
  const n2 = (t.match(/认证/g) || []).length;
  console.log(`${f}: 认证体系 x${n} / 认证 x${n2}`);
}
const t = fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8');
const lines = t.split('\n');
lines.forEach((l, i) => {
  const m = l.match(/[\u4e00-\u9fff]*认证[\u4e00-\u9fff]*/g);
  if (m) console.log(`  zh-hk.json L${i + 1}: ${[...new Set(m)].join(' , ')}`);
});
