'use strict';
/** 抓出门禁唯一的 red 命中 (定位它属于哪档) */
const { execSync } = require('child_process');
const out = execSync('node scripts/check-regression-guard.js 2>&1', { encoding: 'utf8', maxBuffer: 128 * 1024 * 1024 });
const lines = out.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('🔴 HARD')) {
    console.log('=== red 命中 (#1) ===');
    for (let j = i; j < Math.min(i + 4, lines.length); j++) console.log('  ' + lines[j].trim().slice(0, 200));
    break;
  }
}
// 也抓 scoped / DoD 结论行
console.log('\n=== 结论行 ===');
lines.filter(l => /DoD|HARD|拦截|预警|新增缺陷|scoped/i.test(l)).slice(0, 12).forEach(l => console.log('  ' + l.trim().slice(0, 190)));
