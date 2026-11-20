// blog-ja 最安値 surgical fix: 1 FAQ headline (order-20 L96 same treatment), keep 2 descriptive/comparative
const fs = require('fs');
const P = 'src/data/blog-data/ja.json';
const raw = fs.readFileSync(P, 'utf8');
const BEFORE = '越境配送袋の最安値は?';
const AFTER = '越境配送袋の価格は?';
const n0 = raw.split('最安値').length - 1;
const hits = raw.split(BEFORE).length - 1;
if (hits !== 1) { console.error(`FAIL: "${BEFORE}" occurrences = ${hits} (expect 1)`); process.exit(1); }
const out = raw.replace(BEFORE, AFTER);
const n1 = out.split('最安値').length - 1;
JSON.parse(out); // round-trip 门
if (n1 !== 2) { console.error(`FAIL: 最安値 ${n0}->${n1} (expect 3->2)`); process.exit(1); }
fs.writeFileSync(P, out, 'utf8');
console.log(`OK: 最安値 ${n0}->${n1}; FAQ headline neutered; JSON round-trip PASS`);
