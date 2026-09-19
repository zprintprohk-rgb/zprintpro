'use strict';
/**
 * 批 2 前置: 6 个已批准术语的**替换规则抽样验证** (K3 要求: 全局替换前先抽样确认, 防语法断裂/重复)
 * 只读: 不改任何文件; 输出「旧串 → 新串」的逐处上下文预测。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const SRC = [
  'src/data/blog-data/en.json',
  'src/data/blog-data/ja.json',
  'src/data/blog-posts.ts',
  'src/data/category-seo-content.ts',
  'src/data/sku-seo-data.ts',
  'src/data/buying-guides.ts',
  'src/app/[locale]/category/[slug]/page.tsx',
].map(f => path.join(REPO, f)).filter(f => fs.existsSync(f));

// 已批准术语 → 规则集 (每条: [适用文件, 正则, 替换, 说明])
const RULES = [
  {
    term: '國際認證體系 (270 字)',
    rules: [
      [/國際認證體系/g, 'internationally certified', 'en.json (en 值)'],
    ],
  },
  {
    term: '進口印刷設備 (240 字)',
    rules: [
      [/進口印刷設備/g, 'Heidelberg presses', 'en.json (en 值) + ja.json → 日语待定'],
    ],
  },
  {
    term: '認證紙 (72 字)',
    rules: [
      [/FSC\s*認證紙/g, 'FSC-certified paper', 'en.json (en 值)'],
      [/認證紙/g, 'certified paper', '兜底 (无 FSC 前缀时)'],
    ],
  },
  {
    term: '急件 + 截單 (68 字)',
    rules: [
      [/急件\s*18:00\s*截單/g, 'rush orders, 18:00 cutoff', '固定句式 (最高优先)'],
      [/急件/g, 'rush', '兜底'],
      [/截單/g, 'cutoff', '兜底'],
    ],
  },
  {
    term: '答案 (24 字)',
    rules: [
      [/答案{2,}/g, '', '整串删除 (13 连重复 = 坏输出)'],
      [/答案/g, '', '兜底删除'],
    ],
  },
];

console.log('=== 批 2 替换规则抽样验证 (只读) ===\n');
const sample = {};
for (const f of SRC) {
  const raw = fs.readFileSync(f, 'utf8');
  const rel = f.replace(REPO + path.sep, '').replace(/\\/g, '/');
  for (const R of RULES) {
    for (const [re, to, note] of R.rules) {
      const g = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
      let m, n = 0;
      const ctxs = [];
      while ((m = g.exec(raw)) !== null) {
        n++;
        if (ctxs.length < 3) {
          const before = raw.slice(Math.max(0, m.index - 100), m.index);
          const after = raw.slice(m.index + m[0].length, m.index + m[0].length + 100);
          ctxs.push({ before, hit: m[0], after });
        }
      }
      if (!n) continue;
      console.log(`\n##### ${R.term}  [${note}]  正则 ${re.source}  →  ${JSON.stringify(to)} #####`);
      console.log(`  文件 ${rel} — 命中 ${n} 处`);
      sample[R.term + '|' + re.source + '|' + rel] = n;
      ctxs.forEach((c, i) => {
        const line = c.before + c.hit + c.after;
        console.log(`   [${i + 1}] …${line.replace(/\n/g, '⏎')}…`);
        console.log(`        改后: …${(c.before + to + c.after).replace(/\n/g, '⏎')}…`);
      });
    }
  }
}
console.log('\n\n=== 风险自检: 改后是否出现重复词 ===');
const RISK = [
  ['ISO 9001 certified certified', 'ISO 9001 前后重复'],
  ['certified certified', 'certified 重复'],
  ['Heidelberg Heidelberg', '品牌名重复'],
  ['cutoff cutoff', 'cutoff 重复'],
  ['rush rush', 'rush 重复'],
];
for (const f of SRC) {
  let out = fs.readFileSync(f, 'utf8');
  for (const R of RULES) for (const [re, to] of R.rules) out = out.replace(new RegExp(re.source, 'g'), to);
  const rel = f.replace(REPO + path.sep, '').replace(/\\/g, '/');
  for (const [pat, label] of RISK) {
    const n = out.split(pat).length - 1;
    if (n) console.log(`  ⚠️ ${rel}: ${label} × ${n}`);
  }
  // 残留检查
  const left = ['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單', '答案'].filter(t => out.includes(t));
  if (left.length) console.log(`  ℹ️ ${rel}: 仍有未替换 token ${JSON.stringify(left)} (属其他语境/其他语系或未纳入本批)`);
}
console.log('\n(本脚本只读, 未修改任何文件)');
