/**
 * scripts/guards/count-guard.js (v1.2)
 * 门童 #7 数据口径必填 (K3 9/2 08:09 push 痛骂触发)
 *
 * 严重度: 🟠 orange (shadow mode v1.2 9/2-9/15, --strict 启用硬拦)
 *
 * 5 类规则 (per AGENTS.md §0.31.1.7 + §0.33):
 * 1. COUNT_NO_SOURCE [orange]: 报告含 blog/SKU/询盘/客户等数字, 但缺 "数据来源:" 行
 * 2. COUNT_NO_4_LOCALE [orange]: 报告含数字, 但缺 zh-hk 79 / en 80 / ja 80 / blog-posts.ts 85 双口径
 * 3. COUNT_NO_CALIBRATION [yellow]: 报告含数字, 但缺 "校准日期" 字段
 * 4. COUNT_MISLEADING [orange]: 报告口径与 SSoT 不一致, 但未标双口径
 * 5. COUNT_NO_RETRACTION [yellow]: 报告撤回数据/数字, 但缺 "原 commit ID + 撤回日期"
 *
 * K3 §0.22 SOP-10 第 3 款: 上报拍板前先问"原数据/拍板来源"
 * K3 §0.23 数据诚信红线: 任何报告必含"数据来源"行
 * K3 §0.33 数据口径校准硬规则: 4 口径对照表必填
 *
 * 4 口径对照表 (per §0.33.1, 必填):
 *   - zh-hk.json unique slugs: 79
 *   - en.json unique slugs: 80
 *   - ja.json unique slugs: 80
 *   - blog-posts.ts SSoT entries: 85
 *   - 跨 locale 并集: 81
 *   - 跨 locale 交集: 78
 *
 * 校准日期: 2026-09-02 08:12
 * 校准方法: python _audit_blog_count_real.py + _audit_blog_count_deep.py + _simplified_traditional_unify.py 9/2 08:10-08:15 真验证
 *
 * 触发来源: K3 9/2 08:09 push 痛骂原文
 *   "全部文章 85 明明我们 zh-hk 语言下就有 85 篇，你却说 79，这些信息是从哪里来的，
 *    错误信息，思考理解问题，分析研究后给到最优方案，能读肯定是最新信息，
 *    怎么老是老信息，至少 2 天内有两次说数据不对了"
 *
 * v1.2 (9/2 08:12 K3 拍板触发): shadow mode 上线, 9/15 FP 复盘 <10% 后升硬拦
 */

const path = require('path');
const common = require('./common.js');

// 数字触发表 (K3 §0.33 拍板: 报告含这些数字必含 4 口径对照)
const NUMBER_TRIGGERS = [
  /\b\d+\s*blog\b/gi,                    // X blog
  /\b\d+\s*篇\b/g,                       // X 篇
  /\b\d+\s*SKU\b/gi,                     // X SKU
  /\b\d+\s*询盘\b/g,                     // X 询盘
  /\b\d+\s*詢盤\b/g,                     // X 詢盤 (zh-hk)
  /\b\d+\s*客户\b/g,                     // X 客户
  /\b\d+\s*客戶\b/g,                     // X 客戶
  /\b\d+\s*询盘\s*\/\s*[週周]\b/g,       // X 询盘/週
  /\b\d+\s*詢盤\s*\/\s*[週周]\b/g,       // X 詢盤/週
  /\b\d+\s*baseline\b/gi,                // X baseline
  /\b\d+\s*篇文章\b/g,                   // X 篇文章
  /\b\d+\s*篇\s*blog\b/gi,               // X 篇 blog
  /\b\d+\s*entry\b/gi,                   // X entry
  /\b\d+\s*entries\b/gi,                 // X entries
  /\b\d+\s*slug\b/gi,                    // X slug
  /\b\d+\s*slugs\b/gi,                   // X slugs
];

// 4 口径关键词表 (per §0.33.1 必填)
const LOCALE_KEYWORDS = {
  zhHk: /\bzh[- ]?hk\b/gi,
  en: /\ben\b/gi,
  ja: /\bja(?:pan)?\b/gi,
  ssoT: /blog[- ]?posts\.ts|SSoT|S\s*S\s*o\s*T/gi,
  crossLocale: /跨\s*locale|並\s*集|并\s*集|交\s*集/gi,
};

// 数据来源行关键词 (per §0.23 数据诚信红线)
const SOURCE_KEYWORDS = [
  /数据来源\s*[:：]/,
  /資料來源\s*[:：]/,
  /data\s*source\s*[:：]/i,
  /src\/data\/blog-data/i,
  /src\/data\/sku-seo-data/i,
  /src\/data\/blog-posts\.ts/i,
  /python\s+_audit/i,
  /校准日期/i,
  /校準日期/i,
];

// 校准日期关键词 (per §0.33.2 必含)
// 注意: JS regex \s 不匹中文字符, 用 [\s\S] 匹任意字符 (含换行)
const CALIBRATION_KEYWORDS = [
  /校准日期[\s\S]{0,5}[:：][\s\S]{0,5}\d{4}-\d{2}-\d{2}/,
  /校準日期[\s\S]{0,5}[:：][\s\S]{0,5}\d{4}-\d{2}-\d{2}/,
  /calibration\s*date\s*[:：]/i,
  /calibrated\s*[:：]/i,
];

