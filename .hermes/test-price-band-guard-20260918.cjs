/**
 * 门童 #19 负向测试 (端到端): 注入旧价 → 必须 red; 还原 → 必须 0
 * 教训依据: 「验证门童真生效 = 端到端」—— 只测脚本负向用例不算。
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const FILE = path.join(ROOT, 'src/data/blog-data/zh-hk.json');
const orig = fs.readFileSync(FILE, 'utf8');

function runGuard() {
  try {
    const out = execFileSync(process.execPath, [path.join(ROOT, 'scripts/check-regression-guard.js')], {
      cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
    });
    return out;
  } catch (e) {
    return (e.stdout || '') + (e.stderr || '');
  }
}

function guard19(out) {
  const i = out.indexOf('门童 #19');
  if (i === -1) return 'NOT FOUND';
  const seg = out.slice(i, i + 400).split('\n')[0];
  return seg.trim();
}

// 1) 基线: 应 0 命中
const base = runGuard();
console.log('1) 基线      : ' + guard19(base));

// 2) 注入旧值 (只动 1 处) → 必须 red
const marker = '"slug": "2027-calendar-printing-complete-guide"';
const at = orig.indexOf(marker);
const target = 'HK$8-25/本 (500 本批量)';
const tAt = orig.indexOf(target, at);
if (tAt === -1) { console.error('注入点未找到'); process.exit(2); }
const injected = orig.slice(0, tAt) + 'HK$14-57/本 (500 本批量)' + orig.slice(tAt + target.length);
fs.writeFileSync(FILE, injected, 'utf8');
const after = runGuard();
console.log('2) 注入旧值后: ' + guard19(after));
const caught = /1 命中|[1-9]\d* 命中/.test(guard19(after)) && /CALENDAR_PRICE_BAND/.test(after);

// 3) 还原 → 必须 0
fs.writeFileSync(FILE, orig, 'utf8');
const restored = runGuard();
console.log('3) 还原后    : ' + guard19(restored));

const ok = /✅ 0 命中/.test(guard19(base)) && caught && /✅ 0 命中/.test(guard19(restored));
console.log('\n' + (ok ? '✅ 负向测试通过: 门童 #19 端到端生效 (注入即拦, 还原即过)' : '❌ 负向测试失败'));
process.exit(ok ? 0 : 1);
