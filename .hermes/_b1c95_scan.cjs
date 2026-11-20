// .hermes/_b1c95_scan.cjs — 簇9.5 ISO 9001 形态聚类扫描 (全文件 ±70 上下文)
const fs = require('fs');
const { execSync } = require('child_process');
const REPO = process.cwd();
const files = execSync('git ls-files src/data src/lib src/app', { encoding: 'utf8' }).trim().split('\n').filter(f => /\.(ts|tsx|json)$/.test(f));
const shapes = {};
let total = 0;
for (const f of files) {
  let t;
  try { t = fs.readFileSync(f, 'utf8'); } catch (e) { continue; }
  let i = 0;
  while (true) {
    const j = t.indexOf('ISO 9001', i);
    if (j < 0) break;
    total++;
    // 形态 = ISO 9001 后 12 字符的归一化
    const tail = t.slice(j + 8, j + 30).replace(/\s+/g, ' ');
    const key = tail.slice(0, 14);
    if (!shapes[key]) shapes[key] = { n: 0, files: new Set(), sample: t.slice(Math.max(0, j - 70), j + 70).replace(/\s+/g, ' ') };
    shapes[key].n++;
    shapes[key].files.add(f);
    i = j + 1;
  }
}
const keys = Object.keys(shapes).sort((a, b) => shapes[b].n - shapes[a].n);
console.log(`TOTAL: ${total}, distinct tail-shapes: ${keys.length}`);
for (const k of keys) {
  const s = shapes[k];
  console.log(`[${s.n}x] "${k}" | files: ${[...s.files].slice(0, 4).join(',')}${s.files.size > 4 ? '+' : ''}`);
  console.log(`      ctx: ...${s.sample.slice(0, 130)}...`);
}
