const fs = require('fs');
const path = require('path');
const ROOT = path.join(__dirname, '..', 'src', 'app');
function walk(d, out = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name === 'page.tsx' || e.name === 'layout.tsx') out.push(p);
  }
  return out;
}
const files = walk(ROOT);
const rows = [];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const has = /generateMetadata/.test(c);
  if (!has) continue;
  rows.push({
    rel: f.replace(path.join(__dirname, '..') + path.sep, '').replace(/\\/g, '/'),
    alt: /alternates/.test(c),
    lang: /languages\s*:/.test(c),
  });
}
console.log('有 generateMetadata 的文件: ' + rows.length);
console.log('\n--- 缺 alternates (MISSING) ---');
rows.filter((r) => !r.alt).forEach((r) => console.log('  ' + r.rel));
console.log('\n--- 有 alternates ---');
rows.filter((r) => r.alt).forEach((r) => console.log('  ' + r.rel + (r.lang ? '' : '  (无 languages 映射)')));
// 全站硬编码 hreflang 语言码统计
console.log('\n--- 硬编码 hreflang 语言码出现位置 ---');
for (const f of [...walk(ROOT), path.join(__dirname, '..', 'src', 'lib', 'seo.ts')]) {
  const c = fs.readFileSync(f, 'utf8');
  const m = c.match(/'(zh-HK|zh-Hant-HK|en-US|en-GB|en-AU|en|ja|ja-JP)':\s*`?\$\{/g);
  if (m) console.log('  ' + f.replace(path.join(__dirname, '..') + path.sep, '').replace(/\\/g, '/') + ' → ' + [...new Set(m.map((x) => x.split(':')[0]))].join(' '));
}
