import fs from 'node:fs';
const lines = fs.readFileSync('.hermes/_12seg-guard.json', 'utf8').split('\n');
console.log('total lines =', lines.length);
console.log('--- lines mentioning FAIL / PASS / 汇总 / 段级 ---');
lines.filter((l) => /FAIL|PASS|汇总|段级|总计|不合格/.test(l)).slice(0, 40).forEach((l) => console.log('  ' + l.trim().slice(0, 220)));
console.log('--- last 18 lines (summary tail) ---');
lines.slice(-18).forEach((l) => console.log('  ' + l.trim().slice(0, 220)));
