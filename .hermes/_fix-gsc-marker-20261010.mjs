// 2026-10-10: remove the GSC-internal marker (待校準) that 门童 #16 flagged as a
// customer-visible leak in src/data/blog-data/zh-hk.json (corporate-holiday-cards-printing-guide).
// Minimal edit: delete only the parenthetical marker; the surrounding customer-facing
// wording already carries the meaning ("本文暫時唔引用任何數量或成效數字").
import fs from 'node:fs';

const path = 'src/data/blog-data/zh-hk.json';
const marker = '（<strong>待校準</strong>）';

const before = fs.readFileSync(path, 'utf8');
const count = before.split(marker).length - 1;
console.log('occurrences of marker =', count);
if (count !== 1) {
  console.error('ABORT: expected exactly 1 occurrence');
  process.exit(1);
}

const after = before.replace(marker, '');
fs.writeFileSync(path, after, 'utf8');

const check = fs.readFileSync(path, 'utf8');
console.log('remaining marker      =', check.split('待校準').length - 1);
console.log('remaining simplified  =', check.split('待校准').length - 1);
JSON.parse(check);
console.log('JSON parse            = OK');
console.log('delta chars           =', before.length - check.length);
const i = check.indexOf('今季嘅企業賀卡批次案例');
console.log('context               =', JSON.stringify(check.slice(i, i + 95)));
