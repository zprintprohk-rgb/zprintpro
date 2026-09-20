/**
 * 反审门童 #26 門童 hook 的 SSoT / active 同步一致性
 *
 * 為什麼需要（2026-09-20 立，固化兩次同族事故）：
 *   門童的 hook 有 **兩份檔**：
 *     · SSoT  : `scripts/canonical/pre-commit`（源頭，setup/install 腳本從這裡複製）
 *     · active: `core.hooksPath` 指向的那支（本倉 = `.githooks/pre-commit`，**git 真正讀的**）
 *   更新門禁時若只改一份，另一份不會自動跟上，而 **git 不讀 hook 時不會報任何錯** →
 *   門禁**靜默失效**，且失效本身無法自證。
 *
 *   已發生兩次（同根因）：
 *     ① 2026-08-26 ~ 09-13（18 天）：設了 `core.hooksPath=.githooks` 但安裝腳本仍往
 *        `.git/hooks/` 裝 → 整條 pre-commit 門禁靜默失效。
 *     ② 2026-09-20：SSoT 已含門童 #24（MOQ 口徑閘門），但 active 落後未含 →
 *        **#24 在本 worktree 從未觸發過**（`git show <sha>:.githooks/pre-commit` 實查確認）。
 *
 * 判據：SSoT 與 active 兩份檔的內容（行尾正規化後）sha256 必須相等。
 *   刻意**不**比對 mtime（per AGENTS.md §0.35.4：禁用 mtime 當存活證據，
 *   9/17 全檔複製曾把 mtime 統一刷新，mtime 會騙人）。
 *
 * 規則 ID：HOOK_SSOT_ACTIVE_DIVERGENCE
 * 編號說明：跳過 #25（已為 anchor 掃描器候選預留，尚未接 hook），故取 #26。
 *
 * 修法：`node scripts/install-hooks.mjs`（冪等，逐字驗證；失敗只警告不炸 build）。
 *
 * 退出碼：0 = 一致；1 = 分叉（RED，硬攔）
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

const ROOT = process.cwd();
const CANONICAL = path.join(ROOT, 'scripts', 'canonical', 'pre-commit');

const readNorm = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const git = (args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};

const problems = [];
const notes = [];

if (!fs.existsSync(path.join(ROOT, '.git'))) {
  console.log('ℹ️  [HOOK-SYNC] 非 git 工作區 → 跳過');
  process.exit(0);
}
if (!fs.existsSync(CANONICAL)) {
  console.log('ℹ️  [HOOK-SYNC] SSoT 不存在 → 跳過（不誤報）');
  process.exit(0);
}

const canonSha = sha(readNorm(CANONICAL));

// 1) core.hooksPath 是否設定（未設 → git 讀 .git/hooks，SSoT 更新不會生效）
const hooksPath = git(['config', '--get', 'core.hooksPath']);
if (!hooksPath) {
  notes.push('core.hooksPath 未設定 → git 讀 .git/hooks/（安裝腳本會同步該處作兜底）');
}

// 2) active 檔是否與 SSoT 一致
const targetList = [];
if (hooksPath) targetList.push({ kind: 'active (core.hooksPath)', p: path.join(ROOT, hooksPath, 'pre-commit') });
// 真兜底 = <git-dir>/hooks/pre-commit。注意：不可用 `git rev-parse --git-path hooks` ——
// 設了 core.hooksPath 時它會**回傳 hooksPath 本身**（實測回 '.githooks'），會與 active 撞成同一個而漏檢兜底。
const gitDir = git(['rev-parse', '--absolute-git-dir']) || path.join(ROOT, '.git');
const fb = path.join(gitDir, 'hooks', 'pre-commit');
const fbDedup = targetList.some((t) => path.resolve(t.p) === path.resolve(fb));
if (!fbDedup) {
  // 兜底不受版控、目前也非 git 實際讀取者 → 分叉只提示不硬攔（但它是「hooksPath 一旦取消」的靜默退回陷阱）
  targetList.push({ kind: 'fallback (.git/hooks，非當前生效)', p: fb, soft: true });
}

if (!targetList.length) {
  console.log('ℹ️  [HOOK-SYNC] 取不到 hooks 目錄 → 跳過');
  process.exit(0);
}

for (const t of targetList) {
  if (!fs.existsSync(t.p)) {
    if (t.soft) {
      notes.push(`${t.kind} 不存在（可接受；跑 node scripts/install-hooks.mjs 可補上兜底）`);
      continue;
    }
    problems.push(`${t.kind} 缺失: ${path.relative(ROOT, t.p)} → git 不會執行任何門童`);
    continue;
  }
  const activeSha = sha(readNorm(t.p));
  if (activeSha !== canonSha) {
    const detail =
      `${t.kind} 與 SSoT 分叉: ${path.relative(ROOT, t.p)}\n` +
      `     SSoT   sha256 ${canonSha.slice(0, 12)}\n` +
      `     active sha256 ${activeSha.slice(0, 12)}`;
    if (t.soft) {
      // 非當前生效者：只提示（一旦 core.hooksPath 被取消，它就會變成生效者 → 靜默退回舊門禁）
      notes.push(`${detail}\n     → 目前不生效，但 core.hooksPath 一旦取消就會退回此舊版；修法: node scripts/install-hooks.mjs`);
    } else {
      problems.push(detail);
    }
  }
}

if (problems.length) {
  console.error('\n🔴 [HOOK-SYNC] 門童 hook SSoT / active 分叉 —— 門禁可能靜默失效');
  problems.forEach((p) => console.error(`   · ${p}`));
  notes.forEach((n) => console.error(`   ℹ️  ${n}`));
  console.error('\n   為什麼嚴重: git 讀的是 active 那支；只更新 SSoT 不會生效，');
  console.error('             而 hook 沒被讀到時 **git 不會報任何錯**（2026-08-26 曾因此失效 18 天）。');
  console.error('\n   💡 修法: node scripts/install-hooks.mjs');
  process.exit(1);
}

console.log(`✅ [HOOK-SYNC] SSoT 與 active 一致（sha256 ${canonSha.slice(0, 12)}，${targetList.length} 個目標）`);
notes.forEach((n) => console.log(`   ℹ️  ${n}`));
process.exit(0);
