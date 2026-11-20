const fs = require('fs');
const t = fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8');
const probes = ['ISO 认证体系 + FSC 認證', 'ISO 认证体系', '认证体系'];
for (const p of probes) {
  console.log(`${JSON.stringify(p)} x${(t.split(p).length - 1)}`);
}
const lines = t.split('\n');
lines.forEach((l, i) => {
  if (l.includes('认证体系')) {
    const k = l.indexOf('认证体系');
    console.log(`L${i + 1}: ...${l.slice(Math.max(0, k - 40), k + 30)}...`);
  }
});
