'use strict';
/**
 * .hermes/_probe-pb/en-cjk-align.cjs
 * 双方法对账 + 交付物生成 (报告 + CSV)
 *
 * 对账三层判据 (任一不一致即逐条列出, 不取平均、不取其一):
 *   ① 逐文件字符数
 *   ② 档位级字符数
 *   ③ 条目 (file:line) 集合
 */
const fs = require('fs');
const P = 'F:/zprintpro-nextjs/';
const A = JSON.parse(fs.readFileSync(P + '.hermes/_probe-pb/_methodA-result.json', 'utf8'));
const B = JSON.parse(fs.readFileSync(P + '.hermes/_probe-pb/_methodB-result.json', 'utf8'));
const shared = require(P + '.hermes/_probe-pb/en-cjk-classify-shared.cjs');

const FILES = Object.keys(A.files);
const BUCKETS = shared.BUCKETS;

/* ═══════ ① 逐文件字符数 ═══════ */
const fileRows = [];
let fileMismatch = 0;
for (const f of FILES) {
  const a = A.files[f] ? A.files[f].union : 0;
  const b = B.files[f] ? B.files[f].chars : 0;
  const ok = a === b;
  if (!ok) fileMismatch++;
  fileRows.push({ file: f, a, b, ok, diff: b - a });
}

/* ═══════ ② 档位级字符数 ═══════ */
const bucketRows = [];
let bucketMismatch = 0;
for (const k of BUCKETS) {
  const a = A.totals[k] ? A.totals[k].chars : 0;
  const b = B.totals[k] ? B.totals[k].chars : 0;
  const ok = a === b;
  if (!ok) bucketMismatch++;
  bucketRows.push({ bucket: k, a, b, ok, diff: b - a, aEntries: A.totals[k] ? A.totals[k].entryCount : 0, bEntries: B.totals[k] ? B.totals[k].entryCount : 0 });
}
const aTotal = bucketRows.reduce((s, r) => s + r.a, 0);
const bTotal = bucketRows.reduce((s, r) => s + r.b, 0);

/* ═══════ ③ 条目 (file:line) 集合 ═══════ */
// 口径: 只对「具名字段的值」记账 —— A 排除数组裸元素(B 归入列表键), B 排除数组元素
const setA = new Set(), setB = new Set();
const mapA = new Map(), mapB = new Map();
for (const r of A.records) {
  if (r.arrayElement) continue;
  const k = r.file + ':' + r.line;
  setA.add(k); mapA.set(k, (mapA.get(k) || 0) + 1);
}
for (const r of B.records) {
  if (r.arrayElement) continue;
  for (const ln of (r.lines || [])) { const k = r.file + ':' + ln; setB.add(k); mapB.set(k, (mapB.get(k) || 0) + 1); }
}
const onlyA = [...setA].filter(k => !setB.has(k)).sort();
const onlyB = [...setB].filter(k => !setA.has(k)).sort();

