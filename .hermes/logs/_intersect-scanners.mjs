// .hermes/logs/_intersect-scanners.mjs — anchor ∩ moq10 交集（K3 建議：兩套掃描器都確認者精度最高）
//
// 原理：兩套掃描器判定域不同 ——
//   · moq10（關鍵詞中心）：掃「N 張起」正則 + 後向最近 SKU key 推斷歸屬
//   · anchor（SKU 中心）：以 SKU 名稱為 anchor，在段落內找 anchor+MOQ 共現
// 兩者**都**標記為漂移者 → 兩套獨立方法互相印證（§0.23.2 雙方法精神）
import fs from 'node:fs';

const moq = JSON.parse(fs.readFileSync('.hermes/logs/moq-scan-latest.json', 'utf8'));
const anc = JSON.parse(fs.readFileSync('.hermes/logs/moq-anchor-scan-latest.json', 'utf8'));

const key = (x) => `${x.slug}|${x.file}|${x.line}|${x.found}`;
const moqSet = new Map(moq.findings.map((f) => [key(f), f]));
const ancSet = new Map(anc.findings.map((f) => [key(f), f]));

// 交集：同 slug + 同檔 + 同行 + 同 found
const inter = [];
for (const [k, v] of moqSet) if (ancSet.has(k)) inter.push(v);

// 另算「寬鬆交集」：同 slug + 同 found（不要求同行，因兩套定位方式不同）
const loose = [];
const ancBySlugFound = new Map();
for (const f of anc.findings) {
  const k2 = `${f.slug}|${f.found}`;
  if (!ancBySlugFound.has(k2)) ancBySlugFound.set(k2, []);
  ancBySlugFound.get(k2).push(f);
}
for (const f of moq.findings) {
  const k2 = `${f.slug}|${f.found}`;
  if (ancBySlugFound.has(k2)) loose.push(f);
}

console.log('=== 兩套掃描器結果 ===');
console.log(`  moq10  : ${moq.drift} 條`);
console.log(`  anchor : ${anc.total} 條（模糊 ${anc.ambiguous}）`);
console.log('');
console.log(`=== 嚴格交集（同 slug+檔+行+found）: ${inter.length} 條 ===`);
for (const f of inter.slice(0, 20)) {
  console.log(`  [${f.slug}] ${f.file.split('/').pop()}:${f.line} found=${f.found}/truth=${f.truth}`);
  console.log(`     ${f.text.slice(0, 120)}`);
}
console.log('');
console.log(`=== 寬鬆交集（同 slug+found，兩套都命中）: ${loose.length} 條 ===`);
const looseSlugs = [...new Set(loose.map((f) => f.slug))];
console.log(`  涉及 ${looseSlugs.length} 個 SKU: ${looseSlugs.slice(0, 20).join(', ')}`);

const payload = {
  generatedAt: new Date().toISOString().slice(0, 19),
  moq10Total: moq.drift,
  anchorTotal: anc.total,
  strictIntersection: inter.length,
  looseIntersection: loose.length,
  looseSlugs,
  strict: inter,
};
fs.writeFileSync('.hermes/logs/moq-scanner-intersection.json', JSON.stringify(payload, null, 2) + '\n', 'utf8');
console.log('\n明細: .hermes/logs/moq-scanner-intersection.json');
