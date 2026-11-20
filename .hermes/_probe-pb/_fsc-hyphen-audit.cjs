'use strict';
/** FSC 连字符形态一致性盘点 (你的搜索确认: 标准写法 = FSC-certified, 带连字符) */
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

const files = walk(path.join(REPO, 'src'));
let hy = 0, no = 0;
const perFile = {};
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  const a = (t.match(/FSC-certified/gi) || []).length;
  const b = (t.match(/FSC certified/gi) || []).length;
  if (!a && !b) continue;
  hy += a; no += b;
  perFile[f.replace(REPO + path.sep, '').replace(/\\/g, '/')] = { hy: a, no: b };
}
console.log('=== FSC 写法盘点 (src/ 全档) ===');
console.log(`  FSC-certified (标准, 带连字符): ${hy}`);
console.log(`  FSC certified  (无连字符, 不一致): ${no}`);
console.log(`  合计 ${hy + no}\n`);
console.log('=== 按档分布 (仅列无连字符者, 需处置) ===');
Object.entries(perFile).filter(([, v]) => v.no).sort((a, b) => b[1].no - a[1].no)
  .forEach(([f, v]) => console.log(`  无连字符 ${String(v.no).padStart(3)} | 标准 ${String(v.hy).padStart(3)}  ${f}`));

// 分类: 是否在客户可见字段 (粗略: 行含 en/description/title/keywords/MOQ 等)
console.log('\n=== 无连字符出现的语言归属 (抽样判定) ===');
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  if (!/FSC certified/.test(t)) continue;
  const lines = t.split('\n');
  let en = 0, other = 0;
  lines.forEach(L => {
    if (!/FSC certified/.test(L)) return;
    if (/\b(ja|zh-hk)\b\s*[:':]/.test(L) && !/\ben\b\s*[:':]/.test(L)) other++;
    else en++;
  });
  console.log(`  ${f.replace(REPO + path.sep, '').replace(/\\/g, '/')}: en 疑似 ${en} 行 / 他语系疑似 ${other} 行`);
}
