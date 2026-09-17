/**
 * scripts/guards/gsc-leak-guard.js (v1.0)
 * 门童 #16 GSC 内部数据泄漏检测 (K3 2026-09-17 拍板, 跨项目 P0 强制级)
 *
 * 背景: K3 拍板「GSC 数据(pos/imps/攻艱/衝首頁/TOP3等后台运营黑话)是后台只有我能看到的数据,
 *       出现在客户阅读的 blog 文章 meta/正文 = 数据污染, 反审门童是干嘛用的, 写进规则」
 *
 * 严重度: 🔴 red 硬拦 (客户可见字段泄漏 GSC 内部数据)
 *
 * 检测对象: 客户可见字段 (src/data/blog-data/*.json 的 title/description/excerpt/keywords/content,
 *           src/data/blog-posts.ts + buying-guides.ts + pillar-content.ts 的 title/excerpt/description/keywords)
 *
 * 不检测: 注释行 (// 开头) — 内部工作记录非客户可见; .hermes/ docs/ GSC数据/ 豁免路径
 *
 * 触发模式 (后台运营黑话, 客户可见即污染):
 *   · GSC pos X / GSC imps X / GSC 引用词 (攻艱/攻坚/衝首頁/冲首页/Top-3 Push/TOP3/突入)
 *   · pos X / X imps 独立出现 (词级证据链泄漏)
 *   · gsc-fresh-*.json 文件名引用
 *   · GSC 簇/锁词/补词 等内部调度词
 */

const fs = require('fs');
const path = require('path');

// 客户可见数据文件 (src/data 下的内容文件)
const CUSTOMER_VISIBLE_FILES = [
  /src[\/\\]data[\/\\]blog-data[\/\\](zh-hk|en|ja)\.json$/,
  /src[\/\\]data[\/\\]blog-posts\.ts$/,
  /src[\/\\]data[\/\\]buying-guides\.ts$/,
  /src[\/\\]data[\/\\]pillar-content\.ts$/,
  /src[\/\\]data[\/\\]products\.ts$/,
  /src[\/\\]data[\/\\]category-seo-content\.ts$/,   // 分类页 SEO 内容 (含 buyingGuide.paragraphs 等客户可见段落)
];

// GSC 后台运营黑话模式 (客户可见即泄漏)
const GSC_LEAK_PATTERNS = [
  // GSC 引用词 + 数据
  /GSC\s+(?:pos|position|imps?|impression|数据|數據)/gi,          // GSC pos 21.7 / GSC imps
  /GSC\s+school\s+exercise\s+book/g,                                // GSC school exercise book (内部选题)
  /gsc-fresh-\d{4}-\d{2}-\d{2}\.json/gi,                            // gsc-fresh 文件名
  /GSC\s*(?:簇|锁词|鎖詞|补词|補詞|攻艱|攻堅|冲首頁|衝首頁|实证|實證)/g,  // GSC 内部调度词
  // 独立 pos/imps 数据 (词级证据链)
  /(?:^|[^a-zA-Z0-9])pos\s*\d+(?:\.\d+)?/g,                        // pos 2.3 / pos 21.7-23.8
  /(?:^|[^a-zA-Z0-9])\d+\s*imps?\b/g,                              // 4 imps / 89 imps
  /(?:^|[^a-zA-Z0-9])imps?\s*\d+/g,                                 // imps 21
  // 运营动作词 (客户不可理解的后台语境)
  /(?:^|[^a-zA-Z0-9])衝首頁/g,                                      // 衝首頁
  /(?:^|[^a-zA-Z0-9])冲首页/g,
  /(?:^|[^a-zA-Z0-9])TOP3/g,                                        // TOP3
  /(?:^|[^a-zA-Z0-9])Top-3\s+Push/g,                                // Top-3 Push
  /(?:^|[^a-zA-Z0-9])突入/g,                                        // 突入
  /(?:^|[^a-zA-Z0-9])攻艱/g,                                        // 攻艱
  /(?:^|[^a-zA-Z0-9])攻堅/g,                                        // 攻堅 (注: "攻堅"在客户语境极罕见, 视为泄漏)
];

