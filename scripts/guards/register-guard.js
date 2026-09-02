/**
 * scripts/guards/register-guard.js (v1.2)
 * 门童 #8 决策登记簿 (K3 9/2 09:05 拍板, 跨项目 P0 强制级)
 *
 * 严重度: 🟡 yellow (shadow mode v1.2 9/2-9/15, FP 复盘 <10% 后升 red 硬拦)
 *
 * 触发: 任何报告含 "✅ 已落地" / "已完成" / "已 commit" / "已 push" / "已排期" 等状态字样
 * 拦截: 必须含对应登记簿 ID + 验证产物 (commit ID / 5 URL / 工单号 / 截图 / log)
 * 缺任一 = yellow 警告 (9/15 后 red 硬拦)
 *
 * K3 §0.0 零决策铁律: M3 不擅自改, K3 拍板后才执行
 * K3 9/2 09:05 拍板: 决策登记簿 + 门童 #8 批准, 今天建, 历史拍板全部回填
 * K3 9/2 09:05 拍板: 报告说 DONE 必须链接验证产物, 无产物 = 状态自动降为 OPEN
 *
 * 落地: .hermes/decision-register.md (SSoT)
 * 配套: check-regression-guard.js 主入口加 GUARDS.register
 *
 * 状态枚举:
 * - 🔴 OPEN: 已拍板, 未启动
 * - 🟡 IN_PROGRESS: 启动中, 部分完成
 * - 🟢 DONE: 完成 (附验证产物)
 * - ⚪ BLOCKED: 阻塞, 等 K3 拍板 / 真人动作
 * - ⛔ RETRACTED: 撤回 (per §0.23)
 */

// 状态字样触发 (per K3 9/2 09:05 派活包)
const STATUS_TRIGGERS = [
  /✅\s*已落地/g,
  /✅\s*已完成/g,
  /✅\s*已\s*commit/g,
  /✅\s*已\s*push/g,
  /✅\s*已排期/g,
  /✅\s*已嵌入/g,
  /✅\s*已升级/g,
  /✅\s*已拍板/g,
  /✅\s*已修正/g,
  /✅\s*已撤除/g,
  /✅\s*已派单/g,
  /✅\s*已落地 v\d/g,
  /✅\s*DONE/gi,
  /✅\s*PUSHED/gi,
  /✅\s*落地/g,
];

// 决策登记簿 ID pattern (D-YYYY-MM-DD-NN 格式, 9/1-9/2 派活包历史)
const REGISTER_ID_PATTERNS = [
  /D-\d{1,2}\/\d{1,2}-\d+/g,  // D-9/1-1 / D-9/2-11
  /D-9\/2-12/g,              // 本轮新拍板 K3 9/2 09:05 #1
  /D-9\/2-13/g,              // 9 月 30 天收敛 7 项 P0
  /D-9\/2-14/g,              // 决策登记簿 + 门童 #8
  /D-9\/2-15/g,              // IndexNow 自解锁
  /D-9\/2-16/g,              // R6 收尾
  /D-9\/2-17/g,              // R0 四项解锁
];

// 验证产物 pattern (commit ID / 5 URL / 工单号 / 截图 / log)
const VERIFICATION_PATTERNS = [
  /commit\s+[a-f0-9]{7,40}/gi,                    // commit ID
  /5\s*URL\s*verify/gi,                            // 5 URL verify
  /工单号?\s*[:：]?\s*[A-Z0-9-]+/g,                // 工单号
  /截图/gi,                                        // 截图
  /\.log/gi,                                       // log
  /IndexNow\s*200/gi,                              // IndexNow 200
  /build\s*PASS/gi,                                // build PASS
  /GA4\s*G-[A-Z0-9]+/gi,                           // GA4 G-XXXX
  /Supabase/gi,                                    // Supabase
  /PayPal/gi,                                      // PayPal
  /Stripe/gi,                                      // Stripe
  /prod build PASS/gi,
  /\d{2,4}\s*URLs?\s*(verify|verified)/gi,         // N URLs verified
  /backtest\s*\d+\s*文件\s*0\s*命中\s*PASS/gi,     // backtest PASS
];

