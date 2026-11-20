const fs = require('fs');
const p = 'src/data/category-seo-content.ts';
let t = fs.readFileSync(p, 'utf8');
const bad = "\n      ,\n        '";
const n = t.split(bad).length - 1;
console.log('occurrences:', n);
if (n !== 1) { console.log('ABORT'); process.exit(1); }
t = t.replace(bad, "\n        '");
fs.writeFileSync(p, t, 'utf8');
const i = t.indexOf('食品包裝專節');
console.log('AFTER:', JSON.stringify(t.slice(i - 90, i - 20)));
