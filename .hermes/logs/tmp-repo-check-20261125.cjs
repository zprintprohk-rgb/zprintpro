/* 2026-11-25 repo 技术盘点 — 只读；CJK 一律 Node utf-8（per §0.26.9） */
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const ROOT = process.cwd();
const OUT = { meta: { cwd: ROOT, node: process.version, startedAt: new Date().toISOString() } };

function git(args, timeoutMs) {
  const r = spawnSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
    timeout: timeoutMs || 60000,
    maxBuffer: 16 * 1024 * 1024,
    env: Object.assign({}, process.env, {
      GIT_TERMINAL_PROMPT: '0',
      GIT_SSH_COMMAND: 'ssh -o BatchMode=yes -o ConnectTimeout=15'
    })
  });
  return {
    cmd: 'git ' + args.join(' '),
    code: r.status,
    stdout: (r.stdout || '').trimEnd(),
    stderr: (r.stderr || '').trimEnd()
  };
}

/* ① git 同步状态 */
OUT.gitSync = {
  revParseHEAD: git(['rev-parse', 'HEAD']),
  fetchOriginMain: git(['fetch', 'origin', 'main', '--quiet'], 90000),
  revParseOriginMainAfterFetch: git(['rev-parse', 'origin/main']),
  logOriginMain3: git(['log', '--oneline', '-3', 'origin/main']),
  logHEAD3: git(['log', '--oneline', '-3', 'HEAD']),
  statusSB: git(['status', '-sb']),
  verify5d78f8ae: git(['rev-parse', '--verify', '5d78f8ae^{commit}']),
  branchContains5d78f8ae: git(['branch', '-r', '--contains', '5d78f8ae'])
};

/* ② manifest.json */
try {
  const raw = fs.readFileSync(path.join(ROOT, 'public', 'manifest.json'), 'utf8');
  const j = JSON.parse(raw);
  OUT.manifest = { name: j.name, short_name: j.short_name, start_url: j.start_url, lang: j.lang, keys: Object.keys(j) };
} catch (e) {
  OUT.manifest = { error: String(e) };
}

/* ③ llms*.txt 首行 */
OUT.llms = {};
for (const f of ['llms.txt', 'llms-en.txt', 'llms-ja.txt', 'llms-zh-hk.txt']) {
  try {
    const txt = fs.readFileSync(path.join(ROOT, 'public', f), 'utf8');
    const lines = txt.split(/\r?\n/);
    const firstNonEmpty = lines.find(l => l.trim().length > 0) || '';
    OUT.llms[f] = { bytes: Buffer.byteLength(txt, 'utf8'), lineCount: lines.length, line1: lines[0] || '', firstNonEmptyLine: firstNonEmpty };
  } catch (e) {
    OUT.llms[f] = { error: String(e) };
  }
}

/* ④ robots.txt 全文 */
try {
  const txt = fs.readFileSync(path.join(ROOT, 'public', 'robots.txt'), 'utf8');
  OUT.robotsRepo = { bytes: Buffer.byteLength(txt, 'utf8'), lineCount: txt.split(/\r?\n/).length, content: txt };
} catch (e) {
  OUT.robotsRepo = { error: String(e) };
}

/* ⑤ scripts/guards */
try {
  const ents = fs.readdirSync(path.join(ROOT, 'scripts', 'guards'), { withFileTypes: true });
  const files = ents.filter(e => e.isFile()).map(e => e.name).sort();
  OUT.guards = {
    files,
    subdirs: ents.filter(e => e.isDirectory()).map(e => e.name),
    fileCount: files.length
  };
} catch (e) {
  OUT.guards = { error: String(e) };
}

/* ⑥ coordination-board.json */
try {
  const raw = fs.readFileSync(path.join(ROOT, '.hermes', 'logs', 'coordination-board.json'), 'utf8');
  let j = null;
  try { j = JSON.parse(raw); } catch (e) { /* keep null */ }
  if (!j) {
    OUT.coordinationBoard = { parseError: 'JSON.parse failed', head400: raw.slice(0, 400), rawReadyCount: (raw.match(/READY/g) || []).length };
  } else {
    const readyPaths = [];
    (function walk(node, p) {
      if (Array.isArray(node)) { node.forEach((v, i) => walk(v, p + '[' + i + ']')); return; }
      if (node && typeof node === 'object') {
        const st = node.status !== undefined ? node.status : (node.state !== undefined ? node.state : (node.stage !== undefined ? node.stage : undefined));
        if (st !== undefined && String(st).toUpperCase() === 'READY') {
          readyPaths.push({ path: p, status: st, id: node.id !== undefined ? node.id : (node.name !== undefined ? node.name : (node.task !== undefined ? node.task : (node.title !== undefined ? node.title : null))) });
        }
        for (const k of Object.keys(node)) walk(node[k], p + '.' + k);
      }
    })(j, '$');
    const arrays = {};
    for (const k of Object.keys(j)) if (Array.isArray(j[k])) arrays[k] = j[k].length;
    OUT.coordinationBoard = {
      topLevelKeys: Object.keys(j),
      generated_at: j.generated_at !== undefined ? j.generated_at : (j.generatedAt !== undefined ? j.generatedAt : (j.updated_at !== undefined ? j.updated_at : null)),
      arrayFields: arrays,
      readyDeepCount: readyPaths.length,
      readyItems: readyPaths.slice(0, 60),
      rawReadyCount: (raw.match(/READY/g) || []).length
    };
  }
} catch (e) {
  OUT.coordinationBoard = { error: String(e) };
}

/* ⑦ lane-status.json problems 全文 */
try {
  const raw = fs.readFileSync(path.join(ROOT, '.hermes', 'logs', 'lane-status.json'), 'utf8');
  const j = JSON.parse(raw);
  OUT.laneStatus = {
    topLevelKeys: Object.keys(j),
    generatedAt: j.generatedAt !== undefined ? j.generatedAt : (j.generated_at !== undefined ? j.generated_at : null),
    problems: j.problems !== undefined ? j.problems : '(NO problems KEY — 顶层键见 topLevelKeys)'
  };
} catch (e) {
  OUT.laneStatus = { error: String(e) };
}

OUT.meta.finishedAt = new Date().toISOString();
const json = JSON.stringify(OUT, null, 2);
fs.writeFileSync(path.join(ROOT, '.hermes', 'logs', 'tmp-repo-check-result-20261125.json'), json, 'utf8');
console.log(json);
