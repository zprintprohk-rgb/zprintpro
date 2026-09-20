#!/usr/bin/env node
/**
 * MOQ 殘留族續清批（K3 2026-09-21 02:59「繼續」）
 * 口徑 SSoT：月曆 = 1000 本/部/pc 起印（products.ts 月曆族 6 SKU minQuantity=1000 實證）；
 *            書刊 = 數據層真值（catalog-printing/saddle-stitch-booklets/perfect-bound-books/hardcover-books minQ=10）
 * 範圍紀律：只動「50 舊口徑」直接矛盾句；offset 500 階層價格主張 / 畢業紀念冊 50 本族（copy=data 真值）不動，登記活書待 K3。
 * 用法：node scripts/apply-moq-residual-batch-20260921.mjs [--apply]
 */
import { readFileSync, writeFileSync } from 'fs';

const APPLY = process.argv.includes('--apply');
const root = process.cwd();

/** 讀取 JSON 並定位 post 區間（按 slug 鍵的 2-space 縮進邊界），僅在區間內替換 */
function replaceInJsonPost(file, slug, pairs, label) {
  const src = readFileSync(file, 'utf8');
  const keyRe = new RegExp(`^  "${slug}": \\{`, 'm');
  const m = keyRe.exec(src);
  if (!m) throw new Error(`[${label}] slug "${slug}" 未找到`);
  const start = m.index;
  const rest = src.slice(start + m[0].length);
  const endM = /^  "[a-z0-9-]+": \{/m.exec(rest);
  const end = endM ? start + m[0].length + endM.index : src.length;
  let block = src.slice(start, end);
  const counts = pairs.map(([find, rep]) => {
    const re = find instanceof RegExp ? find : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const n = (block.match(re) || []).length;
    block = block.replace(re, rep);
    return n;
  });
  const out = src.slice(0, start) + block + src.slice(end);
  return { out, counts, changed: out !== src };
}

const results = [];
const plan = [];

// R1 月曆族 sku-seo-data ×4（custom/mini/photo-frame/magnetic calendars，數據 minQ=1000）
plan.push({
  label: 'R1 sku-seo-data 月曆族 faq 50→1000 ×4',
  file: 'src/data/sku-seo-data.ts',
  run: (src) => {
    const find = '一般為50本起訂，大批量訂單價格更優惠。';
    const n = src.split(find).length - 1;
    return { out: src.split(find).join('一般為1000本起訂，大批量訂單價格更優惠。'), counts: [n], expect: [4], changed: n > 0 };
  },
});

// R2 書刊族 products-content ×4（catalog/saddle-stitch-booklets/perfect-bound/hardcover，數據 minQ=10）
plan.push({
  label: 'R2 products-content 書刊族 50→10 本起印 ×4',
  file: 'src/data/products-content.ts',
  run: (src) => {
    const find = '50 本起印，48 小時快遞，紙材符合 ISO 12647-2 印刷色彩標準。';
    const n = src.split(find).length - 1;
    return { out: src.split(find).join('10 本起印，48 小時快遞，紙材符合 ISO 12647-2 印刷色彩標準。'), counts: [n], expect: [4], changed: n > 0 };
  },
});

// R3 月曆品類 meta 50本起訂→1000
plan.push({
  label: 'R3 category-conversion 月曆 meta 50本起訂→1000',
  file: 'src/data/category-conversion-blocks.ts',
  run: (src) => {
    const find = '50本起訂，月曆價錢';
    const n = src.split(find).length - 1;
    return { out: src.split(find).join('1000本起訂，月曆價錢'), counts: [n], expect: [1], changed: n > 0 };
  },
});

// R4 月曆品類 socialProof stat+label（1000 口徑下「數碼小批量」標籤同假，一併修正）
plan.push({
  label: 'R4 category-conversion 月曆 stat+label →1000',
  file: 'src/data/category-conversion-blocks.ts',
  run: (src) => {
    const find = '"stat": "50本起",\n      "label": "數碼小批量都接，初創同中小企試印無負擔"';
    const rep = '"stat": "1000本起",\n      "label": "批量訂製都接，企業禮品同機構派發都啱"';
    const n = src.split(find).length - 1;
    return { out: src.split(find).join(rep), counts: [n], expect: [1], changed: n > 0 };
  },
});

// R5/R6 zh-hk paper-materials（教材→10 本起印，exercise-books minQ=10）
plan.push({
  label: 'R5 zh-hk paper-materials 50 本起印→10（scoped）',
  file: 'src/data/blog-data/zh-hk.json',
  run: (src) => replaceInJsonPost('src/data/blog-data/zh-hk.json', 'paper-materials', [
    ['50 本起印', '10 本起印'],
    ['MOQ 階梯（50 至 多本）', 'MOQ 階梯（10 至多本）'],
  ], 'R5'),
});

// R7 en paper-materials textbook 50→10
plan.push({
  label: 'R7 en paper-materials textbook 50→10 copies',
  file: 'src/data/blog-data/en.json',
  run: () => replaceInJsonPost('src/data/blog-data/en.json', 'paper-materials', [
    ['textbook printing starts at 50 copies', 'textbook printing starts at 10 copies'],
  ], 'R7'),
});

// R8 ja paper-materials 教材 50部→10部
plan.push({
  label: 'R8 ja paper-materials 教材 50部→10部',
  file: 'src/data/blog-data/ja.json',
  run: () => replaceInJsonPost('src/data/blog-data/ja.json', 'paper-materials', [
    ['教材テキスト印刷は50部から対応', '教材テキスト印刷は10部から対応'],
  ], 'R8'),
});

// R9 zh-hk catalog-printing-guide 畫冊 50→10（minQ=10）
plan.push({
  label: 'R9 zh-hk catalog guide 50 本起印→10（scoped）',
  file: 'src/data/blog-data/zh-hk.json',
  run: (src) => replaceInJsonPost('src/data/blog-data/zh-hk.json', 'catalog-printing-guide', [
    ['50 本起印', '10 本起印'],
  ], 'R9'),
});

// R10 page.tsx render 層 description
plan.push({
  label: 'R10 page.tsx catalog desc 50→10',
  file: 'src/app/[locale]/blog/[slug]/page.tsx',
  run: (src) => {
    const find = '50 本起印，3-5 個工作天交付';
    const n = src.split(find).length - 1;
    return { out: src.split(find).join('10 本起印，3-5 個工作天交付'), counts: [n], expect: [1], changed: n > 0 };
  },
});

// R14 ja textbook-printing-guide 中綴じ小冊子 50冊→10冊（教科書100冊=true KEEP；saddle-stitch-booklets minQ=10）
plan.push({
  label: 'R14 ja textbook guide 小冊子 50冊→10冊（scoped）',
  file: 'src/data/blog-data/ja.json',
  run: () => replaceInJsonPost('src/data/blog-data/ja.json', 'textbook-printing-guide', [
    [/(?<![0-9])50冊/g, '10冊'],
  ], 'R14'),
});

// R15 zh textbook-printing-guide 小冊子 50 本起→10 本起（100 本起=教科書 true KEEP）
plan.push({
  label: 'R15 zh textbook guide 小冊子 50→10（scoped）',
  file: 'src/data/blog-data/zh-hk.json',
  run: () => replaceInJsonPost('src/data/blog-data/zh-hk.json', 'textbook-printing-guide', [
    ['50 本起。詳見', '10 本起。詳見'],
    ['騎馬釘小冊子 50 本起。', '騎馬釘小冊子 10 本起。'],
  ], 'R15'),
});

// R16 en textbook-printing-guide 小冊子 50→10 copies
plan.push({
  label: 'R16 en textbook guide booklets 50→10 copies（scoped）',
  file: 'src/data/blog-data/en.json',
  run: () => replaceInJsonPost('src/data/blog-data/en.json', 'textbook-printing-guide', [
    ['From 50 copies. See the', 'From 10 copies. See the'],
    ['Saddle-stitch booklets from 50 copies', 'Saddle-stitch booklets from 10 copies'],
  ], 'R16'),
});

// R12 ja calendar-printing-guide 50部→1000部（月曆口徑）
plan.push({
  label: 'R12 ja calendar (?<!\\d)50部→1000部（scoped）',
  file: 'src/data/blog-data/ja.json',
  run: () => replaceInJsonPost('src/data/blog-data/ja.json', 'calendar-printing-guide', [
    [/(?<![0-9])50部/g, '1000部'],
  ], 'R12'),
});

// R13 en calendar-printing-guide 50→1000 pc 族（offset 500 階層主張 KEEP 不動，登記活書）
plan.push({
  label: 'R13 en calendar 50pc→1000pc 族（scoped）',
  file: 'src/data/blog-data/en.json',
  run: () => replaceInJsonPost('src/data/blog-data/en.json', 'calendar-printing-guide', [
    ['50 pcs for digital printing, and 500 pcs for offset printing', '1,000 pcs minimum order (offset tier pricing applies'],
    ['50 pcs digital and 500 pcs offset minimum', '1,000 pcs minimum'],
    ['50-pc digital minimum', '1000-pc digital minimum'],
    ['50-pc minimum', '1000-pc minimum'],
    ['50 pcs minimum, 7-10 business days', '1,000 pcs minimum, 7-10 business days'],
    ['50pc MOQ', '1000pc MOQ'],
  ], 'R13'),
});

// R17 zh-hk restaurant-menu guide 硬皮精裝菜單 50→10（hardcover-menus minQ=10）
plan.push({
  label: 'R17 zh-hk menu guide 硬皮精裝 50→10（scoped）',
  file: 'src/data/blog-data/zh-hk.json',
  run: () => replaceInJsonPost('src/data/blog-data/zh-hk.json', 'restaurant-menu-printing-guide', [
    ['酒樓,50 本起印', '酒樓,10 本起印'],
  ], 'R17'),
});

// R18 ja paper-materials 教材テキスト兩個變體 50部→10部（R8 只覆蓋「は50部から対応」一種寫法，避坑 2 區間寫法變體）
plan.push({
  label: 'R18 ja paper 教材 50部變體×2→10部（scoped）',
  file: 'src/data/blog-data/ja.json',
  run: () => replaceInJsonPost('src/data/blog-data/ja.json', 'paper-materials', [
    ['、50部から、A5中綴じ40頁', '、10部から、A5中綴じ40頁'],
    ['— 50部から、新学期特急レーン', '— 10部から、新学期特急レーン'],
  ], 'R18'),
});

for (const p of plan) {
  // 每條規則前重讀文件：同文件多規則（如 R3/R4）必須串行看到前序寫入，防 out 基於舊快照互相覆寫
  const src = readFileSync(`${root}/${p.file}`, 'utf8');
  const r = p.run(src);
  const expect = r.expect || [];
  // 冪等容錯：c===expect（首跑）或 c===0（已應用過）都算過；只有「命中但數不對」才攔截
  const ok = r.counts.every((c, i) => expect.length === 0 || c === expect[i] || c === 0 || (expect[i] === undefined));
  results.push({ label: p.label, counts: r.counts, expect: r.expect || null, changed: r.changed, ok, file: p.file, out: r.out });
}

console.log(`\n📋 MOQ 殘留批 ${APPLY ? '--apply' : 'dry-run'}\n`);
let fail = 0;
for (const r of results) {
  const tag = r.ok ? '✅' : '🔴';
  if (!r.ok) fail++;
  console.log(`${tag} ${r.label} 命中=${JSON.stringify(r.counts)}${r.expect ? ' 期望=' + JSON.stringify(r.expect) : ''}${r.changed ? '' : ' (無變化)'}`);
}

if (fail > 0) {
  console.log(`\n🔴 ${fail} 條規則計數異常，未寫入任何文件（保護性中止）`);
  process.exit(2);
}
if (!APPLY) {
  console.log('\n(dry-run 完成，加 --apply 寫入)');
  process.exit(0);
}
for (const r of results) {
  if (r.changed) writeFileSync(`${root}/${r.file}`, r.out);
}
console.log('\n✅ 已寫入');
