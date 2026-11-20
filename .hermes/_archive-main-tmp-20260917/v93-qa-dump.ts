import { categoryConversionBlocks } from '../src/data/category-conversion-blocks';

const keys = Object.keys(categoryConversionBlocks);
console.log('顶层键数:', keys.length);
console.log('前 8 个键:', keys.slice(0, 8).join(' | '));

// 逐键结构探测
const k0 = keys[0];
const v0 = categoryConversionBlocks[k0];
console.log(`\n${k0} 的字段:`, Object.keys(v0).join(', '));
const qa = (v0 as { quickAnswers?: Array<{ q: string; a: string }> }).quickAnswers;
if (qa) console.log(`quickAnswers 条数=${qa.length}, 第 1 条 a 长度=${[...qa[0].a].length}`);

// 统计: 每个键的 quickAnswers 长度
let total = 0;
const over: Array<{ key: string; i: number; len: number; q: string }> = [];
for (const k of keys) {
  const v = categoryConversionBlocks[k] as { quickAnswers?: Array<{ q: string; a: string }> };
  const list = v.quickAnswers || [];
  list.forEach((x, i) => {
    total++;
    const len = [...x.a].length;
    if (len > 60) over.push({ key: k, i, len, q: x.q.slice(0, 40) });
  });
}
console.log(`\n全部 quickAnswers: ${total} 条; 超 60 字: ${over.length}`);
for (const o of over.sort((a, b) => b.len - a.len)) console.log(`  [${o.key} #${o.i}] ${o.len}字  Q: ${o.q}`);
