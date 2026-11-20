// G2 生产恢复 + 探针自愈循环 (2026-09-11): 轮询 prod, 连续 3 次 200 后循环跑 g2-probe v2 直到全绿
// 上限 ~40 轮 (每轮 45s), 处理 CF 平台 503 抖动
import { execSync } from 'child_process';
import { writeFileSync } from 'node:fs';

const home = 'https://zprintpro.com/zh-hk/';
const statusOf = () => {
  try {
    const out = execSync(`curl.exe -sS -o NUL -w "%{http_code}" -m 15 "${home}"`, { encoding: 'utf8', maxBuffer: 1024 * 1024 });
    return parseInt(out.trim(), 10);
  } catch { return -1; }
};

// Phase 1: 等 prod 稳定 (3×200)
let stable = 0;
for (let i = 1; i <= 100; i++) {
  const st = statusOf();
  if (st === 200) { stable++; console.log(`[${new Date().toISOString()}] ok ${stable}/3 (round ${i})`); }
  else { stable = 0; console.log(`[${new Date().toISOString()}] http=${st} (round ${i})`); }
  if (stable >= 3) break;
  await new Promise((r) => setTimeout(r, 15000));
}
if (stable < 3) {
  console.log('=== TIMEOUT phase1: prod never stable ===');
  writeFileSync('.hermes/logs/g2-probe-live.txt', `TIMEOUT phase1 ${new Date().toISOString()}\n`);
  process.exit(1);
}

// Phase 2: 循环跑探针直到全绿
console.log('=== PROD STABLE — running g2-probe v2 (self-heal loop) ===');
for (let i = 1; i <= 40; i++) {
  console.log(`--- probe attempt ${i} @ ${new Date().toISOString()} ---`);
  try {
    const out = execSync('node .hermes/g2-probe.mjs', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    console.log(out);
    if (out.includes('ALL GREEN')) {
      writeFileSync('.hermes/logs/g2-probe-live.txt', `ALL GREEN @ ${new Date().toISOString()}\n${out}`);
      console.log('=== DONE ALL GREEN ===');
      process.exit(0);
    }
  } catch (e) {
    const out = String(e.stdout || e.message || e);
    console.log(out.slice(-3000));
    if (out.includes('ALL GREEN')) {
      writeFileSync('.hermes/logs/g2-probe-live.txt', `ALL GREEN @ ${new Date().toISOString()}\n${out}`);
      console.log('=== DONE ALL GREEN ===');
      process.exit(0);
    }
  }
  await new Promise((r) => setTimeout(r, 45000));
}
writeFileSync('.hermes/logs/g2-probe-live.txt', `TIMEOUT phase2 ${new Date().toISOString()}\n`);
console.log('=== TIMEOUT phase2: not all green ===');
process.exit(1);
