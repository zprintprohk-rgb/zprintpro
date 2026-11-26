/* 2026-11-25 repo 补充核查 — 双远端对账 / 5d78f8ae 主题 / READY 任务标题 / LastTaskResult 语义 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
function run(cmd, args, timeout) {
  const r = spawnSync(cmd, args, {
    cwd: ROOT, encoding: 'utf8', timeout: timeout || 60000, maxBuffer: 16 * 1024 * 1024,
    env: Object.assign({}, process.env, { GIT_TERMINAL_PROMPT: '0', GIT_SSH_COMMAND: 'ssh -o BatchMode=yes -o ConnectTimeout=15' })
  });
  return { cmd: cmd + ' ' + args.join(' '), code: r.status, stdout: (r.stdout || '').trimEnd(), stderr: (r.stderr || '').trimEnd() };
}

const out = {};
out.fetchOriginSsh = run('git', ['fetch', 'origin_ssh', 'main', '--quiet'], 90000);
out.revParseOriginSshMain = run('git', ['rev-parse', 'origin_ssh/main']);
out.aheadOriginSsh = run('git', ['rev-list', '--count', 'origin_ssh/main..HEAD']);
out.behindOriginSsh = run('git', ['rev-list', '--count', 'HEAD..origin_ssh/main']);
out.aheadOrigin = run('git', ['rev-list', '--count', 'origin/main..HEAD']);
out.behindOrigin = run('git', ['rev-list', '--count', 'HEAD..origin/main']);
out.commit5d78f8ae = run('git', ['log', '--oneline', '-1', '5d78f8ae']);
out.msg4320 = run('net', ['helpmsg', '4320']);

try {
  const j = JSON.parse(fs.readFileSync(path.join(ROOT, '.hermes', 'logs', 'coordination-board.json'), 'utf8'));
  out.readyTaskObjects = (j.tasks || []).map((t, i) => Object.assign({ _index: i }, t)).filter(t => String(t.status || '').toUpperCase() === 'READY');
  out.readyTaskCount = out.readyTaskObjects.length;
  out.laneAssignmentReadyCounts = {};
  for (const [k, v] of Object.entries(j.lane_assignment_details || {})) {
    out.laneAssignmentReadyCounts[k] = (v || []).filter(x => String((x && x.status) || '').toUpperCase() === 'READY').length;
  }
} catch (e) { out.boardErr = String(e); }

fs.writeFileSync(path.join(ROOT, '.hermes', 'logs', 'tmp-repo-check2-result-20261125.json'), JSON.stringify(out, null, 2), 'utf8');
console.log(JSON.stringify(out, null, 2));
