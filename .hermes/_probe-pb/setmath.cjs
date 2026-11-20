'use strict';
// 精確集合運算: 修復前缺失 124 vs 修復後仍缺 9 → 交叉
const fs = require('fs');
const path = require('path');

function parseScan(txt, headerRe, mode) {
  const set = new Set();
  let m = null;
  for (const line of txt.split('\n')) {
    if (headerRe.test(line)) { m = mode; continue; }
    if (/非 200|非200|^✓|^★/.test(line)) { m = null; continue; }
    const g = line.match(/^\s{3}(\S+)\s+\[([^\]]+)\]/);
    if (!g || !m) continue;
    for (const l of g[2].split(',').map(s => s.trim())) set.add(l + '/' + g[1]);
  }
  return set;
}

const prefix = fs.readFileSync(path.join(__dirname, 'fullscan.txt'), 'utf8');
// 修復前: 缺 = 第一個區塊
const preMissing = new Set();
{
  let m = false;
  for (const line of prefix.split('\n')) {
    if (/缺 name="description"/.test(line)) { m = true; continue; }
    if (/有 name="description"|非 200/.test(line)) { m = false; continue; }
    const g = line.match(/^\s{3}(\S+)\s+\[([^\]]+)\]/);
    if (!g || !m) continue;
    for (const l of g[2].split(',').map(s => s.trim())) preMissing.add(l + '/' + g[1]);
  }
}
const postMissing = new Set();
{
  let m = false;
  for (const line of fs.readFileSync(path.join(__dirname, '..', 'logs', '2026-09-18-meta-description-postfix.txt'), 'utf8').split('\n')) {
    if (/仍缺 name="description"/.test(line)) { m = true; continue; }
    if (/仍缺清單/.test(line)) continue;
    if (/og:description/.test(line)) { m = false; continue; }
    const g = line.match(/^\s{3}(\S+)\/([A-Za-z0-9-]+)$/);
    if (g && m) postMissing.add(g[1] + '/' + g[2]);
  }
}

console.log('修復前缺失集合大小: ' + preMissing.size);
console.log('修復後仍缺集合大小: ' + postMissing.size);
console.log('修復後仍缺清單: ' + [...postMissing].sort().join(', '));

const both = [...postMissing].filter(k => preMissing.has(k));
const fixed = [...preMissing].filter(k => !postMissing.has(k));
const newMissing = [...postMissing].filter(k => !preMissing.has(k));
console.log('\n修復前缺失 ∩ 修復後仍缺: ' + both.length + '  -> ' + both.sort().join(', '));
console.log('修復前缺失 → 已修好: ' + fixed.length);
console.log('修復後仍缺 但 修復前未被測到 (限流): ' + newMissing.length + '  -> ' + newMissing.join(', '));
