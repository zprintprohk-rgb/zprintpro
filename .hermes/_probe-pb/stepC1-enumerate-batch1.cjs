'use strict';
/** Step C 批 1 精确清单: 从 CSV 逐字符聚合出「值级」待修项 (含数组元素), 并与五组术语归并 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const CSV = path.join(REPO, '.hermes', 'logs', 'i18n-en-cjk-classification-v2-2026-09-19.csv');

function parseCsvLine(line) {
  const out = []; let cur = '', q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) { if (c === '"') { if (line[i + 1] === '"') { cur += '"'; i++; } else q = false; } else cur += c; }
    else if (c === '"') q = true;
    else if (c === ',') { out.push(cur); cur = ''; }
    else cur += c;
  }
  out.push(cur);
  return out;
}

const raw = fs.readFileSync(CSV, 'utf8').split('\n').filter(l => l.trim());
const header = parseCsvLine(raw[0]);
const idx = {};
header.forEach((h, i) => idx[h] = i);
console.log('CSV 列:', header.join(' | '));

const rows = raw.slice(1).map(l => parseCsvLine(l));
const BUCKETS_B1 = new Set(['title', 'description', 'category', 'JSON-LD']);

// 按 (file, line, bucket) 聚合
const groups = new Map();
for (const r of rows) {
  const b = r[idx.bucket_B];
  if (!BUCKETS_B1.has(b)) continue;
  const key = `${r[idx.file]}|${r[idx.line]}|${b}`;
  if (!groups.has(key)) groups.set(key, { file: r[idx.file], line: +r[idx.line], bucket: b, chars: [], field: r[idx.field_B], excerpt: r[idx.excerpt], arrayEl: r[idx.arrayElement] });
  groups.get(key).chars.push(r[idx.char]);
}

console.log(`\n=== 批 1 值级条目 (title/description/category/JSON-LD): ${groups.size} 条 ===\n`);
const byBucket = {};
const byFile = {};
for (const g of [...groups.values()].sort((a, b) => a.bucket.localeCompare(b.bucket) || a.file.localeCompare(b.file) || a.line - b.line)) {
  byBucket[g.bucket] = byBucket[g.bucket] || { n: 0, c: 0 };
  byBucket[g.bucket].n++; byBucket[g.bucket].c += g.chars.length;
  byFile[g.file] = byFile[g.file] || { n: 0, c: 0 };
  byFile[g.file].n++; byFile[g.file].c += g.chars.length;
}
console.log('档位小计:'); Object.entries(byBucket).forEach(([k, v]) => console.log(`  ${k.padEnd(12)} ${v.n} 条 / ${v.c} 字`));
console.log('文件小计:'); Object.entries(byFile).forEach(([k, v]) => console.log(`  ${k.replace('src/data/', '').padEnd(30)} ${v.n} 条 / ${v.c} 字`));
console.log(`  合计 ${[...groups.values()].reduce((a, g) => a + g.chars.length, 0)} 字`);

// 术语归并
const term = {};
for (const g of groups.values()) {
  const s = g.chars.join('');
  term[s] = (term[s] || 0) + 1;
}
console.log('\n=== 命中中文串归并 (决定要拍几个术语) ===');
Object.entries(term).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => console.log(`  ${String(v).padStart(3)} × 「${k}」`));

// 输出明细
const out = [...groups.values()].sort((a, b) => a.bucket.localeCompare(b.bucket) || a.file.localeCompare(b.file) || a.line - b.line)
  .map(g => ({ bucket: g.bucket, file: g.file, line: g.line, field: g.field, chars: g.chars.join(''), excerpt: (g.excerpt || '').slice(0, 220) }));
fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepC-batch1-items.json'), JSON.stringify(out, null, 2), 'utf8');
console.log(`\n明细已落盘 (${out.length} 条): .hermes/_probe-pb/stepC-batch1-items.json`);
