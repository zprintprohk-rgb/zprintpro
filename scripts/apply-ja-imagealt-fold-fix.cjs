// ja imageAlt 折行修复 (🔴 确证 25 处) —— 第 2 批 P1b
// 依据:
//   ① 结构解析分类 (scripts/diag-brand-audit-gap-and-alt.cjs): 🔴确证 25 / 🟡需人读 4 / 🟢假阳性 56
//      🔴 判据 = 「与 zh-hk 段完全相同」**或**「无假名 + 含繁体专用字」⇒ 不可能是合法日文 alt
//   ② 日文名来源 = src/data/products.ts 的 `nameJa` (真值), **不凭空翻译** (核对见 .hermes/_tmp-alt-truth.cjs)
//   ③ alt 形态参考**本仓已有的正常日文 alt 模型**:
//      `ラミネート menu / 防水 | ラミネート menu印刷 防水加工 翌日配送 | ZprintPro`
//      ⇒ 新串一律: `<nameJa 主名> / <特徴> | 香港の<X>印刷 | ZprintPro`
//   ④ 🟡 4 条与 🟢 56 条**本批不动** (🟡 需人读; 🟢 系前次工具 🟠 误报, 实测含假名=正常日文)
// 手法: 配平花括号结构定位到 SKU 的 imageAlt 块 → 块内 `"ja": "<旧>"` 必须恰好 1 次 → 替换。
const fs = require('node:fs');
const FILE = 'src/data/sku-seo-data.ts';
let src = fs.readFileSync(FILE, 'utf8');
const done = [], failed = [];

function balanced(s, o) {
  let d = 0, inStr = false, esc = false, q = '';
  for (let i = o; i < s.length; i++) {
    const c = s[i];
    if (inStr) { if (esc) { esc = false; continue; } if (c === '\\') { esc = true; continue; } if (c === q) inStr = false; continue; }
    if (c === '"' || c === "'" || c === '`') { inStr = true; q = c; continue; }
    if (c === '{') d++; else if (c === '}') { d--; if (d === 0) return i; }
  }
  return -1;
}
function blockRange(s, key, from = 0) {
  const k = `"${key}": {`;
  const i = s.indexOf(k, from);
  if (i < 0) return null;
  const e = balanced(s, i + k.length - 1);
  return e < 0 ? null : { start: i, bodyStart: i + k.length, end: e };
}
function altBlock(slug) {
  const sl = blockRange(src, slug);
  if (!sl) { failed.push(`${slug}: 未找到 SKU 键`); return null; }
  const alt = src.indexOf('"imageAlt": {', sl.bodyStart);
  if (alt < 0 || alt > sl.end) { failed.push(`${slug}: 未找到 imageAlt 块`); return null; }
  const e = balanced(src, alt + '"imageAlt": {'.length - 1);
  if (e < 0) { failed.push(`${slug}: imageAlt 块未配平`); return null; }
  return { start: alt, end: e };
}

