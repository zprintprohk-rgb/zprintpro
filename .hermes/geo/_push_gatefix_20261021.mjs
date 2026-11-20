// Push current HEAD once the v2 gate opens (collision-#4-safe). Node ESM.
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const LOG = '.hermes/logs/v28_5-gatefix-push-2026-10-21.log';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const log = (m) => { try { fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${m}\n`, 'utf8'); } catch {} };
const run = (cmd, args, timeout = 900000) => {
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: true, timeout, maxBuffer: 16 * 1024 * 1024 });
  return { status: r.status, out: (r.stdout || '').slice(-600), err: (r.stderr || '').slice(-400) };
};

log('GATEFIX PUSH START (waits for v2 gate window >= 30min after 19:44:42 push)');
let pushed = false;
for (let a = 1; a <= 10; a++) {
  await sleep(240000);
  const g = run('node', ['scripts/push-gate-check.mjs'], 120000);
  log(`attempt=${a} gate_exit=${g.status} :: ${(g.err || g.out || '').replace(/\n/g, ' ').slice(0, 200)}`);
  if (g.status === 0) {
    for (let t = 1; t <= 3; t++) {
      const p = run('git', ['push', 'origin_ssh', 'HEAD:refs/heads/main'], 300000);
      log(`push_try=${t} exit=${p.status} :: ${(p.err || '').replace(/\n/g, ' ').slice(0, 200)}`);
      if (p.status === 0) { pushed = true; break; }
      await sleep(60000);
    }
    break;
  }
}
if (!pushed) { log('GATEFIX PUSH: not pushed (gate blocked or push failed)'); process.exit(1); }
let ok = false;
for (let j = 1; j <= 6; j++) {
  await sleep(90000);
  const v = run('node', ['scripts/verify-deploy.mjs'], 180000);
  log(`verify=${j} :: ${(v.out || v.err || '').replace(/\n/g, ' ').slice(0, 220)}`);
  if ((v.out || '').includes('PASS')) { ok = true; break; }
}
log(`GATEFIX PUSH DONE verify_ok=${ok}`);
