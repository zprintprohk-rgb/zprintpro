'use strict';
/** 精确修补: 把 RULES 里每条规则的「期望次数」字段改成干跑真值
 *  定位法: 在该规则字符串起点之后, 匹配首个 `, <数字>, '` —— 那是 n 字段 (不是字符串长度字段)
 */
const fs = require('fs');
const path = require('path');
const P = path.resolve(__dirname, 'wave1-execute.cjs');
let t = fs.readFileSync(P, 'utf8');

// [规则里的旧串, 目标真值]
const FIX = [
  ['國際認證體系 certified Factory-Direct', 3],
  ['國際認證體系 certified', 8],
  ['國際認證體系', 46],
  ['進口印刷設備 6+1 presses', 2],
  ['進口印刷設備 6+1 press', 20],
  ['進口印刷設備 presses', 2],
  ['進口印刷設備 press', 5],
  ['進口印刷設備', 40],
  ['FSC 認證紙 certified', 10],
  ['FSC 認證紙 Certification', 2],
  ['FSC 認證紙', 22],
  ['急件 18:00 截單', 17],
  ['答案 nugget', 12],
];

for (const [s, n] of FIX) {
  // 找到该规则字符串「结束引号」的位置, 之后应是 `, <num>, '`
  const start = t.indexOf("'" + s + "'");
  if (start < 0) { console.log('  未找到规则: ' + s.slice(0, 30)); continue; }
  const afterStr = start + s.length + 1;              // 跳过结束引号 (start 指向起始引号)
  const seg = t.slice(afterStr, afterStr + 60);
  const m = seg.match(/^(['"]?,\s*'[^']*')(,\s*)(\d+)(,\s*')/);
  if (!m) { console.log('  定位失败: ' + s.slice(0, 30) + '  seg=' + JSON.stringify(seg.slice(0, 30))); continue; }
  const newSeg = seg.replace(/^(['"]?,\s*'[^']*')(,\s*)(\d+)(,\s*')/, `$1$2${n}$4`);
  t = t.slice(0, afterStr) + newSeg + t.slice(afterStr + 60);
  console.log(`  ${s.slice(0, 34).padEnd(36)} ${m[3]} → ${n}`);
}
fs.writeFileSync(P, t, 'utf8');
console.log('已写回');