const RULES = [
  {
    id: 'REGISTER_NO_ID',
    name: '报告含 ✅ 状态字样, 但缺决策登记簿 ID (per K3 9/2 09:05 拍板 #3)',
    severity: 'yellow',
    pattern: null,  // 自定义检查
    fix: '补登记簿 ID (格式: D-9/2-NN, 详见 .hermes/decision-register.md)',
  },
  {
    id: 'REGISTER_NO_VERIFICATION',
    name: '报告含 ✅ 状态字样, 但缺验证产物 (commit ID / 5 URL / 工单号 / 截图 / log)',
    severity: 'yellow',
    pattern: null,
    fix: '补验证产物 (commit ID / 5 URL / 工单号 / 截图 / log, per K3 9/2 09:05 拍板 #3 强制规则)',
  },
  {
    id: 'REGISTER_INFLATED',
    name: '报告含 ✅ 状态字样无 ID 无产物, 疑似注水 (第 3 次发生, per GLM 9/2 09:05 §3 硬伤 2)',
    severity: 'orange',
    pattern: null,
    fix: '立即补登记簿 ID + 验证产物, 或降状态为 🔴 OPEN (per K3 9/2 09:05 强制规则 2)',
  },
];

// 自定义检查
function checkReport(content, file) {
  const hits = [];

  // 1. 找所有 ✅ 状态字样
  const statusMatches = [];
  for (const re of STATUS_TRIGGERS) {
    let m;
    while ((m = re.exec(content)) !== null) {
      statusMatches.push({
        match: m[0],
        index: m.index,
        line: content.slice(0, m.index).split('\n').length,
      });
    }
  }

  if (statusMatches.length === 0) return hits;  // 没状态字样 = 不算报告, 跳过

  // 2. 检查登记簿 ID
  const hasRegisterId = REGISTER_ID_PATTERNS.some(re => re.test(content));

  // 3. 检查验证产物
  const hasVerification = VERIFICATION_PATTERNS.some(re => re.test(content));

  // 4. 报告路径 (排除决策登记簿自身 + 5 cron SSoT §I v2 嵌入段)
  if (file && (file.includes('decision-register.md') || file.includes('register-guard.js'))) {
    return hits;
  }

  if (statusMatches.length > 0 && !hasRegisterId) {
    // 注水风险: 含 ✅ 但无登记簿 ID
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: `报告含 ${statusMatches.length} 处 ✅ 状态字样, 但缺决策登记簿 ID`,
      severity: 'yellow',
      ruleId: 'REGISTER_NO_ID',
      ruleName: RULES[0].name,
      fix: RULES[0].fix,
    });
  }

  if (statusMatches.length > 0 && !hasVerification) {
    // 注水风险: 含 ✅ 但无验证产物
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: `报告含 ${statusMatches.length} 处 ✅ 状态字样, 但缺验证产物 (commit ID / 5 URL / 工单号 / 截图 / log)`,
      severity: 'yellow',
      ruleId: 'REGISTER_NO_VERIFICATION',
      ruleName: RULES[1].name,
      fix: RULES[1].fix,
    });
  }

  if (statusMatches.length > 0 && !hasRegisterId && !hasVerification) {
    // 高风险注水: 两者都缺
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: `报告含 ${statusMatches.length} 处 ✅ 状态字样, 但 ID 和验证产物都缺, 疑似注水 (第 3 次发生, per GLM 9/2 09:05 §3 硬伤 2)`,
      severity: 'orange',
      ruleId: 'REGISTER_INFLATED',
      ruleName: RULES[2].name,
      fix: RULES[2].fix,
    });
  }

  return hits;
}

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    // §0.0 决策登记簿自身 + 门童脚本自身 + .hermes/regression-guard/ 必豁免
    if (file.includes('decision-register.md') ||
        file.includes('register-guard.js') ||
        file.includes('.hermes/regression-guard/')) {
      continue;
    }

    let content;
    try {
      content = require('fs').readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    const hits = checkReport(content, file);
    allHits.push(...hits);
  }
  return allHits;
}

module.exports = { scan, RULES, checkReport, STATUS_TRIGGERS, REGISTER_ID_PATTERNS, VERIFICATION_PATTERNS };
