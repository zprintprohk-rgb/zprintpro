/**
 * apply-sku-cut-canbadge-20260923.mjs — 下架 can-badge (罐型襟章/缶バッジ) SKU
 *
 * K3 2026-09-23 指令: https://zprintpro.com/zh-hk/product/can-badge/ 删除, 非业务范围。
 * 全链: products.ts + sku-seo-data.ts 双删 + 301 (can-badge→/category/japan-doujin/,
 *   旧 doujin-badges→can-badge 改指类目) + DoujinSKU 卡片删 (4→3) + seo.ts 类目 SEO
 *   去死品词 + category-conversion-blocks (zh-hk/ja 转换块去 匙扣+襟章, 顺带清 9/22
 *   遗留 acrylic-keychain 死品提及) + industry-scenario-links 改指 + blog-data 三语
 *   定价基准 92→91 (en/ja 还有 9/22 漏改的 99→91) + 同人/IP 博客死品词清理。
 * 惰性残留 (keyed lookup, 无枚举): pricing.ts / image-alt-map.ts 死条目留 (先例)。
 * 用法: --check | --apply
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'F:/zprintpro-nextjs';
const APPLY = process.argv.includes('--apply');
const BAK = path.join(ROOT, '.hermes/_bak-sku-cut-canbadge-20260923');

const errors = [];
const report = [];
const out = {};
out.read = (fp) => fs.readFileSync(fp, 'utf8');
out.write = (fp, src) => { fs.mkdirSync(BAK, { recursive: true }); fs.writeFileSync(path.join(BAK, path.basename(fp) + '.bak'), out.read(fp), 'utf8'); fs.writeFileSync(fp, src, 'utf8'); };

// ── 工具: 精确替换 + 断言 ──────────────────────────────
function rep(src, label, ops) {
  for (const [oldS, newS, want] of ops) {
    const n = src.split(oldS).length - 1;
    if (n !== want) { errors.push(`${label}: "${oldS.slice(0, 60)}" ×${n}, want ${want}`); continue; }
    src = src.split(oldS).join(newS);
    report.push(`${label}: "${oldS.slice(0, 44)}…" ×${n} → OK`);
  }
  return src;
}

// ── 1. products.ts 块切 ───────────────────────────────
{
  const fp = path.join(ROOT, 'src/data/products.ts');
  const lines = out.read(fp).split('\n');
  let slug = lines.findIndex(l => /^\s*slug: 'can-badge',$/.test(l));
  if (slug < 0) { errors.push('products.ts: can-badge slug 未找到'); } else {
    let s = slug;
    while (s > 0 && !/^\s*\{\s*$/.test(lines[s])) s--;
    let e = slug;
    while (e < lines.length && !/^\s*\{\s*$/.test(lines[e]) && !/^\];/.test(lines[e])) e++;
    e--;
    while (e > s && (/^\s*$/.test(lines[e]) || /^\s*\/\//.test(lines[e]))) e--;
    if (!/^\s*\},?\s*$/.test(lines[e])) { errors.push(`products.ts: 块尾异常 [${lines[e].trim()}]`); }
    else {
      const cut = lines.slice(s, e + 1).join('\n');
      const nSlug = (cut.match(/^\s*slug:/gm) || []).length;
      if (nSlug !== 1) errors.push(`products.ts: 块内 slug 数 ${nSlug}, want 1 [${cut.slice(0, 80)}]`);
      else {
        lines.splice(s, e - s + 1);
        report.push(`products.ts: 切块 L${s + 1}-${e + 1} (${e - s + 1} 行) OK`);
        if (APPLY) { out.write(fp, lines.join('\n')); report.push('products.ts: 写盘'); }
      }
    }
  }
}

// ── 2. sku-seo-data.ts 条目切 ─────────────────────────
{
  const fp = path.join(ROOT, 'src/data/sku-seo-data.ts');
  const lines = out.read(fp).split('\n');
  const s = lines.findIndex(l => /^  "can-badge": \{$/.test(l));
  if (s < 0) { errors.push('sku-seo-data.ts: can-badge 条目未找到'); } else {
    let e = s + 1;
    while (e < lines.length && !/^  \},?\s*$/.test(lines[e])) e++;
    if (e >= lines.length) errors.push('sku-seo-data.ts: 条目尾未找到');
    else {
      lines.splice(s, e - s + 1);
      report.push(`sku-seo-data.ts: 切条目 L${s + 1}-${e + 1} OK`);
      if (APPLY) { out.write(fp, lines.join('\n')); report.push('sku-seo-data.ts: 写盘'); }
    }
  }
}

// ── 3. next.config.js ─────────────────────────────────
{
  const fp = path.join(ROOT, 'next.config.js');
  let src = out.read(fp);
  src = rep(src, 'next.config.js', [
    ["    ['mesh-banners', '/product/outdoor-vinyl-banners/'],\n", "    ['mesh-banners', '/product/outdoor-vinyl-banners/'],\n    ['can-badge', '/category/japan-doujin/'],\n", 1],
    ["['/product/doujin-badges', '/product/can-badge/'],", "['/product/doujin-badges', '/category/japan-doujin/'],", 1],
  ]);
  if (APPLY && !errors.length) { out.write(fp, src); report.push('next.config.js: 写盘'); }
}

// ── 4. DoujinSKU.tsx ──────────────────────────────────
{
  const fp = path.join(ROOT, 'src/components/japan/DoujinSKU.tsx');
  let src = out.read(fp);
  src = rep(src, 'DoujinSKU.tsx', [
    [' * DoujinSKU — 日本动漫风 5 SKU 网格', ' * DoujinSKU — 日本动漫风 3 SKU 网格', 1],
    ['grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6', 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6', 1],
    ["      { slug: 'can-badge', name: '缶バッジ印刷', price: 'HK$80~/個起', spec: '57mm/76mm・安全扣', tag: 'vTuber' },\n", '', 1],
    ["      { slug: 'can-badge', name: 'Can Badge', price: 'From $10/pc', spec: '57mm/76mm · Safety pin', tag: 'vTuber' },\n", '', 1],
    ["      { slug: 'can-badge', name: '缶バッジ印刷', price: '¥1200〜/個〜', spec: '57mm/76mm・安全ピン付き', tag: 'vTuber' },\n", '', 1],
  ]);
  if (APPLY && !errors.length) { out.write(fp, src); report.push('DoujinSKU.tsx: 写盘'); }
}

// ── 5. seo.ts 类目 SEO 去死品词 ───────────────────────
{
  const fp = path.join(ROOT, 'src/lib/seo.ts');
  let src = out.read(fp);
  src = rep(src, 'seo.ts', [
    ["'同人周邊印刷 10本起 · 同人誌/亞克力/缶バッヂ/明信片 Comiket 24h特急 | 智印港'", "'同人周邊印刷 10本起 · 同人誌/明信片/托特袋 Comiket 24h特急 | 智印港'", 1],
    ["'Small Batch Doujinshi Printing Free Shipping · 10 MOQ Acrylic/Can Badge/Postcard | ZprintPro'", "'Small Batch Doujinshi Printing Free Shipping · 10 MOQ Booklets/Postcards/Totes | ZprintPro'", 1],
    ["'同人誌印刷 10部〜 USA コミッション · アクリル/缶バッジ/ポストカード コミケ24時間特急 | ZprintPro'", "'同人誌印刷 10部〜 USA コミッション · ポストカード/エコトート コミケ24時間特急 | ZprintPro'", 1],
    ["'同人誌印刷,同人周邊,亞克力鑰匙扣,亞克力立牌,全息貼紙,和紙膠帶,罐型襟章,明信片套裝,環保托特袋,", "'同人誌印刷,同人周邊,亞克力立牌,全息貼紙,和紙膠帶,明信片套裝,環保托特袋,", 1],
    ["'doujinshi printing,japan doujin,acrylic keychain custom,acrylic stand,can badge printing,postcard set,", "'doujinshi printing,japan doujin,acrylic stand,postcard set,", 1],
    ["'同人誌印刷,コミケ印刷,即売会,A5同人誌,B5同人誌,アクリルキーホルダー,アクリルスタンド,缶バッジ,ポストカード,", "'同人誌印刷,コミケ印刷,即売会,A5同人誌,B5同人誌,アクリルスタンド,ポストカード,", 1],
    ["A5/B5 同人誌 10 本起印、亞克力鑰匙扣 / 立牌 / 罐型襟章 / 明信片套裝 / 環保托特袋。", "A5/B5 同人誌 10 本起印、明信片套裝 / 環保托特袋。", 1],
    ["A5/B5 doujinshi from 10 MOQ, acrylic keychains/stands, can badges, postcard sets, eco tote bags. ", "A5/B5 doujinshi from 10 MOQ, postcard sets and eco tote bags. ", 1],
    ["アクリルキーホルダー・スタンド・缶バッジ・ポストカード・エコトートバッグ。", "ポストカード・エコトートバッグ。", 1],
  ]);
  if (APPLY && !errors.length) { out.write(fp, src); report.push('seo.ts: 写盘'); }
}

// ── 6. category-conversion-blocks.ts (zh-hk + ja 块) ──
{
  const fp = path.join(ROOT, 'src/data/category-conversion-blocks.ts');
  let src = out.read(fp);
  src = rep(src, 'conversion-zh', [
    ['仲有亞克力匙扣、罐型襟章、明信片套裝一站式訂製', '仲有明信片套裝、環保托特袋一站式訂製', 1],
    ['同人本 10 本起印；亞克力匙扣同罐型襟章 10 件起；明信片套裝 4 套起，社團同個人團隊細批量都印得到。', '同人本 10 本起印；明信片套裝 4 套起；環保托特袋少量起印，社團同個人團隊細批量都印得到。', 1],
    ['"label": "同人本起訂量 匙扣襟章 10 件起"', '"label": "同人本 10 本起・明信片套裝 4 套起"', 1],
    ['"label": "匙扣／襟章特急交期可協調"', '"label": "明信片套裝特急交期可協調"', 1],
    ['"title": "同人周邊四大產品線比較"', '"title": "同人周邊產品線比較"', 1],
    ['      [\n        "亞克力匙扣",\n        "UV 四色＋白墨，透明／白底／滿版，30-80mm 任意形狀，2mm／3mm 厚",\n        "角色應援、VTuber 周邊、物販",\n        "10 件起"\n      ],\n      [\n        "罐型襟章",\n        "柯式／數碼四色，57mm／76mm／44mm，安全扣標配＋OPP 袋",\n        "展會物販、應援活動、贈品",\n        "10 件起"\n      ],\n      [\n        "明信片套裝",', '      [\n        "明信片套裝",', 1],
    ['"4 套起"\n      ]\n    ],\n    "note": "以上規格以智印港 japan-doujin 產品線為準', '"4 套起"\n      ],\n      [\n        "環保托特袋",\n        "有機棉帆布＋絲印印刷",\n        "活動贈品、品牌禮物",\n        "少量起訂"\n      ]\n    ],\n    "note": "以上規格以智印港 japan-doujin 產品線為準', 1],
    ['"desc": "講明產品：同人本／匙扣／襟章／明信片，連開本尺寸同數量"', '"desc": "講明產品：同人本／明信片／環保托特袋，連開本尺寸同數量"', 1],
    ['"desc": "AI／PDF／PNG 都收，CMYK 300dpi+，異形匙扣要 Illustrator 路徑檔"', '"desc": "AI／PDF／PNG 都收，CMYK 300dpi+，異形圖案要 Illustrator 路徑檔"', 1],
    ['【產品】亞克力匙扣 / 罐型襟章 / 明信片套裝\\n【尺寸】例如匙扣 50mm / 襟章 57mm\\n【數量】\\n【工藝】例如匙扣 3mm 白底\\n【交貨日期】', '【產品】明信片套裝 / 環保托特袋\\n【尺寸】例如明信片 A6\\n【數量】\\n【工藝】例如霧面 PP 貼膜\\n【交貨日期】', 1],
    ['匙扣、襟章特急 3 個營業日，明信片套裝 3-5 個營業日', '明信片套裝 3-5 個營業日', 1],
    ['匙扣同襟章特急 3 個營業日；', '', 1],
    ['同人本、亞克力匙扣、罐型襟章、明信片套裝全部屬同一條', '同人本、明信片套裝、環保托特袋全部屬同一條', 1],
    ['異形匙扣需要 Illustrator 路徑檔入稿', '異形圖案需要 Illustrator 路徑檔入稿', 1],
  ]);
  src = rep(src, 'conversion-ja', [
    ['同人グッズ印刷｜同人誌・アクリルキーホルダー・缶バッジ 小ロット10個から｜ZprintPro', '同人グッズ印刷｜同人誌・ポストカードセット・エコトートバッグ 小ロットから｜ZprintPro', 1],
    ['同人誌1部￥7,500〜、アクリルキーホルダー1個￥2,275〜、缶バッジ1個￥1,200〜、ポストカード1枚￥750〜。10部・10個からの小ロットに対応し、コミケ前24時間特急製造も可能。', '同人誌1部￥7,500〜、ポストカード1枚￥750〜、エコトートバッグ1個￥9,000〜。10部・4セットからの小ロットに対応し、コミケ前24時間特急製造も可能。', 1],
    ['"q": "アクリルキーホルダーと缶バッジはどんな仕様を選べますか？",\n      "a": "缶バッジは57mm／76mmの2サイズで、フルカラー印刷・安全ピン付きが標準です。"', '"q": "ポストカードセットとエコトートバッグはどんな仕様を選べますか？",\n      "a": "ポストカードセットは和紙風アート紙・両面印刷・OPPスリーブ封入、エコトートバッグはオーガニックコットン帆布＋シルク印刷が標準です。"', 1],
    ['"stat": "10個〜",\n      "label": "アクリルキーホルダー・缶バッジの小ロットに対応（同人誌は10部から）"', '"stat": "4セット〜",\n      "label": "ポストカードセット・エコトートバッグの小ロットに対応（同人誌は10部から）"', 1],
    ['コミケ前の特急製造に対応（同人誌・缶バッジ）', 'コミケ前の特急製造に対応（同人誌）', 1],
    ['"アクリルキーホルダー（30-80mm）",\n        "2mm／3mm厚・透明／白／満版印刷",\n        "推し活グッズ・ファンクラブ限定品",\n        "10個〜"\n      ],\n      [\n        "缶バッジ（57mm／76mm）",\n        "フルカラー印刷・安全ピン付き",\n        "現場配布・セット売りの特典",\n        "10個〜"\n      ],\n      [', '"エコトートバッグ",\n        "オーガニックコットン・シルク印刷",\n        "イベントグッズ・ブランドノベルティ",\n        "少量〜"\n      ],\n      [', 1],
    ['目安価格は同人誌1部￥7,500〜／アクリルキーホルダー1個￥2,275〜／缶バッジ1個￥1,200〜／ポストカード1枚￥750〜。', '目安価格は同人誌1部￥7,500〜／ポストカード1枚￥750〜／エコトートバッグ1個￥9,000〜。', 1],
    ['商品【アクリルキーホルダー】／サイズ【50mm】／数量【30個】／仕様【2mm・満版印刷】', '商品【ポストカードセット】／サイズ【A6】／数量【20セット】／仕様【両面印刷・OPPスリーブ封入】', 1],
    ['前に発注した【同じデザインの缶バッジ（57mm）】を追加したいです。数量【100個】、デザインは前回と同じです。', '前に発注した【同じデザインのポストカードセット】を追加したいです。数量【20セット】、デザインは前回と同じです。', 1],
    ['同人誌は1部￥7,500〜（10部から）、アクリルキーホルダーは1個￥2,275〜、缶バッジは1個￥1,200〜（各10個から）、ポストカードセットは1枚￥750〜（4セットから）です。', '同人誌は1部￥7,500〜（10部から）、ポストカードセットは1枚￥750〜（4セットから）、エコトートバッグは1個￥9,000〜（少量から）です。', 1],
    ['同人誌と缶バッジはコミケ前の24時間特急製造にも対応しています', '同人誌はコミケ前の24時間特急製造にも対応しています', 1],
    ['{ "q": "アクリルキーホルダーと缶バッジはどんな仕様を選べますか？", "a": "アクリルキーホルダーは30-80mmの任意形状、2mm／3mmの厚み、透明・白・満版印刷から選べ、安全ピンやチェーンのオプションも可能です。缶バッジは57mm／76mmの2サイズで、フルカラー印刷・安全ピン付きが標準です。" }', '{ "q": "ポストカードセットとエコトートバッグはどんな仕様を選べますか？", "a": "ポストカードセットは105×148mm（A6）の和紙風アート紙・両面印刷・OPPスリーブ封入、4-8枚組です。エコトートバッグはオーガニックコットン帆布＋シルク印刷で、少量から対応します。" }', 1],
    ['はい。同人誌は10部から、アクリルキーホルダー・缶バッジは10個から、ポストカードセットは4セットから承ります。目安価格は同人誌1部￥7,500〜、アクリルキーホルダー1個￥2,275〜、缶バッジ1個￥1,200〜、ポストカード1枚￥750〜です。', 'はい。同人誌は10部から、ポストカードセットは4セットから、エコトートバッグは少量から承ります。目安価格は同人誌1部￥7,500〜、ポストカード1枚￥750〜、エコトートバッグ1個￥9,000〜です。', 1],
    ['"q": "アクリルキーホルダーの厚みや印刷方法は選べますか？",\n      "a": "選べます。30-80mmの任意形状、2mm／3mmの厚み、透明・白・満版印刷に対応し、安全ピンやチェーンのオプションも追加できます。缶バッジは57mm／76mmの2サイズでフルカラー印刷・安全ピン付き。推し活グッズには缶バッジとアクリルキーホルダーの組み合わせが人気です。"', '"q": "ポストカードセットの枚数や印刷方法は選べますか？",\n      "a": "選べます。4-8枚組で枚数を指定でき、両面フルカラー印刷・和紙風アート紙・OPPスリーブ封入に対応します。エコトートバッグはオーガニックコットン帆布へのシルク印刷で、推し活グッズにはポストカードセットとエコトートバッグの組み合わせが人気です。"', 1],
    ['同人誌と缶バッジはコミケ前の24時間特急製造に対応しており', '同人誌はコミケ前の24時間特急製造に対応しており', 1],
  ]);
  // 块内残余断言: 死品词应全文件清零
  const deadPat = /亞克力匙扣|罐型襟章|アクリルキーホルダー|缶バッジ|can-badge|acrylic keychain|acrylic-keychain/;
  if (deadPat.test(src)) errors.push('conversion: 全文件仍有死品词');
  if (APPLY && !errors.length) { out.write(fp, src); report.push('category-conversion-blocks.ts: 写盘'); }
}

// ── 7. industry-scenario-links.ts ─────────────────────
{
  const fp = path.join(ROOT, 'src/data/industry-scenario-links.ts');
  let src = out.read(fp);
  src = rep(src, 'industry-scenario-links', [
    ['    // 2026-09-22 SKU 压缩: acrylic-keychain 下架 → can-badge 承接 (同人周邊代表品)', '    // 2026-09-23 SKU 压缩: can-badge 下架 (非业务范围) → doujinshi-printing 承接 (同人周邊主线)', 1],
    ['    anime_goods: { sku: \'can-badge\' },', '    anime_goods: { sku: \'doujinshi-printing\' },', 1],
    ['    vtuber: { sku: \'can-badge\' },', '    vtuber: { sku: \'doujinshi-printing\' },', 1],
  ]);
  if (APPLY && !errors.length) { out.write(fp, src); report.push('industry-scenario-links.ts: 写盘'); }
}

// ── 8. blog-data 三语 ─────────────────────────────────
const blogOps = {
  'zh-hk.json': {
    whole: [
      ['模切貼紙，亞克力鑰匙扣', '模切貼紙，明信片套裝', 1],
    ],
    block: [
      ['16 品類 92 SKU 價格數據', '16 品類 91 SKU 價格數據', 1],
      ['16 品類 92 個在售 SKU', '16 品類 91 個在售 SKU', 2],
      ['16 個品類、92 個在售 SKU', '16 個品類、91 個在售 SKU', 1],
      ['16 個品類、92 個 SKU', '16 個品類、91 個 SKU', 1],
      ['（16 品類・92 SKU）', '（16 品類・91 SKU）', 1],
      ['16 品類 92 SKU 香港印刷價格基準', '16 品類 91 SKU 香港印刷價格基準', 1],
      ['99 個 SKU 的分佈高度集中於 100 張——99 個中佔 68 個', '91 個 SKU 的分佈高度集中於 100 張——91 個中佔 68 個', 1],
      ['日本同人（4）', '日本同人（3）', 1],
      ['註：日本同人 SKU（同人誌、亞克力製品、罐裝襟章、明信片套裝、環保索袋）', '註：日本同人 SKU（同人誌、明信片套裝、環保索袋）', 1],
      ['日本同人市場（同人誌、亞克力製品、明信片套裝）', '日本同人市場（同人誌、明信片套裝）', 1],
    ],
  },
  'en.json': {
    whole: [
      ['<a href=\\\"/en/product/can-badge/\\\">Doujin badges</a> and <a href=\\\"/en/product/postcard-set/\\\">doujin postcards</a>', '<a href=\\\"/en/product/postcard-set/\\\">doujin postcards</a> and <a href=\\\"/en/product/eco-tote-bag/\\\">eco tote bags</a>', 1],
    ],
    block: [
      ['Cost Report 2026: 92 SKU |', 'Cost Report 2026: 91 SKU |', 1],
      ['92 live SKUs across 16 product categories', '91 live SKUs across 16 product categories', 1],
      ['92 live SKUs across 16 categories', '91 live SKUs across 16 categories', 1],
      ['92-SKU Hong Kong print', '91-SKU Hong Kong print', 1],
      ['99 SKUs in 16 categories', '91 SKUs in 16 categories', 1],
      ['(16 Categories, 99 SKUs)', '(16 Categories, 91 SKUs)', 1],
      ['Across the 99 SKUs', 'Across the 91 SKUs', 1],
      ['68 of 99 SKUs', '68 of 91 SKUs', 1],
      ['99 active SKUs', '91 active SKUs', 1],
      ['Japan doujin (4)', 'Japan doujin (3)', 1],
      ['Note: Japan doujin SKUs (doujinshi, acrylic goods, can badges, postcard sets, eco totes) are quoted in Japanese y', 'Note: Japan doujin SKUs (doujinshi, postcard sets, eco totes) are quoted in Japanese y', 1],
      ['Japan doujin market (doujinshi, acrylic goods, postcard sets)', 'Japan doujin market (doujinshi, postcard sets)', 1],
    ],
  },
  'ja.json': {
    whole: [],
    block: [
      ['2026: 92 SKU 価格データ', '2026: 91 SKU 価格データ', 1],
      ['16 カテゴリ 92 実 SKU', '16 カテゴリ 91 実 SKU', 1],
      ['16 製品カテゴリ・92 の実 SKU', '16 製品カテゴリ・91 の実 SKU', 1],
      ['16 カテゴリ・99 SKU', '16 カテゴリ・91 SKU', 2],
      ['99 SKU の分布は 100 個に大きく集中しています（99 中 68、約 69%）', '91 SKU の分布は 100 個に大きく集中しています（91 中 68、約 69%）', 1],
      ['16品類99 SKUの価格とMOQ', '16品類91 SKUの価格とMOQ', 1],
      ['16 カテゴリ 92 SKU の香港印刷価格ベースライン', '16 カテゴリ 91 SKU の香港印刷価格ベースライン', 1],
      ['日本の同人（4）', '日本の同人（3）', 1],
      ['注: 日本の同人 SKU（同人誌、アクリルグッズ、缶バッジ、ポストカードセット、エコトート）は日本市場向けに日本円（&yen;）建て', '注: 日本の同人 SKU（同人誌、ポストカードセット、エコトート）は日本市場向けに日本円（&yen;）建て', 1],
      ['日本の同人市場（同人誌、アクリルグッズ、ポストカードセット）', '日本の同人市場（同人誌、ポストカードセット）', 1],
    ],
  },
};
for (const [file, cfg] of Object.entries(blogOps)) {
  const fp = path.join(ROOT, 'src/data/blog-data', file);
  let src = out.read(fp);
  if (cfg.whole.length) src = rep(src, file + ':whole', cfg.whole);
  // 提取定价基准块
  const anchor = '"hong-kong-printing-cost-baseline-2026": {';
  const s = src.indexOf(anchor);
  if (s < 0) { errors.push(`${file}: 定价基准块未找到`); continue; }
  const blockStart = s;
  let e = src.indexOf('\n', s);
  let depth = 1;
  // 简单深度扫描: 从块头逐字符找配平的 } (顶层 close 后跟 ,)
  let i = e;
  const inStr = (ch, idx, arr) => arr[idx - 1] === '\\';
  let quote = null;
  while (i < src.length && depth > 0) {
    const ch = src[i];
    if (quote) { if (ch === quote && !inStr(ch, i, src)) quote = null; }
    else if (ch === '"') quote = ch;
    else if (ch === '{') depth++;
    else if (ch === '}') depth--;
    i++;
  }
  let block = src.slice(blockStart, i);
  const origBlock = block;
  block = rep(block, file + ':block', cfg.block);
  if (/(92 SKU|92 個|92 の|92-SKU|99 SKU|99 SKUs|99 個|99 中|99 SKUの|亞克力製品|acrylic goods|アクリルグッズ|can badges|罐裝襟章|缶バッジ)/.test(block)) {
    errors.push(`${file}: 块内残余计数/死品词`);
  }
  src = src.slice(0, blockStart) + block + src.slice(i);
  if (APPLY && !errors.length) { out.write(fp, src); report.push(`${file}: 写盘`); }
}

// ── 收尾 ─────────────────────────────────────────────
console.log('══════ 报告 ══════');
report.forEach(r => console.log(r));
if (errors.length) {
  console.error('\n══════ 错误 ══════');
  errors.forEach(e => console.error(e));
  process.exit(2);
}
console.log(APPLY ? '\n[apply] 完成' : '\n[dry-run] OK, --apply 写盘');
