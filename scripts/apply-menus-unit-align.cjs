// menus body 单位口径对齐 (第 2 批收口): 声称单位必须 == products.ts unitLabel
//   pvc-menus=張 (保留) · laminated-menus=份 · hardcover-menus=本 (保留) · drink-menus=份 · disposable-menus=份
// 手法同 apply-menus-qty-align.cjs: 结构定位 → 旧值全文唯一 → 块内精确子串替换
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
function blk(s, key, from = 0) {
  const k = `"${key}": {`;
  const i = s.indexOf(k, from);
  if (i < 0) return null;
  const e = balanced(s, i + k.length - 1);
  return e < 0 ? null : { bodyStart: i + k.length, end: e };
}
function strAt(s, key, from = 0) {
  const k = `"${key}": "`;
  const i = s.indexOf(k, from);
  if (i < 0) return null;
  let j = i + k.length, out = '', esc = false;
  for (; j < s.length; j++) {
    const c = s[j];
    if (esc) { out += '\\' + c; esc = false; continue; }
    if (c === '\\') { esc = true; continue; }
    if (c === '"') break;
    out += c;
  }
  return { value: out, start: i + k.length, end: j };
}
function bodyOf(slug, locale) {
  const sl = blk(src, slug); if (!sl) return null;
  const seo = blk(src, 'seo', sl.bodyStart); if (!seo) return null;
  const lo = blk(src, locale, seo.bodyStart); if (!lo) return null;
  const b = strAt(src, 'body', lo.bodyStart);
  if (!b || b.end > lo.end) return null;
  return b;
}

const RULES = [
  ['laminated-menus', 'zh-hk', '起訂量為 10 張', '起訂量為 10 份'],
  ['drink-menus', 'zh-hk', '起訂量為 10 張', '起訂量為 10 份'],
  ['disposable-menus', 'zh-hk', '起訂量為 100 張', '起訂量為 100 份'],
];

for (const [slug, loc, from, to] of RULES) {
  const b = bodyOf(slug, loc);
  if (!b) { failed.push(`${slug}/${loc}: 未定位 body`); continue; }
  if (src.split(b.value).length - 1 !== 1) { failed.push(`${slug}/${loc}: body 旧值全文命中 ≠ 1`); continue; }
  if (b.value.split(from).length - 1 !== 1) { failed.push(`${slug}/${loc}: 子串「${from}」命中 ≠ 1`); continue; }
  src = src.slice(0, b.start) + b.value.split(from).join(to) + src.slice(b.end);
  done.push(`${slug}/${loc}「${from}」→「${to}」`);
}

for (const d of done) console.log('✅ ' + d);
if (failed.length) { console.log('\n🔴 未落盘:'); failed.forEach((f) => console.log('  ' + f)); }
if (process.argv.includes('--apply') && failed.length === 0) {
  fs.writeFileSync(FILE, src, 'utf8');
  console.log(`\n💾 已写入 ${FILE} (${done.length} 处)`);
} else console.log(`\n(dry-run) ${done.length} 处; 加 --apply`);
