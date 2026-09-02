#!/usr/bin/env node
/**
 * scripts/check-regression-guard.js
 * 反审门童 v1 主入口 (K3 9/1 15:06 拍板)
 *
 * 5 道门童 + 3 道防线 + 自进化 4 步 SOP
 * - red 硬拦: 门童 #2 真实电话 + 门童 #3 品牌分层 + 门童 #4 跨语言污染 (严重)
 * - orange shadow: 门童 #1 数据诚信 11 类 (9/1-9/15 FP 复盘, --strict 启用)
 * - yellow shadow: 门童 #4 字符体检 + 门童 #5 SOP-10 (9/15 后转正)
 *
 * 用法:
 *   node check-regression-guard.js [scope]            # dry-run, 仅报告不 exit
 *   node check-regression-guard.js --strict [scope]   # red + orange 硬拦 (pre-commit hook 默认)
 *   node check-regression-guard.js --strict-all [scope] # red + orange + yellow 硬拦
 *   node check-regression-guard.js --commit [scope]   # 仅扫 staged diff
 *   node check-regression-guard.js --dod              # DoD 铁律检查 (No fix without a rule)
 *
 * K3 9/1 15:06 4 修正:
 *   1. ROI 诚实化: 拦截率 100% → 90% (可验证) + 0 复发
 *   2. 拦截率 50% → 90% (可验证) + 0 复发
 *   3. shadow mode 分级执法: red 硬拦, orange/yellow 仅警告 (9/15 后转正)
 *   4. hook 持久化: scripts/canonical/pre-commit + setup-hooks.sh 一键安装
 *
 * K3 9/1 15:06 3 齿轮:
 *   - DoD 铁律: No fix without a rule
 *   - 周健康报告 (5 cron SSoT v6.4 嵌入)
 *   - 历史 diff 回灌 seeding (scripts/seed-error-patterns.js)
 */

const fs = require('fs');
const path = require('path');

const GUARDS_DIR = path.join(__dirname, 'guards');

// 8 道门童 (v1.3 升级: 加门童 #8 决策登记簿, K3 9/2 09:05 拍板)
const GUARDS = {
  credibility: require(path.join(GUARDS_DIR, 'credibility-guard.js')),
  phone: require(path.join(GUARDS_DIR, 'phone-guard.js')),
  brand: require(path.join(GUARDS_DIR, 'brand-guard.js')),
  i18n: require(path.join(GUARDS_DIR, 'i18n-guard.js')),
  sop10: require(path.join(GUARDS_DIR, 'sop10-guard.js')),
  entity: require(path.join(GUARDS_DIR, 'entity-guard.js')),
  count: require(path.join(GUARDS_DIR, 'count-guard.js')),
  register: require(path.join(GUARDS_DIR, 'register-guard.js')),
};

const GUARD_LABELS = {
  credibility: '门童 #1 数据诚信',
  phone: '门童 #2 真实电话',
  brand: '门童 #3 品牌分层',
  i18n: '门童 #4 跨语言污染 (v2 扩展 en 8 禁词 + ja 8 禁词 per K3 9/2 08:50 GLM 评估)',
  sop10: '门童 #5 SOP-10 5 问门禁',
  entity: '门童 #6 实体注册 (§0.32 P0 强制级, 战略级分层 zh-hk 禁/ja 允许/en 暂保留)',
  count: '门童 #7 数据口径必填 (§0.33 v1.2 升级, K3 9/2 08:09 push 痛骂触发)',
  register: '门童 #8 决策登记簿 (K3 9/2 09:05 拍板 #3, .hermes/decision-register.md SSoT)',
};

const args = process.argv.slice(2);
const STRICT = args.includes('--strict');
const STRICT_ALL = args.includes('--strict-all');
const DOD_MODE = args.includes('--dod');
const COMMIT_MODE = args.includes('--commit');
const SCOPE = (() => {
  const filtered = args.filter(a => !a.startsWith('--') && !['--strict', '--strict-all', '--dod', '--commit'].includes(a));
  return filtered[0] || 'src/';
})();
const REPORT = (() => {
  const i = args.indexOf('--report');
  return i >= 0 ? args[i + 1] : null;
})();

const SEVERITY_CODE = { red: 1, orange: 2, yellow: 3, white: 4 };

// 决定哪些严重度硬拦
function shouldBlock(severity) {
  if (STRICT_ALL) return SEVERITY_CODE[severity] <= 3;  // red + orange + yellow
  if (STRICT) return SEVERITY_CODE[severity] <= 2;       // red + orange
  return SEVERITY_CODE[severity] === 1;                  // 仅 red
}

