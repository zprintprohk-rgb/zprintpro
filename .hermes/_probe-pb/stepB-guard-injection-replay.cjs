'use strict';
/**
 * Step B-4: 门童 #16 新提取器 —— 注入回放 (形状全覆盖) + 真值量化
 *
 * 纪律 1 (度量工具先被度量): 每个用例都带**期望值**, 且必含
 *   阳性对照 (应命中) / 阴性对照 (应 0) —— 对照失效则整套结论作废。
 */
const fs = require('fs');
const path = require('path');
const REPO = path.resolve(__dirname, '..', '..');
const guard = require(path.join(REPO, 'scripts', 'guards', 'gsc-leak-guard.js'));
const TARGET = path.join(REPO, 'src', 'data', 'buying-guides.ts');

const LEAK_SIMP = '数据来源：GSC 数据 / gsc-fresh-2026-09-03.json · candle labels · imps 数据 · pos 数据 (per K3 v10 §九 + §0.23 数据诚信红线, 校准 2026-09-17 K3 v10 拍板日)';
const LEAK_TRAD = '數據來源：GSC 數據 / gsc-fresh-2026-09-03.json · candle labels · imps 數據 · pos 數據 (per K3 v10 §九 + §0.23 數據誠信紅線, 校準 2026-09-17 K3 v10 拍板日)';
const LEAK_JA = 'データ出典：GSC データ / gsc-fresh-2026-09-03.json · candle labels · imps データ · pos データ (per K3 v10 §九 + §0.23 データ诚信基準, 校正 2026-09-17 K3 v10 拍板日)';
// 真实形状: 值内含单引号属性 (旧提取器在此静默失效)
const HTML_SQ = `<p><small class="text-gray-500">${LEAK_SIMP}</small></p>`;
const HTML_ATTR_SQ = `<p class='x'>${LEAK_SIMP}</p>`;
// 干净文案 (阴性对照)
const CLEAN = 'Specs and pricing are based on our latest 2026 market review, for material and budget planning.';
const CLEAN_SQ_ATTR = `<p class='lead'>Our food-safe labels are FDA compliant and water resistant for handmade brands.</p>`;

const CASES = [
  // [名称, 文件体, 期望命中(>0 / =0), 说明]
  ['1 content 双引号单行', `export const x = {\n  a: { 'en': { content: "${HTML_SQ}" } },\n};\n`, '>0', '旧实现 0 命中 (字段+引号)'],
  ['2 content 单引号单行', `export const x = {\n  a: { 'en': { content: '${LEAK_SIMP}' } },\n};\n`, '>0', '旧实现 0 命中 (字段盲区)'],
  ['3 content 模板串多行', `export const x = {\n  a: {\n    longDescription: \`\n${HTML_SQ}\n\`,\n  },\n};\n`, '>0', 'products-content.ts 真实形状'],
  ['4 title 双引号 (旧看空)', `export const x = {\n  a: { 'zh-hk': "香港蠟燭標籤印刷 ${LEAK_TRAD}" },\n};\n`, '>0', '旧实现双引号看空'],
  ['5 日文片假名变体', `export const x = {\n  a: { 'ja': '${LEAK_JA}' },\n};\n`, '>0', '原正则 0 覆盖 (GSC データ)'],
  ['6 值内含单引号属性', `export const x = {\n  a: { 'en': '${HTML_ATTR_SQ}' },\n};\n`, '>0', '旧实现引号截断 → 0'],
  ['7 数组段落形态', `export const x = {\n  a: {\n    paragraphs: [\n      '${LEAK_SIMP}',\n    ],\n  },\n};\n`, '>0', '旧实现本来能抓 (回归保护)'],
  ['8 段落数组 + 引号属性', `export const x = {\n  a: {\n    body: [\n      '${HTML_SQ}',\n    ],\n  },\n};\n`, '>0', '旧实现能抓 (回归保护)'],
  // ---- 阴性对照 ----
  ['N1 干净文案', `export const x = {\n  a: { 'en': { content: "${CLEAN}" } },\n};\n`, '=0', '不应误报'],
  ['N2 干净文案含 class 属性', `export const x = {\n  a: { 'en': { content: "${CLEAN_SQ_ATTR}" } },\n};\n`, '=0', '不应因 HTML 属性误报'],
  ['N3 色彩校準 (行业词)', `export const x = {\n  a: { 'zh-hk': { content: '<p>本廠採用 ICC 色彩校準與 ISO 12647 色彩管理，品質穩定。</p>' } },\n};\n`, '=0', '色彩校準 必须豁免'],
  ['N4 注释行引用', `// 内部备注: GSC pos 2.3 + 4 imps, gsc-fresh-2026-09-03.json\n${'export const x = { a: { content: "normal visible text for customers here" } };\n'}`, '=0', '注释行不算客户可见'],
];

