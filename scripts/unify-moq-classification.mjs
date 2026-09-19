/**
 * unify-moq-classification.mjs — 两法对账硬门 (K3 2026-09-19 约束)
 *
 * 硬门: **两法 SKU 集合与计数一致之前, 生成器不得构建。**
 * 本脚本比对:
 *   A) classify-moq-precision.mjs  (title scope, 消费门童 findings)
 *   B) resolve-moq-conflicts.mjs   (全 300 槽直读, 簇+自证判据)
 * 输出 `.hermes/reports/moq-precision-unified-2026-09-19.json`
 * exit 0 = 一致 (生成器可构建) ; exit 1 = 不一致 (硬门关闭)
 *
 * 用法: node scripts/unify-moq-classification.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(ROOT, p), 'utf8'));
const TODAY = '2026-09-19';

const A = read('.hermes/reports/moq-precision-classification-2026-09-19.json');
const B = read('.hermes/reports/moq-conflict-resolution-2026-09-19.json');

const aRows = A.items.map((i) => ({ slug: i.slug, locale: i.locale, claimed: i.claimed, truth: i.truth, cls: i.cls }));
const bRows = B.conflicts.map((i) => ({ slug: i.slug, locale: i.locale, claimed: i.claimed, truth: i.truth, cls: i.verdict }));

const key = (r) => `${r.slug}|${r.locale || '?'}`;
const aMap = new Map(aRows.map((r) => [key(r), r]));
const bMap = new Map(bRows.map((r) => [key(r), r]));

const aOnly = [...aMap.keys()].filter((k) => !bMap.has(k));
const bOnly = [...bMap.keys()].filter((k) => !aMap.has(k));
const both = [...aMap.keys()].filter((k) => bMap.has(k));

// 分桶语义映射 (两法词表不同 ⇒ 必须按**生成器动作**对齐, 而非按字面名对齐)
//   drift      : 确认漂移, 生成器须用裁决真值修
//   not_drift  : 非确认漂移 (保留 locale 值 / 不发 MOQ 钩子 / 待人工) —— 三者**操作结论一致**:
//                都不把该槽位当「用全局真值改标题」
// ★ 2026-09-19: 首版按字面名映射, 把 `LOCALE_SPECIFIC_KEEP`↔`PENDING_K3`、
//   `NO_MOQ_HOOK`↔`PENDING_K3` 误判为「语义不一致」21 行 —— 实为**同义命名**。
//   改按操作结论映射后, 残留分歧应只剩真分歧 (如 menus 的 机械规则 vs 裁决点名)。
const BUCKET = {
  TRUE_DRIFT: 'drift', DRIFT: 'drift',
  MANUAL_REVIEW: 'not_drift', PENDING_K3: 'not_drift',
  LOCALE_SPECIFIC_KEEP: 'not_drift', ALIGNED: 'not_drift', NO_MOQ_HOOK: 'not_drift',
};
const semanticDiff = both.filter((k) => BUCKET[aMap.get(k).cls] !== BUCKET[bMap.get(k).cls]);

const aSku = new Set(aRows.map((r) => r.slug));
const bSku = new Set(bRows.map((r) => r.slug));
const skuOnlyA = [...aSku].filter((s) => !bSku.has(s));
const skuOnlyB = [...bSku].filter((s) => !aSku.has(s));

const skuSetsEqual = skuOnlyA.length === 0 && skuOnlyB.length === 0;
const rowKeysEqual = aOnly.length === 0 && bOnly.length === 0;
const semanticEqual = semanticDiff.length === 0;
const unified = skuSetsEqual && rowKeysEqual && semanticEqual;

const out = {
  schema: 'moq-precision-unified-v1',
  generatedFor: TODAY,
  calibration: `${TODAY} ${new Date().toISOString().slice(11, 16)} UTC`,
  hardGate: 'K3 2026-09-19: 两法 SKU 集合与计数一致之前, 生成器不得构建',
  methodA: { script: 'classify-moq-precision.mjs', scope: 'title scope (门童 findings)', rows: aRows.length, counts: A.counts },
  methodB: { script: 'resolve-moq-conflicts.mjs', scope: '全 300 槽直读', rows: bRows.length, counts: B.counts },
  skuSets: { a: aSku.size, b: bSku.size, both: [...aSku].filter((s) => bSku.has(s)).length, onlyA: skuOnlyA, onlyB: skuOnlyB, equal: skuSetsEqual },
  rowKeys: { a: aRows.length, b: bRows.length, both: both.length, onlyA: aOnly, onlyB: bOnly, equal: rowKeysEqual },
  semanticDiff,
  semanticEqual,
  unified,
  verdict: unified ? 'UNIFIED — 生成器可构建' : 'NOT_UNIFIED — 硬门关闭, 生成器不得构建',
  blockReason: unified ? null : [
    !skuSetsEqual ? `SKU 集合差: 仅A ${skuOnlyA.length} / 仅B ${skuOnlyB.length}` : null,
    !rowKeysEqual ? `行键差: 仅A ${aOnly.length} / 仅B ${bOnly.length}` : null,
    !semanticEqual ? `语义分桶不一致 ${semanticDiff.length} 行` : null,
  ].filter(Boolean),
};

const dir = path.join(ROOT, '.hermes/reports');
fs.mkdirSync(dir, { recursive: true });
fs.writeFileSync(path.join(dir, `moq-precision-unified-${TODAY}.json`), JSON.stringify(out, null, 1));

const md = [];
md.push(`# MOQ 分类两法对账 (硬门) — ${TODAY}`);
md.push('');
md.push(`校准日期: ${out.calibration}`);
md.push('');
md.push(`> **硬门**: ${out.hardGate}`);
md.push(`> **判定: ${out.verdict}**`);
md.push('');
md.push('| 维度 | 方法A (title scope) | 方法B (300 槽) | 一致 |');
md.push('|---|---|---|---|');
md.push(`| SKU 集合 | ${aSku.size} | ${bSku.size} | ${skuSetsEqual ? '✅' : '❌'} |`);
md.push(`| 行数 | ${aRows.length} | ${bRows.length} | ${rowKeysEqual ? '✅' : '❌'} |`);
md.push(`| 语义分桶 | — | — | ${semanticEqual ? '✅' : '❌'} |`);
md.push('');
if (!unified) {
  md.push('## 阻断原因');
  md.push('');
  for (const r of out.blockReason) md.push(`- ${r}`);
  md.push('');
  if (skuOnlyA.length) md.push(`- 仅 A 有 SKU: ${skuOnlyA.join(', ')}`);
  if (skuOnlyB.length) md.push(`- 仅 B 有 SKU: ${skuOnlyB.join(', ')}`);
  if (aOnly.length) md.push(`- 仅 A 有行: ${aOnly.slice(0, 20).join(', ')}`);
  if (bOnly.length) md.push(`- 仅 B 有行: ${bOnly.slice(0, 20).join(', ')}`);
  if (semanticDiff.length) {
    md.push('');
    md.push('### 语义分桶不一致行 (前 30)');
    md.push('');
    md.push('| slug | locale | A 桶 | B 桶 |');
    md.push('|---|---|---|---|');
    for (const k of semanticDiff.slice(0, 30)) md.push(`| ${aMap.get(k).slug} | ${aMap.get(k).locale} | ${aMap.get(k).cls} | ${bMap.get(k).cls} |`);
  }
}
fs.writeFileSync(path.join(dir, `moq-precision-unified-${TODAY}.md`), md.join('\n'));

console.log(`A(title scope): ${aRows.length} 行 / ${aSku.size} SKU`);
console.log(`B(300 槽):      ${bRows.length} 行 / ${bSku.size} SKU`);
console.log(`SKU 集合一致: ${skuSetsEqual ? '✅' : '❌'}  行键一致: ${rowKeysEqual ? '✅' : '❌'}  语义一致: ${semanticEqual ? '✅' : '❌'}`);
console.log(`\n>>> ${out.verdict}`);
if (!unified) {
  console.log('阻断原因:'); for (const r of out.blockReason) console.log(`  - ${r}`);
  if (skuOnlyA.length) console.log(`  仅A SKU: ${skuOnlyA.join(', ')}`);
  if (skuOnlyB.length) console.log(`  仅B SKU: ${skuOnlyB.join(', ')}`);
  if (semanticDiff.length) console.log(`  语义不一致前10: ${semanticDiff.slice(0, 10).map((k) => `${k}(${aMap.get(k).cls}|${bMap.get(k).cls})`).join(' ')}`);
}
console.log(`\nreport: .hermes/reports/moq-precision-unified-${TODAY}.md`);
process.exit(unified ? 0 : 1);
