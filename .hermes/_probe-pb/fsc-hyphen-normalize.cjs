'use strict';
/**
 * FSC 连字符归一: `FSC certified` → `FSC-certified` (K3 搜索确认的标准写法)
 *   · 词级替换 (非字级) —— 遵技术债 8
 *   · 逐档 + 注释行保护断言 + 已有连字符者不得被二次改写
 *   · 危险写入三件套
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');

const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', '.git', '.next'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out); else if (/\.(ts|tsx|json)$/.test(e.name)) out.push(p);
  }
  return out;
};

const files = walk(path.join(REPO, 'src')).filter(f => /FSC certified/.test(fs.readFileSync(f, 'utf8')));
console.log(`待改档: ${files.length}`);

const orig = {};
for (const f of files) orig[f] = fs.readFileSync(f, 'utf8');

// 计数断言
let total = 0;
for (const f of files) total += orig[f].split('FSC certified').length - 1;
console.log(`计数: FSC certified 共 ${total} 处`);
if (total !== 119) console.log(`  ⚠️ 与盘点 (119) 不符, 以实测 ${total} 为准`);

// 备份
for (const f of files) {
  const b = path.join(REPO, '.hermes', '_probe-pb', '_fschyph.' + path.basename(f) + '.bak');
  fs.writeFileSync(b, orig[f], 'utf8');
}
console.log('备份 OK');

// 替换 (词级)
const out = {};
for (const f of files) out[f] = orig[f].split('FSC certified').join('FSC-certified');

// 断言 ①: 残留清零
const left = files.filter(f => out[f].includes('FSC certified'));
if (left.length) { console.error(`❌ 残留断言失败: ${left.length} 档 -> 不写盘`); process.exit(1); }
console.log('残留断言 OK: FSC certified 0 残留');

// 断言 ②: 不得产生 FSC--certified / FSC-certified-certified 等畸形
const BAD = ['FSC--certified', 'FSC-certified-certified', 'FSC-certified certified', 'FSC certified-certified'];
for (const f of files) {
  for (const b of BAD) {
    if (out[f].includes(b)) { console.error(`❌ 畸形断言失败 [${path.basename(f)}]: 「${b}」 -> 不写盘`); process.exit(1); }
  }
}
console.log('畸形断言 OK: 4 类畸形 0 命中');

// 断言 ③: 注释行保护 (技术债 8) —— 注释行改动数必须为 0
let commentChanged = 0;
for (const f of files) {
  const a = orig[f].split('\n'), b = out[f].split('\n');
  if (a.length !== b.length) { console.error(`❌ 行数变化 [${f}] -> 不写盘`); process.exit(1); }
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue;
    if (/^\s*(\/\/|\*|\/\*)/.test(a[i])) { commentChanged++; console.log(`  ⚠️ 注释行被改: ${path.basename(f)}:${i + 1}`); }
  }
}
if (commentChanged) { console.error(`❌ 注释行保护断言失败: ${commentChanged} 行 -> 不写盘`); process.exit(1); }
console.log('注释行保护断言 OK: 注释行改动 0');

// 断言 ④: JSON 合法性 + 篇目守恒
for (const f of files.filter(x => x.endsWith('.json'))) {
  try {
    const a = JSON.parse(orig[f]), b = JSON.parse(out[f]);
    const ka = Object.keys(a).length, kb = Object.keys(b).length;
    if (ka !== kb) { console.error(`❌ 结构断言失败 [${path.basename(f)}] -> 不写盘`); process.exit(1); }
    console.log(`  JSON OK [${path.basename(f)}]: 顶层键 ${kb} 守恒`);
  } catch (e) { console.error(`❌ JSON 解析失败 [${f}]: ${e.message} -> 不写盘`); process.exit(1); }
}

// 写盘 + 回读
for (const f of files) {
  fs.writeFileSync(f, out[f], 'utf8');
  const back = fs.readFileSync(f, 'utf8');
  if (back !== out[f] || back.charCodeAt(0) === 0xFEFF) {
    for (const f2 of files) fs.writeFileSync(f2, orig[f2], 'utf8');
    console.error(`❌ 写盘校验失败 [${f}] -> 已全量回滚`); process.exit(1);
  }
}
console.log(`\n✅ FSC 连字符归一写盘成功: ${files.length} 档 / ${total} 处`);
