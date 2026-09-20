// .hermes/logs/_forge-24-test.mjs — 門童 #24 誤攔/漏攔壓測（可逆，finally 保證還原）
//
// 目的：證明 #24 對「未登錄的新漂移」確實 exit 1（攔得住），且在無漂移時 exit 0（不誤攔）。
// 方法：對 category-seo-content.ts（**非檔案級豁免**檔）偽造一條新漂移 → 跑 --gate → 還原。
// 安全：全程 try/finally；還原後比對 sha256，不一致即報紅。
import fs from 'node:fs';
import crypto from 'node:crypto';
import { execSync } from 'node:child_process';

const TARGET = 'src/data/category-seo-content.ts';
const FROM = '戶外貼紙 100 個起'; // 已核准分層（✅），改成未登錄數字即變「新漂移」
const TO = '戶外貼紙 999 個起';

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex').slice(0, 16);
const clean = (f) => execSync(`git status --porcelain -- ${f}`, { encoding: 'utf8' }).trim();

function runGate() {
  try {
    const out = execSync('npx tsx scripts/moq10-books-context-scan.ts --gate', {
      encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 32 * 1024 * 1024,
    });
    return { exit: 0, out };
  } catch (e) {
    return { exit: e.status ?? 1, out: String(e.stdout || '') + String(e.stderr || '') };
  }
}

// ── 前置斷言：目標檔必須乾淨，否則不動（防毀掉併發會話的 WIP）
const dirty = clean(TARGET);
if (dirty) {
  console.error(`🔴 前置失敗：${TARGET} 有未提交改動 → 拒絕偽造測試（防毀併發 WIP）\n${dirty}`);
  process.exit(2);
}

const original = fs.readFileSync(TARGET, 'utf8');
const shaBefore = sha(original);
console.log(`① 前置：檔案乾淨 ✅  sha256(前)=${shaBefore}`);

let forged = null;
try {
  // ── 第 1 步：偽造新漂移
  if (!original.includes(FROM)) {
    console.error(`🔴 找不到偽造錨點「${FROM}」→ 中止（不猜測）`);
    process.exit(2);
  }
  forged = original.replace(FROM, TO);
  if (forged === original) {
    console.error('🔴 替換未生效 → 中止');
    process.exit(2);
  }
  fs.writeFileSync(TARGET, forged, 'utf8');
  console.log(`② 已偽造漂移：「${FROM}」→「${TO}」（未登錄，應被攔）`);

  // ── 第 2 步：閘門必須 FAIL
  const bad = runGate();
  const blocked = bad.exit !== 0 && /\[GATE\] FAIL/.test(bad.out);
  console.log(`③ 偽造態跑閘門：exit=${bad.exit}  ${blocked ? '✅ 正確攔截 [#GATE] FAIL' : '🔴 漏攔！'}`);
  if (!blocked) {
    console.log('--- 閘門輸出尾巴 ---');
    console.log(bad.out.split('\n').slice(-12).join('\n'));
  }

  // ── 第 3 步：還原
  fs.writeFileSync(TARGET, original, 'utf8');
  console.log('④ 已還原');

  // ── 第 4 步：還原後閘門必須 PASS（證明不誤攔正常態）
  const good = runGate();
  const pass = good.exit === 0 && /\[GATE\] PASS/.test(good.out);
  console.log(`⑤ 還原態跑閘門：exit=${good.exit}  ${pass ? '✅ PASS（不誤攔）' : '🔴 還原後仍 FAIL！'}`);

  // ── 第 5 步：位元級還原斷言
  const after = fs.readFileSync(TARGET, 'utf8');
  const shaAfter = sha(after);
  const identical = shaAfter === shaBefore;
  console.log(`⑥ 還原完整性：sha256(後)=${shaAfter}  ${identical ? '✅ 位元一致' : '🔴 不一致！'}`);
  console.log(`⑦ 工作區乾淨：${clean(TARGET) === '' ? '✅ 無殘留' : '🔴 有殘留改動'}`);

  const verdict = blocked && pass && identical && clean(TARGET) === '';
  console.log(`\n${verdict ? '✅ 壓測通過：攔得住新漂移、不誤攔正常態、還原位元一致' : '🔴 壓測未通過'}`);
  process.exit(verdict ? 0 : 1);
} finally {
  // 任何異常路徑都保證還原
  if (forged !== null && fs.readFileSync(TARGET, 'utf8') !== original) {
    fs.writeFileSync(TARGET, original, 'utf8');
    console.log('⚠️ finally 觸發：已強制還原');
  }
}
