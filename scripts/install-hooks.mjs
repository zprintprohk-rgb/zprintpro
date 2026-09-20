// scripts/install-hooks.mjs — 門童 hook 安裝器（Node 版，跨平台 / CI 安全 / 冪等 / 不碰受版控檔）
//
// 為什麼存在（2026-09-20 事故固化）：
//   `scripts/setup-hooks.sh` 是唯一的安裝器，但它是 **bash**，且 `package.json` 無任何
//   安裝掛鉤 → 新 clone / 新環境**不會自動裝 hook**，而門禁靜默失效的形式**無法自證**
//   （git 不讀 hook 時不會有任何錯誤訊息）。
//   歷史上已因此出過一次大事故：2026-08-26 設了 `core.hooksPath=.githooks`，而安裝腳本
//   仍往 `.git/hooks/` 裝 → **pre-commit 門禁整條靜默失效 18 天（8/26 ~ 9/13）**。
//   本輪又出現同族第二例：`scripts/canonical/pre-commit`（SSoT）已含門童 #24，
//   但 **active `.githooks/pre-commit` 落後**（未含 #24）→ #24 從未真的觸發過。
//   兩例同根：**「SSoT 有」不等於「git 真的讀到」**。
//
// 設計約束（為什麼不能照抄 setup-hooks.sh 進 prepare）：
//   `prepare` 會在 **每一次 `npm install` 後執行，包含 CI / Cloudflare Pages build**。
//     ① 永不非零退出（失敗只警告）—— 裝 hook 是便利性，不是 build 的必要條件
//     ② CI 環境（CI / CF_PAGES / GITHUB_ACTIONS / BUILD_ID）直接跳過，不在 build 機裝 hook
//     ③ 不依賴 bash（Windows / macOS / Linux 一致）
//     ④ 安裝後**逐字驗證**（曾發生 PowerShell `Copy-Item` 靜默失敗 → 必須驗證才敢說裝好）
//     ⑤ 冪等：內容一致時不改檔、不刷 mtime
//     ⑥ ★ **不覆蓋受版控的既有檔**（2026-09-20 加）：
//        `.githooks/pre-commit` 是**受版控檔**。若 prepare 會寫它，那麼每次 `npm install`
//        都可能**意外弄髒工作區**（出現非預期的 `M .githooks/pre-commit`），
//        且會**覆蓋掉他人只改 active、尚未提交的 hook 修改**（9/20 #24 事故正是這種形態）。
//        → 受版控且已存在但內容不同時：**只警告、不寫**（要寫需明示 `--force`）。
//        → 不受版控的 `.git/hooks/pre-commit`（真兜底）可自由同步 —— 順帶修掉一個潛在陷阱：
//          `core.hooksPath` 一旦被取消，git 就改讀 `.git/hooks/`，而該處若殘留舊版
//          （本倉實測殘留 5620 bytes 無 #24/#26 的舊 hook）→ 門禁會靜默退回舊狀態。
//
// 用法：
//   node scripts/install-hooks.mjs            # 安裝 + 驗證（不覆蓋受版控的既有檔）
//   node scripts/install-hooks.mjs --check    # 只檢查不寫入（不一致 → exit 1，供 CI/守門用）
//   node scripts/install-hooks.mjs --force    # 允許覆蓋受版控的既有 active hook
//
// 註：本檔為 .mjs（ESM）→ 一律用 import，不可用 require（2026-09-20 實測踩過：
//     .mjs 內 require → "require is not defined in ES module scope"）。
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';

const CHECK_ONLY = process.argv.includes('--check');
const FORCE = process.argv.includes('--force');
const ROOT = process.cwd();
const CANONICAL = path.join(ROOT, 'scripts', 'canonical', 'pre-commit');

const log = (s) => console.log(s);
const warn = (s) => console.warn(s);

/** 讀檔並正規化行尾（Git for Windows 可能 checkout 成 CRLF；語義相同不該算分叉） */
const readNorm = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');
const git = (args) => {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
  } catch {
    return '';
  }
};
/** 該檔是否受版控（決定「可否安全覆蓋」） */
const isTracked = (abs) => {
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
  try {
    execFileSync('git', ['ls-files', '--error-unmatch', '--', rel], {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'], cwd: ROOT,
    });
    return true;
  } catch {
    return false;
  }
};

// ── 守門 1：不是 git repo（tarball / npm pack / 無 .git）→ 安靜跳過
if (!fs.existsSync(path.join(ROOT, '.git'))) {
  log('ℹ️  非 git 工作區（無 .git）→ 跳過 hook 安裝');
  process.exit(0);
}

