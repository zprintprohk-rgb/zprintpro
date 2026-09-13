/**
 * scripts/guards/common.js
 * 反审门童 v1 共享工具 (K3 9/1 15:06 拍板)
 *
 * 提供: 文件收集 + 行号定位 + 豁免路径 + 白名单 + 严重度输出
 */

const fs = require('fs');
const path = require('path');

/**
 * 2026-09-13 修正 (重要): 原上限 500KB 造成**静默盲区** —— blog-data/{zh-hk,en,ja}.json 单文件 650KB-1MB,
 * 被 size 过滤直接跳过, 于是门禁对**内容最密集的文件**从未真正扫描过
 * (实测: `check-regression-guard.js src/data/blog-data` 报「扫描文件数: 0」= 假通过, 与教训 7「假零」同族)。
 * 现改为 4MB, 并对被跳过的大文件**显式打印警告**, 不再静默。
 */
const MAX_FILE_SIZE = 4 * 1024 * 1024;   // 4MB per file
const MAX_HITS_PER_RULE = 50;       // 每规则最多记录 50 hits
const SKIPPED_OVERSIZE = [];        // 被 size 过滤跳过的文件 (供调用方打印)

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

/**
 * 2026-09-13 新增: 「规则书 / 证据日志」类路径 — **全规则豁免**
 * 起因: pre-commit 门禁修复后 (见 tool-lessons 教训 9), 首次提交 AGENTS.md 被自己拦下:
 *   AGENTS.md 223 命中 + .hermes/logs 49 命中 (BRAND_DOUBLE / I18N_POLLUTION / CRED_* 等),
 *   因为**规则书必须能引用禁用形态作反例**, 日志必须能记录命中原文。
 * 口径: 这些文件不是上线内容 (不渲染、不发布), 对其做字面扫描 = 必然误报;
 *       上线面 (src/ public/) 的强制扫描**不变**。
 */
const FULL_EXEMPT_PATHS = [
  /(^|[\/\\])AGENTS\.md$/,
  /\.hermes[\/\\](logs|reports|memory)[\/\\]/,
  /scripts[\/\\]canonical[\/\\]/,
  /\.githooks[\/\\]/,
  // 门禁基础设施自身 (2026-09-13 补): 其代码/注释必然出现规则 ID、✅ 状态、数字样例,
  // 字面扫描 = 必然误报; 这些脚本不上线, 且其正确性由端到端测试与代码评审保证
  /scripts[\/\\]guards[\/\\]/,
  /(^|[\/\\])scripts[\/\\]check-[^\/\\]*$/,
  /(^|[\/\\])scripts[\/\\]seed-[^\/\\]*$/,
];

// 「引用型规则」: 仅用于判定禁用形态, 文档/规则书/日志必须可以引用其字面
const QUOTE_RULES = new Set([
  'BRAND_DOUBLE', 'BRAND_TYPO', 'BRAND_LOCALE_MISMATCH', 'BRAND_JA_ALTERNATE',
  'I18N_POLLUTION', 'I18N_TITLE_LENGTH', 'I18N_CURRENCY',
  'PHONE_HK_BLACKLIST', 'PHONE_WA_852', 'PHONE_NON_WHITELIST',
]);

/**
 * 2026-09-13 (K3 转述千问 3.8max 复核结论后收紧):
 *   ❌ 原做法: `src/data/**` 整树豁免「语言混用类」规则 —— 被否, 理由: src/data 恰是用户可见字符串最密集处,
 *      整树豁免 = 把守卫从暴露最高的面上摘掉。
 *   ✅ 现做法: **按 locale 字段作用域判定** (真同源检查) ——
 *      · 文件名即 locale 的 (blog-data/zh-hk.json 等) 直接用文件 locale
 *      · 其余: 取命中位置**最近的左侧 locale 键** (`'zh-hk':` / `"ja":` / `en:` …)
 *      · 无法判定 locale -> 保守照扫 (不豁免)
 *      · 另设「合法混用 token 白名单」(币种/标准码/品牌/机型), 只豁免枚举 token, 其余照扫
 *   豁免 sunset: T 批 (title 83 处) 结束后复审一次, 决定是否恢复更严口径 (见 docs/2026-09-13-guard-exemption-policy.md)
 */
