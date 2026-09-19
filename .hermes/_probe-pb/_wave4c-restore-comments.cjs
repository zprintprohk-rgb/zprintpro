'use strict';
/** 波 4 修复: 从 HEAD 逐行恢复被误改的**注释行** (注释不在门童扫描面内, 且承载语义) */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const REPO = path.resolve(__dirname, '..', '..');

const files = execSync('git diff HEAD --name-only', { cwd: REPO, encoding: 'utf8' })
  .trim().split('\n').filter(f => /\.(ts|tsx)$/.test(f));

let fixed = 0;
const report = [];
for (const rel of files) {
  const p = path.join(REPO, rel);
  const cur = fs.readFileSync(p, 'utf8').split('\n');
  const head = execSync('git show HEAD:' + rel, { cwd: REPO, encoding: 'utf8' }).split('\n');
  if (cur.length !== head.length) { console.log(`  ⚠️ 行数不同, 跳过: ${rel}`); continue; }
  let n = 0;
  for (let i = 0; i < cur.length; i++) {
    if (cur[i] === head[i]) continue;
    const isComment = /^\s*(\/\/|\*|\/\*)/.test(cur[i]);
    if (!isComment) continue;
    report.push(`  ${rel}:${i + 1}\n    恢复: ${head[i].trim().slice(0, 80)}`);
    cur[i] = head[i];
    n++;
  }
  if (n) { fs.writeFileSync(p, cur.join('\n'), 'utf8'); fixed += n; }
}
console.log('=== 注释行恢复 ===');
report.forEach(r => console.log(r));
console.log(`\n合计恢复 ${fixed} 行 (${files.length} 档扫描)`);

// 断言: 日文内容改动仍在 (未被回滚)
const jp = fs.readFileSync(path.join(REPO, 'src/data/blog-data/ja.json'), 'utf8');
const CHECK = ['紅包', '飲食デリバリー', '関連市場', '無線綴じ', 'つや消し', '新学期', 'レトロ', '大衆'];
let bad = 0;
CHECK.forEach(s => { const ok = jp.includes(s); if (!ok) { console.log(`  ❌ ja 内容丢失: ${s}`); bad++; } });
console.log(bad ? `❌ ja 内容断言失败 ${bad} 项` : '✅ ja 内容改动保留 (8 项抽查全在)');
process.exit(bad ? 1 : 0);
