// moq10-check-books-claims.mjs — 掃出書刊相關的「1 本起印 / 100 本起」宣稱 (第三波驗證用)
import fs from 'fs';
import path from 'path';

const PAT = /(1\s*本起印|1 本起訂|1\s*copy|From 1 copy|1 部から|100\s*本起印|100\s*本起|100[- ]copy MOQ|100\s*冊から|no minimum|無最低起訂量|無最低起印量)/g;

const FILES = [];
function walk(d) {
  for (const f of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, f.name);
    if (f.isDirectory()) { if (f.name !== 'node_modules') walk(p); }
    else if (/\.(ts|tsx|json)$/.test(f.name) && !/\.bak/.test(f.name)) FILES.push(p);
  }
}
walk('src');

const BOOK_HINT = /(book|books|booklet|catalog|catalogue|畫冊|書刊|本冊|冊子|紀念冊|練習冊|notebook|yearbook|textbook|saddle|perfect-bound|hardcover|spiral)/i;

let n = 0;
const out = [];
for (const f of FILES) {
  const s = fs.readFileSync(f, 'utf-8');
  s.split('\n').forEach((l, i) => {
    if (!PAT.test(l)) { PAT.lastIndex = 0; return; }
    PAT.lastIndex = 0;
    if (!BOOK_HINT.test(l) && !BOOK_HINT.test(f)) return;
    n++;
    out.push(`${f}:${i + 1}: ${l.trim().slice(0, 150)}`);
  });
}
console.log(`書刊相關 MOQ 宣稱命中: ${n}`);
out.slice(0, 40).forEach((o) => console.log('  ' + o));
