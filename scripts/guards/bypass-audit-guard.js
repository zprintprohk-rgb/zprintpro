#!/usr/bin/env node
/**
 * scripts/guards/bypass-audit-guard.js
 * 门童 #22 · bypass 审计 (K3 2026-09-19 评估: --no-verify 必须「有痕迹、有理由」)
 *
 * ── 为什么存在 ────────────────────────────────────────────────────────────
 * pre-commit / pre-push 不是边界 —— 它们可以被 `--no-verify` 一行绕过。
 * 行业口径: 「调用本地 pre-commit hook 是边界，这是一个谎言。它不是边界，它是一个带 ANSI 颜色的建议。」
 * 所以治理点不是「禁止 --no-verify」(禁止不了, 且紧急时需要), 而是**让它留痕、留理由、可统计**。
 *
 * ── 机制 ──────────────────────────────────────────────────────────────────
 * ① `--stamp`  : 从最近一次 commit 读 message，若判定为 bypass 提交，则追加一条审计记录。
 * ② 判定旁证  : ① commit message 含 `Bypass-rationale:` footer（人写的理由）
 *               ② 环境/参数线索: commit 由 `git commit --no-verify` 产生时, 无法从 git 侧直接读到 flag,
 *                  故以「message footer」为**唯一可信凭据**; 缺 footer 的 bypass 记为 `UNATTRIBUTED`。
 * ③ 台账      : `.hermes/regression-guard/bypass-audit.jsonl`（一行一事件, append-only）
 * ④ 门禁      : `.githooks/pre-push` 调本脚本检查「最近 N 条 commit 里有 bypass 但无 footer」→ 拒 push。
 *
 * ── 用法 ──────────────────────────────────────────────────────────────────
 *   node scripts/guards/bypass-audit-guard.js --stamp          # 记录最近一次 commit (幂等: 同 sha 不重复)
 *   node scripts/guards/bypass-audit-guard.js                  # 校验最近 5 条 commit 的旁路留痕 (exit 1 = 有未留痕)
 *   node scripts/guards/bypass-audit-guard.js --since=20       # 校验最近 20 条
 *   node scripts/guards/bypass-audit-guard.js --report         # 打印旁路频率统计 (可监控指标)
 *
 * 台账: .hermes/regression-guard/bypass-audit.jsonl
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = process.cwd();
const LEDGER = path.join(ROOT, '.hermes/regression-guard/bypass-audit.jsonl');
// 判定 bypass 的 message 标记 (footer 契约)
const RATIONALE_RE = /^Bypass-rationale:\s*(.+)$/im;
const BYPASS_MARK_RE = /^Bypass:\s*(true|yes|1)\s*$/im;

function gitLog(n) {
  const fmt = '%H%x1f%ci%x1f%s%x1f%B%x1e';
  const out = execSync(`git log -n ${n} --pretty=format:"${fmt}"`, { encoding: 'utf8', cwd: ROOT, maxBuffer: 32 * 1024 * 1024 });
  return out.split('\x1e').map(s => s.trim()).filter(Boolean).map(rec => {
    const [sha, ci, subject, body] = rec.split('\x1f');
    return { sha, date: ci, subject, body: body || '' };
  });
}

function classify(c) {
  const m = c.body.match(RATIONALE_RE);
  const marked = BYPASS_MARK_RE.test(c.body);
  // bypass 提交的三类指纹:
  //  ① 显式 footer `Bypass: true`
  //  ② message **自述实际使用了旁路**（见下 SELF_DECLARED_RE）
  //  ③ 台账已有记录 (历史判定)
  //
  // ⚠️ 精确化 (2026-09-19 第二次实测假阳性):
  //   旧写法 `isBypass = marked || textually`，其中
  //     textually = /--no-verify|no-verify|旁路|bypass/i.test(subject + '\n' + body)
  //   是**泛化子串匹配**，会把「**讨论** bypass 机制」的提交误判为旁路提交：
  //     实测 ca97c5b1 的 body 末段写着「已在下一 commit 用『带台账的豁免 + 门童 #23』
  //     从结构性上消除此旁路需求」—— 那是**在讲机制**，该 commit 本身没旁路。
  //   这类 commit 是「门禁基础设施改动」，恰恰最常讨论 bypass，故假阳性率极高 →
  //   会导致 pre-push 长期误拦，最终迫使人们真的去用 --no-verify，与机制初衷相反。
  //   修法：改为只认「自述实际使用」的句式；讨论性提及不再计为旁路。
  const SELF_DECLARED_RE =
    /本\s*(?:次)?\s*commit\s*用\s*--no-verify|本次提交\s*(?:使用|用)\s*--no-verify|已用\s*--no-verify|used\s+--no-verify|旁路提交/i;
  const declared = SELF_DECLARED_RE.test(c.body);
  const isBypass = marked || declared;
  return { isBypass, rationale: m ? m[1].trim() : null };
}

function readLedger() {
  if (!fs.existsSync(LEDGER)) return [];
  return fs.readFileSync(LEDGER, 'utf8').split('\n').filter(Boolean).map(l => { try { return JSON.parse(l); } catch (e) { return null; } }).filter(Boolean);
}

function stamp() {
  const [c] = gitLog(1);
  if (!c) { console.log('⚠️  [BYPASS-AUDIT] 无 commit 可记录'); return 0; }
  const { isBypass, rationale } = classify(c);
  const ledger = readLedger();
  if (ledger.some(e => e.sha === c.sha)) { console.log(`✅ [BYPASS-AUDIT] ${c.sha.slice(0, 8)} 已在台账内 (幂等, 跳过)`); return 0; }
  if (!isBypass) { console.log(`✅ [BYPASS-AUDIT] ${c.sha.slice(0, 8)} 非旁路提交 (无 footer / 无 no-verify 指纹), 不记录`); return 0; }
  const files = execSync(`git show --name-only --pretty=format: ${c.sha}`, { encoding: 'utf8', cwd: ROOT }).split('\n').filter(Boolean);
  const ev = {
    ts: new Date().toISOString(),
    sha: c.sha,
    commit_date: c.date,
    subject: c.subject.slice(0, 160),
    rationale: rationale || 'UNATTRIBUTED',
    files_touched: files.length,
    files_sample: files.slice(0, 12),
  };
  fs.mkdirSync(path.dirname(LEDGER), { recursive: true });
  fs.appendFileSync(LEDGER, JSON.stringify(ev) + '\n', 'utf8');
  console.log(`📝 [BYPASS-AUDIT] 记录旁路提交 ${c.sha.slice(0, 8)} | 理由: ${ev.rationale}`);
  if (ev.rationale === 'UNATTRIBUTED') {
    console.log('   ⚠️ 缺 `Bypass-rationale: <理由>` footer —— 下次请补, 否则 push 会被门童 #22 拦。');
  }
  return 0;
}

function check(since) {
  const commits = gitLog(since);
  const ledger = readLedger();
  const problems = [];
  for (const c of commits) {
    const { isBypass, rationale } = classify(c);
    const recorded = ledger.find(e => e.sha === c.sha);
    if (isBypass || recorded) {
      const r = rationale || (recorded && recorded.rationale !== 'UNATTRIBUTED' ? recorded.rationale : null);
      if (!r) problems.push(`${c.sha.slice(0, 8)} "${c.subject.slice(0, 60)}" —— 旁路提交但无 Bypass-rationale footer`);
    }
  }
  return { commits: commits.length, problems, ledger };
}

function report() {
  const ledger = readLedger();
  if (!ledger.length) { console.log('[BYPASS-AUDIT] 台账为空 (0 次旁路)'); return 0; }
  const unattr = ledger.filter(e => e.rationale === 'UNATTRIBUTED').length;
  console.log(`[BYPASS-AUDIT] 累计旁路 ${ledger.length} 次 | 已留理由 ${ledger.length - unattr} | 未留理由 ${unattr}`);
  console.log(`[BYPASS-AUDIT] 台账: ${path.relative(ROOT, LEDGER).replace(/\\/g, '/')}`);
  for (const e of ledger.slice(-10)) {
    console.log(`   ${e.commit_date} ${e.sha.slice(0, 8)} files=${e.files_touched} | ${e.rationale.slice(0, 70)}`);
  }
  return 0;
}

/**
 * --backfill: 台账里 `UNATTRIBUTED` 的条目, 若对应 commit 事后已补 footer（amend），则回填理由。
 * 为什么需要: 台账是 append-only 的**审计记录**, 不能靠手改; 但 commit message 事后可以补,
 *   补完必须让台账跟上, 否则「未留理由」这个指标永远回不去 0（指标失真 = 审计失效）。
 * 匹配口径: 用完整 sha 或短 sha 前缀都要能对上（幂等: 已是具体理由的条目不覆盖）。
 */
