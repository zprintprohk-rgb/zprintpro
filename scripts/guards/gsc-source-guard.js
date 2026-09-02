/**
 * scripts/guards/gsc-source-guard.js (v1.3)
 * 门童 #9 GSC 数据源 (K3 9/2 09:29 派活包 GLM §J, 跨项目 P0 强制级)
 *
 * 严重度: 🟡 yellow (shadow mode v1.3 9/2-9/15, FP 复盘 <10% 后升 red 硬拦)
 *
 * 触发: 任何含内容决策或数字的报告
 * 检查 ①: GSC 来源行存在 (文件名 + 校准日期) — 与门童 #7 数据口径互补
 * 检查 ②: 所引 GSC 文件年龄 ≤72h (读 index.json 实时校验, 防"引用旧文件当新证据")
 * 检查 ③: 选题/词决策含词级证据 (query+imps+pos 完整三元组)
 *
 * K3 9/2 09:29 派活包 "思考 GLM 关于我提出的 Blog 的建议, 和一定要去 F:\\zprintpro-nextjs\\GSC数据
 *   文件夹读取最新的 GSC 数据 或是联网读取 GSC 数据, 标题也要同 GSC 数据 和 SKU 的数据
 *   以及关键词的数据, 深度思考理解问题和要求, 以 9 角色综合最优执行"
 *
 * 落地: GSC数据/index.json SSoT + scripts/guards/gsc-source-guard.js 门童 #9 +
 *   check-regression-guard.js 主入口 GUARDS.gsc-source (10 道门童)
 *
 * 词级证据链格式: GSC数据/gsc-fresh-YYYY-MM-DD.json · [query] · [imps] imps · pos [x] · [clicks] clicks
 *
 * 教训固化源头: 8/29-9/1 复盘 cron 3 天断档 (GSC 数据 0 落盘, PENDING 状态)
 * 数据资产保护: GSC UI 16 个月滚动窗口限制 (seo-stack.io 联网核实), 落盘义务
 */

const fs = require('fs');
const path = require('path');

const GSC_INDEX_PATH = path.join(__dirname, '..', '..', 'GSC数据', 'index.json');
const FRESHNESS_GATE_HOURS = 72;

// GSC 来源行 pattern (per §K.1.4 词级证据链格式)
const GSC_SOURCE_PATTERNS = [
  /GSC[数据]?[/\\]?gsc-fresh-\d{4}-\d{2}-\d{2}\.json/gi,                      // gsc-fresh-YYYY-MM-DD.json
  /GSC[数据]?[/\\]?index\.json/gi,                                            // index.json
  /GSC[数据]?[/\\]?zprintpro\.com-Performance-on-Search-\d{4}-\d{2}-\d{2}/gi, // 8/17 总数据
  /GSC[数据]?[/\\]?zprintpro\.com-Performance-\w*on-Search-\d{4}-\d{2}-\d{2}/gi, // 8/13 4 个 CSV
  /GSC[数据]?[/\\]?\d{4}-\d{2}-\d{2}[/\\]?/gi,                                  // 子文件夹
];

// 词级证据链三元组 pattern (query + imps + pos)
const WORD_LEVEL_EVIDENCE = [
  /[a-zA-Z0-9\u4e00-\u9fa5]+[·\s]+\d+\s*imps?\s*[·\s]+pos\s*[\d.]+/g,  // query · X imps · pos X
  /[a-zA-Z0-9\u4e00-\u9fa5]+[·\s]+\d+\s*clicks?\s*[·\s]+/g,         // query · X clicks
  /pos\s*[\d.]+[·\s]+\d+\s*imps/g,                                       // pos X · X imps
];

// 校准日期 pattern (per §0.23 数据诚信红线 + §0.33 数据口径)
const CALIBRATION_DATE_PATTERNS = [
  /校准日期\s*[:：]\s*\d{4}-\d{2}-\d{2}/,
  /校準日期\s*[:：]\s*\d{4}-\d{2}-\d{2}/,
  /calibration\s*date\s*[:：]\s*\d{4}-\d{2}-\d{2}/i,
];

// 加载 GSC index.json (per §K.1.1 索引, §K.1.3 新鲜度闸门)
function loadGscIndex() {
  if (!fs.existsSync(GSC_INDEX_PATH)) {
    return {
      exists: false,
      freshnessStatus: 'NO_INDEX',
      stalenessDays: -1,
      latestFreshData: null,
    };
  }
  try {
    const content = fs.readFileSync(GSC_INDEX_PATH, 'utf-8');
    const index = JSON.parse(content);
    return {
      exists: true,
      freshnessStatus: index.freshnessStatus || 'UNKNOWN',
      stalenessDays: index.stalenessDays || -1,
      latestFreshData: index.latestFreshData || null,
      freshnessGateHours: index.freshnessGateHours || FRESHNESS_GATE_HOURS,
      totalFiles: index.totalFiles || 0,
      lastBuild: index.lastBuild || null,
    };
  } catch (e) {
    return {
      exists: false,
      freshnessStatus: 'PARSE_ERROR',
      stalenessDays: -1,
      latestFreshData: null,
    };
  }
}

