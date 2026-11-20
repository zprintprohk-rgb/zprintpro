'use strict';
/**
 * 验证 2026-09-19 收口未削弱 src/ 强制扫描:
 *   ① src/ 注入 Heidelberg ⇒ 必须仍被 CRED_HEIDELBERG 拦 (🔴 HARD)
 *   ② .hermes/logs/ 注入 Heidelberg ⇒ 应不再拦 (本次收口目的)
 *   注入-还原, 断言还原无损。
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const REPO = path.resolve(__dirname, '..', '..');
const SRC_F = path.join(REPO, 'src', 'data', 'blog-data', 'en.json');
const LOG_F = path.join(REPO, '.hermes', 'logs', '_probe-heidelberg-tmp.md');

const runGate = () => {
  const out = execSync('node scripts/check-regression-guard.js 2>&1', { cwd: REPO, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
  const hard = (out.match(/🔴 HARD/g) || []).length;
  const credLine = (out.match(/CRED_HEIDELBERG[^\n]*/g) || []).length;
  return { hard, credLine, out };
};

const bak = fs.readFileSync(SRC_F, 'utf8');
let ok = true;
try {
  // ① src/ 注入
  const injected = bak.replace('"content": "<p>', '"content": "<p>Heidelberg 6+1 test ');
  if (injected === bak) throw new Error('注入点未命中');
  fs.writeFileSync(SRC_F, injected, 'utf8');
  const g1 = runGate();
  console.log(`① src/ 注入 Heidelberg => 🔴 HARD ${g1.hard} | CRED 提及 ${g1.credLine}`);
  console.log(`   ${g1.hard > 0 ? '✅ 仍被拦 (强制扫描未削弱)' : '❌ 未被拦 — 收口过度!'}`);
  if (g1.hard === 0) ok = false;
  fs.writeFileSync(SRC_F, bak, 'utf8');

  // ② .hermes/logs/ 注入
  fs.writeFileSync(LOG_F, '# probe\nHeidelberg 6+1\n', 'utf8');
  const g2 = runGate();
  console.log(`② .hermes/logs/ 注入 Heidelberg => 🔴 HARD ${g2.hard} | CRED 提及 ${g2.credLine}`);
  console.log(`   ${g2.hard === 0 ? '✅ 未拦 (收口生效)' : '⚠️ 仍被拦 (收口未生效)'}`);
} finally {
  fs.writeFileSync(SRC_F, bak, 'utf8');
  if (fs.existsSync(LOG_F)) fs.unlinkSync(LOG_F);
  console.log(`还原: src ✅ ${fs.readFileSync(SRC_F, 'utf8') === bak ? 'OK' : '❌'} | 临时日志已删 ${!fs.existsSync(LOG_F) ? '✅' : '❌'}`);
}
process.exit(ok ? 0 : 1);
