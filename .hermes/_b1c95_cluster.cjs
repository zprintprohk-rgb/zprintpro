// .hermes/_b1c95_cluster.cjs — 按文件聚类病灶短语 (±50 归一化签名) 供规则表制定
const fs = require('fs');
const REPO = process.cwd();
const file = process.argv[2];
const pats = process.argv[3].split('|');
const t = fs.readFileSync(file, 'utf8');
const shapes = {};
for (const p of pats) {
  let i = 0;
  while (true) {
    const j = t.indexOf(p, i);
    if (j < 0) break;
    const sig = t.slice(Math.max(0, j - 45), j + p.length + 45).replace(/\s+/g, ' ');
    const key = sig.slice(0, 80);
    if (!shapes[key]) shapes[key] = { n: 0, pat: p, sample: sig };
    shapes[key].n++;
    i = j + 1;
  }
}
const keys = Object.keys(shapes).sort((a, b) => shapes[b].n - shapes[a].n);
let cov = 0;
for (const k of keys) { cov += shapes[k].n; console.log(`[${shapes[k].n}x][${shapes[k].pat}] ...${shapes[k].sample}...`); }
console.log(`shapes=${keys.length} covered=${cov}`);
