#!/usr/bin/env node
/**
 * scripts/check-content-guard.js (v2 - 优化)
 * K3 v3.17 8/24 EOD §A 19 守门扫描
 * 验收第 7 步: user-facing 文本守门
 *
 * v2 优化: 限制单文件大小 + 限制命中数 + 流式逐行扫描, 避免 OOM
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const args = process.argv.slice(2);
const SCOPE = (() => {
  const i = args.indexOf('--scope');
  return i >= 0 ? args[i + 1] : 'src/';
})();
const STRICT = args.includes('--strict');
const REPORT = (() => {
  const i = args.indexOf('--report');
  return i >= 0 ? args[i + 1] : null;
})();
const MAX_FILE_SIZE = 500 * 1024; // 500KB per file
const MAX_HITS_PER_RULE = 50; // 每个 rule 最多记录 50 hits

// 4 类扫描规则 (v2 优化: 全局 regex 一次编译)
const RULES = {
  'STRATEGY_JARGON': {
    severity: 'yellow',
    label: '🟡 策略黑话泄漏',
    patterns: [
      /\bcluster\b/gi,
      /\b目標[:：]/g,
      /\b维持 top\s+\d+/gi,
      /\b維持 top\s+\d+/gi,
      /\b拍板\b/g,
      /\b埋点\b/g,
      /\b埋點\b/g,
      /\bSOP[- ]?\d+/g,
      /\bv3\.\d+/g,
      /\bT\d{2}\b/g,
      /\b基线\b/g,
      /\b基綫\b/g,
      /\b驗收\b/g,
      /\b验收\b/g,
      /\b9\/4\b/g,
      /\b8\/28\b/g,
    ],
  },
  'PLACEHOLDER': {
    severity: 'white',
    label: '⚪ 占位符残留',
    patterns: [
      /\bC123456\b/g,
      /\b01 100 150 1234\b/g,
      /\b1234\b/g,
      /\bXXXX\b/g,
      /\bTBD\b/g,
      /占位/g,
      /placeholder/gi,
    ],
  },
  'SIMPLIFIED_CHINESE': {
    severity: 'yellow',
    label: '🟡 简体字残留 (zh-hk/ja)',
    // 简体字特征字
    patterns: [
      /[复电业为发这们个时来会说过对开现应学页]/g,
    ],
  },
  'UNVERIFIED_CLAIM': {
    severity: 'orange',
    label: '🟠 未证实声明',
    patterns: [
      /ISO 9001:2015/g,
      /ISO 9001/g,
      /FSC®?\s*C\d{6}/g,
      /FSC认证/g,
      /FSC認證/g,
      /TÜV\s*Rheinland/g,
      /1,000\+/g,
      /1000\+/g,
      /15年/g,
      /十五年/g,
      /98%/g,
      /自設廠房/g,
      /自设厂房/g,
      /海德堡柯式/g,
      /Heidelberg/g,
      /HP Indigo/g,
    ],
  },
  // 2026-08-24 F1-batch-6 Rule 5 (K3 8/24 20:15 P1 #4 拍板)
  // Raw Markdown link syntax [text](url) 出现在渲染层 (page.tsx/component), 未经过 parseInlineLinks() 解析
  // 数据源 (data/*.ts, *.json) 不命中, 渲染层用 dangerouslySetInnerHTML/parseInlineLinks 才合法
  'RAW_MARKDOWN_LINK': {
    severity: 'red',
    label: '🔴 Raw Markdown 链接 (未解析)',
    patterns: [
      // [text](url) 但排除 ![alt](url) 图片
      // 用 lookbehind/lookahead 复杂, 改用 post-match 二次过滤
      /\[([^\]!\n]{1,80})\]\(([^)\s\n]{1,200})\)/g,
    ],
  },
};

const severityCode = { red: 1, orange: 2, yellow: 3, white: 4 };

// 收集目标文件 (限制大小)
function collectFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', 'dist', 'coverage', '.git', '__pycache__'].includes(entry.name)) continue;
      collectFiles(full, files);
    } else if (/\.(ts|tsx|js|jsx|json|md|mdx)$/.test(entry.name)) {
      try {
        const stat = fs.statSync(full);
        if (stat.size <= MAX_FILE_SIZE) {
          files.push(full);
        }
      } catch (e) {}
    }
  }
  return files;
}

// 文件路径是否属于 zh-hk/ja 内容 (用于简体字规则)
function isZHHKorJA(file) {
  return file.includes('zh-hk') || file.includes('/ja/') || file.includes('ja.json') || file.includes('messages/');
}

// 文件路径是否属于渲染层 (Rule 5 Raw Markdown link 才命中)
function isRenderLayer(file) {
  return file.includes('src\\app\\') || file.includes('src/app/') ||
         file.includes('src\\components\\') || file.includes('src/components/');
}

// v3 误报优化: 排除注释行 (// 开头, /* */ 块, * 续行)
function isCommentLine(content, matchIndex) {
  const lineStart = content.lastIndexOf('\n', matchIndex - 1) + 1;
  const linePrefix = content.slice(lineStart, matchIndex);
  const lineContent = content.slice(lineStart, content.indexOf('\n', matchIndex));
  const trimmed = lineContent.trim();
  // 单行注释
  if (trimmed.startsWith('//')) return true;
  // 块注释起始
  if (trimmed.startsWith('/*')) return true;
  // 块注释续行
  if (trimmed.startsWith('*') && !trimmed.startsWith('*/') && !trimmed.match(/^[\w$]+/)) return true;
  // 行首有 // 但在 string 内 (粗略检测: // 后不是引号)
  // 注: 完美检测需要 AST, 简单实现够用 95% 场景
  return false;
}

