// .hermes/logs/_add-unitlabel.mjs — 為 menus 簇 5 SKU 新增 unitLabel（K3 裁決單位）
//
// K3 2026-09-20 裁決：按品類區分單位，不統一為「本」。
//   市場依據：PVC 餐牌 print88king 用「張」；精裝香港印刷中心用「本」；
//     紙質餐牌 design-easy/高碧 用「張」；酒水單市場無明確慣例 → 用「份」較通用。
//
// 安全設計：綁定 SKU 區塊 + 在 minQuantity 行後插入 + 前後斷言（不重複插入、key 數不變）
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/products.ts';

/** slug → { unit, note } */
const UNITS = {
  'pvc-menus': { unit: '張', note: '市場慣例（print88king PVC 餐牌用「張」）' },
  'laminated-menus': { unit: '份', note: '過膠餐牌市場無明確慣例，用「份」較通用' },
  'hardcover-menus': { unit: '本', note: '精裝餐牌市場慣例用「本」' },
  'drink-menus': { unit: '份', note: '酒水單市場無明確慣例，用「份」較通用' },
  'disposable-menus': { unit: '份', note: '一次性餐牌用「份」較通用' },
};

const lines = fs.readFileSync(FILE, 'utf8').split(/\r?\n/);

const starts = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) starts.push({ slug: m[1], start: i });
});

const plans = [];
const problems = [];

for (const [slug, info] of Object.entries(UNITS)) {
  const idx = starts.findIndex((s) => s.slug === slug);
  if (idx < 0) {
    problems.push(`找不到 SKU [${slug}]`);
    continue;
  }
  const end = idx + 1 < starts.length ? starts[idx + 1].start - 1 : lines.length - 1;
  const mqIdx = lines.findIndex((l, i) => i >= starts[idx].start && i <= end && /^\s*minQuantity:\s*\d/.test(l));
  if (mqIdx < 0) {
    problems.push(`[${slug}] 區塊內無 minQuantity`);
    continue;
  }
  // 已存在則跳過（冪等）
  const already = lines.some((l, i) => i >= starts[idx].start && i <= end && /unitLabel:/.test(l));
  if (already) {
    console.log(`  ℹ️ [${slug}] 已有 unitLabel，跳過`);
    continue;
  }
  const indent = lines[mqIdx].match(/^\s*/)[0];
  plans.push({ slug, mqIdx, indent, unit: info.unit, note: info.note });
}

console.log(`unitLabel 新增（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`計畫 ${plans.length} 條 ｜ 問題 ${problems.length} 條\n`);
for (const p of plans) {
  console.log(`  ✓ [${p.slug}] 在 L${p.mqIdx + 1} 後插入 unitLabel: '${p.unit}'`);
  console.log(`      ${p.note}`);
}
if (problems.length) {
  console.log('\n🔴 問題:');
  for (const p of problems) console.log(`   - ${p}`);
}
if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(problems.length ? 1 : 0);
}
if (problems.length) {
  console.error('\n🔴 有問題未解，整批中止。');
  process.exit(1);
}

// 由後往前插入，保持索引有效
for (const p of plans.slice().sort((a, b) => b.mqIdx - a.mqIdx)) {
  lines.splice(p.mqIdx + 1, 0, `${p.indent}unitLabel: '${p.unit}',`);
}

const after = lines.join('\n');
// 後斷言
const chk = after.split(/\r?\n/);
const bad = [];
for (const [slug, info] of Object.entries(UNITS)) {
  const si = chk.findIndex((l) => new RegExp(`^ {4}slug: '${slug}'`).test(l));
  if (si < 0) {
    bad.push(`${slug} 找不到`);
    continue;
  }
  const next = chk.findIndex((l, i) => i > si && /^ {4}slug:/.test(l));
  const seg = chk.slice(si, next < 0 ? undefined : next);
  if (!seg.some((l) => l.includes(`unitLabel: '${info.unit}'`))) bad.push(`${slug} unitLabel 未寫入`);
  const cnt = seg.filter((l) => /unitLabel:/.test(l)).length;
  if (cnt !== 1) bad.push(`${slug} unitLabel 出現 ${cnt} 次（應為 1）`);
}
const slugCountBefore = starts.length;
const slugCountAfter = chk.filter((l) => /^ {4}slug: '/.test(l)).length;
if (slugCountBefore !== slugCountAfter) bad.push(`SKU 數由 ${slugCountBefore} 變為 ${slugCountAfter}`);
if (bad.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const b of bad) console.error(`   - ${b}`);
  process.exit(1);
}

const backup = `${FILE}.bak-unitlabel-${Date.now()}`;
fs.copyFileSync(FILE, backup);
fs.writeFileSync(FILE, after, 'utf8');
console.log(`\n✅ 已寫入 ${plans.length} 個 unitLabel（SKU 數不變 ${slugCountAfter}）`);
console.log(`   備份: ${backup}`);
