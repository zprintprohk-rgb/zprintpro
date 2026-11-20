// inventory distinct CJK chars used in zh-hk / ja outputs (manual review aid)
import fs from 'fs';
const lines = fs.readFileSync('src/lib/price-data.generated.ts', 'utf8').split('\n');
const locRe = /^\s*"(zh-hk|en|ja)":\s*"((?:[^"\\]|\\.)*)",?\s*$/;
const sets = { 'zh-hk': new Set(), en: new Set(), ja: new Set() };
for (const l of lines) {
  const m = l.match(locRe);
  if (!m) continue;
  for (const ch of m[2]) if (/[\u4e00-\u9fff]/.test(ch)) sets[m[1]].add(ch);
}
for (const k of ['zh-hk', 'en', 'ja']) {
  const arr = [...sets[k]].sort();
  console.log(`[${k}] distinct 漢字 ${arr.length}:`);
  console.log('  ' + arr.join(''));
}
