#!/usr/bin/env node
/* 只读: blog-data zh-hk 内法人全名上下文 (§0.32 禁词, 需改为 K3 批准的表述) */
const fs = require('fs');
const raw = fs.readFileSync('F:\\zprintpro-main-tmp\\src\\data\\blog-data\\zh-hk.json', 'utf8');
const NEEDLES = ['深圳市彩龍印刷包裝有限公司', '廣東省深圳市龍崗區平湖街道嘉城路', 'Shenzhen Cai Long Printing Packaging', '518111'];
for (const n of NEEDLES) {
  const c = raw.split(n).length - 1;
  console.log(`\n=== 「${n}」 ×${c} ===`);
  let idx = -1;
  while ((idx = raw.indexOf(n, idx + 1)) !== -1) {
    console.log(`  …${raw.slice(Math.max(0, idx - 100), idx + 90).replace(/\s+/g, ' ')}…`);
  }
}
