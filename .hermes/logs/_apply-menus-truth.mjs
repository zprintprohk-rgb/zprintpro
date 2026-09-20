// .hermes/logs/_apply-menus-truth.mjs — 依 K3 市場基準修正 menus 簇真值
//
// K3 2026-09-19 市場基準裁決：
//   pvc-menus / laminated-menus / hardcover-menus / drink-menus → 真值 10
//   disposable-menus → 保留 100（一次性餐牌屬大批量柯式產線）
//
// 安全設計（沿用 moq10-repair-drift.ts 模式）：
//   ① 綁定 SKU 區塊（slug → minQuantity 行）
//   ② 前斷言：該區塊內 minQuantity 當前值 == 期望舊值（100）
//   ③ 後斷言：改完必為新值，且**其他 SKU 區塊不受影響**
//   ④ dry-run 預設，--apply 才寫
import fs from 'node:fs';

const APPLY = process.argv.includes('--apply');
const FILE = 'src/data/products.ts';

/** K3 裁決：slug → { from, to, unit, basis } */
const FIXES = [
  {
    slug: 'pvc-menus',
    from: 100,
    to: 10,
    unit: '份',
    basis: 'K3 市場基準：print88king PVC 餐牌 10 張 HKD24/張 ⇒ 10 張為主流小批量門檻',
  },
  {
    slug: 'laminated-menus',
    from: 100,
    to: 10,
    unit: '份',
    basis: 'K3 市場基準：cpress 過膠 10 張 $95 / 高碧 10 張 $9.50/張 ⇒ 10 張起可行',
  },
  {
    slug: 'hardcover-menus',
    from: 100,
    to: 10,
    unit: '本',
    basis: 'K3 市場基準：香港印刷中心精裝 1 本起（硬皮+可換內頁）⇒ 10 本保守可行',
  },
  {
    slug: 'drink-menus',
    from: 100,
    to: 10,
    unit: '份',
    basis: 'K3 市場基準：酒水單小批量數碼可行',
  },
  // disposable-menus：K3 明確「保留 100」（大批量柯式產線）→ 不改，僅驗證
];

const lines = fs.readFileSync(FILE, 'utf8').split(/\r?\n/);

/** 建 SKU 區塊範圍 */
const starts = [];
lines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) starts.push({ slug: m[1], start: i });
});
const rangeOf = (slug) => {
  const idx = starts.findIndex((s) => s.slug === slug);
  if (idx < 0) return null;
  return { start: starts[idx].start, end: idx + 1 < starts.length ? starts[idx + 1].start - 1 : lines.length - 1 };
};

const plans = [];
const problems = [];

for (const fix of FIXES) {
  const r = rangeOf(fix.slug);
  if (!r) {
    problems.push(`找不到 SKU [${fix.slug}]`);
    continue;
  }
  let hitLine = -1;
  let hitVal = -1;
  for (let i = r.start; i <= r.end; i++) {
    const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) {
      hitLine = i;
      hitVal = Number(m[1]);
      break;
    }
  }
  if (hitLine < 0) {
    problems.push(`[${fix.slug}] 區塊內無 minQuantity`);
    continue;
  }
  if (hitVal !== fix.from) {
    problems.push(`[${fix.slug}] 期望舊值 ${fix.from}，實際 ${hitVal} → 拒改（防誤改）`);
    continue;
  }
  plans.push({ fix, lineIdx: hitLine });
}

// disposable-menus 驗證（應保持 100）
const dr = rangeOf('disposable-menus');
let dVal = -1;
if (dr) {
  for (let i = dr.start; i <= dr.end; i++) {
    const m = lines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) {
      dVal = Number(m[1]);
      break;
    }
  }
}

console.log(`menus 簇真值修正（${APPLY ? 'APPLY' : 'DRY-RUN'}）`);
console.log(`計畫 ${plans.length} 條 ｜ 問題 ${problems.length} 條\n`);
for (const p of plans) {
  console.log(`  ✓ [${p.fix.slug}] L${p.lineIdx + 1}: ${p.fix.from} → ${p.fix.to}（單位 ${p.fix.unit}）`);
  console.log(`      依據: ${p.fix.basis}`);
}
console.log(`\n  ${dVal === 100 ? '✓' : '🔴'} [disposable-menus] 保持 ${dVal}（K3：一次性餐牌屬大批量柯式產線，保留 100）`);
if (problems.length) {
  console.log('\n🔴 問題:');
  for (const p of problems) console.log(`   - ${p}`);
}

if (!APPLY) {
  console.log('\n（dry-run，未寫檔。加 --apply 執行）');
  process.exit(problems.length ? 1 : 0);
}
if (problems.length) {
  console.error('\n🔴 有問題未解，整批中止，未寫入。');
  process.exit(1);
}

// 套用
for (const p of plans) {
  lines[p.lineIdx] = lines[p.lineIdx].replace(/minQuantity:\s*\d+/, `minQuantity: ${p.fix.to}`);
}

// 後斷言：新值到位 + 其他 menus SKU 不受影響
const after = lines.join('\n');
const afterLines = after.split(/\r?\n/);
const starts2 = [];
afterLines.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) starts2.push({ slug: m[1], start: i });
});
const valOf = (slug) => {
  const idx = starts2.findIndex((s) => s.slug === slug);
  if (idx < 0) return -1;
  const end = idx + 1 < starts2.length ? starts2[idx + 1].start - 1 : afterLines.length - 1;
  for (let i = starts2[idx].start; i <= end; i++) {
    const m = afterLines[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m) return Number(m[1]);
  }
  return -1;
};
const bad = [];
for (const p of plans) if (valOf(p.fix.slug) !== p.fix.to) bad.push(`[${p.fix.slug}] 改後為 ${valOf(p.fix.slug)}，期望 ${p.fix.to}`);
if (valOf('disposable-menus') !== 100) bad.push(`[disposable-menus] 被誤改為 ${valOf('disposable-menus')}`);
if (bad.length) {
  console.error('\n🔴 後斷言失敗，未寫入：');
  for (const b of bad) console.error(`   - ${b}`);
  process.exit(1);
}

const backup = `${FILE}.bak-menus-${Date.now()}`;
fs.copyFileSync(FILE, backup);
fs.writeFileSync(FILE, after, 'utf8');
console.log(`\n✅ 已寫入 ${plans.length} 個 SKU 真值修正`);
console.log(`   備份: ${backup}`);
