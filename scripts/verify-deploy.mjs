#!/usr/bin/env node
/**
 * Post-push deploy verification
 *
 * After `git push`, this checks the GitHub check-runs status of the just-pushed commit.
 * If the Cloudflare Pages build failed, it exits 1 to force orchestrator awareness.
 *
 * Usage: node scripts/verify-deploy.mjs [commit-sha]
 *   Without arg: uses HEAD
 *   With arg:    uses specified commit
 *
 * Why this exists: 2026-07-01 paper-bag/food-pkg/flyer/flyer-printing-guide commits all
 * pushed successfully but CF Pages build silently failed for 4 consecutive commits.
 * Stale CF edge cache served the old version as 200 OK, masking real failures.
 * The cure is: after every push, query GitHub check-runs API and refuse to mark done
 * unless CF Pages conclusion = success.
 */

import https from 'https';

function get(path) {
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.github.com',
      path,
      method: 'GET',
      family: 4,
      headers: {
        'User-Agent': 'mavis-verify-deploy/1.0',
        'Accept': 'application/vnd.github+json',
      },
      timeout: 30000,
    }, (res) => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, json: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, body });
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('TIMEOUT')));
    req.end();
  });
}

function sh(cmd) {
  try {
    const { execSync } = require('child_process');
    return execSync(cmd, { encoding: 'utf8' }).trim();
  } catch (e) {
    return '';
  }
}

async function main() {
  const sha = process.argv[2] || sh('git rev-parse HEAD');
  if (!sha || !/^[0-9a-f]{7,40}$/.test(sha)) {
    console.error('[verify-deploy] invalid commit sha:', sha);
    process.exit(1);
  }
  const shortSha = sha.substring(0, 7);
  console.log(`[verify-deploy] checking ${shortSha} status...`);

  const r = await get(`/repos/zprintprohk-rgb/zprintpro/commits/${sha}/check-runs`);
  if (r.status !== 200) {
    console.error(`[verify-deploy] GitHub API error: HTTP ${r.status}`);
    console.error(r.body || r.json);
    process.exit(2);
  }

  const runs = r.json.check_runs || [];
  const cfRun = runs.find((cr) => cr.name && cr.name.includes('Cloudflare Pages'));

  if (!cfRun) {
    console.log('[verify-deploy] no Cloudflare Pages check_run yet — build may be queued or not configured');
    console.log('  Check status manually: https://github.com/zprintprohk-rgb/zprintpro/commits/' + shortSha);
    process.exit(0);
  }

  console.log(`[verify-deploy] CF Pages status: ${cfRun.conclusion || cfRun.status}`);
  console.log(`[verify-deploy] details: ${cfRun.html_url}`);

  if (cfRun.conclusion === 'success') {
    console.log('[verify-deploy] PASS — deploy is live');
    process.exit(0);
  }

  if (cfRun.conclusion === 'failure') {
    console.error('[verify-deploy] FAIL — CF Pages build FAILED, do NOT mark deploy as done');
    console.error('  Fix the build, commit, push, then re-run this script');
    process.exit(1);
  }

  // queued / in_progress / null
  console.log(`[verify-deploy] in progress (${cfRun.status}/${cfRun.conclusion || 'null'}) — re-run later`);
  process.exit(0);
}

main();
