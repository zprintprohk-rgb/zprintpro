'use strict';
/** FSC Certified 归一 v2: **逐行跳过注释行**再替换 (遵技术债 8) */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const walk = (d, out = []) => {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', '.git', '.next'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (/\.(ts|tsx|json)$/.test(e.name)) out.push(p);
  }
  return out;
};
const files = walk(path.join(REPO, 'src')).filter(f => /FSC Certified/.test(fs.readFileSync(f, 'utf8')));
console.log('待改档:', files.length);

const orig = {};
for (const f of files) orig[f] = fs.readFileSync(f, 'utf8');

const isComment = (L) => /^\s*(\/\/|\*|\/\*)/.test(L);
let total = 0, skippedComment = 0;
const out = {};
for (const f of files) {
  const lines = orig[f].split('\n');
  const nl = lines.map(L => {
    if (!L.includes('FSC Certified')) return L;
    if (isComment(L)) { skippedComment += L.split('FSC Certified').length - 1; return L; }   // 注释行跳过
    total += L.split('FSC Certified').length - 1;
    return L.split('FSC Certified').join('FSC-certified');
  });
  out[f] = nl.join('\n');
}
console.log(`替换 ${total} 处; 跳过注释行 ${skippedComment} 处 (不进用户可见字段, 按技术债 8 不改)`);

for (const f of files) fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', '_fscC2.' + path.basename(f) + '.bak'), orig[f], 'utf8');

// 断言 ①: 非注释行内必须 0 残留
let leftNonComment = 0;
for (const f of files) {
  out[f].split('\n').forEach(L => { if (!isComment(L) && L.includes('FSC Certified')) leftNonComment++; });
}
if (leftNonComment) { console.error(`❌ 残留断言失败: 非注释行仍有 ${leftNonComment} 行 -> 不写盘`); process.exit(1); }
console.log('残留断言 OK: 非注释行 FSC Certified 0 残留');

// 断言 ②: 畸形
const BAD = ['FSC--certified', 'FSC-certified-certified', 'FSC-certified Certified'];
for (const f of files) for (const b of BAD) if (out[f].includes(b)) { console.error(`❌ 畸形断言失败: ${b} -> 不写盘`); process.exit(1); }
console.log('畸形断言 OK');

// 断言 ③: 注释行保护 —— 注释行内容必须逐字不变
let changed = 0;
for (const f of files) {
  const a = orig[f].split('\n'), b = out[f].split('\n');
  if (a.length !== b.length) { console.error(`❌ 行数变化 [${path.basename(f)}] -> 不写盘`); process.exit(1); }
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) continue;
    if (isComment(a[i])) { changed++; console.log(`  ⚠️ 注释行被改 ${path.basename(f)}:${i + 1}`); }
  }
}
if (changed) { console.error(`❌ 注释行保护断言失败: ${changed} 行 -> 不写盘`); process.exit(1); }
console.log('注释行保护断言 OK: 注释行逐字未变');

// 断言 ④: JSON 结构
for (const f of files.filter(x => x.endsWith('.json'))) {
  const a = JSON.parse(orig[f]), b = JSON.parse(out[f]);
  if (Object.keys(a).length !== Object.keys(b).length) { console.error(`❌ 结构断言失败 [${path.basename(f)}] -> 不写盘`); process.exit(1); }
}
console.log('JSON 结构断言 OK');

for (const f of files) {
  fs.writeFileSync(f, out[f], 'utf8');
  if (fs.readFileSync(f, 'utf8') !== out[f]) { for (const f2 of files) fs.writeFileSync(f2, orig[f2], 'utf8'); console.error('❌ 写盘校验失败 -> 已回滚'); process.exit(1); }
}
console.log(`\n✅ FSC Certified 归一成功: ${files.length} 档 / ${total} 处 (注释行 ${skippedComment} 处按规矩保留)`);