// slug → [旧 ja 值, 新 ja 值]   (旧值取自分类 dump; 新值按 nameJa 真值 + 本仓 alt 模型)
const MAP = [
  ['transparent-stickers', '一般為100張起訂，部分特殊工藝需500張起。', '透明ステッカー / 防水 | 香港の透明ステッカー印刷 | ZprintPro'],
  ['small-batch-stickers', '一般為100張起訂，部分特殊工藝需500張起。', '小ロットステッカー / ラベル印刷 | 香港の小ロットステッカー印刷 | ZprintPro'],
  ['die-cut-stickers', '一般為100張起訂，部分特殊工藝需500張起。', '型抜きステッカー / 防水 | 香港の型抜きステッカー印刷 | ZprintPro'],
  ['fluorescent-stickers', '一般為100張起訂，部分特殊工藝需500張起。', '蛍光ステッカー / 防水 | 香港の蛍光ステッカー印刷 | ZprintPro'],
  ['gift-bags', '一般為100個起訂，大批量訂單價格更優惠。', 'ギフト紙袋 / クラフト紙袋 ハンドル | 香港のギフト紙袋印刷 | ZprintPro'],
  ['large-bags', '大型紙袋 / 高耐久素材 | 大型紙袋印刷 強化素材 100個〜 即日発送 | ZprintPro', '大判紙袋 / 強化素材 | 香港の大判紙袋印刷 | ZprintPro'],
  ['folded-leaflets', '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。', '折りたたみパンフレット / A4・A5 | 香港の折りたたみパンフレット印刷 | ZprintPro'],
  ['eco-flyers', '支持。我們提供單面和雙面印刷選項，雙面印刷可充分利用空間。', 'エコチラシ / A4・A5 両面 | 香港のエコチラシ印刷 | ZprintPro'],
  ['food-boxes', '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定製。', '食品パッケージ / 食品包裝箱 | 香港の食品パッケージ印刷 | ZprintPro'],
  ['folding-boxes', '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定製。', '折りたたみ箱 / パッケージボックス | 香港の折りたたみ箱印刷 | ZprintPro'],
  ['rigid-boxes', '可以。我們支持各種盒型（天地蓋、抽屜盒、書型盒等）的完全定製。', '上製本箱 / 化粧箱 | 香港の上製本箱印刷 | ZprintPro'],
  ['custom-red-packets', '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定製。', 'オリジナルポチ袋 / 箔押し | 香港のオリジナルポチ袋印刷 | ZprintPro'],
  ['cartoon-red-packets', '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定製。', 'キャラクターポチ袋 / 箔押し | 香港のキャラクターポチ袋印刷 | ZprintPro'],
  ['eco-red-packets', '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定製。', 'エコポチ袋 / 箔押し | 香港のエコポチ袋印刷 | ZprintPro'],
  ['large-red-packets', '可以。我們提供燙金、燙銀、浮雕等多種工藝的Logo定製。', '大判ポチ袋 / 箔押し | 香港の大判ポチ袋印刷 | ZprintPro'],
  ['custom-calendars', '可以。我們支持封面和內頁的完全定制設計。', 'オリジナルカレンダー / 卓上・壁掛け | 香港のオリジナルカレンダー印刷 | ZprintPro'],
  ['mini-calendars', '可以。我們支持封面和內頁的完全定制設計。', 'ミニカレンダー / 卓上・壁掛け | 香港のミニカレンダー印刷 | ZprintPro'],
  ['photo-frame-calendars', '可以。我們支持封面和內頁的完全定制設計。', 'フォトフレームカレンダー / 卓上 | 香港のフォトフレームカレンダー印刷 | ZprintPro'],
  ['magnetic-calendars', '可以。我們支持封面和內頁的完全定制設計。', 'マグネットカレンダー / 卓上 | 香港のマグネットカレンダー印刷 | ZprintPro'],
  ['adhesive-banners', '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。', '粘着バナー / 屋外対応 | 香港の粘着バナー印刷 | ZprintPro'],
  ['mesh-banners', '是的。我們使用戶外專用燈布和防水油墨，可承受風吹日曬。', 'メッシュバナー / 屋外対応 | 香港のメッシュバナー印刷 | ZprintPro'],
  ['perfect-bound-books', '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。', '無線綴じ書籍 / 学術論文集・年次報告書 | 香港の無線綴じ書籍印刷 | ZprintPro'],
  ['hardcover-books', '我們支持騎馬釘、無線膠裝、精裝、線圈裝等多種裝訂方式。', 'ハードカバー書籍 / 記念アルバム・卒業アルバム | 香港のハードカバー書籍印刷 | ZprintPro'],
  ['colored-envelopes', '一般為500個起訂，彩色和特殊材質需1000個起。', 'カラー封筒 / クラフト封筒・窓付き | 香港のカラー封筒印刷 | ZprintPro'],
  ['electronics-packaging-box', '電子製品包装箱 | ZprintPro', '電子機器包装箱 / 静電気防止 | 香港の電子機器包装箱印刷 | ZprintPro'],
];

for (const [slug, oldVal, newVal] of MAP) {
  const b = altBlock(slug);
  if (!b) continue;
  const block = src.slice(b.start, b.end + 1);
  const oldPair = `"ja": "${oldVal}"`;
  const newPair = `"ja": "${newVal}"`;
  if (block.split(oldPair).length - 1 !== 1) { failed.push(`${slug}: 块内旧 ja 串未恰好命中 1 次`); continue; }
  if (src.includes(newPair)) { failed.push(`${slug}: 新串已存在`); continue; }
  // 断言新串必须含假名 (确证折行的反面: 合法日文 alt 一定含假名)
  if (!/[\u3040-\u309F\u30A0-\u30FF]/.test(newVal)) { failed.push(`${slug}: 新串无假名, 拒绝写入`); continue; }
  src = src.slice(0, b.start) + block.split(oldPair).join(newPair) + src.slice(b.end + 1);
  done.push(slug);
  console.log(`✅ ${slug.padEnd(26)} → ${newVal}`);
}

if (failed.length) { console.log('\n🔴 未落盘:'); failed.forEach((f) => console.log('  ' + f)); }
if (process.argv.includes('--apply') && failed.length === 0) {
  fs.writeFileSync(FILE, src, 'utf8');
  console.log(`\n💾 已写入 ${FILE} (${done.length} 处 ja imageAlt)`);
} else console.log(`\n(dry-run) ${done.length} 处; 加 --apply`);
