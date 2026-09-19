'use strict';
/**
 * 批 2 规则 v2: 抽样暴露 4 个问题的修正版 (只读干跑, 输出预测 + 重复自检)
 *  ① 国际认证体系 certified  → internationally certified   (消费尾部 certified, 防重复)
 *  ② 進口印刷設備 presses     → Heidelberg presses           (消费尾部 presses, 防重复)
 *  ③ FSC 認證紙 certified     → FSC-certified paper          (消费尾部 certified)
 *  ④ 答案: 只删 2 连以上重复 (坏输出), 保留正常「答案 nugget」
 *  ⑤ ja 语系单列: 国际认证体系→国際認証 / 進口印刷設備→ハイデルベルク印刷機 / 認証紙→認証紙
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const EN = path.join(REPO, 'src', 'data', 'blog-data', 'en.json');
const JA = path.join(REPO, 'src', 'data', 'blog-data', 'ja.json');

// [文件, 正则, 替换, 说明]  —— 顺序重要: 具体(含尾部英文) 先于 兜底
const RULES = [
  [EN, /國際認證體系\s*certified\s*Factory-Direct/g, 'internationally certified Factory-Direct', '消费尾部 certified+Factory-Direct'],
  [EN, /國際認證體系\s*certified/g, 'internationally certified', '消费尾部 certified'],
  [EN, /國際認證體系/g, 'internationally certified', '兜底'],
  [EN, /進口印刷設備\s+6\+1\s*press(es)?/g, 'Heidelberg 6+1 press', '6+1 形态'],
  [EN, /進口印刷設備\s*press(es)?/g, 'Heidelberg presses', '消费尾部 presses'],
  [EN, /進口印刷設備/g, 'Heidelberg presses', '兜底'],
  [EN, /FSC\s*認證紙\s*certified/g, 'FSC-certified paper', '消费尾部 certified'],
  [EN, /FSC\s*認證紙/g, 'FSC-certified paper', '带 FSC 前缀'],
  [EN, /認證紙/g, 'certified paper', '兜底'],
  [EN, /急件\s*18:00\s*截單/g, 'rush orders, 18:00 cutoff', '固定句式'],
  [EN, /急件/g, 'rush orders', '兜底'],
  [EN, /截單/g, 'cutoff', '兜底'],
  [EN, /答案{2,}/g, '', '只删 2 连以上重复 (坏输出)'],
  // ja 语系
  [JA, /國際認證體系\s*認証/g, '国際認証', '消耗尾部 認証'],
  [JA, /國際認證體系/g, '国際認証', 'ja 兜底'],
  [JA, /進口印刷設備/g, 'ハイデルベルク印刷機', 'ja'],
  [JA, /FSC\s*認證紙/g, 'FSC 認証紙', 'ja FSC'],
  [JA, /認證紙/g, '認証紙', 'ja 兜底'],
  [JA, /答案{2,}/g, '', 'ja 坏输出'],
];

console.log('=== 批 2 规则 v2 干跑 (只读) ===\n');
const src = {};
for (const f of new Set(RULES.map(r => r[0]))) src[f] = fs.readFileSync(f, 'utf8');

const out = { ...src };
for (const [f, re, to, note] of RULES) {
  const before = out[f];
  const n = (before.match(re) || []).length;
  out[f] = before.replace(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'), to);
  if (n) console.log(`  ${path.basename(f).padEnd(9)} ${String(n).padStart(3)} 处  ${re.source.slice(0, 42).padEnd(44)} → ${JSON.stringify(to).slice(0, 34)}  (${note})`);
}

console.log('\n=== 重复词自检 (改后) ===');
const DUP = ['certified certified', 'presses presses', 'paper certified', 'cutoff cutoff', 'rush orders rush orders', 'internationally internationally', 'Heidelberg Heidelberg'];
let dupFail = 0;
for (const f of Object.keys(out)) {
  for (const d of DUP) {
    const n = out[f].split(d).length - 1;
    if (n) { console.log(`  ❌ ${path.basename(f)}: 「${d}」 × ${n}`); dupFail++; }
  }
}
if (!dupFail) console.log('  ✅ 无重复词');

console.log('\n=== 残留 token 检查 ===');
for (const f of Object.keys(out)) {
  const left = ['國際認證體系', '進口印刷設備', '認證紙', '急件', '截單'].filter(t => out[f].includes(t));
  console.log(`  ${path.basename(f)}: ${left.length ? '⚠️ ' + JSON.stringify(left) : '✅ 已清'}`);
  // 答案 残留(正常单次使用应保留)
  const ans = (out[f].match(/答案/g) || []).length;
  if (ans) console.log(`     ℹ️ 「答案」保留 ${ans} 处 (正常单次用法, 未删)`);
}

console.log('\n=== JSON 合法性 + 结构守恒 ===');
for (const f of Object.keys(out)) {
  try {
    const a = JSON.parse(src[f]), b = JSON.parse(out[f]);
    const ok = Object.keys(a).length === Object.keys(b).length;
    console.log(`  ${path.basename(f)}: JSON ✅ | 篇目 ${Object.keys(a).length} → ${Object.keys(b).length} ${ok ? '✅' : '❌'}`);
  } catch (e) { console.log(`  ${path.basename(f)}: ❌ ${e.message}`); }
}

console.log('\n=== 改后样例 (前 6 处 en) ===');
const s = out[EN];
['internationally certified', 'Heidelberg presses', 'FSC-certified paper', 'rush orders, 18:00 cutoff'].forEach(k => {
  const i = s.indexOf(k);
  if (i >= 0) console.log(`  「${k}」: …${JSON.stringify(s.slice(Math.max(0, i - 90), i + k.length + 90))}…`);
});
console.log('\n(干跑结束, 未修改任何文件)');
