// menus 文案层 DRIFT (7 处) + 品牌-语种错配 imageAlt (5 处) 一次性落盘
// 依据: products.ts 真值 (minQuantity/unitLabel) + title-equiv SSoT (50-57)
// 安全约束: 每处替换必须命中 **恰好 1 次**; 当量必须落在 [TITLE_MIN, TITLE_MAX]; 先备份
const fs = require('node:fs');
const { equiv, TITLE_MIN, TITLE_MAX } = require('./guards/title-equiv.js');

const FILE = 'src/data/sku-seo-data.ts';
let src = fs.readFileSync(FILE, 'utf8');
let applied = 0;
const failed = [];

// 每条: [说明, 旧串(必须恰好 1 次), 新串, 旧当量, 新当量检查 fn]
const T = (s) => `"title": "${s}"`;
const A = (s) => `"imageAlt": {\n`;

const edits = [
  ['pvc-menus/zh-hk 标题', T('PVC 餐牌印刷 · 防水防油覆膜 50本起 | 餐廳/咖啡店/酒吧菜單 | 智印港'),
    T('PVC 餐牌 · 防水防油覆膜 10張起印 | 餐飲/酒吧菜單 | 智印港'),
    (n) => n.length === 0],
  ['pvc-menus/ja 标题', T('PVC menu | 防水 ラミネート | 100枚〜 ¥386〜 | ZprintPro'),
    T('PVC menu | 防水 ラミネート | 10枚〜 ¥386〜 | ZprintPro'), (n) => n.length === 0],
  ['laminated-menus/zh-hk 标题', T('過膠餐牌 | 防水 覆膜 10 份起 | 智印港'),
    T('過膠餐牌印刷 · 防水覆膜 10份起 | 餐廳/咖啡店菜單 | 智印港'), (n) => n.length === 0],
  ['laminated-menus/en 标题', T('Laminated Menus | Laminated Durable | Free US Ship | ZprintPro'),
    T('Laminated Menus | Custom Print | Free US Ship | ZprintPro'), (n) => n.length === 0],
  ['laminated-menus/ja 标题', T('ラミネート menu | 防水 ラミネート | ZprintPro'),
    T('ラミネート menu 印刷 | 防水ラミネート 10枚〜 | ZprintPro'), (n) => n.length === 0],
  ['hardcover-menus/zh-hk 标题', T('精裝餐牌 | 防水 覆膜 10 本起 | 智印港'),
    T('精裝餐牌印刷 · 硬殼裝訂 10本起 | 高級餐廳/酒店 | 智印港'), (n) => n.length === 0],
  ['hardcover-menus/en 标题', T('Hardcover Menus | Laminated Durable | Free US Ship | ZprintPro'),
    T('Hardcover Menus | Custom Print | Free US Ship | ZprintPro'), (n) => n.length === 0],
  ['hardcover-menus/ja 标题', T('ハードカバー menu 防水・箔押し・100枚〜 | ZprintPro'),
    T('ハードカバー menu 印刷 | 上製本 箔押し 10冊〜 | ZprintPro'), (n) => n.length === 0],
  ['drink-menus/zh-hk 标题', T('餐廳酒水牌 | 防水 覆膜 圓角 | 100本起 HK$12起 | 智印港'),
    T('餐廳酒水牌 | 防水 覆膜 圓角 | 10本起 HK$12起 | 智印港'), (n) => n.length === 0],
  ['drink-menus/ja 标题', T('ドリンクメニュー 防水・マット・100枚〜 | ZprintPro'),
    T('ドリンクメニュー 印刷 | 防水 マット 10枚〜 | ZprintPro'), (n) => n.length === 0],
];

