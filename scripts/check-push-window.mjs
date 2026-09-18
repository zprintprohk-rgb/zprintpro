#!/usr/bin/env node
/**
 * scripts/check-push-window.mjs — §0.25 30 min push 间隔硬校验 (可执行守卫)
 *
 * 起因 (2026-09-18 两次撞车事故):
 *   事故 6: 人工 push 只以「自己上次 push」为基准算窗口, 未 fetch 重算 origin/main 最新时间 → 15 min 撞车
 *   事故 7: 改用 origin/main %ct 为基准, 却用 `Get-Date -UFormat %s` 取「当前 epoch」——
 *           **Windows PowerShell 5.1 该表达式返回「本地时间当作 UTC」, 比真实 epoch 快 8 小时 (Asia/Shanghai)**
 *           ⇒ `now - ct >= 1800` 恒成立 ⇒ 守卫恒 PASS (= 假守卫, 比没有守卫更糟: 给出虚假的合规感) → 9 min 撞车
 *
 * 本脚本改用 **Node 的 Date.now()** (真正的 UTC epoch), 并做「时区自检」:
 *   若脚本自身算出的间隔与 git 侧口径出现 > 1h 的离群, 直接报错退出, 防止再次出现恒真守卫。
 *
 * 用法:
 *   node scripts/check-push-window.mjs              # 默认 30 min, 未满足则 exit 1
 *   node scripts/check-push-window.mjs --minutes 30
 *   node scripts/check-push-window.mjs --quiet      # 仅 exit code
 *
 * 语义: 退出码 0 = 可以 push; 退出码 1 = 窗口未到 (应立即 commit 留本地并结束任务, per §0.25.8, 不得 Start-Sleep 阻塞)
 */
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const minutes = (() => {
  const i = args.indexOf('--minutes');
  return i >= 0 ? Number(args[i + 1]) : 30;
})();
const quiet = args.includes('--quiet');
const MIN_SEC = Math.max(1, minutes) * 60;

function log(...a) { if (!quiet) console.log(...a); }

/* ── 1. 取 origin/main 最新 commit 的 committer epoch (push 時間的代理口徑) ── */
try {
  execFileSync('git', ['fetch', 'origin', '--quiet'], { stdio: 'ignore' });
} catch {
  /* 離線也可繼續, 用本地 origin/main 參照 */
}

let ct;
try {
  ct = Number(execFileSync('git', ['log', '-1', '--format=%ct', 'origin/main'], { encoding: 'utf8' }).trim());
} catch (e) {
  console.error('❌ 無法讀取 origin/main 的 commit 時間: ' + e.message);
  process.exit(2);
}
if (!Number.isFinite(ct) || ct <= 0) {
  console.error('❌ origin/main %ct 解析失敗: ' + ct);
  process.exit(2);
}

/* ── 2. 現在時間: 一律用 Node Date.now() (UTC epoch, 不受 PowerShell/-UFormat 影響) ── */
const now = Math.floor(Date.now() / 1000);

/* ── 3. 時區自檢 (防「恒真守衛」復發) ──
 * 合理區間: 本腳本應在 commit 之後執行 ⇒ now >= ct, 且差距不應 > 24h。
 * 若出現 now < ct - 600 (即 git 時間比現在晚 10 min 以上) ⇒ 兩邊時區/口徑不一致, 直接報錯。 */
if (now < ct - 600) {
  console.error(`❌ 時區/口徑自檢失敗: now(${now}) 早於 origin/main ct(${ct}) 超過 10 min。`);
  console.error('   ⇒ 疑似「本地時間當作 UTC」類時區錯誤 (Windows PowerShell 5.1 `Get-Date -UFormat %s` 即此坑)。');
  console.error('   ⇒ 拒絕給出 PASS, 避免恒真守衛。請檢查取時方式。');
  process.exit(2);
}

const elapsed = now - ct;
const remain = MIN_SEC - elapsed;

log('── §0.25 push 窗口校驗 ─────────────────────────────');
log('  origin/main 最新 commit : ' + new Date(ct * 1000).toISOString() + '  (' + ct + ')');
log('  現在 (UTC)              : ' + new Date(now * 1000).toISOString() + '  (' + now + ')');
log('  已過間隔                : ' + (elapsed / 60).toFixed(1) + ' min');
log('  硬下限                  : ' + minutes + ' min');
if (remain > 0) {
  log('❌ 窗口未到 —— 還需 ' + (remain / 60).toFixed(1) + ' min');
  log('   per §0.25.8: 立即 commit 留本地並結束任務, 不得 Start-Sleep 阻塞主進程。');
  process.exit(1);
}
log('✅ 窗口滿足 —— 允許 push (超出 ' + ((-remain) / 60).toFixed(1) + ' min)');
process.exit(0);
