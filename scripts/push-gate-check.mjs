// push-gate-check.mjs — §0.25 machine gate: abort push unless >=30min since last remote push.
// Usage: node scripts/push-gate-check.mjs [origin_ssh]   exit 0 = window open | exit 1 = BLOCKED
import { execSync } from 'node:child_process';

const remote = process.argv[2] || 'origin_ssh';
const MIN_GAP_MS = 30 * 60 * 1000;

let out = '';
try {
  out = execSync(`git log ${remote}/main -1 --format=%ci`, { encoding: 'utf8' }).trim();
} catch {
  console.error('[push-gate] cannot read last remote push time — fetch first'); process.exit(1);
}
const last = new Date(out);
const now = new Date();
const gapMs = now - last;
const gapMin = Math.floor(gapMs / 60000);
if (gapMs < MIN_GAP_MS) {
  const waitMin = Math.ceil((MIN_GAP_MS - gapMs) / 60000);
  console.error(`[push-gate] BLOCKED: last push ${out} was ${gapMin}m ago (<30min §0.25.1). Wait ${waitMin} more minute(s).`);
  process.exit(1);
}
console.log(`[push-gate] OK: last push ${gapMin}m ago (>=30min §0.25.1) — window open.`);