const RULES = [
  {
    id: 'GSC_NO_SOURCE',
    name: '报告含内容决策或数字, 但缺 GSC 来源行 (per K3 9/2 09:29 §K.1.4 词级证据链)',
    severity: 'yellow',
    pattern: null,
    fix: '补 GSC 来源行: GSC数据/gsc-fresh-YYYY-MM-DD.json · [query] · [imps] imps · pos [x] · [clicks] clicks',
  },
  {
    id: 'GSC_STALE',
    name: '所引 GSC 文件年龄 >72h, 引用旧文件当新证据 (per K3 9/2 09:29 §K.1.3 新鲜度闸门)',
    severity: 'orange',
    pattern: null,
    fix: '触发 GSC 刷新 (gsc-feedback-loop cron 9/3 15:00 首跑), 刷新失败全部标 PENDING_GSC',
  },
  {
    id: 'GSC_NO_WORD_LEVEL_EVIDENCE',
    name: '选题/词决策缺词级证据三元组 (query+imps+pos, per K3 9/2 09:29 §K.1.4)',
    severity: 'yellow',
    pattern: null,
    fix: '补词级证据: GSC数据/gsc-fresh-YYYY-MM-DD.json · [query] · [imps] imps · pos [x]',
  },
  {
    id: 'GSC_NO_CALIBRATION_DATE',
    name: 'GSC 来源行缺校准日期 (per K3 §0.23 数据诚信红线)',
    severity: 'yellow',
    pattern: null,
    fix: '补 校准日期: YYYY-MM-DD HH:MM 字段',
  },
];

// 自定义检查
function checkReport(content, file) {
  const hits = [];

  // 0. 加载 GSC index
  const gscIndex = loadGscIndex();

  // 1. 检测报告类型: 含数字 / 选题 / 词决策 / 战略判定
  const isContentDecision = /\b(选题|title|meta|词决策|sku|blog|决策|战略|关键词|query|imps|pos|ctr|clicks)\b/i.test(content);
  const hasNumber = /\b\d+(\.\d+)?\s*(个|篇|条|词|imp|click|%/g.test(content) ||
                    /\b\d{1,3}\s*个\b/g.test(content);
  if (!isContentDecision && !hasNumber) {
    return hits;  // 不是内容决策报告, 跳过
  }

  // 2. 检查 GSC 来源行 (检查 ①)
  const hasGscSource = GSC_SOURCE_PATTERNS.some(re => re.test(content));
  if (!hasGscSource) {
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: '报告含内容决策或数字, 但缺 GSC 来源行 (per K3 9/2 09:29 §K.1.4 词级证据链)',
      severity: 'yellow',
      ruleId: 'GSC_NO_SOURCE',
      ruleName: RULES[0].name,
      fix: RULES[0].fix,
    });
  }

  // 3. 检查 GSC 文件新鲜度 (检查 ②, 读 index.json)
  if (gscIndex.exists && gscIndex.freshnessStatus === 'STALE') {
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: `GSC 数据 STALE: stalenessDays=${gscIndex.stalenessDays} > 72h 红线 (per K3 9/2 09:29 §K.1.3 新鲜度闸门)`,
      severity: 'orange',
      ruleId: 'GSC_STALE',
      ruleName: RULES[1].name,
      fix: RULES[1].fix,
    });
  }

  // 4. 检查词级证据三元组 (检查 ③)
  const hasWordLevelEvidence = WORD_LEVEL_EVIDENCE.some(re => re.test(content));
  if (isContentDecision && !hasWordLevelEvidence) {
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: '报告含选题/词决策, 但缺词级证据三元组 (query+imps+pos, per K3 9/2 09:29 §K.1.4)',
      severity: 'yellow',
      ruleId: 'GSC_NO_WORD_LEVEL_EVIDENCE',
      ruleName: RULES[2].name,
      fix: RULES[2].fix,
    });
  }

  // 5. 检查校准日期
  const hasCalibration = CALIBRATION_DATE_PATTERNS.some(re => re.test(content));
  if (hasGscSource && !hasCalibration) {
    hits.push({
      file: file ? file.replace(process.cwd(), '').replace(/\\/g, '/') : 'unknown',
      line: 0,
      match: 'GSC 来源行缺校准日期 (per K3 §0.23 数据诚信红线)',
      severity: 'yellow',
      ruleId: 'GSC_NO_CALIBRATION_DATE',
      ruleName: RULES[3].name,
      fix: RULES[3].fix,
    });
  }

  return hits;
}

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    // 豁免: 门童脚本自身 + .hermes/regression-guard/ + GSC数据/ 自身
    if (file.includes('gsc-source-guard.js') ||
        file.includes('.hermes/regression-guard/') ||
        file.includes('GSC数据/')) {
      continue;
    }

    let content;
    try {
      content = fs.readFileSync(file, 'utf-8');
    } catch (e) { continue; }

    const hits = checkReport(content, file);
    allHits.push(...hits);
  }
  return allHits;
}

module.exports = {
  scan, RULES, checkReport, loadGscIndex,
  GSC_INDEX_PATH, FRESHNESS_GATE_HOURS,
  GSC_SOURCE_PATTERNS, WORD_LEVEL_EVIDENCE, CALIBRATION_DATE_PATTERNS,
};
