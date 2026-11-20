// 第 3 轮修补: 用精确串替换 (含上下文) 消掉最后 2 处越界
import fs from 'fs';
const p = '.hermes/_probe-pb/add-printspecs-faq.mjs';
let s = fs.readFileSync(p, 'utf8');
const log = [];

// 1) zh-hk Q4: 加长答案 (补同篇已有事实: 三项结果)
let a = s;
s = s.replace(
  '上載檔案即可即時看到 DPI、出血同色彩模式三項結果。\'',
  '上載檔案即可即時看到 DPI、出血同色彩模式三項檢測結果,唔使來回試印。\''
);
if (s !== a) log.push('zh Q4 加长 ✅'); else log.push('zh Q4 未匹配 ⚠️');

// 2) en Q1: 首句缩到 <=12 词
a = s;
s = s.replace(
  '[\'What is the size difference between A5 and A6?\', \'A5 is 148 × 210 mm and A6 is 105 × 148 mm. A5 has 2x the area of A6.',
  '[\'What is the size difference between A5 and A6?\', \'A5 measures 148 × 210 mm and A6 measures 105 × 148 mm. A5 has 2x the area of A6.'
);
if (s !== a) log.push('en Q1 首句收紧 ✅'); else log.push('en Q1 未匹配 ⚠️');

fs.writeFileSync(p, s, 'utf8');
console.log(log.join(' | '));
