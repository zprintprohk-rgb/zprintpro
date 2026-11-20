'use strict';
/** 波 2 前置: ja.json 里 5 条术语的**精确形态与上下文** (只读; 防重复/防误伤) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const JA = path.join(REPO, 'src', 'data', 'blog-data', 'ja.json');
const raw = fs.readFileSync(JA, 'utf8');

const TERMS = ['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單'];

for (const t of TERMS) {
  console.log(`\n${'='.repeat(74)}\n### 「${t}」\n${'='.repeat(74)}`);
  const idxs = [];
  let i = -1;
  while ((i = raw.indexOf(t, i + 1)) !== -1) idxs.push(i);
  console.log(`  出现 ${idxs.length} 次`);
  // 尾部形态统计
  const tails = {};
  idxs.forEach(p => {
    const tail = raw.slice(p + t.length, p + t.length + 16);
    const m = tail.match(/^[\s\u3000]?[A-Za-z0-9\u3040-\u30ff\u4e00-\u9fff]{0,8}/);
    const k = m ? m[0] : '';
    tails[k] = (tails[k] || 0) + 1;
  });
  console.log('  尾部形态:');
  Object.entries(tails).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`    ${String(v).padStart(3)} × ${JSON.stringify(k)}`));
  // 前缀形态统计
  const heads = {};
  idxs.forEach(p => {
    const head = raw.slice(Math.max(0, p - 12), p);
    const m = head.match(/[A-Za-z0-9\u3040-\u30ff\u4e00-\u9fff]{0,8}$/);
    const k = m ? m[0] : '';
    heads[k] = (heads[k] || 0) + 1;
  });
  console.log('  前缀形态 (前 8 种):');
  Object.entries(heads).sort((a, b) => b[1] - a[1]).slice(0, 8).forEach(([k, v]) => console.log(`    ${String(v).padStart(3)} × ${JSON.stringify(k)}`));
  // 抽样 4 处上下文
  console.log('  抽样:');
  idxs.slice(0, 4).forEach((p, n) => {
    console.log(`    [${n + 1}] …${JSON.stringify(raw.slice(Math.max(0, p - 70), p + t.length + 70))}…`);
  });
}
