'use strict';
/** 取每条规则的**真实出现次数** + 每处的上下文 (调整断言期望值用; 不猜数) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = {
  en: path.join(REPO, 'src', 'data', 'blog-data', 'en.json'),
  cat: path.join(REPO, 'src', 'data', 'category-seo-content.ts'),
  sku: path.join(REPO, 'src', 'data', 'sku-seo-data.ts'),
};
const src = {};
for (const k of Object.keys(F)) src[k] = fs.readFileSync(F[k], 'utf8');

const PROBES = [
  '國際認證體系 certified', '國際認證體系', '進口印刷設備', '認證紙', '急件 18:00 截單', '认证体系',
  '證書編號備索', '並製本', '上製本', '麥思印刷整合',
];
for (const [k, t] of Object.entries(src)) {
  if (k !== 'en') continue;
  console.log(`\n########## ${k} ##########`);
  for (const p of PROBES) {
    const n = t.split(p).length - 1;
    if (!n) { console.log(`  「${p}」 0 次`); continue; }
    console.log(`  「${p}」 ${n} 次:`);
    let i = -1, c = 0;
    while ((i = t.indexOf(p, i + 1)) !== -1 && c < 12) {
      c++;
      console.log(`     [${c}] …${JSON.stringify(t.slice(Math.max(0, i - 70), i + p.length + 70))}`);
    }
  }
}
