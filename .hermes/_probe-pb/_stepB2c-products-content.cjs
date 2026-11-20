'use strict';
/** Step B-2c: 定位 products-content.ts 代码行内的 4 处命中 (判定性质: 客户可见 or 技术标识) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
const F = path.join(REPO, 'src', 'data', 'products-content.ts');
const lines = fs.readFileSync(F, 'utf8').split('\n');

console.log(`=== products-content.ts 共 ${lines.length} 行 ===\n`);
lines.forEach((L, i) => {
  const hits = [];
  for (const re of guard.GSC_LEAK_PATTERNS) { re.lastIndex = 0; const m = re.exec(L); if (m) hits.push(m[0]); }
  if (!hits.length) return;
  const t = L.trim();
  const isComment = t.startsWith('//') || t.startsWith('*') || t.startsWith('/*');
  console.log(`--- L${i + 1} ${isComment ? '【注释行】' : '【代码行 🔴】'} 命中 ${JSON.stringify(hits)} ---`);
  // 打印命中附近上下文
  hits.forEach(h => {
    const idx = L.indexOf(h.trim());
    console.log('    上下文: ' + JSON.stringify(L.slice(Math.max(0, idx - 120), idx + 120)));
  });
  console.log('');
});

// 判断这些字符串是否是「客户可见值」: 看是否处于 locale 键值内
console.log('=== 结构性判断: 命中是否位于 locale 值字符串内 ===');
lines.forEach((L, i) => {
  const hits = [];
  for (const re of guard.GSC_LEAK_PATTERNS) { re.lastIndex = 0; const m = re.exec(L); if (m) hits.push(m[0]); }
  if (!hits.length) return;
  const t = L.trim();
  if (t.startsWith('//') || t.startsWith('*')) return;
  const localeKey = /(?:'zh-hk'|"zh-hk"|en|ja)\s*:\s*['"]/.test(L);
  console.log(`  L${i + 1}: 含 locale 键值形态 = ${localeKey}`);
  console.log(`     整行前 200: ${JSON.stringify(L.slice(0, 200))}`);
});
