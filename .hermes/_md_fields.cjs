// .hermes/_md_fields.cjs — 定位 seo 文件里 markdown 链接落在哪些字段
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const re = /\]\((\/[^)]+)\)/g;
let m, n = 0;
const fields = {};
while ((m = re.exec(s)) !== null) {
  n++;
  // 向上找最近的字段名
  const before = s.slice(Math.max(0, m.index - 600), m.index);
  const fm = before.match(/(\w+):\s*\[?$/m) || before.match(/'?(\w+)'?:\s*$/m);
  const key = (before.match(/points:|faq:|description:|value:|specialOptions|techSpecs|serviceNodes/) || ['?'])[0];
  fields[key] = (fields[key] || 0) + 1;
}
console.log('total md links:', n, JSON.stringify(fields));
// FAQ 内是否有 md
const pcf = s.indexOf('packagingContent');
const zh = s.indexOf("'zh-hk': {", pcf);
const en = zh + s.slice(zh).search(/\n\s{2}(?:'en'|en):\s*\{/);
const blk = s.slice(zh, en);
const faqI = blk.indexOf('faq:');
console.log('zh hub faq md links:', (blk.slice(faqI).match(/\]\(/g) || []).length);
