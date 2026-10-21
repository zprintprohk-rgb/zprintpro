#!/usr/bin/env node
/**
 * push-gate-check.mjs — §0.25 machine gate: abort push unless >=30min since last ACTUAL remote push.
 *
 * v2 (2026-10-21, collision #4 root-cause fix):
 *   v1 read `git log <remote>/main -1 --format=%ci` = COMMITTER DATE, not push time.
 *   That only approximates push time when commits are pushed seconds after being committed.
 *   Today's catch-up (commits 18:17-18:2x, pushed 19:30/19:44) made v1 report "90m ago"
 *   for a real 13m53s gap → collision #4 (disclosed in SESSION_LOCK).
 *
 * v2 sources, in order:
 *   1) Actual remote head via `git ls-remote` (not the possibly-stale tracking ref)
 *   2) Cloudflare Pages check-run created_at for that head  (≈ push time; CF builds every main push)
 *   3) Fallback to commit time — but ONLY allowed to open the window if commit is >=30min old,
 *      and it prints a WARN that push time is approximated (conservative: no check-run + fresh commit => BLOCK).
 *
 * Usage: node scripts/push-gate-check.mjs [remote]   exit 0 = window open | exit 1 = BLOCKED
 */
import https from 'node:https';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const remote = process.argv[2] || 'origin_ssh';
const MIN_GAP_MS = 30 * 60 * 1000;
const REPO = 'zprintprohk-rgb/zprintpro';
const AUDIT = '.hermes/logs/push-gate.log';

function sh(cmd) {
  try { return execSync(cmd, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); }
  catch { return ''; }
}
function api(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com', path, method: 'GET', family: 4,
      headers: { 'User-Agent': 'zprintpro-push-gate/2.0', Accept: 'application/vnd.github+json' },
      timeout: 30000,
    }, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, json: JSON.parse(body) }); } catch { resolve({ status: res.statusCode, json: null }); } });
    });
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('TIMEOUT')));
    req.end();
  });
}
function audit(line) { try { fs.appendFileSync(AUDIT, `[${new Date().toISOString()}] ${line}\n`, 'utf8'); } catch {} }
function block(msg) {
  console.error(`[push-gate] BLOCKED: ${msg}`);
  audit('BLOCK ' + msg);
  process.exit(1);
}
function open(msg) {
  console.log(`[push-gate] OK: ${msg} — window open.`);
  audit('OK ' + msg);
  process.exit(0);
}

const remoteHead = sh(`git ls-remote ${remote} refs/heads/main`).split(/\s+/)[0];
if (!/^[0-9a-f]{40}$/.test(remoteHead)) block(`cannot resolve ${remote} head (network or auth) — refusing to guess`);
const commitTime = sh(`git log -1 --format=%ci ${remoteHead}`);
const now = Date.now();
const commitGapMin = commitTime ? Math.floor((now - new Date(commitTime).getTime()) / 60000) : null;

let pushTime = null, pushSrc = 'none';
try {
  const r = await api(`/repos/${REPO}/commits/${remoteHead}/check-runs`);
  if (r.status === 200 && r.json?.check_runs) {
    const cf = r.json.check_runs.filter((cr) => cr.name && cr.name.includes('Cloudflare Pages'));
    if (cf.length) {
      // earliest created_at of CF runs for this head ≈ the push that triggered the build
      const t = Math.min(...cf.map((cr) => new Date(cr.created_at || cr.started_at).getTime()));
      if (Number.isFinite(t)) { pushTime = t; pushSrc = 'cf-check-run'; }
    }
  }
} catch { /* fall through to conservative path */ }

const head = remoteHead.slice(0, 8);
if (pushTime) {
  const gapMin = Math.floor((now - pushTime) / 60000);
  if (now - pushTime < MIN_GAP_MS) {
    const waitMin = Math.ceil((MIN_GAP_MS - (now - pushTime)) / 60000);
    block(`last push ${head} was ${gapMin}m ago (cf-check-run; commit ${commitGapMin}m) (<30min §0.25.1). Wait ${waitMin} more minute(s).`);
  }
  open(`last push ${head} was ${gapMin}m ago (cf-check-run; commit ${commitGapMin}m) (>=30min §0.25.1)`);
} else {
  // No CF check-run for remote head: conservative. Fresh commit => treat as fresh push.
  if (commitGapMin === null) block(`no push-time source for ${head} — refusing to guess`);
  if (commitGapMin < 30) {
    const waitMin = 30 - commitGapMin;
    block(`no cf-check-run for ${head}; commit ${commitGapMin}m ago (<30min) — conservative block, wait ${waitMin}m`);
  }
  open(`last push ${head} approximated by commit time ${commitGapMin}m ago (no cf-check-run; WARN approximated)`);
}
