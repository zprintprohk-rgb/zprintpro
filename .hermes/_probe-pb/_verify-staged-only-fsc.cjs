'use strict';
/** 核对暂存内容: 每一行改动是否都只涉及 FSC 写法 (防误带他人的行) */
const { execSync } = require('child_process');
const REPO = process.cwd();
const diff = execSync('git diff --cached -U0', { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
const lines = diff.split('\n');
let cur = '';
let add = 0, del = 0;
const suspicious = [];
const perFile = {};
for (const L of lines) {
  if (L.startsWith('+++ b/')) { cur = L.slice(6); perFile[cur] = perFile[cur] || { add: 0, del: 0, sus: 0 }; continue; }
  if (L.startsWith('+') && !L.startsWith('+++')) {
    add++; if (perFile[cur]) perFile[cur].add++;
    // 新增行必须与 FSC 相关
    if (!/FSC/.test(L)) { suspicious.push({ file: cur, line: L.slice(0, 160) }); if (perFile[cur]) perFile[cur].sus++; }
  } else if (L.startsWith('-') && !L.startsWith('---')) {
    del++; if (perFile[cur]) perFile[cur].del++;
    if (!/FSC/.test(L)) { suspicious.push({ file: cur, line: L.slice(0, 160) }); if (perFile[cur]) perFile[cur].sus++; }
  }
}
console.log(`暂存改动: +${add} / -${del}`);
console.log(`\n=== 不含 FSC 的改动行 (应为 0; 非 0 表示误带他人内容) ===`);
if (!suspicious.length) console.log('  ✅ 0 处 —— 暂存内容全部为 FSC 写法改动');
else { suspicious.slice(0, 20).forEach(s => console.log(`  ❌ ${s.file}\n     ${s.line}`)); console.log(`  合计 ${suspicious.length} 处`); }

console.log('\n=== 按档 ===');
Object.entries(perFile).forEach(([f, v]) => console.log(`  +${v.add}/-${v.del}  可疑 ${v.sus}   ${f}`));
process.exit(suspicious.length ? 1 : 0);
