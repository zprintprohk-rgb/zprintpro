// .hermes/logs/_business-cards-inventory.mjs — business-cards 對照清單（K3 第一步：釐清品類歸屬）
//
// K3 2026-09-20 裁決：補齊 business-cards 分三步 —— ① 釐清品類歸屬（產出對照清單）
//   ② 對齊 MOQ 口徑 ③ 補齊至 CategoryIndustries
// 本腳本只做第 ① 步：**不修改任何檔案**，只產出事實清單供裁決。
import fs from 'node:fs';

console.log('══════════ business-cards 對照清單 ══════════\n');

// 1. products.ts 中的 business-cards SKU
const prod = fs.readFileSync('src/data/products.ts', 'utf8').split(/\r?\n/);
const idx = prod.findIndex((l) => /^ {4}slug: 'business-cards'/.test(l));
console.log('【1. products.ts 的 business-cards SKU】');
if (idx < 0) {
  console.log('  🔴 找不到 slug: business-cards');
} else {
  let mq = '';
  let name = '';
  let cat = '';
  for (let i = idx; i < idx + 80 && i < prod.length; i++) {
    if (i > idx && /^ {4}slug:/.test(prod[i])) break;
    if (!name) {
      const m = prod[i].match(/name: '([^']{0,90})/);
      if (m) name = m[1];
    }
    const m2 = prod[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m2 && !mq) mq = m2[1];
    const m3 = prod[i].match(/^\s*category:\s*'([^']+)'/);
    if (m3 && !cat) cat = m3[1];
  }
  console.log(`  L${idx + 1} ｜ category=${cat} ｜ minQuantity=${mq}`);
  console.log(`  name: ${name}`);
}

// 2. greeting-cards 相關 SKU（確認賀卡真值）
console.log('\n【2. greeting-cards 品類 SKU（賀卡真值基準）】');
const gs = [];
prod.forEach((l, i) => {
  const m = l.match(/^ {4}slug: '([^']+)'/);
  if (m) gs.push({ slug: m[1], line: i });
});
for (const g of gs) {
  let mq = '';
  let cat = '';
  let name = '';
  const end = gs.find((x) => x.line > g.line)?.line ?? prod.length;
  for (let i = g.line; i < end; i++) {
    const m2 = prod[i].match(/^\s*minQuantity:\s*(\d+)/);
    if (m2 && !mq) mq = m2[1];
    const m3 = prod[i].match(/^\s*category:\s*'([^']+)'/);
    if (m3 && !cat) cat = m3[1];
    if (!name) {
      const m4 = prod[i].match(/name: '([^']{0,50})/);
      if (m4) name = m4[1];
    }
  }
  if (cat === 'greeting-cards' || g.slug === 'business-cards' || g.slug.includes('greeting')) {
    console.log(`  [${g.slug}] category=${cat} minQuantity=${mq}`);
    console.log(`     ${name}`);
  }
}

// 3. CategorySharpHooks 的 business-cards 三場景（逐條印 MOQ 相關行）
console.log('\n【3. CategorySharpHooks 的 business-cards 三場景（逐條）】');
const sharp = fs.readFileSync('src/components/category/CategorySharpHooks.tsx', 'utf8').split(/\r?\n/);
let inBC = false;
sharp.forEach((l, i) => {
  if (/^\s*'business-cards':\s*\[/.test(l)) inBC = true;
  else if (inBC && /^\s{2}\],/.test(l)) inBC = false;
  if (!inBC) return;
  const k = l.match(/key:\s*'([^']+)'/);
  if (k) console.log(`  L${i + 1} key=${k[1]}`);
  // 印含 MOQ 樣式的行
  for (const m of l.matchAll(/(\d+)\s*[張個本份]\s*起/g)) {
    console.log(`     L${i + 1} 含 MOQ: 「${m[0]}」`);
    console.log(`        ${l.trim().slice(0, 150)}`);
  }
});

// 4. CategoryIndustries 是否有 business-cards
console.log('\n【4. CategoryIndustries 是否有 business-cards】');
const ind = fs.readFileSync('src/components/category/CategoryIndustries.tsx', 'utf8');
console.log(`  ${/'business-cards':\s*\[/.test(ind) ? '✓ 有' : '🔴 無（孤兒類別）'}`);

// 5. industry-scenario-links 映射
console.log('\n【5. industry-scenario-links.ts 的 business-cards 映射】');
const links = fs.readFileSync('src/data/industry-scenario-links.ts', 'utf8').split(/\r?\n/);
let inL = false;
links.forEach((l, i) => {
  if (/^\s*'?business-cards'?:\s*\{/.test(l)) inL = true;
  else if (inL && /^\s{2}\},?/.test(l)) inL = false;
  if (inL) console.log(`  L${i + 1}: ${l.trim().slice(0, 120)}`);
});
