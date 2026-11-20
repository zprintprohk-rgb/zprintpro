#!/usr/bin/env node
/* 只读: 打印 blog-data/zh-hk.json 全部残留 (23) 上下文, 供精确规则 */
const fs = require('fs');
for (const loc of ['zh-hk', 'ja']) {
  const raw = fs.readFileSync(`F:\\zprintpro-main-tmp\\src\\data\\blog-data\\${loc}.json`, 'utf8');
  const DUAL = /智印港\s*ZprintPro|ZprintPro\s*智印港|ジープリント\s*ZprintPro|ZprintPro\s*ジープリント/g;
  console.log(`\n=== ${loc}.json ===`);
  let m, n = 0;
  while ((m = DUAL.exec(raw)) !== null) {
    n++;
    const s = Math.max(0, m.index - 90), e = Math.min(raw.length, m.index + 60);
    console.log(`  ${n}. …${raw.slice(s, e).replace(/\s+/g, ' ')}…`);
  }
  console.log(`  合计 ${n}`);
}
