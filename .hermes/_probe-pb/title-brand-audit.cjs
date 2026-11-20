'use strict';
// 3 篇 en 標題缺「| ZprintPro」是普遍現象還是個案? (決定升級口徑)
const fs = require('fs');
const path = require('path');
const ROOT = 'F:\\zprintpro-nextjs';
const src = fs.readFileSync(path.join(ROOT, 'src/data/blog-posts.ts'), 'utf8');

const re = /slug:\s*'([^']+)'[\s\S]*?title:\s*\{([\s\S]*?)\n  \},/g;
const rows = [];
let m;
while ((m = re.exec(src)) !== null) {
  const body = m[2];
  const get = (loc) => {
    const q = body.match(new RegExp("'?" + loc + "'?:\\s*(\"((?:[^\"\\\\]|\\\\.)*)\"|'((?:[^'\\\\]|\\\\.)*)')"));
    return q ? (q[2] !== undefined ? q[2] : q[3]) : '';
  };
  rows.push({ slug: m[1], en: get('en'), zh: get('zh-hk'), ja: get('ja') });
}

const eq = (s) => { let n = 0; for (const c of s) n += /[\u3000-\u9fff\uff00-\uffef]/.test(c) ? 2 : 1; return n; };

const noBrand = rows.filter(r => r.en && !/ZprintPro/.test(r.en));
const withBrand = rows.filter(r => r.en && /ZprintPro/.test(r.en));
console.log('blog-posts.ts meta 條目 (可解析 title 的): ' + rows.length);
console.log('  en 標題含 ZprintPro : ' + withBrand.length);
console.log('  en 標題缺 ZprintPro : ' + noBrand.length + '  ← 是否系統性?');
console.log('\n缺品牌的 en 標題清單:');
noBrand.forEach(r => console.log('   ' + r.slug + '  [' + eq(r.en) + ']  ' + r.en.slice(0, 72)));

const zhNo = rows.filter(r => r.zh && !/智印港/.test(r.zh));
console.log('\nzh-hk 標題缺「智印港」: ' + zhNo.length);
zhNo.slice(0, 12).forEach(r => console.log('   ' + r.slug + '  [' + eq(r.zh) + ']  ' + r.zh.slice(0, 60)));

const jaNo = rows.filter(r => r.ja && !/ZprintPro/.test(r.ja));
console.log('\nja 標題缺「ZprintPro」: ' + jaNo.length);
jaNo.slice(0, 12).forEach(r => console.log('   ' + r.slug + '  [' + eq(r.ja) + ']  ' + r.ja.slice(0, 60)));
