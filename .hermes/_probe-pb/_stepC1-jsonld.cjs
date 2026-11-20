'use strict';
/** Step C 批 1: JSON-LD 4 条命中中文的真实原文 (含转义, 用原文索引而非按行) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const raw = fs.readFileSync(path.join(REPO, 'src', 'data', 'blog-data', 'en.json'), 'utf8');

const NEEDLES = ['细分證書編號備索', '並製本上製本', '證書編號備索', '认证体系月月认证体系认证认证体系', '麥思印刷整合'];
for (const nd of NEEDLES) {
  let i = -1, n = 0;
  console.log(`\n########## 「${nd}」 ##########`);
  while ((i = raw.indexOf(nd, i + 1)) !== -1) {
    n++;
    if (n <= 2) {
      console.log(`  出现@${i}:`);
      console.log('    …' + JSON.stringify(raw.slice(Math.max(0, i - 200), i)));
      console.log('    >>> ' + JSON.stringify(raw.slice(i, i + nd.length + 200)));
    }
  }
  console.log(`  共 ${n} 次`);
}

// JSON-LD 值内重复串统计 (判定是否生成器坏输出)
console.log('\n########## 重复度分析: 单字符/短语在 JSON-LD 值内的重复次数 ##########');
const blocks = [...raw.matchAll(/<script type=\\"application\/ld\+json\\">([\s\S]{0,20000}?)<\/script>/g)].map(m => m[1]);
console.log('  JSON-LD 块数:', blocks.length);
for (const [k, b] of blocks.entries()) {
  const cjk = (b.match(/[\u4e00-\u9fff]{2,}/g) || []);
  if (!cjk.length) continue;
  const tally = {};
  cjk.forEach(s => tally[s] = (tally[s] || 0) + 1);
  console.log(`  块#${k + 1}: CJK 片段 ${cjk.length} 个, 去重 ${Object.keys(tally).length} 个`);
  Object.entries(tally).sort((a, b2) => b2[1] - a[1]).slice(0, 8).forEach(([s, c]) => console.log(`     ${String(c).padStart(3)} × 「${s}」`));
}
