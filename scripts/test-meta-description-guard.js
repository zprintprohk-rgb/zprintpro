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

console.log(`\n${n - fail}/${n} PASS`);
process.exit(fail ? 1 : 0);
