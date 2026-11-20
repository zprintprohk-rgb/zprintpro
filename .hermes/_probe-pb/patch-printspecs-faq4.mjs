// 最终修补: zh-hk Q4 答案整条替换 (补足 >=60 字, 全部数字取自本篇原文)
import fs from 'fs';
const p = '.hermes/_probe-pb/add-printspecs-faq.mjs';
let s = fs.readFileSync(p, 'utf8');
const OLD = '標準係 300 DPI 加 3mm 出血同 3mm 安全區。完整規格:圖片 300 DPI、出血 3mm、安全區 3mm、CMYK 色彩、PDF/X-1a:2001 輸出。圖片低於 300 DPI 印出嚟會模糊;出血不足裁切後會有白邊;用 RGB 色彩會偏藍紫。智印港提供 30 秒 AI 免費文件規格檢測,上載檔案即可即時看到 DPI、出血同色彩模式三項檢測結果,可以一次過搞掂,唔使來回試印。';
const NEW = '標準係 300 DPI 加 3mm 出血,再加 3mm 安全區。完整規格係:圖片 300 DPI、出血 3mm、安全區 3mm、CMYK 色彩模式、以及 PDF/X-1a:2001 輸出格式。圖片低於 300 DPI,印出嚟會模糊;出血不足 3mm,裁切後會出現白邊;用 RGB 色彩,成品會偏藍紫。智印港提供 30 秒 AI 免費文件規格檢測,上載檔案即可即時看到 DPI、出血同色彩模式三項檢測結果,可以一次過搞掂,唔使來回試印。';
if (s.includes(OLD)) { s = s.replace(OLD, NEW); fs.writeFileSync(p, s, 'utf8'); console.log('✅ zh-hk Q4 整条替换完成'); }
else console.log('⚠️ 未匹配, 请检查');
