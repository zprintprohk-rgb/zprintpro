// .hermes/_hubfaq_ja_raw.cjs
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const pc = s.indexOf('packagingContent');
const zh = s.indexOf("'zh-hk': {", pc);
const en = zh + s.slice(zh).search(/\n\s{2}(?:'en'|en):\s*\{/);
const ja = en + s.slice(en).search(/\n\s{2}(?:'ja'|ja):\s*\{/);
const blk = s.slice(ja, ja + 12000);
const start = blk.indexOf('易拉架印刷幾錢');
const end = blk.indexOf('噴繪廣告最快多久可以取');
// 打印从 start 前 120 到 end 后 220
console.log('start', start, 'end', end);
console.log(JSON.stringify(blk.slice(Math.max(0, start - 260), start + 60)));
console.log('---- tail ----');
console.log(JSON.stringify(blk.slice(end - 40, end + 320)));
