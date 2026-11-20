const fs = require('fs');
const t = fs.readFileSync('src/data/product-faqs.ts', 'utf8');
const i = t.indexOf("'mailer-boxes'");
console.log('--- mailer-boxes 结构样本 ---');
console.log(t.slice(Math.max(0, i - 120), i + 1600));
