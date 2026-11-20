#!/usr/bin/env node
/* 只读: 看 seo-keywords / products.ts 残留行的所属键 (判定 title 面 vs 描述面) */
const fs = require('fs');
const ROOT = 'F:\\zprintpro-main-tmp\\';
const show = (rel, from, to) => {
  const ls = fs.readFileSync(ROOT + rel.replace(/\//g, '\\'), 'utf8').split(/\r?\n/);
  console.log(`\n=== ${rel} L${from}-${to} ===`);
  for (let i = from; i <= to; i++) {
    const l = ls[i - 1] || '';
    const mark = /智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/.test(l) ? ' <<<' : '';
    console.log(`  L${i}: ${l.trim().slice(0, 130)}${mark}`);
  }
};
show('src/lib/seo-keywords.ts', 26, 52);
show('src/lib/seo-keywords.ts', 140, 168);
show('src/data/products.ts', 7288, 7300);
show('src/lib/seo.ts', 1615, 1626);
