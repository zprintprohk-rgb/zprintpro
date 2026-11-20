#!/usr/bin/env node
/* 只读: 列出 blog-posts.ts 内 FSC-C123456 与 99.2% 的全部出现上下文 */
const fs = require('fs');
const p = 'F:\\zprintpro-main-tmp\\src\\data\\blog-posts.ts';
const lines = fs.readFileSync(p, 'utf8').split(/\r?\n/);
const show = (needle) => {
  console.log(`\n=== 「${needle}」 ===`);
  lines.forEach((l, i) => {
    let idx = l.indexOf(needle);
    while (idx >= 0) {
      console.log(`  L${i + 1}: …${l.slice(Math.max(0, idx - 110), idx + 80).replace(/\\n/g, ' ')}…`);
      idx = l.indexOf(needle, idx + 1);
    }
  });
};
show('FSC-C123456');
show('99.2%');
