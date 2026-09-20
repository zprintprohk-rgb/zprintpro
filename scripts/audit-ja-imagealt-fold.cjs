// ja imageAlt 折行审计 —— 找出被塞进 ja 段的「zh-hk 中文整句」(只用结构解析, 不猜缩进)
// 口径 (三闸门之「匹配口径」): 先 dump 样本再判定
//   ① 与同 SKU 的 zh-hk 段**完全相同** → 🔴 确证折行
//   ② 段内**无假名**且含 zh-hk 专用字/港式语素 → 🟠 高度可疑 (可能只是产品名短串, 需人读)
// 前身: 2026-09-20 会话 `.hermes/_tmp-hkfold.cjs`（该前缀=临时, 会被清理规则命中, 故转正入 scripts/）
// 用法: node scripts/audit-ja-imagealt-fold.cjs [locale=ja]
const fs = require('node:fs');

const FILE = 'src/data/sku-seo-data.ts';
const raw = fs.readFileSync(FILE, 'utf8');
const braceStart = raw.indexOf('{', raw.indexOf('export const skuSeoData'));
if (braceStart < 0) { console.error('🔴 未找到 export const skuSeoData'); process.exit(1); }

// 配平花括号定位对象字面量 (正确处理字符串内花括号与转义)
let depth = 0, end = -1, inStr = false, esc = false, quote = '';
for (let i = braceStart; i < raw.length; i++) {
  const c = raw[i];
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
if (end < 0) { console.error('🔴 对象花括号未配平'); process.exit(1); }

let data;
try { data = new Function('return ' + raw.slice(braceStart, end + 1))(); }
catch (e) { console.error('🔴 求值失败 (字面量不是纯 JSON 对象?):', e.message); process.exit(1); }

const loc = (process.argv[2] || 'ja');
const slugs = Object.keys(data);
// zh-hk 专用信号 (与 scripts/audit-sku-locale.cjs 的 TRAD_ONLY 同源, 仅作「可疑」提示, 不作结论)
const KANA = /[\u3040-\u309F\u30A0-\u30FF]/;
const HK_HINT = /[學國說這裡來發藥體讀寫讓變轉邊關隨靜驗髮鬥黃點齊應對會為張訂製我們支持可以]/;

let exact = 0, suspect = 0;
for (const slug of slugs) {
  const alt = data[slug].imageAlt || {};
  const v = alt[loc];
  if (!v) continue;
  if (v === alt['zh-hk']) {
    exact++;
    console.log(`🔴 与 zh-hk 完全相同  [${slug}] ${JSON.stringify(v)}`);
  } else if (!KANA.test(v) && HK_HINT.test(v)) {
    suspect++;
    console.log(`🟠 无假名+含繁体字  [${slug}] ${JSON.stringify(v)}`);
  }
}
console.log(`\n扫描 SKU ${slugs.length} 个 · locale=${loc}`);
console.log(`🔴 确证折行(与 zh-hk 全同): ${exact} 处`);
console.log(`🟠 可疑(需人读确认): ${suspect} 处`);
console.log('⚠️ 只读工具: 不修改任何文件。🟠 项不得直接当缺陷批量改写 —— 先人读确认 (避坑 13)。');
