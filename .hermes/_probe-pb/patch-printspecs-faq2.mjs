// 修补第 2 轮: zh-hk Q4 答案补足 / en Q1 首句收紧
import fs from 'fs';
const p = '.hermes/_probe-pb/add-printspecs-faq.mjs';
let s = fs.readFileSync(p, 'utf8');
const before = s;
let n = 0;
// zh-hk Q4: 答案 55 字 → >=60 (只补同篇事实: 30 秒 AI 免费检测已在原文)
const z4 = [
  '智印港提供 30 秒 AI 免費文件規格檢測。',
  '智印港提供 30 秒 AI 免費文件規格檢測,上載檔案即可即時看到 DPI、出血同色彩模式三項結果。',
];
// en Q1: 首句 13 词 → ≤12
const e1 = [
  'A5 is 148 × 210 mm and A6 is 105 × 148 mm. A5 has twice the area, at 1.41x edge and 1.98x area.',
  'A5 is 148 × 210 mm and A6 is 105 × 148 mm. A5 has 2x the area of A6.',
];
for (const [o, nn] of [z4, e1]) {
  if (s.includes(o)) { s = s.replace(o, nn); n++; console.log('✅ 修补:', o.slice(0, 40)); }
  else console.log('ℹ️ 未匹配:', o.slice(0, 40));
}
if (s !== before) { fs.writeFileSync(p, s, 'utf8'); console.log(`已写回 ${n} 处`); }
