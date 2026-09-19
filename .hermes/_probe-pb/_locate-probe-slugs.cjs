'use strict';
/** 定位 3 个未验证字符串所属的**正确文章 slug** (供线上探针用正确 URL) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const CASES = [
  ['src/data/blog-data/en.json', 'rush orders, 18:00 cutoff'],
  ['src/data/blog-data/en.json', 'Answer nugget'],
  ['src/data/blog-data/ja.json', '中綴じ'],
];

for (const [rel, needle] of CASES) {
  const raw = fs.readFileSync(path.join(REPO, rel), 'utf8');
  const i = raw.indexOf(needle);
  console.log(`\n### 「${needle}」 in ${rel}`);
  if (i < 0) { console.log('  未找到'); continue; }
  // 从命中处往回找最近的顶层键 (行首两个空格 + "slug": {)
  const head = raw.slice(0, i);
  const re = /^  "([^"]+)":\s*\{/gm;
  let m, last = null;
  while ((m = re.exec(head)) !== null) last = m[1];
  console.log(`  所属篇目 slug: ${last}`);
  console.log(`  出现次数: ${raw.split(needle).length - 1}`);
}

// campus 相关 slug
const en = fs.readFileSync(path.join(REPO, 'src/data/blog-data/en.json'), 'utf8');
const slugs = [...en.matchAll(/^  "([^"]+)":\s*\{/gm)].map(m => m[1]);
console.log('\n=== 含 campus / school 的 slug ===');
slugs.filter(s => /campus|school|education/.test(s)).forEach(s => console.log('  ' + s));
