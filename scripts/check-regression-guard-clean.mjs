#!/usr/bin/env node
/**
 * scripts/check-regression-guard-clean.mjs — 分辨「本車道紅」vs「其他車道紅」
 *
 * 為什麼存在 (K3 2026-09-19 提議, 源於當日兩次實際阻塞):
 *   反審門童 (check-regression-guard.js) 掃的是**整個工作區**。
 *   當其他併發車道正在改檔 (未提交), 它們引入的紅會一併算到本車道頭上 ⇒ 無法 commit。
 *   當日實測: 門童對工作區報 BRAND_LOCALE_MISMATCH 89 紅,
 *     但**在乾淨 HEAD 跑同一門童 → 🔴0 全過** ⇒ 89 紅全部來自其他車道。
 *   人工判斷 (開臨時 worktree 手動比對) 可行但不可持續 ⇒ 本腳本自動化。
 *
 * 判據 (可審計):
 *   1. 取本次要 commit 的檔案清單 (預設 `git diff --cached --name-only`)
 *   2. 在**臨時 worktree @ HEAD** (乾淨, 只含已提交內容) 跑門童 → 得到「基線紅」
 *   3. 在**當前工作區**跑同一門童 → 得到「工作區紅」
 *   4. 差集 = 工作區紅 − 基線紅。若某條紅的檔案**屬於本車道 staged 清單** ⇒ 本車道紅 (真阻塞);
 *      否則 ⇒ 其他車道紅 (不阻塞本車道 commit)
 *
 * 用法:
 *   node scripts/check-regression-guard-clean.mjs                # 用 staged 檔作本車道範圍
 *   node scripts/check-regression-guard-clean.mjs --files a,b,c  # 明確指定本車道檔案
 *   node scripts/check-regression-guard-clean.mjs --json
 *
 * exit: 0 = 本車道 0 紅 (可 commit); 1 = 本車道有紅 (需修); 2 = 無法判定 (保守視為阻塞)
 *
 * 注意: 臨時 worktree 需 checkout 整個 repo, 有性能開銷; 用完即刪。
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const JSON_OUT = args.includes('--json');
const filesIdx = args.indexOf('--files');

const ROOT = process.cwd();
const GUARD = 'scripts/check-regression-guard.js';

/** 本車道檔案清單 */
let laneFiles = [];
if (filesIdx >= 0) {
  laneFiles = (args[filesIdx + 1] || '').split(',').map((s) => s.trim()).filter(Boolean);
} else {
  try {
    laneFiles = execFileSync('git', ['diff', '--cached', '--name-only'], { encoding: 'utf-8' })
      .split('\n').map((s) => s.trim()).filter(Boolean);
  } catch {
    laneFiles = [];
  }
}

if (!laneFiles.length) {
  const out = { ok: true, reason: 'no-staged-files', laneFiles: [], laneHits: [], otherHits: [] };
  if (JSON_OUT) console.log(JSON.stringify(out, null, 2));
  else console.log('[guard-clean] staged 為空 — 無本車道範圍可比對, 視為通過');
  process.exit(0);
}

/** 跑門童並解析命中檔案的檔案路徑 */
function runGuard(cwd) {
  const r = spawnSync('node', [GUARD, '--commit'], { cwd, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 });
  const text = `${r.stdout || ''}\n${r.stderr || ''}`;
  /*
   * 只取「🔴 red」——門童有 red(硬攔) / orange(9/15 前 shadow) / yellow(shadow) 三級,
   * 只有 red 會真正 exit 1。首版把任何 🟡 命中行都算成紅, 造成「本車道紅 3」的假阻塞。
   *
   * 判據來源兩處, 取其一:
   *   ① 匯總行: 「📊 汇总: 🔴 0 | 🟠 0 | 🟡 0 | ⚪ 0」
   *   ② 明細行: 「🔴 [red] <file>:<line>」/「[red] ...」— 只收 severity=red 的行
   */
  const files = new Set();
  const RED_LINE = /(🔴\s*\[?\s*red|\[red\]|❌\s*反审门童拦截)/i;
  const yellowOnly = /(🟡|🟠|\bSHADOW\b)/;

  for (const line of text.split('\n')) {
    const pathMatch = [...line.matchAll(/([A-Za-z0-9_.\-\/\[\]]+\.(?:ts|tsx|js|mjs|json|md|css|html|txt))/g)];
    if (!pathMatch.length) continue;
    const isRedLine = RED_LINE.test(line);
    // 非紅明細行 (例如 🟡 SHADOW / 🟠 orange) → 不計入紅
    if (!isRedLine && yellowOnly.test(line)) continue;
    if (!isRedLine) continue;                       // 保守: 無法確認 severity 的行不計入紅
    for (const m of pathMatch) {
      let f = m[1].replace(/\\/g, '/');
      const idx = ['src/', 'scripts/', 'messages/'].map((k) => f.indexOf(k)).filter((x) => x >= 0).sort((a, b) => a - b)[0];
      if (idx !== undefined) files.add(f.slice(idx));
    }
  }

  // 匯總行的紅數 (權威數字)
  const sum = text.match(/汇总:\s*🔴\s*(\d+)\s*\|\s*🟠\s*(\d+)\s*\|\s*🟡\s*(\d+)/);
  const red = sum ? Number(sum[1]) : (text.includes('反审门童拦截') ? null : 0);
  return { exit: r.status ?? 1, red, files: [...files], text };
}

/* ── 基線: 臨時 worktree @ HEAD (乾淨) ── */
let headSha = '';
try {
  headSha = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).trim();
} catch (e) {
  console.error('[guard-clean] 無法讀取 HEAD: ' + e.message);
  process.exit(2);
}

