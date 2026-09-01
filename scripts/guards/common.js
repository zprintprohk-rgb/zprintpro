/**
 * scripts/guards/common.js
 * 反审门童 v1 共享工具 (K3 9/1 15:06 拍板)
 *
 * 提供: 文件收集 + 行号定位 + 豁免路径 + 白名单 + 严重度输出
 */

const fs = require('fs');
const path = require('path');

const MAX_FILE_SIZE = 500 * 1024;  // 500KB per file
const MAX_HITS_PER_RULE = 50;       // 每规则最多记录 50 hits

// 豁免路径 (K3 9/1 15:06 拍板: docs/ + .hermes/ + scripts/guards/ 自身 + .hermes/cron-prompts/)
const EXEMPT_PATHS = [
  /docs[\/\\]/,                          // docs/ 路径 (SOP / 报告 / 派活包文档)
  /\.hermes[\/\\]cron-prompts[\/\\]/,    // .hermes/cron-prompts/ (cron 内部策略)
  /\.hermes[\/\\]regression-guard[\/\\]/, // .hermes/regression-guard/ (错误模式库自身, 必豁免)
  /scripts[\/\\]guards[\/\\]/,           // scripts/guards/ (门童脚本自身, 必豁免)
  /scripts[\/\\]check-regression-guard/, // scripts/check-regression-guard.js (主入口自身, 必豁免)
  /scripts[\/\\]check-content-guard/,    // scripts/check-content-guard.js (历史 check, 必豁免)
  /scripts[\/\\]seed-error-patterns/,    // scripts/seed-error-patterns.js (seeding 脚本, 必豁免)
];

// 不豁免的关键规则 (即使在豁免路径也强制扫描, 防止 SOP 文档误植假数据)
const NON_EXEMPT_RULES = [
  'CRED_FSC_C123456',
  'CRED_4_PLUS_NUMBER',
  'CRED_15_YEARS',
  'CRED_1000_PLUS',
  'CRED_HEIDELBERG',
  'CRED_ISO_9001',
  'CRED_X_INDUSTRIES',
  'CRED_X_FOLD',
  'CRED_INTL_TOP',
  'CRED_TUV_RHEINLAND',
  'PHONE_HK_BLACKLIST',
  'PHONE_WA_852',
  'PHONE_NON_WHITELIST',
  'BRAND_DOUBLE',
  'BRAND_TYPO',
  'BRAND_LOCALE_MISMATCH',
  'BRAND_JA_ALTERNATE',
  'I18N_POLLUTION',
  'I18N_TITLE_LENGTH',
  'SOP10_CERT_NO',
  'SECRET_LEAK',
];

// 经营参数白名单 (K3 9/1 15:06 修正 3: 内部可核实参数, 不算不可验证声明)
// 命中这些规则的数字/描述不在门童 #1 数据诚信拦截范围 (仅 yellow 提示)
const OPERATIONAL_WHITELIST = {
  // 材质描述 (内部可核实供应链)
  materialTerms: [
    /FSC認証紙/g,           // 描述性 FSC 认证纸 (不是假证号)
    /FSC认证纸/g,
    /FSC\s*Mix/g,            // FSC Mix 认证
    /FSC\s*100%/g,
    /FSC\s*Recycled/g,
    /大豆油墨/g,
    /碳中和/g,
    /FDA/g,
    /EU\s*REACH/g,
  ],
  // 价格 / 交期 / 起印量 (内部可核实经营参数)
  businessParams: [
    /HK\$\s*[\d.]+/g,                  // HK$ 价
    /100\s*個起印/g,                   // 100 个起印
    /100\s*pcs/g,                      // 100 pcs
    /100\s*枚/g,                       // 100 枚
    /18:00\s*截單/g,                   // 18:00 截单
    /翌日\s*12:00/g,                   // 翌日 12:00
    /順豐/g,                            // 顺丰
    /SF\s*Express/gi,
    /DHL\s*\d+-\d+\s*天/g,             // DHL X-Y 天
    /4\s*天/g,                          // 4 天交期
  ],
  // 业务洞察 (GSC 实证, 不是虚假数据)
  businessInsights: [
    /帶钱词/g,
    /带钱词/g,
    /速赢词/g,
    /重點詞/g,
    /重点词/g,
  ],
};

