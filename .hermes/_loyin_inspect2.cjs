// .hermes/_loyin_inspect2.cjs — ts 裡印块全文 + 3 SKU body 尾部 + eco/menu 博客结构
const fs = require('fs');
const t = fs.readFileSync('src/data/sku-seo-data.ts', 'utf8');
// 裡印 block 全文
const k = t.indexOf('內側印刷（裡印）');
console.log('[food-boxes 裡印 ctx]');
console.log(JSON.stringify(t.slice(Math.max(0, k - 200), k + 420)));
// 三个目标 slug 的 body 尾部 (按块切)
const SLUG_RE = /^  "([a-z0-9-]+)": \{/gm;
const marks = [];
let m;
while ((m = SLUG_RE.exec(t)) !== null) marks.push({ slug: m[1], off: m.index });
for (const target of ['folding-boxes', 'mailer-boxes', 'white-card-bags']) {
  const i = marks.findIndex(x => x.slug === target);
  if (i < 0) { console.log(target, 'NOT FOUND'); continue; }
  const seg = t.slice(marks[i].off, marks[i + 1] ? marks[i + 1].off : t.length);
  for (const field of ['body', 'bodyEn', 'bodyJa']) {
    const fm = seg.match(new RegExp(`"${field}":\\s*"((?:[^"\\\\]|\\\\.)*)"`));
    if (fm) {
      const v = fm[1];
      console.log(`[${target}.${field}] len=${v.length} tail=${JSON.stringify(v.slice(-110))}`);
    } else {
      console.log(`[${target}.${field}] no-match`);
    }
  }
}
// 博客结构 (eco-printing)
const zh = JSON.parse(fs.readFileSync('src/data/blog-data/zh-hk.json', 'utf8'));
const post = zh['eco-printing'];
console.log('eco-printing keys:', Object.keys(post || {}).join(','));
console.log('eco-printing len:', (post && post.content || '').length);
const rm = zh['restaurant-menu-printing-guide'];
console.log('restaurant-menu len:', (rm && rm.content || '').length);
