/**
 * S1 答案卡字数断言门禁 (v9.3 K3 2026-09-12 标准, 永久资产)
 * 规则: quickAnswers (AEO 答案卡) 答案长度 —— zh-hk ≤60 全角字 / ja ≤60 全角字 / en ≤300 字符
 * 用法: npx tsx .hermes/s1-answer-length-assert.ts   (violations > 0 → exit 1, 可作 push 前门禁)
 */
import { categoryConversionBlocks } from '../src/data/category-conversion-blocks';

const CAP: Record<string, number> = { 'zh-hk': 60, ja: 60, en: 300 };
const width = (s: string) => [...s].length;

let total = 0;
const violations: Array<{ key: string; loc: string; len: number; cap: number; q: string; a: string }> = [];
const byLoc: Record<string, { n: number; max: number }> = {};

for (const [key, block] of Object.entries(categoryConversionBlocks)) {
  const cap = CAP[block.locale] ?? 60;
  for (const qa of block.quickAnswers || []) {
    total++;
    const len = width(qa.a);
    byLoc[block.locale] = byLoc[block.locale] || { n: 0, max: 0 };
    byLoc[block.locale].n++;
    byLoc[block.locale].max = Math.max(byLoc[block.locale].max, len);
    if (len > cap) violations.push({ key, loc: block.locale, len, cap, q: qa.q, a: qa.a });
  }
}

console.log(`S1 答案卡字数断言: 共 ${total} 条 quickAnswers`);
for (const [loc, s] of Object.entries(byLoc)) console.log(`  ${loc}: ${s.n} 条, 最长 ${s.max} 字 (上限 ${CAP[loc]})`);
if (violations.length) {
  console.log(`\n❌ 超规格 ${violations.length} 条:`);
  for (const v of violations.sort((a, b) => b.len - a.len)) console.log(`  [${v.key}] ${v.len}>${v.cap}  Q: ${v.q.slice(0, 34)}`);
  process.exit(1);
}
console.log('\n✅ ALL PASS (无超规格答案卡)');