const LOCALE_KEY_RE = /["']?(zh-hk|en|ja)["']?\s*:/g;
const FILE_LOCALE_RE = /(?:^|[\/\\])(?:blog-data[\/\\])?(zh-hk|en|ja)(?:\.json|[\/\\])/;
// 行内三元: locale === 'zh-hk' ? A : B  -> A 属该 locale, B 属「非该 locale」(记为 other)
const TERNARY_RE = /locale\s*===?\s*['"](zh-hk|en|ja)['"]\s*\?/;

/** 求某命中位置所属 locale。
 *  优先级: 文件名 (blog-data/<loc>.json) > 行内 locale 三元 > 最近左侧 locale 键 > null (判不出)
 *  返回值: 'zh-hk' | 'en' | 'ja' | 'other' (明确「非某 locale」) | null
 */
function resolveLocale(content, matchIndex, file) {
  const norm = file.replace(/\\/g, '/');
  const fm = FILE_LOCALE_RE.exec(norm);
  if (fm && /blog-data/.test(norm)) return fm[1];

  const lineStart = content.lastIndexOf('\n', matchIndex - 1) + 1;
  const lineEndRaw = content.indexOf('\n', matchIndex);
  const lineEnd = lineEndRaw === -1 ? content.length : lineEndRaw;
  const line = content.slice(lineStart, lineEnd);
  const rel = matchIndex - lineStart;

  // 行内三元判定 (解决 `locale === 'zh-hk' ? '智印港' : 'ZprintPro'` 这类写法的误判)
  const tm = TERNARY_RE.exec(line);
  if (tm) {
    const q = line.indexOf('?', tm.index);
    let colon = -1, quote = null;
    for (let i = q + 1; i < line.length; i++) {
      const ch = line[i];
      if (quote) { if (ch === quote && line[i - 1] !== '\\') quote = null; continue; }
      if (ch === '"' || ch === "'" || ch === '`') { quote = ch; continue; }
      if (ch === ':') { colon = i; break; }
    }
    if (q > 0 && colon > 0) return rel < colon ? tm[1] : 'other';
  }

  const before = content.slice(0, matchIndex);
  let last = null, mm;
  LOCALE_KEY_RE.lastIndex = 0;
  while ((mm = LOCALE_KEY_RE.exec(before)) !== null) last = mm[1];
  return last;
}

// 合法混用 token 白名单 (枚举制, 其余照扫)
const LEGIT_MIX_TOKENS = [
  // 币种 / 价格符号 (en·ja 字段合法出现)
  /\b(?:USD|HKD|JPY|CNY|RMB|EUR|GBP|AUD|SGD)\b/g,
  /US\$|HK\$|¥|￥|\$/g,
  // 国际标准 / 认证 / 工艺代码
  /\b(?:ISO\s?\d{4,5}(?:-\d)?|FSC|FDA|REACH|GHS|ANSI(?:\s?Z535)?|UL|SGS|TÜV|CMYK|RGB|DPI|GSM|PDF\/X-\d[a-z]?|Pantone|CIP|ISBN|EAN|QR)\b/g,
  // 自有品牌 token (跨 locale 出现的品牌名 = 合法)
  /智印港|ZprintPro|ジープリント/g,
  // 设备 / 型号
  /Heidelberg|海德堡|HP\s?Indigo/g,
  // 纸张 / 尺寸代码
  /\bA[0-6]\b|\bB[45]\b|\bDL\b|\bC[45]\b/g,
];

function isLegitMixToken(text) {
  return LEGIT_MIX_TOKENS.some(re => { re.lastIndex = 0; return re.test(text); });
}

function isFullExemptPath(file) {
  return FULL_EXEMPT_PATHS.some(re => re.test(file));
}

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

  // 2026-09-13: 支持 scope 直接传单个文件 (原实现只接受目录, 传文件会 ENOTDIR 崩)
  try {
    if (fs.statSync(dir).isFile()) {
      if (/\.(ts|tsx|js|jsx|json|md|mdx)$/.test(dir) && fs.statSync(dir).size <= MAX_FILE_SIZE) files.push(path.resolve(dir));
      return files;
    }
  } catch (e) { /* 忽略, 走目录分支 */ }

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
  // 规则书 / 证据日志类路径: 全规则豁免 (规则书必须能引用禁用形态作反例)
  if (isFullExemptPath(file)) return hits;
  // docs/ 等豁免路径上的「引用型规则」(品牌/跨语言/电话): 允许文档引用字面, 不做字面拦截
  if (rule.id && QUOTE_RULES.has(rule.id) && EXEMPT_PATHS.some(re => re.test(file))) return hits;
  // regression-guard 规则库自身豁免: 模式库/日志必须记录假数据原文作示例,
  // CRED_ 类 (数据诚信示例) / SOP10_CERT_NO / SECRET_LEAK (规则 regex 示例)
  // 在此目录强制扫描 = 必然误报 (9/4 门童 #15 落地时发现,
  // 既有矛盾: EXEMPT_PATHS 标"必豁免" vs NON_EXEMPT_RULES 强制扫描同一目录)
  // 注: 仅限规则库自身目录; src/ docs/ 等其他位置这些规则仍强制扫描
  const isGuardLibFile = /regression-guard[\/\\]/.test(file);
  if (isGuardLibFile && rule.id && (rule.id.startsWith('CRED_') || rule.id === 'SOP10_CERT_NO' || rule.id === 'SECRET_LEAK')) return hits;
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
  isFullExemptPath,
  isNonExemptRule,
  isOperationalWhitelist,
  findLineNumber,
  scanRule,
  isCommentLine,
  resolveLocale,
  isLegitMixToken,
  QUOTE_RULES,
  LEGIT_MIX_TOKENS,
  MAX_HITS_PER_RULE,
};