// ── 守門 2：CI / CF Pages build → 跳過（不在 build 機裝 hook，也不讓它影響 build）
if (process.env.CI || process.env.CF_PAGES || process.env.GITHUB_ACTIONS || process.env.BUILD_ID) {
  log('ℹ️  CI 環境 → 跳過 hook 安裝（hook 只對本機開發/提交有意義）');
  process.exit(0);
}

// ── 守門 3：SSoT 不存在 → 警告但不失敗
if (!fs.existsSync(CANONICAL)) {
  warn(`⚠️  SSoT 不存在: ${CANONICAL} → 跳過（不影響 npm install）`);
  process.exit(0);
}

// ── 目標清單：① git 實際讀的（core.hooksPath 優先）② .git/hooks 真兜底（不受版控）
const targets = [];
const hooksPath = git(['config', '--get', 'core.hooksPath']);
if (hooksPath) {
  targets.push({ kind: 'active (core.hooksPath)', p: path.join(ROOT, hooksPath, 'pre-commit'), critical: true });
}
const gitDir = git(['rev-parse', '--absolute-git-dir']) || path.join(ROOT, '.git');
const fb = path.join(gitDir, 'hooks', 'pre-commit');
if (!targets.some((t) => path.resolve(t.p) === path.resolve(fb))) {
  targets.push({ kind: 'fallback (.git/hooks，不受版控)', p: fb, critical: false });
}
if (!targets.length) {
  warn('⚠️  找不到 hooks 目標 → 跳過');
  process.exit(0);
}

const canonSrc = readNorm(CANONICAL);
const canonSha = sha(canonSrc);
let diverged = 0;
let installed = 0;
let refused = 0;

for (const t of targets) {
  const rel = path.relative(ROOT, t.p).replace(/\\/g, '/');
  const exists = fs.existsSync(t.p);
  const same = exists && sha(readNorm(t.p)) === canonSha;
  if (same) {
    log(`✅ ${t.kind}: 已一致（sha256 ${canonSha.slice(0, 12)}）`);
    continue;
  }
  const tracked = exists && isTracked(t.p);
  if (tracked && !FORCE) {
    // 受版控 + 既有 + 內容不同 → 不覆蓋（避免弄髒工作區 / 覆蓋他人未提交的 hook 改動）
    diverged++;
    refused++;
    warn(`⚠️  ${t.kind}: 與 SSoT 分叉，但**該檔受版控且已存在 → 不覆蓋**（${rel}）`);
    warn(`     為什麼不覆蓋: ① 避免每次 npm install 意外弄髒工作區`);
    warn(`                   ② 避免覆蓋他人只改 active、尚未提交的 hook 修改`);
    warn(`     → 請人工確認哪一份是對的；確定要用 SSoT 覆蓋請跑: node scripts/install-hooks.mjs --force`);
    continue;
  }
  diverged++;
  if (CHECK_ONLY) {
    warn(`🔴 ${t.kind}: 與 SSoT 分叉或缺失 → ${rel}`);
    continue;
  }
  fs.mkdirSync(path.dirname(t.p), { recursive: true });
  fs.copyFileSync(CANONICAL, t.p);
  // 逐字驗證（不信任 copy 的返回值 —— 曾發生靜默失敗）
  if (fs.existsSync(t.p) && sha(readNorm(t.p)) === canonSha) {
    installed++;
    log(`✅ ${t.kind}: 已安裝並逐字驗證通過（sha256 ${canonSha.slice(0, 12)}）`);
  } else {
    warn(`🔴 ${t.kind}: 安裝後驗證失敗 → hook 可能未生效，請手動 bash scripts/setup-hooks.sh`);
  }
  try {
    fs.chmodSync(t.p, 0o755);
  } catch {
    /* Windows 無 chmod 語意，忽略 */
  }
}

if (CHECK_ONLY && diverged) {
  warn('\n🔴 SSoT 與 target 分叉 —— 門禁可能靜默失效。修法: node scripts/install-hooks.mjs');
  process.exit(1);
}
if (refused) {
  warn(`\n⚠️  ${refused} 個受版控目標被拒絕覆蓋（見上方說明）。`);
}
log(installed ? `\n✅ 安裝完成（${installed} 個目標已更新）` : '\n✅ 無需變更（尚未被拒絕的目標皆已一致）');
process.exit(0);