// 豁免: 合法客户语境 token (可出现在客户可见内容)
const LEGIT_CUSTOMER_TOKENS = [
  /Impress(?:ion|ions)?(?!s?\s*\d)/gi,   // "Impression" 纯单词 (如艺术/营销语境) — 不跟数字
  /pos(?:ition|e|itive)/gi,               // position/pose/positive 非 pos 数据
  /TOP\s*3/gi,                            // "TOP 3" 带空格 (通用排行)
  /top-3\s+(?:pick|list|choice|option|sticker|paper)/gi,  // top-3 + 名词 (客户排行语境)
  /\$\s*[\d.,]+(?:\s*-\s*[\d.,]+)?\s*\/\s*imp\b/gi,   // US$0.10-0.20/imp 每印象成本 (客户营销语境, 非 GSC imps)
  /HK\$\s*[\d.,]+(?:\s*-\s*[\d.,]+)?\s*\/\s*imp\b/gi,
  /¥\s*[\d.,]+(?:\s*-\s*[\d.,]+)?\s*\/\s*imp\b/gi,
  /\d{1,3}(?:,\d{3})+[\d-]*\s*imp\b/gi,               // 8,000-12,000 imp 发放量 (营销统计, 非 GSC)
  /cost-per-impression/gi,                            // cost-per-impression 营销指标
];

function isLegitCustomerToken(text) {
  return LEGIT_CUSTOMER_TOKENS.some(re => { re.lastIndex = 0; return re.test(text); });
}

// 检查命中位置附近的上下文是否属合法客户语境 (如 US$0.10-0.20/imp 价格)
function isLegitContext(value, matchIndex) {
  const ctx = value.slice(Math.max(0, matchIndex - 40), matchIndex + 40);
  return LEGIT_CUSTOMER_TOKENS.some(re => { re.lastIndex = 0; return re.test(ctx); });
}

// 检查单个字符串值是否有 GSC 泄漏
function checkValue(value, file, field, slug) {
  const hits = [];
  if (!value || typeof value !== 'string') return hits;
  for (const re of GSC_LEAK_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(value)) !== null) {
      // 排除合法客户语境 (token 本身 或 命中位置上下文)
      if (isLegitCustomerToken(m[0]) || isLegitContext(value, m.index)) continue;
      // 排除跨 token 误伤: pos 2.3 但整段含 top-3 picks 等 (由 isLegitCustomerToken 处理整词)
      hits.push({
        file,
        line: 0,
        match: m[0].slice(0, 60),
        severity: 'red',
        ruleId: 'GSC_LEAK_CUSTOMER_VISIBLE',
        ruleName: '客户可见字段泄漏 GSC 后台数据 (K3 2026-09-17 拍板: GSC pos/imps/攻艱/衝首頁/TOP3 等只进后台文档, 禁入客户内容)',
        fix: `删除 [${field}@${slug}] 中的 GSC 内部数据 (${m[0]}), 替换为面向客户的描述性措辞`,
      });
      break; // 每条规则每字段报 1 hit 即可
    }
  }
  return hits;
}

