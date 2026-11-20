const fs = require('fs');
const c = fs.readFileSync('src/lib/seo.ts', 'utf8');
let i = -1, n = 0;
while ((i = c.indexOf('metaDescription', i + 1)) !== -1 && n < 10) {
  n++;
  const s = c.slice(Math.max(0, i - 260), i + 320).replace(/\s+/g, ' ');
  console.log('\n---- @' + i + ' ----');
  console.log(s);
}
// 找形如 `${x}/${x}` 或 `/${` 的拼接
console.log('\n=== 可疑拼接 (`/${`) ===');
let k = -1, m = 0;
while ((k = c.indexOf('/${', k + 1)) !== -1 && m < 8) {
  m++;
  console.log('  @' + k + ': …' + c.slice(Math.max(0, k - 150), k + 120).replace(/\s+/g, ' ') + '…');
}
