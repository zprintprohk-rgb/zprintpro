'use strict';
// 抽出 staging 稿件中「快速答案塊 / FAQ / 表格 / CTA」的實際 HTML 形狀, 作為寫手規格
const j = require('F:/zprintpro-nextjs/.hermes/staging/photo-book-content.json');
const c = j.content.en;
console.log('=== content.en 長度: ' + c.length + ' ===\n');

const qa = c.match(/<div class="[^"]*bg-amber-50[^"]*">[\s\S]{0,400}?<\/div>/g) || [];
console.log('快速答案塊數 (bg-amber-50 div): ' + qa.length);
if (qa[0]) console.log('\n--- 第 1 個完整形狀 ---\n' + qa[0]);

const faq = c.match(/<p><strong>Q[\s\S]{0,320}?<\/p>/g) || [];
console.log('\n\nFAQ 條數 (Q + br + A): ' + faq.length);
if (faq[0]) console.log('\n--- 第 1 條完整形狀 ---\n' + faq[0]);

const tbl = c.match(/<table[\s\S]{0,260}?<\/table>/g) || [];
console.log('\n\n表格數: ' + tbl.length);
if (tbl[0]) console.log('\n--- 表格開頭 260 字 ---\n' + tbl[0].slice(0, 260));

const cta = c.match(/<a[^>]*wa\.me[^>]*>[\s\S]{0,120}?<\/a>/g) || [];
console.log('\n\nCTA (wa.me) 數: ' + cta.length);
if (cta[0]) console.log('\n--- CTA 形狀 ---\n' + cta[0]);

console.log('\n\n=== 首段 (前 320 字) ===\n' + c.slice(0, 320));
