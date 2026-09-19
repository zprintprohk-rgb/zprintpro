'use strict';
/**
 * 波 1 前置抽样 (K3 要求): 对 認證紙 / 國際認證體系 各取 10 处上下文,
 * 专查替换后是否与既有 ISO 9001 / ISO 12647 / FSC 产生重复或语义冲突。
 * 只读。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const EN = path.join(REPO, 'src', 'data', 'blog-data', 'en.json');
const raw = fs.readFileSync(EN, 'utf8');

const CASES = [
  ['國際認證體系', 'internationally certified', /國際認證體系\s*certified/],
  ['認證紙', 'FSC-certified paper', /FSC\s*認證紙/],
];

for (const [term, to, specificRe] of CASES) {
  console.log(`\n${'='.repeat(78)}\n### 「${term}」 → 「${to}」 抽样 10 处 (优先取「空格/数字邻接」等高风险形态)\n${'='.repeat(78)}`);
  const idxs = [];
  let i = -1;
  while ((i = raw.indexOf(term, i + 1)) !== -1) idxs.push(i);
  // 按风险排序: 左右含拉丁字母/数字/斜杠 的优先
  const scored = idxs.map(p => {
    const L = raw.slice(Math.max(0, p - 30), p);
    const R = raw.slice(p + term.length, p + term.length + 30);
    let risk = 0;
    if (/[A-Za-z0-9]\s*$/.test(L)) risk += 2;
    if (/^\s*[A-Za-z0-9]/.test(R)) risk += 2;
    if (/ISO|FSC|12647|9001/.test(L + R)) risk += 3;
    return { p, risk, L, R };
  }).sort((a, b) => b.risk - a.risk);

  scored.slice(0, 10).forEach((s, n) => {
    const before = raw.slice(Math.max(0, s.p - 110), s.p);
    const after = raw.slice(s.p + term.length, s.p + term.length + 110);
    // 模拟替换 (含消费尾部英文)
    let repl = to;
    const tail = raw.slice(s.p + term.length, s.p + term.length + 20);
    let consumed = '';
    if (/^\s*certified/.test(tail)) { consumed = tail.match(/^\s*certified/)[0]; }
    if (/^\s*press(es)?/.test(tail)) { consumed = tail.match(/^\s*press(es)?/)[0]; }
    const sim = before + repl + after.replace(/^\s*(certified|press(es)?)/, '');
    console.log(`\n[${n + 1}] risk=${s.risk}`);
    console.log(`  原: …${(before + term + consumed + after.slice(consumed.length)).replace(/\\n/g, '⏎').slice(-230)}…`);
    console.log(`  改: …${sim.replace(/\\n/g, '⏎').slice(-230)}…`);
    // 重复检测
    const dup = [];
    ['certified certified', 'ISO 9001 ISO 9001', 'FSC-certified paper certified', 'paper paper'].forEach(d => { if (sim.includes(d)) dup.push(d); });
    if (dup.length) console.log(`  ❌ 重复: ${JSON.stringify(dup)}`);
    else console.log('  ✅ 无重复');
  });
}

console.log(`\n${'='.repeat(78)}\n### 全局重复风险扫描 (模拟全量替换后)\n${'='.repeat(78)}`);
let sim = raw;
sim = sim.replace(/國際認證體系\s*certified\s*Factory-Direct/g, 'internationally certified Factory-Direct');
sim = sim.replace(/國際認證體系\s*certified/g, 'internationally certified');
sim = sim.replace(/國際認證體系/g, 'internationally certified');
sim = sim.replace(/FSC\s*認證紙\s*certified/g, 'FSC-certified paper');
sim = sim.replace(/FSC\s*認證紙\s*Certification/g, 'FSC chain-of-custody certification');
sim = sim.replace(/FSC\s*認證紙/g, 'FSC-certified paper');
sim = sim.replace(/認證紙/g, 'certified paper');
const PATS = ['certified certified', 'ISO 9001 ISO 9001', 'ISO 9001 certified ISO 9001', 'paper certified', 'FSC-certified paper paper', 'internationally certified internationally', 'FSC FSC-certified', 'FSC Certified FSC'];
PATS.forEach(p => {
  const n = sim.split(p).length - 1;
  console.log(`  ${n ? '❌' : '✅'} 「${p}」 × ${n}`);
});
// 与新词邻接的 ISO 检查
const ISO_NEAR = [...sim.matchAll(/.{0,40}internationally certified.{0,40}/g)].filter(m => /ISO\s*9001/.test(m[0]));
console.log(`\n  与 ISO 9001 同句的 internationally certified: ${ISO_NEAR.length} 处`);
ISO_NEAR.slice(0, 4).forEach((m, n) => console.log(`   [${n + 1}] …${m[0].replace(/\\n/g, '⏎')}…`));
console.log('\n(只读, 未修改任何文件)');
