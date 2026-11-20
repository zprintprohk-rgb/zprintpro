'use strict';
/** 读取 buying-guides.ts L925-935 的结构化视图 (看清 entry 边界与尾巴确切坐标) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const F = path.join(REPO, 'src', 'data', 'buying-guides.ts');
const raw = fs.readFileSync(F, 'utf8');
const lines = raw.split('\n');
console.log('总行数:', lines.length, '| 文件字节:', raw.length);
for (let i = 924; i <= 934; i++) {
  const L = lines[i - 1] ?? '';
  console.log(`\n--- L${i} (len ${L.length}) ---`);
  console.log('  头部120: ' + JSON.stringify(L.slice(0, 120)));
  console.log('  尾部320: ' + JSON.stringify(L.slice(-320)));
}
// 定位泄漏尾巴的精确起止
const TAILMARK = '<p><small class="text-gray-500">数据来源：GSC 数据';
for (let i = 924; i <= 934; i++) {
  const L = lines[i - 1] ?? '';
  const idx = L.indexOf(TAILMARK);
  if (idx >= 0) {
    console.log(`\n>>> L${i} 命中尾部起点 index=${idx}, 该尾巴长度=${L.length - idx}`);
    console.log('>>> 所在 entry key 上下文: ' + JSON.stringify(L.slice(Math.max(0, idx - 60), idx)));
  }
}
