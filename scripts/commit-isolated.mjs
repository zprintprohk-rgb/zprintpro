#!/usr/bin/env node
/**
 * scripts/commit-isolated.mjs — 在隔離 worktree 提交本車道檔案 (避開併發車道造成的門童假阻塞)
 *
 * 為什麼需要:
 *   反審門童掃整個工作區。當其他併發車道正在改 src/ (未提交), 其紅會令本車道無法 commit,
 *   而 --no-verify 會繞過門童 (K3 已要求避免)。本腳本改用**隔離法**:
 *     1. 建臨時 worktree @ HEAD (乾淨, 只含已提交內容)
 *     2. 把本車道檔案複製進去
 *     3. 在該 worktree 內 git add + commit (門童只看到本車道改動 ⇒ 紅必屬本車道)
 *     4. 把新 commit 取回主工作區 (reset --soft 到該 SHA, 保留工作區檔案)
 *     5. 刪臨時 worktree
 *   ⇒ 門童照跑、無繞過; 車道紅不再誤傷本車道。
 *
 * 用法:
 *   node scripts/commit-isolated.mjs --message-file .git/COMMIT_MSG_TMP --files a.ts,b.ts
 *
 * ⚠ 本腳本不改動其他車道的檔案; 失敗時不留下 worktree。
 */

import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, copyFileSync, mkdirSync, readFileSync, symlinkSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const args = process.argv.slice(2);
const msgIdx = args.indexOf('--message-file');
const filesIdx = args.indexOf('--files');
if (msgIdx < 0 || filesIdx < 0) {
  console.error('用法: node scripts/commit-isolated.mjs --message-file <path> --files <a,b,c>');
  process.exit(2);
}
const msgFile = args[msgIdx + 1];
const files = (args[filesIdx + 1] || '').split(',').map((s) => s.trim()).filter(Boolean);
if (!files.length) { console.error('無檔案'); process.exit(2); }

const ROOT = process.cwd();
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf-8' }).trim();
const branch = execFileSync('git', ['rev-parse', '--abbrev-ref', 'HEAD'], { encoding: 'utf-8' }).trim();

const tmp = mkdtempSync(join(tmpdir(), 'zp-commit-iso-'));
let created = false;

try {
  execFileSync('git', ['worktree', 'add', '--detach', tmp, head], { stdio: 'ignore' });
  created = true;

  // node_modules 供門童使用
  const nm = resolve(ROOT, 'node_modules');
  if (existsSync(nm)) { try { symlinkSync(nm, join(tmp, 'node_modules'), 'junction'); } catch { /* noop */ } }

  // 複製本車道檔案
  for (const f of files) {
    const src = resolve(ROOT, f);
    const dst = join(tmp, f);
    if (!existsSync(src)) { console.error(`⚠ 找不到檔案, 跳過: ${f}`); continue; }
    mkdirSync(dirname(dst), { recursive: true });
    copyFileSync(src, dst);
  }

  // 在隔離 worktree 內 add + commit (門童會跑)
  execFileSync('git', ['add', '--', ...files], { cwd: tmp, stdio: 'inherit' });
  const commit = spawnSync('git', ['commit', '-F', resolve(ROOT, msgFile)], { cwd: tmp, encoding: 'utf-8' });
  process.stdout.write(commit.stdout || '');
  process.stderr.write(commit.stderr || '');
  if (commit.status !== 0) {
    console.error('\n❌ 隔離 commit 失敗 (門童攔下或在隔離樹有真紅) — 主工作區未改動');
    process.exit(commit.status ?? 1);
  }

  const newSha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: tmp, encoding: 'utf-8' }).trim();
  console.log(`\n✓ 隔離 commit 建立: ${newSha.slice(0, 8)}`);

  // 取回主工作區: 移到新 commit, 保留檔案內容 (working tree 不變)
  execFileSync('git', ['reset', '--soft', newSha], { cwd: ROOT, stdio: 'inherit' });
  console.log(`✓ 主工作區已指向 ${newSha.slice(0, 8)} (工作區檔案未動)`);
  console.log(`  分支: ${branch} | 可用 git log -1 檢視`);
} finally {
  if (created) { try { execFileSync('git', ['worktree', 'remove', tmp, '--force'], { stdio: 'ignore' }); } catch { /* noop */ } }
  try { rmSync(tmp, { recursive: true, force: true }); } catch { /* noop */ }
}