function backfill() {
  const ledger = readLedger();
  const targets = ledger.filter(e => e.rationale === 'UNATTRIBUTED');
  if (!targets.length) { console.log('✅ [BYPASS-AUDIT] 台账无 UNATTRIBUTED 条目, 无需回填'); return 0; }
  let healed = 0;
  const out = ledger.map(e => {
    if (e.rationale !== 'UNATTRIBUTED') return e;
    // 逐条去 git 里找当前 message (可能已 amend)
    let msg = '';
    try { msg = execSync(`git log -1 --pretty=format:%B ${e.sha}`, { encoding: 'utf8', cwd: ROOT }); } catch (err) { msg = ''; }
    const m = msg.match(RATIONALE_RE);
    if (m) { healed++; return { ...e, rationale: m[1].trim(), backfilled_at: new Date().toISOString() }; }
    return e;
  });
  if (healed) {
    fs.writeFileSync(LEDGER, out.map(x => JSON.stringify(x)).join('\n') + '\n', 'utf8');
    console.log(`✅ [BYPASS-AUDIT] 回填 ${healed} 条 (台账已更新)`);
  } else {
    console.log(`⚠️  [BYPASS-AUDIT] ${targets.length} 条 UNATTRIBUTED 仍未回填: 对应 commit 的 message 里仍无 Bypass-rationale footer`);
    for (const t of targets) console.log(`   - ${t.sha.slice(0, 8)} "${t.subject.slice(0, 60)}"`);
    console.log('   补法 (未 push 的 commit 才安全): git commit --amend  (在 message 末尾加 Bypass-rationale: <理由>)');
  }
  return 0;
}

if (require.main === module) {
  const argv = process.argv.slice(2);
  if (argv.includes('--stamp')) process.exit(stamp());
  if (argv.includes('--report')) process.exit(report());
  if (argv.includes('--backfill')) process.exit(backfill());
  const sinceArg = (argv.find(a => a.startsWith('--since=')) || '').split('=')[1];
  const since = Math.max(1, parseInt(sinceArg || '5', 10) || 5);
  const r = check(since);
  if (r.problems.length) {
    console.log(`\n🔴 [BYPASS-AUDIT] 最近 ${r.commits} 条 commit 中 ${r.problems.length} 条旁路未留痕:`);
    for (const p of r.problems) console.log(`   - ${p}`);
    console.log('\n   口径: --no-verify 允许, 但必须留痕 —— commit message 末尾加 footer:');
    console.log('         Bypass-rationale: <为什么这次必须绕过门禁>');
    console.log('   记录: node scripts/guards/bypass-audit-guard.js --stamp');
    process.exit(1);
  }
  console.log(`\n✅ [BYPASS-AUDIT] 0 命中 - 最近 ${r.commits} 条 commit 无「旁路未留痕」`);
  process.exit(0);
}

module.exports = { classify, readLedger, LEDGER, backfill };
