// .hermes/_patch_lead_moq.cjs
const fs = require('fs');

// 1) conversion-blocks: 8-15 天生产 -> 限定拼版 + 标准口径
let p1 = 'src/data/category-conversion-blocks.ts';
let t1 = fs.readFileSync(p1, 'utf8');
const b1 = t1;
const reps1 = [
  ['30秒AI即時報價，8-15天生產，香港本地1-2個工作天順豐直送', '30秒AI即時報價，標準盒型3-5個工作天、拼版8-15天生產，香港本地1-2個工作天順豐直送'],
  ['8-15 天生产', '标准 3-5 个工作日 / 拼版 8-15 天'],
  ['8-15天生产', '标准 3-5 个工作日 / 拼版 8-15 天'],
];
for (const [a, b] of reps1) if (t1.includes(a)) { t1 = t1.split(a).join(b); console.log('conv replaced:', a.slice(0, 20)); }
if (t1 !== b1) fs.writeFileSync(p1, t1, 'utf8');

// 2) product-faqs: 通用包装 FAQ 的 100 個起印 -> 按盒型
let p2 = 'src/data/product-faqs.ts';
let t2 = fs.readFileSync(p2, 'utf8');
const b2 = t2;
const reps2 = [
  ['如你需要紙質食品包裝方案，100 個起印、免費 2 小時打稿', '如你需要紙質食品包裝方案，起印量按盒型而定、免費 2 小時打稿'],
];
for (const [a, b] of reps2) if (t2.includes(a)) { t2 = t2.split(a).join(b); console.log('faqs replaced'); }
if (t2 !== b2) fs.writeFileSync(p2, t2, 'utf8');
console.log('done');
