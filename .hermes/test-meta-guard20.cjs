/** P0-2 验收条件 1: 注入假缺陷 → 必须被 red 拦; 还原 → 必须 0 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const TARGET = path.join(ROOT, 'src/data/blog-data/zh-hk.json');
const orig = fs.readFileSync(TARGET, 'utf8');
const run = () => {
  try { return execFileSync(process.execPath, [path.join(ROOT, 'scripts/check-regression-guard.js')], { cwd: ROOT, encoding: 'utf8', maxBuffer: 1 << 28 }); }
  catch (e) { return (e.stdout || '') + (e.stderr || ''); }
};
const line20 = (o) => { const i = o.indexOf('门童 #20'); return i === -1 ? 'NOT FOUND' : o.slice(i, o.indexOf('\n', i)).trim(); };
const summary = (o) => (o.match(/📊 汇总:[^\n]*/) || ['(无汇总)'])[0];

const base = run();
console.log('1) 基线      : ' + line20(base));
console.log('   ' + summary(base));

// 注入: 精确重复词 A/A
const marker = '"slug": "yoga-mat-printing-guide"';
let at = orig.indexOf(marker);
if (at === -1) at = orig.indexOf('"slug": "');
const injectAt = orig.indexOf('"description": "', at);
if (injectAt === -1) { console.error('注入点未找到'); process.exit(2); }
const q = orig.indexOf('"', injectAt + 16);
const injected = orig.slice(0, injectAt + 16) + '防水貼紙/防水貼紙 100 個起，測試注入用描述文字。' + orig.slice(q);
fs.writeFileSync(TARGET, injected, 'utf8');
const after = run();
console.log('2) 注入 A/A 后: ' + line20(after));
console.log('   ' + summary(after));
const caught = /★本次新增 1|★本次新增/.test(after) && /门童 #20[^\n]*: 1 命中/.test(after);

// 还原
fs.writeFileSync(TARGET, orig, 'utf8');
const restored = run();
console.log('3) 还原后    : ' + line20(restored));
console.log('   ' + summary(restored));
const ok = /门童 #20[^\n]*✅ 0 命中/.test(base) && caught && /门童 #20[^\n]*✅ 0 命中/.test(restored);
console.log('\n' + (ok ? '✅ P0-2 验收条件 1 通过: 注入必拦 + 还原即过' : '❌ P0-2 验收条件 1 失败'));
process.exit(ok ? 0 : 1);