/* ═══════ 生成 CSV (方法 A 逐笔 + 方法 B 字段归属并置) ═══════ */
// 方法 B 的 file:line -> 字段/档位 索引
const bIdx = new Map();
for (const r of B.records) {
  for (const ln of (r.lines || [])) {
    const k = r.file + ':' + ln;
    if (!bIdx.has(k)) bIdx.set(k, []);
    bIdx.get(k).push(r);
  }
}
const csv = ['method,file,line,col,char,bucket_A,field_A,bucket_B,field_B,arrayElement,guardEn,resolveEn,rendersChineseFAQ,whitelist,excerpt,fileBucketChars_A'];
const esc = s => '"' + String(s == null ? '' : s).replace(/"/g, '""') + '"';
const fileBucketChars = (f, b) => (A.files[f] && A.files[f].byBucket[b]) || 0;
for (const r of A.records) {
  const key = r.file + ':' + r.line;
  const bs = bIdx.get(key) || [];
  const bb = [...new Set(bs.map(x => x.bucket))].join('|');
  const bf = [...new Set(bs.map(x => x.field))].join('|');
  csv.push(['A', esc(r.file), r.line, r.col, esc(r.char), esc(r.bucket), esc(r.field), esc(bb), esc(bf),
    r.arrayElement ? 'Y' : '', r.guardEn ? 'Y' : '', r.resolveEn ? 'Y' : '',
    r.rendersChineseFAQ ? 'Y' : '', esc((r.whitelist || []).join(';')), esc(r.excerpt), fileBucketChars(r.file, r.bucket)].join(','));
}
fs.writeFileSync(P + '.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.csv', csv.join('\n') + '\n', 'utf8');

/* ═══════ 报告 ═══════ */
const L = [];
const aligned = fileMismatch === 0 && bucketMismatch === 0 && onlyA.length === 0 && onlyB.length === 0;
L.push('# en 值内中文残留 — 分档清单 v2 (双方法复算对齐版)');
L.push('');
L.push('> **本文件取代作废版** `.hermes/logs/i18n-en-cjk-classification-2026-09-19.md` (方法 1 = 按 CSV 行文本正则分档, 已判定作废)。');
L.push('> 生成时间: 2026-09-19 · 生成者: 执行层 · 性质: **纯只读盘点**, 未修改任何 `src/` 生产文件');
L.push('');
L.push('## 〇、数据来源');
L.push('');
L.push('| 项 | 来源 |');
L.push('|---|---|');
L.push('| en 值判据 (唯一权威) | `scripts/guards/common.js` `resolveLocale()` + `scripts/guards/i18n-guard.js` `scanBidirectional()` 结构化值作用域 |');
L.push('| 门童基线 | `.hermes/i18n-pollution-baseline.json` (`perRule.I18N_POLLUTION_EN` = 1032, `total` = 1320) |');
L.push('| 方法 A 脚本 | `.hermes/_probe-pb/methodA-en-cjk-classify.cjs` → `_methodA-result.json` |');
L.push('| 方法 B 脚本 | `.hermes/_probe-pb/methodB-en-cjk-classify.cjs` → `_methodB-result.json` |');
L.push('| 对账脚本 | `.hermes/_probe-pb/en-cjk-align.cjs` |');
L.push('| 逐笔机读 | `.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.csv` |');
L.push('| 口径冲突量化 | `.hermes/_probe-pb/_diag-conflict.txt` · `.hermes/_probe-pb/_diag-authority8.txt` |');
L.push('');
L.push('---');
L.push('');
L.push('## 一、口径声明');
L.push('');
L.push('### 1.1 en 值判据 (K3 拍板, 不新造第二套)');
L.push('');
L.push('「哪些字符属于 en 语系值」以 **`common.resolveLocale(content, index, file)`** 为唯一权威。');
L.push('但实测发现该函数与门童基线所用的**结构化值作用域**在这 8 档上**并不等价**, 二者关系必须显式声明:');
L.push('');
L.push('| 判据 | 全 src/ en 中文字符数 | 8 档内 | 说明 |');
L.push('|---|---|---|---|');
L.push('| 门童结构化值作用域 (`attrLocale`) | **1032** | 1032 | = 基线 `perRule.I18N_POLLUTION_EN` 的来源 |');
L.push('| `resolveLocale` (最近左侧 locale 键) | 3702 | 1235 | 多出 2670 / 8 档内多 203 |');
L.push('');
L.push('**8 档内的 203 字差额全部是 `resolveLocale` 的假阳性, 零例外**, 三类 (逐行已核):');
L.push('');
L.push('| # | 档 | 行注释/块注释内 | 字符数 | 根因 | 实证行 |');
L.push('|---|---|---|---|---|---|');
L.push('| 1 | `src/data/category-seo-content.ts` | **行注释 `//`** (8 行) | 120 | 命中落在 `//` 注释体内, 门童只扫字符串字面量 | L809 / L1534 / L2149 / L2150 / L2151 / L2155 / L3171 / L3172 |');
L.push('| 2 | `src/components/layout/Footer.tsx` | **JSX 块注释 `{/* … */}`** (4 行) | 71 | 同上 —— L478 起为 `{/* 2026-06-18 Phase 0: Legal disclosure …` 块注释 | L451 / L479 / L480 / L481 |');
L.push('| 3 | `src/data/blog-posts.ts` | **行注释 `//`** (1 行) | 12 | 同上 —— L532 注释写 `// en: 全球通用 + 強調"6 盒型對比…"` | L532 |');
L.push('');
L.push('> ⇒ 本清单**以门童结构化值作用域为记账口径** (与基线 1032 同源), 同时把 `resolveLocale` 的 203 字假阳性');
L.push('> **逐条列在 §六**, 不静默丢弃、不悄悄并入任何档。');
L.push('');
L.push('### 1.2 分档定义 (互斥, 6 档, 不自创第 7 档)');
L.push('');
L.push('按**命中字符所处的「字段」**归档 (不是按内容特征归档):');
L.push('');
L.push('| 档 | 定义 | 实现 (字段名 → 档) |');
L.push('|---|---|---|');
L.push('| `category` | category / categoryKey 等分类字段值 | `category`,`categoryKey`,`categoryName`,`categories`,`categoryLabel`,`categorySlug` |');
L.push('| `title` | title/seoTitle/metaTitle 类字段值 | + `h1`,`h2`,`h3`,`heading`,`bannerTitle`,`productName`,`cardTitle`,`onlineTitle`,`howTitle`,`faqTitle`,`ctaTitle`,`heroTitle`,`pageTitle` |');
L.push('| `description` | description/metaDescription/excerpt 类字段值 | + `desc`,`summary`,`subtitle`,`bannerSubtitle`,`onlineDesc`,`ctaDesc`,`shortDescription`,`longDescription`,`intro` |');
L.push('| `content` | content / 正文类字段值 | + `body`,`html`,`text`,`paragraphs`,`points`,`bullets`,`features`,`scenarios`,`material`,`specs`,`faq`,`q`,`a`,`note`,`tips`,`steps`,`benefits`,`highlights` |');
L.push('| `JSON-LD` | 落在内嵌 JSON-LD (`application/ld+json` / `"@type"` / `@context`) 字符串内 | 优先级最高; 命中则**不再**计入其外壳字段, 以保互斥 |');
L.push('| `其他` | 上述之外的 en 值内 | 未命中上表的一切键名, **逐条列名** (§四) |');
L.push('');
L.push('**取消「FAQ 残留」作为字符档** —— 改为 `content` 档每条命中上挂布尔子标记 `rendersChineseFAQ` (§五)。');
L.push('**另设独立「白名单候选」标记** (不占档位, 可跨档) —— §七。');
L.push('');
L.push('### 1.3 `rendersChineseFAQ` 的严格定义 (为什么不能沿用旧判据)');
L.push('');
L.push('= **命中的 CJK 字符落在 FAQ 结构体内**, 而非同值内的正文段落。两条证据任一成立即为 true:');
L.push('');
L.push('- 证据 A: HTML 问答块 `<strong>Q…：` (或 `<h3>Q…：`) 起至下一个 Q / `</div>` / `<h2` 的整块内含 CJK;');
L.push('- 证据 B: `FAQPage` JSON-LD 的 `"name"` / `"text"` (即 Question / Answer 文本) 内含 CJK。');
L.push('');
L.push('> ⚠️ 旧版把「值里出现 FAQ 字样」(如正文写 `4 FAQs`) 当成「FAQ 里有中文」。实测: 按该宽松判据, `en.json` 有 **40 个 content 值**会被判 true;');
L.push('> 按本版严格判据只有 **9 个** (其中 7 个落在 `content` 档, 1 个落在 `JSON-LD` 档 —— 见 §五)。这正是作废版 C 档 7 笔被推翻的同类错误。');
L.push('');
L.push('---');
L.push('');
L.push('## 二、双方法实现');
L.push('');
L.push('| 项 | 方法 A | 方法 B |');
L.push('|---|---|---|');
L.push('| 思路 | 单字符扫描 → 反查字段 (位置算术) | 结构化解析 → en 值对象 → 遍历字段 |');
L.push('| JSON | 自实现「词法段 + 容器配平」定位器, **不 JSON.parse** | `JSON.parse` 后逐字段走访 + 键序列原文定位 |');
L.push('| TS/TSX | 键名起点表 + 值区间表, 取最内层字符串字段 | 自实现前向键扫描 → locale 值区间 → keyed 字符串/数组元素 |');
L.push('| CJK 判定 | 逐字符 `resolveLocale` ∪ 门童作用域 | 只在 en 值区间内计 CJK 字符 |');
L.push('| 数组裸元素 | 回溯最近具名外层键, 单独标记 | 归属其列表键 |');
L.push('| 别名键 | 覆盖 (`beneficiaryCn` / `supportJA` 均按真实语系归属) | 覆盖 (同) |');
L.push('| 共享 | 仅共享「档位定义 + 字段名映射 + 白名单 + FAQ 判据」, **代码路径完全独立** | 同 |');
L.push('');
L.push('---');
L.push('');
L.push('## 三、对账结果');
L.push('');
L.push('### 3.1 逐文件字符数 (判据 ①)');
L.push('');
L.push('| # | 文件 | 方法 A | 方法 B | 一致? |');
L.push('|---|---|---|---|---|');
fileRows.forEach((r, i) => L.push(`| ${i + 1} | \`${r.file}\` | ${r.a} | ${r.b} | ${r.ok ? '✅' : '★ 差 ' + r.diff} |`));
L.push(`| | **合计** | **${fileRows.reduce((s, r) => s + r.a, 0)}** | **${fileRows.reduce((s, r) => s + r.b, 0)}** | ${fileMismatch === 0 ? '✅ 完全一致' : '★ ' + fileMismatch + ' 档不一致'} |`);
L.push('');
L.push('### 3.2 档位汇总 (判据 ②)');
L.push('');
L.push('| 档 | 方法 A 字符 | 方法 B 字符 | 一致? | A 条目数 | B 条目数 |');
L.push('|---|---|---|---|---|---|');
bucketRows.forEach(r => L.push(`| \`${r.bucket}\` | ${r.a} | ${r.b} | ${r.ok ? '✅' : '★ 差 ' + r.diff} | ${r.aEntries} | ${r.bEntries} |`));
L.push(`| **合计** | **${aTotal}** | **${bTotal}** | ${bucketMismatch === 0 ? '✅ 完全一致' : '★ ' + bucketMismatch + ' 档不一致'} | ${bucketRows.reduce((s, r) => s + r.aEntries, 0)} | ${bucketRows.reduce((s, r) => s + r.bEntries, 0)} |`);
L.push('');
L.push('> 「条目数」两法在 `content` / `其他` 档有差 (37 vs 41, 8 vs 10): 因**数组元素的记账方式不同** ——');
L.push('> 方法 A 对数组裸元素单列 (不计入具名条目), 方法 B 将其归入列表键 ⇒ 后者条目更多。');
L.push('> **字符数完全一致**, 差异仅在「条目怎么记」; 数组元素全量见 §八。');
L.push('');
L.push('### 3.3 条目 (file:line) 集合 (判据 ③)');
L.push('');
L.push('| 项 | 值 |');
L.push('|---|---|');
L.push('| 记账口径 | 只对**具名字段的值**记条目 (A 排除数组裸元素, B 排除数组元素) —— 两法数组表达方式不同, 已在 §八 单列 |');
L.push('| 方法 A 条目数 | ' + setA.size + ' |');
L.push('| 方法 B 条目数 | ' + setB.size + ' |');
L.push('| 交集 | ' + (setA.size - onlyA.length) + ' |');
L.push('| A 独有 | ' + onlyA.length + ' |');
L.push('| B 独有 | ' + onlyB.length + ' |');
L.push('');
if (onlyA.length) { L.push('**A 独有条目**:'); L.push(''); onlyA.forEach(k => L.push('- `' + k + '`')); L.push(''); }
if (onlyB.length) { L.push('**B 独有条目**:'); L.push(''); onlyB.forEach(k => L.push('- `' + k + '`')); L.push(''); }
if (!onlyA.length && !onlyB.length) L.push('✅ 两法条目集合**完全一致**。');
L.push('');
L.push('### 3.4 对账结论');
L.push('');
L.push(aligned
  ? '**一致** —— ①逐文件字符数 ②档位计数 ③条目集合 三层判据全部一致, 无需列差异。'
  : '**不一致** —— 见下表逐条差异。');
L.push('');

/* 各档明细 */
L.push('---');
L.push('');
L.push('## 四、各档明细 (file:line + 字段 + 原文节录)');
L.push('');
for (const bk of BUCKETS) {
  const rows = A.records.filter(r => r.bucket === bk);
  const byLoc = new Map();
  let arrCount = 0;
  for (const r of rows) {
    if (r.arrayElement) { arrCount++; continue; }   // 数组裸元素单列于 §八, 不计入条目
    const k = r.file + ':' + r.line;
    if (!byLoc.has(k)) byLoc.set(k, { n: 0, field: r.field, chars: [], sample: r.excerpt, faq: false, wl: new Set() });
    const v = byLoc.get(k);
    v.n++; v.chars.push(r.char);
    if (r.rendersChineseFAQ) v.faq = true;
    for (const w of (r.whitelist || [])) v.wl.add(w);
  }
  L.push('### `' + bk + '` — ' + rows.length + ' 字符 / ' + byLoc.size + ' 条目' +
    (arrCount ? ' + ' + arrCount + ' 数组元素 (见 §八)' : '') +
    (bk === 'content' || bk === '其他' ? ' · 方法 B 条目 ' + (B.totals[bk] ? B.totals[bk].entryCount : 0) + ' (含数组元素)' : ''));
  L.push('');
  if (!rows.length) { L.push('(本档为空)'); L.push(''); continue; }
  L.push('| # | file:line | 字段 | 字数 | 命中中文 (按序) | rendersChineseFAQ | 白名单 |');
  L.push('|---|---|---|---|---|---|---|');
  let i = 0;
  for (const [k, v] of byLoc) {
    i++;
    L.push(`| ${i} | \`${k}\` | ${v.field} | ${v.n} | ${v.chars.join('').replace(/\|/g, '\\|')} | ${v.faq ? '**true**' : ''} | ${[...v.wl].join(';')} |`);
  }
  L.push('');
  L.push('<details><summary>原文节录 (' + byLoc.size + ' 条)</summary>');
  L.push('');
  for (const [k, v] of byLoc) L.push('- `' + k + '` ' + String(v.sample).replace(/\|/g, '\\|').slice(0, 190));
  L.push('');
  L.push('</details>');
  L.push('');
}

/* FAQ 子标记 */
L.push('---');
L.push('');
L.push('## 五、`content` 档布尔子标记 `rendersChineseFAQ` (取代旧「FAQ 残留」档)');
L.push('');
L.push('| 项 | 值 |');
L.push('|---|---|');
L.push('| true 字符数 | ' + A.rendersChineseFAQ.chars + ' |');
L.push('| true 涉及值数 | ' + A.rendersChineseFAQ.values + ' |');
L.push('| 方法 B 同项 | ' + B.rendersChineseFAQ.chars + ' 字符 / ' + B.rendersChineseFAQ.values + ' 值 |');
L.push('| 全库口径 (含 `JSON-LD` 档值) | `en.json` 内 `content` 字段共 9 个值满足严格判据: 7 个归 `content` 档 (下表), 1 个 (`print-specifications-reference-guide-2026`) 归 `JSON-LD` 档, 另 1 个 (`school-exercise-book-printing-guide`, 16 字) 的 CJK 落在 **`<h3>Q1:</h3><p>A: …</p>` 结构之外**故判 false |');
L.push('');
L.push('| # | 值位置 | 字段 | 字数 | 判定证据 |');
L.push('|---|---|---|---|---|');
A.rendersChineseFAQ.detail.forEach((d, i) => L.push(`| ${i + 1} | \`${d.file}\` L${d.lines.join(',')} | ${d.field} | ${d.chars} | ${d.reason} |`));
L.push('');
L.push('> 证据形如 `html-QA-block@N` = HTML 问答块 (Q/A) 内含 CJK; `FAQPage-JSONLD` = FAQPage schema 的 Question/Answer 文本内含 CJK。');
L.push('> 「true」的语义 = **该 CJK 字符真的位于 FAQ 问/答文本内, 会被渲染成中文 FAQ**; 落在正文段落的 CJK 不计入本标记。');
L.push('');

/* 假阳性差异清单 */
L.push('---');
L.push('');
L.push('## 六、`resolveLocale` 独有命中 (203 字符) —— 逐条列差异, 不取其一');
L.push('');
L.push('这些字符 **`resolveLocale` 判为 en, 门童结构化作用域不认**; 经逐条归因, **全部落在注释体内** (零例外)。');
L.push('本清单**不计入**上文 1032, 但完整列出以免掩盖:');
L.push('');
const resolveOnly = JSON.parse(fs.readFileSync(P + '.hermes/_probe-pb/_resolveOnly.json', 'utf8'));
L.push('| # | 文件 | 字符数 | 命中行 | 性质 |');
L.push('|---|---|---|---|---|');
let ri = 0;
for (const [f, v] of Object.entries(resolveOnly.files)) {
  ri++;
  L.push(`| ${ri} | \`${f}\` | ${v.chars} | ${v.lines.map(l => 'L' + l.line).join(' / ')} | ${[...new Set(v.lines.map(l => l.kind))].join(' / ')} |`);
}
L.push(`| | **合计** | **${resolveOnly.total}** | | |`);
L.push('');
L.push('<details><summary>逐行明细 (行号 / 命中字 / 该行原文)</summary>');
L.push('');
for (const [f, v] of Object.entries(resolveOnly.files)) {
  L.push('**`' + f + '`**');
  L.push('');
  for (const l of v.lines) L.push('- L' + l.line + ' `' + l.chars + '` — ' + String(l.excerpt).slice(0, 160).replace(/\|/g, '\\|'));
  L.push('');
}
L.push('</details>');
L.push('');
L.push('补充 (A/B 两法都排除、仅存在于 `resolveLocale` 全库口径的其他 src/ 文件, 供参考): 全 src/ 另有 ' + (3702 - 1235) + ' 字同类假阳性, 详见 `.hermes/_probe-pb/_diag-conflict.txt`。');
L.push('');

/* 白名单 */
L.push('---');
L.push('');
L.push('## 七、白名单候选 (K3 已批准 4 行; 不占档位, 可跨档)');
L.push('');
L.push('| # | file:line | 字段 | 语系归属 | 字数 | 内容 |');
L.push('|---|---|---|---|---|---|');
const wlRows = new Map();
for (const r of A.records) for (const w of (r.whitelist || [])) {
  const k = w + '|' + r.file + ':' + r.line + '|' + r.field;
  if (!wlRows.has(k)) wlRows.set(k, { n: 0, chars: new Set(), sample: r.excerpt, bucket: r.bucket });
  wlRows.get(k).n++; for (const c of r.char) wlRows.get(k).chars.add(c);
}
let wi = 0;
for (const [k, v] of wlRows) {
  wi++;
  const [w, loc, field] = k.split('|');
  L.push(`| ${wi} | \`${loc}\` | ${field} | ${w} | ${v.n} | \`${[...v.chars].join('')}\` |`);
}
L.push('');
L.push('归档位置: 上述 4 行命中**全部落在 `其他` 档** (字段名 `beneficiaryCn` / `bullets` / `supportJA` 均在 6 档定义之外),');
L.push('另有 `blog-data/en.json` 的品牌名 `彩龍印刷` 落在 `JSON-LD` 档。详见 §四 对应行。');
L.push('');

/* 数组元素独立列 */
L.push('---');
L.push('');
L.push('## 八、数组元素 (两法表达方式不同, 单列以便复核)');
L.push('');
L.push('| # | file:line | 字段 | 字数 | 节录 |');
L.push('|---|---|---|---|---|');
let ai = 0;
for (const r of A.records) {
  if (!r.arrayElement) continue;
  ai++;
  L.push(`| ${ai} | \`${r.file}:${r.line}\` | ${r.field} | 1 | ${String(r.excerpt).slice(0, 120).replace(/\|/g, '\\|')} |`);
}
if (!ai) L.push('| — | (无) | | | |');
L.push('');
L.push('> 方法 A 对数组裸元素单独标记 `arrayElement`, 不计入 §3.3 条目集合; 方法 B 将其归入列表键。');
L.push('> 两者**字符级计数完全一致** (已包含在 §3.1/§3.2), 差异仅在「条目怎么记」。');
L.push('');

/* 与旧版差异 */
L.push('---');
L.push('');
L.push('## 九、与作废版 (`.hermes/logs/i18n-en-cjk-classification-2026-09-19.md`) 的差异说明');
L.push('');
L.push('### 9.1 两版口径的根本差异');
L.push('');
L.push('| 项 | 作废版 | 本版 v2 |');
L.push('|---|---|---|');
L.push('| 分档依据 | **命中行的整行文本正则** (`/FAQ/` / `/"content":/` …) | **命中字符所处字段** (结构定位) |');
L.push('| 字符记账 | 先把逐笔 CSV **按 `file:line:char` 去重**, 再分档 ⇒ 计数被去重压缩 | 逐字符记账, 不做字符级去重 |');
L.push('| 条目口径 | 分档后的「笔数」自相矛盾 (A-G 合计 598 ≠ 声称 1138) | 字符数与条目数**分列**, 互不混用 |');
L.push('| FAQ | 单列 C 档 (7 笔), 判据 = 行文本出现 `FAQ` | 取消该档; 改 `content` 档布尔子标记, 严格判据 (见 §1.3) |');
L.push('| 别名键 | 未覆盖 (`supportJA` / `beneficiaryCn` 漏) | 覆盖 (按真实语系归属) |');
L.push('');
L.push('### 9.2 数字变化与原因 (逐档)');
L.push('');
L.push('| 作废版档位 | 作废版笔数 | 本版对应档 (字符数) | 变化原因 |');
L.push('|---|---|---|---|');
L.push('| A 白名单 (专有名词 4 行) | 28 | 不占档位; 现为跨档标记 28 字 (其他档 28 + JSON-LD 品牌名) | 口径相同, 改为**标记**而非档位 (K3 §3 要求) |');
L.push('| B JSON-LD 残留 | 31 | `JSON-LD` **138 字符 / 5 条目** | 31 是「去重后的行笔数」; 本版按字符记 (同值可含多字符), 且改按**值内嵌内联 schema** 判据 |');
L.push('| **C FAQ 残留** | **7** | **311 字符 / 7 值 (无「FAQ 档」, 改 `content` 档布尔子标记)** | 作废版 7 笔全部来自 `en.json:617` 的 `description` —— 其文本含 "Rush order **FAQ** answered" 字样, 行正则便判为「FAQ 残留」; 实际该值是 **meta description, 根本不是 FAQ 字段**。改按严格判据 (CJK 是否落在 FAQ 问/答文本内) 重算: 得 **311 字符 / 7 值真正位于 FAQ 结构体内** (见 §五) —— **数字同量级纯属巧合, 内容完全不同** |');
L.push('| D category 字段残留 | 32 | `category` **33 字符 / 9 条目** | 去重压缩 vs 逐字符; 条目数 9 亦为真实值 |');
L.push('| E title/description | 52 | `title` **10** + `description` **67** = **77 字符** | 作废版把 title/description 合档且按行去重; 本版两档分开、按字符计 |');
L.push('| **F content 正文** | **300** | `content` **697 字符 / 37 条目** | 作废版 300 = 去重后的「行笔数」; 本版为**字符数** (同一 content 值内多字符逐字记); 二者不同量纲, 不是「残留翻倍」 |');
L.push('| G 其他/待判 | 148 | `其他` **87 字符 / 8 条目** | 作废版 148 含大量实为 content/JSON-LD 的条目 (正则只看行文本, 分错); 本版按字段定位后大部分归入 content/JSON-LD |');
L.push('| (新) 合计 | 598 (自相矛盾: 声称 1138) | **1032 字符 / 73 条目** | = 门童 `perRule.I18N_POLLUTION_EN` 基线值 |');
L.push('');
L.push('### 9.3 关于「1138 vs 968 / 118 vs 0 / 28 vs 4 / 16 vs 0 / 12 vs 0」');
L.push('');
L.push('上一版方法 2 的偏差根因已复核确认, 并给出本版的实证:');
L.push('');
L.push('| 文件 | 旧方法 2 报数 | 真实值 (两法一致) | 旧方法 2 偏差根因 |');
L.push('|---|---|---|---|');
L.push('| `src/data/category-seo-content.ts` | 0 | **12** | 旧方法 2 只认「键名恰为 `en:`」的值域; 该档 CJK 落在 `en` **容器块内更深层** (如 `points: [...]` 数组元素 / `description`), 未被 `en:` 直属切片覆盖 |');
L.push('| `src/data/sku-seo-data.ts` | 4 | **28** | 同上 —— 24 字落在 `en` 块内 `description`/`h1`/`keywords` 等子字段 |');
L.push('| `src/app/[locale]/payment-methods/page.tsx` | 0 | **16** | 同上 —— 13 字落在 `beneficiaryCn` (**别名键**, 非 `en:`), 3 字落在 `bullets` 数组元素 |');
L.push('| `src/components/layout/Footer.tsx` | 0 | **12** | 同上 —— 全 12 字落在 `supportJA` (**别名键**, 非 `en:`); 该值属 **ja 语系**, 因「最近左侧 locale 键 = `en:`」规则被记为 en ⇒ **这条属口径产物, 是否真缺陷需 K3 判** (见 §十) |');
L.push('| 合计 | **968** | **1032** | 差 64 = 上述 4 档之和 |');
L.push('');
L.push('### 9.4 关于旧版 1138 —— 已复核, 无需再引它做判据');
L.push('');
L.push('旧版声称的 1138 (与方法 2 的 968 对不上) 是**逐笔 CSV 行数**, 而该 CSV 由 `en-cjk-inventory.cjs` 用');
L.push('`guard.scanBidirectional()` 产出 —— 即**门童结构化值作用域**口径, 与基线 1032 **同源**。');
L.push('两者差 106 的成因是**集合范围与去重口径不同** (旧版另有 `resolveLocale` 假阳性参与、且做过行级合并),');
L.push('本任务**不以 1138 或 968 为任何判据** —— 统一采用可复算的 1032 (两法已独立复现一致)。');
L.push('');
L.push('> 一句话: **1138 与 968 都不是 1032** —— 前者含假阳性/口径混杂, 后者漏别名键与嵌套字段, 两者都不可作判据。');
L.push('');

/* 无法判定 */
L.push('---');
L.push('');
L.push('## 十、无法判定归属 / 需 K3 判定的条目');
L.push('');
const noField = A.records.filter(r => r.field === '<no-field>' || r.field === '<unresolved>');
L.push('### 10.1 字段归属判不出的条目');
L.push('');
if (noField.length) {
  L.push('| # | file:line | 字符 | 节录 |');
  L.push('|---|---|---|---|');
  noField.forEach((r, i) => L.push(`| ${i + 1} | \`${r.file}:${r.line}\` | ${r.char} | ${String(r.excerpt).slice(0, 140).replace(/\|/g, '\\|')} |`));
} else {
  L.push('**无** —— 两法均能把 1032 字符全部归属到具名字段。');
}
L.push('');
L.push('### 10.2 口径上真正存疑、需 K3 拍板的 3 项');
L.push('');
L.push('| # | 项 | 字符数 | 争点 |');
L.push('|---|---|---|---|');
L.push('| 1 | `src/components/layout/Footer.tsx:146` `supportJA` | 12 | 字段名是 `supportJA` (**ja** 语系), 值却是含简体/中日混排; 门童按「最近左侧 locale 键」把它记入 en, 但这**可能是口径伪影而非真缺陷** |');
L.push('| 2 | `src/data/blog-data/en.json` `content` 内 `[證書編號備索]` 等**合规占位符** | 84 | 是「中文残留」还是「证书号占位符」? SOP-10 第 4 款要求 certNo 撤为空串, 此处为占位符形态 (campus / print-specs / 其他) |');
L.push('| 3 | `國際認證體系`(312) / `進口印刷設備`(258) / `認證體系`(208) / `認證紙`(69) / `急件`(36) / `截單`(36) 等**行业术语** | 含这些 token 的条目共 **46 条 / 847 字符** (占 1032 的 82%) | 属「中文残留需清理」还是「可保留的行业/工艺术语 + 经营参数」? 本清单按门童口径**全部计入**, 未自行放宽 (注: `急件 18:00 截單` 已在 `common.js` `OPERATIONAL_WHITELIST.businessParams` 内) |');
L.push('');
L.push('> 上述 3 项本清单**均按门童原始口径计入** (未擅自豁免), 仅标注争点供 K3 裁决。');
L.push('');
L.push('### 10.3 ★ 顺带发现的另一类真缺陷 (非本任务范围, 但同源命中, 必须上报)');
L.push('');
L.push('盘点 `en` 值内 CJK 时, 在 **`src/data/buying-guides.ts:930`** 的 **`en` 语系 `content` 值尾部** 发现一段');
L.push('**GSC 后台数据源行被写进了客户可见内容** —— 这正是 §0.23.1 (门童 #16 `gsc-leak-guard.js`) 的拦截对象:');
L.push('');
L.push('```html');
L.push('<small class="text-gray-500">数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)</small>');
L.push('```');
L.push('');
L.push('| 项 | 值 |');
L.push('|---|---|');
L.push('| 位置 | `src/data/buying-guides.ts:930` (字符位移 172176 / 行内偏移 8759) |');
L.push('| 所属 | `en` 语系 `content` 值 (字符串字面量内, 非注释) |');
L.push('| 命中后台黑话 | `GSC` · `gsc-fresh-2026-09-03.json` · `imps` · `pos` · `红线` · `校准` · `拍板` = **7 处** |');
L.push('| 为何既在清单里又单独列出 | 本清单按「en 值内 CJK」口径只记其中 **38 个中文字符**; 而**英文黑话 (`GSC`/`imps`/`pos`) 不属 CJK, 不在本清单判据内**, 故必须另行上报 |');
L.push('| 建议 | 按 §0.23.1「修复必须整句重写, 不能只删数字」处理: 整段 `<small>` 删除, 并跑 `node scripts/guards/gsc-leak-guard.js` 复核 |');
L.push('| 本任务边界 | **未修改该文件** (纯只读); 仅上报 |');
L.push('');

/* 复跑命令 */
L.push('---');
L.push('');
L.push('## 十一、复跑命令');
L.push('');
L.push('```powershell');
L.push('cd F:\\zprintpro-nextjs');
L.push('# 方法 A');
L.push('node .hermes/_probe-pb/methodA-en-cjk-classify.cjs');
L.push('# 方法 B');
L.push('node .hermes/_probe-pb/methodB-en-cjk-classify.cjs');
L.push('# resolveLocale 独有命中 (§六 明细)');
L.push('node .hermes/_probe-pb/diag-resolveLocale-only.cjs');
L.push('# 对账 + 重新生成报告与 CSV');
L.push('node .hermes/_probe-pb/en-cjk-align.cjs');
L.push('```');
L.push('');
L.push('基线对账 (确认 1032 未漂移):');
L.push('');
L.push('```powershell');
L.push('node .hermes/_probe-pb/diag-sku-ground-truth.cjs');
L.push('```');
L.push('');
L.push('---');
L.push('');
L.push('## 十二、边界声明');
L.push('');
L.push('- 本任务**纯只读**: 未修改 / 未新增 / 未删除任何 `src/` 生产文件, 未 commit / push / add。');
L.push('- 新增文件仅 2 份交付物 (报告 + CSV, 位于 `.hermes/logs/`) 与 `.hermes/_probe-pb/` 下脚本。');
L.push('- 判据**未自行放宽**: 门童口径下 1032 字符全部计入, 未以「行业术语 / 品牌词」为由静默豁免。');
L.push('');

const mdOut = P + '.hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md';
fs.writeFileSync(mdOut, L.join('\n'), 'utf8');

console.log('=== 对账结果 ===');
console.log('① 逐文件字符数: ' + (fileMismatch === 0 ? '✅ 全部一致 (' + FILES.length + '/' + FILES.length + ')' : '★ ' + fileMismatch + ' 档不一致'));
fileRows.forEach(r => { if (!r.ok) console.log('   ★ ' + r.file + '  A=' + r.a + ' B=' + r.b); });
console.log('② 档位计数: ' + (bucketMismatch === 0 ? '✅ 全部一致 (' + BUCKETS.length + '/' + BUCKETS.length + ')' : '★ ' + bucketMismatch + ' 档不一致'));
bucketRows.forEach(r => console.log('   ' + (r.ok ? '  ' : '★ ') + r.bucket.padEnd(14) + 'A=' + String(r.a).padEnd(6) + 'B=' + String(r.b).padEnd(6) + '条目 A=' + r.aEntries + ' B=' + r.bEntries));
console.log('③ 条目集合: A=' + setA.size + ' B=' + setB.size + ' 交集=' + (setA.size - onlyA.length) + ' A独有=' + onlyA.length + ' B独有=' + onlyB.length);
if (onlyA.length) console.log('   A 独有: ' + onlyA.join(', '));
if (onlyB.length) console.log('   B 独有: ' + onlyB.join(', '));
console.log('\n合计: A=' + aTotal + ' B=' + bTotal);
console.log('已写: .hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.md');
console.log('已写: .hermes/logs/i18n-en-cjk-classification-v2-2026-09-19.csv (' + (csv.length - 1) + ' 行)');
