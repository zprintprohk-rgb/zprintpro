const { execSync } = require('child_process');
const fs = require('fs');
const out = (() => { try { return execSync('node scripts/check-regression-guard.js', { encoding: 'utf8', maxBuffer: 1 << 28 }); } catch (e) { return (e.stdout || '') + (e.stderr || ''); } })();
fs.writeFileSync('.hermes/_guard-after-zine.txt', out, 'utf8');

const SLUG = 'zine-small-batch-booklet-printing-guide';
const lines = {};
for (const f of ['zh-hk', 'en', 'ja']) {
  const raw = fs.readFileSync('src/data/blog-data/' + f + '.json', 'utf8').split('\n');
  const i = raw.findIndex((l) => l.includes('"slug": "' + SLUG + '"'));
  lines['src/data/blog-data/' + f + '.json'] = i + 1;
  console.log(f + ' entry starts at line ' + (i + 1));
}
// 命中行
const hitLines = [...out.matchAll(/\[(red|orange|yellow)\]\s+([^:]+):(\d+)/g)].map((m) => ({ sev: m[1], file: m[2], line: +m[3] }));
console.log('\n总命中(含档) ' + hitLines.length);
for (const [f, ln] of Object.entries(lines)) {
  // 该 entry 的字段行范围: 从 slug 行到下一个 slug 行
  const raw = fs.readFileSync(f, 'utf8').split('\n');
  const i = ln - 1;
  let j = i + 1; while (j < raw.length && !raw[j].includes('"slug":')) j++;
  const inRange = hitLines.filter((h) => h.file === f && h.line >= i && h.line <= j);
  console.log('\n' + f + ' 新条目行范围 ' + (i + 1) + '-' + (j + 1) + ' → 命中 ' + inRange.length);
  inRange.slice(0, 12).forEach((h) => console.log('   [' + h.sev + '] line ' + h.line));
}
// 全站命中按严重度
const by = {};
for (const h of hitLines) by[h.sev] = (by[h.sev] || 0) + 1;
console.log('\n命中严重度分布(含档): ' + JSON.stringify(by));
