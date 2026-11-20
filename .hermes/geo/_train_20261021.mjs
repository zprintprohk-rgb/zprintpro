// 2026-10-21 catch-up push train: W2 now, W3+W4+W5 after 30-min gate. Node ESM (no PS quoting issues).
import fs from 'node:fs';
import { spawnSync } from 'node:child_process';

const LOG = '.hermes/logs/v28_5-catchup-train-2026-10-21.log';
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const log = (m) => { try { fs.appendFileSync(LOG, `[${new Date().toISOString()}] ${m}\n`, 'utf8'); } catch {} };
const run = (cmd, args, timeout = 900000) => {
  const r = spawnSync(cmd, args, { encoding: 'utf8', shell: true, timeout, maxBuffer: 16 * 1024 * 1024 });
  return { status: r.status, out: (r.stdout || '').slice(-800), err: (r.stderr || '').slice(-500) };
};
const gate = () => run('node', ['scripts/push-gate-check.mjs'], 120000).status;

async function pushWithGate(sha, label) {
  for (let a = 1; a <= 8; a++) {
    const g = gate();
    log(`${label} gate_attempt=${a} exit=${g}`);
    if (g === 0) {
      for (let t = 1; t <= 3; t++) {
        const p = run('git', ['push', 'origin_ssh', `${sha}:refs/heads/main`], 300000);
        log(`${label} push_try=${t} exit=${p.status} err=${(p.err || '').replace(/\n/g, ' ')}`);
        if (p.status === 0) return true;
        await sleep(60000);
      }
      return false;
    }
    await sleep(300000);
  }
  return false;
}

async function buildProbeIndex(wave) {
  await sleep(300000);
  let ok = false;
  for (let a = 1; a <= 3; a++) {
    const p = run('node', ['scripts/v28_5-image-deploy.mjs', 'probe', `--wave=${wave}`], 1500000);
    const tail = (p.out || '').split('\n').filter(Boolean).slice(-2).join(' | ');
    log(`${wave} probe_attempt=${a} exit=${p.status} :: ${tail}`);
    if (p.status === 0) { ok = true; break; }
    await sleep(180000);
  }
  if (ok) {
    const n = run('node', ['scripts/v28_5-image-deploy.mjs', 'indexnow', `--wave=${wave}`], 180000);
    log(`${wave} indexnow exit=${n.status} :: ${(n.out || '').replace(/\n/g, ' ')}`);
  } else {
    log(`${wave} BUILD_SUSPECT_OR_PROBE_FAIL — indexnow skipped (site keeps last good deploy)`);
  }
  return ok;
}

log('TRAIN START (W2 now; W3+W4+W5 after 30min gate)');
const A = await pushWithGate('cc9493b2', 'PUSH_A_W2');
if (!A) { log('TRAIN ABORT: PUSH_A failed (gate never opened or push error)'); process.exit(1); }
await buildProbeIndex('W2-1018');
const B = await pushWithGate('a1723751', 'PUSH_B_W345');
if (!B) { log('TRAIN ABORT: PUSH_B failed'); process.exit(1); }
await sleep(300000);
for (const w of ['W3-1019', 'W4-1020', 'W5-1021']) { await buildProbeIndex(w); }
log('TRAIN DONE');
