'use strict';
/**
 * 精准暂存: 只把**含 FSC 的 hunk** 加入索引 (用于 products-content.ts 这类混合档)
 * 手法: 生成 patch -> 过滤 hunk -> git apply --cached
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const TARGET = process.argv[2];
if (!TARGET) { console.error('用法: node _stage-fsc-hunks-only.cjs <file>'); process.exit(2); }

const diff = execSync(`git diff -- "${TARGET}"`, { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
if (!diff.trim()) { console.log('无改动'); process.exit(0); }

const lines = diff.split('\n');
const header = [];
let i = 0;
// 文件级头 (到第一个 @@ 之前)
while (i < lines.length && !lines[i].startsWith('@@')) { header.push(lines[i]); i++; }

const hunks = [];
let cur = null;
for (; i < lines.length; i++) {
  const L = lines[i];
  if (L.startsWith('@@')) { if (cur) hunks.push(cur); cur = { head: L, body: [] }; }
  else if (cur) cur.body.push(L);
}
if (cur) hunks.push(cur);

const keep = [];
const drop = [];
for (const h of hunks) {
  const changed = h.body.filter(l => (l.startsWith('+') || l.startsWith('-')) && !l.startsWith('+++') && !l.startsWith('---'));
  const allFsc = changed.length > 0 && changed.every(l => /FSC/.test(l));
  (allFsc ? keep : drop).push(h);
}
console.log(`hunk 总数 ${hunks.length} | 含 FSC ${keep.length} | 非 FSC ${drop.length}`);

if (!keep.length) { console.log('无含 FSC 的 hunk, 不暂存'); process.exit(0); }
const patch = header.concat(...keep.map(h => [h.head, ...h.body])).join('\n') + '\n';
const pf = path.join(REPO, '.hermes', '_probe-pb', '_fsc-only.patch');
fs.writeFileSync(pf, patch, 'utf8');
try {
  execSync(`git apply --cached "${pf}"`, { cwd: REPO, encoding: 'utf8' });
  console.log(`✅ 已暂存 ${keep.length} 个含 FSC 的 hunk (patch: .hermes/_probe-pb/_fsc-only.patch)`);
} catch (e) {
  console.error('❌ git apply --cached 失败:', (e.stderr || e.message || '').toString().slice(0, 400));
  process.exit(1);
}