// 品牌-语种错配 imageAlt: 5 处纯中文/错挂串
// 结构解析法 (不猜兜进): 找到 SKU 键 → 定位其 "imageAlt": { ... } 配平块 → 在该块内替换 locale 值。
// 背景: 同一句中文在文件里出现 2 次(pvc/drink), 且 hardcover/ja 与 drink/zh-hk 被错挂成同一句;
//       正则+缩进猜归属本轮已连错 4 次, 故改用结构定位。
const altEdits = [
  // --- 本轮批次: 菜单 4 处错挂 (结构定位已实测: pvc-menus/ja 本身正常, 不是错挂) ---
  ['imageAlt ja (hardcover-menus)', 'hardcover-menus', 'ja', '一般為10個起訂，一次性餐牌（大批量柯式）100個起。',
    'ハードカバーメニュー / 上製本・箔押し | 香港のハードカバーメニュー製作 硬質紙板表紙 | ZprintPro'],
  ['imageAlt zh-hk (drink-menus)', 'drink-menus', 'zh-hk', '一般為10個起訂，一次性餐牌（大批量柯式）100個起。',
    '酒水牌 / 防水覆膜 圓角 | 香港酒水牌印製 200g–250g銅版紙或合成紙 | 智印港'],
  ['imageAlt ja (drink-menus)', 'drink-menus', 'ja', '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。',
    'ドリンクメニュー / 防水 マット | 香港のドリンクメニュー印刷 A5・A4 角丸仕上げ | ZprintPro'],
  ['imageAlt ja (disposable-menus)', 'disposable-menus', 'ja', '我們提供PVC和過膠防水餐牌，適合餐飲環境使用。',
    '使い捨てメニュー / 防水 マット | 香港の使い捨てメニュー印刷 100枚〜 | ZprintPro'],
  // --- 交生活书 §5 第 2 项登记的语言错配 5 处 (程序化核实: ja 段无假名的中文句 ×3 + en 段挂日文 ×2) ---
  ['imageAlt ja (large-envelopes)', 'large-envelopes', 'ja', '可以。我們支持各種國際標準尺寸和完全定制尺寸。',
    '大型封筒 / 多サイズ対応 | 香港の大型封筒印刷 国際標準サイズ・カスタム対応 | ZprintPro'],
  ['imageAlt ja (exercise-books)', 'exercise-books', 'ja', '練習帳 / 學校向け | 練習帳印刷 中綴じ/無線綴じ 50冊〜 學校向け | ZprintPro',
    '練習帳 / 学校向け | 練習帳印刷 中綴じ・無線綴じ 50冊〜 学校向け | ZprintPro'],
  ['imageAlt ja (textbooks)', 'textbooks', 'ja', '教科書 / 高品質 | 教科書印刷 高品質オフセット 50冊〜 學校向け | ZprintPro',
    '教科書 / 高品質 | 教科書印刷 高品質オフセット 50冊〜 学校向け | ZprintPro'],
  ['imageAlt en (thick-greeting-cards-400g)', 'thick-greeting-cards-400g', 'en', '厚口 カード',
    'Thick 400gsm Greeting Cards | Premium Card Stock | ZprintPro'],
  ['imageAlt en (foil-greeting-cards)', 'foil-greeting-cards', 'en', '箔押し カード',
    'Foil-Stamped Greeting Cards | Hot Foil Finishing | ZprintPro'],
];

const countOf = (s) => src.split(s).length - 1;

const check = (label, oldS, newS) => {
  const hits = countOf(oldS);
  if (hits !== 1) { failed.push(`${label}: 命中 ${hits} 次 (需恰好 1 次) → 跳过`); return false; }
  src = src.split(oldS).join(newS);
  applied++;
  return true;
};

// 在 slug 的 imageAlt 块内替换 locale 值; 返回 [旧块, 新块] 或 null
function altBlockSwap(slug, loc, oldVal, newVal) {
  const slugKey = `"${slug}": {`;
  const slugHits = countOf(slugKey);
  if (slugHits !== 1) { failed.push(`${slug}: SKU 键命中 ${slugHits} 次 (期望 1)`); return false; }
  const skuStart = src.indexOf(slugKey);
  const altKey = '"imageAlt": {';
  const altStart = src.indexOf(altKey, skuStart);
  if (altStart < 0) { failed.push(`${slug}: 未找到 imageAlt 块`); return false; }
  // 配平花括号找块尾 (正确处理字符串内花括号)
  let depth = 0, end = -1, inStr = false, esc = false, quote = '';
  for (let i = altStart + altKey.length - 1; i < src.length; i++) {
    const c = src[i];
    if (inStr) {
      if (esc) { esc = false; continue; }
      if (c === '\\') { esc = true; continue; }
      if (c === quote) inStr = false;
      continue;
    }
    if (c === '"' || c === "'" || c === '`') { inStr = true; quote = c; continue; }
    if (c === '{') depth++;
    else if (c === '}') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end < 0) { failed.push(`${slug}: imageAlt 块花括号未配平`); return false; }
  const block = src.slice(altStart, end + 1);
  const oldPair = `"${loc}": "${oldVal}"`;
  const newPair = `"${loc}": "${newVal}"`;
  if (block.split(oldPair).length - 1 !== 1) {
    failed.push(`${slug}/${loc}: 块内旧串未恰好命中 1 次 → 跳过`);
    return false;
  }
  if (countOf(newPair) !== 0) { failed.push(`${slug}/${loc}: 新串已存在 → 跳过`); return false; }
  src = src.slice(0, altStart) + block.split(oldPair).join(newPair) + src.slice(end + 1);
  applied++;
  return true;
}

