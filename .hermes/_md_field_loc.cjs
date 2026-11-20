// .hermes/_md_field_loc.cjs — 每个 md 链接所属字段 (按 category 块 + 字段名推断)
const fs = require('fs');
const s = fs.readFileSync('src/data/category-seo-content.ts', 'utf8');
const cats = ['packagingContent', 'bannersContent', 'booksContent', 'menusContent', 'envelopesContent', 'calendarsContent', 'redPacketsContent', 'educationalContent', 'stickersContent', 'flyersContent', 'postersContent', 'paperBagsContent', 'japanDoujinContent', 'greetingCardsContent'];
const marks = cats.map(c => ({ name: c, i: s.indexOf('const ' + c) })).filter(x => x.i >= 0).sort((a, b) => a.i - b.i);
const re = /\[[^\]]{1,18}\]\(\/[a-z0-9\-\/]+\)/g;
let m;
const buckets = {};
while ((m = re.exec(s)) !== null) {
  const pos = m.index;
  const cat = [...marks].reverse().find(x => x.i <= pos);
  const before = s.slice(Math.max(0, pos - 400), pos);
  const field = (before.match(/(points|description|value|title|h2|featuredSnippet|buyingGuide|subtitle|paragraphs|a|q)\s*:\s*'[^']*$/m) || ['?'])[1] ||
    (before.match(/'[^']*$/m) ? 'string-item' : '?');
  const key = `${cat ? cat.name : '?'} :: ${field}`;
  buckets[key] = (buckets[key] || 0) + 1;
}
Object.entries(buckets).sort().forEach(([k, v]) => console.log(v, k));
