// v9.5 恢复即验证: 轮询线上直到新版本特征出现, 然后跑完整验收
import { execSync } from 'child_process';
import { writeFileSync } from 'node:fs';

const BASE = 'https://zprintpro.com';
const MARK = 'max-w-[1320px] mx-auto"><div class="relative w-full overflow-hidden flex min-h-[380px]';
const fetchOnce = (u) => {
  try {
    return execSync(`curl.exe -sS -m 25 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
  } catch { return ''; }
};

for (let i = 1; i <= 60; i++) {
  const h = fetchOnce('/zh-hk/blog/');
  const ok = h.length > 20000 && h.includes(MARK);
  console.log(`[${new Date().toISOString()}] round ${i}: len=${h.length} newBuild=${ok}`);
  if (ok) {
    console.log('=== 线上已更新 — 跑完整验收 ===');
    try {
      const out = execSync('node .hermes/v95-verify.mjs', {
        encoding: 'utf8', maxBuffer: 64 * 1024 * 1024,
        env: { ...process.env, V95_BASE: BASE },
      });
      console.log(out);
      writeFileSync('.hermes/logs/v95-probe-live.txt', `LIVE OK ${new Date().toISOString()}\n${out}`);
    } catch (e) {
      const out = String(e.stdout || e.message || e);
      console.log(out);
      writeFileSync('.hermes/logs/v95-probe-live.txt', `LIVE RUN ${new Date().toISOString()}\n${out}`);
    }
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 30000));
}
console.log('=== TIMEOUT ===');
writeFileSync('.hermes/logs/v95-probe-live.txt', `TIMEOUT ${new Date().toISOString()}\n`);
process.exit(1);
