// moq10-find-saddle-campus-claims.mjs — 定位騎馬釘/校園教育頁仍寫 100 本起 與 vs Alibaba 500+ 的位置
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const PATTERNS: [string, RegExp][] = [
  ['100 本起', /\d+\s*本起/g],
  ['Alibaba 500+', /Alibaba[^。\n]{0,40}500/g],
  ['黃頁 500', /黃頁[^。\n]{0,40}500/g],
  ['500+ MOQ', /500\s*\+?\s*MOQ/gi],
];

const DIRS = ['src/data', 'src/app', 'src/components', 'src/lib'];
const files: string[] = [];
function walk(d: string) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) walk(p);
    else if (/\.(ts|tsx)$/.test(f.name) && !/\.bak/.test(f.name)) files.push(p.replace(/\\/g, '/'));
  }
}
for (const d of DIRS) if (fs.existsSync(d)) walk(d);

let n = 0;
for (const f of files) {
  const lines = fs.readFileSync(f, 'utf-8').split('\n');
  lines.forEach((l, i) => {
    for (const [label, re] of PATTERNS) {
      re.lastIndex = 0;
      if (!re.test(l)) continue;
      if (!/(騎馬釘|saddle|書刊|畫冊|校園|教育|educational|textbook|教材|證書|certificate)/i.test(l)) continue;
      n++;
      console.log(`${f}:${i + 1} [${label}]`);
      console.log(`   ${l.trim().slice(0, 190)}`);
      break;
    }
  });
}
console.log(`\n合計 ${n} 處`);
