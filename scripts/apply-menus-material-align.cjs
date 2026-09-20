// menus 语义层「材质声称」对齐 (P0, 第 3 批; K3 裁决 2026-09-20)
// 背景(已实测上线): og:title 现为「過膠餐牌 | 餐牌 / 菜單 / 防水PVC | 智印港」
//   —— 「防水PVC」是跨 5 个 menus SKU 共享的模板尾巴, 但只有 pvc-menus 真为 PVC 膠片;
//      laminated/hardcover/drink/disposable 的 specs 分别是
//      「200g–250g銅版紙或啞粉紙；啞膠或光膠覆膜」「硬紙板封面裱糊銅版紙；內頁200g銅版紙」
//      「200g–250g銅版紙或合成紙；啞膠覆膜」「100g–120g書紙或再生紙；無覆膜（即棄）」
//   ⇒ 材质声称与 specs 矛盾 = 误声称 (客户可见)。
// 修法: 用**同名后缀的下半截**（products.ts 自己的 imageAlt.zh-hk 已写出的真实材质）替换素材質声称词。
//   不新增任何材质/认证声明, 不碰主词 (餐牌/酒水牌), 不碰价格/起印量。
// 覆盖两层:
//   ① products.ts   —— name(og:title 源) + gallery imageAlt.zh-hk
//   ② sku-seo-data.ts —— seo['zh-hk'].description (同模板尾巴, 客户可见)
// 手法: 全文断言旧串**恰好命中 1 次** → 替换; dry-run 默认, --apply 才写盘。
const fs = require('node:fs');
const FILES = ['src/data/products.ts', 'src/data/sku-seo-data.ts'];
let files = {};
const failed = [], done = [];
for (const f of FILES) files[f] = fs.readFileSync(f, 'utf8');

// [文件, 说明, 旧串, 新串]
const RULES = [
  // ── products.ts: name (og:title 源) ──
  ['src/data/products.ts', 'name 過膠',  "name: '過膠餐牌 | 餐牌 / 菜單 / 防水PVC'",  "name: '過膠餐牌 | 餐牌 / 菜單 / 覆膜'"],
  ['src/data/products.ts', 'name 精裝',  "name: '精裝餐牌 | 餐牌 / 菜單 / 防水PVC'",  "name: '精裝餐牌 | 餐牌 / 菜單 / 硬殼裝訂'"],
  ['src/data/products.ts', 'name 酒水牌', "name: '酒水牌 | 餐牌 / 菜單 / 防水PVC'",   "name: '酒水牌 | 餐牌 / 菜單 / 覆膜'"],
  ['src/data/products.ts', 'name 一次性', "name: '一次性餐牌 | 餐牌 / 菜單 / 防水PVC'", "name: '一次性餐牌 | 餐牌 / 菜單 / 即棄'"],
  // ── products.ts: gallery imageAlt.zh-hk (同段后半已写真实材质, 只换首段声称; 无空格版, 实测 dump 为准) ──
  ['src/data/products.ts', 'alt 過膠',  "'zh-hk': '餐牌印刷 / 防水PVC / 精裝菜單 | 香港過膠餐牌印刷 200g–250g銅版紙",
   "'zh-hk': '餐牌印刷 / 覆膜 / 精裝菜單 | 香港過膠餐牌印刷 200g–250g銅版紙"],
  ['src/data/products.ts', 'alt 精裝',  "'zh-hk': '餐牌印刷 / 防水PVC / 精裝菜單 | 香港精裝餐牌印刷 硬紙板封面裱糊銅版紙",
   "'zh-hk': '餐牌印刷 / 硬殼裝訂 / 精裝菜單 | 香港精裝餐牌印刷 硬紙板封面裱糊銅版紙"],
  ['src/data/products.ts', 'alt 酒水牌', "'zh-hk': '餐牌印刷 / 防水PVC / 精裝菜單 | 香港酒水牌印刷 200g–250g銅版紙",
   "'zh-hk': '餐牌印刷 / 覆膜 / 精裝菜單 | 香港酒水牌印刷 200g–250g銅版紙"],
  ['src/data/products.ts', 'alt 一次性', "'zh-hk': '餐牌印刷 / 防水PVC / 精裝菜單 | 香港一次性餐牌印刷 100g–120g書紙",
   "'zh-hk': '餐牌印刷 / 即棄 / 精裝菜單 | 香港一次性餐牌印刷 100g–120g書紙"],
  // ── sku-seo-data.ts: seo['zh-hk'].description (模板尾巴) ──
  ['src/data/sku-seo-data.ts', 'desc 過膠',  '過膠餐牌印刷 10 份起印。採用 250g 銅版紙/防水覆膜', '過膠餐牌印刷 10 份起印。採用 200g–250g 銅版紙/啞膠或光膠覆膜'],
  ['src/data/sku-seo-data.ts', 'desc 精裝',  '精裝餐牌印刷 10 本起印。採用 250g 銅版紙/防水覆膜', '精裝餐牌印刷 10 本起印。採用 硬紙板封面裱糊銅版紙/內頁 200g 銅版紙'],
  ['src/data/sku-seo-data.ts', 'desc 酒水牌', '酒水牌印刷 10 份起印。採用 250g 銅版紙/防水覆膜', '酒水牌印刷 10 份起印。採用 200g–250g 銅版紙或合成紙/啞膠覆膜'],
  ['src/data/sku-seo-data.ts', 'desc 一次性', '一次性餐牌印刷 100 份起印。採用 250g 銅版紙/防水覆膜', '一次性餐牌印刷 100 份起印。採用 100g–120g 書紙或再生紙/無覆膜即棄'],
];

for (const [file, label, from, to] of RULES) {
  const hits = files[file].split(from).length - 1;
  if (hits !== 1) { failed.push(`${label} (${file}): 旧串命中 ${hits} 次 (需 1) → 跳过`); continue; }
  if (files[file].includes(to)) { failed.push(`${label}: 新串已存在 → 跳过`); continue; }
  files[file] = files[file].split(from).join(to);
  done.push(`${label}`);
  console.log(`✅ ${label.padEnd(12)} 「${from.slice(0, 46)}…」→「${to.slice(0, 46)}…」`);
}

if (failed.length) { console.log('\n🔴 未落盘:'); failed.forEach((f) => console.log('  ' + f)); }
if (process.argv.includes('--apply') && failed.length === 0) {
  for (const f of FILES) fs.writeFileSync(f, files[f], 'utf8');
  console.log(`\n💾 已写入 ${FILES.join(' + ')} (${done.length} 处)`);
} else console.log(`\n(dry-run) ${done.length} 处; 加 --apply`);