const withTarget = (body, fn) => {
  const orig = fs.readFileSync(TARGET, 'utf8');
  fs.writeFileSync(TARGET, body, 'utf8');
  return Promise.resolve(fn()).finally(() => fs.writeFileSync(TARGET, orig, 'utf8'));
};

(async () => {
  console.log('=== 门童 #16 新提取器 注入回放 ===\n');
  let pass = 0, fail = 0;
  const results = [];
  for (const [name, body, expect, note] of CASES) {
    const n = await withTarget(body, async () => (await guard.scan([TARGET])).length);
    const ok = expect === '>0' ? n > 0 : n === 0;
    ok ? pass++ : fail++;
    results.push({ name, expect, got: n, ok, note });
    console.log(`  ${ok ? '✅' : '❌'} ${name.padEnd(26)} 期望 ${expect.padEnd(3)} 实得 ${String(n).padStart(2)}  (${note})`);
  }
  console.log(`\n注入回放: PASS ${pass} / FAIL ${fail}`);

  // 对照有效性自证
  const ctrlNeg = results.filter(r => r.expect === '=0');
  const ctrlPos = results.filter(r => r.expect === '>0');
  const negSilent = ctrlNeg.every(r => r.got === 0);
  const posAlive = ctrlPos.some(r => r.got > 0);
  console.log(`对照自证: 阴性全静默=${negSilent} | 阳性有响应=${posAlive} -> ${negSilent && posAlive ? '✅ 判据可用' : '❌ 判据失效, 结论作废'}`);

  // ---- 真值量化: 全 src/data 扫描面 ----
  console.log('\n=== 补面后真值量化 (与补面前对比) ===');
  const FILES = [
    'blog-data/zh-hk.json', 'blog-data/en.json', 'blog-data/ja.json',
    'blog-posts.ts', 'buying-guides.ts', 'pillar-content.ts', 'products.ts',
    'category-seo-content.ts', 'products-content.ts', 'sku-seo-data.ts',
  ].map(f => path.join(REPO, 'src', 'data', f)).filter(f => fs.existsSync(f));
  let total = 0;
  const per = [];
  for (const f of FILES) {
    const hits = await guard.scan([f]);
    total += hits.length;
    per.push({ f: path.basename(f), n: hits.length, hits });
    console.log(`  ${path.basename(f).padEnd(26)} ${String(hits.length).padStart(3)} 命中`);
  }
  console.log(`  ${'合计'.padEnd(26)} ${String(total).padStart(3)} 命中`);
  fs.writeFileSync(path.join(REPO, '.hermes', '_probe-pb', 'stepB-guard-replay-result.json'),
    JSON.stringify({ replay: results, pass, fail, negSilent, posAlive, per: per.map(p => ({ f: p.f, n: p.n })) }, null, 2), 'utf8');
  console.log('\n结果已落盘: .hermes/_probe-pb/stepB-guard-replay-result.json');
  process.exit(0);
})();
