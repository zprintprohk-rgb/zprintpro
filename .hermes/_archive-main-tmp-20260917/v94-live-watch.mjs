// v9.4 恢复即验证: 轮询线上, 出现新版本特征后跑完整验收并落盘
import { execSync } from 'child_process';
import { writeFileSync } from 'node:fs';

const BASE = 'https://zprintpro.com';
const MARK = 'flex flex-wrap items-center gap-2 md:gap-3';
const fetchOnce = (u) => {
  try {
    const out = execSync(`curl.exe -sS -m 25 "${BASE}${u}"`, { encoding: 'utf8', maxBuffer: 200 * 1024 * 1024 });
    return out;
  } catch { return ''; }
};

for (let i = 1; i <= 60; i++) {
  const h = fetchOnce('/zh-hk/blog/');
  const ok = h.length > 20000 && h.includes(MARK);
  console.log(`[${new Date().toISOString()}] round ${i}: len=${h.length} newBuild=${ok}`);
  if (ok) {
    console.log('=== 线上已更新 — 跑完整验收 ===');
    try {
      const out = execSync('node .hermes/v94-verify-local.mjs', {
        encoding: 'utf8',
        maxBuffer: 64 * 1024 * 1024,
        env: { ...process.env, V94_BASE: BASE },
      });
      console.log(out);
      writeFileSync('.hermes/logs/v94-probe-live.txt', `LIVE OK ${new Date().toISOString()}\n${out}`);
    } catch (e) {
      const out = String(e.stdout || e.message || e);
      console.log(out);
      writeFileSync('.hermes/logs/v94-probe-live.txt', `LIVE RUN ${new Date().toISOString()}\n${out}`);
    }
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 30000));
}
writeFileSync('.hermes/logs/v94-probe-live.txt', `TIMEOUT ${new Date().toISOString()} — 线上始终未出现新版本 (CF 平台故障窗口)\n`);
console.log('=== TIMEOUT ===');
process.exit(1);
