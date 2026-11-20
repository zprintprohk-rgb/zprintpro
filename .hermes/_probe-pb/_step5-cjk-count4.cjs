const fs = require('fs');
const t = fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8');
const re = /认证/g;
let m;
while ((m = re.exec(t)) !== null) {
  const line = t.slice(0, m.index).split('\n').length;
  console.log(`L${line}: ...${t.slice(Math.max(0, m.index - 90), m.index + 60)}...`);
}
console.log('--- 简体专用字形全档计数 (调用门童字集) ---');
const guard = require('./scripts/guards/i18n-guard.js');
const SIMP = new RegExp('[' + guard.SIMP_ZH + ']', 'g');
const hits = t.match(SIMP) || [];
const freq = {};
for (const c of hits) freq[c] = (freq[c] || 0) + 1;
console.log('合计', hits.length, JSON.stringify(freq));
const lines = t.split('\n');
lines.forEach((l, i) => {
  const h = l.match(SIMP);
  if (h) console.log(`  L${i + 1}: ${[...new Set(h)].join('')}`);
});
