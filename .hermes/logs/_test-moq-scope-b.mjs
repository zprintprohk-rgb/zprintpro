// .hermes/logs/_test-moq-scope-b.mjs — 門童 #24 B 案（條件式掃描域）可逆壓測
//
// 要證明的四件事（K3 2026-09-20 裁決 B 案的行為契約）:
//   ②a 局部掃描仍攔得住：staged 含目標檔 + worktree 有未登錄漂移 → FAIL
//   ②b ★ 誤攔已消除：staged **不含**目標檔 + worktree 有未登錄漂移 → SKIP/PASS
//       （舊行為 = worktree 全檔掃描 → 這裡會 FAIL，正是要修掉的誤攔）
//   ②c 真值級聯保留：staged 含真值源 products.ts → 強制全 5 檔（即使漂移在別的檔也要抓到）→ FAIL
//   ②d 不製造假紅：staged 含真值源但 worktree 乾淨 → 全 5 檔 PASS
//
// 方法（零風險設計）:
//   · **staged 集合用獨立臨時 index 偽造**（`GIT_INDEX_FILE` + `git update-index --cacheinfo`）
//     → 完全不動真實 index、不動任何檔內容。
//   · worktree 漂移則**必須**是真的（掃描器讀 worktree）→ 用可逆偽造 + `finally` 還原
//     + sha256 前後比對；偽造前先斷言檔案乾淨，避免毀掉併發會話的未提交改動。
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const ROOT = process.cwd();
const TARGET = 'src/data/category-seo-content.ts'; // 非真值源、非檔案級豁免檔
const TRUTH = 'src/data/products.ts';
const FROM = '戶外貼紙 100 個起'; // 已核准分層 → 改成未登錄數字即變「新漂移」
const TO = '戶外貼紙 999 個起';

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const sh = (cmd, env = {}) => {
  try {
    return { out: execSync(cmd, { cwd: ROOT, env: { ...process.env, ...env }, encoding: 'utf8', maxBuffer: 1 << 26 }), exit: 0 };
  } catch (e) {
    return { out: String(e.stdout || '') + String(e.stderr || ''), exit: e.status ?? 1 };
  }
};
const clean = (f) => sh(`git status --porcelain -- ${f}`).out.trim();

if (clean(TARGET)) {
  console.error(`🔴 前置失敗：${TARGET} 有未提交改動 → 拒絕偽造（防毀併發 WIP）`);
  process.exit(2);
}
const original = fs.readFileSync(TARGET, 'utf8');
const shaBefore = sha(original);
if (!original.includes(FROM)) {
  console.error(`🔴 找不到偽造錨點「${FROM}」→ 中止（不猜測）`);
  process.exit(2);
}

const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'zp-scope-'));
const IDX = path.join(TMP, 'index');
const GENV = { GIT_INDEX_FILE: IDX };
/** 用臨時 index 偽造 staged 集合（不動真實 index） */
function stageOnly(files) {
  fs.rmSync(IDX, { force: true });
  sh('git read-tree HEAD', GENV);
  for (const f of files) {
    const blob = sh(`git rev-parse HEAD:${f}`).out.trim();
    // 指向「與 HEAD 不同的 blob」→ git diff --cached 會列出該檔（檔案本身不需修改）
    // ⚠️ 必須保證 foreign blob 真的 ≠ 自身 blob，否則該檔不會出現在 staged 集合
    //    （首版對非目標檔取 README.md 自身 → staged 變空集合，證據不嚴謹；2026-09-20 修正）
    const foreignFrom = f === 'src/lib/seo.ts' ? 'src/data/products-content.ts' : 'src/lib/seo.ts';
    const other = sh(`git rev-parse HEAD:${foreignFrom}`).out.trim();
    const use = other && other !== blob ? other : blob;
    if (use === blob) throw new Error(`無法為 ${f} 取得 foreign blob（staged 會落空）`);
    sh(`git update-index --cacheinfo 100644,${use},${f}`, GENV);
  }
  return sh('git diff --cached --name-only --diff-filter=ACMR', GENV).out.trim().split('\n').filter(Boolean);
}
function gate() {
  return sh('npx tsx scripts/moq10-books-context-scan.ts --gate --staged', GENV);
}

let forged = null;
const rows = [];
try {
  forged = original.replace(FROM, TO);
  fs.writeFileSync(TARGET, forged, 'utf8');
  console.log(`① 已在 worktree 偽造未登錄漂移：「${FROM}」→「${TO}」  sha256(前)=${shaBefore}\n`);

  const cases = [
    { id: '②a', name: 'staged 含目標檔（局部掃描）→ 應 FAIL', stage: [TARGET], want: 'FAIL' },
    { id: '②b', name: '★ staged 不含目標檔 → 應 SKIP（舊行為會誤攔 FAIL）', stage: ['README.md'], want: 'SKIP' },
    { id: '②c', name: '★ staged 含真值源 → 強制全 5 檔級聯 → 應 FAIL', stage: [TRUTH], want: 'FAIL' },
  ];
  for (const c of cases) {
    const staged = stageOnly(c.stage);
    const r = gate();
    const scope = (r.out.match(/\[SCOPE\][^\n]*/) || ['(無 [SCOPE] 行)'])[0];
    const verd = (r.out.match(/\[GATE\] (FAIL|PASS|SKIP)/) || [, '(無 [GATE])'])[1];
    const ok = verd === c.want;
    rows.push(ok);
    console.log(`${ok ? '✅' : '🔴'} ${c.id} ${c.name}`);
    console.log(`     staged = [${staged.join(', ')}]  →  [GATE] ${verd}（期望 ${c.want}）`);
    console.log(`     ${scope.replace(/^\[SCOPE\] /, '')}`);
  }

  // ②d 還原 worktree 後，staged 含真值源 → 全 5 檔應 PASS（不製造假紅）
  fs.writeFileSync(TARGET, original, 'utf8');
  forged = null;
  const stagedD = stageOnly([TRUTH]);
  const rD = gate();
  const verdD = (rD.out.match(/\[GATE\] (FAIL|PASS|SKIP)/) || [, '(無)'])[1];
  const scopeD = (rD.out.match(/\[SCOPE\][^\n]*/) || [''])[0];
  const okD = verdD === 'PASS';
  rows.push(okD);
  console.log(`${okD ? '✅' : '🔴'} ②d 真值源 staged + worktree 乾淨 → 全 5 檔應 PASS（不假紅）`);
  console.log(`     staged = [${stagedD.join(', ')}]  →  [GATE] ${verdD}（期望 PASS）`);
  console.log(`     ${scopeD.replace(/^\[SCOPE\] /, '')}`);
} finally {
  if (forged !== null) {
    fs.writeFileSync(TARGET, original, 'utf8');
    console.log('\n⚠️ finally 觸發：已強制還原');
  }
  fs.rmSync(TMP, { recursive: true, force: true });
}

const after = fs.readFileSync(TARGET, 'utf8');
const shaAfter = sha(after);
const intact = shaAfter === shaBefore && clean(TARGET) === '';
console.log(`\n③ 還原完整性: sha256(後)=${shaAfter} ${intact ? '✅ 位元一致、工作區 0 殘留' : '🔴 不一致/有殘留'}`);
const allPass = rows.every(Boolean) && intact;
console.log(`\n${allPass ? '✅ B 案壓測全數通過（4/4）' : `🔴 B 案壓測未通過（${rows.filter(Boolean).length}/${rows.length}）`}`);
process.exit(allPass ? 0 : 1);