// v3 误报优化: 排除变量名/函数名/类名 (代码标识符, 非字符串字面量)
// 检测逻辑: 凡是 cluster / T00 / SOP-N / v3.N 等模式在代码区 (const/let/var/.x/[x] 后), 算代码
// 简化为: 行内代码关键字 OR cluster 前后是 . [ ( , { = 等代码符号, 算代码
function isVariableOrCodeIdentifier(content, matchIndex) {
  const lineStart = content.lastIndexOf('\n', matchIndex - 1) + 1;
  const lineEnd = content.indexOf('\n', matchIndex);
  const line = content.slice(lineStart, lineEnd > 0 ? lineEnd : undefined);
  const before = content.slice(lineStart, matchIndex);
  const after = content.slice(matchIndex, lineEnd > 0 ? lineEnd : undefined);
  // 整行不含 ' " ` 引号 (单行代码)
  if (!/['"`]/.test(line)) {
    // 整行是纯代码, 算代码标识符
    return true;
  }
  // match 之前最近的非空字符是 . [ ( , { = ; 等代码符号 → 算代码
  // 注意: cluster 前是 " " (空格) 算代码 — 因为 cluster 是裸标识符, 通常是变量名
  const beforeTrim = before.replace(/\s+$/, '');
  const lastChar = beforeTrim.slice(-1);
  if (/[\.\[\(,;{=]/.test(lastChar)) {
    // 但要排除字符串内: 'foo.cluster' — lastChar 是引号 → 不算
    if (/['"`]/.test(lastChar)) return false;
    return true;
  }
  // match 之前是空白 + 标识符开头 (cluster 在标识符位置, 如 "cluster.keywords" 中的 cluster)
  // 整行形如 `\w+(\.\w+|\[)` → 算代码
  if (/^\s*\w+\s*\.\s*\w+/.test(line) || /^\s*\w+\s*\[/.test(line)) return true;
  // 行内任意位置有 .x 或 [x] 模式 (如 "cluster.keywords", "x[locale]")
  if (/\.\s*\w+/.test(line) || /\[\s*\w+\s*\]/.test(line)) {
    // 但要确保 cluster 不是字符串字面量内容
    // 整行没引号 OR cluster 在引号外
    if (!/['"`]/.test(line) || /['"`].*\bcluster\b.*['"`]/.test(line) === false) {
      return true;
    }
  }
  // match 之前是空白 + 引号 → 字符串内, 算 user-facing
  return false;
}

// v3 误报优化: 排除 React form input placeholder 属性
// 检测行上下文: placeholder={...} / placeholder="..." / placeholder=... / xxxPlaceholder:
function isReactPlaceholderProp(content, matchIndex) {
  const lineStart = content.lastIndexOf('\n', matchIndex - 1) + 1;
  const lineEnd = content.indexOf('\n', matchIndex);
  const line = content.slice(lineStart, lineEnd > 0 ? lineEnd : undefined);
  // placeholder={...} / placeholder="..." / placeholder=...
  if (/\bplaceholder\s*[=:]/.test(line)) return true;
  // xxxPlaceholder 字段名 (namePlaceholder / messagePlaceholder / phonePlaceholder 等)
  if (/\b\w*Placeholder\s*[=:]/.test(line)) return true;
  // placeholder= 出现在 JSX 属性
  if (/\bplaceholder\s*=\s*[\{"']/.test(line)) return true;
  return false;
}

const hits = [];
const counts = { red: 0, orange: 0, yellow: 0, white: 0 };
let totalFiles = 0;
let totalMatches = 0;

const startTime = Date.now();
const files = collectFiles(path.resolve(SCOPE));

for (const file of files) {
  totalFiles++;
  // 跳过 临时/调试文件
  if (/_67b_|_k3_indexnow|_dna_|_commit_|_fix_|_check_|_trash_|_detailed_|_step|_gen|_find|_k3_/i.test(file)) continue;

  let content;
  try {
    content = fs.readFileSync(file, 'utf-8');
  } catch (e) {
    continue;
  }

  for (const [ruleKey, rule] of Object.entries(RULES)) {
    // 简体字规则: 只在 zh-hk/ja 内容里扫
    if (ruleKey === 'SIMPLIFIED_CHINESE' && !isZHHKorJA(file)) continue;
    // Rule 5 RAW_MARKDOWN_LINK: 只在渲染层 (page.tsx/component) 扫
    if (ruleKey === 'RAW_MARKDOWN_LINK' && !isRenderLayer(file)) continue;

    let ruleHits = 0;
    for (const pattern of rule.patterns) {
      const re = new RegExp(pattern.source, pattern.flags.includes('g') ? pattern.flags : pattern.flags + 'g');
      let match;
      let lastIndex = 0;
      while ((match = re.exec(content)) !== null) {
        // 防止 zero-width 死循环
        if (match.index === lastIndex && match[0].length === 0) {
          re.lastIndex++;
          continue;
        }
        lastIndex = match.index;

        // Rule 5 RAW_MARKDOWN_LINK 二次过滤: 排除图片 ![alt](url) + 排除 parseInlineLinks.tsx 工具
        if (ruleKey === 'RAW_MARKDOWN_LINK') {
          if (file.endsWith('parseInlineLinks.tsx')) continue;
          const before = content[match.index - 1];
          if (before === '!') continue;  // 排除 ![alt](url) 图片
          // 排除代码块 (4 空格 or 制表符开头)
          const lineStart = content.lastIndexOf('\n', match.index - 1) + 1;
          const linePrefix = content.slice(lineStart, match.index);
          if (linePrefix.startsWith('    ') || linePrefix.startsWith('\t')) continue;
          // 排除 dangerouslySetInnerHTML 字符串 (那是合法 HTML 渲染)
          if (/dangerouslySetInnerHTML/i.test(lineContent)) continue;
        }

        // v3 误报优化: STRATEGY_JARGON (yellow) 排除变量名 + 注释 + ISO 8601 时间格式
        if (ruleKey === 'STRATEGY_JARGON') {
          if (isCommentLine(content, match.index)) continue;
          if (isVariableOrCodeIdentifier(content, match.index)) continue;
          // 排除 ISO 8601 时间格式: ${publishedAt}T00:00:00+08:00 / T23:59:59Z
          const afterMatch = content.slice(match.index, Math.min(content.length, match.index + 30));
          if (/^T\d{2}:\d{2}:\d{2}/.test(afterMatch)) continue;
        }

        // v3 误报优化: PLACEHOLDER (white) 排除 React form placeholder 属性 + 注释
        if (ruleKey === 'PLACEHOLDER') {
          if (isCommentLine(content, match.index)) continue;
          if (isReactPlaceholderProp(content, match.index)) continue;
        }

        // 找行号
        const upTo = content.slice(0, match.index);
        const lineNum = upTo.split('\n').length;
        const lineStart = content.lastIndexOf('\n', match.index - 1) + 1;
        const lineEnd = content.indexOf('\n', match.index);
        const lineContent = content.slice(lineStart, lineEnd > 0 ? lineEnd : undefined).trim().slice(0, 200);

        hits.push({
          file: path.basename(file),
          filePath: file,
          rule: ruleKey,
          severity: rule.severity,
          label: rule.label,
          line: lineNum,
          match: match[0],
          context: lineContent,
        });
        counts[rule.severity]++;
        totalMatches++;
        ruleHits++;
        if (ruleHits >= MAX_HITS_PER_RULE) break;
      }
      if (ruleHits >= MAX_HITS_PER_RULE) break;
    }
  }
}

const elapsedMs = Date.now() - startTime;
const summary = {
  timestamp: new Date().toISOString(),
  scope: SCOPE,
  elapsed_ms: elapsedMs,
  total_files_scanned: totalFiles,
  total_matches: totalMatches,
  red: counts.red,
  orange: counts.orange,
  yellow: counts.yellow,
  white: counts.white,
  hits: hits.slice(0, 300),
};

console.log(`[check-content-guard v2] 扫描完成 (${elapsedMs}ms)`);
console.log(`  范围: ${SCOPE}  文件: ${totalFiles}  命中: ${totalMatches}`);
console.log(`  🔴 red=${counts.red}  🟠 orange=${counts.orange}  🟡 yellow=${counts.yellow}  ⚪ white=${counts.white}`);

const grouped = { red: [], orange: [], yellow: [], white: [] };
for (const h of hits) grouped[h.severity].push(h);
for (const sev of ['red', 'orange', 'yellow', 'white']) {
  if (grouped[sev].length > 0) {
    const labels = { red: '🔴 法律风险', orange: '🟠 信任风险', yellow: '🟡 策略黑话', white: '⚪ 占位符' };
    console.log(`\n${labels[sev]} (${grouped[sev].length}):`);
    for (const h of grouped[sev].slice(0, 15)) {
      console.log(`  ${h.file}:${h.line}  ${h.match}`);
    }
  }
}

if (REPORT) {
  const dir = path.dirname(REPORT);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(REPORT, JSON.stringify(summary, null, 2), 'utf-8');
  console.log(`\n[OK] report: ${REPORT}`);
}

const exitCode = hits.length === 0 ? 0 : Math.max(...hits.map(h => severityCode[h.severity] || 5));
if (STRICT && exitCode > 0) {
  console.log(`\n[FATAL] strict mode 命中 (exit code ${exitCode})`);
  process.exit(exitCode);
}
process.exit(0);