// 品牌-语种错配: ja description 尾部挂 zh-hk 品牌「智印港」→ 改 ZprintPro (8 处, 结构定位)
const brandSlugs = ['certificates', 'magnetic-closure-gift-box', 'electronics-packaging-box',
  'kraft-paper-packaging-box', 'fruit-food-label-stickers', 'doujinshi-printing',
  'acrylic-keychain', 'can-badge'];

// 在 slug 段落内把 ja description 的「| 智印港」替换为「| ZprintPro」
function brandSwap(slug) {
  const slugKey = `"${slug}": {`;
  if (countOf(slugKey) !== 1) { failed.push(`${slug}: SKU 键命中 ${countOf(slugKey)} 次`); return false; }
  const segStart = src.indexOf(slugKey);
  const segEnd = src.indexOf('\n  "', segStart + slugKey.length);
  const seg = src.slice(segStart, segEnd > 0 ? segEnd : src.length);
  const m = seg.match(/"ja": \{[^}]*?"description": "((?:[^"\\]|\\.)*)"/);
  if (!m) { failed.push(`${slug}: 未定位到 ja.description`); return false; }
  const oldDesc = m[1];
  if (!oldDesc.endsWith('| 智印港')) { failed.push(`${slug}: ja.description 尾部不是「| 智印港」→ 跳过`); return false; }
  const newDesc = oldDesc.slice(0, -'| 智印港'.length) + '| ZprintPro';
  const oldPair = `"ja": {`.length ? `"description": "${oldDesc}"` : '';
  const newPair = `"description": "${newDesc}"`;
  if (seg.split(oldPair).length - 1 !== 1) { failed.push(`${slug}: 段内旧 description 未恰好命中 1 次`); return false; }
  if (countOf(newPair) !== 0) { failed.push(`${slug}: 新 description 已存在`); return false; }
  src = src.slice(0, segStart) + seg.split(oldPair).join(newPair) + src.slice(segEnd > 0 ? segEnd : src.length);
  applied++;
  return true;
}

for (const [label, oldS, newS] of edits) {
  const t = newS.match(/"title": "((?:[^"\\]|\\.)*)"/)[1];
  const e = equiv(t);
  if (e < TITLE_MIN || e > TITLE_MAX) { failed.push(`${label}: 当量 ${e} 越界 [${TITLE_MIN},${TITLE_MAX}] → 未落盘`); continue; }
  if (check(label, oldS, newS)) console.log(`✅ ${label.padEnd(28)} 当量=${e}  ${t}`);
}
for (const [label, slug, lk, oldAlt, newAlt] of altEdits) {
  if (altBlockSwap(slug, lk, oldAlt, newAlt)) console.log(`✅ ${label.padEnd(38)} (imageAlt 错配 · 结构定位)`);
}
for (const slug of brandSlugs) {
  if (brandSwap(slug)) console.log(`✅ ja description 品牌 ${slug.padEnd(28)} (智印港 → ZprintPro)`);
}

if (failed.length) {
  console.log('\n🔴 未落盘项:');
  for (const f of failed) console.log('  ' + f);
}
if (process.argv.includes('--apply') && failed.length === 0) {
  fs.writeFileSync(FILE, src, 'utf8');
  console.log(`\n💾 已写入 ${FILE} (${applied} 处)`);
} else {
  console.log(`\n(dry-run) 将落盘 ${applied} 处; 加 --apply 执行`);
}