// JSON 文件: blog-data/*.json — 遍历所有篇目 title/description/excerpt/keywords/content
function scanJson(file) {
  const hits = [];
  let obj;
  try {
    obj = JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (e) { return hits; }
  const rel = file.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
  for (const [slug, entry] of Object.entries(obj)) {
    if (!entry || typeof entry !== 'object') continue;
    for (const field of ['title', 'description', 'excerpt', 'keywords', 'content']) {
      const v = entry[field];
      if (typeof v === 'string') {
        hits.push(...checkValue(v, rel, field, slug));
      } else if (v && typeof v === 'object') {
        // content 可能是 Record<locale, string>
        for (const [loc, s] of Object.entries(v)) {
          if (typeof s === 'string') hits.push(...checkValue(s, rel, `${field}.${loc}`, slug));
        }
      }
    }
  }
  return hits;
}

// TS 文件: blog-posts.ts / buying-guides.ts / pillar-content.ts / products.ts
// 提取客户可见字段值: 'zh-hk': '...' / title: { ... } / excerpt: { ... }
function scanTs(file) {
  const hits = [];
  let content;
  try {
    content = fs.readFileSync(file, 'utf-8');
  } catch (e) { return hits; }
  const rel = file.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
  const lines = content.split('\n');

  // 1. 单行字段值: 形如  'zh-hk': '...GSC pos...', 或  title: '...',
  const singleLineRe = /(?:^|\n)\s*(?:title|description|excerpt|keywords)\s*[:=]\s*['"]([^'"]{20,})['"],?/g;
  let m;
  while ((m = singleLineRe.exec(content)) !== null) {
    const lineNo = content.slice(0, m.index).split('\n').length;
    const lineText = lines[lineNo - 1] || '';
    if (lineText.trim().startsWith('//')) continue;  // 注释行跳过
    hits.push(...checkValue(m[1], rel, 'field', `${path.basename(file)}:L${lineNo}`));
  }

  // 2. 多行对象: title: { 'zh-hk': '...', en: '...' } / excerpt: { ... }
  const objFieldRe = /\b(title|excerpt|description|keywords)\s*:\s*\{/g;
  while ((m = objFieldRe.exec(content)) !== null) {
    const field = m[1];
    const start = m.index + m[0].length;
    // 找到对象结束 (简单括号配对)
    let depth = 1, i = start, end = -1;
    while (i < content.length && depth > 0) {
      if (content[i] === '{') depth++;
      else if (content[i] === '}') depth--;
      if (depth === 0) { end = i; break; }
      i++;
    }
    if (end < 0) continue;
    const block = content.slice(start, end);
    // 逐 locale 行提取
    const localeRe = /['"]?(zh-hk|en|ja)['"]?\s*:\s*['"]([^'"]+)['"]/g;
    let lm;
    while ((lm = localeRe.exec(block)) !== null) {
      const absPos = start + lm.index;
      const lineNo = content.slice(0, absPos).split('\n').length;
      const lineText = lines[lineNo - 1] || '';
      if (lineText.trim().startsWith('//')) continue;
      hits.push(...checkValue(lm[2], rel, `${field}.${lm[1]}`, `${path.basename(file)}:L${lineNo}`));
    }
  }

  // 3. 通用段落数组: 形如 paragraphs: [ '...', '...' ] / points: [...] — 逐字符串字面量扫描
  const arrayStrRe = /:\s*\[\s*\n([\s\S]{0,20000}?)\n\s*\]/g;
  while ((m = arrayStrRe.exec(content)) !== null) {
    const block = m[1];
    const strRe = /^\s*['"]([^'"]{20,})['"],?\s*$/gm;
    let sm;
    while ((sm = strRe.exec(block)) !== null) {
      const lineNo = content.slice(0, m.index + sm.index).split('\n').length;
      const lineText = lines[lineNo - 1] || '';
      if (lineText.trim().startsWith('//')) continue;
      hits.push(...checkValue(sm[1], rel, 'content', `${path.basename(file)}:L${lineNo}`));
    }
  }
  return hits;
}

async function scan(files) {
  const allHits = [];
  for (const file of files) {
    const rel = file.replace(/\\/g, '/');
    const isCustomerVisible = CUSTOMER_VISIBLE_FILES.some(re => re.test(rel));
    if (!isCustomerVisible) continue;
    const hits = rel.endsWith('.json') ? scanJson(file) : scanTs(file);
    allHits.push(...hits);
  }
  return allHits;
}

module.exports = { scan, RULES: [{ id: 'GSC_LEAK_CUSTOMER_VISIBLE', severity: 'red' }], GSC_LEAK_PATTERNS };