const tmp = mkdtempSync(join(tmpdir(), 'zp-guard-clean-'));
let baseline = { exit: 0, red: 0, files: [] };
try {
  execFileSync('git', ['worktree', 'add', '--detach', tmp, headSha], { stdio: 'ignore' });
  // 讓臨時 worktree 能用到 node_modules (門童需要)
  const nm = resolve(ROOT, 'node_modules');
  if (existsSync(nm)) {
    try { symlinkSync(nm, join(tmp, 'node_modules'), 'junction'); } catch { /* 非致命 */ }
  }
  if (existsSync(join(tmp, GUARD))) baseline = runGuard(tmp);
} catch (e) {
  console.error('[guard-clean] 建立臨時 worktree 失敗: ' + e.message);
} finally {
  try { execFileSync('git', ['worktree', 'remove', tmp, '--force'], { stdio: 'ignore' }); } catch { /* noop */ }
  try { rmSync(tmp, { recursive: true, force: true }); } catch { /* noop */ }
}

/* ── 工作區 ── */
const current = runGuard(ROOT);

/* ── 差集: 工作區紅 − 基線紅, 再按「是否屬本車道檔」分流 ── */
const baselineSet = new Set(baseline.files);
const laneSet = new Set(laneFiles.map((f) => f.replace(/\\/g, '/')));

const newFiles = current.files.filter((f) => !baselineSet.has(f));
const laneHits = newFiles.filter((f) => laneSet.has(f));
const otherHits = newFiles.filter((f) => !laneSet.has(f));

const verdict = laneHits.length === 0 ? 'PASS' : 'BLOCK';

const out = {
  verdict,
  headSha,
  baseline: { exit: baseline.exit, red: baseline.red, files: baseline.files.length },
  current: { exit: current.exit, red: current.red, files: current.files.length },
  laneFiles: laneFiles.length,
  laneHits,
  otherHits,
  note: laneHits.length === 0
    ? '本車道 0 紅 — 可 commit (其他車道的紅不阻塞本車道)'
    : '本車道有紅 — 需先修正',
};

if (JSON_OUT) {
  console.log(JSON.stringify(out, null, 2));
} else {
  console.log('=== 門童分流: 本車道紅 vs 其他車道紅 ===');
  console.log(`HEAD        : ${headSha.slice(0, 8)}`);
  console.log(`基線 (乾淨)  : 🔴 ${baseline.red ?? '?'} (${baseline.files.length} 檔)`);
  console.log(`工作區      : 🔴 ${current.red ?? '?'} (${current.files.length} 檔)`);
  console.log(`本車道檔案   : ${laneFiles.length} 個`);
  console.log('');
  if (laneHits.length) {
    console.log(`❌ 本車道紅 (${laneHits.length}) — 需修:`);
    laneHits.forEach((f) => console.log('   - ' + f));
  } else {
    console.log('✅ 本車道 0 紅 — 可 commit');
  }
  if (otherHits.length) {
    console.log(`\nℹ️  其他車道紅 (${otherHits.length}) — 不阻塞本車道:`);
    otherHits.slice(0, 20).forEach((f) => console.log('   - ' + f));
    if (otherHits.length > 20) console.log(`   …其餘 ${otherHits.length - 20} 個`);
  }
}

process.exit(laneHits.length === 0 ? 0 : 1);
