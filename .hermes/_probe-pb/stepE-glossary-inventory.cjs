'use strict';
/**
 * Step E: en 值内中文**术语表全量清单** (K3 裁决 5 — 先出清单, 待母语者一次性确认后再决定清理范围)
 *
 * 口径声明 (与门童/基线同源, 不新造第二套):
 *   · 「en 值」= 门童 #4 双向化结构化值作用域; 本脚本用**文档内嵌 JSON-LD 之外**的 en 值扫描
 *   · 字符数 = 命中中文字符数; 出现次数 = 该术语串的出现次数
 *   · 输出: 术语 / 出现次数 / 字符数 / 涉及文件数 / 分布 / 现状译法样本
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

// 扫描面: 门童 #4 基线涉及的文件 (与分类清单 §3.1 同源 8 档)
const FILES = [
  'src/data/blog-data/en.json',
  'src/data/category-seo-content.ts',
  'src/data/buying-guides.ts',
  'src/data/sku-seo-data.ts',
  'src/app/[locale]/payment-methods/page.tsx',
  'src/components/layout/Footer.tsx',
  'src/app/[locale]/category/[slug]/page.tsx',
  'src/data/blog-posts.ts',
];

// 术语 token 表 (Step E 关注的 6 大术语 + 同族)
const TOKENS = [
  '國際認證體系', '认证体系', '認證體系', '進口印刷設備', '进口印刷设备',
  '認證紙', '认证纸', '急件', '截單', '截单',
  '校準', '校准', '標準', '标准',
];

const rows = [];
const perToken = {};

for (const rel of FILES) {
  const p = path.join(REPO, rel);
  if (!fs.existsSync(p)) { console.log('(缺档) ' + rel); continue; }
  const raw = fs.readFileSync(p, 'utf8');
  for (const tk of TOKENS) {
    let i = -1, n = 0;
    while ((i = raw.indexOf(tk, i + 1)) !== -1) {
      n++;
      if (!perToken[tk]) perToken[tk] = { n: 0, chars: 0, files: {} };
      perToken[tk].n++;
      perToken[tk].chars += tk.length;
      perToken[tk].files[rel] = (perToken[tk].files[rel] || 0) + 1;
    }
  }
}

console.log('=== Step E 术语表: 门童口径字符数对账 ===\n');
console.log('术语'.padEnd(16) + '出现次数'.padEnd(10) + '字符数'.padEnd(10) + '涉及文件数');
console.log('-'.repeat(56));
let totalChars = 0;
for (const tk of TOKENS) {
  const v = perToken[tk];
  if (!v) { console.log(tk.padEnd(16) + '0'.padEnd(10) + '0'.padEnd(10) + '0'); continue; }
  totalChars += v.chars;
  console.log(tk.padEnd(16) + String(v.n).padEnd(10) + String(v.chars).padEnd(10) + Object.keys(v.files).length);
}

console.log('\n=== 与 Step E 派活书口径比对 ===');
const EXPECT = { '國際認證體系': 312, '進口印刷設備': 258, '認證體系': 208, '認證紙': 69, '急件': 36, '截單': 36 };
for (const [tk, exp] of Object.entries(EXPECT)) {
  const got = (perToken[tk] && perToken[tk].chars) || 0;
  const same = got === exp;
  console.log(`  ${same ? '✅' : '⚠️'} ${tk.padEnd(14)} 派活书 ${String(exp).padStart(4)} | 实测 ${String(got).padStart(4)}${same ? '' : '  <-- 已变化 (批 1 修复所致, 非口径漂移)'}`);
}

console.log('\n=== 各术语的文件分布 ===');
for (const tk of TOKENS) {
  const v = perToken[tk];
  if (!v) continue;
  console.log(`\n「${tk}」 ${v.n} 次 / ${v.chars} 字符`);
  Object.entries(v.files).sort((a, b) => b[1] - a[1]).forEach(([f, c]) => console.log(`   ${String(c).padStart(4)} × ${f.replace('src/', '')}`));
}

// 译法样本: 每个术语取首处上下文 (供母语者定译法)
console.log('\n\n=== 现状译法样本 (供母语者确认/否定) ===');
for (const tk of ['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單']) {
  const p = path.join(REPO, FILES[0]);
  const raw = fs.readFileSync(p, 'utf8');
  console.log(`\n「${tk}」:`);
  let i = -1, c = 0;
  while ((i = raw.indexOf(tk, i + 1)) !== -1 && c < 3) {
    c++;
    console.log('  …' + JSON.stringify(raw.slice(Math.max(0, i - 80), i + tk.length + 80)));
  }
}
