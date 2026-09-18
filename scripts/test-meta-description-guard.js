/**
 * scripts/test-meta-description-guard.js
 * 门童 #20 规则 D (META_DESCRIPTION_RENDER_PATH) 回归测试
 *
 * 起因 (2026-09-18 全量线上探针): 线上 201 个 HTTP200 blog URL 中 124 个没有 meta description
 *   根因 = page.tsx 读了 BlogPostMeta 上不存在的 `description` 字段 (真名是 excerpt),
 *   而该文件 L1 是 @ts-nocheck ⇒ tsc 吞掉类型错误; 门童 #20 规则 C 只查 JSON description ⇒ 全过。
 *   DoD 铁律「No fix without a rule」⇒ 建规则 D + 本正负用例。
 *
 * 用法: node scripts/test-meta-description-guard.js
 */
'use strict';
const path = require('path');
const guard = require(path.join(__dirname, 'guards', 'meta-description-guard.js'));

let fail = 0;
let n = 0;

function run(name, src, expectRule) {
  n++;
  const hits = [];
  guard.scanRenderPath(hits, src);
  const got = hits.map(h => h.ruleId + '#' + (h.line || 0));
  const pass = expectRule === null ? hits.length === 0 : hits.some(h => h.ruleId === expectRule);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}: expect=${expectRule || '(none)'} got=[${got.join(',')}]`);
  if (!pass) fail++;
}

// === 负向 (修复后的正确写法) ===
run('fixed-code',
  `const description = legacyPost?.description || jsonEntry?.description || meta?.excerpt?.[locale] || '';`,
  null);

// 注释里提到旧写法不得误报 (解释性文字)
run('comment-mentions-bad-field',
  `// 旧写法 meta?.description?.[locale] 恒 undefined\nconst description = meta?.excerpt?.[locale] || '';`,
  null);

// === 正向 (必须拦下) ===
// 1. 原始事故写法 (2026-09-18 线上 124 页受害根因)
run('original-buggy-line',
  `    const description = meta?.description?.[locale] || legacyPost?.description || '';`,
  'META_DESCRIPTION_RENDER_PATH');

// 2. 变形: 非 optional chaining
run('buggy-no-optional-chain',
  `    const description = meta.description[locale] || '';`,
  'META_DESCRIPTION_RENDER_PATH');

// 3. 变形: 空格/换行写法
run('buggy-spaced',
  `    const d = meta ?. description ?. [locale];`,
  'META_DESCRIPTION_RENDER_PATH');

// 4. D2 正向: 描述来源被整体删掉 (恒空字符串)
run('no-source-at-all',
  `    const description = '';`,
  'META_DESCRIPTION_RENDER_PATH');

// ===========================================================================
// 规则 E (META_UNREGISTERED) — 「已聲明但未註冊」
// ===========================================================================
function runE(name, src, expectRule) {
  n++;
  const hits = [];
  guard.scanUnregisteredMeta(hits, src);
  const got = hits.map(h => h.ruleId + '#' + (h.line || 0));
  const pass = expectRule === null ? hits.length === 0 : hits.some(h => h.ruleId === expectRule);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}: expect=${expectRule || '(none)'} got=[${got.join(',')}]`);
  if (!pass) fail++;
}

// 正向: B 已聲明但未進陣列 (2026-09-18 线上 9 页 slug 标题的根因形态)
runE('E-unregistered-detected',
  `const A: BlogPostMeta = {
  slug: 'aaa-guide',
};
const B: BlogPostMeta = {
  slug: 'bbb-guide',
};
export const blogPosts: BlogPostMeta[] = [
  A,
];
`, 'META_UNREGISTERED');

// 負向: 全部都有註冊
runE('E-all-registered',
  `const A: BlogPostMeta = {
  slug: 'aaa-guide',
};
const B: BlogPostMeta = {
  slug: 'bbb-guide',
};
export const blogPosts: BlogPostMeta[] = [
  A,
  B,
];
`, null);

// ===========================================================================
// 规则 F (BLOG_QA_ANSWER_LOCALE) — 快速答案块跨語系覆蓋
// ===========================================================================
function runF(name, src, expectRule) {
  n++;
  const hits = [];
  guard.scanQaAnswerLocaleCoverage(hits, src);
  const got = hits.map(h => h.ruleId + '#' + (h.line || 0));
  const pass = expectRule === null ? hits.length === 0 : hits.some(h => h.ruleId === expectRule);
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}: expect=${expectRule || '(none)'} got=[${got.join(',')}]`);
  if (!pass) fail++;
}

// 正向: 原事故形態 (硬編碼中文, en/ja 全不命中)
runF('F-zh-only-marker',
  `    // ③ 快速答案块识别 (AEO/GEO 核心环节, v5.1): div 首段以「快速答案」开头
    content = content.replace(/<div class="([^"]*)">\\s*<p[^>]*>\\s*快速答案/g, (m, cls) => {
      const newCls = cls.includes('qa-answer') ? cls : \`qa-answer \${cls}\`;
      return m.replace(\`class="\${cls}"\`, \`class="\${newCls}"\`);
    });
`, 'BLOG_QA_ANSWER_LOCALE');

// 負向: 三語直譯等價位齊備 (修復後形態)
runF('F-all-locales-marker',
  `    // ③ 快速答案块识别 (AEO/GEO 核心环节, v5.1)
    content = content.replace(/<div class="([^"]*)">\\s*<p[^>]*>\\s*(?:快速答案|Quick [Aa]nswer|クイック回答)/g, (m, cls) => {
      const newCls = cls.includes('qa-answer') ? cls : \`qa-answer \${cls}\`;
      return m.replace(\`class="\${cls}"\`, \`class="\${newCls}"\`);
    });
`, null);

// 負向: 找不到該段時不得誤報 (由規則 D 的 D2 兜底)
runF('F-segment-absent', `    const x = 1;`, null);

console.log(`\n${n - fail}/${n} PASS`);
process.exit(fail ? 1 : 0);
