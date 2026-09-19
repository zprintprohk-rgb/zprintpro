// .hermes/logs/_analyze-drifts.mjs — 分析 672 條漂移的模式（決定修正策略）
import fs from 'node:fs';

const j = JSON.parse(fs.readFileSync('.hermes/logs/moq-scan-latest.json', 'utf8'));

console.log(`總漂移 ${j.drift}\n`);

/** 每個檔案抽 6 條樣本 */
const byFile = {};
for (const f of j.findings) (byFile[f.file] ??= []).push(f);

for (const [file, items] of Object.entries(byFile)) {
  console.log(`══════ ${file} (${items.length}) ══════`);
  for (const h of items.slice(0, 6)) {
    console.log(`  L${h.line} [${h.slug}] ${h.kind} found=${h.found} truth=${h.truth}`);
    console.log(`     ${h.text.slice(0, 130)}`);
  }
  console.log('');
}

/** 統計「找到的值」分布 —— 判斷是否為單一模式批量 */
console.log('══════ found 值分布（前 12）══════');
const byFound = {};
for (const f of j.findings) byFound[f.found] = (byFound[f.found] ?? 0) + 1;
for (const [k, v] of Object.entries(byFound).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  found=${k}: ${v} 條`);
}

/** 統計 truth 分布 */
console.log('\n══════ truth 值分布 ══════');
const byTruth = {};
for (const f of j.findings) byTruth[f.truth] = (byTruth[f.truth] ?? 0) + 1;
for (const [k, v] of Object.entries(byTruth).sort((a, b) => b[1] - a[1])) {
  console.log(`  truth=${k}: ${v} 條`);
}

/** 最常見的 slug */
console.log('\n══════ 漂移最多的 SKU（前 12）══════');
const bySlug = {};
for (const f of j.findings) bySlug[f.slug] = (bySlug[f.slug] ?? 0) + 1;
for (const [k, v] of Object.entries(bySlug).sort((a, b) => b[1] - a[1]).slice(0, 12)) {
  console.log(`  ${k}: ${v} 條`);
}