// 收集目标文件
function collectFiles(dir, onlyStaged = false) {
  const files = [];
  if (!fs.existsSync(dir)) return files;

  // 仅扫 staged diff (pre-commit hook 性能优化, < 5s)
  if (onlyStaged) {
    try {
      const { execSync } = require('child_process');
      const staged = execSync('git diff --cached --name-only', { encoding: 'utf-8', cwd: process.cwd() });
      const lines = staged.split('\n').filter(Boolean);
      for (const line of lines) {
        const full = path.resolve(line);
        if (fs.existsSync(full) && /\.(ts|tsx|js|jsx|json|md|mdx)$/.test(line)) {
          try {
            const stat = fs.statSync(full);
            if (stat.size <= MAX_FILE_SIZE) files.push(full);
          } catch (e) {}
        }
      }
      return files;
    } catch (e) {
      console.warn('⚠️ git diff --cached 失败, 退化到全量扫描');
    }
  }

  // 全量扫描
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, entry.name);
      if (entry.isDirectory()) {
        if (['node_modules', '.next', 'dist', 'coverage', '.git', '__pycache__', 'zprintpro-en-us-images'].includes(entry.name)) continue;
        walk(full);
      } else if (/\.(ts|tsx|js|jsx|json|md|mdx)$/.test(entry.name)) {
        try {
          const stat = fs.statSync(full);
          if (stat.size <= MAX_FILE_SIZE) files.push(full);
        } catch (e) {}
      }
    }
  }
  walk(dir);
  return files;
}

function isExemptPath(file) {
  return EXEMPT_PATHS.some(re => re.test(file));
}

function isNonExemptRule(ruleId) {
  return NON_EXEMPT_RULES.includes(ruleId);
}

// 检查是否在经营参数白名单内
function isOperationalWhitelist(match, ruleId) {
  // 仅对数据诚信类规则生效 (其他门童不豁免)
  if (!ruleId || !ruleId.startsWith('CRED_')) return false;

  for (const [category, patterns] of Object.entries(OPERATIONAL_WHITELIST)) {
    for (const pattern of patterns) {
      if (pattern.test(match)) {
        return { whitelisted: true, category };
      }
    }
  }
  return { whitelisted: false };
}

// 找行号
function findLineNumber(content, matchIndex) {
  const upTo = content.slice(0, matchIndex);
  return upTo.split('\n').length;
}

// 单规则扫描 (返回 hits 数组)
function scanRule(content, file, rule) {
  const hits = [];
  const re = new RegExp(rule.pattern.source, rule.pattern.flags.includes('g') ? rule.pattern.flags : rule.pattern.flags + 'g');
  let match;
  let count = 0;
  while ((match = re.exec(content)) !== null) {
    if (match.index === re.lastIndex) re.lastIndex++;
    if (count >= MAX_HITS_PER_RULE) break;

    // 经营参数白名单检查
    const wl = isOperationalWhitelist(match[0], rule.id);
    if (wl.whitelisted) continue;

    // 注释行排除
    if (isCommentLine(content, match.index)) continue;

    const line = findLineNumber(content, match.index);
    hits.push({
      file: path.relative(process.cwd(), file).replace(/\\/g, '/'),
      line,
      match: match[0],
      severity: rule.severity,
      ruleId: rule.id,
      ruleName: rule.name,
      fix: rule.fix,
    });
    count++;
  }
  return hits;
}

function isCommentLine(content, matchIndex) {
  const lineStart = content.lastIndexOf('\n', matchIndex - 1) + 1;
  const lineContent = content.slice(lineStart, content.indexOf('\n', matchIndex));
  const trimmed = lineContent.trim();
  if (trimmed.startsWith('//')) return true;
  if (trimmed.startsWith('/*')) return true;
  if (trimmed.startsWith('*') && !trimmed.startsWith('*/') && !trimmed.match(/^[\w$]+/)) return true;
  return false;
}

module.exports = {
  collectFiles,
  isExemptPath,
  isNonExemptRule,
  isOperationalWhitelist,
  findLineNumber,
  scanRule,
  isCommentLine,
  MAX_HITS_PER_RULE,
};
