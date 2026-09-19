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
  // ===== 2026-09-19 Step B 补充 (K3 裁决 2) =====
  // 实测: src/data 最大的两个档长期缺席名单, 且内容均为客户可见长文 HTML:
  //   products-content.ts 1,195 KB (product/[slug] 的长描述字段 longDescription*) — 实测含 4 处活跃命中
  //   sku-seo-data.ts     1,138 KB (SKU 详情页 SEO 正文) — 全档双引号, 旧提取层整体看空
  /src[\/\\]data[\/\\]products-content\.ts$/,
  /src[\/\\]data[\/\\]sku-seo-data\.ts$/,
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

  // ============ 2026-09-17 扩展 (K3 报告: school-exercise-book 仍有 GSC 内容, 门童未拦) ============
  // 根因: 原模式是"枚举措辞"(pos X / X imps / 攻艱…), 而 GSC 后台数据的表达变体无穷
  //       (0 click / 3mo / 子簇 / Pillar #3 12 鐵律 / K3 8/19 拍板 / 校準錨點 / +.6 …) → 必然漏。
  // 改为 **语义类别 + 内部代号锚点** 覆盖:
  // --- 点击/展示指标 ---
  /(?:^|[^a-zA-Z0-9])\d+\s*clicks?\b/gi,                          // 0 click / 7 + 0 click / 1 click 真实数据
  /(?:^|[^a-zA-Z0-9])CTR\s*\d/gi,                                  // CTR 12.5%
  // --- 内部代号 (K3 / 008 / 案例庫) ---
  /(?<!K1-)(?<![A-Za-z0-9])K3(?![0-9])/g,                            // K3 8/19 拍板 (排除 K1-K3 幼儿园年级)
  /008\s*(?:案例庫|案例库|counter|表)/g,                              // 008 案例庫 (内部表编号)
  // --- 内容架构术语 (Pillar / 簇) ---
  /(?<![A-Za-z-])Pillar\s*#?\s*\d/gi,                              // Pillar #3 / Pillar 2 (内部内容分级)
  /[主子]?簇/g,                                                       // 主簇 / 子簇 / 海外大單簇 (GSC 内容簇)
  /\d+\s*(?:條|条)?內鏈\s*\d*\s*跨/g,                              // 11 條內鏈 5 跨
  // --- 内部定价/校准口径 ---
  /校準(?:報價|报价|錨點|锚点|來源|来源|錶|表)/g,                        // 校準報價 / 校準錨點 / 校準來源 (内部定價方法)
  /(?:待校準|待校准|已校準|已校准)/g,                                  // 008 案例庫待校準
  /真實校準|真实校准/g,                                                // 真實校準 (不含色彩校準)
  // --- GSC 时间窗 + 位置变化 ---
  /(?:^|[^a-zA-Z0-9])\d+\s*mo\b(?!\s*[-–])/gi,                    // 3mo / 12 mo 数据窗 (排除 "9-12 mo" 季节)
  /(?:^|[^a-zA-Z0-9])[+\-]\.\d+\b/g,                              // +.6 位置变化
  // --- 内部表/拍板号 (通用编号模式) ---
  /(?<![A-Za-z])ED-\d{3}/g,                                          // ED-001~018 内部 SKU 分组编号

  // ============ 2026-09-19 Step B 扩展 (K3 裁决 2) ============
  // 根因: 原模式漏两类 —— ①日文片假名变体 ②"纯词"(不邻接数字)的内部口径词。
  //   实测 (三语真实尾巴, 见 .hermes/_probe-pb/stepB-blindspot-result.json):
  //     'GSC データ' → 0 正则命中; 'imps 數據/数据/データ' → 0; 'pos 數據/数据/データ' → 0;
  //     '數據誠信紅線/数据诚信红线/データ诚信基準' → 0; '校準/校准/校正 + 日期' → 0; '拍板日' → 0; '§0.23' → 0
  //   ⇒ 只删数字必留空壳 (§0.23.1 半截残留教训的直接成因)。
  /GSC\s*データ/g,                                                    // GSC データ (日文片假名, 原模式只覆盖 数据/數據)
  /gsc[\s-]*(?:data|데이터)/gi,                                       // gsc data 变体
  /(?:^|[^a-zA-Z0-9])(?:imps?|impr(?:essions?)?)\s*(?:數據|数据|データ)/gi,   // imps 數據 (纯词, 无数字)
  /(?:^|[^a-zA-Z0-9])pos\s*(?:數據|数据|データ)/gi,                    // pos 數據 (纯词, 无数字)
  // 2026-09-19 v2 收紧: 「數據/数据/データ + 基準」会误伤客户语境的「データ基準 (数据基准)」
  //   ⇒ 必须显式含「誠信/诚信」才算内部口径词 (实测误报来源: ja.json「C&SD 2026 データ基準」)
  /(?:數據|数据|データ)\s*(?:誠信|诚信)\s*(?:紅線|红线|基準|基准)/g,      // 數據誠信紅線 / 数据诚信红线 / データ诚信基準
  // ⚠️ 只收「内部定价口径」完整搭配:
  //   · 不收「校準/校正 (+後)」——印刷行业动作词 (「無料データ校正後、3–5営業日で印刷」),
  //     实测误伤 3 处; 收完整搭配即可无漏 (实测的 4 处真泄漏全为完整搭配)
  /(?:校準|校准|校正)\s*(?:報價|报价|來源|来源|錨點|锚点)/g,              // 校準報價 / 校準來源 / 校準錨點
  /(?:真實|真实)\s*(?:校準|校准)/g,                                    // 真實校準 (内部定价口径)
  /拍板日|拍板/g,                                                     // 内部决策日
  /§\s*0\.\d+/g,                                                      // §0.23 类内部规则编号
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

  // ============ 2026-09-17 扩展豁免 (避免误伤行业标准术语) ============
  /色彩校準|色彩校准|color\s+calibration|colour\s+calibration/gi,     // 印刷色彩管理 (行业标准)
  /ICC\s+color\s+management|ISO\s*12647/gi,                          // ICC / ISO 12647 (印刷标准)
  /Pillar\s*Wrap/gi,                                                  // Pillar Wrap (地铁广告柱包裹形式, 非内容分级)
  /pillar-guide/gi,                                                    // URL slug 里的 pillar-guide (技术标识, 改动会 404)
  /K1-K3/gi,                                                           // K1-K3 (幼儿园年级)
  /\d+\s*[-–]\s*\d+\s*mo\b/gi,                                     // 9-12 mo (月份范围, 季节描述)
  /\b[23]D\b/g,                                                       // 2D / 3D (技术术语)
  /visually\s+striking/gi,
  /(?<![A-Za-z])[A-Z]{2,3}-\d{3}/g,   // ED-002 / BC-002 / PKG-007 / ST-006 = 产品目录编号 (客户可理解, 非内部泄漏)                                             // 英文形容词 (非 GSC striking)

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
function checkValue(value, file, field, slug, lineNo, rawText, valueOffset) {
  const hits = [];
  if (!value || typeof value !== 'string') return hits;
  for (const re of GSC_LEAK_PATTERNS) {
    re.lastIndex = 0;
    let m;
    while ((m = re.exec(value)) !== null) {
      // 排除合法客户语境 (token 本身 或 命中位置上下文)
      if (isLegitCustomerToken(m[0]) || isLegitContext(value, m.index)) continue;
      // 行号优先指向「命中词本身」所在行 (大段正文的值起点行参考价值低)
      let line = lineNo || 0;
      if (rawText && valueOffset != null) {
        const at = rawText.indexOf(value.slice(m.index, m.index + 40), valueOffset);
        if (at >= 0) line = rawText.slice(0, at).split('\n').length;
      }
      // 排除跨 token 误伤: pos 2.3 但整段含 top-3 picks 等 (由 isLegitCustomerToken 处理整词)
      hits.push({
        file,
        line,
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

/** 2026-09-19 Step B: 为客户可见值定位其在**源文件中的起点行号** + 起点偏移。
 *  原实现 JSON 路径恒报 line:0 ⇒ 报告无法定位, 违规清单不可执行 (JSON 恰是 blog-data 最常用路径)。
 *  手法: 用「该值的一个唯一片段」在原文中反查; 片段从长到短退让, 命中即换算行号。
 */
function locate(rawText, value) {
  if (!rawText || !value) return { line: 0, offset: -1 };
  const probes = [];
  for (const len of [160, 80, 40, 20]) {
    const mid = Math.max(0, Math.floor(value.length / 2) - Math.floor(len / 2));
    probes.push(value.slice(mid, mid + len));
  }
  probes.push(value.slice(0, 40), value.slice(-40));
  for (const p of probes) {
    if (!p || p.length < 12) continue;
    const i = rawText.indexOf(p);
    if (i >= 0) return { line: rawText.slice(0, i).split('\n').length, offset: i };
  }
  return { line: 0, offset: -1 };
}

// JSON 文件: blog-data/*.json — 遍历所有篇目 title/description/excerpt/keywords/content
function scanJson(file) {
  const hits = [];
  let rawText, obj;
  try {
    rawText = fs.readFileSync(file, 'utf-8');
    obj = JSON.parse(rawText);
  } catch (e) { return hits; }
  const rel = file.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
  for (const [slug, entry] of Object.entries(obj)) {
    if (!entry || typeof entry !== 'object') continue;
    for (const field of ['title', 'description', 'excerpt', 'keywords', 'content']) {
      const v = entry[field];
      if (typeof v === 'string') {
        const loc = locate(rawText, v);
        hits.push(...checkValue(v, rel, field, slug, loc.line, rawText, loc.offset));
      } else if (v && typeof v === 'object') {
        // content 可能是 Record<locale, string>
        for (const [loc2, s] of Object.entries(v)) {
          if (typeof s === 'string') {
            const lo = locate(rawText, s);
            hits.push(...checkValue(s, rel, `${field}.${loc2}`, slug, lo.line, rawText, lo.offset));
          }
        }
      }
    }
  }
  return hits;
}

/* ============================================================================
 * 2026-09-19 Step B 改造 (K3 裁决 2): 提取层由「朴素正则」改为「解析式」
 *
 * 原实现的三条静默失效 (实测证据见 .hermes/_probe-pb/stepB-blindspot-result.json):
 *   ① 字段盲区: 只扫 title|description|excerpt|keywords —— `content` (客户可读正文大头)
 *      完全不在扫描面 ⇒ 命中**从未生成**, 报告却显示「✅ 0 命中」。
 *   ② 引号截断: /['"]([^'"]{20,})['"]/ 以引号为边界; 客户 HTML 正文天然含引号
 *      (class='text-gray-500' / class="..."), 捕获在第一个内层引号处截断并被 {20,} 丢弃 ⇒ 0 命中。
 *   ③ 双引号看空: /(['"])([^'"]+)\1/ 对 "value" 匹配成 `""` (值=空) ⇒ 双引号写法整体看空。
 *      (实测: blog-posts.ts 30 条 / sku-seo-data.ts 170 条双引号值长期未被扫)
 *
 * 新实现: 字符级扫描字符串字面量 ('…' / "…" / `…` 模板串), 先取整值, 再判字段所有权。
 *   · 字段所有权: 取该值的**键**(前一个 `key:` ) 与**外层字段**(花括号栈内最近的长文本字段);
 *     空键 (如 { 'en': "…" } 只有 locale 键) ⇒ 归外层字段。无法判定 ⇒ 'content' (**保守照扫**)。
 *   · 注释豁免按**值起点所在行**判定 (注释行里的引用不算泄漏)。
 * ============================================================================ */

/** 客户可见字段 (键名) */
const VISIBLE_FIELDS = new Set([
  'content', 'body', 'longDescription', 'longDescriptionEn', 'longDescriptionJa',
  'description', 'excerpt', 'title', 'keywords', 'paragraphs', 'paragraph',
  'answer', 'question', 'text', 'intro', 'summary', 'seoTitle', 'metaTitle',
  'aiSearchSummary', 'buyingGuide', 'faq', 'points',
]);
/** 外层容器字段 (其内层 locale/子键值归它) */
const CONTAINER_FIELDS = new Set([...VISIBLE_FIELDS, 'content', 'seo', 'faqs']);
/** 非客户可见的键 (值属技术/标识, 跳过) */
const NON_VISIBLE_KEYS = new Set(['slug', 'href', 'url', 'src', 'id', 'sku_code', 'sku', 'category_slug', 'className', 'image', 'icon']);

/** 跳过空白与注释, 返回下一个有效 index */
function skipWsAndComments(s, i) {
  for (;;) {
    while (i < s.length && /\s/.test(s[i])) i++;
    if (s[i] === '/' && s[i + 1] === '/') { while (i < s.length && s[i] !== '\n') i++; continue; }
    if (s[i] === '/' && s[i + 1] === '*') { const e = s.indexOf('*/', i + 2); i = e < 0 ? s.length : e + 2; continue; }
    return i;
  }
}

/** 解析 index 处开始的字符串字面量, 返回 { value, end } (含引号内外), 失败返回 null */
function parseStringAt(s, i) {
  const q = s[i];
  if (q !== "'" && q !== '"' && q !== '`') return null;
  let j = i + 1, out = '';
  while (j < s.length) {
    const c = s[j];
    if (c === '\\') { out += s[j + 1] ?? ''; j += 2; continue; }
    if (c === q) return { value: out, start: i, end: j + 1 };
    out += c; j++;
  }
  return { value: out, start: i, end: s.length };  // 未闭合 (容错)
}

/** 找到 index 处字符串的「键」: 向左看是否形如 key: <str> ; 返回 {key, objField} */
function ownerOf(s, strStart, objStack) {
  let i = strStart - 1;
  while (i >= 0 && /\s/.test(s[i])) i--;
  // 期待 ':'
  let key = null;
  if (s[i] === ':') {
    let j = i - 1;
    while (j >= 0 && /\s/.test(s[j])) j--;
    if (s[j] === "'" || s[j] === '"') {                    // 'key': "..."
      const q = s[j]; let k = j - 1;
      while (k >= 0 && s[k] !== q) k--;
      key = s.slice(k + 1, j);
    } else {                                                // key: "..."
      let k = j;
      while (k >= 0 && /[\w$]/.test(s[k])) k--;
      key = s.slice(k + 1, j + 1);
    }
  }
  const objField = objStack.length ? objStack[objStack.length - 1] : null;
  return { key: key || null, objField };
}

/** 取最近的外层字段名: 向左找 `<ident> : {` */
function nearestContainerField(s, i) {
  let j = i - 1;
  while (j >= 0 && /\s/.test(s[j])) j--;
  if (s[j] !== '{') return null;
  let k = j - 1;
  while (k >= 0 && /\s/.test(s[k])) k--;
  if (s[k] !== ':') return null;
  let m2 = k - 1;
  while (m2 >= 0 && /\s/.test(s[m2])) m2--;
  if (s[m2] === "'" || s[m2] === '"') {
    const q = s[m2]; let p = m2 - 1;
    while (p >= 0 && s[p] !== q) p--;
    return s.slice(p + 1, m2);
  }
  let p = m2;
  while (p >= 0 && /[\w$]/.test(s[p])) p--;
  const id = s.slice(p + 1, m2 + 1);
  return id || null;
}

/** 解析式提取客户可见字符串 (取代原三条朴素正则) */
function extractVisibleStrings(content) {
  const out = [];
  const lineOf = (idx) => content.slice(0, idx).split('\n').length;
  const lines = content.split('\n');
  const objStack = [];   // 花括号栈: 每层记 { field }
  let i = 0;
  while (i < content.length) {
    const c = content[i];
    if (c === '/' && (content[i + 1] === '/' || content[i + 1] === '*')) { i = skipWsAndComments(content, i); continue; }
    if (c === '{') {
      const f = nearestContainerField(content, i);
      objStack.push(f || null);
      i++; continue;
    }
    if (c === '}') { objStack.pop(); i++; continue; }
    if (c === '[') { i++; continue; }
    if (c === ']') { i++; continue; }
    if (c === "'" || c === '"' || c === '`') {
      const st = parseStringAt(content, i);
      if (!st) { i++; continue; }
      const { key, objField } = ownerOf(content, st.start, objStack);
      let field = key && VISIBLE_FIELDS.has(key) ? key
        : (key && NON_VISIBLE_KEYS.has(key)) ? null
          : (objField && CONTAINER_FIELDS.has(objField)) ? objField
            : (key === null || /^(zh-hk|en|ja)$/.test(key) || (key && /^[a-z]{2}(-[A-Za-z]{2,4})?$/.test(key))) ? (objField || 'content')
              : null;
      // HTML 正文即便挂在技术键上也必须扫 (保守: 含尖括号标签即视为客户可见)
      if (!field && /<\/?[a-z][\s\S]{0,40}>/i.test(st.value)) field = 'content';
      if (field) {
        const lineNo = lineOf(st.start);
        const lineText = lines[lineNo - 1] || '';
        const isCommentLine = /^\s*(\/\/|\*|\/\*)/.test(lineText);
        if (!isCommentLine) out.push({ value: st.value, field, line: lineNo, start: st.start });
      }
      i = st.end;
      continue;
    }
    i++;
  }
  return out;
}

// TS 文件: blog-posts.ts / buying-guides.ts / pillar-content.ts / products.ts / products-content.ts …
function scanTs(file) {
  const hits = [];
  let content;
  try {
    content = fs.readFileSync(file, 'utf-8');
  } catch (e) { return hits; }
  const rel = file.replace(process.cwd() + path.sep, '').replace(/\\/g, '/');
  const base = path.basename(file);

  const extracted = extractVisibleStrings(content);
  for (const { value, field, line, start } of extracted) {
    hits.push(...checkValue(value, rel, field, `${base}:L${line}`, line, content, start));
  }
  return hits;
}
/* ---------------------------------------------------------------------------
 * 以下为 2026-09-19 前的旧提取实现 (已停用, 保留供对照与回滚).
 * 停用理由: 三条静默失效 (字段盲区 / 引号截断 / 双引号看空), 见上。
 * --------------------------------------------------------------------------- */
function scanTsLegacy(file) {
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
  // 2026-09-19: 解析式提取器可能对同一处命中重复上报 (同一行被多个字段/多条规则走到);
  //   按 (文件, 行, 规则, 命中词) 去重 —— 保留每处真实位置, 去掉噪音。
  const seen = new Set();
  return allHits.filter(h => {
    const k = `${h.file}|${h.line}|${h.ruleId}|${h.match}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

module.exports = { scan, RULES: [{ id: 'GSC_LEAK_CUSTOMER_VISIBLE', severity: 'red' }], GSC_LEAK_PATTERNS };
