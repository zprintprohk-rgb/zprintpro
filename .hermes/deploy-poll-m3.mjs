// CF Pages deploy 轮询 (2026-09-11 blog-M3)
// 用法: node .hermes/deploy-poll-m3.mjs <expected-commit-hash>
// 成功 = build=success && deploy∈{success,active,idle}; 轮询 16×60s
import fs from 'fs';
import { execSync } from 'child_process';

const ACCOUNT = '32c174efaa22353f357c0fdff9d61b86';
const PROJECT = 'zprintpro';
const expected = process.argv[2];
const token = fs
  .readFileSync('F:/zprintpro-nextjs/.env', 'utf8')
  .split(/\r?\n/)
  .find((l) => l.startsWith('CLOUDFLARE_PAGES_TOKEN='))
  ?.split('=')[1]
  ?.trim();
if (!token) { console.error('no token'); process.exit(1); }
if (!expected) { console.error('usage: node deploy-poll-m3.mjs <hash>'); process.exit(1); }

function status() {
  const out = execSync(`curl.exe -sS -m 30 -H "Authorization: Bearer ${token}" "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT}/pages/projects/${PROJECT}/deployments?per_page=5"`, { encoding: 'utf8' });
  const j = JSON.parse(out);
  if (!j.success) return { err: JSON.stringify(j.errors || j) };
  const d = j.result.find((x) => (x.deployment_trigger?.metadata?.commit_hash || '').startsWith(expected));
  if (!d) return { notFound: true, latest: j.result[0]?.deployment_trigger?.metadata?.commit_hash, latestId: j.result[0]?.id };
  const ls = d.latest_stage || {};
  return {
    id: d.id,
    commit: d.deployment_trigger?.metadata?.commit_hash,
    lsName: ls.name,
    lsStatus: ls.status,
    stage: d.stage,
    created: d.created_on,
  };
}

for (let i = 1; i <= 16; i++) {
  const s = status();
  if (s.err) { console.log(`[${i}] API error: ${s.err}`); }
  else if (s.notFound) { console.log(`[${i}] deploy for ${expected} not found yet (latest=${s.latest})`); }
  else {
    console.log(`[${i}] id=${s.id} stage=${s.lsName}:${s.lsStatus} top-stage=${s.stage || '-'}`);
    const done = s.lsName === 'deploy' && ['success', 'active', 'idle'].includes(s.lsStatus);
    const done2 = ['success', 'active', 'idle'].includes(s.stage) && s.stage;
    if (done || done2) {
      console.log('DEPLOY_OK');
      process.exit(0);
    }
    if (s.lsStatus === 'failure' || s.stage === 'failure') { console.log('BUILD_FAILURE'); process.exit(2); }
  }
  await new Promise((r) => setTimeout(r, 60000));
}
console.log('POLL_TIMEOUT');
process.exit(3);
