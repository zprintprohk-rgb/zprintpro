const fs = require('fs');
const t = fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8');
const re = /[\u4e00-\u9fff]{0,6}认证[\u4e00-\u9fff]{0,6}/g;
const seen = new Map();
let m;
while ((m = re.exec(t)) !== null) {
  const k = `${m[0]} @${t.slice(0, m.index).split('\n').length}`;
  seen.set(k, (seen.get(k) || 0) + 1);
}
console.log('=== zh-hk.json 所有含「认证」的片段 (片段 @行号: 次数) ===');
for (const [k, v] of seen) console.log(`  ${k}: ${v}`);
const re2 = /[\u4e00-\u9fff]{0,8}[体认证][\u4e00-\u9fff]{0,8}/g;
const set2 = new Set();
while ((m = re2.exec(t)) !== null) set2.add(m[0]);
console.log('\n=== 含 体/认/证 的片段全集 ===');
for (const s of set2) console.log('  ' + s);