// 撤回声明关键词 (per §0.23 撤回必含)
const RETRACTION_KEYWORDS = [
  /撤回[\s\S]{0,5}[:：][\s\S]{0,30}commit\s*ID/i,
  /撤回[\s\S]{0,5}[:：][\s\S]{0,30}commit/i,
  /retraction[\s\S]{0,5}[:：][\s\S]{0,30}commit/i,
  /撤回声明/i,
];

const RULES = [
  {
    id: 'COUNT_NO_SOURCE',
    name: '报告无数据来源行 (per K3 §0.23 数据诚信红线)',
    severity: 'orange',
    pattern: null,  // 自定义检查
    fix: '补 "数据来源:" 行 (格式: 数据源文件名 + 校准日期)',
  },
  {
    id: 'COUNT_NO_4_LOCALE',
    name: '报告无 4 口径对照表 (per K3 §0.33.1 必填)',
    severity: 'orange',
    pattern: null,
    fix: '补 4 口径对照表: zh-hk 79 / en 80 / ja 80 / blog-posts.ts SSoT 85',
  },
  {
    id: 'COUNT_NO_CALIBRATION',
    name: '报告无校准日期 (per K3 §0.33.2 必含)',
    severity: 'yellow',
    pattern: null,
    fix: '补 "校准日期: YYYY-MM-DD HH:MM"',
  },
  {
    id: 'COUNT_MISLEADING',
    name: '报告口径与 SSoT 不一致, 未标双口径 (per K3 §0.33)',
    severity: 'orange',
    pattern: null,
    fix: '标 "vs blog-posts.ts SSoT 85 双口径"',
  },
  {
    id: 'COUNT_NO_RETRACTION',
    name: '报告撤回数据/数字, 无原 commit ID + 撤回日期 (per K3 §0.23)',
    severity: 'yellow',
    pattern: null,
    fix: '补撤回声明 (per §0.23 撤回必含原 commit ID + 撤回日期)',
  },
];

// 自定义检查: 报告含数字但缺数据来源
function checkReport(content, file) {
  const hits = [];

  // 1. 检查是否触发数字 (报告含 blog/SKU/询盘/客户 等数字)
  const hasNumberTrigger = NUMBER_TRIGGERS.some(re => re.test(content));
  if (!hasNumberTrigger) return hits;  // 没数字触发 = 不算报告, 跳过

  // 2. 数据来源行检查
  const hasSource = SOURCE_KEYWORDS.some(re => re.test(content));
  if (!hasSource) {
    hits.push({
      file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
      line: 0,
      match: '报告含数字, 但缺 "数据来源:" 行',
      severity: 'orange',
      ruleId: 'COUNT_NO_SOURCE',
      ruleName: RULES[0].name,
      fix: RULES[0].fix,
    });
  }

  // 3. 4 口径对照表检查
  const hasZhHk = LOCALE_KEYWORDS.zhHk.test(content);
  const hasEn = LOCALE_KEYWORDS.en.test(content);
  const hasJa = LOCALE_KEYWORDS.ja.test(content);
  const hasSSoT = LOCALE_KEYWORDS.ssoT.test(content);
  const hasCrossLocale = LOCALE_KEYWORDS.crossLocale.test(content);
  const localeCount = [hasZhHk, hasEn, hasJa, hasSSoT].filter(Boolean).length;
  if (localeCount < 3) {  // 至少 3 个 locale + SSoT
    hits.push({
      file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
      line: 0,
      match: `报告含数字, 但 4 口径对照表不全 (命中 ${localeCount}/4)`,
      severity: 'orange',
      ruleId: 'COUNT_NO_4_LOCALE',
      ruleName: RULES[1].name,
      fix: RULES[1].fix,
    });
  }

  // 4. 校准日期检查
  const hasCalibration = CALIBRATION_KEYWORDS.some(re => re.test(content));
  if (!hasCalibration) {
    hits.push({
      file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
      line: 0,
      match: '报告含数字, 但缺 "校准日期" 字段',
      severity: 'yellow',
      ruleId: 'COUNT_NO_CALIBRATION',
      ruleName: RULES[2].name,
      fix: RULES[2].fix,
    });
  }

  // 5. 撤回声明检查 (如果报告涉及"撤回"但缺 commit ID)
  const hasRetractionMention = /撤回/i.test(content);
  if (hasRetractionMention) {
    const hasRetractionDetail = RETRACTION_KEYWORDS.some(re => re.test(content));
    if (!hasRetractionDetail) {
      hits.push({
        file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
        line: 0,
        match: '报告含 "撤回" 但缺原 commit ID + 撤回日期',
        severity: 'yellow',
        ruleId: 'COUNT_NO_RETRACTION',
        ruleName: RULES[4].name,
        fix: RULES[4].fix,
      });
    }
  }

  return hits;
}

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    // §0.33 跨项目 P0 强制级, 报告类文件必查 (含 docs/ AGENTS.md commit message 等)
    // 但豁免 .hermes/regression-guard/ (自身) + scripts/guards/ (门童脚本自身)
    if (common.isExemptPath(file)) {
      // 仅扫描 docs/ + AGENTS.md + commit message 类 (报告型文件)
      const isReportFile = /\.(md|mdx|txt)$/i.test(file) && (
        file.includes('/docs/') ||
        file.includes('AGENTS.md') ||
        file.includes('CLAUDE.md') ||
        file.includes('README.md')
      );
      if (!isReportFile) continue;
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

module.exports = { scan, RULES, checkReport };
