// 后台异步等 30min 窗口后 push (per §0.25.8: 后台等待不阻塞主进程)
// 上次 push ff2ee768 = 07:09:36 → 最早 07:39:36; 目标 07:40:00
const { execSync } = require('child_process');
const target = new Date();
target.setHours(7, 40, 0, 0);
const now = new Date();
let waitMs = target - now;
if (waitMs < 0) waitMs = 0;
console.log(`等待 ${Math.round(waitMs / 1000)}s 至 ${target.toTimeString().slice(0, 8)} 后 push...`);
setTimeout(() => {
  try {
    const out = execSync('git push origin main 2>&1', { cwd: 'F:/zprintpro-nextjs', encoding: 'utf8' });
    console.log('PUSH OUTPUT:\n' + out.slice(-600));
    const head = execSync('git log -1 --format="origin/main = %h %ci" origin/main', { cwd: 'F:/zprintpro-nextjs', encoding: 'utf8' });
    console.log(head.trim());
  } catch (e) {
    console.error('PUSH FAILED: ' + (e.stdout || e.message));
    process.exit(1);
  }
}, waitMs);