async function main() {
  console.log('🔍 反审门童 v1 启动 (K3 9/1 15:06 拍板)');
  console.log('═'.repeat(60));
  console.log(`模式: ${STRICT_ALL ? '硬拦 (red+orange+yellow)' : STRICT ? '硬拦 (red+orange)' : '仅 red 硬拦 (shadow mode)'}`);
  console.log(`范围: ${SCOPE}`);
  console.log(`DoD 铁律: ${DOD_MODE ? '启用' : '禁用'}`);
  console.log('');

  // 收集文件
  const common = require(path.join(GUARDS_DIR, 'common.js'));
  const files = common.collectFiles(SCOPE, COMMIT_MODE);
  console.log(`📁 扫描文件数: ${files.length}`);
  console.log('');

  // 5 道门童依次跑
  const allHits = [];
  for (const [guardKey, guard] of Object.entries(GUARDS)) {
    const label = GUARD_LABELS[guardKey];
    const hits = await guard.scan(files);
    if (hits.length > 0) {
      console.log(`${label}: ${hits.length} 命中`);
      for (const hit of hits) {
        const blockMark = shouldBlock(hit.severity) ? '🔴 HARD' : '🟡 SHADOW';
        console.log(`  ${blockMark} [${hit.severity}] ${hit.file}:${hit.line}`);
        console.log(`    规则: ${hit.ruleId} - ${hit.ruleName}`);
        console.log(`    命中: ${hit.match.slice(0, 80)}`);
        if (hit.fix) console.log(`    修法: ${hit.fix}`);
        allHits.push({ guard: guardKey, ...hit });
      }
    } else {
      console.log(`${label}: ✅ 0 命中`);
    }
    console.log('');
  }

  // 汇总
  const counts = { red: 0, orange: 0, yellow: 0, white: 0 };
  for (const hit of allHits) {
    counts[hit.severity]++;
  }

  console.log('═'.repeat(60));
  console.log(`📊 汇总: 🔴 ${counts.red} | 🟠 ${counts.orange} | 🟡 ${counts.yellow} | ⚪ ${counts.white}`);
  console.log('');

  // DoD 铁律
  if (DOD_MODE) {
    const dodPassed = await runDodCheck(allHits);
    if (!dodPassed) {
      console.log('❌ DoD 铁律失败: 修复错误未同步入 error-patterns.md');
      process.exit(1);
    }
  }

  // 决定 exit
  const shouldExit1 = allHits.some(h => shouldBlock(h.severity));
  if (shouldExit1) {
    console.log('❌ 反审门童拦截 (硬拦)');
    process.exit(1);
  } else if (allHits.length > 0) {
    console.log('⚠️ 反审门童预警 (shadow mode, 不拦截)');
    process.exit(0);
  } else {
    console.log('✅ 反审门童全过');
    process.exit(0);
  }
}

// DoD 铁律: No fix without a rule
// 检查: 本次 commit 涉及的 src/ 文件改动，如果命中门童 #1 数据诚信，
// 必查 .hermes/regression-guard/error-patterns.md 是否有对应规则
async function runDodCheck(hits) {
  const common = require(path.join(GUARDS_DIR, 'common.js'));
  const patternsFile = path.join(__dirname, '..', '.hermes', 'regression-guard', 'error-patterns.md');

  if (!fs.existsSync(patternsFile)) {
    console.log('❌ DoD 铁律: .hermes/regression-guard/error-patterns.md 不存在');
    return false;
  }

  const patterns = fs.readFileSync(patternsFile, 'utf-8');

  // 简化的 DoD 检查: 每个被命中的 ruleId, 检查 error-patterns.md 是否有对应 ### 规则 #X
  const uniqueRules = [...new Set(hits.map(h => h.ruleId))];
  for (const ruleId of uniqueRules) {
    if (!patterns.includes(ruleId)) {
      console.log(`❌ DoD 铁律: 规则 ${ruleId} 命中但未入 error-patterns.md`);
      console.log(`   修法: 1 commit 内同步写 .hermes/regression-guard/error-patterns.md ### ${ruleId}`);
      return false;
    }
  }

  console.log('✅ DoD 铁律通过: 所有命中规则已入 error-patterns.md');
  return true;
}

main().catch(err => {
  console.error('反审门童运行失败:', err);
  process.exit(2);
});
